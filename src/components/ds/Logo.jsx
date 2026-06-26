export function Logo({ src, height = 80, style = {}, ...rest }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--mv-white)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-pop)",
        padding: "8px 22px",
        height,
        boxSizing: "border-box",
        ...style,
      }}
      {...rest}
    >
      <img src={src} alt="Minerva" style={{ height: "72%", width: "auto", objectFit: "contain" }} />
    </div>
  );
}
