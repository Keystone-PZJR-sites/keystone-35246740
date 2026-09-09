"use client";

/** v2 sections — the engine section's carousel island (spec 020 §6, as
 * re-ruled 2026-09-06 — §9 R24 distance-mapped free scroll, tuned the
 * same evening — §9 R25: scroll-only at rd, the 25/75 lap; the stack
 * bands re-ruled 2026-09-08 — §9 R28: the gesture-gated hijack).
 *
 * The section's one client island. The server render is the complete
 * structure — sticky slug, sticky stage holding 01a, the left column
 * in plain native flow. The island NEVER writes scroll on the mapping
 * (§9 R24: the R20 paged clamp, the gesture-end snap glide, and all
 * their input listeners are deleted — scroll is native and free
 * through the whole section, the ElevenLabs contract; the one scroll
 * write is the nav's engine-anchor jump, a navigation — §9 R26). It
 * drives the §6 mapping on one rAF clock:
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
 *   rest instead of deep in the release.
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
 * - **The indicator (§6.2 as redrawn 2026-09-08 — §9 R28).** Two 8Ø
 *   dots per panel, discrete — the drawn slide-1/slide-2 variants:
 *   dot one always inked, dot two takes the seen ink while the
 *   visual rests on `b`. The island only toggles data-slide="b";
 *   the inks and the transition are CSS. No fill ever animates.
 *
 * - **Reduced motion (§9 R5/R19/R28).** The structure — the mapping
 *   and the stack's gesture gating — stands; swaps and dot hues
 *   render instantly (CSS kills the transitions). The indicator is
 *   discrete by construction.
 *
 * Short viewports need nothing here (§9 R4): the stage top-anchors
 * and the fold crops passively.
 *
 * - **The stacks (base/rs/rt — §5 as re-ruled 2026-09-08, §9 R28).**
 *   Below the rd1 gate the same island drives ONE gesture-gated
 *   scroll hijack at every band (the R21 rt timer and the R21/R22
 *   base/rs swipe are deleted). Scrolling toward a panel whose
 *   visual rests on the travel direction's far state catches the
 *   scroll once the visual's center enters the viewport's catch
 *   band: the island consumes wheel/touch gestures while caught —
 *   it never writes scroll. The catching gesture's remainder is
 *   consumed; the next gesture fires the timed swap toward the
 *   direction's state (the one blur + rise grammar, the vertical
 *   axis at every band — the R22 lateral wipe retired with the
 *   swipe); the gesture after that releases. Symmetric on reverse
 *   (a panel resting on `b` catches an upward pass and steps b→a);
 *   a panel already resting on the direction's state never catches;
 *   both section ends exit free. Keyboard scrolling, scrollbar
 *   drags, and teleports/anchor jumps are never intercepted (any
 *   real scroll while caught releases the catch — the safety
 *   valve). The mode is the container's construction (never
 *   matchMedia), re-armed by the ResizeObserver.
 */

import { useEffect, useRef } from "react";

/* ---- §6 constants (§9 R7 marks the QA-tunable ones) ---- */

/** one panel height, ticks (§1) — one engine's scroll stride */
const PANEL_T = 6;
const ENGINE_COUNT = 5;
const STATE_COUNT = 10;
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
/** the stack hijack's catch band (§9 R28, the R7 QA-tunable class):
 * a panel catches while its visual's center sits inside this
 * viewport fraction */
const CATCH_LO = 0.25;
const CATCH_HI = 0.75;
/** wheel events further apart than this are separate gestures
 * (§9 R28, the same class) — the R20 burst vocabulary */
const GESTURE_GAP_MS = 180;
/** the safety valve's grace, ms (§9 R28, the same class): a scroll
 * event within this window of a consumed gesture event is the
 * catching burst's own tail (pre-catch deltas, momentum settling) —
 * only scrolls past it release the catch (scrollbar, keyboard,
 * navigations) */
