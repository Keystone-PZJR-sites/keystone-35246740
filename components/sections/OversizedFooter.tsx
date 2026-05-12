'use client';

import Image from 'next/image';
import Link from 'next/link';
import { KeystoneMark, SocialIcon } from '@/components/elements';
import { useLeadCapture } from './LeadCaptureModal';
import { useEmailSignup } from '@/lib/useEmailSignup';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface OversizedFooterProps {
  /** Line 1 of the FK Screamer collage headline */
  line1: string;
  /** Line 2 of the FK Screamer collage headline */
  line2: string;
  /** Line 3 of the FK Screamer collage headline (intentional leading space preserved) */
  line3: string;
  /** Line 4 of the FK Screamer collage headline */
  line4: string;
  /** Short tagline in the left column of the lower zone */
  leftTagline: string;
  /** Short tagline in the right column of the lower zone */
  rightTagline: string;
  /** Label for the second CTA button ("Get started") */
  cta2Label: string;
  /** Placeholder text for the email input */
  emailPlaceholder: string;
  /** Label for the email sign-up button */
  signUpLabel: string;
  /** CSS color for the Keystone geometric mark */
  keystoneMarkColor: string;
  /** Path to the right-arrow icon used in CTA and Sign Up buttons */
  ctaArrowSrc: string;
  /** Path to the full-width Keystone logotype SVG */
  keystoneWordmarkSrc: string;
  /** Path to video clip A — businesswoman */
  videoA: string;
  /** Path to video clip B — storefront */
  videoB: string;
  /** Path to video clip C — barbershop */
  videoC: string;
  /** Path to video clip D — phone call */
  videoD: string;
  /** Path to video clip E — ceramics */
  videoE: string;
  /** href for the first CTA button — links to the blog */
  cta1Href: string;
  /** Spotify podcast URL */
  podcastUrl: string;
  /** YouTube channel URL from company info */
  youtubeUrl?: string;
  /** Instagram profile URL from company info */
  instagramUrl?: string;
  /** Facebook profile URL from company info */
  facebookUrl?: string;
  /** LinkedIn profile URL from company info */
  linkedinUrl?: string;
  /** Apple Podcasts show URL */
  applePodcastsUrl?: string;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface VideoClipProps {
  src: string;
  clipClass: string;
}

function VideoClip({ src, clipClass }: VideoClipProps) {
  return (
    <div className={`footer-video-clip ${clipClass}`}>
      <video autoPlay loop muted playsInline>
        <source src={src} />
      </video>
    </div>
  );
}

interface PillButtonProps {
  href?: string;
  label: string;
  arrowSrc?: string;
  variant: 'orange' | 'peach';
  type?: 'submit' | 'button';
  disabled?: boolean;
}

function PillButton({ href, label, arrowSrc, variant, type, disabled }: PillButtonProps) {
  const baseClass =
    'footer-btn-text flex h-12 shrink-0 items-center rounded-full px-4 gap-2';
  const colorClass =
    variant === 'orange'
      ? 'bg-[var(--color-work-accent)] text-[var(--color-footer-bg)]'
      : 'bg-[var(--color-work-chip-bg)] text-[var(--color-footer-bg)]';

  const inner = (
    <>
      <span>{label}</span>
      {arrowSrc && (
        <Image src={arrowSrc} width={16} height={16} alt="" aria-hidden="true" />
      )}
    </>
  );

  if (type === 'submit' || type === 'button') {
    return (
      <button type={type} className={`${baseClass} ${colorClass}`} disabled={disabled}>
        {inner}
      </button>
    );
  }

  return (
    <a href={href} className={`${baseClass} ${colorClass}`}>
      {inner}
    </a>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function OversizedFooter({
  line1,
  line2,
  line3,
  line4,
  leftTagline,
  rightTagline,
  cta2Label,
  emailPlaceholder,
  signUpLabel,
  keystoneMarkColor,
  ctaArrowSrc,
  keystoneWordmarkSrc,
  videoA,
  videoB,
  videoC,
  videoD,
  videoE,
  cta1Href,
  podcastUrl,
  youtubeUrl,
  instagramUrl,
  facebookUrl,
  linkedinUrl,
  applePodcastsUrl,
}: OversizedFooterProps) {
  const { openModal } = useLeadCapture();
  const { state: signUpState, errorMessage: signUpError, handleSubmit: handleSignUp } = useEmailSignup();
  return (
    <section className="footer-section hidden md:block" data-theme="custom">

      {/* ================================================================
          UPPER ZONE — collage (tablet + desktop ≥768px)
          Four equal-height flex rows stacked inside an aspect-ratio container.
          Text is flex-shrink:0 (fixed size). Videos flex-grow to fill the rest.
          A single gap value across all rows gives consistent text↔video spacing.
          ================================================================ */}
      <div className="footer-collage-outer">
        {/* Row 1: "FOR BUSINESSES" | Video A fills right */}
        <div className="footer-collage-row">
          <p className="footer-headline">{line1}</p>
          <VideoClip src={videoA} clipClass="footer-video-a" />
        </div>
        {/* Row 2: Video B (left-indented via margin) | "THAT ARE" | Video C → flush right */}
        <div className="footer-collage-row">
          <VideoClip src={videoB} clipClass="footer-video-b" />
          <p className="footer-headline">{line2}</p>
          <VideoClip src={videoC} clipClass="footer-video-c" />
        </div>
        {/* Row 3: Video D (left-indented via margin, fills left) | " DONE FIGURING" → flush right */}
        <div className="footer-collage-row">
          <VideoClip src={videoD} clipClass="footer-video-d" />
          <p className="footer-headline">{line3}</p>
        </div>
        {/* Row 4: "IT OUT THEMSELVES" | Video E fills right */}
        <div className="footer-collage-row">
          <p className="footer-headline">{line4}</p>
          <VideoClip src={videoE} clipClass="footer-video-e" />
        </div>
      </div>

      {/* ================================================================
          BREATHING SPACE — 623px of intentional dark maroon emptiness
          ================================================================ */}
      <div className="footer-breathing-space" aria-hidden="true" />

      {/* ================================================================
          LOWER ZONE — utilities: mark, taglines, CTAs, email, wordmark
          ================================================================ */}
      {/* max-w-[1440px] prevents the lower zone from expanding beyond the
          design canvas width at very wide viewports */}
      <div className="px-6 pb-6">

        {/* Keystone geometric mark */}
        <KeystoneMark
          color={keystoneMarkColor}
          width={36}
          height={41}
          alt="Keystone"
        />

        {/* 3-column lower grid — taglines in row 1, actions in row 2.
            On mobile the grid stacks as tag→act pairs per column. */}
        <div className="footer-lower-grid mt-[60px]">

          {/* ── Row 1: taglines ── */}
          <p className="footer-lower-tag1 footer-tagline">{leftTagline}</p>
          <p className="footer-lower-tag2 footer-tagline">{rightTagline}</p>
          <p className="footer-lower-tag3 footer-tagline">
            Read{' '}
            <Link href={cta1Href} className="footer-tagline-link">the blog</Link>
            {' '}and check out our podcast.
          </p>
          {/* ── Row 2, col 1: CTA — standalone "Get started" (no border wrapper, no Blog link) ── */}
          <div className="footer-lower-act1">
            <button
              type="button"
              onClick={(e) => openModal(e.currentTarget)}
              className="footer-btn-text flex h-12 shrink-0 items-center rounded-full px-4 gap-2 bg-[var(--color-work-chip-bg)] text-[var(--color-footer-bg)]"
            >
              <span>{cta2Label}</span>
              {ctaArrowSrc && (
                <Image src={ctaArrowSrc} width={16} height={16} alt="" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* ── Row 2, col 2: email signup ── */}
          <div className="footer-lower-act2">
            {signUpState === 'success' ? (
              <p className="footer-signup-success">You&apos;re in! We&apos;ll keep you posted.</p>
            ) : (
              <form
                onSubmit={handleSignUp}
                className="flex items-center rounded-full border border-[#9f3722] p-3 w-full max-w-[480px]"
              >
                <label htmlFor="footer-email" className="sr-only">
                  {emailPlaceholder}
                </label>
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  required
                  className="footer-email-input pl-3"
                  placeholder={emailPlaceholder}
                  disabled={signUpState === 'submitting'}
                />
                <PillButton
                  label={signUpState === 'submitting' ? '…' : signUpLabel}
                  arrowSrc={signUpState === 'submitting' ? undefined : ctaArrowSrc}
                  variant="orange"
                  type="submit"
                  disabled={signUpState === 'submitting'}
                />
              </form>
            )}
            {signUpState === 'error' && signUpError && (
              <p className="footer-signup-error" role="alert">{signUpError}</p>
            )}
          </div>

          {/* ── Row 2, col 3: social icons ── */}
          <div className="footer-lower-act3">
            <div className="footer-social-icons">
              <SocialIcon platform="youtube"       href={youtubeUrl}       variant="desktop" className="footer-social-link" />
              <SocialIcon platform="spotify"       href={podcastUrl}       variant="desktop" className="footer-social-link" />
              <SocialIcon platform="applepodcasts" href={applePodcastsUrl} variant="desktop" className="footer-social-link" />
              <SocialIcon platform="instagram"     href={instagramUrl}     variant="desktop" className="footer-social-link" />
              <SocialIcon platform="facebook"      href={facebookUrl}      variant="desktop" className="footer-social-link" />
              <SocialIcon platform="linkedin"      href={linkedinUrl}      variant="desktop" className="footer-social-link" />
            </div>
          </div>

        </div>

        {/* Full-width wordmark + legal overlay.
            The legal row is absolutely positioned so its bottom edge aligns
            with the bottom of the wordmark's descender (the "y" tail). */}
        <div className="footer-wordmark-container mt-[60px]">
          <Image
            src={keystoneWordmarkSrc}
            alt="keystone"
            className="footer-wordmark-img"
            width={1390}
            height={268}
          />
          {/* Terms · Privacy · © */}
          <div className="footer-legal">
            <Link href="/terms" className="footer-legal-link">Terms</Link>
            <Link href="/privacy" className="footer-legal-link">Privacy</Link>
            <span>© {new Date().getFullYear()} Keystone</span>
          </div>
        </div>

      </div>
    </section>
  );
}
