'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { SocialProofSlide, QuoteSegment } from './SocialProofSection';

// ============================================================
// Types
// ============================================================

export interface MobileSocialProofThumbnail {
  videoSrc: string;
  /** Width in px at 393px Figma canvas */
  width: number;
  /** Height in px at 852px Figma canvas */
  height: number;
  /** Left offset in px at 393px Figma canvas */
  left: number;
  /** Top offset in px at 852px Figma canvas */
  top: number;
  /** Path to the marker badge SVG shown at the top-right corner */
  markerSrc: string;
  markerRotation?: number;
  /** Index into the slides array this thumbnail opens */
  slideIndex: number;
}

export interface MobileSocialProofProps {
  headlineLine1: string;
  headlineLine2: string;
  thumbnails: MobileSocialProofThumbnail[];
  slides: SocialProofSlide[];
  /** Path to the close-button SVG (circle with "+", rotated 45° → "×") */
  closeButtonSrc: string;
}

// ============================================================
// Figma canvas reference dimensions
// ============================================================

const CANVAS_W = 393;
const CANVAS_H = 852;

// ============================================================
// Sub-components
// ============================================================

function QuoteText({ segments, textColor }: { segments: QuoteSegment[]; textColor: string }) {
  return (
    <p className="msp-slide-quote" style={{ color: textColor }}>
      {segments.map((seg, i) => (
        <span
          key={i}
          className={seg.oblique ? 'msp-slide-quote-oblique' : 'msp-slide-quote-regular'}
        >
          {seg.text}
        </span>
      ))}
    </p>
  );
}

interface TestimonialSlideProps {
  slide: SocialProofSlide;
  videoRef: (el: HTMLVideoElement | null) => void;
}

function TestimonialSlide({ slide, videoRef }: TestimonialSlideProps) {
  return (
    <div className="msp-slide">
      {/* Video zone */}
      <div className="msp-slide-video-wrap">
        <video
          ref={videoRef}
          className="msp-slide-video"
          src={slide.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          controlsList="nodownload"
          aria-hidden="true"
        />
      </div>

      {/* Notch panel */}
      <div
        className="msp-slide-panel"
        style={{ '--msp-panel-bg': slide.cardBgColor } as React.CSSProperties}
      >
        <div className="msp-slide-content">
          <QuoteText segments={slide.quoteSegments} textColor={slide.textColor} />
          <div className="msp-slide-pills">
            <span
              className="msp-slide-pill"
              style={{
                backgroundColor: slide.namePillBg,
                color: slide.namePillText,
              }}
            >
              {slide.personName}
            </span>
            <span
              className="msp-slide-pill"
              style={{
                backgroundColor: slide.locationPillBg,
                color: slide.locationPillText,
              }}
            >
              {slide.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Main component
// ============================================================

export function MobileSocialProof({
  headlineLine1,
  headlineLine2,
  thumbnails,
  slides,
  closeButtonSrc,
}: MobileSocialProofProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const slideVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: false,
    loop: false,
  });

  // ── Open overlay ─────────────────────────────────────────────────────────

  const openOverlay = useCallback(
    (slideIndex: number) => {
      setActiveIndex(slideIndex);
    },
    [],
  );

  // ── Close overlay ────────────────────────────────────────────────────────

  const closeOverlay = useCallback(() => {
    setActiveIndex(null);
  }, []);

  // ── Sync Embla to the active slide when overlay opens ────────────────────

  useEffect(() => {
    if (activeIndex === null || !emblaApi) return;
    emblaApi.scrollTo(activeIndex, true);
  }, [activeIndex, emblaApi]);

  // ── Focus close button when overlay opens ────────────────────────────────

  useEffect(() => {
    if (activeIndex !== null && closeButtonRef.current) {
      closeButtonRef.current.focus({ preventScroll: true });
    }
  }, [activeIndex]);

  // ── Keyboard navigation ───────────────────────────────────────────────────

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeOverlay();
      if (e.key === 'ArrowRight') emblaApi?.scrollNext();
      if (e.key === 'ArrowLeft') emblaApi?.scrollPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, emblaApi, closeOverlay]);

  return (
    <section
      className="msp-section md:hidden"
      aria-label={`${headlineLine1.trim()} ${headlineLine2}`}
    >
      {/* ── Scattered thumbnails ── */}
      {thumbnails.map((thumb, i) => (
        <button
          key={i}
          type="button"
          className="msp-thumbnail"
          onClick={() => openOverlay(thumb.slideIndex)}
          aria-label={`View testimonial ${thumb.slideIndex + 1}`}
          style={{
            left: `${(thumb.left / CANVAS_W) * 100}%`,
            top: `${(thumb.top / CANVAS_H) * 100}%`,
            width: `${(thumb.width / CANVAS_W) * 100}%`,
            height: `${(thumb.height / CANVAS_H) * 100}%`,
          }}
        >
          <video
            className="msp-thumbnail-video"
            src={thumb.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            controlsList="nodownload"
            aria-hidden="true"
          />
          <Image
            src={thumb.markerSrc}
            alt=""
            width={12}
            height={12}
            unoptimized
            aria-hidden
            className="msp-marker"
            style={
              thumb.markerRotation
                ? { transform: `rotate(${thumb.markerRotation}deg)` }
                : undefined
            }
          />
        </button>
      ))}

      {/* ── Centered headline ── */}
      <div className="msp-headline-wrap" aria-hidden="true">
        <p className="msp-headline">
          {headlineLine1}
          <br />
          {headlineLine2}
        </p>
      </div>

      {/* ── Modal overlay ── */}
      <div
        className="msp-overlay"
        data-open={activeIndex !== null ? 'true' : 'false'}
        role="dialog"
        aria-modal="true"
        aria-label="Testimonials"
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          type="button"
          className="msp-close-btn"
          onClick={closeOverlay}
          aria-label="Close testimonials"
        >
          <Image
            src={closeButtonSrc}
            alt=""
            width={32}
            height={32}
            unoptimized
            aria-hidden
            style={{ transform: 'rotate(45deg)' }}
          />
        </button>

        {/* Embla carousel */}
        <div className="msp-embla-viewport" ref={emblaRef}>
          <div className="msp-embla-container">
            {slides.map((slide, i) => (
              <TestimonialSlide
                key={i}
                slide={slide}
                videoRef={(el) => {
                  slideVideoRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
