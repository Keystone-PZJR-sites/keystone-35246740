import { createAnalytics, regionNamed } from "@keystonepzjr/web-product-analytics";

/**
 * The site's product analytics (PostHog, `@keystonepzjr/web-product-analytics`), in the same project
 * as the console's, so a visit and what the visitor goes on to do in Keystone are one person's.
 * It starts in the browser once `AnalyticsConsent` mounts; until then every call does nothing.
 * Next inlines a NEXT_PUBLIC_ variable only where it is read by its full literal name.
 */
export const analytics = createAnalytics({
  app: "marketing_site",
  key: process.env.NEXT_PUBLIC_POSTHOG_KEY || undefined,
  region: regionNamed(process.env.NEXT_PUBLIC_POSTHOG_REGION),
  proxied: true,
  consent: "asked",
  mask: "inputs",
});
