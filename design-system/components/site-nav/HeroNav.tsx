'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import type { HeroNavProps } from './types';

gsap.registerPlugin(ScrollTrigger);

// Use a velocity threshold rather than direction so GSAP's snap micro-events
// (which briefly reverse direction during easing) don't toggle the nav.
// 80 px/s requires deliberate human scrolling while ignoring snap corrections.
const VEL_THRESHOLD = 80;
// Off-screen target: -120% (not -100%) clears the bar plus its drop shadow.
const HIDDEN_Y = '-120%';
const HIDE_DURATION = 0.3;
const SHOW_DURATION = 0.4;

/**
 * Full site navigation overlaid on the hero (Spec 034). One "Main navigation"
 * landmark renders the desktop bar (≥985px) and the mobile bar (<985px); CSS
 * swaps them. The bar stays visible while the visitor is in the hero, hides
 * when scrolling down past it, and returns on scroll-up — the scroll-hide
 * behavior is gated on the hero section bottom. Reduced-motion visitors get a
 * static, always-visible bar (the matchMedia branch never runs).
 */
export function HeroNav({
  items,
  loginLabel,
  loginHref,
  ctaLabel,
  wordmarkColor = 'var(--color-hero-accent,#6ecc8b)',
  openMenuLabel,
  closeMenuLabel,
}: HeroNavProps) {
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const nav = navRef.current;
        if (!nav) return;

        let isHidden = false;
        let heroBottom = window.innerHeight;

        const measureHero = () => {
          const hero = document.getElementById('hero-animatic');
          heroBottom = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
        };
        measureHero();
        window.addEventListener('resize', measureHero);

        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const isPastHero = self.scroll() > heroBottom;

            if (!isPastHero) {
              if (isHidden) {
                gsap.to(nav, { y: 0, duration: SHOW_DURATION, ease: 'power2.out', overwrite: true });
                isHidden = false;
              }
              return;
            }

            const vel = self.getVelocity();
            if (vel > VEL_THRESHOLD && !isHidden) {
              gsap.to(nav, { y: HIDDEN_Y, duration: HIDE_DURATION, ease: 'power2.in', overwrite: true });
              isHidden = true;
            } else if (vel < -VEL_THRESHOLD && isHidden) {
              gsap.to(nav, { y: 0, duration: SHOW_DURATION, ease: 'power2.out', overwrite: true });
              isHidden = false;
            }
          },
        });

        return () => window.removeEventListener('resize', measureHero);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="hero-nav" aria-label="Main navigation" data-theme="custom">
      <DesktopNav
        items={items}
        loginLabel={loginLabel}
        loginHref={loginHref}
        ctaLabel={ctaLabel}
        wordmarkColor={wordmarkColor}
      />
      <MobileNav
        items={items}
        loginLabel={loginLabel}
        loginHref={loginHref}
        ctaLabel={ctaLabel}
        wordmarkColor={wordmarkColor}
        openMenuLabel={openMenuLabel}
        closeMenuLabel={closeMenuLabel}
      />
    </nav>
  );
}
