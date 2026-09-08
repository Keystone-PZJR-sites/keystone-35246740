# Spec 010 — Phase 6: homepage assembly, the page self-test, the performance pass, and the launch checklist

**Status:** Superseded by spec 023 (2026-09-08 — the homepage v2
cutover: `/` serves the v2 composition, the v1 page and this spec's
expectations retired; the §7 F5 mobile-LCP gate transferred to 023
§3/§6). Approved 2026-08-27 · built and verified the same day —
§8 evidence recorded; §3.1 carries a dated build amendment (the
compressed-slice weights identity); §7 R5–R7 record the build
findings, and F5 (the mobile-class LCP measurement vs the §4.2
budget) is open as a launch gate for the owner. Draft 2026-08-27
(revised same day after the old-brand
purge — owner decision, plan.md decision log: launch is big-bang and
the old-brand code left this branch. §4's head work landed with the
purge and became a standing contract; §5's "promote" became "launch";
§7 records the purge as R4 and adds F3. Same-day compliance review
against the purged tree: title and preamble de-cutovered, the §3.2
landmark audit gained its missing deliverable — the sections carry no
`data-landmark` today — F1 amended post-purge, and F4 opened: the
nav's Login target `/portal` is not in the rebuild sitemap)
**Depends on:** spec 001 (tokens, fonts — the pre-build re-extraction rule)
· spec 002 (grid engine, the `/grid` harness and sweep this spec extends)
· spec 002.r1 (nearest-anchor gates; its §7 R7 erratum is fixed here) ·
spec 003 (primitives) · spec 004 (footer) · spec 005 (nav) · spec 006
(hero) · spec 007 (portfolio; its §8.8 fixture element became page
chrome at the purge — §7 R4) · spec 008 (engine) · spec 009
(testimonials; its content-pass decision gates §5)
**Sources:** fresh MCP reads 2026-08-27 of the five anchor frames —
`230:12906` (384, 3232 = 101t) · `359:29494` (576, 3552 = 74t) ·
`142:4180` (768, 3392 = 53t) · `142:3151` (960, 4080 = 51t) ·
`378:34835` (1344, 5824 = 52t) — every frame total and every depth-1
section top and height verified the same day against rendered bounds
through the console bridge; metadata and rendered bounds agree at every
landmark (§7). The section nodes read: portfolio `230:13338` /
`359:29929` / `142:4417` / `333:20793` / `135:1363`; engine `230:13351`
/ `359:29940` / `142:4430` / `334:21587` / `135:1354`; testimonials
`230:13360`+`230:13364` / `359:29949`+`359:29953` / `142:4439`+
`199:12807` / `334:21853`+`334:21856` / `399:4605`; footer `230:13374`
/ `359:29963` / `505:14399` / `505:14400` / `505:14569`; the page Grid
layers `509:5403` / `505:15527` / `505:13888` / `505:12908` /
`505:10884` — all in `ks-MarketingSite`. Build-state facts from the
2026-08-27 review of the working tree at `d9fd8ba`: the sweep run
(fails at 470/1150 — 002.r1 §7 R7), `tsc`/lint clean, and the
production-build baseline re-measured post-purge in §4.2. No new
design inputs: Phase 6 adds no designed surface.

Phase 6 builds no new section. Its deliverables are the page itself:
the verified assembly of specs 004–009 at `/`, the page-level
self-test that keeps it verified, the performance budgets, and the
launch checklist.

---

## 1 · Scope

Three workstreams and a checklist:

1. **The page self-test** (§3) — the `/grid` machinery, realigned to
   002.r1 and extended to run against the real assembled homepage.
2. **The performance pass** (§4) — the head contract (landed with the
   2026-08-27 purge) held as acceptance, and measured budgets on the
   production build.
3. **The launch checklist** (§5) — the gates, the launch steps, and
   the rollback line, written down now and executed much later: only
   after every page is built, only on the owner's explicit go. This
   spec's build makes the checklist *ready*, not *done*.

The homepage composition exists as `design-system/v2/home.tsx` (moved
at the purge), mounted bare by `/` and under the QA surface by
`/home-fixture` — nav · hero · portfolio · engine · testimonials · the
rd2 row-40 element · footer. This spec changes nothing visual.

## 2 · Page anatomy — the assembled stack per band

Read off the frames 2026-08-27 and verified against rendered bounds.
Rows are zero-based page ticks; each section's internal anatomy is its
own spec's record. This table supersedes the 2026-08-22 page totals in
plan.md (the 768/960 1t card reductions of 2026-08-26 stand) and is
the current record.

*Amended 2026-08-28 — the page-load streamline (006 §9): the rd1 hero
compressed 1t, so the whole rd1 column rides up one tick (total 51t →
50t; was 0–13 hero · 13–22 · 22–31 · 31–39 · 39–51). Re-read from the
960 frame and rendered-bounds verified; the other bands' rows stand.*

| band | hero (006) | portfolio (007) | engine (008) | testimonials (009) | row 40 | footer (004) | page total |
|---|---|---|---|---|---|---|---|
| rm (384) | 0–26 (26t) | 26–45 (19t) | 45–66 (21t) | 66–77 (11t) | — | 77–101 (24t) | **101t** |
| rs (576) | 0–20 (20t) | 20–31 (11t) | 31–44 (13t) | 44–53 (9t) | — | 53–74 (21t) | **74t** |
| rt (768) | 0–13 (13t) | 13–22 (9t) | 22–31 (9t) | 31–38 (7t) | — | 38–53 (15t) | **53t** |
| rd1 (960) | 0–12 (12t) | 12–21 (9t) | 21–30 (9t) | 30–38 (8t) | — | 38–50 (12t) | **50t** |
| rd2 (1344) | 0–12 (12t) | 12–21 (9t) | 21–29 (8t) | 29–40 (11t) | 40–41 (1t) | 41–52 (11t) | **52t** |

- The **nav** is overlay chrome (44px material at every anchor) and
  never participates in the stack — the law in "Material vs.
  tick-riding vs. overlay chrome".
- **Row 40 at rd2** is the page-assembly element (`.hfx-clear-rd2`,
  007 §8.8 as amended by 009 §9: a full 12-cell stroke-only lattice
  row, clear of content). It is the only page-owned exposure; every
  other cell belongs to a section.
- The page **Grid layers** measure exactly the lattice-above-footer
  totals (77 · 53 · 38 · 38 · 41t *(amended 2026-08-28 — the 960
  layer re-read 38t after the streamline; a 1t overrun found at the
  read was fixed by design the same evening, 006 §9)*), which pins
  each footer top independently of the section sums.
- This table is data, not prose: it ships as the expectation module
  the self-test reads (§3.2, §6).

## 3 · The page-level self-test

### 3.1 · Realign the harness to 002.r1 (the R7 erratum)

The engine gates moved to 470 · 665 · 860 · 1130 (002.r1); the
harness's JS band classification did not. Fix, verbatim scope:

- `BAND_FLOORS` (`app/grid/fixtures.ts`) becomes the **gate floors**
  — rs 470 · rt 665 · rd1 860 · rd2 1130 — so `bandForWidth` agrees
  with the engine at every width. The doc comment states that floors
  are structural gates, not anchors.
- The sweep's per-band sample widths become **one width per
  structural slice**: 369 (below-384 extrapolation) · 420 (rm
  stretched) · 520 (rs compressed) · 620 (rs stretched) · 700 (rt
  compressed) · 810 (rt stretched) · 900 (rd1 compressed) · 1050 (rd1
  stretched) · 1200 (rd2 compressed) · 1600 (rd2 zoom) — the widths
  the Phase 5 acceptance sweeps already used, plus the stretched
  slices. Continuity is still asserted at the four anchors only: a
  gate is a designed downward step (002.r1 §3), not a continuity
  point.
- The in-page checks are unchanged — their expectations simply come
  from the corrected band. (The 2026-08-27 failing run confirms the
  build is right and the expectations were stale: measured stacks at
  470/1150 were 32t and 20t — exactly the nearest-anchor designs.)
  *Amended 2026-08-27 (build errata — §7 R5): two checks needed
  mechanical realignment this line missed. The weights identity is
  per structural slice: in a compressed slice the engine carries
  wA = t/T0 · wB = 0 (002.r1 §3), not wA + wB = 1, so the check reads
  the slice from the corrected band and its anchor. And the weight
  probes read through margin-left, not width: the below-384
  extrapolation drives wB negative, which a width probe clamps to
  zero. The interp check is untouched — computed from the probed
  weights, it asserts the pure zoom in compressed slices by
  construction. The sweep also settles after every resize on the
  homepage leg before asserting (the audits-at-rest law: a resize
  retriggers the footer drawers' height-transition grammar
  mid-flight).*

### 3.2 · The page test on the real homepage

The `/grid` devtools generalize from fixture expectations to an
**expectations prop**, and `/home-fixture` mounts them (dev-only, the
same build-time gate) with the §2 page table:

- **Stack sum** — page height = the band's §2 total, ±2px, at every
  audited width.
- **Section boundaries** — every `.sec` top and height lands on the
  §2 rows (whole ticks, line-inclusive ±1px). This is new: the
  fixture audit trusted two transcribed fixtures; the page test
  audits the six real flow children against designed rows.
- **Landmark audit** — every `[data-landmark]` inside the sections,
  on (half-)ticks, exactly as on `/grid`. The sections carry no
  landmark attributes today (only the `/grid` fixtures do): this
  spec's build **adds `data-landmark` to each section's §1-anatomy
  blocks** — a markup-only attribute, no visual or layout change —
  so the audit checks the spec-verified rows, not zero elements.
- **Band gate** — exactly one band class visible, including `.decor`.
- **Seams** — shared region edges coincide, run over whatever `.gx`
  lattices the page renders.
- **At rest, in every rest state** — the audits-at-rest law. The test
  runs only after the load choreography settles (`v2-settled`), and
  the sweep drives the page through its rest states before
  re-asserting: each engine row active (008), the portfolio strip
  scrolled (007), the testimonial strip on each offset (009), a
  footer drawer open at rm/rs (004), the mobile nav open and closed
  (005 — an overlay: the assertion is that the stack is *unchanged*).
- The readout stays on `window.__GRID_SELFTEST__` so the sweep runs
  both routes with one contract.

### 3.3 · The sweep gates CI

`scripts/grid-selftest.mjs` runs `/grid` then `/home-fixture` — five
anchors + the ten §3.1 widths each, scrollbar forced on — and exits
nonzero on any failure. `npm run test:grid` stays the entry point.

## 4 · The performance pass

### 4.1 · The head contract (landed at the purge — held as acceptance)

The draft's head-hygiene workstream planned to split the old-brand
head blocks (the dark `#042019` cold-load guard, the dark theme-color,
five FK font preloads, two hero video preloads) away from the v2
surfaces. The 2026-08-27 purge resolved it more simply: the root
layout is **v2-owned**. The standing contract, asserted in §8:

- The root layout ships **only**: the light cold-load guard (the
  `bg/100` literal `#f8f7f2`, inlined with the comment explaining why
  a token var cannot appear before the token stylesheet loads), the
  matching light `theme-color`, **preloads for the two site fonts**
  (`gt-standard-standard-vf.woff2`, `pp-kyoto-variable-upright-vf.woff2`
  — `font-display: swap` stands, spec 001), the site metadata, and
  the v2 stylesheet.
- No video preloads (the page ships none); the hero's frame-1
  `fetchpriority=high` images (006 §5) remain the LCP candidates.
- `body` carries `.v2-root` — the site base and the engine's size
  container (`v2/base.css`, which also carries the document reset the
  sections were verified under; it is part of the rendering contract).

### 4.2 · Budgets — from the 2026-08-27 post-purge baseline

Production build after the purge: **`/` 128 B route JS · 111 kB first
load · static prerender (1m revalidate)**; 18 routes total; the
102 kB shared baseline is framework chunks (verified identical before
and after the purge — no old-site code hid in it). Eight client
islands compose the page (nav-desktop · nav-mobile · hero-load ·
hero-carousel · portfolio-gallery · engine-row · testimonials-block ·
footer-nav); the dependency tree is seven runtime packages (next ·
react · react-dom · the three `@keystone-sites/*` · the Cloudflare
adapter) — no animation library, no CSS framework.

The budgets, asserted on the production build:

- `/` first load **≤ 115 kB**; route JS **≤ 1 kB**; exactly **eight
  islands**; static prerender.
- Lighthouse on the local production build, default throttling,
  recorded at 384-, 768-, and 1344-class viewports: **LCP ≤ 2.5s**
  (the element being the hero frame-1 tier image), **CLS ≤ 0.02**
  (the choreography animates transform/opacity only and must not
  count), **TBT ≤ 200ms**. Measured numbers land in the acceptance
  evidence; regressions beyond a budget block launch.

### 4.3 · Standing discipline (asserted, not rebuilt)

Image eager/lazy tiers per specs 006–009; WebP only, one tier fetched
per width (002.r1); `prefers-reduced-motion` renders state-to-state;
the token re-extraction runs before this phase's build (001 rule) and
any drift flows through tokens with no code change.

## 5 · The launch checklist — gates, steps, rollback (executed after all pages, not in Phase 6)

*Amended 2026-08-27 (owner direction, post-build — §7 R8): the
checklist's living copy moved to `docs/rebuild/launch-checklist.md`,
next to plan.md, so page completions can add gates and track status
without editing this spec. This section stays the frozen Phase 6
record; statuses are current only in the checklist file.*

The checklist this spec delivers — **not executes**. Phase 6 does not
launch anything: when its build is done, work shifts to the remaining
pages (Pricing first — owner decision 2026-08-27), and this checklist
waits until every page is built (big-bang: the homepage alone does
not ship). `/` already mounts the homepage, so there is no promote
step — launch means deploying this branch in place of the old site
that ships from `main`. Steps 1–5 are **gates** (all green before
launch); 6–9 are the **launch**; 10 is the escape line. Launch
executes only on the owner's explicit go.

1. Specs 006–009 and this spec's §8 acceptance all checked; the §3
   sweep green in CI on both routes.
2. The token layer re-extracted from the Figma variables API for this
   phase's build; diffs (if any) recorded and flowed through tokens.
3. **The testimonials content pass** (009 decision): real quotes and
   attribution replace the placeholder copy; the real photos arrive
   as an art-directed tier set into the existing `<picture>` markup
   and registry entries. No structural change permitted.
4. The §7 flags: **F1**, **F3**, and **F4** are resolved (404s for
   unbuilt routes and the legacy surface; Login goes to the external
   console). **F2** resolves here: the **pre-launch metadata wipe**
   (owner decision 2026-08-27) — new title/description copy, a
   new-brand og-image, and the manifest colors land as one content
   pass once all pages are done, right before launch.
5. Owner sign-off on the assembled page at the five anchors and one
   width per slice.
6. **Launch:** deploy this branch as the production site (the
   old-brand site retires when this branch becomes the production
   deploy). `/home-fixture` stays the permanent QA surface, noindexed.
7. `/` is indexable (no robots meta) and carries the F2 metadata; a
   **sitemap for the new site** replaces the purged old-site proxy;
   every dev route keeps `robots: index false`.
8. The §4.1 head contract verified on the deployed `/`: the light
   guard and theme-color, the two font preloads, nothing else.
9. The §4.2 budgets re-measured on the launch build and within
   budget.
10. **Rollback** is redeploying `main`'s old-brand build — the two
    sites never shared a deploy, so the escape line is the previous
    deployment, not a revert.

## 6 · Deliverable — files, constants, semantics

1. **Expectations module** — the §2 table as typed data
   (`app/home-fixture` scope or alongside `app/grid/fixtures.ts`),
   the single home the self-test reads; no magic numbers in the test
   body.
2. **Harness realignment** — `app/grid/fixtures.ts` (gate floors),
   `app/grid/grid-devtools.tsx` (expectations prop),
   `scripts/grid-selftest.mjs` (slice widths, the `/home-fixture`
   leg, the rest-state drives), and the markup-only `data-landmark`
   attributes on the sections' anatomy blocks (§3.2).
3. **The new-site sitemap** (at launch, §5.7) — the purged old-site
   proxy is not replaced until the sitemap's pages exist.
4. *Landed at the purge (2026-08-27), asserted here:* the composition
   module (`design-system/v2/home.tsx`, mounted by `/` and
   `/home-fixture`), the v2-owned root layout and its head contract
   (§4.1), the base layer (`v2/base.css`), and the v2 scroll lock
   (`v2/lib/scroll-lock.ts`).
5. **No new tokens, no new assets, no new motion.** Nothing visual
   changes at any width.
6. Docs in the same commits: plan.md's Phase 6 record and anything
   the self-test work shifts in rules.md.

## 7 · Resolutions record

Review-day record, 2026-08-27. Findings from the Phase 6 build
review and the same-day purge; open flags gate launch (§5.4).

- **R1 — the 002.r1 harness erratum**: the sweep fails at 470/1150
  against a correct build because `bandForWidth` kept the anchor
  floors when the engine gates moved. Recorded in 002.r1 (§6 dated
  amendment, §7 R7); fixed here by §3.1. The engine and every built
  section verified correct.
- **R2 — metadata equals rendered truth at page level**: every
  depth-1 section top/height and frame total in today's reads matched
  rendered bounds exactly — the stale-grid-child class did not appear
  at section level. The Grid layers' float residues (y ≈ −6e-14; the
  960 carousel height 240.00001) are the known artifact class; whole
  values transcribed.
