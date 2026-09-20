import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { naira } from "../lib/format";

export default function Cart() {
  const { items, subtotal, setQty, remove, clear } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="wrap pad center">
        <h1>Your cart is empty</h1>
        <p className="muted" style={{ marginTop: ".6rem" }}>Nothing added yet.</p>
        <Link className="btn brown lg" to="/shop" style={{ marginTop: "1.4rem" }}>Start shopping</Link>
      </div>
    );
  }

  return (
    <>
      <div className="wrap crumbs"><Link to="/">Home</Link> / Cart</div>

      <div className="wrap pad">
        <div className="head left">
          <h2>Your cart</h2>
          <button className="btn soft" onClick={clear}>Empty cart</button>
        </div>

        <div className="cartgrid">
          <div>
            {items.map((i, index) => (
              <div className="line" key={`${i.id}-${i.size}-${i.color}-${index}`}>
                <img src={i.image || "/images/placeholder.jpg"} alt={i.name} />

                <div>
                  <h3><Link to={`/product/${i.id}`}>{i.name}</Link></h3>
                  <div className="meta">
                    {[i.color, i.size].filter(Boolean).join(" · ")}
                    {i.measurements && <> · measurements sent</>}
                  </div>

                  <div className="qty" style={{ marginTop: ".7rem" }}>
                    <button onClick={() => setQty(index, i.qty - 1)} aria-label="Less">−</button>
                    <span>{i.qty}</span>
                    <button onClick={() => setQty(index, i.qty + 1)} aria-label="More">+</button>
                  </div>

                  <button className="rm" onClick={() => remove(index)}>Remove</button>
                </div>

                <div style={{ fontFamily: "var(--serif)", fontWeight: 700 }}>
                  {naira(i.price * i.qty)}
                </div>
              </div>
            ))}
          </div>

          <aside className="summary">
            <h3>Order summary</h3>
            <div className="sline"><span>Subtotal</span><span>{naira(subtotal)}</span></div>
            <div className="sline"><span>Delivery</span><span className="muted">Calculated at checkout</span></div>
            <div className="sline total"><span>Total</span><span>{naira(subtotal)}</span></div>
            <button className="btn brown block lg" style={{ marginTop: "1rem" }} onClick={() => navigate("/checkout")}>
              Checkout
            </button>
            <Link className="btn soft block" to="/shop" style={{ marginTop: ".6rem" }}>Keep shopping</Link>
            <p className="muted" style={{ fontSize: ".8rem", marginTop: ".9rem" }}>
              Card, transfer and USSD through Paystack.
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}