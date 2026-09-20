import { useState } from "react";

// Builds a cream-and-gold "CA" placeholder as an inline SVG data URI.
function placeholder(label = "") {
  const text = label.length > 28 ? label.slice(0, 26) + "…" : label;
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
    <rect width="800" height="800" fill="#F3EADC"/>
    <g fill="none" stroke="#C6A455" stroke-width="14" stroke-linecap="round">
      <path d="M470 300a108 108 0 1 0 6 200"/>
    </g>
    <path d="M300 520 h200 M330 560 L400 330 L470 560" fill="none" stroke="#7A5A2B"
      stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="400" y="640" text-anchor="middle" font-family="Georgia,serif"
      font-size="30" fill="#8C8371">${esc(text)}</text>
    <text x="400" y="686" text-anchor="middle" font-family="Helvetica,Arial,sans-serif"
      font-size="20" letter-spacing="4" fill="#B3A794">PHOTO COMING SOON</text>
  </svg>`;

  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

export default function ProductImage({ product, index = 0, className = "" }) {
  const src = product.images?.[index] || product.image || "";
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <img className={className} src={placeholder(product.name)} alt={product.name} />;
  }

  return (
    <img
      className={className}
      src={src}
      alt={product.name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}