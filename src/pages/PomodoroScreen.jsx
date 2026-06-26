import { useState, useEffect, useRef } from "react";
import { PageHeader } from "../components/ds/PageHeader.jsx";
import { Button } from "../components/ds/Button.jsx";
import { Avatar } from "../components/ds/Avatar.jsx";
import { PomodoroDial } from "../components/ds/PomodoroDial.jsx";
import { Card } from "../components/ds/Card.jsx";
import { Badge } from "../components/ds/Badge.jsx";
import { useNav } from "../context/NavContext.jsx";

const DURATIONS = { FOCUS: 25 * 60, BREAK: 5 * 60 };

export default function PomodoroScreen({ data, onFocusComplete = () => {} }) {
  const { openProfile, goTasks } = useNav();
  const [mode, setMode] = useState("FOCUS");
  const [remaining, setRemaining] = useState(DURATIONS.FOCUS);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          setRunning(false);
          // A focus block finished: count it locally and persist to Firestore.
          if (mode === "FOCUS") {
            setSessions((s) => s + 1);
            onFocusComplete();
          }
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, mode]);

  const total = DURATIONS[mode];
  const progress = 1 - remaining / total;
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  function switchMode(m) {
    setMode(m);
    setRunning(false);
    setRemaining(DURATIONS[m]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <PageHeader
        title="Pomodoro"
        date={data.today}
        actions={
          <>
            <Button onClick={goTasks}>+ Task</Button>
            <Avatar name={data.user.name} size={56} onClick={openProfile} role="button" aria-label="Open profile" style={{ cursor: "pointer" }} />
          </>
        }
      />

      <Card tone="light" pad={36} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <Button variant={mode === "FOCUS" ? "primary" : "ghost"} size="sm" onClick={() => switchMode("FOCUS")}>
            Focus
          </Button>
          <Button variant={mode === "BREAK" ? "blue" : "ghost"} size="sm" onClick={() => switchMode("BREAK")}>
            Break
          </Button>
        </div>

        <PomodoroDial
          time={`${mm}:${ss}`}
          progress={progress}
          tone={mode === "FOCUS" ? "orange" : "teal"}
          label={mode}
          size={360}
        />

        <div style={{ display: "flex", gap: 16 }}>
          <Button variant={running ? "navy" : "primary"} size="lg" onClick={() => setRunning((r) => !r)}>
            {running ? "Pause" : remaining === 0 ? "Done" : "Start"}
          </Button>
          <Button variant="ghost" size="lg" onClick={() => switchMode(mode)}>
            Reset
          </Button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Badge tone="orange" dot>
            {sessions} sessions today
          </Badge>
          <Badge tone="teal" soft>
            Streak 4 days
          </Badge>
        </div>
      </Card>
    </div>
  );
}
