import { useEffect, useState } from "react";
import { LAUNCH } from "../data/products";
import { wa } from "../utils";

function timeLeft() {
  const ms = LAUNCH - Date.now();
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 864e5),
    hours: Math.floor(ms / 36e5) % 24,
    mins: Math.floor(ms / 6e4) % 60,
  };
}

export default function Launch() {
  const [left, setLeft] = useState(timeLeft());

  useEffect(() => {
    const t = setInterval(() => setLeft(timeLeft()), 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="launch" id="designs">
      <div className="wrap">
        <div>
          <h2>Creamic Apparel Designs launches 26 September</h2>
          <p>Our own womenswear line, tailored and ready-to-wear, unveiled at our one-year Sip &amp; Shop: 11am to 7pm, No 39 Ebitu Ukiwe, Garden Bridge Residence, Jabi. 30% off selected items on the day.</p>
          <div className="cta-row">
            <a className="btn gold" target="_blank" rel="noopener"
               href={wa("Hello Creamic Apparel, I'll be at the Sip & Shop launch on 26 September.")}>
              Tell us you're coming
            </a>
          </div>
        </div>
        <div className="count" aria-live="polite">
          {left ? (
            Object.entries(left).map(([label, v]) => (
              <div key={label}><b>{v}</b><small>{label}</small></div>
            ))
          ) : (
            <div><b>Now</b><small>open</small></div>
          )}
        </div>
      </div>
    </div>
  );
}