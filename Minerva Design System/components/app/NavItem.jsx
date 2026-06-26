import React from "react";

/**
 * Minerva NavItem — a sidebar row. Active = orange filled block with
 * white Jaro label + hard shadow. Inactive = grey Jaro label, fills
 * navy-2 on hover.
 */
export function NavItem({ children, active = false, icon = null, onClick, style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-hero)",
        fontSize: "var(--type-nav)",
        padding: "16px 18px",
        borderRadius: "var(--radius-sm)",
        background: active ? "var(--mv-orange)" : hover ? "var(--mv-navy-2)" : "transparent",
        color: active ? "var(--mv-white)" : "var(--mv-grey)",
        boxShadow: active ? "var(--shadow-pop)" : "none",
        transition: "background 120ms ease, color 120ms ease",
        ...style,
      }}
      {...rest}
    >
      {icon ? <span style={{ display: "inline-flex" }}>{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
}
