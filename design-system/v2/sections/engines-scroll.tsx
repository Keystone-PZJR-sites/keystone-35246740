"use client";

/** v2 sections — the engine section's scroll island (spec 020 §6, as
 * amended 2026-09-06 — §9 R14/R15).
 *
 * The section's one client island. The server render is the complete
 * fluid structure (sticky slug, sticky stage holding 01a, the flow
 * column); marking the section ready (data-e2-ready) turns the
 * column's wrapper into a sticky, clipped 7t window and gives the
 * body its explicit 51t scroll budget. From there the island drives
 * the §6 contract on one rAF clock:
 *
 * - **The mapping (§9 R15 — the compositor construction).** The
 *   document coordinate `s` measures from the 01a rest. Each engine
 *   strides 10t — a 4t runway then a 6t free travel. While pinned the
 *   column is never in native flow: the sticky window holds it on the
 *   compositor (a runway cannot jitter the panels — the earlier
 *   flow-plus-compensation construction stuttered because native
 *   scroll paints a frame ahead of a main-thread counter-transform),
 *   and the island translates the column inside the window through
 *   the free travels only, where nothing pinned exists to lag
 *   against. No-JS keeps the plain flow (every engine's copy
 *   reachable, the stage holding 01a — §9 R6). A scroll position
 *   restored below the section is compensated by the ready
 *   construction's added budget so the restore lands where it was.
 *
 * - **States and swaps (§9 R16 — the timed grammar everywhere).**
 *   state = f(s), document-keyed: inside a runway the a→b swap fires
 *   once, entirely, at the plateau midpoint (the owner's ruling — a
 *   started transition never stalls; the scrubbed variant felt
 *   stodgy and was superseded the same day it landed). Engine
 *   handoffs fire as the incoming panel's top crosses the stage top
 *   line (HANDOFF_LEAD_T tunes it, §9 R7). The swap itself is CSS
 *   (the --motion-stage-* grammar); the island only moves
 *   data-active/data-leaving, clearing the leaving state on
 *   transitionend (events, not timers). Adjacent states decode-prime
 *   so a swap never reveals an undecoded drawing (§7 as amended).
 *   The island also lights each panel's dot (data-lit) as it reaches
 *   the active slot — upcoming panels hold the drawn bg/400 gray
 *   (§9 R16); the hue transition itself is CSS.
 *
 * - **Snap (completion only — §9 R14/R17: no bounce, no
 *   auto-advance).** A gesture ending inside a runway (± the capture
 *   margin) parks at the CURRENT state's rest; the state itself only
 *   changes at the raised trigger, so a momentum overshoot past a
 *   fresh rest settles back invisibly (everything is pinned through
 *   a runway — no panel ever moves against the user). The glide runs
 *   on the carousel-snap clock (--motion-snap-dur/-ease — alias,
 *   never fork) and cedes to any external scroll. Free segments
 *   carry no snap.
 *
 * - **The indicator (§6.2).** The active panel's overlay fill rides
 *   the runway progress continuously (--e2-fill); the arrangement
 *   swaps at the b rest (data-bc). Passed engines hold the b
 *   arrangement; upcoming engines the a arrangement.
 *
 * - **Reduced motion (§9 R5).** The structure stands — pin, snap,
 *   mapping are navigation. The indicator fill quantizes at the
 *   runway midpoint (state-to-state), swaps and the dot hues render
 *   instantly (CSS kills the transitions), and snap glides land
 *   instantly.
 *
 * Short viewports need nothing here (§9 R4): the stage top-anchors
 * and the fold crops passively; the mapping is document-keyed.
 * Below the rd1 gate the interactive construction is display-gated
 * away and the island idles; a ResizeObserver re-arms it when the
 * band returns (never matchMedia — the container is the truth).
 */

import { useEffect, useRef } from "react";

/* ---- §6 constants (ticks; §9 R7 marks the QA-tunable ones) ---- */

/** one panel height (§1) */
const PANEL_T = 6;
/** one a→b runway plateau (§9 R7) */
const RUNWAY_T = 4;
/** one engine's scroll stride */
const STRIDE_T = PANEL_T + RUNWAY_T;
const ENGINE_COUNT = 5;
const STATE_COUNT = 10;
/** the scroll budget the ready construction adds over the flow render
 * (five 4t runways — engines.css carries the matching 51t body) */
