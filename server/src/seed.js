import "dotenv/config";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import { PRODUCTS } from "../../src/data/products.js";

await mongoose.connect(process.env.MONGODB_URI);

let added = 0;
for (const p of PRODUCTS) {
  const exists = await Product.exists({ slug: p.id });
  if (exists) continue;
  await Product.create({
    slug: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    images: p.images || (p.image ? [p.image] : []),
    desc: p.desc,
    badge: p.badge,
    colors: p.colors || [],
    sizes: (p.sizes || []).map((s) => (typeof s === "string" ? { label: s, stock: 0 } : s)),
    stock: p.sizes?.length ? 0 : p.stock ?? 5,
    madeToMeasure: !!p.madeToMeasure,
    featured: !!p.featured,
  });
  added++;
}
console.log(`Seeded ${added} new products (${PRODUCTS.length - added} already existed)`);
await mongoose.disconnect();