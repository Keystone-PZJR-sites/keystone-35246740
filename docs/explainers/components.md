# Components Reference

All brand UI lives under the central design system at `design-system/`. See `docs/explainers/design-system.md` for the architecture, and `/styles` for the live catalog. TypeScript interfaces are defined in each component's own file — read the source, don't guess at prop names.

---

## Directory structure

| Directory | What goes here |
|-----------|---------------|
| `design-system/tokens/` | Color, type, weight, radius, spacing, z-index, elevation, motion. CSS custom properties only. |
| `design-system/primitives/` | Lowest-level building blocks (Text, Heading, Eyebrow, Card, Button, Link, Pill, Badge), the `QuantityStepper` input (a controlled −/value/+ control), brand marks, and the lead-capture form inputs. |
| `design-system/components/` | Composite site chrome: `HeroNav` (the full site nav, used on the homepage and every inner page), footer, lead-capture modal, `InnerPageShell`, and `CtaModalButton` (the single button that opens the lead-capture "get a free demo" modal, used everywhere a demo/get-in-touch action appears); plus the shared card toolkit (`SpotlightCard`, `CardGrid`) and `Marquee` — the seamless infinite-scroll strip (clipped, edge-faded, hover-pause, reduced-motion-safe) that powers `LogoMarquee` and the Our Story photo strip (spec 043). |
| `design-system/sections/` | One component per homepage section (HeroAnimatic, WorkShowcase, …) plus the reusable inner-page sections (ContentSection, FeatureGrid, CtaBand, StatStrip, and the typed data sections). `FeatureGrid` items take an optional `icon` (a tile above the heading) and an optional `href` (turning the whole card into a link with a ghost arrow cue). `CenteredHero` is the clean, centered, light non-split page opener on the cream surface (spec 039; the redesign successor to the older dark `PageHero`). `PriceSummary` is the shared price card (an `ink` tone for the homepage `PricingSection` and a `light` tone for the `/pricing` page); `PricingCalculator` is the "only pay for what you use" estimator. `ProcessSteps` is the numbered "how it works" narrative — a connecting rail of numbered nodes, copy with optional service-page chips, and a framed media panel (spec 040). `QuoteWall` (a quote wall serving both careers culture quotes and leadership investor quotes — a tight CSS-columns masonry of `SpotlightCard` tiles that come in two flat variants: a full-bleed portrait with the quote overlaid when an image is supplied, or a flat cream text tile otherwise — spec 045) and `BackerGrid` (the shared "in good company" / "backed by" investor gallery — a tight auto-fill grid of square `SpotlightCard` portrait tiles with an initials-monogram fallback, used identically on careers and leadership) render the people walls, and `JobList` renders open roles as compact rows (spec 041). `LogoMarquee` is the scrolling row of company wordmarks (text, not logo images) used on the leadership page — it renders through the shared `Marquee` (spec 042). `StoryHero` is the narrative "about" opener (headline + lede over a wide media card), `Timeline` is the forward-looking milestone rail (the no-media, no-number sibling of `ProcessSteps`), and `StatStrip` takes an optional per-stat `description` line — all used by the Our Story page (spec 043). Sections with a structurally different mobile layout get a dedicated `Mobile*.tsx` file alongside the desktop file. |
| `design-system/patterns/` | Page-specific component groups that are not site-wide chrome: `blog/` (editorial gallery + post-detail pieces — `BlogFeatureHero`, `BlogHighlightCard`, `BlogRecentList`, `BlogTopicBand`, `BlogCategorySection`, `BlogAllTopics`, `BlogPostSidebar`/`BlogArticleToc`/`BlogPromoCard`, `BlogAuthorBio`, plus the reused `BlogPostCard` — spec 038), `legal/` (the `LegalDocumentPage` — a sticky-sidebar two-column layout that lists every legal document beside the rendered markdown body, shared by `/privacy` and `/terms` — spec 044), `services/` (the `ServicePageTemplate` that lays out a service detail page, plus its `BentoMock`s), `how-it-works/` (the tokenized `ProcessMock` step visuals — spec 040), and `careers/` (the `TeamCollage` hero collage — square department tiles backed by photos, falling back to a tone gradient when no image is set — spec 041). Imported by path, not from the top barrel. |

Supporting folders: `providers/`, `hooks/`, `lib/` (small helpers), and `styles/` (CSS per layer).

---

## Component Rules

1. **One component per file.** Named export, no default exports.
2. **All content via props.** No hardcoded strings, images, or colors in component files.
3. **TypeScript interfaces** declared in the same file, above the component.
4. **`'use client'` only when necessary** — GSAP, browser events, React state.
5. **Responsive classes** on every component. Test below and above the 985px mobile↔desktop boundary (tablets fall in the mobile range), plus the 1280px refinement tier. See `docs/explainers/responsive.md`.
6. **Barrel exports** — every directory under `design-system/` has an `index.ts` that re-exports its contents; the top-level `design-system/index.ts` re-exports tokens → primitives → components → sections (patterns are imported by path).

---

## Building a component from a reference

New reusable components are spec-driven — see "Reference-Driven Components" in the rules. The loop for each one:

1. **Study the inputs.** A reference screenshot shows the target; a battle-tested code example (e.g. UntitledUI) shows structure and states. Neither ships as-is.
2. **Map to what exists.** Find the primitives, sections, and tokens that already cover most of it. Note the gaps — a missing color role, a new button size, a variant a primitive lacks, or a genuinely new primitive.
3. **Write the spec.** Value-free and design-language, anchored to the screenshot, naming the new tokens, variants, or primitives the component needs. Pause for approval.
4. **Build from our system.** Add the approved tokens and variants first, then compose from primitives. Never copy the reference's utility classes verbatim — the component must read as ours.
5. **Register and verify.** Add it to the `/styles` catalog (and `tokens/catalog.ts` if tokens changed) in the same change, then check it at phone / tablet / narrow-web / wide-web.
6. **Sync docs and commit.** Update the affected explainer, pass `tsc --noEmit` + `lint`, commit one logical unit.

Where it lives follows the layer it belongs to: a lowest-level building block is a primitive, composite site chrome is a component, a full-width page block is a section (see the directory table above).

---

## Shared hooks

| Hook | Lives in | Use for |
|------|----------|---------|
| `useEmblaWithIndex` | `lib/useEmblaWithIndex.ts` | Every mobile horizontal carousel. Owns Embla init, active-index tracking, `scrollTo` helper, `select` listener cleanup, and `prefers-reduced-motion: reduce` ⇒ snap-duration-0. Callers pass their own Embla options object and render their own slides. |

`MobileValueProps` (Spec 019) and `MobileWorkShowcase` (Spec 023) both consume `useEmblaWithIndex`. Any future mobile carousel does too — never inline `useEmblaCarousel` plus a hand-rolled `select`-event `useEffect` again.
