import Product from "../models/Product.js";

// Returns true if reserved, false if not enough stock.
export async function reserve(item, session) {
  if (item.madeToMeasure) return true; // cut to order, nothing to hold

  if (item.size) {
    const res = await Product.updateOne(
      { _id: item.product, sizes: { $elemMatch: { label: item.size, stock: { $gte: item.qty } } } },
      { $inc: { "sizes.$.stock": -item.qty } },
      { session }
    );
    return res.modifiedCount === 1;
  }

  const res = await Product.updateOne(
    { _id: item.product, stock: { $gte: item.qty } },
    { $inc: { stock: -item.qty } },
    { session }
  );
  return res.modifiedCount === 1;
}

export async function release(item, session) {
  if (item.madeToMeasure) return;

  if (item.size) {
    await Product.updateOne(
      { _id: item.product, "sizes.label": item.size },
      { $inc: { "sizes.$.stock": item.qty } },
      { session }
    );
  } else {
    await Product.updateOne({ _id: item.product }, { $inc: { stock: item.qty } }, { session });
  }
}