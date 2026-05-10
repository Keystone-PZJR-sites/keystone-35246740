'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { KeystoneMark } from '@/components/elements';
import { useLeadCapture } from './LeadCaptureModal';
import { setPixelUserData, captureEvent } from 'keystone-design-bootstrap/tracking';
import type { OversizedFooterProps } from './OversizedFooter';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type MobileFooterProps = OversizedFooterProps;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface SocialBtnProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

function SocialBtn({ href, label, children }: SocialBtnProps) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="mfooter-social-btn"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {children}
      </svg>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function MobileFooter({
  leftTagline,
  cta2Label,
  emailPlaceholder,
  signUpLabel,
  cta1Href,
  podcastUrl,
  youtubeUrl,
  instagramUrl,
  facebookUrl,
  linkedinUrl,
  keystoneMarkColor,
  ctaArrowSrc,
  keystoneWordmarkSrc,
  videoC,
  videoD,
  videoE,
}: MobileFooterProps) {
  const { openModal } = useLeadCapture();

  const [emailValue, setEmailValue] = useState('');
  const [signUpState, setSignUpState] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle'
  );
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
      const result = (await res.json()) as { success: boolean; error?: string };
      if (result.success) {
        await setPixelUserData({ email: emailValue.trim() });
        await captureEvent('form_submitted', { form_type: 'marketing_list_signup' });
        setSignUpState('success');
        setEmailValue('');
      } else {
        setSignUpError(result.error ?? 'Something went wrong. Please try again.');
        setSignUpState('error');
      }
    } catch {
      setSignUpError('Something went wrong. Please try again.');
      setSignUpState('error');
    }
  };

  return (
    <footer className="mfooter-section md:hidden" data-theme="custom">
      {/*
       * ── COLLAGE ZONE ─────────────────────────────────────────────────────
       *
       * Same proportional flex-row model as the desktop footer
       * (OversizedFooter / oversized-footer.css).
       *
       * Five rows, each flex: 1 of the collage height.  FK Screamer
       * headline is flex-shrink: 0 at 19.6vw — calibrated so "FOR
       * BUSINESSES" fills the full row width at any mobile viewport.
       * Video clips are flex: 1 and fill the remaining row space.
       * Row 3 uses an invisible spacer between "DONE" and "FIGURING".
       *
       * Video assignments  (mobile Figma node 1281:607):
       *   Row 2  videoC  — clip beside "THAT ARE"
       *   Row 4  videoE  — clip beside "IT OUT"
       *   Row 5  videoD  — clip beside "THEMSELVES"
       * ─────────────────────────────────────────────────────────────────── */}
      <div className="mfooter-collage" aria-hidden="true">
        {/* Row 1 — text only; font calibrated to fill full row width */}
        <div className="mfooter-collage-row">
          <p className="mfooter-col-headline">FOR BUSINESSES</p>
        </div>

        {/* Row 2 — [video fills left] + "THAT ARE" */}
        <div className="mfooter-collage-row">
          <div className="mfooter-collage-clip">
            <video autoPlay loop muted playsInline>
              <source src={videoC} />
            </video>
          </div>
          <p className="mfooter-col-headline">THAT ARE</p>
        </div>

        {/* Row 3 — "DONE" [spacer fills] "FIGURING" */}
        <div className="mfooter-collage-row">
          <p className="mfooter-col-headline">DONE</p>
          <div className="mfooter-collage-spacer" aria-hidden="true" />
          <p className="mfooter-col-headline">FIGURING</p>
        </div>

        {/* Row 4 — "IT OUT" + [video fills right] */}
        <div className="mfooter-collage-row">
          <p className="mfooter-col-headline">IT OUT</p>
          <div className="mfooter-collage-clip">
            <video autoPlay loop muted playsInline>
              <source src={videoE} />
            </video>
          </div>
        </div>

        {/* Row 5 — [video fills left] + "THEMSELVES" */}
        <div className="mfooter-collage-row">
          <div className="mfooter-collage-clip">
            <video autoPlay loop muted playsInline>
              <source src={videoD} />
            </video>
          </div>
          <p className="mfooter-col-headline">THEMSELVES</p>
        </div>
      </div>

      {/* Keystone K mark — 43px gap below collage, 24px from left */}
      <div className="mfooter-mark">
        <KeystoneMark color={keystoneMarkColor} width={37} height={41} alt="Keystone" />
      </div>

      {/*
       * ── CONTENT ROWS ────────────────────────────────────────────────────
       * Natural flow with equal 40px margins between rows.
       * ─────────────────────────────────────────────────────────────────── */}

      {/* Row 1: Tagline + Get Started CTA */}
      <div className="mfooter-row-tagline">
        <p className="mfooter-tagline">{leftTagline}</p>
        <button type="button" className="mfooter-cta-btn" onClick={() => openModal()}>
          {cta2Label}
          {ctaArrowSrc && (
            <Image src={ctaArrowSrc} width={12} height={12} alt="" aria-hidden />
          )}
        </button>
      </div>

      {/* Row 2: Blog/Podcast text + Social icons */}
      <div className="mfooter-row-social">
        <p className="mfooter-social-copy">
          <span>Read </span>
          <Link href={cta1Href} className="mfooter-underline-link">
            the blog
          </Link>
          <span> and check out </span>
          <a
            href={podcastUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mfooter-underline-link"
          >
            our podcast
          </a>
          <span>.</span>
        </p>
        <div className="mfooter-social-icons">
          {instagramUrl && (
            <SocialBtn href={instagramUrl} label="Instagram">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.09 5.09A5.56 5.56 0 018 4a5.56 5.56 0 014.11 9.91A5.56 5.56 0 018 13.11a5.56 5.56 0 01-4.11-9.01l1.2 1.2A3.89 3.89 0 004.55 8c0 1.07.42 2.1 1.17 2.86A3.89 3.89 0 008 12c1.07 0 2.1-.42 2.86-1.17A3.89 3.89 0 0012 8c0-1.07-.42-2.1-1.17-2.86A3.89 3.89 0 008 4c-.77 0-1.52.23-2.17.63L5.09 5.09z"
                fill="currentColor"
              />
              <circle cx="8" cy="8" r="2.33" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="11" cy="5" r="0.75" fill="currentColor" />
            </SocialBtn>
          )}
          {facebookUrl && (
            <SocialBtn href={facebookUrl} label="Facebook">
              <path
                d="M9.33 4H10.67V2H8.67C7.19 2 6 3.19 6 4.67V7H4v2h2v5h2V9h2.33L11 7H8V4.67C8 4.3 8.3 4 8.67 4h.66z"
                fill="currentColor"
              />
            </SocialBtn>
          )}
          {youtubeUrl && (
            <SocialBtn href={youtubeUrl} label="YouTube">
              <path
                d="M13.9 4.9a1.65 1.65 0 00-1.16-1.17C11.69 3.5 8 3.5 8 3.5s-3.69 0-4.74.23A1.65 1.65 0 002.1 4.9C1.88 5.96 1.88 8 1.88 8s0 2.04.22 3.1c.12.62.62 1.1 1.16 1.17C4.31 12.5 8 12.5 8 12.5s3.69 0 4.74-.23c.54-.07 1.04-.55 1.16-1.17.22-1.06.22-3.1.22-3.1s0-2.04-.22-3.1zM6.5 10V6l3.5 2-3.5 2z"
                fill="currentColor"
              />
            </SocialBtn>
          )}
          {linkedinUrl && (
            <SocialBtn href={linkedinUrl} label="LinkedIn">
              <path
                d="M3 4a1 1 0 112 0 1 1 0 01-2 0zm0 2.5h2V13H3V6.5zm4 0h1.9v.9h.02C9.28 6.9 10.1 6.4 11.2 6.4 13.16 6.4 14 7.5 14 9.46V13h-2V9.9c0-.77-.01-1.76-1.07-1.76-1.07 0-1.24.84-1.24 1.7V13H7V6.5z"
                fill="currentColor"
              />
            </SocialBtn>
          )}
        </div>
      </div>

      {/* Row 3: Email signup */}
      <div className="mfooter-row-email">
        <p className="mfooter-email-copy">
          Stay informed about our latest features and product releases
        </p>
        {signUpState === 'success' ? (
          <p className="mfooter-signup-error" role="status">
            You&apos;re signed up!
          </p>
        ) : (
          <form className="mfooter-email-form" onSubmit={handleSignUp}>
            <input
              className="mfooter-email-input"
              type="email"
              placeholder={emailPlaceholder}
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              aria-label={emailPlaceholder}
              disabled={signUpState === 'submitting'}
            />
            <button
              type="submit"
              className="mfooter-signup-btn"
              disabled={signUpState === 'submitting'}
            >
              {signUpState === 'submitting' ? '…' : signUpLabel}
              {ctaArrowSrc && (
                <Image src={ctaArrowSrc} width={12} height={12} alt="" aria-hidden />
              )}
            </button>
          </form>
        )}
        {signUpState === 'error' && signUpError && (
          <p className="mfooter-signup-error" role="alert">
            {signUpError}
          </p>
        )}
      </div>

      {/* Wordmark — full-width, proportionally scaled, 32px gap above.
          width/height are the SVG's intrinsic dimensions (ratio source only).
          CSS sets width: 100%; height: auto so it fills the padded container
          and scales with the viewport, matching the Figma constraint. */}
      <div className="mfooter-wordmark">
        <Image
          src={keystoneWordmarkSrc}
          width={345}
          height={67}
          alt="keystone"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      {/* Legal — right-of-center per Figma (center at calc(50%+74.5px)) */}
      <div className="mfooter-legal">
        <Link href="/terms" className="mfooter-legal-link">
          Terms
        </Link>
        <Link href="/privacy" className="mfooter-legal-link">
          Privacy
        </Link>
        <span className="mfooter-legal-text">© {new Date().getFullYear()} Keystone</span>
      </div>
    </footer>
  );
}
