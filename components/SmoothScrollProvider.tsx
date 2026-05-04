'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  /**
   * Elements rendered inside #smooth-wrapper but OUTSIDE #smooth-content.
   * Use this for anything with `position: fixed` — ScrollSmoother applies a
   * transform to #smooth-content which breaks fixed positioning for its
   * descendants, so fixed elements must live here instead.
   */
  fixedChildren?: React.ReactNode;
}

export function SmoothScrollProvider({ children, fixedChildren }: SmoothScrollProviderProps) {
  useLayoutEffect(() => {
    // Guard against React Strict Mode double-invoke or hot reload
    ScrollSmoother.get()?.kill();

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      effects: true,
    });

    return () => smoother.kill();
  }, []);

  return (
    <div id="smooth-wrapper">
      {fixedChildren}
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}
