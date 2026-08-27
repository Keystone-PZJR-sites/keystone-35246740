"use client";

/** v2 sections — the testimonials block island (spec 009 §7).
 *
 * Owns the entrance observer and beats, the strip track, the dwell
 * timer, the clones' wrap, and the decode priming. Geometry stays
 * CSS-driven: the island writes `--tst-offset` on the track and state
 * attributes on the section; the per-band mode, pitch, gate fraction,
 * and dwell are read from computed style, keeping the stylesheets
 * their single source.
 *
 * Behavior:
 * - Entrance (§7.1): plays once per page view when the content block
 *   (the grid at rd2, the strip elsewhere) reaches the promoted gate
 *   fraction — its own observer, the 007 §9 R20/R22 mechanics. Every
 *   participant runs the unchanged fade-rise grammar; beats land at
 *   i × the promoted stagger, and an image's beat fires at
 *   max(scheduled delay, decode complete) so a beat never lifts over
 *   undecoded pixels. The island marks the section settled on the
 *   final beat's animationend (002.r1 — the settle contract), so
 *   resizing across the 1130 gate never replays the entrance.
 *   data-entered guards re-runs, including scroll re-entry.
 * - Rotation (§7.3): one pitch per beat on the carousel-slide grammar,
 *   right→left, dwell --tst-dwell. The timer runs only while the strip
 *   intersects the viewport and the document is visible; hover over
 *   the strip (hover-capable media) or focus inside the section holds
 *   the dwell and resumes with a full dwell on leave (the WCAG 2.2.2
 *   pause affordance); an arrow press slides immediately, queues at
 *   most one ahead, and resets the phase — any touch on the strip
 *   resets the phase too. No timer ever runs at rd2.
 * - The seamless clone loop (§7.3, the 007 §9 R19 mechanics): offset
 *   walks 0..COUNT over the three aria-hidden tail clones; forward
 *   past the last position slides onto the visually identical clone
 *   frame and snaps home without transition; back from the start
 *   snaps to the clone frame first, then slides.
 * - The hover shadow's slide suppression (§7.2): data-sliding drops
 *   the shadow at once when a slide starts; it may grow again only
 *   after the track lands.
 * - Reduced motion (§7.4): no entrance (elements born settled), no
 *   timers ever, navigation snaps with a modular wrap (no clone
 *   traversal). v2:replay (dev) resets to the at-rest state; the
 *   island reports timer state through v2:tst-timer for the /
 *   testimonials readout.
 */

import { useEffect, useRef, type ReactNode } from "react";

