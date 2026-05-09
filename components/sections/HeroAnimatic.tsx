'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { KeystoneMark } from '@/components/elements';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowNarrowRight } from '@untitledui/icons';
import { useLeadCapture } from './LeadCaptureModal';
import { createSectionPin, logSectionEvent } from '@/lib/sectionPin';

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

  // Preload the clip that follows the currently-playing one.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoSrcs.length <= 1) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.type = 'video/mp4';
    document.head.appendChild(link);

    const updatePreload = () => {
      // indexRef has already been incremented by the advance listener
      // (which fires first), so this correctly preloads the clip after next.
      const nextIndex = (indexRef.current + 1) % videoSrcs.length;
      link.href = videoSrcs[nextIndex];
    };

    // Seed the preload for clip[1] on mount.
    updatePreload();

    video.addEventListener('ended', updatePreload);
    video.addEventListener('error', updatePreload);
    return () => {
      video.removeEventListener('ended', updatePreload);
      video.removeEventListener('error', updatePreload);
      link.parentNode?.removeChild(link);
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
          if (!section) return;

          // Animation plays at its own pace once triggered — not scrubbed by scroll.
          const tl = gsap.timeline({ paused: true });

          tl.to(headlineRef.current, {
            y: '-110vh',
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
          let animComplete = false;

          createSectionPin({
            id: 'hero-pin',
            section,
            // fireOnScroll: true — hero is in the viewport at scroll=0 on
            // page load, so GSAP's initialization refresh would fire onEnter
            // immediately. We defer until the visitor first scrolls forward.
            fireOnScroll: true,
            onEnter: () => {
              logSectionEvent('hero-pin', 'ANIM_ENTER_CALLED', { played });
              if (played) return;
              played = true;
              logSectionEvent('hero-pin', 'ANIM_START');
              tl.play(0).then(() => {
                animComplete = true;
                logSectionEvent('hero-pin', 'ANIM_COMPLETE');
              });
            },
            isAnimComplete: () => animComplete,
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
      className="hidden md:block relative h-screen w-full overflow-hidden bg-[#042019]"
    >
      {/* Video frame — inset 24 px */}
      <div className="absolute inset-x-6 top-0 bottom-6 rounded-b-2xl overflow-hidden">
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

      {/* Headline — starts near the section bottom, GSAP translates it upward */}
      <div
        ref={headlineRef}
        className="absolute bottom-12 left-6 right-6 z-10 pointer-events-none"
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

      {/* Bottom content — hidden on mobile via CSS, opacity 0 until animated in on desktop */}
      <div
        ref={bottomContentRef}
        className="hero-bottom-content absolute bottom-16 left-24 right-[110px] z-10 items-end justify-between"
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
    </section>
  );
}
