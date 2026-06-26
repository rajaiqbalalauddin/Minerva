// src/components/tabs/AnalyticsTab.jsx
// Productivity analytics — stat cards, bar-style weekly chart, category breakdown.
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
} from "chart.js";
import { TrendingUp, CheckCircle, Timer, Flame, Target } from "lucide-react";
import styles from "./AnalyticsTab.module.css";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler);

const WEEKLY_DATA = [3, 5, 4, 6, 2, 7, 5];
const WEEK_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const BREAKDOWN = [
  { label: "Study",        percent: 45, color: "navy" },
  { label: "Assignments",  percent: 25, color: "teal" },
  { label: "Exercise",     percent: 15, color: "orange" },
  { label: "Personal",     percent: 15, color: "red" },
];

export default function AnalyticsTab() {
  const chartData = {
    labels: WEEK_LABELS,
    datasets: [
      {
        data: WEEKLY_DATA,
        borderColor: "#FFFFFF",
        backgroundColor: "rgba(255,255,255,0.15)",
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#FFFFFF",
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: {
      x: { ticks: { color: "rgba(255,255,255,0.7)", font: { size: 11 } }, grid: { display: false } },
      y: { ticks: { color: "rgba(255,255,255,0.7)", font: { size: 11 } }, grid: { color: "rgba(255,255,255,0.1)" } },
    },
  };

  return (
    <div className={styles.tab}>
      {/* Pro badge + header */}
      <div className={styles.headerRow}>
        <span className={styles.proBadge}>PRO</span>
        <h3 className={styles.title}>Analytics</h3>
      </div>

      {/* Stat cards row */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.navy}`}>
          <CheckCircle size={22} />
          <p className={styles.statValue}>32</p>
          <p className={styles.statLabel}>Tasks Done</p>
        </div>
        <div className={`${styles.statCard} ${styles.teal}`}>
          <Timer size={22} />
          <p className={styles.statValue}>18h</p>
          <p className={styles.statLabel}>Focus Time</p>
        </div>
        <div className={`${styles.statCard} ${styles.orange}`}>
          <Flame size={22} />
          <p className={styles.statValue}>5</p>
          <p className={styles.statLabel}>Day Streak</p>
        </div>
        <div className={`${styles.statCard} ${styles.navy}`}>
          <Target size={22} />
          <p className={styles.statValue}>78%</p>
          <p className={styles.statLabel}>Goal Rate</p>
        </div>
      </div>

      {/* Chart + breakdown side by side */}
      <div className={styles.bottomGrid}>
        {/* Weekly chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <TrendingUp size={18} />
            <h4 className={styles.chartTitle}>Tasks Completed This Week</h4>
          </div>
          <div className={styles.chartBox}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Category breakdown */}
        <div className={styles.breakdownCard}>
          <h4 className={styles.breakdownTitle}>Time by Category</h4>
          {BREAKDOWN.map((b) => (
            <div key={b.label} className={styles.breakdownRow}>
              <div className={styles.breakdownInfo}>
                <div className={`${styles.breakdownDot} ${styles[b.color]}`} />
                <span className={styles.breakdownLabel}>{b.label}</span>
                <span className={styles.breakdownPercent}>{b.percent}%</span>
              </div>
              <div className={styles.breakdownTrack}>
                <div
                  className={`${styles.breakdownFill} ${styles[b.color]}`}
                  style={{ width: `${b.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
