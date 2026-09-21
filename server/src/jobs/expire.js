import mongoose from "mongoose";
import Order from "../models/Order.js";
import { release } from "../lib/stock.js";

export async function expireStale() {
  const stale = await Order.find({ status: "pending", expiresAt: { $lt: new Date() } }).limit(50);

  for (const order of stale) {
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        // Re-check inside the transaction in case it was paid a moment ago.
        const fresh = await Order.findOne({ _id: order._id, status: "pending" }).session(session);
        if (!fresh || fresh.stockReleased) return;
        for (const item of fresh.items) await release(item, session);
        fresh.status = "expired";
        fresh.stockReleased = true;
        await fresh.save({ session });
      });
      console.log(`Expired ${order.number}, stock released`);
    } catch (e) {
      console.error(`Could not expire ${order.number}:`, e.message);
    } finally {
      await session.endSession();
    }
  }
}

export function startExpiryJob() {
  expireStale().catch(console.error);
  return setInterval(() => expireStale().catch(console.error), 5 * 60 * 1000);
}