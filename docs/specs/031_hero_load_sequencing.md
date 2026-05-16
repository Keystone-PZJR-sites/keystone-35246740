# Spec 031 — Hero Load Sequencing

**Status:** Draft
**Updates:** Spec 001 (Hero Animatic), Spec 030 (Legibility Refresh)
**References:** `docs/explainers/page-loading-contract.md`, `docs/explainers/homepage-ttfb-recommendations.md`

---

## Problem

The homepage hero currently feels like it "pops in" rather than arriving with intention. HAR comparison against a reference site (VCASS) showed that despite having a smaller total page weight (6.6 MB vs 12.4 MB) and smaller video (1.86 MB vs 9.8 MB), our perceived load is slower. The root causes:

1. **HTML TTFB is ~600 ms** (CDN miss, worker compute) vs ~260 ms (CDN hit) on the reference. Nothing renders until the HTML arrives.
2. **CSS is render-blocking for 548 ms after HTML** — the main 206 KB stylesheet must fully download before any styled content paints. First meaningful paint doesn't happen until ~1162 ms.
3. **Hero reveal is gated on video playback.** The intro timeline waits for the first video's `play`/`playing` event, with a 700 ms `setTimeout` fallback. This adds up to 700 ms of dead time after hydration where the hero is a blank dark rectangle — even though the headline, subheadline, and CTAs could render immediately.
4. **There is no staged choreography.** Headline, subheadline, CTAs, and video all appear at essentially the same moment once the intro fires — there is no designed sequence that conveys intentionality.

The reference site solves this differently: hero text is SSR'd with inline hidden styles, the nav/logo are SSR'd visible, and JS reveals elements in a staged sequence. The dark background + visible nav create a "branded shell" at first paint, and the headline animates in with choreographed timing after hydration.

---

## Goals

- The homepage should feel intentionally staged from the first painted frame, not like content is loading.
- Nav/wordmark should be visible at first paint, before JS hydrates (already the case — no change needed).
- Hero headline, subheadline, and CTAs should animate in with a choreographed sequence immediately on hydration — not gated on video readiness, not all at once.
- The video/poster should fade in independently as part of the sequence.
- No new network requests. No changes to video loading strategy. No changes to below-fold behavior.

---

## What does not change

- Video asset set, clip order, carousel logic, autoplay/loop/muted behavior.
- Video preload strategy (`hero-01` preloaded, others `preload="none"`).
- Poster image strategy (responsive `<picture>`, `fetchPriority="high"`).
- `useVideoCarousel` hook behavior.
- Desktop headline scroll-off (`ScrollTrigger` exit animation).
- Lead capture modal wiring.
- Below-fold section loading contracts.
- Font preload set.
- Inline `<style>html,body{background-color:#042019}</style>` in layout.
- HeroNav — already SSR'd and visible at first paint. No entrance animation.

---

## Breakpoints

| Label | Range |
|---|---|
| Mobile | `< 768px` |
| Desktop/tablet | `≥ 768px` |

Both variants get the same sequencing contract adapted to their layout.

---

## Load contract: what the user sees, when

### Phase 0 — Dark shell (first paint, ~600 ms from navigation)

**Trigger:** Browser paints after HTML arrives and CSS parses.

Visible:
- Dark green background (`#042019`) — guaranteed by inline `<style>` in layout.
- HeroNav bar with Keystone wordmark and "Get started" CTA — rendered by SSR.
- Hero poster image — may or may not be visible depending on network timing. If not loaded yet, the dark green section background is the fallback.

Not visible (hidden by `gsap.set()` in `useLayoutEffect` before the browser paints the hydrated frame):
- Hero headline.
- Hero subheadline and CTA row.
- Video frame container.

### Phase 1 — Headline entrance (hydration + 0 ms)

**Trigger:** `useLayoutEffect` fires. GSAP sets initial hidden state and immediately starts the intro timeline.

What animates in:
- Headline div (contains both lines + K mark on desktop, contains mark + both lines on mobile).

Animation:
- `opacity: 0 → 1`, `y: 12 → 0`
- Duration: 500 ms
- Ease: `power2.out`

### Phase 2 — Video/poster reveal (hydration + 200 ms)

**Trigger:** Timeline position `0.2` (200 ms after Phase 1 starts).

What animates in:
- The video frame container (poster `<picture>` + all `<video>` elements).

