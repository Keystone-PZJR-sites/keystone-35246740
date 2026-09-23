/** The one rule for ambient motion: it runs only while the element is on
 * screen, the tab is visible, the pointer and focus are elsewhere, and the
 * reader has not asked for reduced motion. Every autoplaying carousel
 * attaches this gate and asks `canRun()` before it advances. */

const VISIBILITY_THRESHOLD = 0.1;

export interface AutoplayGateHandlers {
  /** The gate opened (or a condition that closed it cleared). */
  onResume: () => void;
  /** The gate closed. */
  onPause: () => void;
  /** The reduced-motion preference changed; runs before resume/pause. */
  onMotionChange?: (reduced: boolean) => void;
  /** The element resized (a band or tier may have changed). */
  onResize?: () => void;
}

export interface AutoplayGate {
  canRun: () => boolean;
  detach: () => void;
}

export function attachAutoplayGate(root: HTMLElement, h: AutoplayGateHandlers): AutoplayGate {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = false;
  let hovered = false;
  let focused = false;
  let detached = false;

  const canRun = () =>
    !detached && visible && !hovered && !focused && !document.hidden && !motion.matches;
  const settle = () => (canRun() ? h.onResume() : h.onPause());

  const onVisibility = settle;
  const onPointerEnter = () => {
    hovered = true;
    h.onPause();
  };
  const onPointerLeave = () => {
    hovered = false;
    settle();
  };
  const onFocusIn = () => {
    focused = true;
    h.onPause();
  };
  const onFocusOut = (event: FocusEvent) => {
    focused = event.relatedTarget instanceof Node && root.contains(event.relatedTarget);
    if (!focused) settle();
  };
  const onMotionChange = () => {
    h.onMotionChange?.(motion.matches);
    settle();
  };
  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      settle();
    },
    { threshold: VISIBILITY_THRESHOLD },
  );
  const ro = h.onResize ? new ResizeObserver(h.onResize) : null;

  io.observe(root);
  ro?.observe(root);
  document.addEventListener("visibilitychange", onVisibility);
  root.addEventListener("pointerenter", onPointerEnter);
  root.addEventListener("pointerleave", onPointerLeave);
  root.addEventListener("focusin", onFocusIn);
  root.addEventListener("focusout", onFocusOut);
  motion.addEventListener("change", onMotionChange);

  return {
    canRun,
    detach: () => {
      detached = true;
      io.disconnect();
      ro?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      root.removeEventListener("pointerenter", onPointerEnter);
      root.removeEventListener("pointerleave", onPointerLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      motion.removeEventListener("change", onMotionChange);
    },
  };
}
