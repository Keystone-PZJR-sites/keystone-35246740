import type { Metadata } from "next";
import { LegalPage } from "@/design-system/pages/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Keystone",
};

export default function PrivacyPage() {
  return <LegalPage document="privacy" />;
}
