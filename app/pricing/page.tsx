import type { Metadata } from "next";
import { PricingPage } from "@/design-system/pages/pricing";

export const metadata: Metadata = {
  title: "Pricing | Keystone",
  description:
    "One plan, $50 a month, no setup fee and no contract: the website, ads, social, reviews, content and follow-ups that grow a local business.",
};

export default function Pricing() {
  return <PricingPage />;
}
