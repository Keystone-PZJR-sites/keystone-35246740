import type { Metadata } from "next";
import { LegalPage } from "@/site/pages/legal";

export const metadata: Metadata = {
  title: "Terms of Service | Keystone",
  description: "The terms that govern use of Keystone's website and services.",
};

export default function TermsPage() {
  return <LegalPage document="terms" />;
}
