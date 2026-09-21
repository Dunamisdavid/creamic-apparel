import mongoose from "mongoose";

const SizeSchema = new mongoose.Schema(
  { label: { type: String, required: true }, stock: { type: Number, default: 0, min: 0 } },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true }, // matches the frontend id, e.g. "sh-01"
    name: { type: String, required: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true, min: 0 },       // whole naira
    images: [String],
    desc: String,
    badge: String,
    colors: [String],
    sizes: [SizeSchema],                                   // sized items track stock per size
    stock: { type: Number, default: 0, min: 0 },           // unsized items (bags) track it here
    madeToMeasure: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Shape the API returns — identical to the frontend's data file.
ProductSchema.methods.toPublic = function () {
  return {
    id: this.slug,
    name: this.name,
    category: this.category,
    price: this.price,
    images: this.images,
    desc: this.desc,
    badge: this.badge,
    colors: this.colors,
    sizes: this.sizes.map((s) => ({ label: s.label, stock: s.stock })),
    stock: this.sizes.length ? undefined : this.stock,
    madeToMeasure: this.madeToMeasure,
    featured: this.featured,
  };
};

export default mongoose.model("Product", ProductSchema);