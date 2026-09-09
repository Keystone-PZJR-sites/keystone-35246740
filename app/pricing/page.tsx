import { PricingPage } from "@/design-system/pages/pricing";
import PricingGridCheck from "../grid/pages/pricing";

/** The pricing page with its development-only sweep hook. */
export default function Pricing() {
  return <PricingPage gridCheck={<PricingGridCheck />} />;
}
