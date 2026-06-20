// Shared chrome for every non-home page: the lead-capture provider,
// the full site navigation, page content, and the site footer. This
// is the single source of truth for inner-page site chrome — both the
// (inner) route-group layout and standalone inner pages render through
// it so the footer/nav configuration lives in exactly one place. The
// same HeroNav renders here and on the homepage, fed by one shared
// content source, so the navigation is identical site-wide.
//
// Server Component — fetches the company social URLs the footer needs.

import type { ReactNode } from 'react';
import { getCompanyInformation } from 'keystone-design-bootstrap/lib/server-api';
import {
  HeroNav,
  SITE_NAV_ITEMS,
  SITE_NAV_LOGIN_LABEL,
  SITE_NAV_LOGIN_HREF,
  SITE_NAV_CTA_LABEL,
} from './site-nav';
import { LeadCaptureProvider } from './LeadCaptureModal';
import { LEAD_CAPTURE_COPY } from './lead-capture-content';
import { OversizedFooter } from './footer/OversizedFooter';
import { MobileFooter } from './footer/MobileFooter';
import { FOOTER_COPY, FOOTER_VIDEOS_DESKTOP, FOOTER_VIDEOS_MOBILE } from './footer/footer-content';

export interface InnerPageShellProps {
  children: ReactNode;
}

export async function InnerPageShell({ children }: InnerPageShellProps) {
  const companyInfo = await getCompanyInformation();
  const social = {
    youtubeUrl: companyInfo?.youtube_url,
    instagramUrl: companyInfo?.instagram_url,
    facebookUrl: companyInfo?.facebook_url,
    linkedinUrl: companyInfo?.linkedin_url,
  };

  return (
    <LeadCaptureProvider {...LEAD_CAPTURE_COPY}>
      <div data-theme="custom">
        <HeroNav
          wordmarkColor="var(--color-hero-accent,#6ecc8b)"
          items={SITE_NAV_ITEMS}
          loginLabel={SITE_NAV_LOGIN_LABEL}
          loginHref={SITE_NAV_LOGIN_HREF}
          ctaLabel={SITE_NAV_CTA_LABEL}
        />
        {children}
        <OversizedFooter {...FOOTER_COPY} {...social} {...FOOTER_VIDEOS_DESKTOP} />
        <MobileFooter {...FOOTER_COPY} {...social} {...FOOTER_VIDEOS_MOBILE} />
      </div>
    </LeadCaptureProvider>
  );
}
