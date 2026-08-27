"use client";

/** v2 sections — the engine row island (spec 008 §7).
 *
 * Owns the accordion spring, the carousel track, drag, and the decode
 * priming. Geometry stays CSS-driven: the island integrates the spring
 * per frame and writes one custom property per card (`--_f`) and one
 * on the track (`--eng-x`); the widths derive in CSS (normalized
 * flex shares — the five widths sum to the row's exact width at every
 * frame by construction), and every crossfade is a CSS function of the
 * card's own fraction (§7.2). Constants are read from computed style,
 * keeping the token layer their single source.
 *
 * The spring (§7.1): stiffness 210 · damping 24 · mass 1 (ζ ≈ 0.83 —
 * gentle start, peak velocity mid-travel, ≈1% overshoot, settles
 * ≈400ms). A retargetable spring with preserved velocity cannot be a
 * CSS transition or an existing ease, so the island integrates it —
 * the sanctioned exception to the no-hand-rolled-rAF rule, scoped to
 * this grammar (§7.1, approval covers it). Interruption retargets from
 * current position and velocity; nothing restarts, snaps, or reverses
 * discontinuously.
 *
 * The carousel (§7.4): the same spring drives the track to snap
 * positions; drag follows the finger 1:1 with overscroll resistance
 * past the ends, release snaps to the nearest position (biased one
 * position in the fling direction over the fling speed), handing the
 * release velocity to the spring. Bounded, no loop, no timers — the
 * section never moves on its own. Activation chrome transitions ride
 * the drawer tokens in CSS off data-active.
 *
 * Band detection is container measurement (ResizeObserver) reading
 * `--eng-mode` from computed style — never matchMedia (§8.2). A band
 * switch snaps state with no travel, so gate crossings never replay
 * motion (the 002.r1 settle contract's analogue for a JS-driven
 * grammar). Reduced motion (§7.5) switches state directly.
 */

import { useEffect, useRef, type ReactNode } from "react";

interface Spring {
  x: number;
  v: number;
  target: number;
}

