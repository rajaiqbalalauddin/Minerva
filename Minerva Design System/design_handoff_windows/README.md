# Handoff: Minerva — Profile & Upgrade Windows

## Overview
Two modal windows for **Minerva**, a student productivity app (dashboard, pomodoro, budget, badges, premium AI features):

1. **Profile window** — account modal: avatar, plan status, quick stats, editable name/email, save/log-out actions, and a Premium upsell nudge for free users.
2. **Upgrade window** — premium paywall modal: a navy pricing panel with a monthly/yearly toggle and a white feature-checklist panel with the upgrade CTA.

Both float, centered, over a dimmed (`rgba(2,48,71,.55)`) version of the running app.

## About the Design Files
The files in `references/` are **design references created in HTML** (`.dc.html` prototypes) — they show the intended look and behavior, **not** production code to copy verbatim. They render against Minerva's design-system bundle and use its React components (`Sidebar`, `Avatar`, `Input`, `Button`, `Badge`, `PageHeader`, `Card`, `StatCard`).

Your task: **recreate these windows in the target codebase using its existing patterns and component library.** If the Minerva design system already exists as code in the target repo, reuse those components. If no front-end environment exists yet, pick the most appropriate framework and implement there. This README is self-sufficient — every measurement, color, and string is below.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, radii, shadows, and interactions. Recreate pixel-accurately.

---

## Design Tokens

### Color
| Token | Hex | Use |
|---|---|---|
| orange | `#FB8500` | primary accent, prices, active toggle, CTA fill |
| orange-deep | `#E57700` | orange hover/press |
| orange-soft | `#FFE8CC` | streak stat tile bg |
| navy | `#023047` | structure, header band, dark panel, primary text |
| navy-2 | `#06384F` | sidebar inactive hover |
| grey | `#ADB5BD` | muted metadata text |
| blue | `#219EBC` | info/finance; upgrade-nudge bg |
| blue-soft | `#D3EEF4` | badges stat tile bg |
| teal | `#00A896` | done/positive; checkmarks; sessions tile accent |
| teal-soft | `#CDEEE9` | sessions stat tile bg |
| red | `#D62828` | urgent (not used in these windows) |
| lilac | `#EADDFF` | avatar fill (`lilac-ink` `#4F378A` for initials) |
| white | `#FFFFFF` | surfaces |

Overlay scrim: `rgba(2,48,71,.55)`. Text-on-color uses white at 82–90% opacity.

### Typography (4 faces)
- **Jersey 10** (pixel display) — titles, big numbers, button labels. Renders ~30% short, so set large. `--font-display`.
- **Jaro** (chunky rounded) — hero greetings, person name. `--font-hero`.
- **Lexend Deca ExtraBold (800)** — small metadata labels, dates, kickers. `--font-meta`.
- **Lexend** — body copy, input text, descriptions. `--font-body`.

Jersey 10 & Jaro ship as local TTFs; Lexend / Lexend Deca load from Google Fonts.

Sizes used here: kicker 13px/800/letter-spacing 1.5px · big headline (pixel) 52px · price (pixel) 64px · window title (pixel) 30px · person name (Jaro) 30px · stat number (pixel) 38px · stat label (meta) 12px · feature title 16px/600 · feature sub 13px · body 15px · fine print 12px.

### Shape
- Radius: `15px` (buttons/chips/small cards & stat tiles), `30px` (the window cards & large cards), `100px` (avatars, pills, toggle), blob `15px 15px 15px 50px` (sharp bottom-left — the upgrade nudge & promo card).
- Shadows (hard, offset, 25% black — no soft ambient blur):
  - soft `2px 4px 4px 0 rgba(0,0,0,.25)` — stat tiles, checkmarks, nudge, active toggle pill
  - pop `5px 10px 4px 0 rgba(0,0,0,.25)` — default cards/buttons, avatar ring
  - lift `10px 20px 4px 0 rgba(0,0,0,.25)` — the floating window cards
  - navy `5px 10px 4px 0 #023047` — orange buttons cast a **navy** shadow (the `orange-navy` button variant)
  - inset `inset 0 4px 4px 0 rgba(0,0,0,.25)` — input/progress tracks
