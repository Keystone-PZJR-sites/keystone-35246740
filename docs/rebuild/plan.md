# Marketing site rebuild — plan

New-brand rebuild of the Keystone corporate site — since 2026-08-27 the only
site in this tree. The old site ships from `main` until cutover, and launch
is **big-bang**: nothing deploys until every page is complete.

This is the living plan: standing policies, phasing, and the decision log
going forward. The record of the original rebuild — phases 0–9, specs
001–017, and the 2026-08-22 → 2026-09-03 decision log — is frozen in
[`plan-v1.md`](plan-v1.md). Read it for history; never edit it.

Sitemap: Home · Our Work · Solutions · Pricing · Company · Resources.
Built: Home (v1 — being replaced, Phase 10) · Pricing · Our Work · Case
Studies (template + Palm Coast Zivel). Every page, at every viewport width,
sits on the global grid system.

---

## Sources of truth

In order of authority; when two disagree, the higher one wins.

1. **The live Figma file** `ks-MarketingSite` (IBO39siJYDhiCRtuLWUTW2), read
   through the Figma MCP (`get_metadata` / `get_design_context` /
   `get_variable_defs`). All geometry, type values, and exposure maps are
   read from node data at spec- and build-time — never from screenshots,
   never from prior extractions.
2. **`reference/GRID-SPEC.md`** (v5) — the grid system mechanics. Law for
   *how* the grid is built; contains no content values.
3. **`reference/TOKENS-HANDOFF.md`** — the token architecture. Values are
   re-extracted from Figma variables before every build (spec 001 rule).
4. **Font binaries** — axis/instance facts read from the `.woff2` files
   directly (see spec 001).

## The band system

Five bands, gated by container queries at the bands' geometric midpoints
(nearest-anchor rendering, spec 002.r1). Within a band the anchor's design
renders zoomed on the tick.

| band | gate | anchor | tick |
|---|---|---|---|
| base | — | 384 | 32px |
| `rs` | 470 | 576 | 48px |
| `rt` | 665 | 768 | 64px |
| `rd1` | 860 | 960 | 80px |
| `rd2` | 1130 | 1344 | 112px |

Above 1344 the tick caps at 112px and centered side fields fill the gutters
(spec 002.r2). Light mode only.

## Three-anchor pages — derived bands

