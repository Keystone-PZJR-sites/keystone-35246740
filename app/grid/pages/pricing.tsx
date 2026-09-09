import GridMount from "../mount";
import { PRICING_EXPECTATIONS } from "./pricing-expectations";

/** Development-only pricing grid check. */
export default function PricingGridCheck() {
  return <GridMount expectations={PRICING_EXPECTATIONS} />;
}
