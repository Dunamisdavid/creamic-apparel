import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { naira } from "../lib/format";

const API = import.meta.env.VITE_API_URL;

export default function OrderReceived() {
  const [params] = useSearchParams();
  const reference = params.get("reference") || params.get("trxref");
  const { clear } = useCart();
  const [order, setOrder] = useState(null);
  const [state, setState] = useState("checking");

  useEffect(() => {
    if (!reference) { setState("missing"); return; }
    let tries = 0;
    let timer;

    async function check() {
      try {
        const res = await fetch(`${API}/api/orders/verify/${reference}`);
        const data = await res.json();
        if (!res.ok) { setState("missing"); return; }
        setOrder(data);
        if (data.status === "paid" || data.status === "fulfilled") {
          setState("paid");
          clear();
          return;
        }
        if (data.status === "expired" || data.status === "cancelled") { setState("failed"); return; }
      } catch { /* network blip — keep trying */ }

      if (++tries < 8) timer = setTimeout(check, 2500);
      else setState("pending");
    }

    check();
    return () => clearTimeout(timer);
  }, [reference]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="wrap pad center" style={{ maxWidth: "38rem" }}>
      {state === "checking" && <><h1>Confirming your payment…</h1><p className="muted" style={{ marginTop: ".8rem" }}>This takes a few seconds.</p></>}

      {state === "paid" && order && (
        <>
          <h1>Thank you — order {order.number} is confirmed</h1>
          <p className="muted" style={{ marginTop: ".8rem" }}>
            A receipt is on its way to your email, and we'll message you on WhatsApp with your delivery time.
          </p>
          <div className="summary" style={{ textAlign: "left", marginTop: "1.6rem", position: "static" }}>
            {order.items.map((i, n) => (
              <div className="sline" key={n}>
                <span>{i.qty} × {i.name}{i.size ? ` · ${i.size}` : ""}</span><span>{naira(i.price * i.qty)}</span>
              </div>
            ))}
            <div className="sline total"><span>Total paid</span><span>{naira(order.total)}</span></div>
          </div>
        </>
      )}

      {state === "pending" && (
        <>
          <h1>Your payment is still processing</h1>
          <p className="muted" style={{ marginTop: ".8rem" }}>
            Bank transfers can take a few minutes. Your order number is <b>{order?.number}</b> — we'll email you once it clears.
            Please don't pay twice.
          </p>
        </>
      )}

      {state === "failed" && (
        <>
          <h1>This order wasn't completed</h1>
          <p className="muted" style={{ marginTop: ".8rem" }}>No payment was taken. Your cart is still saved.</p>
          <Link className="btn brown lg" to="/cart" style={{ marginTop: "1.4rem" }}>Back to cart</Link>
        </>
      )}

      {state === "missing" && (
        <>
          <h1>We couldn't find that order</h1>
          <p className="muted" style={{ marginTop: ".8rem" }}>If you were charged, message us on WhatsApp with your email address.</p>
        </>
      )}

      {(state === "paid" || state === "pending") && (
        <Link className="btn outline lg" to="/shop" style={{ marginTop: "1.6rem" }}>Keep shopping</Link>
      )}
    </div>
  );
}