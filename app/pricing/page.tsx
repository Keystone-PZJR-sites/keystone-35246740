import type { Metadata } from "next";
import { PricingPage } from "@/design-system/pages/pricing";

export const metadata: Metadata = {
  title: "Pricing | Keystone",
  description:
    "Pay for the work, not the retainer. Plans from $50 a month with no setup fee and no contract: a sales and marketing team sized to your business.",
};

export default function Pricing() {
  return <PricingPage />;
}
