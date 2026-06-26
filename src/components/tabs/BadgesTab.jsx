// src/components/tabs/BadgesTab.jsx
// Achievement badge gallery — earned badges glow, locked ones are dimmed.
import { Lock, CheckCircle, Timer, Flame, BookOpen, Star, Zap, Target, Trophy } from "lucide-react";
import styles from "./BadgesTab.module.css";

const BADGES = [
  { id: "first-task",   label: "First Steps",      desc: "Complete your first task",         Icon: CheckCircle, earned: true,  xp: 50  },
  { id: "five-tasks",   label: "Getting Going",     desc: "Complete 5 tasks",                 Icon: Star,        earned: true,  xp: 100 },
  { id: "focus-1",      label: "Deep Focus",        desc: "Complete a Pomodoro session",       Icon: Timer,       earned: true,  xp: 50  },
  { id: "streak-3",     label: "On Fire",           desc: "Maintain a 3-day streak",           Icon: Flame,       earned: false, xp: 150 },
  { id: "ten-tasks",    label: "Task Master",       desc: "Complete 10 tasks",                 Icon: Target,      earned: false, xp: 200 },
  { id: "study-5h",     label: "Scholar",           desc: "Accumulate 5 hours of focus time",  Icon: BookOpen,    earned: false, xp: 250 },
  { id: "focus-10",     label: "Zen Mode",          desc: "Complete 10 Pomodoro sessions",     Icon: Zap,         earned: false, xp: 300 },
  { id: "streak-7",     label: "Unstoppable",       desc: "Maintain a 7-day streak",           Icon: Flame,       earned: false, xp: 500 },
  { id: "all-badges",   label: "Completionist",     desc: "Earn every badge",                  Icon: Trophy,      earned: false, xp: 1000 },
];

export default function BadgesTab() {
  const earned = BADGES.filter((b) => b.earned).length;
  const total = BADGES.length;

  return (
    <div className={styles.tab}>
      {/* Progress banner */}
      <div className={styles.progress}>
        <div className={styles.progressInfo}>
          <h3 className={styles.progressTitle}>Your Achievements</h3>
          <p className={styles.progressSub}>{earned} of {total} badges earned</p>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(earned / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Badge grid */}
      <div className={styles.grid}>
        {BADGES.map((b) => (
          <div
            key={b.id}
            className={b.earned ? styles.card : styles.cardLocked}
          >
            <div className={styles.iconWrap}>
              {b.earned ? <b.Icon size={28} /> : <Lock size={24} />}
            </div>
            <p className={styles.badgeLabel}>{b.label}</p>
            <p className={styles.badgeDesc}>{b.desc}</p>
            <span className={styles.xpChip}>+{b.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}
