"use client";

/** v2 sections — the portfolio gallery island (spec 007 §7).
 *
 * Owns the curtain-reveal entrance, the navigation offset, the active
 * slots, and the §7.4 observer/events. Geometry stays CSS-driven: the
 * island writes `--pf-offset` on the track and `data-slot` on each card;
 * the per-band pitches, counts, and constants are read from computed
 * style, keeping the section CSS their single source.
 *
 * Behavior:
 * - Entrance (§7.1, amended 2026-08-26): plays once per page view when
 *   the gallery window reaches --pf-enter visibility (the section-level
 *   20% gate opened on the header alone). The at-rest visible cards
 *   (--pf-reveal per band) wear the loading curtain from mount; on
 *   entry each frames in (CSS, --pf-i staggers) and its curtain lifts
 *   at max(scheduled delay, image decode) — a curtain never lifts over
 *   undecoded pixels. The shell morph rides the curtain's landing
 *   (animationend → data-morph, dropped after the morph duration).
 *   data-entered guards re-runs, including re-entry.
 * - Navigation (§7.3, amended 2026-08-26): one pitch per press on a
 *   seamless loop over the three tail clones — forward slides onto the
 *   clones then snaps home without transition (the hero's wrap); back
 *   from the start snaps to the visually identical clone frame first,
 *   then slides. No bounds, no disabled states. Presses during a slide
 *   queue at most one ahead; the first press primes every remaining
 *   image to eager.
 * - The hero pause (§7.4): an IntersectionObserver on the section root
 *   (threshold 0) dispatches v2:portfolio-visible/-hidden on
 *   intersection changes; a second observer on the gallery window runs
 *   the entrance at first --pf-enter visibility (amended 2026-08-26).
 * - Reduced motion (§7.5): no entrance (cards born settled), snapping
 *   navigation (CSS kills the transitions), the pause protocol stays
 *   wired. v2:replay (dev) resets to the at-rest state and replays.
 */

import { useEffect, useRef, type ReactNode } from "react";

