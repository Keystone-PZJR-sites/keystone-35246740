"use client";

/** SANDBOX 2 — the engine carousel island with the DISTANCE-MAPPED
 * free scroll contract.
 *
 * The second experiment fork (sibling of engines-scroll-free.tsx).
 * The first sandbox showed the structural miss: free scroll removes
 * the dwell the R19 carousel trades for, so a pass-through only ever
 * shows the five `a` drawings. This variant puts the `b` drawings on
 * the scroll path itself — the stage has TEN scroll stops instead of
 * five:
 *
 *   state = clamp(round(s / (panelP / 2)), 0, 9)
 *
 * Each engine's `a` shows while its copy is aligned with the stage
 * (s ≈ k·panelP) and its `b` shows in the middle of the travel toward
 * the next engine, so one pass plays all ten drawings as a
 * scroll-driven stepped sequence on the standing blur + rise grammar.
 * Still NO scroll writes — no clamp, no snap.
 *
 * Two refinements over the naive mapping:
 *
 * - **Hysteresis.** A neighbor commits only when the raw index passes
 *   0.6 of a half-stride from the current state's center, so resting
 *   near a boundary never flutters. A jump past 1.5 half-strides
 *   (teleport, fast flick) goes straight to the nearest state.
 *
 * - **The idle timer on top.** While the scroll is idle the a↔b cycle
 *   continues from whatever state the distance mapping chose (flip
 *   within the current engine's pair every CAROUSEL_MS). Distance
 *   mapping runs only on moving frames, so the timer's flip is not
 *   immediately reverted; the first moving frame hands control back
 *   to distance (a small a-flicker when creeping off a rest whose
 *   timer had flipped to `b` is a known, accepted seam of this
 *   contract — note it when judging the feel).
 *
 * Mounted ONLY by engines-free-2.tsx on /engines-free-2. The
 * canonical paged island (engines-scroll.tsx, §9 R20) and the first
 * sandbox are untouched. The stack constructions below the rd1 gate
 * (§9 R21/R22) are unchanged from the canonical island.
 */

import { useEffect, useRef } from "react";

/* ---- constants ---- */

/** one panel height, ticks (§1) — also one engine's scroll stride */
const PANEL_T = 6;
const ENGINE_COUNT = 5;
const STATE_COUNT = 10;
/** the idle-cycle timer — while the scroll is idle the shown state
 * flips within its engine pair on this clock */
const CAROUSEL_MS = 5000;
/** per-frame scroll delta under which the page counts as idle */
const IDLE_EPS_PX = 0.5;
/** hysteresis, in half-stride units — a neighbor state commits only
 * past this distance from the current state's center (40/60 bands) */
const HYST = 0.6;
/** raw-index distance past which the mapping jumps straight to the
 * nearest state (teleports, anchor jumps, very fast flicks) */
const JUMP = 1.5;
/** rAF delta clamp — a resumed tab never jumps the timer */
const DT_MAX_MS = 100;
/** the rt structural gate (spec 002.r1) — above it the stack runs the
 * timer, below it the swipe (§9 R21) */
const RT_GATE_PX = 665;
/** the swipe's horizontal intent lock, px (§9 R7) */
const SWIPE_LOCK_PX = 8;
/** the drag fraction past which a release commits to the other slide
 * (§9 R7/R21) */
const SWIPE_COMMIT_FRAC = 0.15;
/** the flick velocity that commits regardless of distance, px/ms */
const SWIPE_FLICK_VX = 0.3;

