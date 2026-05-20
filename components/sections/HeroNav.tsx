'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowNarrowRight } from '@untitledui/icons';
import { KeystoneWordmark } from '@/components/elements';

gsap.registerPlugin(ScrollTrigger);

// Use a velocity threshold rather than direction so GSAP's snap micro-events
// (which briefly reverse direction during easing) don't toggle the nav.
// 80 px/s requires deliberate human scrolling while ignoring snap corrections.
const VEL_THRESHOLD = 80;

export interface HeroNavProps {
  wordmarkColor?: string;
}

export function HeroNav({ wordmarkColor = '#6ECC8B' }: HeroNavProps) {
  const navRef = useRef<HTMLElement>(null);

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
      // Mobile: tighter inset + thinner bar. Desktop: reduced side padding and
      // a slimmer nav compared with the previous hero version.
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 pt-2 md:px-12 md:pt-6"
      aria-label="Main navigation"
    >
      <div className="flex w-full items-center justify-between rounded-full bg-[var(--color-hero-bg)] pl-4 pr-2 py-[7px] md:px-10 md:py-4">
        <KeystoneWordmark
          color={wordmarkColor}
          alt="Keystone"
          width={154}
          height={30}
          className="h-[18px] w-auto md:h-5"
        />
        <div className="flex items-center">
          <Link
            href="/portal"
            className="flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--color-hero-accent)] py-[7px] pl-3 pr-[10px] font-['FK_Grotesk_Neue',sans-serif] text-sm leading-none tracking-[-0.01em] text-[var(--color-hero-bg)] md:hidden"
          >
            Schedule demo
            <ArrowNarrowRight size={16} color="var(--color-hero-bg)" />
          </Link>

          <Link
            href="/portal"
            className="group hidden cursor-pointer items-center gap-2 font-['FK_Grotesk_Neue',sans-serif] text-lg leading-none tracking-[-0.01em] text-[var(--color-hero-text)] md:inline-flex"
          >
            Schedule demo
            <span className="relative inline-flex size-4 overflow-hidden" aria-hidden="true">
              <span className="absolute inset-0 transition-transform duration-200 ease-out group-hover:translate-x-full">
                <ArrowNarrowRight size={16} color="var(--color-hero-text)" />
              </span>
              <span className="absolute inset-0 -translate-x-full transition-transform duration-200 ease-out group-hover:translate-x-0">
                <ArrowNarrowRight size={16} color="var(--color-hero-text)" />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
