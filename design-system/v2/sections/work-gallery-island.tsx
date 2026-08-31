"use client";

/** v2 sections — the work-gallery strip island (spec 015 §5.1/§6.1).
 *
 * The 012 three-state-machine shape reduced to one axis: k ∈ 1…9, the
 * active slide. All writers write k; the track translates to put
 * slide k at the band's designed inset on the promoted snap clock
 * (CSS carries the transition; the island only writes state). The
 * ghost dressing swaps state-to-state in CSS off data-active.
 *
 * Inputs, all writing the same k (§5.1): swiping the strip viewport
 * (the track follows the pointer 1:1 through --wg-drag-dx with
 * data-dragging killing the transition; release snaps to the nearest
 * slot, the live offset clamped to the track's travel); clicking a
 * visible off-active slide's overlay button; Left/Right arrows on the
 * focused viewport group. Ends clamp (k=1 no west neighbor, k=9 no
 * east peek).
 *
 * The 012 pointer lessons apply verbatim: the pointer is captured
 * lazily (at move-past-slop, never at pointerdown — capturing at
 * pointerdown retargets the derived click and the overlay buttons
 * never fire), a real swipe swallows the derived click once, and
 * dragstart is suppressed (a swipe starting on an image otherwise
 * becomes a native image drag that cancels the pointer stream).
 *
 * The island is inert above the rs gate (§8.1): it measures the
 * container (ResizeObserver — never matchMedia, the 008 precedent)
 * and below the rt gate makes the viewport the §5.1 focusable group
 * (tabIndex 0; role and name are server markup). Above the gate the
 * gestures return early, the viewport is not focusable, and k is
 * inert — the mosaic rendering never reads it (choreographies
 * settle: there is no entrance to replay). k is re-derived from the
 * DOM on mount so an HMR remount never resets a live section.
 *
 * In strip mode the island also publishes k as data-k on the section
 * root (spec 016 §4.1 — the owner's k handoff, 2026-08-29): the 016
 * viewer's open handler reads it at the click so the rm/rs CTA opens
 * on the strip's active slide. One-way, at open time only — the DOM
 * is the one shared source and the two islands stay otherwise
 * independent (paging the viewer never moves the strip). Above the
 * gate the attribute is absent and the CTA opens on site 1.
 * Reduced motion needs nothing here: the writes are state-to-state
 * and the CSS transition kill renders them instantly. A no-JS render
 * is the settled strip at k=1. */

import { useEffect, useRef, type ReactNode } from "react";

/* the rt structural gate (002.r1) — the strip renders below it */
const RT_GATE = 665;
/* a gesture becomes a swipe past this horizontal slop (the 012 value) */
const SWIPE_SLOP = 6;

export function WorkGalleryIsland({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const view = root.querySelector<HTMLElement>(".wg-view");
    const list = root.querySelector<HTMLElement>(".wg-list");
    const slides = [...root.querySelectorAll<HTMLElement>(".wg-slide")];
    const shows = slides.map((s) => s.querySelector<HTMLButtonElement>(".wg-show"));
    if (!view || !list || slides.length === 0) return;
    const COUNT = slides.length;

    /* re-derive k from the rendered state (HMR-safe, the 012 pattern) */
    let k = Math.max(1, slides.findIndex((s) => s.dataset.active !== undefined) + 1);

    /* the 016 §4.1 handoff surface: k published on the section root in
       strip mode only (at rt+ there is no k and the attribute leaves) */
    const sec = root.closest<HTMLElement>(".sec");

    /* strip mode rides the container width; the section spans the
       page container, so the island's own width is the gate's input */
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

    /* ---- swipe: tracks the pointer live, snaps to the nearest slot
       on release (velocity breaks ties toward the flick by the
       nearest-slot round under the live offset) ---- */

    let dragging = false;
    let suppressClick = false;
    let startX = 0;
    let dx = 0;
    let pitch = 1;

    const onDown = (e: PointerEvent) => {
      if (!strip || !e.isPrimary || slides.length < 2) return;
      /* rects, not offsets — exact under the live translate */
      pitch = slides[1].getBoundingClientRect().left - slides[0].getBoundingClientRect().left;
      if (pitch <= 0) return;
      dragging = true;
      suppressClick = false;
      startX = e.clientX;
      dx = 0;
      list.dataset.dragging = "";
      /* capture waits for real movement: capturing here would retarget
         the derived click to the viewport and the overlay buttons
         would never receive theirs (the 012 lesson) */
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      /* clamp the live offset to the track's travel — no overscroll */
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
    /* the suppressed click fires after pointerup — swallow it once */
    const onClickCapture = (e: MouseEvent) => {
      if (!suppressClick) return;
      e.stopPropagation();
      e.preventDefault();
      suppressClick = false;
    };
    /* a swipe starting on an image must not become a native image
       drag — the browser would cancel the pointer stream mid-gesture */
    const onDragStart = (e: DragEvent) => e.preventDefault();

    /* ---- ghost clicks and keys ---- */

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