export function PortfolioGallery({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const section = root?.closest<HTMLElement>(".v2-portfolio");
    const track = root?.querySelector<HTMLElement>(".pf-track");
    const galleryWindow = root?.querySelector<HTMLElement>(".pf-window");
    if (!root || !section || !track || !galleryWindow) return;

    const all = [...track.querySelectorAll<HTMLElement>(".pf-card")];
    const cards = all.filter((c) => c.dataset.clone === undefined);
    const COUNT = cards.length;
    /* the server-rendered slot is each card's base index (clones ride
       past the real set) — capture it before the island rewrites slots */
    const baseIndex = new Map(all.map((c) => [c, Number(c.dataset.slot)]));
    const fwd = [...root.querySelectorAll<HTMLButtonElement>('.gbtn[data-direction="forward"]')];
    const back = [...root.querySelectorAll<HTMLButtonElement>('.gbtn[data-direction="back"]')];

    const styles = getComputedStyle(track);
    const readNum = (name: string, fallback: number) => {
      const v = parseFloat(styles.getPropertyValue(name));
      return Number.isFinite(v) ? v : fallback;
    };

    const reduced = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      track.closest<HTMLElement>(".page")?.dataset.motion === "reduce";

    let offset = 0;
    let sliding = false;
    let queued: 1 | -1 | null = null;
    let entered = false;
    let primed = false;
    let cancelled = false;
    const pending = new Set<HTMLElement>();
    const timers = new Set<number>();

    /* ---- slots ---- */

    const apply = () => {
      track.style.setProperty("--pf-offset", String(offset));
      all.forEach((c) => {
        c.dataset.slot = String((baseIndex.get(c) ?? 0) - offset);
      });
    };

    /* commit an offset without a visible move (the wrap, the replay) */
    const snapTo = (n: number) => {
      track.classList.add("pf-snap");
      offset = n;
      apply();
      void track.offsetWidth;
      track.classList.remove("pf-snap");
    };

    const settle = (c: HTMLElement) => {
      delete c.dataset.reveal;
      c.dataset.settled = "";
      pending.delete(c);
    };

    /* a running reveal cancels to the settled state only if its card
       leaves the viewport — slides fully out on the left (§7.1) */
    const settleGone = () => {
      for (const c of [...pending]) {
        if (Number(c.dataset.slot ?? 0) < 0) settle(c);
      }
    };

    const prime = () => {
      if (primed) return;
      primed = true;
      for (const c of all) {
        const img = c.querySelector("img");
        if (img && img.loading === "lazy") img.loading = "eager";
      }
    };

    /* the loop (§7.3 amended 2026-08-26): offset walks 0..COUNT; the
       COUNT frame shows the clones and is visually identical to home,
       so the wrap snaps are invisible in both directions */
    const slide = (dir: 1 | -1) => {
      if (cancelled) return;
      if (sliding && !reduced()) {
        queued = dir;
        return;
      }
      prime();
      if (reduced()) {
        offset = (offset + dir + COUNT) % COUNT;
        apply();
        settleGone();
        return;
      }
      if (dir === -1 && offset === 0) snapTo(COUNT);
      offset += dir;
      sliding = true;
      apply();
      settleGone();
    };

    const onTrackDone = (e: TransitionEvent) => {
      if (e.target !== track || e.propertyName !== "transform") return;
      sliding = false;
      if (offset === COUNT) snapTo(0);
      if (queued !== null) {
        const q = queued;
        queued = null;
        slide(q);
      }
    };

    /* ---- the curtain-reveal entrance (§7.1) ---- */

    const initReveal = () => {
      if (!reduced()) {
        const n = Math.min(readNum("--pf-reveal", 3), cards.length);
        for (let i = 0; i < n; i++) {
          cards[i].dataset.reveal = "pending";
          pending.add(cards[i]);
        }
      }
      /* lifts the pre-hydration guard (portfolio.css) */
      section.dataset.pfReady = "";
    };

    const enter = () => {
      if (entered) return;
      entered = true;
      section.dataset.entered = "";
      const stagger = readNum("--pf-stagger", 120);
      const curtainDelay = readNum("--pf-curtain-delay", 350);
      for (const c of [...pending]) {
        const i = Number(c.style.getPropertyValue("--pf-i")) || 0;
        c.dataset.reveal = "framing";
        const img = c.querySelector("img");
        const decoded = img ? img.decode().catch(() => undefined) : Promise.resolve();
        const scheduled = new Promise<void>((resolve) => {
          const t = window.setTimeout(resolve, i * stagger + curtainDelay);
          timers.add(t);
        });
        /* the lift fires at max(scheduled delay, decode complete) */
        Promise.all([decoded, scheduled]).then(() => {
          if (cancelled || !pending.has(c) || c.dataset.reveal !== "framing") return;
          c.dataset.reveal = "lifting";
        });
      }
    };

    /* the active morph rides the curtain's landing: data-morph retimes
       the chrome transition to the frame constants for its duration */
    const onCurtainLand = (e: AnimationEvent) => {
      if (e.animationName !== "pf-curtain") return;
      const c = (e.target as HTMLElement).closest<HTMLElement>(".pf-card");
      if (!c || !pending.has(c)) return;
      c.dataset.morph = "";
      settle(c);
      const t = window.setTimeout(() => {
        delete c.dataset.morph;
        timers.delete(t);
      }, readNum("--pf-frame-dur", 450) + 50);
      timers.add(t);
    };

    /* ---- the §7.4 observers (amended 2026-08-26 — §9 R20): the hero
       pause watches the section root at any intersection; the entrance
       gates on the gallery window itself, so the curtains wait for the
       cards rather than the header (20% of the section is less than
       the header block at every band) ---- */

    let wasIntersecting = false;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[entries.length - 1];
        if (e.isIntersecting && !wasIntersecting) {
          wasIntersecting = true;
          window.dispatchEvent(new Event("v2:portfolio-visible"));
        } else if (!e.isIntersecting && wasIntersecting) {
          wasIntersecting = false;
          window.dispatchEvent(new Event("v2:portfolio-hidden"));
        }
      },
      { threshold: 0 },
    );

    /* The gate fraction is per band (--_pf-enter — 0.18 at rm, 0.25 at
       rs+; §9 R22): observe at both values and compare against the
       band's live one in the callback (`styles` is a live computed
       style). Small epsilon: the crossing entry's ratio can land a
       float hair under the threshold. */
    const enterThresholds = [readNum("--pf-enter-rm", 0.18), readNum("--pf-enter", 0.25)];
    const ioEnter = new IntersectionObserver(
      (entries) => {
        const e = entries[entries.length - 1];
        const gate = readNum("--_pf-enter", 0.25);
        if (e.intersectionRatio >= gate - 0.005 && !entered && !reduced()) enter();
      },
      { threshold: enterThresholds },
    );

    /* ---- dev replay (§8.8): reset to at-rest and let the observer
       re-fire with the current state ---- */

    const onReplay = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers.clear();
      pending.clear();
      queued = null;
      sliding = false;
      entered = false;
      delete section.dataset.entered;
      for (const c of cards) {
        delete c.dataset.reveal;
        delete c.dataset.settled;
        delete c.dataset.morph;
      }
      snapTo(0);
      initReveal();
      ioEnter.unobserve(galleryWindow);
      ioEnter.observe(galleryWindow);
    };

    const onFwd = () => slide(1);
    const onBack = () => slide(-1);

    initReveal();
    apply();
    fwd.forEach((b) => b.addEventListener("click", onFwd));
    back.forEach((b) => b.addEventListener("click", onBack));
    track.addEventListener("transitionend", onTrackDone);
    track.addEventListener("transitioncancel", onTrackDone);
    track.addEventListener("animationend", onCurtainLand);
    window.addEventListener("v2:replay", onReplay);
    io.observe(section);
    ioEnter.observe(galleryWindow);

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
      timers.clear();
      io.disconnect();
      ioEnter.disconnect();
      fwd.forEach((b) => b.removeEventListener("click", onFwd));
      back.forEach((b) => b.removeEventListener("click", onBack));
      track.removeEventListener("transitionend", onTrackDone);
      track.removeEventListener("transitioncancel", onTrackDone);
      track.removeEventListener("animationend", onCurtainLand);
      window.removeEventListener("v2:replay", onReplay);
      delete section.dataset.pfReady;
      delete section.dataset.entered;
      for (const c of cards) {
        delete c.dataset.reveal;
        delete c.dataset.settled;
        delete c.dataset.morph;
      }
    };
  }, []);

  return (
    <div className="pf-gallery" ref={ref}>
      {children}
    </div>
  );
}
