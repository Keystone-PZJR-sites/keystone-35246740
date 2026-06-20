'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Image from 'next/image';
import gsap from 'gsap';
import { KeystoneMark } from '@/design-system/primitives';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePillHandoff } from '@/design-system/providers';
import { log } from '@/lib/logger';

gsap.registerPlugin(ScrollTrigger);

export interface ProductScreensTool {
  id: string;
  label: string;
  cardBg: string;
  copyAccent: string;
  pillFill: string;
  inactiveBorder: string;
  squareColor: string;
  copyText: string;
  markColor: string;
  /**
   * Front-to-back stack of screenshot asset paths for desktop. The first entry
   * is the visible primary; subsequent entries sit behind it and create the
   * page-stack depth effect described in spec 024. Layer count varies per
   * tool (Figma node `1087:2360`): some tools have 2 layers, others 3.
   */
  screenshotLayers: string[];
  /** Optional override when the mobile screenshot differs from desktop primary. */
  mobileScreenshotSrc?: string;
  /** Optional override when the mobile copy differs from the desktop copy. */
  mobileCopyText?: string;
  /** Optional override when the mobile inactive pill border differs from desktop. */
  mobileInactiveBorder?: string;
  /** Per-tool fill behind the mobile content — a darker shade of `cardBg`. */
  mobileDecoColor: string;
  /** Per-tool opacity for the mobile decorative panel fill (0–1). */
  mobileDecoOpacity: number;
}

export interface ProductScreensProps {
  tools: ProductScreensTool[];
}

