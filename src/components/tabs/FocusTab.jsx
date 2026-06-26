// src/components/tabs/FocusTab.jsx
// Extended Pomodoro view — the timer plus session history and stats.
import Pomodoro from "../Pomodoro";
import { Timer, Zap, TrendingUp, Calendar } from "lucide-react";
import styles from "./FocusTab.module.css";

const MOCK_SESSIONS = [
  { id: 1, type: "Focus",      duration: "25:00", date: "Today, 2:30 PM" },
  { id: 2, type: "Short Break", duration: "05:00", date: "Today, 2:55 PM" },
  { id: 3, type: "Focus",      duration: "25:00", date: "Today, 11:00 AM" },
  { id: 4, type: "Focus",      duration: "25:00", date: "Yesterday, 4:15 PM" },
  { id: 5, type: "Long Break",  duration: "15:00", date: "Yesterday, 4:40 PM" },
  { id: 6, type: "Focus",      duration: "25:00", date: "Yesterday, 10:00 AM" },
];

const DAILY_GOAL = 6; // sessions
const DONE_TODAY = 3;

export default function FocusTab() {
  return (
    <div className={styles.tab}>
      {/* Pro badge */}
      <div className={styles.headerRow}>
        <span className={styles.proBadge}>PRO</span>
        <h3 className={styles.title}>Focus Mode</h3>
      </div>

      {/* Stats + timer row */}
      <div className={styles.topGrid}>
        {/* Stats column */}
        <div className={styles.statsCol}>
          <div className={`${styles.statCard} ${styles.navy}`}>
            <Timer size={20} />
            <div>
              <p className={styles.statValue}>1h 15m</p>
              <p className={styles.statLabel}>Focus Today</p>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.teal}`}>
            <TrendingUp size={20} />
            <div>
              <p className={styles.statValue}>8h 45m</p>
              <p className={styles.statLabel}>This Week</p>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.orange}`}>
            <Zap size={20} />
            <div>
              <p className={styles.statValue}>14</p>
              <p className={styles.statLabel}>Total Sessions</p>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.navy}`}>
            <Calendar size={20} />
            <div>
              <p className={styles.statValue}>5 days</p>
              <p className={styles.statLabel}>Current Streak</p>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className={styles.timerWrap}>
          <Pomodoro onSessionComplete={() => {}} />
          {/* Daily goal progress */}
          <div className={styles.goalBar}>
            <p className={styles.goalLabel}>
              Daily Goal: {DONE_TODAY}/{DAILY_GOAL} sessions
            </p>
            <div className={styles.goalTrack}>
              <div
                className={styles.goalFill}
                style={{ width: `${(DONE_TODAY / DAILY_GOAL) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Session history */}
      <div className={styles.historyPanel}>
        <h3 className={styles.sectionTitle}>Session History</h3>
        {MOCK_SESSIONS.map((s) => (
          <div key={s.id} className={styles.historyRow}>
            <div className={`${styles.historyDot} ${s.type === "Focus" ? styles.dotFocus : styles.dotBreak}`} />
            <div className={styles.historyBody}>
              <p className={styles.historyType}>{s.type}</p>
              <p className={styles.historyDate}>{s.date}</p>
            </div>
            <span className={styles.historyDuration}>{s.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
