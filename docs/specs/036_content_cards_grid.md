# Spec 036 — Content Cards & Card Grid

**Status:** Implemented
**Type:** Reusable design-system primitives (a card + a grid layout), usable on any page
**Reference:** Screenshots attached in chat — grids of cards from a restaurant-marketing site: full-bleed photo cards with overlaid stats, media cards with overlaid titles and a play affordance, a bento mix of image / gradient / solid tiles (some holding a nested mini-card), and a solid brand call-to-action tile. No Figma; built per the "Reference-Driven Components" workflow in the rules.
**Proposed names:** `SpotlightCard` (the card) and `CardGrid` (the layout). Both open to a rename.

---

## What this is

Two composable pieces:

1. **A single, flexible content card.** A rounded surface with a *background layer* (a photo, a looping video, a brand gradient, or a flat surface tone), optional darkening so text stays legible over imagery, and a stack of optional content — a small eyebrow label, an oversized stat, a title, and a supporting caption. The card can also hold an arbitrary block of its own (a nested mini-card, a mock, an illustration) and can carry a single action affordance (a play button, a forward arrow, or a whole-card link). Every card in the reference is the same card with different content turned on or off; it is not a different component per look.

2. **A grid that composes cards.** A responsive layout that arranges cards into rows and columns, where individual cards may span more than one column (and, where it reads well, more than one row) so a page can build a "bento" arrangement — one large tile beside two small ones, a wide tile above a split row, and so on. Below the app-wide mobile boundary the grid collapses to a single readable column.

The card is content-agnostic and the grid is card-agnostic: the grid only arranges, the card never knows how it is placed.

---

## Scope

### In scope

- One card component covering all of the reference's card **formats** (see *Card formats* below), selected purely by which content and background a page supplies.
- Backgrounds: a photo, a looping muted video, a brand gradient, or a flat surface tone.
- An optional legibility scrim so overlaid text passes contrast over busy imagery.
- Optional content slots: eyebrow, stat, title, caption — any subset, in a consistent reading order.
- An optional free-form content block the page supplies (e.g. a nested mini-card or mock), framed by the card.
- An optional single action: a play button, a forward arrow, or making the whole card a link.
- A grid layout that arranges cards responsively, supports per-card column (and row) spans for bento arrangements, and collapses to one column below the mobile boundary.

### Out of scope

- The horizontal swipeable **rail / carousel** (the overflowing row in one reference shot) — a later, separate piece; this round composes into grids only.
- The large **split case-study card** (quote + stats beside a media panel with arrows) — its own later spec.
- The **testimonial / review wall** — handled by extending the existing `TestimonialGrid`, not here.
- The specific imagery, copy, stats, and nested mocks — those are content, supplied per use.
- Any data fetching, routing, or analytics a card's action might trigger.

---

## Card formats

All of these are the same component; the "format" is just the combination of background and content a page provides. They are named here only so the design and acceptance criteria can refer to them.

- **Media + title.** A photo (or video) background with a legibility scrim and a title (optionally an eyebrow and caption) anchored at the bottom; may carry a play affordance. *(Reference: the article / feature tiles and the phone tile.)*
- **Media + stat.** The same media-and-scrim treatment, but the headline content is an oversized stat with a short label and an attribution line. *(Reference: the "+54% / +$7M …" owner cards.)*
- **Surface + nested block.** A flat surface tone or brand gradient background carrying a caption, plus a page-supplied nested block (a mini result card, a product card) framed inside. Content may sit below the nested block or over the gradient. *(Reference: the "Tacos near me" and "Birria Tacos" tiles.)*
- **Call-to-action tile.** A solid brand-toned tile with a label, a caption, and a forward arrow — no media, the whole tile a link. *(Reference: the green "Learn with …" tile.)*

---

## Visual design

Exact colors, sizes, and spacing are chosen at implementation against our tokens. The screenshots are the visual anchor, but the result must read as Keystone — our cream and ink surfaces, our brand orange and mint, our type and eyebrow treatment — not as the reference site.

### The card

A rounded rectangle using a shared large radius, clipping its background so the corners stay clean. The background fills the card edge to edge: a photo or video covers the card; a gradient or flat tone fills it. Over a photo or video, a soft dark scrim rises from the bottom so overlaid text holds contrast; flat and gradient backgrounds with content placed in a non-media region need no scrim.

Content sits in a single column with comfortable padding, anchored to the bottom of the card by default (so a row of cards of differing heights aligns its text along a common baseline feel). Reading order top to bottom is: eyebrow, then either the oversized stat (with its label) or the title, then the caption. The eyebrow uses our existing eyebrow treatment. The stat is large and confident in the display feel; the title is in the body face at a bold weight; the caption is muted supporting copy. Over media, text is light (reads on the scrim); on cream the text is our primary dark; on brand/ink the text is the inverse role.

When a page supplies a nested block, the card frames it: on a gradient or flat tile the nested block sits in the upper area with the caption beneath it; the nested block itself is a small raised surface (built from our existing Card primitive) so it reads as "a card within a card."

