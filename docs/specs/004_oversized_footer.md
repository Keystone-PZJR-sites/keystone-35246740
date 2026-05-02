# Spec 004 — Oversized Footer

**Status:** Done  
**Figma file:** `XRbD11WIevI5szRFiRrguZ`  
**Figma node:**
- [Footer](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1056-286&m=dev) (node `1056:286`)

**Delivers:** The final section of the homepage — an oversized footer that opens with a full-width collage of four massive headline lines with five video clips woven between them, then transitions into the site's core utility elements: taglines, CTAs, email signup, and a wordmark.

---

## What this section is

The last thing a visitor sees on the homepage. It has a deep maroon background and is organized into two visual zones.

The upper zone is a dramatic collage: four enormous lines of orange type reading "FOR BUSINESSES THAT ARE DONE FIGURING IT OUT THEMSELVES" fill the full width of the screen, with five video clips playing silently beside and between the text. The text and videos together form a tight, collage-like composition that fills the full width edge-to-edge.

Below a long stretch of dark breathing space, the lower zone holds the Keystone mark icon, two columns of short tagline text, two CTA buttons, an email signup bar, and a large "keystone" wordmark that spans nearly the full width at the very bottom.

---

## Scope

### In scope

- Upper zone: four oversized FK Screamer headline lines
- Upper zone: five embedded video clips
- Lower zone: Keystone mark icon
- Lower zone: left and right tagline text
- Lower zone: "Learn more" and "Get started" CTA buttons
- Lower zone: email address signup bar with "Sign Up" button
- Lower zone: full-width "keystone" wordmark

### Out of scope

- Any section above this one
- Functional form submission for the email signup (the field is a visual placeholder only)
- Backend integration of any kind

---

## Visual design

### General

Section background: dark maroon `#3d1719`. At 1440px viewport width, the section is **2095px tall**. There is no visual break between the upper and lower zones — it is one continuous dark background.

### Upper zone — text and video collage

#### Overall structure

The collage is organized as **four horizontal rows of equal height**, stacked one above the other. Every row spans the full section width with small equal breathing room on the left and right edges (approximately 24px each side at 1440px, scaling proportionally at other widths).

Each row contains the text for one headline line and one or more video clips sitting directly beside it. The text always appears at its full rendered size. The video clips expand or contract in width to fill whatever space the text doesn't occupy. There is one consistent gap between the text and each adjacent video — the same size in every row.

**Critically: text and video clips are always exactly the same height as each other within a row.** The entire collage — all four rows — scales proportionally as the browser gets wider or narrower. When the browser is wide, the text is large and the videos are tall; when the browser is narrow, the text is smaller and the videos are shorter. The height of a row always matches the height of the text in that row at any browser width.

#### Text style

All four lines use FK Screamer Bold, all-caps, orange `#f57e56`, with tight line-height (0.82). The text size is 216px at 1440px viewport and scales continuously with browser width — it is never fixed. No upper limit.

Line 3 has a single leading space before "DONE" — this is intentional and part of the visual alignment. Do not strip it.

#### Row-by-row layout

The four rows create a visual staircase — the text appears progressively further right across rows 1 through 3, then jumps back to the left on row 4.

**Row 1 — "FOR BUSINESSES":** Text on the left side of the row. One wide video fills the right side.

**Row 2 — "THAT ARE":** A narrow video on the far left edge. Text in the middle of the row. One wider video fills the right side. The left video is roughly one-third the width of the right video — it is intentionally narrow, acting as a visual counterweight.

**Row 3 — " DONE FIGURING":** One wide video fills the left side of the row. Text sits on the right side. (The leading space in the text creates a small additional visual gap between the video and the first letter — this is correct.)

**Row 4 — "IT OUT THEMSELVES":** Text on the left side. One narrower video on the far right edge.

#### Video clips

Five video clips play silently in muted loops. Each has gently rounded corners (2px). Videos fill their space completely — the video content scales to cover the clip's dimensions, cropping if needed to fill the shape.

| Label | Position in collage | Figma node |
|-------|--------------------|-|
| A — Businesswoman | Right of row 1 | `1056:318` |
| B — Storefront | Left of row 2 (narrow) | `1056:319` |
| C — Barbershop | Right of row 2 (wide) | `1056:317` |
| D — Phone call | Left of row 3 (wide) | `1056:315` |
| E — Ceramics | Right of row 4 (narrow) | `1056:316` |

The Figma node coordinates are reference values for the 1440px canvas. **Do not use the Figma pixel positions as fixed coordinates in the layout.** The layout is rows-and-flex, not absolute positioning — the Figma coordinates describe where elements land as a result of the proportional layout, not where they should be pinned.

### Middle zone — breathing space

A long stretch of dark maroon background with no content. This space is intentional. At 1440px viewport it is 623px tall. It scales proportionally with browser width (approximately 43% of viewport width), down to a minimum of 48px on mobile.

### Lower zone — footer utilities

The lower zone has a maximum width of 1440px and sits at the left edge of the section. At very wide viewports the section background simply extends beyond it.

#### Spacing within the lower zone

