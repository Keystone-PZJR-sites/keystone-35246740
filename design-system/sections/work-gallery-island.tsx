"use client";

/** Controls the narrow gallery strip through swipe, click, and arrow
 * keys. Pointer capture starts only after movement clears the slop so
 * slide buttons retain normal clicks. Native image dragging is blocked
 * to keep the pointer stream intact.
 *
 * The island disables itself at the mosaic gate. In strip mode it
 * publishes the active index for the gallery overlay's open action. */

import { useLayoutEffect, useRef, type ReactNode } from "react";

/* The strip renders below the rt gate. */
const RT_GATE = 665;
/* Horizontal movement required before a gesture becomes a swipe. */
const SWIPE_SLOP = 6;

export function WorkGalleryIsland({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const view = root.querySelector<HTMLElement>(".wg-view");
    const list = root.querySelector<HTMLElement>(".wg-list");
    const slides = [...root.querySelectorAll<HTMLElement>(".wg-slide")];
    const shows = slides.map((s) => s.querySelector<HTMLButtonElement>(".wg-show"));
    if (!view || !list || slides.length === 0) return;
    const COUNT = slides.length;

    /* Preserve rendered state across remounts. */
    let k = Math.max(1, slides.findIndex((s) => s.dataset.active !== undefined) + 1);

    /* Publish the strip index only while the strip is active. */
    const sec = root.closest<HTMLElement>(".sec");

    /* The island width determines whether strip mode is active. */
    let strip = false;
    const measure = () => {
      strip = root.clientWidth < RT_GATE;
      if (strip) {
        view.tabIndex = 0;
        if (sec) sec.dataset.k = String(k);
      } else {
        view.removeAttribute("tabindex");
        if (sec) delete sec.dataset.k;
      }
    };
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    measure();

    const commit = (next: number) => {
      const clamped = Math.max(1, Math.min(COUNT, next));
      if (clamped === k) return;
      k = clamped;
      if (strip && sec) sec.dataset.k = String(k);
      list.style.setProperty("--wg-k", String(k));
      slides.forEach((s, i) => {
        if (i === k - 1) {
          s.dataset.active = "";
        } else {
          delete s.dataset.active;
        }
      });
    };

    /* Swipe tracks live and snaps to the nearest slot on release. */

    let dragging = false;
    let suppressClick = false;
    let startX = 0;
    let dx = 0;
    let pitch = 1;

    const onDown = (e: PointerEvent) => {
      if (!strip || !e.isPrimary || slides.length < 2) return;
      /* Rects account for the live translate. */
      pitch = slides[1].getBoundingClientRect().left - slides[0].getBoundingClientRect().left;
      if (pitch <= 0) return;
      dragging = true;
      suppressClick = false;
      startX = e.clientX;
      dx = 0;
      list.dataset.dragging = "";
      /* Delay capture so overlay buttons still receive ordinary clicks. */
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      /* Clamp the live offset to the track's travel. */
      dx = Math.max((k - COUNT) * pitch, Math.min((k - 1) * pitch, e.clientX - startX));
      list.style.setProperty("--wg-drag-dx", `${dx}px`);
      if (!suppressClick && Math.abs(e.clientX - startX) > SWIPE_SLOP) {
        suppressClick = true;
        try {
          view.setPointerCapture(e.pointerId);
        } catch {
          /* uncapturable pointer — move/up still arrive through the viewport */
        }
      }
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      delete list.dataset.dragging;
      commit(Math.round(k - dx / pitch));
      list.style.removeProperty("--wg-drag-dx");
    };
    /* Swallow the click emitted after a completed swipe. */
    const onClickCapture = (e: MouseEvent) => {
      if (!suppressClick) return;
      e.stopPropagation();
      e.preventDefault();
      suppressClick = false;
    };
    /* Native image dragging would cancel the pointer stream. */
    const onDragStart = (e: DragEvent) => e.preventDefault();

    const showHandlers = shows.map((_, i) => () => {
      if (strip) commit(i + 1);
    });
    const onKeyDown = (e: KeyboardEvent) => {
      if (!strip) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        commit(k - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        commit(k + 1);
      }
    };

    /* ---- wiring ---- */

    shows.forEach((b, i) => b?.addEventListener("click", showHandlers[i]));
    view.addEventListener("pointerdown", onDown);
    view.addEventListener("pointermove", onMove);
    view.addEventListener("pointerup", onUp);
    view.addEventListener("pointercancel", onUp);
    view.addEventListener("click", onClickCapture, true);
    view.addEventListener("dragstart", onDragStart);
    view.addEventListener("keydown", onKeyDown);

    return () => {
      ro.disconnect();
      shows.forEach((b, i) => b?.removeEventListener("click", showHandlers[i]));
      view.removeEventListener("pointerdown", onDown);
      view.removeEventListener("pointermove", onMove);
      view.removeEventListener("pointerup", onUp);
      view.removeEventListener("pointercancel", onUp);
      view.removeEventListener("click", onClickCapture, true);
      view.removeEventListener("dragstart", onDragStart);
      view.removeEventListener("keydown", onKeyDown);
      view.removeAttribute("tabindex");
      if (sec) delete sec.dataset.k;
      delete list.dataset.dragging;
      list.style.removeProperty("--wg-drag-dx");
    };
  }, []);

  return (
    <div className="wg-island" ref={ref}>
      {children}
    </div>
  );
}
