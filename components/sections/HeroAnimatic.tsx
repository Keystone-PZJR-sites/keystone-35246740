'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { KeystoneMark } from '@/components/elements';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowNarrowRight } from '@untitledui/icons';
import { useLeadCapture } from './LeadCaptureModal';

gsap.registerPlugin(ScrollTrigger);

export interface HeroAnimaticProps {
  headlineLine1: string;
  headlineLine2: string;
  subheadline: string;
  cta1Label: string;
  cta2Label: string;
  videoSrc: string;
  wordmarkSrc: string;
  markColor: string;
  /** Set to false when the nav is rendered externally (e.g. inside ScrollSmoother's wrapper) */
  renderNav?: boolean;
}

export function HeroAnimatic({
  headlineLine1,
  headlineLine2,
  subheadline,
  cta1Label,
  cta2Label,
  videoSrc,
  wordmarkSrc,
  markColor,
  renderNav = true,
}: HeroAnimaticProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const { openModal } = useLeadCapture();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Tablet and desktop with motion: full scroll animation
      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          const tl = gsap.timeline();

          // Headline slides upward and completely exits the top of the viewport
          tl.to(headlineRef.current, {
            y: '-110vh',
            ease: 'none',
            duration: 1,
          });

          // Bottom content fades in starting at 40% of the animation
          tl.fromTo(
            bottomContentRef.current,
            { opacity: 0 },
            { opacity: 1, ease: 'none', duration: 0.6 },
            0.4,
          );

          ScrollTrigger.create({
            id: 'hero-pin',
            trigger: sectionRef.current,
            start: 'top top',
            // Scroll distance driving the animation — snap means most visitors
            // only travel a fraction of this before auto-complete fires.
            end: '+=150%',
            pin: true,
            scrub: 0.6,
            animation: tl,
            snap: {
              // Snap back to start if the visitor hasn't yet crossed 5% progress;
              // otherwise auto-complete to the end state.
              snapTo: (progress: number) => (progress < 0.05 ? 0 : 1),
              duration: { min: 0.2, max: 0.5 },
              // 100 ms pause triggers auto-complete per spec
              delay: 0.1,
              ease: 'power1.inOut',
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
    <>
      {renderNav && (
        <nav
          className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:px-12 md:pt-6"
          aria-label="Main navigation"
        >
          <div className="flex w-full items-center justify-between rounded-full bg-[#042019] px-6 py-3 md:px-12 md:py-5">
            <Image
              src={wordmarkSrc}
              alt="Keystone"
              width={154}
              height={30}
              className="h-6 w-auto md:h-[30px]"
            />
            <a
              href="#"
              className="flex items-center gap-2 rounded-full bg-[#6ecc8b] pl-3 pr-2 py-2 font-['FK_Grotesk_Neue',sans-serif] text-sm md:text-base text-[#042019] leading-none tracking-[-0.02em]"
            >
              Login
              <ArrowNarrowRight size={16} color="#042019" />
            </a>
          </div>
        </nav>
      )}

      {/* Hero section — full viewport height, dark green, pinned during animation */}
      <section
        id="hero-animatic"
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden bg-[#042019]"
      >
        {/* Video frame — inset 24 px on desktop, full width on mobile */}
        <div className="absolute inset-x-0 top-0 bottom-0 md:inset-x-6 md:bottom-6 md:rounded-b-2xl overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute h-full w-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>

        {/* Headline — starts near the section bottom, GSAP translates it upward */}
        <div
          ref={headlineRef}
          className="absolute bottom-6 left-0 right-0 z-10 pointer-events-none md:bottom-12 md:left-6 md:right-6"
          style={{ willChange: 'transform' }}
        >
          {/* "Always ON" — left-anchored 24 px from video left edge */}
          <p
            className="leading-[0.82] font-['FK_Screamer',sans-serif] font-bold not-italic text-[#f0eee6] uppercase text-left md:pl-6"
            style={{ fontSize: 'clamp(3rem, 15vw, 20rem)' }}
          >
            {headlineLine1}
          </p>
          {/* "SALES & MARKETING" — right-anchored 24 px from video right edge */}
          <p
            className="leading-[0.82] font-['FK_Screamer',sans-serif] font-bold not-italic text-[#f0eee6] uppercase text-right md:pr-6"
            style={{ fontSize: 'clamp(3rem, 15vw, 20rem)' }}
          >
            {headlineLine2}
          </p>
        </div>

        {/* Bottom content — hidden on mobile via CSS, opacity 0 until animated in on desktop */}
        <div
          ref={bottomContentRef}
          className="hero-bottom-content absolute bottom-15 left-6 right-6 md:bottom-16 md:left-24 md:right-[110px] z-10 items-end justify-between"
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
            <p className="font-['FK_Grotesk_Neue',sans-serif] text-[#6ecc8b] text-xl lg:text-2xl leading-[1.2] tracking-[-0.03em]">
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
    </>
  );
}
