# Spec 006 — Social Proof

**Status:** Complete  
**Figma file:** `XRbD11WIevI5szRFiRrguZ`  
**Figma nodes:**
- [Section — resting state](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1073-363&m=dev) (node `1073:363`)
- [Modal carousel — slide 1 (purple)](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1073-530&m=dev) (node `1073:530`)
- [Modal carousel — slide 2 (orange)](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1073-453&m=dev) (node `1073:453`)
- [Modal carousel — slide 3 (green)](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1073-397&m=dev) (node `1073:397`)

**Delivers:** A social proof section that sits between the Work Showcase and the Pricing sections on the homepage. Six looping video clips are scattered around a bold headline at their static Figma positions, then begin to slowly float once in view. Clicking any clip opens a full-screen modal carousel with a large video and a testimonial card. The carousel loops through all six slides forever.

---

## What this section is

A confidence-building section for prospective customers. The dark teal background and editorial headline read "Great BUSINESSES deserve to be found." Six real business video clips drift slowly around the text as the visitor watches. Each clip is clickable. Clicking one opens a full-screen modal that plays a large version of that video alongside a customer testimonial. The modal advances through all six testimonials in sequence, looping forever.

---

## Scope

### In scope

- Section background, headline, and overall layout
- Six video thumbnail clips in their Figma-specified initial positions, each with a small marker badge in its corner
- Floating animation triggered when the section enters the viewport
- Click-to-modal behavior with a smooth expand/shrink transition
- Full-screen modal carousel with six slides
- Modal testimonial card (large quote + attribution pills)
- Modal close button
- Carousel auto-advance on video end and looping

### Out of scope

- Any section above or below this one
- Any form or CTA behavior
- Backend, CMS, or data fetching

---

## Visual design

### General

Section background: deep dark teal `#0d2a28`. At 1440px viewport, the section is **1024px tall**. No horizontal padding on the section container itself — the thumbnails are positioned freely within it and some touch the left edge.

### Headline

A two-line headline centered vertically and horizontally within the section, with its top edge approximately 375px from the section top at 1440px.

- Text line 1: "Great BUSINESSES "  (trailing space intentional)
- Text line 2: "deserve to be found."
- Font: FK Screamer Bold, all-caps
- Size: 128px
- Color: `#f0eee6` (cream — reuse `--color-hero-text`)
- Line-height: 0.82
- Text-align: center
- Width: 953.672px (scales proportionally on narrower viewports)

The headline is part of the section only — it is **not** duplicated inside the modal. The modal has its own solid dark teal background with no background text.

### Video thumbnails — initial positions

Six video clips are placed at fixed positions defined by the 1440px-wide, 1024px-tall Figma canvas. These are the starting positions before the floating animation begins.

All thumbnails have **5px rounded corners**. All loop silently in the background. All are interactive — see the "Click behavior" section.

| # | Node | Width | Height | Left (1440px) | Top (1024px) | Notes |
|---|------|-------|--------|---------------|--------------|-------|
| 1 | `1073:366` | 382px | 215px | 226px | 61px | Largest top thumbnail |
| 2 | `1073:369` | 278px | 156px | 833px | 88px | Medium upper-right |
| 3 | `1073:368` | 178px | 100px | 1238px | 287px | Small far-right |
| 4 | `1073:365` | 275px | 214px | 0px | 503px | Flush with left edge |
| 5 | `1073:364` | 381px | 268px | 934px | 685px | Largest bottom thumbnail |
| 6 | `1073:367` | 178px | 100px | 328px | 768px | Small lower-center |

Each video is scaled to cover its container completely — no letterboxing or empty edges. The video content is cropped to fill the rounded rectangle.

**Important note on thumbnail 4:** At the 1440px Figma canvas its left edge sits at 0px, meaning it runs flush against — and is partially cut off by — the section's left boundary. This is intentional and must be preserved.

### Marker badges

Each of the six thumbnails has a small circular cross marker badge. The badge is positioned so its center sits precisely at the top-right corner of the thumbnail — its bottom-left quadrant overlaps the video, its top-right quadrant extends outside it. All six badges are identical: an upright "+" cross shape (no rotation). The badge floats with the thumbnail as it animates — it is not a separate fixed element.

