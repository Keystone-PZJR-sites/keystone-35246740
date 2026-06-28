# 052 — Case Studies, Long-Form

**Status:** Implemented
**Depends on:** 051 (case studies)
**Reference:** the published in-depth customer features on well-run agency and SaaS sites — a single long, scrollable story built from stacked, varied content sections rather than one fixed layout. Value-free; the implementer reads exact spacing, proportion, and type steps against our tokens, never from this spec. Reference-driven (no Figma node), so the Figma-MCP gate does not apply.

Spec 051 shipped the case-study gallery and a detail page with a fixed set of sections (hero, before/after, narrative, pull quote, other stories). This spec keeps the gallery and the page surroundings exactly as 051 described them, and replaces the **middle of the detail page** with a longer, richer story assembled from an ordered list of section types. A story chooses which sections it needs and in what order; two stories need not have the same shape.

The page still opens on the cream surface under the floating nav, still closes with the deep-green full-bleed call-to-action band, and still ends with the "other success stories" row. Everything between the hero and that row is the new long-form body.

---

## Hero

As in 051: centered eyebrow, large display headline, supporting sentence, a row of three headline statistics, and a single wide media card beneath.

New: directly under the supporting sentence sits a thin row of small, quiet meta chips — short factual tags such as the location, the kind of business, and how long they have been a customer. They read as muted pills, wrap to a second line on narrow screens, and are skipped entirely when a story supplies none.

---

## Story body — the section toolkit

The body is an ordered sequence drawn from the section types below. Each type appears zero or more times. Generous vertical breathing room separates them. Reading order top-to-bottom is the order the story lists them in.

### TL;DR
An opening summary panel on a quiet tinted surface: a short lead paragraph, a checked list of the few things that changed, and an optional thin row of headline numbers. Lets a skimmer get the whole story in one block before reading on.

### Prose section
A titled passage: a small eyebrow, a section heading, and one or more body paragraphs. It may carry a single supporting photo held to one side (left or right, the story's choice) that sits opposite the prose at desktop and stacks above it at mobile. It may also carry one inset callout (see Callout) tucked beside or within the passage.

### Callout
A short highlighted aside that breaks up the prose. Four moods, each a recognizable treatment built only from existing palette roles:
- **Quote** — a brief pulled sentence with attribution.
- **Insight** — an emphasized takeaway on a dark brand surface with light text.
- **Metric** — one oversized number with a short label and a sentence of context.
- **Takeaway** — a plain-surface "the point is…" note.

### Stat band
A titled row of four or five headline statistics (oversized value over a small label), optionally introduced by a sentence. A wider, calmer cousin of the hero's three-stat row.

### Before / after comparison
The 051 contrast block, unchanged: a quiet "before" card and a brand-green light-text "after" card, each a label, a small stat row, and a few bullets. Equal width at desktop, stacking after-first at mobile.

### Tools used
A titled grid of small cards, each naming one Keystone capability the customer runs and a sentence on what it does for them. Three across at desktop, one at mobile.

### Chart
A titled horizontal bar chart drawn in plain layout — each bar is a labeled row whose length encodes its value, with the value printed at the end of the bar. One bar may be emphasized as the hero figure. An optional caption sits above and a footnote below. The chart carries an accessible text label describing what it shows.

### Timeline
A titled vertical list of rollout milestones, each a date, a short heading, and a sentence, connected down a single rail. Reads as "here's how it unfolded."

### Pull quote
The 051 emotional-peak block: a large pulled quote with attribution and a small result stat row, beside a supporting photo.

### Gallery
A titled set of two or three photos in a row, each with its own caption beneath. Three reads best. One row at desktop, one column at mobile.

---

## New design values

None. Every surface, text color, radius, and type step is an existing token. The before/after green card, the dark insight surface, and the muted chips all reuse palette roles already defined. The chart bars use the existing accent and quiet-surface roles; no new color is introduced.

---

## Responsive

- Single mobile↔desktop hand-off at 985px, like the rest of the site.
- Every multi-column section (prose-with-photo, comparison, tools grid, gallery, pull quote) collapses to one column below 985px, in the reading order noted per section.
- Meta chips and stat rows wrap rather than overflow.
- No new intermediate breakpoint is introduced for any single section.

## Edge cases

- A story that supplies no meta chips, no TL;DR stats, or no chart footnote simply omits them — nothing renders empty.
- A prose section with no photo is full-width text.
- The chart stays readable when one value dwarfs the others — the smallest bar keeps a visible minimum length.
- No scroll-triggered animation; hover and focus shifts only, so `prefers-reduced-motion` needs no special handling.

## Acceptance criteria

- [x] The detail page hero shows the optional meta-chip row beneath the supporting sentence, and omits it when a story supplies none.
- [x] A story's body renders from an ordered list of section types, in that order, with each type styled as described.
- [x] All ten section types (TL;DR, prose, callout, stat band, comparison, tools, chart, timeline, pull quote, gallery) render from data with no hardcoded content in a component.
- [x] The page still opens with the hero, still shows the "other success stories" row, and still closes with the green call-to-action band (051 surroundings intact).
- [x] Every multi-column section collapses cleanly to one column below 985px; no section introduces a new breakpoint.
- [x] The chart exposes an accessible text description; all gallery and supporting photos have meaningful alt text.
