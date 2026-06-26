// src/firebase.js
// Why: one place initializes Firebase so the whole app shares a single app
// instance. Auth + Firestore handles are exported for the context layer to use.
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Pulled from .env.local (Vite exposes only VITE_-prefixed vars to the client).
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// True only when the web config is actually filled in. Initializing Firebase
// with empty values throws "auth/invalid-api-key" and blanks the whole app, so
// we gate on this and show a friendly setup screen instead.
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let app = null;
let auth = null;
let db = null;
let googleProvider = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
} else {
  console.warn(
    "[Minerva] Firebase env vars are empty. Fill .env.local with your " +
      "Firebase web config, then restart `npm run dev`. See BACKEND SETUP.md."
  );
}

export { auth, db, googleProvider };
export default app;
