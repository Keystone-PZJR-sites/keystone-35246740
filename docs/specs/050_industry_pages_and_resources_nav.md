# Spec 050 — Industry landing pages + Resources nav

**Status:** Built — template + content for the launch set of 3 industries, plus the Resources nav.
**Type:** Two related changes to the corporate site. (1) A new family of industry-specific landing pages at `/industries/[slug]`, used primarily as paid-ad landing targets and for organic discovery. (2) A navigation refresh: the "Services" mega menu becomes **Solutions** and gains a "By industry" column, and the top-level **Blog** link becomes a **Resources** dropdown holding Blog and a link to the Keystone Grader.
**Reference:** Industry pages follow the existing service-page pattern (spec 037) — a slug registry rendered through a shared route + template, composed from design-system sections. Layout inspiration: ServiceTitan's industry pages (benefits grid → capability list → results band → case studies → resources → FAQ → CTA) and Square's vertical pages. The Resources dropdown is the menu originally planned in spec 034 (the nav UI already anticipated it).
**Depends on:** 034 (site navigation + dropdown infrastructure), 037 (registry + route pattern), and the external Keystone Grader app (`grader.keystone.app`, spec 049 constants).

---

## Why

Ads (and visitors generally) convert better against positioning and messaging written for the visitor's industry rather than the generic homepage. We need durable, per-industry landing pages we can point campaigns at. Separately, the Grader is a strong top-of-funnel tool that currently has no nav entry; folding it alongside the Blog under a single **Resources** menu adds it without growing the top-level item count.

Adding both naively would fatten the nav (a 6th top-level item plus more). Instead: industries live **inside** the existing wide menu (renamed Solutions), and the Grader rides in the Blog slot (now Resources). Net top-level count is unchanged.

---

## Scope

### In scope

- **`/industries/[slug]` route** driven by an `INDUSTRY_PAGES` registry (`data/industry-pages`), mirroring the service-page registry/route pattern. `generateStaticParams` enumerates the slugs; `generateMetadata` supplies per-industry title/description; unknown slugs 404.
- **Launch set (3):** `health-wellness`, `home-services`, `small-business`. Slugs are the ad landing paths and are easy to rename pre-launch.
- **`IndustryPageTemplate`** (`design-system/patterns/industries`) — the shared, fully tokenized page body, driven by one `IndustryPageContent` object per industry (mirrors `ServicePageTemplate`). Composes existing design-system sections only; no bespoke layout CSS.
- **Authored content for all 3 industries** — hero, benefits, capabilities, results stats, case-study rail, resources, FAQ, and closing CTA copy written per industry.
- **Nav: Services → Solutions.** Same wide mega menu; the trigger label changes and a fifth **"By industry"** category column is added, linking to the three industry pages.
- **Nav: Blog → Resources.** The top-level Blog link is replaced by a `compact` Resources dropdown with two leaf links — **Blog** (`/blog`) and **Grader** (the external Grader URL) — plus two promo tiles.
- **External nav links.** Nav leaf links and promo tiles gain an optional `external` flag; when set they open in a new tab (`target="_blank" rel="noopener noreferrer"`). The Grader leaf and the Grader promo use it. `SpotlightCard` (and the underlying `Card`) gain matching `external` / `target`+`rel` support.

### Out of scope

- **Per-industry case studies / resources** — the Resources rail currently links three real blog posts as a shared placeholder set across all three industries. Swapping in industry-specific case studies / articles is a follow-up.
- **Imagery refinement** — hero/proof imagery reuses the existing media registry (business + social-proof stills). Bespoke per-industry photography is a follow-up.
- **The Grader app itself** — external; this only links to it.
- **Sitemap inclusion** — the sitemap is backend-driven; ensuring `/industries/*` URLs are emitted is tracked separately (see Notes).

---

## Page template

`IndustryPageTemplate` renders, top to bottom, from one `IndustryPageContent`:

