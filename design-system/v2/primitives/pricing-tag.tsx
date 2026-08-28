/** v2 primitives — PricingTag (spec 012 §5.1, set 615:25357). The
 * neutral service chip the persona cards mount: bg/100 fill, text/400
 * ink, radius-xs, sizes xs · md · lg · xl (the set carries no sm — the
 * sm card mounts xs chips, the file's own choice).
 *
 * Sizing is var-driven (--ptag-*, persona-card.css): an unsized tag
 * takes its numbers from its mount, so one DOM instance rides the
 * section's band restatements. The `size` prop renders a designed size
 * statically for the /primitives catalog; `muted` renders the inactive
 * dressing (bg/300 / bg/600) statically — real cards drive it from the
 * card state. */

import type { ReactNode } from "react";

type PricingTagSize = "xs" | "md" | "lg" | "xl";

interface PricingTagProps {
  /** Designed-size render for the /primitives catalog only; section
   * mounts leave it unset and ride the band vars. */
  size?: PricingTagSize;
  /** Static inactive dressing for the catalog only. */
  muted?: boolean;
  children: ReactNode;
}

export function PricingTag({ size, muted, children }: PricingTagProps) {
  return (
    <span className="ptag" data-size={size} data-muted={muted ? "" : undefined}>
      {children}
    </span>
  );
}
