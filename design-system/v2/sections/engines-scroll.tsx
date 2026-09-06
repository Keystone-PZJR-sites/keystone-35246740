"use client";

/** v2 sections — the engine section's carousel island (spec 020 §6, as
 * re-ruled 2026-09-06 — §9 R19: the auto-transitioning carousel).
 *
 * The section's one client island. The server render is the complete
 * structure — sticky slug, sticky stage holding 01a, the left column
 * in plain native flow (the R15 compositor window is deleted with the
 * runways; with no plateaus the scroll mapping is 1:1 everywhere and
 * the column needs no transform, so no-JS and JS render the same
 * document). The island drives the §6 contract on one rAF clock:
 *
 * - **The timer (§9 R19).** Once the section pins and an engine is
 *   settled at its rest, a CAROUSEL_MS clock runs; at expiry the
 *   stage swaps to the other illustration on the standing blur + rise
 *   grammar, and the cycle LOOPS (a → b → a → …) until the user
 *   scrolls. The clock pauses while the engine is off its rest (and
 *   while the section is off-screen — the rAF gate) and accumulates
 *   frame deltas, never wall-clock stamps, so a backgrounded tab
 *   cannot jump a swap.
 *
 * - **States and swaps.** The active engine is the nearest rest
 *   (midpoint crossing — under the paged clamp at most one boundary
 *   away, so the stage crossfades once per gesture, mid-glide). An
 *   engine change always resets its cycle to the `a` illustration
 *   with a fresh timer (§9 R19 — revisits reset, one behavior
 *   everywhere).
 *   The swap itself is CSS (the --motion-stage-* grammar); the island
 *   only moves data-active/data-leaving, clearing the leaving state
 *   on transitionend (events, not timers). Adjacent states
 *   decode-prime so a swap never reveals an undecoded drawing (§7).
 *   The island also lights each panel's dot (data-lit) as it reaches
 *   the active slot — upcoming panels hold the drawn bg/400 gray
 *   (§9 R16); the hue transition itself is CSS.
 *
 * - **Snap (paged — §9 R20, superseding R19's nearest-rest glide).**
 *   One gesture moves at most one engine. Every burst of scroll
 *   activity has an origin rest; the scroll clamps at the adjacent
 *   rest in each direction until the burst ends (the R13 stop-always
 *   semantics, re-ruled back for the carousel), and the burst's end
 *   glides to the adjacent rest in the gesture's direction — any
 *   travel past the small commit threshold advances (no bounce,
 *   §9 R14) — or back to the origin under it. Entry is pronounced:
 *   a scroll-through catches at the first rest (the clamp) and a
 *   gesture ending within the capture margin above the pin glides
 *   in. Both ends exit free (Brand up, Engagement down) — the
 *   section never traps the scroll. The glide runs on the
 *   carousel-snap clock (--motion-snap-dur/-ease — alias, never
 *   fork) and cedes to any external scroll; a teleport (anchor jump,
 *   find-in-page — a frame delta past one panel) re-origins without
 *   clamping.
 *
 * - **The indicator (§6.2 as re-read — the 877:98990 keyframes).**
 *   Two tracks per panel, one per illustration; the active track's
 *   fill rides the timer continuously from the drawn 6px minimum to
 *   the full 24 (--e2-fill-a/-b; --e2-fb-on mounts the b fill — the
 *   drawn slide1-* variants carry none). Resting panels hold the
 *   drawn slide1-start (the minimum dot on track one).
 *
 * - **Reduced motion (§9 R5/R19).** The structure stands and the
 *   timer keeps running — the stage is decorative and the copy never
 *   moves. Swaps and dot hues render instantly (CSS kills the
 *   transitions), the fill quantizes state-to-state, and snap glides
 *   land instantly.
 *
 * Short viewports need nothing here (§9 R4): the stage top-anchors
 * and the fold crops passively.
 *
 * - **The stacks (base/rs/rt — §5 as re-ruled, §9 R21).** Below the
 *   rd1 gate the same island drives the stack visuals' two-state
 *   carousels. At rt each panel's illustration auto-progresses on the
 *   same CAROUSEL_MS clock (a↔b loop, the blur + rise grammar, the
 *   vertical indicator riding the timer) — a panel's clock counts
 *   only while its visual is substantially in view. At base/rs the
 *   user swipes the visual between the two states: a pointer drag
 *   with a horizontal intent lock (touch-action pan-y keeps vertical
 *   scroll native) scrubs the stage grammar LATERALLY (§9 R22 — the
 *   blur + slight lateral wipe, kin to the larger bands' rise; never
 *   a full-width slide), the b track's fill rides the drag progress
 *   from an empty rest (no minimum dot below the gate — §9 R22), and
 *   the release commits past the swipe threshold (or a flick), the
 *   CSS stage clock settling the drawings and the fill together. The
 *   mode is the container's width (never matchMedia — the container
 *   is the truth), re-armed by the ResizeObserver.
 */

