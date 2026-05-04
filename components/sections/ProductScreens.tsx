'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Image from 'next/image';
import gsap from 'gsap';
import { KeystoneMark } from '@/components/elements';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  screenshotSrc: string;
}

export interface ProductScreensPillPosition {
  label: string;
  left: string;
  top: string;
}

export interface ProductScreensProps {
  tools: ProductScreensTool[];
}

export function ProductScreens({ tools }: ProductScreensProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const transitioningRef = useRef(false);

  // Wrapper provides a stable, isolated layout boundary for GSAP's pin spacer.
  // Without it, the spacer inserts directly into #smooth-content and GSAP's
  // internal ScrollTrigger.refresh() can mis-measure all other trigger offsets.
  const containerRef  = useRef<HTMLDivElement>(null);
  const sectionRef    = useRef<HTMLElement>(null);
  const cardRef       = useRef<HTMLDivElement>(null);
  const pillNavRef    = useRef<HTMLDivElement>(null);
  const pillRefs      = useRef<(HTMLButtonElement | null)[]>([]);
  const screenshotRef = useRef<HTMLDivElement>(null);
  // leftZoneRef wraps mark icon + copy text as a single animation unit
  const leftZoneRef   = useRef<HTMLDivElement>(null);

  // Whether the entrance animation has completed (enables full pill interaction)
  const entranceDoneRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Desktop (≥1280px) + full motion ────────────────────────────────
      mm.add(
        '(min-width: 1280px) and (prefers-reduced-motion: no-preference)',
        () => {
          const section    = sectionRef.current;
          const card       = cardRef.current;
          const pillNav    = pillNavRef.current;
          const leftZone   = leftZoneRef.current;
          const screenshot = screenshotRef.current;
          if (!section || !card || !pillNav || !leftZone || !screenshot) return;

          const pillEls = pillRefs.current.filter(
            (el): el is HTMLButtonElement => el !== null,
          );

          // ── Initial states ─────────────────────────────────────────────
          // Scale the card to cover the full section (= full viewport).
          // transform-origin: center bottom means:
          //   • horizontal center stays fixed (cream appears symmetrically on sides)
          //   • bottom edge stays at its CSS position (section bottom − 24 px)
          //   • top edge extends *above* the section top, visible over the prior section
          //     because .ps-section has overflow: visible on desktop.
          // Net effect: as the section scrolls up and the scale decreases, the card
          // appears to rise from a full-screen green background into the inset card.
          const initialScaleX = section.offsetWidth  / card.offsetWidth;
          const initialScaleY = section.offsetHeight / card.offsetHeight;

          gsap.set(card, {
            scaleX: initialScaleX,
            scaleY: initialScaleY,
            borderRadius: 0,
            transformOrigin: 'center bottom',
          });

          // Card content: hidden until Phase 3
          gsap.set([leftZone, screenshot], { opacity: 0, y: 24 });

          // ── Entrance timeline ──────────────────────────────────────────
          const tl = gsap.timeline({ paused: true });

          // Phase 1 (0 → 0.65): card contracts.
          // No y-travel needed — the section's natural scroll provides the
          // "rising from below" motion; the scale creates the contraction.
          tl.to(
            card,
            { scaleX: 1, scaleY: 1, borderRadius: 20, ease: 'power2.inOut', duration: 0.65 },
            0,
          );

          // Phase 3 (0.4 → 1.0): content loads in
          tl.to(
            leftZone,
            { opacity: 1, y: 0, ease: 'power2.out', duration: 0.2 },
            0.4,
          );
          tl.to(
            screenshot,
            { opacity: 1, y: 0, ease: 'power2.out', duration: 0.22 },
            0.5,
          );

          // ── Two-trigger setup ──────────────────────────────────────────
          //
          // Trigger 1 (no pin): drives the entrance animation while the section
          // scrolls naturally from viewport-bottom to viewport-top. This starts
          // while the previous section (EveryChannel) is still visible — the
          // card's scaled overflow (above section bounds) is already on screen.
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.5,
            animation: tl,
          });

          // Trigger 2 (pin): holds the section at viewport-top for interaction.
          // By the time this fires, the entrance animation is at 100 %.
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=80%',
            pin: true,
            pinSpacing: true,
            onEnter: () => { entranceDoneRef.current = true; },
          });
        },
      );

      // ── Below 1280px or reduced motion: resting state immediately ──────
      const showRestingState = () => {
        entranceDoneRef.current = true;
        const card       = cardRef.current;
        const leftZone   = leftZoneRef.current;
        const screenshot = screenshotRef.current;
        const pillEls    = pillRefs.current.filter((el): el is HTMLButtonElement => el !== null);
        if (!card || !leftZone || !screenshot) return;
        gsap.set(card,                   { scaleX: 1, scaleY: 1, borderRadius: 20 });
        gsap.set([leftZone, screenshot], { opacity: 1, y: 0 });
        gsap.set(pillEls,                { x: 0, y: 0, opacity: 1 });
      };

      mm.add('(max-width: 1279px)',             showRestingState);
      mm.add('(prefers-reduced-motion: reduce)', showRestingState);
    }, sectionRef);

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    <div ref={containerRef} className="ps-container">
      <section
        ref={sectionRef}
        className="ps-section"
        aria-label="Product showcase"
      >
      {/* Dark inset card — overflow:hidden clips screenshot rounded corners */}
      <div
        ref={cardRef}
        className="ps-card"
        style={{ backgroundColor: currentTool.cardBg }}
      >
        {/* Left content zone: mark icon + value copy */}
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

        {/* Right content zone: product UI screenshot */}
        <div ref={screenshotRef} className="ps-screenshot-zone">
          <Image
            src={currentTool.screenshotSrc}
            alt=""
            fill
            className="ps-screenshot-img"
            unoptimized
          />
        </div>
      </div>

      {/* Pill nav row — floats above the card at z-20 */}
      <nav ref={pillNavRef} className="ps-pill-nav" aria-label="Product tools">
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
                      border: `1.346px solid ${currentTool.inactiveBorder}`,
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
