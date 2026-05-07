'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { KeystoneMark } from '@/components/elements';
import { useLeadCapture } from './LeadCaptureModal';
import { setPixelUserData, captureEvent } from 'keystone-design-bootstrap/tracking';

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
  /** Label for the first CTA button ("Learn more") */
  cta1Label: string;
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
    'footer-btn-text flex h-12 items-center rounded-full px-4 gap-2';
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

interface SocialIconProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

function SocialIcon({ href, label, children }: SocialIconProps) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-social-link"
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="1.5" />
        {children}
      </svg>
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
  cta1Label,
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
}: OversizedFooterProps) {
  const { openModal } = useLeadCapture();

  const [emailValue, setEmailValue] = useState('');
  const [signUpState, setSignUpState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [signUpError, setSignUpError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValue.trim()) return;
    setSignUpState('submitting');
    setSignUpError('');
    try {
      const res = await fetch('/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'marketing_list_signup', email: emailValue.trim() }),
      });
      const result = await res.json() as { success: boolean; error?: string };
      if (result.success) {
        await setPixelUserData({ email: emailValue.trim() });
        captureEvent('form_submitted', { form_type: 'marketing_list_signup' });
        setSignUpState('success');
        setEmailValue('');
      } else {
        setSignUpState('error');
        setSignUpError(result.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setSignUpState('error');
      setSignUpError('Something went wrong. Please try again.');
    }
  };
  return (
    <section className="footer-section" data-theme="custom">

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
          UPPER ZONE — mobile (<768px): simplified stacked layout
          ================================================================ */}
      <div className="footer-mobile-collage">
        <span className="footer-mobile-headline">{line1}</span>
        <span className="footer-mobile-headline">{line2}</span>
        <span className="footer-mobile-headline">{line3}</span>
        <span className="footer-mobile-headline">{line4}</span>
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
        <div className="footer-lower-grid mt-8 lg:mt-[60px]">

          {/* ── Row 1: taglines ── */}
          <p className="footer-lower-tag1 footer-tagline">{leftTagline}</p>
          <p className="footer-lower-tag2 footer-tagline">{rightTagline}</p>
          <p className="footer-lower-tag3 footer-tagline">
            Read{' '}
            <Link href={cta1Href} className="footer-tagline-link">the blog</Link>
            {' '}and check out{' '}
            <a
              href={podcastUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-tagline-link"
            >our podcast</a>.
          </p>
          {/* ── Row 2, col 1: CTA pill ── */}
          <div className="footer-lower-act1">
            <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-work-accent)] p-3">
              <Link
                href={cta1Href}
                className="footer-btn-text flex h-12 items-center rounded-full px-4 gap-2 bg-[var(--color-work-accent)] text-[var(--color-footer-bg)]"
              >
                <span>{cta1Label}</span>
              </Link>
              <button
                type="button"
                onClick={(e) => openModal(e.currentTarget)}
                className="footer-btn-text flex h-12 items-center rounded-full px-4 gap-2 bg-[var(--color-work-chip-bg)] text-[var(--color-footer-bg)]"
              >
                <span>{cta2Label}</span>
                {ctaArrowSrc && (
                  <Image src={ctaArrowSrc} width={16} height={16} alt="" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* ── Row 2, col 2: email signup ── */}
          <div className="footer-lower-act2">
            {signUpState === 'success' ? (
              <p className="footer-signup-success">You&apos;re in! We&apos;ll keep you posted.</p>
            ) : (
              <form
                onSubmit={handleSignUp}
                className="flex items-center rounded-full border border-[var(--color-work-accent)] p-3 w-full"
              >
                <label htmlFor="footer-email" className="sr-only">
                  {emailPlaceholder}
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  className="footer-email-input pl-3"
                  placeholder={emailPlaceholder}
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  disabled={signUpState === 'submitting'}
                />
                <PillButton
                  label={signUpState === 'submitting' ? '…' : signUpLabel}
                  arrowSrc={signUpState === 'submitting' ? undefined : ctaArrowSrc}
                  variant="peach"
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
              {youtubeUrl && (
                <SocialIcon href={youtubeUrl} label="YouTube">
                  {/* Play triangle */}
                  <polygon points="17,15 17,29 31,22" fill="currentColor" />
                </SocialIcon>
              )}
              {instagramUrl && (
                <SocialIcon href={instagramUrl} label="Instagram">
                  {/* Camera body */}
                  <rect x="13" y="13" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
                  {/* Lens */}
                  <circle cx="22" cy="22" r="5" stroke="currentColor" strokeWidth="1.5" />
                  {/* Flash dot */}
                  <circle cx="27.5" cy="16.5" r="1.25" fill="currentColor" />
                </SocialIcon>
              )}
              {facebookUrl && (
                <SocialIcon href={facebookUrl} label="Facebook">
                  <text
                    x="22"
                    y="29"
                    textAnchor="middle"
                    fontSize="22"
                    fontWeight="700"
                    fill="currentColor"
                    fontFamily="'FK Grotesk Neue', system-ui, sans-serif"
                  >f</text>
                </SocialIcon>
              )}
              {linkedinUrl && (
                <SocialIcon href={linkedinUrl} label="LinkedIn">
                  <text
                    x="22"
                    y="28"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill="currentColor"
                    fontFamily="'FK Grotesk Neue', system-ui, sans-serif"
                  >in</text>
                </SocialIcon>
              )}
            </div>
          </div>

        </div>

        {/* Full-width wordmark — 60px gap from CTA bottom */}
        <div className="mt-8 lg:mt-[60px] pb-6 lg:pb-[24px]">
          <Image
            src={keystoneWordmarkSrc}
            alt="keystone"
            className="footer-wordmark-img"
            width={1390}
            height={268}
          />
        </div>

      </div>
    </section>
  );
}
