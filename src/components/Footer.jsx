import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer>
      <div className="wrap fgrid">
        <div>
          <Logo invert />
          <p style={{ fontSize: ".9rem", marginTop: ".8rem" }}>
            Premium fashion, footwear and tailoring in Abuja.<br />
            Block H2F, Shop 414, Wuye Ultra Modern Market.<br />+234 913 789 7889
          </p>
          <form className="news" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email for new drops" aria-label="Email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div>
          <h4>Categories</h4>
          <Link to="/shop/women">Women</Link><Link to="/shop/men">Men</Link>
          <Link to="/shop/shoes">Shoes</Link><Link to="/shop/bags">Bags</Link>
          <Link to="/shop/jewellery">Jewellery</Link>
        </div>
        <div>
          <h4>Help</h4>
          <Link to="/how-to-order">How to order</Link><Link to="/delivery">Delivery &amp; returns</Link>
          <Link to="/size-guide">Size guide</Link><Link to="/track">Track order</Link>
        </div>
        <div>
          <h4>Brand</h4>
          <Link to="/about">Our story</Link><Link to="/shop/designs">Tailoring</Link>
          <a href="https://www.instagram.com/_creamicapparel" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      <div className="wrap fbot">
        <span>© {new Date().getFullYear()} Creamic Apparel. All rights reserved.</span>
        <span>Secured by Paystack · Card, transfer, USSD</span>
      </div>
    </footer>
  );
}