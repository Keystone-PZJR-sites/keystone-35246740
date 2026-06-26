import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import { SpotlightCard } from '@/design-system/components/SpotlightCard';
import { CaseStudyStats } from './CaseStudyStats';
import type { CaseStudyHeroContent } from './types';

export interface CaseStudyHeroProps {
  content: CaseStudyHeroContent;
}

/**
 * The detail-page opener: a centered eyebrow / headline / supporting line on the
 * cream surface, a row of three headline statistics, and a single wide media
 * card beneath. The floating site nav sits over the top edge. See spec 051.
 */
export function CaseStudyHero({ content }: CaseStudyHeroProps) {
  const { eyebrow, title, subtitle, stats, media } = content;
  return (
    <header className="ks-cs-hero">
      <div className="ks-cs-hero__inner">
        {eyebrow ? <Eyebrow tone="brand">{eyebrow}</Eyebrow> : null}
        <Heading level={1} size="xl" className="ks-cs-hero__title">
          {title}
        </Heading>
        {subtitle ? (
          <Text variant="lead" tone="tertiary" className="ks-cs-hero__subtitle">
            {subtitle}
          </Text>
        ) : null}
        <CaseStudyStats stats={stats} size="lg" className="ks-cs-hero__stats" />
      </div>

      <div className="ks-cs-hero__media">
        <SpotlightCard
          background={{ kind: 'image', src: media.image, alt: media.alt }}
          aspect={16 / 9}
        />
      </div>
    </header>
  );
}
