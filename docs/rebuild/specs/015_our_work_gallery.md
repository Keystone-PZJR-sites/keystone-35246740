# Spec 015 — Our Work: the gallery

**Status:** Approved 2026-08-28 (owner) — **built and verified the
same day** (acceptance checked at the five anchors and nine slice
widths, stretched and compressed; §9 carries the build record).
Drafted the same day; **all seven flags resolved**, every fix re-read
from the nodes post-fix (§9:
F1 the rd2 CTA re-drawn as a gray-lg `button-fill` instance; F2 the
lune feature strokes landed at rd1/rd2; F3 the two-line break forced
at every band as intent; F4 the export order confirmed; F5 the
canonical site names supplied — meaningful alt; the spelling query
closed the same evening: the canonical name is **Izakali**, the
wordmark's spelling; F6 the inert `open-gallery` contract confirmed by
the owner; F7 the ghost grammar's canon opacity ruled **0.5** at
approval — one grammar in all ways, the strip frames fixed in the file
and re-read 0.5/luminosity, §5/§7 amended, the 012 build fixed in
step).
**Depends on:** spec 001 (tokens, fonts — the pre-build re-extraction
rule) · spec 002 / 002.r1 (the engine, nearest-anchor gates, the four
units) · spec 003 (the ButtonFill primitive — the `chrome=gray` axis
and the glyph-advance hover this section's CTA reuses) · spec 006 (the
inert action contract on the buttons, §9; the carousel slide grammar
tokens) · spec 007 (the desaturation directive's filter/blend
distinction) · spec 011 (the line-inclusive box law §9 R17) · spec 012
(the carousel machine — the snap clock, the lazy pointer capture and
dragstart-suppression lessons, the translucent-ghost grammar the
strip's off-slides reuse) · spec 013 (the exposed-cell clearance
assertion the page expectations adopt in 016) · spec 014 (the page
composition this section splices into; the section handover at the
gallery-header top)
**Sources:** fresh MCP reads 2026-08-28 of the Our Work section
`647:41297` — the five anchor frames `454:23319` (384, 3552 = 111t) ·
`648:43608` (576, 4080 = 85t) · `447:21642` (768, 3840 = 60t) ·
`648:42365` (960, 4240 = 53t) · `429:10937` (1344, 5376 = 48t); the
gallery headers `461:27009` / `655:51335` / `454:23277` / `648:46428`
/ `433:12150`; the gallery frames `655:51430` / `655:51356` /
`654:48984` / `654:48985` / `654:48986` (all nine image nodes read
per-band); the **`button-fill` set `486:5251`** — the `chrome=gray`
axis read across sizes and states; the page Grid layers `648:44752` /
`648:43872` / `648:43209` / `648:42366` / `636:37612` (every cell in
the section's rows read with fills, strokes, and radii);
`get_variable_defs` on the section — all in `ks-MarketingSite`. Every
frame total, header offset, gallery box, mosaic cell, strip slide, and
lattice cell verified against rendered bounds through the console
bridge the same evening; image fills read with their hashes at all
five anchors (slot identity is hash-verified band-to-band); inks,
strokes, and fills read with their variable bindings (`text/100` ·
`text/200` · `bg/300` · `bg/400` · `border/000` · `bg/200`). Design
decisions on record (plan.md, 2026-08-28): **the View-fullscreen CTAs
open the fullscreen gallery overlay** (spec 016; F3 inputs arrive
after the sections are built); the rm/rs strip behaves like the site's
other carousels — swipe/drag with a snap to the active slot, the 012
pointer lessons apply; no mosaic or strip entrance choreography
supplied — the section is born settled below the 014 §6.0 fold. The
asset exports landed as WebP (27 gallery tiers verified: nine images ×
three tiers, dimensions 2× their band's rendered frame — §7).

The Our Work page's second spec (014–016 build the page top-down; 016
takes the fullscreen overlay + page assembly). This spec covers page
rows from the gallery-header top (spec 014's section end) to the
footer top: the gallery header ("The Gallery" · the View-fullscreen
CTA), the nine-image mosaic at rt/rd1/rd2, the horizontal strip at
rm/rs, and the pre-footer full-lattice row.

---

## 1 · Section anatomy — tick totals per band

Page rows, zero-based, from rendered bounds. The section's last row is
the footer top.

| landmark | rm (384) | rs (576) | rt (768) | rd1 (960) | rd2 (1344) |
|---|---|---|---|---|---|
| gallery-header top | 75t | 53t | 29t | 26t | 22t |
| gallery-header block (ticks) | 4t | 3t | 3t | 2t | 2t |
| gallery top | 79t | 56t | 32t | 28t | 24t |
| gallery block (ticks) | 6t (strip) | 6t (strip) | 12t (mosaic) | 12t (mosaic) | 12t (mosaic) |
| gallery end | 85t | 62t | 44t | 40t | 36t |
| gap to the footer | 2t | 2t | 1t | 1t | 1t |
| **section end (footer top)** | **87t** | **64t** | **45t** | **41t** | **37t** |

Horizontal: the header block spans ticks **0 → 11** at every band (its
east edge sits on the col-11 rail line); the title sits at tick 1
(t/2 at rm, the standing rm rule); the CTA per §3. The mosaic spans
ticks **1 → 11**; the strip's active slide starts at t/2 (rm) / 1t
(rs) and its slides are 9.5t / 9t wide (§5).

**Units.** The header block heights, gallery boxes, mosaic cells and
gutters, strip slides and gaps, and the section rows are geometry
(tick spans — the strip slide widths are drawn at 1:1 anchor px and
read as ticks per the tick-riding tell). The header title and the CTA
are material per band, vertically centered inside the tick-height
block. The title's tick-1 inset and the CTA's per-band offsets are
tick constructions (§3). Constants that reference `--t` live in the
`.page` block of the component token layer (002.r1 §4 scope rule).

## 2 · Exposure map

From the page Grid layers, verified cell-by-cell against rendered
bounds with fills/strokes/radii and their variable bindings. Cells are
`[col,row]`, zero-based page ticks. Below the 014 staircase's closing
row, the lattice over this section is minimal: the **east rail (col
11)** runs through every header and gallery row, and a **full-lattice
row** (all twelve columns stroked) sits immediately before the footer.
All other cells in the section's rows are unexposed. Cell strokes are
`border/000`; ornament fills are `bg/200`.

| band | east rail (col 11) | full-lattice row | ornament cells |
|---|---|---|---|
| rm | r75–r85 | r86 | ■[11,86] |
| rs | r53–r62 | r63 | ○[10,63] |
| rt | r29–r43 | r44 | — |
| rd1 | r26–r39 | r40 | — |
| rd2 | r22–r35 | r36 | — |

Ornament cells are `.decor` vocabulary (■ filled square · ○
stroke-only circle) — never content, never pointer targets. The rm
filled square and the rs circle sit in their bands' pre-footer
full-lattice rows; rt/rd1/rd2 draw plain rows.

**The header hairline.** Every gallery-header frame carries a **top
stroke, 1px `border/000`** (read per-side through the bridge: top 1,
others 0), spanning ticks 0 → 11 at its band's header-top row. It is
the section's own chrome (the lattice draws no full row line there);
where the 014 staircase's cells end on the same row line (their bottom
edges at the header top), the hairline shares the line's canonical
pixel — line-inclusive, seam-scanned at build.

**Declared overlaps** (for 016's clearance-assertion expectations, the
013 pattern): at rm/rs the strip's off-active slides cross the col-11
rail cells at the gallery rows (the ghost renders translucent — the
lattice reads through it, the 012 grammar; content above the lattice).
The mosaic's east tiles **touch** tick 11 without crossing: their east
borders share the rail line's pixel (line-inclusive, §4).

**Not built (the 014 §9 F7 owner decision):** the paintless circle rd1
[8,39] — the standing "Rectangle 143" class, an invisible stroke in
this section's rows; it stays in the file and is never built.

## 3 · The gallery header

One row: the title west, the CTA east, both vertically centered in the
tick-height block.

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| title style | `display-serif/xs/Extralight` 24/30 | `display-serif/xs/Extralight` 24/30 | `display-serif/xs+/Extralight` 28/34 | `display-serif/xs+/Extralight` 28/34 | `display-serif/md+/Thin` 42/50 |
| title inset (west) | t/2 | 1t | 1t | 1t | 1t |
| CTA (ButtonFill gray, §3.1) | sm (36) | sm (36) | md (40) | md (40) | lg (48)¹ |
| CTA placement | right edge at tick 10 | right edge at tick 10 | right edge 0.5t west of tick 11 | centered in ticks 8–11 | centered in ticks 8–11 |

Copy: title **The Gallery** — two lines, a **designed explicit break**
after "The" (U+2028 in the file), **forced at every band and every
width** (owner decision 2026-08-28, §9 F3: always two lines regardless
of viewport). The rt/rd1/rd2 nodes carry a trailing space before the
break ("The ␣") — not canon, file hygiene only; the canonical string
is the unspaced two-line copy · CTA label **View fullscreen**. Inks:
title `text/100`, CTA label `text/200` (the gray chrome's ink).

The title renders as the page's `<h2>`; the break is presentational
(`aria-hidden` `<br>` is unnecessary — the accessible name reads
through). The rd1/rd2 centering yields fractional rendered offsets by
construction (rd1 reads x 685.5 — the 3t cell minus the material
button, halved); accepted as the designed centering.

### 3.1 · The CTA — ButtonFill's gray chrome

The rm/rs frames mount **`button-fill` `size=sm, chrome=gray,
state=default, shape=pill`** instances; the rt/rd1 frames draw
detached `_nav-button` frames whose values equal the set's **gray md**
canon pixel-for-pixel (h 40 · pl 16 / pr 12 · label `text/md/Light`
`text/200` · 10px trigger glyph on a 4 gap); the rd2 frame mounts a
**gray lg** instance (h 48 · pl 20 / pr 16 · label `text/lg/Light` ·
gap 4 — `674:12385`, the §9 F1 fix re-read 2026-08-28; the draft's
off-canon hand-drawn frame is gone).

The set's gray states, read across sizes: default `bg/300` · hover
`bg/400` · focus the standing focus-ring effect. **The built 003
`ButtonFill` already carries the `chrome="gray"` axis** (born for the
005 nav) with exactly these values, the glyph-advance hover, and the
`:focus-visible` ring — the CTA is that primitive at sm/sm/md/md/lg,
no new chrome. Two standing built-canon notes: the built sm renders
the +2px optical left pad (14, the 2026-08-25 set-wide decision) where
the set draws 12; the built lg renders symmetric 10/10 vertical pads
(the 2026-08-23 decision) where the set draws 0/2 — both decided
divergences, both kept.

**Behavior:** every View-fullscreen CTA opens the **fullscreen gallery
overlay** — spec 016's surface (design's F3 inputs arrive after the
sections are built). Until 016 lands, the CTA is a real `<button>`
shipping the **inert `data-action="open-gallery"` contract** (the 006
§9 open-chat pattern — rendered, keyboard-focusable, no handler; 016
wires it). Confirmed by the owner 2026-08-28 (§9 F6). `ButtonFill`
gains the `action` prop (mirroring ButtonGhost's, spec 006 §9) — a
one-line primitive extension, catalog row unchanged.

## 4 · The mosaic — rt / rd1 / rd2

A **10t × 12t** box (ticks 1–11), a designed grid of **3t × 2t cells
on uniform 0.5t gutters** — 3 columns × 5 rows. Seven tiles fill one
cell each; two **features** span 2×2 cells (3t+0.5t+3t = 6.5t wide,
2t+0.5t+2t = 4.5t tall). Verified identical in tick units at all three
anchors (gutters 32/40/56 px = t/2). The half-tick gutters are a
designed interior (read at every drawn anchor — not an artifact); the
grid template is `repeat(3, 3t) / repeat(5, 2t)` with `gap: t/2`.

Slot map (grid `[col,row]`, 1-based; the image identity is
hash-verified identical across the three anchors and maps to the
export set §7; the site names are the owner's canon, received
2026-08-28 — §9 F5):

| slot | image | site |
|---|---|---|
| feature A — cols 1–2, rows 1–2 | 01 | Izakali body practice⁵ |
| col 3, row 1 | 02 | House of Aesthetics |
| col 3, row 2 | 03 | DreFadez Barber |
| col 1, row 3 | 04 | Ora Medical Clinic |
| col 2, row 3 | 05 | ~~State College Barbershops & Tattoo~~ Jesse’s Barbershop & Tattoo⁶ |
| col 3, row 3 | 06 | X2Talent Recruiting |
| col 1, row 4 | 07 | Davin Security |
| **feature B — cols 2–3, rows 4–5** | **09** | Lune Bodywork |
| col 1, row 5 | 08 | EntheaCare |

⁵ received as "Izakai"; resolved 2026-08-28 (owner) — the canonical
name is **Izakali**, matching the site's own wordmark (§9 F5).
⁶ *amended 2026-08-29 (owner, at the 016 prep review — §9): the
canon follows the site's own title, the Izakali precedent — the
received "State College Barbershops & Tattoo" is superseded by
**Jesse's Barbershop & Tattoo** (the live site's brand); the built
data module, alt, and ghost-button name carry the new canon.*

Every image: an image fill (`object-fit: cover`), a **1px
`border/000` stroke** (read with its binding), **no effect** (zero
effects on every node — unlike the 014 site-images, no hard shadow).
The feature-B (lune) image's stroke was missing at rd1/rd2 at draft —
fixed by design and re-read the same evening (§9 F2); every tile at
every band now reads the bound stroke. The tiles are bordered boxes on
exposed lattice at the
mosaic's east edge (tick 11 — the rail line) and south edge (the
full-lattice row's top line): line-inclusive trailing edges per the
011 R17 law, so the borders land on the lines' canonical pixels and
seams stay single hairlines.

The mosaic renders identically from the anchor up and compressed above
its band's gate; no per-band variant changes — the three bands differ
only in the tick.

## 5 · The strip — rm / rs

The gallery's rm/rs rendering: the same nine images as a horizontal
carousel strip, **6t tall**, slides on **1t gaps**.

| | rm | rs |
|---|---|---|
| slide box | 9.5t × 6t | 9t × 6t |
| active slide west edge | t/2 | 1t |
| next slide at rest | west edge at tick 11 (a 1t sliver visible) | west edge at tick 11 (1t sliver) |

Slide order: **the export order, 01 → 09** — confirmed by the owner
2026-08-28 (§9 F4), including the last pair running 08 (EntheaCare)
before 09 (Lune Bodywork), the reverse of the mosaic's reading order.
The drawn state shows slide 01 active with slide 02 peeking —
hash-verified as exports 01/02.

Every slide carries the same 1px `border/000` stroke and cover fill as
the mosaic. **Off-active slides are ghosts**: the image paint at
**50% opacity under a luminosity blend** *(amended 2026-08-28 at
approval — the draft read 0.6 from the drawn frames; the owner ruled
the ghost grammar one-in-all-ways and set the canon at **0.5**, the
persona set's value; the strip frames were fixed in the file and
re-read 0.5/luminosity — §9 F7)* — the 012 persona-card inactive
grammar verbatim
(`mix-blend-mode: luminosity` is safe here: no ancestor paint
transitions behind the strip — the 007 filter directive's carve-out,
the 012 precedent). The lattice's col-11 cells read through the
ghosts (§2 declared overlap). The ghost dressing swaps state-to-state
under the move (the 012 law — the blend is not animatable).

One DOM serves both renderings: the section renders the nine images
once (DOM order 01–09); the rt+ bands lay them on the §4 grid
(explicit grid areas), the rm/rs bands lay them on the strip track.
The band switch is the container-query gate; the strip's island state
never leaks into the mosaic rendering (choreographies-settle applies —
there is no entrance to replay, and the k state is inert above the
gate).

### 5.1 · The strip machine

The 012 three-state-machine shape reduced to one axis: **k ∈ 1…9**,
the active slide. All writers write k; the track translates to put
slide k at the band's designed inset, on the snap clock (§6.1).

- **Swipe/drag** on the strip viewport: pointer events on the
  viewport, horizontal intent detected, the track follows the pointer
  1:1 mid-gesture, release snaps to the nearest slot (velocity
  breaks ties toward the flick direction). The 012 pointer lessons
  apply verbatim: **capture the pointer lazily** (capture at
  pointermove-past-slop, never at pointerdown — capture at
  pointerdown retargets the derived click) and **suppress dragstart**
  (a swipe starting on an image otherwise becomes a native image
  drag that cancels the pointer stream).
- **Ghost clicks**: a visible off-active slide is a real `<button>`
  overlay (the 012 card-overlay pattern) writing k to it.
- **Keys**: the strip viewport is a focusable region
  (`tabIndex={0}`, `role="group"`, an accessible name); Left/Right
  arrows write k∓1 / k±1, clamped.
- Ends clamp: k=1 shows no west neighbor, k=9 no east peek; the snap
  holds the designed inset at every k (no centering change at the
  ends).

A no-JS render is the settled strip at k=1 — slide 01 at the inset,
slide 02's sliver ghosted; the mosaic bands need no JavaScript.

## 6 · Motion

**No entrance** — none was supplied (plan.md 2026-08-28); the gallery
is below the 014 §6.0 fold at every band and is born settled. The
page's rises-only load choreography (014 §6.0) is untouched — this
section adds no beats, and the orchestrator island is already the
page's; the strip island is this spec's one addition (§8).

### 6.1 · The strip snap

The release/click/key snap translates the track to slide k's designed
inset over the carousel snap clock: **450ms on
`--motion-slide-ease`** — the 012 snap constants at their second
consumer, **promoted to `tokens/motion.css`** (`--motion-snap-dur` ·
`--motion-snap-ease`; the 012 `--ps-snap-*` names become aliases,
values unchanged — the promotion law). Mid-gesture the track follows
the pointer with no transition; the snap animates only on release.
The ghost dressing (opacity + blend) swaps state-to-state as k
changes (§5); nothing else animates.

### 6.2 · The CTA hover

The standing ButtonFill grammar (003): the `bg/400` wash on
`--motion-hover-duration` / `--motion-hover-ease`, the glyph's 4px
paint-in-place advance, the focus ring on `:focus-visible`. Nothing
new.

### 6.3 · Reduced motion

`prefers-reduced-motion: reduce` renders the strip state-to-state —
the snap at 0s, ghosts swapping instantly; swipe still lands on a
slot; the hover grammar state-to-state. A no-JS render is the settled
section (§5.1).

## 7 · Assets and constants

1. **Gallery images** — 27 WebP tiers received 2026-08-28
   (`…/03-newsite/ourwork/export`), verified: per image (01–09) the
   tiers **sm** 608×384 (2× the rm slide 304×192) · **md** 864×576
   (2× the rs slide 432×288) · **lg** 1456×1008 (2× the rd2 feature
   728×504). Design's tier direction (plan.md F2 resolution):
   **sm serves the 384 band, md the 576 band, lg 768–1344** — tier
   cuts at the structural gates 470 and 665, every image a
   `<picture>` with two media-gated `<source>`s and the sm tier as
   the `<img>` fallback, explicit `width`/`height` per tier. The lg
   tier serves every mosaic slot (the small tiles crop the 13:9 cut
   to 3:2 under cover — as the file's fills do); recorded as design's
   direction, not a defect. *Amended 2026-08-29 (owner — §9): the
   cover crop **anchors to the top edge** (`object-position: top`) —
   the images are site screenshots whose nav chrome hugs the top, and
   the centered crop was shaving it; the ~4% loss now comes off the
   bottom only. Inert where slot and cut aspects match (the strip,
   the features). The **sm tier was re-exported the same day**
   (design-side re-cut; dimensions unchanged at 608×384 — the
   registry entries stand).* All below the fold: every image lazy,
   `decoding="async"`. Alt: **meaningful** — the owner supplied the
   canonical site names (§4's table, §9 F5), so each image reads
   "The {name} website" (the 014 pattern); the names live in the
   section's data beside the slot map and feed 016's overlay too.
   They land in `public/media/gallery/` as
   `gallery-{sm|md|lg}-{01…09}.webp` (the export names, already
   kebab) with a registry builder `gallerySrc(image, cut)` and
   `GALLERY_IMAGE_COUNT` in `v2/media.ts`.
2. **Constants** (component token layer, `--wg-*`): the `.page` block
   carries the tick-riding section geometry the sections' CSS derives
   from `--t` directly (header block heights 4/3/3/2/2t, gallery
   boxes, mosaic template, strip insets/slides/gaps — pure tick
   expressions, no weight-riding values in this section); a material
   block carries nothing new (the CTA is the primitive's). Two
   enumerated non-token constants, both read from the file: the ghost
   opacity **0.5** (amended 2026-08-28 at approval, the §9 F7 canon;
   the draft read 0.6 — and the constant **promotes at birth**: the
   012 persona ghost is the grammar's other consumer, fixed in this
   build, so the value lands as `--motion-ghost-opacity` in
   tokens/motion.css with `--wg-ghost-opacity` its section alias)
   and the snap clock's 450ms
   (promoted, §6.1). Every ink and stroke above is a standing token;
   the pre-build re-extraction still runs (001 rule).

## 8 · Deliverable — files, semantics

1. **Section** `design-system/v2/sections/work-gallery.tsx` +
   `work-gallery.css` — a server component rendering the header and
   the nine-image list once (§5's one-DOM rule), plus
   `work-gallery-island.tsx` — **the strip machine (§5.1), this
   section's one client island**, mounted inside the section and
   inert above the rs gate (it measures the container per the rules —
   never `matchMedia`; the 008 band-gated-island precedent).
   Landmarks carry `data-landmark` (gallery-header top, the gallery
   box, the section end) for the 016 page self-test.
2. **Primitive touch** — `ButtonFill` gains the `action` prop
   (§3.1); no new primitives, no new variants (the gray chrome
   stands). The `/primitives` catalog is unchanged (the gray matrix
   already renders).
3. **Composition** — `v2/our-work.tsx` splices the section between
   the case studies and the footer (the 014 §8.4 interim composition
   ends); `/our-work` and `/our-work-fixture` both carry it. The
   page's island count becomes two (the orchestrator, the strip).
4. **Semantics**: the gallery header is part of the `work-gallery`
   `<section>` with the `<h2>` (**The Gallery**); the CTA a real
   `<button>` (§3.1); the image list a `<ul>` (one `<li>` per image);
   the ghost-click overlays real `<button>`s with accessible names
   (the site names, §4 — "Show {name}" class), present only in strip
   mode; the strip viewport the §5.1 focusable group. Lattice and
   ornament cells are presentation (`aria-hidden`); each image's alt
   is "The {name} website" (§7.1). The image names and slot map live
   in `sections/work-gallery-data.ts` (prop-driven, the 014 pattern).
5. Docs in the same commits: plan.md's Our Work record and the launch
   checklist's per-page row.

## 9 · Resolutions record

Draft-day flags, 2026-08-28; five resolved the same evening (F1
re-read from the node post-fix), one open:

- **F1 — resolved (design, 2026-08-28):** the rd2 View-fullscreen
  button diverged from the `button-fill` gray-lg canon (the old
  hand-drawn `434:12748` — pl 16 / pr 12, a 3px gap). Fixed: the
  frame now mounts a **gray-lg `button-fill` instance**
  (`674:12385`, `size=lg, chrome=gray, state=default, shape=pill` —
  pl 20 / pr 16, gap 4, 171×48, centered in the 3t cell), re-read
  the same evening. §3.1 carries the fixed truth; the build renders
  the built primitive's gray lg.
- **F2 — resolved (design, 2026-08-28):** the feature-B (Lune
  Bodywork) mosaic image was missing its 1px `border/000` stroke at
  rd1 (`651:46446`) and rd2 (`433:12743`) — the strokes array read
  empty while every other tile at every band, and rt's feature B
  (`454:23296`), read the bound stroke. A first fix pass touched
  feature A (both features are 728×504 at rd2; A was already
  stroked); the second pass landed on the lune node — **both re-read
  with the visible bound `border/000` stroke** the same evening. One
  residue: the rd1 node's stroke weight reads **1.25** (left over
  from the unpainted state) where every sibling reads 1 — the
  standing artifact class; transcribed as the intended **1px**
  hairline, a file-hygiene note only, nothing builds from it.
- **F3 — resolved as intent (owner, 2026-08-28):** the title is
  **always two lines** — the break is forced in the build at every
  band and every width (an explicit break, the 012 U+2028
  precedent). The rt/rd1/rd2 nodes' trailing space before the break
  is **not canon** — file hygiene only, nothing builds from it; the
  canonical copy is the unspaced "The" / "Gallery".
- **F4 — resolved (owner, 2026-08-28):** the export numbering is the
  strip's slide order — 01 → 09 as numbered, including 08
  (EntheaCare) before 09 (Lune Bodywork), the reverse of the
  mosaic's reading order. Built as the export order.
- **F5 — resolved (owner, 2026-08-28):** the canonical site names
  received for all nine images (§4's table): Izakai body practice ·
  House of Aesthetics · DreFadez Barber · Ora Medical Clinic · State
  College Barbershops & Tattoo · X2Talent Recruiting · Davin
  Security · EntheaCare · Lune Bodywork. Alt becomes meaningful
  ("The {name} website", the 014 pattern); the names live in the
  section data and feed the 016 overlay. The spelling query closed
  2026-08-28 (owner): the canonical name is **"Izakali"** — with the
  'l', matching the site's own wordmark; the §4 table carries the
  corrected canon ("Izakali body practice").
- **F6 — resolved (owner, 2026-08-28):** the View-fullscreen CTAs
  ship as real buttons on the **inert `data-action="open-gallery"`
  contract**, wired by 016 when the overlay lands (the 006 open-chat
  precedent; the overlay's design inputs are the standing plan.md F3
  dependency).
- **F7 — resolved (owner + design, 2026-08-28 at approval):** the
  ghost grammar's drawn image-fill opacity diverged between its two
  consumers — the strip's off-active slides read **0.6** under
  luminosity (both drawn frames at draft) while the persona-card
  set's fifteen inactive variants read **0.5** under luminosity (read
  from set `615:25245` through the bridge, 2026-08-28). The owner
  ruled the grammar verbatim in all ways and set the canon at
  **0.5**; design fixed the strip frames in the file, **both re-read
  0.5/luminosity the same evening**. §5 and §7 carry the amended
  canon (`--wg-ghost-opacity: 0.5`). The prep review also found **the
  built 012 persona ghost missing its fill opacity entirely**
  (blend-only — the 012 §5 transcription missed the drawn 0.5): a 012
  erratum, amended there with the `persona-card.css` fix in this
  spec's build.
- **Note** — the rd1 CTA's fractional rendered x (685.5) is the
  designed centered-in-3t construction with a material button, not a
  read artifact; built as the centering.
- **Note** — the built ButtonFill's sm optical left pad (14 vs the
  set's 12) and lg vertical pads (10/10 vs 0/2) are standing decided
  divergences (2026-08-25 / 2026-08-23); the gray CTA inherits them.
- **Note** — the strip island's k state is section-internal; the 016
  overlay opens on its own state and does not read k (the overlay
  spec owns any handoff decision).
- **Amendment, 2026-08-29 — the site-5 canon (owner, at the 016 prep
  review).** The 016 live-embed delivery exposed that site 5's own
  title is **Jesse's Barbershop & Tattoo** (the served page's brand);
  the owner ruled the canon follows the site's own branding — the F5
  list's "State College Barbershops & Tattoo" is superseded (the
  Izakali precedent, where the wordmark's spelling won). §4 carries
  the strikethrough amendment; the built `work-gallery-data.ts` name
  updated in step (a copy-only change — the alt "The Jesse's
  Barbershop & Tattoo website" and the ghost button's name flow from
  the one module). The 016 §4.2 URL table carries the same canon.
- **Amendment, 2026-08-29 — the crop anchor (owner).** The §7.1
  direction (one 13:9 lg cut serving every mosaic slot) crops ~4% of
  the height in the 3:2 small cells; centered cover split it across
  both edges and clipped the screenshots' top-hugging nav chrome
  (owner report, with built-vs-export comparisons). Decided: the
  crop **anchors top** (`object-position: top`, §7.1 as amended) —
  navs stay whole, the loss comes off the bottom. Inert on the strip
  and the features (aspect-exact to their cuts). The deeper fix —
  per-slot 3:2 exports (tiers as art direction) — stays open as a
  design option; nothing blocks. In the same pass design
  **re-exported the sm tier** (all nine, dimensions unchanged
  608×384) for a separate export issue; the new files landed in
  `public/media/gallery/` — a byte-only swap, no registry or markup
  change.
- **Build record, 2026-08-28.** Pre-build token re-extraction: **zero
  drift** across primitives (134 variables), the library semantics
  (65 carried), the three effect styles, and all 135 text styles (the
  `noise` style still absent from the file — the 014 observation, no
  consumer). Every §1 landmark, §2 exposure cell, §3 header value, §4
  tile, and §5 slide re-verified against rendered bounds through the
  bridge before the build — all exact; the §9 F7 strip-frame fix
  re-read 0.5/luminosity at both frames. One file observation, no
  deviation: the rt/rd1 headers now mount real `button-fill` gray-md
  instances where the draft read detached equal-value `_nav-button`
  frames (§3.1) — the drawn values are unchanged and the build was
  always the primitive. No errata: every §1–§7 value built as
  specced. The 012 persona-ghost erratum fix (`persona-card.css`,
  opacity on the promoted token) landed in this build and reads
  0.5/luminosity on the live `/pricing`; the full sweep is green
  after the fix and the snap-token aliasing (`/pricing`'s machine
  re-audited on each k by the standing sweep leg).

## 10 · Acceptance criteria

At each of the five anchors and one arbitrary mid-band width per band
(stretched and compressed), scrollbar forced on:

- [x] Every §1 landmark lands on its row (whole ticks, line-inclusive
      ±1px) at every audited width: header top 75/53/29/26/22t; header
      block 4/3/3/2/2t; gallery top 79/56/32/28/24t; gallery block
      6/6/12/12/12t; footer top 87/64/45/41/37t — and the 014
      landmarks above are unmoved by the splice. (Verified 2026-08-28,
      headless audit at the five anchors + nine slice widths — 384 ·
      420 · 500 · 576 · 620 · 700 · 768 · 800 · 900 · 960 · 1000 ·
      1200 · 1344 · 1500: every landmark exact in live ticks at all
      fourteen widths; the footer rows subsume the unmoved 014 stack.)
- [x] The mosaic registers with the lattice at every audited rt+
      width: cells 3t × 2t on t/2 gutters, features 6.5t × 4.5t, box
      ticks 1–11 × 12t; every tile border 1px `border/000`
      line-inclusive — east tiles sharing the rail line's pixel, south
      tiles the full-lattice row's line (seam scans, single
      hairlines); no effects on any image. (Verified 2026-08-28 at
      700–1500: cells/gutters/features exact; east tile right edges at
      11t + 1px and south bottoms at gallery-end + 1px — the rail and
      row lines' canonical pixels; render compared against the file's
      rd2 frame — identical slot map.)
- [x] The §2 exposure map renders exactly: the col-11 rail through the
      section's rows, the full-lattice pre-footer row, ■[11,86] at rm
      and ○[10,63] at rs, nothing else exposed; the header hairline
      spans ticks 0–11 at the header top; the rd1 paintless circle is
      not built; the strip's declared overlaps render ghosts over the
      rail (lattice reading through). (Verified 2026-08-28 at the five
      anchors: rail gh 11/10/15/14/14 rows + full row at gy
      11/10/15/14/14, one ■ at rm [11,11] local · one ○ at rs [10,10]
      local, zero other exposed cells; hairline 1px solid over the 11t
      block; the rm strip render shows the ghosted sliver over the
      rail, matching the file's drawn frame.)
- [x] The header renders §3 exactly at every audited width: title
      styles/inks per band, **the forced two-line break holding at
      every audited width** (§9 F3), the CTA the built ButtonFill
      gray at sm/sm/md/md/lg in its per-band placement (right edge
      tick 10 · tick 10 · 10.5t · centered 8–11t · centered 8–11t).
      (Verified 2026-08-28: title two lines at every audited width by
      block-height assertion; CTA right edges 10 / 10 / 10.5t and
      centers 9.5t at rd1/rd2 — the rd1 rendered right edge 10.429t
      matches the file's 10.43125 fractional centering; heights
      36/40/48.)
- [x] The strip at rm/rs: slides 9.5t/9t × 6t on 1t gaps, active slide
      at t/2 / 1t, next slide's 1t sliver at tick 11; order 01→09;
      ghosts at 50% luminosity (the §9 F7 canon); swipe/drag follows
      1:1 and snaps on the promoted 450ms clock; ghost clicks and
      arrow keys write k; lazy pointer capture and dragstart
      suppression verified (a swipe starting on an image neither
      drags the image nor fires the overlay button). (Verified
      2026-08-28, headless behavior audit at 384: mid-gesture the
      track reads the live −200px offset with the transition at 0s; a
      −200px release on the 336px pitch commits k=2 with no derived
      click; a sliver click writes k=3; arrows write k∓1 and clamp at
      1/9 with the t/2 inset held at k=9; an image-origin swipe moves
      the strip; the snap transition reads 0.45s on the list.)
- [x] The mosaic bands run zero strip state: k is inert above the rs
      gate; resizing across the gate renders the settled mosaic with
      no replayed motion (choreographies settle); the 014 load
      choreography is byte-identical (six animations, unchanged
      beats). (Verified 2026-08-28: at 768 with k=2 live the list
      reads grid/translate-none, the viewport drops its tabIndex, the
      ghosts undress, the overlays leave the tree; resizing back
      resumes k=2; the load run is exactly six animations —
      slug/h1/subhead/cta/card rises + the shadow beat — and settles;
      nav and lattice never animate.)
- [x] Every image serves its band's tier (sm/md/lg at the 470/665
      gates), lazy, explicit dimensions, every path through
      `gallerySrc`, alt "The {name} website" on the §4 canon; the CTA
      is a keyboard-focusable `<button>` with the visible focus ring
      and the inert `open-gallery` action; reduced motion and no-JS
      render the settled section (k=1, snap 0s, ghosts static).
      (Verified 2026-08-28: currentSrc reads sm/md/lg/lg at
      384/576/768/1344; alt "The Izakali body practice website" on
      image 01; the visible CTA is one gray `<button>` per band on
      `data-action="open-gallery"`, tabbable; reduced-motion
      emulation reads the snap at 0s with keys still writing k; the
      JS-disabled render is the settled strip at k=1 with all nine
      images in the HTML and the viewport unfocusable.)
- [x] Zero TypeScript and lint errors; two islands on the page (the
      orchestrator, the strip) and none in the sections' server
      markup; the route stays static with budgets recorded; `/` and
      `/pricing` untouched; the full sweep green (the 016 expectations
      module lands later — the standing sweep runs `/grid` +
      `/home-fixture` + `/pricing-fixture` unchanged). (Verified
      2026-08-28: tsc and lint zero; the production build static —
      `/our-work` 1.97 kB route JS · 107 kB first load, +0.8 kB for
      the strip island over 014's 1.17 kB; `/` 135 B · 111 kB and
      `/pricing` 133 B · 107 kB unchanged; the full sweep green in
      one run.)
- [x] Every value traces to a token, a named ramp style, or a §7
      enumerated constant; the token layer re-extracted before the
      build (001 rule) with drift recorded; accessibility per §8.4
      (the strip group's keyboard path, the ghost buttons' names,
      contrast on the standing text/100 · text/200 pairs recorded).
      (Verified 2026-08-28: the pre-build re-extraction ran with
      **zero drift** across primitives, library semantics, effect
      styles, and all 135 text styles — the `noise` style still
      absent, no consumer; the section's non-token constants are the
      promoted `--motion-snap-dur`/`--motion-ghost-opacity` and their
      aliases; the viewport group is tabbable with the ring, the
      ghost buttons carry "Show {name}" names; inks are the standing
      recorded pairs — `text/100` on `bg/100` ≈ 10.4:1 and the gray
      CTA's `text/200` on `bg/300` ≈ 7.0:1, both over AA.)
