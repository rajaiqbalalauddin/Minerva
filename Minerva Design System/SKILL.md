---
name: minerva-design
description: Use this skill to generate well-branded interfaces and assets for Minerva, the student productivity app (dashboard, pomodoro, budget, badges), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files (token CSS in `tokens/`, components in `components/`, foundation cards in `guidelines/`, and the interactive app in `ui_kits/minerva-app/`).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out (logo, study illustration, fonts in `assets/`) and create static HTML files for the user to view — link `styles.css` and use the brand tokens. If working on production code, copy assets and read the rules here to become an expert in designing with this brand; recreate components using `window.MinervaDesignSystem_5790c8` after loading `_ds_bundle.js`.

The Minerva look in one line: **semi-pixel-art + modern, chunky rounded blocks floating on hard offset drop shadows; navy structure, orange accent, a red/orange/teal/blue status-color set; Jersey 10 pixel display + Jaro hero + Lexend body.**

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
