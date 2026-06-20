# Spec 043 — Our Story (redesign)

**Status:** Approved — in implementation
**Type:** A full redesign of the company / about page (`/about`) in the new inner-page language (the same clean, content-first system as the `/pricing`, `/blog`, `/how-it-works`, `/careers`, and `/about/team` redesigns), replacing the old `PageHero` + values + team + testimonials stack. The page is renamed **"Our story"** (the nav entry changes from "About Keystone"). Introduces a reusable `Marquee` mechanism (and refactors `LogoMarquee` onto it), a `StoryHero`, and a `Timeline` section.
**Reference:** Screenshots of a small-business software company's about page (an Owner.com-style site): a left headline + right lede hero over a wide "watch our story" media card; a dark mission band ("local owners are heroes to us") with a scrolling photo strip; a stats band; a "how it started" origin split; a long-term-vision timeline; a "come build with us" careers split; and a green closing band. Built per the "Reference-Driven Components" workflow; no Figma. The **layout** is matched faithfully; all copy is **original Keystone placeholder copy**, not the reference's text, and every photo is a tokenized placeholder slot.
**Depends on:** 036 (`SpotlightCard`, `CardGrid`), 037 (`SplitHero`, `ContentSection`, `CtaBand`, `StatStrip`), 042 (`LogoMarquee`, refactored here onto the shared `Marquee`).
**Names:** `Marquee` (a new layout component in `design-system/components/`), `StoryHero` and `Timeline` (two new sections in `design-system/sections/`), and one authored content module, `data/our-story-page.tsx`. All open to a rename.

---

## What this is

The story page is the company's narrative home: who Keystone is for, why it exists, what it has done, where it is going, and an invitation to join. It reads clean and light like the other redesigned inner pages, with one dark mission band for emphasis.

Like the careers and leadership pages, several sections lean on assets Keystone has no own source for yet — the hero film, the mission-band photo strip, and the two origin / careers collages. Those ship now as **tokenized placeholder tiles** (soft gradient surfaces, no real imagery) that a real photo or video drops into later without touching a component. All copy is authored placeholder copy in Keystone's voice.

The page chrome (site nav, footer, lead-capture modal) comes from the standard inner-page shell. This spec supplies the body between the nav and the footer.

---

## Scope

### In scope

- A redesigned page at `/about`, retitled **"Our story"**, composed from the inner-page sections plus the new pieces below.
- The nav entry under Company renames from "About Keystone" to **"Our story"** (same `/about` route).
- **`Marquee`** — a new presentational layout component: a clipped, edge-faded viewport whose track scrolls a duplicated set of caller-supplied items in a seamless infinite loop; pauses on hover, stops under reduced motion. The gap is carried as a per-item trailing margin so the two halves tile exactly. `LogoMarquee` (spec 042) is refactored to render its wordmarks through `Marquee`; behavior is unchanged.
- **`StoryHero`** — a new hero section: an eyebrow + large headline on the left, a supporting lede on the right, and a single wide media card beneath (a `SpotlightCard` placeholder with a "watch our story" cue).
- **`Timeline`** — a new section: a vertical connecting rail of milestone nodes, each a phase label, a headline, supporting copy, and an optional footnote. No media, no numbers. The structural sibling of `ProcessSteps` for "where we're going" narratives.
- A **mission band** — a dark `ContentSection` with a two-column heading + copy and a `Marquee` photo strip beneath (placeholder tiles).
- A **stats band** — `StatStrip` (extended with an optional per-stat description line) inside a `ContentSection`.
- An **origin split** and a **careers split** — `SplitHero`-style two-column blocks pairing copy (the careers one with actions) with a placeholder photo collage (`CardGrid` + `SpotlightCard`).
- The full-bleed brand-green closing band (`CtaBand`).
- One authored content module, `data/our-story-page.tsx`, holding every string and placeholder tile.
- The `/styles` catalog gains a panel for the new `StoryHero`, `Timeline`, and `Marquee`.

### Out of scope

- **Real photography or video.** Every photo / film slot is a tokenized placeholder tile to be swapped later.
- **Copying the reference's marketing copy.** All copy is original placeholder copy in Keystone's voice; the user will finalize wording.
- **The reference's scroll-driven word-by-word text highlight** in the mission band. The copy renders statically (a lede + supporting paragraphs); the signature motion on this page is the scrolling photo / logo strips.
- **A phone-mock closing band.** The page closes with the standard inner-page green `CtaBand`, consistent with the other redesigned pages.

---

## Visual design

Exact colors, sizes, and spacing are chosen at implementation against our tokens. The result must read as Keystone — cream and ink surfaces, brand orange, ink-green, mint; our display and body type; our eyebrow treatment. The mobile↔desktop hand-off is the app-wide **985px** boundary.

### 1. Story hero

A `StoryHero`: a brand eyebrow and a large display headline on the left; a supporting lede on the right, baseline-aligned with the headline; and beneath them a single wide media card — a `SpotlightCard` placeholder surface with a "Watch our story" cue. Below 985px the lede stacks under the headline and the card goes full width.

### 2. Mission band

