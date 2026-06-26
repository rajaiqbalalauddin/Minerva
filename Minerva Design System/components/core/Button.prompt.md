Minerva action button — a pixel-font (Jersey 10) label on a chunky block that casts the brand's hard drop shadow and squashes toward it on press.

```jsx
<Button variant="primary" size="md">Add purchase</Button>
<Button variant="dark" iconRight={<span>⏱</span>}>Start Pomodoro</Button>
<Button variant="orange-navy" full>Upgrade</Button>
```

Variants: `primary` (orange), `dark` (black, big lift shadow — used for "Start Pomodoro"), `navy`, `orange-navy` (orange block with navy shadow — used for "Upgrade"/"Add purchase"), `blue`, `ghost`. Sizes: `sm` / `md` / `lg`. Use `icon` / `iconRight` for glyphs and `full` to fill width.
