'use client';

import { useEffect, useRef } from 'react';
import { ArrowNarrowRight } from '@untitledui/icons';
import { KeystoneMark } from '@/components/elements';
import { useLeadCapture } from './LeadCaptureModal';

export interface MobileHeroProps {
  headlineLine1: string;
  headlineLine2: string;
  subheadline: string;
  cta1Label: string;
  cta2Label: string;
  /** Ordered array of clip URLs — same six-clip autoloop sequence as desktop. */
  videoSrcs: string[];
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
  const videoRef   = useRef<HTMLVideoElement>(null);
  const indexRef   = useRef(0);
  const { openModal } = useLeadCapture();

  // Advance to the next clip on ended or error.
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

  return (
    <section
      className="md:hidden relative overflow-hidden flex flex-col bg-[var(--color-hero-surface)]"
      aria-label="Hero"
    >
      {/* ── Video zone — top 40 svh ────────────────────────────────────────── */}
      {/* Full-bleed, no side insets. The fixed HeroNav overlays the top via   */}
      {/* its own z-50 fixed positioning.                                      */}
      <div className="relative w-full flex-none h-[40svh] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute h-full w-full object-cover"
        >
          <source src={videoSrcs[0]} type="video/mp4" />
        </video>
      </div>

      {/* ── Content zone — sits below the video band at its intrinsic height. */}
      {/* overflow-hidden is a guard against the headline's clamp pushing the  */}
      {/* layout past its expected bounds on extremely narrow viewports.       */}
      <div className="overflow-hidden px-6 pt-10 pb-6">
        <KeystoneMark
          color={markColor}
          width={36}
          height={41}
          alt="Keystone mark"
        />

        {/* Headline — 28 px gap below mark. Two lines rendered as two        */}
        {/* paragraphs; natural wrapping produces the Figma layout.            */}
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

        {/* Subheadline */}
        <p className="mt-5 font-['FK_Grotesk_Neue',sans-serif] text-base leading-[1.2] tracking-[-0.03em] text-[var(--color-hero-accent)]">
          {subheadline}
        </p>

        {/* CTA pill */}
        <div className="mt-7 flex w-fit items-center gap-2 rounded-full bg-[var(--color-hero-bg)] p-2 opacity-80">
          <button
            type="button"
            onClick={(e) => openModal(e.currentTarget)}
            className="hero-pill-btn bg-[var(--color-hero-surface)] py-3 px-3 text-sm text-[var(--color-hero-accent)] tracking-[-0.01em]"
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
    </section>
  );
}