- **R3 — hygiene, no consequence**: the 576 frame carries a second
  depth-1 frame named "header" (`506:4395` — the subhead/CTA group at
  y 14t); naming only, geometry correct. Noted for design, not
  flagged.
- **R4 — the old-brand purge** (owner decision 2026-08-27, after this
  spec's draft — the launch model is big-bang, so the in-place
  cohabitation bought nothing): every old-brand route, the old
  design-system tree, its infra, assets, and dependencies left this
  branch; the root layout, base reset, scroll lock, and homepage
  composition were rewritten v2-native (plan.md's decision log
  carries the full record). Verified post-purge: tsc/lint zero, the
  production build green (18 routes, `/` static at 111 kB first
  load), the grid sweep byte-identical to pre-purge (anchors
  pixel-exact; only the R1 failures), the page visually verified at
  desktop and phone widths, and every CSS custom property in the v2
  tree audited as v2-defined (no old-token dependencies existed).
  This spec's §4 and §5 were revised the same day to the purged
  shape; §2 and §3 stand as drafted.
- **F1 — resolved: ship 404s** (owner decision 2026-08-27). The v2
  nav and footer links ship as-is and 404 until their pages land. No
  interim redirects, no gating launch on the next pages. The 404
  surface is the framework default (no `app/not-found.tsx` exists) —
  accepted as-is; a branded not-found page is future work, not a
  Phase 6 gate. *Amended 2026-08-27 (post-purge compliance review):
  the record originally noted `/pricing`, `/portal`, and
  `/how-it-works` still resolved — the purge removed them the same
  day, so today every nav/footer target 404s until the rebuild's
  pages ship. The posture is unchanged.*
