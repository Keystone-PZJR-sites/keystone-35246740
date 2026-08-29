/** v2 sections — work-cases (spec 014 §4/§5). Server component, zero
 * client islands: the card hover is CSS (the inline button's glyph
 * advance), the CTAs are links. The three case-study cards on the 1t
 * stack gaps — one DOM instance per study; the section owns each
 * card's geometry per band (work-cases.css) and the alternating
 * left · right · left arrangement at the row bands (§5; card 2
 * carries `flip`).
 *
 * The section is born settled (§6, the 011 §9 R10 precedent); a no-JS
 * render is identical.
 *
 * The lattice over these rows continues §2's east-edge staircase from
 * work-header.tsx (section-local gy — the sections stack flush); the
 * runs pass behind the opaque cards as declared overlaps (the 013
 * expectations pattern), leaving col 11 and the gap rows visible.
 * Every cell was verified against rendered bounds at build,
 * 2026-08-28; §2 as amended carries the post-build map (the rt
 * closing square, the rm uniform run). */

import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { CaseStudyCard } from "../primitives/case-study-card";
import { CASE_STUDIES } from "./work-cases-data";

/* ---- the exposure map (§2), case-studies rows (section-local gy;
   page row = gy + the case-studies top 17/11/8/8/7). ---- */

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
    /* the [8,7] stroke-only circle sits inside the run under the
       opaque cards — drawn as read, covered at rest (§2) */
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
    <section className="sec v2-wkc">
      {/* the staircase runs and ornament cells (§2, case rows) */}
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

      {/* the three cards (§5), card 1 eager (§7.1) and riding the
          page's entrance (§6 as amended — cards 2–3 are below the fold
          and born settled), card 2 flipped at the row bands */}
      <div className="wkc-stack">
        {CASE_STUDIES.map((study, i) => (
          <CaseStudyCard key={study.slug} study={study} eager={i === 0} flip={i === 1} rise={i === 0} />
        ))}
      </div>
    </section>
  );
}
