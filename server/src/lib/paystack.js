import crypto from "crypto";

const BASE = "https://api.paystack.co";
const key = () => process.env.PAYSTACK_SECRET_KEY;

async function call(path, options = {}) {
  const res = await fetch(BASE + path, {
    ...options,
    headers: {
      Authorization: `Bearer ${key()}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.status === false) {
    throw new Error(body.message || `Paystack error ${res.status}`);
  }
  return body.data;
}

// amount in whole naira — Paystack wants kobo
export const initialize = ({ email, amount, reference, callbackUrl, metadata }) =>
  call("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email,
      amount: Math.round(amount * 100),
      currency: "NGN",
      reference,
      callback_url: callbackUrl,
      metadata,
    }),
  });

export const verify = (reference) =>
  call(`/transaction/verify/${encodeURIComponent(reference)}`);

// Paystack signs each webhook with HMAC-SHA512 of the raw body
export function validSignature(rawBody, signature) {
  if (!signature) return false;
  const hash = crypto.createHmac("sha512", key()).update(rawBody).digest("hex");
  const a = Buffer.from(hash);
  const b = Buffer.from(String(signature));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}