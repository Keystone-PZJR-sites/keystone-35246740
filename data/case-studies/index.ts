// Registry of authored case studies (spec 051), keyed by slug. Each story's
// values live in its own file; the /case-studies gallery lists them and the
// /case-studies/[slug] route renders one through the CaseStudyTemplate. Add a
// study by importing it and listing it in ALL.

import type {
  CaseStudyContent,
  CaseStudyOtherStory,
} from '@/design-system/patterns/case-studies';
import { PALM_COAST_ZIVEL } from './palm-coast-zivel';
import { YOUR_HEALTH_SOLUTIONS } from './your-health-solutions';
import { BARE_LUX_STUDIO } from './bare-lux-studio';

const ALL: CaseStudyContent[] = [
  PALM_COAST_ZIVEL,
  YOUR_HEALTH_SOLUTIONS,
  BARE_LUX_STUDIO,
];

/** All authored case studies, in gallery order. */
export const CASE_STUDIES_LIST: CaseStudyContent[] = ALL;

/** All authored case studies, keyed by slug. */
export const CASE_STUDIES: Record<string, CaseStudyContent> = Object.fromEntries(
  ALL.map((study) => [study.slug, study]),
);

export function getCaseStudy(slug: string): CaseStudyContent | undefined {
  return CASE_STUDIES[slug];
}

/**
 * The card summaries of up to `limit` other published stories, for the
 * detail page's "other success stories" row.
 */
export function getOtherCaseStudies(slug: string, limit = 2): CaseStudyOtherStory[] {
  return ALL.filter((study) => study.slug !== slug)
    .slice(0, limit)
    .map((study) => ({ slug: study.slug, content: study.card }));
}
