// Shared lead-capture (LeadCaptureProvider) configuration: the demo-modal copy,
// brand colors, CTA arrow, and legal links. Lives in one place so the homepage
// and the inner-page chrome (InnerPageShell) open an identical "get in touch"
// modal. Mirrors the FOOTER_COPY pattern.

import { MEDIA } from '@/data/media';

export const LEAD_CAPTURE_COPY = {
  wordmarkColor: 'var(--color-hero-accent,#6ecc8b)',
  markColor: 'var(--color-hero-accent,#6ecc8b)',
  ctaArrowSrc: MEDIA.ui.leadCaptureCtaArrow.src,
  submitLabel: 'Get in touch',
  subheadline:
    'The modern sales and marketing team for local businesses. Reach out below to connect with our team.',
  termsHref: '/terms',
  privacyHref: '/privacy',
} as const;
