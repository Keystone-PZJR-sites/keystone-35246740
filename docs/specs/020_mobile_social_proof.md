# Spec 020 — Mobile Social Proof Section

**Status:** Ready for implementation
**Figma nodes:**
- Non-modal view: [Testimonials — mobile non-modal](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1281-532&m=dev) (node `1281:532`)
- Modal example 1: [Testimonials — modal A](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1276-6879&m=dev) (node `1276:6879`)
- Modal example 2: [Testimonials — modal B](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1276-6974&m=dev) (node `1276:6974`)
- Modal example 3: [Testimonials — modal C](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1276-7056&m=dev) (node `1276:7056`)
- Modal example 4: [Testimonials — modal D](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1276-7160&m=dev) (node `1276:7160`)
- Modal example 5: [Testimonials — modal E](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1276-7276&m=dev) (node `1276:7276`)
- Modal example 6: [Testimonials — modal F](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1276-7367&m=dev) (node `1276:7367`)

**Position:** Replaces `SocialProofSection` on mobile. `SocialProofSection` is hidden below 768px; `MobileSocialProof` is hidden at 768px and above.

**Depends on:** Spec 014, Spec 015, Spec 016

---

## What this section is

The mobile counterpart to the desktop "Great businesses deserve to be found" social proof section. It shares the same quote and slide data but has a completely different layout and interaction model.

The section shows six scattered video thumbnails on a dark teal background with the section headline centered. Tapping any thumbnail opens a full-section overlay showing a swipeable testimonial card deck. The active testimonial is shown front-and-center; adjacent testimonials peek from the left and right screen edges. A close button dismisses the overlay.

---

## Scope

### In scope

- Full-viewport dark teal section, pinned using `createSectionPin`
- Six scattered video thumbnails with marker badges at their top-right corners
- Centered section headline
- Tap-to-open overlay: semi-transparent dark teal scrim over the full section
- Swipeable testimonial card deck using Embla Carousel inside the overlay
- Testimonial card: looping video at the top + colored notch panel at the bottom
- Name and location pills within each card panel
- Close button that dismisses the overlay
- Reuse of the `SocialProofSlide` type for testimonial data

### Out of scope

- Floating / organic drift animation on thumbnails (desktop-only)
- The desktop `SocialProofSection` layout and portal modal
- Pagination indicators (dots, numbers)

---

## Visual design

### Non-modal view

**Background:** `#0d2a28` — the same dark forest green as the desktop section.

**Section dimensions:** Full viewport width × 100vh. All thumbnail positions are derived from the 393×852 Figma canvas using proportional (`%`) values so they scale correctly across mobile widths.

**Six video thumbnails** are scattered at fixed proportional positions. Each thumbnail:
- Rounded 4px corners (`--radius-xs`)
- A small 12×12px marker badge at the top-right corner (same cross SVG as desktop: `/social-proof/social-proof-marker-cross.svg`)
- `cursor: pointer` — tapping opens the overlay at the corresponding slide index

Thumbnail positions (px on 393×852 canvas — converted to `%` in implementation):

| # | left | top | width | height |
|---|------|-----|-------|--------|
| 1 | 24 | 32 | 200 | 112 |
| 2 | 229 | 164 | 144 | 96 |
| 3 | 16 | 271 | 168 | 87 |
| 4 | 265 | 544 | 112 | 64 |
| 5 | 16 | 615 | 114 | 64 |
| 6 | 147 | 668 | 216 | 152 |

Marker badge position within each thumbnail group: approximately `top: -6px; right: -6px` (consistent across all thumbnails per Figma).

**Headline:** Centered in the section at `top: calc(50% - 104px)`.
- Font: FK Screamer Bold, 63px, line-height 0.82, uppercase
- Color: `#f0eee6` (cream)
- Width: 296px
- Two lines: `"Great BUSINESSES "` and `"deserve to be found."`

---

### Modal overlay

When a thumbnail is tapped, a full-section overlay appears over the non-modal view:

**Overlay background:** `rgba(13, 42, 40, 0.85)` — the semi-transparent dark teal scrim covers the entire section (`absolute inset-0`). The scattered thumbnails and headline remain visible behind it.

**Overlay visibility:** Controlled by CSS `opacity` + `pointer-events` (not `display: none`), enabling a smooth 250ms ease fade-in/out without Embla needing to remeasure layout.

#### Testimonial card deck

An Embla Carousel renders inside the overlay with `align: 'center'` and `containScroll: false`. Each card is 329px wide with a 16px gap between cards. On a 393px screen, the active card is centered (32px left margin), and adjacent cards peek exactly 16px from the left/right screen edges.

**Each testimonial card (total height 455px):**

