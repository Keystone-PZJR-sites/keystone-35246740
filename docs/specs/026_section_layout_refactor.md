# Spec 026 — Section Layout Refactor: Content-Driven Height and Standardised Vertical Rhythm

**Status:** Ready for implementation
**Depends on:** Spec 001 (Hero Animatic), Spec 002 (Work Showcase), Spec 003 (Every Channel), Spec 005 (Pricing), Spec 006 (Social Proof), Spec 007 (Product Screens), Spec 011 (Scroll State Machine), Spec 015 (Mobile Experience Model), Spec 016 (Mobile Hero), Spec 017 (Mobile Every Channel), Spec 018 (Mobile Product Screens), Spec 019 (Value Props), Spec 020 (Mobile Social Proof), Spec 021 (Mobile Pricing), Spec 024 (Product Screens Refresh), Spec 025 (Homepage Pinning Toggle)

---

## Why this spec exists

Every homepage section today is locked to exactly the browser window's height. That height is set externally, not driven by the section's content. The consequences compound across sections and viewports:

- On shorter screens (a 768 px tall laptop, a phone in landscape, a windowed desktop browser), content inside sections gets clipped, collides with neighbouring elements, or drifts into dead zones — not because the content changed but because the window is shorter.
- On taller screens (a large monitor, a long phone) sections balloon with empty space that was never part of the design intent.
- Content-positioning inside sections is anchored using percentage offsets of that fixed window height. This means every position shifts when the window is a different shape. The result is that no two viewports produce the same visual relationships between content.
- There is no shared rhythm across sections. Each section independently invented its own top-and-bottom breathing room. The visitor scrolling down the page sees noticeably different amounts of space above and below content in each section, even though the sections read as a family.

This spec establishes two things: sections should be tall enough to fill the window but never shorter than their content requires, and the breathing room above and below content should follow a single site-wide standard.

---

## Design intent

### Sections fill the window by default

A homepage section seen on its own should look like a complete "frame" — it occupies the full window and feels intentional at that size. This is preserved. The change is that on shorter windows the section does not clip its content; it grows as needed. On any window tall enough to show the full design, the section stays exactly window-height.

No section is ever smaller than the visible browser window. Content never clips below the bottom of the window just because the window is short.

### A single vertical rhythm

Every section has the same amount of breathing room between the window edge and its content. This is a single value used everywhere — not a per-section decision. The breathing room scales gracefully: a little more on large screens, a little less on small ones, but always drawn from the same formula.

The breathing room applies to both the top and the bottom of the content area inside each section.

### Content positions are relative to content, not to the window

Elements inside a section are positioned relative to each other and to the section's padding — not as a percentage of the window height. Layouts that currently use window-height percentages to place a headline "at 5.47% from the top" or content "at 67.93% from the top" need to be rebuilt so those positions are expressed as spacing between adjacent elements.

The sole exception is the decorative background fill: a full-bleed video, a gradient that covers the whole section, or a floating decorative thumbnail layer that intentionally escapes the content flow. Those may remain anchored to the section bounds. Every piece of readable content — text, interactive elements, navigation pills — must be in normal flow.

---

## Affected sections

### Hero (desktop)

**Current behaviour:** The background video covers the section. The large headline and the CTA group at the bottom of the section are both positioned as absolute overlays anchored to the bottom edge of the window.

**After this spec:** The section is a vertically stacked flex container. The video remains as a full-bleed background. The headline and CTA sit in normal flow — the headline near the bottom, the CTA below it — separated by the standard vertical spacing. The section fills the window; if for some reason the content is taller than the window, the section grows.

### Work Showcase (desktop)

**Current behaviour:** The section is locked to window height. The headline, industry filters, and card carousel all sit inside it.

**After this spec:** The section grows to fit the headline, filters, and carousel at their natural sizes, with the standard vertical padding above and below. On windows tall enough to contain all of it, it looks identical to today.

### Every Channel (desktop)

**Current behaviour:** Section is locked to window height. The three-line headline and the pill row float as absolute overlays over the full-bleed video background.

**After this spec:** Section is a flex container. The full-bleed video remains as a background fill. The headline and pill row sit in normal flow, centered in the flex container, separated by their Figma spacing. Standard vertical padding above and below.

### Every Channel (mobile)

Same principle as desktop. Standard vertical padding replaces the absolute vertical positioning.

### Product Screens (desktop)

**Current behaviour:** The outer section is locked to window height. The entire inset dark card is an absolute box inset from all four edges of the window. The pill nav, mark, copy, and screenshot inside the card are all absolutely positioned by percentage of the card.

**After this spec:** The section grows to at least window height. The inset card is converted to a padded flex container (the inset gap becomes padding on the section, and the card fills the section). Content inside the card — pill nav, mark, copy, screenshot — is arranged in flex/grid layout. The standard section vertical padding replaces the current inset gap at the top and bottom.

### Product Screens (mobile)

Same principle. Standard vertical padding replaces absolute vertical positioning.

