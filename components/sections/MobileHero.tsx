'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowNarrowRight } from '@untitledui/icons';
import { KeystoneMark } from '@/components/elements';
import { useLeadCapture } from './LeadCaptureModal';
import { useVideoCarousel } from '@/lib/useVideoCarousel';

export interface MobileHeroProps {
  headlineLine1: string;
  headlineLine2: string;
  subheadline: string;
  cta1Label: string;
  cta2Label: string;
  /** Ordered array of clips — same six-clip autoloop sequence as desktop.
   *  WebM is served to browsers that support it; MP4 is the fallback.
   *  `poster` is the base path for the responsive WebP still. */
  videoSrcs: { webm: string; mp4: string; poster?: string }[];
  markColor: string;
}

/**
 * Mobile-only hero section (below 768px).
 *
 * Sizes to its content — no `min-height: 100svh` floor (see
 * `docs/explainers/responsive.md` § Section Heights for the policy).
 * The video zone is a fixed 40svh band at the top; the content zone
 * (mark + headline + subheadline + CTA) sits below it at its intrinsic
 * height. The section's overall height is the sum of those two.
 *
 * Entrance choreography (Spec 031): same three-phase sequence as desktop
 * — video frame, then content (mark + headline), then bottom row
 * (subheadline + CTAs). Fires immediately on hydration.
 *
 * Shown via `md:hidden` — the desktop HeroAnimatic uses `hidden md:block`.
 */
export function MobileHero({
  headlineLine1,
  headlineLine2,
  subheadline,
  cta1Label,
  cta2Label,
  videoSrcs,
  markColor,
}: MobileHeroProps) {
  const { openModal } = useLeadCapture();
  const sectionRef = useRef<HTMLElement>(null);
  const videoZoneRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  ));
  const videoRefs = useVideoCarousel(videoSrcs, { enabled: isMobile });

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        const videoZone = videoZoneRef.current;
        const headline = headlineRef.current;
        const bottom = bottomRef.current;
        if (!videoZone || !headline || !bottom) return;

        gsap.set(videoZone, { opacity: 0 });
        gsap.set(headline, { opacity: 0, y: 24 });
        gsap.set(bottom, { opacity: 0, y: 24 });

        const intro = gsap.timeline();

        intro.to(videoZone, {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        });

        intro.to(headline, {
          opacity: 1, y: 0,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'transform',
        }, 0.15);

        intro.to(bottom, {
          opacity: 1, y: 0,
          duration: 0.4,
          ease: 'power2.out',
          clearProps: 'transform',
        }, 0.35);
      });

      mm.add('(max-width: 767px) and (prefers-reduced-motion: reduce)', () => {
        const videoZone = videoZoneRef.current;
        const headline = headlineRef.current;
        const bottom = bottomRef.current;
        if (!videoZone || !headline || !bottom) return;

        gsap.set(videoZone, { opacity: 1 });
        gsap.set([headline, bottom], { opacity: 1, y: 0, clearProps: 'transform' });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="md:hidden relative overflow-hidden flex flex-col bg-[#042019]"
      aria-label="Hero"
    >
      {/* ── Video zone — top 40 svh ────────────────────────────────────────── */}
      {/* Full-bleed, no side insets. The fixed HeroNav overlays the top via   */}
      {/* its own z-50 fixed positioning.                                      */}
      <div ref={videoZoneRef} className="relative w-full flex-none h-[40svh] overflow-hidden">
        {videoSrcs[0]?.poster && (
          <picture className="absolute inset-0">
            <source
              srcSet={[300, 500, 1000, 1500, 2500].map(w => `${videoSrcs[0].poster}-${w}w.webp ${w}w`).join(', ')}
              type="image/webp"
              sizes="100vw"
            />
            <img
              src={`${videoSrcs[0].poster}-1500w.webp`}
              alt=""
              fetchPriority="high"
              decoding="async"
              className="absolute h-full w-full object-cover"
            />
          </picture>
        )}
        {videoSrcs.map((clip, i) => (
          <video
            key={i}
            ref={el => { videoRefs.current[i] = el; }}
            autoPlay={i === 0}
            muted
            playsInline
            preload={i === 0 ? 'auto' : 'none'}
            className="absolute h-full w-full object-cover"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <source src={clip.webm} type="video/webm" media="(max-width: 767px)" />
            <source src={clip.mp4} type="video/mp4" media="(max-width: 767px)" />
          </video>
        ))}
      </div>

      {/* ── Content zone — sits below the video band at its intrinsic height. */}
      {/* overflow-hidden is a guard against the headline's clamp pushing the  */}
      {/* layout past its expected bounds on extremely narrow viewports.       */}
      <div className="overflow-hidden px-6 pt-10 pb-6">
        <div ref={headlineRef}>
          <KeystoneMark
            color={markColor}
            width={36}
            height={41}
            alt="Keystone mark"
          />

          <div className="mt-7">
            <p
              className="font-['FK_Screamer',sans-serif] font-bold not-italic uppercase leading-[0.82] text-[var(--color-hero-text)]"
              style={{ fontSize: 'clamp(3.5rem, 23vw, 5.625rem)' }}
            >
              {headlineLine1}
            </p>
            <p
              className="font-['FK_Screamer',sans-serif] font-bold not-italic uppercase leading-[0.82] text-[var(--color-hero-text)]"
              style={{ fontSize: 'clamp(3.5rem, 23vw, 5.625rem)' }}
            >
              {headlineLine2}
            </p>
          </div>
        </div>

        <div ref={bottomRef}>
          <p className="mt-5 font-['FK_Grotesk_Neue',sans-serif] text-base leading-[1.2] tracking-[-0.03em] text-[var(--color-hero-accent)]">
            {subheadline}
          </p>

          <div className="mt-7 flex w-fit items-center gap-4">
            <button
              type="button"
              onClick={(e) => openModal(e.currentTarget)}
              className="hero-pill-btn bg-[#063126] px-3 py-3 text-sm text-[var(--color-hero-accent)] tracking-[-0.01em]"
              style={{ borderRadius: 0 }}
            >
              {cta1Label}
            </button>
            <button
              type="button"
              onClick={(e) => openModal(e.currentTarget)}
              className="hero-pill-btn gap-2 bg-[var(--color-hero-accent)] py-3 pl-3 pr-[10px] text-sm text-[var(--color-hero-bg)] tracking-[-0.01em]"
            >
              {cta2Label}
              <ArrowNarrowRight size={12} color="var(--color-hero-bg)" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
