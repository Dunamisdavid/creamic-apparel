import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    slug: String,
    name: String,
    image: String,
    price: Number,          // copied from the product at order time
    qty: { type: Number, min: 1 },
    size: String,
    color: String,
    madeToMeasure: Boolean,
    measurements: { type: Map, of: String },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    number: { type: String, unique: true },       // human-facing: CA-7K2F9Q
    reference: { type: String, unique: true },    // Paystack reference
    items: [ItemSchema],
    customer: { name: String, phone: String, email: String },
    delivery: { zone: String, label: String, address: String, city: String, landmark: String },
    notes: String,
    subtotal: Number,
    fee: Number,
    total: Number,
    status: {
      type: String,
      enum: ["pending", "paid", "expired", "cancelled", "fulfilled"],
      default: "pending",
      index: true,
    },
    stockReleased: { type: Boolean, default: false },
    expiresAt: { type: Date, index: true },
    paidAt: Date,
    payment: { id: Number, channel: String, amount: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);