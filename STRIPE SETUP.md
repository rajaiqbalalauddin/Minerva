# Stripe Setup (Vercel — no Firebase Functions, no card)

Payments run on two Vercel serverless functions in `/api`:

- `api/create-checkout-session.js` — verifies the user's Firebase ID token and
  returns a Stripe Checkout URL.
- `api/stripe-webhook.js` — verifies Stripe's signature and sets the user's
  `plan` to `Premium` in Firestore. The live profile listener updates the UI.

Vercel's free (Hobby) tier covers this — no billing card anywhere. The secret
key never reaches the browser.

> The `functions/` folder (Firebase Functions version) is no longer used. You can
> delete it, or ignore it — Vercel doesn't touch it.

## 1. Stripe
1. Create a Stripe account; stay in **Test mode**.
2. Products → **Minerva Premium** with two **recurring** prices (monthly + yearly).
   Copy each **Price ID** (`price_…`).
3. Developers → API keys → copy the **Secret key** (`sk_test_…`).

## 2. Firebase service-account key
The webhook writes to Firestore as admin, so it needs a service account:
Firebase console → ⚙ Project settings → **Service accounts** → **Generate new
private key** → download the JSON. Keep it secret (it's like a password).

## 3. Deploy to Vercel
1. Push this repo to GitHub (or run `npx vercel`).
2. In [vercel.com](https://vercel.com): **Add New → Project** → import the repo.
   Vercel auto-detects Vite; the `/api` folder becomes serverless functions.
3. Deploy once to get your app URL, e.g. `https://minerva-xyz.vercel.app`.

## 4. Environment variables (Vercel → Project → Settings → Environment Variables)
Add these (Production + Preview + Development):

| Name | Value |
|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_…` |
| `STRIPE_PRICE_MONTHLY` | `price_…` (monthly) |
| `STRIPE_PRICE_YEARLY` | `price_…` (yearly) |
| `APP_URL` | your Vercel app URL |
| `FIREBASE_SERVICE_ACCOUNT` | paste the **entire** downloaded JSON as one value |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` (from step 5) |

Redeploy after changing env vars.

## 5. Stripe webhook
Stripe → Developers → Webhooks → **Add endpoint**:
- URL: `https://<your-app>.vercel.app/api/stripe-webhook`
- Events: `checkout.session.completed` and `customer.subscription.deleted`

Copy the **Signing secret** (`whsec_…`) into `STRIPE_WEBHOOK_SECRET`, then redeploy.

## 6. Test
Open your deployed app, click Upgrade, pay with Stripe's test card:

```
4242 4242 4242 4242 — any future expiry, any CVC, any postcode
```

You return with `?upgrade=success`, the webhook fires, and your plan shows
**Premium** (badge turns teal, nudge disappears).

## Local testing (optional)
`npm run dev` (Vite alone) won't serve `/api`. Two options:

- **Easiest:** test on the deployed Vercel URL.
- **Local full stack:** `npx vercel dev` serves the app *and* `/api` on one port
  (usually `http://localhost:3000`). For local webhooks, install the Stripe CLI and run:
  ```
  stripe listen --forward-to localhost:3000/api/stripe-webhook
  ```
  It prints a `whsec_…` to use as `STRIPE_WEBHOOK_SECRET` locally.

If you ever run the app and the API on different origins, set `VITE_API_BASE` in
`.env.local` to the API origin. Same-origin (Vercel / `vercel dev`) needs nothing.

## Going live
Swap test keys/prices for live ones, set `APP_URL` to the production URL, redeploy.
The Premium badge and Upgrade nudge already key off the real `plan` field.
