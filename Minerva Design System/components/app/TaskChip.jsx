import React from "react";

/**
 * Minerva TaskChip — a colored task block: pixel title + Lexend-Deca
 * time line, with the hard drop shadow. Tone is driven by urgency.
 */
export function TaskChip({
  title,
  time,
  tone = "red",
  done = false,
  onClick,
  style = {},
  ...rest
}) {
  const tones = {
    red:    "var(--mv-red)",
    orange: "var(--mv-orange)",
    teal:   "var(--mv-teal)",
    blue:   "var(--mv-blue)",
    navy:   "var(--mv-navy)",
  };
  return (
    <div
      onClick={onClick}
      style={{
        background: tones[tone] || tones.red,
        borderRadius: "var(--radius-sm)",
        boxShadow: "var(--shadow-pop)",
        padding: "16px 20px",
        color: "var(--mv-white)",
        cursor: onClick ? "pointer" : "default",
        opacity: done ? 0.55 : 1,
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 32,
          lineHeight: 1,
          letterSpacing: "var(--tracking-display)",
          textDecoration: done ? "line-through" : "none",
        }}
      >
        {title}
      </div>
      {time ? (
        <div
          style={{
            marginTop: 8,
            fontFamily: "var(--font-meta)",
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: "var(--tracking-meta)",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {time}
        </div>
      ) : null}
    </div>
  );
}
