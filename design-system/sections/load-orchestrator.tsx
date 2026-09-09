"use client";

import { useEffect, useRef } from "react";

interface LoadOrchestratorProps {
  /** Animation name of the choreography's final beat. */
  finalAnimation: string;
  /** Optional selector for the element that owns the final beat. */
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
        if (!cancelled) page.classList.add("load-active");
      });
    });

    const onAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName !== finalAnimation) return;
      if (finalSelector && !(e.target as HTMLElement).matches(finalSelector)) return;
      if (page.classList.contains("load-active")) page.classList.add("load-settled");
    };
    page.addEventListener("animationend", onAnimationEnd);

    return () => {
      cancelled = true;
      page.removeEventListener("animationend", onAnimationEnd);
      page.classList.remove("load-active");
      page.classList.remove("load-settled");
    };
  }, [finalAnimation, finalSelector]);

  return <span ref={ref} hidden />;
}
