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
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:px-12 md:pt-6"
      aria-label="Main navigation"
    >
      <div className="flex w-full items-center justify-between rounded-full bg-[var(--color-hero-bg)] px-6 py-3 md:px-12 md:py-5">
        <Image
          src={wordmarkSrc}
          alt="Keystone"
          width={154}
          height={30}
          className="h-6 w-auto md:h-[30px]"
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => openModal(e.currentTarget)}
            className="hero-pill-btn h-10 bg-[var(--color-hero-surface)] px-3 text-sm md:text-base text-[var(--color-hero-accent)] tracking-[-0.02em]"
          >
            Learn more
          </button>
          <button
            type="button"
            onClick={(e) => openModal(e.currentTarget)}
            className="hero-pill-btn h-10 gap-2 bg-[var(--color-hero-accent)] pl-3 pr-2 text-sm md:text-base text-[var(--color-hero-bg)] tracking-[-0.02em]"
          >
            Login
            <ArrowNarrowRight size={16} color="var(--color-hero-bg)" />
          </button>
        </div>
      </div>
    </nav>
  );
}
