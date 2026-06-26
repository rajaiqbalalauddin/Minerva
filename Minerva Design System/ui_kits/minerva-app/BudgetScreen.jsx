/* Minerva — Budget screen. Balance, category budgets with progress, add purchase. */
const MVB = window.MinervaDesignSystem_5790c8;

function BudgetScreen({ data }) {
  const { PageHeader, Button, Avatar, StatCard, Card, SectionTitle, ProgressBar, Badge } = MVB;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <PageHeader title="Budget" date={data.today}
        actions={<><Button variant="orange-navy">Add purchase</Button><Avatar name={data.user.name} size={56} /></>} />

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", gap: 22 }}>
        <StatCard caption="Balance :" value={data.balance} align="center" />
        <StatCard caption="This month" tone="navy" value="RM 760" align="center" valueColor="#fff">
          <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,.85)" }}>spent of RM 1,070 budget</div>
        </StatCard>
        <StatCard caption="Saved" tone="teal" value="RM 310" align="center" valueColor="#fff">
          <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,.9)" }}>29% under budget 🎉</div>
        </StatCard>
      </div>

      <div>
        <SectionTitle style={{ marginBottom: 18 }}>Categories</SectionTitle>
        <Card tone="light" pad={26} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {data.budget.map((b) => {
            const pct = Math.round((b.spent / b.cap) * 100);
            return (
              <div key={b.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--mv-navy)" }}>{b.label}</span>
                  <span style={{ fontFamily: "var(--font-meta)", fontWeight: 800, fontSize: 15, color: pct >= 95 ? "var(--mv-red)" : "var(--mv-grey)" }}>
                    RM {b.spent} / {b.cap}
                  </span>
                </div>
                <ProgressBar value={b.spent} max={b.cap} tone={pct >= 95 ? "red" : b.tone} height={18} />
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { BudgetScreen });
