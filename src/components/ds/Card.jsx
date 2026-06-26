export function Card({
  children,
  tone = "light",
  shadow = "pop",
  blob = false,
  pad = 24,
  style = {},
  ...rest
}) {
  const tones = {
    light:  { bg: "var(--mv-white)",  fg: "var(--mv-navy)" },
    navy:   { bg: "var(--mv-navy)",   fg: "var(--mv-white)" },
    blue:   { bg: "var(--mv-blue)",   fg: "var(--mv-white)" },
    teal:   { bg: "var(--mv-teal)",   fg: "var(--mv-white)" },
    orange: { bg: "var(--mv-orange)", fg: "var(--mv-white)" },
    red:    { bg: "var(--mv-red)",    fg: "var(--mv-white)" },
  };
  const shadows = {
    pop: "var(--shadow-pop)",
    lift: "var(--shadow-lift)",
    soft: "var(--shadow-soft)",
    none: "none",
  };
  const t = tones[tone] || tones.light;

  return (
    <div
      style={{
        background: t.bg,
        color: t.fg,
        borderRadius: blob ? "var(--radius-blob)" : "var(--radius-md)",
        boxShadow: shadows[shadow] ?? shadows.pop,
        padding: pad,
        boxSizing: "border-box",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