export function EnginesFree2Scroll() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = ref.current?.closest<HTMLElement>(".v2-engines");
    if (!section) return;
    const io = section.querySelector<HTMLElement>(".e2-io");
    const body = section.querySelector<HTMLElement>(".e2-body");
    const stage = section.querySelector<HTMLElement>(".e2-stage");
    const panels = [...section.querySelectorAll<HTMLElement>(".e2-panel")];
    const drawings = [...section.querySelectorAll<HTMLElement>(".e2-drawing")];
    const spanels = [...section.querySelectorAll<HTMLElement>(".e2-spanel")];
    const svisuals = spanels.map((p) => p.querySelector<HTMLElement>(".e2-svisual"));
    const sdrawings = spanels.map((p) => [
      ...p.querySelectorAll<HTMLElement>(".e2-sdrawing"),
    ]);
    if (
      !io ||
      !body ||
      !stage ||
      panels.length !== ENGINE_COUNT ||
      drawings.length !== STATE_COUNT ||
      spanels.length !== ENGINE_COUNT ||
      svisuals.some((v) => !v) ||
      sdrawings.some((d) => d.length !== 2)
    ) {
      return;
    }
    const page = section.closest<HTMLElement>(".page");

    const reduced = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      page?.dataset.motion === "reduce";

    /* the stage grammar's values — the swipe scrubs them laterally
       (§9 R22; the CSS carries the settled states) */
    const styles = getComputedStyle(section);
    const stageBlur = parseFloat(styles.getPropertyValue("--motion-stage-blur")) || 8;
    const stageRise = parseFloat(styles.getPropertyValue("--motion-stage-rise")) || 24;
    const stageDrop = parseFloat(styles.getPropertyValue("--motion-stage-drop")) || -12;

    /* ---- the stack carousels (§5 as re-ruled, §9 R21) — unchanged
       from the canonical island ---- */
    const ssubs = new Array<number>(ENGINE_COUNT).fill(0);
    const sshown = new Array<number>(ENGINE_COUNT).fill(0);
    const selapsed = new Array<number>(ENGINE_COUNT).fill(0);
    const sslides = new Array<number>(ENGINE_COUNT).fill(0);
    const sprimed = new Set<number>();
    const sfas = new Array<number | null>(ENGINE_COUNT).fill(null);
    const sfbs = new Array<number | null>(ENGINE_COUNT).fill(null);
    const sfbons = new Array<number | null>(ENGINE_COUNT).fill(null);

    const primeStack = (k: number) => {
      if (sprimed.has(k)) return;
      sprimed.add(k);
      const img = sdrawings[k][1].querySelector("img");
      img?.decode().catch(() => {
        /* decode is a hint */
      });
    };

    const setSIndicator = (k: number, fa: number, fbOn: number, fb: number) => {
      const panel = spanels[k];
      if (sfas[k] !== fa) {
        sfas[k] = fa;
        panel.style.setProperty("--e2-fill-a", String(fa));
      }
      if (sfbons[k] !== fbOn) {
        sfbons[k] = fbOn;
        panel.style.setProperty("--e2-fb-on", String(fbOn));
      }
      if (sfbs[k] !== fb) {
        sfbs[k] = fb;
        panel.style.setProperty("--e2-fill-b", String(fb));
      }
    };

    const setStackState = (k: number, next: number) => {
      if (sshown[k] === next) return;
      const outgoing = sdrawings[k][sshown[k]];
      const incoming = sdrawings[k][next];
      sshown[k] = next;
      outgoing.removeAttribute("data-active");
      if (!reduced()) {
        outgoing.setAttribute("data-leaving", "");
      } else {
        outgoing.removeAttribute("data-leaving");
      }
      incoming.removeAttribute("data-leaving");
      incoming.setAttribute("data-active", "");
    };

    const scrubStack = (k: number, q: number, dir: number) => {
      const out = sdrawings[k][sslides[k]];
      const inc = sdrawings[k][1 - sslides[k]];
      out.style.opacity = String(1 - q);
      out.style.filter = `blur(${stageBlur * q}px)`;
      out.style.transform = `translateX(${stageDrop * dir * q}px)`;
      inc.style.opacity = String(q);
      inc.style.filter = `blur(${stageBlur * (1 - q)}px)`;
      inc.style.transform = `translateX(${stageRise * dir * (1 - q)}px)`;
    };
    const clearScrub = (k: number) => {
      for (const el of sdrawings[k]) {
        el.style.removeProperty("opacity");
        el.style.removeProperty("filter");
        el.style.removeProperty("transform");
      }
    };

    const resetStack = () => {
      for (let k = 0; k < ENGINE_COUNT; k++) {
        ssubs[k] = 0;
        selapsed[k] = 0;
        sslides[k] = 0;
        setStackState(k, 0);
        sdrawings[k][1].removeAttribute("data-leaving");
        clearScrub(k);
        svisuals[k]!.removeAttribute("data-drag");
        svisuals[k]!.style.removeProperty("--e2-sdir");
        spanels[k].style.removeProperty("--e2-fill-a");
        spanels[k].style.removeProperty("--e2-fill-b");
        spanels[k].style.removeProperty("--e2-fb-on");
        sfas[k] = null;
        sfbs[k] = null;
        sfbons[k] = null;
      }
    };

    /* ---- geometry and mode (re-measured on resize) ---- */
    let active = false;
    let mode: "io" | "timer" | "swipe" = "io";
    let t = 0;
    let halfP = 0; // one stage stop — half an engine stride
    let d0 = 0; // scrollY at the engine-1 rest
    let strideS = 0; // one swipe slide — the stack visual's width

    const measure = () => {
      active = io.offsetParent !== null;
      const prev = mode;
      mode = active
        ? "io"
        : section.clientWidth >= RT_GATE_PX
          ? "timer"
          : "swipe";
      if (mode !== prev) resetStack();
      if (active) {
        t = section.clientWidth / 12;
        halfP = (PANEL_T * t) / 2;
        const pinLine = parseFloat(getComputedStyle(stage).top) || 0;
        d0 = body.getBoundingClientRect().top + window.scrollY - pinLine;
      } else {
        strideS = svisuals[0]?.clientWidth || 0;
      }
    };

    /* ---- states and swaps ---- */
    let state = drawings.findIndex((d) => d.hasAttribute("data-active"));
    if (state < 0) state = 0;
    let shown: number | null = state;
    /** the idle-cycle timer — accumulated idle ms toward the flip */
    let elapsed = 0;
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

    /* ---- the lit dots (§9 R16) ---- */
    const lits = new Array<boolean | null>(ENGINE_COUNT).fill(null);

    const setLit = (k: number, lit: boolean) => {
      if (lits[k] === lit) return;
      lits[k] = lit;
      if (lit) panels[k].setAttribute("data-lit", "");
      else panels[k].removeAttribute("data-lit");
    };

    /* ---- the indicator (§6.2 — §9 R19) ---- */
    const fas = new Array<number>(ENGINE_COUNT).fill(-1);
    const fbs = new Array<number>(ENGINE_COUNT).fill(-1);
    const fbOns = new Array<number>(ENGINE_COUNT).fill(-1);

    const setIndicator = (k: number, fa: number, fbOn: number, fb: number) => {
      const panel = panels[k];
      if (fas[k] !== fa) {
        fas[k] = fa;
        panel.style.setProperty("--e2-fill-a", String(fa));
      }
      if (fbOns[k] !== fbOn) {
        fbOns[k] = fbOn;
        panel.style.setProperty("--e2-fb-on", String(fbOn));
      }
      if (fbs[k] !== fb) {
        fbs[k] = fb;
        panel.style.setProperty("--e2-fill-b", String(fb));
      }
    };

    /* ---- the rt stack timers (§9 R21) — unchanged ---- */
    const updateStackTimers = (dt: number) => {
      const vh = window.innerHeight;
      const rm = reduced();
      for (let k = 0; k < ENGINE_COUNT; k++) {
        const r = svisuals[k]!.getBoundingClientRect();
        const visible = r.top < vh * 0.75 && r.bottom > vh * 0.25;
        if (visible) {
          selapsed[k] += dt;
          if (selapsed[k] >= CAROUSEL_MS * 0.6) primeStack(k);
          if (selapsed[k] >= CAROUSEL_MS) {
            selapsed[k] -= CAROUSEL_MS;
            ssubs[k] = 1 - ssubs[k];
            setStackState(k, ssubs[k]);
          }
        }
        let f = Math.max(0, Math.min(1, selapsed[k] / CAROUSEL_MS));
        if (rm) f = 0;
        if (ssubs[k] === 0) setSIndicator(k, f, 0, 0);
        else setSIndicator(k, 1, 1, f);
      }
    };

    /* ---- the base/rs swipe (§9 R21) — unchanged ---- */
    let sdrag: {
      k: number;
      x0: number;
      y0: number;
      locked: boolean;
      lastX: number;
      lastT: number;
      vx: number;
      dx: number;
    } | null = null;

    const onSPointerDown = (e: PointerEvent) => {
      if (mode !== "swipe" || sdrag) return;
      const k = svisuals.findIndex((v) => v === e.currentTarget);
      if (k < 0) return;
      sdrag = {
        k,
        x0: e.clientX,
        y0: e.clientY,
        locked: false,
        lastX: e.clientX,
        lastT: e.timeStamp,
        vx: 0,
        dx: 0,
      };
    };

    const onSPointerMove = (e: PointerEvent) => {
      if (!sdrag || mode !== "swipe") return;
      const d = sdrag;
      if (e.currentTarget !== svisuals[d.k]) return;
      const dx = e.clientX - d.x0;
      const dy = e.clientY - d.y0;
      if (!d.locked) {
        if (Math.abs(dx) >= SWIPE_LOCK_PX && Math.abs(dx) > Math.abs(dy)) {
          d.locked = true;
          try {
            svisuals[d.k]!.setPointerCapture(e.pointerId);
          } catch {
            /* a detached or synthetic pointer — the drag still runs */
          }
          svisuals[d.k]!.setAttribute("data-drag", "");
          primeStack(d.k);
        } else if (Math.abs(dy) > SWIPE_LOCK_PX * 1.5) {
          sdrag = null; /* a vertical scroll — cede to the page */
          return;
        } else {
          return;
        }
      }
      const dms = e.timeStamp - d.lastT;
      if (dms > 0) d.vx = (e.clientX - d.lastX) / dms;
      d.lastX = e.clientX;
      d.lastT = e.timeStamp;
      d.dx = dx;
      const p = Math.max(
        0,
        Math.min(1, sslides[d.k] - (strideS ? dx / strideS : 0)),
      );
      const q = sslides[d.k] === 0 ? p : 1 - p;
      if (!reduced()) scrubStack(d.k, q, sslides[d.k] === 0 ? 1 : -1);
      setSIndicator(d.k, 1, 1, p);
    };

    const onSPointerEnd = (e: PointerEvent) => {
      if (!sdrag) return;
      const d = sdrag;
      sdrag = null;
      if (e.currentTarget !== svisuals[d.k]) return;
      svisuals[d.k]!.removeAttribute("data-drag");
      if (!d.locked || mode !== "swipe") return;
      const commit =
        Math.abs(d.dx) >= strideS * SWIPE_COMMIT_FRAC ||
        Math.abs(d.vx) >= SWIPE_FLICK_VX;
      let target = sslides[d.k];
      if (commit) {
        const dir =
          Math.abs(d.vx) >= SWIPE_FLICK_VX
            ? d.vx < 0
              ? 1
              : -1
            : d.dx < 0
              ? 1
              : -1;
        target = Math.max(0, Math.min(1, sslides[d.k] + dir));
      }
      svisuals[d.k]!.style.setProperty(
        "--e2-sdir",
        String(sslides[d.k] === 0 ? 1 : -1),
      );
      clearScrub(d.k);
      sslides[d.k] = target;
      ssubs[d.k] = target;
      setStackState(d.k, target);
      setSIndicator(d.k, 1, 1, target);
    };

    /* ---- the rAF clock (distance mapping + idle cycle) ---- */
    let raf = 0;
    let running = false;
    let lastTs = 0;
    let lastS = 0;

    const clampState = (v: number) =>
      Math.max(0, Math.min(STATE_COUNT - 1, v));

    const update = (now: number) => {
      const dt = lastTs ? Math.min(DT_MAX_MS, now - lastTs) : 0;
      lastTs = now;
      if (mode === "timer") {
        updateStackTimers(dt);
        return;
      }
      if (!active) return;
      const s = window.scrollY - d0;
      const moving = Math.abs(s - lastS) >= IDLE_EPS_PX;
      lastS = s;

      let next = state;
      if (moving) {
        /* the distance mapping: ten stops, one per drawing. Hysteresis
           commits a neighbor only past 0.6 of a half-stride from the
           current state's center; a jump past 1.5 goes straight to
           the nearest state (teleports, fast flicks). */
        const raw = s / halfP;
        if (Math.abs(raw - state) > JUMP) {
          next = clampState(Math.round(raw));
        } else if (raw > state + HYST) {
          next = clampState(state + 1);
        } else if (raw < state - HYST) {
          next = clampState(state - 1);
        }
        if (next !== state) elapsed = 0;
      } else {
        /* idle — the a↔b cycle continues from the mapped state */
        elapsed += dt;
        if (elapsed >= CAROUSEL_MS) {
          elapsed -= CAROUSEL_MS;
          const engine = Math.floor(state / 2);
          next = engine * 2 + (1 - (state % 2));
        }
      }
      setState(next);

      /* the dots and the indicator ride the state's engine/sub */
      const engine = Math.floor(state / 2);
      const sub = state % 2;
      let f = Math.max(0, Math.min(1, elapsed / CAROUSEL_MS));
      if (reduced()) f = 0;
      for (let j = 0; j < ENGINE_COUNT; j++) {
        setLit(j, j <= engine);
        if (j !== engine) setIndicator(j, 0, 0, 0);
        else if (sub === 0) setIndicator(j, f, 0, 0);
        else setIndicator(j, 1, 1, f);
      }
    };

    const frame = (now: number) => {
      update(now);
      raf = running ? requestAnimationFrame(frame) : 0;
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0; /* no dt jump across a gap */
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    /* the clock runs only while the section is near the viewport */
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
    if (active) lastS = window.scrollY - d0;

    sdrawings.forEach((pair) =>
      pair.forEach((el) => el.addEventListener("transitionend", onLeaveEnd)),
    );
    svisuals.forEach((v) => {
      v!.addEventListener("pointerdown", onSPointerDown);
      v!.addEventListener("pointermove", onSPointerMove);
      v!.addEventListener("pointerup", onSPointerEnd);
      v!.addEventListener("pointercancel", onSPointerEnd);
    });

    return () => {
      stop();
      observer.disconnect();
      ro.disconnect();
      drawings.forEach((d) => d.removeEventListener("transitionend", onLeaveEnd));
      sdrawings.forEach((pair) =>
        pair.forEach((el) => el.removeEventListener("transitionend", onLeaveEnd)),
      );
      svisuals.forEach((v) => {
        v!.removeEventListener("pointerdown", onSPointerDown);
        v!.removeEventListener("pointermove", onSPointerMove);
        v!.removeEventListener("pointerup", onSPointerEnd);
        v!.removeEventListener("pointercancel", onSPointerEnd);
      });
    };
  }, []);

  return <span ref={ref} hidden />;
}
