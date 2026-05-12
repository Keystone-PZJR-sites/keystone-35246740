'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { KeystoneMark } from '@/components/elements';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowNarrowRight } from '@untitledui/icons';
import { useLeadCapture } from './LeadCaptureModal';
import { log } from '@/lib/logger';

gsap.registerPlugin(ScrollTrigger);

export interface HeroAnimaticProps {
  headlineLine1: string;
  headlineLine2: string;
  subheadline: string;
  cta1Label: string;
  cta2Label: string;
  /** Ordered array of clip URLs; must have at least one entry. */
  videoSrcs: string[];
  markColor: string;
}

/**
 * Hero — desktop layout (≥768 px).
 *
 * Spec 026 retired the pin: section is `min-height: 100svh` (no fixed-
 * viewport hold), bottom-anchored content is in normal flow at the
 * section bottom with the standard `--section-padding-y` breathing room,
 * and the entrance timeline (headline slides off-screen, bottom row fades
 * in) plays once via a direct `ScrollTrigger` that fires only after the
 * visitor has scrolled past the section top — matching the original
 * fireOnScroll behaviour.
 */
export function HeroAnimatic({
  headlineLine1,
  headlineLine2,
  subheadline,
  cta1Label,
  cta2Label,
  videoSrcs,
  markColor,
}: HeroAnimaticProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const indexRef = useRef(0);
  const { openModal } = useLeadCapture();

  // Advance to the next clip on ended or error; skip silently on error.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoSrcs.length === 0) return;

    const advance = () => {
      indexRef.current = (indexRef.current + 1) % videoSrcs.length;
      video.src = videoSrcs[indexRef.current];
      video.load();
      video.play().catch(() => {});
    };

    video.addEventListener('ended', advance);
    video.addEventListener('error', advance);
    return () => {
      video.removeEventListener('ended', advance);
      video.removeEventListener('error', advance);
    };
  }, [videoSrcs]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Tablet and desktop with motion: scene-style triggered animation
      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          const section = sectionRef.current;
          const headline = headlineRef.current;
          if (!section || !headline) return;

          // Spec 026: `'-110vh'` was a viewport-fraction string. Capture the
          // visible viewport height once at setup and use it as a concrete
          // pixel offset so the headline still slides the same visible
          // distance up regardless of the section's actual height.
          const offscreen = -window.innerHeight * 1.1;

          // Animation plays at its own pace once triggered — not scrubbed by scroll.
          const tl = gsap.timeline({ paused: true });

          tl.to(headline, {
            y: offscreen,
            ease: 'power2.inOut',
            duration: 0.9,
          });

          tl.fromTo(
            bottomContentRef.current,
            { opacity: 0 },
            { opacity: 1, ease: 'power2.out', duration: 0.5 },
            0.4,
          );

          let played = false;

          ScrollTrigger.create({
            id: 'hero-entrance',
            trigger: section,
            // `top top-=2%` fires once the section's top has scrolled 2 % past
            // the viewport top — i.e. the visitor must have started scrolling.
            // This replaces the old `fireOnScroll: true` behaviour and prevents
            // the entrance from playing on initial page load.
            start: 'top top-=2%',
            once: true,
            onEnter: () => {
              if (played) return;
              played = true;
              log('hero-entrance', 'ANIM_START');
              tl.play(0).then(() => {
                log('hero-entrance', 'ANIM_COMPLETE');
              });
            },
          });
        },
      );

      // Reduced motion: skip animation entirely, show end state immediately
      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: reduce)',
        () => {
          gsap.set(headlineRef.current, { opacity: 0 });
          gsap.set(bottomContentRef.current, { opacity: 1 });
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-animatic"
      ref={sectionRef}
      // hidden md:block — the MobileHero component renders in its place below 768px.
      className="hidden md:block relative min-h-[100svh] w-full overflow-hidden bg-[#042019]"
    >
      {/* Video frame — inset 24 px (rounded bottom corners) — full-bleed
          background fill behind in-flow content. */}
      <div className="absolute inset-x-6 top-0 bottom-6 rounded-b-2xl overflow-hidden z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute h-full w-full object-cover"
        >
          <source src={videoSrcs[0]} type="video/mp4" />
        </video>
      </div>

      {/* Bottom-anchored content column — pushes children to the section
          bottom via min-h-[100svh] + flex-end. padding-bottom uses the
          standard --section-padding-y token. No top padding (video runs
          to the top of the section per spec 026 hero exception).

          DOM order matters with justify-end on a flex column: children
          stack in DOM order, all anchored to the bottom edge. The headline
          comes first so the bottom content row sits at the very bottom
          edge (with --section-padding-y breathing room) per Figma node
          1276:7813. The headline sits directly above and animates up
          off-screen during the entrance. */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-[var(--section-padding-y)]">
        {/* Headline — in normal flow above the bottom content row.
            GSAP slides this up off-screen during the entrance.
            pointer-events:none lets clicks pass through to the video region. */}
        <div
          ref={headlineRef}
          className="px-6 z-10 pointer-events-none"
          style={{ willChange: 'transform' }}
        >
          {/* "Always ON" — left-anchored 24 px from video left edge */}
          <p
            className="leading-[0.82] font-['FK_Screamer',sans-serif] font-bold not-italic text-[#f0eee6] uppercase text-left pl-6"
            style={{ fontSize: 'clamp(3rem, 15vw, 20rem)' }}
          >
            {headlineLine1}
          </p>
          {/* "SALES & MARKETING" — right-anchored 24 px from video right edge */}
          <p
            className="leading-[0.82] font-['FK_Screamer',sans-serif] font-bold not-italic text-[#f0eee6] uppercase text-right pr-6"
            style={{ fontSize: 'clamp(3rem, 15vw, 20rem)' }}
          >
            {headlineLine2}
          </p>
        </div>

        {/* Bottom content row — last in DOM so it sits at the very bottom
            edge of the section with --section-padding-y breathing room.
            Asymmetric horizontal padding preserves the Figma anchor:
            96 px from the left, clamp(24px, 7.64vw, 110px) from the right. */}
        <div
          ref={bottomContentRef}
          className="hero-bottom-content items-end justify-between"
        >
          {/* Left: Keystone mark + subheadline */}
          <div className="flex flex-col items-start gap-3 max-w-[520px]">
            <KeystoneMark
              color={markColor}
              width={37}
              height={41}
              className="h-10 w-auto"
              alt="Keystone mark"
            />
            <p className="font-['FK_Grotesk_Neue',sans-serif] text-[#6ecc8b] text-2xl leading-[1.2] tracking-[-0.03em]">
              {subheadline}
            </p>
          </div>

          {/* Right: CTA pill with two buttons */}
          <div className="flex items-center gap-3 rounded-full bg-[var(--color-hero-bg)] p-3">
            <button
              type="button"
              onClick={(e) => openModal(e.currentTarget)}
              className="hero-pill-btn h-12 bg-[var(--color-hero-surface)] px-4 text-[var(--color-hero-accent)] text-lg tracking-[-0.01em]"
            >
              {cta1Label}
            </button>
            <button
              type="button"
              onClick={(e) => openModal(e.currentTarget)}
              className="hero-pill-btn h-12 gap-2 bg-[var(--color-hero-accent)] pl-4 pr-3 text-[var(--color-hero-bg)] text-lg tracking-[-0.01em]"
            >
              {cta2Label}
              <ArrowNarrowRight size={16} color="var(--color-hero-bg)" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
