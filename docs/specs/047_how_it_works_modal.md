# Spec 047 — How It Works becomes a modal; a reusable demo-modal button

**Status:** The how-it-works modal half is reverted by spec 048 (How It Works is a standalone page again). The reusable demo-modal button half stands.
**Type:** A delivery + interaction change to already-built work. The how-it-works content (spec 040) stops being a standalone page and becomes a full-screen panel that slides in from the right, on every breakpoint, opened from the same links that pointed at it. The standalone route is retired. Separately, every "get a free demo / get in touch" call to action across the site becomes one reusable modal button that opens the lead-capture panel, instead of linking to a page.
**Reference:** The existing lead-capture modal's right-side slide-in (spec 008) — the motion the desktop nav's primary call to action already used. How-it-works now opens with that same motion everywhere.
**Depends on:** 040 (how-it-works content — `ProcessSteps`, `ProcessMock`, `data/how-it-works-page.tsx`), 008 (lead-capture modal + its slide-in), 034 (site nav — the "How it Works" link and the Services-dropdown promo), 037 / 039 (the inner-page sections the panel reuses).

---

## What this is

The how-it-works content already existed as a normal page at its own address. Visitors reached it from the nav link, the Services-dropdown promo, and the service-page calls to action. The page was only ever meant to feel like an overlay — the desktop nav already opened it as a panel that slid in from the right — so the standalone address was an accident of earlier transition trouble.

This change makes the overlay the only delivery. The content is identical to spec 040; it now lives inside a panel that slides in from the right and scrolls inside itself, on phone and desktop alike. Every link that used to point at the how-it-works address now opens this panel in place. The address itself is retired (removal of a route was explicitly requested).

A second, related cleanup: the site has many "get a free demo", "get a demo", and "get in touch" buttons. They all do the same thing — open the lead-capture panel — but were wired ad hoc. They collapse into one reusable demo-modal button with configurable label and appearance, and that button is the single place the demo-panel behavior lives.

---

## Scope

### In scope

- **How-it-works as a panel.** The spec-040 content renders inside a near-full-screen overlay that slides in from the right edge, covers the page, and scrolls internally. A close control sits pinned at the top-right; the panel also closes on Escape. Same motion as the lead-capture panel, applied on every breakpoint.
- **Every entry point opens the panel.** The nav "How it Works" link, the Services-dropdown promo (when it points there), and the service-page secondary calls to action all open the panel in place instead of navigating. These stay written as links.
- **The standalone route is retired.** The how-it-works address no longer resolves to a page; the content exists only as the panel.
- **One reusable demo-modal button.** A single button stands in for every "get a free demo / get a demo / get in touch" action. It opens the lead-capture panel directly, with configurable label, variant, size, and arrow. It replaces the previous page-linking buttons on the service-page heroes, the closing bands, the pricing estimator, the pricing summary, and the Services-dropdown promo.
- **Homepage "Services and pricing" buttons point at the pricing page.** The homepage hero and value-props secondary buttons navigate to `/pricing` (normal navigation), not the how-it-works panel.

### Out of scope

- **The how-it-works content itself** — unchanged from spec 040 (same header, six steps, recap, testimonial rail, FAQ, closing band).
- **The lead-capture panel and its form** — unchanged (spec 008 / 029). This spec only changes how it is opened.
- **The homepage nav's existing panel behavior** — already correct; it is the reference, not a target.

---

## Interaction & motion

- **Opening:** the screen behind dims as a panel slides in from the right edge and settles covering the viewport. Focus moves into the panel so the keyboard stays inside it.
- **Scrolling:** the content scrolls inside the panel; the page behind it is locked and does not move.
- **Closing:** the close control or Escape slides the panel back out to the right and the dim fades; focus returns to whatever opened it.
- **Reduced motion:** the panel appears and disappears with no slide — fully visible on open, gone on close — and the page is still locked while it is up.
- The demo-modal button opens the existing lead-capture panel with its existing motion; nothing about that panel changes.

---

## Accessibility

- The panel is a modal dialog: it traps focus, returns focus to its trigger on close, and closes on Escape. Its scroll container takes focus on open (not a form field), matching the lead-capture pattern.
- The page behind the panel is locked through the one approved scroll-lock path.
- The how-it-works entry points remain real links with discernible text; the demo actions are real buttons.

---

## Responsive behavior

- The panel is near-full-screen on every width and slides from the right on both mobile and desktop (no separate tablet treatment; the app-wide 985px hand-off still governs the content inside).
- The demo-modal button is full-width or inline per the surface that places it, exactly as the buttons it replaces were.

---

## Notes

- Because the how-it-works address is retired, the entry points are intercepted at the link level so existing markup keeps working without rewriting each call site as a button. The demo actions, by contrast, are buttons (no destination to fall back to), so they are wired explicitly through the reusable button.
- The "is this the demo action?" test and the demo destination live in one shared place so no surface re-implements the check.

---

## Acceptance criteria

- [ ] The how-it-works content opens as a right-sliding, internally-scrolling, near-full-screen panel from the nav link, the Services-dropdown promo, and the service-page secondary calls to action — on both mobile and desktop.
- [ ] The standalone how-it-works address no longer resolves to a page, and nothing renders that page directly.
- [ ] The panel closes on its close control and on Escape, locks the page behind it, and returns focus to its trigger on close.
- [ ] Under reduced motion the panel appears and disappears without sliding and the page stays locked.
- [ ] Every "get a free demo / get a demo / get in touch" action across the site (service heroes, closing bands, pricing estimator, pricing summary, Services-dropdown promo) opens the lead-capture panel through the one reusable demo-modal button.
- [ ] The homepage hero and value-props "Services and pricing" buttons navigate to `/pricing`.
- [ ] `npx tsc --noEmit` and `npm run lint` pass; the affected explainers are updated in the same commit.
