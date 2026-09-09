import GridMount from "../mount";
import { CASE_STUDY_EXPECTATIONS } from "./case-study-expectations";

/** Development-only grid check for the Zivel case study. */
export default function CaseStudyGridCheck() {
  return <GridMount expectations={CASE_STUDY_EXPECTATIONS} />;
}
