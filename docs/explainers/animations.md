# Animation Guide

All animations use **GSAP 3.15.0**. See `docs/rules/rules.md` for the "use a library" mandate and the `prefers-reduced-motion` requirement.

---

## Setup (Required for Every Animated Component)

Every animated component must be a client component (`'use client'`). Import GSAP and any plugins at the top of the file and register plugins at module level, not inside the component. Use `useLayoutEffect` with a `gsap.context()` scoped to a container ref — this keeps all selectors local to the component and prevents cross-component collisions. Always return `ctx.revert()` from the cleanup function to kill all tweens and ScrollTriggers on unmount. Wrap all animation code in `gsap.matchMedia()` targeting `(prefers-reduced-motion: no-preference)`.

---

## Shared Conventions

**Entrance animations:** Elements fade up from ~40px below with `power3.out` easing over ~0.8s. Chip pop-ins use a scale from 0.8 with `back.out` easing over ~0.5s. Hero text uses a slower opacity-only reveal over ~1.2s.

**ScrollTrigger defaults:** Trigger when the element's top edge hits 80% from the top of the viewport. Most entrances are one-shot (not scrubbed).

**Stagger timing:** Text lines stagger at 0.1s per line. Chip elements use a random stagger spread across 0.6s total. Cards stagger left-to-right across 0.4s.

---

## GSAP Plugin Reference

### Free plugins (bundled with the `gsap` npm package)

| Plugin | Use case |
|--------|---------|
| `ScrollTrigger` | All scroll-linked animations |
| `Observer` | Potential touch gesture handling |
| `Flip` | Layout transitions (Phase 2) |
| `MotionPathPlugin` | Possible logo or chip path animations |

### Club plugins (require GSAP license — credentials from team)

| Plugin | Use case |
|--------|---------|
| `SplitText` | Split FK Screamer headlines into individual characters for per-char animation |
| `ScrollSmoother` | Smooth virtual scroll for the whole site |
| `ScrambleText` | Scramble text reveal on the hero |
| `DrawSVG` | Animate the Keystone logo mark or any SVG line art |

Club plugins are installed via the GSAP private npm registry. Do not import a Club plugin in production if it is not installed — guard with a dynamic import if needed.

---

## SplitText

When available, use `SplitText` on FK Screamer headlines to split into individual characters and animate each char with a rotationX reveal from below. When not available, fall back to animating the whole line element.

---

## Performance Notes

- Never create a ScrollTrigger inside a `useEffect` that runs on every render.
- Always clean up with `ctx.revert()` on unmount.
- Avoid setting `element.style` directly — use GSAP's built-in CSS property support.
- Add `will-change: transform` to elements with heavy scroll-scrub effects.
- Test on a mid-range mobile device. If it drops below 60fps, simplify.
