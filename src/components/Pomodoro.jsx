// src/components/Pomodoro.jsx
import { usePomodoro, POMODORO_MODES } from "../hooks/usePomodoro";
import styles from "./Pomodoro.module.css";

// Turn 1500 seconds into "25:00"
function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function Pomodoro({ onSessionComplete }) {
  const { mode, timeLeft, running, start, pause, reset, switchMode } =
    usePomodoro(onSessionComplete);

  return (
    <div className={styles.panel}>
      {/* Mode switcher — generated from the modes object */}
      <div className={styles.nav}>
        {Object.entries(POMODORO_MODES).map(([key, { label }]) => (
          <button
            key={key}
            className={key === mode ? styles.navBtnActive : styles.navBtn}
            onClick={() => switchMode(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.timer}>{formatTime(timeLeft)}</div>

      <div className={styles.buttons}>
        {/* Show Start when stopped, Pause when running — one button, two states */}
        {running ? (
          <button className={styles.secondary} onClick={pause}>Pause</button>
        ) : (
          <button className={styles.start} onClick={start}>Start</button>
        )}
        <button className={styles.secondary} onClick={reset}>Reset</button>
      </div>
    </div>
  );
}