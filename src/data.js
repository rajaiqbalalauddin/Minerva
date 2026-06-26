// Minerva — shared mock data. Matches the design system's data.js.
export const DATA = {
  user: { name: "Raja Kumar" },
  today: "Tuesday 23 June 2026",
  nav: ["Dashboard", "Pomodoro", "Tasks", "Budget", "Badges", "AI Chat"],

  tasks: [
    { id: 1, title: "Walk the cat", time: "9.00 a.m , Today", tone: "red", done: false },
    { id: 2, title: "Assignment", time: "7.00 a.m , Today", tone: "red", done: false },
    { id: 3, title: "Gym", time: "12.00 p.m , Tomorrow", tone: "orange", done: false },
    { id: 4, title: "Watch Anime", time: "9.00 a.m , 27 June", tone: "teal", done: false },
    { id: 5, title: "Read 20 pages", time: "8.00 p.m , 28 June", tone: "teal", done: true },
  ],

  balance: "RM 6767.67",
  spendData: [22, 30, 18, 42, 36, 58, 48, 70, 62, 88],
  budget: [
    { label: "Food", tone: "orange", spent: 320, cap: 500 },
    { label: "Transport", tone: "blue", spent: 140, cap: 200 },
    { label: "Books", tone: "teal", spent: 90, cap: 150 },
    { label: "Fun", tone: "red", spent: 210, cap: 220 },
  ],

  badges: [
    { label: "First Focus", glyph: "\u26A1", tone: "orange", unlocked: true, caption: "1 session" },
    { label: "Focus x10", glyph: "\uD83D\uDD25", tone: "orange", unlocked: true, caption: "10 sessions" },
    { label: "Big Saver", glyph: "\uD83D\uDCB0", tone: "teal", unlocked: true, caption: "Under budget" },
    { label: "Task Master", glyph: "\u2705", tone: "blue", unlocked: true, caption: "50 tasks done" },
    { label: "Night Owl", glyph: "\uD83E\uDD89", tone: "navy", unlocked: false, caption: "Study after 11pm" },
    { label: "Streak x30", glyph: "\uD83C\uDFC6", tone: "red", unlocked: false, caption: "30-day streak" },
  ],
};