### Value Props (desktop)

**Current behaviour:** Section is locked to window height. The header row (headline left, CTA right) is absolutely positioned near the top of the window. The three-column card grid sits below it.

**After this spec:** The header and card grid are in normal flow inside a flex column. Standard vertical padding above the header and below the cards.

### Value Props (mobile)

**Current behaviour:** Section is locked to window height. The headline sits at the top; the carousel fills the rest.

**After this spec:** Section grows to fit its content. Standard vertical padding.

### Social Proof (desktop)

**Current behaviour:** Section is locked to window height. The headline is centered with an absolute position computed from the window height. The decorative thumbnails float as absolute overlays positioned by percentage of the window height.

**After this spec:** The headline is in normal flow, vertically centered inside the section using flex alignment — not with an absolute offset. The decorative thumbnail layer remains absolutely positioned as a decorative overlay (thumbnails intentionally float outside the content flow, same as today). Standard vertical padding above and below the headline. The section grows if the headline somehow requires more space.

### Social Proof (mobile)

Same principle. Headline in normal flow; decorative thumbnails stay as absolute overlay. Standard padding.

### Pricing (desktop and mobile)

**Current behaviour:** Section is locked to window height. Inner content container uses flex centering with padding expressed as a fraction of the window height.

**After this spec:** Section grows to at least window height. Inner container stays flex column but vertical padding comes from the site-wide token, not a window-height fraction.

---

## Mobile browser chrome

The current `100vh` unit on iOS Safari equals the *large* viewport height — the height of the window including the address bar. Content sized to `100vh` is therefore taller than the actual visible area when the browser chrome is shown, causing the bottom of each section to be hidden under the browser bar.

All `height: 100vh` and `h-screen` references across all affected sections must be replaced with `min-height: 100svh`. The `svh` unit (small viewport height) matches the visible content area with the browser chrome present — the same area the visitor actually sees. On desktop, `svh` equals `vh`; the change has no effect at the desktop breakpoint.

---

## The site-wide vertical-padding token

A single CSS custom property — `--section-padding-y` — is introduced in `styles/base.css`. Every affected section's top and bottom padding references this token. The token's value uses fluid sizing so it scales with the screen.

No section defines its own vertical padding independently. If a section has a design reason to differ (e.g. a section that intentionally bleeds to the top edge), that exception is documented here and the token is explicitly not applied to that element.

---

## Retiring the pin system

The pinned scroll experience (Spec 011) and the pinning toggle (Spec 025) are retired by this spec. Content-driven section sizing and pinning are fundamentally incompatible: the pin model requires a section to be exactly viewport height so the visitor sees the entire section while it is held in place. A section that can grow beyond the viewport cannot be pinned meaningfully — the visitor would advance to the next section without ever seeing the content below the fold.

`lib/sectionPin.ts` is deleted in full. Every call to `createSectionPin` across all section components is removed. `HOMEPAGE_PINNING_ENABLED` is removed with it. The `ScrollSmoother` setup in `SmoothScrollProvider` remains — it continues to provide the smooth scroll kinetics the site uses on desktop.

The entrance animations are not removed. Every section's entrance — elements fading or sliding into place the first time the section enters the viewport — continues exactly as before, driven by `ScrollTrigger` directly without the pin. Each section component that currently calls `createSectionPin` replaces that call with a plain `ScrollTrigger.create` that fires `onEnter` once when the section first enters the viewport. This is already exactly what `createSectionPin` does when `HOMEPAGE_PINNING_ENABLED = false` — this spec makes that the only code path and removes everything else.

GSAP animations that currently reference viewport-height values (`y: '-110vh'`, `top: calc(50% − N%)`) must be re-expressed relative to the element's own dimensions or fixed spacing values, since content is now in normal flow rather than anchored to the viewport. Each affected animation must be verified visually after the layout change for that section.

---

## Responsive behaviour

Every section listed above must be verified at all three primary breakpoints (mobile below 768 px, tablet 768–1279 px, desktop 1280 px and above) and at a range of window heights (short, medium, tall) before the section is considered done. The acceptance criteria list specific checkpoints.

No section should look different at the reference viewport (1440 × 1024 px on desktop, 393 × 852 px on mobile) after this change. The goal is that other viewports improve, and the reference viewport is unchanged.

---

## What does not change

- The visual design of any section — colors, type, imagery, spacing between elements within a section.
- The entrance animations for every section — they continue to play once on viewport entry, exactly as today.
- `SmoothScrollProvider` and the `ScrollSmoother` instance — smooth scroll kinetics are preserved.
- The footer (OversizedFooter, MobileFooter) — it is already outside the scroll-state machine and uses proportional collage layout, not fixed viewport height.
- The Lead Capture modal — not a homepage section.
- The blog and inner pages — not in scope.
- The `-1px` bottom margin on `#smooth-content section` that prevents sub-pixel gaps in ScrollSmoother.

---

## Technical guidance

These are guidelines for the implementer, not requirements.

