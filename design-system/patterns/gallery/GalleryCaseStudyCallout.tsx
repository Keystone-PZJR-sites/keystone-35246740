// Case-study KPI row + CTA on a gallery card (spec 054 enhancement).
// Reuses CaseStudyStats so the baseball-card numbers match the case-study
// pages; the button opens the matching story on www.keystone.app in a new tab.

import { Button } from '@/design-system/primitives/Button';
import { CaseStudyStats } from '@/design-system/patterns/case-studies/CaseStudyStats';
import type { GalleryCaseStudy } from './types';

const KEYSTONE_CASE_STUDY_ORIGIN = 'https://www.keystone.app';

export interface GalleryCaseStudyCalloutProps {
  caseStudy: GalleryCaseStudy;
}

export function GalleryCaseStudyCallout({ caseStudy }: GalleryCaseStudyCalloutProps) {
  const href = `${KEYSTONE_CASE_STUDY_ORIGIN}/case-studies/${caseStudy.slug}`;
  return (
    <aside className="ks-gallery-entry__case-study" aria-label="Case study results">
      <CaseStudyStats stats={caseStudy.stats} size="sm" className="ks-gallery-entry__case-stats" />
      <Button href={href} external variant="secondary" size="sm" withArrow>
        See the full story
      </Button>
    </aside>
  );
}
