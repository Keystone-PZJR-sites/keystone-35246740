import type { Metadata } from "next";
import { LegalPage } from "@/design-system/pages/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Keystone",
  description: "How Keystone collects, uses and protects your information.",
};

export default function PrivacyPage() {
  return <LegalPage document="privacy" />;
}
