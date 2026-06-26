// src/components/InfoCards.jsx
// Why: the three bottom teal cards (Balance, Spending, Insight) share styling
// and sit in one grid, so they live together. Spending uses Chart.js via
// react-chartjs-2 (already a project dependency).
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
} from "chart.js";
import styles from "./InfoCards.module.css";

// Register only the Chart.js pieces we use — keeps the bundle lean.
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler);

export function BalanceCard({ balance = 6767.67, onAddPurchase = () => {} }) {
  return (
    <div className={styles.card}>
      <p className={styles.cardLabel}>Balance :</p>
      <p className={styles.amount}>
        RM {balance.toLocaleString("en-MY", { minimumFractionDigits: 2 })}
      </p>
      <button className={styles.addBtn} onClick={onAddPurchase}>
        Add purchase
      </button>
    </div>
  );
}

export function SpendingCard({ data = [20, 35, 28, 48, 40, 62, 80] }) {
  // White rising line on the teal card, matching the mockup.
  const chartData = {
    labels: data.map((_, i) => i + 1),
    datasets: [
      {
        data,
        borderColor: "#FFFFFF",
        backgroundColor: "rgba(255,255,255,0.18)",
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };
  return (
    <div className={`${styles.card} ${styles.chartCard}`}>
      <p className={styles.cardTitle}>Spending</p>
      <div className={styles.chartBox}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export function InsightCard() {
  return (
    <div className={`${styles.card} ${styles.centerCard}`}>
      <p className={styles.cardTitle}>Insight</p>
    </div>
  );
}
