import { useState } from "react";
import { PageHeader } from "../components/ds/PageHeader.jsx";
import { Button } from "../components/ds/Button.jsx";
import { Avatar } from "../components/ds/Avatar.jsx";
import { Input } from "../components/ds/Input.jsx";
import { SectionTitle } from "../components/ds/SectionTitle.jsx";
import { TaskChip } from "../components/ds/TaskChip.jsx";
import { Badge } from "../components/ds/Badge.jsx";
import { useNav } from "../context/NavContext.jsx";

export default function TasksScreen({ data, onAdd = () => {}, onToggle = () => {} }) {
  const { openProfile } = useNav();
  // Tasks come live from Firestore via data.tasks; this screen only holds the draft.
  const tasks = data.tasks;
  const [draft, setDraft] = useState("");

  function add() {
    const v = draft.trim();
    if (!v) return;
    onAdd(v); // persisted; the snapshot listener updates the list
    setDraft("");
  }

  // Flip done state in Firestore (id + the new value).
  const toggle = (t) => onToggle(t.id, !t.done);

  const open = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <PageHeader
        title="Tasks"
        date={data.today}
        actions={<Avatar name={data.user.name} size={56} onClick={openProfile} role="button" aria-label="Open profile" style={{ cursor: "pointer" }} />}
      />

      <div style={{ display: "flex", gap: 14, alignItems: "stretch" }}>
        <div style={{ flex: 1 }}>
          <Input
            placeholder="Add a new task\u2026"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
          />
        </div>
        <Button variant="primary" onClick={add}>
          Add
        </Button>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <SectionTitle>To do</SectionTitle>
          <Badge tone="red" soft>
            {open.length}
          </Badge>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {open.map((t) => (
            <TaskChip key={t.id} title={t.title} time={t.time} tone={t.tone} onClick={() => toggle(t)} />
          ))}
          {open.length === 0 && (
            <div style={{ fontFamily: "var(--font-body)", color: "var(--mv-grey)" }}>All done — nice work! 🎉</div>
          )}
        </div>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <SectionTitle color="var(--mv-grey)">Completed</SectionTitle>
          <Badge tone="teal" soft>
            {done.length}
          </Badge>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {done.map((t) => (
            <TaskChip key={t.id} title={t.title} time={t.time} tone="teal" done onClick={() => toggle(t)} />
          ))}
        </div>
      </div>
    </div>
  );
}
