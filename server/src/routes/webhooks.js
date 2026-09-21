import { Router } from "express";
import express from "express";
import { validSignature } from "../lib/paystack.js";
import { applyPayment } from "../lib/payments.js";

const r = Router();

// Raw body is required: the signature is over the exact bytes Paystack sent.
r.post("/paystack", express.raw({ type: "application/json" }), async (req, res) => {
  if (!validSignature(req.body, req.headers["x-paystack-signature"])) {
    return res.sendStatus(401);
  }

  // Acknowledge fast; Paystack retries anything that isn't a 200.
  res.sendStatus(200);

  try {
    const event = JSON.parse(req.body.toString("utf8"));
    if (event.event === "charge.success") {
      const order = await applyPayment(event.data);
      if (order) console.log(`Paid: ${order.number} ₦${order.total}`);
    }
  } catch (e) {
    console.error("Webhook processing failed:", e);
  }
});

export default r;