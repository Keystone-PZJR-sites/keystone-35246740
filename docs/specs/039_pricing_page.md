# Spec 039 — Pricing Page

**Status:** Approved — in implementation
**Type:** A new standalone inner page at `/pricing`, built from the standard inner-page sections plus the reusable price summary lifted out of the homepage pricing block and one new interactive piece — a simple "pay for what you use" calculator. A clean, light, content-first page in the spirit of every other inner page, not the dark, animated homepage pricing moment.
**Reference:** Four screenshots attached in chat of a restaurant-software pricing page — a centered light page header; a price summary; a short "get a demo" action; an "included on all plans" list (a checkmark, a bold label, and a line of supporting copy per row); a row of three small reassurance cards (setup help, protection, support); a "trusted by owners" testimonial rail; and an expandable FAQ. **Skipped from the reference per instruction:** the "see why we're rated #1" band, the "top 3 reasons" editorial block, and the bottom demo form. No Figma; built per the "Reference-Driven Components" workflow in the rules.
**Depends on:** 005 (homepage pricing), 021 (mobile pricing), 037 (inner-page sections + CtaBand / FaqAccordion options), 008 (lead capture).
**Proposed names:** `CenteredHero` (a new centered, light, non-split inner-page hero — the redesign successor to the dark `PageHero`), `PriceSummary` (the reusable price card extracted from `PricingSection`), `PricingCalculator` (the new interactive estimator section), and `QuantityStepper` (a new −/value/+ input primitive the calculator needs). One authored content module, `data/pricing-page.tsx` (`.tsx` because the included / reassurance tiles carry icon glyphs, the same data-as-content pattern as the service pages). All names open to a rename.

---

## What this is

Today the only pricing surface is the dark teal block on the homepage (spec 005 / 021) and the nav's "Pricing" link scrolls to it. This spec adds a real, linkable `/pricing` page and repoints the nav at it.

The model the page communicates, in plain terms:

- **One price covers everything you need.** A single monthly price per location, with every Keystone tool included — the same price and the same "everything included" idea the homepage already shows.
- **Want more work done? Only pay for what you use.** Beyond the included plan, optional extra work is priced simply, per unit. A small calculator lets a visitor dial in how much extra work they expect and see an estimated monthly total. There is no "credits" concept anywhere on this page.

The page reads clean and light like the other inner pages and like the reference — not the dark, scroll-animated homepage treatment.

The page chrome (site nav, footer, lead-capture modal) comes from the standard inner-page shell, exactly like every other inner page. This spec supplies only the body between the nav and the footer.

---

## Scope

### In scope

