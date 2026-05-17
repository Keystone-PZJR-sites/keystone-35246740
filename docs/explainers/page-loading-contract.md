# Page Loading Contract

The homepage is heavy by design, so media is opt-in by priority, proximity, or
interaction. Server-rendered text, headings, CTAs, and navigation should be
visible immediately for users and crawlers; large visual media should not join
the initial network wave unless it is needed for the hero.

## Initial Network Window

Allowed during initial load:

- HTML document and critical CSS (inline `html,body{background-color:#042019}`).
- Critical above-the-fold FK font preloads (Screamer Bold, GroteskNeue Regular +
  Italic, RomanStandard Regular).
- Hero poster image (responsive `<picture>`, `fetchPriority="high"`).
- Hero video preload — media-gated so each viewport fetches only its own clip:
  - `hero-01-desktop.webm` at `(min-width: 768px)`
  - `hero-01-mobile.webm` at `(max-width: 767px)`
- Core JavaScript required for hydration and above-the-fold interaction.

Not allowed during initial load:

- Google font declarations for decorative mock cards.
- Non-first hero clips (`hero-02` through `hero-06`).
- WorkShowcase card images.
- EveryChannel videos.
- SocialProof thumbnail images or modal videos.
- Footer videos.
- Media from a CSS-hidden desktop/mobile counterpart.

## Hero

The first hero clip is the only video with document-level `<link rel="preload">`
priority (`fetchpriority="high"`). Desktop and mobile each have their own
preload tag gated by a `media` attribute so only one fires per viewport.

In JSX, clip 0 renders with `preload="auto"` and `autoPlay` so it can start
immediately. Clips 1–N render `preload="none"`. The `useVideoCarousel` hook owns
sequencing from that point: it unlocks exactly one clip ahead (N+1 strategy) so
at most two clips consume bandwidth simultaneously.

Desktop and mobile hero variants are media-query gated in JavaScript via
`useVideoCarousel(..., { enabled: isDesktop | isMobile })`. A CSS-hidden hero
must not unlock its carousel after hydration. The `enabled` flag prevents the
hook from flipping `preload` or calling `play()` for the inactive breakpoint.

## WorkShowcase

WorkShowcase card visuals are rasterized WebP state images. Live HTML remains
for the section headline, industry labels, sublabels, buttons, and carousel
semantics.

Card images should not be requested before the section approaches the viewport.
Before that point, render same-size placeholders so Embla measurements are
stable. Once near, load the active industry and the next likely industry; further
industries load on tab selection or idle prefetch.

Do not reintroduce global `next/font/google` imports for WorkShowcase-only
decorative type. Rasterized card text is not SEO content.

## Below-Fold Videos

All below-fold sections share the `useNearViewport` hook, which wraps
`IntersectionObserver` with a configurable `rootMargin`. A 1 500 ms startup
delay prevents GSAP ScrollSmoother's mount-time transforms from causing false
intersections that would fire all sections' observers simultaneously and compete
with the hero.

**EveryChannel** — videos render `preload="none"`. `useNearViewport` with a
600 px margin gates `useVideoCarousel({ enabled: isNear })`. Playback and N+1
preload begin only after the section crosses the proximity threshold.

**SocialProof** — thumbnails are static WebP images (`loading="lazy"`), not
videos. Modal/testimonial videos render `preload="none"` and remain inert until
the user opens the modal. On open, the active slide upgrades to `preload="auto"`
+ `load()` + `play()`; adjacent slides (±1, wrapping) get `preload="metadata"`;
distant slides stay `"none"`. On close, all videos reset to `preload="none"`.

**Footer** — videos render `preload="none"`. `useNearViewport` with a 1 200 px
(desktop) / 500 px (mobile) margin flips a `ready` flag; an effect then sets
`preload="auto"` and calls `play()`. Footer media should never compete with the
hero.

## Validation Checklist

Use a HAR after major loading changes. A healthy trace should show:

- No Google font burst from WorkShowcase.
- `hero-01-desktop.webm` / `hero-01-mobile.webm` starts in the first wave.
- `hero-02` through `hero-06` clips do not all start together.
- WorkShowcase card images wait until section proximity.
- EveryChannel and Footer videos wait for proximity (1 500 ms + rootMargin).
- SocialProof modal videos show zero requests until the modal opens.
- Hidden mobile/desktop variants do not emit eager media requests.
