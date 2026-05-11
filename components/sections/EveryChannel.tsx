'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePillHandoff } from '@/components/PillHandoffProvider';
import { createSectionPin, logSectionEvent } from '@/lib/sectionPin';

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
  videoSrc: string;
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

export function EveryChannel({ line1, line2, line3, videoSrc, pills }: EveryChannelProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref   = useRef<HTMLParagraphElement>(null);
  const line2Ref   = useRef<HTMLParagraphElement>(null);
  const line3Ref   = useRef<HTMLParagraphElement>(null);
  const pillRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const { setDesktopRects } = usePillHandoff();

  const sortedPills = useMemo(
    () => [...pills].sort((a, b) => a.beatIndex - b.beatIndex),
    [pills],
  );

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

        // Lines start off-screen below; pills hidden for pop-up entry.
        gsap.set([l1, l2, l3], { y: '120vh', autoAlpha: 1 });
        gsap.set(pillEls, { y: 30, scale: 0.5, autoAlpha: 0 });

        const firstSpans = (el: HTMLElement) =>
          el.querySelectorAll<HTMLSpanElement>('.ec-char > span:first-child');
        const lastSpans = (el: HTMLElement) =>
          el.querySelectorAll<HTMLSpanElement>('.ec-char > span:last-child');

        // ── Master timeline (time-driven, triggered by scroll) ───────────
        const masterTl = gsap.timeline({ paused: true });

        function addLine(lineEl: HTMLElement, at: number) {
          masterTl.fromTo(lineEl,
            { y: '120vh', autoAlpha: 1 },
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

        // ── State flags ──────────────────────────────────────────────────
        // played: masterTl has been triggered for this visit.
        // buildingComplete: masterTl has finished → allow release.
        let played = false;
        let buildingComplete = false;

        const playBuilding = () => {
          logSectionEvent('every-channel-pin', 'ANIM_ENTER_CALLED', { played });
          if (played) return;
          played = true;
          logSectionEvent('every-channel-pin', 'ANIM_START', { duration: masterTl.duration() });
          masterTl.play(0).then(() => {
            // Capture pill viewport positions for ProductScreens while section is
            // still pinned — positions change once the pin releases.
            const rectsMap = new Map<string, DOMRect>();
            sortedPills.forEach((pill, i) => {
              const el = pillRefs.current[i];
              if (el) rectsMap.set(pill.label, el.getBoundingClientRect());
            });
            setDesktopRects(rectsMap);
            buildingComplete = true;
            logSectionEvent('every-channel-pin', 'ANIM_COMPLETE', { pillsRegistered: rectsMap.size });
          });
        };

        // Two-phase hold: Building animation plays between snap 0→0.5,
        // then visitor needs one more scroll to release (snap 0.5→1).
        createSectionPin({
          id: 'every-channel-pin',
          section,
          onEnter: playBuilding,
          isAnimComplete: () => buildingComplete,
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
        className="h-screen w-full overflow-hidden bg-[#042019]"
        aria-label="Every Channel — Every Interaction. Done-for-you."
      >
        {/* preload="auto" tells the browser to buffer the video while the section
            is still off-screen so it is ready the moment it enters the viewport. */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Display text — vertically centered, slot-machine character reveal */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ width: 'clamp(300px, 86vw, 1238px)' }}
        >
          {renderLine(line1, line1Ref)}
          {renderLine(line2, line2Ref)}
          {renderLine(line3, line3Ref)}
        </div>

        {/* Channel pills */}
        {sortedPills.map((pill, i) => (
          <div
            key={pill.label}
            ref={el => { pillRefs.current[i] = el; }}
            className="absolute flex items-center rounded-full px-4 py-2"
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
