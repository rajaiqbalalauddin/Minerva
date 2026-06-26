import React from "react";

/**
 * Minerva StatCard — the blue finance/insight card: a centered pixel
 * caption, a big pixel value (often orange), and an optional footer
 * slot (button, chart, sparkline).
 */
export function StatCard({
  caption,
  value,
  valueColor = "var(--mv-orange)",
  tone = "blue",
  footer = null,
  children,
  align = "center",
  style = {},
  ...rest
}) {
  const tones = {
    blue: "var(--mv-blue)",
    navy: "var(--mv-navy)",
    teal: "var(--mv-teal)",
  };
  return (
    <div
      style={{
        background: tones[tone] || tones.blue,
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-pop)",
        padding: 24,
        color: "var(--mv-white)",
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        gap: 14,
        boxSizing: "border-box",
        ...style,
      }}
      {...rest}
    >
      {caption ? (
        <div style={{ fontFamily: "var(--font-display)", fontSize: 32, lineHeight: 1, letterSpacing: "var(--tracking-display)" }}>
          {caption}
        </div>
      ) : null}
      {value != null ? (
        <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--type-stat)", lineHeight: 1, color: valueColor }}>
          {value}
        </div>
      ) : null}
      {children}
      {footer ? <div style={{ width: "100%", marginTop: "auto" }}>{footer}</div> : null}
    </div>
  );
}
