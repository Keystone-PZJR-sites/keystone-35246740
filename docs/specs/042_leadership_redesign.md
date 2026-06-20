# Spec 042 — Leadership (redesign)

**Status:** Approved — in implementation
**Type:** A full redesign of the `/about/team` leadership page in the new inner-page language (the same clean, light, content-first system as the `/pricing`, `/blog`, `/how-it-works`, and `/careers` redesigns), replacing the simple hero + team grid + band layout. Introduces one new reusable section — a scrolling logo marquee — and generalizes the careers quote wall so it serves investor quotes too.
**Reference:** Three screenshots of a small-business software company's leadership page (an Owner.com-style site): a left-aligned "meet our leadership team" hero with a scrolling "our team built companies like" logo strip; a leadership team grid (portrait, name, title, prior-company logo); a "board of directors" row of dark portrait link cards; a blue "quotes from investors" band of quote cards; a "we're backed by the best" block with a scrolling "our investors built companies like" logo strip and an investor portrait grid; and a green closing band. Built per the "Reference-Driven Components" workflow; no Figma.
**Depends on:** 036 (`SpotlightCard`, `CardGrid`), 037 (inner-page sections — `ContentSection`, `CtaBand`, `TeamShowcase`), 039 (`CenteredHero`), 041 (`BackerGrid`, and the quote wall this spec generalizes).
**Names:** `LogoMarquee` (a new section in `design-system/sections/`), `QuoteWall` / `QuoteTile` (the generalized rename of spec 041's `EmployeeStories` / `EmployeeStory`, still used by the careers page), and one authored content module, `data/leadership-page.tsx`. All open to a rename.
**Supersedes naming from:** 041 — `EmployeeStories` / `EmployeeStory` become `QuoteWall` / `QuoteTile` so the same component serves both the careers culture quotes and these investor quotes. The careers page is updated to the new name in the same change; spec 041 is left unedited.

---

## What this is

The leadership page introduces the people behind Keystone and the company they keep. It opens with the team, shows the board, lets investors speak, and closes with the firms behind the company. It reads clean and light like the other redesigned inner pages.

Several of the reference's sections lean on data Keystone has no own source for yet — the prior-company logos under each leader, the board of directors, the investor quotes, and the investor / "backed by" people and logos. By explicit instruction those ship now with clearly representative **sample content** (fictional names and firms, never reproductions of real companies' logos or real people), authored centrally so a real list drops in later without touching a component. The live team grid is driven by the public API.

The page chrome (site nav, footer, lead-capture modal) comes from the standard inner-page shell. This spec supplies the body between the nav and the footer.

---

## Scope

### In scope

- A redesigned page at `/about/team`, composed from the inner-page sections plus the new pieces below.
- **`LogoMarquee`** — a new section: an optional lead-in label beside a horizontally scrolling, infinitely looping row of company wordmarks (rendered as styled text, not logo images). Scrolls continuously; pauses under reduced motion. Used twice — "our team built companies like" in the hero, and "our investors built companies like" in the backed-by block — with opposite directions.
- **`QuoteWall` / `QuoteTile`** — the generalized rename of spec 041's `EmployeeStories` / `EmployeeStory`. Same masonry of quote tiles; now used for both the careers culture quotes and these investor quotes.
- The **leadership grid** (existing `TeamShowcase`, live `getTeamMembers`).
- A **board of directors** block — a `CardGrid` of `SpotlightCard` portrait link cards (name, firm, forward arrow), composed in the page from sample content.
- A **quotes from investors** band — the `QuoteWall` inside a dark `ContentSection`, sample content.
- A **backed by** block — a second `LogoMarquee` plus the existing `BackerGrid`, sample content.
- One authored content module, `data/leadership-page.tsx`, holding every string: hero copy, both logo lists, the board, the investor quotes, the backers, section headings, and the band copy.
- The `/styles` catalog gains a Logo marquee panel, and the careers panel is updated to the `QuoteWall` name.

### Out of scope

- **The nav "Leadership" link** already points at `/about/team`; it does not change. The route does not move.
- **New photographic or logo assets.** Marquee logos are text wordmarks; board and investor tiles are tokenized. No real company logos are reproduced.
- **Prior-company attribution on real team members.** The live team entity carries no such field, and inventing one for a real person is not acceptable, so leaders render with their real name, role, and bio only.
- **A real board / investor / quote data source.** Those sections use authored sample content until a source exists.

---

## Visual design

Exact colors, sizes, and spacing are chosen at implementation against our tokens. The result must read as Keystone — cream and ink surfaces, brand orange, ink-green, mint; our display and body type; our eyebrow treatment. The mobile↔desktop hand-off is the app-wide **985px** boundary.

### 1. Hero

A `CenteredHero` (spec 039): a small eyebrow and a large display headline introducing the leadership team, with a supporting line. Directly beneath it a `LogoMarquee` with the lead-in "Our team built companies like" and a slowly scrolling row of company wordmarks.