export function TestimonialsBlock({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const section = root?.closest<HTMLElement>(".v2-tst");
    const track = root?.querySelector<HTMLElement>(".tst-track");
    const win = root?.querySelector<HTMLElement>(".tst-window");
    if (!root || !section || !track || !win) return;

    const header = section.querySelector<HTMLElement>(".tst-header");
    const photos = [...track.querySelectorAll<HTMLElement>(".tst-slide:not(.tst-clone) .tst-photo")];
    const cards = [...track.querySelectorAll<HTMLElement>(".tst-slide:not(.tst-clone) .tst-card")];
    const parts = [header, ...photos, ...cards].filter((el): el is HTMLElement => el !== null);
    const fwd = [...root.querySelectorAll<HTMLButtonElement>('.gbtn[data-direction="forward"]')];
    const back = [...root.querySelectorAll<HTMLButtonElement>('.gbtn[data-direction="back"]')];
    const COUNT = cards.length;

    const styles = getComputedStyle(track);
    const readNum = (name: string, fallback: number) => {
      const v = parseFloat(styles.getPropertyValue(name));
      return Number.isFinite(v) ? v : fallback;
    };
    /* strip | grid — the band's presentation, from the track's own CSS */
    const mode = () => styles.getPropertyValue("--_tst-mode").trim();

    const hoverable = window.matchMedia("(hover: hover)");
    const reduced = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      track.closest<HTMLElement>(".page")?.dataset.motion === "reduce";

    let offset = 0;
    let sliding = false;
    let queued: 1 | -1 | null = null;
    let entered = false;
    let settled = false;
    let inView = false;
    let hoverHeld = false;
    let focusHeld = false;
    let primed = false;
    let idleQueued = false;
    let cancelled = false;
    let lastBeat: HTMLElement | null = null;
    let dwellTimer: number | undefined;
    const beatTimers = new Set<number>();
    const pending = new Set<HTMLElement>();

    /* ---- the dwell timer (§7.3) ---- */

    const emitTimer = (state: "scheduled" | "cleared", delay?: number) => {
      window.dispatchEvent(new CustomEvent("v2:tst-timer", { detail: { state, delay } }));
    };

    const clearDwell = () => {
      if (dwellTimer === undefined) return;
      window.clearTimeout(dwellTimer);
      dwellTimer = undefined;
      emitTimer("cleared");
    };

    /* no timer at rd2, out of viewport, hidden, held, before the
       entrance settles, or under reduced motion — ever */
    const canRun = () =>
      settled &&
      mode() === "strip" &&
      inView &&
      !document.hidden &&
      !hoverHeld &&
      !focusHeld &&
      !reduced();

    /* every (re)schedule is one full dwell — the phase-reset rule */
    const scheduleDwell = () => {
      clearDwell();
      if (!canRun()) return;
      const dwell = readNum("--tst-dwell", 6500);
      dwellTimer = window.setTimeout(autoBeat, dwell);
      emitTimer("scheduled", dwell);
    };

    const autoBeat = () => {
      dwellTimer = undefined;
      if (cancelled || !canRun()) return;
      slide(1);
      /* next beat one dwell after this one starts (the hero's rhythm) */
      scheduleDwell();
    };

    /* ---- the track and the clone loop (§7.3) ---- */

    const apply = () => track.style.setProperty("--tst-offset", String(offset));

    /* commit an offset without a visible move (the wrap, the replay,
       the reduced-motion modular snap) */
    const snapTo = (n: number) => {
      track.classList.add("tst-snap");
      offset = n;
      apply();
      void track.offsetWidth;
      track.classList.remove("tst-snap");
    };

    /* eager-flip and decode every remaining image (§5 priming; the
       clones share the cached URLs) */
    const prime = () => {
      if (primed) return;
      primed = true;
      for (const img of track.querySelectorAll("img")) {
        if (img.loading === "lazy") {
          img.loading = "eager";
          img.decode().catch(() => undefined);
        }
      }
    };

    const settlePart = (el: HTMLElement) => {
      delete el.dataset.reveal;
      pending.delete(el);
    };

    const markSettled = () => {
      if (settled) return;
      settled = true;
      section.dataset.settled = "";
      /* the first advance fires one dwell after the entrance settles */
      scheduleDwell();
    };

    /* navigation before the entrance settles the strip participants
       (off-screen slides render settled from the start — §7.1); the
       header keeps its beat. If the final beat is among them, the
       entrance has nothing left to end on — settle the section. */
    const settleSlideParts = () => {
      for (const el of [...pending]) {
        if (el !== header) settlePart(el);
      }
      if (entered && !settled && (lastBeat === null || !pending.has(lastBeat))) markSettled();
    };

    const slide = (dir: 1 | -1) => {
      if (cancelled || mode() !== "strip") return;
      if (reduced()) {
        /* modular wrap, no clone traversal (§7.4) */
        snapTo((offset + dir + COUNT) % COUNT);
        settleSlideParts();
        return;
      }
      if (sliding) {
        queued = dir;
        return;
      }
      prime();
      if (dir === -1 && offset === 0) snapTo(COUNT);
      offset += dir;
      sliding = true;
      /* the hover shadow drops at once while the track slides (§7.2) */
      section.dataset.sliding = "";
      apply();
      settleSlideParts();
    };

    const onTrackDone = (e: TransitionEvent) => {
      if (e.target !== track || e.propertyName !== "transform") return;
      sliding = false;
      /* the shadow may grow again only after the track lands */
      delete section.dataset.sliding;
      if (offset === COUNT) snapTo(0);
      if (queued !== null) {
        const q = queued;
        queued = null;
        slide(q);
      }
    };

    /* ---- the entrance (§7.1) ---- */

    const initReveal = () => {
      if (!reduced()) {
        for (const el of parts) {
          el.dataset.reveal = "pending";
          pending.add(el);
        }
      }
      /* at rd2 all six elements are at-rest visible: the third photo
         joins the eager set (§5) */
      if (mode() === "grid") {
        const img = photos[2]?.querySelector("img");
        if (img && img.loading === "lazy") img.loading = "eager";
      }
      /* lifts the pre-hydration guard (testimonials.css) */
      section.dataset.tstReady = "";
    };

    /* beat order (§7.1): header at 0; at rd2 the six elements in
       reading order (top edge, then left) — photo 01 · photo 02 ·
       green card · brown card · yellow card · photo 03; at the strip
       bands the at-rest visible elements left→right — the first
       photo, the first card, the next slide's sliver photo */
    const beats = (): [HTMLElement | null, number][] => {
      const [p1, p2, p3] = photos;
      const [green, brown, yellow] = cards;
      if (mode() === "grid") {
        return [
          [header, 0],
          [p1, 1],
          [p2, 2],
          [green, 3],
          [brown, 4],
          [yellow, 5],
          [p3, 6],
        ];
      }
      return [
        [header, 0],
        [p1, 1],
        [green, 2],
        [p2, 3],
      ];
    };

    const enter = () => {
      if (entered) return;
      entered = true;
      section.dataset.entered = "";
      const stagger = readNum("--motion-enter-stagger", 120);
      const plan = beats().filter(
        (b): b is [HTMLElement, number] => b[0] !== null && pending.has(b[0]),
      );
      /* participants outside this band's plan render settled */
      const planned = new Set(plan.map(([el]) => el));
      for (const el of [...pending]) {
        if (!planned.has(el)) settlePart(el);
      }
      lastBeat = plan.length ? plan[plan.length - 1][0] : null;
      if (lastBeat === null) {
        markSettled();
        return;
      }
      for (const [el, i] of plan) {
        const img = el.querySelector("img");
        const decoded = img ? img.decode().catch(() => undefined) : Promise.resolve();
        const scheduled = new Promise<void>((resolve) => {
          const t = window.setTimeout(resolve, i * stagger);
          beatTimers.add(t);
        });
        /* a beat never lifts over undecoded pixels: it fires at
           max(scheduled delay, decode complete) */
        Promise.all([decoded, scheduled]).then(() => {
          if (cancelled || !pending.has(el)) return;
          el.dataset.reveal = "rising";
        });
      }
    };

    const onRiseEnd = (e: AnimationEvent) => {
      if (e.animationName !== "tst-rise") return;
      const el = (e.target as HTMLElement).closest<HTMLElement>(".tst-part");
      if (!el || !pending.has(el)) return;
      const wasLast = el === lastBeat;
      settlePart(el);
      /* the island marks the section settled on the final beat's
         animationend (002.r1 — the settle contract) */
      if (wasLast) markSettled();
    };

    /* ---- observers ---- */

    /* the section-root observer (threshold 0): the timer runs only
       while the strip intersects the viewport; first intersection
       also queues the idle decode priming (§5) */
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[entries.length - 1];
        inView = e.isIntersecting;
        if (inView) {
          if (!idleQueued) {
            idleQueued = true;
            /* Safari has no requestIdleCallback — a short timeout
               stands in */
            if (typeof window.requestIdleCallback === "function") {
              window.requestIdleCallback(() => {
                if (!cancelled) prime();
              });
            } else {
              const t = window.setTimeout(() => {
                if (!cancelled) prime();
              }, 200);
              beatTimers.add(t);
            }
          }
          /* re-entry (or an entrance skipped by re-entry) reschedules
             at one full dwell */
          scheduleDwell();
        } else {
          clearDwell();
        }
      },
      { threshold: 0 },
    );

    /* the entrance gate: its own observer on the content block, at the
       promoted fractions. The band's live value is compared in the
       callback (`styles` is a live computed style); small epsilon —
       the crossing entry's ratio can land a float hair under the
       threshold. */
    const enterThresholds = [
      readNum("--motion-enter-frac-rm", 0.18),
      readNum("--motion-enter-frac", 0.25),
    ];
    const ioEnter = new IntersectionObserver(
      (entries) => {
        const e = entries[entries.length - 1];
        const gate = readNum("--_tst-enter", 0.25);
        if (e.intersectionRatio >= gate - 0.005 && !entered && !reduced()) enter();
      },
      { threshold: enterThresholds },
    );

    /* band switches re-evaluate the timer (container measurement,
       never matchMedia): rd2 clears it; a strip band resumes without
       resetting a running phase */
    const ro = new ResizeObserver(() => {
      if (mode() !== "strip") clearDwell();
      else if (dwellTimer === undefined) scheduleDwell();
    });

    /* ---- holds and resets (§7.3) ---- */

    const onPointerEnter = () => {
      if (!hoverable.matches) return;
      hoverHeld = true;
      clearDwell();
    };
    const onPointerLeave = () => {
      if (!hoverHeld) return;
      hoverHeld = false;
      scheduleDwell();
    };
    const onFocusIn = () => {
      focusHeld = true;
      clearDwell();
    };
    const onFocusOut = (e: FocusEvent) => {
      if (section.contains(e.relatedTarget as Node | null)) return;
      focusHeld = false;
      scheduleDwell();
    };
    /* any touch on the strip resets the phase */
    const onTouchStart = () => scheduleDwell();
    const onVisibility = () => {
      if (document.hidden) clearDwell();
      else scheduleDwell();
    };

    /* an arrow press slides immediately (queues at most one ahead)
       and resets the dwell phase */
    const onFwd = () => {
      slide(1);
      scheduleDwell();
    };
    const onBack = () => {
      slide(-1);
      scheduleDwell();
    };

    /* ---- dev replay (§8.6): reset to at-rest and let the gate
       observer re-fire with the current state ---- */

    const onReplay = () => {
      beatTimers.forEach((t) => window.clearTimeout(t));
      beatTimers.clear();
      clearDwell();
      pending.clear();
      queued = null;
      sliding = false;
      entered = false;
      settled = false;
      lastBeat = null;
      delete section.dataset.entered;
      delete section.dataset.settled;
      delete section.dataset.sliding;
      for (const el of parts) delete el.dataset.reveal;
      snapTo(0);
      initReveal();
      ioEnter.unobserve(win);
      ioEnter.observe(win);
      if (reduced()) markSettled();
    };

    initReveal();
    apply();
    /* reduced motion never animates an entrance — the section is born
       settled (timers stay off under the canRun guard) */
    if (reduced()) markSettled();

    fwd.forEach((b) => b.addEventListener("click", onFwd));
    back.forEach((b) => b.addEventListener("click", onBack));
    track.addEventListener("transitionend", onTrackDone);
    track.addEventListener("transitioncancel", onTrackDone);
    section.addEventListener("animationend", onRiseEnd);
    win.addEventListener("pointerenter", onPointerEnter);
    win.addEventListener("pointerleave", onPointerLeave);
    win.addEventListener("touchstart", onTouchStart, { passive: true });
    section.addEventListener("focusin", onFocusIn);
    section.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("v2:replay", onReplay);
    io.observe(section);
    ioEnter.observe(win);
    ro.observe(section);

    return () => {
      cancelled = true;
      beatTimers.forEach((t) => window.clearTimeout(t));
      beatTimers.clear();
      if (dwellTimer !== undefined) window.clearTimeout(dwellTimer);
      io.disconnect();
      ioEnter.disconnect();
      ro.disconnect();
      fwd.forEach((b) => b.removeEventListener("click", onFwd));
      back.forEach((b) => b.removeEventListener("click", onBack));
      track.removeEventListener("transitionend", onTrackDone);
      track.removeEventListener("transitioncancel", onTrackDone);
      section.removeEventListener("animationend", onRiseEnd);
      win.removeEventListener("pointerenter", onPointerEnter);
      win.removeEventListener("pointerleave", onPointerLeave);
      win.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("focusin", onFocusIn);
      section.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("v2:replay", onReplay);
      delete section.dataset.tstReady;
      delete section.dataset.entered;
      delete section.dataset.settled;
      delete section.dataset.sliding;
      for (const el of parts) delete el.dataset.reveal;
    };
  }, []);

  return (
    <div className="tst-block" ref={ref}>
      {children}
    </div>
  );
}
