# Spec 017 — Mobile Every Channel

**Status:** Ready for implementation  
**Figma node:** [Every Channel — Mobile](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1277-460&m=dev) (node `1277:460`)  
**Depends on:** Spec 015 (Mobile Experience Model), Spec 016 (Mobile Hero)  
**Companion:** Spec 003 (Every Channel — desktop)

---

## What this section is

The mobile version of the Every Channel section. It is the third section on the home page, reached after scrolling past the Work Showcase.

Unlike the original mobile philosophy (Spec 015) which suppressed animations, this section retains the full animation sequence from the desktop — the video cover reveal, the scroll pin, the three text lines animating in, and the pills springing onto the screen. The experience is the same as desktop; the visual design adapts for the narrower frame.

This section is only shown below 768px. Above that width, the desktop EveryChannel component (Spec 003) takes over.

---

## Scope

### In scope

- Full-screen section that rises over the Work Showcase mobile section on scroll
- Scroll snap: the section automatically fills the viewport once its top edge enters
- Pin behavior: the visitor is held while text and pills animate in
- Three lines of display text animating in from below
- Seven channel pills that spring onto the screen
- The same video background as desktop, playing throughout
- Release: natural scroll resumes after the full sequence completes

### Out of scope

- The desktop EveryChannel — it is not changed by this spec
- The Work Showcase mobile section
- The Product Screens mobile section (Spec 018)
- Any interactive behavior after animation completes

---

## Visual design

Refer to Figma node `1277:460` for all exact values.

### Overall layout

The section fills the full viewport. The dark green background covers everything. Unlike the desktop, the video does not fill the entire section — it occupies the lower portion only, inset from the sides, with rounded corners. The display text sits above the video in the upper portion of the section against the plain dark green background.

### Video

The video sits in the lower portion of the frame, inset equally from the left and right edges, with rounded corners. It does not fill the full section width — a narrow strip of dark green background is visible on both sides. See Figma for exact inset, corner radius, and vertical position.

The video is the same background clip used in the desktop version.

### Display text

Three lines of FK Screamer Bold in the site's warm cream color. On mobile the text is **left-aligned** — unlike the desktop where it is centered. The font is smaller than on desktop; see Figma for exact size. Line height 0.82. The three lines are:

- **Line 1:** "Every CHANNEL."
- **Line 2:** "Every INTERACTION."
- **Line 3:** "done-for-you."

All three lines are rendered uppercase. The text block sits in the upper area of the section, above the video zone.

### Channel pills

Seven pills are scattered across the full height of the section at positions adapted for the mobile frame. Same seven channels, same pill construction as desktop (a small dot on the left and a label on the right), but smaller — see Figma for dot size, font size, and padding. The pill colors are unchanged.

**Mobile pill positions (as percentage of section width × height; for exact pixel values see Figma node `1277:460`):**

| Label | Background | Left % | Top % |
|-------|-----------|--------|-------|
| Sales | `#56a6ff` | 78.4% | 5.4% |
| Leads | `#f2ba46` | 5.6% | 13.0% |
| Reviews | `#f6523c` | 62.1% | 23.0% |
| Ads | `#ff7c1f` | 77.9% | 35.9% |
| Social | `#9c65ee` | 31.8% | 67.3% |
| Web | `#5bc3b3` | 4.1% | 85.8% |
| Content | `#f38bb0` | 75.8% | 93.0% |

Positions are expressed as percentages so they scale correctly at all mobile viewport sizes.

---

## Animation behavior

The animation sequence mirrors the desktop exactly — the same three phases in the same order. See Spec 003 for the full behavioral description. The notes below describe only the mobile-specific differences.

### Phase 1 — Video cover reveal

Same as desktop: the section rises from below as the visitor scrolls down from the Work Showcase mobile section. As soon as the section's top edge enters the viewport, scroll jacking snaps the section to fill the full browser window. The snap uses the same medium-duration ease-in-out curve.

### Phase 2 — Pinned text and pill sequence

Same sequence as desktop: the three text lines scroll in from below one at a time, settling into their resting positions; the seven pills spring onto the screen one per beat across the span of the text animation. The first pill lands right after line 1 resolves; the last lands just after line 3 resolves; all seven beats are roughly equidistant.

The difference from desktop: the text settles left-aligned in the upper portion of the section (not centered across the full viewport). The pills settle at the mobile positions defined above.

### Phase 3 — Release

Same as desktop: a brief pause after the last pill settles, then normal scrolling resumes.

### Reversibility

Scrolling back up at any point reverses the animation cleanly — text lines descend, pills disappear, the section un-covers the Work Showcase below it.

---

## Content

All content is shared with the desktop version. No new props are needed.

| Element | Value |
|---------|-------|
| Line 1 | "Every CHANNEL." |
| Line 2 | "Every INTERACTION." |
| Line 3 | "done-for-you." |
| Video source | Same as desktop — `every-channel-bg.mp4` |
| Pills | Same seven pills, same colors, new mobile positions (above) |

---

## Accessibility

- The video must be `muted`, `autoplay`, `loop`, and `playsInline`. No audio plays.
- All GSAP animations must respect `prefers-reduced-motion`. When reduced motion is on, the section shows in its complete final state immediately — all three text lines and all seven pills visible, video playing, no scroll jacking or pin.

---

## Acceptance criteria

- [ ] Below 768px, the mobile Every Channel section is shown — not the desktop version
- [ ] At 768px and above, the desktop version is shown unchanged
- [ ] Scrolling down from the Work Showcase causes the mobile section to rise from below, covering it
- [ ] As soon as the section's top edge enters the viewport, scroll jacking snaps it to fill the full browser window
- [ ] The snap is smooth, with ease-in-out — it feels like the section is pulled into place
- [ ] The video is already playing before the snap completes — it is never dark or blank
- [ ] The video sits in the lower portion of the section, inset from the sides with rounded corners
- [ ] Strips of dark green background are visible on both sides of the video
- [ ] Once the section fills the viewport, scrolling advances the animation — the page does not move
- [ ] "Every CHANNEL." enters from below, left-aligned, and settles in the upper portion of the section
- [ ] "Every INTERACTION." enters after the first line and joins it
- [ ] "done-for-you." (rendered uppercase) enters last and joins the other two lines
- [ ] Each text line glides into position smoothly with a clean ease-out
- [ ] Seven pills spring onto the screen one at a time across the span of the text animation
- [ ] No two pills appear simultaneously
- [ ] Each pill has the springy scale-pop entrance matching the desktop version
- [ ] Each pill is at the correct mobile percentage position
- [ ] Each pill shows the correct label, background color, cream dot, and cream label text
- [ ] After the last pill settles, there is a brief pause before scroll resumes
- [ ] Scrolling back up reverses the animation cleanly — text descends, pills disappear, section uncovers
- [ ] With reduced motion on: section shows immediately in its final state, no animation or scroll jacking
- [ ] No text or pill overflows horizontally at 390px viewport width
