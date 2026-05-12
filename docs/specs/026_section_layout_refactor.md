# Spec 026 — Section Layout Refactor: Content-Driven Height and Standardised Vertical Rhythm

**Status:** Ready for implementation
**Supersedes:** Spec 011 (Page Animation Model: Scroll States), Spec 025 (Homepage Pinning Toggle)
**Realigns:** Spec 015 (Mobile Experience Model — already specified content-height mobile sections), Spec 019 (Value Props — already specified non-pinned)
**Depends on:** Spec 001 (Hero Animatic), Spec 002 (Work Showcase), Spec 003 (Every Channel), Spec 005 (Pricing), Spec 006 (Social Proof), Spec 007 (Product Screens), Spec 016 (Mobile Hero), Spec 017 (Mobile Every Channel), Spec 018 (Mobile Product Screens), Spec 019 (Value Props), Spec 020 (Mobile Social Proof), Spec 021 (Mobile Pricing), Spec 024 (Product Screens Refresh)

---

## Why this spec exists

Every homepage section today is locked to exactly the browser window's height. That height is set externally, not driven by the section's content. The consequences compound across sections and viewports:

- On shorter screens (a 768 px tall laptop, a phone in landscape, a windowed desktop browser), content inside sections gets clipped, collides with neighbouring elements, or drifts into dead zones — not because the content changed but because the window is shorter.
- On taller screens (a large monitor, a long phone) sections balloon with empty space that was never part of the design intent.
- Content-positioning inside sections is anchored using percentage offsets of that fixed window height. This means every position shifts when the window is a different shape. The result is that no two viewports produce the same visual relationships between content.
- There is no shared rhythm across sections. Each section independently invented its own top-and-bottom breathing room. The visitor scrolling down the page sees noticeably different amounts of space above and below content in each section, even though the sections read as a family.

This spec establishes two things: sections should be tall enough to fill the window but never shorter than their content requires, and the breathing room above and below content should follow a single site-wide standard.

It also realigns the codebase with two earlier specs that drifted:

- **Spec 015 (Mobile Experience Model)** stated *"Mobile sections have natural height. Mobile sections should be as tall as their content requires — no more, no less."* The current code violates this: every mobile section is locked to the window height and pinned. This spec restores Spec 015's stated intent.
- **Spec 019 (Value Props)** stated *"This section is not a full-viewport hold like the Product Screens or Every Channel sections. It is a standard scrolling section."* The current code pins it. This spec restores Spec 019's stated intent.

---

## Design intent

### Sections fill the window by default, but never less than their content

A homepage section seen on its own should look like a complete "frame" — it occupies the full window and feels intentional at that size. This is preserved. What changes:

- On a window tall enough to contain the section's content with the standard breathing room, the section is exactly the visible window height. The section's content sits inside it according to that section's design intent (centered, top-anchored, or bottom-anchored — see "Affected sections" below).
- On a shorter window, the section grows beyond the window so all content remains visible. Nothing clips, nothing overlaps.

Content never clips below the bottom of the window just because the window is short. Content never disappears under the mobile browser's address bar.

### A single vertical rhythm

Every section has the same amount of breathing room between the window edge and its content. This is a single value used everywhere — not a per-section decision. The breathing room scales gracefully: a little more on large screens, a little less on small ones, but always drawn from the same formula.

The breathing room applies to both the top and the bottom of the content area inside each section.

### Content positions are relative to content, not to the window

Elements inside a section are positioned relative to each other and to the section's padding — not as a percentage of the window height. Layouts that currently use window-height percentages to place a headline "at 5.47% from the top" or content "at 67.93% from the top" need to be rebuilt so those positions are expressed as spacing between adjacent elements.

There are two narrow exceptions, both for elements whose visual identity is "decoratively scattered across the section":

- **Full-bleed media fills** — a video, image, or gradient covering the whole section as a background.
- **Decoratively scattered overlay elements** — Social Proof's six floating thumbnails, Every Channel's seven scattered channel pills. These are not in-flow content: their per-element positioning is the design.

