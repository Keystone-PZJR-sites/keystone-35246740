/** Wide viewports paint deterministic lattice fields in the side gutters.
 * Their dedicated classes keep page-wide region animations from catching
 * them. Real 1px lines remain in global page phase as the page grows. */

import type { CSSProperties } from "react";
import { FIELD_COLS, FIELD_ROWS, fieldCellClass, type FieldSide } from "./field-hash";

function Strip({ side }: { side: FieldSide }) {
  const lines = [];
  for (let n = 1; n < FIELD_COLS; n++) {
    lines.push(<i key={`v${n}`} className="v" style={{ "--n": n } as CSSProperties} />);
  }
  for (let n = 1; n < FIELD_ROWS; n++) {
    lines.push(<i key={`h${n}`} className="h" style={{ "--n": n } as CSSProperties} />);
  }

  const cells = [];
  for (let col = 1; col <= FIELD_COLS; col++) {
    for (let row = 0; row < FIELD_ROWS; row++) {
      const shape = fieldCellClass(side, col, row);
      if (!shape) continue;
      // strip-local column: outward col 1 is the cell adjacent to the
      // page edge — rightmost in the west strip, leftmost in the east
      const gx = side === 1 ? FIELD_COLS - col : col - 1;
      cells.push(
        <div
          key={`c${col}-${row}`}
          className="gf-cell"
          style={{ "--gx": gx, "--gy": row } as CSSProperties}
        >
          <span className={shape} />
        </div>,
      );
    }
  }

  return (
    <div className={`gf-strip ${side === 1 ? "gf-w" : "gf-e"}`}>
      {lines}
      {cells}
    </div>
  );
}

/** Mounted before each page's sections. */
export function GridField() {
  return (
    <div className="gfield" aria-hidden="true">
      <Strip side={1} />
      <Strip side={2} />
    </div>
  );
}