const READY_BUDGET_T = RUNWAY_T * ENGINE_COUNT;
/** handoff threshold offset from the stage top line, ticks — positive
 * fires the incoming engine early. Tuned to 2t at build QA (§9
 * R7/R18, owner ruling): the b→a crossfade starts while the incoming
 * panel is still two ticks from its rest, so the stage resolves
 * roughly as the column settles instead of after it. */
const HANDOFF_LEAD_T = 2;
/** the runway fraction that must be crossed before the a→b swap
 * fires — and symmetrically (1 − frac) for b→a on reverse; between
 * the two triggers the current state holds (hysteresis), so a
 * momentum overshoot past a fresh rest never auto-advances
 * (§9 R7/R17) */
const SWAP_TRIGGER_FRAC = 0.65;
/** gesture-end capture margin around a runway, ticks (§9 R7) */
const SNAP_MARGIN_T = 0.5;
/** scroll-idle gap that ends a gesture where scrollend is unsupported */
const SCROLL_IDLE_MS = 120;

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
    const col = section.querySelector<HTMLElement>(".e2-col");
    const stage = section.querySelector<HTMLElement>(".e2-stage");
    const panels = [...section.querySelectorAll<HTMLElement>(".e2-panel")];
    const drawings = [...section.querySelectorAll<HTMLElement>(".e2-drawing")];
    if (
      !io ||
      !body ||
      !col ||
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

    /* ---- geometry (document-keyed §6; re-measured on resize) ---- */
    let active = false;
    let t = 0;
    let strideP = 0;
    let runwayP = 0;
    let panelP = 0;
    let d0 = 0; // scrollY at the 01a rest

    const measure = () => {
      active = io.offsetParent !== null;
      if (!active) return;
      t = section.clientWidth / 12;
      strideP = STRIDE_T * t;
      runwayP = RUNWAY_T * t;
      panelP = PANEL_T * t;
      const pinLine = parseFloat(getComputedStyle(stage).top) || 0;
      /* the body is plain flow (never sticky), so its top is the
         stable anchor: the assembly pins when it reaches the line */
      d0 = body.getBoundingClientRect().top + window.scrollY - pinLine;
    };

    /* switch on the ready construction; keep a restored below-section
     * scroll position visually unmoved (the body grows above it). The
     * attribute deliberately survives cleanup: re-running the effect
     * (Strict Mode, HMR) must not re-compensate the scroll. */
    const arm = () => {
      measure();
      if (!active || section.hasAttribute("data-e2-ready")) return;
      const sectionBottom = section.getBoundingClientRect().bottom + window.scrollY;
      section.setAttribute("data-e2-ready", "");
      if (window.scrollY > sectionBottom) {
        window.scrollBy(0, READY_BUDGET_T * t);
      }
      measure();
    };

    /* ---- state and swaps ---- */
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

    /* the timed grammar (rests and free-segment handoffs) */
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

    /* ---- the indicator (§6.2) ---- */
    const fills = new Array<number>(ENGINE_COUNT).fill(-1);
    const arrangements = new Array<string>(ENGINE_COUNT).fill("");

    const setIndicator = (k: number, arrangement: "a" | "b", fill: number) => {
      const panel = panels[k];
      if (arrangements[k] !== arrangement) {
        arrangements[k] = arrangement;
        if (arrangement === "b") panel.setAttribute("data-bc", "b");
        else panel.removeAttribute("data-bc");
      }
      if (fills[k] !== fill) {
        fills[k] = fill;
        panel.style.setProperty("--e2-fill", String(fill));
      }
    };

    /* the a/b sub-state for a runway position (§9 R17): the swap
       fires past the raised trigger, symmetric on reverse; between
       the two triggers the current state holds (hysteresis). Shared
       by the rAF update and the gesture-end completion — the
       completion must derive from the live position, never the
       possibly frame-stale state (scrollend can beat the frame). */
    const subFor = (u: number, engine: number): number => {
      const trig = runwayP * SWAP_TRIGGER_FRAC;
      if (u >= trig) return 1;
      if (u <= runwayP - trig) return 0;
      if (Math.floor(state / 2) === engine) return state % 2;
      return u < runwayP / 2 ? 0 : 1;
    };

    /* ---- the snap glide (completion only — §9 R14/R15/R17) ---- */
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

    const onSnapCancel = () => cancelSnap();

    const trySnap = () => {
      if (!active || snapRaf) return;
      const s = window.scrollY - d0;
      const margin = SNAP_MARGIN_T * t;
      for (let i = 0; i < ENGINE_COUNT; i++) {
        const a = strideP * i;
        const b = a + runwayP;
        if (s > a - margin && s < b + margin) {
          /* park at the trigger-resolved state's rest (§9 R17) — a
             fresh a rest is never auto-advanced, and the settle is
             invisible while pinned (the column is compositor-locked
             through a runway, so no panel ever moves against the
             user — §9 R14's no-bounce holds) */
          const target = subFor(s - a, i) === 1 ? b : a;
          if (Math.abs(target - s) > 1) glideTo(d0 + target);
          return;
        }
      }
    };

    /* gesture end: native scrollend where present, idle-debounce
     * fallback elsewhere (a debounce interval — not a sync wait) */
    const hasScrollEnd = "onscrollend" in window;
    let idleTimer = 0;
    const onScroll = () => {
      if (hasScrollEnd) return;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(trySnap, SCROLL_IDLE_MS);
    };
    const onScrollEnd = () => trySnap();

    /* ---- the rAF clock ---- */
    let raf = 0;
    let running = false;
    let appliedY = 0;

    const update = () => {
      if (!active) return;
      const s = window.scrollY - d0;

      /* the column inside its sticky window: translated up one
         panel-height per completed free travel, 1:1 through the
         current one, held through runways (§6 as amended) */
      let travel = 0;
      for (let i = 0; i < ENGINE_COUNT - 1; i++) {
        travel += Math.min(panelP, Math.max(0, s - (strideP * i + runwayP)));
      }
      if (travel !== appliedY) {
        appliedY = travel;
        col.style.transform =
          travel === 0 ? "" : `translate3d(0, ${-travel}px, 0)`;
      }

      /* the state (§6 as amended, §9 R16/R17): the timed swap fires
         once, entirely, past the raised trigger; between the two
         triggers the current state holds (hysteresis), so arriving
         at a rest never auto-advances; handoffs at the stage top
         line (+ the tunable lead) */
      let engine = Math.floor((s + HANDOFF_LEAD_T * t) / strideP);
      engine = Math.max(0, Math.min(ENGINE_COUNT - 1, engine));
      const u = s - engine * strideP;
      const rm = reduced();
      const trig = runwayP * SWAP_TRIGGER_FRAC;
      setState(engine * 2 + subFor(u, engine));

      /* the dots and the indicator */
      for (let k = 0; k < ENGINE_COUNT; k++) {
        setLit(k, k <= engine);
        if (k < engine) setIndicator(k, "b", 0);
        else if (k > engine) setIndicator(k, "a", 0);
        else if (u >= runwayP) setIndicator(k, "b", 0);
        else {
          let f = Math.max(0, Math.min(1, u / runwayP));
          if (rm) f = u >= trig ? 1 : 0;
          setIndicator(k, "a", f);
        }
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
      arm();
      if (active) update();
    });
    ro.observe(section);

    arm();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("wheel", onSnapCancel, { passive: true });
    window.addEventListener("touchstart", onSnapCancel, { passive: true });
    window.addEventListener("keydown", onSnapCancel);

    return () => {
      stop();
      cancelSnap();
      window.clearTimeout(idleTimer);
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("wheel", onSnapCancel);
      window.removeEventListener("touchstart", onSnapCancel);
      window.removeEventListener("keydown", onSnapCancel);
      drawings.forEach((d) => d.removeEventListener("transitionend", onLeaveEnd));
      col.style.transform = "";
      /* data-e2-ready stays — see arm() */
    };
  }, []);

  return <span ref={ref} hidden />;
}
