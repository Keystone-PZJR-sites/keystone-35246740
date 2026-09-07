"use client";

/** v2 sections — the engine section's carousel island (spec 020 §6, as
 * re-ruled 2026-09-06 — §9 R24: the DISTANCE-MAPPED free scroll).
 *
 * The section's one client island. The server render is the complete
 * structure — sticky slug, sticky stage holding 01a, the left column
 * in plain native flow. The island NEVER writes scroll (§9 R24: the
 * R20 paged clamp, the gesture-end snap glide, and all their input
 * listeners are deleted — scroll is native and free through the whole
 * section, the ElevenLabs contract). It drives the §6 mapping on one
 * rAF clock:
 *
 * - **The distance mapping (§9 R24).** The stage has TEN scroll
 *   stops, one per drawing: state = round(s / halfStride) over the
 *   ten states, where halfStride is half an engine's 6t panel. Each
 *   engine's `a` shows while its copy is aligned with the stage
 *   (s ≈ k·panel) and its `b` shows mid-travel to the next engine,
 *   so one pass plays all ten drawings as a stepped sequence on the
 *   standing blur + rise grammar (§9 R3 — one grammar, never
 *   special-cased). Hysteresis commits a neighbor only past 0.6 of a
 *   half-stride from the current state's center, so resting near a
 *   boundary never flutters; a jump past 1.5 half-strides (teleport,
 *   anchor jump, fast flick) goes straight to the nearest state.
 *
 * - **The idle timer (§9 R24, carrying R19's clock).** While the
 *   scroll is idle the a↔b cycle continues from whatever state the
 *   mapping chose — flip within the current engine's pair every
 *   CAROUSEL_MS. The clock accumulates frame deltas, never
 *   wall-clock stamps (a backgrounded tab cannot jump a swap), and
 *   pauses off-screen (the rAF gate). Distance mapping runs only on
 *   moving frames, so a timer flip is not immediately reverted; the
 *   first moving frame hands control back to distance.
 *
 * - **The geometry (§9 R23 carried forward, per-frame).** s derives
 *   from rendered positions every frame — the pin line prefers the
 *   stage's rendered sticky pixel whenever it is pinned (Safari
 *   renders the pinned calc a pixel off its computed value); the
 *   computed top is the flow-state fallback. Per-frame reads replace
 *   R23's gesture-end re-measure (the free contract has no gesture
 *   ends), so late layout settling above the section can never leave
 *   the mapping on a stale origin.
 *
 * - **States and swaps.** The swap itself is CSS (the
 *   --motion-stage-* grammar); the island only moves
 *   data-active/data-leaving, clearing the leaving state on
 *   transitionend (events, not timers). Adjacent states decode-prime
 *   so a swap never reveals an undecoded drawing (§7). The island
 *   also lights each panel's dot (data-lit) as its engine becomes
 *   active (§9 R16); the hue transition itself is CSS.
 *
 * - **The indicator (§6.2 as re-read — the redrawn keyframes).**
 *   Two tracks per panel, one per illustration; the active track's
 *   fill rides the idle clock continuously from the drawn 6px
 *   minimum to the full 24 (--e2-fill-a/-b; --e2-fb-on mounts the b
 *   fill). Resting panels hold the drawn slide1-start.
 *
 * - **Reduced motion (§9 R5/R19).** The structure stands — swaps and
 *   dot hues render instantly (CSS kills the transitions) and the
 *   fill quantizes state-to-state. With no snap there is nothing
 *   else to still.
 *
 * Short viewports need nothing here (§9 R4): the stage top-anchors
 * and the fold crops passively.
 *
 * - **The stacks (base/rs/rt — §5 as re-ruled, §9 R21/R22).** Below
 *   the rd1 gate the same island drives the stack visuals' two-state
 *   carousels, unchanged by R24. At rt each panel's illustration
 *   auto-progresses on the CAROUSEL_MS clock (a↔b loop, the blur +
 *   rise grammar, the vertical indicator riding the timer) — a
 *   panel's clock counts only while its visual is substantially in
 *   view. At base/rs the user swipes the visual between the two
 *   states: a pointer drag with a horizontal intent lock scrubs the
 *   stage grammar LATERALLY (§9 R22), the b track's fill rides the
 *   drag from an empty rest, and the release commits past the swipe
 *   threshold (or a flick), the CSS stage clock settling the
 *   drawings and the fill together. The mode is the container's
 *   width (never matchMedia), re-armed by the ResizeObserver.
 */

import { useEffect, useRef } from "react";

/* ---- §6 constants (§9 R7 marks the QA-tunable ones) ---- */

