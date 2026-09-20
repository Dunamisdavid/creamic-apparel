import { useState } from "react";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { naira } from "../utils";

export function ProductPic({ product }) {
  return product.image
    ? <img src={product.image} alt={product.name} loading="lazy" />
    : <span className="ph" aria-hidden="true">CA</span>;
}

export default function Shop({ onSelect }) {
  const [cat, setCat] = useState("all");
  const list = PRODUCTS.filter((p) => cat === "all" || p.category === cat);

  return (
    <section id="shop">
      <div className="wrap">
        <div className="head">
          <h2>Shop the store</h2>
          <div className="filters" role="group" aria-label="Filter by category">
            {CATEGORIES.map(([key, label]) => (
              <button key={key} aria-pressed={cat === key} onClick={() => setCat(key)}>{label}</button>
            ))}
          </div>
        </div>

        {list.length ? (
          <div className="grid">
            {list.map((p) => (
              <button className="item" key={p.id} onClick={() => onSelect(p)}>
                <div className="pic">
                  <ProductPic product={p} />
                  {p.tag && <span className="tag">{p.tag}</span>}
                </div>
                <h3>{p.name}</h3>
                <div className="price">{naira(p.price)}</div>
              </button>
            ))}
          </div>
        ) : (
          <p className="empty">New pieces in this category are coming soon. Message us on WhatsApp to ask what's in store.</p>
        )}
      </div>
    </section>
  );
}