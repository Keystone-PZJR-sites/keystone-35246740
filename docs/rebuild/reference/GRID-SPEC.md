# keystone grid system — CSS/grid structure spec (v5)

This document specifies the grid system underneath the keystone site: how the
grid is built, how it is painted, how hairlines stay crisp, how things sit on
it, and how anything you build is defined in ticks. You will receive the Figma
designs separately and **build every element and component from scratch** from
them — this spec deliberately says nothing about specific components, type, or
styling. `keystone-v5.html` is the reference implementation of these mechanics:
read it for the *patterns*; never copy its content values.
(The superseded per-cell model is archived in `GRID-SPEC-v3.md`.)

---

## 1 · The two units

Every dimension on the page belongs to exactly one of two units. Classifying a
measurement as one or the other is the first decision you make about anything
you build.

- **Tick** — `--t: calc(100cqw / 12)`. The page is always 12 columns wide,
  continuously fluid. Ticks govern **structure**: column positions, section
  heights, exposure regions, component footprints, and every position that
  must stay on the grid as the viewport scales. Half-ticks are legal where the
  design uses them.
- **Cell** — `--c: 16px`. Fixed, never derived from the tick. Governs
  **material**: paddings, control heights, icon sizes, inner gaps — anything
  that stays the same physical size at every width.

The classification test: does the value scale with the viewport across the
design's anchors (tick), or is it the same physical size everywhere
(material)?

Declare the tick from **container width**, not viewport width, so a classic
scrollbar can't hide the last column:

```css
body  { container-type: inline-size; }
.page { --t: calc(100cqw / 12); --c: 16px; }
```

## 2 · Bands, anchors, interpolation

**The page is fluid at every width — nothing is ever static.** Structure rides
the tick continuously (a 9t-wide box is fluid because `--t` is fluid), and
type walks an interpolation line. Bands do not mean "fixed layouts between
breakpoints"; they mean "which designed structure is in effect, and which pair
of designs the type is walking between."

Two related but distinct concepts:

- An **anchor** is a width where a design exists and the rendering is exact.
  There are five: **384 · 576 · 768 · 960 · 1344** (tick = 32 / 48 / 64 / 80
  / 112). Each is a distinct designed structure, not a scale step of its
  neighbor.
- A **band switch** (media query) is a width where the *structure* reflows.
  There are four: 576 / 768 / 960 / 1344, **mobile-first**.

Five anchors, four switches — because the lowest anchor needs no switch: **the
384 structure IS the base CSS.** The un-mediaqueried rules are the 384 design,
and every `min-width` block overrides upward from it. 384 is not "unused"; it
is the foundation in effect everywhere the overrides don't reach, and it is
the floor anchor of the base band's interpolation (0–575 interpolates 384→576;
at exactly 384 the weights render it pixel-exact; below 384 the same line
extrapolates on downward).

Every band switch happens *at* a shared anchor: 576 is the ceiling of the band
below and the floor of the band above. On entry to the new band the floor
weight is exactly 1, so both bands render the same type values at the switch
width — type is **continuous through every switch**; only the structure
re-arranges. (Caveat: media queries fire on viewport width, weights ride
container width, so a classic scrollbar produces a sub-1% kink at switches.
Known and accepted; container queries for the switches would eliminate it.)

Between two neighboring anchors, type and text-column widths run linearly from
one anchor's designed value to the other's, driven by two per-band weights:

```css
/* T0/T1 = the band's floor and ceiling anchor ticks, e.g. 64 and 80 */
--wA: calc((T1px - var(--t)) / (T1 - T0));   /* 1px → 0px across the band */
--wB: calc((var(--t) - T0px) / (T1 - T0));   /* 0px → 1px */
/* above the last anchor: --wA: 0px; --wB: calc(var(--t) / 112); — pure zoom */
```

Every interpolating value is written `calc(var(--wA)*Vfloor + var(--wB)*Vceil)`
with both values read straight from the anchors. At an anchor one weight is
exactly 1, so the design renders exactly; between anchors the value walks the
line; the page is continuous at every width. Values that hold across a band
collapse through the `wA + wB = 1px` identity and need no redeclaration.

The division of labor is strict:

- **Structure** is written in ticks and needs no weights — it is fluid by
  construction.
- **Type and text columns** interpolate with the weights.
- **Material** is fixed px per band (band constants), restated only in bands
  where it changes.

Two corollaries that catch most bugs:

