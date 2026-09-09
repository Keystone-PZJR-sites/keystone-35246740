"use client";

import { useLayoutEffect, useRef } from "react";

/** Starts the entrance when most of the diagram is visible. */
const BLOOM_THRESHOLD = 0.55;
const FINAL_ANIMATION = "sys-bloom-engine-move";
const FINAL_ENGINE = "engagement";

export function SystemBloom() {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = ref.current?.closest<HTMLElement>(".bloom-sequence");
    const diagram = section?.querySelector<HTMLElement>(".sys-diagram");
    if (!section || !diagram) return;
    const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    /* Deep links and restored scroll positions render the diagram settled. */
    if (!reduced() && diagram.getBoundingClientRect().top >= window.innerHeight) {
      arm();
    }

    const onAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName !== FINAL_ANIMATION) return;
      if ((e.target as HTMLElement).dataset.engine !== FINAL_ENGINE) return;
      if (section.dataset.bloom === "run") section.dataset.bloom = "settled";
    };
    section.addEventListener("animationend", onAnimationEnd);

    return () => {
      observer?.disconnect();
      section.removeEventListener("animationend", onAnimationEnd);
      delete section.dataset.bloom;
    };
  }, []);

  return <span ref={ref} hidden />;
}