**Video zone — top half:**
- Dimensions: 329px × 258px
- Rounded top corners only (8px radius), no bottom radius
- Video fills the zone via `object-fit: cover`
- The video overlaps the panel below by 11px (the panel's top starts at `247px` within the card)

**Notch panel — bottom half:**
- Dimensions: 329px × 208px, starts at `top: 247px` within the card
- Background: `slide.cardBgColor` (per-slide color, applied via CSS custom property)
- Top-left corner: 10px diagonal notch, implemented via `clip-path: polygon(10px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 10px)` — same pattern as Value Props mobile cards
- Bottom corners: square (matching Figma Subtract shape)

**Inside the panel (24px inset on all sides):**
- Quote text: 26px FK Roman Standard, line-height 1.04, letter-spacing −0.78px. Oblique segments use `font-style: oblique` (FK Roman Standard Light Oblique); regular segments use `font-weight: 300` (FK Roman Standard Light). Color: `slide.textColor`.
- Below the quote: row of two pills — name on the left, location on the right
  - Pill dimensions: 8px vertical padding, 12px horizontal padding, 20px border-radius
  - Font: FK Grotesk SemiMono, 12px, uppercase, letter-spacing −0.36px
  - Background / text colors: `slide.namePillBg/Text` and `slide.locationPillBg/Text`

**Close button:** 32×32px SVG (`/social-proof/social-proof-modal-button.svg`, rotated 45° in CSS to show as "×"). Positioned at `right: 24px; top: 182px` within the overlay (16px above the video top, flush with the section's standard inset).

---

## Interaction model

1. Section loads showing the non-modal view (scattered thumbnails + headline).
2. Visitor taps a thumbnail → `activeIndex` is set to the thumbnail's `slideIndex`; the overlay fades in; Embla jumps instantly (no scroll animation) to the correct slide.
3. Visitor swipes left/right to explore other testimonials. Embla handles drag and snapping.
4. Tapping the close button sets `activeIndex` back to `null`; overlay fades out.
5. No auto-advance. The visitor fully controls the interaction.
6. Keyboard: `Escape` closes the overlay; `ArrowLeft`/`ArrowRight` navigate slides (matches desktop behavior).

---

## Animation

**Overlay:** CSS `opacity` transition, 250ms ease (open: 0 → 1; close: 1 → 0). Controlled by a data attribute (`data-open="true/false"`) on the overlay element so the transition runs in both directions.

**Section entrance:** None. The section pins via `createSectionPin` (mobile only: `max-width: 767px`). `isAnimComplete` returns `true` immediately — there is no staged entrance animation. The non-modal content is immediately visible when the section pins.

**Reduced motion:** No active animations beyond the overlay fade. The overlay fade is CSS-only; it is acceptable to leave it in place under reduced motion since it is a functional state change, not a decorative effect.

---

## Technical notes

- Component file: `components/sections/MobileSocialProof.tsx`
- CSS file: `styles/sections/mobile-social-proof.css`
- New exported types: `MobileSocialProofThumbnail`, `MobileSocialProofProps`
- `SocialProofSection` gains `hidden md:block` on its root `<section>` element
- The `(max-width: 767px)` pin branch added to `SocialProofSection` in the previous commit is removed — it is redundant now that the desktop component is hidden on mobile
- `MobileSocialProof` imports `SocialProofSlide` and `QuoteSegment` directly from `./SocialProofSection`
- `MobileSocialProof` component root: `md:hidden` + `msp-section`
- Embla carousel for the overlay is always mounted (CSS opacity/pointer-events toggle); when `activeIndex` changes, `emblaApi.scrollTo(activeIndex, true)` jumps to the slide with no scroll animation
- `/_videos/v1/` paths from Figma are internal CDN URLs not available in this codebase; placeholder sources from `public/social-proof/` are used — final video assets to be provided
- Hash-named assets downloaded to `public/spec-020-assets/` during research must be deleted before commit (Rule 20)
- `sectionPin.ts` gains a `'mobile-social-proof-pin'` debug color entry

---

## Acceptance criteria

- [ ] Below 768px: `MobileSocialProof` is shown; `SocialProofSection` is hidden
- [ ] At 768px and above: `SocialProofSection` is shown; `MobileSocialProof` is hidden
- [ ] Six video thumbnails are visible at their Figma-proportional positions on a dark teal background
- [ ] Each thumbnail has a cross marker badge overflowing its top-right corner
- [ ] The headline "GREAT BUSINESSES / deserve to be found." is centered on the section
- [ ] Tapping a thumbnail opens the overlay and immediately shows the correct testimonial slide
- [ ] The overlay fades in over 250ms
- [ ] The active testimonial card is horizontally centered when the overlay opens
- [ ] Adjacent slide cards peek ~16px from the left and right screen edges
- [ ] Swiping left/right moves between testimonials and snaps cleanly
- [ ] Each testimonial card shows the correct video, quote text, and name/location pills
- [ ] Quote oblique segments render in italic; regular segments render upright
- [ ] Each card panel uses the correct per-slide background and text colors
- [ ] The close button appears at `right: 24px; top: 182px` and dismisses the overlay
- [ ] `Escape` key and arrow keys work when the overlay is open
- [ ] The section pins via `createSectionPin` on mobile only
- [ ] No hardcoded content — all text, colors, and video sources are prop-driven
- [ ] TypeScript and ESLint pass with zero errors or warnings
