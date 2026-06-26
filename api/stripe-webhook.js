// api/stripe-webhook.js
// Why: Stripe calls this after a payment. We verify the signature against the
// RAW request body (so bodyParser is disabled), then mark the payer Premium in
// Firestore. This is the piece that makes the upgrade trustworthy.
import Stripe from "stripe";
import { adminDb } from "./_firebaseAdmin.js";

// Stripe signature verification needs the unparsed body.
export const config = { api: { bodyParser: false } };

// Collect the raw request body as a Buffer.
async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let event;
  try {
    const raw = await readRawBody(req);
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature check failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Successful checkout -> grant Premium.
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const uid = session.client_reference_id || session.metadata?.uid;
      if (uid) {
        await adminDb.doc(`users/${uid}`).set(
          { plan: "Premium", stripeCustomerId: session.customer || null },
          { merge: true }
        );
      }
    }

    // Subscription cancelled/ended -> back to Free.
    if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object;
      const snap = await adminDb.collection("users").where("stripeCustomerId", "==", sub.customer).limit(1).get();
      if (!snap.empty) await snap.docs[0].ref.set({ plan: "Free" }, { merge: true });
    }

    return res.status(200).json({ received: true });
  } catch (e) {
    console.error("stripe-webhook:", e);
    return res.status(500).json({ error: e.message });
  }
}
