// src/components/Topbar.jsx
// Why: the page header (title + date on the left, actions on the right) is its
// own piece so the Dashboard page stays focused on layout.
import { Plus, User } from "lucide-react";
import styles from "./Topbar.module.css";

// Format a Date as "Tuesday 23 June 2026" to match the mockup.
function formatDate(date) {
  const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "long" });
  const year = date.getFullYear();
  return { weekday, rest: `${day} ${month} ${year}` };
}

export default function Topbar({ title = "Dashboard", date = new Date(), onAddTask = () => {} }) {
  const { weekday, rest } = formatDate(date);
  return (
    <div className={styles.topbar}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.date}>
          <span className={styles.weekday}>{weekday}</span> {rest}
        </p>
      </div>
      <div className={styles.actions}>
        <button className={styles.taskBtn} onClick={onAddTask}>
          <Plus size={16} /> Task
        </button>
        <button className={styles.avatar} aria-label="Profile">
          <User size={20} />
        </button>
      </div>
    </div>
  );
}
