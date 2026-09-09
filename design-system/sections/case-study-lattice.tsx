/** Visible lattice regions and ornaments for each section and band.
 * Rows are section-local; adjacent sections share their boundary line.
 * Rails stretch between the section edges and trailing regions and
 * ornaments count rows from the section bottom, so the exposure follows
 * a section that grows with its copy. */

import { GridDecor, GridRegion, type GridBand } from "../grid/region";

interface R {
  gx: number;
  gy?: number;
  gyb?: number;
  gw?: number;
  gh?: number;
}
/** Ornament cell: `[col, row]` from the top or `[col, null, rowFromBottom]`. */
type Orn = [col: number, row: number | null, rowFromBottom?: number];

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
        { gx: 11, gy: 18, gyb: 0, gh: 7 },
      ],
      rs: [
        { gx: 11, gy: 4 },
        { gx: 10, gy: 5, gw: 2 },
        { gx: 9, gy: 6, gw: 3 },
        { gx: 8, gy: 7, gw: 4, gh: 7 },
        { gx: 11, gy: 14, gyb: 0, gh: 6 },
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
      rm: [{ gx: 11, gy: 0, gyb: 0, gh: 14 }],
      rs: [{ gx: 11, gy: 0, gyb: 0, gh: 7 }],
      rt: [
        { gx: 10, gy: 1, gyb: 4, gw: 2, gh: 3 },
        { gx: 7, gyb: 1, gw: 5, gh: 3 },
        { gx: 11, gyb: 0 },
      ],
      rd1: [{ gx: 11, gy: 1, gyb: 0, gh: 3 }],
      rd2: [
        { gx: 8, gy: 0, gw: 4 },
        { gx: 11, gy: 1, gyb: 0, gh: 2 },
      ],
    },
    fillCircles: { rm: [[11, 2]], rs: [[11, 1]], rt: [[11, 1]], rd1: [[11, 1]], rd2: [[11, 1]] },
  },
  overview: {
    regions: {
      rm: [
        { gx: 11, gy: 0, gyb: 10, gh: 19 },
        { gx: 10, gyb: 2, gw: 2, gh: 8 },
        { gx: 11, gyb: 0, gh: 2 },
      ],
      rs: [
        { gx: 11, gy: 0, gyb: 3, gh: 14 },
        { gx: 6, gyb: 1, gw: 6, gh: 2 },
        { gx: 11, gyb: 0 },
      ],
      rt: [
        { gx: 11, gy: 0, gyb: 4, gh: 7 },
        { gx: 10, gyb: 1, gw: 2, gh: 3 },
        { gx: 11, gyb: 0 },
      ],
      rd1: [
        { gx: 11, gy: 0, gyb: 3, gh: 6 },
        { gx: 7, gyb: 1, gw: 5, gh: 2 },
        { gx: 11, gyb: 0 },
      ],
      rd2: [
        { gx: 11, gy: 0, gyb: 2, gh: 5 },
        { gx: 9, gyb: 0, gw: 3, gh: 2 },
      ],
    },
    squares: {
      rm: [[11, null, 8]],
      rs: [[11, 12]],
      rt: [[11, null, 3]],
      rd1: [[11, null, 2]],
      rd2: [[11, null, 1]],
    },
  },
  business: {
    regions: {
      rm: [{ gx: 11, gy: 0, gyb: 0, gh: 35 }],
      rs: [{ gx: 11, gy: 0, gyb: 0, gh: 23 }],
      rt: [{ gx: 11, gy: 0, gyb: 0, gh: 13 }],
      rd1: [{ gx: 11, gy: 0, gyb: 0, gh: 11 }],
      rd2: [{ gx: 11, gy: 0, gyb: 0, gh: 10 }],
    },
    squares: { rs: [[11, 16]] },
  },
  shift: {
    regions: {
      rm: [{ gx: 11, gy: 0, gyb: 0, gh: 22 }],
      rs: [{ gx: 11, gy: 0, gyb: 0, gh: 13 }],
      rt: [{ gx: 11, gy: 0, gyb: 0, gh: 7 }],
      rd1: [{ gx: 11, gy: 0, gyb: 0, gh: 6 }],
      rd2: [{ gx: 11, gy: 0, gyb: 0, gh: 5 }],
    },
    fillCircles: { rm: [[11, 0]], rs: [[11, 0]], rt: [[11, 0]], rd1: [[11, 0]], rd2: [[11, 0]] },
  },
  funnel: {
    regions: {
      rm: [{ gx: 11, gy: 0, gyb: 0, gh: 15 }],
      rs: [{ gx: 11, gy: 0, gyb: 0, gh: 10 }],
      rt: [{ gx: 11, gy: 0, gyb: 0, gh: 8 }],
      rd1: [{ gx: 11, gy: 0, gyb: 0, gh: 7 }],
      rd2: [{ gx: 11, gy: 0, gyb: 0, gh: 6 }],
    },
  },
  stack: {
    regions: {
      rm: [{ gx: 11, gy: 0, gyb: 0, gh: 22 }],
      rs: [{ gx: 11, gy: 0, gyb: 0, gh: 13 }],
      rt: [{ gx: 11, gy: 0, gyb: 0, gh: 10 }],
      rd1: [{ gx: 11, gy: 0, gyb: 0, gh: 9 }],
      rd2: [{ gx: 11, gy: 0, gyb: 0, gh: 7 }],
    },
    squares: { rm: [[11, 0]], rs: [[11, 0]], rt: [[11, 0]], rd1: [[11, 0]], rd2: [[11, 0]] },
  },
  result: {
    regions: {
      rm: [{ gx: 11, gy: 0, gyb: 0, gh: 31 }],
      rs: [{ gx: 11, gy: 0, gyb: 0, gh: 23 }],
      rt: [{ gx: 11, gy: 0, gyb: 0, gh: 21 }],
      rd1: [{ gx: 11, gy: 0, gyb: 0, gh: 17 }],
      rd2: [{ gx: 11, gy: 0, gyb: 0, gh: 14 }],
    },
    fillCircles: { rd2: [[11, 10]] },
  },
  cta: {
    regions: {
      rm: [
        { gx: 11, gy: 0, gyb: 1, gh: 9 },
        { gx: 0, gyb: 0, gw: 12 },
      ],
      rs: [
        { gx: 11, gy: 0, gyb: 1, gh: 6 },
        { gx: 0, gyb: 0, gw: 12 },
      ],
      rt: [
        { gx: 11, gy: 0, gyb: 1, gh: 4 },
        { gx: 0, gyb: 0, gw: 12 },
      ],
      rd1: [
        { gx: 11, gy: 0, gyb: 1, gh: 4 },
        { gx: 0, gyb: 0, gw: 12 },
      ],
      rd2: [
        { gx: 11, gy: 0, gyb: 1, gh: 3 },
        { gx: 0, gyb: 0, gw: 12 },
      ],
    },
    squares: {
      rm: [[11, null, 0]],
      rs: [[11, null, 0]],
      rt: [[11, null, 0]],
      rd1: [[11, null, 0]],
      rd2: [[11, null, 0]],
    },
  },
} satisfies Record<string, SectionMap>;

type CaseStudySectionId = keyof typeof MAP;

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

function ornament(band: GridBand, key: string, [gx, gy, gyb]: Orn, shape: string) {
  return (
    <GridDecor key={`${band}-${key}${gx}-${gy ?? `b${gyb}`}`} band={band} gx={gx} gy={gy ?? undefined} gyb={gyb}>
      <span className={shape} />
    </GridDecor>
  );
}

export function CaseStudyLattice({ section }: { section: CaseStudySectionId }) {
  const map: SectionMap = MAP[section];
  return (
    <div className="gx" aria-hidden="true">
      {BANDS.map((band) => [
        ...(map.regions[band] ?? []).map((r, i) => <GridRegion key={`${band}-r${i}`} band={band} {...r} />),
        ...(map.circles?.[band] ?? []).map((o) => ornament(band, "o", o, "f-cell round")),
        ...(map.fillCircles?.[band] ?? []).map((o) => ornament(band, "fo", o, "f-cell fill round")),
        ...(map.squares?.[band] ?? []).map((o) => ornament(band, "f", o, "f-cell fill")),
      ])}
    </div>
  );
}
