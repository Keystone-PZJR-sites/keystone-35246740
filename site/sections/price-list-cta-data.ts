/** Price list closing row (cta 1184:51962): the actions and the
 * range caveat beside them. */

import { SITE_LINKS } from "@keystone-sites/marketing-design-system/site-links";

export const PRICE_LIST_CTA = {
  start: { label: "Start today", href: `${SITE_LINKS.pricing}#plans` },
  question: "Got a question?",
  chat: "Talk to us",
  note: "Prices are typical ranges and move with the factors listed.",
} as const;
