import type { CompanyInformation } from "@keystone-sites/core/types";
import { SITE_URL } from "@/site/site";

/** Fills a legal document's `{{token}}`s with Keystone's own details from its company record. */
export function fillLegalTemplate(markdown: string, company: CompanyInformation): string {
  const email = company.primary_email || company.support_email || undefined;
  const phone = company.primary_phone || undefined;
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
    "business.name": company.company_name?.trim() || "Keystone",
    "business.website": new URL(SITE_URL).host,
    "business.contact": email ? `at ${email}` : phone ? `at ${phone}` : undefined,
    "business.email": email,
    "business.phone": phone,
    "business.address": address || undefined,
    "right_now.year": String(new Date().getFullYear()),
  };

  return markdown.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_match, token: string) => {
    const value = values[token];
    if (value !== undefined) return value;
    throw new Error(`Keystone's company record has nothing for the legal token ${token}.`);
  });
}
