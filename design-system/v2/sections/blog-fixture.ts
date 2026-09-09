/** v2 sections — the blog dev fixture (spec 025 §9 R2 R6 / B2).
 * Server-only, DEVELOPMENT-ONLY: `blog-data.ts` dynamically imports
 * this module when the fetch yields nothing in dev (the production
 * API outage class — §9 R2 F8), so the built surfaces render for
 * review without the backend. Production never loads it (the branch
 * gates on NODE_ENV and the import is dynamic).
 *
 * Fourteen pinned posts across the five live tag names (the drawn
 * archetype's shape: a featured, three recent, five full category
 * sections with overlap) plus the §10 starved shapes (a two-post tag
 * never in the top five, long titles/excerpts exercising the drawn
 * clamps). Images are already-committed local assets — never remote,
 * so the hermetic sweep leg keeps its blockRemote posture. */

import type { BlogCardModel } from "./blog-data";

const TAGS = {
  engagement: { name: "Customer Engagement", slug: "customer-engagement" },
  content: { name: "Content Strategy", slug: "content-strategy" },
  business: { name: "Local Business", slug: "local-business" },
  seo: { name: "Local SEO", slug: "local-seo" },
  operations: { name: "Operations", slug: "operations" },
  starved: { name: "Field Notes", slug: "field-notes" },
} as const;

const IMAGES = [
  "/media/case-carousel/case-study-1344-01.webp",
  "/media/case-carousel/case-study-1344-02.webp",
  "/media/case-carousel/case-study-1344-03.webp",
  "/media/work-cascade/work-cascade-1344-01.webp",
  "/media/work-cascade/work-cascade-1344-02.webp",
  "/media/work-cascade/work-cascade-1344-03.webp",
  "/media/work-cascade/work-cascade-1344-04.webp",
  "/media/work-cascade/work-cascade-1344-05.webp",
  "/media/work-cascade/work-cascade-1344-06.webp",
];

interface Seed {
  slug: string;
  title: string;
  description: string;
  minutes: number;
  tags: (keyof typeof TAGS)[];
}

const SEEDS: Seed[] = [
  {
    slug: "boost-customer-engagement-ai-content",
    title: "Boost Customer Engagement with AI-Driven Content",
    description:
      "Discover how AI-driven content can enhance customer engagement and drive growth. Learn strategies for self-care businesses.",
    minutes: 3,
    tags: ["engagement", "content"],
  },
  {
    slug: "mastering-high-converting-call-scripts",
    title: "Mastering High-Converting Call Scripts for Sales",
    description:
      "When it comes to boosting sales and customer engagement, mastering the art of high-converting call scripts is essential.",
    minutes: 3,
    tags: ["engagement"],
  },
  {
    slug: "ai-first-content-strategy-self-care",
    title: "Crafting an AI-First Content Strategy for Self-Care Businesses",
    description:
      "A practical walk through planning, producing, and measuring content when an AI system does the heavy lifting.",
    minutes: 4,
    tags: ["content", "engagement"],
  },
  {
    slug: "google-business-profile-basics",
    title: "Google Business Profile: the Fifteen-Minute Setup That Pays Rent",
    description:
      "The single highest-leverage listing a local business owns, and the fields owners skip that quietly cost them calls.",
    minutes: 5,
    tags: ["seo", "business"],
  },
  {
    slug: "reviews-that-write-themselves",
    title: "Reviews That Write Themselves: Asking Without the Awkward",
    description:
      "Timing, wording, and the two-message cadence that triples review volume without a single discount or bribe.",
    minutes: 4,
    tags: ["engagement", "business"],
  },
  {
    slug: "local-seo-content-calendar",
    title: "A Local SEO Content Calendar You Will Actually Keep",
    description:
      "Twelve months of post ideas keyed to seasons, services, and searches — built once, reused every year.",
    minutes: 6,
    tags: ["seo", "content"],
  },
  {
    slug: "front-desk-operations-playbook",
    title:
      "The Front-Desk Operations Playbook for Studios That Outgrew the Notebook — Scheduling, Intake, and the Handoff",
    description:
      "This deliberately long fixture excerpt exercises the drawn description clamps at every band: it keeps going past the point any card box could hold, so the truncation law — never grow the card, always end with the ellipsis — is visible in review at 384, 768, and 1344 alike.",
    minutes: 8,
    tags: ["operations", "business"],
  },
  {
    slug: "pricing-page-anatomy",
    title: "Pricing-Page Anatomy: What Local Buyers Actually Read",
    description:
      "Heatmaps from forty local-service sites say buyers read three things. Everything else is decoration.",
    minutes: 4,
    tags: ["business", "content"],
  },
  {
    slug: "before-after-photos-that-convert",
    title: "Before-and-After Photos That Convert (and the Consent Form)",
    description:
      "Lighting, framing, and the one-page consent template that keeps your gallery growing and compliant.",
    minutes: 3,
    tags: ["content", "operations"],
  },
  {
    slug: "no-show-rate-fixes",
    title: "Cutting Your No-Show Rate in Half with Two Messages",
    description:
      "The reminder cadence, the deposit question, and when a waitlist beats an overbook.",
    minutes: 4,
    tags: ["operations", "engagement"],
  },
  {
    slug: "service-page-per-neighborhood",
    title: "One Service Page per Neighborhood: Local SEO's Oldest Trick",
    description:
      "Why the boring page wins, what to write when every suburb feels the same, and the thin-content line not to cross.",
    minutes: 5,
    tags: ["seo"],
  },
  {
    slug: "hiring-your-first-front-desk",
    title: "Hiring Your First Front Desk: the Job Post That Filters Itself",
    description:
      "A hiring funnel for owners with no time to interview — and the three questions that predict retention.",
    minutes: 6,
    tags: ["operations", "business"],
  },
  {
    slug: "field-notes-zivel-launch-week",
    title: "Field Notes: a Recovery Studio's Launch Week by the Numbers",
    description:
      "Day-by-day traffic, walk-ins, and the channel that outperformed everything — from a real launch.",
    minutes: 3,
    tags: ["starved", "business"],
  },
  {
    slug: "field-notes-winter-slowdown",
    title: "Field Notes: What the Winter Slowdown Really Costs",
    description:
      "Three studios' January numbers, normalized — and the counter-programming that worked.",
    minutes: 3,
    tags: ["starved", "seo"],
  },
];

/** Newest-first: day steps back from the pin date per seed order. */
const PINNED_EPOCH = Date.parse("2026-09-01T12:00:00Z");
const DAY_MS = 86_400_000;

export const BLOG_FIXTURE: BlogCardModel[] = SEEDS.map((seed, i) => ({
  slug: seed.slug,
  title: seed.title,
  topic: TAGS[seed.tags[0]].name,
  readMinutes: seed.minutes,
  description: seed.description,
  imageUrl: IMAGES[i % IMAGES.length],
  publishedAt: PINNED_EPOCH - i * DAY_MS,
  tags: seed.tags.map((t) => ({ name: TAGS[t].name, slug: TAGS[t].slug })),
}));
