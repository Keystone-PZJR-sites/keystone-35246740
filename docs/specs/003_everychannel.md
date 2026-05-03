# Spec 003 — Every Channel

**Status:** Draft  
**Figma file:** `XRbD11WIevI5szRFiRrguZ`  
**Figma node:**
- [Every Channel animation storyboard](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1065-983) (node `1065:983`)

**Delivers:** The third section of the homepage — a scroll-triggered full-screen video that rises over the Work Showcase, then holds the visitor while large display text builds line by line and seven colorful channel-type pills scatter across the frame.

---

## Before building

Before writing any code, use the Figma MCP to run `get_design_context` on node `1065:983` (file `XRbD11WIevI5szRFiRrguZ`). Also run `get_screenshot` on the same node for a visual reference.

The Figma node contains six sequential frames — `channel_01` through `channel_06` — each representing a distinct stage of the animation. Together they show the full progression: the video background, the three text lines at each stage of entry, and the complete set of pill positions and colors in the final state.

Use the MCP output as the source of truth for:

- Exact pill canvas coordinates and colors
- Font specifications, text sizing, and line-height
- The vertical center position of the text block at rest
- Any visual detail not explicitly called out in this spec

Do not build from the tables in this spec alone. Always cross-reference against the live Figma data — the spec describes intent and behavior; Figma describes exact visual values.

---

## What this section is

The third section on the homepage. Visitors reach it by scrolling down after the Work Showcase.

The section announces itself with a single dramatic gesture: a full-width, full-viewport video rises upward from below the page, sliding over the Work Showcase as the visitor scrolls. The moment the video's top edge enters the viewport, scroll jacking engages and the video snaps automatically to fill the full browser window. There is no in-between state — the video is either fully off-screen below or fully covering the viewport. The visitor cannot hold it halfway.

Once the video fills the frame, the visitor is held in place. Scrolling during this held period advances a layered animation: three lines of large display type scroll up from below the frame one at a time, settling into a centered block over the video. As the text builds, seven colorful pill chips sprinkle onto the screen at fixed positions, each one popping into view on its own beat. The first pill appears right after the first line resolves. The pills are evenly distributed in time from that point through just after the third line resolves. Once the last pill settles, there is a brief pause, then normal scrolling resumes into the next section.

The video loops continuously throughout.

---

## Scope

### In scope

- Full-screen video background that loops silently
- Scroll reveal: video enters from below, rising over the Work Showcase
- Scroll jacking: automatic snap to full coverage once the video top edge enters the viewport
- Three lines of display text, each entering from below in sequence
- Seven channel-type pill chips that sprinkle onto the frame, one per beat, evenly distributed from right after line 1 through just after line 3
- Pin behavior: visitor is held in place while the text and pill animation plays
- Release: normal scroll resumes after the full sequence completes

### Out of scope

- Any section above or below this one
- Any interactive behavior after the animation is complete
- The sections between this one and the footer (those are later specs)
- Backend integration of any kind

---

## Visual design

### General

The section is full-screen — it fills the entire browser viewport at all times. The video is the background. The warm cream `#f0eee6` shows only as a fallback color before the video loads. Section dimensions: full viewport width × full viewport height.

### Video background

The video fills the section edge to edge, scaling to cover the full area and cropping if needed — no letterboxing, no empty edges. It plays silently, muted, in a continuous loop. It begins playing as soon as the section starts entering the viewport, before the snap completes.

Video file: `public/every-channel/every-channel-bg.mp4`

### Display text

Three lines of FK Screamer Bold sit centered over the video. All three lines are uppercase. The text color is warm cream `#f0eee6`.

**Line 1:** "Every CHANNEL."  
**Line 2:** "Every INTERACTION."  
**Line 3:** "done-for-you."

Font size: approximately 216px at 1440px viewport width, scaling continuously with browser width — never fixed. Line height: 0.82. The text is horizontally centered in a container that is 1238px wide at 1440px viewport width and scales proportionally at other widths.

In the final resting state, all three lines form a single centered block whose vertical center aligns with the vertical center of the viewport.

### Channel pills

Seven pill chips sit at fixed positions across the section. Each is a fully rounded pill shape with a small cream dot on the left side and a text label on the right.

**Pill construction:**

- Background: each pill's own color (see table below)
- Left dot: 10×10px filled circle, cream `#f0eee6`
- Gap between dot and label: 12px
- Label font: FK Grotesk Neue Regular, 18px, cream `#f0eee6`, letter-spacing −0.18px
- Padding: 8px top and bottom, 16px left and right
- Shape: fully rounded pill

**Pill positions and colors (at 1440 × 1024px canvas):**

| Label | Background | Canvas left | Canvas top |
|-------|-----------|------------|-----------|
| Ads | `#ff7c1f` | 463px | 143px |
| Sales | `#56a6ff` | 886px | 389px |
| Web | `#5bc3b3` | 78px | 499px |
| Leads | `#f2ba46` | 283px | 811px |
| Reviews | `#f6523c` | 1106px | 722px |
| Content | `#f38bb0` | 1247px | 284px |
| Social | `#9c65ee` | 573px | 566px |

