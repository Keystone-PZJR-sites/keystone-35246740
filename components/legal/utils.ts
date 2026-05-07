import type { CompanyInformation } from 'keystone-design-bootstrap/types';

// ---------------------------------------------------------------------------
// Placeholder substitution
// Mirrors the logic in keystone-design-bootstrap/src/next/legal/placeholders.ts,
// which is not publicly exported from the package.
// ---------------------------------------------------------------------------

interface LegalPlaceholders {
  businessName: string;
  businessWebsite: string;
  businessContact: string;
  businessEmail: string;
  businessPhone: string;
  locationEmail: string;
  locationContact: string;
  effectiveYear: string;
}

const PLACEHOLDER_MAP: Record<string, keyof LegalPlaceholders> = {
  '{{business.name}}': 'businessName',
  '{{business.website}}': 'businessWebsite',
  '{{business.contact}}': 'businessContact',
  '{{business.email}}': 'businessEmail',
  '{{business.phone}}': 'businessPhone',
  '{{location.name}}': 'businessName',
  '{{location.email}}': 'locationEmail',
  '{{location.contact}}': 'locationContact',
  '{{right_now.year}}': 'effectiveYear',
};

export function buildLegalPlaceholders(
  companyInfo: CompanyInformation | null,
  locationEmail?: string | null,
): LegalPlaceholders {
  const currentYear = new Date().getFullYear().toString();
  const email = companyInfo?.primary_email?.trim();
  const phone = companyInfo?.primary_phone?.trim();
  const locEmail = locationEmail?.trim() || email;

  return {
    businessName: companyInfo?.company_name?.trim() || 'The Business',
    businessWebsite: 'this website',
    businessContact: email ? `at ${email}` : phone ? `at ${phone}` : 'through the contact form on this website',
    businessEmail: email || 'via the contact form on this website',
    businessPhone: phone || 'the contact information provided on this website',
    locationEmail: locEmail || 'via the contact form on this website',
    locationContact: locEmail ? `at ${locEmail}` : email ? `at ${email}` : 'through the contact form on this website',
    effectiveYear: currentYear,
  };
}

export function replaceLegalPlaceholders(
  content: string,
  placeholders: LegalPlaceholders,
): string {
  let result = content;
  for (const [token, key] of Object.entries(PLACEHOLDER_MAP)) {
    result = result.split(token).join(placeholders[key] ?? '');
  }
  return result;
}
