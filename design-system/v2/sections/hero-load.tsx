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
 * `v2:replay` (dispatched by the /hero dev controls) re-runs the
 * choreography by flipping the class off and on across a reflow.
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

    const onReplay = () => {
      page.classList.remove("v2-load");
      void page.offsetWidth;
      page.classList.add("v2-load");
    };
    window.addEventListener("v2:replay", onReplay);

    return () => {
      cancelled = true;
      window.removeEventListener("v2:replay", onReplay);
      page.classList.remove("v2-load");
    };
  }, []);

  return <span ref={ref} hidden />;
}
