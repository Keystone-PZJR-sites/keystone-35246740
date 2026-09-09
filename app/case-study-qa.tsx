import DevtoolsMount from "./grid/devtools-mount";
import { CASE_STUDY_EXPECTATIONS } from "./case-study-expectations";

/** Dev-only Zivel case-study sweep hook. Production aliases this
 * module to `qa.prod.tsx`. Only the Zivel slug mounts it — the
 * expectations table is that study's anatomy. */
export default function CaseStudyQa() {
  return <DevtoolsMount expectations={CASE_STUDY_EXPECTATIONS} />;
}