- Borders: mostly borderless. Inputs are the exception: `2px solid #023047`.

### Spacing
8px base scale: 4 / 8 / 12 / 16 / 24 / 32 / 40 / 56 / 72.

---

## Screens / Views

### 1. Profile window
**Purpose:** view/edit account, see study stats, log out, and (free users) jump to upgrade.

**Container:** centered modal, `width: 520px` (max 100%), `background #fff`, `border-radius 30px`, `box-shadow` = lift, `overflow:hidden`. Scrim fills viewport; on short viewports the scrim is `overflow-y:auto` and the card uses `margin:auto` so nothing clips.

**Layout (top → bottom):**
1. **Navy header band** — `height 128px`, `background #023047`, `border-radius` inherits top corners. Contains:
   - Title "Profile" — pixel font, 30px, white, positioned top:22px left:28px.
   - Close button — top:18px right:18px, `38×38`, circle (`radius 100px`), `background rgba(255,255,255,.14)` → hover `.26`, white `✕` glyph 18px.
2. **Avatar** — `100×100` lilac round avatar (image → initials → glyph), wrapped in a white `5px` ring with pop shadow, pulled up with `margin-top:-56px` so it overlaps the band; everything below is centered in a column with `padding: 0 28px 28px`.
3. **Identity** — name "Raja Kumar" (Jaro, 30px, navy); email "raja.kumar@student.edu" (Lexend, 15px, grey); plan **Badge** below (soft + leading dot). Free → tone grey, label "Free plan". Premium → tone teal, label "Premium".
4. **Stat tiles** — 3-col grid, `gap 14px`, full width, `margin-top 24px`. Each tile: soft-tint bg, radius 15px, soft shadow, padding `16px 10px`, centered. Big pixel number (38px, navy) over a meta label (12px/800, navy, letter-spacing .2px):
   - `12` / DAY STREAK — bg orange-soft
   - `148` / SESSIONS — bg teal-soft
   - `9` / BADGES — bg blue-soft
5. **Editable fields** — column, `gap 16px`, `margin-top 24px`. Two Minerva Inputs (pixel label above, `2px` navy border, radius 15px, soft shadow, Lexend 16px text):
   - Name — value "Raja Kumar"
   - Email — value "raja.kumar@student.edu"
6. **Upgrade nudge (free plan only)** — blob-corner card, bg blue, soft shadow, padding `16px 18px`, `margin-top 20px`, row layout. Left: pixel headline "Unlock AI Tutor" (24px, white) + sub "Go Premium for unlimited focus & AI help." (13px, white 88%). Right: small `orange-navy` **Upgrade** button. Hidden when plan = Premium.
7. **Actions** — row, `gap 14px`, `margin-top 24px`. "Save Changes" (primary/orange, `full` — fills remaining width) + "Log Out" (ghost).

**Variant prop:** `plan: "Free" | "Premium"` (default Free). Premium hides the nudge and turns the badge teal/"Premium".

### 2. Upgrade window
**Purpose:** convert a free user to premium; communicate value + price.

**Container:** centered modal, `display:flex`, `width: 780px` (max 100%), bg #fff, radius 30px, lift shadow, `overflow:hidden`. Same scrim/scroll behavior as above. Close `✕` button absolute top:18px right:18px (`38×38` circle, `rgba(255,255,255,.16)` → hover `.3`, white, z-index 2).

**Left panel — navy pricing (42% width, flex-shrink 0):** `background #023047`, `padding 34px 30px`, column, white text.
- Kicker "MINERVA PRO" — meta 13px/800, letter-spacing 1.5px, color orange.
- Headline "Go Premium" (two lines) — pixel 52px, line-height .92, white, `margin-top 8px`.
- Subhead "Make studying feel like a game you're winning." — Lexend 15px, white 82%, line-height 1.45.
- **Billing toggle** — `margin-top 24px`, flex row, `gap 4px`, `background rgba(255,255,255,.1)`, radius 100px, `padding 4px`. Two pills, each `flex:1`, padding `9px 0`, meta 13px/800. **Active** pill: bg orange, navy text, soft shadow. **Inactive** pill: transparent bg, white 70% text, pointer cursor.
- **Price** — `margin-top 24px`, baseline row, `gap 8px`. Big pixel number (64px, orange) + period "/ month" (15px, white 78%). Below: save note (meta 12px/800, teal).
- Spacer pushes the **study-hero illustration** (`assets/study-hero.png`) to the bottom, full width, bleeding off the bottom edge (`margin-bottom:-34px`).

