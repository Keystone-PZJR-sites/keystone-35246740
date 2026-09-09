# keystone grid engine — mechanics

How the grid is built, painted, kept crisp, and how things sit on it. The
engine is `design-system/v2/grid/engine.css`; the exposure vocabulary and the
side fields are the other files in `design-system/v2/grid/`. This document
carries the mechanics only — no component, type, or content values. The laws
that govern building on top of it are in `.cursor/rules/30-grid-and-layout.mdc`.

---

## 1 · The units

Every dimension belongs to exactly one unit. Classifying a measurement is the
first decision about anything you build.

- **Tick** — `--t: min(calc(100cqw / 12), 112px)`. The page is 12 columns
  wide and fluid up to the cap. Ticks govern **structure**: column positions,
  section heights, exposure regions, component footprints, every position that
  must stay on the grid as the container scales. Half-ticks are legal where the
  design uses them.
- **Cell** — `--c: var(--space-xl)` (16px). Fixed, never derived from the
  tick. Governs **material**: paddings, control heights, icon sizes, inner
  gaps — anything that stays the same physical size at every width.
- **Weights** (`--wA`, `--wB`) carry **text columns** — wrap-pinning widths
  and text-block heights in flow margins — between a band's anchors (§2).
- **Em at anchor ratios** carries **line-internal spacing** — inline gaps and
  chip paddings ride the type.

The classification test: does the value scale with the container across the
design's anchors (tick), walk with the type (weights, em), or stay the same
physical size everywhere (material)?

The tick is declared from **container width**, not viewport width, so a
classic scrollbar cannot hide the last column:

```css
.v2-root { container-type: inline-size; }   /* body */
.page    { --t: min(calc(100cqw / 12), 112px); --c: var(--space-xl); }
```

## 2 · Bands, anchors, gates, interpolation

**The page is fluid at every width.** Structure rides the tick continuously;
type walks an interpolation line. Bands mean "which designed structure is in
effect, and which pair of designs the type is walking between."

- An **anchor** is a width where a design exists and renders exact. There are
  five: **384 · 576 · 768 · 960 · 1344** (tick = 32 / 48 / 64 / 80 / 112).
  Each is a distinct designed structure, not a scale step of its neighbour.
- A **gate** is a container width where the structure switches. There are
  four, at the bands' geometric midpoints: **470 · 665 · 860 · 1130**, gated
  by `@container (min-width: …)` on `.v2-root` — never media queries, so the
  structure switch and the weights read the same width.

Five anchors, four gates — the lowest anchor needs no gate: **the 384
structure is the base CSS.** Every `@container` block overrides upward from
it. Below 384 the base band's line extrapolates downward.

### Nearest-anchor rendering

Every width renders the nearest anchor's design: **stretched** below its anchor
(from the gate down to the anchor of the band below, the designed
interpolation line runs) and **compressed** above the gate (from the gate up
to the anchor, a pure zoom of that anchor). The weights per slice:

```css
/* interpolating slice, anchor T0 → anchor T1 (e.g. 64 → 80) */
--wA: calc((T1px - var(--t)) / (T1 - T0));   /* 1px → 0px */
--wB: calc((var(--t) - T0px) / (T1 - T0));   /* 0px → 1px */

/* compressed slice, gate → anchor T1: the T1 design zooming down */
--wA: calc(var(--t) / T1);  --wB: 0px;

/* the top band from its gate up: zoom to 1344, then exact (the cap pins wB at 1) */
--wA: 0px;  --wB: calc(var(--t) / 112);
```

Every interpolating value is written `calc(var(--wA)*V0 + var(--wB)*V1)` with
both values read from the anchors. At an anchor one weight is exactly 1, so
the design renders exact. In a compressed slice `wA + wB` collapses to the
zoom factor `t / T`, so text columns and type shrink together with the tick:
wrap counts and designed clearances hold by construction.

### Band constants ride the weights

