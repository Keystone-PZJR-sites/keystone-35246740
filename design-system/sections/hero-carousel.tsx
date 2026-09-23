"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { attachAutoplayGate } from "../lib/autoplay-gate";

export function HeroCarousel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const track = root?.querySelector<HTMLElement>(".hx-track");
    if (!root || !track) return;

    const frames = track.querySelectorAll(".hx-frame:not([data-clone])").length;
    const frameEls = [...track.querySelectorAll<HTMLElement>(".hx-frame")];
    const styles = getComputedStyle(track);
    /* Browsers may serialize 3500ms as 3.5s; parseFloat alone would
       treat that as 3.5ms and run the carousel at a blur. */
    const ms = (name: string, fallback: number) => {
      const raw = styles.getPropertyValue(name).trim();
      if (!raw) return fallback;
      const v = parseFloat(raw);
      if (!Number.isFinite(v)) return fallback;
      if (raw.endsWith("ms")) return v;
      if (raw.endsWith("s")) return v * 1000;
      return v;
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
    let firstRun = true;

    /* The gate attaches below; `ready` waits for fonts and first paint. */
    let gateOpen = () => false;
    const canRun = () => ready && gateOpen();

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
    const gate = attachAutoplayGate(root, { onResume: resume, onPause: clear, onResize: onBandChange });
    gateOpen = gate.canRun;

    return () => {
      cancelled = true;
      clear();
      gate.detach();
    };
  }, []);

  return (
    <div className="hx-window" ref={ref}>
      {children}
    </div>
  );
}
