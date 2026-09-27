/** Authored copy for the /company page sections. Source: the v3 about
 * content outline (docs/v1-about-content.md lineage); the careers band
 * is placeholder copy pending a real careers page. */

export const COMPANY_META = {
  title: "About | Keystone",
  description:
    "Keystone exists so great local businesses get found. Meet the team and investors behind it.",
} as const;

export const COMPANY_HERO = {
  eyebrow: "About Keystone",
  title: "Great businesses deserve to be found.",
} as const;

export const COMPANY_STORY = {
  eyebrow: "Why we built Keystone",
  title: "Worth crossing town for.",
  paragraphs: [
    "Before Keystone, our founding team spent years alongside local operators, building sites, running campaigns, and chasing leads with them. We saw the same thing everywhere: businesses full of craft and care were often nearly invisible to the people who would love them because the system was stacked against them.",
    "Keystone exists because those businesses deserve to be found.",
  ],
} as const;

export const COMPANY_BACKERS = {
  eyebrow: "Investors",
  title: "Backed by founders and investors behind the last 20 years of software.",
} as const;

export const COMPANY_TEAM = {
  eyebrow: "The Team",
  title: "Built by people who have done the work.",
  description:
    "Operators, marketers, and engineers who have spent their careers building for local businesses.",
} as const;

/** Placeholder until a careers page exists; no roles are listed yet. */
export const COMPANY_CAREERS = {
  eyebrow: "Careers",
  title: "We’re hiring.",
  copy: "Open roles are on the way. If building for local businesses sounds like your kind of work, we’d love to hear from you.",
  ctaLabel: "Get in touch",
} as const;
