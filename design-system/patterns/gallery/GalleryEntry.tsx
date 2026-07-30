'use client';

// One showcase entry on /gallery (spec 054): the story header (industry
// eyebrow, business name, narrative, fact row, attribute pills) above the
// live-site frame. The fullscreen expand control is slotted into the top
// right of the story header. Client Component because it hands a render
// slot to SiteFrame (which owns expand + takeover state).

import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import { Pill } from '@/design-system/primitives/Pill';
import { SiteFrame } from './SiteFrame';
import type { GalleryEntryContent } from './types';

export interface GalleryEntryProps {
  content: GalleryEntryContent;
}

export function GalleryEntry({ content }: GalleryEntryProps) {
  const { slug, name, industry, url, story, facts, attributes } = content;
  return (
    <article className="ks-gallery-entry" id={slug}>
      <SiteFrame
        name={name}
        url={url}
        expandSlot={(expandButton) => (
          <header className="ks-gallery-entry__header">
            <div className="ks-gallery-entry__top">
              <Eyebrow tone="brand">{industry}</Eyebrow>
              {expandButton}
            </div>
            <Heading level={2} size="lg" className="ks-gallery-entry__name">
              {name}
            </Heading>
            <Text variant="bodyLg" tone="secondary" className="ks-gallery-entry__story">
              {story}
            </Text>

            {facts.length > 0 ? (
              <dl className="ks-gallery-entry__facts">
                {facts.map((fact) => (
                  <div key={fact.label} className="ks-gallery-fact">
                    <dt className="ks-gallery-fact__label">{fact.label}</dt>
                    <dd className="ks-gallery-fact__value">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {attributes.length > 0 ? (
              <ul className="ks-gallery-entry__attributes" aria-label="Website highlights">
                {attributes.map((attribute) => (
                  <li key={attribute}>
                    <Pill tone="outline" size="sm">
                      {attribute}
                    </Pill>
                  </li>
                ))}
              </ul>
            ) : null}
          </header>
        )}
      />
    </article>
  );
}
