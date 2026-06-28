import { ContentSection } from '@/design-system/sections/ContentSection';
import { Card } from '@/design-system/primitives/Card';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import type { CaseStudyToolsBlock } from './types';

export interface CaseStudyToolsProps {
  block: CaseStudyToolsBlock;
}

/**
 * A grid of the Keystone tools running for the customer — each a small card with
 * the tool name and a one-line description of what it does for this business.
 */
export function CaseStudyTools({ block }: CaseStudyToolsProps) {
  const { eyebrow, title, description, items } = block;
  return (
    <ContentSection
      eyebrow={eyebrow}
      title={title}
      description={description}
      centered
      ariaLabel={title ?? 'The stack'}
    >
      <div className="ks-cs-tools">
        {items.map((item) => (
          <Card key={item.name} tone="cream" radius="component" className="ks-cs-tools__card">
            <Heading
              level={3}
              size="xs"
              font="body"
              tone="primary"
              className="ks-cs-tools__name"
            >
              {item.name}
            </Heading>
            <Text variant="small" tone="tertiary">
              {item.detail}
            </Text>
          </Card>
        ))}
      </div>
    </ContentSection>
  );
}
