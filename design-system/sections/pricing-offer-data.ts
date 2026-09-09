/** Pricing offer content and checkout destination. */
export const PRICING_CHECKOUT_URL = "https://pay.keystone.app/b/fZucN6fhC7vhe6j5ux0VO02";

export type IncludedIcon =
  | "logomark"
  | "website"
  | "search"
  | "ai-chat"
  | "maps"
  | "reception"
  | "reviews"
  | "tokens";

export interface IncludedItem {
  icon: IncludedIcon;
  text: string;
}

/** Included services in display order. */
export const INCLUDED_ITEMS: IncludedItem[] = [
  {
    icon: "logomark",
    text: "The platform: every contact, every conversation, and control over your site, social, blog, and listings",
  },
  {
    icon: "website",
    text: "A custom website, built for your business, hosted with no traffic limits",
  },
  {
    icon: "search",
    text: "An SEO engine that publishes to your site every week, driven by ongoing keyword research",
  },
  {
    icon: "ai-chat",
    text: "An AI chat agent, running the latest models, that answers questions and captures leads",
  },
  {
    icon: "maps",
    text: "Your Google Maps profile, claimed, optimized, and kept current",
  },
  {
    icon: "reception",
    text: "Automatic follow-up on leads, by text, web, and phone",
  },
  {
    icon: "reviews",
    text: "Rankings, reviews, and traffic monitored continuously",
  },
  {
    icon: "tokens",
    text: "200 credits a month toward blog posts, social posts, and messages",
  },
];
