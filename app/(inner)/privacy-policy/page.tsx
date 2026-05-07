import type { Metadata } from 'next';
import { getCompanyInformation, getLocations } from 'keystone-design-bootstrap/lib/server-api';
import type { Location } from 'keystone-design-bootstrap/types';
import { LegalDocumentPage, buildLegalPlaceholders, replaceLegalPlaceholders } from '@/components/legal';

export async function generateMetadata(): Promise<Metadata> {
  const companyInfo = await getCompanyInformation();
  const companyName = companyInfo?.company_name ?? null;
  return {
    title: companyName
      ? `Privacy Policy | ${companyName}`
      : 'Privacy Policy',
    description: 'Learn how we collect, use, and protect your personal information.',
  };
}

export default async function PrivacyPolicyPage() {
  const [companyInfo, locationsData] = await Promise.all([
    getCompanyInformation(),
    getLocations(),
  ]);

  const locations = Array.isArray(locationsData) ? (locationsData as Location[]) : [];
  const primaryLocation = locations.find((l) => l.is_primary) ?? locations[0];

  const placeholders = buildLegalPlaceholders(companyInfo, primaryLocation?.email);
  const rawMarkdown = companyInfo?.privacy_policy_markdown ?? '';
  const contentMarkdown = replaceLegalPlaceholders(rawMarkdown.trim(), placeholders);

  return (
    <LegalDocumentPage
      title="Privacy Policy"
      companyName={companyInfo?.company_name}
      effectiveYear={placeholders.effectiveYear}
      contentMarkdown={contentMarkdown}
    />
  );
}
