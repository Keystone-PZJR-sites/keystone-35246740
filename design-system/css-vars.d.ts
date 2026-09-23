/** Inline `style` may carry CSS custom properties (`--n`, `--i`, a hue).
 * React's types stop at standard properties; this lets `style={{ "--n": 3 }}`
 * type-check without a cast. */
import "react";

declare module "react" {
  interface CSSProperties {
    [property: `--${string}`]: string | number | undefined;
  }
}
