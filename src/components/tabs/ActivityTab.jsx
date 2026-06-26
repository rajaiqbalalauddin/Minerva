// src/components/tabs/ActivityTab.jsx
// Recent-activity feed — shows a timeline of completed tasks, study sessions, etc.
import { useState } from "react";
import { CheckCircle, Timer, Award, Wallet, Flame } from "lucide-react";
import styles from "./ActivityTab.module.css";

const ICON_MAP = {
  task: CheckCircle,
  pomodoro: Timer,
  badge: Award,
  budget: Wallet,
  habit: Flame,
};

const MOCK_ACTIVITIES = [
  { id: 1, type: "task",     text: "Completed \"Finish IoT pipeline report\"",  time: "2 hours ago",  xp: 20 },
  { id: 2, type: "pomodoro", text: "Focus session completed (25 min)",          time: "3 hours ago",  xp: 30 },
  { id: 3, type: "badge",    text: "Earned badge: First Steps",                 time: "Yesterday",    xp: 50 },
  { id: 4, type: "task",     text: "Completed \"Submit cover letter\"",          time: "Yesterday",    xp: 20 },
  { id: 5, type: "budget",   text: "Logged expense: Lunch RM 12.50",            time: "Yesterday",    xp: 5  },
  { id: 6, type: "pomodoro", text: "Focus session completed (25 min)",          time: "2 days ago",   xp: 30 },
  { id: 7, type: "habit",    text: "Completed habit: Morning exercise",          time: "2 days ago",   xp: 10 },
  { id: 8, type: "task",     text: "Completed \"Review lecture slides\"",        time: "3 days ago",   xp: 20 },
];

const FILTERS = ["All", "Tasks", "Focus", "Badges", "Budget", "Habits"];
const FILTER_MAP = {
  All: null,
  Tasks: "task",
  Focus: "pomodoro",
  Badges: "badge",
  Budget: "budget",
  Habits: "habit",
};

export default function ActivityTab() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? MOCK_ACTIVITIES
    : MOCK_ACTIVITIES.filter((a) => a.type === FILTER_MAP[filter]);

  return (
    <div className={styles.tab}>
      {/* Summary banner */}
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <p className={styles.summaryValue}>12</p>
          <p className={styles.summaryLabel}>Tasks Done</p>
        </div>
        <div className={styles.summaryItem}>
          <p className={styles.summaryValue}>4h 30m</p>
          <p className={styles.summaryLabel}>Focus Time</p>
        </div>
        <div className={styles.summaryItem}>
          <p className={styles.summaryValue}>3</p>
          <p className={styles.summaryLabel}>Badges</p>
        </div>
        <div className={styles.summaryItem}>
          <p className={styles.summaryValue}>185</p>
          <p className={styles.summaryLabel}>XP Earned</p>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={f === filter ? styles.filterActive : styles.filterBtn}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Activity feed */}
      <div className={styles.feed}>
        <h3 className={styles.sectionTitle}>Recent Activity</h3>
        {filtered.length === 0 && (
          <p className={styles.empty}>No activity yet for this category.</p>
        )}
        {filtered.map((a) => {
          const Icon = ICON_MAP[a.type] || CheckCircle;
          return (
            <div key={a.id} className={styles.item}>
              <div className={`${styles.iconWrap} ${styles[a.type]}`}>
                <Icon size={16} />
              </div>
              <div className={styles.itemBody}>
                <p className={styles.itemText}>{a.text}</p>
                <p className={styles.itemTime}>{a.time}</p>
              </div>
              <span className={styles.xpChip}>+{a.xp} XP</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
