import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import products from "./routes/products.js";
import orders from "./routes/orders.js";
import webhooks from "./routes/webhooks.js";
import { startExpiryJob } from "./jobs/expire.js";

const required = ["MONGODB_URI", "PAYSTACK_SECRET_KEY", "FRONTEND_URL"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error("Missing env vars:", missing.join(", "));
  process.exit(1);
}

const app = express();
app.set("trust proxy", 1);

// Webhook first — it needs the raw body, before express.json() parses it.
app.use("/api/webhooks", webhooks);

app.use(cors({ origin: process.env.FRONTEND_URL.split(",").map((s) => s.trim()) }));
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/products", products);
app.use("/api/orders", orders);

app.use((req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong. Please try again." });
});

await mongoose.connect(process.env.MONGODB_URI);
console.log("MongoDB connected");
startExpiryJob();

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API on :${port}`));