"use client";

/** v2 sections — the case-carousel island (spec 022 §5/§6, the loop
 * re-ruled circular §9 B12).
 *
 * The 012 pricing-scale machine minus the slider, on A CIRCULAR
 * STRIP: one virtual K ∈ ℤ owns the section — unbounded in both
 * directions, so the strip loops forever with the first card slotting
 * in to the right of the last (and the last to the left of the
 * first). The strip translate is −K × stride (CSS, geometry); each
 * card's slot carries a revolution count --cc-rev that repositions it
 * by whole strip-lengths (3 strides), so the window [K, K+2] always
 * exists: the active card at the origin, the next partial at +1, the
 * third parked off-canvas. data-state and the study identity ride
 * K mod 3.
 *
 * TELEPORTS ARE INVISIBLE BY SCHEDULE: a rev change never animates
 * (case-carousel.css) and only ever lands while its card is outside
 * the clip — the arriving card is placed on the approach side at
 * commit (both candidate slots render off-canvas at a rest), and the
 * departing card of a forward step holds its slot through the travel
 * and re-parks on the strip's settle (the snap duration, read from
 * the computed transition — 0 under reduced motion). A backward drag
 * parks the third card on the left the moment the gesture's direction
 * reads positive (the sign crossing renders both slots off-canvas).
 *
 * Inputs, all writing the same K (§5): strip swipe/drag (the 012
 * pointer lessons verbatim — lazy capture, dragstart suppression,
 * click-swallow after a real swipe; the live offset clamps to ±1
 * stride — the circular window holds one neighbor per side); a click
 * or Enter on an INACTIVE card selects it by the shortest walk (+1
 * forward for the visible ghost, −1 back for the parked card — §9
 * R6, navigation suppressed; the active card's link navigates);
 * arrow keys with focus anywhere inside the strip.
 *
 * No auto-advance, no timers beyond the settle re-park — the section
 * never moves on its own (§5). Reduced motion is state-to-state (the
 * CSS transition kill). No-JS never reaches this file — the server
 * HTML is the settled K=0 strip with three live links. K re-derives
 * from the DOM on mount so an HMR remount never resets a live
 * section. */

import { useEffect, useRef, type ReactNode } from "react";