A value that is constant across a band is written `calc((var(--wA) +
var(--wB)) * V)`, never `Vpx`. The sum resolves to `1px` through the
interpolating slice and to the zoom factor in the compressed slice, so the
constant shrinks with the tick where the design is compressed. Fixed px is the
most common disguise of a unit error: it breaks wraps and clearances the
moment a section meets a compressed slice.

### Hold-then-switch

Type interpolates between a band's two anchors only when both carry the same
structure. When a band boundary is also a structural switch, type holds its
last designed value across the band and switches with the structure at the
gate. Size and line-height interpolate; weight and tracking are band
constants, restated per band.

### The cap and the side fields

At and above a 1344 container the tick is exactly 112px and the weights pin at
0/1, so **the 1344 design renders byte-exact at every wider width**. The page
box is `12t` wide, centered on a whole-pixel offset:

```css
.page {
  --page-x: max(0px, round(down, calc((100cqw - 1344px) / 2), 1px));
  width: calc(12 * var(--t));
  margin-left: var(--page-x);
}
```

The offset snaps to a whole pixel because every hairline derives from the
page's left edge; a half-pixel origin rasterizes the lattice fuzzy at 1× DPR.
The right gutter absorbs the odd pixel. The freed gutters paint the **side
fields**: full-height lattice strips on both sides, sparsely ornamented by a
deterministic server-side hash (`grid/field-hash.ts`, `grid/field.tsx`),
clipping mid-cell at the container edge, never animated. They carry their own
`.gf-*` vocabulary so no choreography or audit selector collects them. Fixed
chrome (the desktop nav bar and drawer) carries `--page-x`.

`.page` also isolates (`isolation: isolate`) so the side-field layer at
`z-index: -1` resolves against the page's stacking context and paints above
the paper.

### Two corollaries that catch most bugs

