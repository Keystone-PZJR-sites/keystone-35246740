import { SpotlightCard } from '@/design-system/components/SpotlightCard';

export interface QuoteTile {
  id: string;
  /** Short quote. */
  quote: string;
  name: string;
  /** Attribution line after the name — a role, a team, or a firm. */
  role: string;
  /**
   * Optional portrait. When present the tile becomes a full-bleed photo with the
   * quote overlaid; otherwise it is a flat cream text tile.
   */
  image?: string;
}

export interface QuoteWallProps {
  quotes: QuoteTile[];
  /** Accessible name for the grid region. */
  ariaLabel?: string;
}

/**
 * A quote wall: a tight masonry of quote tiles that packs the full width with no
 * empty cells. Tiles come in two flat variants — a full-bleed photo with the
 * quote overlaid (when a portrait is supplied) and a flat cream text tile
 * (otherwise). Composed from SpotlightCard. Serves both the careers culture
 * quotes and leadership investor quotes. See spec 045 (refresh of spec 042's
 * card-grid wall).
 */
export function QuoteWall({ quotes, ariaLabel }: QuoteWallProps) {
  return (
    <div
      className="ks-quote-wall"
      role={ariaLabel ? 'group' : undefined}
      aria-label={ariaLabel}
    >
      {quotes.map((tile) => (
        <div key={tile.id} className="ks-quote-wall__item">
          {tile.image ? (
            <SpotlightCard
              background={{ kind: 'image', src: tile.image }}
              title={`“${tile.quote}”`}
              titleSize="sm"
              titleWeight="regular"
              caption={`${tile.name} · ${tile.role}`}
              className="ks-quote ks-quote--photo"
            />
          ) : (
            <SpotlightCard
              background={{ kind: 'solid', tone: 'cream' }}
              title={`“${tile.quote}”`}
              titleSize="sm"
              titleWeight="regular"
              caption={`${tile.name} · ${tile.role}`}
              className="ks-quote ks-quote--text"
            />
          )}
        </div>
      ))}
    </div>
  );
}
