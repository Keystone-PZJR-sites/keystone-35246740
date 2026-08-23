/** v2 media registry — the single source of truth for new-brand asset
 * paths. Code never hardcodes an asset path; it references an entry here.
 * Source files: brand-id 2.0 logo set (copied 2026-08-22, verified as
 * flattened multi-path exports). Intrinsic sizes come from each SVG
 * viewBox. */

export interface MediaAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export const MEDIA_V2 = {
  brand: {
    /** Logomark + wordmark side by side. */
    lockup: {
      src: "/media/brand/ks-lockup.svg",
      width: 380,
      height: 61,
      alt: "Keystone",
    },
    /** The mark alone. */
    logomark: {
      src: "/media/brand/ks-logomark.svg",
      width: 66,
      height: 66,
      alt: "Keystone",
    },
    /** The wordmark alone. */
    wordmark: {
      src: "/media/brand/ks-wordmark.svg",
      width: 316,
      height: 72,
      alt: "Keystone",
    },
  },
} as const satisfies Record<string, Record<string, MediaAsset>>;
