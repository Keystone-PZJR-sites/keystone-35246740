import { OurWorkPage } from "@/design-system/v2/our-work";
import DevtoolsMount from "../grid/devtools-mount";
import { OUR_WORK_EXPECTATIONS } from "./expectations";

/** The QA mount of the shared Our Work composition (spec 014 §8.4),
 * carrying the page-level self-test (spec 016 §7): the grid devtools
 * audit the real assembled sections against the §7.1 table. The
 * devtools ship in development only — the production build swaps the
 * mount for a null stub (devtools-mount.tsx, the next.config alias). */
export default function OurWorkFixturePage() {
  return <OurWorkPage qa={<DevtoolsMount expectations={OUR_WORK_EXPECTATIONS} />} />;
}
