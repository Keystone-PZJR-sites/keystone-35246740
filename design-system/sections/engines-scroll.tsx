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
/** Movement before a gesture is classified as horizontal. */
const SWIPE_SLOP = 8;
/** Horizontal travel required to advance the diagram. */
const SWIPE_COMMIT = 40;

export function EnginesScroll() {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = ref.current?.closest<HTMLElement>(".engines-section");
    if (!section) return;
    const io = section.querySelector<HTMLElement>(".e2-io");
    const body = section.querySelector<HTMLElement>(".e2-body");
    const stage = section.querySelector<HTMLElement>(".e2-stage");
    const stack = section.querySelector<HTMLElement>(".e2-stack");
    const panels = [...section.querySelectorAll<HTMLElement>(".e2-panel")];
    const spanels = [...section.querySelectorAll<HTMLElement>(".e2-spanel")];
    const drawings = [...section.querySelectorAll<HTMLElement>(".e2-drawing")];
    const sdrawings = [...section.querySelectorAll<HTMLElement>(".e2-sdrawing")];
    if (
      !io ||
      !body ||
      !stage ||
      !stack ||
      panels.length !== ENGINE_COUNT ||
      spanels.length !== ENGINE_COUNT ||
      drawings.length !== STATE_COUNT
    ) {
      return;
    }
    const page = section.closest<HTMLElement>(".page");

    const reduced = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      page?.dataset.motion === "reduce";

    /* The visible construction determines which interaction runs. */
    let ioOn = false;
    let stackOn = false;
    let halfP = 0; // one stage stop — half an engine stride
    let cssPin = 0; // Fallback while the stage is not pinned.
    /* Click/swipe may show the other drawing of this engine without
       moving the page. Dropped when scroll-derived `state` changes. */
    let held: number | null = null;
    let heldAt = 0;

    const measure = () => {
      ioOn = io.offsetParent !== null;
      stackOn = stack.offsetParent !== null;
      if (!ioOn) held = null;
      if (ioOn) {
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
    sdrawings.forEach((d) => d.addEventListener("transitionend", onLeaveEnd));

    const applyShown = (next: number) => {
      if (shown === next) return;
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

    const setState = (next: number) => {
      state = next;
      if (held !== null && heldAt !== state) held = null;
      applyShown(held !== null ? held : state);
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

    const swapDrawing = (outgoing: HTMLElement | null, incoming: HTMLElement) => {
      if (outgoing) {
        outgoing.removeAttribute("data-active");
        if (reduced()) outgoing.removeAttribute("data-leaving");
        else outgoing.setAttribute("data-leaving", "");
      }
      incoming.removeAttribute("data-leaving");
      incoming.setAttribute("data-active", "");
      incoming.querySelector("img")?.decode().catch(() => {
        /* decode is a hint; the swap proceeds regardless */
      });
    };

    const setStackView = (panel: HTMLElement, b: boolean) => {
      const views = [...panel.querySelectorAll<HTMLElement>(".e2-sdrawing")];
      if (views.length !== 2) return;
      const next = b ? 1 : 0;
      const current = views.findIndex((d) => d.hasAttribute("data-active"));
      if (current !== next) {
        swapDrawing(current >= 0 ? views[current] : null, views[next]);
      }
      if (b) panel.setAttribute("data-slide", "b");
      else panel.removeAttribute("data-slide");
    };

    const toggleIoView = () => {
      const engine = Math.floor(state / 2);
      const vis = shown ?? state;
      const next = engine * 2 + (1 - (vis % 2));
      if (next === state) held = null;
      else {
        held = next;
        heldAt = state;
      }
      applyShown(next);
      setRdSlide(engine, next % 2 === 1);
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
      if (!ioOn) return;
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
      const sub = (shown ?? state) % 2;
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
      if (!ioOn) return;
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

    /* The diagram is the only control. Pan-y stays with the page until
       the gesture is clearly horizontal. A tap or a committed swipe
       loops the other drawing of the current engine; the wide stage
       does that in place so the sticky scroll does not jump. */
    let dragging = false;
    let armed = false;
    let suppressClick = false;
    let startX = 0;
    let startY = 0;
    let lastDx = 0;
    let dragAsset: HTMLElement | null = null;

    const resetDrag = () => {
      dragging = false;
      armed = false;
      dragAsset = null;
    };

    const assetOf = (el: EventTarget | null) => {
      const node = el instanceof Element ? el : null;
      const asset = node?.closest<HTMLElement>(".e2-asset");
      if (!asset || !section.contains(asset)) return null;
      const inStack = stackOn && stack.contains(asset);
      const inIo = ioOn && stage.contains(asset);
      return inStack || inIo ? asset : null;
    };

    const toggleFromAsset = (asset: HTMLElement) => {
      if (stackOn && stack.contains(asset)) {
        const panel = asset.closest<HTMLElement>(".e2-spanel");
        if (!panel) return;
        setStackView(panel, panel.dataset.slide !== "b");
        return;
      }
      if (ioOn && stage.contains(asset)) toggleIoView();
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!e.isPrimary) return;
      measure();
      const asset = assetOf(e.target);
      if (!asset) return;
      dragging = true;
      armed = false;
      suppressClick = false;
      startX = e.clientX;
      startY = e.clientY;
      lastDx = 0;
      dragAsset = asset;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || !dragAsset) return;
      lastDx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!armed) {
        if (Math.abs(lastDx) < SWIPE_SLOP && Math.abs(dy) < SWIPE_SLOP) return;
        /* Vertical wins: drop the gesture so the page keeps the pan. */
        if (Math.abs(dy) >= Math.abs(lastDx)) {
          resetDrag();
          return;
        }
        armed = true;
        suppressClick = true;
        try {
          dragAsset.setPointerCapture(e.pointerId);
        } catch {
          /* uncapturable pointer — move/up still arrive through the section */
        }
      }
    };
    const onPointerUp = () => {
      if (!dragging) return;
      const asset = dragAsset;
      const went = armed;
      const dx = lastDx;
      resetDrag();
      lastDx = 0;
      if (!went || !asset) return;
      if (Math.abs(dx) >= SWIPE_COMMIT) toggleFromAsset(asset);
    };
    const onPointerCancel = () => {
      resetDrag();
      lastDx = 0;
    };

    const onClick = (e: MouseEvent) => {
      measure();
      const asset = assetOf(e.target);
      if (!asset) return;
      if (suppressClick) {
        e.preventDefault();
        suppressClick = false;
        return;
      }
      toggleFromAsset(asset);
    };

    const onKey = (e: KeyboardEvent) => {
      const asset = e.target;
      if (!(asset instanceof HTMLElement) || !asset.classList.contains("e2-asset")) {
        return;
      }
      measure();
      if (
        e.key !== "ArrowRight" &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowDown" &&
        e.key !== "ArrowUp"
      ) {
        return;
      }
      if (!assetOf(asset)) return;
      e.preventDefault();
      toggleFromAsset(asset);
    };

    const onDragStart = (e: DragEvent) => e.preventDefault();

    section.addEventListener("pointerdown", onPointerDown);
    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerup", onPointerUp);
    section.addEventListener("pointercancel", onPointerCancel);
    section.addEventListener("click", onClick);
    section.addEventListener("keydown", onKey);
    section.addEventListener("dragstart", onDragStart);

    return () => {
      stop();
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener("hashchange", jumpToHash);
      drawings.forEach((d) => d.removeEventListener("transitionend", onLeaveEnd));
      sdrawings.forEach((d) => d.removeEventListener("transitionend", onLeaveEnd));
      section.removeEventListener("pointerdown", onPointerDown);
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerup", onPointerUp);
      section.removeEventListener("pointercancel", onPointerCancel);
      section.removeEventListener("click", onClick);
      section.removeEventListener("keydown", onKey);
      section.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return <span ref={ref} hidden />;
}
