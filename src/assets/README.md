# Assets — drop your images here

These images are referenced by the dashboard but can't be drawn in code. Drop in
files with the exact names below and the UI will pick them up automatically.
Until then, the components render an inline SVG / colored fallback so nothing breaks.

| File name          | Where it shows        | What it should be                                   |
|--------------------|-----------------------|-----------------------------------------------------|
| `minerva-logo.png` | Sidebar, top          | Minerva runner wordmark logo (white background pill) |
| `study-hero.png`   | Hero banner, right    | Illustration of students celebrating / studying     |

## How it works

Each component imports its image with a try/fallback pattern. To switch from the
fallback to your real asset, the component already imports from `../assets/<name>`.
Just add the PNG with the matching name and re-run the dev server.

Recommended sizes:
- `minerva-logo.png` — ~240x80 px, transparent or white background
- `study-hero.png` — ~480x360 px, transparent background works best on the navy banner
