import { HomePage } from "@/design-system/v2/home";
import DevtoolsMount from "../grid/devtools-mount";
import { PAGE_EXPECTATIONS } from "./expectations";

/** The QA mount of the shared homepage composition (spec 023 §4 — the
 * v2 composition since the cutover), carrying the page-level self-test
 * (spec 023 §1/§2): the grid devtools audit the real assembled
 * sections against the built-constant table. The devtools ship in
 * development only — the production build swaps the mount for a null
 * stub (devtools-mount.tsx, the next.config alias). */
export default function HomeFixturePage() {
  return <HomePage qa={<DevtoolsMount expectations={PAGE_EXPECTATIONS} />} />;
}
