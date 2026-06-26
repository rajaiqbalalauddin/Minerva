// functions/index.js
// Why: Stripe's secret key and payment confirmation must live server-side. Two
// functions handle the whole flow:
//   createCheckoutSession  - (callable) makes a Stripe Checkout Session for the
//                            signed-in user and returns its hosted URL.
//   stripeWebhook          - (HTTP) Stripe calls this after payment; we verify
//                            the signature and flip the user to Premium.
//
// Firebase Functions v2. Secrets are set with `firebase functions:secrets:set`,
// non-secret config (price IDs, app URL) via functions/.env.
import { onCall, onRequest, HttpsError } from "firebase-functions/v2/https";
import { defineSecret, defineString } from "firebase-functions/params";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import Stripe from "stripe";

initializeApp();

const REGION = "asia-southeast1"; // Singapore — closest to KL

const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");
const PRICE_MONTHLY = defineString("STRIPE_PRICE_MONTHLY");
const PRICE_YEARLY = defineString("STRIPE_PRICE_YEARLY");
const APP_URL = defineString("APP_URL", { default: "http://localhost:5173" });

// Create a Checkout Session for the current user and hand back its URL.
export const createCheckoutSession = onCall(
  { secrets: [STRIPE_SECRET_KEY], region: REGION },
  async (req) => {
    if (!req.auth) throw new HttpsError("unauthenticated", "Please sign in first.");

    const billing = req.data?.billing === "monthly" ? "monthly" : "yearly";
    const price = billing === "monthly" ? PRICE_MONTHLY.value() : PRICE_YEARLY.value();
    if (!price) throw new HttpsError("failed-precondition", "Stripe price IDs are not configured.");

    const stripe = new Stripe(STRIPE_SECRET_KEY.value());
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      client_reference_id: req.auth.uid, // so the webhook knows who paid
      metadata: { uid: req.auth.uid },
      customer_email: req.auth.token?.email,
      success_url: `${APP_URL.value()}/?upgrade=success`,
      cancel_url: `${APP_URL.value()}/?upgrade=cancel`,
    });
    return { url: session.url };
  }
);

// Stripe -> us. Verify the signature, then mark the payer Premium.
export const stripeWebhook = onRequest(
  { secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET], region: REGION },
  async (req, res) => {
    const stripe = new Stripe(STRIPE_SECRET_KEY.value());
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers["stripe-signature"],
        STRIPE_WEBHOOK_SECRET.value()
      );
    } catch (err) {
      console.error("Webhook signature check failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Successful checkout -> grant Premium.
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const uid = session.client_reference_id || session.metadata?.uid;
      if (uid) {
        await getFirestore().doc(`users/${uid}`).set(
          { plan: "Premium", stripeCustomerId: session.customer || null },
          { merge: true }
        );
      }
    }

    // Subscription ended/cancelled -> drop back to Free.
    if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object;
      const snap = await getFirestore()
        .collection("users")
        .where("stripeCustomerId", "==", sub.customer)
        .limit(1)
        .get();
      if (!snap.empty) await snap.docs[0].ref.set({ plan: "Free" }, { merge: true });
    }

    res.json({ received: true });
  }
);
