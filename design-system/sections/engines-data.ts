/** Marketing engine copy in narrative order. */
type EngineId = "brand" | "visibility" | "ads" | "reception" | "engagement";

export interface EngineCopy {
  id: EngineId;
  name: string;
  /** The description's first drawn paragraph. */
  tagline: string;
  /** The two drawn body paragraphs. */
  body: [string, string];
}

export const ENGINES: EngineCopy[] = [
  {
    id: "brand",
    name: "Brand",
    tagline: "Look like the obvious choice.",
    body: [
      "A custom website and one identity everywhere: logo, colors, fonts, photography, voice.",
      "Listings accurate everywhere customers check, reviews monitored, answered, and steadily earned, and social profiles that match and stay active.",
    ],
  },
  {
    id: "visibility",
    name: "Visibility",
    tagline: "Show up where customers search.",
    body: [
      "Your website, maps profiles, listings, reviews, and content, all on-brand, kept accurate and working the moment someone starts looking.",
      "See exactly where you stand: your rank, your reach, your reviews, and your sources.",
    ],
  },
  {
    id: "ads",
    name: "Ads",
    tagline: "Ads that pay for themselves.",
    body: [
      "Campaigns built from your own photos and content, landing on a site built to convert, with leads answered instantly and followed-up.",
      "See exactly what's working: your spend, your cost per lead, and your best-performing ad, sharper each time the results come back in.",
    ],
  },
  {
    id: "reception",
    name: "Reception",
    tagline: "Never miss a customer again.",
    body: [
      "Webchat, texts, and calls answered instantly day or night, all landing in one inbox, nothing gets lost.",
      "Contacts captured and appointments booked right inside the conversation, so the serious ones reach you and the rest get handled.",
    ],
  },
  {
    id: "engagement",
    name: "Engagement",
    tagline: "Keep every customer warm.",
    body: [
      "Existing lists and old leads put back to work with newsletters, offers, and updates on a steady cadence, texts and social for anything time-sensitive.",
      "Rebooking nudges and win-backs reach customers who’ve lapsed, so nobody on your list goes cold.",
    ],
  },
];

/** The section slug appears in wide and tablet layouts. */
export const ENGINES_SLUG = "Designed to drive growth";

/** Accessible name for the control that advances an engine's diagram. */
export function engineAdvanceLabel(name: string): string {
  return `Show the next ${name} view`;
}

/** Shared name for the wide sticky stage, which covers every engine. */
export const ENGINE_STAGE_ADVANCE = "Show the next view";

/** Section anatomy in ticks. Page expectations import these values directly. */
export const ENGINE_TICKS = {
  /** Leading full-lattice seam row. */
  seam: 1,
  /** Interactive viewport plus four inter-engine travel bands. */
  interactive: 32,
  /** rt static stack: slug 1t + five 19t panels */
  rt: 96,
  /** 384/rs static stack: five 25t panels + the 2t tail gap */
  rm: 127,
  /** one engine panel in the interactive column — also one engine's
   * scroll stride */
  panel: 6,
  /** inter-engine travels (the column rises one panel each) */
  travels: 4,
  /** interactive states 01a → 05b */
  states: 10,
} as const;
