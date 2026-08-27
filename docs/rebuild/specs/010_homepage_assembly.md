# Spec 010 — Phase 6: homepage assembly, the page self-test, the performance pass, and cutover

**Status:** Draft 2026-08-27
**Depends on:** spec 001 (tokens, fonts — the pre-build re-extraction rule)
· spec 002 (grid engine, the `/grid` harness and sweep this spec extends)
· spec 002.r1 (nearest-anchor gates; its §7 R7 erratum is fixed here) ·
spec 003 (primitives) · spec 004 (footer) · spec 005 (nav) · spec 006
(hero) · spec 007 (portfolio; its §8.8 fixture element becomes page
chrome here) · spec 008 (engine) · spec 009 (testimonials; its cutover
content-pass decision gates §5)
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
production-build baseline in §4.3. No new design inputs: Phase 6 adds
no designed surface.

Phase 6 builds no new section. Its deliverables are the page itself:
the verified assembly of specs 004–009 on one route, the page-level
self-test that keeps it verified, the performance pass, and the
checklist that promotes `/home-fixture` to `/`.

---

## 1 · Scope

Three workstreams and a checklist:

1. **The page self-test** (§3) — the `/grid` machinery, realigned to
   002.r1 and extended to run against the real assembled homepage.
2. **The performance pass** (§4) — head hygiene at the root layout,
   v2 font preloads, and measured budgets on the production build.
3. **Cutover** (§5) — the gates, the promote steps, and the rollback
   line. Executed only on the design owner's explicit go; this spec's
   build makes the checklist *ready*, not *done*.

The homepage composition already exists (`/home-fixture` mounts nav ·
hero · portfolio · engine · testimonials · the rd2 row-40 element ·
footer — spec 009 §8.6). This spec re-homes it into a module both `/`
and `/home-fixture` render (§5.6) and changes nothing visual.

## 2 · Page anatomy — the assembled stack per band

Read off the frames 2026-08-27 and verified against rendered bounds.
Rows are zero-based page ticks; each section's internal anatomy is its
own spec's record. This table supersedes the 2026-08-22 page totals in
plan.md (the 768/960 1t card reductions of 2026-08-26 stand) and is
the current record.

| band | hero (006) | portfolio (007) | engine (008) | testimonials (009) | row 40 | footer (004) | page total |
|---|---|---|---|---|---|---|---|
| rm (384) | 0–26 (26t) | 26–45 (19t) | 45–66 (21t) | 66–77 (11t) | — | 77–101 (24t) | **101t** |
| rs (576) | 0–20 (20t) | 20–31 (11t) | 31–44 (13t) | 44–53 (9t) | — | 53–74 (21t) | **74t** |
| rt (768) | 0–13 (13t) | 13–22 (9t) | 22–31 (9t) | 31–38 (7t) | — | 38–53 (15t) | **53t** |
| rd1 (960) | 0–13 (13t) | 13–22 (9t) | 22–31 (9t) | 31–39 (8t) | — | 39–51 (12t) | **51t** |
| rd2 (1344) | 0–12 (12t) | 12–21 (9t) | 21–29 (8t) | 29–40 (11t) | 40–41 (1t) | 41–52 (11t) | **52t** |

- The **nav** is overlay chrome (44px material at every anchor) and
  never participates in the stack — the law in "Material vs.
  tick-riding vs. overlay chrome".
- **Row 40 at rd2** is the page-assembly element (`.hfx-clear-rd2`,
  007 §8.8 as amended by 009 §9: a full 12-cell stroke-only lattice
  row, clear of content). It is the only page-owned exposure; every
  other cell belongs to a section.
- The page **Grid layers** measure exactly the lattice-above-footer
  totals (77 · 53 · 38 · 39 · 41t), which pins each footer top
  independently of the section sums.
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
  on (half-)ticks, exactly as on `/grid`.
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

### 4.1 · Head hygiene at the root layout

`app/layout.tsx` currently ships four old-brand head blocks to
**every** route, including the v2 surfaces and the future `/`: the
dark cold-load guard (`html,body{background-color:#042019}` — the old
hero ink), the matching `theme-color` viewport export, five FK font
preloads, and two old hero video preloads. On the v2 homepage the
guard paints a dark-green flash before the light `bg/100` page, the
theme-color tints mobile browser chrome dark, and the preloads fetch
~hundreds of kB of fonts and video the page never uses.