A dark `ContentSection`: a short heading on the left, a couple of supporting paragraphs on the right, and beneath them a `Marquee` strip of placeholder portrait tiles scrolling slowly.

### 3. Stats band

A `ContentSection` with a short heading and a `StatStrip` of headline figures, each with a label and an optional one-line description. Placeholder figures.

### 4. Origin split

A two-column block: an eyebrow + heading + origin copy on one side, a placeholder photo collage (a small `CardGrid` of soft gradient tiles) on the other.

### 5. Vision timeline

A `ContentSection` whose heading sits beside a `Timeline`: a connecting rail of milestone nodes — a phase label ("Today", "In 3 years", "In 10 years"), a headline, supporting copy, and an optional footnote line.

### 6. Careers split

A two-column block mirroring the origin split: heading + copy + a primary "Careers" action and a secondary "View open roles" action on one side, a placeholder photo collage on the other.

### 7. Closing band

The existing full-bleed brand-green closing call-to-action band above the footer.

---

## Animation behavior

- The page is content-first and otherwise **static** — except the mission-band photo `Marquee`, which scrolls continuously and seamlessly (the set is duplicated so the loop has no seam) and pauses on hover.
- Collage tiles and band buttons show a subtle hover / focus shift.
- **Reduced motion:** the marquee stops and renders as a static (manually scrollable) row; everything else renders complete and fully visible.

---

## Content & data sources

All page content is authored centrally in `data/our-story-page.tsx` and passed into the sections — the page file only composes. No copy is invented inside a component, no real imagery is used, and none of the reference's marketing copy is reproduced.

| Element | Source |
|---|---|
| Hero eyebrow / headline / lede / media cue | Authored placeholder copy + placeholder tile |
| Mission band heading / paragraphs | Authored placeholder copy |
| Mission photo strip | Authored placeholder tiles |
| Stats | Authored **placeholder** figures + labels |
| Origin split copy + collage | Authored placeholder copy + tiles |
| Vision timeline milestones | Authored placeholder copy |
| Careers split copy + actions + collage | Authored placeholder copy + tiles; actions route to `/about/careers` |
| Closing band | Authored copy; action routes to the standard get-in-touch flow |

---

## New / changed components

### Component (`design-system/components/`)

- **`Marquee`** — takes `items: ReactNode[]`, an optional `reverse`, and an `ariaLabel`. Renders a clipped, edge-masked viewport whose track lays the items out twice (the second copy hidden from assistive tech) and scrolls by exactly one set width for a seamless loop; pauses on hover, stops under reduced motion. Layout only.

### Sections (`design-system/sections/`)

- **`StoryHero`** — `eyebrow?`, `title`, `lede?`, and a `media` node. The split headline / lede header over a wide media card.
- **`Timeline`** — `milestones: TimelineMilestone[]` (id, phase label, title, description, optional footnote) and an `ariaLabel`. A rail of milestone nodes; presentational.
- **`LogoMarquee`** (spec 042) — refactored to render through `Marquee`; same props and behavior.
- **`StatStrip`** (spec 037) — `Stat` gains an optional `description` line under the label; existing callers are unaffected.

### Tokens

- None new. Every piece reuses existing color, radius, spacing, motion, and shadow roles; the marquee loop duration and gap are per-component CSS variables.

---

## Accessibility

- The marquee is presentational; its duplicated set is hidden from assistive tech so each tile is announced once (or, for decorative photo tiles, not at all). Under reduced motion it is static.
- The hero media cue is not a fake button — the placeholder card carries a visible "Watch our story" label, and wiring a real player is a later change.
- The timeline is an ordered list with discernible text per milestone; its rail and nodes are decorative.
- Collage tiles are decorative placeholders (hidden from assistive tech); the careers actions are real links with discernible text and visible focus.
- Color contrast meets WCAG AA on the cream surfaces, the dark mission band, the gradient tiles, and the green band; every interactive target works on touch and shows a visible focus ring.

---

## Responsive behavior

- The whole page hands off at **985px**. Above it the hero, origin, and careers blocks are two-column, the stats sit in a row, and the marquee shows inline; below it everything stacks in one column with no horizontal overflow at 390px.
- The 1280px refinement tier nudges spacing only.

---

## Acceptance criteria

- [ ] `/about` renders in the new language and is titled "Our story": a `StoryHero`, a dark mission band with a scrolling photo `Marquee`, a `StatStrip` band, an origin split, a vision `Timeline`, a careers split, and the full-bleed green closing band — inside the standard inner-page shell.
- [ ] The nav entry under Company reads "Our story" and points at `/about`.
- [ ] The mission photo strip scrolls seamlessly, pauses on hover, and stops under reduced motion; `LogoMarquee` still renders correctly on the leadership page after the `Marquee` refactor.
- [ ] All copy is original placeholder copy (none copied from the reference); every photo / film slot is a tokenized placeholder tile.
- [ ] At ≥985px the hero / origin / careers blocks are two-column and the stats sit in a row; below 985px everything stacks with no horizontal overflow at 390px.
- [ ] `StoryHero`, `Timeline`, and `Marquee` appear in the `/styles` catalog.
- [ ] `npx tsc --noEmit` and `npm run lint` pass; the affected explainers are updated in the same commit.
