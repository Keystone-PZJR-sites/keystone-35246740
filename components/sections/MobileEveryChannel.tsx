'use client';

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePillHandoff } from '@/components/PillHandoffProvider';
import { log } from '@/lib/logger';

gsap.registerPlugin(ScrollTrigger);

export interface MobileEveryChannelPillData {
  label: string;
  color: string;
  /** Dot color — defaults to #f0eee6 if omitted. */
  dotColor?: string;
  /** Left position as a CSS percentage of the section width. */
  left: string;
  /** Top position as a CSS percentage of the section height (this section opts into `min-height: 100svh`). */
  top: string;
  beatIndex: number;
}

export interface MobileEveryChannelProps {
  line1: string;
  line2: string;
  line3: string;
  videoSrcs: string[];
  pills: MobileEveryChannelPillData[];
  /** Section background color. Defaults to #063126. */
  bgColor?: string;
}

// Animation timing constants — identical to desktop EveryChannel.
const LINE_STAGGER  = 0.04;
const CHAR_DURATION = 0.35;
const LINE_STARTS   = [0, 0.65, 1.35] as const;
const BEAT_STARTS   = [0.70, 1.10, 1.50, 1.85, 2.15, 2.45, 2.75] as const;
const BEAT_DURATIONS = [0.35, 0.35, 0.35, 0.35, 0.35, 0.25, 0.35] as const;

// Character wrapper styles — each character gets its own clipping mask.
const CHAR_WRAP: React.CSSProperties = {
  display: 'inline-block',
  position: 'relative',
  overflow: 'hidden',
  verticalAlign: 'top',
};

// Second (incoming) span — hidden below the overflow mask initially.
const CHAR_SECOND: React.CSSProperties = {
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  transform: 'translateY(100%)',
  willChange: 'transform',
};

/**
 * Mobile-only Every Channel section (below 768px).
 *
 * Visual differences from the desktop EveryChannel:
 *  - Text is left-aligned in the upper portion of the section, deliberately
 *    overlapping the top edge of the video band (this overlap is the
 *    design intent per Figma node 1362:421).
 *  - Video occupies the lower portion of the section, inset 24px from each
 *    side with rounded corners. The dark green background is visible on
 *    both sides and above.
 *  - Pills are smaller and at mobile-specific percentage positions.
 *
 * Layout: this is a designed collage. Pills, text, and the video band are
 * all absolutely positioned at percentages of section height because the
 * text and video positions are intrinsic to the design (text overlapping
 * the top of the video cannot be expressed in normal flow). The section
 * opts into `min-height: 100svh` (the site-wide default is content-driven;
 * see `docs/explainers/responsive.md` § Section Heights) so those
 * percentages resolve against the visible viewport height by default.
 *
 * The masterTl (slot-machine reveal + spring pill pop) plays once on
 * viewport entry via a direct ScrollTrigger.
 *
 * Shown via `md:hidden` — the desktop EveryChannel uses `hidden md:block`.
 */