### 2. Leadership grid

The existing `TeamShowcase` (portrait, name, role, short bio) inside a `ContentSection`, fed by the live team API. Hidden if the API returns nothing.

### 3. Board of directors

A `ContentSection` framing a `CardGrid` of `SpotlightCard` portrait link cards — a soft gradient surface, the director's name and firm anchored at the bottom, and a forward arrow cue. Sample content.

### 4. Quotes from investors

A dark `ContentSection` (the page's one ink band) framing a `QuoteWall` of light quote tiles — each a short quote and an attribution (name + firm). Sample content.

### 5. Backed by

A `ContentSection` with a heading, a `LogoMarquee` with the lead-in "Our investors built companies like" scrolling the opposite direction, and a `BackerGrid` of monogram tiles beneath it. Sample content.

### 6. Closing band

The existing full-bleed brand-green closing call-to-action band above the footer.

---

## Animation behavior

- The page is content-first and otherwise **static** — except the two logo marquees, which scroll continuously and seamlessly (the row is duplicated so the loop has no visible seam). The two strips scroll in opposite directions.
- Hovering a marquee pauses it; the board cards and band buttons show a subtle hover/focus shift.
- **Reduced motion:** the marquees stop and render as a static row; everything else renders complete and fully visible.

---

## Content & data sources

All page content is authored centrally in `data/leadership-page.tsx` and passed into the sections — the page file only composes. No copy, label, name, or quote is invented inside a component, and no real company logo is reproduced.

| Element | Source |
|---|---|
| Hero eyebrow / title / subtitle | Authored copy |
| "Our team built companies like" logos | Authored **sample** wordmarks (text) |
| Leadership grid | Live team API (`getTeamMembers`) |
| Board of directors | Authored **sample** names / firms |
| Investor quotes | Authored **sample** quotes |
| "Our investors built companies like" logos | Authored **sample** wordmarks (text) |
| Backers | Authored **sample** names / firms |
| Closing band | Authored copy; action routes to the standard get-in-touch flow |

---

## New components

### Section (`design-system/sections/`)

- **`LogoMarquee`** — takes `logos: string[]`, an optional lead-in `label`, an optional `reverse` direction, and an `ariaLabel`. Renders the label beside a clipped track that scrolls its (duplicated) wordmark row infinitely; pauses on hover and under reduced motion. Presentational only.

### Refactor / rename

- **`EmployeeStories` → `QuoteWall`**, **`EmployeeStory` → `QuoteTile`** (spec 041). Pure rename — same markup and styles — so one quote wall serves the careers culture quotes and these investor quotes. The careers page, its data module, the catalog, and the explainers move to the new name in the same change.

### Tokens

- None new. Every piece reuses existing color, radius, spacing, motion, and shadow roles; the marquee's loop duration is a per-component CSS variable.

---

## Accessibility

- Each marquee is a labelled region; the duplicated wordmark copy used for the seamless loop is hidden from assistive tech, so each company name is announced once. Under reduced motion the strip is static.
- Board cards are real links with discernible text; their forward arrow is decorative.
- The quote wall and backer grid keep their card semantics; the team grid keeps its existing semantics; the closing band keeps its button semantics.
- Color contrast meets WCAG AA on the cream surfaces, the dark quotes band, the gradient tiles, and the green band; every interactive target works on touch and shows a visible focus ring.

---

## Responsive behavior

- The whole page hands off at **985px**. Above it the board and investor grids are multi-column and each marquee shows its label inline beside the track; below it the grids collapse to one column, the marquee label stacks above its track, and nothing overflows horizontally at 390px.
- The 1280px refinement tier nudges spacing only.

---

## Acceptance criteria

- [ ] `/about/team` renders in the new language: a `CenteredHero`, a "our team built companies like" `LogoMarquee`, the live `TeamShowcase`, a board-of-directors `SpotlightCard` grid, a dark investor-quotes `QuoteWall` band, a backed-by block with a second `LogoMarquee` and a `BackerGrid`, and the full-bleed green closing band — inside the standard inner-page shell.
- [ ] Both logo strips scroll continuously and seamlessly in opposite directions, pause on hover, and stop under reduced motion; the wordmarks are text, not reproduced logos.
- [ ] The board, investor quotes, both logo lists, and the backers are clearly representative sample content authored in `data/leadership-page.tsx`; the live leadership grid shows real team members with no invented prior-company attribution.
- [ ] `EmployeeStories` / `EmployeeStory` are renamed to `QuoteWall` / `QuoteTile`, the careers page still renders its culture quotes correctly, and nothing references the old names.
- [ ] At ≥985px the grids are multi-column; below 985px everything stacks with no horizontal overflow at 390px.
- [ ] `LogoMarquee` appears in the `/styles` catalog and the careers panel uses the `QuoteWall` name.
- [ ] `npx tsc --noEmit` and `npm run lint` pass; the affected explainers are updated in the same commit.
