"use client";

/** Controls the narrow gallery strip through swipe, click, and arrow
 * keys. The island disables itself at the mosaic gate. In strip mode it
 * publishes the active index for the gallery overlay's open action. */

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { attachArrowKeys, attachSwipe } from "@keystone-sites/marketing-design-system/lib/swipe";

/* The strip renders below the rt gate. */
const RT_GATE = 665;

export function WorkGalleryIsland({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const view = root.querySelector<HTMLElement>(".wg-view");
    const list = root.querySelector<HTMLElement>(".wg-list");
    const slides = [...root.querySelectorAll<HTMLElement>(".wg-slide")];
    const shows = slides.map((s) => s.querySelector<HTMLButtonElement>(".wg-show"));
    if (!view || !list || slides.length === 0) return;
    const COUNT = slides.length;

    /* Preserve rendered state across remounts. */
    let k = Math.max(1, slides.findIndex((s) => s.dataset.active !== undefined) + 1);

    /* Publish the strip index only while the strip is active. */
    const sec = root.closest<HTMLElement>(".sec");

    /* The island width determines whether strip mode is active. */
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

    const detachSwipe = attachSwipe({
      viewport: view,
      track: list,
      offsetVar: "--wg-drag-dx",
      enabled: () => strip && slides.length >= 2,
      /* Rects account for the live translate. */
      pitch: () => slides[1].getBoundingClientRect().left - slides[0].getBoundingClientRect().left,
      /* Clamp the live offset to the track's travel. */
      clamp: (dx, pitch) => Math.max((k - COUNT) * pitch, Math.min((k - 1) * pitch, dx)),
      onRelease: (steps) => commit(k - steps),
    });
    const detachKeys = attachArrowKeys(
      view,
      (delta) => commit(k + delta),
      () => strip,
    );

    const showHandlers = shows.map((_, i) => () => {
      if (strip) commit(i + 1);
    });
    shows.forEach((b, i) => b?.addEventListener("click", showHandlers[i]));

    return () => {
      ro.disconnect();
      detachSwipe();
      detachKeys();
      shows.forEach((b, i) => b?.removeEventListener("click", showHandlers[i]));
      view.removeAttribute("tabindex");
      if (sec) delete sec.dataset.k;
    };
  }, []);

  return (
    <div className="wg-island" ref={ref}>
      {children}
    </div>
  );
}