Animation:
- `opacity: 0 → 1`
- Duration: 600 ms
- Ease: `power2.out`
- No translate — just a fade.

Whatever is currently in the container (poster still, or first video frame if autoplay has already buffered enough) is what fades in.

### Phase 3 — Bottom row entrance (hydration + 300 ms)

**Trigger:** Timeline position `0.3` (300 ms after Phase 1 starts).

What animates in:
- Bottom content div (subheadline + CTA pair on desktop; subheadline + CTA pair on mobile).

Animation:
- `opacity: 0 → 1`, `y: 12 → 0`
- Duration: 400 ms
- Ease: `power2.out`

### Scroll-off (unchanged)

The existing `ScrollTrigger`-driven headline exit animation is unchanged. It plays once the user scrolls past the hero top. Desktop only.

---

## Timing summary

| Phase | Content | Delay from hydration | Duration | Ease |
|---|---|---|---|---|
| 0 | Dark shell + nav | First paint (no JS) | — | — |
| 1 | Headline | 0 ms | 500 ms | `power2.out` |
| 2 | Video frame | 200 ms | 600 ms | `power2.out` |
| 3 | Bottom row (sub + CTAs) | 300 ms | 400 ms | `power2.out` |

Total sequence: ~800 ms from hydration to fully revealed. The headline is readable by ~300 ms. The staged nature makes it feel faster than the previous approach where 700 ms of dead time preceded a simultaneous reveal.

---

## Implementation

### How initial state is set

`gsap.set()` in `useLayoutEffect` sets the hidden state (`opacity: 0`, `y: 12` on text elements, `opacity: 0` on the video frame) synchronously before the browser paints the hydrated frame. This is the same pattern used previously — `useLayoutEffect` runs before paint, so there is no visible flash. No CSS classes needed.

### HeroAnimatic (desktop, ≥ 768 px)

1. Removed `play`/`playing` event listener gating.
2. Removed 700 ms `setTimeout` fallback.
3. Added `videoFrameRef` on the video container div.
4. `gsap.set()` hides headline, bottom content, and video frame.
5. Three-phase `gsap.timeline()` plays immediately — no waiting.
6. Scroll-off exit animation unchanged.

### MobileHero (< 768 px)

1. Added GSAP as a dependency (previously had no entrance animation).
2. Added `sectionRef`, `videoZoneRef`, `headlineRef`, `bottomRef`.
3. Wrapped mark + headline in a `headlineRef` div; wrapped subheadline + CTAs in a `bottomRef` div.
4. `useLayoutEffect` with `gsap.matchMedia()` runs the same three-phase sequence (with slightly adjusted offsets for the mobile layout: video at 0 ms, headline at 150 ms, bottom at 350 ms).

### HeroNav

No changes. Already SSR'd and visible at first paint.

### Reduced motion

Both components use `gsap.matchMedia()` with a `prefers-reduced-motion: reduce` branch that immediately sets all elements to their end state (`opacity: 1`, `y: 0`, `clearProps: 'transform'`). No animation plays.

---

## What this does NOT solve

This spec addresses the *perceptual* load sequence — what the user sees and when. It does not address:

- **HTML TTFB** — the 600 ms server wait is the single largest bottleneck and is an infrastructure/caching concern (see `docs/explainers/homepage-ttfb-recommendations.md` Recommendation 2).
- **CSS render-blocking time** — the 206 KB stylesheet blocks first paint for ~548 ms after HTML. Critical CSS inlining or CSS splitting would help but is out of scope.
- **RSC payload size** — the 253 KB HTML (vs 113 KB on the reference) includes ~55 KB of inline RSC flight data. Reducing this requires Suspense boundary restructuring.
- **Late font loading** — `FKRomanStandard-Regular` doesn't arrive until ~1360 ms. It is already preloaded; the delay is downstream of the TTFB problem.

Those are separate workstreams. This spec ensures that once the browser does paint, the result is choreographed rather than abrupt.

---

## Validation

After implementation, a cold-load filmstrip should show:

1. **First paint frame:** Dark green background + HeroNav with wordmark. Hero content area is dark green (headline, video, and bottom row hidden).
2. **~0–200 ms after hydration:** Headline fading/sliding in.
3. **~200–400 ms after hydration:** Video frame fading in, bottom row starting to appear.
4. **~800 ms after hydration:** Hero fully revealed.

The key difference from the previous behavior: no 700 ms dead time waiting for video playback before anything appears.
