import type { Metadata } from "next";
import { LegalPage } from "@/design-system/pages/legal";

export const metadata: Metadata = {
  title: "Terms of Service | Keystone",
};

export default function TermsPage() {
  return <LegalPage document="terms" />;
}
