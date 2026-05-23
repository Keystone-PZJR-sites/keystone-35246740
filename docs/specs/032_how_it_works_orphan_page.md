# Spec 032 — How It Works Landing Page

**Status:** Published (superseded by Spec 033)  
**Depends on:** Spec 002 (Work Showcase + revisions), Spec 005 (Pricing), Spec 023 (Mobile Work Showcase), Spec 024 (Product Screens Refresh), Spec 026 (Section Layout Refactor), Spec 027 (Section Height Floor Opt-in)  
**Figma file:** `XRbD11WIevI5szRFiRrguZ`  
**Context nodes (inspiration only):**
- [Home desktop context](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1276-7450&m=dev) (node `1276:7450`)
- [Home mobile context](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1106-4619&m=dev) (node `1106:4619`)

---

## What this spec changes

This spec defines a new landing page at `/how-it-works` focused on ad traffic. It is designed to be simple, direct, and utilitarian in contrast to the more conceptual homepage narrative.

The page should feel like the existing inner pages (`/portal`, `/blog`, `/booking`) in overall shell and spacing rhythm, while reusing proven homepage sections and assets where they already exist.

This spec does not replace or alter the current `/services` route.

---

## Route and visibility contract

- New route: `/how-it-works`
- The page is intended for ad traffic and direct links.
- Do not add navigation links to this page in primary site navigation during this phase.
- Existing `/services` page remains intact and unchanged.

---

## Primary goal

Visitors arriving from ads should understand, quickly and with minimal interpretation:

1. What Keystone does.
2. Which modules are included.
3. What outcomes those modules produce.
4. How to take the next step (demo or deeper review).

The page should prioritize clarity over novelty.

---

## Page structure

The page is composed of four sections in this order:

1. Hero (new)
2. Work Showcase section (reuse from homepage)
3. Module-by-module section (new, tall)
4. Pricing section (reuse from homepage)

---

## Section 1 — Hero (new)

### Intent

A straightforward landing-page hero that aligns directly with ad intent: practical growth outcomes for local businesses.

### Layout

- Two-column layout on desktop and tablet:
  - Left column: headline, short supporting copy, paired CTAs
  - Right column: compact media container with service pills and a carousel
- Single-column stacked layout on mobile:
  - Headline/copy/CTAs first
  - Media container below

### Copy direction

- Headline: concise and outcomes-first.  
  Working direction: "Expert digital marketing & sales for local business."
- Supporting paragraph: references Keystone's scale and results for local businesses.
- Tone: factual, confident, and concrete.

### CTAs

- Primary CTA: demo action (same behavior as existing lead capture triggers).
- Secondary CTA: learn more action (scrolls to the module section).
- CTA styling follows the existing side-by-side CTA pattern already used across homepage sections and inner-page shell conventions.

### Right-column media container

The media container has two layers:

1. **Service pill cluster** at the top (always visible)
2. **Single-focus carousel** below showing real work-example imagery

The pill set in this section:
- Web
- Ads
- Social
- Content
- Reviews
- Leads
- Sales

One pill is active at a time and visually paired with the active media slide.

---

## Section 2 — Work Showcase (reused)

Reuse the existing Work Showcase section and mobile counterpart from the homepage stack without introducing new card designs.

- Desktop/tablet: existing Work Showcase treatment
- Mobile: existing Mobile Work Showcase treatment

The section should remain content-driven and should keep its current interaction model, entrance behavior, and loading contract.

---

## Section 3 — How Modules Work (new)

### Intent

A long explanatory section that clearly breaks down each module with practical context and visual examples.

### Structure

Seven module rows in this order:

1. Web
2. Ads
3. Social
4. Content
5. Reviews
6. Leads
7. Sales

Each row has:

- **Copy column**: module name, short explanation, supporting sentence, and a matching module pill
- **Media column**: carousel of relevant examples pulled from existing work-example assets

Rows alternate alignment:
- Row 1: copy left, media right
- Row 2: media left, copy right
- continue alternating through all rows

### Content behavior

- Module descriptions are concise and practical.
- Each description explains what Keystone handles, and what business outcome it supports.
- Copy avoids abstract brand language and keeps sales/operations framing.

### Media behavior

- Each module row carousel is scoped to work examples relevant to that module type.
- Carousels support left/right navigation and swipe behavior on touch devices.
- Visual style should remain consistent with current site mock-card and carousel language.

### Module-to-example mapping contract (deterministic)

The module section must reuse existing homepage Work Showcase cards (from `data/work-showcase.tsx`) with a fixed mapping so implementation is unambiguous.

Use this exact mapping:

| Module row | Source card type(s) from existing home data | Notes |
|---|---|---|
| Web | `web` | Website examples only |
| Ads | `ads` | Paid media examples only |
| Social | `social` | Organic/paid social examples |
| Content | `content` | Content deliverable examples |
| Reviews | `listings` | Use listing cards (example: `/work-showcase/cards/home-listings-card-focused`) |
| Leads | dedicated lead product screen | Use home product-screen leads visual set rooted at `/product-screens/screen-leads` |
| Sales | `sales` | Use all sales cards (example: `/work-showcase/cards/home-sales-card-focused`) |

