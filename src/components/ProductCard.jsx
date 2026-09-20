import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { naira } from "../lib/format";
import { useCart } from "../context/CartContext";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  // Items with sizes must be chosen on the product page, not added blind.
  const needsChoice = product.sizes?.length > 0 || product.colors?.length > 1;

  const item = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images?.[0] || "",
    color: product.colors?.[0] || "",
    size: "",
  };

  const handleAdd = () => {
    if (needsChoice) return navigate(`/product/${product.id}`);
    add(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleBuy = () => {
    if (needsChoice) return navigate(`/product/${product.id}`);
    add(item);
    navigate("/checkout");
  };

  return (
    <article className="card">
      <Link className="shot" to={`/product/${product.id}`}>
        <ProductImage product={product} />
      </Link>

      <div className="row">
        <span className="price">{naira(product.price)}</span>
        {product.badge && <span className="pill">{product.badge}</span>}
      </div>

      <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
      <p>{product.desc}</p>

      <div className="buys">
        <button className="btn soft" onClick={handleAdd}>{added ? "Added ✓" : "Add to Cart"}</button>
        <button className="btn brown" onClick={handleBuy}>Buy Now</button>
      </div>
    </article>
  );
}