// Registry of authored service detail pages (spec 037), keyed by slug. Each
// service's values live in its own file; the [slug] route renders them through
// the ServicePageTemplate. Add a service by importing it and listing it here.

import type { ServicePageContent } from '@/design-system/patterns/services';
import { WEBSITES } from './websites';
import { SOCIAL_MEDIA } from './social-media';
import { MAPS } from './maps';
import { REVIEWS } from './reviews';
import { ADVERTISING } from './advertising';
import { META_ADS } from './meta-ads';
import { GOOGLE_ADS } from './google-ads';
import { CONTENT_MARKETING } from './content-marketing';
import { SALES } from './sales';
import { SALES_TEAM } from './sales-team';
import { TEXT_SALES } from './text-sales';
import { CALL_SALES } from './call-sales';
import { RETENTION } from './retention';
import { EMAIL_CAMPAIGNS } from './email-campaigns';
import { SMART_RE_ENGAGEMENT } from './smart-re-engagement';
import { REBOOKINGS } from './rebookings';
import { LOYALTY_REWARDS } from './loyalty-rewards';

const ALL: ServicePageContent[] = [
  // Presence
  WEBSITES,
  SOCIAL_MEDIA,
  MAPS,
  REVIEWS,
  // Demand
  ADVERTISING,
  META_ADS,
  GOOGLE_ADS,
  CONTENT_MARKETING,
  // Conversion
  SALES,
  SALES_TEAM,
  TEXT_SALES,
  CALL_SALES,
  // Retention
  RETENTION,
  EMAIL_CAMPAIGNS,
  SMART_RE_ENGAGEMENT,
  REBOOKINGS,
  LOYALTY_REWARDS,
];

/** All authored service pages, keyed by slug. */
export const SERVICE_PAGES: Record<string, ServicePageContent> = Object.fromEntries(
  ALL.map((page) => [page.slug, page]),
);

export function getServicePage(slug: string): ServicePageContent | undefined {
  return SERVICE_PAGES[slug];
}
