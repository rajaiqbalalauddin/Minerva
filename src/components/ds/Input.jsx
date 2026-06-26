export function Input({ label, hint, icon, style = {}, wrapStyle = {}, ...rest }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, ...wrapStyle }}>
      {label ? (
        <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--mv-navy)", letterSpacing: "0.5px" }}>
          {label}
        </span>
      ) : null}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "var(--mv-white)",
          border: "2px solid var(--mv-navy)",
          borderRadius: "var(--radius-sm)",
          padding: "10px 16px",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        {icon ? <span style={{ display: "inline-flex", color: "var(--mv-grey)" }}>{icon}</span> : null}
        <input
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-body)",
            fontSize: 16,
            color: "var(--mv-navy)",
            minWidth: 0,
            ...style,
          }}
          {...rest}
        />
      </span>
      {hint ? (
        <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--mv-grey)" }}>{hint}</span>
      ) : null}
    </label>
  );
}
