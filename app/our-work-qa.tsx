import DevtoolsMount from "./grid/devtools-mount";
import { OUR_WORK_EXPECTATIONS } from "./our-work-expectations";

/** Dev-only Our Work sweep hook. Production aliases this module to
 * `qa.prod.tsx`. */
export default function OurWorkQa() {
  return <DevtoolsMount expectations={OUR_WORK_EXPECTATIONS} />;
}
