'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { KeystoneMark } from '@/components/elements';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowNarrowRight } from '@untitledui/icons';
import { useLeadCapture } from './LeadCaptureModal';
import { log } from '@/lib/logger';
import { useVideoCarousel } from '@/lib/useVideoCarousel';

gsap.registerPlugin(ScrollTrigger);

export interface HeroAnimaticProps {
  headlineLine1: string;
  headlineLine2: string;
  subheadline: string;
  cta1Label: string;
  cta2Label: string;
  /** Ordered array of clips; must have at least one entry. WebM is served to
   *  browsers that support it; MP4 is the fallback. `poster` is the base path
   *  for the responsive WebP still (e.g. `/videos/.../posters/hero-01`);
   *  the component appends `-{w}w.webp` for each breakpoint. */
  videoSrcs: { webm: string; mp4: string; poster?: string }[];
  markColor: string;
}

/**
 * Hero — desktop layout (≥768 px).
 *
 * Opts into `min-height: 100svh` (the site-wide default is content-driven;
 * see `docs/explainers/responsive.md` § Section Heights). The hero is the
 * entry hook for the page and is designed to fill the visible viewport on
 * first load — sizing it to content would feel anti-climactic on a tall
 * window. Bottom-anchored content sits in normal flow at the section
 * bottom with the standard `--section-padding-y` breathing room.
 *
 * Entrance choreography (Spec 031): a three-phase GSAP timeline fires
 * immediately on hydration — headline first, then video frame, then the
 * bottom row (subheadline + CTAs). This is no longer gated on the first
 * video's `play` event. The headline slide-off still plays once via a
 * `ScrollTrigger` that fires only after the visitor has scrolled past
 * the section top.
 */
