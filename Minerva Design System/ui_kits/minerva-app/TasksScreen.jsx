/* Minerva — Tasks screen. Add tasks, toggle done. */
const MVT = window.MinervaDesignSystem_5790c8;

function TasksScreen({ data }) {
  const { PageHeader, Button, Avatar, Input, SectionTitle, TaskChip, Badge } = MVT;
  const [tasks, setTasks] = React.useState(data.tasks);
  const [draft, setDraft] = React.useState("");

  function add() {
    const v = draft.trim();
    if (!v) return;
    setTasks((t) => [{ id: Date.now(), title: v, time: "Today", tone: "orange", done: false }, ...t]);
    setDraft("");
  }
  function toggle(id) {
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  }

  const open = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <PageHeader title="Tasks" date={data.today}
        actions={<Avatar name={data.user.name} size={56} />} />

      <div style={{ display: "flex", gap: 14, alignItems: "stretch" }}>
        <div style={{ flex: 1 }}>
          <Input placeholder="Add a new task…" value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()} />
        </div>
        <Button variant="primary" onClick={add}>Add</Button>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <SectionTitle>To do</SectionTitle>
          <Badge tone="red" soft>{open.length}</Badge>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {open.map((t) => <TaskChip key={t.id} title={t.title} time={t.time} tone={t.tone} onClick={() => toggle(t.id)} />)}
          {open.length === 0 && <div style={{ fontFamily: "var(--font-body)", color: "var(--mv-grey)" }}>All done — nice work! 🎉</div>}
        </div>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <SectionTitle color="var(--mv-grey)">Completed</SectionTitle>
          <Badge tone="teal" soft>{done.length}</Badge>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {done.map((t) => <TaskChip key={t.id} title={t.title} time={t.time} tone="teal" done onClick={() => toggle(t.id)} />)}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TasksScreen });
