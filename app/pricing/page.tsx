import { PricingPage } from "@/design-system/v2/pricing";
import PricingQa from "../pricing-qa";

/** `/pricing` — the new-brand pricing page (spec 011 §8). PricingQa is
 * the sweep hook (dev-only; production aliases it to a null stub). */
export default function Pricing() {
  return <PricingPage qa={<PricingQa />} />;
}
