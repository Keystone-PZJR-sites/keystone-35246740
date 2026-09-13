import type { Metadata } from "next";
import { CompanyPage } from "@/design-system/pages/company";
import { COMPANY_META } from "@/design-system/sections/company-data";

export const metadata: Metadata = {
  title: COMPANY_META.title,
  description: COMPANY_META.description,
};

/* No grid check: /company sections are content-sized by design — the
 * page grid is perceptual (flow closer rows), not whole-tick budgets,
 * so the integer boundary expectations do not apply. */
export default function Company() {
  return <CompanyPage />;
}
