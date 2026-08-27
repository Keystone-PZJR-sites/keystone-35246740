import { HomePage } from "@/design-system/v2/home";
import DevtoolsMount from "../grid/devtools-mount";
import { PAGE_EXPECTATIONS } from "./expectations";

/** The QA mount of the shared homepage composition (spec 010 §6.3),
 * carrying the page-level self-test (spec 010 §3.2): the grid devtools
 * audit the real assembled sections against the §2 page table. The
 * devtools ship in development only — the production build swaps the
 * mount for a null stub (devtools-mount.tsx, the next.config alias). */
export default function HomeFixturePage() {
  return <HomePage qa={<DevtoolsMount expectations={PAGE_EXPECTATIONS} />} />;
}
