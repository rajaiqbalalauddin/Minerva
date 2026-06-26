// src/components/windows/ProfileWindow.jsx
// Why: the account modal is a self-contained overlay so any screen can pop it
// without owning its layout. It only needs open/close + a few account handlers,
// keeping the parent (App) free of profile-form details.
import { useEffect, useState } from "react";
import { Avatar } from "../ds/Avatar.jsx";
import { Badge } from "../ds/Badge.jsx";
import { Input } from "../ds/Input.jsx";
import { Button } from "../ds/Button.jsx";

export default function ProfileWindow({
  open = false,
  onClose = () => {},
  plan = "Free", // "Free" | "Premium" — controls nudge + badge
  name: initialName = "Raja Kumar",
  email: initialEmail = "raja.kumar@student.edu",
  stats = { streak: 0, sessions: 0, badges: 0 }, // live counts from Firestore
  onSave = () => {},
  onLogout = () => {},
  onUpgrade = () => {},
}) {
  // Colored stat tiles, fed by live counts. Kept as data so the markup is one map.
  const STATS = [
    { value: stats.streak, label: "DAY STREAK", bg: "var(--mv-orange-soft)" },
    { value: stats.sessions, label: "SESSIONS", bg: "var(--mv-teal-soft)" },
    { value: stats.badges, label: "BADGES", bg: "var(--mv-blue-soft)" },
  ];

  // Local form state so typing is instant; parent only hears about it on Save.
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  // Re-seed the form whenever the modal (re)opens with new account values.
  useEffect(() => {
    if (open) {
      setName(initialName);
      setEmail(initialEmail);
    }
  }, [open, initialName, initialEmail]);

  // Esc closes — standard modal affordance.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const isFree = plan === "Free";

  return (
    // Scrim: dimmed navy wash; scrolls on short viewports so the card never clips.
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
      {/* stopPropagation so clicks inside the card don't dismiss it */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: 520,
          maxWidth: "100%",
          margin: "auto",
          background: "var(--mv-white)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-lift)",
          overflow: "hidden",
        }}
      >
        {/* Navy header band */}
        <div style={{ position: "relative", height: 128, background: "var(--mv-navy)" }}>
          <div
            style={{
              position: "absolute",
              top: 22,
              left: 28,
              fontFamily: "var(--font-display)",
              fontSize: 30,
              color: "#fff",
              letterSpacing: ".5px",
            }}
          >
            Profile
          </div>
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
              background: "rgba(255,255,255,.14)",
              color: "#fff",
              fontSize: 18,
              lineHeight: 1,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.26)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.14)")}
          >
            ✕
          </button>
        </div>

        {/* Body — avatar overlaps the band, everything else stacks centered */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: -56,
            padding: "0 28px 28px",
          }}
        >
          <div
            style={{
              borderRadius: "var(--radius-pill)",
              padding: 5,
              background: "var(--mv-white)",
              boxShadow: "var(--shadow-pop)",
            }}
          >
            <Avatar name={name} size={100} />
          </div>

          <div style={{ fontFamily: "var(--font-hero)", fontSize: 30, color: "var(--mv-navy)", marginTop: 12 }}>
            {name}
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--mv-grey)", marginTop: 2 }}>
            {email}
          </div>

          <div style={{ marginTop: 12 }}>
            <Badge tone={isFree ? "grey" : "teal"} soft dot>
              {isFree ? "Free plan" : "Premium"}
            </Badge>
          </div>

          {/* Stat tiles */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
              width: "100%",
              marginTop: 24,
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  background: s.bg,
                  borderRadius: "var(--radius-sm)",
                  boxShadow: "var(--shadow-soft)",
                  padding: "16px 10px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontSize: 38, lineHeight: 1, color: "var(--mv-navy)" }}>
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-meta)",
                    fontWeight: 800,
                    fontSize: 12,
                    color: "var(--mv-navy)",
                    marginTop: 6,
                    letterSpacing: ".2px",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Editable fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", marginTop: 24 }}>
            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          {/* Upgrade nudge — free plan only */}
          {isFree && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                width: "100%",
                marginTop: 20,
                background: "var(--mv-blue)",
                borderRadius: "var(--radius-blob)",
                boxShadow: "var(--shadow-soft)",
                padding: "16px 18px",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#fff", lineHeight: 1 }}>
                  Unlock AI Tutor
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,.88)", marginTop: 4 }}>
                  Go Premium for unlimited focus &amp; AI help.
                </div>
              </div>
              <Button variant="orange-navy" size="sm" onClick={onUpgrade}>
                Upgrade
              </Button>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 14, width: "100%", marginTop: 24 }}>
            <Button variant="primary" full onClick={() => onSave({ name, email })}>
              Save Changes
            </Button>
            <Button variant="ghost" onClick={onLogout}>
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
