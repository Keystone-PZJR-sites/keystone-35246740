import type { Metadata } from "next";
import { DesignPage } from "@/site/pages/design";

export const metadata: Metadata = {
  title: "Design system | Keystone",
  description: "Keystone's marketing site design system, rendered from its source.",
  robots: { index: false, follow: false },
};

export default function Design() {
  return <DesignPage />;
}
