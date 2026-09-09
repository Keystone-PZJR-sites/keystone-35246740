import { GRADER_URL } from "./lib/grader";

export const SITE_LINKS = {
  home: "/",
  approach: "/#system",
  solutions: "/#engine-brand",
  grader: GRADER_URL,
  ourWork: "/our-work",
  caseStudies: "/case-studies",
  pricing: "/pricing",
  /* Temporary: the company page is not ready yet. */
  company: "/",
  resources: "/blog",
  blog: "/blog",
  marketingReport: "/marketing-report",
  about: "/about",
  leadership: "/about/team",
  careers: "/about/careers",
  terms: "/terms",
  privacy: "/privacy",
  accessibility: "/accessibility",
  login: "https://console.localkeystone.com/login",
  spotify: "https://open.spotify.com/show/41MuXEI3TIvCAQW20Ko9cX",
  applePodcasts: "https://podcasts.apple.com/us/podcast/made-locally/id1895736090",
} as const;
