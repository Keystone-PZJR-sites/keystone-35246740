'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Image from 'next/image';
import gsap from 'gsap';
import { KeystoneMark } from '@/components/elements';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePillHandoff } from '@/components/PillHandoffProvider';
import { log } from '@/lib/logger';
import type { ProductScreensTool } from './ProductScreens';

gsap.registerPlugin(ScrollTrigger);

export interface MobileProductScreensProps {
  tools: ProductScreensTool[];
}

/**
 * Mobile-only Product Screens section (below 768px).
 *
 * Visual differences from the desktop ProductScreens:
 *  - No cream outer background — the active tool's dark colour fills edge-to-edge.
 *  - Pill nav wraps into two rows, centred at the top of the section.
 *  - The darker deco container holds the Keystone mark, tool label (small-
 *    caps), value copy, and the product screenshot — all stacked vertically
 *    inside a rounded panel that sits below the pill nav.
 *  - Product screenshot starts at the left edge of the deco and extends
 *    past the deco's right edge and the viewport right edge — clipped by
 *    `#smooth-wrapper { overflow-x: clip }` in app/globals.css. (On desktop
 *    ScrollSmoother adds its own overflow:hidden at runtime; on touch
 *    devices it skips that, which is why the always-on rule is needed.)
 *
 * Spec 026 retired the pin: the layout is entirely in normal flow with
 * no absolute positioning. The section is a flex column where the deco
 * fills the remaining height under the pills; inside the deco, the
 * mark/label/copy block is intrinsic-height and the screenshot zone
 * flex-grows to absorb any extra vertical space at tall viewports. The
 * mark/label/copy block always sits the same fixed distance from the
 * deco's top, the deco always sits the same fixed distance from the
 * pill nav and from the section bottom, and only the screenshot's
 * height changes with viewport height. The entrance animation (EC pill
 * convergence + content fade-in) plays once on viewport entry via a
 * direct ScrollTrigger.
 *
 * Shown via `md:hidden` — the desktop ProductScreens uses `hidden md:block`.
 */