The fix re-homes them: the old-brand blocks move off the root layout
onto the old-brand surfaces (the `(inner)` group layout and the
old-brand home for as long as it renders), and the root keeps only
what every route shares (metadata, icons, tracking). Old-brand routes
must render byte-identical heads before and after the move.

### 4.2 · The v2 head

The v2 surfaces (and `/` at cutover) get their own critical path:

- **Preload the two v2 font binaries**
  (`gt-standard-standard-vf.woff2`, `pp-kyoto-variable-upright-vf.woff2`
  — `font-display: swap` stands, spec 001).
- **A light cold-load guard** in the same construction the old root
  uses (an inline literal with the comment explaining why a token
  var cannot appear before the token stylesheet loads), carrying the
  `bg/100` value read from the token layer at build; the v2 surfaces'
  `theme-color` reads the same value (a per-route viewport export).
- No video preloads (the v2 page ships none); the hero's frame-1
  `fetchpriority=high` images (006 §5) remain the LCP candidates.

### 4.3 · Budgets — from the 2026-08-27 baseline

Production build at review: `/home-fixture` **4.5 kB route JS ·
116 kB first load · static prerender (1m revalidate)**; the shared
first load **102 kB**; the old `/` for comparison: 346 kB first load.
Eight client islands compose the page (nav-desktop · nav-mobile ·
hero-load · hero-carousel · portfolio-gallery · engine-row ·
testimonials-block · footer-nav); no animation library ships — all
motion is CSS.

The budgets, asserted on the production build:

- `/` first load **≤ 120 kB**; route JS **≤ 6 kB**; exactly **eight
  islands**; static prerender.
- The shared first load holds at **102 kB**; every old-site route
  builds unchanged.
- Lighthouse on the local production build, default throttling,
  recorded at 384-, 768-, and 1344-class viewports: **LCP ≤ 2.5s**
  (the element being the hero frame-1 tier image), **CLS ≤ 0.02**
  (the choreography animates transform/opacity only and must not
  count), **TBT ≤ 200ms**. Measured numbers land in the acceptance
  evidence; regressions beyond a budget block cutover.

### 4.4 · Standing discipline (asserted, not rebuilt)

Image eager/lazy tiers per specs 006–009; WebP only, one tier fetched
per width (002.r1); `prefers-reduced-motion` renders state-to-state;
the token re-extraction runs before this phase's build (001 rule) and
any drift flows through tokens with no code change.

## 5 · Cutover — gates, promote, rollback

The checklist this spec delivers. Steps 1–5 are **gates** (all green
before promote); 6–9 are the **promote**; 10 is the escape line.
Promote executes only on the design owner's explicit go.

1. Specs 006–009 and this spec's §8 acceptance all checked; the §3
   sweep green in CI on both routes.
2. The token layer re-extracted from the Figma variables API for this
   phase's build; diffs (if any) recorded and flowed through tokens.
3. **The testimonials content pass** (009 decision): real quotes and
   attribution replace the placeholder copy; the real photos arrive
   as an art-directed tier set into the existing `<picture>` markup
   and registry entries. No structural change permitted.
4. The §7 flags closed: **F1** is resolved (ship 404s, 2026-08-27);
   **F2** (`/` metadata copy, og-image, theme colors) needs design's
   content decision.
5. Design owner sign-off on the assembled page at the five anchors
   and one width per slice.
6. **Promote:** the homepage composition moves to a single server
   module; `app/page.tsx` mounts it bare; `/home-fixture` keeps
   mounting it under the dev self-test readout and stays the
   permanent QA surface. The old home's page file is retired from
   `/` (its sections, data, and providers stay in the tree — the
   old-brand inner pages still consume them; `main` still ships
   them).
7. `/` is indexable (no robots meta) and carries the §4.2 head and
   the F2 metadata; every dev route keeps `robots: index false`.
8. The §4.1 head split verified: `/` ships no FK preloads, no video
   preloads, no dark guard; `/pricing`, `/about`, `/blog`, `/portal`
   render byte-identical heads to pre-cutover.
9. The §4.3 budgets re-measured on the cutover build and within
   budget.
10. **Rollback** is one revert of the promote commit; the old `/`
    returns intact because nothing it renders was deleted.

## 6 · Deliverable — files, constants, semantics

1. **Expectations module** — the §2 table as typed data
   (`app/home-fixture` scope or alongside `app/grid/fixtures.ts`),
   the single home the self-test reads; no magic numbers in the test
   body.