The badge uses `social-proof-marker-cross.svg`: a 15×15px circle with a "+" inside, cream fill `#F0EEE6`, orange stroke `#F57E56`.

---

## Floating animation

When the section first enters the viewport, all six thumbnails begin to float independently and continuously.

**Animation character:**
- Each thumbnail drifts slowly from its starting position — maximum displacement is approximately 24–36px in any direction.
- The movement is organic and non-linear — each thumbnail follows a gently curved path through several distinct positions rather than moving in a straight line or oscillating back and forth.
- The sizes subtly pulse. Each thumbnail scales between approximately 0.95× and 1.04× of its natural size as it floats.
- Each thumbnail animates with a slightly different speed, distance, direction, and timing offset from the others so they never appear to move in sync.
- The motion is slow and leisurely — a complete drift-and-return cycle should take approximately 6–10 seconds per thumbnail.
- The path returns smoothly to the starting position, creating a seamless, uninterrupted loop with no visible snap, pause, or jump at the loop point.
- The floating never stops once started — it continues indefinitely while the section is in the DOM.

**Reduced motion:** If the visitor has reduced motion enabled, the thumbnails remain completely static at their initial positions. No floating, no scaling. The section still displays with all thumbnails visible.

---

## Click behavior — thumbnail to modal

Each thumbnail is a clickable button. When clicked:

1. The main page stays completely unchanged — no scrolling, no repositioning, no visual shift.
2. The full-screen modal overlay appears via a smooth transition (see "Open/close transition" below).
3. The modal opens at the carousel slide corresponding to the clicked thumbnail.
4. The floating animation of the thumbnails pauses while the modal is open.

The main page behind the modal must not change in any way during or after the modal open/close cycle. No scrolling, no element movement, no layout recalculation.

---

## Open/close transition

### Opening

When a thumbnail is clicked, the clicked video appears to expand in place — growing from its current size and position on the section until it fills the large video slot in the modal. This creates the visual impression that the thumbnail and the modal video are the same object. Concurrently, the modal's dark teal background fades in from transparent to fully opaque over approximately 350ms. The video expansion takes approximately 450ms.

Once the video is fully in position, the testimonial card fades in (approximately 250ms). A moment after that, the adjacent slide previews and the close button fade in.

### Closing

When the close button is clicked:

1. The testimonial card fades out immediately (approximately 150ms).
2. While the card is fading, the modal background also begins fading out.
3. Once the card has faded, the large video shrinks from its full-size position back to the thumbnail's size and position on the section (approximately 350ms).
4. Adjacent slide previews disappear instantly at the start of the close transition.

When the close transition finishes, keyboard focus returns to the thumbnail that was originally clicked. This must happen without the page scrolling.

**Reduced motion:** With reduced motion enabled, all transition animations are suppressed. The modal appears and disappears instantly with no expand, shrink, or fade. Everything becomes visible or invisible in a single frame.

---

## Modal — overall structure

The modal fills the entire viewport. Its background color is the same as the section (`#0d2a28`), and it fades in over the section as described above. The section beneath the modal is always in its natural scroll position — the modal never moves or repositions any page content.

**Elements visible in the modal:**
1. A large video playing the current slide's content
2. A testimonial card overlapping the lower-right area of the video
3. Partially visible adjacent slide videos at the left and right edges (dimmed)
4. A close button in the upper-right area, just above the video

### Main video

- Width: approximately 83% of the viewport width (1194px at 1440px)
- Aspect ratio: 1194:675 (16:9 equivalent)
- Left edge: approximately 7.14% of viewport width + 22px from the left edge
- Vertical position: centered in the viewport — the video's vertical midpoint is at exactly 50% of the viewport height
- Rounded corners: 5px
- Plays the current slide's video with sound

### Active vs. adjacent videos

The active (focused) video is centered in the viewport. Adjacent videos — the previous and next slides — sit approximately 24px below the active video's vertical position. This subtle height difference makes the active video feel elevated relative to the others. When focus passes to an adjacent video, it rises smoothly to the centered position while the previously active video lowers.

### Testimonial card

A shaped overlay that sits over the lower-right area of the video. The card is a plain `<div>` with its background color and distinctive shape applied entirely via CSS — no SVG or image assets.

