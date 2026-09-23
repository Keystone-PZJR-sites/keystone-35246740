/** Art-directed `<picture>` over a `PictureSet` from media.ts: one
 * media-gated `<source>` per tier, the un-gated tier as the `<img>`
 * fallback, intrinsic `width`/`height` on every candidate so layout is
 * primed before the bytes arrive. The owner's CSS sizes and crops it
 * (`.pic` fills its box with `object-fit: cover`). */

import type { PictureSet } from "../media";

interface PictureProps {
  set: PictureSet;
  className?: string;
  /** First-view candidates load eagerly at high priority; the rest lazily. */
  priority?: boolean;
}

export function Picture({ set, className, priority = false }: PictureProps) {
  const sources = set.tiers.filter((tier) => tier.media !== null);
  const fallback = set.tiers.find((tier) => tier.media === null) ?? set.tiers[set.tiers.length - 1];
  return (
    <picture className={className ? `pic ${className}` : "pic"}>
      {sources.map((tier) => (
        <source
          key={tier.src}
          media={tier.media ?? undefined}
          srcSet={tier.src}
          width={tier.width}
          height={tier.height}
        />
      ))}
      <img
        src={fallback.src}
        width={fallback.width}
        height={fallback.height}
        alt={set.alt}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </picture>
  );
}
