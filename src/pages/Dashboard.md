# Minerva — Dashboard Page Spec

Reference build of the dashboard screen. This doc is the source of truth for layout, components, and styling. The React implementation under `src/` mirrors it.

## Layout at a glance

Two columns on a light grey page background:

```
┌──────────────┬──────────────────────────────────────────────┐
│              │  Topbar: "Dashboard" + date | +Task | avatar │
│   SIDEBAR    │──────────────────────────────────────────────│
│  (navy,      │  HERO BANNER (navy)                          │
│   fixed)     │   "Hi Raja, Ready for a study session?"      │
│              │   [Start Pomodoro]            [illustration] │
│  - logo      │──────────────────────────────────────────────│
│  - Dashboard │  Pending task                                │
│  - Pomodoro  │  [Walk cat][Assignment][Gym][Watch Anime]    │
│  - Tasks     │──────────────────────────────────────────────│
│  - Budget    │  [ Balance ]  [ Spending chart ]  [ Insight ]│
│  - Badges    │                                              │
│  - Upgrade   │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

The whole app sits inside a white rounded card floating on a near-black (`#000`) page, matching the mockup.

## Color scheme

| Token            | Hex       | Used for                                  |
|------------------|-----------|-------------------------------------------|
| `--orange`       | `#FB8500` | Primary accent, buttons, active nav, RM balance |
| `--navy`         | `#023047` | Sidebar, hero banner, app background frame |
| `--grey`         | `#ADB5BD` | Muted text, secondary labels              |
| `--teal`         | `#219EBC` | Info cards (balance, spending, insight), accents |
| `--red`          | `#D62828` | Urgent task cards                         |
| `--white`        | `#FFFFFF` | Surfaces, card backgrounds                |
| `--black`        | `#000000` | Page backdrop, primary text on light      |

## Components

### Sidebar (`components/Sidebar.jsx`)
Navy panel, full height. Top: Minerva logo (white pill with runner mark + "MINERVA" wordmark). Nav list: Dashboard (active = orange pill), Pomodoro, Tasks, Budget, Badges. Inactive items are grey text on navy. Bottom: teal "Maximize Your Productivity" promo card with an orange "Upgrade" button.

### Topbar (`components/Topbar.jsx`)
Left: "Dashboard" title in orange + the current date ("Tuesday 23 June 2026"). Right: orange "+ Task" button and a circular avatar button.

### HeroBanner (`components/HeroBanner.jsx`)
Navy rounded banner. Headline "Hi Raja, Ready for a study session?" in white. Orange "Start Pomodoro" button with a timer icon. Right side: study illustration (asset image).

### PendingTasks (`components/PendingTasks.jsx`)
Section title "Pending task". A row of task cards, each: title, time/date subtitle, and a checkbox. Card color encodes urgency:
- Red (`--red`): Walk the cat (9:00 a.m, Today), Assignment (7:00 a.m, Today)
- Orange (`--orange`): Gym (12:00 p.m, Tomorrow)
- Teal (`--teal`): Watch Anime (9:00 a.m, 27 June)

### BalanceCard (`components/BalanceCard.jsx`)
Teal card. "Balance :" label, big orange amount "RM 6767.67", orange "Add purchase" button.

### SpendingCard (`components/SpendingCard.jsx`)
Teal card titled "Spending". A white line/area chart (Chart.js) showing a rising spending trend.

### InsightCard (`components/InsightCard.jsx`)
Teal card titled "Insight". Placeholder for future analytics content.

## Data (mock)

All content is mock data held in the components for now. Real data wires into Firebase later:
- `tasks` → Firestore collection per user
- `balance` / `spending` → budget collection
- `user.name` → auth profile

## Assets needed

Drop these into `src/assets/` (see `assets/README.md`):
- `minerva-logo.png` — runner wordmark logo (currently rendered as inline SVG fallback)
- `study-hero.png` — three students celebrating illustration for the hero banner

## Responsive notes

- Desktop: sidebar fixed at 200px, main area fluid.
- The pending-task row and the bottom card row use CSS grid; they wrap to fewer columns under ~900px.
