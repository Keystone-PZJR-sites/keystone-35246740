import { GRADER_URL } from "./lib/grader";

/** Spread onto anchors that leave this origin. */
export const EXTERNAL_LINK = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

/** Destinations for nav and footer. Unbuilt pages use `#` so we never
 * ship a 404 from chrome. */
export const SITE_LINKS = {
  home: "/",
  approach: "/#system",
  solutions: "/#engine-brand",
  grader: GRADER_URL,
  ourWork: "/our-work",
  caseStudies: "#",
  pricing: "/pricing",
  company: "#",
  resources: "/blog",
  blog: "/blog",
  marketingReport: "#",
  about: "#",
  leadership: "#",
  careers: "#",
  terms: "/terms",
  privacy: "/privacy",
  accessibility: "/accessibility",
  login: "https://console.localkeystone.com/login",
  spotify: "https://open.spotify.com/show/41MuXEI3TIvCAQW20Ko9cX",
  applePodcasts: "https://podcasts.apple.com/us/podcast/made-locally/id1895736090",
} as const;
