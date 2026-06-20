import type { TeamMember } from 'keystone-design-bootstrap/types';
import { Card } from '@/design-system/primitives/Card';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { primaryPhoto, initials } from '@/design-system/lib/photos';
import { plainText } from '@/design-system/lib/text';

export interface TeamShowcaseProps {
  members: TeamMember[];
}

/** Typed team grid: portrait, name, role, and a short bio. */
export function TeamShowcase({ members }: TeamShowcaseProps) {
  // Alphabetical by name. The roster comes from the team API, so the ordering
  // is applied here on the client rather than baked into static data.
  const sorted = [...members].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
  );

  return (
    <div className="ks-feature-grid">
      {sorted.map((member) => {
        const photo = primaryPhoto(member.photo_attachments);
        return (
          <Card key={member.id} tone="cream" className="ks-person-card">
            <span className="ks-portrait" aria-hidden={photo ? undefined : true}>
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo.url} alt={photo.alt || member.name} />
              ) : (
                <span className="ks-portrait__initials">{initials(member.name)}</span>
              )}
            </span>
            <Heading level={3} size="sm" font="body" tone="primary">
              {member.name}
            </Heading>
            <Eyebrow tone="brand">{member.position}</Eyebrow>
            {member.bio_markdown ? (
              <Text variant="body" tone="secondary">
                {plainText(member.bio_markdown, 180)}
              </Text>
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}
