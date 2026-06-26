# Handoff: Minerva Design System → Claude Code

## Overview
This is the complete **Minerva** design system — a student productivity app (dashboard, pomodoro timer, budget tracker, badges, premium AI features). This bundle gives a developer using Claude Code everything needed to build Minerva-branded UI in a real codebase: brand foundations, design tokens, reusable components, and a full interactive app recreation.

## How to use this with Claude Code
This folder is **Agent-Skills compatible**. Drop the whole thing into your project (e.g. `.claude/skills/minerva-design/`) — `SKILL.md` at the root is the entry point. Then ask Claude Code to "use the minerva-design skill" and it will read the guidelines, tokens and components.

Start points for a developer:
1. **`readme.md`** — the full design guide: content voice, visual foundations, iconography. Read this first.
2. **`styles.css` + `tokens/`** — all design tokens as CSS custom properties. Port these to your codebase's token system.
3. **`components/`** — React component sources (`.jsx`) with prop contracts (`.d.ts`) and usage notes (`.prompt.md`).
4. **`ui_kits/minerva-app/`** — a working, interactive recreation of the product. The reference for how screens compose.

## About the design files
The files here are **design references** — React/HTML prototypes showing the intended look and behaviour, not production code to copy verbatim. The task is to **recreate them in the target codebase's environment** using its established patterns (its component library, styling approach, state management). If no environment exists yet, pick the most appropriate framework and implement there. The `.jsx` components are deliberately simple/cosmetic; treat them as a faithful spec, not as shippable code.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, shadows and interactions are all settled. Recreate pixel-for-pixel using your codebase's libraries.

## The Minerva look in one line
Semi-pixel-art blended with modern UI: chunky rounded blocks that float on **hard, offset drop shadows** (the "3D sticker" effect). Navy structure, orange accent, a red/orange/teal/blue status-color set. Pixel display type + rounded hero type + clean body.

---

## Design Tokens

### Colors
| Token | Hex | Role |
|---|---|---|
| `--mv-orange` | `#FB8500` | Primary accent — active nav, primary buttons, key numbers |
| `--mv-orange-deep` | `#E57700` | Orange hover/pressed |
| `--mv-navy` | `#023047` | Structure — sidebar, dark cards, ink on light |
| `--mv-navy-2` | `#06384F` | Sidebar hover fill |
| `--mv-grey` | `#ADB5BD` | Muted metadata |
| `--mv-blue` | `#219EBC` | Info / finance cards |
| `--mv-red` | `#D62828` | Urgent / overdue |
| `--mv-teal` | `#00A896` | Done / positive |
| `--mv-white` | `#FFFFFF` | Page surface |
| `--mv-black` | `#000000` | Section headings, dark button |
| `--mv-lilac` | `#EADDFF` | Decorative (avatars) |
| Soft tints | `--mv-orange-soft #FFE8CC`, `--mv-blue-soft #D3EEF4`, `--mv-red-soft #F7D5D5`, `--mv-teal-soft #CDEEE9` | Chip/badge backgrounds |

Status aliases: `--status-urgent` (red), `--status-soon` (orange), `--status-done` (teal), `--status-info` (blue).

### Typography
| Token | Family | Use |
|---|---|---|
| `--font-display` | **Jersey 10** (pixel) | Page titles, section heads, button labels, big numbers. Sizes 32–56px (renders short). |
| `--font-hero` | **Jaro** (rounded chunky) | Hero greetings, sidebar nav labels |
| `--font-meta` | **Lexend Deca ExtraBold** | Dates, small metadata |
| `--font-body` | **Lexend** | Body copy, descriptions |

Scale: display 48 · stat 56 · h2 40 · h4 32 · lead 24 · body 18 · sm 16 · xs 13 · nav 20.

### Radius
`--radius-sm 15px` (chips/buttons) · `--radius-md 30px` (cards/logo pill) · `--radius-frame 60px` (app frame) · `--radius-blob 15px 15px 15px 50px` (promo card) · `--radius-pill 100px` (avatars).

