/** The usage price list (Usage price list · r5, 1184:51216): seven
 * categories of jobs, each with what drives its cost and its typical
 * range in dollars and credits. The header's chips and the table read
 * the same list, so a category is named once. */

import type { Hue } from "@keystone-sites/marketing-design-system/primitives/status";

export interface UsageJob {
  name: string;
  driver: string;
  price: string;
  credits: string;
}

export interface UsageCategory {
  id: string;
  name: string;
  hue: Hue;
  jobs: UsageJob[];
}

export const USAGE_TABLE_LABELS = {
  job: "Job",
  jobSub: "What drives the cost",
  price: "Price range",
  priceSub: "1 credit is 10¢",
  /** "5 jobs", "1 job". */
  count: (n: number) => (n === 1 ? "1 job" : `${n} jobs`),
} as const;

export const USAGE_CATEGORIES: UsageCategory[] = [
  {
    id: "website",
    name: "Website",
    hue: "teal",
    jobs: [
      {
        name: "Website update",
        driver: "Number of pages touched.",
        price: "$0.10–$0.30",
        credits: "1–3 credits",
      },
      {
        name: "New page",
        driver: "Page length, whether new photos are needed.",
        price: "$1.50–$4",
        credits: "15–40 credits",
      },
      {
        name: "Campaign landing pages (set)",
        driver: "How many versions are in the set.",
        price: "$4–$12",
        credits: "40–120 credits",
      },
      {
        name: "Site rebuild",
        driver: "Number of pages, complexity of integrations, number of revisions.",
        price: "$30–$100",
        credits: "300–1,000 credits",
      },
      {
        name: "Suggested site improvement",
        driver: "Whether you approve each change or let it go live on its own.",
        price: "$0.20–$0.80",
        credits: "2–8 credits",
      },
    ],
  },
  {
    id: "content",
    name: "Content",
    hue: "yellow",
    jobs: [
      {
        name: "Short post (~600 words)",
        driver: "Research depth, number of images.",
        price: "$1.20–$2.50",
        credits: "12–25 credits",
      },
      {
        name: "Blog post (~1,200 words)",
        driver: "Research depth, number of images.",
        price: "$2.50–$5",
        credits: "25–50 credits",
      },
      {
        name: "Long-form guide",
        driver: "Length, number of sections, how much data is gathered.",
        price: "$6–$15",
        credits: "60–150 credits",
      },
      {
        name: "Refresh an old post",
        driver: "How much of the post is rewritten.",
        price: "$0.50–$1.50",
        credits: "5–15 credits",
      },
    ],
  },
  {
    id: "social",
    name: "Social",
    hue: "orange",
    jobs: [
      {
        name: "Text post",
        driver: "Number of platforms it goes to.",
        price: "$0.10–$0.30",
        credits: "1–3 credits",
      },
      {
        name: "Post with images",
        driver: "Number of images and revisions.",
        price: "$0.40–$1.20",
        credits: "4–12 credits",
      },
      {
        name: "A month of scheduled posts",
        driver: "How often you post, the mix of formats.",
        price: "$4–$12",
        credits: "40–120 credits",
      },
    ],
  },
  {
    id: "ads",
    name: "Ads",
    hue: "pink",
    jobs: [
      {
        name: "Campaign build",
        driver: "Number of platforms and audiences.",
        price: "$4–$12",
        credits: "40–120 credits",
      },
      {
        name: "New ad",
        driver: "Format, number of versions.",
        price: "$0.80–$2.50",
        credits: "8–25 credits",
      },
      {
        name: "Ad management, per month",
        driver: "Number of campaigns, how often budgets shift.",
        price: "$2–$8",
        credits: "20–80 credits",
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
        price: "$0.50–$2",
        credits: "5–20 credits",
      },
      {
        name: "Review request",
        driver: "Placeholder price, set as a text message.",
        price: "$0.20–$0.50",
        credits: "2–5 credits",
      },
      {
        name: "Review reply",
        driver: "Length and sensitivity of the reply.",
        price: "$0.10–$0.30",
        credits: "1–3 credits",
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
        price: "$1.50–$4",
        credits: "15–40 credits",
      },
      {
        name: "Text reply or follow-up",
        driver: "Thread length, whether photos are involved.",
        price: "$0.20–$0.50",
        credits: "2–5 credits",
      },
      {
        name: "Web chat",
        driver: "Length of the conversation.",
        price: "$0.10–$0.30",
        credits: "1–3 credits",
      },
      {
        name: "Sorting who’s ready to book, per customer",
        driver: "How much history there is to read.",
        price: "$0.10–$0.30",
        credits: "1–3 credits",
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
        driver: "Placeholder price. A flat session.",
        price: "$25",
        credits: "250 credits",
      },
    ],
  },
];