Pill positions are expressed as percentages of the section's width and height in the implementation — never as fixed pixels — so they scale correctly at all viewport sizes.

---

## Animation behavior

### Phase 1 — video cover reveal

As the visitor scrolls down from the Work Showcase, the Every Channel section rises from below the page. It slides upward like a cover, visually overlapping the Work Showcase beneath it. The video is already playing before the top edge of the section becomes visible.

As soon as the section's top edge crosses into the viewport, scroll jacking engages. The section snaps automatically to fill the full browser window, completing its upward travel even if the visitor has stopped scrolling. The visitor has no ability to rest the video at a partial height.

The snap motion uses a medium-duration ease-in-out curve — it accelerates at the start and decelerates as it arrives, taking approximately 600–800ms to complete. It should feel like the section is being pulled into place, not launched.

### Phase 2 — pinned text and pill sequence

Once the section fills the viewport, it is pinned. Scrolling during this phase advances the animation rather than moving the page.

The sequence unfolds as follows:

**Text lines scroll in from below, one at a time.** Each line starts below the bottom edge of the viewport, then rises upward into its resting position at the center of the frame. Each line moves smoothly with a gentle ease-out glide. Lines do not overlap during their travel — the second line begins rising after the first has settled; the third after the second has settled. Once all three lines have arrived, they form a single centered block.

**Pills appear one per beat, evenly spaced in time.** The seven pills are distributed across seven evenly-spaced beats that begin right after line 1 resolves and end just after line 3 resolves. Each pill enters with a scale-pop — it grows from invisible and small to its full size with a brief overshoot that gives it a physical, springy feel. No two pills appear simultaneously.

**Suggested beat timing:**

| Beat | Pill | Approximate timing |
|------|------|--------------------|
| 1 | Ads | right after line 1 resolves |
| 2 | Sales | ⅙ of the way through the remaining span |
| 3 | Web | ⅓ of the way through (~line 2 entering) |
| 4 | Leads | ½ of the way through (~line 2 resolving) |
| 5 | Reviews | ⅔ of the way through (~line 3 entering) |
| 6 | Content | ⅚ of the way through (~line 3 resolving) |
| 7 | Social | just after line 3 resolves |

The label-to-beat assignment above is a starting point for visual balance. The implementer may adjust individual pill-to-beat assignments if the composition reads better at any beat. The binding constraints are: the first beat lands right after line 1 settles, the last beat lands just after line 3 settles, and all seven beats are roughly equidistant in time.

After the last pill resolves, there is a brief pause before the pin releases and the visitor can continue scrolling.

### Easing and timing sensibility

All animations in this section use GSAP with ScrollTrigger for scroll-driven elements. All animations must be wrapped in `gsap.matchMedia()` to respect reduced motion (see Accessibility).

**Text lines:** Each line uses a fast ease-out deceleration — it enters quickly and decelerates as it arrives at rest, like a heavy object coming to a stop. Duration approximately 700–900ms per line. No bounce on arrival; the motion is clean and confident.

**Pill pop:** Each pill scales from nothing (invisible, near-zero size) to slightly over its full size, then settles back to exactly its full size — a brief, tight overshoot that gives it a springy, physical quality. The overshoot is subtle: the pill never grows more than ~10–15% beyond its final size before settling. Total duration approximately 400–500ms per pill.

**Overall feel:** The pacing of this section should feel consistent with the Hero and Work Showcase — controlled, intentional, and smooth. Nothing should feel abrupt or mechanical. The text builds with authority; the pills arrive with a touch of playfulness.

### Reversibility

If the visitor scrolls back up before the animation is complete, the animation reverses cleanly. Text lines descend back below the frame; pills disappear. The section un-covers the Work Showcase. The video stops playing once it is fully off-screen.

---

## Video file

| Source filename | Destination |
|----------------|-------------|
| `Stocksy_unlicensed_comp_watermarked_6214876.mp4` | `public/every-channel/every-channel-bg.mp4` |

The video is a watermarked placeholder for the licensed Stocksy asset. It must be `muted`, `autoplay`, `loop`, and `playsInline`. No controls are ever visible.

---

## Design tokens required

No new tokens are needed for this section. All colors already exist:

| Color | Existing token or note |
|-------|----------------------|
| `#f0eee6` | Reuses `--color-hero-text` (warm cream) |
| Pill colors | Unique per pill; passed as props — not registered as tokens |

---

## Fonts

No new fonts required. The section uses:

- FK Screamer Bold — already registered
- FK Grotesk Neue Regular — already registered

---

## Responsive behavior