export function ProductScreens({ tools }: ProductScreensProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const transitioningRef = useRef(false);
  const { getDesktopRects } = usePillHandoff();

  const sectionRef    = useRef<HTMLElement>(null);
  const cardRef       = useRef<HTMLDivElement>(null);
  const pillRefs      = useRef<(HTMLButtonElement | null)[]>([]);
  const screenshotRef = useRef<HTMLDivElement>(null);
  // leftZoneRef wraps mark icon + copy text as a single animation unit
  const leftZoneRef   = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Desktop (≥1280px) + full motion ────────────────────────────────
      mm.add(
        '(min-width: 1280px) and (prefers-reduced-motion: no-preference)',
        () => {
          const section    = sectionRef.current;
          const card       = cardRef.current;
          const leftZone   = leftZoneRef.current;
          const screenshot = screenshotRef.current;
          if (!section || !card || !leftZone || !screenshot) return;

          // Scale card to cover the visible viewport (transform-origin: center
          // bottom keeps the bottom edge anchored so the card "rises" from
          // below). Spec 026 cleanup: cap the Y scale to the visible viewport
          // height so a section that grows past one viewport doesn't make the
          // card initial state larger than the screen and break the rise.
          const initialScaleX = section.offsetWidth  / card.offsetWidth;
          const initialScaleY =
            Math.min(window.innerHeight, section.offsetHeight) / card.offsetHeight;

          const setInitialState = () => {
            gsap.set(card, {
              scaleX: initialScaleX,
              scaleY: initialScaleY,
              borderRadius: 0,
              transformOrigin: 'center bottom',
            });
            gsap.set([leftZone, screenshot], { opacity: 0, y: 24 });
            // Pills start hidden — positions set from EveryChannel before play
            const pillEls = pillRefs.current.filter((el): el is HTMLButtonElement => el !== null);
            gsap.set(pillEls, { x: 0, y: 0, opacity: 0 });
          };

          setInitialState();

          // ── Entrance timeline (triggered, not scrubbed) ────────────────
          //
          // The animation plays at its own pace after the first scroll commits.
          // Pills fly from their EveryChannel scattered positions to the nav row
          // simultaneously with the card contracting from full-screen to inset.
          const buildEntranceTl = () => {
            const tl = gsap.timeline({ paused: true });
            const pillEls = pillRefs.current.filter((el): el is HTMLButtonElement => el !== null);

            // Position pills at EveryChannel locations before playing
            const ecRects = getDesktopRects();
            pillEls.forEach((el, i) => {
              const label = tools[i]?.label;
              const ecRect = ecRects.get(label ?? '');
              if (ecRect && el) {
                const psRect = el.getBoundingClientRect();
                // Offset: how far from the PS nav pill to the EC pill center
                const dx =
                  ecRect.left + ecRect.width / 2 - (psRect.left + psRect.width / 2);
                const dy =
                  ecRect.top  + ecRect.height / 2 - (psRect.top  + psRect.height / 2);
                gsap.set(el, { x: dx, y: dy, opacity: 1 });
              } else {
                // No EC position available → pills fade in from opacity 0
                gsap.set(el, { x: 0, y: 0, opacity: 0 });
              }
            });

            // Phase 1 (0 → 0.65s): card contracts from full-screen to inset
            tl.to(
              card,
              { scaleX: 1, scaleY: 1, borderRadius: 20, ease: 'power2.inOut', duration: 0.65 },
              0,
            );

            // Phase 1 (0 → 0.65s): pills converge from EC positions to nav row
            if (pillEls.length > 0) {
              tl.to(
                pillEls,
                { x: 0, y: 0, opacity: 1, ease: 'power2.inOut', duration: 0.55, stagger: 0.04 },
                0,
              );
            }

            // Phase 2 (0.4 → 0.6s): copy fades in
            tl.to(leftZone,   { opacity: 1, y: 0, ease: 'power2.out', duration: 0.2 }, 0.4);
            // Phase 2 (0.5 → 0.72s): screenshot fades in
            tl.to(screenshot, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.22 }, 0.5);

            return tl;
          };

          // Spec 026: pin retired. Entrance plays once on viewport entry
          // via a direct ScrollTrigger; visitor scrolls freely while it plays.
          let played = false;

          ScrollTrigger.create({
            id: 'product-screens-entrance',
            trigger: section,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              if (played) return;
              played = true;
              const entranceTl = buildEntranceTl();
              log('product-screens-entrance', 'ANIM_START');
              entranceTl.play(0).then(() => {
                log('product-screens-entrance', 'ANIM_COMPLETE');
              });
            },
          });
        },
      );

      // ── Below 1280px or reduced motion: resting state immediately ──────
      const showRestingState = () => {
        const card       = cardRef.current;
        const leftZone   = leftZoneRef.current;
        const screenshot = screenshotRef.current;
        const pillEls    = pillRefs.current.filter((el): el is HTMLButtonElement => el !== null);
        if (!card || !leftZone || !screenshot) return;
        gsap.set(card,                   { scaleX: 1, scaleY: 1, borderRadius: 20 });
        gsap.set([leftZone, screenshot], { opacity: 1, y: 0 });
        gsap.set(pillEls,                { x: 0, y: 0, opacity: 1 });
      };

      mm.add('(max-width: 1279px)',              showRestingState);
      mm.add('(prefers-reduced-motion: reduce)', showRestingState);
    }, sectionRef);

    return () => ctx.revert();
  }, [tools, getDesktopRects]);

  // ── Tool switching ──────────────────────────────────────────────────────
  const handlePillClick = useCallback(
    (newIndex: number) => {
      if (transitioningRef.current || newIndex === activeIndex) return;
      transitioningRef.current = true;

      const direction = newIndex > activeIndex ? 1 : -1;
      // direction 1 = going right → old exits left, new enters from right
      const exitX  = `${direction * -100}%`;
      const enterX = `${direction * 100}%`;

      const leftZone  = leftZoneRef.current;
      const screenshot = screenshotRef.current;
      const card      = cardRef.current;

      if (!leftZone || !screenshot || !card) {
        transitioningRef.current = false;
        return;
      }

      const newTool = tools[newIndex];

      gsap.timeline({
        onComplete: () => {
          transitioningRef.current = false;
        },
      })
        // ── Animate out ──
        .to(leftZone,   { x: exitX, opacity: 0, duration: 0.28, ease: 'power2.in' }, 0)
        .to(screenshot, { x: exitX, opacity: 0, duration: 0.32, ease: 'power2.in' }, 0.04)
        // ── Swap content at midpoint ──
        .call(() => {
          flushSync(() => setActiveIndex(newIndex));
          gsap.set(leftZone,   { x: enterX, opacity: 0 });
          gsap.set(screenshot, { x: enterX, opacity: 0 });
        })
        // ── Crossfade card background ──
        .to(card, { backgroundColor: newTool.cardBg, duration: 0.4, ease: 'power1.inOut' }, 0)
        // ── Animate in (copy/mark leads screenshot by ~80ms) ──
        .to(leftZone,   { x: '0%', opacity: 1, duration: 0.38, ease: 'power2.out' })
        .to(screenshot, { x: '0%', opacity: 1, duration: 0.42, ease: 'power2.out' }, '-=0.3');
    },
    [activeIndex, tools],
  );

  const currentTool = tools[activeIndex];

  return (
    <div className="ps-container hidden md:block">
      <section
        ref={sectionRef}
        className="ps-section"
        aria-label="Product showcase"
      >
        {/* Dark inset card — in-flow flex child of the section, fills the
            section content area. Children are absolutely positioned at
            Figma percentages of card dimensions (the card is the local
            coordinate system the screenshot stack overflows out of).
            overflow:hidden clips the screenshot's rounded corners and the
            right-edge overflow of the stack. */}
        <div
          ref={cardRef}
          className="ps-card"
          style={{ backgroundColor: currentTool.cardBg }}
        >
          {/* Pill nav row — top-anchored, slightly right of centre. */}
          <nav className="ps-pill-nav" aria-label="Product tools">
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
                  className="ps-pill"
                  style={
                    isActive
                      ? { backgroundColor: tool.pillFill, border: 'none' }
                      : {
                          backgroundColor: 'transparent',
                          borderWidth: 'var(--ps-pill-border-w)',
                          borderStyle: 'solid',
                          borderColor: currentTool.inactiveBorder,
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
                    className="ps-pill-square"
                    style={{ backgroundColor: isActive ? currentTool.cardBg : tool.squareColor }}
                    aria-hidden="true"
                  />
                  <span
                    className="ps-pill-label"
                    style={isActive ? { color: currentTool.cardBg } : undefined}
                  >
                    {tool.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Left content zone: mark icon + value copy in the lower-left
              of the card (Figma percentages). */}
          <div ref={leftZoneRef} className="ps-left-zone">
            <KeystoneMark
              color={currentTool.markColor}
              className="ps-mark-icon"
              width={36}
              height={41}
            />
            <p className="ps-copy" style={{ color: currentTool.copyAccent }}>
              {currentTool.copyText}
            </p>
          </div>

          {/* Right screenshot zone: stacked screenshot composition. Width
              is wider than the available space so the stack extends past
              the card's right edge; card's overflow:hidden clips it.
              Renders one layer per entry in `tool.screenshotLayers`,
              front-to-back. CSS uses `data-depth` to offset back layers,
              producing the page-stack depth effect (spec 024). */}
          <div ref={screenshotRef} className="ps-screenshot-zone">
            {currentTool.screenshotLayers.map((src, depth) => (
              <div
                key={`${currentTool.id}-${depth}`}
                className="ps-screenshot-layer"
                data-depth={depth}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="ps-screenshot-img"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
