import { Router } from "express";
import crypto from "crypto";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { deliveryFee } from "../lib/shipping.js";
import { reserve } from "../lib/stock.js";
import { initialize, verify } from "../lib/paystack.js";
import { applyPayment } from "../lib/payments.js";

const r = Router();
const HOLD = Number(process.env.ORDER_HOLD_MINUTES || 30);

const newNumber = () => "CA-" + crypto.randomBytes(4).toString("hex").slice(0, 6).toUpperCase();
const newReference = () => "ca_" + crypto.randomBytes(10).toString("hex");
const clean = (v, max = 200) => String(v ?? "").trim().slice(0, max);

class OrderError extends Error {}

r.post("/", async (req, res, next) => {
  const { items, customer = {}, delivery = {}, notes } = req.body || {};

  // ---- validate the shape before touching the database
  const name = clean(customer.name, 80);
  const phone = clean(customer.phone, 20);
  const email = clean(customer.email, 120).toLowerCase();
  const errors = {};
  if (!name) errors.name = "Required";
  if (phone.replace(/\D/g, "").length < 10) errors.phone = "Check this phone number";
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Check this email address";
  if (!Array.isArray(items) || items.length === 0 || items.length > 30) errors.items = "Cart is empty";

  const pickup = delivery.zone === "pickup";
  if (!pickup && !clean(delivery.address)) errors.address = "Required";
  if (!pickup && !clean(delivery.city)) errors.city = "Required";
  if (Object.keys(errors).length) return res.status(400).json({ error: "Please check your details", fields: errors });

  const session = await mongoose.startSession();
  let order;

  try {
    await session.withTransaction(async () => {
      const lines = [];

      for (const raw of items) {
        const qty = Math.floor(Number(raw.qty));
        if (!qty || qty < 1 || qty > 20) throw new OrderError("Invalid quantity");

        const product = await Product.findOne({ slug: raw.id, active: true }).session(session);
        if (!product) throw new OrderError(`${raw.name || "An item"} is no longer available`);

        const madeToMeasure = product.madeToMeasure && raw.size === "Made to measure";
        const size = madeToMeasure ? "Made to measure" : clean(raw.size, 20);

        if (!madeToMeasure && product.sizes.length && !product.sizes.some((s) => s.label === size)) {
          throw new OrderError(`Choose a valid size for ${product.name}`);
        }
        if (madeToMeasure) {
          const m = raw.measurements || {};
          if (!["bust", "waist", "hips", "length"].every((k) => clean(m[k]))) {
            throw new OrderError(`Measurements missing for ${product.name}`);
          }
        }

        const line = {
          product: product._id,
          slug: product.slug,
          name: product.name,
          image: product.images?.[0] || "",
          price: product.price,              // from the database, never the browser
          qty,
          size: madeToMeasure || product.sizes.length ? size : "",
          color: product.colors.includes(raw.color) ? raw.color : product.colors[0] || "",
          madeToMeasure,
          measurements: madeToMeasure
            ? Object.fromEntries(Object.entries(raw.measurements).map(([k, v]) => [k, clean(v, 200)]))
            : undefined,
        };

        if (!(await reserve(line, session))) {
          throw new OrderError(`${product.name}${line.size ? ` in size ${line.size}` : ""} just sold out`);
        }
        lines.push(line);
      }

      const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);
      const shipping = deliveryFee(delivery.zone, subtotal);
      if (!shipping) throw new OrderError("Choose a delivery option");

      [order] = await Order.create(
        [{
          number: newNumber(),
          reference: newReference(),
          items: lines,
          customer: { name, phone, email },
          delivery: {
            zone: shipping.zone.key,
            label: shipping.zone.label,
            address: pickup ? "" : clean(delivery.address),
            city: pickup ? "" : clean(delivery.city, 80),
            landmark: pickup ? "" : clean(delivery.landmark),
          },
          notes: clean(notes, 1000),
          subtotal,
          fee: shipping.fee,
          total: subtotal + shipping.fee,
          expiresAt: new Date(Date.now() + HOLD * 60 * 1000),
        }],
        { session }
      );
    });
  } catch (e) {
    await session.endSession();
    if (e instanceof OrderError) return res.status(409).json({ error: e.message });
    return next(e);
  }
  await session.endSession();

  // ---- stock is held; now ask Paystack for a payment page
  try {
    const pay = await initialize({
      email: order.customer.email,
      amount: order.total,
      reference: order.reference,
      callbackUrl: `${process.env.FRONTEND_URL}/order-received?reference=${order.reference}`,
      metadata: { order_number: order.number },
    });
    res.status(201).json({ number: order.number, reference: order.reference, authorizationUrl: pay.authorization_url });
  } catch (e) {
    // The hold stays; the expiry job releases it if payment never starts.
    console.error("Paystack initialize failed:", e.message);
    res.status(502).json({ error: "Payment could not be started. Please try again in a moment." });
  }
});

// Called by the order-received page. Confirms with Paystack directly,
// so a delayed webhook doesn't leave the customer staring at "pending".
r.get("/verify/:reference", async (req, res, next) => {
  try {
    const order = await Order.findOne({ reference: req.params.reference });
    if (!order) return res.status(404).json({ error: "Order not found" });

    if (order.status === "pending") {
      try {
        await applyPayment(await verify(order.reference));
      } catch { /* not paid yet, or Paystack unreachable — report what we have */ }
    }

    const fresh = await Order.findById(order._id);
    res.json({
      number: fresh.number,
      status: fresh.status,
      total: fresh.total,
      items: fresh.items.map((i) => ({ name: i.name, qty: i.qty, size: i.size, color: i.color, price: i.price })),
      delivery: fresh.delivery.label,
    });
  } catch (e) { next(e); }
});

export default r;