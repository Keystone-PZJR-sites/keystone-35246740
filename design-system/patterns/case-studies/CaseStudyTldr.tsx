import { Check } from '@untitledui/icons';
import { ContentSection } from '@/design-system/sections/ContentSection';
import { Card } from '@/design-system/primitives/Card';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { Text } from '@/design-system/primitives/Text';
import { CaseStudyStats } from './CaseStudyStats';
import type { CaseStudyTldrBlock } from './types';

export interface CaseStudyTldrProps {
  block: CaseStudyTldrBlock;
}

/**
 * The scannable opener of a case study: an eyebrow + lede inside a raised card,
 * a checklist of the headline takeaways, and an optional KPI row. Lets a reader
 * grasp the whole story in a few seconds before the long-form body.
 */
export function CaseStudyTldr({ block }: CaseStudyTldrProps) {
  const { title = 'TL;DR', summary, takeaways, stats } = block;
  return (
    <ContentSection ariaLabel="Summary" className="ks-cs-tldr-section">
      <Card tone="cream" radius="panel" className="ks-cs-tldr">
        <div className="ks-cs-tldr__head">
          <Eyebrow tone="brand">{title}</Eyebrow>
          {summary ? (
            <Text variant="lead" tone="primary" className="ks-cs-tldr__summary">
              {summary}
            </Text>
          ) : null}
        </div>

        <ul className="ks-cs-tldr__list">
          {takeaways.map((takeaway, index) => (
            <li key={index} className="ks-cs-tldr__item">
              <Check className="ks-cs-tldr__icon" aria-hidden="true" />
              <Text variant="body" tone="secondary" as="span">
                {takeaway}
              </Text>
            </li>
          ))}
        </ul>

        {stats && stats.length > 0 ? (
          <CaseStudyStats stats={stats} size="sm" className="ks-cs-tldr__stats" />
        ) : null}
      </Card>
    </ContentSection>
  );
}
