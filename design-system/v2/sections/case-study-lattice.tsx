/** v2 sections — the case-study exposure map (spec 017 §2 as
 * corrected at build, 2026-08-31 — the §9 build record). The §2
 * "full-field lattice behind the whole page" was the presence read:
 * the Grid layers hold a cell rectangle at every position, but only
 * some carry the visible stroke (the hero §2 erratum class —
 * presence is not paint). Re-read per-cell from stroke visibility at
 * build: the painted exposure is the pricing/our-work east-edge
 * staircase descending from the top-right, a col-11 rail running the
 * whole page, designed widenings beside the stat rows, and one
 * full-lattice row directly above the footer at every band. The
 * staircase passes behind the header photo and beside the stat cells
 * as drawn — the 014 declared-overlap class (the expectations carry
 * the exceptions).
 *
 * Four of the §2 draft's ○ cells carry radius but neither stroke nor
 * fill — invisible (the pricing [8,13] hygiene class): rm [9,29] ·
 * rs [8,14] · rd1 [8,12] · rd2 [8,12]. Nothing builds from them.
 *
 * Every painted cell verified against rendered bounds and stroke
 * visibility 2026-08-31; rows are section-local ticks (adjacent
 * sections share their boundary line by v5 line-inclusive overlap). */

import { GridDecor, GridRegion, type GridBand } from "../grid/region";

interface R {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}
type Orn = [col: number, row: number];

interface SectionMap {
  regions: Partial<Record<GridBand, R[]>>;
  circles?: Partial<Record<GridBand, Orn[]>>;
  fillCircles?: Partial<Record<GridBand, Orn[]>>;
  squares?: Partial<Record<GridBand, Orn[]>>;
}