New pages may be designed at three anchors only: **384 · 768 · 1344** (owner
decision 2026-09-05, generalizing pricing's 011 §1.1). The undrawn bands
derive: `rs` renders the 384 design on its tick; `rd1`'s source is ruled per
section at spec time (default: the 1344 design, which zooms down cleanly by
construction). Design evaluates the derived bands on the built page — derive
until it looks broken. A frame drawn later supersedes the derivation, as
pricing's 576 did.

## Spec cadence — just-in-time, never batched

Every phase is gated by its own spec, and **specs are written just-in-time,
one phase ahead at most** — never batched upfront. A spec is written only
when its sources are stable: the Figma inputs it cites exist and are
confirmed, and any mechanical lessons from the phase before it have landed.
The rhythm per phase:

1. Design shares/confirms the phase's Figma inputs.
2. The spec is written **from fresh MCP reads of those nodes at writing
   time** — never from memory of earlier reads, prior extractions, or the
   planning passes that informed this plan.
3. Spec approved → implementation → acceptance criteria checked at every
   anchor and mid-band → next phase.

A spec written ahead of its inputs would be written from stale or guessed
values and would need editing later — which spec immutability forbids.

## Special cells — ornament and function on the lattice

Some tick cells in anchor frames are not plain lattice: cells with a radius,
cells with radius and fill, and cells that host controls. Three standing
lessons (full history in `plan-v1.md`):

1. **Metadata reads cannot see what a cell is** — no radius, fill, or
   interactivity. Special cells are inventoried per spec and read per-node
   with `get_design_context`; controls live on the content layer, never the
   lattice.
2. **Metadata reads cannot always see where a node is.** Grid auto-layout
   children can carry stale `x`/`y`. Geometry is verified against rendered
   bounds (`absoluteBoundingBox`, via the console bridge) before it is
   committed.
3. **Carousel frames overflow their anchors** (off-canvas slides). Rendered-
   bounds verification uses the in-frame clip, not the overflowing frame box.

## Phasing

**Phases 0–9 are complete** — foundations, grid engine + harness, core
primitives, footer, nav, homepage v1 (sections + assembly), Pricing, Our
Work, Case Studies Phase A. The record lives in `plan-v1.md`; the open
launch gates live in [`launch-checklist.md`](launch-checklist.md).

- **Phase 10 — Homepage v2** (specs 018–023): the redesigned homepage,
  built in parallel and cut over at 023. See below.
- **Phase 11+ — Solutions · Company · Resources**: same per-page pattern as
  Pricing/Our Work — planning pass from fresh reads → planning flags →
  per-section specs at the next sequential numbers → page assembly spec.
  Order decided when Phase 10 ends.
- **Phase B — Case-study content passes**: Your Health Solutions · Bare Lúx
  Studio on the built 017 template. Content only; no new design inputs.
- **Launch**: the checklist gates (metadata wipe, content passes, budgets,
  sign-off), big-bang after all pages.

## Homepage v2 — Phase 10 (specs 018–023)

The homepage is redesigned between the nav and the footer: same grid
harness, entirely different content, simpler exposure maps, **three drawn
anchors** (384 `799:57207` · 768 `813:80822` · 1344 `799:60207`). The old
homepage specs 006–010 stay frozen as the v1 record; each new spec lists its
superseded predecessor under `Depends on:`.

One spec per section, top-down, just-in-time:

| spec | section | supersedes |
|---|---|---|
| 018 | hero + image carousel refresh (new copy, smaller carousel, new assets) | 006 |
| 019 | system-section (engines diagram + loading animation) | 007's slot |
| 020 | engine section (rd2 sticky two-panel scroll machine; stacked panels below) | 008 |
| 021 | work section (browser-window stack, click-to-advance) | — |
| 022 | case-study carousel (the 012 persona-carousel grammar, no slider) | 009 |
| 023 | page assembly + cutover (expectations, sweep leg, budgets, the `/` swap) | 010 |

Build mechanics: a new composition module mounts on a noindexed dev route
(`/home-next` + fixture; names fixed at 018). `/` and `/home-fixture` keep
mounting homepage v1 untouched until 023. New sections are new components;
the hero fork-vs-parameterize call lands at the 018 build. 023 enumerates
the retired v1 sections and routes for explicit owner approval, retires the
v1 expectations, updates the launch checklist, and re-evaluates the 010 §7
F5 mobile-LCP gate against the new hero.

## Inputs needed from design, by spec

- **018**: carousel image exports + tier direction (copy is in the frames).
- **019**: loading-animation intent in plain language; whether the diagram
  is drawn vector or exported asset.
- **020**: the full interaction description (sticky trigger position, the
  two-state × three-visualization sequence, left-panel scroll vs right-panel
  transition interleave); the small-anchor decision (hijack vs carousel);
  the rd1 derivation ruling; visualization assets; reduced-motion intent.
- **021**: browser-window assets; the advance interaction (click zones,
  wrap, keyboard); whether the windows link out.
- **022**: case-study copy/stat source — preferred: the same per-study data
  modules the case-study pages use, so Phase B passes update both surfaces.
- **023**: cutover approval list and budget targets.

## Decision log — 2026-09-05

- **Homepage v2 is planned as specs 018–023** (owner decisions at the
  planning review). A new sequential block, not `.r1` revisions — the
  redesign replaces sections rather than revising them, and the v1 and v2
  spec sets must live side by side while both homepages exist (the rules'
  second immutability exception). Six specs, one per section plus assembly
  (the table above). Design supplies **three anchors** (384 · 768 · 1344);
  `rs`/`rd1` derive per 011 §1.1 — owner: "derive until we see how broken
  it is"; `rd1` defaults to the 1344 design, ruled per section.
- **The planning pass read all three frames** (metadata-grade, this
  session; rendered-bounds verification happens at each spec's writing).
  Page totals read **238 · 165 · 54** ticks. Sections at every anchor:
  hero (H1 on the streamline line) · image carousel (6/4/4t) ·
  system-section (17/12/6t) · engine section(s) (4×25t / slug + 5×19t /
  8t active-inactive) · work-section (20/16/7t) · case-study section ·
  footer. Section behavior received in plain language: the rd2 engine
  section is a sticky two-panel scroll machine (left description scrolls,
  right panel steps two states across three visualizations); below rt the
  panels stack and the right panel hijacks or carousels (TBD at 020); the
  work section advances a stack of stylized browser windows on click; the
  case-study carousel is the 012 grammar without the slider; the
  system-section has a loading animation. Detail arrives per spec.
- **Planning flags with design** (from the metadata reads): **F1 — the 384
  frame is missing `brand-engine`** — four engine panels, not five, with a
  26t hole (one slug row + one 25t panel) between the system section (ends
  41t) and `visibility-engine` (starts 67t); the 768 frame carries all
  five. **F2 — the 384 case-study section reads off-tick** (700 tall where
  22t is 704; carousel interior 508; a 36px pre-footer gap) and the 1344
  section carries a +1px (897). **F3 — hygiene**: the 384 `reception-egine`
  name typo; the 1344 Grid layer ends at 49t against the 54t frame (verify
  intent).
- **This plan restarted** (owner approval): the original plan archived
  unedited to `plan-v1.md` with a frozen banner — the plan-v1/plan split
  mirrors the frozen spec series. `plan.md` stays the living plan for all
  remaining work; the archive cut is repeatable when the next era
  completes.
