"use client";

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

    /* Keep each card in the current three-slot circular window. */
    const restFor = (i: number, kk: number) => Math.floor((kk - i + 2) / COUNT);

    /* Preserve the rendered position across remounts. */
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
    slots.forEach((_, i) => applyRev(i, restFor(i, K)));

    /* Reposition departing cards only after they leave the clip. */
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

    const commit = (next: number) => {
      if (next === K) return;
      flushPending();
      const forward = next > K;
      const departing = mod(K);
      K = next;
      cards.forEach((_, i) => {
        const r = restFor(i, K);
        if (forward && i === departing) {
          pending = { i, r };
          pendingTimer = window.setTimeout(flushPending, snapMs());
        } else {
          applyRev(i, r);
        }
      });
      strip.style.setProperty("--cc-k", String(K));
      const active = mod(K);
      cards.forEach((c, i) => {
        c.dataset.state = i === active ? "active" : "inactive";
      });
    };

    let dragging = false;
    let suppressClick = false;
    let startX = 0;
    let dx = 0;
    let pitch = 1;

    const onDown = (e: PointerEvent) => {
      if (!e.isPrimary || slots.length < 2) return;
      flushPending();
      /* Remove revolution offsets when measuring the card pitch. */
      const raw = slots[1].getBoundingClientRect().left - slots[0].getBoundingClientRect().left;
      pitch = raw / (1 + COUNT * (revs[1] - revs[0]));
      if (!(pitch > 0)) return;
      dragging = true;
      suppressClick = false;
      startX = e.clientX;
      dx = 0;
      strip.dataset.dragging = "";
      /* Delay capture so ordinary clicks still reach card links. */
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      dx = Math.max(-pitch, Math.min(pitch, e.clientX - startX));
      strip.style.setProperty("--cc-drag-dx", `${dx}px`);
      /* Park the third card offscreen on the approach side. */
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
          /* The viewport still receives uncaptured pointer events. */
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

    /* Swipes suppress their derived click; inactive-card clicks select. */
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

    /* Native image dragging would cancel the pointer gesture. */
    const onDragStart = (e: DragEvent) => e.preventDefault();

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