import { useEffect, useRef } from "react";

/* ---- §6 constants (§9 R7 marks the QA-tunable ones) ---- */

/** one panel height, ticks (§1) — also one engine's scroll stride */
const PANEL_T = 6;
const ENGINE_COUNT = 5;
const STATE_COUNT = 10;
/** the illustration timer — each state holds this long at a settled
 * rest before the swap fires (§9 R19, owner ruling) */
const CAROUSEL_MS = 5000;
/** how far off its rest an engine may sit while the timer still
 * counts, px (§9 R7) */
const SETTLE_EPS_PX = 2;
/** the capture margin past the section's two ends, ticks — a gesture
 * ending inside it snaps (the pronounced entry pull; §9 R7/R20) */
const CAPTURE_T = 1.5;
/** the gesture-end commit threshold, ticks — net travel past it
 * advances one engine in the gesture's direction; under it the
 * gesture settles back to its origin rest (§9 R7/R20) */
const COMMIT_T = 0.25;
/** scroll-idle gap that ends a gesture where scrollend is unsupported */
const SCROLL_IDLE_MS = 120;
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

/** cubic-bezier solver for the snap glide (the token's curve, applied
 * to document scroll, which CSS transitions cannot drive) */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const xAt = (u: number) => ((ax * u + bx) * u + cx) * u;
  const yAt = (u: number) => ((ay * u + by) * u + cy) * u;
  return (x: number) => {
    let lo = 0;
    let hi = 1;
    let u = x;
    for (let i = 0; i < 24; i++) {
      const cur = xAt(u);
      if (Math.abs(cur - x) < 1e-4) break;
      if (cur < x) lo = u;
      else hi = u;
      u = (lo + hi) / 2;
    }
    return yAt(u);
  };
}

