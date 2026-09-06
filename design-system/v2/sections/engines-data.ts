/** v2 sections — the engine section's data module (spec 020 §3/§8).
 *
 * The copy canon: five engines, each one drawn three-paragraph
 * description (the tagline sentence, then two body paragraphs — 020
 * §3 as clarified at the approval review, §9 R11) plus the serif
 * engine-name header. Strings read from the state frames' nodes
 * through the bridge 2026-09-06 (the fresh-read pass, §9 R12); the
 * drawn Brand/Visibility tagline trailing spaces are read artifacts
 * and are not carried (the 018 posture). The curly apostrophe in
 * Engagement's "who've" is canon (the 008 precedent).
 *
 * The engine order is the narrative canon (Brand → Visibility → Ads →
 * Reception → Engagement — Bloom's clockwise walk after the 019 §9 R6
 * re-label). The dot hues are the §3/§9 F6 canon; the CSS binds them
 * per data-engine in engines.css.
 */

export const ENGINE_V2_ORDER = [
  "brand",
  "visibility",
  "ads",
  "reception",
  "engagement",
] as const;

export type EngineV2Id = (typeof ENGINE_V2_ORDER)[number];

export interface EngineV2Copy {
  id: EngineV2Id;
  name: string;
  /** The description's first drawn paragraph. */
  tagline: string;
  /** The two drawn body paragraphs. */
  body: [string, string];
}

export const ENGINES_V2: EngineV2Copy[] = [
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
      "Rebooking nudges and win-backs reach customers who\u2019ve lapsed, so nobody on your list goes cold.",
    ],
  },
];

/** The slug canon (§3) — rd2/rt constructions only; the 384 stack has
 * no slug row (§9 R8). */
export const ENGINES_V2_SLUG = "Designed to drive growth";

/** Section anatomy in ticks (§1/§8) — the 017 `extraTicks` pattern.
 * The 023 page-assembly expectations module imports these instead of
 * restating them. The per-band totals measure from the slug row (384:
 * the panels) down; the leading full-lattice seam row (§2/§9 R12)
 * rides above them as `seam`. */
export const ENGINES_V2_TICKS = {
  /** the leading full-lattice seam row (r18/r25/r41) */
  seam: 1,
  /** rd2/rd1 interactive: 8t drawn viewport + 4·6t free travels +
   * 5·4t runways (§1) */
  interactive: 52,
  /** rt static stack: slug 1t + five 19t panels */
  rt: 96,
  /** 384/rs static stack: five 25t panels + the 2t tail gap */
  rm: 127,
  /** one engine panel in the interactive column */
  panel: 6,
  /** one a→b runway plateau (§6, §9 R7) */
  runway: 4,
  /** free inter-engine travels (the column rises one panel each) */
  freeTravels: 4,
  /** interactive states 01a → 05b */
  states: 10,
} as const;
