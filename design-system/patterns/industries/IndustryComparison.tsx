import clsx from 'clsx';
import { Check } from '@untitledui/icons';
import { ContentSection } from '@/design-system/sections/ContentSection';
import { Text } from '@/design-system/primitives/Text';
import type { IndustryComparisonColumn, IndustryComparisonSection } from './IndustryPageTemplate';

export interface IndustryComparisonProps {
  section: IndustryComparisonSection;
}

/**
 * "The old way vs. the Keystone way" — two equal cards: a quiet status-quo card
 * listing the pain as plain points, beside a brand-green card listing the same
 * concerns resolved as checked points. Stacks Keystone-first at mobile. Mirrors
 * the case-study before/after contrast. See spec 053.
 */
export function IndustryComparison({ section }: IndustryComparisonProps) {
  return (
    <ContentSection
      eyebrow={section.eyebrow}
      title={section.title}
      description={section.description}
      centered
      ariaLabel="The old way versus the Keystone way"
    >
      <div className="ks-ind-compare">
        <ComparisonCard column={section.before} variant="before" />
        <ComparisonCard column={section.after} variant="after" />
      </div>
    </ContentSection>
  );
}

interface ComparisonCardProps {
  column: IndustryComparisonColumn;
  variant: 'before' | 'after';
}

function ComparisonCard({ column, variant }: ComparisonCardProps) {
  const isAfter = variant === 'after';
  return (
    <div className={clsx('ks-ind-compare__col', `ks-ind-compare__col--${variant}`)}>
      <Text
        variant="caption"
        tone={isAfter ? 'inverse' : 'tertiary'}
        className="ks-ind-compare__label"
      >
        {column.label}
      </Text>

      <ul className="ks-ind-compare__points">
        {column.points.map((point, index) => (
          <li key={index} className="ks-ind-compare__point">
            {isAfter ? (
              <Check className="ks-ind-compare__point-icon" aria-hidden="true" />
            ) : (
              <span className="ks-ind-compare__point-dot" aria-hidden="true" />
            )}
            <Text variant="small" tone={isAfter ? 'inverse-muted' : 'secondary'} as="span">
              {point}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
