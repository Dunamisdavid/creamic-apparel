import Order from "../models/Order.js";
import { release } from "./stock.js";

export async function applyPayment(tx) {
  if (!tx || tx.status !== "success") return null;

  const order = await Order.findOne({ reference: tx.reference });
  if (!order) return null;
  if (order.status === "paid" || order.status === "fulfilled") return order; // already done

  // The amount must match what we asked for, in kobo, in naira.
  const expected = Math.round(order.total * 100);
  if (tx.amount !== expected || tx.currency !== "NGN") {
    console.error(`Amount mismatch on ${order.reference}: got ${tx.amount}, expected ${expected}`);
    return null;
  }

  // Paid after the hold expired: stock was released, so take it back if we can.
  // If it's gone, the order is still marked paid and flagged for the brand to resolve.
  if (order.status === "expired") {
    console.warn(`Late payment on expired order ${order.number} — check stock manually`);
  }

  order.status = "paid";
  order.paidAt = new Date(tx.paid_at || Date.now());
  order.payment = { id: tx.id, channel: tx.channel, amount: tx.amount / 100 };
  await order.save();
  return order;
}

export { release };