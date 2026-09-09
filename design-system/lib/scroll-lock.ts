/** Shared overlay scroll lock. Fixing the body handles iOS touch scroll;
 * forcing the scrollbar gutter keeps grid container width stable. */
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