At desktop, the vertical gaps between the mark, taglines, CTA row, and wordmark are each approximately **60px**. These gaps come from the bottom of one element to the top of the next — not from the top of the lower zone. On mobile all elements stack vertically with smaller gaps.

#### Keystone mark

The Keystone geometric mark icon. Size: 36×41px, orange `#f57e56`. Sits at the top-left of the lower zone. Asset: `public/footer/footer-keystone-mark.svg`.

#### Taglines

Two short text blocks sitting side by side at desktop, each in its own column:

**Left tagline** (approximately left 44% of the lower zone):  
"The modern growth team for local business."  
Max width approximately 244px.

**Right tagline** (remainder of the lower zone):  
"Stay informed about our latest features and product releases"  
Max width approximately 388px.

Both use: FK Grotesk Neue Regular, 22px, color `#f57e56`, line-height 1.2, letter-spacing −0.66px.

#### CTA buttons — left group

A rounded-pill container (orange `#f57e56` border, 1px, 12px padding inside the border) holds two buttons side by side:

**"Learn more"**
- Fill: `#f57e56`
- Text color: `#3d1719`
- Font: FK Grotesk Neue Regular, 18px, letter-spacing −0.18px
- Height: 48px
- Horizontal padding: 16px on both sides equally
- Shape: fully rounded pill

**"Get started →"**
- Fill: `#ffbb8a` (warm peach)
- Text color: `#3d1719`
- Font: FK Grotesk Neue Regular, 18px, letter-spacing −0.18px
- Height: 48px
- Horizontal padding: 16px on both sides equally
- Right-arrow icon: 16×16px. Asset: `public/footer/footer-cta-arrow.svg`
- Shape: fully rounded pill

**Important:** Both buttons size themselves based on their text content plus the padding. Do not apply different left and right padding to buttons that contain an arrow icon — equal padding on both sides is correct and visually right.

#### Email signup bar — right group

A wide rounded-pill container — orange `#f57e56` border, 1px, 12px inner padding, max width 785px — spans the email input and sign-up button as one unit.

**Email input area** (fills available width inside the bar):  
Placeholder text: "Email Address." Font: FK Grotesk Neue Regular, 22px, color `#f57e56`, letter-spacing −0.66px.

**"Sign Up →" button** (right side of the bar, same style as "Get started"):
- Fill: `#ffbb8a`
- Text color: `#3d1719`
- Font: FK Grotesk Neue Regular, 18px, letter-spacing −0.18px
- Height: 48px
- Horizontal padding: 16px on both sides equally
- Right-arrow icon: 16×16px. Same asset as CTA: `public/footer/footer-cta-arrow.svg`
- Shape: fully rounded pill

#### Keystone wordmark

A full-width SVG logotype reading "keystone" in orange `#f57e56`. It spans 96.5% of the lower zone's width, with a max width of 1389.5px. It sits below the CTA row and above the section bottom.

**Important:** The exported SVG file (`public/footer/footer-wordmark.svg`) contains a known issue — its internal `preserveAspectRatio` attribute is set to `none`, which causes the letterforms to distort and stretch at sizes other than the SVG's intrinsic dimensions. The implementer must enforce the correct proportions using the SVG's viewBox dimensions (1389.5 wide × 268.3 tall, approximately a 5.18:1 ratio) so the wordmark always displays at the correct shape regardless of how it is sized.

---

## Video files

All five source files have been renamed and placed in `public/footer/`:

| Position | Filename | Figma node | Original Stocksy ID |
|----------|----------|------------|---------------------|
| A — Businesswoman | `footer-video-businesswoman.mp4` | `1056:318` | `6476998` |
| B — Storefront | `footer-video-storefront.mp4` | `1056:319` | `6830614` |
| C — Barbershop | `footer-video-barbershop.mp4` | `1056:317` | `5151065` |
| D — Phone call | `footer-video-phone-call.mp4` | `1056:315` | `6624123` |
| E — Ceramics | `footer-video-ceramics.mp4` | `1056:316` | `5659672` |

---

## SVG assets

All three SVGs were exported by the Figma MCP and placed in `public/footer/` with their final names.

| File | Used for |
|------|----------|
| `public/footer/footer-keystone-mark.svg` | Keystone mark icon in the lower zone |
| `public/footer/footer-cta-arrow.svg` | Right-arrow icon inside CTA and Sign Up buttons |
| `public/footer/footer-wordmark.svg` | Full-width "keystone" logotype at the bottom |

Note: `footer-keystone-mark.svg` uses `fill="var(--fill-0, #F57E56)"`. It is structurally similar to `public/images/keystone-mark.svg` (which uses a green fallback) but they are different exports. Use `footer-keystone-mark.svg` for this section to match the Figma exactly.

---

## New design tokens required

Add to `styles/custom-overrides.css` before implementation:

| Token | Value | Used for |
|-------|-------|----------|
| `--color-footer-bg` | `#3d1719` | Section background |

All other colors in this section reuse existing tokens:

| Color | Existing token |
|-------|---------------|
| `#f57e56` | `--color-work-accent` |
| `#ffbb8a` | `--color-work-chip-bg` (already in styles) |

