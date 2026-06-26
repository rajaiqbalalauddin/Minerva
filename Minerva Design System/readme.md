# Minerva Design System

> A productivity app for students — dashboard, pomodoro timer, budget tracker and a badges system, with premium features (AI chat tutor & more). Minerva's look is **semi-pixel-art blended with modern UI**: playful but professional, built from chunky cards that float on hard 3D drop shadows.

This project is the Minerva design system: brand foundations, reusable React components, foundation specimen cards, and a full interactive app UI kit. The automated compiler bundles every component into `_ds_bundle.js` (namespace **`MinervaDesignSystem_5790c8`**) and indexes the tokens in `styles.css`.

---

## Sources

- **Figma:** `Minerva.fig` (attached, mounted read-only). One page (`Page-1`) with one fully-designed screen (`Desktop - 1` = Dashboard), four placeholder shells (Pomodoro / Tasks / Budget / Badges), a `Generic avatar` component, and Iconsax icon references. Top colors, fonts and the avatar were extracted directly from the file.
- **Uploads:** `minerva-logo.png` (runner wordmark), `study-hero.png` (three-students illustration), `Jersey10-Regular.ttf`, `Jaro-Regular-VariableFont_opsz.ttf`.
- **Brand palette (owner-supplied):** `#FB8500 #023047 #ADB5BD #219EBC #D62828 #FFFFFF #000000 #00A896`.

The reader is not assumed to have access to these; everything needed is copied into `assets/` and the token files.

---

## Index / manifest

**Root**
- `styles.css` — global entry point (only `@import`s the token files). Consumers link this.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skills-compatible front-matter wrapper.

**`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `shape.css` (radius / shadow / spacing).

**`assets/`** — `minerva-logo.png`, `study-hero.png`, `icons/stopwatch.png`, `fonts/` (Jersey 10, Jaro).

**`components/core/`** — `Button`, `Card`, `Badge`, `Avatar`, `Input`, `ProgressBar`.
**`components/app/`** — `Logo`, `NavItem`, `Sidebar`, `PromoCard`, `PageHeader`, `SectionTitle`, `TaskChip`, `StatCard`, `AchievementBadge`, `PomodoroDial`.

**`guidelines/`** — foundation specimen cards (Colors, Type, Brand, Spacing).

**`ui_kits/minerva-app/`** — the interactive product recreation (5 screens). See its `README.md`.

---

## CONTENT FUNDAMENTALS — how Minerva writes

The voice is a **friendly study buddy**: warm, brief, lightly playful, never corporate.

- **Person:** speaks *to* the student as "you", refers to them by first name. Greeting: *"Hi Raja, ready for a study session?"*
- **Tone:** encouraging and casual. Celebratory micro-copy is fine — *"All done — nice work! 🎉"*, *"29% under budget 🎉"*. Insights are plain-spoken: *"You spent 18% more this week. Most of it went to Fun."*
- **Length:** ultra-short. Labels are 1–2 words (*Dashboard, Pomodoro, Budget, Badges, Add purchase, Upgrade*). Headings are a few words. No paragraphs in the UI chrome.
- **Casing:** Title Case or single-word labels for buttons/nav; sentence case for greetings and body. Page titles render in the pixel face and read as words, not SHOUTING.
- **Numbers & currency:** money as `RM 6767.67` (Malaysian Ringgit). Times casual: `9.00 a.m , Today`, `12.00 p.m , Tomorrow`.
- **Emoji:** used sparingly as *reward/delight* accents (🎉 🔥 💰 🏅 ⏱) — mostly on badges, completion states and the pomodoro. Never inside formal labels. They punctuate success, they don't decorate every line.
- **Vibe:** "make studying feel like a game you're winning." Motivational without being preachy.

---

## VISUAL FOUNDATIONS

**Overall motif.** Semi-pixel-art meets modern dashboard. Everything is a **chunky rounded block that floats on a hard, offset drop shadow** — the signature "3D sticker" feel. Layouts are calm and grid-aligned; the playfulness comes from the pixel type, the bold color blocks and the shadows, not from clutter.

**Color.** Navy `#023047` is the structural color (sidebar, dark hero/stat cards, text on light). Orange `#FB8500` is the single accent — active nav, primary buttons, key numbers. A four-color set carries meaning on cards: **red** urgent, **orange** soon, **teal** done/positive, **blue** info/finance. White is the page surface; grey `#ADB5BD` is muted metadata. Pastel "-soft" tints back chips/badges. Lilac `#EADDFF` is decorative (avatars). Two background colors max per view (white content + navy chrome).

