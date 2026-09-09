import DevtoolsMount from "./grid/devtools-mount";
import { PAGE_EXPECTATIONS } from "./home-expectations";

/** Dev-only homepage sweep hook. Production aliases this module to
 * `qa.prod.tsx` — no panel, no expectations table on the live graph. */
export default function HomeQa() {
  return <DevtoolsMount expectations={PAGE_EXPECTATIONS} />;
}
