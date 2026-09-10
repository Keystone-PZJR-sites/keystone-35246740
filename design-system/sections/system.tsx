import type { CSSProperties } from "react";
import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { Slug } from "../primitives/slug";
import { InterpText } from "../primitives/text";
import { IconSystemIntersect } from "../icons";
import { NoiseDuo } from "../lib/noise";
import { SystemBloom } from "./system-bloom";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

interface R {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}
interface BandMap {
  regions: R[];
  fills: { gx: number; gy: number }[];
}

const MAP_384: BandMap = {
  regions: [
    { gx: 11, gy: 0, gh: 8 },
    { gx: 0, gy: 8, gw: 12, gh: 11 },
  ],
  fills: [{ gx: 11, gy: 0 }],
};

const MAP_768: BandMap = {
  regions: [
    { gx: 10, gy: 0, gw: 2, gh: 5 },
    { gx: 0, gy: 5, gw: 12, gh: 7 },
  ],
  fills: [],
};

const MAP_1344: BandMap = {
  regions: [{ gx: 7, gy: 0, gw: 5, gh: 6 }],
  fills: [],
};

const SECTION_MAP: Record<GridBand, BandMap> = {
  rm: MAP_384,
  rs: MAP_384,
  rt: MAP_768,
  rd1: MAP_1344,
  rd2: MAP_1344,
};

/** Petal diameter as a fraction of ring diameter. */
const PETAL_D = 0.3542;

interface Engine {
  id: string;
  label: string;
  /** Petal center relative to the ring center. */
  x: number;
  y: number;
}

const ENGINES: Engine[] = [
  { id: "brand", label: "Brand", x: -0.08244, y: 0.113988 },
  { id: "visibility", label: "Visibility", x: -0.136012, y: -0.044643 },
  { id: "ads", label: "Ads", x: -0.003571, y: -0.14375 },
  { id: "reception", label: "Reception", x: 0.132738, y: -0.048214 },
  { id: "engagement", label: "Engagement", x: 0.083929, y: 0.111012 },
];

export function SystemSection() {
  return (
    <section
      className="sec system-section bloom-sequence"
      id="system"
      aria-label="A complete marketing system"
      data-landmark="system"
    >
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) => [
          ...SECTION_MAP[band].regions.map((r, i) => (
            <GridRegion key={`${band}-r${i}`} band={band} {...r} />
          )),
          ...SECTION_MAP[band].fills.map((f) => (
            <GridDecor key={`${band}-f${f.gx}-${f.gy}`} band={band} gx={f.gx} gy={f.gy}>
              <span className="f-cell fill" />
            </GridDecor>
          )),
        ])}
      </div>

      <div className="sys-head">
        <Slug layout="rail">A complete marketing system</Slug>
        <InterpText as="h2" style="display-serif-xs-extralight" className="sys-h2">
          Five engines that deeply understand your business working together.
        </InterpText>
      </div>

      {/* The decorative diagram's labels are repeated for assistive technology. */}
      <p className="hx-sr">
        Five engines working together:{" "}
        {ENGINES.slice(0, -1)
          .map((e) => e.label)
          .join(", ")}
        , and {ENGINES[ENGINES.length - 1].label}.
      </p>

      <div className="sys-diagram" aria-hidden="true">
        <div className="sys-stage" style={{ "--sys-petal-d": PETAL_D } as CSSProperties}>
          <div className="sys-ring">
            {ENGINES.map((e, i) => (
              <span
                key={e.id}
                className="sys-petal"
                data-engine={e.id}
                style={{ "--px": e.x, "--py": e.y, "--_bi": i } as CSSProperties}
              />
            ))}
            <NoiseDuo
              className="sys-grain"
              density={0.7}
              darkAlpha={0.1}
              lightAlpha={0.1}
              clip={ENGINES.map((e) => (
                <circle key={e.id} cx={0.5 + e.x} cy={0.5 + e.y} r={PETAL_D / 2} />
              ))}
            />
            <span className="sys-mark">
              <IconSystemIntersect />
            </span>
          </div>
          {ENGINES.map((e, i) => (
            <span
              key={e.id}
              className="sys-tag"
              data-engine={e.id}
              style={{ "--_bi": i } as CSSProperties}
            >
              <InterpText as="span" style="text-xs-regular" className="sys-tag-label">
                {e.label}
              </InterpText>
            </span>
          ))}
        </div>
      </div>

      <SystemBloom />
    </section>
  );
}
