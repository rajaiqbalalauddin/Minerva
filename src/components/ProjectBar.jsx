// src/components/ProjectBar.jsx
import { Plus, Trash2 } from "lucide-react";
import styles from "./ProjectBar.module.css";

export default function ProjectBar({
  projects, current, onSelect, onAdd, onDelete, isPro,
}) {
  const atFreeLimit = !isPro && projects.length >= 3;

  const handleAdd = () => {
    if (atFreeLimit) return;
    const name = prompt("Project name:"); // simple for now; a modal can replace it later
    if (name && name.trim()) onAdd(name.trim());
  };

  return (
    <div className={styles.bar}>
      <label>Project</label>
      <select value={current} onChange={(e) => onSelect(e.target.value)}>
        {projects.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>
      <button className={styles.small} onClick={handleAdd} disabled={atFreeLimit}>
        <Plus size={14} /> New
      </button>
      <button className={styles.smallDanger} onClick={onDelete}>
        <Trash2 size={14} /> Delete
      </button>
      {atFreeLimit && <p className={styles.note}>Free plan: max 3 projects</p>}
    </div>
  );
}