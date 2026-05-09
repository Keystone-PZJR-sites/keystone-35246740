'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowNarrowRight } from '@untitledui/icons';
import { useLeadCapture } from './LeadCaptureModal';

gsap.registerPlugin(ScrollTrigger);

// Use a velocity threshold rather than direction so GSAP's snap micro-events
// (which briefly reverse direction during easing) don't toggle the nav.
// 80 px/s requires deliberate human scrolling while ignoring snap corrections.
const VEL_THRESHOLD = 80;

export interface HeroNavProps {
  wordmarkSrc: string;
}

export function HeroNav({ wordmarkSrc }: HeroNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const { openModal } = useLeadCapture();

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let isHidden = false;

    const tracker = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const heroPinTrigger = ScrollTrigger.getById('hero-pin');
        const isPastHero = heroPinTrigger ? self.scroll() > heroPinTrigger.end : false;

        if (!isPastHero) {
          if (isHidden) {
            gsap.to(nav, { y: 0, duration: 0.4, ease: 'power2.out', overwrite: true });
            isHidden = false;
          }
          return;
        }

        const vel = self.getVelocity();
        if (vel > VEL_THRESHOLD && !isHidden) {
          gsap.to(nav, { y: '-120%', duration: 0.3, ease: 'power2.in', overwrite: true });
          isHidden = true;
        } else if (vel < -VEL_THRESHOLD && isHidden) {
          gsap.to(nav, { y: 0, duration: 0.4, ease: 'power2.out', overwrite: true });
          isHidden = false;
        }
      },
    });

    return () => tracker.kill();
  }, []);

  return (
    <nav
      ref={navRef}
      // Mobile:  px-6  pt-5  → 24 px sides, 20 px top  (Figma: 345 px pill on 393 px frame)
      // Tablet+: px-12 pt-6  → 48 px sides, 24 px top  (unchanged desktop design)
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-5 md:px-12 md:pt-6"
      aria-label="Main navigation"
    >
      {/* Mobile:  pl-4 pr-2 py-2  → 16/8/8 px  (Figma pill padding)         */}
      {/* Tablet+: px-12 py-5      → 48/20 px   (unchanged desktop design)    */}
      <div className="flex w-full items-center justify-between rounded-full bg-[var(--color-hero-bg)] pl-4 pr-2 py-2 md:px-12 md:py-5">
        {/* Mobile: 20 px tall  (Figma: 103 × 20 px wordmark)                 */}
        {/* Tablet+: 30 px tall (unchanged desktop design)                    */}
        <Image
          src={wordmarkSrc}
          alt="Keystone"
          width={154}
          height={30}
          className="h-5 w-auto md:h-[30px]"
        />
        <div className="flex items-center gap-2">
          {/* "Learn more" — hidden on mobile, shown on tablet+.              */}
          {/* Wrapped in a div using display:contents at md+ to avoid the CSS */}
          {/* layer specificity conflict between .hero-pill-btn and Tailwind's */}
          {/* layered .hidden utility.                                         */}
          <div className="hidden md:contents">
            <button
              type="button"
              onClick={(e) => openModal(e.currentTarget)}
              className="hero-pill-btn h-10 bg-[var(--color-hero-surface)] px-3 text-base text-[var(--color-hero-accent)] tracking-[-0.02em]"
            >
              Learn more
            </button>
          </div>
          {/* Login button — compact on mobile, full-size on tablet+.         */}
          <button
            type="button"
            onClick={(e) => openModal(e.currentTarget)}
            className="hero-pill-btn py-2 pl-3 pr-[10px] gap-2 bg-[var(--color-hero-accent)] text-sm text-[var(--color-hero-bg)] tracking-[-0.01em] md:h-10 md:text-base md:pr-2 md:tracking-[-0.02em]"
          >
            Login
            <ArrowNarrowRight size={16} color="var(--color-hero-bg)" />
          </button>
        </div>
      </div>
    </nav>
  );
}