/** one panel height, ticks (§1) — one engine's scroll stride */
const PANEL_T = 6;
const ENGINE_COUNT = 5;
const STATE_COUNT = 10;
/** the idle-cycle timer — while the scroll is idle the shown state
 * flips within its engine pair on this clock (§9 R19/R24) */
const CAROUSEL_MS = 5000;
/** per-frame scroll delta under which the page counts as idle and the
 * timer runs (§9 R24) */
const IDLE_EPS_PX = 0.5;
/** hysteresis, in half-stride units — a neighbor state commits only
 * past this distance from the current state's center (§9 R24; the
 * 40/60 bands — QA-tunable) */
const HYST = 0.6;
/** raw-index distance past which the mapping jumps straight to the
 * nearest state — teleports, anchor jumps, fast flicks (§9 R24) */
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

    /* ---- geometry and mode (re-measured on resize; s itself derives
       per frame — §9 R23/R24) ---- */
    let active = false;
    /** which construction the island drives (§9 R21) — the container
     * is the truth */
    let mode: "io" | "timer" | "swipe" = "io";
    let halfP = 0; // one stage stop — half an engine stride
    let cssPin = 0; // the computed pin line (the flow-state fallback)
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
        halfP = (PANEL_T * (section.clientWidth / 12)) / 2;
        cssPin = parseFloat(getComputedStyle(stage).top) || 0;
      } else {
        strideS = svisuals[0]?.clientWidth || 0;
      }
    };

    /** the column's travel past the engine-1 rest, from RENDERED
     * positions (§9 R23 carried into R24, per-frame): the pin line
     * prefers the stage's rendered sticky pixel whenever it is
     * pinned — Safari renders the pinned calc a pixel off its
     * computed value; the computed top is the flow-state fallback.
     * Per-frame reads make stale-geometry drift impossible. */
    const readS = () => {
      const stageTop = stage.getBoundingClientRect().top;
      const pinLine = Math.abs(stageTop - cssPin) <= 2 ? stageTop : cssPin;
      return pinLine - body.getBoundingClientRect().top;
    };

    /* ---- states and swaps ---- */
    let state = drawings.findIndex((d) => d.hasAttribute("data-active"));
    if (state < 0) state = 0;
    /** the drawing currently holding data-active */
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

    /* every swap — mapping steps and timer flips — is the one
       blur + rise grammar (§9 R3) */
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

    /* ---- the lit dots (§9 R16): a panel's dot takes its engine hue
       as its engine becomes active; upcoming panels hold the drawn
       bg/400 gray; symmetric on reverse ---- */
    const lits = new Array<boolean | null>(ENGINE_COUNT).fill(null);

    const setLit = (k: number, lit: boolean) => {
      if (lits[k] === lit) return;
      lits[k] = lit;
      if (lit) panels[k].setAttribute("data-lit", "");
      else panels[k].removeAttribute("data-lit");
    };

    /* ---- the indicator (§6.2 as re-read — §9 R19): two tracks per
       panel; the fills ride the idle clock. fa/fb ∈ [0,1] map to the
       drawn 6 → 24 growth; fbOn mounts the b fill (the drawn
       slide1-* variants carry none). Resting panels hold
       slide1-start. ---- */
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

    /* ---- the base/rs swipe (§9 R21/R22): pointer drag with a
       horizontal intent lock; the track and the b fill follow the
       finger 1:1; the release commits past the threshold or on a
       flick, and the CSS stage clock settles both ---- */
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

    /* ---- the rAF clock (§9 R24: distance mapping + idle cycle —
       read-only on scroll, no writes ever) ---- */
    let raf = 0;
    let running = false;
    let lastTs = 0;
    let lastS = 0;

    const clampState = (v: number) => Math.max(0, Math.min(STATE_COUNT - 1, v));

    const update = (now: number) => {
      const dt = lastTs ? Math.min(DT_MAX_MS, now - lastTs) : 0;
      lastTs = now;
      if (mode === "timer") {
        updateStackTimers(dt);
        return;
      }
      if (!active) return;
      const s = readS();
      const moving = Math.abs(s - lastS) >= IDLE_EPS_PX;
      lastS = s;

      let next = state;
      if (moving) {
        /* the distance mapping (§9 R24): ten stops, one per drawing;
           hysteresis holds the current state inside its 60% band; a
           jump past 1.5 half-strides goes straight to the nearest
           state */
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
        /* idle — the a↔b cycle continues from the mapped state
           (§9 R19's clock riding R24's mapping) */
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
    if (active) lastS = readS();

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
