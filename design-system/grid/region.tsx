/** Server-safe exposure regions. Real 1px lattice lines render before
 * hydration. Geometry uses ticks; `gy` is section-local and `band` gates
 * visibility. */

import type { CSSProperties } from "react";

export type GridBand = "rm" | "rs" | "rt" | "rd1" | "rd2";

interface RegionGeometry {
  band: GridBand;
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}

function geometryStyle({ gx, gy, gw, gh }: Omit<RegionGeometry, "band">): CSSProperties {
  return {
    "--gx": gx,
    "--gy": gy,
    ...(gw !== undefined && { "--gw": gw }),
    ...(gh !== undefined && { "--gh": gh }),
  } as CSSProperties;
}

/** Exposure region: bordered rectangle plus its interior lattice lines. */
export function GridRegion({ band, gx, gy, gw = 1, gh = 1 }: RegionGeometry) {
  const lines = [];
  for (let n = 1; n < gw; n++) {
    lines.push(<i key={`v${n}`} className="v" style={{ "--n": n } as CSSProperties} />);
  }
  for (let n = 1; n < gh; n++) {
    lines.push(<i key={`h${n}`} className="h" style={{ "--n": n } as CSSProperties} />);
  }
  return (
    <div className={`grid-region ${band}`} style={geometryStyle({ gx, gy, gw, gh })}>
      {lines}
    </div>
  );
}

/** Ornament cell: hosts decoration between lattice and content. */
export function GridDecor({
  band,
  gx,
  gy,
  children,
}: Pick<RegionGeometry, "band" | "gx" | "gy"> & { children?: React.ReactNode }) {
  return (
    <div className={`decor ${band}`} style={geometryStyle({ gx, gy })} aria-hidden="true">
      {children}
    </div>
  );
}
