import { HomePage } from "@/design-system/v2/home";
import DevtoolsMount from "./grid/devtools-mount";
import { PAGE_EXPECTATIONS } from "./home-expectations";

/** `/` — the new-brand homepage (the v2 composition since the spec 023
 * §4 cutover). The page-level self-test mounts here headless (dev-only;
 * no on-page readout — `/home-fixture` used to carry that panel). The
 * production build swaps DevtoolsMount for a null stub. */
export default function Home() {
  return (
    <HomePage qa={<DevtoolsMount expectations={PAGE_EXPECTATIONS} silent />} />
  );
}
