# Spec 041 — Careers (redesign)

**Status:** Approved — in implementation
**Type:** A full redesign of the `/about/careers` page in the new inner-page language (the same clean, light, content-first system as the `/pricing`, `/blog`, and `/how-it-works` redesigns), replacing the simple hero + perks + roles layout. Introduces a recruiting hero with a decorative team collage, two reusable "people wall" sections (employee stories, backers), and a compact open-roles list.
**Reference:** Five screenshots of a small-business software company's careers page (an Owner.com-style site): a mission-led hero with a photo/video collage and two CTAs; a leadership team grid; a "what it's like to work here" video-quote masonry; a values list; a brand-colored values call-to-action band; an investors / "backed by the best" people grid; and a grouped open-roles listing with apply rows. Built per the "Reference-Driven Components" workflow; no Figma.
**Depends on:** 036 (`SpotlightCard`, `CardGrid` — the card toolkit the collage / story / backer walls compose), 037 (inner-page sections — `SplitHero`, `ContentSection`, `CtaBand`, `FeatureGrid`, `JobList`, `TeamShowcase`), 039 (`CenteredHero`, icon/link `FeatureGrid`), 008 (lead capture).
**Names:** `TeamCollage` (a decorative hero collage in `design-system/patterns/careers/`), `EmployeeStories` and `BackerGrid` (two new sections in `design-system/sections/`), a redesigned `JobList`, and one authored content module, `data/careers-page.tsx`. All open to a rename.

---

## What this is

The careers page recruits. It opens with the mission ("help local business win"), shows who you would work with and what the culture feels like, states what the company values, and ends with the open roles. It reads clean and light like the other redesigned inner pages.

Two of the reference's sections lean on data Keystone does not have its own source for yet — a wall of employee video testimonials and an investor / "backed by" grid. By explicit instruction these ship now with clearly representative **sample content**, authored centrally so a real list drops in later without touching a component. Everything else (the team grid, the open roles) is driven by the live public API.

The page chrome (site nav, footer, lead-capture modal) comes from the standard inner-page shell, exactly like every other inner page. This spec supplies the body between the nav and the footer.

---

## Scope

### In scope

- A redesigned page at `/about/careers`, composed from the inner-page sections plus the new pieces below.
- **`TeamCollage`** — a decorative, token-built collage (a small grid of soft gradient tiles, each a role label and a person glyph) that fills the hero's media side. No real photos; hidden from assistive tech.
- **A recruiting hero** — the existing `SplitHero` carrying an eyebrow, a bold mission headline, a supporting line, a primary "View open roles" action (jumps to the roles list) and a secondary "Meet the team" action, with the `TeamCollage` as its media (no colored frame band).
- **`EmployeeStories`** — a new section: a masonry of culture "story" tiles (a quote + a name/role over a soft surface, a couple sized larger for rhythm), composed from `CardGrid` + `SpotlightCard`. Ships with sample content.
- **`BackerGrid`** — a new section: a compact grid of "backed by" people tiles (a monogram, a name, and a firm), composed from `CardGrid` + `SpotlightCard`. Ships with sample content.
- **A redesigned `JobList`** — a compact stacked list of open-role **rows** (title + a tag or two on the left, location on the right, the whole row a link to the role with an "Apply" cue), replacing the previous card grid. Anchored so the hero's primary CTA can jump to it.
- A values section rendered with the existing icon `FeatureGrid`, and the existing full-bleed brand-green band used as the mid-page "values" call to action.
- One authored content module, `data/careers-page.tsx`, holding every string: hero copy, collage tile labels, culture/values items, the sample stories, the sample backers, and the band copy.
- The `/styles` catalog gains a Careers panel showing `TeamCollage`, `EmployeeStories`, `BackerGrid`, and the redesigned `JobList` rows.

### Out of scope

- **The nav "Careers" link** already points at `/about/careers`; it does not change. The route does not move.
- **The job-detail pages** (`/careers/<slug>`) are unchanged.
- **New photographic assets.** The collage, story tiles, and backer tiles are tokenized; no imagery is added.
- **A real employee-testimonial or investor data source.** Those two sections use authored sample content until a source exists.
- **Department grouping of roles.** The role entity carries no department, so roles render as one clean list, not grouped sections.

---

## Visual design

Exact colors, sizes, and spacing are chosen at implementation against our tokens. The result must read as Keystone — cream and ink surfaces, brand orange, ink-green, mint; our display and body type; our eyebrow treatment. The mobile↔desktop hand-off is the app-wide **985px** boundary.

### 1. Hero

A two-column `SplitHero`: on the left an eyebrow, a large display headline about helping local business win, a supporting line, and two actions — a solid "View open roles" and a quieter "Meet the team." On the right the `TeamCollage`: a small grid of soft gradient tiles in alternating brand / mint / ink tones, each carrying a quiet role label (Engineering, Customer success, Design, Sales, Growth, …) and a simple person glyph — evoking a diverse team without photographs. Below 985px the collage sits beneath the copy.

### 2. Leadership team

The existing `TeamShowcase` (portrait, name, role, short bio) inside a `ContentSection`, fed by the live team API. Hidden if the API returns nothing.

### 3. Life at Keystone

An `EmployeeStories` masonry inside a `ContentSection`: soft-surface tiles each holding a short first-person quote about working here and an attribution (name + team). A couple of tiles span wider for rhythm, the rest are equal cells — a culture quote wall, not a carousel. Sample content.

