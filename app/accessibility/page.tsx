import type { Metadata } from "next";
import { LegalPage } from "@/design-system/pages/legal";

export const metadata: Metadata = {
  title: "Accessibility Statement | Keystone",
};

export default function AccessibilityPage() {
  return <LegalPage document="accessibility" />;
}
