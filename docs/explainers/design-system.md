# Design System

Every piece of brand UI lives under `design-system/` at the repo root. Pages compose from it; they never define their own colors, fonts, or one-off chrome. The live catalog of everything in it is the `/styles` page.

---

## Layers

The system builds up in one direction. A layer may use the layers above it, never below.

| Layer | Directory | What it holds |
|-------|-----------|---------------|
| Tokens | `design-system/tokens/` | The vocabulary: color, type, weight, radius, spacing, z-index, elevation, motion. CSS custom properties only — no rules. |
| Primitives | `design-system/primitives/` | Lowest-level building blocks: `Text`, `Heading`, `Eyebrow`, `Card`, `Button`, `Link`, `Pill`, `Badge`, plus brand marks and the lead-capture form inputs. Composed only from tokens. |
| Components | `design-system/components/` | Composite, reusable chrome: the site nav (`HeroNav`, used on every page), footer, lead-capture modal, `CtaModalButton` (the one button that opens the lead-capture "get a free demo" modal), and `InnerPageShell`; the shared card toolkit (`SpotlightCard`, `CardGrid`); and `Marquee` — the seamless infinite-scroll strip behind `LogoMarquee` and the Our Story photo strip. |
| Sections | `design-system/sections/` | Full-width page sections. Homepage sections (one per Figma section, with paired `Mobile*` files) and the reusable inner-page sections (`CenteredHero` — the centered light non-split hero — `ContentSection`, `FeatureGrid`, `CtaBand`, `StatStrip`, the shared `PriceSummary` card + `PricingCalculator`, `ProcessSteps` — the numbered how-it-works narrative — `QuoteWall` (careers + leadership quote wall) and `BackerGrid` — the people walls — `LogoMarquee` — the leadership scrolling-wordmark strip — `StoryHero` — the narrative about-page opener — `Timeline` — the forward-looking milestone rail — and the typed data sections). |
| Patterns | `design-system/patterns/` | Page-specific component groups that are not site-wide chrome (`blog/`, `legal/`, `services/`, `industries/`, `case-studies/` — the customer-story gallery card and detail template — `how-it-works/` — the tokenized `ProcessMock` step visuals — and `careers/` — the decorative `TeamCollage` hero collage). Not re-exported from the top barrel — import directly. |

Supporting folders: `providers/` (global context providers), `hooks/` (shared hooks), `lib/` (small helpers like `photos.ts`, `text.ts`), `styles/` (the CSS that backs the components).

---

## Importing

Import from the top barrel for anything in tokens → primitives → components → sections:

```ts
import { PageHero, Card, CtaBand, InnerPageShell } from '@/design-system';
```

Patterns are imported by their own path so the main surface stays focused:

```ts
import { BlogPostCard } from '@/design-system/patterns/blog';
```

---

## Styling

CSS is split by layer and assembled by one master index, `design-system/styles/index.css`, imported once from `app/globals.css`. Import order is the cascade order: tokens → base → primitives → components → patterns → sections. Edit the file for the layer you are working on; never add rules to the index.

Each primitive owns one `ks-`-prefixed class namespace. Colors, radii, and fonts reference tokens only — never a raw hex or font family. See the Styling rules in `docs/rules/rules.md`.

---

## Inner-page pattern

Every non-home page is built the same way:

1. Wrap the page in `<InnerPageShell>` — it supplies the full site nav (`HeroNav`, the same bar the homepage uses, fed from one shared content source), the footer, and the site-wide lead-capture modal, and fetches the company social links. The `(inner)` route-group layout uses the same shell, so chrome configuration lives in exactly one place.
2. Open with `<PageHero>` (the dark header that reads as one block with the nav).
3. Stack body content in `<ContentSection>` wrappers, using `FeatureGrid` and the typed data sections.
4. Close with `<CtaBand>` driving the visitor to a demo. Any action whose href is the lead-capture destination (`isGetInTouchHref` in `design-system/constants/routes.ts`) renders as `CtaModalButton` and opens the lead-capture modal in place instead of navigating (spec 047).

The typed data sections (`ServicesShowcase`, `TestimonialGrid`, `TeamShowcase`, `FaqAccordion`, `LocationsShowcase`, `SocialFeed`, `JobList`, `ContactDetails`) render the public API entities through primitives. The API responses are typed at the page boundary against the `keystone-design-bootstrap` entity types before being passed in.

A landing-style page can open with `SplitHero` (a headline + actions beside a media card) instead of the dark `PageHero` band, and compose `MediaFeatureList`, the spec-036 card bento, `TestimonialCarousel`, and the full-bleed green `CtaBand` treatment. Service detail pages do exactly this through the `services/` pattern (`ServicePageTemplate`), driven by one content object authored in `data/service-pages.tsx` — see spec 037.

---

## The catalog

`/styles` is the always-current, search-excluded catalog. It is an interactive, tabbed reference: a left sidebar (desktop) / horizontal tab bar (mobile) switches between panels grouped as **Foundations** (color, typography, spacing, radius, elevation, motion, layering), **Primitives** (buttons, links, pills & badges, cards & surfaces, inputs), **Brand** (logos & marks, iconography), and **Components** (navigation, footer, lead capture). The active panel is mirrored to the URL hash so any panel is linkable (e.g. `/styles#typography`).

It is built from the design system itself — it mounts the real primitives, renders the live site chrome (`HeroNav` in the Navigation panel; `OversizedFooter` / `MobileFooter` in the Footer panel), and opens the live lead-capture modal. Every component preview — primitives, brand, and chrome — is wrapped in a single reusable `PreviewFrame` with a **phone / tablet / narrow web / wide web** toggle (390 / 834 / 1000 / 1600px), so each component is inspected at real device widths from one control rather than duplicated per breakpoint. The two web widths bracket the nav's fluid band — narrow sits just above the 985px hand-off, wide at the band ceiling. `PreviewFrame` is an iframe (a real nested viewport) into which the page's stylesheets are cloned and the component is portaled, so `vw`, media queries, and `position: fixed` all resolve to the frame; each width is scaled to fit the catalog column. The footer renders from `FOOTER_COPY` / `FOOTER_VIDEOS_*` — the same shared content the inner-page footer uses (see `design-system/components/footer/footer-content.ts`) — and the device toggle drives its breakpoint swap (mobile collage on phone, oversized collage on tablet/web). Only the component/chrome panels are framed; the token panels (color, type, spacing, etc.) stay as plain data displays. The panel content and data live alongside the page:

- `design-system/tokens/catalog.ts` — typed mirror of the token CSS (color families, role groups, semantic status, type scale, spacing, scales). Data only.
- `app/styles/catalog-kit.tsx` — presentation helpers (`Swatch`, `Ramp`, `StatusRow`, `SpecTable`, `TypeRow`, `PreviewFrame`).
- `app/styles/panels.tsx` — one component per tab.
- `app/styles/StylesCatalog.tsx` — the interactive sidebar/tab shell.

Keep it honest: every color step shown is a real, in-use token, and the catalog carries no narrative — labels and values only. When you add or change a primitive or token, update `catalog.ts` (and the relevant panel) in the same change so it never drifts.