- **F2 (open) — `/` metadata**: `/` inherits the root metadata
  wholesale (`app/page.tsx` exports none of its own). The complete
  account at review, verified against the prerendered head:
  - **Title** (and derived og:/twitter:title): "Keystone | Sales &
    Marketing for Local Businesses". No title template.
  - **Description** (and derived og:/twitter:description): "Keystone
    is a sales and marketing team for local businesses. We help you
    grow your business by running your sales and marketing while you
    run your business."
  - **Social image** (og:image + twitter:image, card
    summary_large_image): `/og-image.png`, 1200×630 — **old-brand
    art** (the dark-green FK Screamer "ALWAYS ON SALES & MARKETING"
    card with the colored pills).
  - **theme-color meta**: was `#042019` (old hero ink) — *resolved at
    the purge*: the root now ships the light `bg/100` (`#f8f7f2`).
  - **Manifest** (`/site.webmanifest`): name "Keystone", theme
    `#042019`, background `#063126`, standalone — **still old-brand
    colors**; flips with the F2 decision (nothing else reads it now).
  - **Icons**: favicon.ico (16/32) · icon.svg · favicon-192.png ·
    favicon-512.png (manifest) · apple-icon.png (180) — *amended
    2026-08-27 — design supplied the new-brand mark (teal rounded
    square, geometric K) as `favicon.svg` + `favicon-1024.png`; the
    icon slots now carry that art. Title, description, og-image, and
    manifest colors stay on the F2 pre-launch wipe.*
  - **metadataBase**: `NEXT_PUBLIC_SITE_URL` → `https://keystone.app`.
    No canonical, no robots meta (indexable).
  The content decision for design: new-brand title/description copy,
  a new-brand og-image, and the manifest colors. *Resolved 2026-08-27
  (owner): a **pre-launch metadata wipe** — the standing copy ships on
  the dev builds as-is, and the whole set is replaced in one content
  pass once all pages are done, as a §5 launch gate. Not a Phase 6
  question.*