The action affordance, when present, is one of: a circular play button (centered on or anchored within the media), a circular forward arrow (anchored in a corner of a call-to-action tile), or the entire card behaving as a link (a gentle hover lift, consistent with our interactive cards). Only one affordance per card.

### The grid

Cards lay out on a consistent column grid with an even gutter. By default cards are equal-width and flow into as many columns as fit; a page can make a card span two (or more) columns, and where it reads well span two rows, to build a bento composition: a large feature tile next to a stack of smaller tiles, a wide tile above a two-tile row, etc. Spans are expressed per card. Row heights align so spanned and unspanned cards tile cleanly without gaps.

### Mobile (< 985px)

The grid uses the app-wide **985px** boundary (the "Responsive-Native" rule), not a component-specific cutoff. Below it the grid collapses to a single column: every card is full width, spans are ignored, and cards stack in source order. Card padding and the stat / title sizes step down so nothing is cramped at 390px; the scrim and overlay behavior are unchanged. Tap targets for play / arrow affordances meet the minimum size.

---

## Content

Everything is supplied per card by the page; nothing (imagery, copy, stats, tones, nested blocks) is hardcoded in the components.

- **Background** — a photo, a video, a brand gradient choice, or a flat surface tone.
- **Eyebrow / stat (+ stat label) / title / caption** — any subset; the card renders only what is given, in the fixed reading order.
- **Nested block** — an optional arbitrary block the page frames inside the card.
- **Action** — at most one: play, forward arrow, or whole-card link (with its destination).
- **Span** — per card, how many columns (and optionally rows) it occupies in the grid; ignored on mobile.

A meaningful image inside a card carries its own alt text from the page; a purely decorative background is marked decorative.

---

## New tokens & variants

- **A legibility scrim.** A reusable bottom-anchored dark gradient overlay token for text over photos / video, so every media card darkens identically rather than each hardcoding its own gradient.
- **Brand gradient(s).** One or two named brand gradient tokens (e.g. a mint / green gradient like the reference's search tile) so gradient-backed cards reference a shared value.
- **Card radius.** Reuse the shared large-radius token added in spec 035 (`--radius-panel`) for the outer card; if the nested mini-card needs a smaller radius than the panel but larger than the standard component radius, add one shared mid-radius token rather than hardcoding.

No new color tokens beyond the gradients — surfaces use existing cream / ink / brand roles, text uses existing primary / inverse / muted roles, the play and arrow affordances use existing surface and border tokens. No new typography primitive — eyebrow, stat, title, and caption use the existing Eyebrow, Heading, and Text primitives. The nested mini-card reuses the existing Card primitive.

The SpotlightCard **shell itself is built on the `Card` primitive** — a transparent, panel-radius, unpadded `Card` (`tone="none" radius="panel" padded={false}`) carrying the background / scrim / content / affordance layers. The card radius, hover lift, and link behavior come from `Card`, so the whole card family (standard `Card`, nested mini-cards, and SpotlightCard tiles) shares one foundation. This added three opt-in `Card` modifiers — `tone="none"`, `radius="panel"`, `padded={false}` — that leave every existing `Card` usage unchanged.

---

## Accessibility

- A whole-card link is a single anchor with an accessible name; nested interactive content is avoided inside a card-link (no link-in-link).
- A play button is a real button with a clear label ("Play …"); a forward-arrow tile, if it is a link, needs no extra button.
- Overlaid text meets AA contrast against the scrimmed media at the chosen sizes; the scrim is tuned to guarantee it.
- Decorative backgrounds are hidden from assistive tech; meaningful imagery carries page-supplied alt text.
- The grid is a plain layout container — reading order follows source order, which is also the single-column mobile order, so there is no visual / DOM order mismatch.
- Focus is visible on any interactive card or affordance.

---

## Acceptance criteria

- [ ] A single card component renders every reference format (media + title, media + stat, surface + nested block, call-to-action tile) by props alone — no per-format component.
- [ ] Backgrounds support photo, looping muted video, brand gradient, and flat surface tone.
- [ ] Over photo / video, a shared scrim token darkens the bottom and overlaid text passes AA contrast.
- [ ] Eyebrow, stat (+ label), title, and caption are each optional and render in a fixed reading order when present.
- [ ] A page-supplied nested block is framed inside the card and reads as a card-within-a-card, using existing primitives.
- [ ] A card supports at most one action: play button, forward arrow, or whole-card link, each with a visible focus state and (for buttons) an accessible label.
- [ ] The outer card uses the shared large-radius token — no hardcoded radius.
- [ ] The grid arranges equal-width cards into as many columns as fit, with an even gutter.
- [ ] A card can span multiple columns (and, where supported, rows) to build a bento arrangement, tiling without gaps.
- [ ] At ≥ 985px the grid is multi-column with spans honored; below 985px it collapses to a single full-width column in source order, ignoring spans.
- [ ] No horizontal overflow at 390px; stats / titles step down so nothing is clipped or cramped.
- [ ] The card and grid appear in the /styles catalog showing each format and a bento composition, and any new token (scrim, gradient, mid-radius) appears in the relevant foundations panel.
