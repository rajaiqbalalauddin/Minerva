import React from "react";

/**
 * Minerva Badge — a small status pill. Solid (status colors) or soft
 * (pastel tint). Pixel label by default.
 */
export function Badge({
  children,
  tone = "orange",
  soft = false,
  dot = false,
  style = {},
  ...rest
}) {
  const map = {
    orange: { solid: "var(--mv-orange)", soft: "var(--mv-orange-soft)", ink: "var(--mv-orange-deep)" },
    red:    { solid: "var(--mv-red)",    soft: "var(--mv-red-soft)",    ink: "var(--mv-red-deep)" },
    teal:   { solid: "var(--mv-teal)",   soft: "var(--mv-teal-soft)",   ink: "var(--mv-teal-deep)" },
    blue:   { solid: "var(--mv-blue)",   soft: "var(--mv-blue-soft)",   ink: "var(--mv-blue-deep)" },
    navy:   { solid: "var(--mv-navy)",   soft: "#d7e0e6",               ink: "var(--mv-navy)" },
    grey:   { solid: "var(--mv-grey)",   soft: "#e9edf0",               ink: "#5b636b" },
  };
  const c = map[tone] || map.orange;
  const bg = soft ? c.soft : c.solid;
  const fg = soft ? c.ink : "var(--mv-white)";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: "var(--font-display)",
        fontSize: 22,
        lineHeight: 1,
        letterSpacing: "var(--tracking-display)",
        color: fg,
        background: bg,
        borderRadius: 999,
        padding: "5px 14px",
        ...style,
      }}
      {...rest}
    >
      {dot ? (
        <span style={{ width: 8, height: 8, borderRadius: 999, background: fg, display: "inline-block" }} />
      ) : null}
      {children}
    </span>
  );
}
