/** The price list (Usage price list · r5, 1184:51216): seven
 * categories of jobs, each with what drives its cost and its typical
 * range in dollars. Credits are explained once, in the header. The
 * header's chips and the table read the same list, so a category is
 * named once. */

import type { Hue } from "@keystone-sites/marketing-design-system/primitives/status";

export interface PriceListJob {
  name: string;
  driver: string;
  price: string;
}

export interface PriceListCategory {
  id: string;
  name: string;
  hue: Hue;
  jobs: PriceListJob[];
}

export const PRICE_LIST_TABLE_LABELS = {
  job: "Job",
  jobSub: "What drives the cost",
  price: "Price range",
  /** "5 jobs", "1 job". */
  count: (n: number) => (n === 1 ? "1 job" : `${n} jobs`),
} as const;

export const PRICE_LIST_CATEGORIES: PriceListCategory[] = [
  {
    id: "website",
    name: "Website",
    hue: "teal",
    jobs: [
      {
        name: "Website update",
        driver: "Number of pages touched.",
        price: "$0.50–$5",
      },
      {
        name: "New website page",
        driver: "Page length, whether new photos are needed.",
        price: "$5–$25",
      },
      {
        name: "Campaign landing pages (set)",
        driver: "How many versions are in the set.",
        price: "$5–$25",
      },
      {
        name: "Website rebuild",
        driver: "Number of pages, complexity of integrations, number of revisions.",
        price: "$100–$200",
      },
      {
        name: "Website grader scan",
        driver: "Number of pages scanned.",
        price: "$2.50–$5",
      },
    ],
  },
  {
    id: "content",
    name: "Content",
    hue: "yellow",
    jobs: [
      {
        name: "Short post drafting and editing (~600 words)",
        driver: "Research depth, number of images, rounds of edits.",
        price: "$2–$4",
      },
      {
        name: "Blog post drafting and editing (~1,200 words)",
        driver: "Research depth, number of images, rounds of edits.",
        price: "$5–$10",
      },
      {
        name: "Long-form guide research and writing",
        driver: "Length, number of sections, how much data your Growth Partner gathers.",
        price: "$15–$50",
      },
      {
        name: "Old post refresh and re-edit",
        driver: "How much of the post your Growth Partner rewrites.",
        price: "$1–$3",
      },
    ],
  },
  {
    id: "social",
    name: "Social",
    hue: "orange",
    jobs: [
      {
        name: "Text post writing and scheduling",
        driver: "Number of platforms it goes to.",
        price: "$0.50–$2.50",
      },
      {
        name: "Image post creation and editing",
        driver: "Number of images, rounds of revisions.",
        price: "$2.50–$7.50",
      },
      {
        name: "A month of posts, planned and scheduled",
        driver: "How often you post, the mix of formats your Growth Partner plans.",
        price: "$75–$150",
      },
    ],
  },
  {
    id: "ads",
    name: "Ads",
    hue: "pink",
    jobs: [
      {
        name: "Campaign strategy and build",
        driver: "Number of platforms and audiences your Growth Partner sets up.",
        price: "$50–$250",
      },
      {
        name: "New ad writing and design",
        driver: "Format, number of versions.",
        price: "$5–$10",
      },
      {
        name: "Ad management and optimization, per month",
        driver: "Number of campaigns, how often your Growth Partner shifts budgets.",
        price: "$100–$250",
      },
    ],
  },
  {
    id: "listings",
    name: "Listings & Reviews",
    hue: "green",
    jobs: [
      {
        name: "Profile upkeep, per location per month",
        driver: "How often your details change.",
        price: "$5–$10",
      },
      {
        name: "Review request",
        driver: "Sent by text after the visit.",
        price: "$0.20–$0.50",
      },
      {
        name: "Review reply",
        driver: "Length and sensitivity of the reply.",
        price: "$0.10–$0.30",
      },
    ],
  },
  {
    id: "contacts",
    name: "Contacts & Conversations",
    hue: "blue",
    jobs: [
      {
        name: "Phone call",
        driver: "Call length, whether a booking is made.",
        price: "$0.25–$1",
      },
      {
        name: "Text reply or follow-up",
        driver: "Thread length, whether photos are involved.",
        price: "$0.10–$0.50",
      },
      {
        name: "Web chat",
        driver: "Length of the conversation.",
        price: "$0.05–$0.10",
      },
      {
        name: "Sorting who’s ready to book, per customer",
        driver: "How much history there is to read.",
        price: "$0.05–$0.10",
      },
    ],
  },
  {
    id: "growth-partner",
    name: "Your Growth Partner",
    hue: "purple",
    jobs: [
      {
        name: "Strategy session",
        driver: "$25 an hour.",
        price: "$25–$75",
      },
    ],
  },
];
