# Spec 040 — How It Works (redesign)

**Status:** Approved — in implementation
**Type:** A full redesign of the standalone `/how-it-works` page in the new inner-page language (the same clean, light, content-first system as the `/pricing` and `/blog` redesigns), replacing the legacy animated module page. Introduces one new reusable section — a numbered "process steps" narrative — and a small set of tokenized step visuals.
**Reference:** Two screenshots of a restaurant-software marketing site (an Owner.com-style homepage) showing a numbered, step-by-step "how we grow your business" sequence — each step a number, a short title, a line of copy, and a product visual, walking down the page. Built per the "Reference-Driven Components" workflow; no Figma.
**Supersedes:** 032 (orphan how-it-works page) and 033 (post-launch refresh) — the legacy `HowItWorksHero` / `HowItWorksModules` / `HowItWorksModuleCarousel` / `HowItWorksPill` sections and `data/how-it-works.ts` are removed.
**Depends on:** 037 (inner-page sections — `ContentSection`, `CtaBand`, `FaqAccordion`, `MediaFeatureList`), 039 (`CenteredHero`, the icon/link `FeatureGrid`), 034 (site nav — the Services dropdown headings this page mirrors), 008 (lead capture).
**Names:** `ProcessSteps` (a new section in `design-system/sections/`), `ProcessMock` (the tokenized per-step visuals in `design-system/patterns/how-it-works/`), and one authored content module, `data/how-it-works-page.tsx`. All open to a rename.

---

## What this is

The page tells the story of how Keystone grows a local business, as one connected system, in six plain-language steps. The narrative maps onto the Services dropdown's four "what we do" headings, bookended by a discovery step at the start and the always-on optimization engine at the end:

1. **Discover** — the growth team learns your business, goals, and what you run today.
2. **Build your presence** — website, social, maps, reviews. *(Services: "A beautiful, elevated presence")*
3. **Attract new leads** — Google & Meta ads, content marketing. *(Services: "New leads and potential clients")*
4. **Convert customers** — sales team, text- and call-based sales follow-up. *(Services: "Convert long-term customers")*
5. **Retain & grow loyalty** — email, smart re-engagement, reviews, rebookings, rewards. *(Services: "Turn happy customers into evangelists")*
6. **The always-on engine** — Keystone manages and optimizes the whole system, getting better with every interaction.

It reads clean and light like the other redesigned inner pages — not the legacy dark, animated, carousel-driven treatment.

The page chrome (site nav, footer, lead-capture modal) comes from the standard inner-page shell, exactly like every other inner page. This spec supplies the body between the nav and the footer.

---

## Scope

### In scope

- A redesigned page at `/how-it-works`, composed from the inner-page sections plus the new `ProcessSteps` section.
- **`ProcessSteps`** — a new section: an ordered list of steps, each a big numbered node on a connecting rail, an eyebrow + title + copy, an optional row of service-page "chips" (ghost-arrow links to the relevant `/services/<slug>` pages), and a framed media panel. Stacks below 985px.
- **`ProcessMock`** — six decorative, token-built step visuals (discover, presence, leads, convert, loyalty, engine), in the spirit of the service pages' `BentoMock`s. No real data, no imagery; hidden from assistive tech.
- A short "why it works" recap rendered with the existing `FeatureGrid` (one team / always-on / simple pricing — the last linking to `/pricing`).
- A testimonial rail (existing carousel), a short process FAQ (existing accordion, centered), and the existing full-bleed green closing band.
- One authored content module, `data/how-it-works-page.tsx`, holding every string, the six steps (each naming its `mock` and its service links), the recap, testimonials, and FAQ.
- The `/styles` catalog gains a Process steps panel showing `ProcessSteps` and the six `ProcessMock`s.
- Removal of the legacy how-it-works sections, their stylesheet, and `data/how-it-works.ts`.

### Out of scope

- **The nav "How it Works" link** already points at `/how-it-works`; it does not change.
- **New photographic assets.** Step visuals are tokenized mocks, not photos.
- **Per-service detail content.** The chips link to the existing service pages (spec 037); this page does not restate them.
- **Scroll-driven animation.** The page is content-first and static (see below).

---

## Visual design

Exact colors, sizes, and spacing are chosen at implementation against our tokens. The result must read as Keystone — cream and ink surfaces, brand orange, ink-green, mint; our display and body type; our eyebrow treatment. The mobile↔desktop hand-off is the app-wide **985px** boundary.

### 1. Page header

A `CenteredHero` (spec 039): a small eyebrow, a large display headline framing "your always-on growth team," and one supporting line. The floating nav sits over its top edge.

### 2. The steps

The heart of the page: a `ProcessSteps` section inside a centered `ContentSection` heading block. Each step is a row of three parts at desktop:

- **A numbered node** (`01`–`06`) — a filled brand-orange circle with the number, matching the primary button's brand-solid + dark-text treatment. A thin **connecting rail** runs node-to-node down the left, reading as a spine for the sequence.
- **The copy** — a brand eyebrow (Discover / Build / Attract / Convert / Retain / Always on), a title, a line of copy, and, for steps 2–5, a wrapping row of **service chips**: pill links to the relevant `/services/<slug>` pages, each with a ghost `ArrowUpRight` cue that warms to brand on hover.
- **The media** — a soft tinted panel (the same cream panel as `MediaFeatureList`) framing the step's `ProcessMock`.

Below 985px the row stacks to a single column: numbered node, copy, then media; the rail is dropped.