2. **Harness realignment** — `app/grid/fixtures.ts` (gate floors),
   `app/grid/grid-devtools.tsx` (expectations prop),
   `scripts/grid-selftest.mjs` (slice widths, the `/home-fixture`
   leg, the rest-state drives).
3. **Composition module** — one server component rendering the
   assembled homepage, mounted by `app/page.tsx` (at promote) and
   `app/home-fixture/page.tsx`; the row-40 element and the footer's
   social-links fetch move with it.
4. **Head restructure** — `app/layout.tsx` slimmed; the old-brand
   blocks re-homed (§4.1); the v2 head additions (§4.2). The only new
   constant is the light cold-load literal, commented per the
   existing precedent.
5. **No new tokens, no new assets, no new motion.** Nothing visual
   changes at any width.
6. Docs in the same commits: plan.md's Phase 6 record; the affected
   explainers if the head split shifts any documented behavior.

## 7 · Resolutions record

Review-day record, 2026-08-27. Findings from the Phase 6 build
review; flags F1–F2 are open for design/owner and gate cutover (§5.4).

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
- **F1 — resolved: ship 404s** (owner decision 2026-08-27). The v2
  nav and footer links to `/our-work`, `/solutions`, `/company`, and
  `/resources` ship as-is and 404 until those pages land (only
  `/pricing`, `/portal`, `/how-it-works` resolve today). No interim
  redirects, no gating cutover on the next pages. The 404 surface is
  the framework default (no `app/not-found.tsx` exists) — accepted
  as-is; a branded not-found page is future work, not a Phase 6 gate.
- **F2 (open) — `/` metadata**: the promoted `/` inherits the root
  metadata wholesale (`app/page.tsx` exports none of its own). The
  complete current account, verified against the prerendered head:
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
  - **theme-color meta**: `#042019` (the old hero ink — tints mobile
    browser chrome dark green; §4.1/§4.2 re-home it).
  - **Manifest** (`/site.webmanifest`, shared site-wide): name
    "Keystone", theme `#042019`, background `#063126`, standalone.
  - **Icons**: favicon.ico (16/32) · icon.svg · favicon-192.png ·
    apple-icon.png (180) — the brand mark, brand-neutral enough to
    carry unless design says otherwise.
  - **metadataBase**: `NEXT_PUBLIC_SITE_URL` → `VERCEL_URL` →
    `https://keystone.app`. No canonical, no robots meta (indexable).
  The content decision for design: new-brand title/description copy,
  a new-brand og-image, and whether the manifest/theme colors flip to
  the light palette at cutover or wait for full old-brand retirement
  (the manifest is one shared file — old-brand inner pages read it
  too). The promoted `/` ships whatever design supplies, or the
  standing copy if design confirms it.

## 8 · Acceptance criteria

At each of the five anchors and one arbitrary width per structural
slice (stretched and compressed, §3.1's ten), scrollbar forced on:

- [ ] The page stack sum equals §2's total per band on both `/grid`'s
      successor audit and `/home-fixture`; every `.sec` top and height
      lands on §2's rows; the landmark audit passes; exactly one band
      class visible — at rest in every §3.2 rest state, after settle.
- [ ] The realigned sweep passes green in one run covering both
      routes, all fifteen widths each, and still asserts interpolation
      continuity across the four anchors.
- [ ] The nav overlays without entering any stack sum (asserted
      open and closed); the row-40 lattice renders at rd2 only.
- [ ] Head hygiene per §4.1/§4.2: the v2 page ships the two v2 font
      preloads, the light guard, and the light theme-color — no
      FK/video preloads, no dark flash, no dark browser-chrome tint;
      the old-brand routes render byte-identical heads.
- [ ] Budgets per §4.3 on the production build, measured numbers
      recorded: first load ≤ 120 kB, route JS ≤ 6 kB, eight islands,
      static prerender, shared 102 kB unchanged, every old-site route
      unchanged; Lighthouse LCP ≤ 2.5s / CLS ≤ 0.02 / TBT ≤ 200ms at
      the three viewport classes, LCP being the hero frame-1 image.
- [ ] `prefers-reduced-motion` renders the assembled page
      state-to-state end to end; a no-JS render is the settled page.
- [ ] The §5 checklist is ready: gates 1–3 checkable, F1/F2 answered
      or explicitly carried, the promote steps rehearsed on a branch
      build (steps 6–9 verified once without shipping).
- [ ] Zero TypeScript and lint errors; every value traces to a token,
      the §2 expectations module, or the one commented literal.
