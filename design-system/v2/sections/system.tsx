/** v2 sections — the system section (spec 019). Server component.
 *
 * Five engines that deeply understand your business working together:
 * the header (slug + Kyoto headline) beside a proportional five-petal
 * diagram — one ring, five multiply-blended petal circles, the drawn
 * intersect boolean, the noise-duo grain, and five label chips — all
 * scaling on the ring diameter, so the derived bands (rs from the 384
 * design, rd1 from 1344) reproduce the drawn diagram by construction.
 *
 * Three drawn anchors (384 · 768 · 1344, plan.md three-anchor policy):
 * the rm/rs and rd1/rd2 band pairs share their exposure maps.
 *
 * The server render IS the settled section (§6: no-JS, reduced motion,
 * and a load at or past the trigger all show it); the one client
 * island (SystemBloom) only orchestrates the scroll-armed entrance by
 * flipping the data-bloom attribute — every beat is CSS (system.css).
 *
 * After settle the section is inert (§9 R3): no hover, no links, no
 * idle motion. The diagram subtree is aria-hidden decoration; the five
 * engine names read from the sr-only sentence (§5).
 */

import type { CSSProperties } from "react";
import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { InterpText } from "../primitives/text";
import { IconSystemIntersect } from "../icons";
import { NoiseDuo } from "../lib/noise";
import { SystemBloom } from "./system-bloom";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/* ---- exposure maps (§2 as amended 2026-09-08, §9 R7), section-local
   ticks — read per-cell through the bridge (the 384 map re-read at
   the restructure). 384: the 8-row east rail beside the grown header
   box with the ■[11,0] filled cell (the standing filled-cell
   vocabulary), then the full field rows 8–18 behind the diagram;
   768: the two-column east rail into the full field; 1344: cols 7–11
   painted all six rows, cols 0–6 bare behind the headline. The
   derived bands render their source anchor's map. */

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
  rs: MAP_384, // derived from 384 (§1)
  rt: MAP_768,
  rd1: MAP_1344, // derived from 1344 (§1)
  rd2: MAP_1344,
};

/* ---- the proportional construction (§4): one table, in entrance
   order (Bloom starts at Brand and runs clockwise — §9 R1), carries
   each engine's petal center as ratios of the ring diameter (the §4
   1344 canon over 336; the drawn per-anchor centers land within ±1px
   of these ratios at every anchor). The same table drives the petal
   CSS vars, the grain clip circles, and the sr-only sentence. ---- */

/** petal diameter / ring diameter (§4 — read 0.3542 ±0.05px at all
 * three anchors) */
const PETAL_D = 0.3542;

interface Engine {
  id: string;
  label: string;
  /** petal center, ratios of R from the ring center (§4) */
  x: number;
  y: number;
}

const ENGINES: Engine[] = [
  { id: "brand", label: "Brand", x: -0.08244, y: 0.113988 },
  { id: "visibility", label: "Visibility", x: -0.136012, y: -0.044643 },
  { id: "ads", label: "Ads", x: -0.003571, y: -0.14375 },
  /* the right and bottom-right identities swapped 2026-09-06 (019 §9
     R6 — the labels were the error; positions, colors, and the beat
     order are positional and unchanged) */
  { id: "reception", label: "Reception", x: 0.132738, y: -0.048214 },
  { id: "engagement", label: "Engagement", x: 0.083929, y: 0.111012 },
];

export function SystemSection() {
  return (
    <section
      className="sec v2-system v2-choreo-bloom"
      /* the nav/footer "Our approach" interim anchor (owner direction
         2026-09-08 — §9 R8); scroll-margin in system.css clears the
         fixed rail */
      id="system"
      aria-label="A complete marketing system"
      data-landmark="system"
    >
      {/* the exposure map (§2) — per band; derived bands share maps */}
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

      {/* the header (§3): slug + the one-canon Kyoto headline; the
          headline never animates (§6) */}
      <div className="sys-head">
        <InterpText as="p" style="text-xs-medium" className="sys-slug">
          <span className="sys-marker" aria-hidden="true" />
          <span>A complete marketing system</span>
        </InterpText>
        <InterpText as="h2" style="display-serif-xs-extralight" className="sys-h2">
          Five engines that deeply understand your business working together.
        </InterpText>
      </div>

      {/* the five engine names for the accessibility tree (§5); the
          diagram below is aria-hidden decoration */}
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
            {/* the noise-duo grain (§7 as amended — owner tune
                2026-09-05, §9 B9: density .7, inks at 10%, lighter
                than the file's .8/15%; size stays the file's 0.5).
                The clip circles are the petal cluster in
                objectBoundingBox ratios. */}
            <NoiseDuo
              className="sys-grain"
              density={0.7}
              darkAlpha={0.1}
              lightAlpha={0.1}
              clip={ENGINES.map((e) => (
                <circle key={e.id} cx={0.5 + e.x} cy={0.5 + e.y} r={PETAL_D / 2} />
              ))}
            />
            {/* the intersect mark (§4/§7): the verbatim export, a real
                drawn element — not the accumulated blend */}
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
