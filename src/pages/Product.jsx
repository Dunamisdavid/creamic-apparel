import { useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { byId, inCategory } from "../data/products";
import { naira } from "../lib/format";
import { useCart } from "../context/CartContext";
import ProductImage from "../components/ProductImage";
import ProductCard from "../components/ProductCard";

const FIELDS = [
  { key: "bust", label: "Bust / chest (in)" },
  { key: "waist", label: "Waist (in)" },
  { key: "hips", label: "Hips (in)" },
  { key: "length", label: "Full length (in)" },
  { key: "height", label: "Your height (ft/in)" },
  { key: "sleeve", label: "Sleeve length (in)" },
];

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const product = byId(id);

  const [shot, setShot] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product?.colors?.[0] || "");
  const [qty, setQty] = useState(1);
  const [custom, setCustom] = useState(false);
  const [m, setM] = useState({});
  const [error, setError] = useState("");

  const related = useMemo(
    () => (product ? inCategory(product.category).filter((p) => p.id !== product.id).slice(0, 3) : []),
    [product]
  );

  if (!product) {
    return (
      <div className="wrap pad center">
        <h1>Product not found</h1>
        <p className="muted" style={{ marginTop: ".6rem" }}>It may have sold out or been renamed.</p>
        <Link className="btn outline" to="/shop" style={{ marginTop: "1.2rem" }}>Back to shop</Link>
      </div>
    );
  }

  const sizes = product.sizes || [];
  const chosen = sizes.find((s) => s.label === size);
  const soldOut = sizes.length > 0 && sizes.every((s) => s.stock === 0);
  const madeToMeasure = product.madeToMeasure;
  const max = custom ? 5 : chosen ? chosen.stock : 10;

  const missing = custom ? FIELDS.slice(0, 4).filter((f) => !m[f.key]?.trim()) : [];

  function build() {
    if (soldOut) return null;
    if (!custom && sizes.length > 0 && !size) {
      setError("Please choose a size.");
      return null;
    }
    if (custom && missing.length > 0) {
      setError("Fill in bust, waist, hips and length so the workshop can cut your piece.");
      return null;
    }
    setError("");
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      size: custom ? "Made to measure" : size,
      color,
      qty,
      measurements: custom ? m : null,
    };
  }

  const handleAdd = () => {
    const item = build();
    if (item) add(item);
  };

  const handleBuy = () => {
    const item = build();
    if (item) {
      add(item);
      navigate("/checkout");
    }
  };

  return (
    <>
      <div className="wrap crumbs">
        <Link to="/">Home</Link> / <Link to={`/shop/${product.category}`}>{product.badge || product.category}</Link> / {product.name}
      </div>

      <div className="wrap product">
        <div className="gallery">
          <div className="main"><ProductImage product={product} index={shot} /></div>
          {product.images?.length > 1 && (
            <div className="thumbs">
              {product.images.map((src, i) => (
                <button key={src} aria-current={i === shot} onClick={() => setShot(i)}>
                  <img src={src} alt={`${product.name} view ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail">
          <h1>{product.name}</h1>
          <div className="price">{naira(product.price)}</div>
          <p className="desc">{product.desc}</p>

          {product.colors?.length > 0 && (
            <div className="opt">
              <label>Colour</label>
              <div className="chips">
                {product.colors.map((c) => (
                  <button key={c} aria-pressed={c === color} onClick={() => setColor(c)}>{c}</button>
                ))}
              </div>
            </div>
          )}

          {sizes.length > 0 && !custom && (
            <div className="opt">
              <label>Size</label>
              <div className="chips">
                {sizes.map((s) => (
                  <button
                    key={s.label}
                    aria-pressed={s.label === size}
                    disabled={s.stock === 0}
                    onClick={() => { setSize(s.label); setQty(1); setError(""); }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              {chosen && chosen.stock > 0 && (
                <p className={`stockline ${chosen.stock <= 2 ? "low" : "ok"}`}>
                  {chosen.stock <= 2 ? `Only ${chosen.stock} left in size ${chosen.label}` : "In stock"}
                </p>
              )}
              {soldOut && <p className="stockline low">Sold out — message us to be told when it lands.</p>}
            </div>
          )}

          {madeToMeasure && (
            <div className="opt">
              <label>Fit</label>
              <div className="chips">
                <button aria-pressed={!custom} onClick={() => { setCustom(false); setError(""); }}>Standard size</button>
                <button aria-pressed={custom} onClick={() => { setCustom(true); setError(""); }}>Made to measure</button>
              </div>

              {custom && (
                <div style={{ marginTop: "1rem" }}>
                  <p className="muted" style={{ fontSize: ".88rem" }}>
                    Measure over light clothing and keep the tape flat. Not sure? Put your best guess in and we
                    will confirm before cutting. Ready in 7–10 days.
                  </p>
                  <div className="two" style={{ marginTop: ".8rem" }}>
                    {FIELDS.map((f, i) => (
                      <div className="field" key={f.key}>
                        <label htmlFor={f.key}>{f.label}{i < 4 ? " *" : ""}</label>
                        <input
                          id={f.key}
                          inputMode="decimal"
                          value={m[f.key] || ""}
                          onChange={(e) => setM({ ...m, [f.key]: e.target.value })}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="field">
                    <label htmlFor="notes">Fabric or notes</label>
                    <textarea
                      id="notes"
                      rows={3}
                      placeholder="Colour, fabric, event date, anything we should know"
                      value={m.notes || ""}
                      onChange={(e) => setM({ ...m, notes: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="qty">
            <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Less">−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(Math.min(max, qty + 1))} aria-label="More">+</button>
          </div>

          {error && <p className="stockline low" style={{ marginTop: ".8rem" }}>{error}</p>}

          <div className="actions">
            <button className="btn soft lg" onClick={handleAdd} disabled={soldOut}>Add to Cart</button>
            <button className="btn brown lg" onClick={handleBuy} disabled={soldOut}>Buy Now</button>
          </div>

          <div className="panel">
            <details open>
              <summary>Delivery</summary>
              <p>Same-day dispatch within Abuja on orders before 3pm. Other states arrive in 2–4 working days. Collection from the Wuye shop is free.</p>
            </details>
            <details>
              <summary>Returns</summary>
              <p>Seven days for unworn items with the tag still on. Made-to-measure pieces cannot be returned, since they are cut to your numbers.</p>
            </details>
            <details>
              <summary>Payment</summary>
              <p>Card, bank transfer and USSD through Paystack. Your card details never touch our servers.</p>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="pad">
          <div className="wrap">
            <div className="head"><h2>You may also like</h2></div>
            <div className="grid">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          </div>
        </section>
      )}

      <div className="stickybuy">
        <button className="btn soft" onClick={handleAdd} disabled={soldOut}>Add to Cart</button>
        <button className="btn brown" onClick={handleBuy} disabled={soldOut}>{naira(product.price)} · Buy Now</button>
      </div>
    </>
  );
}