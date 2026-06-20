import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';

export interface MediaFeatureItem {
  /** Stable key. */
  id: string;
  /**
   * A small icon shown in a round badge beside the text. Decorative — the
   * meaning lives in the title and copy — so it is hidden from assistive tech.
   */
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
}

export interface MediaFeatureListProps {
  /**
   * The product visual — an image or any block. The section frames it in a
   * soft tinted panel; pass `panel="none"` to skip the panel.
   */
  media: ReactNode;
  /** Tint of the soft panel behind the media. Defaults to a cream shade. */
  panel?: 'cream' | 'cream-strong' | 'none';
  /** Which side the media sits on at desktop. Defaults to start (left). */
  mediaSide?: 'start' | 'end';
  /** The list of points beside the media. */
  features: MediaFeatureItem[];
}

/**
 * A media-and-feature-list body: a product visual in a soft tinted panel beside
 * a short vertical list of icon-badge + title + copy rows. Drop it inside a
 * `ContentSection` for the centered heading above it. Stacks below 985px
 * (media first by default). See spec 037.
 */
export function MediaFeatureList({
  media,
  panel = 'cream',
  mediaSide = 'start',
  features,
}: MediaFeatureListProps) {
  return (
    <div className={clsx('ks-mfl', `ks-mfl--media-${mediaSide}`)}>
      <div className={clsx('ks-mfl__media', panel !== 'none' && `ks-mfl__media--panel-${panel}`)}>
        {media}
      </div>

      <ul className="ks-mfl__list">
        {features.map((feature) => (
          <li key={feature.id} className="ks-mfl__item">
            <span className="ks-mfl__icon" aria-hidden="true">
              {feature.icon}
            </span>
            <div className="ks-mfl__text">
              <Heading level={3} size="sm" font="body" tone="primary" className="ks-mfl__title">
                {feature.title}
              </Heading>
              <Text variant="body" tone="tertiary">
                {feature.description}
              </Text>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
