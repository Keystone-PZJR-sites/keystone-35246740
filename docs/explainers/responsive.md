# Responsive Design Guide

This site has three primary breakpoints. All sections must work correctly at all three.

---

## Breakpoints

| Name | Range | Tailwind prefix | Target device |
|------|-------|----------------|--------------|
| Mobile | < 768px | (base) | iPhone 14 (390px), older phones (375px) |
| Tablet | 768px – 1279px | `md:` | iPad (768px, 1024px), large phones landscape |
| Desktop | ≥ 1280px | `lg:` | MacBook, desktop (design is at 1440px) |

---

## Design Philosophy

- **Desktop-first layout** — the Figma is at 1440px. Start from the desktop layout and adapt down.
- **Never clip or overflow** — if content overflows horizontally at any breakpoint, fix it. No `overflow-x: hidden` hacks on the body.
- **Touch-friendly** — all tappable elements are at least 44×44px on mobile.

---

## Typography Scaling

FK Screamer headlines are massive on desktop (216px) and must scale down dramatically. Use `clamp()` in `custom-overrides.css` for fluid font sizes, or Tailwind responsive prefixes (`md:`, `lg:`). The key size tiers are: hero headline (56px mobile → 216px desktop), section headline (48px → 128px), large section label (28px → 50px). All FK Screamer text uses `line-height: 0.82`.

---

## Testing Checklist

Before marking a section complete:

- [ ] 390px (iPhone 14) — no horizontal overflow, all text readable, no clipping
- [ ] 768px (iPad portrait) — layout shifts gracefully
- [ ] 1280px (desktop threshold) — matches Figma proportionally
- [ ] 1440px (Figma design width) — pixel-close to Figma
- [ ] All interactive elements have 44×44px minimum touch area on mobile
- [ ] Videos don't prevent scrolling on touch
- [ ] Font sizes are readable (no text smaller than 14px on mobile)
