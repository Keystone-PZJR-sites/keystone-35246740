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

## Mobile Section Pattern

Some homepage sections look structurally different on mobile — different element count, different hierarchy, different interactions. Those sections get a dedicated `Mobile*.tsx` file alongside the desktop component. Both files share the same content props. CSS handles which is shown.

- The **desktop** component carries `hidden md:block` on its root element.
- The **mobile** component carries `md:hidden` on its root element.
- The switch is handled entirely by CSS — no JavaScript breakpoint detection, no flash of the wrong layout.
- Mobile sections have natural height (no `h-screen`). GSAP does not initialise on them — the scroll-animation matchMedia guards (`(min-width: 768px)`) prevent that.

The test for whether a section needs a separate mobile file: if describing the mobile layout requires saying "this element moves here and that element disappears", use separate files. If it only requires saying "this is smaller and this has less padding", keep one file with responsive utilities.

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
