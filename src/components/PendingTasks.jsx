// src/components/PendingTasks.jsx
// Why: renders the row of pending-task cards. Card color comes from the task's
// `variant`, so urgency styling is data-driven rather than hard-coded per card.
import { useState } from "react";
import styles from "./PendingTasks.module.css";

// Mock tasks — replace with Firestore data later. variant maps to a CSS class.
const MOCK_TASKS = [
  { id: 1, title: "Walk the cat", when: "9.00 a.m , Today", variant: "red" },
  { id: 2, title: "Assignment", when: "7.00 a.m , Today", variant: "red" },
  { id: 3, title: "Gym", when: "12.00 p.m , Tomorrow", variant: "orange" },
  { id: 4, title: "Watch Anime", when: "9.00 a.m , 27 June", variant: "teal" },
];

export default function PendingTasks({ tasks = MOCK_TASKS }) {
  // Track which tasks are checked locally. Keyed by task id.
  const [done, setDone] = useState({});
  const toggle = (id) => setDone((d) => ({ ...d, [id]: !d[id] }));

  return (
    <section className={styles.wrap}>
      <h3 className={styles.sectionTitle}>Pending task</h3>
      <div className={styles.grid}>
        {tasks.map((t) => (
          <div key={t.id} className={`${styles.card} ${styles[t.variant]}`}>
            <div className={styles.cardText}>
              <p className={styles.cardTitle}>{t.title}</p>
              <p className={styles.cardWhen}>{t.when}</p>
            </div>
            <button
              className={styles.checkbox}
              aria-label={`Mark ${t.title} done`}
              onClick={() => toggle(t.id)}
            >
              {done[t.id] ? "✓" : ""}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
