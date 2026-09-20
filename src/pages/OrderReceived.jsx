import { Link } from "react-router-dom";

export default function OrderReceived() {
  return (
    <div className="wrap pad center">
      <h1>Thank you — your order is in</h1>
      <p className="muted" style={{ marginTop: ".8rem", maxWidth: "34rem", marginInline: "auto" }}>
        We'll send a confirmation to your email and a WhatsApp message with your delivery time.
        If anything is out of stock we'll call you before dispatch.
      </p>
      <Link className="btn brown lg" to="/shop" style={{ marginTop: "1.6rem" }}>Keep shopping</Link>
    </div>
  );
}