# Future Work — Deferred Backlog

Items deferred in favor of getting baseline functionality and publish-ready content to market. Pick these up once the site is live and initial marketing testing is underway.

**Note:** This document was written before the transition/animation simplification pass. Items in section 3 that describe tuning or adjusting existing behavior may need to be reframed as rebuild tasks depending on what was removed. Revisit and update this file after the simplification is complete.

---

## 1. Global and Section Transition Map

Every section-to-section handoff needs to be fully designed and specified before implementing. Right now each spec describes what happens inside a section but not what happens at the seam between sections. This work involves:

- **Hero → Work Showcase:** The hero's dark green gives way to the warm cream section. Decide: hard cut, a color overlap as the user scrolls, or some kind of reveal?
- **Work Showcase → Every Channel:** The video rises from below and slides over the Work Showcase. The exact scroll distance that triggers the snap-to-fullscreen, and the easing of that rise, need to be tuned to feel snappy without feeling jarring.
- **Every Channel → Product Screens:** Spec 007 describes the pill convergence and card rise — but the exact timing relationship between "Every Channel animation completes" and "Product Screens entrance begins" is not specified. Specify the overlap, the delay, and whether the user can interrupt it.
- **Product Screens → Social Proof:** No entrance animation defined yet. Does the section slide in, fade in, or just appear?
- **Social Proof → Pricing:** No entrance animation defined yet.
- **Pricing → Oversized Footer:** No entrance animation defined yet.

For each handoff define: what triggers it (scroll position, scroll velocity, time), what moves, the direction and distance, the easing curve, the duration, whether it reverses on scroll-back, and what happens when the user scrolls very fast or very slowly through it.

---

## 2. Section Animator Abstraction

As the section-to-section transitions get defined (item 1 above), evaluate whether the logic that drives them should be extracted into a shared abstraction. Some questions to resolve:

- Are the transitions varied enough that a general abstraction is impractical, or is there a shared shape (scroll trigger → tween → release) that could be codified?
- Should each section own its entrance animation, or should a separate coordinator component or utility know the full sequence and orchestrate the handoffs?
- Would a lightweight state machine (idle → entering → resident → exiting → done) clarify the logic and prevent the race conditions and double-trigger bugs we've seen?
- If we use GSAP ScrollSmoother globally, does that change what a section animator needs to do?
- Could this be implemented as a React context that sections subscribe to, rather than coupling section components to each other?

Evaluate before building — the right answer may be "just put it in each section" or it may be a dedicated `SectionOrchestrator` component. Don't build the abstraction until the transition map (item 1) is complete and the pattern is clear.

---

## 3. Additional Interactivity Polish

Specific interaction details that were identified during development but deferred for launch:

### Hero
- **Auto-complete tuning:** The 100ms idle threshold for triggering scroll completion was chosen by feel. It needs testing across trackpad, mouse wheel, and touch to make sure it feels right everywhere and doesn't fire too eagerly on slow trackpad scrolls.
- **Mobile hero state:** Currently the mobile view skips the animation and shows the end state. Evaluate whether a simpler entrance (no scroll-jack, just a fade-in of the bottom CTA on scroll) feels better than a static render.

### Work Showcase
- **Carousel scroll physics:** The 600ms ease-in-out for category navigation was specified but not tuned against real content. The timing may feel too slow or too fast once all five industry sets have real assets loaded.
- **Touch momentum and snap alignment:** On mobile the carousel is touch-swipeable via Embla, but the category bar is hidden. Decide: does the active category still update on mobile as the user swipes, and does anything indicate which category they're looking at?
- **Card lift spring curve:** `cubic-bezier(0.16, 1, 0.3, 1)` over 350ms was designed for the Health & Body cards. Once cards from all five industries are visible, verify the spring feels consistent across the wider web card vs. the taller sales card.

### Every Channel
- **Pill scatter positions:** The seven pill positions are fixed canvas coordinates from Figma. On viewports narrower than 1440px they may clip or overlap with the text block. Needs a responsive layout pass.
- **Scroll-jack snap behavior:** The instant snap from "video partially risen" to "video fully covering viewport" needs to feel deliberate, not broken. The exact scroll distance threshold and the snap animation duration need user testing.
- **Pill entry stagger:** Each pill's beat timing was specified proportionally but not tested against the actual animation duration. Adjust once the full sequence is running.

### Product Screens
- **Pill latch animation:** The moment the pill row "latches" onto the rising card and travels with it is the most complex handoff in the entire spec (007). The exact scroll position trigger and the visual seam between "pills floating free" and "pills attached to card" need careful attention.
- **Tool-switch slide direction:** When clicking a pill to switch tools, the content slides in the direction of the selected pill. The edge case where the user clicks the currently active pill, or rapidly clicks two pills in sequence, needs a defined behavior (ignore? queue? cancel and snap?).
- **Slide transition easing:** The horizontal slide for tool switching is not yet specified in detail — just "horizontal slide." Pick a curve, specify a duration, and verify it doesn't feel laggy on mid-range devices.

### Oversized Footer
- **Upper zone video clips:** The five videos in the collage currently have no entrance animation. Consider whether they benefit from a staggered fade-in or scroll-triggered reveal, or whether they should just play immediately.
- **Lower zone entrance:** The mark, taglines, CTAs, email bar, and wordmark have no entrance animation specified. Decide whether they scroll in or just appear.
- **Wordmark scaling edge cases:** The "keystone" wordmark scales continuously with viewport width. Test at very wide (2560px) and very narrow (320px) widths to verify it doesn't break layout.

### Global
- **ScrollSmoother evaluation:** The animations guide lists ScrollSmoother as a Club GSAP plugin. Evaluate whether enabling it globally improves the scroll-jack sections or introduces conflicts with Embla Carousel.
- **SplitText headlines:** FK Screamer headlines (Hero, Every Channel, Footer upper zone) were designed for per-character animation with SplitText. That animation pass was skipped for launch. Add it once the Club license is confirmed and stable.
- **Reduced motion audit:** Each section has a `prefers-reduced-motion` note in its spec, but the actual behavior has not been verified end-to-end with the OS setting enabled. Do a full reduced-motion walkthrough once all sections are live.
- **Page-level scroll position persistence:** On reload or back-navigation, the browser may restore a scroll position mid-animation on a pinned section, producing a broken state. Define a consistent reset strategy (always scroll to top on load, or restore with animation skipped).
