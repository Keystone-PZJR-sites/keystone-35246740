"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HeroCarousel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const track = root?.querySelector<HTMLElement>(".hx-track");
    if (!root || !track) return;

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

    /* Track leaving shapes because their widths vary by breakpoint. */
    let index = 0;
    let rects = 0;
    let circles = 0;
    let timer: number | undefined;
    let snapTimer: number | undefined;
    let cancelled = false;
    let ready = false;
    let visible = false;
    let hovered = false;
    let focused = false;
    let firstRun = true;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canRun = () => ready && visible && !hovered && !focused && !document.hidden && !motion.matches;

    const apply = () => {
      track.style.setProperty("--hc-r", String(rects));
      track.style.setProperty("--hc-c", String(circles));
    };

    /* Prime upcoming lazy frames before they enter the viewport. */
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
      if (cancelled || !canRun()) return;
      /* Frames alternate rectangle and circle shapes. */
      if (index % 2 === 0) rects += 1;
      else circles += 1;
      index += 1;
      apply();
      prime(index + 1);
      if (index === frames) {
        /* Snap from the tail clones to the matching true frame. */
        snapTimer = window.setTimeout(snapHome, slide + 50);
      }
      timer = window.setTimeout(advance, dwell);
    };

    const schedule = (delay: number) => {
      clear();
      if (!canRun()) return;
      timer = window.setTimeout(advance, delay);
    };

    document.fonts.ready.then(() => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        if (cancelled) return;
        ready = true;
        prime(2);
        if (canRun()) {
          schedule(firstRun ? firstAdvance : dwell);
          firstRun = false;
        }
      });
    });

    const resume = () => {
      if (!canRun()) return;
      schedule(firstRun ? firstAdvance : dwell);
      firstRun = false;
    };
    const onVisibility = () => {
      if (document.hidden) clear();
      else resume();
    };
    const onPointerEnter = () => {
      hovered = true;
      clear();
    };
    const onPointerLeave = () => {
      hovered = false;
      resume();
    };
    const onFocusIn = () => {
      focused = true;
      clear();
    };
    const onFocusOut = (event: FocusEvent) => {
      focused = event.relatedTarget instanceof Node && root.contains(event.relatedTarget);
      if (!focused) resume();
    };
    const onMotionChange = () => {
      if (motion.matches) clear();
      else resume();
    };
    /* Circle (and sometimes rect) widths change at band gates. The
       transform tallies --hc-r/--hc-c in those widths, so a mid-scroll
       resize leaves the track translated into empty space. Snap home. */
    let bandKey = getComputedStyle(track).getPropertyValue("--hc-ct").trim();
    const onBandChange = () => {
      const next = getComputedStyle(track).getPropertyValue("--hc-ct").trim();
      if (next === bandKey) return;
      bandKey = next;
      clear();
      snapHome();
      resume();
    };
    const resize = new ResizeObserver(onBandChange);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) resume();
        else clear();
      },
      { threshold: 0.1 },
    );

    observer.observe(root);
    resize.observe(root);
    document.addEventListener("visibilitychange", onVisibility);
    root.addEventListener("pointerenter", onPointerEnter);
    root.addEventListener("pointerleave", onPointerLeave);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    motion.addEventListener("change", onMotionChange);

    return () => {
      cancelled = true;
      clear();
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      root.removeEventListener("pointerenter", onPointerEnter);
      root.removeEventListener("pointerleave", onPointerLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div className="hx-window" ref={ref}>
      {children}
    </div>
  );
}
