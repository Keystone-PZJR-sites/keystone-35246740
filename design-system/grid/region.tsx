/** Server-safe exposure regions. Real 1px lattice lines render before
 * hydration. Geometry uses ticks; `gy` counts rows from the section top,
 * `gyb` counts rows from the section bottom, and `band` gates
 * visibility. A region with both edges stretches between them so the
 * exposure follows a flow section that grows with its copy. */

import type { CSSProperties } from "react";

export type GridBand = "rm" | "rs" | "rt" | "rd1" | "rd2";

/* Interior rows drawn past a stretched region's designed rows; the
   region clips whatever its grown height does not reach. */
const STRETCH_SLACK_ROWS = 16;

interface RegionGeometry {
  band: GridBand;
  gx: number;
  /** Rows from the section top to the region's top edge. */
  gy?: number;
  /** Rows from the section bottom to the region's bottom edge. */
  gyb?: number;
  gw?: number;
  /** Designed rows; a stretched region uses it only for its line count. */
  gh?: number;
}

interface GridRegionProps extends RegionGeometry {
  className?: string;
}

type Anchor = "top" | "bottom" | "stretch";

function anchorOf(gy: number | undefined, gyb: number | undefined): Anchor {
  if (gy !== undefined && gyb !== undefined) return "stretch";
  if (gyb !== undefined) return "bottom";
  return "top";
}

const ANCHOR_CLASS: Record<Anchor, string> = { top: "", bottom: " gb", stretch: " gs" };

function geometryStyle({ gx, gy, gyb, gw, gh }: Omit<RegionGeometry, "band">): CSSProperties {
  return {
    "--gx": gx,
    ...(gy !== undefined && { "--gy": gy }),
    ...(gyb !== undefined && { "--gyb": gyb }),
    ...(gw !== undefined && { "--gw": gw }),
    ...(gh !== undefined && { "--gh": gh }),
  } as CSSProperties;
}

/** Exposure region: bordered rectangle plus its interior lattice lines. */
export function GridRegion({
  band,
  gx,
  gy,
  gyb,
  gw = 1,
  gh = 1,
  className,
}: GridRegionProps) {
  const anchor = anchorOf(gy, gyb);
  const rows = anchor === "stretch" ? gh + STRETCH_SLACK_ROWS : gh;
  const lines = [];
  for (let n = 1; n < gw; n++) {
    lines.push(<i key={`v${n}`} className="v" style={{ "--n": n } as CSSProperties} />);
  }
  for (let n = 1; n < rows; n++) {
    lines.push(<i key={`h${n}`} className="h" style={{ "--n": n } as CSSProperties} />);
  }
  const geometry =
    anchor === "stretch"
      ? { gx, gy, gyb, gw }
      : anchor === "bottom"
        ? { gx, gyb, gw, gh }
        : { gx, gy: gy ?? 0, gw, gh };
  return (
    <div
      className={`grid-region ${band}${ANCHOR_CLASS[anchor]}${className ? ` ${className}` : ""}`}
      style={geometryStyle(geometry)}
    >
      {lines}
    </div>
  );
}

/** Ornament cell: hosts decoration between lattice and content. Set
 * `gy` to count from the section top or `gyb` from its bottom. */
export function GridDecor({
  band,
  gx,
  gy,
  gyb,
  children,
}: Pick<RegionGeometry, "band" | "gx" | "gy" | "gyb"> & { children?: React.ReactNode }) {
  const fromBottom = gyb !== undefined;
  return (
    <div
      className={`decor ${band}${fromBottom ? " gb" : ""}`}
      style={geometryStyle(fromBottom ? { gx, gyb } : { gx, gy: gy ?? 0 })}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
