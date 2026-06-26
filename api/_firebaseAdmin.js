// api/_firebaseAdmin.js
// Why: the webhook + token verification need admin access to Firestore/Auth.
// Initialized once from a service-account JSON stored in an env var (so no key
// file lives in the repo). Shared by the other /api functions.
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

function serviceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT env var is not set.");
  return JSON.parse(raw); // paste the whole downloaded JSON as the value
}

// Reuse the app across warm invocations instead of re-initializing.
const app = getApps().length ? getApps()[0] : initializeApp({ credential: cert(serviceAccount()) });

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);
