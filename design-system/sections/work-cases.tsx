/** Case-study cards for the Our Work page. CSS owns card interaction
 * and alternating geometry. The section-local lattice continues the
 * header staircase and passes behind opaque cards. */

import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { CaseStudyCard } from "../primitives/case-study-card";
import { CASE_STUDIES } from "./work-cases-data";

/* Exposure map in section-local ticks. */

interface R {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}
interface Cell {
  gx: number;
  gy: number;
}
interface BandMap {
  regions: R[];
  circles: Cell[];
  fillCircles: Cell[];
  squares: Cell[];
}

const FIELD: Record<GridBand, BandMap> = {
  rm: {
    regions: [{ gx: 10, gy: 0, gw: 2, gh: 58 }],
    circles: [],
    fillCircles: [{ gx: 11, gy: 28 }],
    squares: [{ gx: 11, gy: 56 }],
  },
  rs: {
    regions: [{ gx: 9, gy: 0, gw: 3, gh: 42 }],
    circles: [{ gx: 10, gy: 3 }],
    fillCircles: [{ gx: 11, gy: 27 }],
    squares: [{ gx: 11, gy: 9 }],
  },
  rt: {
    regions: [{ gx: 8, gy: 0, gw: 4, gh: 21 }],
    /* This circle remains in the lattice beneath the opaque cards. */
    circles: [{ gx: 8, gy: 7 }],
    fillCircles: [{ gx: 11, gy: 6 }],
    squares: [{ gx: 11, gy: 20 }],
  },
  rd1: {
    regions: [{ gx: 8, gy: 0, gw: 4, gh: 18 }],
    circles: [{ gx: 8, gy: 3 }],
    fillCircles: [{ gx: 11, gy: 5 }],
    squares: [{ gx: 11, gy: 17 }],
  },
  rd2: {
    regions: [{ gx: 8, gy: 0, gw: 4, gh: 15 }],
    circles: [{ gx: 8, gy: 5 }],
    fillCircles: [{ gx: 11, gy: 4 }],
    squares: [{ gx: 11, gy: 14 }],
  },
};

const BANDS = Object.keys(FIELD) as GridBand[];

export function WorkCasesSection() {
  return (
    <section className="sec work-cases-section">
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) => [
          ...FIELD[band].regions.map((r, i) => (
            <GridRegion key={`${band}-r${i}`} band={band} {...r} />
          )),
          ...FIELD[band].circles.map((o) => (
            <GridDecor key={`${band}-o${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="f-cell round" />
            </GridDecor>
          )),
          ...FIELD[band].fillCircles.map((o) => (
            <GridDecor key={`${band}-fo${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="f-cell fill round" />
            </GridDecor>
          )),
          ...FIELD[band].squares.map((o) => (
            <GridDecor key={`${band}-f${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="f-cell fill" />
            </GridDecor>
          )),
        ])}
      </div>

      {/* The first image loads eagerly; the second card flips at row layouts. */}
      <div className="wkc-stack">
        {CASE_STUDIES.map((study, i) => (
          <CaseStudyCard key={study.slug} study={study} eager={i === 0} flip={i === 1} rise={i === 0} />
        ))}
      </div>
    </section>
  );
}