export function EngineRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const section = root?.closest<HTMLElement>(".v2-engine");
    const row = root?.querySelector<HTMLElement>(".eng-row");
    const track = root?.querySelector<HTMLElement>(".eng-track");
    if (!root || !section || !row || !track) return;

    const cards = [...track.querySelectorAll<HTMLElement>(".eng-card")];
    const hits = cards.map((c) => c.querySelector<HTMLButtonElement>(".eng-hit"));
    const panels = cards.map((c) => c.querySelector<HTMLElement>(".eng-inner"));
    const crumbs = [...row.querySelectorAll<HTMLButtonElement>(".eng-crumb")];
    const COUNT = cards.length;

    const rowStyles = getComputedStyle(row);
    const readNum = (name: string, fallback: number) => {
      const v = parseFloat(rowStyles.getPropertyValue(name));
      return Number.isFinite(v) ? v : fallback;
    };

    const reduced = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      row.closest<HTMLElement>(".page")?.dataset.motion === "reduce";

    /* ---- state ---- */

    let active = Math.max(
      0,
      cards.findIndex((c) => c.dataset.active !== undefined),
    );
    let mode = "accordion";
    let pitch = 0;
    let raf = 0;
    let last = 0;
    let primed = false;
    let dragging = false;
    let suppressClick = false;

    const fractions: Spring[] = cards.map((_, i) => ({
      x: i === active ? 1 : 0,
      v: 0,
      target: i === active ? 1 : 0,
    }));
    const trackSpring: Spring = { x: 0, v: 0, target: 0 };

    /* ---- writes ---- */

    /* --_f drives the crossfades, fill, and radii; --_w is the
       normalized width share (Σ ≡ 10 by construction, so the
       line-inclusive boxes span exactly 10t + 1px at every frame,
       including interrupted transitions) */
    const writeFractions = () => {
      const sum = fractions.reduce((n, s) => n + 1 + 5 * s.x, 0);
      fractions.forEach((s, i) => {
        cards[i].style.setProperty("--_f", String(s.x));
        cards[i].style.setProperty("--_w", String((10 * (1 + 5 * s.x)) / sum));
      });
    };
    const writeTrack = () => {
      track.style.setProperty("--eng-x", `${trackSpring.x}px`);
    };

    /* ---- the spring integrator (§7.1) ---- */

    const settled = (s: Spring, scale: number) => {
      const rest = readNum("--eng-spring-rest", 0.001) * scale;
      /* velocity threshold: the rest value per frame at 60fps */
      return Math.abs(s.target - s.x) < rest && Math.abs(s.v) < rest * 60;
    };

    const step = (s: Spring, dt: number) => {
      const k = readNum("--eng-spring-stiffness", 210);
      const c = readNum("--eng-spring-damping", 24);
      const m = readNum("--eng-spring-mass", 1);
      /* semi-implicit Euler, substepped for stability */
      const h = 1 / 240;
      let t = dt;
      while (t > 0) {
        const d = Math.min(h, t);
        const a = (k * (s.target - s.x) - c * s.v) / m;
        s.v += a * d;
        s.x += s.v * d;
        t -= d;
      }
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      let running = false;

      if (mode === "accordion") {
        for (const s of fractions) {
          if (settled(s, 1)) {
            s.x = s.target;
            s.v = 0;
          } else {
            step(s, dt);
            running = true;
          }
        }
        writeFractions();
      } else if (!dragging) {
        if (settled(trackSpring, Math.max(pitch, 1))) {
          trackSpring.x = trackSpring.target;
          trackSpring.v = 0;
        } else {
          step(trackSpring, dt);
          running = true;
        }
        writeTrack();
      }

      if (running) raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    /* ---- activation (§7.1/§7.4) ---- */

    const applyState = () => {
      cards.forEach((c, i) => {
        if (i === active) c.dataset.active = "";
        else delete c.dataset.active;
      });
      hits.forEach((b, i) => b?.setAttribute("aria-expanded", String(i === active)));
      panels.forEach((p, i) => {
        if (i === active) p?.removeAttribute("aria-hidden");
        else p?.setAttribute("aria-hidden", "true");
      });
      crumbs.forEach((b, i) => {
        if (i === active) b.dataset.current = "";
        else delete b.dataset.current;
      });
    };

    /* snap every spring to its target with no travel (band switches,
       reduced motion, mount) */
    const snapAll = () => {
      fractions.forEach((s) => {
        s.x = s.target;
        s.v = 0;
      });
      trackSpring.x = trackSpring.target;
      trackSpring.v = 0;
      writeFractions();
      writeTrack();
    };

    const setActive = (index: number) => {
      if (index === active || index < 0 || index >= COUNT) return;
      active = index;
      applyState();
      fractions.forEach((s, i) => (s.target = i === active ? 1 : 0));
      trackSpring.target = -active * pitch;
      if (reduced()) {
        snapAll();
        return;
      }
      kick();
    };

    /* ---- band detection (§8.2): container measurement, never
       matchMedia ---- */

    const measure = () => {
      const nextMode = rowStyles.getPropertyValue("--eng-mode").trim() || "accordion";
      const modeChanged = nextMode !== mode;
      mode = nextMode;
      if (mode === "carousel" && cards.length > 1) {
        /* rects, not offsetLeft — offsets round to integers and the
           rounding error scales with the snap index (both cards carry
           the same transform, so the difference is exact) */
        pitch = cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
      }
      trackSpring.target = mode === "carousel" ? -active * pitch : 0;
      if (modeChanged || !raf) {
        /* a gate crossing re-renders the nearest design settled — no
           travel, nothing replays */
        snapAll();
      }
    };

    const ro = new ResizeObserver(measure);

    /* ---- clicks: cards and breadcrumb stops retarget; clicking the
       expanded card does nothing (§7.3) ---- */

    const onHit = (index: number) => () => {
      if (suppressClick) return;
      setActive(index);
    };
    const hitHandlers = hits.map((_, i) => onHit(i));
    const crumbHandlers = crumbs.map((_, i) => onHit(i));

    /* ---- drag (§7.4, carousel only): 1:1 with the finger, overscroll
       resistance past the ends, fling bias on release ---- */

    let startX = 0;
    let baseX = 0;
    let samples: { t: number; x: number }[] = [];

    const bounds = () => ({ max: 0, min: -(COUNT - 1) * pitch });

    const onPointerDown = (e: PointerEvent) => {
      if (mode !== "carousel" || !e.isPrimary) return;
      dragging = true;
      suppressClick = false;
      startX = e.clientX;
      baseX = trackSpring.x;
      trackSpring.v = 0;
      samples = [{ t: e.timeStamp, x: trackSpring.x }];
      /* the pointer can be gone by the time the handler runs (and
         synthetic pointers never exist) — capture is an optimization,
         not a requirement, so a failure must not kill the drag */
      try {
        row.setPointerCapture(e.pointerId);
      } catch {
        /* uncapturable pointer — move/up still arrive through the row */
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const resist = readNum("--eng-overscroll-resist", 0.3);
      const { max, min } = bounds();
      let x = baseX + (e.clientX - startX);
      if (x > max) x = max + (x - max) * resist;
      if (x < min) x = min + (x - min) * resist;
      trackSpring.x = x;
      writeTrack();
      if (Math.abs(e.clientX - startX) > 6) suppressClick = true;
      samples.push({ t: e.timeStamp, x });
      while (samples.length > 2 && e.timeStamp - samples[0].t > 100) samples.shift();
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      const fling = readNum("--eng-fling-speed", 500);
      const first = samples[0];
      const dt = (e.timeStamp - first.t) / 1000;
      const v = dt > 0 ? (trackSpring.x - first.x) / dt : 0;
      /* nearest position, biased one position in the fling direction
         when release speed exceeds the fling speed */
      let index = Math.round(-trackSpring.x / Math.max(pitch, 1));
      if (Math.abs(v) > fling) {
        index = v < 0 ? Math.floor(-trackSpring.x / pitch) + 1 : Math.ceil(-trackSpring.x / pitch) - 1;
      }
      index = Math.max(0, Math.min(COUNT - 1, index));
      /* the spring inherits the release velocity (§7.4) */
      trackSpring.v = v;
      if (index !== active) {
        active = index;
        applyState();
        fractions.forEach((s, i) => (s.target = i === active ? 1 : 0));
      }
      trackSpring.target = -active * pitch;
      if (reduced()) snapAll();
      else kick();
    };

    /* the suppressed click fires after pointerup — release the guard
       once it has passed */
    const onClickCapture = (e: MouseEvent) => {
      if (!suppressClick) return;
      e.stopPropagation();
      e.preventDefault();
      suppressClick = false;
    };

    /* ---- decode priming (§5): once the section first enters the
       viewport, prime the four lazy images at idle so an expansion or
       slide never reveals unpainted pixels ---- */

    const prime = () => {
      if (primed) return;
      primed = true;
      const run = () => {
        for (const c of cards) {
          const img = c.querySelector("img");
          if (!img) continue;
          if (img.loading === "lazy") img.loading = "eager";
          img.decode().catch(() => undefined);
        }
      };
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(run);
      else window.setTimeout(run, 200);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          prime();
          io.disconnect();
        }
      },
      { threshold: 0 },
    );

    /* ---- wiring ---- */

    measure();
    applyState();
    snapAll();
    ro.observe(row);
    io.observe(section);
    hits.forEach((b, i) => b?.addEventListener("click", hitHandlers[i]));
    crumbs.forEach((b, i) => b.addEventListener("click", crumbHandlers[i]));
    row.addEventListener("pointerdown", onPointerDown);
    row.addEventListener("pointermove", onPointerMove);
    row.addEventListener("pointerup", endDrag);
    row.addEventListener("pointercancel", endDrag);
    row.addEventListener("click", onClickCapture, true);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      hits.forEach((b, i) => b?.removeEventListener("click", hitHandlers[i]));
      crumbs.forEach((b, i) => b.removeEventListener("click", crumbHandlers[i]));
      row.removeEventListener("pointerdown", onPointerDown);
      row.removeEventListener("pointermove", onPointerMove);
      row.removeEventListener("pointerup", endDrag);
      row.removeEventListener("pointercancel", endDrag);
      row.removeEventListener("click", onClickCapture, true);
      /* the inline fractions come off so the CSS defaults (data-active)
         render the settled state */
      cards.forEach((c) => {
        c.style.removeProperty("--_f");
        c.style.removeProperty("--_w");
      });
      track.style.removeProperty("--eng-x");
    };
  }, []);

  return (
    <div className="eng-island" ref={ref}>
      {children}
    </div>
  );
}
