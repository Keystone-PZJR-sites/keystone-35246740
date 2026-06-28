import { ContentSection } from '@/design-system/sections/ContentSection';
import { CaseStudyStats } from './CaseStudyStats';
import type { CaseStudyStatBandBlock } from './types';

export interface CaseStudyStatBandProps {
  block: CaseStudyStatBandBlock;
}

/**
 * A dark full-width band of oversized KPIs — the headline numbers of the story,
 * centered on the ink surface for emphasis between long-form sections.
 */
export function CaseStudyStatBand({ block }: CaseStudyStatBandProps) {
  const { eyebrow, title, description, stats } = block;
  return (
    <ContentSection
      tone="ink"
      eyebrow={eyebrow}
      title={title}
      description={description}
      centered
      ariaLabel={title ?? 'By the numbers'}
    >
      <CaseStudyStats stats={stats} tone="light" size="lg" className="ks-cs-statband" />
    </ContentSection>
  );
}
