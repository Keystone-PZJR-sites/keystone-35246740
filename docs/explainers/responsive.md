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
- Where the custom CSS file sets `display: flex` (or any value other than `block` / `none`), restate the visibility rule in a media query in the CSS file — Tailwind utilities live in `@layer utilities` and unlayered custom CSS beats them.

## Section Heights

Per spec 026, every homepage section is sized to its content with a `min-height: 100svh` floor. That means:

- The section is always at least the visible viewport height (`svh` accounts for mobile browser chrome — see spec 026 for why `svh` was chosen over `vh` and `dvh`).
- If the content is taller than one viewport on a short window, the section grows past `100svh` so nothing clips.
- The breathing room above the first content element and below the last comes from a single token: `--section-padding-y`, defined in `styles/base.css`. Every affected section uses it; the named exceptions (Hero desktop, Every Channel, Product Screens desktop, footers) are documented in spec 026.
- No section uses `h-screen`, `height: 100vh`, or 100vh-based positional math anywhere.
- No homepage section is pinned. Spec 026 retired the pin system; entrance animations play once on viewport entry via direct ScrollTriggers (`docs/explainers/animations.md` has the details).

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
