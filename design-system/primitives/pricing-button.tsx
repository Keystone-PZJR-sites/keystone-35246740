/** Its clipped decorative lattice scales with the selected size. `size`
 * sets `--pbtn-size`; `"inherit"` lets the mount set it per band, so one
 * button serves every width. */

import type { CSSProperties, ReactNode } from "react";
import { IconArrowRight } from "../icons";
import { EXTERNAL_LINK } from "../site-links";

type PricingButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "inherit";

interface PricingButtonProps {
  size?: PricingButtonSize;
  /** Navigation destination. */
  href: string;
  /** Open in a new tab (external destinations). */
  external?: boolean;
  forceState?: "hover" | "focus";
  children: ReactNode;
}

/** The union of the two lattices. xs shows the field (three lines, one
 * rule, a fixed circle); every other size shows the row (four lines, a
 * circle that slides one cell on hover). CSS hides the other's parts. */
function Lattice() {
  return (
    <span className="pbtn-lattice" aria-hidden="true">
      {[1, 2, 3, 4].map((n) => (
        <i key={n} className={`v v${n}`} style={{ "--n": n } as CSSProperties} />
      ))}
      <i className="h" style={{ "--n": 1 } as CSSProperties} />
      <i className="c cf" style={{ "--cx": 0, "--cy": 1, "--dx": 0 } as CSSProperties} />
      <i className="c cr" style={{ "--cx": 1, "--cy": 0, "--dx": 1 } as CSSProperties} />
    </span>
  );
}

export function PricingButton({
  size = "md",
  href,
  external = false,
  forceState,
  children,
}: PricingButtonProps) {
  return (
    <a
      className="pbtn"
      data-size={size === "inherit" ? undefined : size}
      data-state={forceState}
      href={href}
      {...(external ? EXTERNAL_LINK : {})}
    >
      <span className="type pbtn-box">
        <span className="pbtn-label">{children}</span>
        <span className="pbtn-chip">
          <IconArrowRight />
        </span>
        <Lattice />
      </span>
    </a>
  );
}