const MAP = {
  header: {
    regions: {
      rm: [
        { gx: 11, gy: 4 },
        { gx: 10, gy: 5, gw: 2 },
        { gx: 9, gy: 6, gw: 3, gh: 12 },
        { gx: 11, gy: 18, gh: 7 },
      ],
      rs: [
        { gx: 11, gy: 4 },
        { gx: 10, gy: 5, gw: 2 },
        { gx: 9, gy: 6, gw: 3 },
        { gx: 8, gy: 7, gw: 4, gh: 7 },
        { gx: 11, gy: 14, gh: 6 },
      ],
      rt: [
        { gx: 11, gy: 2 },
        { gx: 10, gy: 3, gw: 2 },
        { gx: 9, gy: 4, gw: 3 },
        { gx: 8, gy: 5, gw: 4, gh: 8 },
      ],
      rd1: [
        { gx: 11, gy: 2 },
        { gx: 10, gy: 3, gw: 2 },
        { gx: 9, gy: 4, gw: 3 },
        { gx: 8, gy: 5, gw: 4, gh: 5 },
      ],
      rd2: [
        { gx: 11, gy: 2 },
        { gx: 10, gy: 3, gw: 2 },
        { gx: 9, gy: 4, gw: 3 },
        { gx: 8, gy: 5, gw: 4, gh: 2 },
      ],
    },
    circles: {
      rm: [[11, 5], [9, 7], [10, 14]],
      rs: [[11, 5], [9, 7]],
      rt: [[11, 3], [8, 5]],
      rd1: [[11, 3], [8, 5]],
      rd2: [[11, 3], [8, 5]],
    },
    squares: { rm: [[11, 10]] },
  },
  intro: {
    regions: {
      rm: [{ gx: 11, gy: 0, gh: 14 }],
      rs: [{ gx: 11, gy: 0, gh: 7 }],
      rt: [
        { gx: 10, gy: 1, gw: 2, gh: 3 },
        { gx: 7, gy: 4, gw: 5, gh: 3 },
        { gx: 11, gy: 7 },
      ],
      rd1: [{ gx: 11, gy: 1, gh: 3 }],
      rd2: [
        { gx: 8, gy: 0, gw: 4 },
        { gx: 11, gy: 1, gh: 2 },
      ],
    },
    circles: {},
    fillCircles: { rm: [[11, 2]], rs: [[11, 1]], rt: [[11, 1]], rd1: [[11, 1]], rd2: [[11, 1]] },
  },
  overview: {
    regions: {
      rm: [
        { gx: 11, gy: 0, gh: 19 },
        { gx: 10, gy: 19, gw: 2, gh: 8 },
        { gx: 11, gy: 27, gh: 2 },
      ],
      rs: [
        { gx: 11, gy: 0, gh: 14 },
        { gx: 6, gy: 14, gw: 6, gh: 2 },
        { gx: 11, gy: 16 },
      ],
      rt: [
        { gx: 11, gy: 0, gh: 7 },
        { gx: 10, gy: 7, gw: 2, gh: 3 },
        { gx: 11, gy: 10 },
      ],
      rd1: [
        { gx: 11, gy: 0, gh: 6 },
        { gx: 7, gy: 6, gw: 5, gh: 2 },
        { gx: 11, gy: 8 },
      ],
      rd2: [
        { gx: 11, gy: 0, gh: 5 },
        { gx: 9, gy: 5, gw: 3, gh: 2 },
      ],
    },
    squares: { rm: [[11, 20]], rs: [[11, 12]], rt: [[11, 7]], rd1: [[11, 6]], rd2: [[11, 5]] },
  },
  business: {
    regions: {
      rm: [{ gx: 11, gy: 0, gh: 35 }],
      rs: [{ gx: 11, gy: 0, gh: 23 }],
      rt: [{ gx: 11, gy: 0, gh: 13 }],
      rd1: [{ gx: 11, gy: 0, gh: 11 }],
      rd2: [{ gx: 11, gy: 0, gh: 10 }],
    },
    squares: { rs: [[11, 16]] },
  },
  shift: {
    regions: {
      rm: [{ gx: 11, gy: 0, gh: 22 }],
      rs: [{ gx: 11, gy: 0, gh: 13 }],
      rt: [{ gx: 11, gy: 0, gh: 7 }],
      rd1: [{ gx: 11, gy: 0, gh: 6 }],
      rd2: [{ gx: 11, gy: 0, gh: 5 }],
    },
    fillCircles: { rm: [[11, 0]], rs: [[11, 0]], rt: [[11, 0]], rd1: [[11, 0]], rd2: [[11, 0]] },
  },
  funnel: {
    regions: {
      rm: [{ gx: 11, gy: 0, gh: 15 }],
      rs: [{ gx: 11, gy: 0, gh: 10 }],
      rt: [{ gx: 11, gy: 0, gh: 8 }],
      rd1: [{ gx: 11, gy: 0, gh: 7 }],
      rd2: [{ gx: 11, gy: 0, gh: 6 }],
    },
  },
  stack: {
    regions: {
      rm: [{ gx: 11, gy: 0, gh: 22 }],
      rs: [{ gx: 11, gy: 0, gh: 13 }],
      rt: [{ gx: 11, gy: 0, gh: 10 }],
      rd1: [{ gx: 11, gy: 0, gh: 9 }],
      rd2: [{ gx: 11, gy: 0, gh: 7 }],
    },
    squares: { rm: [[11, 0]], rs: [[11, 0]], rt: [[11, 0]], rd1: [[11, 0]], rd2: [[11, 0]] },
  },
  result: {
    regions: {
      rm: [{ gx: 11, gy: 0, gh: 31 }],
      rs: [{ gx: 11, gy: 0, gh: 23 }],
      rt: [{ gx: 11, gy: 0, gh: 21 }],
      rd1: [{ gx: 11, gy: 0, gh: 17 }],
      rd2: [{ gx: 11, gy: 0, gh: 14 }],
    },
    fillCircles: { rd2: [[11, 10]] },
  },
  cta: {
    regions: {
      rm: [
        { gx: 11, gy: 0, gh: 9 },
        { gx: 0, gy: 9, gw: 12 },
      ],
      rs: [
        { gx: 11, gy: 0, gh: 6 },
        { gx: 0, gy: 6, gw: 12 },
      ],
      rt: [
        { gx: 11, gy: 0, gh: 4 },
        { gx: 0, gy: 4, gw: 12 },
      ],
      rd1: [
        { gx: 11, gy: 0, gh: 4 },
        { gx: 0, gy: 4, gw: 12 },
      ],
      rd2: [
        { gx: 11, gy: 0, gh: 3 },
        { gx: 0, gy: 3, gw: 12 },
      ],
    },
    squares: { rm: [[11, 9]], rs: [[11, 6]], rt: [[11, 4]], rd1: [[11, 4]], rd2: [[11, 3]] },
  },
} satisfies Record<string, SectionMap>;

