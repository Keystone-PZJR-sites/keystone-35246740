'use client';

import Link from 'next/link';
import { ArrowNarrowRight } from '@untitledui/icons';
import { KeystoneWordmark } from '@/components/elements';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface InnerNavProps {
  /** Color for the Keystone wordmark SVG */
  wordmarkColor?: string;
  /** Label for the CTA button that links to portal */
  ctaLabel: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function InnerNav({ wordmarkColor = '#6ECC8B', ctaLabel }: InnerNavProps) {
  return (
    <nav
      className="inner-nav"
      data-theme="custom"
      aria-label="Main navigation"
    >
      <div className="inner-nav-bar max-w-container mx-auto">
        <Link href="/" aria-label="Keystone — return to home page">
          <KeystoneWordmark
            color={wordmarkColor}
            alt="Keystone"
            width={154}
            height={30}
            className="inner-nav-wordmark"
          />
        </Link>

        <Link href="/portal" className="inner-nav-cta">
          {ctaLabel}
          <ArrowNarrowRight size={14} />
        </Link>
      </div>
    </nav>
  );
}
