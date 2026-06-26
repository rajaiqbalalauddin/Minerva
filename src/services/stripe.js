// src/services/stripe.js
// Why: the client never touches Stripe's secret key. It sends the user's Firebase
// ID token to our Vercel function, which verifies it and returns a Checkout URL
// to redirect to. After payment the webhook flips the user to Premium and the
// live profile listener updates the UI.
import { auth } from "../firebase.js";

// Same-origin by default (works on Vercel and with `vercel dev`). Set
// VITE_API_BASE to your deployed URL if the app and API are on different origins.
const API_BASE = import.meta.env.VITE_API_BASE || "";

// billing: "monthly" | "yearly". Redirects the browser to Stripe Checkout.
export async function startCheckout(billing = "yearly") {
  const user = auth?.currentUser;
  if (!user) throw new Error("Please sign in first.");

  const token = await user.getIdToken();
  const res = await fetch(`${API_BASE}/api/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ billing }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) {
    throw new Error(data.error || "Couldn't start checkout. Is the API deployed and configured?");
  }
  window.location.assign(data.url);
}
