# Spec 030 - Homepage Hero Legibility Refresh

**Status:** Draft  
**Figma file:** `XRbD11WIevI5szRFiRrguZ`  
**Figma nodes:**
- [Desktop hero legibility update](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1429-768&t=v9KRQ48iQC8xG1Xt-4) (node `1429:768`)
- [Mobile hero legibility update](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1255-427&t=v9KRQ48iQC8xG1Xt-4) (node `1255:427`)
**Updates:** Spec 001 (Hero Animatic), Spec 016 (Mobile Hero)

---

## What this spec changes

This spec updates the homepage hero for legibility on desktop and mobile while keeping the existing content model and lead-capture wiring intact.

The main shift is that supporting hero content (K mark, subheadline, and CTAs) is visible on load with the headline, instead of waiting for post-scroll fade-in. Desktop also shortens the video frame to create a dedicated dark-green text band below the video.

---

## What does not change

- Video asset set, load strategy, and playback behavior are unchanged
  - same clip order
  - same carousel logic
  - same muted/autoplay/loop behavior
  - no additional eager video preloads
- Desktop headline can still scroll off the top of the viewport as it does today
- CTA actions still open the lead-capture modal through existing `useLeadCapture().openModal(...)` wiring
- Hero copy and labels continue to come from props (no hardcoded text values in component logic)
- Mobile hero remains static (no scroll-hold behavior)

---

## Breakpoints

| Label | Range |
|---|---|
| Mobile hero | `< 768px` |
| Desktop/tablet hero animatic | `>= 768px` |

---

## Desktop hero updates (`HeroAnimatic` + `HeroNav`)

### Layout and legibility

- Hero section background remains dark green.
- Video frame is shorter than full section height, creating a bottom dark-green band for text/CTA legibility.
- Supporting content is anchored in this lower dark-green band:
  - left: Keystone K mark + subheadline
  - right: CTA pair
- The two-line H1 remains over the video area and keeps current scale behavior.

### On-load visibility and motion

- On load, show the following immediately (no post-scroll reveal gate):
  - H1
  - K mark
  - subheadline
  - CTA group
- Replace delayed bottom-content fade with a subtle entrance animation on load:
  - opacity `0 -> 1`
  - translateY `8px -> 0`
  - duration target: `300-450ms`
  - easing: `power2.out` (or equivalent)
- Stagger is allowed but should be subtle and short so the hero feels immediately readable.

### Scroll behavior

- Preserve existing behavior where H1 scrolls/slides off the top during hero entrance progression.
- Do not re-introduce a second-stage reveal tied to that H1 movement; supporting content stays visible once loaded.

### Nav bar

Desktop nav is simplified and tightened:

- Thinner nav pill (reduced vertical padding)
- Reduced left/right nav padding
- Smaller Keystone wordmark render size
- Right side simplified to a single text-style link (`Get started ->`)
- Remove the extra right-side nav action from the previous design

### CTA structure

Bottom-right desktop CTAs are no longer wrapped in an outer dark pill container:

- `Learn more` becomes a standalone dark-green rectangle
- `Get started` remains a standalone green pill with arrow
- Keep existing modal trigger behavior for both

---

## Mobile hero updates (`MobileHero` + shared nav)

### Nav bar

- Replace `Login` action with `Get Started` as the single right-side primary action.
- Reduce Keystone wordmark height by 2px from current mobile value.
- Reduce nav bar total visual height by 2px to match updated wordmark sizing.
- Keep nav overlaid at the top of the hero media.

### CTA styling

Update mobile bottom CTA design to match desktop structure:

- `Learn more`: dark-green rectangle
- `Get started`: green pill with arrow
- No outer dark pill wrapper around both CTAs
- Updated button colors should match Figma node `1255:427`

### Content and media

- Keep existing mobile structure: video band on top, content zone below.
- No changes to mobile video loading/playback logic.
- Headline/subheadline copy and wrapping behavior stay content-driven by props.

---

## Visual tokens and sizing notes from Figma

Use these as implementation targets; source of truth is the linked Figma nodes.

### Desktop node `1429:768`

- Nav horizontal inset: 48px from viewport edges
- Nav width: 1344px in a 1440px frame
- Nav wordmark render height: 20px
- Video frame width: 1392px with 24px left/right inset and rounded bottom corners
- Video frame height is reduced to expose dark-green content band below
- CTA heights: 48px

### Mobile node `1255:427`

- Nav container inset: 8px from screen edges/top
- Nav width: 377px in a 393px frame
- Mobile wordmark render height: 18px
- Video zone height: 331px in an 852px frame
- `Learn more` and `Get started` CTA pair rendered as rectangle + pill combo

---

## Accessibility and motion

- Preserve button semantics and keyboard focus behavior for nav + CTAs.
- Respect `prefers-reduced-motion: reduce`:
  - suppress entrance animation
  - render all hero content in final visible state immediately
- Ensure no horizontal overflow at 390px, 768px, 1280px, and 1440px widths.

---

## Acceptance criteria

### Desktop

- [ ] Video frame is visibly shorter, creating a lower dark-green legibility band
- [ ] H1, K mark, subheadline, and CTAs are all present on initial load
- [ ] Supporting content does not wait for H1 scroll-off to appear
- [ ] A subtle fade + upward slide intro plays on load (unless reduced motion is enabled)
- [ ] H1 still scrolls/slides off the top as in the current hero behavior
- [ ] Nav is thinner with reduced side padding and smaller wordmark
- [ ] Nav has only one right-side text-style link (`Get started ->`)
- [ ] Bottom-right CTA group uses standalone rectangle + pill controls, no outer pill wrapper

### Mobile

- [ ] Nav right-side action is `Get Started` (replacing `Login`)
- [ ] Mobile wordmark height is reduced by 2px
- [ ] Mobile nav overall height is reduced by 2px
- [ ] Bottom CTA pair matches rectangle + pill structure and updated colors from Figma
- [ ] No regression in mobile video loading or playback behavior

### No regressions

- [ ] Hero CTAs still open lead capture via existing context API
- [ ] Copy remains prop-driven for both desktop and mobile hero components
- [ ] No horizontal overflow at target viewport widths