export function MobileProductScreens({ tools }: MobileProductScreensProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const transitioningRef = useRef(false);
  const { getMobileRects } = usePillHandoff();

  const sectionRef     = useRef<HTMLElement>(null);
  const pillRefs       = useRef<(HTMLButtonElement | null)[]>([]);
  const screenshotRef  = useRef<HTMLDivElement>(null);
  // leftZoneRef wraps mark + label + copy as one animation unit
  const leftZoneRef    = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Mobile + full motion ────────────────────────────────────────────
      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        const section    = sectionRef.current;
        const leftZone   = leftZoneRef.current;
        const screenshot = screenshotRef.current;
        if (!section || !leftZone || !screenshot) return;

        const setInitialState = () => {
          gsap.set([leftZone, screenshot], { opacity: 0, y: 24 });
          const pillEls = pillRefs.current.filter((el): el is HTMLButtonElement => el !== null);
          gsap.set(pillEls, { x: 0, y: 0, opacity: 0 });
        };

        setInitialState();

        // ── Entrance timeline ─────────────────────────────────────────────
        //
        // Pills fly from their mobile EveryChannel scattered positions to the
        // two-row nav. Content fades in concurrently.
        const buildEntranceTl = () => {
          const tl = gsap.timeline({ paused: true });
          const pillEls = pillRefs.current.filter((el): el is HTMLButtonElement => el !== null);

          // Position pills at mobile EC locations before playing.
          const ecRects = getMobileRects();
          pillEls.forEach((el, i) => {
            const label   = tools[i]?.label;
            const ecRect  = ecRects.get(label ?? '');
            if (ecRect && el) {
              const psRect = el.getBoundingClientRect();
              const dx = ecRect.left + ecRect.width  / 2 - (psRect.left + psRect.width  / 2);
              const dy = ecRect.top  + ecRect.height / 2 - (psRect.top  + psRect.height / 2);
              gsap.set(el, { x: dx, y: dy, opacity: 1 });
            } else {
              gsap.set(el, { x: 0, y: 0, opacity: 0 });
            }
          });

          // Phase 1 (0 → 0.65s): pills converge to two-row nav positions.
          if (pillEls.length > 0) {
            tl.to(
              pillEls,
              { x: 0, y: 0, opacity: 1, ease: 'power2.inOut', duration: 0.55, stagger: 0.04 },
              0,
            );
          }

          // Phase 2: copy/mark leads screenshot by ~80ms — same as desktop.
          tl.to(leftZone,   { opacity: 1, y: 0, ease: 'power2.out', duration: 0.2 }, 0.4);
          tl.to(screenshot, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.22 }, 0.5);

          return tl;
        };

        let played = false;

        ScrollTrigger.create({
          id: 'mobile-product-screens-entrance',
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (played) return;
            played = true;
            const entranceTl = buildEntranceTl();
            log('mobile-product-screens-entrance', 'ANIM_START');
            entranceTl.play(0).then(() => {
              log('mobile-product-screens-entrance', 'ANIM_COMPLETE');
            });
          },
        });
      });

      // ── Mobile reduced motion or fallback: resting state immediately ────
      const showRestingState = () => {
        const leftZone   = leftZoneRef.current;
        const screenshot = screenshotRef.current;
        const pillEls    = pillRefs.current.filter((el): el is HTMLButtonElement => el !== null);
        if (!leftZone || !screenshot) return;
        gsap.set([leftZone, screenshot], { opacity: 1, y: 0 });
        gsap.set(pillEls, { x: 0, y: 0, opacity: 1 });
      };

      mm.add('(max-width: 767px) and (prefers-reduced-motion: reduce)', showRestingState);
    }, sectionRef);

    return () => ctx.revert();
  }, [tools, getMobileRects]);

  // ── Tool switching ────────────────────────────────────────────────────────
  const handlePillClick = useCallback(
    (newIndex: number) => {
      if (transitioningRef.current || newIndex === activeIndex) return;
      transitioningRef.current = true;

      const direction = newIndex > activeIndex ? 1 : -1;
      const exitX  = `${direction * -100}%`;
      const enterX = `${direction * 100}%`;

      const leftZone   = leftZoneRef.current;
      const screenshot = screenshotRef.current;
      const section    = sectionRef.current;

      if (!leftZone || !screenshot || !section) {
        transitioningRef.current = false;
        return;
      }

      const newTool = tools[newIndex];

      gsap.timeline({
        onComplete: () => { transitioningRef.current = false; },
      })
        // Animate out
        .to(leftZone,   { x: exitX, opacity: 0, duration: 0.28, ease: 'power2.in' }, 0)
        .to(screenshot, { x: exitX, opacity: 0, duration: 0.32, ease: 'power2.in' }, 0.04)
        // Swap content at midpoint
        .call(() => {
          flushSync(() => setActiveIndex(newIndex));
          gsap.set(leftZone,   { x: enterX, opacity: 0 });
          gsap.set(screenshot, { x: enterX, opacity: 0 });
        })
        // Crossfade section background
        .to(section, { backgroundColor: newTool.cardBg, duration: 0.4, ease: 'power1.inOut' }, 0)
        // Animate in — copy/mark leads screenshot by ~80ms
        .to(leftZone,   { x: '0%', opacity: 1, duration: 0.38, ease: 'power2.out' })
        .to(screenshot, { x: '0%', opacity: 1, duration: 0.42, ease: 'power2.out' }, '-=0.3');
    },
    [activeIndex, tools],
  );

  const currentTool = tools[activeIndex];

  // Per-tool overrides: mobile data may differ from desktop. The mobile
  // screenshot defaults to the desktop primary (front of the layered stack)
  // when no `mobileScreenshotSrc` is provided. Mobile copy and inactive
  // border fall back to the desktop values when no override exists.
  const mobileScreenshot =
    currentTool.mobileScreenshotSrc ?? currentTool.screenshotLayers[0];
  const mobileCopy = currentTool.mobileCopyText ?? currentTool.copyText;
  const mobileBorder = currentTool.mobileInactiveBorder ?? currentTool.inactiveBorder;

  return (
    <div className="mps-mobile-container md:hidden">
      <section
        ref={sectionRef}
        className="mps-mobile-section"
        style={{ backgroundColor: currentTool.cardBg }}
        aria-label="Product showcase"
      >
        {/* Pill nav — two rows, in normal flow at the top */}
        <nav className="mps-mobile-pill-nav" aria-label="Product tools">
          {tools.map((tool, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={tool.id}
                ref={el => { pillRefs.current[i] = el; }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`${tool.label} product`}
                className="mps-mobile-pill"
                style={
                  isActive
                    ? { backgroundColor: tool.pillFill, border: 'none' }
                    : {
                        backgroundColor: 'transparent',
                        borderWidth: 'var(--mps-pill-border-w)',
                        borderStyle: 'solid',
                        borderColor: mobileBorder,
                      }
                }
                onClick={() => handlePillClick(i)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePillClick(i);
                  }
                }}
              >
                <span
                  className="mps-mobile-pill-square"
                  style={{ backgroundColor: isActive ? currentTool.cardBg : tool.squareColor }}
                  aria-hidden="true"
                />
                <span
                  className="mps-mobile-pill-label"
                  style={isActive ? { color: currentTool.cardBg } : undefined}
                >
                  {tool.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Darker container: in normal flow as a flex column that fills the
            remaining vertical space below the pills (with a fixed gap above
            and a fixed inset from the section's left edge and bottom). It
            holds the mark/label/copy at the top and the product screenshot
            below — the screenshot flex-grows to absorb any extra vertical
            space at tall viewports. Color and opacity are forwarded as
            inline styles so each tool gets its Figma-verified value. */}
        <div
          className="mps-mobile-deco"
          style={{
            backgroundColor: currentTool.mobileDecoColor,
            opacity: currentTool.mobileDecoOpacity,
          }}
        >
          {/* Mark + tool label + value copy — fixed distance from deco top
              (set by deco's padding-top). */}
          <div ref={leftZoneRef} className="mps-mobile-left-zone">
            {/* Mobile mark color matches the copy accent so the mark, label,
                and copy read as a single visual block (spec 024). */}
            <KeystoneMark
              color={currentTool.copyAccent}
              width={26}
              height={30}
            />
            <span
              className="mps-mobile-tool-label"
              style={{ color: currentTool.copyAccent }}
            >
              {currentTool.label.toUpperCase()}
            </span>
            <p
              className="mps-mobile-copy"
              style={{ color: currentTool.copyAccent }}
            >
              {mobileCopy}
            </p>
          </div>

          {/* Product screenshot — flex-grows to fill remaining height inside
              the deco. Wider than the deco (158.5vw) so it extends past the
              deco's right edge and the viewport's right edge; clipped at
              the viewport edge by #smooth-wrapper's overflow-x: clip
              (app/globals.css). The image inside uses object-fit:cover so
              it scales to the zone's actual dimensions at any viewport
              height. */}
          <div ref={screenshotRef} className="mps-mobile-screenshot-zone">
            <Image
              src={mobileScreenshot}
              alt=""
              fill
              className="mps-mobile-screenshot-img"
              unoptimized
            />
          </div>
        </div>
      </section>
    </div>
  );
}
