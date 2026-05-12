'use client';

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lockScroll } from '@/lib/scrollLock';
import { log } from '@/lib/logger';

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// Types
// ============================================================

export interface QuoteSegment {
  text: string;
  oblique?: boolean;
}

export interface SocialProofSlide {
  videoSrc: string;
  /** Card background hex color */
  cardBgColor: string;
  /** Quote text color */
  textColor: string;
  /** Quote broken into segments; oblique segments render in italic */
  quoteSegments: QuoteSegment[];
  personName: string;
  location: string;
  namePillBg: string;
  namePillText: string;
  locationPillBg: string;
  locationPillText: string;
}

export interface SocialProofThumbnail {
  videoSrc: string;
  /** Width in px at 1440px Figma canvas */
  width: number;
  /** Height in px at 1024px Figma canvas */
  height: number;
  /** Left offset in px at 1440px Figma canvas */
  initialLeft: number;
  /** Top offset in px at 1024px Figma canvas */
  initialTop: number;
  /** Path to the marker SVG badge shown at the top-right corner */
  markerSrc: string;
  /** Optional rotation in degrees — 45 renders a cross as a diamond */
  markerRotation?: number;
}

export interface SocialProofSectionProps {
  headlineLine1: string;
  headlineLine2: string;
  thumbnails: SocialProofThumbnail[];
  slides: SocialProofSlide[];
  /** Path to the close button SVG — a circle with "+" (rotated 45° in CSS to "×") */
  closeButtonSrc: string;
}

// ============================================================
// Constants
// ============================================================

const CANVAS_W = 1440;
const CANVAS_H = 1024;

/**
 * Organic floating paths — 5 waypoints per thumbnail (4 drift + return to origin).
 * The final waypoint smoothly returns to 0,0 so the loop restart has no snap.
 * Durations are short enough to feel lively but long enough to feel organic.
 */
const FLOAT_PATHS: Array<Array<{ x: number; y: number; scale: number; duration: number }>> = [
  // thumbnail 1 — large, slow drift
  [
    { x: 10,  y: -14, scale: 1.03, duration: 2.5 },
    { x: 20,  y:   4, scale: 0.98, duration: 2.8 },
    { x:  6,  y:  16, scale: 1.02, duration: 2.5 },
    { x: -8,  y:  -4, scale: 0.97, duration: 2.2 },
    { x:  0,  y:   0, scale: 1.00, duration: 2.5 },
  ],
  // thumbnail 2 — medium, offset phase
  [
    { x: -18, y:  10, scale: 0.97, duration: 3.2 },
    { x:  -6, y:  22, scale: 1.02, duration: 2.5 },
    { x:  14, y:   8, scale: 1.03, duration: 2.8 },
    { x:   4, y:  -8, scale: 0.99, duration: 2.5 },
    { x:   0, y:   0, scale: 1.00, duration: 2.8 },
  ],
  // thumbnail 3 — small, nimble
  [
    { x:  10, y:  16, scale: 1.02, duration: 2.2 },
    { x: -12, y:  20, scale: 0.98, duration: 2.5 },
    { x: -18, y:   4, scale: 1.02, duration: 2.2 },
    { x:   0, y: -10, scale: 1.00, duration: 2.5 },
    { x:   0, y:   0, scale: 1.00, duration: 2.2 },
  ],
  // thumbnail 4 — medium-large, opposite phase
  [
    { x: -14, y: -18, scale: 0.96, duration: 3.0 },
    { x:   6, y: -22, scale: 1.03, duration: 3.2 },
    { x:  18, y:  -6, scale: 0.97, duration: 2.8 },
    { x:   8, y:  10, scale: 1.02, duration: 2.7 },
    { x:   0, y:   0, scale: 1.00, duration: 2.8 },
  ],
  // thumbnail 5 — largest, laziest
  [
    { x:  20, y: -10, scale: 1.03, duration: 3.5 },
    { x:  10, y: -20, scale: 0.98, duration: 3.2 },
    { x:  -8, y: -12, scale: 1.02, duration: 3.2 },
    { x: -18, y:   4, scale: 0.97, duration: 3.5 },
    { x:   0, y:   0, scale: 1.00, duration: 3.0 },
  ],
  // thumbnail 6 — small, fast
  [
    { x: -10, y:  18, scale: 1.02, duration: 2.5 },
    { x:   8, y:  20, scale: 0.98, duration: 2.2 },
    { x:  16, y:  -4, scale: 1.03, duration: 2.5 },
    { x:  -4, y: -16, scale: 0.97, duration: 2.2 },
    { x:   0, y:   0, scale: 1.00, duration: 2.5 },
  ],
];

