import { PricingPage } from "@/design-system/v2/pricing";
import DevtoolsMount from "../grid/devtools-mount";
import { PRICING_EXPECTATIONS } from "./expectations";

/** The QA mount of the shared pricing composition (spec 011 §8),
 * carrying the page-level self-test (spec 013 §7): the grid devtools
 * audit the real assembled sections against the §7.1 table. The
 * devtools ship in development only — the production build swaps the
 * mount for a null stub (devtools-mount.tsx, the next.config alias). */
export default function PricingFixturePage() {
  return <PricingPage qa={<DevtoolsMount expectations={PRICING_EXPECTATIONS} />} />;
}
