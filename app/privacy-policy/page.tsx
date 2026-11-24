import type { Metadata } from "next";
import { LEGAL_DOCUMENTS } from "@/site/legal/documents";
import { LegalPage } from "@/site/legal/legal-page";

export const metadata: Metadata = {
  title: `${LEGAL_DOCUMENTS.privacy.title} | Keystone`,
  description: LEGAL_DOCUMENTS.privacy.description,
};

export default function PrivacyPage() {
  return <LegalPage document="privacy" />;
}
