import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// ---------------------------------------------------------------------------
// Debug logging helpers
// ---------------------------------------------------------------------------

const COLORS: Record<string, string> = {
  'hero-pin':            '#6ecc8b',
  'work-pin':            '#f57e56',
  'every-channel-pin':   '#9febd7',
  'product-screens-pin': '#4fafa0',
  'social-proof-pin':    '#ffbb8a',
  'pricing-pin':         '#399587',
};

function log(id: string, event: string, detail: Record<string, unknown> = {}) {
  const color = COLORS[id] ?? '#aaa';
  const detailStr = Object.entries(detail)
    .map(([k, v]) => `${k}=${typeof v === 'number' ? (v as number).toFixed(4) : v}`)
    .join('  ');
  console.log(
    `%c[${id}] %c${event}%c ${detailStr}`,
    `color:${color}; font-weight:bold`,
    'color:#fff; font-weight:bold',
    'color:#999; font-weight:normal',
  );
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface SectionPinOptions {
  /** Unique ScrollTrigger id — used for debugging and cleanup. */
  id: string;
  /** The `<section>` element to pin. */
  section: HTMLElement;
  /**
   * Called when the section should begin its entrance animation.
   * The `played` guard inside each component makes this a no-op on every
   * re-entry — animations play exactly once and sections stay in their
   * final state forever.
   */
  onEnter: () => void;
  /**
   * Returns `true` once the section's entrance animation has finished.
   * While `false`, the snap holds in place (soft hold) so the visitor
   * cannot advance until the transition completes.
   * Pass `() => true` for sections with no staged entrance.
   */
  isAnimComplete: () => boolean;
  /**
   * When `true`, `onEnter` is deferred until the visitor deliberately
   * scrolls forward past the 2% threshold — it will NOT fire on page load
   * even if the trigger zone is already active (scroll position 0).
   *
   * Use this for the first section (hero) which is always in the viewport
   * on load. Without this flag GSAP calls `onEnter` during its
   * initialization refresh and the animation plays before the user scrolls.
   */
  fireOnScroll?: boolean;
}

/**
 * Attaches the scroll-state-machine pin + snap to a section.
 *
 * Gap geometry
 * ────────────
 * With `pinSpacing: true` (required for ScrollSmoother) and `end: '+=100%'`,
 * GSAP inserts a 100vh pin spacer after each section. This pushes the next
 * section's trigger start exactly `section.offsetHeight` beyond the current
 * section's trigger end — a dead zone the visitor would otherwise land in.
 *
 * Forward gap bridge (key insight)
 * ─────────────────────────────────
 * The previous approach snapped to p=1 and bridged in `onLeave`. The problem:
 * GSAP's snap creates a tween targeting an internal proxy (NOT smoother.wrapper()),
 * so `gsap.killTweensOf(smoother.wrapper())` kills nothing. The snap tween keeps
 * running after `onLeave` fires and drags the scroll backward from the next
 * section's zone, creating an infinite bounce cascade.
 *
 * The fix: never snap to p=1. When the visitor commits to advancing (animation
 * done, p ≥ 2%), `snapTo` returns `p` (hold in place) AND schedules a direct
 * `smoother.scrollTo(triggerEnd + offsetHeight, false)` via `gsap.delayedCall(0)`.
 * Because no snap tween is ever started, there is nothing to conflict with the
 * gap bridge jump.
 *
 * Backward gap bridge
 * ────────────────────
 * Backward scroll never creates a snap animation (snapTo returns `p` for
 * `lastDir < 0`). So `onLeaveBack` can safely do an instant jump to the
 * previous section's trigger end without any tween conflict.
 *
 * Snap: two points only (0 and "advance")
 *   • backward scroll         → return p    (no snap, free)
 *   • p < 2%                  → 0           (didn't commit: snap back)
 *   • animation still running → return p    (soft hold in place, no bounce)
 *   • animation done          → hold + jump (defer direct scroll to next section)
 *
 * Sections never reset. Cleanup is handled by gsap.context().revert().
 */
export function createSectionPin({
  id,
  section,
  onEnter,
  isAnimComplete,
  fireOnScroll = false,
}: SectionPinOptions): void {
  let lastDir = 1;
  let lastP = 0;
  let lastVelocity = 0;
  let enterDispatched = false;
  // Guard: prevents scheduling multiple simultaneous forward jumps.
  let advancing = false;

  const dispatchEnter = (reason: string) => {
    if (enterDispatched) return;
    enterDispatched = true;
    log(id, 'ENTER_DISPATCHED', { reason });
    onEnter();
  };

  log(id, 'CREATED', { offsetHeight: section.offsetHeight, fireOnScroll });

  ScrollTrigger.create({
    id,
    trigger: section,
    start: 'top top',
    end: '+=100%',
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      const prevP = lastP;
      lastDir = self.direction;
      lastVelocity = self.getVelocity();
      lastP = self.progress;

      if (fireOnScroll && !enterDispatched && self.progress > 0.02 && self.direction > 0) {
        dispatchEnter('first-scroll');
      }

      const pRounded = Math.round(self.progress * 20) / 20;
      const prevRounded = Math.round(prevP * 20) / 20;
      if (pRounded !== prevRounded || self.progress === 0 || self.progress === 1) {
        log(id, 'UPDATE', {
          p: self.progress,
          dir: self.direction,
          vel: self.getVelocity(),
          animDone: isAnimComplete(),
        });
      }
    },
    snap: {
      snapTo: (p: number) => {
        const complete = isAnimComplete();
        let result: number;

        if (lastDir < 0) {
          // Backward scroll is always free — no snap, no holds.
          result = p;
        } else if (p < 0.02) {
          // Didn't commit (< 2%) — snap back to section top.
          result = 0;
        } else if (!complete) {
          // Animation still running: soft hold wherever the user scrolled.
          result = p;
        } else if (!advancing) {
          // Animation done AND user committed to advancing.
          //
          // CRITICAL: do NOT return 1. Returning 1 would start a GSAP snap
          // tween targeting trigger.end. That tween targets an internal proxy
          // object — gsap.killTweensOf(smoother.wrapper()) cannot reach it.
          // When onLeave then fires and we jump to the next section, the snap
          // tween keeps running and drags the scroll backward, creating an
          // infinite cascade.
          //
          // Instead: return p (hold in place) and schedule a DIRECT jump to
          // the next section's trigger start. Because we never start a snap
          // tween, there is nothing to conflict with the jump.
          advancing = true;
          const triggerEnd = ScrollTrigger.getById(id)?.end ?? 0;
          const targetPos = triggerEnd + section.offsetHeight;
          log(id, 'ADVANCE_SCHEDULED', { triggerEnd, targetPos });

          gsap.delayedCall(0, () => {
            advancing = false;
            const smoother = ScrollSmoother.get();
            if (smoother) {
              log(id, 'ADVANCE_JUMP', { targetPos, currentTop: smoother.scrollTop() });
              smoother.scrollTo(targetPos, false);
            }
          });

          result = p; // hold while jump is pending in next tick
        } else {
          // Already advancing — hold in place while the jump is pending.
          result = p;
        }

        log(id, 'SNAP_EVAL', {
          p,
          dir: lastDir,
          vel: lastVelocity,
          animDone: complete,
          advancing,
          '→': result,
        });

        return result;
      },
      duration: { min: 0.2, max: 0.4 },
      delay: 0.1,
      ease: 'power2.inOut',
    },
    onEnter: fireOnScroll ? undefined : (self) => {
      log(id, 'ON_ENTER', { p: self.progress, start: self.start, end: self.end });
      dispatchEnter('on-enter');
    },
    // onLeave is intentionally omitted. The forward gap bridge is handled
    // above in the snapTo deferred jump — no separate onLeave callback needed.
    onLeaveBack: (self) => {
      // Backward gap bridge. Backward scroll never creates a snap tween
      // (snapTo returns `p` for lastDir < 0), so this instant jump is safe.
      const smoother = ScrollSmoother.get();
      if (!smoother) {
        log(id, 'ON_LEAVE_BACK_NO_SMOOTHER', { p: self.progress });
        return;
      }
      const currentTop = smoother.scrollTop();
      const targetTop = currentTop - section.offsetHeight;
      log(id, 'ON_LEAVE_BACK', {
        p: self.progress,
        currentScrollTop: currentTop,
        targetScrollTop: targetTop,
      });
      smoother.scrollTo(targetTop, false);
      log(id, 'ON_LEAVE_BACK_AFTER_SCROLL', { newScrollTop: smoother.scrollTop() });
    },
    onEnterBack: (self) => {
      log(id, 'ON_ENTER_BACK', { p: self.progress });
    },
  });
}

// ---------------------------------------------------------------------------
// Section-level logging helper — call from inside section components
// ---------------------------------------------------------------------------

export function logSectionEvent(id: string, event: string, detail: Record<string, unknown> = {}) {
  log(id, event, detail);
}
