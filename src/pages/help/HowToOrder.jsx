import { Link } from "react-router-dom";
import InfoPage from "../../components/InfoPage";

export default function HowToOrder() {
  return (
    <InfoPage title="How to order" intro="Four steps from browsing to your door.">
      <ol className="steps-list">
        <li><b>Choose your piece.</b> Open any product, pick your colour and size. Unsure of your size? Check the <Link to="/size-guide">size guide</Link>.</li>
        <li><b>Add to cart or buy now.</b> Add to Cart keeps shopping; Buy Now goes straight to checkout.</li>
        <li><b>Enter your details.</b> Name, phone, email and delivery address, or choose to collect from the Wuye shop.</li>
        <li><b>Pay securely.</b> Card, bank transfer or USSD through Paystack. Your card details never reach our servers.</li>
      </ol>

      <h2>Made-to-measure pieces</h2>
      <p>On any piece from the Creamic Apparel Designs line, choose <b>Made to measure</b> under Fit. Enter your bust, waist, hips and length, and add any fabric or colour notes. We confirm your measurements on WhatsApp before cutting. Tailored pieces are ready in 7–10 days.</p>

      <h2>After you order</h2>
      <p>You'll receive an email confirmation straight away, and a WhatsApp message from us with your delivery time. If anything is out of stock, we call you before dispatch and refund in full if you prefer.</p>
    </InfoPage>
  );
}