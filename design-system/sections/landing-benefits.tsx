/** Landing benefits: eyebrow, h2, and seated cards — the cards are the
 * grid. Part of the landing kit — see pages/landing.tsx. */

import type { ReactNode } from "react";
import {
  IconAiChat,
  IconMaps,
  IconReception,
  IconReviews,
  IconSearch,
  IconSparkle,
  IconWebsite,
} from "../icons";
import { CloserRow } from "../primitives/closer-row";
import { Slug } from "../primitives/slug";

/** Icons a card may lead with; the map keeps ReactNodes out of data. */
export type LandingIcon =
  "website" | "search" | "maps" | "reviews" | "reception" | "aiChat" | "sparkle";

export interface LandingBenefit {
  id: string;
  icon?: LandingIcon;
  title: string;
  copy: string;
}

export interface LandingBenefitsData {
  eyebrow: string;
  title: string;
  /** Three reads best; the cells seat on the lattice at any count. */
  items: readonly LandingBenefit[];
}

const ICONS: Record<LandingIcon, () => ReactNode> = {
  website: () => <IconWebsite />,
  search: () => <IconSearch />,
  maps: () => <IconMaps />,
  reviews: () => <IconReviews />,
  reception: () => <IconReception />,
  aiChat: () => <IconAiChat />,
  sparkle: () => <IconSparkle />,
};

/* Lattice: seated — stacked 12-wide cells below rt, three 4-column
 * cells from rt, bordered line-inclusively so neighbours share one
 * hairline; then the flow closer. */
export function LandingBenefitsSection({ data }: { data: LandingBenefitsData }) {
  return (
    <section
      className="sec ld-sec ld-benefits"
      aria-label={data.eyebrow}
      data-landmark="ld-benefits"
    >
      <header className="ld-head" data-landmark="head">
        <Slug>{data.eyebrow}</Slug>
        <h2 className="type ts-display-serif-xs-extralight ramp-h2 ld-h2">{data.title}</h2>
      </header>
      <ul className="ld-cards" data-landmark="cards">
        {data.items.map((item) => (
          <li key={item.id} className="ld-card">
            {item.icon && (
              <span className="ld-card-icon" aria-hidden="true">
                {ICONS[item.icon]()}
              </span>
            )}
            <h3 className="type ts-text-lg-medium ld-card-title">{item.title}</h3>
            <p className="type ts-text-md-light ld-card-copy">{item.copy}</p>
          </li>
        ))}
      </ul>
      <CloserRow />
    </section>
  );
}
