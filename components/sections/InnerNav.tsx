'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLeadCapture } from './LeadCaptureModal';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface InnerNavProps {
  /** Path to the Keystone wordmark SVG */
  wordmarkSrc: string;
  /** Label for the CTA button that opens the lead capture modal */
  ctaLabel: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function InnerNav({ wordmarkSrc, ctaLabel }: InnerNavProps) {
  const { openModal } = useLeadCapture();

  return (
    <nav
      className="inner-nav"
      data-theme="custom"
      aria-label="Main navigation"
    >
      <div className="inner-nav-bar max-w-container mx-auto">
        <Link href="/" aria-label="Keystone — return to home page">
          <Image
            src={wordmarkSrc}
            alt="Keystone"
            width={154}
            height={30}
            className="inner-nav-wordmark"
            priority
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
