import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CATEGORIES } from "../data/products";
import { useCart } from "../context/CartContext";
import Logo from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const close = () => setOpen(false);

  return (
    <header>
      <div className="wrap bar">
        <Logo />

        <nav>
          {CATEGORIES.map((c) => (
            <NavLink key={c.key} to={`/shop/${c.key}`}>{c.label}</NavLink>
          ))}
        </nav>

        <div className="icons">
          <Link to="/shop" className="iconbtn">Shop</Link>
          <Link to="/cart" className="iconbtn cartbtn" aria-label={`Cart, ${count} items`}>
            Cart {count > 0 && <span className="count">{count}</span>}
          </Link>
          <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      {open && (
        <div className="drawer">
          <div className="wrap">
            <Link to="/shop" onClick={close}>All products</Link>
            <span className="sep">Shop by category</span>
            {CATEGORIES.map((c) => (
              <Link key={c.key} to={`/shop/${c.key}`} onClick={close}>{c.label}</Link>
            ))}
            <span className="sep">Help</span>
            <Link to="/delivery" onClick={close}>Delivery &amp; returns</Link>
            <Link to="/size-guide" onClick={close}>Size guide</Link>
            <Link to="/cart" onClick={close}>Cart ({count})</Link>
          </div>
        </div>
      )}
    </header>
  );
}