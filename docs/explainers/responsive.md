# Responsive Design Guide

This site has **one** mobile↔desktop boundary, used everywhere: below 985px every section renders its mobile layout; at 985px and up the desktop layout takes over. A secondary 1280px tier adds proportional polish on a few content pages but never swaps layouts. All sections must work correctly across this range.

---

## Breakpoints

| Name | Range | Tailwind prefix | Target device |
|------|-------|----------------|--------------|
| Mobile | < 985px | (base) | phones (375–430px) **and** tablets / iPad portrait (768–984px) |
| Desktop | ≥ 985px | `md:` | iPad landscape, laptops, desktop (design is at 1440px) |

**985px is the single source of truth for the mobile↔desktop hand-off.** It is the width at which the desktop nav bar stops fitting, so the whole site switches there in lockstep — sections, JS `matchMedia` gates, `<source media>` video swaps, and every hand-written media query. Because the boundary lives in one place, `tokens.css` redefines Tailwind's `md:` prefix to `985px` (its built-in default is 768px), so the utility and the CSS media queries always agree. There is no tablet-specific layout — tablets get the mobile design.

The number is **declared in exactly two places**, never inlined elsewhere:

- **CSS** reads it from the Tailwind theme at build time: stylesheets write `@media (width >= theme(--breakpoint-md))` / `@media (width < theme(--breakpoint-md))` (and the 1280px tier as `@media (width >= theme(--breakpoint-xl))`), so the value comes straight from `--breakpoint-md` in `tokens.css`.
- **JS / JSX** imports the mirrored constants from `design-system/tokens/breakpoints.ts` (`DESKTOP_MEDIA`, `MOBILE_MEDIA`, `DESKTOP_MIN_PX`) for `matchMedia` gates, GSAP `matchMedia`, `<source media>`, `<link media>`, `innerWidth` checks, and image `sizes`.

CSS and JS can't share a literal without a build step, so `breakpoints.ts` mirrors `--breakpoint-md`. To move the boundary, edit just those two declarations.

A secondary **1280px** refinement tier (hand-written `@media (min-width: 1280px)`, no utility prefix) nudges spacing and grid proportions toward the 1440px Figma on the blog, How It Works, and inner pages. It refines; it never swaps mobile↔desktop.

`sm:` (640px) and `lg:` (1024px) keep Tailwind's defaults and appear only on the internal `/styles` catalog for grid column counts — they are not site layout breakpoints.

### The one exception: the lead-capture modal

The lead-capture modal (`LeadCaptureModal.tsx`, `styles/components/lead-capture.css`) keeps its own **640px / 1024px** cutoffs, taken directly from its Figma spec (008 / 029). It is a self-contained overlay, not part of the page flow, so it is allowed to carry its own breakpoints. Nothing else in the app should introduce a new cutoff — reach for the 985px boundary instead.

### Navigation scaling within the desktop range

Above 985px the nav bar's chrome — wordmark, gaps, padding, login, and CTA — scales fluidly on a shared 985px→1600px band, so the whole pill shrinks in concert. The link type and inter-item spacing are deliberately held at a fixed Small/bold step rather than scaling, so their rhythm stays even. In the upper part of the mobile range (768–985px) the mobile menu takes wider side and top padding to match the desktop framing. All of this lives in `design-system/styles/components/site-nav.css`.

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

- The **desktop** component carries `hidden md:block` on its root element (`md:` resolves to 985px — see Breakpoints above).
- The **mobile** component carries `md:hidden` on its root element.
- The switch is handled entirely by CSS — no JavaScript breakpoint detection, no flash of the wrong layout.
- Where the custom CSS file sets `display: flex` (or any value other than `block` / `none`), restate the visibility rule in a media query in the CSS file — Tailwind utilities live in `@layer utilities` and unlayered custom CSS beats them. Use `@media (min-width: 985px)` / `@media (max-width: 984px)`.
- Sections that *additionally* gate an entrance animation or swap a `<source media>` video by width must use `(min-width: 985px)` / `(max-width: 984px)` in that JS/JSX too, so the behaviour agrees with the CSS visibility swap.

## Section Heights

Sections size to their content. There is no global `min-height: 100svh` floor — the breathing room above the first content element and below the last comes from a single token (`--section-padding-y`, defined in `styles/base.css`), and that is the only height contribution the section adds beyond what its children require. On a tall window, two adjacent sections may both be visible; that is intentional, not a bug.

A section may opt back into a viewport floor by setting `min-height: 100svh` in its own stylesheet, with a comment explaining why the layout requires it. That escape hatch exists because some sections are designed-for-one-viewport collages — their layout depends on a known section height and breaks without it. The current opt-ins, with the reason each needs the floor:

- **Hero (desktop):** the video + headline reveal is the entry hook for the page; sizing it to content would feel anti-climactic on a tall window.
- **Every Channel** (desktop and mobile) and **Social Proof** (desktop and mobile): readable content sits in normal flow, but decorative elements (channel pills, scattered thumbnails, the mobile EC video band and headline collage) are absolutely positioned at percentages of section bounds. Without a definite section height the percentages collapse.
- **Product Screens** (desktop and mobile): the rounded card / dark deco panel uses `flex: 1` to absorb the remaining vertical space inside the section. Without a section floor, that flex child resolves to 0 and the screenshot zone collapses.
- **Value Props** (desktop and mobile): desktop cards use `position: absolute` for their internal video panel and copy panel at percentages of card height — the cards collapse to their min-height (~400 px) without a definite section height. The mobile carousel viewport uses `flex: 1` and would resolve to 0.

Other rules that still hold:

- No section uses `h-screen`, `height: 100vh`, or 100vh-based positional math anywhere.
- No homepage section is pinned. Spec 026 retired the pin system; entrance animations play once on viewport entry via direct ScrollTriggers (`docs/explainers/animations.md` has the details).
- `svh` is the unit for the floor on the sections that opt in (not `vh` or `dvh`) — see spec 026 for the rationale.

The test for whether a section needs a separate mobile file: if describing the mobile layout requires saying "this element moves here and that element disappears", use separate files. If it only requires saying "this is smaller and this has less padding", keep one file with responsive utilities.

---

## Testing Checklist

Before marking a section complete:

- [ ] 390px (iPhone 14) — no horizontal overflow, all text readable, no clipping
- [ ] 834px (iPad portrait) — shows the **mobile** layout (tablets are mobile now), no overflow, no clipping
- [ ] 984px (just below the boundary) — still the mobile layout, nothing cramped
- [ ] 985px (the mobile↔desktop boundary) — the desktop layout takes over cleanly, with no gap or dead zone in the swap
- [ ] 1280px (large-desktop refinement tier) — proportions tighten toward Figma
- [ ] 1440px (Figma design width) — pixel-close to Figma
- [ ] All interactive elements have 44×44px minimum touch area on mobile
- [ ] Videos don't prevent scrolling on touch
- [ ] Font sizes are readable (no text smaller than 14px on mobile)
