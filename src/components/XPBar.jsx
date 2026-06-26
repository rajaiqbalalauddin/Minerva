
import styles from "./XPBar.module.css";

export default function XPBar({ level, xp, xpForNext }) {
  const percent = Math.min((xp / xpForNext) * 100, 100);
  return (
    <div className={styles.container}>
      <span className={styles.levelBadge}>Lv.{level}</span>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
      <span className={styles.label}>{xp}/{xpForNext} XP</span>
    </div>
  );
}