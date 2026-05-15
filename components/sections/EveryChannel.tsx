'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useVideoCarousel } from '@/lib/useVideoCarousel';
import { useNearViewport } from '@/lib/useNearViewport';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePillHandoff } from '@/components/PillHandoffProvider';
import { log } from '@/lib/logger';

gsap.registerPlugin(ScrollTrigger);

export interface PillData {
  label: string;
  color: string;
  left: string;
  top: string;
  beatIndex: number;
}

export interface EveryChannelProps {
  line1: string;
  line2: string;
  line3: string;
  /** Ordered array of clips. WebM is served to browsers that support it; MP4 is the fallback.
   *  `poster` is the base path for the responsive WebP still. */
  videoSrcs: { webm: string; mp4: string; poster?: string }[];
  pills: PillData[];
}

// Slot-machine character animation constants
const LINE_STAGGER  = 0.04;   // seconds between each letter triggering
const CHAR_DURATION = 0.35;   // seconds per character tween

// Start time of each line's slot-machine sequence inside masterTl.
// Each line begins before the previous line has fully settled so they
// overlap and feel continuous rather than sequential.
const LINE_STARTS = [0, 0.65, 1.35] as const;

// Pill beats interleaved with the text lines (beat 0 begins as line 1 settles).
const BEAT_STARTS    = [0.70, 1.10, 1.50, 1.85, 2.15, 2.45, 2.75] as const;
const BEAT_DURATIONS = [0.35, 0.35, 0.35, 0.35, 0.35, 0.25, 0.35] as const;

// Shared styles extracted to avoid repetition in JSX
const LINE_P_STYLE: React.CSSProperties = {
  fontSize: 'clamp(3rem, 15vw, 13.5rem)',
};

// Each character gets its own clipping mask via overflow:hidden.
// position:relative allows the absolute-positioned second span to anchor to it.
const CHAR_WRAP: React.CSSProperties = {
  display: 'inline-block',
  position: 'relative',
  overflow: 'hidden',
  verticalAlign: 'top',
};

// Second (incoming) span lives absolutely at top:0, initially translated
// below the mask so overflow:hidden hides it. GSAP moves it to y:0.
const CHAR_SECOND: React.CSSProperties = {
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  transform: 'translateY(100%)',
  willChange: 'transform',
};

