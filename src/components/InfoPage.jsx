import { Link, NavLink } from "react-router-dom";

const PAGES = [
  { to: "/how-to-order", label: "How to order" },
  { to: "/delivery", label: "Delivery & returns" },
  { to: "/size-guide", label: "Size guide" },
  { to: "/track", label: "Track an order" },
];

export default function InfoPage({ title, intro, children }) {
  return (
    <>
      <div className="wrap crumbs"><Link to="/">Home</Link> / Help / {title}</div>
      <div className="wrap info">
        <aside className="infonav">
          <span className="sep">Help</span>
          {PAGES.map((p) => <NavLink key={p.to} to={p.to}>{p.label}</NavLink>)}
        </aside>
        <article className="infobody">
          <h1>{title}</h1>
          {intro && <p className="lead">{intro}</p>}
          {children}
          <div className="helpbox">
            <b>Still stuck?</b>
            <p>Message us on WhatsApp at <a href="https://wa.me/2349137897889" target="_blank" rel="noopener noreferrer">+234 913 789 7889</a>, Monday to Saturday.</p>
          </div>
        </article>
      </div>
    </>
  );
}