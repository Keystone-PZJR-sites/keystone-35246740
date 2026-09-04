/** v2 grid — the wide-viewport side fields (spec 002.r2 §4).
 *
 * Above a 1344 container the tick caps at the rd2 anchor and the page
 * box centers (§2/§3); this layer paints the freed gutters as a full
 * lattice field, top-to-bottom on both sides, sparsely ornamented.
 *
 * Construction (§4.1): one absolute layer spanning the full container
 * behind the page (`.gfield`, display-gated at 1345, overflow-clipped
 * so outer columns cut mid-cell at the container edge), holding two
 * strips whose inner borders coincide with the page's col-0/col-12
 * hairlines (one geometry, line-inclusive). Interior lines are the
 * region mechanic verbatim — real 1px elements at k·t offsets, so the
 * field rows sit in global page phase (drawers grow by whole ticks,
 * 013 §7.2, so the phase holds in every rest state; the strips stretch
 * with the page and the slack rows unclip).
 *
 * The field deliberately carries its OWN class vocabulary (`.gf-strip`,
 * `.gf-cell`) rather than `.grid-region`/`.decor`: the load
 * choreographies animate those classes page-wide (the 006 lattice
 * sweep, the cold-load guard), and the field never animates (§4.2 —
 * owner ruling "nothing now"). Distinct classes make that true by
 * construction — no selector can catch it, and the clearance audit's
 * exposure set never collects it.
 *
 * Server component, zero islands; population is the deterministic
 * field-hash, identical across renders.
 */

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

/** Mounted by every `.page` composition as the layer before its
 * sections (002.r2 §4.3). */
export function GridField() {
  return (
    <div className="gfield" aria-hidden="true">
      <Strip side={1} />
      <Strip side={2} />
    </div>
  );
}
