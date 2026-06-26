// src/context/AuthContext.jsx
// Why: a single source of truth for "who is logged in" plus the auth actions.
// Components read useAuth() instead of touching the Firebase SDK directly, so
// auth wiring stays in one place and is easy to swap or mock.
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "../firebase.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until first auth check

  // Subscribe once; Firebase fires this on load and on every login/logout.
  // If config is missing, skip the SDK entirely so we don't hang on a spinner.
  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Sign up, then set the display name so the UI has something to greet.
  const signup = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    return cred.user;
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const loginGoogle = () => signInWithPopup(auth, googleProvider);

  const logout = () => signOut(auth);

  const value = { user, loading, signup, login, loginGoogle, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Small hook so consumers don't import the context object directly.
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
