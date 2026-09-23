import type { Metadata } from "next";
import { LegalPage } from "@/design-system/pages/legal";

export const metadata: Metadata = {
  title: "Accessibility Statement | Keystone",
  description: "Keystone's commitment to an accessible website and how to reach us about barriers.",
};

export default function AccessibilityPage() {
  return <LegalPage document="accessibility" />;
}
