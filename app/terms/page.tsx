import type { Metadata } from "next";
import { LEGAL_DOCUMENTS } from "@/site/legal/documents";
import { LegalPage } from "@/site/legal/legal-page";

export const metadata: Metadata = {
  title: `${LEGAL_DOCUMENTS.terms.title} | Keystone`,
  description: LEGAL_DOCUMENTS.terms.description,
};

export default function TermsPage() {
  return <LegalPage document="terms" />;
}
