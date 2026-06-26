// src/components/tabs/AIChatTab.jsx
// AI chat interface — elite-tier feature with a simple message exchange UI.
import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import styles from "./AIChatTab.module.css";

const INITIAL_MESSAGES = [
  { id: 1, role: "ai",   text: "Hi! I'm Minerva AI. I can help you plan study sessions, break down assignments, or give productivity tips. What would you like help with?" },
  { id: 2, role: "user", text: "Can you help me plan my study schedule for finals?" },
  { id: 3, role: "ai",   text: "Of course! Let's start by listing your subjects and exam dates. How many subjects do you have, and when is your first exam?" },
];

export default function AIChatTab() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), role: "user", text };
    // Mock AI reply — in production this would call the Qwen API.
    const aiMsg = {
      id: Date.now() + 1,
      role: "ai",
      text: "That's a great question! I'm a mock response for now — the AI backend will be connected soon. Keep building!",
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className={styles.tab}>
      {/* Elite badge + header */}
      <div className={styles.headerRow}>
        <span className={styles.eliteBadge}>ELITE</span>
        <h3 className={styles.title}>AI Study Assistant</h3>
      </div>

      {/* Chat window */}
      <div className={styles.chatWindow}>
        <div className={styles.messageList}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={m.role === "ai" ? styles.msgAi : styles.msgUser}
            >
              <div className={styles.msgAvatar}>
                {m.role === "ai" ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={styles.msgBubble}>
                <p className={styles.msgText}>{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div className={styles.inputBar}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask Minerva AI anything..."
            className={styles.chatInput}
          />
          <button className={styles.sendBtn} onClick={sendMessage}>
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Suggestion chips */}
      <div className={styles.suggestions}>
        <p className={styles.suggestLabel}>Try asking:</p>
        <div className={styles.chipRow}>
          {[
            "Plan my study week",
            "Break down this assignment",
            "Productivity tips",
            "Explain Pomodoro technique",
          ].map((s) => (
            <button
              key={s}
              className={styles.chip}
              onClick={() => { setInput(s); }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
