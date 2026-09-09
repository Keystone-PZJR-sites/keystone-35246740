/** Website deck with six client sites. The deck is one proportional
 * unit whose geometry scales from the section's anchor values. Its
 * client island owns only the front-card index. */

import { GridRegion, type GridBand } from "../grid/region";
import { InterpText } from "../primitives/text";
import { ButtonFill } from "../primitives/buttons";
import { WorkDeckIsland } from "./work-deck-island";
import { WORK_SITES } from "./work-deck-data";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/* Exposure map in section-local ticks. Wide bands use bare paper. */

interface R {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}

const SECTION_MAP: Record<GridBand, R[]> = {
  rm: [{ gx: 11, gy: 0, gh: 20 }],
  rs: [{ gx: 11, gy: 0, gh: 20 }],
  rt: [{ gx: 10, gy: 0, gw: 2, gh: 16 }],
  rd1: [],
  rd2: [],
};

export function WorkDeckSection() {
  return (
    <section className="sec work-section" aria-label="Our work" data-landmark="work">
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) =>
          SECTION_MAP[band].map((r, i) => <GridRegion key={`${band}-r${i}`} band={band} {...r} />),
        )}
      </div>

      <div className="wd-head">
        <InterpText as="p" style="text-xs-medium" className="wd-slug">
          <span className="wd-marker" aria-hidden="true" />
          <span>Work that creates demand</span>
        </InterpText>
        <InterpText as="h2" style="display-serif-xs-extralight" className="wd-h2">
          Beautiful websites, ads, social, and content that grow your business.
        </InterpText>
        {/* The CTA moves into the header on wide bands. */}
        <div className="wd-cta-head">
          <ButtonFill size="lg" chrome="gray" href="/our-work">
            View our work
          </ButtonFill>
        </div>
      </div>

      {/* Screen readers receive the full site roster in cascade order. */}
      <ul className="hx-sr">
        {WORK_SITES.map((s) => (
          <li key={s.slug}>{s.category ? `${s.name} — ${s.category}` : s.name}</li>
        ))}
      </ul>

      {/* Narrow bands add chrome and keep the CTA inside the cascade band. */}
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