**Right panel — features + CTA (flex:1):** `padding 38px 34px 30px`, column.
- Heading "Everything you get" — pixel 30px, navy.
- **Feature list** — column, `gap 16px`, `margin-top 22px`. 5 rows; each: a `26×26` teal circle (radius 100px, soft shadow) with a white `✓` (14px/700), then a title (Lexend 16px/600 navy) over a sub (Lexend 13px grey). Items:
  1. AI Tutor chat — "Ask questions, get instant help"
  2. Unlimited focus sessions — "No daily pomodoro cap"
  3. Advanced budget insights — "Weekly trends & forecasts"
  4. Exclusive badges — "Premium-only achievements"
  5. Ad-free experience — "Pure, distraction-free study"
- Spacer, then CTA block (`margin-top 26px`): full-width `orange-navy` **Upgrade** button, a centered ghost **Maybe later** button (`margin-top 12px`), and fine print "Cancel anytime · No ads, ever" (12px grey, centered).

---

## Interactions & Behavior

**Profile window**
- Close button dismisses the modal.
- Inputs are editable; "Save Changes" persists name/email (wire to your account API).
- "Log Out" ends the session.
- Free-plan nudge "Upgrade" opens the Upgrade window.
- `plan` controls nudge visibility + badge.

**Upgrade window**
- **Billing toggle** switches `monthly`/`yearly` and updates, live:
  - price: `RM 19` (monthly) / `RM 15` (yearly) — both shown as `/ month`
  - save note: "Billed monthly" / "Billed yearly — save 20% 🎉"
  - CTA label: "Upgrade Now" / "Upgrade — RM 180/yr"
- Default selection: **yearly**.
- CTA initiates checkout; "Maybe later" and `✕` dismiss.

**Buttons (brand-wide):** press = squash toward shadow `translate(3px,5px)` + shadow shrinks, ~90ms. The `orange-navy` variant casts a **navy** shadow, not black. Nav hover = 120ms navy-2 background fade. No infinite/decorative loops. Respect `prefers-reduced-motion`.

## State Management
- **Profile:** `plan` ('Free' | 'Premium'); form fields `name`, `email`; submit + logout handlers.
- **Upgrade:** `billing` ('monthly' | 'yearly', default 'yearly'); derived price / period / saveNote / ctaLabel; checkout handler.
- Both: an `open`/dismiss flag owned by the parent.

## Assets
- `assets/study-hero.png` — flat-vector three-students illustration (in the upgrade left panel). Copy from the Minerva design system.
- `assets/minerva-logo.png` — runner wordmark (used in the Sidebar behind the scrim).
- Fonts: Jersey 10 + Jaro (local TTFs in the DS `assets/fonts/`); Lexend + Lexend Deca (Google Fonts).
- **Icons:** functional glyphs use plain Unicode here (`✕` close, `✓` feature check) — substitute your icon library if preferred. The Minerva DS otherwise standardizes on Lucide. Emoji (🎉) is intentional brand delight on the save note — keep or drop per your conventions.

## Files
- `references/ProfileWindow.dc.html` — profile window prototype (template markup + a small logic class deriving `plan` state).
- `references/UpgradeWindow.dc.html` — upgrade window prototype (template + logic class for the billing toggle and derived price/labels).

These reference Minerva components via `window.MinervaDesignSystem_5790c8.{Sidebar, Avatar, Input, Button, Badge, PageHeader, Card, StatCard}`. Each component in the design system has a sibling `.d.ts` (props contract) and `.prompt.md` (usage) — pull those in for exact prop shapes.
