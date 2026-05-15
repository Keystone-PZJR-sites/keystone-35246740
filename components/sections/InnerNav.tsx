'use client';

import Link from 'next/link';
import { KeystoneWordmark } from '@/components/elements';
import { useLeadCapture } from './LeadCaptureModal';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface InnerNavProps {
  /** Color for the Keystone wordmark SVG */
  wordmarkColor?: string;
  /** Label for the CTA button that opens the lead capture modal */
  ctaLabel: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function InnerNav({ wordmarkColor = '#6ECC8B', ctaLabel }: InnerNavProps) {
  const { openModal } = useLeadCapture();

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

        <button
          type="button"
          onClick={(e) => openModal(e.currentTarget)}
          className="inner-nav-cta"
        >
          {ctaLabel}
        </button>
      </div>
    </nav>
  );
}
