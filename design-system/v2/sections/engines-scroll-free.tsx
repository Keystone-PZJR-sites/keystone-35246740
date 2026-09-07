"use client";

/** SANDBOX — the engine carousel island with a FREE scroll contract.
 *
 * An experiment fork of engines-scroll.tsx (spec 020 island), built to
 * test the ElevenLabs-Studio-style free scroll against our stage
 * grammar: the left column rides native document scroll with NO paged
 * clamp, NO gesture-end snap, and NO scroll writes of any kind — one
 * gesture can travel the whole section. The stage still crossfades on
 * the --motion-stage-* grammar at every midpoint crossing, the dots
 * still light, and the a↔b carousel timer still runs — but the timer
 * counts whenever the scroll is IDLE (Studio never parks you exactly
 * on a rest, so settled-on-rest would starve it).
 *
 * Mounted ONLY by engines-free.tsx on /engines-free. The canonical
 * paged island (engines-scroll.tsx, §9 R20) is untouched; if this
 * contract is ever adopted it lands as a dated spec 020 §9 entry, not
 * an edit here.
 *
 * Unchanged from the canonical island: the stack constructions below
 * the rd1 gate (rt timer, base/rs swipe — §9 R21/R22), the indicator
 * fills, decode priming, reduced motion, and the rAF gate.
 */

import { useEffect, useRef } from "react";

/* ---- §6 constants (the paged-contract constants deleted) ---- */

/** one panel height, ticks (§1) — also one engine's scroll stride */
const PANEL_T = 6;
const ENGINE_COUNT = 5;
const STATE_COUNT = 10;
/** the illustration timer — each state holds this long while the
 * scroll is idle before the swap fires (free-contract variant of §9
 * R19's settled-rest clock) */
const CAROUSEL_MS = 5000;
/** per-frame scroll delta under which the page counts as idle and the
 * timer runs (the free contract's replacement for SETTLE_EPS_PX) */
const IDLE_EPS_PX = 0.5;
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

export function EnginesFreeScroll() {
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

    /* ---- the stack carousels (§5 as re-ruled, §9 R21) ---- */
    /** per-panel a/b sub-state (rt timer), shown drawing, clock */
    const ssubs = new Array<number>(ENGINE_COUNT).fill(0);
    const sshown = new Array<number>(ENGINE_COUNT).fill(0);
    const selapsed = new Array<number>(ENGINE_COUNT).fill(0);
    /** per-panel resting slide (base/rs swipe) */
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

    /* the stack swap — the one blur grammar (§9 R3; the axis is the
       band's — vertical at rt, lateral below the gate) */
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

    /* the swipe's mid-drag scrub (§9 R22) */
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

    /** a mode change re-arms the stacks at the drawn rest (slide a,
     * track one full — the server defaults) */
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
    /** which construction the island drives (§9 R21) — the container
     * is the truth */
    let mode: "io" | "timer" | "swipe" = "io";
    let t = 0;
    let panelP = 0;
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
        panelP = PANEL_T * t;
        const pinLine = parseFloat(getComputedStyle(stage).top) || 0;
        d0 = body.getBoundingClientRect().top + window.scrollY - pinLine;
      } else {
        strideS = svisuals[0]?.clientWidth || 0;
      }
    };

    /* ---- states and swaps ---- */
    let state = drawings.findIndex((d) => d.hasAttribute("data-active"));
    if (state < 0) state = 0;
    /** the drawing currently holding data-active */
    let shown: number | null = state;
    /** the active engine (nearest rest) and its a/b sub-state */
    let engine = Math.floor(state / 2);
    let sub = state % 2;
    /** the timer — accumulated idle milliseconds toward the swap */
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

    /* every swap — timer expiries and engine handoffs — is the one
       blur + rise grammar (§9 R3) */
    const setState = (next: number) => {
      state = next;
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

    /* ---- the rt stack timers (§9 R21) ---- */
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
        if (rm) f = 0; /* quantized — the fill jumps at the swap */
        if (ssubs[k] === 0) setSIndicator(k, f, 0, 0);
        else setSIndicator(k, 1, 1, f);
      }
    };

    /* ---- the base/rs swipe (§9 R21) ---- */
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

    /* ---- the rAF clock (the free contract: read-only on scroll) ---- */
    let raf = 0;
    let running = false;
    let lastTs = 0;
    let lastS = 0;

    const update = (now: number) => {
      const dt = lastTs ? Math.min(DT_MAX_MS, now - lastTs) : 0;
      lastTs = now;
      if (mode === "timer") {
        updateStackTimers(dt);
        return;
      }
      if (!active) return;
      const s = window.scrollY - d0;

      /* the free contract: never write scroll — no clamp, no snap.
         The active engine is simply the nearest rest (midpoint
         crossing), updated live while the user travels. */
      const k = Math.max(0, Math.min(ENGINE_COUNT - 1, Math.round(s / panelP)));
      if (k !== engine) {
        engine = k;
        sub = 0;
        elapsed = 0;
      }

      /* the timer counts while the scroll is idle — free scroll
         rarely parks exactly on a rest, so idle replaces settled */
      const idle = Math.abs(s - lastS) < IDLE_EPS_PX;
      lastS = s;
      if (idle) {
        elapsed += dt;
        if (elapsed >= CAROUSEL_MS) {
          elapsed -= CAROUSEL_MS;
          sub = 1 - sub;
        }
      }
      setState(engine * 2 + sub);

      /* the dots and the indicator */
      let f = Math.max(0, Math.min(1, elapsed / CAROUSEL_MS));
      if (reduced()) f = 0; /* quantized — the fill jumps at the swap */
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
