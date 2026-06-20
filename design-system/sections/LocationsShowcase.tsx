import type { Location } from 'keystone-design-bootstrap/types';
import { Card } from '@/design-system/primitives/Card';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import { Badge } from '@/design-system/primitives/Badge';
import { Link } from '@/design-system/primitives/Link';
import { asText } from '@/design-system/lib/text';

export interface LocationsShowcaseProps {
  locations: Location[];
}

function formatAddress(l: Location): string {
  return [l.address_line_1, l.address_line_2, `${l.city}, ${l.state} ${l.zip_code}`]
    .filter(Boolean)
    .join(' · ');
}

/** Typed locations grid: address, contact, and hours per location. */
export function LocationsShowcase({ locations }: LocationsShowcaseProps) {
  const sorted = [...locations].sort((a, b) => {
    if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
    return (a.sort_order ?? 0) - (b.sort_order ?? 0);
  });

  return (
    <div className="ks-feature-grid">
      {sorted.map((l) => {
        const hours = asText(l.business_hours);
        const phone = asText(l.phone);
        return (
          <Card key={l.id} tone="cream" className="ks-feature-card">
            {l.is_primary ? <Badge tone="accent">Primary</Badge> : null}
            <Heading level={3} size="sm" font="body" tone="primary">
              {l.name}
            </Heading>
            <Text variant="body" tone="secondary">
              {formatAddress(l)}
            </Text>
            {hours ? (
              <Text variant="small" tone="tertiary">
                {hours}
              </Text>
            ) : null}
            {phone ? (
              <Link href={`tel:${phone}`} tone="brand">
                {phone}
              </Link>
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}
