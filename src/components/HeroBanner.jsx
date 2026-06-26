// src/components/HeroBanner.jsx
// Why: the welcome banner is a distinct visual block with its own CTA.
import { Timer } from "lucide-react";
import heroArt from "../assets/study-hero.png";
import styles from "./HeroBanner.module.css";

export default function HeroBanner({ name = "Raja", onStart = () => {} }) {
  return (
    <section className={styles.banner}>
      <div className={styles.copy}>
        <h2 className={styles.heading}>
          Hi {name} , Ready for a study session?
        </h2>
        <button className={styles.startBtn} onClick={onStart}>
          Start Pomodoro <Timer size={18} />
        </button>
      </div>
      <img src={heroArt} alt="" className={styles.art} />
    </section>
  );
}