### 4. Our values

A `FeatureGrid` (the redesign's icon variant) of the handful of company values, each an icon, a title, and a line of copy.

### 5. Values band

The existing full-bleed brand-green `CtaBand` used mid-page: a line inviting people who share the values to apply, with an action into the roles list.

### 6. Backed by

A `BackerGrid` inside a `ContentSection`: a compact grid of small tiles, each a monogram, a person's name, and the firm they're known for — the "in good company" proof block. Sample content.

### 7. Open roles

The redesigned `JobList` inside a `ContentSection` anchored as the hero CTA's target: a stacked list of rows, each row the role title with a small tag (employment type / remote) and its location, the whole row a link to the role detail with an "Apply" cue that warms to brand on hover. When there are no active roles, a single "no open roles" row invites an introduction.

### 8. Closing band

The existing full-bleed brand-green closing call-to-action band above the footer.

---

## Animation behavior

- The page is content-first and **static**: no scroll-driven entrance, no parallax, no autoplaying media, no carousels.
- Interactive elements (role rows, band buttons, the "meet the team" link) show a subtle hover/focus shift; nothing lifts dramatically.
- **Reduced motion:** every section renders complete and fully visible; hover/transition affordances are suppressed.

---

## Content & data sources

All page content is authored centrally in `data/careers-page.tsx` and passed into the sections — the page file only composes. Collage tiles, story tiles, and backer tiles carry small icon glyphs (data-as-content, the same `.tsx` pattern as the service / pricing / how-it-works pages). No copy, label, or link is invented inside a component.

| Element | Source |
|---|---|
| Hero eyebrow / title / subtitle / actions | Authored copy |
| Collage tile labels + glyphs | Authored copy (decorative) |
| Leadership team | Live team API (`getTeamMembers`) |
| Employee story tiles | Authored **sample** copy |
| Values tiles | Authored copy + icon glyph |
| Values band | Authored copy; action jumps to the roles list |
| Backer tiles | Authored **sample** names / firms |
| Open roles | Live job-postings API (`getJobPostings`); rows link to `/careers/<slug>` |
| Closing band | Authored copy; action routes to the standard get-in-touch flow |

---

## New components

### Sections (`design-system/sections/`)

- **`EmployeeStories`** — takes `stories: EmployeeStory[]` (id, quote, name, role, optional `wide` flag, optional icon) and an `ariaLabel`. Renders a `CardGrid` of `SpotlightCard` quote tiles. Presentational only.
- **`BackerGrid`** — takes `backers: Backer[]` (id, name, firm, optional icon) and an `ariaLabel`. Renders a `CardGrid` of small `SpotlightCard` monogram tiles. Presentational only.

### Pattern (`design-system/patterns/careers/`)

- **`TeamCollage`** — takes `tiles: CollageTile[]` (label + glyph + tone). Renders a decorative `CardGrid` of gradient `SpotlightCard`s, hidden from assistive tech.

### Refactor

- **`JobList`** keeps its `jobs: JobPosting[]` prop and its empty state, but renders compact rows instead of a card grid. The job-detail link target is unchanged.

### Tokens

- None new. Every new piece reuses existing color, radius, spacing, and shadow roles.

---

## Accessibility

- The collage, story tiles, and backer tiles are decorative chrome; the collage is `aria-hidden`, and the story/backer copy reads in normal flow where it is real content.
- Open-role rows are real links with discernible text; their "Apply" cue and any glyph are decorative.
- The team grid keeps its existing semantics; the values grid uses `FeatureGrid` card semantics; both bands keep their button semantics.
- Color contrast meets WCAG AA on the cream surfaces, the gradient tiles, and the green bands; every interactive target works on touch and shows a visible focus ring.

---

## Responsive behavior

- The whole page hands off at **985px**. Above it the hero is two columns (copy · collage), the stories masonry honors its spans, the backers grid is a multi-column grid, and roles are full-width rows; below it the hero stacks (copy, then collage), the masonry and backer grid collapse to one column, and rows stack their location beneath the title. No horizontal overflow at 390px.
- The 1280px refinement tier nudges spacing only.

---

## Acceptance criteria

- [ ] `/about/careers` renders in the new language: a `SplitHero` with the `TeamCollage`, the live `TeamShowcase`, an `EmployeeStories` masonry, a values `FeatureGrid`, a mid-page green values band, a `BackerGrid`, the redesigned `JobList` rows, and the full-bleed green closing band — inside the standard inner-page shell.
- [ ] The hero's primary action jumps to the open-roles list; the roles render as compact rows, each linking to `/careers/<slug>`, with an empty state when there are no active roles.
- [ ] The collage, story tiles, and backer tiles contain no real photos; the collage is hidden from assistive tech; the employee-story and backer content is clearly representative sample content authored in `data/careers-page.tsx`.
- [ ] At ≥985px the hero is two columns and the people walls are multi-column; below 985px everything stacks with no horizontal overflow at 390px.
- [ ] Under reduced motion the page renders complete and fully visible with no entrance animation.
- [ ] `TeamCollage`, `EmployeeStories`, `BackerGrid`, and the redesigned `JobList` appear in the `/styles` catalog.
- [ ] `npx tsc --noEmit` and `npm run lint` pass; the affected explainers are updated in the same commit.
