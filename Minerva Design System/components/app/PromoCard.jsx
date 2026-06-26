import React from "react";
import { Button } from "../core/Button.jsx";

/**
 * Minerva PromoCard — the teal "speech-blob" upsell that sits at the
 * bottom of the sidebar. Pixel headline + Upgrade button.
 */
export function PromoCard({
  title = "Maximize\nYour\nProductivity",
  cta = "Upgrade",
  onUpgrade,
  style = {},
  ...rest
}) {
  return (
    <div
      style={{
        background: "var(--mv-blue)",
        borderRadius: "var(--radius-blob)",
        boxShadow: "var(--shadow-soft)",
        padding: "18px 18px 22px",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 44,
          lineHeight: 0.92,
          color: "var(--mv-white)",
          whiteSpace: "pre-line",
          marginBottom: 18,
        }}
      >
        {title}
      </div>
      <Button variant="orange-navy" full onClick={onUpgrade}>{cta}</Button>
    </div>
  );
}
