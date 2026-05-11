'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Image from 'next/image';
import gsap from 'gsap';
import { KeystoneMark } from '@/components/elements';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePillHandoff } from '@/components/PillHandoffProvider';
import { createSectionPin, logSectionEvent } from '@/lib/sectionPin';
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
 *  - Pill nav wraps into two rows, centred near the top of the section.
 *  - Keystone mark, tool label (small-caps), and value copy are stacked
 *    vertically, left-aligned below the nav.
 *  - Product screenshot starts at the left edge and extends beyond the right
 *    edge of the screen, clipped by the section.
 *
 * Entrance animation mirrors the desktop: pills converge from their mobile
 * Every Channel scatter positions to the two-row nav; content fades in as
 * the section settles. Tool switching uses the same horizontal slide
 * transition as desktop.
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
        let entranceComplete = false;

        const playEntrance = () => {
          logSectionEvent('mobile-product-screens-pin', 'ANIM_ENTER_CALLED', { played });
          if (played) return;
          played = true;
          const entranceTl = buildEntranceTl();
          logSectionEvent('mobile-product-screens-pin', 'ANIM_START');
          entranceTl.play(0).then(() => {
            entranceComplete = true;
            logSectionEvent('mobile-product-screens-pin', 'ANIM_COMPLETE');
          });
        };

        createSectionPin({
          id: 'mobile-product-screens-pin',
          section,
          onEnter: playEntrance,
          isAnimComplete: () => entranceComplete,
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

  return (
    <div className="mps-mobile-container md:hidden">
      <section
        ref={sectionRef}
        className="mps-mobile-section"
        style={{ backgroundColor: currentTool.cardBg }}
        aria-label="Product showcase"
      >
        {/* Screenshot clip layer — overflow:hidden clips the screenshot at the
            right edge. Separate from the section so pill offsets can extend
            outside the section bounds during the convergence animation. */}
        <div className="mps-mobile-screenshot-clip">
          <div ref={screenshotRef} className="mps-mobile-screenshot-zone">
            <Image
              src={currentTool.screenshotSrc}
              alt=""
              fill
              className="mps-mobile-screenshot-img"
              unoptimized
            />
          </div>
        </div>

        {/* Decorative bg shape: slightly darker rounded rect behind content.
            Uses rgba(0,0,0,0.15) so the darkening effect holds for every tool
            without needing to derive a per-tool colour. */}
        <div
          className="mps-mobile-deco"
          aria-hidden="true"
        />

        {/* Left zone: mark + tool label + value copy */}
        <div ref={leftZoneRef} className="mps-mobile-left-zone">
          <KeystoneMark
            color={currentTool.markColor}
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
            {currentTool.copyText}
          </p>
        </div>

        {/* Pill nav — two rows, centred at top */}
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
                        border: `1px solid ${currentTool.inactiveBorder}`,
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
                  style={{ color: isActive ? currentTool.cardBg : '#f8f7f2' }}
                >
                  {tool.label}
                </span>
              </button>
            );
          })}
        </nav>
      </section>
    </div>
  );
}