- **F3 — resolved: pure 404s, zero backwards compatibility** (owner
  decision 2026-08-27). The old site's indexed URLs (`/about`,
  `/blog/*`, `/services/*`, `/case-studies/*`, `/how-it-works`,
  `/get-in-touch`, …) stop existing when this branch deploys — no
  redirect map, no 410s, no legacy URL support. The F1 posture,
  extended to the whole old surface. *Note (owner, same day): several
  old paths return as rebuilt pages on the new sitemap — `/pricing`
  is the next page built — so the dead-URL surface shrinks as the
  page phases land; what never returns stays a 404.*
- **F4 — resolved: Login goes to the external console** (owner
  decision 2026-08-27). Found at the compliance review: the nav's
  Login link targeted `/portal`, which left with the purge and is not
  in the rebuild sitemap. Resolution: Login (nav and footer) points at
  `https://console.localkeystone.com/login`. Implemented the same day
  in `nav.tsx` and `footer.tsx` — a surgical link-target change
  tracing to spec 005's link-map decision record.
- **R5 — new-brand favicons landed 2026-08-27.** Design dropped
  `favicon.svg` and `favicon-1024.png` in the newsite handoff folder.
  The F2 icon slots (`app/icon.svg`, `app/favicon.ico` 16/32,
  `app/apple-icon.png` 180, `public/favicon-192.png`,
  `public/favicon-512.png`) now carry the teal rounded-square
  geometric K. Title, description, og-image, and manifest colors
  stay on the F2 pre-launch wipe.
