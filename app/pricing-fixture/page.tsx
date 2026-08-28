import { PricingPage } from "@/design-system/v2/pricing";

/** The QA mount of the shared pricing composition (spec 011 §8). The
 * grid-devtools mount and the page-level expectations arrive with spec
 * 013, which completes the pricing stack. */
export default function PricingFixturePage() {
  return <PricingPage />;
}
