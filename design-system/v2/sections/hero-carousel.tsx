"use client";

/** v2 sections — the carousel island (spec 006 §5/§6).
 *
 * Owns the auto-advance timers and the track transform; geometry stays
 * CSS-driven. The island counts leaving rectangles and circles
 * (`--hc-r` / `--hc-c` on the track) and the track's transform resolves
 * them in ticks per band, so a band switch mid-flight re-resolves
 * cleanly. Timer and duration constants are read from the motion tokens
 * (computed style), keeping tokens/motion.css their single source.
 *
 * Behavior (§6): first advance at the first-advance delay from load
 * start (fonts ready + one frame), then one slide per dwell period.
 * Seamless loop over the three tail clones: after sliding onto the
 * clones, snap to the true frame without transition. The timer pauses
 * while the document is hidden and resets its phase on resume. Reduced
 * motion (media query or the dev toggle's data-motion attribute) means
 * no timers — the strip holds the first frames.
 */

import { useEffect, useRef, type ReactNode } from "react";

export function HeroCarousel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = ref.current?.querySelector<HTMLElement>(".hx-track");
    if (!track) return;

    const frames = track.querySelectorAll(".hx-frame:not([data-clone])").length;
    const frameEls = [...track.querySelectorAll<HTMLElement>(".hx-frame")];
    const styles = getComputedStyle(track);
    const ms = (name: string, fallback: number) => {
      const v = parseFloat(styles.getPropertyValue(name));
      return Number.isFinite(v) ? v : fallback;
    };
    const slide = ms("--motion-slide-duration", 900);
    const dwell = ms("--motion-carousel-dwell", 3500);
    const firstAdvance = ms("--motion-carousel-first-advance", 4500);

    /* leftmost true-frame index and the leaving-frame tallies */
    let index = 0;
    let rects = 0;
    let circles = 0;
    let timer: number | undefined;
    let snapTimer: number | undefined;
    let cancelled = false;

    const reduced = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      track.closest<HTMLElement>(".page")?.dataset.motion === "reduce";

    const apply = () => {
      track.style.setProperty("--hc-r", String(rects));
      track.style.setProperty("--hc-c", String(circles));
    };

    /* Later frames are lazy (§5), but a frame must be decoded before it
       slides in or it blinks on after the move. Priming flips the next
       few frames to eager a full dwell (or more) ahead of their entry. */
    const prime = (from: number, count = 3) => {
      for (let k = from; k < Math.min(from + count, frameEls.length); k++) {
        const img = frameEls[k].querySelector("img");
        if (img && img.loading === "lazy") img.loading = "eager";
      }
    };

    const snapHome = () => {
      track.classList.add("hx-snap");
      index = 0;
      rects = 0;
      circles = 0;
      apply();
      void track.offsetWidth;
      track.classList.remove("hx-snap");
    };

    const clear = () => {
      if (timer !== undefined) window.clearTimeout(timer);
      if (snapTimer !== undefined) window.clearTimeout(snapTimer);
      timer = undefined;
      snapTimer = undefined;
    };

    const advance = () => {
      if (cancelled || reduced()) return;
      /* frames alternate rect (odd) / circle (even); index is 0-based */
      if (index % 2 === 0) rects += 1;
      else circles += 1;
      index += 1;
      apply();
      prime(index + 1);
      if (index === frames) {
        /* slid onto the clones — snap to the true frame after landing */
        snapTimer = window.setTimeout(snapHome, slide + 50);
      }
      timer = window.setTimeout(advance, dwell);
    };

    const schedule = (delay: number) => {
      clear();
      timer = window.setTimeout(advance, delay);
    };

    document.fonts.ready.then(() => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        if (cancelled || reduced()) return;
        prime(2);
        if (!document.hidden) schedule(firstAdvance);
      });
    });

    const onVisibility = () => {
      if (document.hidden) clear();
      else if (!reduced()) schedule(dwell);
    };
    const onReplay = () => {
      clear();
      snapHome();
      if (!reduced() && !document.hidden) schedule(firstAdvance);
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("v2:replay", onReplay);

    return () => {
      cancelled = true;
      clear();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("v2:replay", onReplay);
    };
  }, []);

  return (
    <div className="hx-window" ref={ref}>
      {children}
    </div>
  );
}
