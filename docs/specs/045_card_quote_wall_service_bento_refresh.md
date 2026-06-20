# Spec 045 — Flat cards, quote-wall masonry & service-system bento

**Status:** Approved — in implementation
**Type:** A visual refresh of three already-built surfaces so they read tighter and flatter, matching our inspiration site. Three related changes: (1) brand-tone SpotlightCards paint flat fills instead of gradients; (2) the `QuoteWall` (spec 042) becomes a tight masonry of photo / text tiles instead of a fixed card-grid; (3) the service-page "system" bento (spec 037) frames small product mocks on flat tiles instead of overlaying text on full-bleed product screenshots.
**Reference:** Owner.com-style marketing pages — a "what it's like to work here" quote wall built as a tight masonry of full-bleed portrait quote tiles interleaved with flat cream text quotes, and a feature bento with one wide photo tile above two flat tiles that each frame a small UI mock (a search field, a product card). Built per the "Reference-Driven Components" workflow; no Figma. Layout and rhythm are matched; all copy and imagery are ours.
**Depends on:** 036 (SpotlightCard / CardGrid), 037 (service page template + `BentoMock`), 041 (careers `QuoteWall`), 042 (leadership `QuoteWall`).
**Names:** `QuoteWall` / `QuoteTile` (rebuilt in place), `BentoMock` / `BentoMockKind` (extended), `--color-bg-mint-solid` (new flat token). All open to a rename.

---

## What this is

Three surfaces share one complaint: gradients and full-bleed imagery make our cards look shiny and busy, and the quote wall's fixed grid leaves empty cells and uneven rows. Our palette is flat; the inspiration site is tighter and cleaner. This spec brings all three in line. No new pages or data sources — only how existing content is presented.

---

## Scope

### In scope

- **Flat brand-tone cards.** The SpotlightCard `gradient` background kind paints a single flat fill (brand / mint / ink) rather than a linear gradient. The `gradient` API name is kept; only the paint changes. The scrim over photos and the CtaBand accent band are unaffected — those gradients aid legibility / are not cards.
- **`--color-bg-mint-solid`** — a new flat brand-green token for the mint card tone (the only brand tone without an existing flat fill).
- **`QuoteWall` rebuilt** as a CSS-columns masonry that packs the full width with no empty cells. Two flat tile variants: a full-bleed **photo** tile (portrait image + scrim + overlaid quote) when a portrait is supplied, and a flat **cream text** tile otherwise. The colored-tone and wide-span options are dropped; tile height now varies by content, which gives the wall its masonry rhythm.
- **`QuoteTile`** simplified to `{ id, quote, name, role, image? }` (the `tone` and `wide` fields are removed).
- **Careers** culture quotes keep their team portraits (photo tiles). **Leadership** investor quotes drop the borrowed customer thumbnails (they were not the investors) and render as flat cream text tiles on the dark band.
- **Service "system" bento** tiles can frame a `BentoMock` on a flat tile instead of carrying a full-bleed product screenshot. The pattern, per the reference, is one wide photo tile above flat mock tiles.
- **`BentoMock`** gains **`review`** (rating + review-body skeleton), **`message`** (a two-way chat bubble skeleton), and **`metric`** (a stat label over a rising bar chart) kinds alongside the existing `search` and `product`; the renderer is an exhaustive switch.
- **`ServiceBentoTile`** gains an optional `aspect` so the wide photo tile can read as a banner.
- **Equal-height rows.** Tiles in the same bento row match height (the bottoms line up); the wide banner keeps its own aspect.
- **All 17 service pages** adopt the new bento: the wide tile becomes a photo banner (the caption is dropped so the overlay stays clean), and the two single tiles become flat `ink` / `cream-strong` tiles framing a topically chosen mock.

### Out of scope

- **New quote / investor copy.** Content is unchanged except for removing the borrowed leadership thumbnails and the wide bento-tile captions.
- **Touching non-card gradients** (homepage hero, CtaBand accent, photo scrims).

---

## Visual design

Exact colors, sizes, and spacing are chosen at implementation against our tokens. The result reads as Keystone — flat cream and brand-green fills, ink body type, our display/body fonts. The mobile↔desktop hand-off is the app-wide breakpoint.

### 1. Flat cards

Brand-tone tiles fill with one solid color, no sheen. White text sits on brand / mint / ink; dark text on cream.

### 2. Quote wall

A tight masonry: tiles flow into balanced columns (one column on mobile, three at desktop) with a small, even gutter and no empty cells. Photo tiles carry a minimum height so portraits read and anchor the quote + attribution at the bottom over a scrim; text tiles size to their copy on a flat cream fill. The ragged bottom edge is expected — there are no stretched rows to keep even.

### 3. Service "system" bento

One wide tile on top (a photo with the eyebrow + title overlaid at the bottom over a scrim), above flat tiles that each frame a small mock toward the top with the eyebrow + title + caption anchored at the bottom — a dark tile framing the search/listings mock, a cream tile framing the review mock. Mocks are decorative chrome built from tokens, `aria-hidden`, never real data.

---

## New / changed components

### Components

- **`QuoteWall` / `QuoteTile`** (`design-system/sections/`) — rebuilt as the masonry described above; `QuoteTile` simplified.
- **`BentoMock` / `BentoMockKind`** (`design-system/patterns/services/`) — adds the `review` mock; exhaustive renderer.
- **`ServicePageTemplate`** — the bento passes an optional `aspect` through to the wide tile.

### Tokens

- **`--color-bg-mint-solid`** — flat brand-green card fill.

### Styles

- `components/content-cards.css` — `gradient` background kinds paint flat tokens.
- `sections/people-wall.css` — quote-wall masonry; the old card / avatar rules are removed.
- `patterns/services.css` — the `review` mock skeleton.

---

## Accessibility

- Quote text keeps its semantic order; the wall is a labeled group. Photo tiles keep AA contrast for the overlaid quote via the scrim; cream text tiles keep AA on the fill.
- Bento mocks are `aria-hidden` decoration; each tile's meaning lives in its eyebrow / title / caption.

---

## Responsive behavior

- The quote wall is one column on mobile and three at desktop, with no horizontal overflow at 390px.
- The bento keeps its existing column behavior; the wide tile spans both columns at desktop and stacks on mobile.

---

## Acceptance criteria

- [ ] Brand-tone SpotlightCards render as flat fills (no gradient sheen); photo scrims and the CtaBand accent are unchanged.
- [ ] The careers and leadership quote walls render as a tight masonry that fills the width with no empty cells; careers shows portrait photo tiles, leadership shows flat cream text tiles.
- [ ] Leadership investor quotes no longer borrow customer thumbnails.
- [ ] Every service page's "system" bento shows one wide photo banner above flat tiles that frame mocks (no full-bleed product screenshots); tiles in the same row match height.
- [ ] `BentoMock` supports `search`, `product`, `review`, `message`, and `metric` via an exhaustive switch.
- [ ] `npx tsc --noEmit` and `npm run lint` pass.