export type CaseStudySectionId = keyof typeof MAP;

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/** The painted lattice rides a grown section (the clearance law,
 * rules.md "Content clears the lattice"): the map's **first region**
 * is the leading col-11 rail, anchored to the section top — it
 * extends by the extra rows. Every **later region** (the widenings
 * drawn beside the stat rows, the tail rails) is anchored to the
 * frame bottom and shifts down with the growth, staying beside the
 * content it was drawn against. Ornament cells at or below the
 * bottom-anchored run (the second region's top row) shift with it;
 * ornaments above it hold their drawn rows. Sections that accept
 * growth (overview · shift · result) all carry this
 * [leading rail, …bottom-anchored] shape per band. */
function grownBand(map: SectionMap, band: GridBand, extra: number) {
  const regions = map.regions[band] ?? [];
  if (!extra) {
    return { regions, orn: (cells: Orn[]) => cells };
  }
  const shiftFrom = regions.length > 1 ? regions[1].gy : Infinity;
  return {
    regions: regions.map((r, i) =>
      i === 0 ? { ...r, gh: (r.gh ?? 1) + extra } : { ...r, gy: r.gy + extra },
    ),
    orn: (cells: Orn[]) =>
      cells.map(([gx, gy]) => (gy >= shiftFrom ? ([gx, gy + extra] as Orn) : ([gx, gy] as Orn))),
  };
}

/** The per-band `--csx-*` growth vars a grown section sets inline —
 * consumed by the section's height calcs and threaded to the lattice
 * so the painted cells move with the content. */
export function extraTickVars(extra?: Partial<Record<GridBand, number>>): React.CSSProperties | undefined {
  if (!extra) return undefined;
  return {
    "--csx-rm": extra.rm ?? 0,
    "--csx-rs": extra.rs ?? 0,
    "--csx-rt": extra.rt ?? 0,
    "--csx-rd1": extra.rd1 ?? 0,
    "--csx-rd2": extra.rd2 ?? 0,
  } as React.CSSProperties;
}

export function CaseStudyLattice({
  section,
  extra,
}: {
  section: CaseStudySectionId;
  extra?: Partial<Record<GridBand, number>>;
}) {
  const map: SectionMap = MAP[section];
  return (
    <div className="gx" aria-hidden="true">
      {BANDS.map((band) => {
        const { regions, orn } = grownBand(map, band, extra?.[band] ?? 0);
        return [
          ...regions.map((r, i) => <GridRegion key={`${band}-r${i}`} band={band} {...r} />),
          ...orn(map.circles?.[band] ?? []).map(([gx, gy]) => (
            <GridDecor key={`${band}-o${gx}-${gy}`} band={band} gx={gx} gy={gy}>
              <span className="f-cell round" />
            </GridDecor>
          )),
          ...orn(map.fillCircles?.[band] ?? []).map(([gx, gy]) => (
            <GridDecor key={`${band}-fo${gx}-${gy}`} band={band} gx={gx} gy={gy}>
              <span className="f-cell fill round" />
            </GridDecor>
          )),
          ...orn(map.squares?.[band] ?? []).map(([gx, gy]) => (
            <GridDecor key={`${band}-f${gx}-${gy}`} band={band} gx={gx} gy={gy}>
              <span className="f-cell fill" />
            </GridDecor>
          )),
        ];
      })}
    </div>
  );
}
