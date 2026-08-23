import dynamic from "next/dynamic";
import {
  GridRegion,
  GridCellX,
  GridDecor,
  type GridBand,
} from "@/design-system/v2/grid/region";
import { BANDS, FIXTURES, type Fixture } from "./fixtures";

/** /grid — fixture page (spec 002 §3). Two fixture sections transcribed
 * from the anchor frames (fixtures.ts): together they exercise every v5
 * mechanic — full cell field, interior ornament hole, edge-void
 * decomposition, and a scroll strip with compensated gaps. The page
 * contains nothing else in flow, so the stack sum is exactly the designed
 * tick total per band.
 *
 * The debug overlay and self-test readout ship in dev only; the constant
 * condition below is inlined at build time, so the devtools chunk never
 * reaches the production bundle. */
const GridDevtools =
  process.env.NODE_ENV !== "production"
    ? dynamic(() => import("./grid-devtools"))
    : () => null;

function FixtureOverlay({ fixture }: { fixture: Fixture }) {
  return (
    <div className="gx" aria-hidden="true">
      {BANDS.map((band) => {
        const map = fixture.maps[band];
        return [
          ...map.regions.map((r, i) => (
            <GridRegion key={`${band}-r${i}`} band={band as GridBand} {...r} />
          )),
          ...(map.decors ?? []).flatMap((d, i) => [
            ...(d.cell
              ? [<GridCellX key={`${band}-dc${i}`} band={band as GridBand} gx={d.gx} gy={d.gy} />]
              : []),
            <GridDecor key={`${band}-d${i}`} band={band as GridBand} gx={d.gx} gy={d.gy}>
              <span>{d.dir === "back" ? "\u2190" : "\u2192"}</span>
            </GridDecor>,
          ]),
        ];
      })}
    </div>
  );
}

const [GALLERY, FOOTER] = FIXTURES;

export default function GridHarnessPage() {
  return (
    <div className="page">
      <section className="sec fx-gallery" data-fixture="gallery" data-landmark="sec">
        <FixtureOverlay fixture={GALLERY} />
        <div className="hscroll fx-strip" data-landmark="strip">
          <div className="strip">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="fx-card" data-landmark="card">
                <span>card {n}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec fx-footer" data-fixture="footer" data-landmark="sec">
        <FixtureOverlay fixture={FOOTER} />
      </section>

      <GridDevtools />
    </div>
  );
}
