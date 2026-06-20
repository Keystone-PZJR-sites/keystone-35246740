import type { CompanyInformation } from 'keystone-design-bootstrap/types';
import { Card } from '@/design-system/primitives/Card';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { Text } from '@/design-system/primitives/Text';
import { Link } from '@/design-system/primitives/Link';
import { asText } from '@/design-system/lib/text';

export interface ContactDetailsProps {
  company: CompanyInformation | null;
}

function fullAddress(c: CompanyInformation): string | null {
  const parts = [
    c.primary_address_line_1,
    c.primary_address_line_2,
    [c.primary_city, c.primary_state].filter(Boolean).join(', '),
    c.primary_zip_code,
  ].filter(Boolean);
  return parts.length ? parts.join(' · ') : null;
}

/** Typed contact panel sourced from CompanyInformation. */
export function ContactDetails({ company }: ContactDetailsProps) {
  if (!company) return null;
  const address = fullAddress(company);
  const email = asText(company.primary_email);
  const phone = asText(company.primary_phone);
  const hours = asText(company.business_hours);

  return (
    <div className="ks-feature-grid">
      {email ? (
        <Card tone="cream" className="ks-feature-card">
          <Eyebrow tone="brand">Email</Eyebrow>
          <Link href={`mailto:${email}`} tone="brand">
            {email}
          </Link>
        </Card>
      ) : null}
      {phone ? (
        <Card tone="cream" className="ks-feature-card">
          <Eyebrow tone="brand">Phone</Eyebrow>
          <Link href={`tel:${phone}`} tone="brand">
            {phone}
          </Link>
        </Card>
      ) : null}
      {address ? (
        <Card tone="cream" className="ks-feature-card">
          <Eyebrow tone="brand">Visit</Eyebrow>
          <Text variant="body" tone="secondary">
            {address}
          </Text>
        </Card>
      ) : null}
      {hours ? (
        <Card tone="cream" className="ks-feature-card">
          <Eyebrow tone="brand">Hours</Eyebrow>
          <Text variant="body" tone="secondary">
            {hours}
          </Text>
        </Card>
      ) : null}
    </div>
  );
}
