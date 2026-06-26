import { ContentSection } from '@/design-system/sections/ContentSection';
import { ComparisonColumn } from './ComparisonColumn';
import type { CaseStudyComparisonContent } from './types';

export interface CaseStudyComparisonProps {
  content: CaseStudyComparisonContent;
}

/**
 * The "how their experience changed" contrast: two equal cards side by side —
 * a quiet cream "before" and a brand-green "after" — inside a centered content
 * section. Stacks at mobile, before first. See spec 051.
 */
export function CaseStudyComparison({ content }: CaseStudyComparisonProps) {
  return (
    <ContentSection
      eyebrow={content.eyebrow}
      title={content.title}
      centered
      ariaLabel="How their experience changed"
    >
      <div className="ks-cs-compare">
        <ComparisonColumn column={content.before} variant="before" />
        <ComparisonColumn column={content.after} variant="after" />
      </div>
    </ContentSection>
  );
}
