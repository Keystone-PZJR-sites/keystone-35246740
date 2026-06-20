// ============================================================
// /styles — Keystone Design System catalog
// ============================================================
// Living reference for the design system, rendered from the
// system's own tokens, primitives, and chrome. Interactive shell
// lives in <StylesCatalog>; this file is the server wrapper that
// supplies page chrome and noindex metadata.
// ============================================================

import type { Metadata } from 'next';
import { Heading, Text, Eyebrow } from '@/design-system/primitives';
import {
  HeroNav,
  LeadCaptureProvider,
  LEAD_CAPTURE_COPY,
  SITE_NAV_ITEMS,
  SITE_NAV_LOGIN_LABEL,
  SITE_NAV_LOGIN_HREF,
  SITE_NAV_CTA_LABEL,
} from '@/design-system/components';
import { StylesCatalog } from './StylesCatalog';

export const metadata: Metadata = {
  title: 'Design System | Keystone',
  description: 'Internal catalog of Keystone design tokens, primitives, and components.',
  robots: { index: false, follow: false },
};

export default function StylesCatalogPage() {
  return (
    <LeadCaptureProvider {...LEAD_CAPTURE_COPY}>
      <div data-theme="custom" className="min-h-screen bg-[var(--color-bg-primary)]">
        <HeroNav
          wordmarkColor="var(--color-hero-accent,#6ecc8b)"
          items={SITE_NAV_ITEMS}
          loginLabel={SITE_NAV_LOGIN_LABEL}
          loginHref={SITE_NAV_LOGIN_HREF}
          ctaLabel={SITE_NAV_CTA_LABEL}
        />

        <main className="max-w-container mx-auto px-6 pb-24 pt-24 md:px-12 md:pt-28">
          <header className="mb-10">
            <Eyebrow tone="brand">Keystone</Eyebrow>
            <Heading level={1} size="lg" className="mt-3">
              Design system
            </Heading>
            <Text variant="small" tone="quaternary" className="mt-2">
              Tokens · primitives · components
            </Text>
          </header>

          <StylesCatalog />
        </main>
      </div>
    </LeadCaptureProvider>
  );
}
