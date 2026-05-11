import { ScrollSmoother } from 'gsap/ScrollSmoother';

/**
 * Single approved scroll-lock implementation for the site.
 *
 * ScrollSmoother lives on the homepage but not on inner pages, so this helper
 * branches once and exposes the same `unlock()` callback either way.
 *
 * - With ScrollSmoother: capture scrollTop, call `paused(true)`. Restore both
 *   on unlock. The body's overflow is left alone — ScrollSmoother already
 *   prevents wheel events from advancing the page while paused.
 *
 * - Without ScrollSmoother (inner pages): capture window.scrollY, set
 *   `position: fixed; top: -Npx` on the body so the visual viewport stays
 *   put, and reverse on unlock with `window.scrollTo(0, savedY)`. This is
 *   the iOS-Safari-safe fallback; setting `overflow: hidden` alone does
 *   not actually freeze touch scroll on iOS and loses the scroll position
 *   when the modal closes.
 */
export function lockScroll(): () => void {
  const smoother = ScrollSmoother.get();
  if (smoother) {
    const savedScrollTop = smoother.scrollTop();
    smoother.paused(true);
    return () => {
      smoother.paused(false);
      smoother.scrollTo(savedScrollTop, false);
    };
  }

  const savedY = window.scrollY;
  const body = document.body;
  const prev = {
    position: body.style.position,
    top:      body.style.top,
    width:    body.style.width,
    overflowY: body.style.overflowY,
  };
  body.style.position = 'fixed';
  body.style.top = `-${savedY}px`;
  body.style.width = '100%';
  body.style.overflowY = 'scroll';

  return () => {
    body.style.position  = prev.position;
    body.style.top       = prev.top;
    body.style.width     = prev.width;
    body.style.overflowY = prev.overflowY;
    window.scrollTo(0, savedY);
  };
}
