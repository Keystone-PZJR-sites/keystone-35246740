/** Our Work header. CSS owns hover and load motion; links and the chat
 * action require no section-level client state. Its section-local
 * lattice continues into `work-cases.tsx`. */

import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { ButtonFill, ButtonGhost } from "../primitives/buttons";
import { IconChat } from "../icons";

const GET_STARTED_HREF = "/pricing";

/* East-edge staircase in section-local ticks. */

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
  fillCircles?: Cell[];
  squares: Cell[];
}

const FIELD: Record<GridBand, BandMap> = {
  rm: {
    regions: [
      { gx: 11, gy: 4 },
      { gx: 10, gy: 5, gw: 2, gh: 12 },
    ],
    circles: [{ gx: 11, gy: 5 }],
    fillCircles: [{ gx: 10, gy: 7 }],
    squares: [{ gx: 11, gy: 16 }],
  },
  rs: {
    regions: [
      { gx: 11, gy: 4 },
      { gx: 10, gy: 5, gw: 2 },
      { gx: 9, gy: 6, gw: 3, gh: 5 },
    ],
    circles: [
      { gx: 11, gy: 5 },
      { gx: 9, gy: 7 },
    ],
    squares: [],
  },
  rt: {
    regions: [
      { gx: 11, gy: 2 },
      { gx: 10, gy: 3, gw: 2 },
      { gx: 9, gy: 4, gw: 3 },
      { gx: 8, gy: 5, gw: 4, gh: 3 },
    ],
    circles: [
      { gx: 11, gy: 3 },
      { gx: 9, gy: 5 },
    ],
    squares: [{ gx: 11, gy: 7 }],
  },
  rd1: {
    regions: [
      { gx: 11, gy: 2 },
      { gx: 10, gy: 3, gw: 2 },
      { gx: 9, gy: 4, gw: 3 },
      { gx: 8, gy: 5, gw: 4, gh: 3 },
    ],
    circles: [
      { gx: 11, gy: 3 },
      { gx: 9, gy: 5 },
    ],
    squares: [{ gx: 11, gy: 7 }],
  },
  rd2: {
    regions: [
      { gx: 11, gy: 2 },
      { gx: 10, gy: 3, gw: 2 },
      { gx: 9, gy: 4, gw: 3 },
      { gx: 8, gy: 5, gw: 4, gh: 2 },
    ],
    circles: [
      { gx: 11, gy: 3 },
      { gx: 9, gy: 5 },
    ],
    squares: [{ gx: 11, gy: 6 }],
  },
};

const BANDS = Object.keys(FIELD) as GridBand[];

/* CTA mounts switch button sizes by responsive band. */

function CtaRow({ size }: { size: "sm" | "md" | "lg" }) {
  return (
    <span className={`wkh-cta-row wkh-cta-${size}`}>
      <ButtonFill size={size} chrome="teal" href={GET_STARTED_HREF}>
        Get Started
      </ButtonFill>
      {size === "lg" && <span className="wkh-q">Got a question?</span>}
      <ButtonGhost size={size} color="brown" icon={<IconChat />} action="open-chat">
        Talk to us
      </ButtonGhost>
    </span>
  );
}

export function WorkHeaderSection() {
  return (
    <section className="sec work-header-section">
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
          ...(FIELD[band].fillCircles ?? []).map((o) => (
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

      {/* Header elements share the page entrance sequence. */}
      <header className="wkh" data-landmark="head">
        <p className="wkh-slug hx-rise">
          <i className="wkh-slug-dot" aria-hidden="true" />
          Our Work
        </p>
        <h1 className="wkh-h1 hx-rise">
          Beautiful websites, ads, social, and content that grow your business.
        </h1>
        <p className="wkh-subhead hx-rise">
          Designed to convert and built to rank, your website is the foundation
          for a system powered by five interconnected engines that drive your
          marketing.
        </p>
        <div className="wkh-cta hx-rise" data-landmark="cta">
          <CtaRow size="sm" />
          <CtaRow size="md" />
          <CtaRow size="lg" />
        </div>
      </header>
    </section>
  );
}
