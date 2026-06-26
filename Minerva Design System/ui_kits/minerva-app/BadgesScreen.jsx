/* Minerva — Badges screen. Achievement grid + progress summary. */
const MVBg = window.MinervaDesignSystem_5790c8;

function BadgesScreen({ data }) {
  const { PageHeader, Button, Avatar, AchievementBadge, Card, SectionTitle, ProgressBar, Badge } = MVBg;
  const unlocked = data.badges.filter((b) => b.unlocked).length;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <PageHeader title="Badges" date={data.today}
        actions={<Avatar name={data.user.name} size={56} />} />

      <Card tone="navy" shadow="lift" pad={30} style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <div style={{ fontSize: 64, lineHeight: 1 }}>🏅</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--font-hero)", fontSize: 30, color: "#fff", marginBottom: 10 }}>
            {unlocked} of {data.badges.length} badges earned
          </div>
          <ProgressBar value={unlocked} max={data.badges.length} tone="orange" height={18} showLabel />
        </div>
        <Button variant="orange-navy">Share</Button>
      </Card>

      <div>
        <SectionTitle style={{ marginBottom: 18 }}>Your badges</SectionTitle>
        <Card tone="light" pad={30}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 20, justifyItems: "center" }}>
            {data.badges.map((b) => (
              <AchievementBadge key={b.label} label={b.label} glyph={b.glyph} tone={b.tone} unlocked={b.unlocked} caption={b.caption} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { BadgesScreen });
