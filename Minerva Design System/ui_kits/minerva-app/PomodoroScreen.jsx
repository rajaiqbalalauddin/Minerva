/* Minerva — Pomodoro screen. A working focus timer with the dial,
   start/pause/reset, focus/break modes and a session counter. */
const MVP = window.MinervaDesignSystem_5790c8;

function PomodoroScreen({ data }) {
  const { PageHeader, Button, Avatar, PomodoroDial, Card, Badge } = MVP;
  const DURATIONS = { FOCUS: 25 * 60, BREAK: 5 * 60 };
  const [mode, setMode] = React.useState("FOCUS");
  const [remaining, setRemaining] = React.useState(DURATIONS.FOCUS);
  const [running, setRunning] = React.useState(false);
  const [sessions, setSessions] = React.useState(2);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          setRunning(false);
          if (mode === "FOCUS") setSessions((s) => s + 1);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, mode]);

  const total = DURATIONS[mode];
  const progress = 1 - remaining / total;
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  function switchMode(m) {
    setMode(m); setRunning(false); setRemaining(DURATIONS[m]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <PageHeader title="Pomodoro" date={data.today}
        actions={<><Button>+ Task</Button><Avatar name={data.user.name} size={56} /></>} />

      <Card tone="light" pad={36} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <Button variant={mode === "FOCUS" ? "primary" : "ghost"} size="sm" onClick={() => switchMode("FOCUS")}>Focus</Button>
          <Button variant={mode === "BREAK" ? "blue" : "ghost"} size="sm" onClick={() => switchMode("BREAK")}>Break</Button>
        </div>

        <PomodoroDial time={`${mm}:${ss}`} progress={progress} tone={mode === "FOCUS" ? "orange" : "teal"} label={mode} size={360} />

        <div style={{ display: "flex", gap: 16 }}>
          <Button variant={running ? "navy" : "primary"} size="lg" onClick={() => setRunning((r) => !r)}>
            {running ? "Pause" : remaining === 0 ? "Done" : "Start"}
          </Button>
          <Button variant="ghost" size="lg" onClick={() => switchMode(mode)}>Reset</Button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Badge tone="orange" dot>{sessions} sessions today</Badge>
          <Badge tone="teal" soft>Streak 4 days</Badge>
        </div>
      </Card>
    </div>
  );
}

Object.assign(window, { PomodoroScreen });