- **R5 — §3.1 build errata** (found 2026-08-27, first sweep run: 42
  failures, all three classes mechanical, no built surface wrong).
  The weights check needed the compressed-slice identity, the weight
  probes needed margin-left reads (negative wB below 384), and the
  homepage sweep leg needed a settle after every resize (the footer
  drawers' height-transition grammar retriggers on tick changes and
  the first assert caught it mid-flight). §3.1 carries the dated
  amendment; the section-boundary tolerance is the spec's ±1px
  line-inclusive allowance, which also absorbs the sub-pixel that
  stacked flow boxes accumulate at fractional ticks (worst measured:
  0.010t = 0.52px at width 620).
- **R6 — the devtools mount vs the route-JS budget** (found
  2026-08-27 on the first §4.2 measurement). Mounting the self-test
  on `/home-fixture` through `next/dynamic` made its production module
  graph diverge from `/`, and the bundler re-attributed the shared
  islands chunk into the route chunks: `/` route JS read 4.49 kB
  against the ≤1 kB budget while the script payload stayed
  byte-identical (477.4 vs 477.5 kB uncompressed script set on `/`,
  first load 111 kB both ways — verified by diffing the prerendered
  HTML's script lists). Resolved structurally: the mount moved to
  `app/grid/devtools-mount.tsx` and the production build aliases it to
  a server null stub (`devtools-mount.prod.tsx`, `next.config.ts`), so
  no devtools code or chunk edge exists in any production graph. `/`
  and `/home-fixture` measure 128 B route JS; `/grid` fell 721 B →
  134 B (the old NODE_ENV gate had left a dead async edge webpack
  still chunked).
- **R7 — the token re-extraction diff** (§4.3 rule, run 2026-08-27):
  one drift — `text/xl/Light` paragraph spacing 0 → 12. Snapshot
  updated, `type.css` regenerated (`--ts-text-xl-light-ps: 12px`); no
  consumer reads any `-ps` property, so nothing rendered changed.
- **F5 (open) — the mobile-class LCP measurement vs the §4.2
  budget** (found 2026-08-27 at the §4.2 measurement; a §5 launch
  gate alongside F2). Lighthouse, local production build, default
  throttling: 384-class LCP **5.33s** and 768-class **5.25s** against
  the 2.5s budget (1344-class 1.12s ✓; CLS 0.000 ✓ and TBT ≤ 28ms ✓
  at every class). Cause, not a code defect: at the mobile classes
  the LCP element is the H1 (`.hx-rise`), not §4.2's predicted hero
  frame-1 image, and the 006 cold-load guard holds choreographed
  content hidden until the orchestrator hydrates — which simulated
  slow-4G defers by ~3s. The page itself is within every bundle
  budget (128 B route JS, TBT near zero). The budget as written
  collides with the designed hydration-gated choreography. Decision
  for design and the owner: accept the measurement and re-baseline
  the budget for the designed cold-load behavior, or commission a
  pre-hydration orchestration revision of 006 §5/§6 (a 006.r1 — the
  settle contract must then survive animations that can finish before
  hydration).
- **R8 — the checklist extracted to a living doc** (owner direction
  2026-08-27, post-build). §5's checklist is operational and grows
  with every page completion, which spec immutability cannot host:
  the living copy is `docs/rebuild/launch-checklist.md` (gates,
  steps, rollback, the F2 metadata-wipe inventory, and the F5
  decision note). §5 carries the dated amendment and stays the
  frozen Phase 6 record.
- **R9 — the rd1 page column re-read after the page-load streamline**
  (2026-08-28; 006 §9 carries the section-level record). Design
  compressed the rd1 hero 1t, so the rd1 stack rides up one tick and
  the page total reads 50t. §2 carries the dated amendment; the
  expectations module and the /home-fixture sweep were updated in the
  same change. The 960 Grid layer's 1t overrun found at the read was
  fixed by design and re-read 3040 (38t) through the bridge.

## 8 · Acceptance criteria

At each of the five anchors and one arbitrary width per structural
slice (stretched and compressed, §3.1's ten), scrollbar forced on:

- [x] The page stack sum equals §2's total per band on both `/grid`'s
      successor audit and `/home-fixture`; every `.sec` top and height
      lands on §2's rows; the landmark audit passes; exactly one band
      class visible — at rest in every §3.2 rest state, after settle.
      (Sweep 2026-08-27: both routes × the five anchors + the ten
      §3.1 slice widths, every rest state asserted after settle —
      each engine row active, the portfolio strip at +1/+2, the
      testimonial offsets, a footer drawer open and closed at rm/rs,
      the mobile nav open and closed below 860 — all green; 26
      landmark checks on grid at 384.)
- [x] The realigned sweep passes green in one run covering both
      routes, all fifteen widths each, and still asserts interpolation
      continuity across the four anchors. (One `npm run test:grid`
      run 2026-08-27; anchor joints: 41.922 → 42.000 → 42.031 ·
      47.938 → 48.000 → 48.031 · 55.938 → 56.000 → 56.016 ·
      63.938 → 64.000 → 64.047.)
- [x] The nav overlays without entering any stack sum (asserted
      open and closed); the row-40 lattice renders at rd2 only.
      (Mobile nav open/closed asserted at every audited width below
      860 with stack totals unchanged; the §3.2 section audit asserts
      row-40 on rows 40–41 at rd2 and hidden at rm–rd1.)
- [x] The §4.1 head contract holds on `/`: the two site-font preloads,
      the light guard, the light theme-color — nothing else; no flash,
      no dark browser-chrome tint. (Prerendered head 2026-08-27: the
      two woff2 preloads, `<style>html,body{background-color:#f8f7f2}
      </style>`, `theme-color #f8f7f2`, zero video preloads, no robots
      meta; the only other preload is Next's own framework script
      hint.)
- [ ] Budgets per §4.2 on the production build, measured numbers
      recorded: first load ≤ 115 kB, route JS ≤ 1 kB, eight islands,
      static prerender; Lighthouse LCP ≤ 2.5s / CLS ≤ 0.02 /
      TBT ≤ 200ms at the three viewport classes, LCP being the hero
      frame-1 image. (Measured 2026-08-27: first load 111 kB ✓ ·
      route JS 128 B ✓ · exactly eight islands ✓ · static prerender ✓
      · CLS 0.000 at all three classes ✓ · TBT 28/3/0 ms ✓ ·
      LCP 1344-class 1.12s ✓ — but 384-class 5.33s and 768-class
      5.25s exceed the 2.5s budget, and the mobile-class LCP element
      is the H1, not the hero image: the 006 cold-load guard defers
      choreographed content to hydration. Open as §7 F5, a launch
      gate for the owner; every other budget holds.)
- [x] `prefers-reduced-motion` renders the assembled page
      state-to-state end to end; a no-JS render is the settled page.
      (2026-08-27, production build: reduced — H1 born visible, zero
      finite animations running at 384 and 1344, engine row settled
      active, stack 101.000t; no-JS — settled page, zero
      choreography-hidden elements, stack 101.000t.)
- [x] The §5 checklist is current and its gates are tracked — every
      flag resolved or scheduled (F2's metadata wipe is a launch
      gate). Execution waits until all pages are built; Phase 6 ends
      with the homepage done and work shifting to Pricing. (F1/F3/F4
      resolved; F2 scheduled; F5 added 2026-08-27 as a launch gate.
      Statuses live in `docs/rebuild/launch-checklist.md` — §7 R8.)
- [x] Zero TypeScript and lint errors; every value traces to a token,
      the §2 expectations module, or the root layout's two commented
      cold-load literals (one `bg/100` value). (tsc and lint zero
      2026-08-27; the self-test reads the §2 table from the
      expectations module; the gate floors and anchor widths in
      `fixtures.ts` are the 002.r1 constants and the sweep's slice
      widths are §3.1's, both spec-enumerated.)
