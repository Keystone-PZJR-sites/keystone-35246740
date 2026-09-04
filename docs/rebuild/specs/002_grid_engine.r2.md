# Spec 002.r2 — Grid engine: the wide-viewport cap and the side fields

**Status:** Approved 2026-09-03 — F1 and F2 ruled by the owner the same
day ("F1 is fine to start · F2 correct" — §9); built the same day
**Depends on:** spec 002 · spec 002.r1 (everything not revised here
stands) · spec 010 §3 (the harness this extends)
**Sources:** the design owner's wide-viewport decisions 2026-09-03
(recorded in §9) · `docs/rebuild/reference/GRID-SPEC.md` (v5) as amended
by 002/002.r1 · the built engine (`design-system/v2/grid/engine.css`)

**No Figma nodes are cited.** The file's widest frames are the 1344
anchors; no design exists above 1344. Everything below derives by law
from the owner's rulings plus the standing v5 mechanics — the sanction
is recorded in §9 R2, on the 011 §1.1 derived-band precedent. A wide
frame drawn later supersedes this derivation (amendment protocol).

This revision supersedes **v5 §2's uncapped over-zoom above the last
anchor** (adopted 2026-08-22, "above 1344: pure zoom") and the
corresponding "uncapped" line in rules.md "Responsive-Native" (the
rules amendment rides the build). Everything else in 002/002.r1 stands.

---

## 1 · The problem this revises

Above 1344 the engine zooms the rd2 anchor without bound — at 1920 the
design renders at 143%, at 2560 at 190%. The owner's direction: **the
content stops scaling; the freed width becomes visible grid.** The page
renders the 1344 anchor exactly at every wider width, centered, and the
lattice paints outward from both page edges to the viewport edge —
sparsely ornamented, so the page reads as sitting on a larger field of
the same grid.

## 2 · The cap

The tick caps at the rd2 anchor:

```css
.page { --t: min(calc(100cqw / 12), 112px); }
```

One change caps everything, by the engine's own construction:

- Below a 1344 container `100cqw / 12 < 112px` — the `min()` is inert
  and every width renders byte-identical to today.
- At and above 1344, `--t` is exactly **112px**. The rd2 weight rule is
  untouched (`--wA: 0; --wB: calc(var(--t) / 112)`), so `--wB` pins at
  **exactly 1** — the four units all freeze at their anchor values:
  geometry rides the capped tick, type and text columns ride the pinned
  weights, line-internal spacing rides the frozen type, material never
  moved. **The 1344 anchor render is byte-exact at every width ≥ 1344**
  — there is no over-zoom band anymore, and no new gate: rd2's one rule
  covers its compressed slice, the anchor, and everything above.
- Sub-384 extrapolation, the four structural gates, and the compressed
  slices are untouched.

Cell arithmetic above the cap: ticks are whole 112px, so every field
cell is the designed rd2 cell. The slack splits across both sides (§3),
so each side gains one whole column per **224px** of container — at
1456 each side shows a clipped half-column (sanctioned, §9 R1e).

## 3 · The page box

The page becomes a centered, capped box; the slack becomes two gutters:

```css
.page {
  --page-x: max(0px, round(down, calc((100cqw - 1344px) / 2), 1px));
  width: calc(12 * var(--t));   /* = 100cqw below the cap, 1344 above */
  margin-left: var(--page-x);
}
```

- `--page-x` is declared on `.page` (the 002.r1 §4 scope rule — it
  rides `cqw`) and is **snapped to a whole pixel** with `round(down)`:
  every hairline inside the page derives from the page's left edge, and
  a half-pixel origin would rasterize the whole lattice fuzzy at 1×
  DPR (the v5 §5 crispness law). The right gutter absorbs the odd
  pixel — invisible.
- Below 1345 the offset is 0 and the width is the container — the box
  rule is inert everywhere the site exists today.
- The paper lives on `.v2-root` (base.css), so the gutters show the
  same paper with nothing added.

## 4 · The side fields

Owner rulings (§9 R1): a **full lattice field, top-to-bottom**, both
sides, **randomly populated at low density**, clipping mid-cell at the
viewport edge, never animated.

### 4.1 · Geometry

New engine vocabulary — a page-level layer behind everything:

```html
<div class="page">
  <div class="gfield" aria-hidden="true">
    <div class="gf-strip west">…</div>
    <div class="gf-strip east">…</div>
  </div>
  …sections…
</div>
```