- A pixel value that secretly encodes a tick relationship ("this margin is
  really 2t minus the header") **drifts mid-band**. If a position is "on the
  k-th tick line", write it in ticks.
- A flow margin that encodes an interpolating text block's height must carry
  that height with the same weights as the text, in every band where the text
  moves. Where a band's anchors change a block's line count, give the block an
  explicit interpolated height so downstream tick anchors hold.

## 3 · Page skeleton

Sections stack in normal flow as flex columns; content stacks in normal flow
inside them. Every section height is a whole number of ticks per band, read
off the anchor. A fractional section is exceptional and design-driven, never
convenient.

```css
.sec { position: relative; isolation: isolate;
       display: flex; flex-direction: column; align-items: flex-start; }
```

`isolation: isolate` is load-bearing. Each section gets its own stacking
context, so the grid overlay lives at `z-index: -1` *inside* the section —
above the page background, below every piece of section content:

- Flow content never needs `position: relative` to paint above the lattice.
- The lattice never leaks between sections.
- Anything that paints *between* lattice and content (ornament cells) gets
  `z-index: 0`.

Because sections are whole-tick tall, the page is **self-testing**: the sum of
section heights is a known tick total per band, and `page.scrollHeight / t`
equals it at any width in the band.

## 4 · Painting the grid — selective exposure regions

The lattice shows **only where the design exposes it**. Each section carries
one overlay (`.gx`); the overlay paints nothing itself — it holds **exposure
regions**, rectangles declared in ticks and transcribed from the anchor's cell
map, rendered by `grid/region.tsx`:

```html
<section class="sec …">
  <div class="gx" aria-hidden="true">
    <div class="grid-region rt" style="--gx:8; --gy:3; --gw:4; --gh:9">…</div>
  </div>
  …content…
</section>
```

```css
.gx { position: absolute; inset: 0; z-index: -1; pointer-events: none; }
.grid-region { position: absolute; border: 1px solid var(--line);
  left: calc(var(--t) * var(--gx)); top: calc(var(--t) * var(--gy));
  width:  calc(var(--t) * var(--gw) + 1px);
  height: calc(var(--t) * var(--gh) + 1px); }
.grid-region i.v { top: 0; bottom: 0; width: 1px; left: calc(var(--t)*var(--n) - 1px); }
.grid-region i.h { left: 0; right: 0; height: 1px; top:  calc(var(--t)*var(--n) - 1px); }
```

- **`--gy` is section-local.** Sections are whole-tick tall, so local
  anchoring is automatically in global phase; a region never needs to know
  where its section sits on the page.
- **The region's own border** draws its outer rectangle. Its **interior
  lattice** is `(gw−1)` vertical and `(gh−1)` horizontal real 1px elements.
  Absolutely positioned children measure from the padding box (inside the 1px
  border), hence the `- 1px` in their offsets — it puts interior lines on the
  same pixel geometry as the borders.
- **Band gating.** Every region and ornament carries a band class — `rm`
  (base), `rs`, `rt`, `rd1`, `rd2` — and the container queries display exactly
  one set. Gating works by rule order: any absolutely-positioned vocabulary
  added *after* the gating rules at equal specificity overrides its own gating.
  Give such elements compound gating rules (`.decor.rd2 { … }`).
- **Vocabulary** beyond the region: `.grid-fill` — a solid cell (`background:
  var(--line)`, sized `t+1`); `.grid-cellx` — a standalone outlined cell or
  block (takes `--gw/--gh`); `.decor` — a cell that hosts an ornament, sized
  `t+1`, `z-index: 0`.

### Decomposing a cell map into regions

1. **A full field is one region.** Content that overlaps it sits on top; cells
   "under" buttons or cards need no special casing.
2. **Interior holes need nothing.** A missing cell surrounded by cells is
   outlined by its neighbours' lines anyway. Paint the full region; put the
   ornament on top.
3. **Edge voids and channels are made by splitting.** Decompose into several
   regions whose borders *bound* the void; nothing crosses it.
4. **Fields that span sections are split at section boundaries.** The upper
   region's bottom border and the lower region's top border land on the same
   pixel (§5), so the seam is invisible and each section stays self-contained.
5. **Adjacent regions may share edges freely** — coincidence is the mechanism.

Expect roughly a dozen rectangles per band for a whole page. Many more means a
missed merge.

### Special cells

Some cells in an anchor frame are not plain lattice: cells with a radius,
cells with radius and fill, cells that host controls. Metadata reads cannot
see what a cell is — inventory special cells per section and read each with
`get_design_context`. Controls live on the content layer, never the lattice.

## 5 · Crisp 1px hairlines

Four rules produce hairlines that are exactly one device pixel at every
fractional tick width:

1. **No gradients, ever.** A `repeating-linear-gradient` stripe cannot snap
   to device pixels at fractional ticks. Every painted line is a **border or a
   real 1px element**.
2. **One geometry.** All line positions derive from the same expression,
   `k · var(--t)`. Two elements drawing the same edge from that expression
   coincide into one line. Two elements drawing the same edge from *different*
   expressions (`k·t` vs `k·t − 1px`) stack into a doubled line. Derive, don't
   eyeball.
3. **Line-inclusive sizing (+1px).** Anything bordered whose edges must land on
   lattice lines is sized `k·t + 1px`, so its far border occupies the same
   pixel as the next line. Flush bordered siblings additionally collapse with
   `margin-left: -1px`.
4. **Strips don't drift.** In a scrolling row, `+1px` widths with a naive
   `gap: t` accumulate 1px per item. Use `gap: calc(var(--t) - 1px)`.

One color token (`--line`, the site's `border/000`) is used for the lattice,
region borders, and any component border that should read as part of the grid.

## 6 · Sitting on the grid

Layering, bottom to top: paper → side fields and lattice (z:-1) → ornament
cells (z:0) → all normal-flow content. Whatever you build meets the lattice in
one of three ways:

1. **Bordered boxes merge with it.** Size `k·t + 1px`, border `var(--line)`,
   position on ticks. Use when the design draws a stroked box whose edges lie
   on grid lines.
2. **Borderless boxes sit exactly on it.** Size exactly `k·t`, no +1. Effects
   that paint outside the box (offset shadows) never participate in grid
   geometry. Fully-rounded elements (capsules, circles) sit exactly on ticks.
3. **Overlays anchor to lines or fields.** Elements the design centers on a
   tick line are absolute, in section-local ticks:
   `top: calc(k*var(--t) - H/2)`. Elements centered on a cell field anchor to
   the field's center. Absolute positioning is reserved for these overlays plus
   the grid vocabulary itself; anything else absolutely positioned is a defect.

**Positions are emergent from flow, never declared as coordinates.** Give the
band above a component a whole-tick height and the component lands on the next
tick line by construction. Center content in a whole-tick band with flex.
Bottom-anchor the last component of a section with `margin-top: auto`. Where a
margin must place the *next* tick-anchored thing after fixed material and
interpolating text, write all three terms out:

```css
margin-top: calc(k*var(--t) - <material px> - (var(--wA)*H0 + var(--wB)*H1));
```

If two flow siblings overlap in the design, the same calc goes negative — that
is designed overlap, not a reason for absolute positioning.

**Text never snaps to the lattice.** Text sits inside containers sized in
ticks: the container lands on ticks, the space inside is material, and the
resolved text width is whatever the padded container leaves — never a
standalone constant. HUG text (natural width, designed line breaks) gets no
width at all.

**The tick wins.** A whole-tick box height governs over its declared padding
sum; where content hugs shorter than the tick height, the slack compresses
padding or sits as clear space.

## 7 · Defining components by tick usage

Every component is *defined* per band by its tick footprint — how many ticks
wide and tall, at which tick position, with which stride if repeated.

1. **Read the footprint off each band's anchor** — never scale one band's
   footprint to make another. Check `width / t` and `height / t` land whole
   (or designed half-ticks) at the anchor.
2. **Classify everything inside it** (§1): footprint and position are ticks;
   paddings, radii, icons, inner gaps are material band constants; its type
   interpolates with the weights; inline gaps ride em.
3. **Give it the right lattice contract** (§6).
4. **Repeat with a tick stride.** Cards in a strip: width `k·t(+1)`, gap per
   the strip rule (§5).
5. **Same DOM across bands.** A component whose arrangement changes per band is
   one DOM with band-gated display and per-band CSS — content is never
   duplicated per band unless the design changes the content itself.
6. **Primitives are material; sections place them.** A primitive is fixed px
   per size variant and never band-aware; the section chooses the variant per
   band and owns the instance's width. A primitive may instead be declared
   **proportional**: every interior value a designed-px-over-anchor-cell
   fraction, so a mount that passes the page tick scales the whole control.
7. **Some widths are designed px constants** in a band. Carry them as band
   constants in that band only — after confirming against the anchor that they
   do not ride the tick.

## 8 · Self-tests

The page-side audit (`app/grid/grid-devtools.tsx`, mounted in development
through the `*-qa` wrapper that production aliases to a null stub) exposes
`window.__GRID_SELFTEST__`. `npm run test:grid` (`scripts/grid-selftest.mjs`)
drives it on the live pages at every anchor, one mid-band width per band, and
capped wide widths, scrollbar forced on, in every interactive state at rest:

1. **Tick, weights, interpolation** — `--t` and `--wA/--wB` resolve to the
   band's values; a sampled interpolating value lands on its line.
2. **Stack sum** — `page.scrollHeight / t` equals the band's tick total; every
   section is whole-tick tall.
3. **Landmark audit** — `(rect(el) − rect(page).top) / t` for every structural
   landmark is integer (or designed half-tick), within ±1px for +1-sized boxes.
   Anything that drifts mid-band is a px value encoding a tick relationship.
4. **Band-gate sweep** — exactly one band class of `.grid-region`/`.decor` is
   visible at each width.
5. **Seams** — coincident edges paint one pixel, no doubling, no gaps.
6. **Exposed-cell clearance** — no landmark content box intersects a rendered
   exposed cell; designed overlaps are declared in the page's expectations
   module, never tolerated silently.
7. **Side fields** — above the cap, the fields fill the gutters and clip
   mid-cell at the container edge.

The harness audits vertical stacks and cell clearance. Check horizontal
clearance against exposed cells by eye as well at compressed-slice widths
(below each anchor, above each gate).
