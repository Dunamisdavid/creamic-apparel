import { Router } from "express";
import Product from "../models/Product.js";

const r = Router();

r.get("/", async (req, res, next) => {
  try {
    const filter = { active: true };
    if (req.query.category) filter.category = req.query.category;
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products.map((p) => p.toPublic()));
  } catch (e) { next(e); }
});

r.get("/:slug", async (req, res, next) => {
  try {
    const p = await Product.findOne({ slug: req.params.slug, active: true });
    if (!p) return res.status(404).json({ error: "Product not found" });
    res.json(p.toPublic());
  } catch (e) { next(e); }
});

export default r;