- **Dimensions:** 534×281px
- **Position:** The card's top edge begins approximately 63% down from the top of the video, and its left edge begins at approximately 50% of the viewport width + 65px. The card always tracks the video's position — as the video moves for different viewport heights, the card moves with it.
- **Card background:** a solid background color in the slide's accent color (see slide color table). Applied as an inline `background-color`.
- **Card shape:** a rectangle with a small diagonal notch cut from the **top-left** corner. The notch runs from approximately (0, 17.5px) across to (17.5px, 0) — a 45° cut about 17.5px deep. All other corners are 90°.
- **Drop shadow:** a subtle two-layer shadow (4px vertical offset at low opacity + 10px vertical offset at lower opacity) creates a gently lifted appearance. Because `clip-path` is used, the shadow must be applied to a wrapper element that sits behind the card so the shadow is visible outside the clipped boundary.

The card content (quote and attribution) is positioned inside the colored area:

**Quote text:**
- Font: FK Roman Standard Light, 40px
- Line-height: 1.04
- Letter-spacing: −1.2px
- Color: the slide's text color (see table)
- Portions of text may be in **oblique** style (FK Roman Standard Light Oblique) for emphasis — see each slide's quote below

**Attribution row** (below the quote, full-width of the card content area):
- Left side: two pill chips side-by-side
  - Pill 1: person name
  - Pill 2: business name
- Right side: one pill chip
  - Location
- All pills: FK Grotesk SemiMono Trial Regular, 12px, all-caps, letter-spacing −0.36px, 12px horizontal padding, 8px vertical padding, fully rounded pill

### Adjacent slides (left and right)

The slides immediately before and after the active slide are partially visible — the carousel visually clips them at the viewport edge. Adjacent slide cards have a dark semi-transparent overlay (`rgba(0,0,0,0.5)`) that visually separates them from the active slide. The overlay is a plain `<div>` with the same `clip-path` as the card, `position: absolute; inset: 0` — no SVG needed.

The left peek must be visible from the very first time the modal is opened — the carousel must behave as a true continuous loop from the start, not only after the user has navigated.

### Close button

