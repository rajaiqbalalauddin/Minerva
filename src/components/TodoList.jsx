// src/components/TodoList.jsx
import { useState } from "react";
import { Plus, Check, Trash2 } from "lucide-react";
import { useTodos } from "../hooks/useTodos";
import styles from "./TodoList.module.css";

export default function TodoList({ storageKey, onAwardXP }) {
  const { todos, addTodo, completeTodo, deleteTodo } = useTodos(storageKey);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const text = input.trim();
    if (!text) return;
    addTodo(text);
    setInput(""); // clear the box — done by resetting state, not input.value = ""
  };

  const handleComplete = (index) => {
    completeTodo(index);
    onAwardXP(20, "Task Completed"); // stub for now; becomes real in Section 6
  };

  return (
    <div className={styles.panel}>
      <div className={styles.inputRow}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="What needs to be done?"
        />
        <button className={styles.addBtn} onClick={handleAdd}>
          <Plus size={16} /> Add
        </button>
      </div>

      <ul className={styles.list}>
        {todos.length === 0 && (
          <li className={styles.empty}>Nothing here yet. Add a task above.</li>
        )}
        {todos.map((todo, index) => (
          // key: React needs a stable id per list item to track changes efficiently.
          // Index is acceptable here since we render the whole list together.
          <li key={index} className={todo.done ? styles.itemDone : styles.item}>
            <span className={styles.text}>{todo.text}</span>
            <div className={styles.actions}>
              {!todo.done && (
                <button
                  className={styles.completeBtn}
                  onClick={() => handleComplete(index)}
                  aria-label="Complete"
                >
                  <Check size={14} />
                </button>
              )}
              <button
                className={styles.deleteBtn}
                onClick={() => deleteTodo(index)}
                aria-label="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}