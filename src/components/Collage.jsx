import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import { inCategory } from "../data/products";

function ShotCard({ to, label, cta, product }) {
  return (
    <Link className="shotcard" to={to}>
      <ProductImage product={product} />
      <div className="t">
        <h3>{label}</h3>
        <span className="btn cream">{cta}</span>
      </div>
    </Link>
  );
}

export default function Collage() {
  const pick = (cat) => inCategory(cat)[0];

  const bags = pick("bags");
  const shoes = pick("shoes");
  const women = pick("women") || pick("designs");

  if (!bags || !shoes || !women) return null;

  return (
    <section className="pad">
      <div className="wrap">
        <div className="head">
          <h2>Most Recommended For You</h2>
          <p>The pieces our customers keep coming back for, and the looks we style them with.</p>
        </div>

        <div className="collage">
          <ShotCard to="/shop/bags" label="Bags" cta="View All Bags" product={bags} />
          <div className="col">
            <ShotCard to="/shop/shoes" label="Shoes" cta="View All Shoes" product={shoes} />
            <ShotCard to="/shop/women" label="Women" cta="View All Women" product={women} />
          </div>
        </div>

        <Link className="banner" to="/shop">
          <ProductImage product={shoes} />
          <div className="t">
            <h2 style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)" }}>Trending Now</h2>
            <span className="btn cream" style={{ marginTop: ".9rem" }}>Explore Shop ↗</span>
          </div>
        </Link>
      </div>
    </section>
  );
}