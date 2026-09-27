/** "Every plan includes" (plan-details: 1129:17125 · 1170:32612 ·
 * 1170:33518): the includes table, then the credits note with the a la
 * carte link. Unpainted. */

import type { ComponentType } from "react";
import {
  IconAiChat,
  IconAnalytics,
  IconListing,
  IconLogomark,
  IconMaps,
  IconSocial,
  IconSparkle,
  IconWebsite,
} from "@keystone-sites/marketing-design-system/icons";
import { ButtonFill } from "@keystone-sites/marketing-design-system/primitives/buttons";
import {
  A_LA_CARTE,
  INCLUDES_COLUMNS,
  INCLUDES_HEAD,
  INCLUDES_NOTE,
  type IncludeIcon,
  type IncludeItem,
} from "./pricing-includes-data";

const ICONS: Record<IncludeIcon, ComponentType<{ className?: string }>> = {
  logomark: IconLogomark,
  website: IconWebsite,
  sparkle: IconSparkle,
  analytics: IconAnalytics,
  social: IconSocial,
  aiChat: IconAiChat,
  maps: IconMaps,
  listing: IconListing,
};

function Column({ items }: { items: IncludeItem[] }) {
  return (
    <ul className="pinc-col">
      {items.map((item) => {
        const Icon = ICONS[item.icon];
        return (
          <li key={item.text} className="pinc-item" data-icon={item.icon}>
            <span className="pinc-icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="type pinc-text">{item.text}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function PricingIncludesSection() {
  return (
    <section className="sec pinc" data-landmark="includes">
      <div className="pinc-box">
        <h2 className="type pinc-head">{INCLUDES_HEAD}</h2>
        <div className="pinc-cols">
          <Column items={INCLUDES_COLUMNS[0]} />
          <i className="pinc-divider" aria-hidden="true" />
          <Column items={INCLUDES_COLUMNS[1]} />
        </div>
      </div>
      <div className="pinc-row">
        <p className="type pinc-note">{INCLUDES_NOTE}</p>
        <div className="pinc-cta">
          <ButtonFill size="inherit" chrome="gray" href={A_LA_CARTE.href}>
            {A_LA_CARTE.label}
          </ButtonFill>
        </div>
      </div>
    </section>
  );
}
