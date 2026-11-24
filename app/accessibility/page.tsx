import type { Metadata } from "next";
import { LEGAL_DOCUMENTS } from "@/site/legal/documents";
import { LegalPage } from "@/site/legal/legal-page";

export const metadata: Metadata = {
  title: `${LEGAL_DOCUMENTS.accessibility.title} | Keystone`,
  description: LEGAL_DOCUMENTS.accessibility.description,
};

export default function AccessibilityPage() {
  return <LegalPage document="accessibility" />;
}
