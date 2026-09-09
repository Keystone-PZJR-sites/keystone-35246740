import DevtoolsMount from "./grid/devtools-mount";
import { PRICING_EXPECTATIONS } from "./pricing-expectations";

/** Dev-only pricing sweep hook. Production aliases this module to
 * `qa.prod.tsx`. */
export default function PricingQa() {
  return <DevtoolsMount expectations={PRICING_EXPECTATIONS} />;
}
