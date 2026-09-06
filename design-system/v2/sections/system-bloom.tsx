"use client";

/** v2 sections — the Bloom island (spec 019 §6). The section's server
 * render IS the settled diagram; this island only orchestrates the
 * entrance:
 *
 * - On mount, if the page loaded above the trigger (the diagram box is
 *   still below the viewport), it arms the section and observes the
 *   box; a load at or past the trigger (deep link, refresh mid-page,
 *   back-navigation) keeps the settled render.
 * - One IntersectionObserver fires the run when ~55% of the diagram
 *   box is in view, then disconnects — the entrance plays once per
 *   page load and never re-fires on scroll or resize.
 * - The settled attribute lands on the run's last-ending animation
 *   (the fifth engine's travel — the choreographies-settle contract),
 *   turning the run's animations off.
 * - Reduced motion is site law (§9 R2): the island never arms under
 *   the media query or the dev toggle's data-motion attribute.
 *
 * Every beat is CSS keyed off data-bloom (system.css); the island
 * flips the attribute only — geometry stays CSS (§8). `v2:replay`
 * (the standing dev controls) re-arms for QA.
 */

import { useEffect, useRef } from "react";

/** ~55% of the diagram box in view fires the entrance (§6). */
const BLOOM_THRESHOLD = 0.55;
/** The settled attribute lands on the run's last-ending animation —
 * the fifth engine's travel (§6 as amended, §9 B8: it outlasts the
 * mark's fade by 30ms on the table's clock). */
const FINAL_ANIMATION = "sys-bloom-engine-move";
/* "engagement" since the 019 §9 R6 re-label (2026-09-06) — the fifth
 * beat's petal (bottom-right) carries the Engagement identity now */
const FINAL_ENGINE = "engagement";

export function SystemBloom() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = ref.current?.closest<HTMLElement>(".v2-choreo-bloom");
    const diagram = section?.querySelector<HTMLElement>(".sys-diagram");
    if (!section || !diagram) return;
    const page = section.closest<HTMLElement>(".page");

    const reduced = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      page?.dataset.motion === "reduce";

    let observer: IntersectionObserver | null = null;

    const arm = () => {
      observer?.disconnect();
      observer = null;
      if (reduced()) {
        delete section.dataset.bloom;
        return;
      }
      section.dataset.bloom = "armed";
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          section.dataset.bloom = "run";
          observer?.disconnect();
          observer = null;
        },
        { threshold: BLOOM_THRESHOLD },
      );
      observer.observe(diagram);
    };

    /* arm only when the whole diagram box is still below the viewport;
       a load at or past the trigger renders the settled section (§6) */
    if (!reduced() && diagram.getBoundingClientRect().top >= window.innerHeight) {
      arm();
    }

    const onAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName !== FINAL_ANIMATION) return;
      if ((e.target as HTMLElement).dataset.engine !== FINAL_ENGINE) return;
      if (section.dataset.bloom === "run") section.dataset.bloom = "settled";
    };
    section.addEventListener("animationend", onAnimationEnd);

    const onReplay = () => arm();
    window.addEventListener("v2:replay", onReplay);

    return () => {
      observer?.disconnect();
      section.removeEventListener("animationend", onAnimationEnd);
      window.removeEventListener("v2:replay", onReplay);
      delete section.dataset.bloom;
    };
  }, []);

  return <span ref={ref} hidden />;
}