**Type.** Four faces, each with a job:
- **Jersey 10** (pixel) — page titles, section heads, button labels, big numbers. Renders short, so display sizes are large (32–56px).
- **Jaro** (rounded chunky) — hero greetings & sidebar nav labels.
- **Lexend Deca ExtraBold** — dates, small metadata labels.
- **Lexend** — body copy and descriptions.

**Backgrounds.** Flat color fields — no gradients on chrome (the one gradient is the dashboard spending sparkline's subtle navy→transparent area fill). No photographic backgrounds; imagery is the flat-vector **study illustration** and the runner **logo**. Imagery vibe: warm, friendly, flat cartoon with bold outlines — never photoreal, never grainy.

**Corner radii.** `15px` chips/buttons/small cards · `30px` large cards & the logo pill · `60px` the whole app frame · plus the **promo "blob"** corner (`15 15 15 50`, sharp bottom-left). Avatars/pills fully round.

**Shadows (the core system).** Offset, low-blur black shadows at 25% opacity:
- `--shadow-soft` `2px 4px` — resting small elements
- `--shadow-pop` `5px 10px` — default cards & buttons
- `--shadow-lift` `10px 20px` — hero / floating
- `--shadow-navy` — orange buttons cast a **navy** shadow instead of black
- `--shadow-inset` — inset, used inside the sidebar and progress tracks
There is no soft ambient/blurred Material shadow anywhere — keep it hard and offset.

**Borders.** Mostly borderless; color blocks separate themselves. Inputs are the exception: a `2px` navy outline. No hairline dividers — whitespace and shadow do the separating.

**Animation.** Restrained and tactile. Buttons **squash toward their shadow on press** (`translate(3px,5px)` + shadow shrinks, ~90ms). Progress fills ease with a slight overshoot (`cubic-bezier(.34,1.4,.64,1)`). Nav hover is a 120ms background fade. The pomodoro ring transitions linearly each second. No infinite/decorative loops.

**Hover / press states.** Hover: nav rows fill navy-2; buttons keep their shadow. Press: the squash described above. Disabled: 45% opacity, `not-allowed`.

**Transparency / blur.** Used only for *text-on-color* (white at 85–90% over navy/colored cards) and the sparkline area gradient. No glassmorphism / backdrop-blur.

**Cards.** Rounded (15–30px), solid fill, hard drop shadow, generous padding (18–36px). No border. The promo card uses the blob corner. Dark cards (navy) carry white text; colored cards carry white text; light cards carry navy text.

**Layout rules.** Fixed `256px` navy sidebar (logo pill top, nav middle, promo card pinned bottom) + flexible white content area with `32–40px` padding. Content uses CSS grid with `16–24px` gaps. Whole app sits in a `60px`-radius frame.

---

## ICONOGRAPHY

- **Icon family:** the Figma uses **Iconsax** (e.g. `iconsax-keyboard`, `iconsax-timer-start`). Iconsax has no convenient static-SVG CDN, so for new work **substitute the closest match: [Lucide](https://lucide.dev)** (clean, even-stroke line icons that sit well next to the pixel type) and flag the swap. *(⚠️ substitution — see Caveats.)*
- **Real assets copied in:** the pomodoro **stopwatch** glyph (`assets/icons/stopwatch.png`) used on the Start Pomodoro button.
- **Emoji as icons:** Minerva deliberately uses emoji for reward/delight surfaces — badge medals (🔥 💰 🏅 🦉 🏆 ✅) and the pomodoro ⏱. Treat emoji as a legitimate, intentional icon channel for gamified/celebratory contexts, not for functional toolbar icons.
- **Unicode:** the `+` on the "+ Task" button is a thin Lexend glyph, not an icon font.
- **Approach:** keep functional icons line-style and modest in weight; reserve filled/colorful glyphs (and emoji) for achievements and status.

---

## Using the system

Link the stylesheet and read components off the namespace:

```html
<link rel="stylesheet" href="styles.css" />
<script src="_ds_bundle.js"></script>
<script>
  const { Button, Card, TaskChip, Sidebar } = window.MinervaDesignSystem_5790c8;
</script>
```

Each component has a sibling `.prompt.md` with usage and a `.d.ts` with the props contract.

---

## Caveats

- **Fonts:** Jersey 10 and Jaro ship locally (uploaded). **Lexend & Lexend Deca are loaded from Google Fonts** — if you need them bundled/offline, send the TTFs and I'll host them.
- **Icons:** Iconsax (the Figma's set) is **substituted with Lucide** for new icons. If you'd rather keep true Iconsax, share the SVGs or confirm and I'll wire them in.
- **Screen coverage:** only the Dashboard existed as a finished Figma design. Pomodoro / Tasks / Budget / Badges were authored in Minerva's visual language to complete the product — please review them for intent.
