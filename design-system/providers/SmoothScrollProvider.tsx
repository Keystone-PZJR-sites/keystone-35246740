'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { DESKTOP_MIN_PX } from '@/design-system/tokens/breakpoints';

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
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Guard against React Strict Mode double-invoke or hot reload
    ScrollSmoother.get()?.kill();

    // On mobile (<985px), hide the overlay immediately — no scroll animations
    // run on mobile so the overlay serves no purpose there.
    if (overlayRef.current && window.innerWidth < DESKTOP_MIN_PX) {
      overlayRef.current.style.display = 'none';
      return;
    }
    let smoother: ScrollSmoother | null = null;
    try {
      smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.5,
        effects: true,
      });

      // Fade out the loading overlay once ScrollSmoother + all child
      // ScrollTriggers are initialised. The overlay blocks scroll input and
      // hides the font-swap flash during the brief setup window.
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.4,
          delay: 0.1,
          ease: 'power1.in',
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = 'none';
            }
          },
        });
      }
    } catch {
      // Failsafe: never leave the loading overlay covering the app.
      if (overlayRef.current) {
        overlayRef.current.style.display = 'none';
        overlayRef.current.style.opacity = '0';
      }
    }

    return () => smoother?.kill();
  }, []);

  return (
    <div id="smooth-wrapper">
      {/*
       * Loading overlay — sits above all content until ScrollSmoother is
       * initialised. Prevents:
       *   1. FOUT on first paint — opaque overlay hides the brief window
       *      between first render and font availability (font-display: block
       *      in base.css holds the flash to the same short window).
       *   2. Touch-based scroll before the pins are in place on mobile.
       * Matches the hero background colour so the fade-out is seamless.
       */}
      <div
        ref={overlayRef}
        className="smooth-scroll-loading-overlay"
        aria-hidden="true"
      />
      {fixedChildren}
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}