**Order of implementation.** Pricing is the simplest section (already flex, no absolute content positioning). Start there to verify the token approach works end to end. Value Props and Every Channel next. Hero, Work Showcase, and Product Screens in the middle. Social Proof last (most involved because of the floating thumbnail layer).

**Mobile sections.** Each desktop section has a paired mobile section that currently also uses `height: 100vh`. Both should be converted together per section so regression testing is complete in one pass.

**Token value.** The `--section-padding-y` value should be derived from the Figma designs. Read the actual intended breathing room from each section in Figma; the token value is the one that matches the reference viewport across the majority of sections. Outliers that differ from the majority in Figma are documented as intentional per-section overrides.

**Absolute-to-flex conversion.** When converting an absolute-positioned content element to normal flow, the equivalent pattern is: wrap the section in a flex column, set the standard padding on the section, place the content elements as flex children in the order they appear top-to-bottom in the design. If two elements must appear side-by-side (like a headline on the left and a CTA on the right), they are children of a flex row.

**Sections with full-bleed backgrounds.** A video or image that covers the whole section is a `position: absolute; inset: 0` media fill behind the content. The content sits above it in the stacking order. This pattern is already correct in the rules (`§ Layout Must Scale — No Fragile Positioning`, point 1).

**Replacing `createSectionPin` calls.** Each section component that currently calls `createSectionPin` replaces that single call with a direct `ScrollTrigger.create` using `trigger: section`, `start: 'top 80%'` (or `'top top-=2%'` for the hero's deferred-until-scroll behaviour), `once: true`, and an `onEnter` callback that invokes the same entrance logic as before. The `fireOnScroll` behaviour already present in `createSectionPin`'s no-pin path is the model — replicate it directly rather than going through the deleted helper.

---

## Acceptance criteria

### Token and infrastructure

- [ ] A `--section-padding-y` CSS custom property is defined in `styles/base.css` using fluid sizing
- [ ] Every affected section's top and bottom padding references `--section-padding-y`
- [ ] No affected section defines its own independent top or bottom padding value outside the token
- [ ] The `100svh` unit is used wherever `100vh` or `h-screen` previously appeared on section containers across all affected sections

### Visual fidelity at the reference viewport

- [ ] At 1440 × 1024 px (desktop reference), every section looks identical to its pre-refactor appearance
- [ ] At 393 × 852 px (mobile reference), every mobile section looks identical to its pre-refactor appearance

### Short-window behaviour

- [ ] At 1440 × 700 px, no desktop section clips its content below the visible area
- [ ] At 1440 × 700 px, content within each section remains readable and no two elements overlap
- [ ] At 375 × 568 px (small phone), no mobile section clips its content below the visible area

### Tall-window behaviour

- [ ] At 1440 × 1400 px, every desktop section still appears to fill the window with no large empty zones (i.e. the content expands or the standard padding absorbs the space intentionally)

### Consistent vertical rhythm

- [ ] The breathing room above the first content element and below the last content element is visually consistent across all desktop sections
- [ ] The breathing room above the first content element and below the last content element is visually consistent across all mobile sections
- [ ] No section has noticeably more or less top/bottom space than its neighbours

### Normal-flow content

- [ ] No readable content element (headline, body copy, CTA, pill nav, interactive control) uses `position: absolute` or `position: fixed` for its placement within a section
- [ ] Full-bleed media fills (background videos, gradient overlays) and intentional floating decorative layers (Social Proof thumbnails) remain as absolute overlays
- [ ] GSAP transient animation states (`opacity`, `transform`, `y`) remain as they are — this rule applies to resting layout only

### Mobile browser chrome

- [ ] On an iPhone with Safari's address bar visible, no section's bottom content is hidden behind the browser chrome
- [ ] On an Android phone with Chrome's address bar visible, no section's bottom content is hidden behind the browser chrome

### Pin system retirement

- [ ] `lib/sectionPin.ts` is deleted
- [ ] `HOMEPAGE_PINNING_ENABLED` no longer exists anywhere in the codebase
- [ ] No call to `createSectionPin` remains in any component
- [ ] Every section that previously called `createSectionPin` now registers a direct `ScrollTrigger` for its entrance animation
- [ ] The page scrolls freely from hero to footer with no snap, hold, or forced advancement at any section boundary

### Animations and scroll behaviour

- [ ] Every section's entrance animation plays once when the section first enters the viewport — no visible regression in timing, motion, or final resting state compared to the pre-refactor free-scroll behaviour
- [ ] The hero entrance animation does not play on page load — it waits until the visitor has scrolled forward, matching the pre-refactor behaviour
- [ ] `ScrollSmoother` remains active and the page continues to scroll with the same smooth kinetics as before

### Regression

- [ ] `npx tsc --noEmit` passes with zero errors
- [ ] `npm run lint` passes with zero errors or warnings
- [ ] The footer (OversizedFooter, MobileFooter), Lead Capture modal, blog, and all inner pages are visually unchanged
