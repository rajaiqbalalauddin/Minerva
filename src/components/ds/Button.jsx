export function Button({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  iconRight = null,
  full = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const palettes = {
    primary:      { bg: "var(--mv-orange)", fg: "var(--mv-white)", shadow: "var(--shadow-pop)" },
    dark:         { bg: "var(--mv-black)",  fg: "var(--mv-white)", shadow: "var(--shadow-lift)" },
    navy:         { bg: "var(--mv-navy)",   fg: "var(--mv-white)", shadow: "var(--shadow-pop)" },
    "orange-navy":{ bg: "var(--mv-orange)", fg: "var(--mv-navy)",  shadow: "var(--shadow-navy)" },
    blue:         { bg: "var(--mv-blue)",   fg: "var(--mv-white)", shadow: "var(--shadow-pop)" },
    ghost:        { bg: "transparent",      fg: "var(--mv-navy)",  shadow: "none" },
  };
  const sizes = {
    sm: { fontSize: 24, padding: "4px 18px", radius: "var(--radius-sm)", gap: 8 },
    md: { fontSize: 32, padding: "6px 26px", radius: "var(--radius-sm)", gap: 10 },
    lg: { fontSize: 36, padding: "10px 34px", radius: "var(--radius-sm)", gap: 12 },
  };
  const p = palettes[variant] || palettes.primary;
  const s = sizes[size] || sizes.md;

  return (
    <button
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        width: full ? "100%" : "auto",
        fontFamily: "var(--font-display)",
        fontSize: s.fontSize,
        lineHeight: 1,
        letterSpacing: "var(--tracking-display)",
        color: p.fg,
        background: p.bg,
        border: "none",
        borderRadius: s.radius,
        padding: s.padding,
        boxShadow: p.shadow,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "transform 90ms ease, box-shadow 90ms ease, background 120ms ease",
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
      onMouseDown={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = "translate(3px, 5px)";
        e.currentTarget.style.boxShadow = "var(--shadow-soft)";
      }}
      onMouseUp={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = p.shadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = p.shadow;
      }}
      {...rest}
    >
      {icon ? <span style={{ display: "inline-flex", fontSize: "0.8em" }}>{icon}</span> : null}
      <span>{children}</span>
      {iconRight ? <span style={{ display: "inline-flex", fontSize: "0.8em" }}>{iconRight}</span> : null}
    </button>
  );
}
