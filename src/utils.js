import { WHATSAPP } from "./data/products";

export const naira = (n) => (n ? "₦" + n.toLocaleString("en-NG") : "Price on request");
export const wa = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;