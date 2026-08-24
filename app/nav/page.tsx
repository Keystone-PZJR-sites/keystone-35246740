import { GridRegion, type GridBand } from "@/design-system/v2/grid/region";
import { NavChrome } from "@/design-system/v2/sections/nav";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/** A tall lattice fixture: an exposed top row (the row the bar floats
 * over) plus side rails, repeated far enough down to scroll — the
 * fixed/absolute scroll behaviors of §1 are observable against it. */
function Fixture({ rows }: { rows: number }) {
  return (
    <section className="sec nfx" style={{ height: `calc(var(--t) * ${rows})` }}>
      <div className="gx" aria-hidden="true">
        {BANDS.flatMap((band) => [
          <GridRegion key={`${band}-top`} band={band} gx={0} gy={0} gw={12} gh={1} />,
          <GridRegion key={`${band}-l`} band={band} gx={0} gy={1} gw={1} gh={rows - 1} />,
          <GridRegion key={`${band}-r`} band={band} gx={11} gy={1} gw={1} gh={rows - 1} />,
        ])}
      </div>
    </section>
  );
}

export default function NavDevPage() {
  return (
    <div className="page">
      <NavChrome />
      <main>
        <Fixture rows={40} />
      </main>
    </div>
  );
}
