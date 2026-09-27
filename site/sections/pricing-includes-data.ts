/** "Every plan includes" (plan-includes, 1129:17126) and the a la carte
 * row beneath it (1129:17127). The two columns are the lg layout; md
 * and sm stack them in order. */

import { SITE_LINKS } from "@keystone-sites/marketing-design-system/site-links";

export type IncludeIcon =
  "logomark" | "website" | "sparkle" | "analytics" | "social" | "aiChat" | "maps" | "listing";

export interface IncludeItem {
  icon: IncludeIcon;
  text: string;
}

export const INCLUDES_HEAD = "Every plan includes";

export const INCLUDES_COLUMNS: [IncludeItem[], IncludeItem[]] = [
  [
    {
      icon: "logomark",
      text: "The Keystone platform, with your business data, leads, conversations, website, social media, maps listings, and blog in one place",
    },
    {
      icon: "website",
      text: "A custom SEO-optimized website with advanced web security, performance tools, and no traffic limits",
    },
    {
      icon: "sparkle",
      text: "An easy-to-use AI website editor that makes changes instantly, in plain language",
    },
    { icon: "analytics", text: "Analytics that track your entire online presence" },
  ],
  [
    {
      icon: "social",
      text: "A social media marketing system to manage and plan Instagram & Facebook posts",
    },
    {
      icon: "aiChat",
      text: "An AI chat agent that answers questions and captures leads from your website",
    },
    { icon: "maps", text: "Google Maps profile management, with easy replies to new reviews" },
    {
      icon: "listing",
      text: "Ad campaigns on Facebook & Instagram, created, published, and monitored for you",
    },
  ],
];

export const INCLUDES_NOTE =
  "Your subscription covers all the work in your plan, with extra credits to try out new features. You can add on additional work at any time.";

/** The price list is not published yet; the link stays stubbed. */
export const A_LA_CARTE = {
  label: "See the à la carte price list",
  href: SITE_LINKS.usagePriceList,
} as const;
