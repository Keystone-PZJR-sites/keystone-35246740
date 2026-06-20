import type { ReactNode } from 'react';
import clsx from 'clsx';
import { ArrowUpRight } from '@untitledui/icons';
import { Card } from '@/design-system/primitives/Card';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';

export interface FeatureItem {
  /** Stable key + heading for the card. */
  title: ReactNode;
  description: ReactNode;
  /** Optional small label rendered above the title (e.g. a number). */
  kicker?: ReactNode;
  /** Optional icon rendered in a tile above the heading. */
  icon?: ReactNode;
  /** When set, the whole card becomes an internal link with a ghost arrow cue. */
  href?: string;
}

export interface FeatureGridProps {
  items: FeatureItem[];
  /** Card surface family. Defaults to cream. */
  tone?: 'cream' | 'ink';
}

/**
 * A responsive grid of content cards built from primitives. Used for
 * value props, "what you get" lists, and similar uniform card rows. A card
 * with an `href` becomes a link card with a ghost arrow cue; an `icon` renders
 * in a tile above the heading.
 */
export function FeatureGrid({ items, tone = 'cream' }: FeatureGridProps) {
  const inverse = tone === 'ink';
  return (
    <div className="ks-feature-grid">
      {items.map((item, index) => {
        const isLink = Boolean(item.href);
        return (
          <Card
            key={index}
            tone={tone}
            className={clsx('ks-feature-card', isLink && 'ks-link-card')}
            {...(isLink ? { as: 'a' as const, href: item.href, interactive: true } : {})}
          >
            {item.icon ? (
              <span className="ks-feature-card__icon" aria-hidden="true">
                {item.icon}
              </span>
            ) : null}
            {isLink ? (
              <ArrowUpRight className="ks-feature-card__arrow" aria-hidden="true" />
            ) : null}
            {item.kicker ? (
              <Text variant="caption" tone={inverse ? 'inverse-muted' : 'brand'}>
                {item.kicker}
              </Text>
            ) : null}
            <Heading level={3} size="sm" font="body" tone={inverse ? 'inverse' : 'primary'}>
              {item.title}
            </Heading>
            <Text variant="body" tone={inverse ? 'inverse-muted' : 'secondary'}>
              {item.description}
            </Text>
          </Card>
        );
      })}
    </div>
  );
}