> Note: `--color-work-chip-bg` is referenced in the existing CSS but confirm it is registered as a design token in `custom-overrides.css` before implementation. The CTA button text color `#3c1618` is one digit different from `#3d1719` (the background) — treat them as the same dark maroon for implementation purposes and use `--color-footer-bg`.

---

## Fonts

No new fonts are required. The section uses:

- FK Screamer Bold — already registered
- FK Grotesk Neue Regular — already registered

---

## Responsive behavior

- **Desktop and tablet (≥ 768px):** The collage fills the full viewport width. All four rows and their text and videos are visible. The text size and the height of all videos scale continuously and proportionally as the browser width changes — there is no fixed size at any specific breakpoint. The lower zone arranges into two columns (mark, left tagline, and CTAs on the left; right tagline and email bar on the right). The wordmark scales to fit.

- **Mobile (< 768px):** The video clips are hidden entirely. The four headline lines display stacked vertically, in a simplified all-text layout. Font size approximately 56–96px depending on screen width. The lower zone stacks fully vertically. The wordmark scales to full available width.

At all breakpoints, no element may overflow horizontally. The breathing space between the collage and the lower zone scales proportionally on desktop/tablet; on mobile it is a smaller fixed height.

---

## Content — all text and assets come from props

| Element | Default value |
|---------|---------------|
| Line 1 | `"FOR BUSINESSES"` |
| Line 2 | `"THAT ARE"` |
| Line 3 | `" DONE FIGURING"` (leading space is intentional) |
| Line 4 | `"IT OUT THEMSELVES"` |
| Left tagline | `"The modern growth team for local business."` |
| Right tagline | `"Stay informed about our latest features and product releases"` |
| CTA 1 label | `"Learn more"` |
| CTA 1 href | `#` |
| CTA 2 label | `"Get started"` |
| CTA 2 href | `#` |
| Email placeholder | `"Email Address"` |
| Sign Up label | `"Sign Up"` |
| Keystone mark | `public/footer/footer-keystone-mark.svg` |
| Right-arrow icon | `public/footer/footer-cta-arrow.svg` |
| Keystone wordmark | `public/footer/footer-wordmark.svg` |
| Video A | `public/footer/footer-video-businesswoman.mp4` |
| Video B | `public/footer/footer-video-storefront.mp4` |
| Video C | `public/footer/footer-video-barbershop.mp4` |
| Video D | `public/footer/footer-video-phone-call.mp4` |
| Video E | `public/footer/footer-video-ceramics.mp4` |

No text, video URL, or asset path may be hardcoded in the component file.

---

## Accessibility

- All five videos must be `muted`, `autoplay`, `loop`, and `playsInline`. No audio ever plays.
- With reduced motion on: videos may still play (they contain no animated UI chrome), but any entrance animations should be suppressed. Show the section in its complete visible state immediately.
- The email input must have a visible label or an `aria-label` in lieu of a visible label.
- CTA buttons must be keyboard-navigable and have accessible labels.

---

## Acceptance criteria

- [ ] Section background is dark maroon `#3d1719` across the full width at all viewport sizes
- [ ] Four lines of FK Screamer Bold, all-caps, orange `#f57e56`, line-height 0.82
- [ ] At 1440px the text is 216px tall; it scales continuously larger and smaller as the browser is resized — it never stops scaling at any width
- [ ] The text and video clips in every row are exactly the same height as each other — verified by resizing the browser and confirming they always stay level
- [ ] There is equal spacing between the text and every adjacent video — the gap is the same size in all four rows
- [ ] There is equal breathing room between the collage content and the left and right edges of the screen
- [ ] All five video clips autoplay, loop, are muted, and play inline
- [ ] Each video fills its space completely with no letterboxing or empty edges
- [ ] Video clips have gently rounded corners (2px)
- [ ] The breathing space between the collage and the lower zone is a long uninterrupted stretch of dark background — approximately 623px tall at 1440px viewport
- [ ] Below 768px, the four headline lines stack vertically as text only — no videos visible on mobile
- [ ] Keystone mark icon appears at the top-left of the lower zone, 36×41px, orange
- [ ] Left tagline and right tagline appear side-by-side on desktop, stacked on mobile
- [ ] "Learn more" button is a solid orange pill with dark text, equal padding on both sides
- [ ] "Get started" button is a peach pill with dark text and a right-arrow icon, equal padding on both sides
- [ ] "Sign Up" button matches "Get started" exactly in style — same fill, same text, same arrow, equal padding on both sides — no visual asymmetry around the arrow
- [ ] Both CTA buttons sit inside a common pill-shaped border container
- [ ] Email bar is a wide rounded-pill with an email input on the left and "Sign Up" on the right, all inside one border
- [ ] "keystone" wordmark SVG sits at the bottom, orange, nearly full width — it displays in the correct proportions with no stretching or distortion of the letterforms
- [ ] Lower zone content does not expand beyond 1440px at very wide viewports
- [ ] No element overflows horizontally at 390px, 768px, 1280px, or 1440px viewport widths
- [ ] With reduced motion on: section displays in its complete visible state immediately
- [ ] No text, video URL, or asset path is hardcoded in the component
