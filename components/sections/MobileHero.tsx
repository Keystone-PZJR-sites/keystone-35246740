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
 * Structurally different from the desktop HeroAnimatic: no GSAP, no scroll pin,
 * no animation of any kind. The visitor sees everything immediately and scrolls
 * past naturally.
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const indexRef = useRef(0);
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

  // Preload the clip after the one currently playing.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoSrcs.length <= 1) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.type = 'video/mp4';
    document.head.appendChild(link);

    const updatePreload = () => {
      const nextIndex = (indexRef.current + 1) % videoSrcs.length;
      link.href = videoSrcs[nextIndex];
    };

    updatePreload();
    video.addEventListener('ended', updatePreload);
    video.addEventListener('error', updatePreload);
    return () => {
      video.removeEventListener('ended', updatePreload);
      video.removeEventListener('error', updatePreload);
      link.parentNode?.removeChild(link);
    };
  }, [videoSrcs]);

  return (
    <section
      className="md:hidden relative bg-[var(--color-hero-surface)]"
      aria-label="Hero"
    >
      {/* ── Video zone ─────────────────────────────────────────────────────── */}
      {/* Full-bleed, no side insets, no rounded corners. The fixed HeroNav    */}
      {/* overlays the top of this zone via its own z-50 fixed positioning.    */}
      <div className="relative h-[331px] w-full overflow-hidden">
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

      {/* ── Content zone ───────────────────────────────────────────────────── */}
      {/* px-6 = 24 px side padding (matches Figma's 24 px from edge).        */}
      {/* pt-12 = 48 px top padding (Figma gap from video bottom to mark).    */}
      {/* pb-8  = 32 px bottom padding (≈ 30 px below CTA in Figma).          */}
      <div className="px-6 pt-12 pb-8">
        <KeystoneMark
          color={markColor}
          width={36}
          height={41}
          alt="Keystone mark"
        />

        {/* Headline — 32 px gap below mark (Figma: 452 − 420 = 32 px).      */}
        {/* Two props rendered as two paragraphs; natural wrapping at 90 px   */}
        {/* on the ~345 px content width produces the Figma's three-line      */}
        {/* layout: "ALWAYS ON" / "SALES &" / "MARKETING".                   */}
        <div className="mt-8">
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

        {/* Subheadline — 24 px gap below headline (Figma ≈ 25 px).           */}
        <p className="mt-6 font-['FK_Grotesk_Neue',sans-serif] text-base leading-[1.2] tracking-[-0.03em] text-[var(--color-hero-accent)]">
          {subheadline}
        </p>

        {/* CTA pill — 32 px gap below subheadline.                           */}
        {/* opacity-80: the container is intentionally 80% opaque per Figma,  */}
        {/* creating a slight depth effect on the dark green background.       */}
        <div className="mt-8 flex w-fit items-center gap-2 rounded-full bg-[var(--color-hero-bg)] p-2 opacity-80">
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
