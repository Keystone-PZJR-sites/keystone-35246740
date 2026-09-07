"use client";

/** v2 sections — the engine section's carousel island (spec 020 §6, as
 * re-ruled 2026-09-06 — §9 R24 distance-mapped free scroll, tuned the
 * same evening — §9 R25: scroll-only at rd, the 25/75 lap).
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
 *   special-cased). The boundaries sit at HYST from each state's
 *   center (0.5 since §9 R25 — swaps fire at 25% and 75% of each
 *   lap, symmetric both directions); a jump past 1.5 half-strides
 *   (teleport, anchor jump, fast flick) goes straight to the
 *   nearest state.
 *
 * - **No clock (§9 R25).** The rd construction has no auto
 *   progression — R24's idle cycle is deleted and scroll is the
 *   whole interaction. The 05a→05b boundary is biased early
 *   (LAST_BOUNDARY) so the last b lands just past the Engagement
 *   rest instead of deep in the release. The indicator reads the
 *   drawn slide-start keyframes discretely — slide a is the minimum
 *   dot on track one, slide b is track one full beside track two's
 *   minimum dot; no fill ever animates a countdown.
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
 * - **The indicator (§6.2 as re-read — the redrawn keyframes, read
 *   discretely since §9 R25).** Two tracks per panel, one per
 *   illustration (--e2-fill-a/-b; --e2-fb-on mounts the b fill). At
 *   slide a the active panel holds slide1-start (the minimum dot on
 *   track one — the resting look; the lit dot carries the active
 *   distinction); at slide b it holds slide2-start (track one full,
 *   track two's minimum dot).
 *
 * - **Reduced motion (§9 R5/R19).** The structure stands — swaps and
 *   dot hues render instantly (CSS kills the transitions). The
 *   indicator is already discrete; with no snap and no clock there
 *   is nothing else to still.
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
/** the stack carousels' timer (rt — §9 R21). The rd construction has
 * NO clock since §9 R25 — scroll is its whole interaction. */
const CAROUSEL_MS = 5000;
/** hysteresis, in half-stride units — the boundary between neighbor
 * states sits this far from the current state's center (§9 R24;
 * tuned 0.6 → 0.5 by §9 R25 — the 25/75 lap: a→b fires a quarter of
 * the way into the travel toward the next engine, the handoff at
 * three quarters) */
const HYST = 0.5;
/** the 05a→05b boundary, in half-stride units past the Engagement
 * rest (§9 R25) — biased early so the last b lands before the pin's
 * release progresses (≈100px at 1344; the fraction rides the tick).
 * One value both directions — the boundary moves, never inverts. */
const LAST_BOUNDARY = 0.3;
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

    /* ---- the indicator (§6.2 as re-read — discrete since §9 R25):
       two tracks per panel. fa/fb ∈ [0,1] map to the drawn 6 → 24
       growth; fbOn mounts the b fill (the drawn slide1-* variants
       carry none). At rd only the drawn slide-start keyframes render:
       slide a = the minimum dot (the resting look), slide b = track
       one full + track two's minimum dot. The rt stacks still ride
       their timer through the same setter. ---- */
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

    /* ---- the rAF clock (§9 R24/R25: the distance mapping is the
       whole rd interaction — read-only on scroll, no writes, no
       auto progression) ---- */
    let raf = 0;
    let running = false;
    let lastTs = 0;

    const clampState = (v: number) => Math.max(0, Math.min(STATE_COUNT - 1, v));

    /* the boundary positions, in raw (half-stride) units: the
       boundary between i and i+1 sits at i + HYST both directions
       (the 25/75 lap, §9 R25); the last boundary (05a↔05b) is
       biased early to LAST_BOUNDARY past the Engagement rest — the
       boundary MOVES, it never inverts, so both directions agree */
    const upAt = (i: number) =>
      i === STATE_COUNT - 2 ? i + LAST_BOUNDARY : i + HYST;
    const downAt = (i: number) =>
      i === STATE_COUNT - 1 ? i - 1 + LAST_BOUNDARY : i - HYST;

    const update = (now: number) => {
      const dt = lastTs ? Math.min(DT_MAX_MS, now - lastTs) : 0;
      lastTs = now;
      if (mode === "timer") {
        updateStackTimers(dt);
        return;
      }
      if (!active) return;
      const s = readS();

      /* the distance mapping (§9 R24, tuned §9 R25): ten stops, one
         per drawing; a jump past 1.5 half-strides goes straight to
         the nearest state */
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

      /* the dots and the discrete indicator (§9 R25 — the drawn
         slide-start keyframes; no fill ever animates a countdown) */
      const engine = Math.floor(state / 2);
      const sub = state % 2;
      for (let j = 0; j < ENGINE_COUNT; j++) {
        setLit(j, j <= engine);
        if (j !== engine) setIndicator(j, 0, 0, 0);
        else if (sub === 0) setIndicator(j, 0, 0, 0);
        else setIndicator(j, 1, 1, 0);
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
