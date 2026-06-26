import { useEffect, useState } from "react";
import { PageHeader } from "../components/ds/PageHeader.jsx";
import { Button } from "../components/ds/Button.jsx";
import { Avatar } from "../components/ds/Avatar.jsx";
import { Card } from "../components/ds/Card.jsx";
import { SectionTitle } from "../components/ds/SectionTitle.jsx";
import { TaskChip } from "../components/ds/TaskChip.jsx";
import { StatCard } from "../components/ds/StatCard.jsx";
import heroArt from "../assets/study-hero.png";
import { getBusinessInsight } from "../services/qwen.js";

function Sparkline({ data, stroke = "#fff", height = 130 }) {
  const w = 240;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((v - min) / (max - min || 1)) * (height - 14) - 7;
    return [x, y];
  });
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = d + ` L ${w} ${height} L 0 ${height} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" style={{ width: "100%", height }}>
      <defs>
        <linearGradient id="mvspark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(2,48,71,0.55)" />
          <stop offset="100%" stopColor="rgba(2,48,71,0)" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#mvspark)" />
      <path d={d} fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DashboardScreen({ data, onStartPomodoro, onAddTask, onGoBudget, onProfile = () => {} }) {
  const pending = data.tasks.filter((t) => !t.done).slice(0, 4);
  const hasPending = pending.length > 0;

  // Fetch a money/business insight from Qwen once when the dashboard mounts.
  const [insight, setInsight] = useState("");
  const [insightLoading, setInsightLoading] = useState(true);
  useEffect(() => {
    let active = true;
    getBusinessInsight()
      .then((text) => active && setInsight(text))
      .catch((e) => active && setInsight(`Couldn't load insight: ${e.message}`))
      .finally(() => active && setInsightLoading(false));
    return () => {
      active = false;
    };
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <PageHeader
        title="Dashboard"
        date={data.today}
        actions={
          <>
            <Button icon={<span style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}>+</span>} onClick={onAddTask}>
              Task
            </Button>
            <Avatar
              name={data.user.name}
              size={56}
              onClick={onProfile}
              role="button"
              aria-label="Open profile"
              style={{ cursor: "pointer" }}
            />
          </>
        }
      />

      {/* Hero greeting */}
      <Card tone="navy" shadow="lift" pad={0} style={{ position: "relative", overflow: "hidden", minHeight: 200 }}>
        <div style={{ padding: "36px 40px", maxWidth: 680 }}>
          <div style={{ fontFamily: "var(--font-hero)", fontSize: 44, lineHeight: 1.1, color: "#fff", marginBottom: 22 }}>
            Hi {data.user.name.split(" ")[0]}, ready for a study session?
          </div>
          <Button variant="dark" iconRight={<span>⏱</span>} onClick={onStartPomodoro}>
            Start Pomodoro
          </Button>
        </div>
        <img
          src={heroArt}
          alt=""
          style={{ position: "absolute", right: 24, bottom: 0, height: "108%", width: "auto", objectFit: "contain", pointerEvents: "none" }}
        />
      </Card>

      {/* Pending tasks — hidden entirely when there's nothing pending. */}
      {hasPending && (
        <div>
          <SectionTitle style={{ marginBottom: 16 }}>Pending task</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
            {pending.map((t) => (
              <TaskChip key={t.id} title={t.title} time={t.time} tone={t.tone} />
            ))}
          </div>
        </div>
      )}

      {/* Finance trio. With no pending tasks, the cards grow taller to fill the
          space the task row would have used, so the dashboard still looks full. */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 22, flex: hasPending ? undefined : 1 }}>
        <StatCard
          caption="Balance :"
          value={data.balance}
          align="center"
          style={{ minHeight: hasPending ? undefined : 320 }}
          footer={
            <Button variant="orange-navy" full onClick={onGoBudget}>
              Add purchase
            </Button>
          }
        />
        <StatCard caption="Spending" tone="blue" align="center" style={{ justifyContent: "space-between", minHeight: hasPending ? undefined : 320 }}>
          <div style={{ width: "100%", marginTop: "auto" }}>
            <Sparkline data={data.spendData} height={hasPending ? 130 : 200} />
          </div>
        </StatCard>
        <StatCard tone="blue" align="center" style={{ justifyContent: "center", minHeight: hasPending ? undefined : 320 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "#fff", textAlign: "center", lineHeight: 1.1 }}>
            Insight
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "rgba(255,255,255,.9)", textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
            {insightLoading ? "Fetching the latest money insight…" : insight}
          </div>
        </StatCard>
      </div>
    </div>
  );
}
