/** Homepage carousel data. Study summaries come from the shared
 * case-study card module. Asset file numbering runs opposite to strip
 * order, so each file number is `length - stripIndex`. */

import type { CaseStudySiteId } from "../media";
import { CASE_STUDIES, type CaseStudySummary } from "./work-cases-data";

export const CAROUSEL_STUDIES: CaseStudySummary[] = CASE_STUDIES;

/** Strip index to asset file number. */
export function caseCarouselFile(stripIndex: number): number {
  return CAROUSEL_STUDIES.length - stripIndex;
}

export const CAROUSEL_DESCRIPTIONS: Record<CaseStudySiteId, string> = {
  zivel:
    "keystone helped a Florida-based recovery and wellness studio turn increased lead generation into a new sales hire to meet the demand.",
  yhs: "keystone supported a newly opened MedSpa in Connecticut fill their calendar and hit $25k monthly revenue in 7 months.",
  barelux:
    "keystone enabled a MedSpa in New Jersey expand their reach and capture demand in two languages on a lean budget.",
};
