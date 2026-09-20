import { useEffect, useRef, useState } from "react";
import { ProductPic } from "./Shop";
import { naira, wa } from "../utils";

function Options({ label, values, value, onChange }) {
  if (!values?.length) return null;
  return (
    <div>
      <label>{label}</label>
      <div className="opts">
        {values.map((v) => (
          <button key={v} aria-pressed={value === v} onClick={() => onChange(v)}>{v}</button>
        ))}
      </div>
    </div>
  );
}

export default function ProductModal({ product, onClose }) {
  const ref = useRef(null);
  const [size, setSize] = useState(product.sizes?.[0] || "");
  const [color, setColor] = useState(product.colors?.[0] || "");

  useEffect(() => {
    const dlg = ref.current;
    dlg.showModal();
    dlg.addEventListener("close", onClose);
    return () => dlg.removeEventListener("close", onClose);
  }, [onClose]);

  let msg = `Hello Creamic Apparel, I'd like to order:\n${product.name} (${product.id})\nPrice: ${naira(product.price)}`;
  if (size) msg += `\nSize: ${size}`;
  if (color) msg += `\nColour: ${color}`;
  msg += `\nDelivery location:`;

  return (
    <dialog ref={ref} aria-labelledby="dTitle" onClick={(e) => e.target === ref.current && ref.current.close()}>
      <div className="dlg" style={{ position: "relative" }}>
        <button className="close" aria-label="Close" onClick={() => ref.current.close()}>×</button>
        <div className="pic"><ProductPic product={product} /></div>
        <div className="body">
          <h3 id="dTitle">{product.name}</h3>
          <div style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", color: "var(--gold)" }}>{naira(product.price)}</div>
          <p style={{ color: "var(--muted)" }}>{product.desc}</p>
          <Options label="Size" values={product.sizes} value={size} onChange={setSize} />
          <Options label="Colour" values={product.colors} value={color} onChange={setColor} />
          <a className="btn gold" href={wa(msg)} target="_blank" rel="noopener">Order on WhatsApp</a>
          <small style={{ color: "var(--muted)" }}>This opens a chat with your choice filled in. We confirm availability and delivery before payment.</small>
        </div>
      </div>
    </dialog>
  );
}