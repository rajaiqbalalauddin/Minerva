// src/hooks/useTodos.js
// Why: all to-do CRUD in one hook, scoped to the current "key" (project + date).
// Holds the whole map internally so switching project/date never loses a list.

import { useState } from "react";

// MOCK data so the UI works before Firebase. Real shape: { text, done }.
const MOCK_STORE = {
  "Default__2026-05-24": [
    { text: "Finish IoT pipeline report", done: false },
    { text: "Submit cover letter", done: true },
  ],
};

export function useTodos(key) {
  const [store, setStore] = useState(MOCK_STORE);

  const todos = store[key] || [];

  // Helper that updates only the current key, immutably.
  const updateList = (transform) =>
    setStore((prev) => ({ ...prev, [key]: transform(prev[key] || []) }));

  const addTodo = (text) =>
    updateList((list) => [...list, { text, done: false }]); // new array, not push

  const completeTodo = (index) =>
    updateList((list) =>
      list.map((t, i) => (i === index ? { ...t, done: true } : t))
    ); // new object for the changed item, others untouched

  const deleteTodo = (index) =>
    updateList((list) => list.filter((_, i) => i !== index)); // new array minus one

  return { todos, addTodo, completeTodo, deleteTodo };
}