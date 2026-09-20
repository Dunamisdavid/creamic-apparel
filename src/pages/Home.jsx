import { Link } from "react-router-dom";
import { PRODUCTS, inCategory } from "../data/products";
import ProductCard from "../components/ProductCard";
import Collage from "../components/Collage";

const Grid = ({ items }) => (
  <div className="grid">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
);

export default function Home() {
  const designs = inCategory("designs");          // the in-house line
  const others = PRODUCTS.filter((p) => p.category !== "designs");
  const fresh = others.slice(0, 6);
  const rest = others.slice(6, 12);

  return (
    <>
      <section className="hero">
        <div className="inner">
          <h1>Pieces That Carry Your Whole Look</h1>
          <p>Womenswear cut in our Abuja workshop, with the shoes, bags and jewellery we hand-pick. Pay online, delivered nationwide.</p>
          <Link className="btn cream" to="/shop">Shop Now</Link>
        </div>
      </section>

      <div className="wrap promos">
        <Link className="promo" to="/shop/bags">
          <img src="/images/bag1.jpg" alt="" />
          <div className="t">
            <p>Bags That Finish The Outfit Before You Say A Word.</p>
            <span className="btn brown">Shop Bags</span>
          </div>
        </Link>
        <Link className="promo" to="/shop/shoes">
          <img src="/images/shoe4.jpg" alt="" />
          <div className="t">
            <p>Fully Boxed. Sized For Nigeria. Ready To Wear Out.</p>
            <span className="btn brown">Get Your Pair</span>
          </div>
        </Link>
        <Link className="promo centred" to="/shop/designs">
          <img src="/images/shirt1.jpg" alt="" />
          <div className="t">
            <h3>MADE-TO-MEASURE</h3>
            <span className="btn cream">Start An Order</span>
          </div>
        </Link>
      </div>

      <div className="trust"><div className="wrap">
        <div>Secure payment<span>Card, transfer &amp; USSD</span></div>
        <div>Nationwide delivery<span>Same day in Abuja</span></div>
        <div>7-day returns<span>Unworn, with tag on</span></div>
        <div>Collect in store<span>Wuye Ultra Modern Market</span></div>
      </div></div>

      <section className="pad">
        <div className="wrap">
          <div className="head">
            <h2>Newly Dropped Pieces</h2>
            <p>Straight from the Wuye shop to your door. Same-day dispatch within Abuja on orders before 3pm.</p>
          </div>
          <Grid items={fresh} />
          <div className="more"><Link className="btn pillbtn" to="/shop">See More Collections</Link></div>
        </div>
      </section>

      <Collage />

      {designs.length > 0 && (
        <section className="pad soft-bg">
          <div className="wrap">
            <div className="head">
              <h2>Made-To-Measure Collection</h2>
              <p>Pick a style, send your measurements, choose the fabric. Ready in 7–10 days.</p>
            </div>
            <Grid items={designs} />
            <div className="more">
              <Link className="btn pillbtn" to="/shop/designs">See The Full Line</Link>
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="pad">
          <div className="wrap">
            <div className="head"><h2>Also In The Shop</h2><p>Restocked weekly.</p></div>
            <Grid items={rest} />
          </div>
        </section>
      )}
    </>
  );
}