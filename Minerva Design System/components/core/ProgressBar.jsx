import React from "react";

/**
 * Minerva ProgressBar — rounded track with a colored fill. Used for
 * budget usage, badge progress, pomodoro session progress.
 */
export function ProgressBar({
  value = 0,
  max = 100,
  tone = "orange",
  height = 16,
  showLabel = false,
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fills = {
    orange: "var(--mv-orange)",
    teal: "var(--mv-teal)",
    blue: "var(--mv-blue)",
    red: "var(--mv-red)",
    navy: "var(--mv-navy)",
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, ...style }} {...rest}>
      <div
        style={{
          flex: 1,
          height,
          background: "#e3e8ec",
          borderRadius: 999,
          overflow: "hidden",
          boxShadow: "var(--shadow-inset)",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: fills[tone] || fills.orange,
            borderRadius: 999,
            transition: "width 300ms cubic-bezier(.34,1.4,.64,1)",
          }}
        />
      </div>
      {showLabel ? (
        <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--mv-navy)", minWidth: 52, textAlign: "right" }}>
          {Math.round(pct)}%
        </span>
      ) : null}
    </div>
  );
}
