'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowNarrowRight } from '@untitledui/icons';

gsap.registerPlugin(ScrollTrigger);

export interface HeroNavProps {
  wordmarkSrc: string;
}

export function HeroNav({ wordmarkSrc }: HeroNavProps) {
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

        if (self.direction === 1 && !isHidden) {
          gsap.to(nav, { y: '-120%', duration: 0.3, ease: 'power2.in', overwrite: true });
          isHidden = true;
        } else if (self.direction === -1 && isHidden) {
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
  );
}
