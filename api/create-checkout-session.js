// api/create-checkout-session.js
// Why: a Vercel serverless function that makes a Stripe Checkout Session for the
// signed-in user. The client sends its Firebase ID token; we verify it server
// side so the secret key (and the user's identity) never live in the browser.
import Stripe from "stripe";
import { adminAuth } from "./_firebaseAdmin.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Verify the caller via their Firebase ID token.
    const authz = req.headers.authorization || "";
    const token = authz.startsWith("Bearer ") ? authz.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Missing auth token" });

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    const billing = req.body?.billing === "monthly" ? "monthly" : "yearly";
    const price = billing === "monthly" ? process.env.STRIPE_PRICE_MONTHLY : process.env.STRIPE_PRICE_YEARLY;
    if (!price) return res.status(500).json({ error: "Stripe price IDs are not configured." });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const appUrl = process.env.APP_URL || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      client_reference_id: uid, // so the webhook knows who paid
      metadata: { uid },
      customer_email: decoded.email,
      success_url: `${appUrl}/?upgrade=success`,
      cancel_url: `${appUrl}/?upgrade=cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error("create-checkout-session:", e);
    return res.status(500).json({ error: e.message });
  }
}
