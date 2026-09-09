/** Unsized tags inherit responsive values from their card mount. */

import type { ReactNode } from "react";

type PricingTagSize = "xs" | "md" | "lg" | "xl";

interface PricingTagProps {
  /** Optional fixed design size; section mounts leave this unset. */
  size?: PricingTagSize;
  /** Applies inactive dressing. */
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
