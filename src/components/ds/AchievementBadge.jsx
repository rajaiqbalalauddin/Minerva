export function AchievementBadge({
  label,
  glyph = "\u2605",
  tone = "orange",
  unlocked = true,
  caption,
  style = {},
  ...rest
}) {
  const tones = {
    orange: "var(--mv-orange)",
    teal: "var(--mv-teal)",
    blue: "var(--mv-blue)",
    red: "var(--mv-red)",
    navy: "var(--mv-navy)",
  };
  const fill = unlocked ? tones[tone] || tones.orange : "#cfd6db";
  return (
    <div
      style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 10, width: 132, ...style }}
      {...rest}
    >
      <div
        style={{
          width: 104,
          height: 104,
          borderRadius: 28,
          background: fill,
          boxShadow: unlocked ? "var(--shadow-pop)" : "var(--shadow-soft)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--mv-white)",
          fontSize: 52,
          lineHeight: 1,
          position: "relative",
          filter: unlocked ? "none" : "grayscale(0.4)",
        }}
      >
        <span style={{ opacity: unlocked ? 1 : 0.7 }}>{unlocked ? glyph : "\uD83D\uDD12"}</span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 24,
          lineHeight: 1,
          textAlign: "center",
          color: unlocked ? "var(--mv-navy)" : "var(--mv-grey)",
        }}
      >
        {label}
      </div>
      {caption ? (
        <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--mv-grey)", textAlign: "center" }}>
          {caption}
        </div>
      ) : null}
    </div>
  );
}