1. **`SplitHero`** — industry eyebrow, headline, supporting line, primary ("Get a free demo" → lead-capture modal) + secondary ("See how it works") actions, and a `SpotlightCard` media (photo + deliverables statement + brand tagline).
2. **Benefits** — `ContentSection` heading over a `FeatureGrid` of four icon + title + copy cards (the "Benefits of using Keystone for your <industry>" row).
3. **Capabilities** — `ContentSection` over a `MediaFeatureList` (product visual + an icon-badge feature list of what Keystone runs).
4. **Results** — an ink `ContentSection` wrapping a `StatStrip` (three headline stats), the dark "we bring results" band.
5. **Case studies** — `TestimonialCarousel` proof rail (statement + KPI results per card).
6. **Resources** — `ContentSection` over a `CardGrid` of `SpotlightCard`s linking to blog posts (arrow affordance).
7. **FAQ** — `ContentSection` over a centered `FaqAccordion`.
8. **Closing CTA** — full-bleed green `CtaBand`.

Every value is content-driven and every visual comes from a shared section, so industries stay structurally identical and tokenized. `ServiceMedia` (the service pattern's framed visual) is reused for the capability media.

---

## Navigation structure (after)

Top-level, in order: **Solutions** (wide) · **Pricing** · **How it Works** · **Company** (compact) · **Resources** (compact). Login + "Get a free demo" unchanged on the right.

- **Solutions** columns: the four service stages plus **By industry** (Health & Wellness, Home Services, Small Business).
- **Resources** leaves: Blog, Grader (new tab). Promos: a Blog highlight and a Grader highlight (new tab).

### Solutions service consolidation

The service links were trimmed to remove over-granular breakouts and tighten the menu:

- **Combined:** "Maps" + "Reviews" → a single **"Maps & Reviews"** link pointing at `/services/reviews` (which already covers listings + reputation); the surviving page is retitled accordingly and `maps.tsx` is deleted. The duplicate "Reviews" link in the retention group is removed.
- **Removed (nav links + pages deleted):** Smart Re-Engagement, Text-Based Sales, Call-Based Sales.
- **Renamed:** "Sales Team" → **"Sales & lead follow-up"** (page/slug `sales-team` unchanged).
- **Reference cleanup:** links to the deleted pages in `how-it-works-page.tsx` and `pricing-page.tsx` are repointed (text-sales → sales-team) or consolidated (maps + reviews → reviews).

### Dropdown density

Leaf vertical padding is halved and the category-heading-to-links gap is reduced ~25%, uniformly across the desktop dropdowns and the mobile accordion.

Mobile mirrors this automatically — Solutions and Resources are accordion rows from the same data; external leaves open in a new tab.

---

## Notes

- Industry slugs and labels live in the `INDUSTRY_PAGES` registry; the nav "By industry" column references the same `/industries/<slug>` paths (matching how the Services menu hardcodes `/services/<slug>`).
- The Grader URL is the existing `GRADER_URL` constant (spec 049) — no new inline endpoints.
- The Solutions mega menu lays out in three zones: the four service groupings stack in column one, the "By industry" category is column two, and the promo rail is column three. This relies on "By industry" being the **last** category in the data (`:last-child` places it in column two).
- For ad/SEO use, confirm the backend sitemap emits the new `/industries/*` URLs (or add a local sitemap entry).

---

## Acceptance criteria

- [x] `/industries/health-wellness`, `/industries/home-services`, and `/industries/small-business` each render the shared nav + footer with the full `IndustryPageTemplate` body (hero → benefits → capabilities → results → case studies → resources → FAQ → CTA); an unknown industry slug 404s.
- [x] Each industry page has a per-industry `<title>` / meta description.
- [x] The Resources rail links real blog posts (placeholder set) via `SpotlightCard`s.
- [x] The top-level menu reads **Solutions**, and its mega menu shows a "By industry" column linking to the three industry pages.
- [x] The Blog top-level item is replaced by a **Resources** dropdown containing Blog and Grader; the Grader leaf and Grader promo open in a new tab.
- [x] Desktop and mobile nav both reflect the above.
- [x] `npx tsc --noEmit` and `npm run lint` pass.
