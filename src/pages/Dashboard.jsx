// src/pages/Dashboard.jsx
// Why: top-level layout for the dashboard screen. Holds the active-nav state and
// composes the sidebar + main content grid. Content blocks are their own
// components so this file stays a readable layout map.
import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import HeroBanner from "../components/HeroBanner.jsx";
import PendingTasks from "../components/PendingTasks.jsx";
import { BalanceCard, SpendingCard, InsightCard } from "../components/InfoCards.jsx";
import { TABS } from "../config/tabs.jsx";
import styles from "./Dashboard.module.css";

// Map tab ids to human-readable titles for the Topbar.
const PAGE_TITLES = {
  dashboard: "Dashboard",
  tasks: "Tasks",
  activity: "Activity",
  budget: "Budget",
  badges: "Badges",
  habits: "Habits",
  focus: "Focus",
  analytics: "Analytics",
  aichat: "AI Chat",
};

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const handleStart = () => setActivePage("focus");
  const handleAddTask = () => setActivePage("tasks");

  // Find the tab component for non-dashboard pages.
  const activeTab = TABS.find((t) => t.id === activePage);

  return (
    <div className={styles.appFrame}>
      <Sidebar active={activePage} onNavigate={setActivePage} />

      <main className={styles.main}>
        <Topbar
          title={PAGE_TITLES[activePage] || "Dashboard"}
          date={new Date()}
          onAddTask={handleAddTask}
        />

        {activePage === "dashboard" ? (
          <>
            <HeroBanner name="Raja" onStart={handleStart} />
            <PendingTasks />
            <div className={styles.infoRow}>
              <BalanceCard />
              <SpendingCard />
              <InsightCard />
            </div>
          </>
        ) : activeTab ? (
          <activeTab.Component />
        ) : null}
      </main>
    </div>
  );
}
