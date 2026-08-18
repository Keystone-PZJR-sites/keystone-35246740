// Case-study results on a gallery card (spec 054 enhancement).
// Open editorial strip — no panel: a hairline rule, the hero KPIs set in
// the card's own typography (via CaseStudyStats), and a quiet text link
// to the full story on /case-studies.

import { Link } from '@/design-system/primitives/Link';
import { CaseStudyStats } from '@/design-system/patterns/case-studies/CaseStudyStats';
import type { GalleryCaseStudy } from './types';

export interface GalleryCaseStudyCalloutProps {
  caseStudy: GalleryCaseStudy;
}

export function GalleryCaseStudyCallout({ caseStudy }: GalleryCaseStudyCalloutProps) {
  return (
    <aside className="ks-gallery-entry__case-study" aria-label="Case study results">
      <CaseStudyStats
        stats={caseStudy.stats}
        size="sm"
        className="ks-gallery-entry__case-stats"
      />
      <Link
        href={`/case-studies/${caseStudy.slug}`}
        tone="brand"
        className="ks-gallery-entry__case-link"
      >
        Read the case study →
      </Link>
    </aside>
  );
}
