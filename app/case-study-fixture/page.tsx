import { CaseStudyPage } from "@/design-system/v2/case-study";
import { ZIVEL } from "@/design-system/v2/sections/case-study-data";
import DevtoolsMount from "../grid/devtools-mount";
import { CASE_STUDY_EXPECTATIONS } from "./expectations";

/** The QA mount of the shared case-study composition (spec 017 §7):
 * the grid devtools audit the real assembled sections against the
 * §7.1 table on the Zivel record. The devtools ship in development
 * only — the production build swaps the mount for a null stub
 * (devtools-mount.tsx, the next.config alias). */
export default function CaseStudyFixturePage() {
  return <CaseStudyPage study={ZIVEL} qa={<DevtoolsMount expectations={CASE_STUDY_EXPECTATIONS} />} />;
}
