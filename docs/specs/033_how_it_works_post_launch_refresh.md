# Spec 033 — How It Works Post-Launch Refresh

**Status:** Published  
**Depends on:** Spec 032 (How It Works Landing Page), Spec 022 (Mobile Footer), Spec 028 (Lead Capture no autofocus)  
**Figma file:** `XRbD11WIevI5szRFiRrguZ`  

---

## What changed from Spec 032

This revision captures the shipped page after launch feedback and visual QA.

The page remains at `/how-it-works`, but the composition and interaction details were adjusted to improve clarity, visual consistency, and conversion behavior.

---

## Final page structure

The published order is:

1. Hero
2. Module-by-module section
3. Pricing section
4. Work Showcase section

---

## Hero updates

- Hero pills are centered in the media shell.
- Hero carousel uses a single right-arrow control.
- Pressing next on the final slide loops back to the first slide.
- Hero controls and surrounding media shells render without decorative outlines.
- CTA destinations are explicit:
  - “View portal” goes to the portal page.
  - “Get in touch” uses the shared lead-capture behavior (desktop modal, mobile page).

---

## Module section updates

- Section heading and row copy were updated to the final approved wording.
- Rows continue to alternate media and copy on larger breakpoints.
- Mobile remains stacked and touch-friendly.
- Manual carousel arrows were removed.
- Module media now auto-advances on a regular cadence with a soft cross-dissolve.
- Reduced-motion behavior stays stable and avoids motion-heavy transitions.
- Visual outlines around module media treatments were removed.
- Website module excludes mobile website mockups and keeps desktop-oriented website examples.
- Landscape-heavy modules keep full-width asset visibility and use adjusted media-frame height to avoid awkward empty space without side-cropping.

---

## Shared section behavior on this page

- Pricing and Work Showcase reuse the same shared content and visual treatment used elsewhere in the site.
- Work Showcase appears after Pricing for this route.

---

## Shell and global behavior

- Page uses the inner-page shell.
- Shared footer behavior is present on both desktop and mobile.
- Lead capture behavior is centralized and consistent with home and inner-page patterns.

---

## Accessibility and interaction checks

- Focus states remain visible on interactive controls.
- CTA and carousel interactions are keyboard-reachable.
- Touch interactions remain usable on mobile.
- Reduced-motion users receive non-theatrical equivalents.

---

## Acceptance criteria

### Structure and routing

- [x] `/how-it-works` remains a standalone route
- [x] Page order matches the published sequence in this spec

### Hero

- [x] Pills are centered
- [x] Carousel uses only right-arrow navigation and loops
- [x] CTA destinations match published behavior

### Modules

- [x] Rows alternate on larger breakpoints and stack on mobile
- [x] Media auto-advances with cross-dissolve
- [x] Website module excludes mobile website mockups
- [x] Landscape-heavy modules avoid side-cropping while reducing excess empty vertical space

### Shared behavior

- [x] Pricing and Work Showcase are reused with shared content
- [x] Footer is visible on both desktop and mobile for inner routes
- [x] Lead-capture interaction remains consistent across shared CTA surfaces
