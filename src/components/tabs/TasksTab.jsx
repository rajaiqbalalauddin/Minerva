// src/components/tabs/TasksTab.jsx
// The coordinator: owns project + date, builds the storage key, wires the pieces.
import { useState } from "react";
import ProjectBar from "../ProjectBar";
import Pomodoro from "../Pomodoro";
import TodoList from "../TodoList";
import styles from "./TasksTab.module.css";

export default function TasksTab({ isPro = true, onAwardXP = () => {} }) {
  const [projects, setProjects] = useState(["Default"]);
  const [currentProject, setCurrentProject] = useState("Default");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // Same key idea as your localStorage version: project + date identify a list.
  const storageKey = `${currentProject}__${date}`;

  const addProject = (name) => {
    setProjects((prev) => [...prev, name]);
    setCurrentProject(name);
  };

  const deleteProject = () => {
    if (currentProject === "Default") return alert("Cannot delete Default project.");
    if (!confirm(`Delete project "${currentProject}"?`)) return;
    setProjects((prev) => prev.filter((p) => p !== currentProject));
    setCurrentProject("Default");
  };

  const handlePomodoroComplete = () => onAwardXP(30, "Pomodoro Session Done");

  return (
    <div className={styles.tab}>
      <ProjectBar
        projects={projects}
        current={currentProject}
        onSelect={setCurrentProject}
        onAdd={addProject}
        onDelete={deleteProject}
        isPro={isPro}
      />

      <Pomodoro onSessionComplete={handlePomodoroComplete} />

      <div className={styles.todoHeader}>
        <h3>To-do list</h3>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={styles.dateInput}
        />
      </div>

      {/* key=storageKey: when project/date changes, React remounts TodoList fresh.
          A neat trick — changing a component's key forces it to reset. */}
      <TodoList key={storageKey} storageKey={storageKey} onAwardXP={onAwardXP} />
    </div>
  );
}