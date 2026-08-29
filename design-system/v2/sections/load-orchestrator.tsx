"use client";

/** v2 sections — the load orchestrator (spec 006 §6; generalized
 * 2026-08-28 at its second consumer, the Our Work entrance — 014 §6
 * as amended. HeroLoad wraps this with the hero's final beat, so the
 * homepage is untouched; the promotion pattern the motion constants
 * follow).
 *
 * Waits for page ready — fonts loaded, first frame after hydration —
 * then flips one class (`v2-load`) on the page root. All choreography
 * is CSS keyed off that class, so a no-JS render shows the settled
 * state. Which elements ride the flip is the page's own CSS contract
 * (the homepage's `v2-choreo` guard sweeps lattice + nav + rises +
 * chips; Our Work's `v2-choreo-rise` guard holds the rises only).
 *
 * The run ends explicitly: when the choreography's final beat lands —
 * identified by its animationName plus an optional selector on the
 * owning element — the page gains `v2-settled`, whose CSS turns the
 * choreography animations off. Without it, any band-gated element
 * re-entering `display` restarts its animation — resizing across a
 * gate replayed the whole page.
 * `v2-load` stays (the cold-load guards key on it); the settled class
 * simply outranks the animation rules.
 *
 * `v2:replay` (dispatched by the dev controls) re-runs the
 * choreography by clearing both classes and re-flipping across a
 * reflow. Reduced motion runs no animations, so no settle event fires
 * and none is needed.
 */

import { useEffect, useRef } from "react";

interface LoadOrchestratorProps {
  /** animationName of the choreography's final beat. */
  finalAnimation: string;
  /** Optional selector the final beat's owning element must match
   * (pseudo-element animations fire animationend on their owner). */
  finalSelector?: string;
}

export function LoadOrchestrator({ finalAnimation, finalSelector }: LoadOrchestratorProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const page = ref.current?.closest<HTMLElement>(".page");
    if (!page) return;

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        if (!cancelled) page.classList.add("v2-load");
      });
    });

    const onAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName !== finalAnimation) return;
      if (finalSelector && !(e.target as HTMLElement).matches(finalSelector)) return;
      if (page.classList.contains("v2-load")) page.classList.add("v2-settled");
    };
    page.addEventListener("animationend", onAnimationEnd);

    const onReplay = () => {
      page.classList.remove("v2-load");
      page.classList.remove("v2-settled");
      void page.offsetWidth;
      page.classList.add("v2-load");
    };
    window.addEventListener("v2:replay", onReplay);

    return () => {
      cancelled = true;
      window.removeEventListener("v2:replay", onReplay);
      page.removeEventListener("animationend", onAnimationEnd);
      page.classList.remove("v2-load");
      page.classList.remove("v2-settled");
    };
  }, [finalAnimation, finalSelector]);

  return <span ref={ref} hidden />;
}