export function EnginesScroll() {
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

    /* the snap clock — the carousel snap grammar's tokens (alias) */
    const styles = getComputedStyle(section);
    const snapDur = parseFloat(styles.getPropertyValue("--motion-snap-dur")) || 450;
    const easeMatch = styles
      .getPropertyValue("--motion-snap-ease")
      .match(/cubic-bezier\(([^)]+)\)/);
    const easeArgs: [number, number, number, number] = easeMatch
      ? (easeMatch[1].split(",").map(parseFloat) as [number, number, number, number])
      : [0.45, 0.05, 0.15, 1];
    const snapEase = cubicBezier(...easeArgs);

    /* the stage grammar's values — the swipe scrubs them laterally
       (§9 R22; the CSS carries the settled states) */
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

    /* the swipe's mid-drag scrub (§9 R22): the stage grammar's values
       ride the drag's away-ness inline; the release clears them and
       the CSS transitions carry the settle */
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
    let travelP = 0; // four inter-engine travels — the section's budget
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
        travelP = (ENGINE_COUNT - 1) * panelP;
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
    /** the timer — accumulated settled milliseconds toward the swap */
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

    /* ---- the lit dots (§9 R16): a panel's dot takes its engine hue
       as it reaches the active slot; upcoming panels hold the drawn
       bg/400 gray; symmetric on reverse ---- */
    const lits = new Array<boolean | null>(ENGINE_COUNT).fill(null);

    const setLit = (k: number, lit: boolean) => {
      if (lits[k] === lit) return;
      lits[k] = lit;
      if (lit) panels[k].setAttribute("data-lit", "");
      else panels[k].removeAttribute("data-lit");
    };

    /* ---- the indicator (§6.2 as re-read — §9 R19): two tracks per
       panel; the fills ride the timer. fa/fb ∈ [0,1] map to the drawn
       6 → 24 growth; fbOn mounts the b fill (the drawn slide1-*
       variants carry none). Resting panels hold slide1-start. ---- */
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

    /* ---- the snap glide (burst end — §9 R20) ---- */
    let snapRaf = 0;

    const cancelSnap = () => {
      if (snapRaf) cancelAnimationFrame(snapRaf);
      snapRaf = 0;
    };

    const glideTo = (targetY: number) => {
      cancelSnap();
      if (reduced()) {
        window.scrollTo(0, targetY);
        return;
      }
      const fromY = window.scrollY;
      if (Math.abs(targetY - fromY) < 1) return;
      const start = performance.now();
      let lastWritten = fromY;
      const step = (now: number) => {
        /* an external actor moved the scroll (anchor jump, keyboard,
           find-in-page) — cede immediately, never fight it */
        if (Math.abs(window.scrollY - lastWritten) > 2) {
          snapRaf = 0;
          return;
        }
        const p = Math.min(1, (now - start) / snapDur);
        lastWritten = fromY + (targetY - fromY) * snapEase(p);
        window.scrollTo(0, lastWritten);
        snapRaf = p < 1 ? requestAnimationFrame(step) : 0;
      };
      snapRaf = requestAnimationFrame(step);
    };

    /* ---- the paged gesture model (§9 R20): every burst of scroll
       activity has an ORIGIN rest (−1 above the section · 0–4 ·
       5 below); the clamp window is one engine each way, open-ended
       past the section's two ends (free exits) ---- */
    let origin = -1;
    let burst = false;
    let s0 = 0; // s at the burst's start
    let lastS = 0; // previous frame's s (teleport detection, burst s0)

    const originFor = (s: number) =>
      s < -SETTLE_EPS_PX
        ? -1
        : s > travelP + SETTLE_EPS_PX
          ? ENGINE_COUNT
          : Math.max(0, Math.min(ENGINE_COUNT - 1, Math.round(s / panelP)));

    /* a user input begins a burst and cancels any running glide */
    const onGestureStart = () => {
      cancelSnap();
      if (!burst) {
        burst = true;
        s0 = window.scrollY - d0;
      }
    };

    /* the burst's end: commit one engine in the gesture's direction
       (past the threshold; no bounce — §9 R14/R20), settle back to
       the origin under it, or exit free past the section's ends */
    const onGestureEnd = () => {
      if (!burst) return;
      burst = false;
      if (!active || snapRaf) return;
      const s = window.scrollY - d0;
      const capture = CAPTURE_T * t;
      if (s < -capture || s > travelP + capture) {
        origin = originFor(s);
        return;
      }
      const net = s - s0;
      const dir = Math.abs(net) < COMMIT_T * t ? 0 : Math.sign(net);
      let target: number | null;
      if (origin === -1) {
        target = dir > 0 ? 0 : null; // pull in from above; free exit up
      } else if (origin === ENGINE_COUNT) {
        target = dir < 0 ? ENGINE_COUNT - 1 : null; // pull in from below
      } else {
        const next = origin + dir;
        target = next >= 0 && next < ENGINE_COUNT ? next : null; // free exits
      }
      if (target === null) {
        origin = originFor(s);
        return;
      }
      origin = target;
      const ty = target * panelP;
      if (Math.abs(ty - s) > 1) glideTo(d0 + ty);
    };

    /* burst delimiting: native scrollend where present, idle-debounce
     * fallback elsewhere (a debounce interval — not a sync wait); a
     * scroll with no input event (scrollbar drag) opens a burst from
     * the previous frame's position */
    const hasScrollEnd = "onscrollend" in window;
    let idleTimer = 0;
    const onScroll = () => {
      if (!burst && !snapRaf) {
        burst = true;
        s0 = lastS;
      }
      if (hasScrollEnd) return;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(onGestureEnd, SCROLL_IDLE_MS);
    };
    const onScrollEnd = () => onGestureEnd();

    /* ---- the rt stack timers (§9 R21): each visual's clock counts
       only while it is substantially in view; expiry swaps on the one
       grammar and loops; the vertical indicator rides the clock ---- */
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

    /* ---- the base/rs swipe (§9 R21): pointer drag with a horizontal
       intent lock; the track and the b fill follow the finger 1:1;
       the release commits past the threshold or on a flick, and the
       CSS snap clock settles both ---- */
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
      /* p is the b-ness (the fill), q the away-ness from the resting
         slide; the lateral direction is the gesture's — forward from
         a, backward from b (two slides, §9 R22) */
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
      /* the gesture's lateral axis for the settle (the CSS grammar's
         --e2-sdir), then hand the scrubbed values to the transitions:
         data-drag is already off, the inline scrub clears, and the
         drawings and the fill settle on the stage clock (instant
         under reduced motion) */
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

    /* ---- the rAF clock ---- */
    let raf = 0;
    let running = false;
    let lastTs = 0;

    const update = (now: number) => {
      const dt = lastTs ? Math.min(DT_MAX_MS, now - lastTs) : 0;
      lastTs = now;
      if (mode === "timer") {
        updateStackTimers(dt);
        return;
      }
      if (!active) return;
      let s = window.scrollY - d0;

      /* a teleport (anchor jump, find-in-page, restored position) —
         re-origin without clamping, never fight it (§9 R20) */
      if (Math.abs(s - lastS) > panelP) {
        burst = false;
        origin = originFor(s);
      } else if (burst && !snapRaf) {
        /* the paged clamp (§9 R20): a burst holds inside its window —
           one engine each way from the origin, open past the ends */
        const lo = origin - 1 >= 0 ? (origin - 1) * panelP : -Infinity;
        const hi = origin + 1 < ENGINE_COUNT ? (origin + 1) * panelP : Infinity;
        if (s > hi) {
          window.scrollTo(0, d0 + hi);
          s = hi;
        } else if (s < lo) {
          window.scrollTo(0, d0 + lo);
          s = lo;
        }
      }
      lastS = s;

      /* the active engine is the nearest rest (midpoint crossing);
         any engine change resets the cycle to `a` with a fresh timer
         (§9 R19 — handoffs and revisits alike) */
      const k = Math.max(0, Math.min(ENGINE_COUNT - 1, Math.round(s / panelP)));
      if (k !== engine) {
        engine = k;
        sub = 0;
        elapsed = 0;
      }

      /* the timer counts only while the engine is settled on its rest
         (the pre-pin approach, mid-travel, and the released tail all
         pause it); expiry swaps and loops (§9 R19) */
      const settled = Math.abs(s - engine * panelP) <= SETTLE_EPS_PX;
      if (settled) {
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

    /* the clock runs only while the section is near the viewport —
       the timer pauses with it */
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
    if (active) {
      lastS = window.scrollY - d0;
      origin = originFor(lastS);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("wheel", onGestureStart, { passive: true });
    window.addEventListener("touchstart", onGestureStart, { passive: true });
    window.addEventListener("keydown", onGestureStart);
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
      cancelSnap();
      window.clearTimeout(idleTimer);
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("wheel", onGestureStart);
      window.removeEventListener("touchstart", onGestureStart);
      window.removeEventListener("keydown", onGestureStart);
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
