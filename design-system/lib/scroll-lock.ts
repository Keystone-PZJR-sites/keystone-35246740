/** Shared overlay scroll lock. Fixing the body handles iOS touch scroll;
 * keeping the root scrollbar gutter preserves fixed-chrome coordinates. */
export function lockScroll(): () => void {
  const savedY = window.scrollY;
  const root = document.documentElement;
  const body = document.body;
  const prev = {
    rootOverflowY: root.style.overflowY,
    position: body.style.position,
    top: body.style.top,
    width: body.style.width,
  };
  root.style.overflowY = "scroll";
  body.style.position = "fixed";
  body.style.top = `-${savedY}px`;
  body.style.width = "100%";

  return () => {
    root.style.overflowY = prev.rootOverflowY;
    body.style.position = prev.position;
    body.style.top = prev.top;
    body.style.width = prev.width;
    window.scrollTo(0, savedY);
  };
}
