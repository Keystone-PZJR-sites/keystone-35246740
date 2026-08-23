/** v2 grid — exposure-region vocabulary (spec 002, GRID-SPEC.md v5 §4).
 *
 * A region's interior lattice is (gw−1) vertical and (gh−1) horizontal
 * real 1px elements at k·t offsets. v5's reference implementation injects
 * them with a DOM script; here the component renders the same elements
 * from its props — the DOM is identical, but it is computed at render
 * time, so the lattice is correct before hydration, needs no client
 * JavaScript, and is idempotent under Strict Mode and HMR by construction.
 *
 * All components are server-safe. Geometry props are ticks (half-ticks
 * legal); `gy` is section-local (v5 §4). `band` gates visibility: rm
 * (base < 576) · rs · rt · rd1 · rd2.
 */

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

/** Solid (filled) cell or block. */
export function GridFill({ band, gx, gy, gw, gh }: RegionGeometry) {
  return <div className={`grid-fill ${band}`} style={geometryStyle({ gx, gy, gw, gh })} />;
}

/** Standalone outlined cell or block. */
export function GridCellX({ band, gx, gy, gw, gh }: RegionGeometry) {
  return <div className={`grid-cellx ${band}`} style={geometryStyle({ gx, gy, gw, gh })} />;
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