Card ordering for each module carousel:

1. For module rows that map to Work Showcase card types (`web`, `ads`, `social`, `content`, `listings`, `sales`), filter existing `WORK_CARDS` to the mapped type(s).
2. Group by industry order already defined in `WORK_INDUSTRIES`.
3. Preserve each card's existing order within its industry group.
4. Render in that final order for desktop and mobile variants.
5. Leads is an exception and uses the home product-screen leads source set rooted at `/product-screens/screen-leads`, not `WORK_CARDS`.

For this spec revision:

- Leads uses the home product-screen leads visuals (`/product-screens/screen-leads`).
- Reviews uses listings cards (such as `/work-showcase/cards/home-listings-card-focused`).
- Sales uses all sales cards (such as `/work-showcase/cards/home-sales-card-focused`).

---

## Section 4 — Pricing (reused)

Reuse the existing pricing section pattern from homepage/inner landing stacks, including existing hierarchy and CTA behavior.

No redesign is introduced in this spec; this is a reuse section for continuity and conversion.

---

## Shell and chrome expectations

- Page should render within the standard inner-page shell.
- Shared header/navigation and footer should be included automatically by layout.
- If shared shell is not present, that is a bug outside this spec's visual intent.

---

## Responsive behavior

### Desktop (`>= 1280px`)

- Hero presents clear two-column composition.
- Module section alternates copy/media left-right by row.
- No horizontal overflow.

### Tablet (`768px - 1279px`)

- Hero remains two-column when space allows, with reduced spacing.
- Module rows may retain alternating flow with tighter gutters and reduced media footprint.
- No clipped media or overflowing pill labels.

### Mobile (`< 768px`)

- Hero stacks into one column.
- Module rows become single-column stacks (copy above media for every row).
- Pill labels wrap cleanly and remain readable.
- Carousel controls remain touch-friendly.

---

## Motion and accessibility

- Motion is supportive, not theatrical.
- Any entrance or carousel motion respects reduced-motion preferences.
- Interactive controls are keyboard reachable and visually focusable.
- Pills used as controls expose clear active/inactive state.
- Decorative media uses decorative semantics; informative visuals include meaningful labels when needed.

---

## Asset preparation for this spec

Assets prepared for this page are stored under:

- `public/how-it-works/icons/`
- `public/how-it-works/references/`
- `public/how-it-works/work-examples/`

Current prepared files:

- `public/how-it-works/icons/front-desk.png`
- `public/how-it-works/icons/web.png`
- `public/how-it-works/icons/business-info.png`
- `public/how-it-works/icons/social.png`
- `public/how-it-works/icons/content.png`
- `public/how-it-works/icons/contacts.png`
- `public/how-it-works/icons/workstream.png`
- `public/how-it-works/icons/ads.png`
- `public/how-it-works/icons/reviews.png`
- `public/how-it-works/references/hero-landing-reference.png`
- `public/how-it-works/references/pill-row-reference.png`

---

## Out of scope

- Replacing or deleting the existing `/services` page
- Linking `/how-it-works` in global navigation
- New backend data models or API contracts
- Reworking existing homepage section logic beyond declared reuse

---

## Acceptance criteria

### Route and isolation

- [x] `/how-it-works` exists as a standalone page route
- [x] Existing `/services` route remains unchanged
- [x] `/how-it-works` is not linked in site navigation

### Hero

- [x] Hero presents a clear, utilitarian value proposition aligned to ad intent
- [x] Hero includes two CTAs: demo and learn more
- [x] Hero right column includes service pills and a single-focus carousel
- [x] Service pills include: Web, Ads, Social, Content, Reviews, Leads, Sales

### Reuse sections

- [ ] Work Showcase section is reused as section two
- [ ] Pricing section is reused as final section
- [x] Reused sections match existing site style and behavior

### Module section

- [x] Seven module rows exist in the specified order
- [x] Each row includes explanatory copy, matching pill, and relevant media carousel
- [x] Desktop/tablet rows alternate copy/media alignment
- [x] Mobile rows stack cleanly without overflow
- [ ] Module carousels use the exact source mapping defined in this spec
- [x] Reviews row is sourced from existing `listings` examples (including `/work-showcase/cards/home-listings-card-focused`)
- [x] Leads row is sourced from `/product-screens/screen-leads`
- [x] Sales row is sourced from existing `sales` examples (including `/work-showcase/cards/home-sales-card-focused`)

### Shell and responsiveness

- [x] Standard inner-page header/footer shell appears automatically
- [x] No horizontal overflow at mobile, tablet, or desktop breakpoints
- [x] CTA controls and carousel controls are usable on keyboard and touch

### Motion and accessibility

- [x] Reduced-motion users receive stable, non-animated equivalents
- [x] Focus states are visible on all interactive controls
- [x] Active/inactive module states are visually clear