- **Desktop and tablet (≥ 768px):** Full animation as described above. Text scales continuously with viewport width. Pills remain at their percentage positions and scale with the viewport.
- **Mobile (< 768px):** The scroll reveal, scroll jacking, and pin animation are suppressed entirely. The section displays in its complete final state — all three text lines visible and centered, all seven pills visible at their positions, video playing in the background. The visitor scrolls through the section without any held animation.

At all breakpoints, no text or pill may overflow horizontally.

---

## Content — all text and assets come from props

| Element | Default value |
|---------|---------------|
| Line 1 | "Every CHANNEL." |
| Line 2 | "Every INTERACTION." |
| Line 3 | "done-for-you." |
| Video source | `public/every-channel/every-channel-bg.mp4` |
| Pill 1 label | "Ads" |
| Pill 1 color | `#ff7c1f` |
| Pill 1 position (left) | 32.2% |
| Pill 1 position (top) | 14.0% |
| Pill 2 label | "Sales" |
| Pill 2 color | `#56a6ff` |
| Pill 2 position (left) | 61.5% |
| Pill 2 position (top) | 38.0% |
| Pill 3 label | "Web" |
| Pill 3 color | `#5bc3b3` |
| Pill 3 position (left) | 5.4% |
| Pill 3 position (top) | 48.7% |
| Pill 4 label | "Leads" |
| Pill 4 color | `#f2ba46` |
| Pill 4 position (left) | 19.7% |
| Pill 4 position (top) | 79.2% |
| Pill 5 label | "Reviews" |
| Pill 5 color | `#f6523c` |
| Pill 5 position (left) | 76.8% |
| Pill 5 position (top) | 70.5% |
| Pill 6 label | "Content" |
| Pill 6 color | `#f38bb0` |
| Pill 6 position (left) | 86.6% |
| Pill 6 position (top) | 27.7% |
| Pill 7 label | "Social" |
| Pill 7 color | `#9c65ee` |
| Pill 7 position (left) | 39.8% |
| Pill 7 position (top) | 55.3% |

No text, video URL, color, or pill position may be hardcoded in the component file.

---

## Accessibility

- The video must be `muted`, `autoplay`, `loop`, and `playsInline`. No audio ever plays.
- All GSAP animations must be wrapped in `gsap.matchMedia()` using the `(prefers-reduced-motion: no-preference)` media query. When reduced motion is on, the section displays in its complete final state immediately — all three text lines visible, all seven pills visible, video playing. No scroll jacking, no pin animation, no held scroll.
- The section is presentational — it contains no interactive elements that require keyboard navigation.

---

## Acceptance criteria

- [ ] The section is invisible (off-screen below) when the visitor first loads the page
- [ ] Scrolling down from the Work Showcase causes the section to rise upward from below, covering the Work Showcase
- [ ] The video begins playing before the section's top edge is visible — it is not dark or blank during the reveal
- [ ] As soon as the section's top edge enters the viewport, scroll jacking snaps the section to fill the full browser window
- [ ] The snap is smooth and fast with ease-in-out — it feels like the section is being pulled into place
- [ ] There is no state where the video is partially visible and holding — it is either fully off-screen or fully covering the viewport
- [ ] Video fills the full viewport edge to edge with no letterboxing or empty edges
- [ ] Video is muted, loops continuously, and plays inline with no visible controls
- [ ] Once the section fills the viewport, scrolling advances the text and pill animation and does not move the page
- [ ] "Every CHANNEL." (rendered uppercase) enters from below and rises to settle at the vertical center of the frame
- [ ] "Every INTERACTION." enters after the first line and rises to join it
- [ ] "done-for-you." (rendered uppercase) enters last and rises to join the other two lines
- [ ] All three lines form a single vertically centered block in the final state
- [ ] Each text line glides into position smoothly — no jerkiness, no bounce
- [ ] Text is FK Screamer Bold, cream `#f0eee6`, approximately 216px at 1440px viewport width
- [ ] Text scales continuously with viewport width — it is never a fixed size
- [ ] Seven pills appear, each on its own beat, in the order defined in this spec
- [ ] No two pills appear simultaneously — every pill has its own distinct moment
- [ ] Each pill entrance has a spring scale-pop feel with a small overshoot before settling
- [ ] The first pill appears right after line 1 resolves
- [ ] The last pill appears just after line 3 resolves
- [ ] All seven beats are roughly equidistant in time
- [ ] After the last pill settles, there is a brief pause before scrolling resumes
- [ ] Each pill displays at its correct percentage position relative to the section
- [ ] Each pill shows the correct label, background color, cream dot, and cream text
- [ ] Scrolling back up before the animation completes reverses the animation cleanly
- [ ] On mobile: no animation, no scroll jacking — section displays in its full final state, all content visible, video playing
- [ ] With reduced motion on: section shows in its complete final state immediately — no animation, no held scroll
- [ ] No text or pill overflows horizontally at 390px, 768px, 1280px, or 1440px viewport widths
- [ ] No text, color, video URL, or pill position is hardcoded in the component
