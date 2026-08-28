import { PricingPage } from "@/design-system/v2/pricing";

/** `/pricing` — the new-brand pricing page (spec 011 §8). The page
 * mounts the shared composition bare; `/pricing-fixture` mounts the
 * same composition as the permanent QA surface. An old path returned
 * as a rebuilt page (launch checklist — the dead-URL surface shrinks
 * as pages land). */
export default function Pricing() {
  return <PricingPage />;
}