Everything else — headlines, body copy, CTAs, in-flow navigation, interactive controls — must be in normal flow.

---

## Affected sections

Every section listed here loses its fixed-window-height constraint and replaces window-fraction internal positioning with normal flow. Each entry names how its content aligns vertically inside the section so the implementer is not left guessing.

### Hero (desktop) — bottom-anchored

The background video fills the section. The large headline and CTA group sit at the bottom of the section, separated by the standard breathing room from the bottom edge. There is no breathing room from the top — the video runs to the top of the section. The section fills the window; on a window too short to contain the headline + CTA + breathing room, the section grows.

### Hero (mobile) — top-anchored content under a fixed-ratio video band

The video fills a fixed top portion of the section (its current 40 vh band, expressed instead as a fraction of section height or fixed aspect ratio per Figma). The Keystone mark, headline, subheadline, and CTA group sit below the video in normal flow, separated from the video by the standard breathing room. The section is at least the visible window height; it grows if the content requires it.

### Work Showcase (desktop) — top-anchored headline, centered carousel, bottom-anchored category bar

Three zones in normal flow: headline near the top with the standard breathing room, carousel filling the middle, category bar near the bottom with the standard breathing room. The carousel zone is the flex-grow region between the two anchors.

### Every Channel (desktop) — centered

The full-bleed video runs to all four edges of the section as a decorative background. The three-line headline is vertically centered inside the section using flex alignment (not an absolute offset). The seven channel pills are decoratively scattered overlays on top of the video — they keep their per-pill positions as a percentage of the section dimensions; this is the design intent of the section and falls under the same exception as the Social Proof thumbnails.

### Every Channel (mobile) — top-aligned text, bottom-anchored video band, scattered pills

Text block at the top of the section with the standard breathing room above. Video band fills a fixed lower portion of the section. Channel pills remain as decorative overlays at per-pill positions across the section.

### Product Screens (desktop) — full-bleed dark card with centered content

The dark card is the section background, with rounded corners produced by section padding equal to the Figma's card inset on all four sides. Inside the card: pill nav near the top, mark + copy in the lower-left, layered screenshot stack on the right — all positioned by flex/grid relationships rather than percentages of the card. The card no longer needs to be a separately-positioned absolute box.

### Product Screens (mobile) — top-anchored pills, content + screenshot below

Pill nav at the top with the standard breathing room. Mark, label, copy, and decorative panel sit below the nav. Screenshot extends past the right edge as today. Section fills the window or grows to fit content.

### Value Props (desktop) — top-anchored header, centered cards row

