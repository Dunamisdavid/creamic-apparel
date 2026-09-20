export const naira = (n) => (n ? "₦" + n.toLocaleString("en-NG") : "Price on request");
export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");