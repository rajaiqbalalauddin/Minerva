// src/components/Sidebar.jsx
// Why: the dashboard's primary navigation lives in one fixed panel.
// Nav items are data-driven so adding a page is a one-line change.
import { LayoutDashboard, Timer, ListChecks, Wallet, Award, Activity, Flame, Target, TrendingUp, Bot } from "lucide-react";
import logo from "../assets/minerva-logo.png";
import styles from "./Sidebar.module.css";

// Single source of truth for the nav. id matches the active page key.
const NAV_ITEMS = [
  { id: "dashboard",  label: "Dashboard",  Icon: LayoutDashboard },
  { id: "tasks",      label: "Tasks",      Icon: ListChecks },
  { id: "activity",   label: "Activity",   Icon: Activity },
  { id: "focus",      label: "Focus",      Icon: Target },
  { id: "habits",     label: "Habits",     Icon: Flame },
  { id: "budget",     label: "Budget",     Icon: Wallet },
  { id: "badges",     label: "Badges",     Icon: Award },
  { id: "analytics",  label: "Analytics",  Icon: TrendingUp },
  { id: "aichat",     label: "AI Chat",    Icon: Bot },
];

export default function Sidebar({ active = "dashboard", onNavigate = () => {} }) {
  return (
    <aside className={styles.sidebar}>
      {/* Real Minerva logo asset. */}
      <div className={styles.logoWrap}>
        <img src={logo} alt="Minerva" className={styles.logoImg} />
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={id === active ? styles.navItemActive : styles.navItem}
            onClick={() => onNavigate(id)}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Upgrade promo pinned to the bottom of the sidebar. */}
      <div className={styles.promo}>
        <p className={styles.promoTitle}>Maximize Your Productivity</p>
        <button className={styles.upgradeBtn}>Upgrade</button>
      </div>
    </aside>
  );
}
