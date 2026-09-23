"use client";

/** Three-slot circular carousel: cards revolve around the strip so the
 * active card always has a neighbour on each side. Swipe, arrow keys, and
 * clicks on an inactive card step it. */

import { useEffect, useRef, type ReactNode } from "react";
import { attachArrowKeys, attachSwipe } from "../lib/swipe";

const FALLBACK_SNAP_MS = 450;

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
      return Number.isFinite(s) ? s * 1000 : FALLBACK_SNAP_MS;
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

    const detachSwipe = attachSwipe({
      viewport,
      track: strip,
      offsetVar: "--cc-drag-dx",
      enabled: () => slots.length >= 2,
      onStart: flushPending,
      /* Remove revolution offsets when measuring the card pitch. */
      pitch: () => {
        const raw = slots[1].getBoundingClientRect().left - slots[0].getBoundingClientRect().left;
        return raw / (1 + COUNT * (revs[1] - revs[0]));
      },
      /* Park the third card offscreen on the approach side. */
      onMove: (dx) => {
        const third = mod(K + 2);
        if (dx > 0) applyRev(third, restFor(third, K) - 1);
        else if (dx < 0) applyRev(third, restFor(third, K));
      },
      onRelease: (steps) => commit(K - steps),
      /* A click on an inactive card steps toward it. */
      onClick: (e) => {
        const card = (e.target as HTMLElement).closest<HTMLElement>(".cc-card");
        if (card && card.dataset.state === "inactive") {
          e.stopPropagation();
          e.preventDefault();
          const d = mod(Number(card.dataset.index) - K);
          commit(d === 1 ? K + 1 : K - 1);
        }
      },
    });
    const detachKeys = attachArrowKeys(viewport, (delta) => commit(K + delta));

    return () => {
      detachSwipe();
      detachKeys();
      flushPending();
    };
  }, []);

  return (
    <div className="cc-island" ref={ref}>
      {children}
    </div>
  );
}