### Shadows (the core system — hard, offset, 25% black)
- `--shadow-soft` `2px 4px 4px rgba(0,0,0,.25)` — resting small elements
- `--shadow-pop` `5px 10px 4px rgba(0,0,0,.25)` — default cards/buttons
- `--shadow-lift` `10px 20px 4px rgba(0,0,0,.25)` — hero/floating
- `--shadow-navy` `5px 10px 4px #023047` — orange buttons cast a navy shadow
- `--shadow-inset` `inset 0 4px 4px rgba(0,0,0,.25)` — sidebar, progress tracks

No soft/blurred ambient shadows anywhere — keep it hard and offset.

### Spacing
8px base: 4 · 8 · 12 · 16 · 24 · 32 · 40 · 56 · 72. Sidebar width `256px`; content padding `32–40px`.

---

## Components
Reusable primitives (`components/core/`): **Button** (variants: primary/dark/navy/orange-navy/blue/ghost; sizes sm/md/lg; press = squash toward shadow), **Card** (tones light/navy/blue/teal/orange/red; shadow pop/lift/soft; `blob` corner), **Badge** (solid/soft pills), **Avatar** (image/initials/glyph, lilac), **Input** (navy-outlined), **ProgressBar** (inset track + colored fill).

App blocks (`components/app/`): **Logo**, **NavItem** (orange-active sidebar row), **Sidebar** (navy rail: logo + nav + promo), **PromoCard** (teal blob upsell), **PageHeader** (orange pixel title + grey date), **SectionTitle**, **TaskChip** (urgency-colored task), **StatCard** (finance card, big pixel value), **AchievementBadge** (locked/unlocked medal), **PomodoroDial** (countdown ring).

Each has a `.d.ts` (props) and `.prompt.md` (usage + example) sibling — read those for exact APIs.

## Screens (`ui_kits/minerva-app/`)
- **Dashboard** — hero greeting + study illustration, pending-task row, finance trio (balance / spending sparkline / insight). *Faithful Figma recreation.*
- **Pomodoro** — working timer: countdown, Focus/Break modes, start/pause/reset, session counter.
- **Tasks** — add task (Enter or button), click to toggle done; To-do / Completed split.
- **Budget** — balance + month summary cards, per-category budgets with progress bars.
- **Badges** — achievement grid (locked/unlocked) + earned-progress header.

`data.js` (`window.MinervaData`) holds all mock content; screens compose primitives only.

## Interactions & behaviour
- **Button press:** `translate(3px,5px)` + shadow shrinks to `--shadow-soft`, ~90ms ease.
- **Nav hover:** background fades to `--mv-navy-2` over 120ms; active row is an orange filled block with `--shadow-pop`.
- **Progress fill:** width transitions with slight overshoot `cubic-bezier(.34,1.4,.64,1)`.
- **Pomodoro ring:** `stroke-dashoffset` transitions linearly each second; orange in Focus, teal in Break.
- **Disabled:** 45% opacity, `not-allowed`.
- No infinite/decorative animation loops.

## Content voice
Friendly study-buddy: speaks to "you" by first name, ultra-short labels (1–2 words), Title Case buttons, sentence-case greetings. Money as `RM 6767.67`. Emoji used sparingly as reward/delight accents (🎉🔥💰🏅⏱) — mostly on badges, completion and the pomodoro, never in functional labels.

## Assets
- `assets/minerva-logo.png` — wordmark (white shadowed pill on navy).
- `assets/study-hero.png` — dashboard hero illustration.
- `assets/icons/stopwatch.png` — Start-Pomodoro glyph.
- `assets/fonts/` — Jersey 10, Jaro (ship locally). **Lexend & Lexend Deca load from Google Fonts** — bundle the TTFs if you need offline.
- **Icons:** the source Figma uses **Iconsax**; this system substitutes **Lucide** (no clean Iconsax static-SVG CDN). Swap to your icon library of choice; keep functional icons line-style.

## Files in this bundle
- `SKILL.md` — Agent-Skills entry point
- `readme.md` — full design guide (read first)
- `styles.css`, `tokens/*.css` — tokens & font-faces
- `components/core/*`, `components/app/*` — component sources + `.d.ts` + `.prompt.md`
- `guidelines/*.card.html` — foundation specimen cards
- `ui_kits/minerva-app/*` — interactive product recreation
- `assets/*` — logo, illustration, icon, fonts
