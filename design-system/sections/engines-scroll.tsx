"use client";

import { useLayoutEffect, useRef } from "react";

const PANEL_T = 6;
const ENGINE_COUNT = 5;
const STATE_COUNT = 10;
/** Prevents state jitter near half-stride boundaries. */
const HYST = 0.5;
/** Positions the final state before the sticky stage releases. */
const LAST_BOUNDARY = 0.3;
/** Large position changes jump directly to the nearest state. */
const JUMP = 1.5;

export function EnginesScroll() {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = ref.current?.closest<HTMLElement>(".engines-section");
    if (!section) return;
    const io = section.querySelector<HTMLElement>(".e2-io");
    const body = section.querySelector<HTMLElement>(".e2-body");
    const stage = section.querySelector<HTMLElement>(".e2-stage");
    const panels = [...section.querySelectorAll<HTMLElement>(".e2-panel")];
    const drawings = [...section.querySelectorAll<HTMLElement>(".e2-drawing")];
    if (
      !io ||
      !body ||
      !stage ||
      panels.length !== ENGINE_COUNT ||
      drawings.length !== STATE_COUNT
    ) {
      return;
    }
    const page = section.closest<HTMLElement>(".page");

    const reduced = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      page?.dataset.motion === "reduce";

    /* The visible construction determines whether scroll mapping runs. */
    let active = false;
    let halfP = 0; // one stage stop — half an engine stride
    let cssPin = 0; // Fallback while the stage is not pinned.

    const measure = () => {
      active = io.offsetParent !== null;
      if (active) {
        halfP = (PANEL_T * (section.clientWidth / 12)) / 2;
        cssPin = parseFloat(getComputedStyle(stage).top) || 0;
      }
    };

    /** Uses the rendered sticky position to account for Safari rounding. */
    const readS = () => {
      const stageTop = stage.getBoundingClientRect().top;
      const pinLine = Math.abs(stageTop - cssPin) <= 2 ? stageTop : cssPin;
      return pinLine - body.getBoundingClientRect().top;
    };

    let state = drawings.findIndex((d) => d.hasAttribute("data-active"));
    if (state < 0) state = 0;
    let shown: number | null = state;
    const primed = new Set<number>([0]);

    const prime = (i: number) => {
      if (i < 0 || i >= STATE_COUNT || primed.has(i)) return;
      primed.add(i);
      const img = drawings[i].querySelector("img");
      img?.decode().catch(() => {
        /* decode is a hint; the swap proceeds regardless */
      });
    };

    const onLeaveEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "opacity") return;
      const el = e.currentTarget as HTMLElement;
      if (!el.hasAttribute("data-active")) el.removeAttribute("data-leaving");
    };
    drawings.forEach((d) => d.addEventListener("transitionend", onLeaveEnd));

    const setState = (next: number) => {
      if (shown === next) {
        state = next;
        return;
      }
      state = next;
      const outgoing = shown !== null ? drawings[shown] : null;
      const incoming = drawings[next];
      shown = next;
      prime(next);
      if (outgoing) {
        outgoing.removeAttribute("data-active");
        if (reduced()) {
          outgoing.removeAttribute("data-leaving");
        } else {
          outgoing.setAttribute("data-leaving", "");
        }
      }
      incoming.removeAttribute("data-leaving");
      incoming.setAttribute("data-active", "");
      prime(next + 1);
      prime(next - 1);
    };

    const lits = new Array<boolean | null>(ENGINE_COUNT).fill(null);

    const setLit = (k: number, lit: boolean) => {
      if (lits[k] === lit) return;
      lits[k] = lit;
      if (lit) panels[k].setAttribute("data-lit", "");
      else panels[k].removeAttribute("data-lit");
    };

    const rdSlides = new Array<boolean | null>(ENGINE_COUNT).fill(null);
    const setRdSlide = (k: number, b: boolean) => {
      if (rdSlides[k] === b) return;
      rdSlides[k] = b;
      if (b) panels[k].setAttribute("data-slide", "b");
      else panels[k].removeAttribute("data-slide");
    };

    let raf = 0;
    let running = false;

    const clampState = (v: number) => Math.max(0, Math.min(STATE_COUNT - 1, v));

    /* Both directions share each boundary to avoid asymmetric state changes. */
    const upAt = (i: number) =>
      i === STATE_COUNT - 2 ? i + LAST_BOUNDARY : i + HYST;
    const downAt = (i: number) =>
      i === STATE_COUNT - 1 ? i - 1 + LAST_BOUNDARY : i - HYST;

    const update = () => {
      if (!active) return;
      const s = readS();

      const raw = s / halfP;
      let next = state;
      if (Math.abs(raw - state) > JUMP) {
        next = clampState(Math.round(raw));
      } else if (raw > upAt(state)) {
        next = clampState(state + 1);
      } else if (raw < downAt(state)) {
        next = clampState(state - 1);
      }
      setState(next);

      const engine = Math.floor(state / 2);
      const sub = state % 2;
      for (let j = 0; j < ENGINE_COUNT; j++) {
        setLit(j, j <= engine);
        setRdSlide(j, j === engine && sub === 1);
      }
    };

    const frame = () => {
      update();
      raf = running ? requestAnimationFrame(frame) : 0;
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) start();
        else stop();
      },
      { rootMargin: "150% 0%" },
    );
    observer.observe(section);

    const ro = new ResizeObserver(() => {
      measure();
    });
    ro.observe(section);

    measure();

    /* Hidden anchors need an explicit wide-screen scroll target. */
    const jumpToHash = () => {
      if (!active) return;
      const match = /^#engine-([a-z]+)$/.exec(window.location.hash);
      if (!match) return;
      const k = panels.findIndex((p) => p.dataset.engine === match[1]);
      if (k < 0) return;
      const stride = PANEL_T * (section.clientWidth / 12);
      const top =
        window.scrollY + body.getBoundingClientRect().top + k * stride - cssPin;
      window.scrollTo({ top, behavior: "auto" });
    };
    window.addEventListener("hashchange", jumpToHash);
    jumpToHash();

    return () => {
      stop();
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener("hashchange", jumpToHash);
      drawings.forEach((d) => d.removeEventListener("transitionend", onLeaveEnd));
    };
  }, []);

  return <span ref={ref} hidden />;
}
