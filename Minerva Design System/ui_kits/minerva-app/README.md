# Minerva — app UI kit

High-fidelity, interactive recreation of the **Minerva** student productivity app, built entirely from the design-system components on `window.MinervaDesignSystem_5790c8`.

## Run it
Open `index.html`. The app fills the viewport: navy sidebar on the left, the active screen on the right. Click the nav to move between screens.

## Screens
- **DashboardScreen.jsx** — hero greeting (with the study illustration), the pending-task row, and the finance trio (Balance / Spending sparkline / Insight). Mirrors the Figma "Desktop - 1" frame.
- **PomodoroScreen.jsx** — a *working* focus timer: real countdown, Focus/Break modes, start/pause/reset, session counter. Built on `PomodoroDial`.
- **TasksScreen.jsx** — add a task (type + Enter or "Add"), click a task to toggle done; split into To-do / Completed.
- **BudgetScreen.jsx** — balance + month summary stat cards and per-category budgets with `ProgressBar`s.
- **BadgesScreen.jsx** — achievement grid with locked/unlocked medals and an earned-progress header.

## Composition
Screens are thin: they read mock data from `data.js` (`window.MinervaData`) and compose primitives — `Sidebar`, `PageHeader`, `Card`, `TaskChip`, `StatCard`, `Button`, `Avatar`, `ProgressBar`, `PomodoroDial`, `AchievementBadge`. No component logic is re-implemented here. The only local helper is a small inline `Sparkline` in the dashboard.

## Assets
- `../../assets/minerva-logo.png` — sidebar logo
- `../../assets/study-hero.png` — dashboard hero illustration

## Notes / fidelity
The Figma file contained one fully-designed screen (Dashboard) and four placeholder shells (Pomodoro, Tasks, Budget, Badges). The Dashboard is a faithful recreation; the other four are built **in the established Minerva visual language** to round out the product, not copied from finished designs. They are clearly real-product views, not storybooks.
