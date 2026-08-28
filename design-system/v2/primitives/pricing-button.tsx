/** v2 primitives — PricingButton (spec 011 §4). A link-only CTA: the
 * price-scale button set 613:20090 (state × size, eight variants).
 * Material per size (heights, pads, chip, lattice cells); the section
 * chooses the size per band and owns each instance's width (the box
 * stretches to its container; at the anchors the container equals the
 * set's designed box). States are CSS-driven; `forceState` renders a
 * non-default state statically for the /primitives QA matrix only.
 *
 * Each size carries its own decorative lattice (§4): xs a 4×2 field of
 * 32px cells anchored top-right with the circle at [0,1]; md/lg/xl a
 * single row of five size-matched cells (64/80/112) with the second a
 * circle — md/lg centered, xl bottom-anchored. The lattice is
 * aria-hidden chrome, clipped by the box, stroke-only (the set's
 * hidden circle fills are invisible leftovers — verified from the
 * nodes 2026-08-27).
 */

import type { CSSProperties, ReactNode } from "react";
import { IconArrowRight } from "../icons";

type PricingButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface PricingButtonProps {
  size?: PricingButtonSize;
  /** The button is a link (spec 011 §8 — both CTAs navigate). */
  href: string;
  forceState?: "hover" | "focus";
  children: ReactNode;
}

/** Lattice cells per size. The sm/md/lg/xl row circle slides one cell
 * right on hover, matching the pricing-card mosaic's cell-slide
 * grammar (§7.2 as amended 2026-08-27); the xs field circle stays. */
function Lattice({ size }: { size: PricingButtonSize }) {
  const isField = size === "xs";
  const vLines = isField ? [1, 2, 3] : [1, 2, 3, 4];
  const hLines = isField ? [1] : [];
  const circle = isField ? { cx: 0, cy: 1, dx: 0 } : { cx: 1, cy: 0, dx: 1 };
  return (
    <span className="pbtn-lattice" aria-hidden="true">
      {vLines.map((n) => (
        <i key={`v${n}`} className="v" style={{ "--n": n } as CSSProperties} />
      ))}
      {hLines.map((n) => (
        <i key={`h${n}`} className="h" style={{ "--n": n } as CSSProperties} />
      ))}
      <i
        className="c"
        style={{ "--cx": circle.cx, "--cy": circle.cy, "--dx": circle.dx } as CSSProperties}
      />
    </span>
  );
}

export function PricingButton({ size = "md", href, forceState, children }: PricingButtonProps) {
  return (
    <a className="pbtn" data-size={size} data-state={forceState} href={href}>
      <span className="pbtn-label">{children}</span>
      <span className="pbtn-chip">
        <IconArrowRight />
      </span>
      <Lattice size={size} />
    </a>
  );
}