A 46px button in the upper-right area of the modal, positioned just above the top edge of the video (approximately 21px above the video's top edge). Its right edge sits approximately 7% of the viewport width from the right edge of the modal. Inside is `social-proof-modal-button.svg` (32.77px — a circle with a "+" inside) **rotated 45°** so the "+" becomes an "×". Clicking this closes the modal.

---

## Modal carousel — behavior

1. **Opens** at the slide corresponding to the clicked thumbnail.
2. **Auto-plays** each video in sequence. When the current video ends, the carousel advances to the next slide automatically with a smooth slide transition.
3. **Loops forever** — after slide 6, it wraps back to slide 1 and continues. The previous slide (slide 6) is always visible as a left-edge peek when viewing slide 1, even on the very first open.
4. **Manual navigation:** the user can click/tap the partially visible adjacent slides to jump to the previous or next slide.
5. **Close:** clicking the × button dismisses the modal via the shrink transition described above.
6. When the modal closes, the thumbnails resume floating (if previously animated).

**Slide transition:** a horizontal slide — the active slide moves out to the left while the next slide enters from the right. The transition should be smooth and quick (approximately 400–600ms ease-in-out). Reduced motion: no transition animation; slides cut instantly.

---

## Slide content — all six testimonials

Slides 1–3 use designs from the Figma. Slides 4–6 use color lockups from elsewhere in the site. All text is passed through props.

| Slide | Card background | Text color | Quote | Oblique portion | Attribution |
|-------|----------------|-----------|-------|-----------------|-------------|
| 1 (purple) | `#d8c2ff` | `#2f0d3f` | "*The weird part* is I think about my marketing less than I did before I had Keystone as my marketing team." | "The weird part" | Dexter H. / Fremont, CA |
| 2 (orange) | `#f57e56` | `#3e181a` | Same quote | "four months" | Same person |
| 3 (green) | `#6ecc8b` | `#063126` | "I know my cost per lead, my best-performing channel, and my close rate. I learned all of it *after I stopped doing it myself*." | "after I stopped doing it myself" | Estefany C. / Bordentown, NJ |
| 4 (yellow) | `#F2D474` | `#835F20` | "We always did good work. *Now people can tell* before we show up." | "Now people can tell" | Bruce B. / New London, CT |
| 5 (teal) | `#AAE0D2` | `#318175` | "Handing off the follow-up was hard at first. Like, these are my customers. They still are, *I just don\u2019t lose them anymore*." | "I just don\u2019t lose them anymore" | Kelly L. / Palm Coast, FL |
| 6 (blue) | `#9DCBFF` | `#055CFF` | "I had five logins, three vendors, and zero answers. Now I have *one conversation*." | "one conversation" | Jessica R. / Portland, CT |

These quotes and attributions are placeholder defaults. In production each slide will have unique content.

### Attribution pill colors per slide

| Slide | Name pill bg | Name pill text | Business pill bg | Business pill text | Location pill bg | Location pill text |
|-------|-------------|---------------|-----------------|-------------------|-----------------|-------------------|
| 1 (purple) | `#f0e8ff` | `#2f0d3f` | `#2f0d3f` | `#f0eee6` | `#9c65ee` | `#d8c2ff` |
| 2 (orange) | `#ffebd9` | `#3c1618` | `#3c1618` | `#f0eee6` | `#9f3722` | `#ffbb8a` |
| 3 (green) | `#063126` | `#dcfbd9` | `#56b373` | `#063126` | `#dcfbd9` | `#063126` |
| 4 (yellow) | `#F2BA46` | `#835F20` | `#835F20` | `#F2D474` | `#F2BA46` | `#835F20` |
| 5 (teal) | `#399587` | `#AAE0D2` | `#318175` | `#AAE0D2` | `#AAE0D2` | `#318175` |
| 6 (blue) | `#56a6ff` | `#f0eee6` | `#055CFF` | `#9DCBFF` | `#9DCBFF` | `#055CFF` |

### Card shape

The testimonial card shape is achieved with a single CSS `clip-path` on the card `<div>`. No SVG files are involved. The notch is cut from the top-left corner at a 45° angle, approximately 17.5px deep. All other corners are right angles. The same shape is applied to the dim overlay `<div>` on adjacent cards.

---

## Video assets

All six video files are in `public/social-proof/` as placeholder copies of existing site videos. They must be replaced with production footage before launch.

| File | Thumbnail position | Placeholder source |
|------|-------------------|-------------------|
| `public/social-proof/social-proof-video-1.mp4` | Thumbnail 1 — large top | copy of `footer-video-businesswoman.mp4` |
| `public/social-proof/social-proof-video-2.mp4` | Thumbnail 2 — medium upper-right | copy of `footer-video-storefront.mp4` |
| `public/social-proof/social-proof-video-3.mp4` | Thumbnail 3 — small far-right | copy of `footer-video-barbershop.mp4` |
| `public/social-proof/social-proof-video-4.mp4` | Thumbnail 4 — left-edge | copy of `footer-video-ceramics.mp4` |
| `public/social-proof/social-proof-video-5.mp4` | Thumbnail 5 — large bottom-right | copy of `footer-video-phone-call.mp4` |
| `public/social-proof/social-proof-video-6.mp4` | Thumbnail 6 — small bottom-center | copy of `home-hero-bg.mp4` |

Each video is used in two places: as a looping background clip in its thumbnail, and as the full-size playback video in the corresponding modal carousel slide.

---

## SVG and image assets

All assets are in `public/social-proof/` with final descriptive names. The card shape and its dim overlay are plain HTML/CSS — no SVG assets are needed for them.

| File | Description | Dimensions | Used for |
|------|-------------|-----------|---------|
| `social-proof-marker-cross.svg` | Small circle with "+" inside — cream fill (`#F0EEE6`), orange stroke (`#F57E56`). | 15×15px | Marker badge on every thumbnail, upright, no rotation |
| `social-proof-marker-diamond.svg` | Identical circle with "+" inside — same fill and stroke. | 15×15px | Not used in the current implementation; retained as an asset |
| `social-proof-modal-button.svg` | Larger circle with "+" inside — dark teal fill (`#0A1F1E`), teal stroke (`#399587`). | 32.77×32.77px | Close button in modal (rotated 45° to display as ×) |

---

## New design tokens required

Add to `styles/custom-overrides.css` before implementation:

| Token | Value | Used for |
|-------|-------|----------|
| `--color-social-proof-bg` | `#0d2a28` | Section and modal background |

All other colors in this section either reuse existing tokens or are defined per-slide via props.

---

## Fonts

**Already registered:**
- FK Screamer Bold — headline
- FK Roman Standard Regular + Oblique — testimonial quotes

**Not yet registered — required before implementation:**
- **FK Roman Standard Light** (weight 300, normal style) — used for the testimonial quote body text in the Figma. If the Light weight font file is unavailable, FK Roman Standard Regular (weight 400) is an acceptable fallback; the visual difference is subtle.
- **FK Roman Standard Light Oblique** (weight 300, oblique) — used for the emphasized portions of quotes. Substitute with FK Roman Standard Oblique if the Light Oblique file is unavailable.
- **FK Grotesk SemiMono Trial Regular** — used for the attribution pill labels (12px, all-caps). This font was previously noted as required in spec 002. Verify it is registered in `styles/custom-overrides.css`; if not, register it following the same `@font-face` pattern as existing FK faces, using a file placed in `public/fonts/`. FK Grotesk Mono Regular is the fallback.

---

## Responsive behavior

The Figma shows only the 1440px desktop layout. Adapt as follows:

- **Desktop (≥ 1280px):** Full layout as described. Six thumbnails at their Figma-defined positions (scaled proportionally). Floating animation active.
- **Tablet (768–1279px):** Thumbnails scale down proportionally with the viewport. The headline scales down. The floating animation continues. Modal video and card scale to fit the narrower viewport.
- **Mobile (< 768px):** Thumbnails reposition into a simpler stacked arrangement — three across the top, two below the headline, one at the bottom, or a similar layout that keeps all six visible without extreme overlap. Floating animation is disabled — thumbnails remain static. The modal fills the full screen; the video plays full-width at 16:9; the testimonial card appears below the video (not overlapping it). Adjacent slides are not shown in the mobile modal.

No element may overflow horizontally at any breakpoint.

---

## Content — all text, video sources, and assets come from props

| Element | Default value |
|---------|---------------|
| Section headline line 1 | `"Great BUSINESSES "` (trailing space intentional) |
| Section headline line 2 | `"deserve to be found."` |
| Video thumbnails | Array of 6 objects, each with `videoSrc`, `width`, `height`, `initialLeft`, `initialTop`, `markerSrc` |
| Carousel slides | Array of 6 slide objects (see slide object shape below) |
| Modal close button src | `"/social-proof/social-proof-modal-button.svg"` |

**Each thumbnail object contains:**
- `videoSrc` — path to the video file
- `width`, `height` — dimensions at the 1440×1024 Figma canvas
- `initialLeft`, `initialTop` — position at the 1440×1024 Figma canvas
- `markerSrc` — path to the marker badge SVG (all six use `social-proof-marker-cross.svg`)

**Each slide object contains:**
- `videoSrc` — path to the video file
- `cardBgColor` — the card's background color (a hex string; applied as `background-color` on the card div)
- `quoteSegments` — array of `{ text, oblique }` objects representing the quote in order
- `textColor` — the quote text color
- `personName`, `businessName`, `location` — attribution strings
- `namePillBg`, `namePillText`, `businessPillBg`, `businessPillText`, `locationPillBg`, `locationPillText` — pill colors

No text, video path, color, or asset path may be hardcoded in the component file.

---

## Accessibility

- All six thumbnail videos are `muted`, `autoplay`, `loop`, and `playsInline` in the section view. They are decorative — `aria-hidden="true"` is appropriate.
- When a thumbnail is clicked, keyboard focus must move into the modal. The modal must be announced to screen readers as a dialog.
- The close button must have an accessible label: `aria-label="Close"`.
- The modal video plays with audio. No mute control is shown — this is intentional per the design.
- The carousel must be navigable via keyboard: left/right arrow keys advance slides, Escape closes the modal.
- When the modal closes, keyboard focus must return to the thumbnail that was clicked. This must not cause the page to scroll.
- With reduced motion enabled: thumbnails are static (no floating); the open/close transition is instant (no expand, shrink, or fade); the modal carousel cuts between slides instantly.
- Marker badge SVGs use `alt=""` and `aria-hidden="true"`.

---

## Acceptance criteria

- [ ] Section background is deep dark teal `#0d2a28` across the full width
- [ ] Section is 1024px tall at 1440px viewport width
- [ ] Headline "Great BUSINESSES deserve to be found." is centered, FK Screamer Bold, 128px, cream `#f0eee6`, line-height 0.82
- [ ] Six video thumbnails appear at their Figma-specified initial positions at 1440px width
- [ ] Each thumbnail loops silently, fills its container with no letterboxing, and has 5px rounded corners
- [ ] Thumbnail 4 (left-edge) is flush with or extends slightly beyond the left edge of the section — no margin on its left
- [ ] Every thumbnail has a small circular cross marker badge (`+`, upright, no rotation) whose center sits at the thumbnail's top-right corner
- [ ] The marker badge bottom-left quadrant overlaps the thumbnail video; the top-right quadrant extends outside it
- [ ] After the section scrolls into view, all six thumbnails begin to drift slowly and independently from their starting positions
- [ ] Each thumbnail's floating motion is unique — different speed, direction, and distance from the others
- [ ] Thumbnails subtly scale up and down as they float (approximately ±5% scale range)
- [ ] The floating path returns smoothly to the origin — no visible snap, pause, or jump at the loop point
- [ ] The floating never stops while the section is visible
- [ ] The marker badge floats with its thumbnail — it is not fixed in place
- [ ] The headline does not move — it remains static throughout
- [ ] Clicking any thumbnail opens the full-screen modal
- [ ] The clicked video visually expands from its thumbnail size and position to fill the modal video slot — no jump or cut
- [ ] The dark teal modal background fades in smoothly (approximately 350ms) as the modal opens
- [ ] The testimonial card fades in only after the video has finished expanding — it is not visible during the expand animation
- [ ] The adjacent slide previews and close button fade in after the video and card are in place
- [ ] The main page does not scroll, shift, or change in any way when the modal opens or closes
- [ ] The modal background is `#0d2a28` with no headline or background text
- [ ] The active modal video is approximately 83% of viewport width, vertically centered in the viewport, 5px rounded corners
- [ ] The active video plays automatically with audio when the modal opens
- [ ] The active video's vertical midpoint is at 50% of the viewport height
- [ ] Adjacent slide videos sit approximately 24px below the active video's vertical position
- [ ] When focus passes to a new slide, the newly active video rises smoothly to the centered position
- [ ] The testimonial card's top edge is approximately 63% down from the top of the video, tracking the video position at all viewport heights
- [ ] The card shape has a diagonal notch at its top-left corner — achieved with CSS clip-path, no SVG asset
- [ ] The quote text uses FK Roman Standard (Light if available, Regular as fallback), 40px, line-height 1.04
- [ ] Emphasized quote portions (italicized) use the oblique variant of FK Roman Standard
- [ ] Attribution pills (person, business, location) use FK Grotesk SemiMono Trial Regular 12px, all-caps, correct per-slide colors
- [ ] The close button appears just above the top-right of the video (approximately 21px above the video's top edge)
- [ ] The close button is a circle with a "+" rotated 45° to form an "×"
- [ ] Adjacent slides are partially visible at the left and right viewport edges, with a dark semi-transparent overlay on their cards
- [ ] The left adjacent slide is visible from the very first modal open at slide 1 — the loop is active immediately
- [ ] When the close button is clicked, the card fades out first; then the video shrinks back to the thumbnail
- [ ] When the close button is clicked, the modal background fades out concurrent with the video shrinking
- [ ] When the modal closes, keyboard focus returns to the thumbnail that was clicked, without the page scrolling
- [ ] When the active video ends, the carousel automatically advances to the next slide with a smooth slide transition (~400–600ms)
- [ ] After slide 6, the carousel wraps back to slide 1 — the loop never stops
- [ ] Pressing Escape closes the modal
- [ ] Left/right arrow keys navigate between slides in the modal
- [ ] On subsequent opens (after having closed the modal once), all videos and cards appear correctly — no missing content
- [ ] With reduced motion on: thumbnails are static, modal open/close is instant (no expand/shrink/fade), carousel cuts between slides with no animation
- [ ] On mobile (< 768px): thumbnails remain visible (repositioned), floating animation disabled, modal video is full-width above the testimonial card
- [ ] No element overflows horizontally at 390px, 768px, 1280px, or 1440px viewport widths
- [ ] No text, video path, color, or asset path is hardcoded in the component
