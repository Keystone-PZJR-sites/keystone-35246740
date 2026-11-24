import type { Hue } from "@keystone-sites/marketing-design-system/hue";
import type { Plan } from "@keystone-sites/marketing-design-system/plans";
import type { ShapeName } from "@keystone-sites/marketing-design-system/shape";

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

// The plans as they are sold today, shortened.
export const PLANS: readonly Plan[] = [
  {
    name: "Starter",
    price: "$50",
    line: "Get found and look the part.",
    list: [
      "A custom website, built for you",
      "Monthly website, SEO and Google Maps updates",
      "Edit your site by chat",
    ],
  },
  {
    name: "Growth",
    price: "$300",
    line: "Fill the calendar.",
    list: [
      "Everything in Starter",
      "Daily posts on Instagram and Facebook",
      "A daily optimized ad campaign",
      "AI lead follow-up by text",
      "A dedicated Growth Partner",
    ],
    featured: true,
  },
  {
    name: "Scale",
    price: "$600",
    line: "Answer everyone, everywhere.",
    list: [
      "Everything in Growth",
      "Unlimited ad campaigns",
      "A customizable AI receptionist",
      "Weekly strategy with your Growth Partner",
    ],
  },
];
