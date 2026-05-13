'use client';

import Image from 'next/image';
import Link from 'next/link';
import { KeystoneMark, SocialIcon } from '@/components/elements';
import { useLeadCapture } from './LeadCaptureModal';
import { useEmailSignup } from '@/lib/useEmailSignup';
import type { OversizedFooterProps } from './OversizedFooter';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type MobileFooterProps = OversizedFooterProps;

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
  applePodcastsUrl,
  keystoneMarkColor,
  ctaArrowSrc,
  keystoneWordmarkSrc,
  videoC,
  videoD,
  videoE,
}: MobileFooterProps) {
  const { openModal } = useLeadCapture();
  const { state: signUpState, errorMessage: signUpError, handleSubmit: handleSignUp } = useEmailSignup();

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
            {videoC.poster && (
              <picture className="absolute inset-0" aria-hidden="true">
                <source
                  srcSet={[300, 500, 800, 1024, 1280].map(w => `${videoC.poster}-${w}w.webp ${w}w`).join(', ')}
                  type="image/webp"
                  sizes="45vw"
                />
                <img src={`${videoC.poster}-800w.webp`} alt="" decoding="async" className="h-full w-full object-cover" />
              </picture>
            )}
            <video autoPlay loop muted playsInline>
              <source src={videoC.webm} type="video/webm" />
              <source src={videoC.mp4} type="video/mp4" />
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
            {videoE.poster && (
              <picture className="absolute inset-0" aria-hidden="true">
                <source
                  srcSet={[300, 500, 800, 1024, 1280].map(w => `${videoE.poster}-${w}w.webp ${w}w`).join(', ')}
                  type="image/webp"
                  sizes="45vw"
                />
                <img src={`${videoE.poster}-800w.webp`} alt="" decoding="async" className="h-full w-full object-cover" />
              </picture>
            )}
            <video autoPlay loop muted playsInline>
              <source src={videoE.webm} type="video/webm" />
              <source src={videoE.mp4} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Row 5 — [video fills left] + "THEMSELVES" */}
        <div className="mfooter-collage-row">
          <div className="mfooter-collage-clip">
            {videoD.poster && (
              <picture className="absolute inset-0" aria-hidden="true">
                <source
                  srcSet={[300, 500, 800, 1024, 1280].map(w => `${videoD.poster}-${w}w.webp ${w}w`).join(', ')}
                  type="image/webp"
                  sizes="45vw"
                />
                <img src={`${videoD.poster}-800w.webp`} alt="" decoding="async" className="h-full w-full object-cover" />
              </picture>
            )}
            <video autoPlay loop muted playsInline>
              <source src={videoD.webm} type="video/webm" />
              <source src={videoD.mp4} type="video/mp4" />
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

      {/* Row 2: Blog/Podcast text + Social icons (2-col × 3-row grid) */}
      <div className="mfooter-row-social">
        <p className="mfooter-social-copy">
          <span>Read </span>
          <Link href={cta1Href} className="mfooter-underline-link">
            the blog
          </Link>
          <span> and check out our podcast.</span>
        </p>
        <div className="mfooter-social-icons">
          <SocialIcon platform="youtube"       href={youtubeUrl}       variant="desktop" className="mfooter-social-btn" />
          <SocialIcon platform="spotify"       href={podcastUrl}       variant="desktop" className="mfooter-social-btn" />
          <SocialIcon platform="applepodcasts" href={applePodcastsUrl} variant="desktop" className="mfooter-social-btn" />
          <SocialIcon platform="instagram"     href={instagramUrl}     variant="desktop" className="mfooter-social-btn" />
          <SocialIcon platform="facebook"      href={facebookUrl}      variant="desktop" className="mfooter-social-btn" />
          <SocialIcon platform="linkedin"      href={linkedinUrl}      variant="desktop" className="mfooter-social-btn" />
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
              name="email"
              required
              placeholder={emailPlaceholder}
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
          width/height are the SVG's intrinsic dimensions (ratio source
          only); CSS in mobile-footer.css sizes the rendered img and pins
          the SVG's viewBox aspect so letterforms never stretch. */}
      <div className="mfooter-wordmark">
        <Image
          src={keystoneWordmarkSrc}
          width={345}
          height={67}
          alt="keystone"
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
        {/* `new Date().getFullYear()` differs between server and client across
            the Dec 31 → Jan 1 boundary (server may serialise the old year while
            the hydrating browser sees the new one). suppressHydrationWarning
            is the React-blessed escape hatch for genuinely unstable values
            like wall-clock dates. */}
        <span className="mfooter-legal-text" suppressHydrationWarning>
          © {new Date().getFullYear()} Keystone
        </span>
      </div>
    </footer>
  );
}
