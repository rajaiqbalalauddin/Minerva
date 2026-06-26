// src/components/windows/UpgradeWindow.jsx
// Why: the premium paywall is its own overlay so the upsell can be triggered
// from anywhere (sidebar promo, profile nudge) without duplicating pricing copy.
// Billing state lives here because price/labels are all derived from it.
import { useEffect, useState } from "react";
import { Button } from "../ds/Button.jsx";
import heroArt from "../../assets/study-hero.png";

// The value list is fixed marketing copy — keep it as data, render in one loop.
const FEATURES = [
  { title: "AI Tutor chat", sub: "Ask questions, get instant help" },
  { title: "Unlimited focus sessions", sub: "No daily pomodoro cap" },
  { title: "Advanced budget insights", sub: "Weekly trends & forecasts" },
  { title: "Exclusive badges", sub: "Premium-only achievements" },
  { title: "Ad-free experience", sub: "Pure, distraction-free study" },
];

export default function UpgradeWindow({
  open = false,
  onClose = () => {},
  billing: initialBilling = "yearly", // default selection per handoff
  onCheckout = () => {},
  onMaybeLater = () => {},
}) {
  const [billing, setBilling] = useState(initialBilling);

  useEffect(() => {
    if (open) setBilling(initialBilling);
  }, [open, initialBilling]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // All pricing copy derives from the toggle — single source of truth.
  const yearly = billing === "yearly";
  const price = yearly ? "RM 15" : "RM 19";
  const saveNote = yearly ? "Billed yearly — save 20% 🎉" : "Billed monthly";
  const ctaLabel = yearly ? "Upgrade — RM 180/yr" : "Upgrade Now";

  // One pill renderer for both toggle options (active vs inactive styling).
  const Pill = ({ value, children }) => {
    const active = billing === value;
    return (
      <button
        onClick={() => setBilling(value)}
        style={{
          flex: 1,
          border: "none",
          cursor: active ? "default" : "pointer",
          borderRadius: 100,
          padding: "9px 0",
          fontFamily: "var(--font-meta)",
          fontWeight: 800,
          fontSize: 13,
          letterSpacing: ".3px",
          background: active ? "var(--mv-orange)" : "transparent",
          color: active ? "var(--mv-navy)" : "rgba(255,255,255,.7)",
          boxShadow: active ? "var(--shadow-soft)" : "none",
        }}
      >
        {children}
      </button>
    );
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(2,48,71,.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          display: "flex",
          width: 780,
          maxWidth: "100%",
          margin: "auto",
          background: "var(--mv-white)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-lift)",
          overflow: "hidden",
        }}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            width: 38,
            height: 38,
            border: "none",
            borderRadius: "var(--radius-pill)",
            background: "rgba(255,255,255,.16)",
            color: "#fff",
            fontSize: 18,
            lineHeight: 1,
            cursor: "pointer",
            zIndex: 2,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.3)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.16)")}
        >
          ✕
        </button>

        {/* LEFT: navy pricing panel */}
        <div
          style={{
            width: "42%",
            flexShrink: 0,
            background: "var(--mv-navy)",
            padding: "34px 30px",
            display: "flex",
            flexDirection: "column",
            color: "#fff",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-meta)",
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: "1.5px",
              color: "var(--mv-orange)",
            }}
          >
            MINERVA PRO
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 52, lineHeight: 0.92, marginTop: 8 }}>
            Go
            <br />
            Premium
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "rgba(255,255,255,.82)",
              marginTop: 12,
              lineHeight: 1.45,
            }}
          >
            Make studying feel like a game you're winning.
          </div>

          {/* Billing toggle */}
          <div
            style={{
              display: "flex",
              gap: 4,
              background: "rgba(255,255,255,.1)",
              borderRadius: "var(--radius-pill)",
              padding: 4,
              marginTop: 24,
            }}
          >
            <Pill value="monthly">Monthly</Pill>
            <Pill value="yearly">Yearly</Pill>
          </div>

          {/* Price */}
          <div style={{ marginTop: 24, display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 0.85, color: "var(--mv-orange)" }}>
              {price}
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "rgba(255,255,255,.78)" }}>
              / month
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--font-meta)",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: ".3px",
              color: "var(--mv-teal)",
              marginTop: 8,
            }}
          >
            {saveNote}
          </div>

          <div style={{ flex: 1 }} />
          <img
            src={heroArt}
            alt=""
            style={{ width: "100%", marginTop: 18, marginBottom: -34, objectFit: "contain" }}
          />
        </div>

        {/* RIGHT: features + CTA */}
        <div style={{ flex: 1, minWidth: 0, padding: "38px 34px 30px", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 30, color: "var(--mv-navy)", letterSpacing: ".5px" }}>
            Everything you get
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 22 }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{ display: "flex", alignItems: "flex-start", gap: 13 }}>
                <span
                  style={{
                    flexShrink: 0,
                    width: 26,
                    height: 26,
                    borderRadius: "var(--radius-pill)",
                    background: "var(--mv-teal)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 700,
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  ✓
                </span>
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16, color: "var(--mv-navy)" }}>
                    {f.title}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--mv-grey)", marginTop: 1 }}>
                    {f.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ marginTop: 26 }}>
            <Button variant="orange-navy" full onClick={() => onCheckout(billing)}>
              {ctaLabel}
            </Button>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
              <Button variant="ghost" size="sm" onClick={onMaybeLater}>
                Maybe later
              </Button>
            </div>
            <div style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: 12, color: "var(--mv-grey)", marginTop: 6 }}>
              Cancel anytime · No ads, ever
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
