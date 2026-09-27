/** Usage price list closing row (cta 1184:51962): the actions and the
 * two notes beside them. */

import { SITE_LINKS } from "@keystone-sites/marketing-design-system/site-links";

export const USAGE_CTA = {
  start: { label: "Start today", href: `${SITE_LINKS.pricing}#plans` },
  question: "Got a question?",
  chat: "Talk to us",
  note: "Prices are typical ranges and move with the factors listed. Your Growth Partner recommends more work toward your goals, so some months use more.",
  footnote:
    "Review request and strategy session are placeholder prices. Analytics is part of the platform and has no price.",
} as const;
