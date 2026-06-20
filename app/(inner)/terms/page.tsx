import type { Metadata } from 'next';
import { getCompanyInformation, getLocations } from 'keystone-design-bootstrap/lib/server-api';
import type { Location } from 'keystone-design-bootstrap/types';
import {
  LegalDocumentPage,
  buildLegalPlaceholders,
  replaceLegalPlaceholders,
} from '@/design-system/patterns/legal';
import { LEGAL_DOCS } from '@/data';

export async function generateMetadata(): Promise<Metadata> {
  const companyInfo = await getCompanyInformation();
  const companyName = companyInfo?.company_name ?? null;
  return {
    title: companyName ? `Terms of Service | ${companyName}` : 'Terms of Service',
    description: 'Read the terms governing your use of this website and our services.',
  };
}

export default async function TermsPage() {
  const [companyInfo, locationsData] = await Promise.all([
    getCompanyInformation(),
    getLocations(),
  ]);

  const locations = Array.isArray(locationsData) ? (locationsData as Location[]) : [];
  const primaryLocation = locations.find((l) => l.is_primary) ?? locations[0];

  const placeholders = buildLegalPlaceholders(companyInfo, primaryLocation?.email);
  const rawMarkdown = companyInfo?.terms_of_service_markdown ?? '';
  const contentMarkdown = replaceLegalPlaceholders(rawMarkdown.trim(), placeholders);

  return (
    <LegalDocumentPage
      title="Terms of Service"
      updated={placeholders.effectiveYear}
      contentMarkdown={contentMarkdown}
      docs={LEGAL_DOCS}
      activeHref="/terms"
    />
  );
}