- `.gfield`: absolute, spanning the **full container** behind the page
  (`left: calc(0px - var(--page-x))`, width `100cqw`, top/bottom 0),
  `z-index: -1`, `pointer-events: none`, `overflow: clip`. Display is
  gated `@container (min-width: 1345px)` — the field exists only where
  a gutter exists. It sits below every section (sections isolate their
  own stacking contexts above it) and clips its strips at the container
  edge — columns cut mid-cell at the viewport (minus any classic
  scrollbar), per the ruling. *Amended 2026-09-03, the build-review
  erratum (§9): the field's `z: -1` must resolve against the **page's
  own stacking context** — `.page` now carries `isolation: isolate`
  (the v5 §3 "isolation is load-bearing" idiom, at the page level for
  the same reason sections carry it). In the root's context the paper
  buried the layer: the field laid out, passed every geometry
  assertion, and never painted. The devtools' field check now asserts
  the page's isolation as the paint-order guard.*
- Each `.gf-strip` is built from the standing region mechanics: a
  line-inclusive bordered rectangle (`k·t + 1px`) with interior 1px
  line children at `k·t − 1px` — **12 columns** wide (covering gutters
  up to 1344 per side, i.e. containers to 4032px; beyond that, paper),
  **the page's rd2 tick total** tall (full height, top-to-bottom,
  beside nav rows and footer alike).
- **One geometry** (v5 §5): both strips derive their positions from
  `--page-x`, so the west strip's inner border lands on the same pixel
  as the page's col-0 hairlines and the east strip's inner border on
  the col-12 pixel — coincidence, not adjacency. Rows are in **global
  page phase** by construction: the strips anchor to the page top and
  the page total is whole-tick.
- Column indices count **outward from the page edges** (west 1…12
  going left, east 1…12 going right) and rows from the page top, so as
  the viewport grows, new cells appear at the outer edge and no
  existing cell ever moves or reshuffles.

### 4.2 · Population

Sparse ornaments from the **standing `.f-cell` vocabulary** (engine.css
— outlined circle · filled square · filled circle), rendered as `.decor`
cells inside the strips. Placement is a **deterministic seeded hash** —
computed server-side at render, so the HTML is identical across loads
and hydration-safe with zero JS:

```
h(side, col, row) = avalanche(col·0x9E3779B1 ⊕ row·0x85EBCA6B ⊕ side·0xC2B2AE35) mod 1000
   where avalanche(x) = y ⊕ (y >>> 15), y = (x ⊕ (x >>> 15))·0x27D4EB2F   (32-bit)
populate where h < 40            (density 4% — §9 F1)
shape: h mod 4 → 0,1 outlined circle · 2 filled square · 3 filled circle
```

*Amended at build, 2026-09-03 (§9 build record): the draft's raw
prime-XOR mix (`col·73856093 ⊕ row·19349663 ⊕ side·83492791`) left a
structured three-cell run across the near columns at simulation; the
avalanche mix above replaces it — same density, same mix, properly
unstructured. The one implementation (`grid/field-hash.ts`) is shared
by the component and the devtools' field audit.*

- Density **4%** and the **2:1:1 mix** are this spec's proposed values
  for approval — the ruling said "low density" without numbers (§9 F1).
  At 1920 that is roughly six visible ornaments per side.
- The hash keys on grid coordinates only — stable across widths (§4.1's
  outward indexing), across pages with equal totals, and across builds.
- **The field never animates** (§9 R1f): born settled, no beat in any
  load choreography, nothing to restart at any gate (the 002.r1 §5
  settle contract holds trivially — the display-gated field carries no
  animations). Reduced-motion and no-JS render it identically.

### 4.3 · Mounting

A `GridField` server component (`design-system/v2/grid/field.tsx`)
taking the page's rd2 tick total (from its expectations module — the
010 §3 pattern). Every `.page` composition mounts it as the layer
before its sections (`home` · `pricing` · `our-work` · `case-study`);
`/grid` mounts it over the fixture stack so the harness leg (§6) audits
it. Zero islands; the production graphs stay static.

## 5 · Chrome

- **Nav** (§9 F2 — assumed, pending confirm): the desktop bar and
  subnav drawer are `position: fixed` with viewport-relative offsets
  (`left: var(--t)`), which under a centered page would drift into the
  west gutter. They gain the page offset — `left: calc(var(--page-x) +
  var(--t))` — putting them on the page's col-1 line at every width;
  below 1345 the term is 0px and the render is byte-identical. The
  mobile chrome (bar, panel, catch) displays only far below the cap and
  is untouched.
- **Footer**: in normal flow inside the capped page — spans 12t and
  stops **by construction** (the ruling, §9 R1d). Nothing to change.
- **The 016 gallery overlay** is a fullscreen viewport takeover above
  the page and stays full-viewport; its scrim covers the fields. The
  017 sticky TOC is flow-relative inside the page. Both unaffected.

## 6 · Harness and verification