- A pixel value that secretly encodes a tick relationship ("this margin is
  really 2t minus the header") **will drift mid-band**. If a position is "on
  the k-th tick line," write it in ticks.
- A flow margin that encodes an interpolating text block's height must carry
  that height with the same weights as the text, in every band where the text
  moves. Where a band's anchors change a block's line count, give the block an
  explicit interpolated height so downstream tick anchors hold while the text
  re-wraps inside it.

## 3 · Page skeleton

Sections stack in normal flow as flex columns; content stacks in normal flow
inside them. Every section height is a whole number of ticks per band, read
off the anchor (a deliberate designed exception is allowed — e.g. one v5 band
has a fractional section because its bottom cell field is bottom-anchored —
but treat fractional as exceptional and design-driven, never convenient).

```css
.sec { position: relative; isolation: isolate;
       display: flex; flex-direction: column; align-items: flex-start; }
```

`isolation: isolate` is load-bearing. It gives each section its own stacking
context, which is what lets the grid overlay live at `z-index: -1` *inside*
the section — above the page background, below every piece of section content.
Consequences:

- Flow content never needs `position: relative` to paint above the lattice.
- The lattice can never leak between sections.
- Anything that must paint *between* lattice and content (ornament cells)
  gets `z-index: 0`.

Because sections are whole-tick tall, the page is **self-testing**: the sum of
section heights (+ whole-tick margins, if any) is a known tick total per band,
and `page.scrollHeight / t` must equal it at any width in the band.

## 4 · Painting the grid — selective exposure regions

The lattice is shown **only where the design exposes it**. Each section
carries one overlay; the overlay paints nothing itself — it holds **exposure
regions**, rectangles declared in ticks and transcribed from the design's cell
maps:

```html
<section class="sec …">
  <div class="gx" aria-hidden="true">
    <div class="grid-region rt" style="--gx:8; --gy:3; --gw:4; --gh:9"></div>
    …
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
.grid-region i          { position: absolute; background: var(--line); }
.grid-region i.v { top: 0; bottom: 0; width: 1px; left: calc(var(--t)*var(--n) - 1px); }
.grid-region i.h { left: 0; right: 0; height: 1px; top:  calc(var(--t)*var(--n) - 1px); }
```

- **`--gy` is section-local.** Sections are whole-tick tall, so local
  anchoring is automatically in global phase; a region never needs to know
  where its section sits on the page. (This is the highlightai.com overlay
  trick, kept because it makes sections independently correct.)
- **The region's own border** draws its outer rectangle. Its **interior
  lattice** is `(gw−1)` vertical and `(gh−1)` horizontal *real 1px divs*,
  injected by a ~10-line script that reads `--gw`/`--gh`. Absolutely
  positioned children measure from the padding box (inside the 1px border),
  hence the `- 1px` in their offsets — it puts interior lines on the same
  pixel geometry as the borders.
- **Band gating.** Every region/ornament carries a band class — `rm` (<576),
  `rs`, `rt`, `rd1`, `rd2` — and media queries display exactly one set. The
  gating works by rule order: any absolutely-positioned vocabulary you add
  *after* the gating rules (equal specificity) will override its own gating —
  give such elements compound gating rules (`.decor.rd2 { … }`). This bug
  happened once; don't reintroduce it.
- **Vocabulary** beyond the region: `.grid-fill` — a solid cell
  (`background: var(--line)`, sized `t+1`); `.grid-cellx` — a standalone
  outlined cell or block (takes `--gw/--gh`); `.decor` — a cell that hosts an
  ornament (arrows etc.), sized `t+1`, `z-index: 0`.

### Decomposing a cell map into regions

Transcribing an anchor's cell map is a decomposition exercise:

1. **A full field is one region.** Content that overlaps it simply sits on
   top; cells "under" buttons or cards need no special casing.
2. **Interior holes need nothing.** A missing cell surrounded by cells is
   outlined by its neighbors' lines anyway — which is exactly what the design
   shows. Paint the full region; put the ornament on top.
3. **Edge voids and channels are made by splitting.** Decompose into several
   regions whose borders *bound* the void; nothing crosses it. A 1×2 notch in
   a 2-wide column becomes three stacked regions; the void's sides are drawn
   by the neighbors' borders.
4. **Fields that span sections are split at section boundaries.** The upper
   region's bottom border and the lower region's top border land on the same
   pixel (§5), so the seam is invisible and each section stays self-contained.
5. **Adjacent regions may share edges freely** — coincidence is the mechanism,
   not a hazard.

Expect roughly a dozen rectangles per band for a whole page. If a band needs
many more, look for a merge you missed.

## 5 · Crisp 1px hairlines

Four rules produce hairlines that are exactly one device-crisp pixel at every
fractional tick width:

1. **No gradients, ever.** A `repeating-linear-gradient` 1px stripe cannot
   snap to device pixels at fractional ticks — it ghosts, doubles, or
   vanishes. Every painted line in this system is a **border or a real 1px
   element**; those rasterize crisp at any tick.
2. **One geometry.** All line positions derive from the same expression,
   `k · var(--t)`. Two elements drawing the same edge from that expression
   coincide into one line (region borders over lattice divs, adjacent
   regions, a component border over a region line). Two elements drawing the
   same edge from *different* expressions (`k·t` vs `k·t − 1px`) stack into a
   doubled/darker line. Derive, don't eyeball.
3. **Line-inclusive sizing (+1px).** Anything bordered whose edges must land
   on lattice lines is sized `k·t + 1px`, so its far border occupies the same
   pixel as the next line rather than the pixel before it. This applies to
   regions, outlined cells, and any bordered box you build on the grid.
   Flush bordered siblings additionally collapse with `margin-left: -1px`
   so both borders share one pixel.
4. **Strips don't drift.** In a scrolling row, `+1px` widths with a naive
   `gap: t` accumulate 1px per item. Use `gap: calc(var(--t) - 1px)` so the
   stride stays exactly `k·t` indefinitely.

One color token (`--line`) is used for the lattice, region borders, and any
component border that should read as part of the grid — merging is the point.

## 6 · Sitting on the grid — how elements interact with the lattice

Layering, bottom to top: paper → lattice (`.gx`, z:-1) → ornament cells (z:0)
→ all normal-flow content. Whatever you build meets the lattice in one of
three ways:

1. **Bordered boxes merge with it.** Size `k·t + 1px`, border `var(--line)`,
   position on ticks. The box's border lands pixel-exact on lattice lines and
   becomes indistinguishable from them. Use when the design draws a stroked
   box whose edges lie on grid lines.
2. **Borderless boxes sit exactly on it.** Size exactly `k·t`, no +1 — there
   is no stroke to share. Effects that paint outside the box (offset shadows)
   never participate in grid geometry. Fully-rounded elements (capsules,
   circles) also sit exactly on ticks; their corners curve away from shared
   edges, so no border collapse is needed.
3. **Overlays anchor to lines or fields.** Elements the design centers on a
   tick line are absolute, in section-local ticks:
   `top: calc(k*var(--t) - H/2)`. Elements centered on a cell *field* anchor
   to the field's center:
   `top: calc(var(--t) * center); transform: translate(-50%,-50%)`.
   Absolute positioning is reserved for these true overlays plus the grid
   vocabulary itself (§4); anything else absolutely positioned is a defect.

**Positions are emergent from flow, never declared as coordinates.** Give the
band above a component a whole-tick height and the component lands on the next
tick line by construction. Center content vertically inside a whole-tick band
with flex (`align-items: center`) so it stays centered at every width without
magic offsets. Bottom-anchor the last component of a section with
`margin-top: auto` (plus a whole-tick `margin-bottom` if the design leaves
empty rows). Where a margin must place the *next* tick-anchored thing after
fixed material and interpolating text, write all three terms out:

```css
margin-top: calc(k*var(--t) - <material px> - (var(--wA)*H0 + var(--wB)*H1));
```

If two flow siblings overlap in the design, the same calc simply goes negative
— that is designed overlap, not a reason to reach for absolute positioning.

**Text never snaps to the lattice.** Text sits inside containers sized in
ticks (the container law): the container lands on ticks, the space inside is
material (padding/margins), and the resolved text width is whatever the padded
container leaves — never encoded as a standalone constant, never expected to
land on a unit boundary. HUG text (natural width, designed line breaks) gets
no width at all.

## 7 · Defining components by tick usage

Every component you build from the designs is *defined* per band by its tick
footprint — how many ticks wide and tall, at which tick position, with which
stride if repeated. The method:

1. **Read the footprint off each band's anchor** — never scale one band's
   footprint to make another. The same component may be 8t×5t in one band and
   9.5t×12t in another; both are designed facts. Check `width / t` and
   `height / t` land whole (or designed half-ticks) at the anchor.
2. **Classify everything inside it** (§1): footprint and position are ticks;
   paddings, radii, icons, inner gaps are material band constants; its type
   interpolates with the weights.
3. **Give it the right lattice contract** (§6): bordered-merging (`k·t+1`),
   borderless-exact (`k·t`), or overlay-anchored.
4. **Repeat with a tick stride.** Cards in a strip: width `k·t(+1)`, gap per
   the strip rule (§5), so every card edge in the row lands on ticks.
5. **Same DOM across bands.** A component whose arrangement changes per band
   (different active states, different composition) is one DOM with band-gated
   display and per-band CSS — content is never duplicated per band unless the
   design genuinely changes the content itself.
6. **Some widths are designed px constants** in a given band (a card the
   design holds at a fixed width regardless of tick). Carry them as band
   constants in that band only — and only after confirming against the anchor
   that they really don't ride the tick.

## 8 · Self-tests

Run these after any structural change; they make regressions loud:

1. **Stack sum** — `page.scrollHeight / t` equals the band's designed tick
   total at every anchor width.
2. **Landmark audit** — at each anchor *and* one arbitrary mid-band width,
   `(rect(el) − rect(page).top) / t` for every structural landmark is integer
   (or designed half-tick), within ±1px for +1-sized boxes. Anything that
   drifts mid-band is a px value encoding a tick relationship (§2).
3. **Seam inspection** — at a fractional-tick width, zoom a component border
   sitting over a region line and the joint between two adjacent regions: one
   line, one pixel, no doubling, no gaps.
4. **Band-gate sweep** — at each band, count visible `.grid-region`/`.decor`
   sets; exactly one band class may be visible (§4's ordering gotcha).
