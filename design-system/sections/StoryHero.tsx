import type { ReactNode } from 'react';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';

export interface StoryHeroProps {
  /** Small uppercase label above the headline. */
  eyebrow?: ReactNode;
  /** Page H1, rendered in the display face. */
  title: ReactNode;
  /** Supporting lede, set beside the headline at desktop and below it on mobile. */
  lede?: ReactNode;
  /** The wide media card beneath the header — typically a SpotlightCard. */
  media: ReactNode;
}

/**
 * A narrative page opener: a large headline with a supporting lede beside it,
 * over a single wide media card. The content-first hero for "about / story"
 * pages — distinct from SplitHero (copy beside media) and CenteredHero (no
 * media). Stacks below 985px. Built from primitives; no animation. See spec 043.
 */
export function StoryHero({ eyebrow, title, lede, media }: StoryHeroProps) {
  return (
    <header className="ks-story-hero">
      <div className="ks-story-hero__inner">
        <div className="ks-story-hero__head">
          <div className="ks-story-hero__heading">
            {eyebrow ? <Eyebrow tone="brand">{eyebrow}</Eyebrow> : null}
            <Heading level={1} size="xl" className="ks-story-hero__title">
              {title}
            </Heading>
          </div>
          {lede ? (
            <Text variant="lead" tone="tertiary" className="ks-story-hero__lede">
              {lede}
            </Text>
          ) : null}
        </div>
        <div className="ks-story-hero__media">{media}</div>
      </div>
    </header>
  );
}
