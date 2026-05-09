# Spec 015 — Mobile Experience Model

**Status:** Ready for implementation  
**Figma node:** [Home • Mobile](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1106-4619&m=dev) (node `1106:4619`)  
**Depends on:** Spec 014 (Mobile Blank Slate)  
**Blocks:** All mobile implementation specs (016+)

---

## What this spec is

This spec defines what the home page experience is on mobile and how mobile sections relate to their desktop counterparts. Every mobile section spec (016+) builds within this model. Nothing in this spec requires implementation on its own — it is the reference point for all mobile work that follows.

---

## The mobile experience

The mobile home page is a normal scrolling page. The visitor arrives and scrolls freely from top to bottom. Nothing holds them in place. No section waits for an animation to finish before allowing the next scroll. Content is immediately visible in every section.

This is a deliberate departure from the desktop experience, which is an animated, directed journey where sections hold the viewport while transitions play. That model does not translate to mobile. On mobile, the page is calm and direct.

---

## Each section has its own mobile design

Every home page section has a corresponding mobile layout in the Figma. The mobile layouts are not simply narrower versions of the desktop — several sections are substantively different in how they are arranged and what they show.

The mobile Figma reference for the full page is linked above. Individual section specs (016+) link to the specific Figma node for their section.

Sections that need a dedicated mobile layout, in top-to-bottom order:

1. Hero
2. Work Showcase
3. Every Channel
4. Product Screens
5. Social Proof
6. Pricing
7. Footer

Blog and legal pages do not need dedicated mobile layouts as part of this work. They are handled separately if needed.

---

## The breakpoint

Below 768px, mobile layouts are shown. At 768px and above, desktop layouts are shown. There is no tablet-specific layout — tablet uses the desktop design.

---

## How sections are implemented

Each section spec introduces a mobile version of that section alongside its existing desktop version. The desktop version is not changed. Both exist in the codebase simultaneously — the mobile layout is shown on small screens and hidden on larger ones, and vice versa.

Section specs are implemented in top-to-bottom page order, one at a time, so the mobile page comes together progressively.

---

## Technical recommendations

These are not requirements — they are suggestions for the implementer based on the constraints of the project.

**Separate files for structurally different sections; responsive utilities for everything else.** Some sections on mobile have a fundamentally different layout — different number of visible elements, different visual hierarchy, different interactions. Those sections should have a dedicated mobile file alongside their desktop file. The two files share content props but have entirely independent markup. Other sections are essentially the same structure at both sizes, just with different spacing, font sizes, or column counts. Those stay as a single file using responsive CSS utilities. The test: if describing the mobile layout requires saying "this element moves here and that element disappears," it needs a separate file. If it just requires saying "this is smaller and this has less padding," it stays in one file.

**CSS visibility, not JavaScript.** The choice between showing the mobile or desktop version should be handled by CSS at the browser level, not by JavaScript detecting the screen size at runtime. This avoids a flash of the wrong layout on load and keeps the page working correctly even before any scripts run.

**No scroll animations on mobile.** The scroll-holding animation system that drives the desktop experience should not initialise on mobile at all. It should be completely inert — not paused, not simplified, simply never started. This keeps mobile scrolling native and uninterrupted.

**Mobile sections have natural height.** Desktop sections are forced to exactly fill the viewport so the animation model works. Mobile sections should be as tall as their content requires — no more, no less.

---

## Acceptance criteria

This spec has no implementation of its own. Its acceptance criteria are verified once the first section spec (016) is complete:

- [ ] Below 768px, the first implemented section shows its mobile layout
- [ ] At 768px and above, the same section shows its desktop layout unchanged
- [ ] Both layouts are present simultaneously — switching between viewport widths shows the correct one instantly with no flash or delay
