import type { ReactNode } from 'react';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';

export interface CenteredHeroProps {
  /** Page H1, rendered in the display face. */
  title: ReactNode;
  /** Supporting line beneath the title. */
  subtitle?: ReactNode;
  /** Small uppercase label above the title. */
  eyebrow?: ReactNode;
}

/**
 * A clean, centered, light page hero on the cream surface — the non-split inner
 * hero. The floating site nav sits over its top edge (the top padding clears
 * the bar). Built from primitives; no media, no animation. The content-first
 * counterpart to SplitHero for pages that open with a simple title + subtitle.
 */
export function CenteredHero({ title, subtitle, eyebrow }: CenteredHeroProps) {
  return (
    <header className="ks-centered-hero">
      <div className="ks-centered-hero__inner">
        {eyebrow ? <Eyebrow tone="brand">{eyebrow}</Eyebrow> : null}
        <Heading level={1} size="xl" className="ks-centered-hero__title">
          {title}
        </Heading>
        {subtitle ? (
          <Text variant="lead" tone="tertiary" className="ks-centered-hero__subtitle">
            {subtitle}
          </Text>
        ) : null}
      </div>
    </header>
  );
}
