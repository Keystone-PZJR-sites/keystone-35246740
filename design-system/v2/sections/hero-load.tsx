"use client";

/** v2 sections — the load orchestrator (spec 006 §6).
 *
 * Waits for page ready — fonts loaded, first frame after hydration —
 * then flips one class (`v2-load`) on the page root. All choreography
 * is CSS keyed off that class, so a no-JS render shows the settled,
 * branded state. The flip is page-wide by design: the lattice sweep
 * animates every section's exposure lines and the nav rides the same
 * class (its internals unchanged). 006 owns this orchestrator; later
 * sections inherit it.
 *
 * The run ends explicitly: when the last beat lands (the follow-ups
 * chip's wipe — the choreography's final animation), the page gains
 * `v2-settled`, whose CSS turns the choreography animations off.
 * Without it, any band-gated element re-entering `display` restarts
 * its animation — resizing across a gate replayed the whole page.
 * `v2-load` stays (the cold-load guard keys on it); the settled class
 * simply outranks the animation rules.
 *
 * `v2:replay` (dispatched by the /hero dev controls) re-runs the
 * choreography by clearing both classes and re-flipping across a
 * reflow. Reduced motion runs no animations, so no settle event fires
 * and none is needed.
 */

import { useEffect, useRef } from "react";

export function HeroLoad() {
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

    /* the last landing beat: the reading-order-final chip's wipe (§6);
       the pseudo-element's animationend fires on the owning chip */
    const onAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName !== "hx-chip-wipe") return;
      if ((e.target as HTMLElement).dataset.chip !== "follow-ups") return;
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
  }, []);

  return <span ref={ref} hidden />;
}