- A new page at `/pricing`, composed from existing inner-page sections plus the two new pieces below.
- **`PriceSummary`** — the price card (tagline, the two-tone price, the supporting lines, and the "everything included" chips) lifted out of `PricingSection` into its own reusable component with a **tone** option, so it can render dark (the homepage's look, unchanged) or light (the cream look this page uses). The homepage keeps its credits paragraph and "coming soon" add-ons; those stay in `PricingSection` and do **not** appear on `/pricing`.
- **`PricingCalculator`** — a new section: the included plan as the starting point, a short list of optional extra-work line items each with a per-unit price and a quantity control, and a live "estimated monthly total" that updates as quantities change, beside a primary action.
- **`QuantityStepper`** — a new input primitive (a minus button, the current value, a plus button) the calculator uses, registered in the `/styles` inputs panel.
- The included-work detail (the reference's "included on all plans") rendered with the existing feature grid, and the three reassurance cards rendered with the existing card grid / feature grid. Each included / reassurance tile carries an icon, and the included tiles that map to a service page become link cards (a ghost `ArrowUpRight` cue) pointing at the relevant `/services/<slug>` page.
- A short pricing FAQ via the existing accordion, a testimonial rail via the existing carousel, and the existing full-bleed green closing band.
- One authored content module, `data/pricing-page.tsx`, holding every string, the included-items list (with each tile's icon and optional service-page link), the calculator's base price and extra-work catalog, the reassurances, and the FAQ pairs.
- Repointing the nav "Pricing" link from the homepage anchor to `/pricing`.
- The `/styles` catalog gains a Pricing panel showing `PriceSummary` (both tones), `PricingCalculator`, `QuantityStepper`, and the `FeatureGrid` icon + link variant; the Iconography panel lists every `@untitledui/icons` glyph in use.

### Out of scope

- **The homepage pricing block's appearance.** Extracting `PriceSummary` is an internal refactor that must leave the homepage and `/how-it-works` / `/portal` pricing visuals byte-for-byte unchanged. This spec does not restyle them and does not touch the credits or add-on messaging there.
- **Real extra-work prices.** The calculator's per-unit prices and the exact line items are authored content. This spec ships a sensible **placeholder** catalog in the data module, clearly commented as placeholders to confirm; it does not invent final prices as fact.
- **Any backend, checkout, payment, or quote-saving.** The calculator is an on-page estimator only. Its total is illustrative; the action routes to the standard lead-capture / "get in touch" flow.
- **Multi-tier plans.** The reference shows two plan cards; we have one plan. The page presents a single price, not a plan comparison.
- **Currency / locale handling.** Prices render in the site's existing single currency, formatted at implementation.

---

## Visual design

Exact colors, sizes, and spacing are chosen at implementation against our tokens. The screenshots are the visual anchor, but the result must read as Keystone — cream and ink surfaces, brand orange, ink-green, and mint, our display and body type, our eyebrow treatment.

The mobile↔desktop hand-off is the app-wide **985px** boundary, not a component-specific cutoff. Tablets and iPad portrait fall below it.

The page is a clean inner-page stack: a centered light hero, then cream body sections, closing on the green band above the footer.

### 1. Page header

A new **`CenteredHero`** section — the clean, centered, light, non-split page opener on the cream surface (the floating nav sits over its top edge), modeled on the blog gallery header. A small eyebrow, a large display headline communicating "simple, honest pricing," and one supporting line. This replaces the older dark `PageHero` for the redesign; `PageHero` stays on the not-yet-redesigned inner pages.

### 2. Price summary

A single price card, centered on the cream page, carrying: a short tagline, the price as one two-tone line (amount, then period), two supporting lines (everything included; no contracts, simple to scale), and the row of "everything included" chips — each a checkmark and a short label — exactly the content the homepage already shows.

This is the **light tone** of `PriceSummary`: the same composition as the homepage's dark card, recolored for the cream page — the price in our brand/ink tones, the chips as light pills with colored checkmarks, on a light card surface. Directly beneath it sits one primary action (the site's standard "get a demo" / "get in touch").

The homepage continues to render the **dark tone** of the same component, with its credits paragraph and "coming soon" add-ons appended — unchanged.

### 3. Calculator — "only pay for what you use"

A cream section with a centered heading and short intro that frames the idea: the plan covers everything you need; if you want more work done, you only pay for what you use.

The calculator itself is one panel:

- **A starting line** for the included plan — its name and the base monthly price, presented as the floor the total builds on.
- **A short list of optional extra-work rows.** Each row shows a label, a one-line description of the work, a per-unit price with its unit (e.g. "per post"), and a **quantity control** — a minus button, the current count, and a plus button — starting at zero.
- **A live estimated monthly total**, prominent and horizontally centered in the panel footer, that equals the base price plus, for every row, its quantity times its unit price. It updates the instant a quantity changes.
- **A primary action** on its own full-width row beneath the total (get a demo / get in touch).
- A quiet note that every plan is month-to-month with no contracts.

(The earlier draft included a clear/reset affordance and placed the action beside the total; both were dropped in implementation per feedback — the footer is now a centered total above a single full-width action.)

The quantity control is the new `QuantityStepper` primitive: two round icon buttons flanking the current value, the value never going below zero, with a sensible upper bound so the estimate stays realistic. On a light card surface using our input/border/brand tokens.

Below 985px the rows stack into a comfortable single column: label and description on top, the price and the stepper on a row beneath; the running total and action pin to the bottom of the panel so they stay reachable while adjusting quantities.

### 4. Everything included

The reference's "included on all plans" list: a centered section heading, then a set of rows, each a bold short title and a line of supporting copy. Rendered with the existing feature grid. Each tile leads with an icon tile above its heading, and tiles that map to a service page (website, social, content, messages, ads, reviews, website updates) are link cards — the whole tile links to the relevant `/services/<slug>` page with a ghost `ArrowUpRight` cue in the top-right that warms to brand on hover; tiles without a matching service page (e.g. the reports tile) simply omit the arrow. This expands on the summary chips with a sentence of value per item.

On the page this list sits **above** the calculator: the visitor first sees everything the plan includes, then the "only pay for what you use" estimator for extra work.

### 5. Reassurances

A row of three small cards under a section title, mirroring the reference's trio (e.g. setup & migration help, no long-term contracts, real human support) — each an icon tile, a short title, and a line of copy. Rendered with the existing feature grid at three columns, stacking below 985px. These tiles carry icons but no links (they are not services). Exact trio is authored content.

### 6. Testimonial rail

The existing testimonial carousel — a left-aligned section title with previous / next controls, then a horizontally scrollable row of quote and portrait cards — reusing the same testimonial content the service pages use.

### 7. FAQ

The existing expandable accordion: a centered label and a handful of pricing questions ("what's included," "what do I pay for extra work," "are there contracts," "how fast can I start," and similar), authored as plain question/answer pairs.

### 8. Closing band

The existing full-bleed brand-green closing call-to-action band, one centered headline and a single light action, directly above the footer.

---

## Animation behavior

- The page is content-first and light: **no** scroll-driven entrance animation on the price summary here (the GSAP entrance stays with the homepage `PricingSection` only), no parallax, no autoplaying media.
- Interactive controls (stepper buttons, chips, accordion rows, carousel) show a subtle hover/focus shift to signal they are interactive; nothing lifts dramatically.
- The estimated total changes **instantly** when a quantity changes — no animated count-up.
- **Reduced motion:** every section renders complete and fully visible immediately; hover/transition affordances are suppressed.

---

## Content & data sources

All page content is authored centrally in `data/pricing-page.ts` and passed into the sections — the page file only composes. Nothing is hardcoded inside the components.

| Element | Source |
|---|---|
| Header eyebrow / title / subtitle | Authored copy |
| Price tagline, amount, period, supporting lines, included chips | Reused from the shared homepage pricing content (`data/shared-sections.ts`) so the price and included list stay in one place |
| Calculator base price + included-plan name | Authored, kept consistent with the shared price |
| Extra-work line items (label, description, unit, **placeholder** unit price) | Authored in `data/pricing-page.ts`, commented as placeholders to confirm |
| "Everything included" detail rows | Authored copy |
| Reassurance trio | Authored copy |
| Testimonials | The existing testimonial content reused by the service pages |
| FAQ pairs | Authored copy |
| Closing band headline + action | Authored copy; action defaults to the standard get-in-touch flow |

No price, count, label, or copy is invented as fact inside a component — every value comes from the data module above, and the extra-work prices are explicitly placeholders pending confirmation.

---

## New components, primitives & tokens

### Primitive (`design-system/primitives/`)

- **`QuantityStepper`** — a minus button, the current value, and a plus button. Value-controlled (the parent owns the number), clamped to a minimum of zero and a sensible maximum, fully keyboard-operable, with a visible focus state and an accessible name announcing what it counts. Built from the existing button/icon and token system; registered in the inputs panel of `/styles`.

### Sections (`design-system/sections/`)

- **`PriceSummary`** — the price card extracted from `PricingSection`: tagline, two-tone price, supporting lines, included chips. A **tone** prop selects dark (homepage) or light (this page). Presentational only; no animation (the homepage's GSAP entrance stays in `PricingSection`, which composes `PriceSummary` for its inner content).
- **`PricingCalculator`** — the estimator section: takes the base price and the extra-work catalog, owns the per-row quantities in React state, and renders the rows, the live centered total, and a full-width action beneath it. Client component (it has interactive state); the page stays a server component and feeds it data.

### Refactor

- **`PricingSection`** is rewritten to compose `PriceSummary` (dark tone) for its price/chips, keeping its own credits paragraph, add-ons, and scroll entrance. Observable output on the homepage, `/how-it-works`, and `/portal` is unchanged.
- **`FeatureGrid`** gains two optional, backward-compatible props on each item: an `icon` (rendered in a tile above the heading) and an `href` (turns the whole card into a link with a ghost `ArrowUpRight` cue). Existing callers (about, careers) pass neither and render unchanged.

### Tokens (`design-system/tokens/tokens.css`)

- The existing pricing color roles are dark-surface specific. The **light** tone of `PriceSummary` needs light-surface equivalents (the price two-tone, the chip border/label, the card surface on cream). Add only the roles genuinely needed, named by role (not hue), and mirror them into `tokens/catalog.ts`. No raw hex in components.

---

## Accessibility

- The price is announced as a single string (the existing pattern), not as disjoint spans.
- Each `QuantityStepper` has an accessible name describing what it counts; its buttons are real buttons, keyboard-operable, with visible focus; the minus button is disabled (and announced as such) at zero.
- The estimated monthly total lives in a polite live region so screen-reader users hear it update as quantities change.
- The included list and reassurances use real list / heading semantics; checkmarks are decorative.
- The FAQ uses the existing native `<details>` accordion; the carousel keeps its existing keyboard and control semantics.
- Color contrast meets WCAG AA on both the light price card and the green band; every interactive element works on touch with a ≥44px target.

---

## Responsive behavior

- The whole page hands off at **985px**. Above it: the price summary is a centered card, the calculator rows are single-line (label/description left, price + stepper right), the included list and reassurances are multi-column. Below it: the calculator rows stack (price + stepper beneath the label), the total + action pin to the panel bottom, and the included list and reassurances collapse toward one column. No horizontal overflow at 390px.
- Touch targets (stepper buttons especially) stay at least 44×44px on mobile.

---

## Acceptance criteria

- [ ] `/pricing` exists as a real page with the site nav and footer, and the nav "Pricing" link navigates to it (no longer scrolls to the homepage block).
- [ ] The page renders, in order: centered light hero (`CenteredHero`), light price summary with primary action, an "everything included" list, the "pay for what you use" calculator, three reassurance cards (under a section title), a testimonial rail, a centered pricing FAQ, and the full-bleed green closing band above the footer.
- [ ] The price summary shows the same price and the same "everything included" chips as the homepage, recolored for the cream page, with no credits paragraph and no "coming soon" add-ons.
- [ ] The homepage, `/how-it-works`, and `/portal` pricing blocks look exactly as they did before (dark card, credits paragraph, add-ons, scroll entrance) — the extraction changed nothing visible there.
- [ ] The calculator starts at the base price with every extra-work quantity at zero; raising or lowering a quantity updates the estimated monthly total immediately to base plus the sum of each quantity times its unit price.
- [ ] Quantities never drop below zero; the minus control is disabled at zero.
- [ ] The calculator's prices are visibly authored placeholders (sourced from `data/pricing-page.tsx`), and a note makes clear every plan is month-to-month with no contracts.
- [ ] The total is announced to screen readers as it changes; every stepper has an accessible name; all controls are keyboard-operable with visible focus.
- [ ] At ≥985px the calculator rows are single-line and the lists are multi-column; below 985px rows stack, the total + action stay reachable, and there is no horizontal overflow at 390px.
- [ ] Under reduced motion the page renders complete and fully visible with no count-up and no entrance animation.
- [ ] `PriceSummary` (both tones), `PricingCalculator`, `QuantityStepper`, and the `FeatureGrid` icon + link variant appear in the `/styles` catalog; the Iconography panel lists every `@untitledui/icons` glyph in use; any new pricing token appears in the color foundation panel.
- [ ] `npx tsc --noEmit` and `npm run lint` pass; the affected explainers are updated in the same commit.
