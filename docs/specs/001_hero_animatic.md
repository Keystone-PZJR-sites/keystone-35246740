# Spec 001 — Hero Animatic

**Status:** Complete  
**Figma file:** `XRbD11WIevI5szRFiRrguZ`  
**Figma nodes:**
- [Hero Animatic — start state](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=967-2469&m=dev) (node `967:2469`)
- [Hero Animatic — end state](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=967-2386&m=dev) (node `967:2386`)
- [Full page reference](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=915-2616&m=dev) (node `915:2616`)

**Delivers:** The first section of the homepage, wired into the top of the page.

---

## What this section is

The first thing a visitor sees. A full-screen, dark section with a looping video, a large bold headline, and a fixed nav bar. As the visitor scrolls, the headline slides upward and off the top of the screen while a secondary message and call-to-action buttons fade in at the bottom. Once the animation finishes, the page scrolls normally into the next section.

Refer to the Figma nodes above for exact colors, type sizes, spacing, and asset references. The Figma shows two still snapshots — the state before any scrolling (start state) and the state when the animation is complete (end state).

---

## Scope

### In scope

- Fixed nav bar with Keystone wordmark and Login button
- Full-screen dark background with a looping video
- Large headline that animates off the top as the visitor scrolls
- Secondary message and CTA buttons that appear at the bottom as the animation completes
- Scroll animation behavior described below

### Out of scope

- Any section below this one
- Navigation links beyond the Login button
- Any backend, form submission, or API behavior

---

## Visual design

### General

The section fills the entire browser window height — whatever that is on the visitor's device. It never has a fixed or minimum height. The background is dark green `#042019`.

### Nav bar

Always visible and fixed to the top of the browser window. It does not scroll away and is not part of the animated section. See Figma for exact sizing and spacing.

- Left side: Keystone wordmark
- Right side: Login button with a right-arrow icon

### Video

A looping, muted video that fills the section. On desktop it has a 24 px gap on the left, right, and bottom edges, with rounded bottom corners. On mobile it fills the full width with no inset. The video never has scroll movement of its own — it stays fixed as the headline moves over it.

### Headline (start state)

Two lines of large bold type sit near the bottom of the section, overlaid on the video. See Figma for exact font, size, color, and spacing. The text is real, selectable text — not an image.

Line 1: "Always ON " (the trailing space is intentional)  
Line 2: "SALES & MARKETING" (indented further right than line 1)

At narrower browser widths the type scales down proportionally so it always fits without clipping or overflowing.

### Bottom message and CTA (start state)

These elements are invisible when the page loads. They only appear as the scroll animation progresses.

- Left side: Keystone mark (the geometric symbol, not the wordmark) sitting above the subheadline text. Subheadline: "A team of experts running your marketing while you run your business."
- Right side: Two CTA buttons side-by-side inside a pill — "Learn more" and "Get started" (with a right-arrow icon).

See Figma for exact sizing, colors, and typography.

---

## Scroll animation behavior

### Summary

The section "holds" the visitor in place while they scroll. During that held period, the animation plays. Once it finishes, normal scrolling resumes.

### What happens during the animation

There is one smooth, continuous motion tied directly to how much the visitor has scrolled.

- **Headline:** Slides upward continuously from its start position until both lines have completely exited above the top of the browser window. Neither line should be even partially visible once the animation is complete.
- **Bottom message and CTA:** Fade in from invisible to fully visible. They begin fading in roughly when the animation is 40% complete, so they are fully visible by the time the headline has finished exiting.

The two motions overlap — the headline is still moving while the bottom content is fading in.

### Auto-complete

Once the visitor begins scrolling into the animation, it should complete automatically. The visitor should not have to manually scroll through the entire animation to get past it. A very short pause in scrolling (approximately 100 ms) should be enough to trigger the animation jumping to its completed state smoothly.

The animation must NOT auto-complete on its own when the page first loads — only after the visitor starts scrolling.

### Reversible

If the visitor scrolls back up before the animation completes, the animation reverses — the headline comes back down and the bottom content fades out — returning to the start state.

### Accessibility

If the visitor has reduced motion turned on in their operating system, the animation should be skipped entirely. Show the end state immediately: the headline is gone, the bottom message and CTA are fully visible, and there is no scroll-holding behavior.

---

## Responsive behavior

- **Mobile:** The scroll animation and the bottom message/CTA are not shown. The headline is visible at the bottom of the section. The video fills the full screen width.
- **Tablet and desktop:** Full animation as described above.
- At any screen size, nothing should overflow or clip horizontally.

---

## Content — all text and assets come from props

| Element | Default value |
|---------|--------------|
| Headline line 1 | "Always ON " |
| Headline line 2 | "SALES & MARKETING" |
| Subheadline | "A team of experts running your marketing while you run your business." |
| CTA 1 label | "Learn more" |
| CTA 1 href | `#` |
| CTA 2 label | "Get started" |
| CTA 2 href | `#` |
| Video source | `public/videos/hero-animatic.mp4` |
| Keystone wordmark | `public/images/keystone-wordmark.svg` |
| Keystone mark | `public/images/keystone-mark.svg` |

---

## Acceptance criteria

- [ ] Section fills the full browser window height at every tested viewport size
- [ ] Nav bar is always visible and does not scroll away
- [ ] Video plays automatically, is muted, loops, and has equal inset on left and right on desktop
- [ ] "ALWAYS ON" and "SALES & MARKETING" are visible near the bottom of the section before scrolling
- [ ] Headline text scales proportionally at narrow widths — no overflow, no clipping
- [ ] Bottom message and CTA are completely invisible before scrolling starts
- [ ] Scrolling causes the headline to slide upward and the bottom content to fade in
- [ ] When the animation is complete, both headline lines have fully exited the top — nothing visible
- [ ] Bottom message and CTA are fully opaque (not translucent) in the end state
- [ ] After a short scroll, the animation auto-completes without further scrolling
- [ ] Auto-complete does not fire on page load — only after the visitor starts scrolling
- [ ] Scrolling back reverses the animation cleanly
- [ ] Subheadline and CTA buttons share the same bottom alignment in the end state
- [ ] With reduced motion on: no animation, section shows end state immediately
- [ ] No horizontal overflow at 390 px, 768 px, 1280 px, or 1440 px widths