The six mocks, all token-built and decorative:

- **discover** — an onboarding card: a team avatar, a couple of copy lines, and a short "what we learn" checklist.
- **presence** — a website browser frame: a URL chrome bar, a gradient hero block, a star rating, and an "on the map" chip.
- **leads** — an analytics card: a "new leads" stat with an up-trend badge and a rising bar chart.
- **convert** — a messaging thread: chat bubbles resolving into a "Booked" success chip.
- **loyalty** — a rewards card: a gift avatar, a points progress bar, stars, and a points chip.
- **engine** — an always-on badge: a circular refresh core inside orbit rings, an "Auto-optimizing" pill, and an up-trend line.

### 3. Why it works

A short three-up `FeatureGrid` (icons, the redesign's icon variant) recapping the model: one team not five vendors, always-on not set-and-forget, and simple month-to-month pricing (this tile links to `/pricing`).

### 4. Testimonial rail

The existing testimonial carousel, reusing the social-proof content the other pages use.

### 5. FAQ

The existing centered accordion with a handful of process questions ("how long until I'm live," "do I manage any of this," "how is this different from an agency," and similar).

### 6. Closing band

The existing full-bleed brand-green closing call-to-action band above the footer.

---

## Animation behavior

- The page is content-first and **static**: no scroll-driven entrance, no parallax, no autoplaying media or carousels (a clean break from the legacy page's animated modules).
- Interactive elements (service chips, accordion, carousel) show a subtle hover/focus shift; nothing lifts dramatically.
- **Reduced motion:** every section renders complete and fully visible; hover/transition affordances are suppressed.

---

## Content & data sources

All page content is authored centrally in `data/how-it-works-page.tsx` and passed into the sections — the page file only composes. Each step names a `mock` kind (the page builds the matching `<ProcessMock>`) and its service links; the recap tiles carry small icon glyphs (data-as-content, the same `.tsx` pattern as the service / pricing pages). No copy, label, or link is invented inside a component.

| Element | Source |
|---|---|
| Header eyebrow / title / subtitle | Authored copy |
| Step number / eyebrow / title / copy | Authored copy |
| Step visual | A `mock` kind mapped to a tokenized `ProcessMock` |
| Step service chips | Links to existing `/services/<slug>` pages (spec 037), mirroring the Services dropdown |
| Recap tiles | Authored copy + icon glyph; the pricing tile links to `/pricing` |
| Testimonials | The existing social-proof testimonial content |
| FAQ pairs | Authored copy |
| Closing band | Authored copy; action routes to the standard get-in-touch flow |

---

## New components

### Section (`design-system/sections/`)

- **`ProcessSteps`** — takes `steps: ProcessStepItem[]` (id, optional number, eyebrow, title, description, `media: ReactNode`, optional `services`, optional media `panel` tint) and an `ariaLabel`. Renders an ordered list with the numbered rail, copy, chips, and framed media. Presentational only; no state, no animation.

### Pattern (`design-system/patterns/how-it-works/`)

- **`ProcessMock`** — `kind`-driven decorative step visual (`discover | presence | leads | convert | loyalty | engine`), built entirely from tokens and hidden from assistive tech.

### Refactor / removal

- The legacy `HowItWorksHero`, `HowItWorksModules`, `HowItWorksModuleCarousel`, `HowItWorksPill`, their `how-it-works.css`, and `data/how-it-works.ts` are removed. Nothing else imported them.

### Tokens

- None new. `ProcessSteps` and `ProcessMock` reuse existing color, radius, spacing, and shadow roles.

---

## Accessibility

- The steps are an ordered list (`<ol>`); each step's number node and media/mocks are decorative (`aria-hidden`), so the meaning lives in the title and copy.
- Service chips are real links with discernible text; their ghost arrow is decorative.
- The recap uses the `FeatureGrid` card semantics; the FAQ uses the existing native `<details>` accordion; the carousel keeps its existing keyboard/control semantics.
- Color contrast meets WCAG AA on the cream surfaces, the brand-orange nodes, and the green band; every interactive target works on touch.

---

## Responsive behavior

- The whole page hands off at **985px**. Above it, each step is a three-column row (rail · copy · media) with the connecting rail; below it, steps stack (node, copy, media) and the rail is dropped. No horizontal overflow at 390px.
- The 1280px refinement tier nudges spacing only.

---

## Acceptance criteria

- [ ] `/how-it-works` renders in the new language: `CenteredHero`, the six-step `ProcessSteps` narrative, a "why it works" recap, a testimonial rail, a centered FAQ, and the full-bleed green closing band — inside the standard inner-page shell.
- [ ] The six steps read Discover → Build → Attract → Convert → Retain → Always-on engine, and steps 2–5 show chips linking to the matching `/services/<slug>` pages.
- [ ] Each step shows its tokenized `ProcessMock`; the mocks contain no real data or imagery and are hidden from assistive tech.
- [ ] At ≥985px each step is a three-column row with a connecting rail between numbered nodes; below 985px steps stack with no rail and no horizontal overflow at 390px.
- [ ] Under reduced motion the page renders complete and fully visible with no entrance animation.
- [ ] The legacy how-it-works sections, stylesheet, and `data/how-it-works.ts` are removed, and nothing references them.
- [ ] `ProcessSteps` and the six `ProcessMock`s appear in the `/styles` catalog.
- [ ] `npx tsc --noEmit` and `npm run lint` pass; the affected explainers are updated in the same commit.
