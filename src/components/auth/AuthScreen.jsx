// src/components/auth/AuthScreen.jsx
// Why: the gate users hit when logged out. One screen toggles between Login and
// Sign up to avoid duplicating the form layout. Styled with DS tokens/components.
import { useState } from "react";
import { Button } from "../ds/Button.jsx";
import { Input } from "../ds/Input.jsx";
import logo from "../../assets/minerva-logo.png";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AuthScreen() {
  const { signup, login, loginGoogle } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const isSignup = mode === "signup";

  // One submit path for both modes; errors surface inline rather than throwing.
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (isSignup) await signup(name.trim(), email.trim(), password);
      else await login(email.trim(), password);
    } catch (err) {
      setError(prettyError(err));
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setError("");
    setBusy(true);
    try {
      await loginGoogle();
    } catch (err) {
      setError(prettyError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "var(--mv-navy)",
      }}
    >
      <div
        style={{
          width: 420,
          maxWidth: "100%",
          background: "var(--mv-white)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-lift)",
          padding: "36px 32px",
        }}
      >
        <img src={logo} alt="Minerva" style={{ height: 64, display: "block", margin: "0 auto 18px" }} />
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 34,
            color: "var(--mv-navy)",
            textAlign: "center",
            margin: "0 0 6px",
          }}
        >
          {isSignup ? "Create account" : "Welcome back"}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "var(--mv-grey)",
            textAlign: "center",
            margin: "0 0 24px",
          }}
        >
          {isSignup ? "Start studying smarter with Minerva." : "Log in to your study dashboard."}
        </p>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {isSignup && (
            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Raja Kumar" />
          )}
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@student.edu"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {error && (
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--mv-red)" }}>{error}</div>
          )}

          <Button variant="primary" full disabled={busy} type="submit">
            {busy ? "Please wait…" : isSignup ? "Sign Up" : "Log In"}
          </Button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0" }}>
          <span style={{ flex: 1, height: 1, background: "#e3e8eb" }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--mv-grey)" }}>or</span>
          <span style={{ flex: 1, height: 1, background: "#e3e8eb" }} />
        </div>

        <Button variant="ghost" full disabled={busy} onClick={google} style={{ border: "2px solid var(--mv-navy)" }}>
          Continue with Google
        </Button>

        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--mv-grey)", textAlign: "center", marginTop: 22 }}>
          {isSignup ? "Already have an account?" : "New to Minerva?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(isSignup ? "login" : "signup");
              setError("");
            }}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "var(--mv-orange)",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 600,
              padding: 0,
            }}
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}

// Turn Firebase error codes into something a human wants to read.
function prettyError(err) {
  const code = err?.code || "";
  const map = {
    "auth/invalid-email": "That email doesn't look right.",
    "auth/missing-password": "Please enter a password.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/email-already-in-use": "An account with that email already exists.",
    "auth/invalid-credential": "Wrong email or password.",
    "auth/user-not-found": "No account with that email.",
    "auth/wrong-password": "Wrong email or password.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
  };
  return map[code] || err?.message || "Something went wrong. Try again.";
}