const VALVE_GRACE_MS = 250;

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

    /* ---- the discrete slide indicator (§6.2 as redrawn — §9 R28):
       data-slide="b" mounts the slide-2 look; the inks are CSS ---- */
    const setSlide = (el: HTMLElement, b: boolean) => {
      if (b) el.setAttribute("data-slide", "b");
      else el.removeAttribute("data-slide");
    };

    /* ---- the stack carousels (§5 as re-ruled — §9 R28) ---- */
    /** per-panel resting slide (0 = a, 1 = b) */
    const sslides = new Array<number>(ENGINE_COUNT).fill(0);
    const sshown = new Array<number>(ENGINE_COUNT).fill(0);
    const sprimed = new Set<number>();

    const primeStack = (k: number) => {
      if (sprimed.has(k)) return;
      sprimed.add(k);
      const img = sdrawings[k][1].querySelector("img");
      img?.decode().catch(() => {
        /* decode is a hint */
      });
    };

    /* the stack swap — the one blur + rise grammar (§9 R3/R28) */
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

    /* ---- the gesture-gated hijack (§5/§6 as re-ruled — §9 R28).
       Catch → the next gesture swaps → the gesture after releases;
       symmetric on reverse; consumes gestures, never writes scroll.
       Only wheel and touch are gestures — keyboard, scrollbar, and
       programmatic scrolls stay free (any real scroll while caught
       releases). ---- */
    let caught: { k: number; gestureId: number } | null = null;
    let gestureId = 0;
    let lastWheelT = 0;
    let lastGestureT = 0;
    let touchY: number | null = null;

    const release = () => {
      caught = null;
    };

    /** the panel to catch on a gesture in `dir` (+1 down / −1 up):
     * its visual's center inside the catch band and the direction's
     * target state unseen at rest */
    const catchable = (dir: 1 | -1) => {
      const vh = window.innerHeight;
      const target = dir > 0 ? 1 : 0;
      for (let k = 0; k < ENGINE_COUNT; k++) {
        if (sslides[k] === target) continue;
        const r = svisuals[k]!.getBoundingClientRect();
        if (r.height === 0) continue;
        const c = r.top + r.height / 2;
        if (c > vh * CATCH_LO && c < vh * CATCH_HI) return k;
      }
      return -1;
    };

    /** one gesture event (already assigned to gestureId). Returns
     * whether the event is consumed. */
    const gesture = (dir: 1 | -1) => {
      if (!caught) {
        const k = catchable(dir);
        if (k < 0) return false;
        caught = { k, gestureId };
        primeStack(k);
        return true;
      }
      if (gestureId === caught.gestureId) return true; /* same burst */
      const target = dir > 0 ? 1 : 0;
      if (sslides[caught.k] !== target) {
        /* the swap gesture — step toward the direction's state and
           keep consuming this burst */
        sslides[caught.k] = target;
        setStackState(caught.k, target);
        setSlide(spanels[caught.k], target === 1);
        caught.gestureId = gestureId;
        return true;
      }
      /* the release gesture — the direction's state already rests;
         let the burst scroll natively */
      release();
      return false;
    };

    const onWheel = (e: WheelEvent) => {
      if (mode !== "hijack") return;
      if (e.deltaY === 0) return;
      if (e.timeStamp - lastWheelT > GESTURE_GAP_MS) gestureId++;
      lastWheelT = e.timeStamp;
      if (gesture(e.deltaY > 0 ? 1 : -1)) {
        lastGestureT = e.timeStamp;
        e.preventDefault();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (mode !== "hijack") return;
      gestureId++;
      touchY = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (mode !== "hijack" || touchY === null) return;
      const y = e.touches[0]?.clientY;
      if (y === undefined) return;
      const dy = touchY - y; /* finger up = scroll down */
      touchY = y;
      if (dy === 0) return;
      if (gesture(dy > 0 ? 1 : -1)) {
        lastGestureT = e.timeStamp;
        if (e.cancelable) e.preventDefault();
      }
    };

    const onTouchEnd = () => {
      touchY = null;
    };

    /* the safety valve: a real scroll while caught is a scrollbar
       drag, a keyboard scroll, or a navigation — never trap those.
       The grace window keeps the catching burst's own tail (pre-catch
       deltas, momentum settling) from tripping it. */
    const onScroll = () => {
      if (caught && performance.now() - lastGestureT > VALVE_GRACE_MS) {
        release();
      }
    };

    /** a mode change re-arms the stacks at the drawn rest (slide a,
     * dot two unseen — the server defaults) */
    const resetStack = () => {
      release();
      for (let k = 0; k < ENGINE_COUNT; k++) {
        sslides[k] = 0;
        setStackState(k, 0);
        sdrawings[k][1].removeAttribute("data-leaving");
        setSlide(spanels[k], false);
      }
    };

    /* ---- geometry and mode (re-measured on resize; s itself derives
       per frame — §9 R23/R24) ---- */
    let active = false;
    /** which construction the island drives (§9 R21/R28) — the
     * container's construction is the truth: the interactive stage
     * above the 860 gate, the hijacked stack below it */
    let mode: "io" | "hijack" = "io";
    let halfP = 0; // one stage stop — half an engine stride
    let cssPin = 0; // the computed pin line (the flow-state fallback)

    const measure = () => {
      active = io.offsetParent !== null;
      const prev = mode;
      mode = active ? "io" : "hijack";
      if (mode !== prev) resetStack();
      if (active) {
        halfP = (PANEL_T * (section.clientWidth / 12)) / 2;
        cssPin = parseFloat(getComputedStyle(stage).top) || 0;
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

    /* every swap — mapping steps and hijack steps — is the one
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

    /* the rd panels' slide looks, cached against attribute churn */
    const rdSlides = new Array<boolean | null>(ENGINE_COUNT).fill(null);
    const setRdSlide = (k: number, b: boolean) => {
      if (rdSlides[k] === b) return;
      rdSlides[k] = b;
      setSlide(panels[k], b);
    };

    /* ---- the rAF clock (§9 R24/R25: the distance mapping is the
       whole rd interaction — read-only on scroll, no writes, no
       auto progression; the hijack is event-driven, so the stack
       bands need no frame work) ---- */
    let raf = 0;
    let running = false;

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

    const update = () => {
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

      /* the dots and the discrete two-dot indicator (§9 R25/R28) */
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

    /* ---- the nav's engine anchors (owner direction 2026-09-08 — §9
       amendment). The anchor ids live on the STACK panels; at the rd
       bands those are display:none, so the browser cannot place the
       jump itself. The island scrolls the column so the target
       engine's panel rests at the pin line (s = k·stride) — the
       mapping's JUMP path then resolves the state to the engine's `a`
       drawing. This is the one place the island writes scroll (§9
       R24's free contract governs the mapping, not a navigation):
       once per arrival hash and per same-page subnav click, never per
       frame. ---- */
    const jumpToHash = () => {
      if (mode !== "io") return; /* native anchors serve the stacks */
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

    sdrawings.forEach((pair) =>
      pair.forEach((el) => el.addEventListener("transitionend", onLeaveEnd)),
    );
    /* the hijack's gesture listeners — non-passive so a caught burst
       can be consumed (§9 R28); scroll is the passive safety valve */
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stop();
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener("hashchange", jumpToHash);
      drawings.forEach((d) => d.removeEventListener("transitionend", onLeaveEnd));
      sdrawings.forEach((pair) =>
        pair.forEach((el) => el.removeEventListener("transitionend", onLeaveEnd)),
      );
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <span ref={ref} hidden />;
}
