import type { Service } from 'keystone-design-bootstrap/types';
import { Card } from '@/design-system/primitives/Card';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import { Badge } from '@/design-system/primitives/Badge';
import { plainText } from '@/design-system/lib/text';

export interface ServicesShowcaseProps {
  services: Service[];
}

/**
 * Typed services grid. Each service renders as an interactive card
 * linking to its detail page. Driven by the public Service[] API.
 */
export function ServicesShowcase({ services }: ServicesShowcaseProps) {
  const sorted = [...services].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="ks-feature-grid">
      {sorted.map((service) => {
        const preview = plainText(service.summary || service.description_markdown, 160);
        return (
          <Card
            key={service.id}
            tone="cream"
            interactive
            as="a"
            href={`/services/${service.slug}`}
            className="ks-feature-card ks-link-card"
          >
            {service.featured ? <Badge tone="brand">Featured</Badge> : null}
            <Heading level={3} size="sm" font="body" tone="primary">
              {service.name}
            </Heading>
            {preview ? (
              <Text variant="body" tone="secondary">
                {preview}
              </Text>
            ) : null}
            <span className="ks-link ks-link--brand ks-link-card__cue">Learn more →</span>
          </Card>
        );
      })}
    </div>
  );
}
