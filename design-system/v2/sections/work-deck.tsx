/** v2 sections — the work section (spec 021). Server component.
 *
 * A header (the standing marker-construction slug, the Kyoto headline,
 * the View-our-work CTA) and the website deck — six stylized browser
 * windows, one per client site, colored chrome on the web-swatch
 * grain + hairline shadow (the 019 grain primitive's second consumer).
 * A click anywhere on the deck cycles it; nothing else moves. The
 * section is born settled (§5) — no entrance choreography.
 *
 * Three drawn anchors (384 · 768 · 1344, plan.md three-anchor policy):
 * rs derives from the 384 design (geometry on the tick, type on the R9
 * midpoint walk), rd1 from the 1344 design zooming on the tick. The
 * deck is one proportional unit (§9 R3): the §4 constants render as
 * drawn at the anchors and the whole cascade rides the band's zoom
 * factor off-anchor — work-deck.css carries the construction.
 *
 * The deck subtree lives in the one client island (work-deck-island);
 * its server HTML is the settled no-JS state. The sr-only roster below
 * names all six sites and categories (§5; Ora name-only, §9 R5).
 */

import { GridRegion, type GridBand } from "../grid/region";
import { InterpText } from "../primitives/text";
import { ButtonFill } from "../primitives/buttons";
import { WorkDeckIsland } from "./work-deck-island";
import { WORK_SITES } from "./work-deck-data";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/* ---- exposure map (§2), section-local ticks — read per-cell through
   the bridge at the spec's writing and re-verified at the build's
   fresh-read pass. 384: the east rail col 11, the full 20t run; 768:
   the east rail cols 10–11, the full 16t run; 1344: NO painted cells —
   the section sits on bare paper (a first for a v2 section, drawn
   intent, §9 R2). The rails continue into the case-study rows below —
   one run; the expectations treat the boundary per section. Derived
   bands render their source anchor's map. */

interface R {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}

const SECTION_MAP: Record<GridBand, R[]> = {
  rm: [{ gx: 11, gy: 0, gh: 20 }],
  rs: [{ gx: 11, gy: 0, gh: 20 }], // derived from 384 (§1)
  rt: [{ gx: 10, gy: 0, gw: 2, gh: 16 }],
  rd1: [], // derived from 1344 (§1) — bare paper
  rd2: [],
};

export function WorkDeckSection() {
  return (
    <section className="sec v2-work" aria-label="Our work" data-landmark="work">
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) =>
          SECTION_MAP[band].map((r, i) => <GridRegion key={`${band}-r${i}`} band={band} {...r} />),
        )}
      </div>

      {/* the header (§3): the one slug canon at every band (§9 F1) */}
      <div className="wd-head">
        <InterpText as="p" style="text-xs-medium" className="wd-slug">
          <span className="wd-marker" aria-hidden="true" />
          <span>Work that creates demand</span>
        </InterpText>
        <InterpText as="h2" style="display-serif-xs-extralight" className="wd-h2">
          Beautiful websites, ads, social, and content that grow your business.
        </InterpText>
        {/* the CTA rides the header from the rd1 gate (§3) — lg, the
            1344 design's material size */}
        <div className="wd-cta-head">
          <ButtonFill size="lg" chrome="gray" href="/our-work">
            View our work
          </ButtonFill>
        </div>
      </div>

      {/* the sr-only roster (§5): all six sites in cascade order; the
          categories ride the names (Ora carries its own, §9 R5) */}
      <ul className="hx-sr">
        {WORK_SITES.map((s) => (
          <li key={s.slug}>{s.category ? `${s.name} — ${s.category}` : s.name}</li>
        ))}
      </ul>

      {/* the cascade band (§1): full-width bg/100 with line-inclusive
          hairlines at rt/base; bare at rd1+ (no band chrome). The md
          CTA rides the band below the rd1 gate. */}
      <div className="wd-band">
        <WorkDeckIsland sites={WORK_SITES} />
        <div className="wd-cta-band">
          <ButtonFill size="md" chrome="gray" href="/our-work">
            View our work
          </ButtonFill>
        </div>
      </div>
    </section>
  );
}