export function HeroAnimatic({
  headlineLine1,
  headlineLine2,
  subheadline,
  cta1Label,
  cta2Label,
  videoSrcs,
  markColor,
}: HeroAnimaticProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const bottomBandRef = useRef<HTMLDivElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const { openModal } = useLeadCapture();
  const [bottomBandHeight, setBottomBandHeight] = useState(184);
  const [isLearnMoreHovered, setIsLearnMoreHovered] = useState(false);
  const [isGetStartedHovered, setIsGetStartedHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
  ));
  const videoRefs = useVideoCarousel(videoSrcs, { enabled: isDesktop });

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    const bottomBand = bottomBandRef.current;
    if (!bottomBand) return;

    const updateBottomBandHeight = () => {
      setBottomBandHeight(bottomBand.offsetHeight);
    };

    updateBottomBandHeight();

    const observer = new ResizeObserver(updateBottomBandHeight);
    observer.observe(bottomBand);
    window.addEventListener('resize', updateBottomBandHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateBottomBandHeight);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Tablet and desktop with motion: three-phase entrance choreography
      // (Spec 031) + scroll-triggered headline slide-off.
      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          const section = sectionRef.current;
          const headline = headlineRef.current;
          const bottomContent = bottomContentRef.current;
          const videoFrame = videoFrameRef.current;
          if (!section || !headline || !bottomContent || !videoFrame) return;

          const offscreen = -window.innerHeight * 1.1;

          // Spec 031 — set initial hidden state, then play immediately.
          gsap.set([headline, bottomContent], { opacity: 0, y: 24 });
          gsap.set(videoFrame, { opacity: 0 });

          const introTimeline = gsap.timeline();

          // Phase 1: headline
          introTimeline.to(headline, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            clearProps: 'transform',
          });

          // Phase 2: video/poster frame (starts 200 ms after Phase 1)
          introTimeline.to(videoFrame, {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          }, 0.2);

          // Phase 3: bottom row (starts 300 ms after Phase 1)
          introTimeline.to(bottomContent, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            clearProps: 'transform',
          }, 0.3);

          // Headline exit plays at its own pace once triggered — not scrubbed by scroll.
          const exitTl = gsap.timeline({ paused: true });

          exitTl.to(headline, {
            y: offscreen,
            ease: 'power2.inOut',
            duration: 0.9,
          });

          let played = false;

          ScrollTrigger.create({
            id: 'hero-entrance',
            trigger: section,
            start: 'top top-=2%',
            once: true,
            onEnter: () => {
              if (played) return;
              played = true;
              log('hero-entrance', 'ANIM_START');
              exitTl.play(0).then(() => {
                log('hero-entrance', 'ANIM_COMPLETE');
              });
            },
          });
        },
      );

      // Reduced motion: show end state immediately, no entrance animation.
      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: reduce)',
        () => {
          const section = sectionRef.current;
          const headline = headlineRef.current;
          const videoFrame = videoFrameRef.current;
          if (!section || !headline) return;

          gsap.set([headline, bottomContentRef.current], {
            opacity: 1,
            y: 0,
            clearProps: 'transform',
          });
          if (videoFrame) gsap.set(videoFrame, { opacity: 1 });

          const offscreen = -window.innerHeight * 1.1;
          let played = false;

          const exitTl = gsap.timeline({ paused: true });
          exitTl.to(headline, {
            y: offscreen,
            ease: 'power2.inOut',
            duration: 0.9,
          });

          ScrollTrigger.create({
            id: 'hero-entrance',
            trigger: section,
            start: 'top top-=2%',
            once: true,
            onEnter: () => {
              if (played) return;
              played = true;
              exitTl.play(0);
            },
          });
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [videoRefs]);

  return (
    <section
      id="hero-animatic"
      ref={sectionRef}
      // hidden md:block — the MobileHero component renders in its place below 768px.
      className="hidden md:block relative min-h-[calc(100svh+2px)] w-full overflow-hidden bg-[#042019]"
    >
      {/* Video frame — inset 24 px (rounded bottom corners) — full-bleed
          background fill behind in-flow content. All clips render with
          preload="none"; useVideoCarousel unlocks them one at a time using
          the N+1 strategy so only the active clip and the next one ever
          consume bandwidth simultaneously. */}
      <div
        ref={videoFrameRef}
        className="absolute inset-x-6 top-0 rounded-b-2xl overflow-hidden z-0"
        style={{ bottom: `${bottomBandHeight}px` }}
      >
        {/* Poster — visible immediately, covered once the first video plays.
            Uses a responsive <picture> so the browser fetches the right size. */}
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
            <source src={clip.webm} type="video/webm" media="(min-width: 768px)" />
            <source src={clip.mp4} type="video/mp4" media="(min-width: 768px)" />
          </video>
        ))}
      </div>

      {/* Foreground content layer. Headline is pinned to the video's lower edge;
          lower row is in a dedicated 48px/contents/48px band whose measured
          height determines the video frame bottom inset above. */}
      <div className="relative z-10 min-h-[calc(100svh+2px)]">
        <div
          ref={headlineRef}
          className="pointer-events-none absolute inset-x-0 z-10 px-6"
          style={{ bottom: `${bottomBandHeight + 24}px`, willChange: 'transform' }}
        >
          {/* "Always ON" — left-anchored 24 px from video left edge */}
          <p
            className="leading-[0.82] font-['FK_Screamer',sans-serif] font-bold not-italic text-[#f0eee6] uppercase text-left pl-6"
            style={{ fontSize: 'clamp(3rem, 15vw, 20rem)' }}
          >
            {headlineLine1}
          </p>
          {/* Second row: K mark and headline share the same bottom edge so the
              mark stays baseline-aligned with "SALES & MARKETING". */}
          <div className="flex items-end pl-6 pr-6">
            <KeystoneMark
              color={markColor}
              width={37}
              height={41}
              className="h-10 w-auto shrink-0 translate-x-[2px] -translate-y-[5px]"
              alt="Keystone mark"
            />
            <p
              className="flex-1 leading-[0.82] font-['FK_Screamer',sans-serif] font-bold not-italic text-[#f0eee6] uppercase text-right"
              style={{ fontSize: 'clamp(3rem, 15vw, 20rem)' }}
            >
              {headlineLine2}
            </p>
          </div>
        </div>

        {/* Lower legibility band: 48px top and bottom, with content centered
            vertically in the available space under the video. */}
        <div
          ref={bottomBandRef}
          className="absolute inset-x-0 bottom-0 px-12 py-12"
        >
          <div
            ref={bottomContentRef}
            className="hero-bottom-content items-center justify-between"
          >
            {/* Left: subheadline */}
            <p className="max-w-[490px] font-['FK_Grotesk_Neue',sans-serif] text-[#6ecc8b] text-2xl leading-[1.2] tracking-[-0.03em]">
              {subheadline}
            </p>

            {/* Right: CTA rectangle + pill pair */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onMouseEnter={() => setIsLearnMoreHovered(true)}
                onMouseLeave={() => setIsLearnMoreHovered(false)}
                onClick={(e) => openModal(e.currentTarget)}
                className="inline-flex h-12 cursor-pointer items-center whitespace-nowrap bg-[#063126] px-4 font-['FK_Grotesk_Neue',sans-serif] text-lg leading-none tracking-[-0.01em] text-[var(--color-hero-accent)]"
                style={{
                  borderRadius: isLearnMoreHovered ? '24px' : '0px',
                  transition: 'color .16s ease-in-out, background-color .16s ease-in-out, border-radius .16s ease-in-out',
                }}
              >
                {cta1Label}
              </button>
              <button
                type="button"
                onMouseEnter={() => setIsGetStartedHovered(true)}
                onMouseLeave={() => setIsGetStartedHovered(false)}
                onClick={(e) => openModal(e.currentTarget)}
                className="inline-flex h-12 cursor-pointer items-center gap-2 whitespace-nowrap bg-[var(--color-hero-accent)] pl-4 pr-3 font-['FK_Grotesk_Neue',sans-serif] text-lg leading-none tracking-[-0.01em] text-[var(--color-hero-bg)]"
                style={{
                  borderRadius: isGetStartedHovered ? '0px' : '24px',
                  transition: 'color .16s ease-in-out, background-color .16s ease-in-out, border-radius .16s ease-in-out',
                }}
              >
                {cta2Label}
                <span className="relative inline-flex size-4 overflow-hidden" aria-hidden="true">
                  <span
                    className="absolute inset-0"
                    style={{
                      transform: isGetStartedHovered ? 'translateX(100%)' : 'translateX(0%)',
                      transition: 'transform .16s ease-in-out',
                    }}
                  >
                    <ArrowNarrowRight size={16} color="var(--color-hero-bg)" />
                  </span>
                  <span
                    className="absolute inset-0"
                    style={{
                      transform: isGetStartedHovered ? 'translateX(0%)' : 'translateX(-100%)',
                      transition: 'transform .16s ease-in-out',
                    }}
                  >
                    <ArrowNarrowRight size={16} color="var(--color-hero-bg)" />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
