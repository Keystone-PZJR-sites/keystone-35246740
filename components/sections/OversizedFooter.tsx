// Server component — no GSAP, no state, no browser APIs required.
import { KeystoneMark } from '@/components/elements';

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
  /** href for the first CTA button */
  cta1Href: string;
  /** Label for the second CTA button ("Get started") */
  cta2Label: string;
  /** href for the second CTA button */
  cta2Href: string;
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
}

function PillButton({ href, label, arrowSrc, variant, type }: PillButtonProps) {
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
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={arrowSrc} width={16} height={16} alt="" aria-hidden="true" />
      )}
    </>
  );

  if (type === 'submit' || type === 'button') {
    return (
      <button type={type} className={`${baseClass} ${colorClass}`}>
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
  cta1Label,
  cta1Href,
  cta2Label,
  cta2Href,
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
}: OversizedFooterProps) {
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

        {/* Taglines row — 60px gap from mark bottom (Figma: mark bottom=41px, taglines top=101px) */}
        <div className="footer-lower-row mt-8 lg:mt-[60px]">
          <div className="footer-lower-left">
            <p className="footer-tagline max-w-[244px]">{leftTagline}</p>
          </div>
          <div className="footer-lower-right">
            <div className="w-full ml-auto lg:max-w-[785px]">
              <p className="footer-tagline max-w-[388px]">{rightTagline}</p>
            </div>
          </div>
        </div>

        {/* CTA buttons + email bar row — 60px gap from taglines bottom */}
        <div className="footer-lower-row mt-8 lg:mt-[60px]">

          {/* Left pill — "Learn more" + "Get started →" */}
          <div className="footer-lower-left">
            <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-work-accent)] p-3">
              <PillButton
                href={cta1Href}
                label={cta1Label}
                variant="orange"
              />
              <PillButton
                href={cta2Href}
                label={cta2Label}
                arrowSrc={ctaArrowSrc}
                variant="peach"
              />
            </div>
          </div>

          {/* Right pill — email input + "Sign Up →" */}
          <div className="footer-lower-right">
            <div className="flex items-center rounded-full border border-[var(--color-work-accent)] p-3 w-full ml-auto lg:max-w-[785px]">
              <label htmlFor="footer-email" className="sr-only">
                {emailPlaceholder}
              </label>
              <input
                id="footer-email"
                type="email"
                className="footer-email-input pl-3"
                placeholder={emailPlaceholder}
                aria-label={emailPlaceholder}
              />
              <PillButton
                label={signUpLabel}
                arrowSrc={ctaArrowSrc}
                variant="peach"
                type="button"
              />
            </div>
          </div>
        </div>

        {/* Full-width wordmark — 60px gap from CTA bottom */}
        <div className="mt-8 lg:mt-[60px] pb-6 lg:pb-[24px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={keystoneWordmarkSrc}
            alt="keystone"
            className="footer-wordmark-img"
          />
        </div>

      </div>
    </section>
  );
}