export function CaseCarouselIsland({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const viewport = root.querySelector<HTMLElement>(".cc-carousel");
    const strip = root.querySelector<HTMLElement>(".cc-strip");
    const slots = [...root.querySelectorAll<HTMLElement>(".cc-slot")];
    const cards = [...root.querySelectorAll<HTMLElement>(".cc-card")];
    if (!viewport || !strip || cards.length === 0) return;
    const COUNT = cards.length;
    const mod = (n: number) => ((n % COUNT) + COUNT) % COUNT;

    /* the rest revolution for card i under K: places it in [K, K+2] */
    const restFor = (i: number, kk: number) => Math.floor((kk - i + 2) / COUNT);

    /* re-derive K from the rendered state (HMR-safe): the inline
       --cc-k survives a remount; the server HTML carries none (K=0) */
    const styleK = parseInt(strip.style.getPropertyValue("--cc-k"), 10);
    let K = Number.isInteger(styleK)
      ? styleK
      : Math.max(
          0,
          cards.findIndex((c) => c.dataset.state === "active"),
        );

    const revs = slots.map(() => 0);
    const applyRev = (i: number, r: number) => {
      if (revs[i] === r) return;
      revs[i] = r;
      slots[i].style.setProperty("--cc-rev", String(r));
    };
    /* mount: settle the window for the derived K (clears stale HMR
       revs; a no-op write on first hydration) */
    slots.forEach((_, i) => applyRev(i, restFor(i, K)));

    /* the deferred re-park of a forward step's departing card */
    let pending: { i: number; r: number } | null = null;
    let pendingTimer: number | undefined;
    const flushPending = () => {
      if (pendingTimer !== undefined) {
        clearTimeout(pendingTimer);
        pendingTimer = undefined;
      }
      if (pending) {
        applyRev(pending.i, pending.r);
        pending = null;
      }
    };
    const snapMs = () => {
      const s = parseFloat(getComputedStyle(strip).transitionDuration);
      return Number.isFinite(s) ? s * 1000 : 450;
    };

    /* one step at a time — every input path commits K±1 */
    const commit = (next: number) => {
      if (next === K) return;
      flushPending();
      const forward = next > K;
      const departing = mod(K);
      K = next;
      cards.forEach((_, i) => {
        const r = restFor(i, K);
        if (forward && i === departing) {
          /* holds its slot through the travel; re-parks at K+2 once
             the strip settles (off-canvas at the new rest) */
          pending = { i, r };
          pendingTimer = window.setTimeout(flushPending, snapMs());
        } else {
          /* a no-op for the cards already in place; the backward
             arrival teleports here — off-canvas at the commit instant */
          applyRev(i, r);
        }
      });
      strip.style.setProperty("--cc-k", String(K));
      const active = mod(K);
      cards.forEach((c, i) => {
        c.dataset.state = i === active ? "active" : "inactive";
      });
    };

    /* ---- strip swipe: tracks the pointer live, clamped to one
       stride per side (the circular window holds one neighbor each
       way); snaps to the nearest state on release; a real swipe
       suppresses the click so the card links never fire after a
       drag (§5, the 012 lessons) ---- */

    let dragging = false;
    let suppressClick = false;
    let startX = 0;
    let dx = 0;
    let pitch = 1;

    const onDown = (e: PointerEvent) => {
      if (!e.isPrimary || slots.length < 2) return;
      flushPending();
      /* rects, corrected for the slots' revolution offsets — exact
         under the live translate at any width */
      const raw = slots[1].getBoundingClientRect().left - slots[0].getBoundingClientRect().left;
      pitch = raw / (1 + COUNT * (revs[1] - revs[0]));
      if (!(pitch > 0)) return;
      dragging = true;
      suppressClick = false;
      startX = e.clientX;
      dx = 0;
      strip.dataset.dragging = "";
      /* capture waits for real movement: capturing here would retarget
         the derived click to the viewport and the card links would
         never receive theirs */
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      dx = Math.max(-pitch, Math.min(pitch, e.clientX - startX));
      strip.style.setProperty("--cc-drag-dx", `${dx}px`);
      /* park the third card on the approach side — at the sign
         crossing both candidate slots render off-canvas, so the
         teleport can never be seen */
      const third = mod(K + 2);
      if (dx > 0) {
        applyRev(third, restFor(third, K) - 1);
      } else if (dx < 0) {
        applyRev(third, restFor(third, K));
      }
      if (!suppressClick && Math.abs(e.clientX - startX) > 6) {
        suppressClick = true;
        try {
          viewport.setPointerCapture(e.pointerId);
        } catch {
          /* uncapturable pointer — move/up still arrive through the viewport */
        }
      }
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      delete strip.dataset.dragging;
      commit(K - Math.round(dx / pitch));
      strip.style.removeProperty("--cc-drag-dx");
    };

    /* the derived click after a swipe fires once — swallow it; a plain
       click on an INACTIVE card selects instead of navigating (§9 R6 —
       keyboard Enter arrives through the same click event). The walk
       is the shortest: +1 for the visible ghost, −1 for the parked
       card (its backward face is one step away on the circle). */
    const onClickCapture = (e: MouseEvent) => {
      if (suppressClick) {
        e.stopPropagation();
        e.preventDefault();
        suppressClick = false;
        return;
      }
      const card = (e.target as HTMLElement).closest<HTMLElement>(".cc-card");
      if (card && card.dataset.state === "inactive") {
        e.stopPropagation();
        e.preventDefault();
        const d = mod(Number(card.dataset.index) - K);
        commit(d === 1 ? K + 1 : K - 1);
      }
    };

    /* a swipe starting on a card photo must not become a native image
       drag — the browser would cancel the pointer stream mid-gesture */
    const onDragStart = (e: DragEvent) => e.preventDefault();

    /* ---- arrow keys, with focus anywhere inside the strip (§9 R6);
       the circle never clamps ---- */
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        commit(K + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        commit(K - 1);
      }
    };

    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);
    viewport.addEventListener("click", onClickCapture, true);
    viewport.addEventListener("dragstart", onDragStart);
    viewport.addEventListener("keydown", onKeyDown);

    return () => {
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      viewport.removeEventListener("click", onClickCapture, true);
      viewport.removeEventListener("dragstart", onDragStart);
      viewport.removeEventListener("keydown", onKeyDown);
      flushPending();
      delete strip.dataset.dragging;
      strip.style.removeProperty("--cc-drag-dx");
    };
  }, []);

  return (
    <div className="cc-island" ref={ref}>
      {children}
    </div>
  );
}
