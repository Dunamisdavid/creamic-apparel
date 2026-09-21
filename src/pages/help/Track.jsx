import { useState } from "react";
import InfoPage from "../../components/InfoPage";

export default function Track() {
  const [order, setOrder] = useState("");
  const [phone, setPhone] = useState("");

  const msg = `Hello Creamic Apparel, please can I get an update on order ${order.trim()}. My phone number is ${phone.trim()}.`;
  const ready = order.trim() && phone.replace(/\D/g, "").length >= 10;

  return (
    <InfoPage title="Track an order" intro="Enter your order number from your confirmation email and we'll send you an update.">
      <div className="two">
        <div className="field">
          <label htmlFor="order">Order number</label>
          <input id="order" placeholder="e.g. CA-10234" value={order} onChange={(e) => setOrder(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone used at checkout</label>
          <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>

      <a
        className={`btn brown lg${ready ? "" : " off"}`}
        style={{ marginTop: "1.25rem" }}
        href={ready ? `https://wa.me/2349137897889?text=${encodeURIComponent(msg)}` : undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!ready}
      >
        Get an update on WhatsApp
      </a>
    </InfoPage>
  );
}