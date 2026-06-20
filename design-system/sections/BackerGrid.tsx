import { SpotlightCard } from '@/design-system/components/SpotlightCard';
import { initials } from '@/design-system/lib/photos';

export interface Backer {
  id: string;
  /** Person's name. */
  name: string;
  /** Firm or company they're known for. Optional. */
  firm?: string;
  /** Optional portrait. Falls back to a monogram of initials when absent. */
  image?: string;
}

export interface BackerGridProps {
  backers: Backer[];
  /** Accessible name for the grid region. */
  ariaLabel?: string;
}

/**
 * Investor gallery — a tight grid of square portrait tiles, each captioned with
 * the person's name (and firm when known). Tiles fall back to an initials
 * monogram when no portrait exists. The shared "in good company" / "backed by"
 * block used on both the careers and leadership pages. See spec 041 / 042.
 */
export function BackerGrid({ backers, ariaLabel }: BackerGridProps) {
  return (
    <div
      className="ks-investors"
      role={ariaLabel ? 'group' : undefined}
      aria-label={ariaLabel}
    >
      {backers.map((backer) =>
        backer.image ? (
          <SpotlightCard
            key={backer.id}
            background={{ kind: 'image', src: backer.image }}
            aspect={1}
            title={backer.name}
            titleSize="xs"
            caption={backer.firm}
            className="ks-investor"
          />
        ) : (
          <SpotlightCard
            key={backer.id}
            background={{ kind: 'solid', tone: 'cream' }}
            aspect={1}
            title={backer.name}
            titleSize="xs"
            caption={backer.firm}
            className="ks-investor ks-investor--fallback"
          >
            <span className="ks-backer__monogram" aria-hidden="true">
              {initials(backer.name)}
            </span>
          </SpotlightCard>
        ),
      )}
    </div>
  );
}
