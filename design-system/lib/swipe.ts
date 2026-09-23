/** One horizontal swipe engine for every strip carousel.
 *
 * The gesture tracks live through a custom property on the track, clamps
 * to the strip's travel, and snaps on release to the nearest slot. Pointer
 * capture starts only after the movement clears the slop so buttons and
 * links inside the strip keep their ordinary clicks; a real swipe swallows
 * the click the browser emits after it. Native image dragging is blocked
 * so a press on a photo still resolves as a swipe. */

/* Horizontal movement required before a gesture becomes a swipe. */
const SWIPE_SLOP = 6;

export interface SwipeOptions {
  /** Receives the pointer stream and the capture-phase click. */
  viewport: HTMLElement;
  /** Carries the live offset property and `data-dragging`. */
  track: HTMLElement;
  /** Custom property that receives the live offset (a px length). */
  offsetVar: string;
  /** Runs before the pitch is measured at gesture start. */
  onStart?: () => void;
  /** Slot pitch in px at gesture start; a non-positive pitch ignores the gesture. */
  pitch: () => number;
  /** Clamps the live offset to the strip's travel; default ±one pitch. */
  clamp?: (dx: number, pitch: number) => number;
  /** Runs on every move with the clamped offset. */
  onMove?: (dx: number, pitch: number) => void;
  /** Runs on release with the whole slots travelled (positive moves toward the start). */
  onRelease: (steps: number) => void;
  /** Handles a click that is not a swipe echo (capture phase). */
  onClick?: (e: MouseEvent) => void;
  /** Gate checked at gesture start. */
  enabled?: () => boolean;
}

export function attachSwipe(o: SwipeOptions): () => void {
  const { viewport, track, offsetVar } = o;
  const clamp = o.clamp ?? ((dx, pitch) => Math.max(-pitch, Math.min(pitch, dx)));
  let dragging = false;
  let suppressClick = false;
  let startX = 0;
  let dx = 0;
  let pitch = 1;

  const onDown = (e: PointerEvent) => {
    if (!e.isPrimary || (o.enabled && !o.enabled())) return;
    o.onStart?.();
    pitch = o.pitch();
    if (!(pitch > 0)) return;
    dragging = true;
    suppressClick = false;
    startX = e.clientX;
    dx = 0;
    track.dataset.dragging = "";
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    dx = clamp(e.clientX - startX, pitch);
    track.style.setProperty(offsetVar, `${dx}px`);
    o.onMove?.(dx, pitch);
    if (!suppressClick && Math.abs(e.clientX - startX) > SWIPE_SLOP) {
      suppressClick = true;
      try {
        viewport.setPointerCapture(e.pointerId);
      } catch {
        /* Uncaptured pointers still deliver move/up through the viewport. */
      }
    }
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    delete track.dataset.dragging;
    o.onRelease(Math.round(dx / pitch));
    track.style.removeProperty(offsetVar);
  };
  const onClickCapture = (e: MouseEvent) => {
    if (suppressClick) {
      e.stopPropagation();
      e.preventDefault();
      suppressClick = false;
      return;
    }
    o.onClick?.(e);
  };
  const onDragStart = (e: DragEvent) => e.preventDefault();

  viewport.addEventListener("pointerdown", onDown);
  viewport.addEventListener("pointermove", onMove);
  viewport.addEventListener("pointerup", onUp);
  viewport.addEventListener("pointercancel", onUp);
  viewport.addEventListener("click", onClickCapture, true);
  viewport.addEventListener("dragstart", onDragStart);
  return () => {
    viewport.removeEventListener("pointerdown", onDown);
    viewport.removeEventListener("pointermove", onMove);
    viewport.removeEventListener("pointerup", onUp);
    viewport.removeEventListener("pointercancel", onUp);
    viewport.removeEventListener("click", onClickCapture, true);
    viewport.removeEventListener("dragstart", onDragStart);
    delete track.dataset.dragging;
    track.style.removeProperty(offsetVar);
  };
}

/** Left/right arrow keys step a strip. */
export function attachArrowKeys(
  el: HTMLElement,
  step: (delta: 1 | -1) => void,
  enabled = () => true,
) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (!enabled()) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };
  el.addEventListener("keydown", onKeyDown);
  return () => el.removeEventListener("keydown", onKeyDown);
}
