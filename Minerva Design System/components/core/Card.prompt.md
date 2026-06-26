Minerva surface card — the base rounded block every panel is built on, carrying the brand's hard 3D drop shadow.

```jsx
<Card tone="light">Balance summary…</Card>
<Card tone="navy" shadow="lift">Hero greeting…</Card>
<Card tone="teal" blob pad={20}>Maximize Your Productivity</Card>
```

Tones: `light`, `navy`, `blue`, `teal`, `orange`, `red`. `shadow`: `pop` (default) / `lift` (big) / `soft` / `none`. Set `blob` for the promo card's sharp bottom-left corner. Compose StatCard, TaskChip, PromoCard, etc. on top of this.
