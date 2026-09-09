"use client";

/** v2 sections — the engine section's carousel island (spec 020 §6, as
 * re-ruled 2026-09-06 — §9 R24 distance-mapped free scroll, tuned the
 * same evening — §9 R25: scroll-only at rd, the 25/75 lap).
 *
 * The island drives the INTERACTIVE construction only (rd1/rd2). Below
 * the rd1 gate the stacks are static (§5 as re-ruled — §9 R30: the R28
 * gesture hijack is pulled, the owner's ruling; the visuals rest on the
 * drawn `a` with the two-dot indicator at slide-1, born settled, and no
 * gesture listener exists at any band — a new small-band contract is a
 * future ruling).
 *
 * The server render is the complete structure — sticky slug, sticky
 * stage holding 01a, the left column in plain native flow. The island
 * NEVER writes scroll on the mapping (§9 R24: the R20 paged clamp, the
 * gesture-end snap glide, and all their input listeners are deleted —
 * scroll is native and free through the whole section, the ElevenLabs
 * contract; the one scroll write is the nav's engine-anchor jump, a
 * navigation — §9 R26). It drives the §6 mapping on one rAF clock:
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
 * - **The indicator (§6.2 as redrawn 2026-09-08 — §9 R28/R29).** Two
 *   8 dots per panel, discrete — viewed square, upcoming round. The
 *   island only toggles data-slide="b" on the active rd panel while
 *   its `b` drawing shows; the shapes, inks, and the transition are
 *   CSS. No fill ever animates. The stack indicators rest at the
 *   drawn slide-1 with nothing to drive them (§9 R30).
 *
 * - **Reduced motion (§9 R5/R19).** The structure stands — swaps and
 *   dot hues render instantly (CSS kills the transitions). The
 *   indicator is discrete by construction.
 *
 * Short viewports need nothing here (§9 R4): the stage top-anchors
 * and the fold crops passively.
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

    /* ---- geometry (re-measured on resize; s itself derives per
       frame — §9 R23/R24). `active` is the construction truth: the
       interactive stage renders above the 860 gate, the static stack
       below it (§9 R30 — nothing to drive there). ---- */
    let active = false;
    let halfP = 0; // one stage stop — half an engine stride
    let cssPin = 0; // the computed pin line (the flow-state fallback)

    const measure = () => {
      active = io.offsetParent !== null;
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

    /* every mapping step is the one blur + rise grammar (§9 R3) */
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

    /* ---- the discrete slide indicator (§6.2 as redrawn — §9
       R28/R29): data-slide="b" mounts the slide-2 look on the active
       panel; the looks are CSS, cached against attribute churn ---- */
    const rdSlides = new Array<boolean | null>(ENGINE_COUNT).fill(null);
    const setRdSlide = (k: number, b: boolean) => {
      if (rdSlides[k] === b) return;
      rdSlides[k] = b;
      if (b) panels[k].setAttribute("data-slide", "b");
      else panels[k].removeAttribute("data-slide");
    };

    /* ---- the rAF clock (§9 R24/R25: the distance mapping is the
       whole rd interaction — read-only on scroll, no writes, no
       auto progression) ---- */
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
      if (!active) return; /* native anchors serve the stacks */
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
