// src/components/tabs/HabitsTab.jsx
// Daily habit tracker with streak counters and a weekly checkbox grid.
import { useState } from "react";
import { Plus, Flame, Trash2 } from "lucide-react";
import styles from "./HabitsTab.module.css";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const INITIAL_HABITS = [
  { id: 1, name: "Morning exercise",  streak: 5, days: [true, true, true, true, true, false, false] },
  { id: 2, name: "Read 30 minutes",   streak: 3, days: [true, true, true, false, false, false, false] },
  { id: 3, name: "Drink 8 glasses",   streak: 7, days: [true, true, true, true, true, true, true] },
  { id: 4, name: "No social media",   streak: 0, days: [false, false, false, false, false, false, false] },
];

export default function HabitsTab() {
  const [habits, setHabits] = useState(INITIAL_HABITS);

  const toggleDay = (habitId, dayIdx) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;
        const days = [...h.days];
        days[dayIdx] = !days[dayIdx];
        return { ...h, days };
      })
    );
  };

  const addHabit = () => {
    const name = prompt("Habit name:");
    if (!name || !name.trim()) return;
    setHabits((prev) => [
      ...prev,
      { id: Date.now(), name: name.trim(), streak: 0, days: Array(7).fill(false) },
    ]);
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const totalCompleted = habits.reduce(
    (sum, h) => sum + h.days.filter(Boolean).length, 0
  );

  return (
    <div className={styles.tab}>
      {/* Pro badge + header */}
      <div className={styles.header}>
        <div>
          <span className={styles.proBadge}>PRO</span>
          <h3 className={styles.title}>Habit Tracker</h3>
        </div>
        <button className={styles.addBtn} onClick={addHabit}>
          <Plus size={16} /> New Habit
        </button>
      </div>

      {/* Stats row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <p className={styles.statValue}>{habits.length}</p>
          <p className={styles.statLabel}>Active Habits</p>
        </div>
        <div className={`${styles.statCard} ${styles.statOrange}`}>
          <p className={styles.statValue}>{totalCompleted}</p>
          <p className={styles.statLabel}>Check-ins This Week</p>
        </div>
        <div className={`${styles.statCard} ${styles.statNavy}`}>
          <p className={styles.statValue}>
            {Math.max(...habits.map((h) => h.streak), 0)}
          </p>
          <p className={styles.statLabel}>Best Streak</p>
        </div>
      </div>

      {/* Habit list with weekly grid */}
      <div className={styles.list}>
        {habits.map((h) => (
          <div key={h.id} className={styles.habitRow}>
            <div className={styles.habitInfo}>
              <p className={styles.habitName}>{h.name}</p>
              <div className={styles.streakChip}>
                <Flame size={12} /> {h.streak} day streak
              </div>
            </div>

            <div className={styles.dayGrid}>
              {DAYS.map((d, i) => (
                <button
                  key={d}
                  className={h.days[i] ? styles.dayDone : styles.dayBtn}
                  onClick={() => toggleDay(h.id, i)}
                  aria-label={`${d} ${h.days[i] ? "done" : "not done"}`}
                >
                  <span className={styles.dayLabel}>{d}</span>
                  {h.days[i] && <span className={styles.checkMark}>✓</span>}
                </button>
              ))}
            </div>

            <button
              className={styles.deleteBtn}
              onClick={() => deleteHabit(h.id)}
              aria-label="Delete habit"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {habits.length === 0 && (
          <p className={styles.empty}>No habits yet. Add one above to start tracking.</p>
        )}
      </div>
    </div>
  );
}
