import InfoPage from "../../components/InfoPage";
import { ZONES, FREE_OVER } from "../../lib/shipping";
import { naira } from "../../lib/format";

export default function Delivery() {
  return (
    <InfoPage title="Delivery & returns" intro="Where we deliver, what it costs, and how returns work.">
      <h2>Delivery</h2>
      <div className="tablewrap">
        <table className="info-table">
          <thead><tr><th>Location</th><th>Fee</th><th>Arrives</th></tr></thead>
          <tbody>
            {ZONES.map((z) => (
              <tr key={z.key}>
                <td>{z.label}</td>
                <td>{z.fee === 0 ? "Free" : naira(z.fee)}</td>
                <td>{z.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Delivery is free on orders over {naira(FREE_OVER)}, excluding collection. Orders placed after 3pm, or on Sunday, dispatch the next working day.</p>

      <h2>Returns</h2>
      <p>You can return items within <b>7 days</b> of delivery if they are unworn, unwashed, and have the Creamic Apparel tag still attached.</p>
      <ul className="dots">
        <li>Message us on WhatsApp with your order number and the item you are returning.</li>
        <li>Bring it to the Wuye shop, or we arrange pickup within Abuja for a small fee.</li>
        <li>Refunds go back to your original payment method within 5 working days of us receiving the item.</li>
      </ul>

      <h2>What we can't take back</h2>
      <ul className="dots">
        <li>Made-to-measure pieces, since they are cut to your numbers.</li>
        <li>Jewellery and earrings, for hygiene reasons.</li>
        <li>Items bought at a discount of 30% or more, unless they arrive faulty.</li>
      </ul>

      <h2>Wrong or faulty item</h2>
      <p>If something arrives damaged or isn't what you ordered, tell us within 48 hours with a photo. We replace it or refund you in full, including delivery.</p>
    </InfoPage>
  );
}