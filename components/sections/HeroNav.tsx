'use client';

import Image from 'next/image';
import { ArrowNarrowRight } from '@untitledui/icons';

export interface HeroNavProps {
  wordmarkSrc: string;
}

export function HeroNav({ wordmarkSrc }: HeroNavProps) {
  return (
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
  );
}
