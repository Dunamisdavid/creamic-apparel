import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LAUNCH } from "../data/products";

function remaining() {
  const ms = LAUNCH - Date.now();
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 864e5),
    hours: Math.floor(ms / 36e5) % 24,
    mins: Math.floor(ms / 6e4) % 60,
    secs: Math.floor(ms / 1e3) % 60,
  };
}

export default function Launch() {
  const [left, setLeft] = useState(remaining);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setLeft(remaining()), 1000);
    return () => clearInterval(t);
  }, []);

  function subscribe(e) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return;
    // TODO: POST to the API once the backend exists
    console.log("Subscriber:", email);
    setSent(true);
  }

  return (
    <div className="launchpage">
      <section className="lhero">
        <div className="wrap">
          <span className="eyebrow">Abuja · One year of Creamic Apparel</span>
          <h1>The new line drops<br />26 September.</h1>
          <p>
            Our own womenswear, cut in the Abuja workshop, unveiled at our anniversary Sip &amp; Shop.
            The online store opens the same day.
          </p>

          {left ? (
            <div className="counter" aria-live="polite">
              {[["days", left.days], ["hours", left.hours], ["mins", left.mins], ["secs", left.secs]].map(
                ([label, value]) => (
                  <div key={label}>
                    <b>{String(value).padStart(2, "0")}</b>
                    <span>{label}</span>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="counter"><div><b>Open</b><span>now</span></div></div>
          )}

          <div className="lcta">
            <a className="btn brown lg" href="https://wa.me/2349137897889?text=I%20will%20be%20at%20the%20Sip%20%26%20Shop%20on%2026%20September."
               target="_blank" rel="noopener">Tell us you're coming</a>
            <Link className="btn outline lg" to="/shop">Preview the shop</Link>
          </div>
        </div>
      </section>

      <div className="trust"><div className="wrap">
        <div>26 September<span>Sip &amp; Shop, 11am – 7pm</span></div>
        <div>Garden Bridge Residence<span>No 39 Ebitu Ukiwe, Jabi</span></div>
        <div>30% off<span>Selected items on the day</span></div>
        <div>Online from the 26th<span>Card, transfer &amp; USSD</span></div>
      </div></div>

      <section className="pad">
        <div className="wrap">
          <div className="head"><h2>What's Coming</h2></div>
          <div className="lgrid">
            <div>
              <h3>The in-house line</h3>
              <p>Kaftans, robe dresses and evening gowns cut in our own workshop. Ready-to-wear on the rail, or made to your measurements in 7–10 days.</p>
            </div>
            <div>
              <h3>Shop online</h3>
              <p>Everything in the Wuye shop, priced and in stock on the site. Pay by card, transfer or USSD and have it delivered.</p>
            </div>
            <div>
              <h3>Nationwide delivery</h3>
              <p>Same day within Abuja on orders before 3pm, 2–5 working days to every other state, or collect from the shop.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pad soft-bg">
        <div className="wrap center" style={{ maxWidth: "34rem" }}>
          <h2>Be told the moment it opens</h2>
          <p className="muted" style={{ marginTop: ".6rem" }}>
            One email on launch day with the first pieces and the discount code. Nothing else.
          </p>

          {sent ? (
            <p style={{ marginTop: "1.4rem", fontWeight: 500 }}>
              You're on the list. See you on the 26th.
            </p>
          ) : (
            <form className="lform" onSubmit={subscribe}>
              <input
                type="email" required placeholder="you@email.com" aria-label="Email address"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn brown" type="submit">Notify me</button>
            </form>
          )}

          <p className="muted" style={{ fontSize: ".85rem", marginTop: "1.6rem" }}>
            Or message us on WhatsApp: <a href="tel:+2349137897889">+234 913 789 7889</a>
          </p>
        </div>
      </section>
    </div>
  );
}