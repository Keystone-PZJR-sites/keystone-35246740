import type { CompanyInformation } from "@keystone-sites/core/types";
import { LEGAL_CONTACT_FALLBACK } from "./legal-data";

function siteHost(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    throw new Error("Missing required environment variable: NEXT_PUBLIC_SITE_URL");
  }

  try {
    return new URL(siteUrl).host;
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute URL");
  }
}

/** Replaces backend legal-markdown tokens with current company values. */
export function replaceLegalPlaceholders(
  markdown: string,
  company: CompanyInformation,
): string {
  const name = company.company_name?.trim() || "Keystone";
  const email = company.primary_email || company.support_email || null;
  const phone = company.primary_phone || null;
  const contact = email ? `at ${email}` : phone ? `at ${phone}` : LEGAL_CONTACT_FALLBACK;
  const locality = [company.primary_city, company.primary_state].filter(Boolean).join(", ");
  const cityLine = [locality, company.primary_zip_code].filter(Boolean).join(" ");
  const address = [
    company.primary_address_line_1,
    company.primary_address_line_2,
    cityLine,
    company.primary_country,
  ]
    .filter(Boolean)
    .join(", ");

  const values: Record<string, string | undefined> = {
    "business.name": name,
    "business.website": siteHost(),
    "business.contact": contact,
    "business.email": email ?? LEGAL_CONTACT_FALLBACK,
    "business.phone": phone ?? LEGAL_CONTACT_FALLBACK,
    "business.address": address || undefined,
    "right_now.year": String(new Date().getFullYear()),
  };

  return markdown.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_match, token: string) => {
    const value = values[token];
    if (value !== undefined) return value;
    throw new Error(`Missing or unsupported legal template token: ${token}`);
  });
}
