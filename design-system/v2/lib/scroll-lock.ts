/**
 * The site's single scroll-lock implementation. Every overlay that must
 * freeze the page (the mobile nav panel, future modals) calls
 * `lockScroll()` and stores the returned unlock callback as its effect
 * cleanup. New edge cases update this module — never a parallel helper.
 *
 * Technique: capture `window.scrollY`, set `position: fixed; top: -Npx`
 * on the body so the visual viewport stays put, and reverse on unlock
 * with `window.scrollTo`. Setting `overflow: hidden` alone is not
 * enough — on iOS Safari it does not freeze touch scroll and it loses
 * the scroll position when the overlay closes. `overflow-y: scroll`
 * keeps the scrollbar gutter, so the body's content width — the width
 * the grid engine's container queries read — does not change while
 * locked.
 */
export function lockScroll(): () => void {
  const savedY = window.scrollY;
  const body = document.body;
  const prev = {
    position: body.style.position,
    top: body.style.top,
    width: body.style.width,
    overflowY: body.style.overflowY,
  };
  body.style.position = "fixed";
  body.style.top = `-${savedY}px`;
  body.style.width = "100%";
  body.style.overflowY = "scroll";

  return () => {
    body.style.position = prev.position;
    body.style.top = prev.top;
    body.style.width = prev.width;
    body.style.overflowY = prev.overflowY;
    window.scrollTo(0, savedY);
  };
}
