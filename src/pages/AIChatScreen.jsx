import { useState, useEffect } from "react";
import { PageHeader } from "../components/ds/PageHeader.jsx";
import { Avatar } from "../components/ds/Avatar.jsx";
import { Card } from "../components/ds/Card.jsx";
import { Button } from "../components/ds/Button.jsx";
import { Badge } from "../components/ds/Badge.jsx";
import { chatWithQwen } from "../services/qwen.js";
import { useChat } from "../hooks/useChat.js";
import { useNav } from "../context/NavContext.jsx";

// Shown only when there's no saved history yet (not persisted).
const GREETING = {
  id: "greeting",
  role: "ai",
  text: "Hi! I'm Minerva AI. I can help you plan study sessions, break down assignments, or give productivity tips. What would you like help with?",
};

// Reveals text one character at a time. Used for a freshly received AI reply so
// it "types" out; historical messages render instantly (no animation).
function Typewriter({ text, speed = 14 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(0);
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return <>{text.slice(0, count)}</>;
}

export default function AIChatScreen({ data }) {
  const { openProfile, goTasks } = useNav();
  const { messages, addMessage } = useChat(); // persisted in Firestore
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false); // waiting on the model
  const [animateId, setAnimateId] = useState(null); // id of the reply to type out

  // Fall back to the greeting bubble until the user has any saved messages.
  const view = messages.length ? messages : [GREETING];

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || busy) return;

    // Build the history for the model from real (persisted) turns + this one.
    const history = [...messages.map((m) => ({ role: m.role, text: m.text })), { role: "user", text }];
    setInput("");
    setBusy(true);
    await addMessage("user", text); // persist; listener re-renders the list

    try {
      const reply = await chatWithQwen(history);
      const ref = await addMessage("ai", reply);
      setAnimateId(ref?.id || null); // only this fresh reply animates
    } catch (err) {
      await addMessage("ai", `⚠️ ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  const SUGGESTIONS = ["Plan my study week", "Break down this assignment", "Productivity tips", "Explain Pomodoro technique"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <PageHeader
        title="AI Chat"
        date={data.today}
        actions={
          <>
            <Badge tone="navy">ELITE</Badge>
            <Button onClick={goTasks}>+ Task</Button>
            <Avatar name={data.user.name} size={56} onClick={openProfile} role="button" aria-label="Open profile" style={{ cursor: "pointer" }} />
          </>
        }
      />

      {/* Chat window */}
      <Card tone="light" pad={0} style={{ display: "flex", flexDirection: "column", minHeight: 460, overflow: "hidden" }}>
        {/* Messages */}
        <div
          style={{
            flex: 1,
            padding: 24,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {view.map((m) => (
            <div
              key={m.id}
              style={{
                display: "flex",
                gap: 12,
                maxWidth: "80%",
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                flexDirection: m.role === "user" ? "row-reverse" : "row",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: m.role === "ai" ? "var(--mv-navy)" : "var(--mv-blue)",
                  color: "var(--mv-white)",
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                }}
              >
                {m.role === "ai" ? "M" : data.user.name[0]}
              </div>
              <div
                style={{
                  borderRadius: "var(--radius-sm)",
                  padding: "14px 18px",
                  boxShadow: "var(--shadow-soft)",
                  background: m.role === "ai" ? "var(--mv-navy)" : "var(--mv-blue)",
                  color: "var(--mv-white)",
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.5,
                }}
              >
                {m.role === "ai" && m.id === animateId ? <Typewriter text={m.text} /> : m.text}
              </div>
            </div>
          ))}

          {/* Typing indicator while the model is thinking. */}
          {busy && (
            <div style={{ display: "flex", gap: 12, alignSelf: "flex-start" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--mv-navy)",
                  color: "var(--mv-white)",
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                }}
              >
                M
              </div>
              <div
                style={{
                  borderRadius: "var(--radius-sm)",
                  padding: "14px 18px",
                  boxShadow: "var(--shadow-soft)",
                  background: "var(--mv-navy)",
                  color: "rgba(255,255,255,.8)",
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                }}
              >
                Minerva is typing…
              </div>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div
          style={{
            display: "flex",
            gap: 10,
            padding: "16px 20px",
            borderTop: "2px solid var(--mv-navy)",
            background: "var(--mv-white)",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              background: "var(--mv-white)",
              border: "2px solid var(--mv-navy)",
              borderRadius: "var(--radius-sm)",
              padding: "10px 16px",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask Minerva AI anything\u2026"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: "var(--mv-navy)",
                minWidth: 0,
              }}
            />
          </span>
          <Button variant="primary" onClick={sendMessage} disabled={busy}>
            {busy ? "…" : "Send"}
          </Button>
        </div>
      </Card>

      {/* Suggestion chips */}
      <Card tone="light" pad={20}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--mv-navy)", marginBottom: 12 }}>
          Try asking:
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {SUGGESTIONS.map((s) => (
            <Badge key={s} tone="blue" soft style={{ cursor: "pointer" }} onClick={() => setInput(s)}>
              {s}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
