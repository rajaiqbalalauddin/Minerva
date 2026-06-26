import React from "react";
import { Logo } from "./Logo.jsx";
import { NavItem } from "./NavItem.jsx";
import { PromoCard } from "./PromoCard.jsx";

/**
 * Minerva Sidebar — the navy rail: logo pill, nav items, and the promo
 * "Maximize Your Productivity" card pinned to the bottom.
 */
export function Sidebar({
  items = ["Dashboard", "Pomodoro", "Tasks", "Budget", "Badges"],
  active = "Dashboard",
  onNavigate = () => {},
  logoSrc,
  showPromo = true,
  style = {},
  ...rest
}) {
  return (
    <aside
      style={{
        width: "var(--sidebar-w)",
        minHeight: "100%",
        background: "var(--mv-navy)",
        boxShadow: "var(--shadow-inset)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 24px 18px",
        boxSizing: "border-box",
        ...style,
      }}
      {...rest}
    >
      <Logo src={logoSrc} height={80} style={{ alignSelf: "stretch", justifyContent: "flex-start" }} />
      <nav style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 56 }}>
        {items.map((label) => (
          <NavItem key={label} active={label === active} onClick={() => onNavigate(label)}>
            {label}
          </NavItem>
        ))}
      </nav>
      {showPromo ? <div style={{ marginTop: "auto", paddingTop: 24 }}><PromoCard /></div> : null}
    </aside>
  );
}