export function EveryChannel({ line1, line2, line3, videoSrcs, pills }: EveryChannelProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref   = useRef<HTMLParagraphElement>(null);
  const line2Ref   = useRef<HTMLParagraphElement>(null);
  const line3Ref   = useRef<HTMLParagraphElement>(null);
  const pillRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const { setDesktopRects } = usePillHandoff();
  const [isDesktop, setIsDesktop] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
  ));

  // Defer video preloading until the section is approaching the viewport.
  // Prevents the 4 Every Channel clips (~10 MB WebM) from competing with the
  // hero video on initial page load.
  const isNear = useNearViewport(sectionRef, '600px');
  const videoRefs = useVideoCarousel(videoSrcs, { enabled: isNear && isDesktop });

  const sortedPills = useMemo(
    () => [...pills].sort((a, b) => a.beatIndex - b.beatIndex),
    [pills],
  );

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Desktop / tablet + full motion ─────────────────────────────────
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const section = sectionRef.current;
        const l1 = line1Ref.current;
        const l2 = line2Ref.current;
        const l3 = line3Ref.current;
        if (!section || !l1 || !l2 || !l3) return;

        const pillEls = pillRefs.current.filter((el): el is HTMLDivElement => el !== null);

        // Spec 026: with the pin retired the section is no longer guaranteed
        // to be exactly the viewport height. Capture the visible viewport
        // height once at setup and use it as a concrete pixel offset so the
        // lines still start the same distance below the viewport edge.
        const offscreen = window.innerHeight * 1.2;

        // Lines start off-screen below; pills hidden for pop-up entry.
        gsap.set([l1, l2, l3], { y: offscreen, autoAlpha: 1 });
        gsap.set(pillEls, { y: 30, scale: 0.5, autoAlpha: 0 });

        const firstSpans = (el: HTMLElement) =>
          el.querySelectorAll<HTMLSpanElement>('.ec-char > span:first-child');
        const lastSpans = (el: HTMLElement) =>
          el.querySelectorAll<HTMLSpanElement>('.ec-char > span:last-child');

        // ── Master timeline (time-driven, triggered by scroll) ───────────
        const masterTl = gsap.timeline({ paused: true });

        function addLine(lineEl: HTMLElement, at: number) {
          masterTl.fromTo(lineEl,
            { y: offscreen, autoAlpha: 1 },
            { y: 0, ease: 'power3.out', duration: 0.55 },
            at,
          );
          masterTl.to(firstSpans(lineEl), {
            y: '-100%',
            ease: 'power2.inOut',
            duration: CHAR_DURATION,
            stagger: { each: LINE_STAGGER, from: 'random' },
          }, at);
          masterTl.to(lastSpans(lineEl), {
            y: 0,
            ease: 'power2.inOut',
            duration: CHAR_DURATION,
            stagger: { each: LINE_STAGGER, from: 'random' },
          }, at);
        }

        addLine(l1, LINE_STARTS[0]);
        addLine(l2, LINE_STARTS[1]);
        addLine(l3, LINE_STARTS[2]);

        sortedPills.forEach((_, i) => {
          const el = pillRefs.current[i];
          if (!el) return;
          const ts = BEAT_STARTS[i];
          const td = BEAT_DURATIONS[i];
          masterTl.fromTo(
            el,
            { y: 30, scale: 0.5, autoAlpha: 0 },
            { y: 0, scale: 1.1, autoAlpha: 1, ease: 'power2.out', duration: td * 0.65 },
            ts,
          );
          masterTl.to(el, { scale: 1, ease: 'power1.out', duration: td * 0.35 }, ts + td * 0.65);
        });

        // Slight hold after the last pill settles before the visitor can release
        masterTl.to({}, { duration: 0.25 }, 3.1);

        // Spec 026: pin retired. Entrance plays once on viewport entry via a
        // direct ScrollTrigger; visitor scrolls freely while it plays.
        let played = false;

        ScrollTrigger.create({
          id: 'every-channel-entrance',
          trigger: section,
          start: 'top 50%',
          once: true,
          onEnter: () => {
            if (played) return;
            played = true;
            log('every-channel-entrance', 'ANIM_START', { duration: masterTl.duration() });
            masterTl.play(0).then(() => {
              // Capture pill viewport positions for ProductScreens. Without
              // the pin, EC pills may already have started scrolling by the
              // time PS triggers — accepted looseness per spec 026.
              const rectsMap = new Map<string, DOMRect>();
              sortedPills.forEach((pill, i) => {
                const el = pillRefs.current[i];
                if (el) rectsMap.set(pill.label, el.getBoundingClientRect());
              });
              setDesktopRects(rectsMap);
              log('every-channel-entrance', 'ANIM_COMPLETE', { pillsRegistered: rectsMap.size });
            });
          },
        });
      });

      // ── Mobile + reduced-motion: final state immediately ───────────────
      // First char spans are visible by default (in-flow). Second spans are
      // hidden below the overflow mask via inline CSS. No GSAP, no pin.
      mm.add('(min-width: 768px) and (prefers-reduced-motion: reduce)', () => {
        const section = sectionRef.current;
        const l1 = line1Ref.current;
        const l2 = line2Ref.current;
        const l3 = line3Ref.current;
        if (!section || !l1 || !l2 || !l3) return;

        const pillEls = pillRefs.current.filter((el): el is HTMLDivElement => el !== null);

        // Show final state: lines at rest, pills fully visible, second spans visible
        gsap.set([l1, l2, l3], { y: 0, autoAlpha: 1 });
        gsap.set(pillEls, { y: 0, scale: 1, autoAlpha: 1 });

        // Make second spans visible (they start at translateY(100%) via inline CSS)
        const allSecondSpans = section.querySelectorAll<HTMLSpanElement>(
          '.ec-char > span:last-child',
        );
        gsap.set(Array.from(allSecondSpans), { y: 0 });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [sortedPills, setDesktopRects]);

  // Renders one display line as slot-machine character wrappers.
  // Each character is duplicated: first span (visible, exits up),
  // second span (hidden below overflow mask, enters from below).
  // \u00a0 is intentional: a literal NBSP would be indistinguishable from ' '
  // in source, but the layout depends on it — a regular space between
  // inline-block per-character spans collapses to zero.
  const renderLine = (text: string, ref: React.RefObject<HTMLParagraphElement | null>) => (
    <p
      ref={ref}
      className="font-['FK_Screamer',sans-serif] font-bold uppercase leading-[0.82] not-italic text-[#f0eee6]"
      style={LINE_P_STYLE}
    >
      {text.split('').map((char, i) => {
        const display = char === ' ' ? '\u00a0' : char;
        return (
          <span key={i} className="ec-char" style={CHAR_WRAP}>
            <span style={{ display: 'block', willChange: 'transform' }}>{display}</span>
            <span aria-hidden="true" style={CHAR_SECOND}>{display}</span>
          </span>
        );
      })}
    </p>
  );

  return (
    <div ref={wrapperRef} className="relative hidden md:block">
      <section
        ref={sectionRef}
        // Opts into `min-height: 100svh` (site-wide default is content-
        // driven, see docs/explainers/responsive.md § Section Heights).
        // The video is absolute inset:0 as a full-bleed background fill
        // and the pills are scattered absolutely-positioned overlays at
        // percentages of section bounds — both depend on a definite
        // section height to resolve correctly.
        className="relative min-h-[calc(100svh+2px)] w-full overflow-hidden bg-[#042019] flex items-center justify-center"
        aria-label="Every Channel — Every Interaction. Done-for-you."
      >
        {/* Poster loads only once the section is near the viewport so below-fold
            images do not compete with hero resources in the initial wave. */}
        {isNear && videoSrcs[0]?.poster && (
          <picture className="absolute inset-0">
            <source
              srcSet={[300, 500, 1000, 1500, 2500].map(w => `${videoSrcs[0].poster}-${w}w.webp ${w}w`).join(', ')}
              type="image/webp"
              sizes="100vw"
            />
            <img
              src={`${videoSrcs[0].poster}-1500w.webp`}
              alt=""
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
        )}
        {/* All clips render with preload="none"; useVideoCarousel unlocks them
            via the N+1 strategy once isNear fires — no bandwidth consumed
            until the section is approaching the viewport. */}
        {videoSrcs.map((clip, i) => (
          <video
            key={i}
            ref={el => { videoRefs.current[i] = el; }}
            muted
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          >
            <source src={clip.webm} type="video/webm" media="(min-width: 768px)" />
            <source src={clip.mp4} type="video/mp4" media="(min-width: 768px)" />
          </video>
        ))}

        {/* Display text — in normal flow, centred via the section's flex
            alignment. slot-machine character reveal. */}
        <div
          className="pointer-events-none relative z-10 text-center"
          style={{ width: 'clamp(300px, 86vw, 1238px)' }}
        >
          {renderLine(line1, line1Ref)}
          {renderLine(line2, line2Ref)}
          {renderLine(line3, line3Ref)}
        </div>

        {/* Channel pills — decoratively scattered overlays (spec 026
            exception). Per-pill percentages of section dimensions. */}
        {sortedPills.map((pill, i) => (
          <div
            key={pill.label}
            ref={el => { pillRefs.current[i] = el; }}
            className="absolute flex items-center rounded-full px-4 py-2 z-20"
            style={{ left: pill.left, top: pill.top, backgroundColor: pill.color, gap: 12 }}
          >
            <div className="shrink-0 bg-[#f0eee6]" style={{ width: 10, height: 10 }} />
            <span
              className="whitespace-nowrap font-['FK_Grotesk_Neue',sans-serif] font-normal text-[#f0eee6]"
              style={{ fontSize: 18, letterSpacing: '-0.18px' }}
            >
              {pill.label}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
