import type { ReactNode } from 'react';

/**
 * SocialIcon — single source of truth for footer social links.
 *
 * The desktop and mobile footers ship visually different glyphs (44px circle
 * outlines vs 16px filled monograms), so this element accepts a `variant` and
 * looks up the right shape from one shared dictionary. New surfaces consume
 * the same element instead of inlining a fresh SVG.
 *
 * The element renders nothing when `href` is missing — callers can pass an
 * optional company-info URL straight through and let the element prune itself.
 */

export type SocialPlatform = 'instagram' | 'facebook' | 'youtube' | 'linkedin';
export type SocialIconVariant = 'desktop' | 'mobile';

const LABELS: Record<SocialPlatform, string> = {
  instagram: 'Instagram',
  facebook:  'Facebook',
  youtube:   'YouTube',
  linkedin:  'LinkedIn',
};

// Desktop glyphs — 44×44 viewport, drawn inside a stroked circle.
function DesktopGlyph({ platform }: { platform: SocialPlatform }) {
  switch (platform) {
    case 'youtube':
      return <polygon points="17,15 17,29 31,22" fill="currentColor" />;
    case 'instagram':
      return (
        <>
          <rect x="13" y="13" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="22" cy="22" r="5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="27.5" cy="16.5" r="1.25" fill="currentColor" />
        </>
      );
    case 'facebook':
      return (
        <text
          x="22" y="29"
          textAnchor="middle"
          fontSize="22" fontWeight="700"
          fill="currentColor"
          fontFamily="'FK Grotesk Neue', system-ui, sans-serif"
        >f</text>
      );
    case 'linkedin':
      return (
        <text
          x="22" y="28"
          textAnchor="middle"
          fontSize="15" fontWeight="700"
          fill="currentColor"
          fontFamily="'FK Grotesk Neue', system-ui, sans-serif"
        >in</text>
      );
  }
}

// Mobile glyphs — 16×16 viewport, filled paths, no enclosing circle.
function MobileGlyph({ platform }: { platform: SocialPlatform }) {
  switch (platform) {
    case 'instagram':
      return (
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.09 5.09A5.56 5.56 0 018 4a5.56 5.56 0 014.11 9.91A5.56 5.56 0 018 13.11a5.56 5.56 0 01-4.11-9.01l1.2 1.2A3.89 3.89 0 004.55 8c0 1.07.42 2.1 1.17 2.86A3.89 3.89 0 008 12c1.07 0 2.1-.42 2.86-1.17A3.89 3.89 0 0012 8c0-1.07-.42-2.1-1.17-2.86A3.89 3.89 0 008 4c-.77 0-1.52.23-2.17.63L5.09 5.09z"
            fill="currentColor"
          />
          {/* Lens */}
          <circle cx="8" cy="8" r="2.33" stroke="currentColor" strokeWidth="1.5" />
          {/* Flash dot */}
          <circle cx="11" cy="5" r="0.75" fill="currentColor" />
        </>
      );
    case 'facebook':
      return (
        <path
          d="M9.33 4H10.67V2H8.67C7.19 2 6 3.19 6 4.67V7H4v2h2v5h2V9h2.33L11 7H8V4.67C8 4.3 8.3 4 8.67 4h.66z"
          fill="currentColor"
        />
      );
    case 'youtube':
      return (
        <path
          d="M13.9 4.9a1.65 1.65 0 00-1.16-1.17C11.69 3.5 8 3.5 8 3.5s-3.69 0-4.74.23A1.65 1.65 0 002.1 4.9C1.88 5.96 1.88 8 1.88 8s0 2.04.22 3.1c.12.62.62 1.1 1.16 1.17C4.31 12.5 8 12.5 8 12.5s3.69 0 4.74-.23c.54-.07 1.04-.55 1.16-1.17.22-1.06.22-3.1.22-3.1s0-2.04-.22-3.1zM6.5 10V6l3.5 2-3.5 2z"
          fill="currentColor"
        />
      );
    case 'linkedin':
      return (
        <path
          d="M3 4a1 1 0 112 0 1 1 0 01-2 0zm0 2.5h2V13H3V6.5zm4 0h1.9v.9h.02C9.28 6.9 10.1 6.4 11.2 6.4 13.16 6.4 14 7.5 14 9.46V13h-2V9.9c0-.77-.01-1.76-1.07-1.76-1.07 0-1.24.84-1.24 1.7V13H7V6.5z"
          fill="currentColor"
        />
      );
  }
}

interface SocialLinkProps {
  href: string;
  ariaLabel: string;
  className?: string;
  children: ReactNode;
}

function SocialLink({ href, ariaLabel, className, children }: SocialLinkProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

interface SocialIconProps {
  platform: SocialPlatform;
  href: string | undefined;
  variant: SocialIconVariant;
  /** Class name for the outer anchor — surface-specific (footer vs mobile footer). */
  className?: string;
}

export function SocialIcon({ platform, href, variant, className }: SocialIconProps) {
  if (!href) return null;
  const label = LABELS[platform];

  if (variant === 'desktop') {
    return (
      <SocialLink href={href} ariaLabel={label} className={className}>
        <svg
          width="44" height="44" viewBox="0 0 44 44"
          fill="none" xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="1.5" />
          <DesktopGlyph platform={platform} />
        </svg>
      </SocialLink>
    );
  }

  return (
    <SocialLink href={href} ariaLabel={label} className={className}>
      <svg
        width="16" height="16" viewBox="0 0 16 16"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <MobileGlyph platform={platform} />
      </svg>
    </SocialLink>
  );
}
