import type { ComposerPrompt } from "@keystonepzjr/marketing-design-system/composer";
import type { Hue } from "@keystonepzjr/marketing-design-system/hue";
import type { Plan } from "@keystonepzjr/marketing-design-system/plans";
import type { ShapeName } from "@keystonepzjr/marketing-design-system/shape";

// The page's words. Sentence case, short sentences, no dashes.
export const COPY = {
  h1: ["Powerful tools for", "independent businesses."],
  sub: "Keystone answers the calls, builds the website, runs the ads and posts the posts. You run the business.",
  close: ["Your hands are full.", "Hand it to Keystone."],
} as const;

export type EntryId = "grader" | "website" | "receptionist" | "ads" | "social";

/** One of the five ways into Keystone from the page. */
export type Entry = {
  id: EntryId;
  /** 01 to 05, for a screen reader's count of the platform's parts. */
  n: string;
  hue: Hue;
  shape: ShapeName;
  /** One or two words. */
  name: string;
  /** The chip: what the visitor would say. */
  label: string;
  /** Completes "Ask Keystone to …" on the composer's empty line. */
  ask: string;
  /** What lands in the composer when the entry is chosen, and is sent to Keystone. */
  prompt: string;
  /** The outcome as a headline, in the two lines a desktop sets it in. */
  lines: readonly [string, string];
  /** Two lines on how. */
  body: string;
  photo: string;
  /** Where the photograph's subject sits, as an object-position. */
  focus?: string;
};

export const ASK_PREFIX = "Ask Keystone to ";

export const ENTRIES: readonly Entry[] = [
  {
    id: "grader",
    n: "01",
    hue: "pear",
    shape: "square",
    name: "Grader",
    label: "Grade my business",
    ask: "grade my business online",
    prompt: "Grade my business’s online presence.",
    lines: ["Find out what’s costing", "your business customers."],
    body: "A free scan of how you show up on Google, Maps, AI answers and social. Ranked by what to fix first.",
    photo: "/photos/gym.jpg",
  },
  {
    id: "website",
    n: "02",
    hue: "blue",
    shape: "circle",
    name: "Website",
    label: "Build my website",
    ask: "build a new website",
    prompt: "Build a new website for my business.",
    lines: ["A website that turns", "searches into traffic."],
    body: "Built from what Keystone already knows about your business. Kept fast, current and easy to find.",
    photo: "/photos/esthetician.jpg",
  },
  {
    id: "receptionist",
    n: "03",
    hue: "pink",
    shape: "wedge",
    name: "AI receptionist",
    label: "Answer my calls",
    ask: "set up an AI receptionist",
    prompt: "Set up an AI receptionist for my business.",
    lines: ["Every call answered.", "Every lead texted back."],
    body: "It picks up when you can’t, answers the question and sends you the note.",
    photo: "/photos/nail-tech.jpg",
    focus: "50% 35%",
  },
  {
    id: "ads",
    n: "04",
    hue: "tangerine",
    shape: "diamond",
    name: "Ads",
    label: "Run my ads",
    ask: "create a Meta ad campaign",
    prompt: "Create a Meta ad campaign for my business.",
    lines: ["Ads that bring in leads,", "not homework."],
    body: "Give Keystone a budget. It writes, designs and launches the campaign. You see what every lead cost.",
    photo: "/photos/carpenter.jpg",
  },
  {
    id: "social",
    n: "05",
    hue: "purple",
    shape: "hexagon",
    name: "Social",
    label: "Post for me",
    ask: "plan this week’s social posts",
    prompt: "Write this week’s social posts for me.",
    lines: ["Show up every week", "without thinking about it."],
    body: "Your photos and your work become posts, scheduled for the week while you do the job.",
    photo: "/photos/florist.jpg",
    focus: "50% 35%",
  },
];

// What the composer's + offers: the asks an owner has between customers, each dropped in whole.
export const WILDCARDS: readonly ComposerPrompt[] = [
  {
    label: "Spy on my competition",
    prompt: "Show me how my top three local competitors show up online, and where I’m behind.",
  },
  {
    label: "Fill my slowest day",
    prompt: "Help me fill my slowest day of the week with an offer, a post and an ad.",
  },
  {
    label: "Reply to my reviews",
    prompt: "Write replies to my latest Google reviews, the good ones and the bad ones.",
  },
  {
    label: "Ask ChatGPT about me",
    prompt:
      "What do ChatGPT and Google’s AI say when someone nearby asks for a business like mine?",
  },
  {
    label: "Win back my regulars",
    prompt: "Draft a text to customers I haven’t seen in three months that brings them back.",
  },
  {
    label: "Make my best review a post",
    prompt: "Turn my best review into an Instagram post for this week.",
  },
];

// The plans, each a short line to a bullet.
export const PLANS: readonly Plan[] = [
  {
    name: "Starter",
    price: "$50",
    line: "Small businesses ready to step up their online web presence.",
    list: [
      "Custom website, up to 5 pages",
      "Edit your site by chat",
      "Keystone CRM included",
      "Monthly SEO and Maps updates",
      "24/7 support",
    ],
  },
  {
    name: "Growth",
    price: "$300",
    line: "Businesses ready to dominate their online competition.",
    list: [
      "Everything in Starter, plus",
      "Websites up to 30 pages",
      "Search, AI and local SEO",
      "Weekly blog posts",
      "AI lead follow-up by text",
      "A dedicated Growth Partner",
    ],
    featured: true,
  },
  {
    name: "Scale",
    price: "$600",
    line: "Businesses ready to grow as quickly as possible.",
    list: [
      "Everything in Growth, plus",
      "AI phone receptionist",
      "Ad campaigns on Meta or Google",
      "Daily Instagram and Facebook posts",
      "Custom integrations",
      "Monthly strategy meetings",
    ],
  },
];
