import type { Metadata } from "next";
import { PricingPage } from "@/design-system/pages/pricing";

export const metadata: Metadata = {
  title: "Pricing | Keystone",
};

export default function Pricing() {
  return <PricingPage />;
}