const FLOAT_DELAYS = [0, 1.2, 2.8, 1.8, 3.6, 0.6];

// ============================================================
// Pure helpers
// ============================================================

const pctW = (px: number) => `${((px / CANVAS_W) * 100).toFixed(4)}%`;
const pctH = (px: number) => `${((px / CANVAS_H) * 100).toFixed(4)}%`;

// ============================================================
// Sub-components
// ============================================================

function SectionHeadline({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <div className="sp-headline-wrap">
      <p className="sp-headline" aria-label={`${line1.trim()} ${line2}`}>
        <span aria-hidden="true">{line1}</span>
        <br aria-hidden="true" />
        <span aria-hidden="true">{line2}</span>
      </p>
    </div>
  );
}

interface TestimonialCardProps {
  slide: SocialProofSlide;
  dimmed: boolean;
}

function TestimonialCard({ slide, dimmed }: TestimonialCardProps) {
  return (
    <div className="sp-card-filter-wrap">
      <div className="sp-card" style={{ backgroundColor: slide.cardBgColor }}>
        <p className="sp-card-quote" style={{ color: slide.textColor }}>
          {slide.quoteSegments.map((seg, i) =>
            seg.oblique ? (
              <em key={i} className="sp-card-quote-em">
                {seg.text}
              </em>
            ) : (
              <span key={i}>{seg.text}</span>
            ),
          )}
        </p>
        <div className="sp-card-attribution">
          <span
            className="sp-card-pill"
            style={{ backgroundColor: slide.namePillBg, color: slide.namePillText }}
          >
            {slide.personName}
          </span>
          <span
            className="sp-card-pill"
            style={{ backgroundColor: slide.locationPillBg, color: slide.locationPillText }}
          >
            {slide.location}
          </span>
        </div>
        {dimmed && <div className="sp-card-dim" aria-hidden="true" />}
      </div>
    </div>
  );
}

// ============================================================
// Main component
// ============================================================

