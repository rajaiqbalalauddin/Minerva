/* Minerva — Dashboard screen. Replicates the Figma dashboard:
   hero greeting card, pending-task row, and the finance trio. */
const MV = window.MinervaDesignSystem_5790c8;

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

function DashboardScreen({ data, onStartPomodoro, onAddTask, onGoBudget }) {
  const { PageHeader, Button, Avatar, Card, SectionTitle, TaskChip, StatCard } = MV;
  const pending = data.tasks.filter((t) => !t.done).slice(0, 4);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <PageHeader
        title="Dashboard"
        date={data.today}
        actions={<>
          <Button icon={<span style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}>+</span>} onClick={onAddTask}>Task</Button>
          <Avatar name={data.user.name} size={56} />
        </>}
      />

      {/* Hero greeting */}
      <Card tone="navy" shadow="lift" pad={0} style={{ position: "relative", overflow: "hidden", minHeight: 200 }}>
        <div style={{ padding: "36px 40px", maxWidth: 680 }}>
          <div style={{ fontFamily: "var(--font-hero)", fontSize: 44, lineHeight: 1.1, color: "#fff", marginBottom: 22 }}>
            Hi {data.user.name.split(" ")[0]}, ready for a study session?
          </div>
          <Button variant="dark" iconRight={<span>⏱</span>} onClick={onStartPomodoro}>Start Pomodoro</Button>
        </div>
        <img src="../../assets/study-hero.png" alt=""
          style={{ position: "absolute", right: 24, bottom: 0, height: "108%", width: "auto", objectFit: "contain", pointerEvents: "none" }} />
      </Card>

      {/* Pending tasks */}
      <div>
        <SectionTitle style={{ marginBottom: 16 }}>Pending task</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {pending.map((t) => <TaskChip key={t.id} title={t.title} time={t.time} tone={t.tone} />)}
        </div>
      </div>

      {/* Finance trio */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 22 }}>
        <StatCard caption="Balance :" value={data.balance} align="center"
          footer={<Button variant="orange-navy" full onClick={onGoBudget}>Add purchase</Button>} />
        <StatCard caption="Spending" tone="blue" align="center" style={{ justifyContent: "space-between" }}>
          <div style={{ width: "100%", marginTop: "auto" }}><Sparkline data={data.spendData} /></div>
        </StatCard>
        <StatCard tone="blue" align="center" style={{ justifyContent: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "#fff", textAlign: "center", lineHeight: 1.1 }}>
            Insight
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "rgba(255,255,255,.9)", textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
            You spent 18% more this week. Most of it went to <b>Fun</b>.
          </div>
        </StatCard>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardScreen });
