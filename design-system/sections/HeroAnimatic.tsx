'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { KeystoneMark } from '@/design-system/primitives';
import { HeroBusinessSearch } from '@/design-system/components/HeroBusinessSearch';
import { useVideoCarousel } from '@/lib/useVideoCarousel';
import { DESKTOP_MEDIA } from '@/design-system/tokens/breakpoints';

export interface HeroAnimaticProps {
  headline: string;
  subheadline: string;
  /** Placeholder + button label for the Grader search field. */
  searchPlaceholder: string;
  searchButtonLabel: string;
  /** Ordered array of clips; must have at least one entry. WebM is served to
   *  browsers that support it; MP4 is the fallback. `poster` is the base path
   *  for the responsive WebP still (e.g. `/media/hero/posters/hero-01`);
   *  the component appends `-{w}w.webp` for each breakpoint. */
  videoSrcs: { webm: string; mp4: string; poster?: string }[];
  markColor: string;
}

/**
 * Hero — desktop layout (≥985 px).
 *
 * Opts into `min-height: 100svh` (the site-wide default is content-driven;
 * see `docs/explainers/responsive.md` § Section Heights). The hero is the
 * entry hook for the page and is designed to fill the visible viewport on
 * first load — sizing it to content would feel anti-climactic on a tall
 * window. Bottom-anchored content sits in normal flow at the section
 * bottom with the standard `--section-padding-y` breathing room.
 *
 * Entrance choreography: a two-phase GSAP timeline fires immediately on
 * hydration — the video frame first, then the bottom band (mark, headline,
 * subheadline + CTAs). The mark and headline sit in normal flow below the
 * video, matching the mobile hero.
 */
export function HeroAnimatic({
  headline,
  subheadline,
  searchPlaceholder,
  searchButtonLabel,
  videoSrcs,
  markColor,
}: HeroAnimaticProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const bottomBandRef = useRef<HTMLDivElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const [bottomBandHeight, setBottomBandHeight] = useState(184);
  const [isDesktop, setIsDesktop] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia(DESKTOP_MEDIA).matches
  ));
  const videoRefs = useVideoCarousel(videoSrcs, { enabled: isDesktop });

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_MEDIA);
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

      // Desktop with motion: two-phase entrance — video frame, then the
      // bottom band (mark, headline, subheadline + CTAs).
      mm.add(
        `${DESKTOP_MEDIA} and (prefers-reduced-motion: no-preference)`,
        () => {
          const bottomContent = bottomContentRef.current;
          const videoFrame = videoFrameRef.current;
          if (!bottomContent || !videoFrame) return;

          gsap.set(bottomContent, { opacity: 0, y: 24 });
          gsap.set(videoFrame, { opacity: 0 });

          const introTimeline = gsap.timeline();

          introTimeline.to(videoFrame, {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          });

          introTimeline.to(bottomContent, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            clearProps: 'transform',
          }, 0.2);
        },
      );

      // Reduced motion: show end state immediately, no entrance animation.
      mm.add(
        `${DESKTOP_MEDIA} and (prefers-reduced-motion: reduce)`,
        () => {
          const bottomContent = bottomContentRef.current;
          const videoFrame = videoFrameRef.current;
          if (bottomContent) gsap.set(bottomContent, { opacity: 1, y: 0, clearProps: 'transform' });
          if (videoFrame) gsap.set(videoFrame, { opacity: 1 });
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [videoRefs]);

  return (
    <section
      id="hero-animatic"
      ref={sectionRef}
      // hidden md:block — the MobileHero component renders in its place below 985px.
      className="hidden md:block relative min-h-[calc(100svh+2px)] w-full overflow-hidden bg-[var(--color-hero-bg,#042019)]"
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
            muted
            playsInline
            preload="none"
            className="absolute h-full w-full object-cover"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <source src={clip.webm} type="video/webm" media={DESKTOP_MEDIA} />
            <source src={clip.mp4} type="video/mp4" media={DESKTOP_MEDIA} />
          </video>
        ))}
      </div>

      {/* Foreground content layer. The mark, headline, subheadline and CTAs
          all sit in normal flow in a bottom band below the video, matching
          the mobile hero. The band's measured height determines the video
          frame bottom inset above. */}
      <div className="relative z-10 min-h-[calc(100svh+2px)]">
        {/* Lower legibility band: 48px top and bottom, anchored to the section
            bottom under the video. */}
        <div
          ref={bottomBandRef}
          className="absolute inset-x-0 bottom-0 px-12 py-12"
        >
          <div ref={bottomContentRef}>
            {/* Keystone mark — sits just below the video, above the headline. */}
            <KeystoneMark
              color={markColor}
              width={37}
              height={41}
              className="h-10 w-auto"
              alt="Keystone mark"
            />

            {/* Headline — sits between the video and the subheadline, matching
                the mobile hero. Width is constrained (em-based, so the wrap
                point tracks the font size) to keep it on two lines. */}
            <p
              className="mt-7 max-w-[85%] leading-[0.82] font-['FK_Screamer',sans-serif] font-bold not-italic text-[var(--color-hero-text,#f0eee6)] uppercase"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.625rem)' }}
            >
              {headline}
            </p>

            {/* Subheadline — sits above the search field. Widened to ~80% of the
                band so the removed-CTA right side doesn't read as empty. */}
            <p className="mt-4 max-w-[85%] font-['FK_Grotesk_Neue',sans-serif] text-[var(--color-hero-accent,#6ecc8b)] text-2xl leading-[1.2] tracking-[-0.03em]">
              {subheadline}
            </p>

            {/* Grader entry: choosing a result opens the Grader in a new tab and
                starts the scan. The menu opens upward (the band is bottom-anchored
                and the section clips overflow). */}
            <HeroBusinessSearch
              variant="desktop"
              menuPlacement="up"
              placeholder={searchPlaceholder}
              buttonLabel={searchButtonLabel}
              className="mt-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
