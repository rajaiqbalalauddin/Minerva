export function PomodoroDial({
  time = "25:00",
  progress = 0,
  tone = "orange",
  label = "FOCUS",
  size = 320,
  style = {},
  ...rest
}) {
  const tones = { orange: "var(--mv-orange)", teal: "var(--mv-teal)", blue: "var(--mv-blue)" };
  const stroke = 18;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const fill = tones[tone] || tones.orange;
  return (
    <div style={{ position: "relative", width: size, height: size, ...style }} {...rest}>
      <svg width={size} height={size} style={{ display: "block", transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e3e8ec" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={fill}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.max(0, Math.min(1, progress)))}
          style={{ transition: "stroke-dashoffset 500ms linear" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--mv-grey)", letterSpacing: "2px" }}>
          {label}
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: size * 0.26, lineHeight: 1, color: "var(--mv-navy)" }}>
          {time}
        </div>
      </div>
    </div>
  );
}