- **The devtools' assertion tick gains the cap** — `const t =
  Math.min(containerW / 12, 112)` (and the tick check's label/expected
  value with it). Without this the 017-erratum formula (`container ÷
  12` exact) fails a correct capped build at every wide width — the
  002.r1 R7 failure class in reverse, caught at spec time. The rd2
  weight check (`wB = t / anchorT`) and the stack sums ride the capped
  `t` and pass unchanged.
- **Wide sample widths join the sweep** (`app/grid/fixtures.ts`): one
  just past the cap and one deep — **1456 · 1920** — run on every
  audited route alongside the anchors and slices.
- **New field assertions** on routes that mount it: display gated at
  1345; inner-edge seam coincidence with the col-0/col-12 lines (one
  line, one pixel); row phase (field row k on the page's row-k line);
  ornament count and positions exactly reproduce the §4.2 hash;
  `pointer-events: none`; zero hydration mismatch under Strict Mode
  double-mount and HMR.
- **The exposed-cell clearance assertion**: the fields sit wholly
  outside the 12t page, beside no content by construction — the field
  layer is its own declared class in the expectations, not a per-page
  exception.
- **Image tiers** (`media.ts`): untouched — the cap *bounds* the
  maximum rendered size, so the 1344 tiers become strictly sufficient
  where the uncapped zoom used to outgrow them.

## 7 · What is unaffected

Everything at and below a 1344 container: the five anchors, the four
gates, the compressed slices, sub-384 extrapolation, all type
interpolation, every built section, the budgets. The cap's `min()`, the
box's `max()`, the nav's `+ 0px`, and the field's display gate are all
mathematically inert below 1345 — acceptance pins this with byte-level
comparison at the anchors and slices.

## 8 · Acceptance criteria

At the five anchors, one width per structural slice, and the wide
widths 1456 · 1920 · 2560, scrollbar forced on:

- [x] At and below 1344: every audited route renders byte-identical to
      the pre-revision build (the cap's `min()`, the box's `max()`, and
      the field's gate are mathematically inert below 1345; anchors
      pixel-exact in the sweep with unchanged expectations — the five
      anchors and nine sub-cap slices green on all five routes).
- [x] Above 1344: `--t` exactly 112; `--wA` 0 and `--wB` exactly 1;
      type and wrap counts at the 1344 anchor values; stack sums the
      rd2 totals (1456/1920 green on every route); the page box 1344
      wide with a whole-pixel left offset (280 at a 1905 container —
      `round(down)` of 280.5, the odd pixel east).
- [x] The fields display only above a 1344 container; inner edges
      coincide with the page's col-0/col-12 hairlines (west strip right
      edge 281 = page left + 1; east strip left 1624 = page right —
      one pixel, no doubling, asserted by the field check at every
      wide width); rows in global page phase (sampled k·t lines
      exact); outer columns clip mid-cell at the container edge;
      strips full page height on all five mounting routes.
- [x] Ornaments reproduce the §4.2 hash exactly — position, shape, and
      count asserted cell-by-cell by the field check (87 on the
      homepage at 1905: 45 west · 42 east, matching the simulation);
      deterministic server render (the SSR HTML carries the full
      field; zero client JS, so no hydration variance is possible);
      `pointer-events: none` asserted.
- [x] The nav bar and drawer sit on the page's col-1 line at wide
      widths (bar left 392 = 280 + 112 at 1905); mobile chrome
      untouched (sub-gate, `--page-x` = 0). The footer spans the 12t
      page and stops (in flow, capped by construction).
- [x] Zero animation restarts crossing 1345 (either direction) or any
      gate after settle: the field carries no animations and its own
      class vocabulary — no choreography selector can match it (§4.3);
      the sweep resizes one page instance across every gate and
      re-asserts each width settled. Reduced-motion and no-JS render
      the settled page with the fields identical (static server HTML).
- [x] Harness: the devtools tick assertion carries the cap; 1456 and
      1920 run in the sweep on every audited route; all five routes
      green in one run — **524 checks, zero failures** (the prior
      record was 499; the wide legs add the field checks and the TOC
      drives at 1456/1920).
- [x] Zero TypeScript and lint errors. *Open: the production-build
      budget pass (owner coordination — the standing `.next`
      cohabitation hazard); expected unchanged: the field is
      server-rendered, zero islands, no route-JS surface.*

## 9 · Flags & resolutions record

Owner decisions, 2026-09-03 (the wide-viewport review):

- **R1 — the six rulings** that define this revision:
  (a) the tick caps at the rd2 anchor — 112px, the 1344 design exact at
  every wider width (chosen over freezing at a 1456 container, whose
  tick would be a meaningless 121.33px);
  (b) the freed width paints a **full lattice field, top-to-bottom**,
  not a continuation of per-section east exposures;
  (c) the page **centers** — fields on both sides, not east-only;
  (d) the field is **randomly populated at low density** (values
  proposed in §4.2 — F1);
  (e) columns **clip mid-cell** at the viewport edge — no whole-cell
  fitting, no variable margin;
  (f) the **footer spans 12t and stops**; the field carries **no
  choreography** ("nothing now").
- **R2 — derived-by-law sanction**: no Figma frame exists above 1344;
  this revision's geometry derives from R1 plus the standing v5
  mechanics, on the 011 §1.1 derived-band precedent. A wide frame drawn
  later supersedes it through the amendment protocol.
- **F1 — resolved 2026-09-03** (owner: "fine to start"): the §4.2
  density (4%) and shape mix (2:1:1) ship as specced; the values may
  be re-tuned at a review of the built field (a future dated
  amendment, not a blocker).
- **F2 — resolved 2026-09-03** (owner: "correct"): the nav caps with
  the page — the bar and drawer carry `--page-x` and sit on the page's
  col-1 line at every width (§5).
- **R3 — the harness formula** (`grid-devtools.tsx` line ~126,
  `container ÷ 12` exact — the 017 erratum fix) would fail a correct
  capped build at every width above 1344; found at spec writing, the
  §6 cap is part of this revision, not a follow-up.

Build record, 2026-09-03 (approved and built the same day):

- **The §4.2 hash amended at build** (dated amendment in place): the
  draft's raw prime-XOR left a structured three-cell run across the
  near columns (row 11, cols 1–3 east) at simulation; replaced with
  the avalanche mix — measured density 3.9%/3.6% west/east over the
  full 12×96 domain, ~5 visible ornaments per side at 1920 on the
  homepage, no structured runs. One implementation
  (`grid/field-hash.ts`) is shared by the component and the audit.
- **The field carries its own class vocabulary** (`.gf-strip` ·
  `.gf-cell`), not `.grid-region`/`.decor`: the 006 load choreography
  animates those classes page-wide and the cold-load guard hides them
  pre-run — distinct classes make "the field never animates" true by
  construction, and keep the field out of the clearance audit's
  exposure set and the band-gate count with no exceptions declared.
- **Strips stretch to the live page** (`top/bottom: 0`) rather than
  sizing to the resting total: drawers grow the page by whole ticks
  (013 §7.2), so slack rows unclip in phase — the field stays
  full-height in every rest state. Rendered coverage is 96 rows
  (`FIELD_ROWS`), asserted ≥ the live stack by the field check.
- **The sweep's uncapped "1600 rd2 zoom" leg retired**, replaced by
  the §6 widths (1456 · 1920) — under the cap 1600 asserted nothing
  1920 does not.
- Verified: tsc/lint zero; the full sweep green in one run against
  the owner's dev server — five routes × (five anchors + eleven
  slices) through every rest state, 524 checks, zero failures; the
  1905-container render inspected in the browser (the page lattice
  and the fields read as one continuous grid; the col-12 seam
  invisible). Open: the §8 production-budget pass (owner
  coordination), and the F1 values stand "to start" — a field-density
  review after the owner sees it wide is expected, landing as a dated
  §4.2 amendment.
- **The build-review erratum — the field laid out but never painted**
  (owner report, same day: "the lattice isn't painting outside the
  1344 edge"). Diagnosis at the live page: every geometry fact was
  correct (strip edges 281/1624, line elements sized and line-colored,
  87 cells) yet the gutters rendered bare paper — even a test-tinted
  strip box did not paint; raising the layer to `z: 0` painted it.
  The field's `z: -1` was resolving against the **root's** stacking
  context (the `.v2-root` container), where the paper buries the
  negative layer; `.page` was not a stacking context, so the layer
  fell through. Fix: `.page` gains `isolation: isolate` (§4.1
  amendment — the section idiom at page level); the field keeps its
  `z: -1` semantics, below all page content, above the paper. Safe by
  inspection: the gallery overlay portals to `document.body` (outside
  the page's context, positive `--z-modal` — still above), and all
  in-page relative order is unchanged (one shared context before and
  after). **Two audit lessons recorded:** the geometry assertions
  could not see a paint failure (the field check asserted rects and
  hash on a layer no one could see), and `elementsFromPoint` cannot
  probe a `pointer-events: none` layer — the field check now asserts
  the page's computed `isolation` as the paint-order regression
  guard, and paint remains an eyes/screenshot check at review. The
  full sweep re-ran green after the fix (524 checks); the render
  re-inspected at 1905 — both gutters paint from the stylesheet.
