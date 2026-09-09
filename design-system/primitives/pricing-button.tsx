/** Its clipped decorative lattice scales with the selected size. */

import type { CSSProperties, ReactNode } from "react";
import { IconArrowRight } from "../icons";
import { EXTERNAL_LINK } from "../site-links";

type PricingButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface PricingButtonProps {
  size?: PricingButtonSize;
  /** Navigation destination. */
  href: string;
  /** Open in a new tab (external destinations). */
  external?: boolean;
  forceState?: "hover" | "focus";
  children: ReactNode;
}

/** Row circles slide one cell on hover; the xs field circle stays fixed. */
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
      data-size={size}
      data-state={forceState}
      href={href}
      {...(external ? EXTERNAL_LINK : {})}
    >
      <span className="pbtn-label">{children}</span>
      <span className="pbtn-chip">
        <IconArrowRight />
      </span>
      <Lattice size={size} />
    </a>
  );
}
