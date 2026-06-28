// Registry of business-type landing pages (spec 050 + 053), keyed by slug.
// These are the business-type positioning pages used primarily as paid-ad
// landing targets (and for organic discovery via the Solutions "By business
// type" nav). The `/industries/[slug]` route renders each entry through the
// IndustryPageTemplate. Each page is authored in its own file; add a business
// type by creating its file and listing it in ALL below.

import type { IndustryPageContent } from '@/design-system/patterns/industries';
import { HEALTH_WELLNESS } from './health-wellness';
import { HOME_SERVICES } from './home-services';
import { NEW_BUSINESSES } from './new-businesses';
import { SMALL_BUSINESS } from './small-business';

const ALL: IndustryPageContent[] = [
  HEALTH_WELLNESS,
  HOME_SERVICES,
  NEW_BUSINESSES,
  SMALL_BUSINESS,
];

/** All authored business-type pages, keyed by slug. */
export const INDUSTRY_PAGES: Record<string, IndustryPageContent> = Object.fromEntries(
  ALL.map((page) => [page.slug, page]),
);

export function getIndustryPage(slug: string): IndustryPageContent | undefined {
  return INDUSTRY_PAGES[slug];
}
