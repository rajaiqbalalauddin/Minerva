import React from "react";

/**
 * Minerva SectionTitle — black pixel (Jersey 10) heading used above
 * groups of cards ("Pending task", "Your badges").
 */
export function SectionTitle({ children, size = 40, color = "var(--mv-black)", style = {}, ...rest }) {
  return (
    <h2
      style={{
        margin: 0,
        fontFamily: "var(--font-display)",
        fontSize: size,
        lineHeight: 1,
        color,
        letterSpacing: "var(--tracking-display)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </h2>
  );
}