Header row (headline left, CTA right) sits at the top of the section with the standard breathing room. The three cards sit below the header, with the standard breathing room separating the bottom of the cards from the section bottom. The section is no longer pinned (this realigns with Spec 019's stated intent).

### Value Props (mobile) — top-anchored headline, centered carousel

Headline at the top with the standard breathing room; carousel below. The section is no longer pinned. Section is at least the visible window height; grows if content requires it.

### Social Proof (desktop) — centered headline with floating decorative thumbnails

The headline is vertically centered inside the section using flex alignment — not an absolute offset computed from window height. The six decorative thumbnails remain absolute overlays positioned by per-thumbnail percentages; this matches the design intent and is the canonical example of the decorative-overlay exception.

### Social Proof (mobile) — centered headline with scattered thumbnails overlay

Same principle as desktop. Headline centered; thumbnails as scattered overlays.

### Pricing (desktop and mobile) — centered

Single flex column, vertically centered inside the section. Standard breathing room above the first content item and below the last. The current `clamp(..., 6vh, ...)` and `clamp(..., 8vh, ...)` window-fraction padding is replaced by the site-wide token.

### MobileFooter and OversizedFooter — unchanged

Both footers are already proportional collages with `aspect-ratio` constraints and were never tied to viewport height. They remain as today.

### MobileWorkShowcase — unchanged

Per Spec 023, this is the one mobile section whose content height is intentionally larger than one viewport. It already has natural height and is not pinned. No changes.

---

## Mobile browser chrome

The current `100vh` unit on iOS Safari equals the *large* viewport height — the height of the window including the address bar. Content sized to `100vh` is therefore taller than the actual visible area when the browser chrome is shown, causing the bottom of each section to be hidden under the browser bar.

All `height: 100vh` and `h-screen` references across all affected sections must be replaced with **`min-height: 100svh`**. The `svh` unit (small viewport height) matches the visible content area with the browser chrome present — the same area the visitor actually sees at scroll position 0. On desktop, `svh` equals `vh`; the change has no effect at the desktop breakpoint.

`100dvh` (dynamic viewport height) was considered and rejected. `dvh` resizes as the visitor scrolls and the address bar collapses, which causes the section's height — and therefore the position of every other section on the page — to shift mid-scroll. That layout thrash is worse than the small dead zone `svh` produces below a section once the address bar collapses. The dead zone fills with the next section's background as the visitor continues to scroll, so the visual cost is minor.

Sections still use `min-height` rather than `height` so content that exceeds one viewport on a short device grows the section beyond `100svh` rather than clipping.

---

## The site-wide vertical-padding token

A single CSS custom property — `--section-padding-y` — is introduced in `styles/base.css`. Every affected section's top and bottom padding references this token. The token's value uses fluid sizing so it scales with the screen.

The token's value is derived from Figma in two steps:

1. The implementer reads the top-and-bottom padding intended for each section in Figma at the desktop reference (1440 × 1024) and the mobile reference (393 × 852). Most sections share the same intent within a few pixels — the implementer picks the value the majority of sections use.
2. That single value becomes the upper bound of a desktop clamp expression (`clamp(min, vh, max)`) and the upper bound of a mobile clamp expression. The lower bounds are chosen so the token never collapses below the smallest reasonable breathing room (suggested ~32 px desktop, ~24 px mobile) and never grows beyond the Figma value on tall screens.

Approved exceptions to "every section uses the token":

- **Hero (desktop)** — has no top padding. Video runs to the top of the section.
- **Every Channel** — full-bleed video runs to all four edges. Padding applies to the headline + pills layout container, not the video.
- **Product Screens (desktop)** — the section's padding equals the Figma's card inset on all four sides; the dark card *is* the section background. This may be a different value from `--section-padding-y` if Figma's card inset differs; if so, the value is named separately (e.g. `--ps-card-inset`) so the relationship to the standard token is explicit.
- **MobileFooter and OversizedFooter** — proportional collages, no vertical padding token.

Any new exception must be added to this list. A section silently substituting its own value is the anti-pattern this token exists to prevent.

---

## Retiring the pin system

The pinned scroll experience (Spec 011) and the pinning toggle (Spec 025) are retired by this spec. Content-driven section sizing and pinning are fundamentally incompatible: the pin model requires a section to be exactly viewport height so the visitor sees the entire section while it is held in place. A section that can grow beyond the viewport cannot be pinned meaningfully — the visitor would advance to the next section without ever seeing the content below the fold.

`lib/sectionPin.ts` is deleted in full. Every call to `createSectionPin` across all section components is removed. `HOMEPAGE_PINNING_ENABLED` is removed with it. The `ScrollSmoother` setup in `SmoothScrollProvider` remains — it continues to provide the smooth scroll kinetics the site uses on desktop.

The entrance animations are not removed. Every section's entrance — elements fading or sliding into place the first time the section enters the viewport — continues exactly as before, driven by `ScrollTrigger` directly without the pin. Each section component that currently calls `createSectionPin` replaces that call with a plain `ScrollTrigger.create` that fires `onEnter` once when the section first enters the viewport. This is already exactly what `createSectionPin` does when `HOMEPAGE_PINNING_ENABLED = false` — this spec makes that the only code path and removes everything else.

`prefers-reduced-motion: reduce` behaviour carries forward unchanged: every section's reduced-motion branch already shows the final state immediately. Removing the pin does not change that — sections that previously pinned-without-animation under reduced motion now simply render in flow with no entrance. The visual outcome is identical.

GSAP animations that currently reference viewport-height values (`y: '-110vh'`, `top: calc(50% − N%)`) must be re-expressed relative to the element's own dimensions or fixed spacing values, since content is now in normal flow rather than anchored to the viewport. Each affected animation must be verified visually after the layout change for that section.

### Cleanup that follows from removing the pin

**Social Proof modal scroll lock.** `SocialProofSection.tsx` currently hand-rolls a scroll lock for its testimonial modal that depends on the pin's scroll-state machine — it reads `ScrollTrigger.getById('social-proof-pin')` to compute a "canonical pinned position" before pausing `ScrollSmoother`. With the pin removed, that whole block targets nothing. Replace it with the project's standard `lockScroll()` helper from `lib/scrollLock.ts` (which returns an unlock callback), per the rules' "Body Scroll Locking Has One Approved Approach" guidance. The same applies to any other section that may have similar pin-dependent scroll logic — verify by searching for `ScrollTrigger.getById` in section components.

**Cross-section pill handoff.** `PillHandoffProvider` (which lets EveryChannel hand pill rectangles off to ProductScreens for the convergence animation) is preserved as-is. Without pinning, the EC pills may have already begun to scroll up and out of the viewport by the time PS triggers, so the visual flight illusion is looser than the pinned version. This is the same behaviour as today with `HOMEPAGE_PINNING_ENABLED = false` and is the accepted intent in non-pinned mode. No change to the handoff API or the per-section pill positioning code.

**ProductScreens "card rise" entrance.** PS's desktop entrance computes a starting card scale by dividing `section.offsetHeight / card.offsetHeight` so the card initially fills the section, then animates back to its natural size. This calculation is sensitive to section height: if content overflows on a short window and the section grows beyond one viewport, the card initial state would be larger than the screen and the "rise" effect breaks visually. The implementer either:

- caps the calculation at the viewport height (`Math.min(window.innerHeight, section.offsetHeight) / card.offsetHeight`), or
- re-expresses the entrance entirely so the card starts at full visible viewport coverage (a fixed-position overlay) and contracts to its in-flow position — decoupling the scale from `section.offsetHeight`.

The chosen approach is verified visually at the reference viewport (no regression) and at the short-viewport checkpoints in the acceptance criteria.

---

## Responsive behaviour

Every section listed above must be verified at all three primary breakpoints (mobile below 768 px, tablet 768–1279 px, desktop 1280 px and above) and at a range of window heights (short, medium, tall) before the section is considered done. The acceptance criteria list specific checkpoints.

No section should look different at the reference viewport (1440 × 1024 px on desktop, 393 × 852 px on mobile) after this change. The goal is that other viewports improve, and the reference viewport is unchanged.

---

## What does not change

- The visual design of any section — colors, type, imagery, the spacing between elements within a section.
- The entrance animations for every section — they continue to play once on viewport entry, exactly as today.
- `SmoothScrollProvider` and the `ScrollSmoother` instance — smooth scroll kinetics on desktop are preserved.
- `PillHandoffProvider` and the cross-section EC → PS pill rectangle handoff — preserved as-is, with the same visible looseness already accepted in non-pinned mode.
- The footers (OversizedFooter, MobileFooter) — already outside the scroll-state machine, already proportional collage layouts, never tied to viewport height.
- MobileWorkShowcase — already content-driven height per Spec 023, already not pinned.
- The Lead Capture modal — not a homepage section.
- The blog, legal pages, and inner pages — not in scope.
- The `-1px` bottom margin on `#smooth-content section` that prevents sub-pixel gaps in ScrollSmoother.
- `prefers-reduced-motion: reduce` behaviour — every section already shows its final state immediately when reduced motion is on, and that continues to be true.

---

## Technical guidance

These are guidelines for the implementer, not requirements.

**Order of implementation.** Pricing is the simplest desktop section (already flex, no absolute content positioning). Start there with its mobile counterpart to verify the token approach works end to end. Then in order of increasing complexity:

1. Pricing + Mobile Pricing (already flex; minimal layout change)
2. Value Props + Mobile Value Props (header is absolute today; carousel and grid are already flex; pin removal is the bigger change here)
3. Mobile Hero, Mobile Social Proof, Mobile Product Screens, Mobile Every Channel — convert from `height: 100vh` to `min-height: 100svh`, remove `createSectionPin` (most are stub pins with no animation; only Mobile Every Channel has a real entrance timeline)
4. Hero (desktop) + Work Showcase (desktop) — content is bottom/top-anchored, conversion is a flex layout pass
5. Every Channel (desktop) — flex centering replaces `top: 50%; left: 50%; translate -50% -50%`
6. Product Screens (desktop) — most involved (card-rise entrance, layered screenshot stack, pill nav handoff). The card-rise calculation needs special attention per the "Cleanup that follows from removing the pin" section above.
7. Social Proof (desktop) — last, because it also requires switching the modal's scroll lock from the pin-dependent custom code to `lib/scrollLock.ts`.

**Sections to delete `createSectionPin` from.** Every component listed below currently imports `createSectionPin` and calls it. After this spec, every one of these imports is removed and the call site is replaced with a direct `ScrollTrigger.create` (or removed entirely for sections that pin without an entrance):

| Component | Current pin call | After |
|---|---|---|
| `HeroAnimatic.tsx` | pin with `fireOnScroll: true`, plays headline timeline | Direct `ScrollTrigger` with `start: 'top top-=2%'`, `once: true` |
| `WorkShowcase.tsx` | pin with entrance | Direct `ScrollTrigger` with `start: 'top 80%'`, `once: true` |
| `EveryChannel.tsx` | pin holding the masterTl until complete | Direct `ScrollTrigger` with `start: 'top 80%'`, `once: true` |
| `ProductScreens.tsx` | pin holding the entrance until complete | Direct `ScrollTrigger` with `start: 'top 80%'`, `once: true` |
| `ValueProps.tsx` | pin (animation + reduced-motion stubs) | Direct `ScrollTrigger` with `start: 'top 80%'`, `once: true`; the reduced-motion stub has no entrance and needs no trigger at all |
| `SocialProofSection.tsx` | pin (no animation, just hold) | Direct `ScrollTrigger` with `start: 'top 80%'`, `once: true`, starting the floating timeline |
| `PricingSection.tsx` | pin (entrance fades in) | Direct `ScrollTrigger` with `start: 'top 80%'`, `once: true` |
| `MobileHero.tsx` | stub pin with `fireOnScroll: true` (no animation) | Remove the entire `useLayoutEffect` — no entrance to fire |
| `MobileEveryChannel.tsx` | pin with masterTl | Direct `ScrollTrigger` with `start: 'top 80%'`, `once: true` |
| `MobileProductScreens.tsx` | pin with entrance | Direct `ScrollTrigger` with `start: 'top 80%'`, `once: true` |
| `MobileSocialProof.tsx` | stub pin (no animation) | Remove the entire `useLayoutEffect` — no entrance to fire |
| `MobilePricingSection.tsx` | stub pin (no animation) | Remove the entire `useLayoutEffect` — no entrance to fire |
| `ValueProps.tsx` (MobileValueProps export) | stub pin (no animation) | Remove the entire `useLayoutEffect` — no entrance to fire |

After this list is exhausted, `lib/sectionPin.ts` has no callers and is deleted, along with its tests if any exist and the `HOMEPAGE_PINNING_ENABLED` reference in `docs/explainers/animations.md`.

**Absolute-to-flex conversion.** When converting an absolute-positioned content element to normal flow, the equivalent pattern is: wrap the section in a flex column, set the standard padding on the section, place the content elements as flex children in the order they appear top-to-bottom in the design. If two elements must appear side-by-side (like a headline on the left and a CTA on the right), they are children of a flex row. Vertically centered content uses `justify-content: center` on the flex column. Bottom-anchored content uses `margin-top: auto` on the bottom child or `justify-content: flex-end` on the column.

**Sections with full-bleed backgrounds.** A video or image that covers the whole section is a `position: absolute; inset: 0` media fill behind the content. The content sits above it in the stacking order. This pattern is already correct in the rules (`§ Layout Must Scale — No Fragile Positioning`, point 1).

**Decorative scattered overlays.** Two sections have decorative elements that are intentionally positioned at per-element percentages of the section bounds: Social Proof's six floating thumbnails, and Every Channel's seven scattered channel pills. These remain absolute overlays and keep their per-element positioning. They are explicitly excepted from the "no readable content uses absolute positioning" rule because they are decorative-overlay elements, not in-flow content.

---

## Acceptance criteria

### Token and infrastructure

- [x] A `--section-padding-y` CSS custom property is defined in `styles/base.css` using a `clamp()` expression with desktop and mobile bounds derived from Figma per the Token Value rule
- [x] Every affected section's top and bottom padding references `--section-padding-y`, except for the named exceptions in "The site-wide vertical-padding token" section above
- [x] `min-height: 100svh` is used wherever `height: 100vh` or `h-screen` previously appeared on section containers across all affected sections
- [x] No remaining `height: 100vh` or `h-screen` appears in any section component or section CSS file

### Visual fidelity at the reference viewport

- [x] At 1440 × 1024 px (desktop reference), every desktop section is visually indistinguishable from its pre-refactor appearance — no element has shifted position relative to the section bounds
- [x] At 393 × 852 px (mobile reference), every mobile section is visually indistinguishable from its pre-refactor appearance

### Content alignment within sections

- [x] Hero (desktop) headline + CTA group sit at the bottom of the section with the standard breathing room from the bottom edge; the video runs to the top of the section with no padding above the video
- [x] Hero (mobile) video band fills the top portion of the section; mark + headline + subheadline + CTA sit below the video in normal flow
- [x] Work Showcase (desktop) headline is at the top with the standard breathing room; carousel fills the middle; category bar is at the bottom with the standard breathing room
- [x] Every Channel (desktop and mobile) headline sits in normal flow, vertically centered (desktop) or top-aligned (mobile); channel pills retain their per-pill scattered positions as a decorative overlay
- [x] Product Screens (desktop) section padding equals the Figma's card inset on all four sides; pill nav, mark, copy, and screenshot are arranged in flex/grid relationships
- [x] Product Screens (mobile) pills are at the top with the standard breathing room; mark + label + copy + screenshot follow in normal flow
- [x] Value Props (desktop) header row is at the top with the standard breathing room; cards row sits below; standard breathing room separates cards from section bottom
- [x] Value Props (mobile) headline is at the top; carousel below
- [x] Social Proof (desktop and mobile) headline is vertically centered using flex alignment; the thumbnails remain absolute overlays at their per-thumbnail positions
- [x] Pricing (desktop and mobile) content is vertically centered with the standard breathing room above the first item and below the last

### Short-window behaviour

- [ ] At 1440 × 700 px (short desktop), no desktop section clips its content below the visible area; sections grow past the viewport as needed
- [ ] At 1440 × 700 px, content within each section remains readable and no two elements overlap
- [ ] At 375 × 568 px (small or short phone), no mobile section clips its content below the visible area; sections grow past the viewport as needed

### Tall-window behaviour

- [x] At 1440 × 1400 px (tall desktop), every desktop section is exactly the visible window height (`min-height: 100svh`) and content is positioned per the Content alignment criteria above — no large empty zones above or below centered content, no awkward floating between top and bottom anchors

### Consistent vertical rhythm

- [ ] The breathing room above the first content element and below the last content element is visually consistent across all desktop sections that use the standard token
- [ ] The breathing room above the first content element and below the last content element is visually consistent across all mobile sections that use the standard token
- [ ] Sections with named exceptions (Hero desktop, Every Channel, Product Screens desktop, footers) are visually distinguishable as intentional outliers — not random per-section drift

### Normal-flow content

- [x] No readable content element (headline, body copy, CTA, in-flow navigation, interactive control) uses `position: absolute` or `position: fixed` for its placement within a section
- [x] The decorative-overlay exceptions are limited to: Social Proof thumbnails (desktop and mobile), Every Channel scattered channel pills (desktop and mobile), Mobile Every Channel text and video band (designed collage — documented in `styles/sections/mobile-every-channel.css`), Product Screens desktop card interior (Figma-percentage anchors inside a non-growing card), and full-bleed media fills (background videos, gradient overlays)
- [x] GSAP transient animation states (`opacity`, `transform`, `y`) are not affected by this rule — they remain as they are

### Mobile browser chrome

- [ ] On an iPhone with Safari's address bar visible, no section's bottom content is hidden behind the browser chrome
- [ ] On an Android phone with Chrome's address bar visible, no section's bottom content is hidden behind the browser chrome
- [ ] As the visitor scrolls and the address bar collapses, no section's height jumps or thrashes — sections retain their `100svh` minimum and the gap below fills with the next section's background

### Pin system retirement

- [x] `lib/sectionPin.ts` is deleted
- [x] `HOMEPAGE_PINNING_ENABLED` no longer exists anywhere in the codebase
- [x] No call to `createSectionPin` remains in any component
- [x] Every section that previously called `createSectionPin` either registers a direct `ScrollTrigger` for its entrance animation, or has had its `useLayoutEffect` removed entirely if it had no entrance to fire (per the table in Technical guidance)
- [x] The page scrolls freely from hero to footer with no snap, hold, or forced advancement at any section boundary

### Animations and scroll behaviour

- [x] Every section's entrance animation plays once when the section first enters the viewport — no visible regression in timing, motion, or final resting state compared to the pre-refactor free-scroll behaviour
- [x] The hero entrance animation does not play on page load — it waits until the visitor has scrolled forward, matching the pre-refactor behaviour
- [x] `ScrollSmoother` remains active and the page continues to scroll with the same smooth kinetics as before
- [x] The pill handoff from Every Channel to Product Screens still produces a "pills flying in from above" effect, with the same visible looseness as the current `HOMEPAGE_PINNING_ENABLED = false` mode — no new visual regression
- [x] The Product Screens "card rise" entrance plays without the card extending beyond the visible viewport on any tested viewport between 1280 × 700 px and 2560 × 1400 px

### Reduced motion

- [x] With `prefers-reduced-motion: reduce` set, every section displays its final state immediately on mount with no entrance animation
- [x] With reduced motion on, the visitor scrolls freely through the page; no section pauses, holds, or animates

### Modal scroll lock cleanup

- [x] `SocialProofSection.tsx` no longer references `ScrollTrigger.getById('social-proof-pin')` for its modal scroll lock
- [x] The Social Proof modal uses `lockScroll()` from `lib/scrollLock.ts` (which returns an unlock callback)
- [x] No other section retains pin-dependent scroll-lock code

### Documentation

- [x] `docs/explainers/animations.md` no longer references `HOMEPAGE_PINNING_ENABLED` or the pinning toggle
- [x] `docs/explainers/responsive.md` is updated where it references homepage section heights to reflect that they now use `min-height: 100svh` rather than `h-screen`
- [x] Spec 011 and Spec 025 are not edited; their retirement is recorded only via the `Supersedes:` header of this spec, per the immutability rule

### Regression

- [x] `npx tsc --noEmit` passes with zero errors
- [x] `npm run lint` passes with zero errors or warnings
- [x] The footers (OversizedFooter, MobileFooter), Lead Capture modal, blog, and all inner pages are visually unchanged
- [x] MobileWorkShowcase is visually unchanged (it was already content-driven height and not pinned)
