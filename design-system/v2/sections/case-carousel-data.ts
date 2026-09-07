/** v2 sections — the homepage case-study carousel content (spec 022
 * §4/§8 as amended §9 R3). The per-study canon (names, slugs, stats,
 * alt) lives in the shared work-cases-data module — the 022 stats ARE
 * that module's stats (the cross-surface ruling), so a Phase B content
 * pass updates the carousel and the Our Work cards together. This
 * module carries only carousel wiring: the strip order, the asset file
 * map, and the F2 placeholder descriptions.
 *
 * Strip order (§4): Zivel → YHS → Bare Lúx — the 014 module order
 * verbatim, so the strip is the shared array unsliced. The §7 asset
 * numbering is REVERSED against the strip order (01 Bare Lúx · 02 YHS
 * · 03 Zivel — found at the build's mount QA from the files' content,
 * the 021 §7 export class; §9 B records it, no re-cut): a study's
 * file number is 3 − its strip index.
 *
 * Descriptions — the F2 placeholder ruling (owner, 022 §9 F2): all
 * three cards carry Zivel's drawn description for now; updated
 * per-study copy lands as a data-only content pass here (tracked with
 * the G-class content gates). The string is the canon single-spaced
 * transcription; the leading "keystone" renders as the inline wordmark
 * (the 006 construction — the component splits the prefix). */

import type { CaseStudySiteId } from "../media";
import { CASE_STUDIES, type CaseStudy } from "./work-cases-data";

/** The three studies in strip order — the shared canon, unsliced. */
export const CAROUSEL_STUDIES: CaseStudy[] = CASE_STUDIES;

/** Strip index → §7 asset file number (the reversed export numbering). */
export function caseCarouselFile(stripIndex: number): number {
  return CAROUSEL_STUDIES.length - stripIndex;
}

const ZIVEL_DESCRIPTION =
  "keystone helped a Florida-based recovery and wellness studio turn increased lead generation into a new sales hire to meet the demand.";

/** Per-study card descriptions — the F2 placeholder: Zivel's drawn
 * string on every card until the content pass swaps the values. */
export const CAROUSEL_DESCRIPTIONS: Record<CaseStudySiteId, string> = {
  zivel: ZIVEL_DESCRIPTION,
  yhs: ZIVEL_DESCRIPTION,
  barelux: ZIVEL_DESCRIPTION,
};
