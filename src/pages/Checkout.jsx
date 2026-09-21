import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { naira } from "../lib/format";
import { ZONES, feeFor, zoneByKey, FREE_OVER } from "../lib/shipping";

const required = ["name", "phone", "email", "address", "city"];

export default function Checkout() {
    const { items, subtotal, clear } = useCart();
    const navigate = useNavigate();
    const [form, setForm] = useState({ zone: "abuja" });
    const [errors, setErrors] = useState({});
    const [busy, setBusy] = useState(false);

    const zone = zoneByKey(form.zone);
    const pickup = zone.key === "pickup";
    const fee = feeFor(form.zone, subtotal);
    const total = subtotal + fee;

    if (items.length === 0) {
        return (
            <div className="wrap pad center">
                <h1>Nothing to check out</h1>
                <Link className="btn brown lg" to="/shop" style={{ marginTop: "1.2rem" }}>Back to shop</Link>
            </div>
        );
    }

    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    function validate() {
        const next = {};
        const needed = pickup ? ["name", "phone", "email"] : required;

        needed.forEach((k) => {
            if (!form[k]?.trim()) next[k] = "Required";
        });
        if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Check this email address";
        if (form.phone && form.phone.replace(/\D/g, "").length < 10) next.phone = "Check this phone number";

        setErrors(next);
        return Object.keys(next).length === 0;
    }

    const API = import.meta.env.VITE_API_URL;
    const [serverError, setServerError] = useState("");

    async function handlePay(e) {
        e.preventDefault();
        if (!validate()) return;
        setBusy(true);
        setServerError("");

        try {
            const res = await fetch(`${API}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: items.map((i) => ({
                        id: i.id, name: i.name, qty: i.qty, size: i.size, color: i.color, measurements: i.measurements,
                    })),
                    customer: { name: form.name, phone: form.phone, email: form.email },
                    delivery: { zone: form.zone, address: form.address, city: form.city, landmark: form.landmark },
                    notes: form.notes,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                if (data.fields) setErrors(data.fields);
                setServerError(data.error || "Something went wrong.");
                setBusy(false);
                return;
            }

            window.location.href = data.authorizationUrl; // off to Paystack
        } catch {
            setServerError("Couldn't reach the store. Check your connection and try again.");
            setBusy(false);
        }
    }

    return (
        <>
            <div className="wrap crumbs"><Link to="/cart">Cart</Link> / Checkout</div>

            <form className="wrap pad cartgrid" onSubmit={handlePay}>
                <div>
                    <h2>Delivery details</h2>

                    <div className="two">
                        <Field id="name" label="Full name" value={form.name} onChange={set("name")} err={errors.name} />
                        <Field id="phone" label="Phone (WhatsApp)" type="tel" value={form.phone} onChange={set("phone")} err={errors.phone} />
                    </div>

                    <Field id="email" label="Email (for your receipt)" type="email" value={form.email} onChange={set("email")} err={errors.email} />

                    <div className="field">
                        <label htmlFor="zone">Delivery option</label>
                        <select id="zone" value={form.zone} onChange={set("zone")}>
                            {ZONES.map((z) => (
                                <option key={z.key} value={z.key}>
                                    {z.label} — {z.fee === 0 ? "free" : naira(z.fee)}
                                </option>
                            ))}
                        </select>
                        <p className="muted" style={{ fontSize: ".82rem", marginTop: ".35rem" }}>{zone.eta}</p>
                    </div>

                    {!pickup && (
                        <>
                            <Field id="address" label="Delivery address" value={form.address} onChange={set("address")} err={errors.address} />
                            <div className="two">
                                <Field id="city" label="City / area" value={form.city} onChange={set("city")} err={errors.city} />
                                <Field id="landmark" label="Nearest landmark (optional)" value={form.landmark} onChange={set("landmark")} />
                            </div>
                        </>
                    )}

                    <div className="field">
                        <label htmlFor="notes">Order notes (optional)</label>
                        <textarea id="notes" rows={3} value={form.notes || ""} onChange={set("notes")} />
                    </div>
                </div>

                <aside className="summary">
                    <h3>Your order</h3>

                    {items.map((i, n) => (
                        <div className="sline" key={n}>
                            <span>
                                {i.qty} × {i.name}
                                <br />
                                <span className="muted" style={{ fontSize: ".8rem" }}>
                                    {[i.color, i.size].filter(Boolean).join(" · ")}
                                </span>
                            </span>
                            <span>{naira(i.price * i.qty)}</span>
                        </div>
                    ))}

                    <div className="sline" style={{ borderTop: "1px solid var(--rule)", marginTop: ".5rem", paddingTop: ".8rem" }}>
                        <span>Subtotal</span><span>{naira(subtotal)}</span>
                    </div>
                    <div className="sline">
                        <span>Delivery</span>
                        <span>{fee === 0 ? (pickup ? "Free pickup" : "Free") : naira(fee)}</span>
                    </div>
                    {!pickup && subtotal < FREE_OVER && (
                        <p className="muted" style={{ fontSize: ".8rem" }}>
                            Spend {naira(FREE_OVER - subtotal)} more for free delivery.
                        </p>
                    )}
                    <div className="sline total"><span>Total</span><span>{naira(total)}</span></div>

                    <button className="btn brown block lg" style={{ marginTop: "1rem" }} disabled={busy}>
                        {busy ? "Taking you to payment…" : `Pay ${naira(total)}`}
                    </button>
                    <p className="muted" style={{ fontSize: ".8rem", marginTop: ".9rem" }}>
                        You'll pay on Paystack's secure page. Card details never reach our servers.
                    </p>
                </aside>
            </form>
        </>
    );
}

function Field({ id, label, err, ...rest }) {
    return (
        <div className="field">
            <label htmlFor={id}>{label}</label>
            <input id={id} aria-invalid={!!err} {...rest} />
            {err && <div className="err">{err}</div>}
        </div>
    );
}