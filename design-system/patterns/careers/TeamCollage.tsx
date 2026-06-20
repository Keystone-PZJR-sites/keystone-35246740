import type { ReactNode } from 'react';
import { CardGrid, SpotlightCard } from '@/design-system';

export type CollageTone = 'brand' | 'mint' | 'ink';

export interface CollageTile {
  id: string;
  /** Quiet role label shown on the tile. */
  label: string;
  /** Decorative glyph framed above the label. */
  icon: ReactNode;
  tone: CollageTone;
  /** Optional photo background; falls back to the tone gradient when absent. */
  image?: string;
}

export interface TeamCollageProps {
  tiles: CollageTile[];
}

/**
 * A decorative hero collage: a small grid of tiles, each a role label over a
 * team photo (or a soft gradient fallback) with a person glyph, evoking a
 * diverse team. Hidden from assistive tech — purely illustrative chrome beside
 * the hero copy. Built from the shared card toolkit (CardGrid + SpotlightCard).
 * See spec 041.
 */
export function TeamCollage({ tiles }: TeamCollageProps) {
  return (
    <div className="ks-careers-collage" aria-hidden="true">
      <CardGrid columns={2}>
        {tiles.map((tile) => (
          <SpotlightCard
            key={tile.id}
            background={
              tile.image
                ? { kind: 'image', src: tile.image }
                : { kind: 'gradient', tone: tile.tone }
            }
            aspect={1}
            title={tile.label}
            titleSize="xs"
            titleWeight="regular"
          >
            <span className="ks-careers-collage__glyph">{tile.icon}</span>
          </SpotlightCard>
        ))}
      </CardGrid>
    </div>
  );
}