export function MobileEveryChannel({
  line1,
  line2,
  line3,
  videoSrcs,
  pills,
  bgColor = '#063126',
}: MobileEveryChannelProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref   = useRef<HTMLParagraphElement>(null);
  const line2Ref   = useRef<HTMLParagraphElement>(null);
  const line3Ref   = useRef<HTMLParagraphElement>(null);
  const pillRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const indexRef   = useRef(0);
  const { setMobileRects } = usePillHandoff();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoSrcs.length === 0) return;

    const advance = () => {
      indexRef.current = (indexRef.current + 1) % videoSrcs.length;
      video.src = videoSrcs[indexRef.current];
      video.load();
      video.play().catch(() => {});
    };

    video.addEventListener('ended', advance);
    video.addEventListener('error', advance);
    return () => {
      video.removeEventListener('ended', advance);
      video.removeEventListener('error', advance);
    };
  }, [videoSrcs]);

  const sortedPills = useMemo(
    () => [...pills].sort((a, b) => a.beatIndex - b.beatIndex),
    [pills],
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Mobile + full motion ────────────────────────────────────────────
      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        const section = sectionRef.current;
        const l1 = line1Ref.current;
        const l2 = line2Ref.current;
        const l3 = line3Ref.current;
        if (!section || !l1 || !l2 || !l3) return;

        const pillEls = pillRefs.current.filter((el): el is HTMLDivElement => el !== null);

        // Spec 026: with the pin retired the section is no longer guaranteed to
        // be exactly the viewport height, so `'120vh'` strings don't translate
        // a known distance relative to the section. Capture the visible viewport
        // height once at setup and use that as a concrete pixel offset — the
        // lines still start the same visible distance below the viewport edge.
        const offscreen = window.innerHeight * 1.2;

        gsap.set([l1, l2, l3], { y: offscreen, autoAlpha: 1 });
        gsap.set(pillEls, { y: 30, scale: 0.5, autoAlpha: 0 });

        const firstSpans = (el: HTMLElement) =>
          el.querySelectorAll<HTMLSpanElement>('.mec-char > span:first-child');
        const lastSpans = (el: HTMLElement) =>
          el.querySelectorAll<HTMLSpanElement>('.mec-char > span:last-child');

        // ── Master timeline (time-driven, triggered by scroll) ──────────
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

        // Brief hold after the last pill settles before release.
        masterTl.to({}, { duration: 0.25 }, 3.1);

        let played = false;

        ScrollTrigger.create({
          id: 'mobile-every-channel-entrance',
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (played) return;
            played = true;
            log('mobile-every-channel-entrance', 'ANIM_START', { duration: masterTl.duration() });
            masterTl.play(0).then(() => {
              // Capture pill viewport positions for MobileProductScreens.
              // Without the pin, EC pills may already have started scrolling
              // by the time PS triggers — accepted looseness per spec 026.
              const rectsMap = new Map<string, DOMRect>();
              sortedPills.forEach((pill, i) => {
                const el = pillRefs.current[i];
                if (el) rectsMap.set(pill.label, el.getBoundingClientRect());
              });
              setMobileRects(rectsMap);
              log('mobile-every-channel-entrance', 'ANIM_COMPLETE', { pillsRegistered: rectsMap.size });
            });
          },
        });
      });

      // ── Mobile + reduced motion: final state immediately ────────────────
      mm.add('(max-width: 767px) and (prefers-reduced-motion: reduce)', () => {
        const section = sectionRef.current;
        const l1 = line1Ref.current;
        const l2 = line2Ref.current;
        const l3 = line3Ref.current;
        if (!section || !l1 || !l2 || !l3) return;

        const pillEls = pillRefs.current.filter((el): el is HTMLDivElement => el !== null);

        gsap.set([l1, l2, l3], { y: 0, autoAlpha: 1 });
        gsap.set(pillEls, { y: 0, scale: 1, autoAlpha: 1 });

        // Second spans start at translateY(100%) via inline CSS — push them to 0.
        const allSecondSpans = section.querySelectorAll<HTMLSpanElement>(
          '.mec-char > span:last-child',
        );
        gsap.set(Array.from(allSecondSpans), { y: 0 });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [sortedPills, setMobileRects]);

  // Renders one display line as slot-machine character wrappers.
  // \u00a0 is intentional: a literal NBSP would be indistinguishable from ' '
  // in source, but the layout depends on it — a regular space between
  // inline-block per-character spans collapses to zero.
  const renderLine = (text: string, ref: React.RefObject<HTMLParagraphElement | null>) => (
    <p ref={ref} className="mec-line">
      {text.split('').map((char, i) => {
        const display = char === ' ' ? '\u00a0' : char;
        return (
          <span key={i} className="mec-char" style={CHAR_WRAP}>
            <span style={{ display: 'block', willChange: 'transform' }}>{display}</span>
            <span aria-hidden="true" style={CHAR_SECOND}>{display}</span>
          </span>
        );
      })}
    </p>
  );

  return (
    <div ref={wrapperRef} className="relative md:hidden">
      <section
        ref={sectionRef}
        className="mec-section"
        style={{ backgroundColor: bgColor }}
        aria-label="Every Channel — Every Interaction. Done-for-you."
      >
        {/* Video — lower portion, inset from sides with rounded corners.
            No loop — the ended event advances through the clip array instead. */}
        <div className="mec-video-container">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="mec-video"
            aria-hidden="true"
          >
            <source src={videoSrcs[0]} type="video/mp4" />
          </video>
        </div>

        {/* Display text — upper portion, left-aligned, slot-machine reveal */}
        <div className="mec-text-block">
          {renderLine(line1, line1Ref)}
          {renderLine(line2, line2Ref)}
          {renderLine(line3, line3Ref)}
        </div>

        {/* Channel pills — scattered at mobile percentage positions */}
        {sortedPills.map((pill, i) => (
          <div
            key={pill.label}
            ref={el => { pillRefs.current[i] = el; }}
            className="mec-pill"
            style={{
              left: pill.left,
              top: pill.top,
              backgroundColor: pill.color,
            }}
          >
            <div
              className="mec-pill-dot"
              style={{ backgroundColor: pill.dotColor ?? '#f0eee6' }}
            />
            <span
              className="mec-pill-label"
              style={{ color: pill.dotColor ?? '#f0eee6' }}
            >
              {pill.label}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
