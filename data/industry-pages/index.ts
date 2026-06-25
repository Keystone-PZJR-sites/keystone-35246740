// Registry of industry landing pages (spec 050), keyed by slug. These are the
// industry-specific positioning pages used primarily as paid-ad landing targets
// (and for organic discovery via the Solutions nav). The `/industries/[slug]`
// route renders each entry; add an industry by listing it here.
//
// Scaffold stage: only routing + metadata are defined. The per-industry
// positioning/messaging body is intentionally left blank for now — pages render
// the shared nav + footer with a placeholder hero until the copy is authored.

export interface IndustryPageContent {
  /** URL slug — the ad landing path is `/industries/<slug>`. */
  slug: string;
  /** Label used in the Solutions "By industry" nav column. */
  navLabel: string;
  /** Page H1 (placeholder = the industry name until positioning copy lands). */
  title: string;
  /** Small uppercase label above the title. */
  eyebrow: string;
  /** <title> tag. */
  metaTitle: string;
  /** Meta description. */
  metaDescription: string;
}

const ALL: IndustryPageContent[] = [
  {
    slug: 'health-wellness',
    navLabel: 'Health & Wellness',
    title: 'Health & Wellness',
    eyebrow: 'Industries',
    metaTitle: 'Health & Wellness | Keystone',
    metaDescription:
      'Keystone is the all-in-one sales and marketing system for health and wellness businesses.',
  },
  {
    slug: 'home-services',
    navLabel: 'Home Services',
    title: 'Home Services',
    eyebrow: 'Industries',
    metaTitle: 'Home Services | Keystone',
    metaDescription:
      'Keystone is the all-in-one sales and marketing system for home services businesses.',
  },
  {
    slug: 'small-business',
    navLabel: 'Small Business',
    title: 'Small Business',
    eyebrow: 'Industries',
    metaTitle: 'Small Business | Keystone',
    metaDescription:
      'Keystone is the all-in-one sales and marketing system for small businesses.',
  },
];

/** All authored industry pages, keyed by slug. */
export const INDUSTRY_PAGES: Record<string, IndustryPageContent> = Object.fromEntries(
  ALL.map((page) => [page.slug, page]),
);

export function getIndustryPage(slug: string): IndustryPageContent | undefined {
  return INDUSTRY_PAGES[slug];
}