export function SocialProofSection({
  headlineLine1,
  headlineLine2,
  thumbnails,
  slides,
  closeButtonSrc,
}: SocialProofSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<(HTMLLIElement | null)[]>([]);
  const cardPositionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floatTimelinesRef = useRef<gsap.core.Timeline[]>([]);
  const modalVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const modalVideoTransitionWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const emblaViewportRef = useRef<HTMLDivElement | null>(null);
  /** In-flight open animation (Timeline) — killed if user closes before it finishes */
  const expandTweenRef = useRef<gsap.core.Animation | null>(null);
  const currentSlideRef = useRef(0);
  const isClosingRef = useRef(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [openAtSlide, setOpenAtSlide] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Portal target — resolved on the client AFTER hydration so the modal
  // renders directly into document.body, completely outside #smooth-content.
  // ScrollSmoother applies a CSS transform to #smooth-content which breaks
  // position:fixed for its descendants; mounting the modal under document.body
  // sidesteps the transformed ancestor.
  //
  // Why useState + useEffect (and not useMemo)?
  //   `{portalTarget && createPortal(...)}` produces a fiber in the parent
  //   tree's child list when `portalTarget` is non-null. If useMemo returned
  //   `document.body` synchronously on the client, hydration would compare
  //   the SSR HTML (no portal fiber) against the client tree (has portal
  //   fiber) and mismatch. Starting at `null` and switching after mount keeps
  //   the first client render identical to the server output.
  //
  // The Next.js `react-hooks/set-state-in-effect` lint is intentionally
  // suppressed here — this is the canonical "client-only initialisation
  // after hydration" pattern documented in `docs/rules/rules.md`.
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPortalTarget(document.body);
  }, []);

  // align: 'start' so slides are left-aligned — CSS positions are viewport-relative
  // when the active slide's left edge is at x=0.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  // ── Modal close ───────────────────────────────────────────────────────────

  const closeModal = useCallback(() => {
    if (isClosingRef.current) return;

    const slideIdx = currentSlideRef.current;
    const transitionWrap = modalVideoTransitionWrapRefs.current[slideIdx];
    const thumbWrap = wrapperRefs.current[slideIdx];
    const activeCard = cardPositionRefs.current[slideIdx];

    // Capture the thumbnail button now — focus it before hiding to prevent
    // the browser from choosing a different target and scrolling there.
    const thumbBtn = thumbWrap?.querySelector<HTMLButtonElement>('.sp-thumb') ?? null;

    // Kill any in-flight open animation
    expandTweenRef.current?.kill();
    expandTweenRef.current = null;

    if (
      !transitionWrap ||
      !thumbWrap ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      thumbBtn?.focus({ preventScroll: true });
      if (modalRef.current) gsap.set(modalRef.current, { clearProps: 'opacity' });
      setModalOpen(false);
      return;
    }

    isClosingRef.current = true;

    // Compute shrink geometry before the card fade changes anything.
    const otherWraps = modalVideoTransitionWrapRefs.current.filter(
      (_, i) => i !== slideIdx,
    );
    const otherCards = cardPositionRefs.current.filter((_, i) => i !== slideIdx);
    const thumbRect = thumbWrap.getBoundingClientRect();
    const currentRect = transitionWrap.getBoundingClientRect();
    const scaleX = thumbRect.width / currentRect.width;
    const scaleY = thumbRect.height / currentRect.height;
    const dx =
      thumbRect.left + thumbRect.width / 2 - (currentRect.left + currentRect.width / 2);
    const dy =
      thumbRect.top + thumbRect.height / 2 - (currentRect.top + currentRect.height / 2);

    const closeTl = gsap.timeline({
      onComplete: () => {
        isClosingRef.current = false;
        thumbBtn?.focus({ preventScroll: true });
        setModalOpen(false);
        // Clear all GSAP inline styles after the modal is invisible so the
        // next openModal() call starts from a clean DOM state.
        requestAnimationFrame(() => {
          gsap.set(transitionWrap, { clearProps: 'x,y,scaleX,scaleY,transformOrigin' });
          if (modalRef.current) gsap.set(modalRef.current, { clearProps: 'opacity' });
        });
      },
    });

    // t=0: instantly hide adjacent slides, cards, and close button
    closeTl.set([...otherWraps, ...otherCards, closeButtonRef.current], { opacity: 0 });
    // t=0: fade background out over the full close duration
    closeTl.to(modalRef.current, { opacity: 0, duration: 0.5, ease: 'power2.in' }, 0);
    // t=0: fade the active card out first
    closeTl.to(activeCard, { opacity: 0, duration: 0.15 }, 0);
    // t=0.15: shrink the active video back to thumbnail position
    closeTl.to(
      transitionWrap,
      {
        x: dx,
        y: dy,
        scaleX,
        scaleY,
        transformOrigin: 'center center',
        duration: 0.35,
        ease: 'power3.in',
      },
      0.15,
    );
  }, []);

  // ── Modal open ────────────────────────────────────────────────────────────

  const openModal = useCallback(
    (slideIndex: number) => {
      if (isClosingRef.current) return;

      // 1. Immediately jump the carousel to the target slide BEFORE the modal
      //    becomes visible — Embla is always mounted so this is synchronous.
      emblaApi?.scrollTo(slideIndex, true);

      // 2. Set GSAP initial state for the expand animation BEFORE the CSS
      //    visibility toggle, so the browser never paints the video at its
      //    final position first.
      const wrapEl = wrapperRefs.current[slideIndex];
      if (
        wrapEl &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        const thumbRect = wrapEl.getBoundingClientRect();
        const transitionWrap = modalVideoTransitionWrapRefs.current[slideIndex];
        if (transitionWrap) {
          // Clear all stale GSAP state from previous open/close cycles.
          // Must include `opacity` because closeModal sets all non-active
          // transition-wraps to opacity:0 — whichever one becomes the active
          // slide next would stay invisible without this clear.
          gsap.set(transitionWrap, { clearProps: 'x,y,scaleX,scaleY,transformOrigin,opacity' });

          const finalRect = transitionWrap.getBoundingClientRect();
          const scaleX = thumbRect.width / finalRect.width;
          const scaleY = thumbRect.height / finalRect.height;
          const dx =
            thumbRect.left + thumbRect.width / 2 -
            (finalRect.left + finalRect.width / 2);
          const dy =
            thumbRect.top + thumbRect.height / 2 -
            (finalRect.top + finalRect.height / 2);
          gsap.set(transitionWrap, {
            x: dx,
            y: dy,
            scaleX,
            scaleY,
            transformOrigin: 'center center',
          });
        }

        // Background starts invisible — expand effect will fade it in
        if (modalRef.current) gsap.set(modalRef.current, { opacity: 0 });

        // Hide all adjacent wraps, ALL cards, and close button.
        // Cards are siblings of transition wraps so must be managed separately.
        const otherWraps = modalVideoTransitionWrapRefs.current.filter(
          (_, i) => i !== slideIndex,
        );
        gsap.set(
          [...otherWraps, ...cardPositionRefs.current, closeButtonRef.current],
          { opacity: 0 },
        );
      }

      setOpenAtSlide(slideIndex);
      setModalOpen(true);
    },
    [emblaApi],
  );

  // ── Combined Embla ref ────────────────────────────────────────────────────

  const setEmblaRef = useCallback(
    (node: HTMLDivElement | null) => {
      emblaRef(node);
      emblaViewportRef.current = node;
    },
    [emblaRef],
  );

  // ── Override Embla's overflow:hidden so adjacent slides peek ──

  useEffect(() => {
    if (!emblaApi) return;
    const viewport = emblaViewportRef.current;
    if (!viewport) return;

    viewport.style.overflow = 'visible';

    // Prime Embla's loop state: visit the last slide then jump back to first.
    // Without this, Embla places loop clones at the far-end "wrap position"
    // on init and only repositions them to the adjacent slot after the user
    // first crosses the loop boundary — meaning slide 0 would show no left
    // peek on the very first open. Two synchronous jumps in the hidden modal
    // force Embla to compute the correct clone placement immediately.
    const snapCount = emblaApi.scrollSnapList().length;
    if (snapCount > 1) {
      emblaApi.scrollTo(snapCount - 1, true);
      emblaApi.scrollTo(0, true);
    }
  }, [emblaApi]);

  // ── Track active slide index (state + ref) ────────────────────────────────

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap();
      setCurrentSlide(idx);
      currentSlideRef.current = idx;
    };
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // ── Expand animation: thumbnail → full-size video when modal opens ────────
  //
  //  openModal() already called gsap.set() with the thumbnail's position and
  //  hid all cards / adjacent wraps. This effect animates everything in with
  //  the correct sequence: bg + video expand → active card → others.

  useEffect(() => {
    if (!modalOpen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Reduced motion: reveal everything immediately
      if (modalRef.current) gsap.set(modalRef.current, { opacity: 1 });
      gsap.set(
        [
          ...modalVideoTransitionWrapRefs.current,
          ...cardPositionRefs.current,
          closeButtonRef.current,
        ],
        { clearProps: 'opacity' },
      );
      return;
    }

    const transitionWrap = modalVideoTransitionWrapRefs.current[openAtSlide];
    if (!transitionWrap) return;

    const otherWraps = modalVideoTransitionWrapRefs.current.filter(
      (_, i) => i !== openAtSlide,
    );
    const otherCards = cardPositionRefs.current.filter((_, i) => i !== openAtSlide);
    const activeCard = cardPositionRefs.current[openAtSlide];

    const openTl = gsap.timeline({
      onComplete: () => {
        expandTweenRef.current = null;
      },
    });

    // t=0: fade modal background in (slightly faster than the expand)
    openTl.to(modalRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0);

    // t=0: expand the active video from thumbnail position to natural size
    openTl.to(
      transitionWrap,
      {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        transformOrigin: 'center center',
        duration: 0.45,
        ease: 'power3.out',
        clearProps: 'x,y,scaleX,scaleY,transformOrigin',
      },
      0,
    );

    // t=0.45: after video is in position, fade in the active card
    openTl.to(
      activeCard,
      { opacity: 1, duration: 0.25, clearProps: 'opacity' },
      0.45,
    );

    // t=0.50: fade in adjacent videos, their cards, and the close button
    openTl.to(
      [...otherWraps, ...otherCards, closeButtonRef.current],
      { opacity: 1, duration: 0.3, stagger: 0.04, clearProps: 'opacity' },
      0.5,
    );

    expandTweenRef.current = openTl;
  }, [modalOpen, openAtSlide]);

  // ── Play active video; pause and reset inactive videos ───────────────────

  useEffect(() => {
    if (!modalOpen) return;
    modalVideoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === currentSlide) {
        video.muted = false;
        video.play().catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      } else {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
      }
    });
  }, [modalOpen, currentSlide]);

  // ── Pause all modal videos when modal closes ──────────────────────────────

  useEffect(() => {
    if (!modalOpen) {
      modalVideoRefs.current.forEach((v) => {
        if (!v) return;
        v.pause();
        v.currentTime = 0;
      });
    }
  }, [modalOpen]);

  // ── Auto-advance carousel when the current video ends ────────────────────

  useEffect(() => {
    if (!modalOpen || !emblaApi) return;
    const video = modalVideoRefs.current[currentSlide];
    if (!video) return;
    const handleEnded = () => emblaApi.scrollNext();
    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [modalOpen, currentSlide, emblaApi]);

  // ── Keyboard navigation ───────────────────────────────────────────────────

  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') emblaApi?.scrollNext();
      if (e.key === 'ArrowLeft') emblaApi?.scrollPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalOpen, emblaApi, closeModal]);

  // ── Move focus to close button when modal opens ───────────────────────────
  // preventScroll: true is required here. Without it the browser performs a
  // native scroll to bring the focused element into view. Inside a CSS-transformed
  // ancestor the browser miscalculates the element's position as offset 0,0 of
  // the document and scrolls to the top — causing the page to jump to the hero.

  useEffect(() => {
    if (modalOpen && closeButtonRef.current) {
      closeButtonRef.current.focus({ preventScroll: true });
    }
  }, [modalOpen]);

  // ── Floating animation ───────────────────────────────────────────────────
  //
  // Spec 026 retired the section pin. The thumbnail floating animation now
  // starts the first time the section enters the viewport via a direct
  // ScrollTrigger; this matches the pre-spec-026 behaviour where the pin's
  // onEnter started the floating timelines.

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        '(prefers-reduced-motion: no-preference) and (min-width: 768px)',
        () => {
          const section = sectionRef.current;
          if (!section) return;

          const startFloating = () => {
            if (floatTimelinesRef.current.length > 0) return;
            floatTimelinesRef.current = wrapperRefs.current.map((ref, i) => {
              const path = FLOAT_PATHS[i] ?? FLOAT_PATHS[0];
              const delay = FLOAT_DELAYS[i] ?? 0;
              const tl = gsap.timeline({ repeat: -1, delay });
              path.forEach(({ x, y, scale, duration }) => {
                tl.to(ref, { x, y, scale, duration, ease: 'sine.inOut' });
              });
              return tl;
            });
          };

          ScrollTrigger.create({
            id: 'social-proof-entrance',
            trigger: section,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              log('social-proof-entrance', 'ANIM_START');
              startFloating();
            },
          });
        },
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Pause/resume floating + lock scroll when modal is open/closed ───────
  //
  // Spec 026 cleanup: the previous implementation hand-rolled a scroll lock
  // that depended on the section pin's scroll-state machine. With the pin
  // retired, use the project's standard lockScroll() helper from
  // lib/scrollLock.ts (the single approved approach per the rules). It
  // returns an unlock callback that handles both the ScrollSmoother and
  // the no-smoother fallback scenarios.

  useEffect(() => {
    if (!modalOpen) return;
    floatTimelinesRef.current.forEach((t) => t.pause());
    const unlock = lockScroll();
    return () => {
      floatTimelinesRef.current.forEach((t) => t.resume());
      unlock();
    };
  }, [modalOpen]);

  // ──────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Section ── */}
      <section ref={sectionRef} className="sp-section hidden md:block" data-theme="custom">
        <SectionHeadline line1={headlineLine1} line2={headlineLine2} />

        <ul className="sp-thumbs" aria-label="Customer video clips">
          {thumbnails.map((thumb, i) => (
            <li
              key={i}
              ref={(el) => {
                wrapperRefs.current[i] = el;
              }}
              className="sp-thumb-wrap"
              style={
                {
                  '--sp-left': pctW(thumb.initialLeft),
                  '--sp-top': pctH(thumb.initialTop),
                  '--sp-width': pctW(thumb.width),
                  '--sp-height': pctH(thumb.height),
                } as React.CSSProperties
              }
            >
              <button
                type="button"
                className="sp-thumb"
                onClick={() => openModal(i)}
                aria-label={`Play customer testimonial ${i + 1}`}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                  className="sp-thumb-video"
                >
                  <source src={thumb.videoSrc} type="video/mp4" />
                </video>
              </button>
              <Image
                className="sp-thumb-badge"
                src={thumb.markerSrc}
                alt=""
                aria-hidden="true"
                width={15}
                height={15}
                style={
                  thumb.markerRotation
                    ? { transform: `rotate(${thumb.markerRotation}deg)` }
                    : undefined
                }
              />
            </li>
          ))}
        </ul>
      </section>

      {/*
       * ── Modal — rendered via React portal into document.body.
       *
       * The modal must live OUTSIDE #smooth-content. ScrollSmoother applies a
       * CSS transform to #smooth-content which breaks position:fixed for its
       * children — fixed elements become positioned relative to the transformed
       * ancestor instead of the viewport. This causes the modal overlay to
       * mis-align and focus() on the close button to trigger a native scroll to
       * the top of the document (the browser miscalculates the element's
       * viewport position as 0,0 inside the transformed container).
       *
       * portalTarget is null on the server (no document.body) and set to
       * document.body in a useEffect so the portal only mounts on the client.
       * The modal is kept always-mounted so Embla stays initialized and
       * getBoundingClientRect() on its children is always available for the
       * thumbnail-to-fullscreen expand/shrink animation.
       */}
      {portalTarget && createPortal(
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Customer testimonials carousel"
          aria-hidden={modalOpen ? undefined : 'true'}
          className={`sp-modal${modalOpen ? ' sp-modal--open' : ''}`}
          data-theme="custom"
        >
          <button
            ref={closeButtonRef}
            className="sp-close-btn"
            onClick={closeModal}
            aria-label="Close"
          >
            <Image
              src={closeButtonSrc}
              alt=""
              aria-hidden="true"
              className="sp-close-icon"
              width={33}
              height={33}
            />
          </button>

          <button
            className="sp-nav-prev"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous testimonial"
            tabIndex={modalOpen ? undefined : -1}
          />
          <button
            className="sp-nav-next"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next testimonial"
            tabIndex={modalOpen ? undefined : -1}
          />

          <div ref={setEmblaRef} className="sp-embla">
            <div className="sp-embla-container">
              {slides.map((slide, i) => (
                <div key={i} className="sp-slide">
                  {/*
                   * .sp-slide-transition-wrap: GSAP expand/shrink target.
                   * openModal() positions it at the thumbnail's screen rect before
                   * the modal becomes visible; this effect then animates to 0,0,1,1.
                   */}
                  <div
                    ref={(el) => {
                      modalVideoTransitionWrapRefs.current[i] = el;
                    }}
                    className="sp-slide-transition-wrap"
                  >
                    <div
                      className={`sp-slide-video-wrap${i === currentSlide ? ' sp-slide-video-wrap--active' : ''}`}
                    >
                      <video
                        ref={(el) => {
                          modalVideoRefs.current[i] = el;
                        }}
                        className="sp-slide-video"
                        playsInline
                        loop={false}
                        aria-label={`Testimonial video ${i + 1}`}
                      >
                        <source src={slide.videoSrc} type="video/mp4" />
                      </video>
                    </div>
                  </div>

                  <div
                    ref={(el) => {
                      cardPositionRefs.current[i] = el;
                    }}
                    className="sp-card-position"
                  >
                    <TestimonialCard slide={slide} dimmed={i !== currentSlide} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>,
        portalTarget,
      )}
    </>
  );
}
