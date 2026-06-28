import { ContentSection } from '@/design-system/sections/ContentSection';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import type { CaseStudyTimelineBlock } from './types';

export interface CaseStudyTimelineProps {
  block: CaseStudyTimelineBlock;
}

/**
 * A vertical, dated rollout timeline: each item carries a short date marker, a
 * title, and a paragraph, threaded along a single rule with brand-accent dots.
 */
export function CaseStudyTimeline({ block }: CaseStudyTimelineProps) {
  const { eyebrow, title, items } = block;
  return (
    <ContentSection eyebrow={eyebrow} title={title} ariaLabel={title ?? 'Timeline'}>
      <ol className="ks-cs-timeline">
        {items.map((item, index) => (
          <li key={index} className="ks-cs-timeline__item">
            <span className="ks-cs-timeline__dot" aria-hidden="true" />
            <span className="ks-cs-timeline__date">{item.date}</span>
            <Heading
              level={3}
              size="sm"
              font="body"
              tone="primary"
              className="ks-cs-timeline__title"
            >
              {item.title}
            </Heading>
            <Text variant="body" tone="secondary" className="ks-cs-timeline__body">
              {item.body}
            </Text>
          </li>
        ))}
      </ol>
    </ContentSection>
  );
}
