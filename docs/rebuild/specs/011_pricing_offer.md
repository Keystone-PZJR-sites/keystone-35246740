# Spec 011 — Pricing offer: the header, the $50 card, and the included list

**Status:** Approved 2026-08-27 — built 2026-08-27; the 576 frame landed the same day (§9 R15) and the rs band is built from it
**Depends on:** spec 001 (tokens, fonts — the pre-build re-extraction rule)
· spec 002 / 002.r1 (the engine, nearest-anchor gates, the four units) ·
spec 003 (ButtonFill / ButtonGhost primitives and the hover grammar) ·
spec 005 (nav overlay chrome; the decor-cell shift grammar this spec
promotes) · spec 006 (the inert `open-chat` action contract, §9) ·
spec 009 (the `hard-shadow-square` token) · spec 010 (the v2-only tree,
the `data-landmark` self-test vocabulary, the page pattern)
**Sources:** fresh MCP reads 2026-08-27 (post-fix, see §9) of the four
designed anchor frames — `404:8175` (384, 3552 = 111t) · `376:33078`
(768, 3008 = 47t) · `625:29550` (960, 3520 = 44t) · `356:27967` (1344,
4256 = 38t) — and the section nodes: headers `404:8874` / `376:33175` /
`625:30417` / `613:20015`; pricing containers `623:29459` / `614:23735`
/ `630:32807` / `613:20016`; included lists `614:24994` / `614:23680` /
`625:30784` / `376:32104`; chat rows `614:25105`+`614:25122` /
`614:25114` / (in-header `625:30636`) / `480:4382`; the **`pricing-button`
set `613:20090`** (state × size — eight variants post-xs); the icons
sheet `519:5431`; the page Grid layers `614:23968` / `614:23366` /
`625:29661` / `613:19513` — all in `ks-MarketingSite`. Every frame
total, section top, and ornament cell verified against rendered bounds
through the console bridge the same day; the six draft flags were fixed
by design and re-read post-fix (§9). Design decisions received
2026-08-27: both Start-today CTAs target the checkout link; the
talk-to-us buttons toggle the chat widget (ships inert, the 006
contract); the card-mosaic circles shift one cell on the nav card
grammar; **the 576 anchor is derived, evaluated manually at build**
(§1.1); the lattice stroke inks were bound to three new file variables
(`color/teal/150` · `450` · `650`, §9 R7).

The pricing page's first section (specs 011–013 build the page top-down;
012 takes the price scale + persona carousel, 013 the FAQ). This spec
covers page rows 0 → the price-scale top: the header, the two chat rows,
the $50 pricing card with its CTA and tag, and the included list.

---

## 1 · Section anatomy — tick totals per band

Page rows, zero-based, from rendered bounds. The nav is overlay chrome
(44px material) and enters no stack. The section's last row is the
price-scale top (spec 012's first row).

| landmark | rm (384) | rt (768) | rd1 (960) | rd2 (1344) |
|---|---|---|---|---|
| header top (px, tick-riding) | 112 (112/32·t) | 80 (80/64·t) | 120 (120/80·t) | 120 (120/112·t) |
| header block (px, hugs) | 214 | 374¹ | 444¹ | 318 |
| card top | 11t | 2t | 3t | 5t |
| card container (card + button) | 9t | 5t | 5t | 5t |
| card column span (ticks) | 0.5–11 | 6–11 | 6–11 | 1–6 |
| tag drop below container (material) | 24 | 24 | 32 | 32 |
| chat row after card | +38 | — | — | — |
| list top | 24t | 8t | 9t | 6t |
| list block | 18t | 6t² | 6t² | 5t |
| list column span (ticks) | 0.5–11 | 1–11 | 1–11 | 6–11 |
| chat row after list | +30 | +30 | — | +88³ |
| **section end (price-scale top)** | **45t** | **16t** | **16t** | **13t** |

¹ the rt/rd1 headers contain their chat row (§6).
² two 5t boxes: the left at the list top, the right staggered +1t
  (rt left 8–13t · right 9–14t; rd1 left 9–14t · right 10–15t).
³ centered in the 2t gap between the list end (11t) and the price-scale
  top (13t): 88 + 48 + 88 = 224.

**Amended 2026-08-27 (evening) — design streamlined the header tops
(§9 R18, re-read from all five frames): 100 · 112 · 96 · 112 · 174 at
the anchors (100/32·t · 112/48·t · 96/64·t · 112/80·t · 174/112·t),
replacing the table's 112/80/120/120 row. (The 960 frame first read
192; design fixed it by removing the frame's first row entirely —
the header lands at 112 and **every other rd1 landmark rises 1t**:
card top 2t, list top 8t, section end **15t**, frame total 43t; the
§2 staircase and ornaments rise with it. Re-read from rendered
bounds the same evening.)**

**Amended 2026-08-27 — the rs column (design drew the 576 frame
`634:33130`, superseding §1.1's derivation; §9 R15; read from rendered
bounds the same day, frame total 3072 = 64t):** header top 112
(112/48·t) at tick 1, header block 320 (hugs); card top **3t**,
container **6t** (the 5t white card + the 1t proportional sm button,
§4), span **6–11**, tag drop 24; **one** chat row, +30 below the tag
(none after the list); list top **12t**, the pair — left box **8t** at
ticks 1–6, right box **7t** staggered **+2t** at ticks 6–11; section
end (price-scale top) **22t**.

Horizontal: the rm content inset is **t/2** (16px), the hero's rm rule.
At rt/rd1/rd2 the header sits at tick 1 (64/80/112). Header wrap boxes
and the chat rows hug; the card and list widths are tick spans above.

**Units.** The card container and the list boxes are geometry (tick
spans; the §4 mosaic cells are exactly 1t and register with the page
lattice at every anchor — verified col-for-col from rendered bounds).
Component interiors (pads, button heights, icon boxes, the tag) are
material per band. The header top offsets ride the tick at the exact
anchor ratios above; the H1/subhead wrap boxes ride the weights
(§3). Tick- and weight-riding constants live in the `.page` block of
the component token layer (002.r1 §4 scope rule).

### 1.1 · The rs band — derived, evaluated at build

**Superseded 2026-08-27 (§9 R15): design drew the 576 frame
(`634:33130`) at the built band's evaluation — the rs anchor is
designed, per the §1 amendment above; this subsection stays as the
record of the interim derivation.**

Design supplies no 576 frame (decision 2026-08-27). The rs anchor
derives from rm under the derived-states law (004 §5) and
hold-then-switch (004 §9 / 006 §3):

- **Structure and order** are the rm design's, re-laid on the 48px
  tick: the same single column, the same t/2 inset, the same tick-span
  widths (card 0.5–11, list 0.5–11), the same gap pattern in ticks.
- **Type and material hold the rm designed values** across the band
  (band constants; the interpolation lines from the 576 anchor to the
  768 values run as normal above it).
- **Block heights** are the smallest whole-tick heights that fit their
  content at the band's internals (the list will hug shorter than 18t
  at 528px wide; the card container stays 9t unless its content
  overflows, which it cannot — the interior is material).
- The mosaic, tag, chat rows, and buttons keep their rm variants.

The derived band ships with the build; **design evaluates it manually
on the dev route** and the evaluated tick totals land as a dated
amendment to the §1 table plus a §9 entry. Structural changes design
orders at evaluation follow the amendment protocol.

## 2 · Exposure map

From the page Grid layers, verified cell-by-cell against rendered
bounds (grid auto-layout metadata is never trusted alone). Cells are
`[col,row]`, zero-based page ticks. The lattice over this section is an
**east-edge staircase** descending from the top-right corner; all other
cells in rows 0 → section end are unexposed. The staircase continues
below the section (012's record picks it up at the price-scale top).

| band | staircase (rows of this section) |
|---|---|
| rm | r4: col 11 · r5: 10–11 · r6–44: 9–11 |
| rs (amended 2026-08-27, §9 R15) | r4: 11 · r5: 10–11 · r6–20: 9–11 · r21: 9–10 |
| rt | r2: 11 · r3: 10–11 · r4: 9–11 · r5–15: 8–11 |
| rd1 | r3: 11 · r4: 10–11 · r5: 9–11 · r6–15: 8–11 (amended 2026-08-27 evening, 1t up with the removed row: r2: 11 · r3: 10–11 · r4: 9–11 · r5–14: 8–11) |
| rd2 | r2: 11 · r3: 10–11 · r4: 9–11 · r5: 8–11 · r6–9: 7–11 · r10–12: 8–11 |

**Ornament cells** (stroke-inclusive overlays per the 002 region
construction; fills are `bg/200`, strokes the lattice's `border/000`):

- rm: circles [11,5] · [9,7]+fill · [10,14] · [9,29]; filled squares
  [11,12] · [11,23].
- rs (amended 2026-08-27, §9 R15): circles [11,5] · [9,7] · [10,14] ·
  [9,19]; filled square [11,20]. (The frame's Grid layer also carries
  a paintless circle at [8,13] — a hygiene flag, not built.)
- rt: circles [11,3] · [9,5] · [11,14]+fill · [8,15]; filled square
  [11,7].
- rd1: circles [11,4] · [9,6] · [8,12]; filled square [11,13].
  (Amended 2026-08-27 evening, 1t up with the removed row: circles
  [11,3] · [9,5] · [8,11]; filled square [11,12].)
- rd2: circles [11,3] · [9,5] · [11,11]+fill · [8,12]; filled square
  [11,5].

Ornament cells are `.decor` vocabulary — never content, never pointer
targets. Two grid-hygiene flags found at extraction are with design
(§9 F1/F2); neither is built.

## 3 · Header

One column: slug · H1 · subhead (· chat row at rt/rd1, §6).

| | rm | rt | rd1 | rd2 |
|---|---|---|---|---|
| slug style | `text/xs/Medium` | `text/xs/Medium`⁴ | `text/sm/Medium` | `text/sm/Medium` |
| slug dot (bg/400, square) | 6px | 6px | 7px | 7px |
| slug dot gap | 8 | 8 | 12 | 12 |
| H1 style | `display-serif/sm+/Thin` 36/42 | `display-serif/md/Thin` 40/48 | `display-serif/lg/Thin` 48/56 | `display-serif/3xl/Thin` 72/78 |
| H1 wrap box (weights) | 305 | 288 | 328 | 724 |
| subhead style | `text/md/Light` | `text/lg/Light` | `text/xl/Light` | `text/2xl/Light` |
| subhead wrap box (weights) | 240 | 288 | 320 | 485 |
| gaps slug→H1 / H1→subhead | 12 / 24 | 16 / 24 | 40 / 40 | 40 / 40 |

⁴ fixed at flag review from `text/xs/Regular` (§9 R3).

Copy (curly apostrophes, the 008 canon): slug **Pricing** ·
H1 **Pay for the work, not the retainer.** · subhead **$50/month for a
sales and marketing team. Sounds ridiculous, but it's true.** — two
paragraphs at rm/rt/rd1 (the designed break after "team. ", paragraph
spacing 12px), one line at rd2. Colors: slug and subhead `text/400`,
H1 `text/100`.

**Amended 2026-08-27 — the rs column (the designed 576 frame, §9
R15):** slug and gaps as rm; H1 `display-serif/sm+/Thin` 36/42 in a
**192** wrap box with **two designed breaks** — after "Pay for" and
"the work," (four rendered lines; the file forces the breaks with
double spaces, a hygiene flag); subhead `text/md/Light` in a **192**
box, the same two paragraphs. *Re-amended the same evening: design
fixed the copy hack — the H1 copy is canonical (single spaces) and
the frame carries a 32 right pad, so the wrap column is **160** and
the four lines fall naturally; the built breaks were removed.*

## 4 · The pricing card

A white (`bg/000`) card with a clipped decorative lattice, the price,
the fine print, the **pricing-button** CTA, and the hanging tag. The
card + button container is the whole-tick geometry unit (§1); the
white card area absorbs the button's material height (the tick wins).
The container carries the `hard-shadow-square` token; the hanging tag
sits outside it, and the shadow paints **over** the tag and the
touching included-list box — the container sits above the list in the
section's stacking order (amended 2026-08-27 — design review, §9
R13).

**The mosaic (decorative lattice).** Cell = 1t, stroke 1px
`color/teal/150`, registered with the page lattice (§1). Clipped by
the card box; behind the card content, above the fill (amended
2026-08-27 — design review, §9 R13). The edges on the card's outer
boundary are unpainted — the field draws interior lines only, and
the rm strip keeps its interior-facing left and bottom edges
(amended 2026-08-27 evening — design direction, §9 R20).

- rm: a 2×7-cell strip anchored to the card's right edge (ticks 9–11
  of the page grid); one circle cell at strip [1,2], filled
  `color/teal/150` at 80% (amended 2026-08-27 — the fill reads 100%
  paint opacity at build; built at the rendered truth, §9 R11).
- rt/rd1/rd2: a 5×5 field from the card's top-left; three circle
  cells at [3,0] · [4,3] · [1,4] (stroke-only). Uniform across the
  three bands (fixed at flag review, §9 R5).
- rs (amended 2026-08-27, §9 R15): the same 5×5 field with **two**
  circles — [3,0] · [4,3]; the [1,4] circle enters at rt.

**The price row** (baseline-aligned, card pads below):

| | rm | rt | rd1 | rd2 |
|---|---|---|---|---|
| card pads (t/r/b/l) | 20/24/24/24 | 20/24/24/24 | 20/24/40/24 | 32/20/40/32 |
| $50 (the price display) | 88/88 | 88/88 | 128/128 | 176/176 |
| /month | `text/xs/Light` | `text/xs/Light` | `text/lg/Light` | `text/lg/Light` |
| fine print | `text/lg/Light` | `text/lg/Light` | `text/xl/Light` | `text/2xl/Light` |

Amended 2026-08-27 — the rs column (§9 R15): card pads
**12/16/16/16**, $50 **88/88**, /month `text/xs/Light`, fine print
**`text/md/Light`**.

The price display is **not a ramp style**: GT Standard **L Light**
(300), size/line-height per band above, tracking −1% — an enumerated
constant (`--po-price-*`), band-restated, all in `color/teal/600`.
The /month block sits on the $50 baseline (its designed pads: top 6,
right 8). Fine print copy, with its designed break: **No setup fee.
No contract.** / **Cancel anytime.** — all card text `teal/600`.

**The pricing-button** — a new primitive (`PricingButton`), material
per size, section chooses the size per band (xs rm · md rt · lg rd1 ·
xl rd2):

| size | box | pads (l/r) | label | chip / icon |
|---|---|---|---|---|
| xs | 336×64 | 24/16 | `text/lg/Medium` | 32 / 18 |
| sm | 240×48 | 16/8 | `text/md/Medium` | 32 / 18 |
| md | 320×64 | 24/16 | `text/lg/Medium` | 32 / 18 |
| lg | 400×80 | 24/16 | `text/xl/Medium` | 48 / 24 |
| xl | 560×80 | 32/32 | `text/2xl/Medium` | 48 / 24 |

Amended 2026-08-27 (§9 R15/R16): the **sm** row is the 576 design's
size, added to the set with the frame (its lattice is the five-cell
row, circle second, on 48 cells); the band mapping is now xs rm ·
**sm rs** · md rt · lg rd1 · xl rd2. And the button is
**proportional** (design direction, R16 — unlike the material 003
buttons): every value above is a fraction of the size's anchor cell,
so in a section mount the whole button scales with the page tick.

Fill `teal/400`, label `teal/800`, arrow chip `teal/600` (radius-full,
the 003 arrow glyph). Each size carries its own decorative lattice
(stroke `color/teal/450`), behind the label and chip (amended
2026-08-27 — design review, §9 R13): xs — a 4×2 field of 32px cells
anchored top-right, circle at [0,1]; md/lg/xl — a single row of five
size-matched cells (64/80/112), the second a circle; md/lg centered
both axes, xl bottom-anchored, centered horizontally. *Amended
2026-08-27 (design review, §9 R14): the set's cells are the band
anchor ticks — in a section mount the lattice cell is **1t**
(`--pbtn-cell: var(--t)`, the grid-button override construction) and
every lattice anchors to the button's bottom edge and the card's tick
edges (xs bottom-right; md/lg/xl bottom, full width), so it registers
with the page lattice and the card mosaic at every width. The
per-size anchor cells remain the primitive's defaults (the
/primitives catalog). At the anchors the designed readings above
coincide with this construction.* Label
**Start today**; the button is a link to the checkout URL (§8).

Hover (hover-capable media, the 003 grammar —
`--motion-hover-duration` / `--motion-hover-ease` on fill and ink):
~~fill → `teal/600`, label → `bg/000` white, chip → `teal/700`,
lattice stroke → `color/teal/650`. Geometry never changes.~~
Amended 2026-08-27 (design revised the hover states in the set, §9
R13): fill → `teal/500`, chip → `teal/700`, lattice stroke →
`color/teal/550`; the label ink holds `teal/800`. The md/lg/xl row
circle slides one cell right on the cell-slide grammar (§7.2); the
xs field circle stays.

**The tag.** Hangs below the container, indented from its left edge,
bottom corners `radius-sm`; `teal/200` fill, `teal/600` ink; copy
**No asterisks.**

| | rm/rt | rd1/rd2 |
|---|---|---|
| style / box | `text/2xs/Medium`, h24 | `text/xs/Medium`, h32 |
| pads | 10/6 | 12 sides, 4 top, 8 bottom |
| indent | 24 | 32 |

## 5 · The included list

Boxes: `bg/100` fill, 1px `border/000`, the `hard-shadow-square`
token (009) — on the left/only box; the touching right box at rt/rd1
carries no shadow and sits behind the left, so the left's shadow
falls onto it (amended 2026-08-27 — design review, §9 R13). Eight
items, one copy set at every band:

1. *(ksLogomark)* The platform: every contact, every conversation,
   and control over your site, social, blog, and listings
2. *(icons/website)* A custom website, built for your business,
   hosted with no traffic limits
3. *(icons/search)* An SEO engine that publishes to your site every
   week, driven by ongoing keyword research
4. *(icons/ai-chat)* An AI chat agent, running the latest models,
   that answers questions and captures leads
5. *(icons/maps)* Your Google Maps profile, claimed, optimized, and
   kept current
6. *(icons/reception)* Automatic follow-up on leads, by text, web,
   and phone
7. *(icons/reviews)* Rankings, reviews, and traffic monitored
   continuously
8. *(icons/tokens)* 200 credits a month toward blog posts, social
   posts, and messages

| | rm | rt | rd1 | rd2 |
|---|---|---|---|---|
| layout | one box, 18t | 2×5t boxes, +1t stagger | 2×5t boxes, +1t stagger | one box, 5t |
| items per box | 8 | 4 + 4 | 4 + 4 | 8 |
| box pads (l/r/y) | 20/24/20 | 20/24/20 | 24/32/20⁵ | 32/32/24 |
| head style | `text/md/Medium` | `text/md/Medium` | `text/xl/Medium` | `text/2xl/Medium` |
| item style | `text/sm/Light` | `text/sm/Light` | `text/md/Light` | `text/lg/Light` |
| head→list / item gaps | 20 / 12 | 20 / 12 | 20 / 20 | 12 / 12 |
| icon box / glyph | 24 / 15 | 24 / 15 | 32 / 20 | 32 / 20 |
| icon–text gap | 12 | 12 | 12 | 24 |
| CTA (ButtonFill teal pill) | sm | sm | md | — |

⁵ the rd1 right box's list pads y24.

Amended 2026-08-27 — the rs column (the designed 576 frame, §9 R15):
the pair layout — left box **8t**, right box **7t** staggered **+2t**
(4 + 4 items); box pads **12/16/12** (the right box's CTA row stays
p24); head `text/md/Medium`; items `text/sm/Light` in a **176** text
column; head→list / item gaps **16 / 16**; icon box/glyph and the
icon–text gap as rm; CTA ButtonFill **sm** in the right box.

Head copy **What's included:**, `text/300` like the items. Item 1's
icon is the brand logomark on a `bg/200` `radius-md` box (glyph 12 at
rm/rt, 16 at rd1/rd2); items 2–8 use the sheet icons, boxes unfilled.
The CTA (**Start today**, the 003 ButtonFill, teal pill, sm/md per
band) sits bottom-right inside the right/only box (rt/rd1 in a p24
row; rm in the box flow) and links to the checkout URL. At rd2 the
card's xl button is the block's only CTA. The sheet's `icons/social`
and `icons/listing` are not referenced by this section (§9 note).

## 6 · The chat rows

A hugging row: **Got a question?** (`text/400`) + a 003 ButtonGhost
(brown, `icons/chat`, label **Talk to us**). Placement per band is §1's
offsets: rm carries two rows (after the card's tag, after the list);
rt one row inside the header (48 below the subhead) and one after the
list; rd1 one row inside the header only (40 below the subhead); rd2
one row after the list, centered in the 2t gap, its label indented
12px. Amended 2026-08-27 (§9 R15): rs carries **one** row — the rm
variants at tick 1, row-anchored at **10t** (design's same-evening
fix moved it from +30-below-the-tag onto the row line).

| | rm/rt | rd1/rd2 |
|---|---|---|
| label style | `text/sm/Light` | `text/lg/Light` |
| ghost size (003) | sm (36, icon 16) | lg (48, icon 20) |
| label–button gap | 16 | 16 |

Every chat button renders the **inert `open-chat` action** (the 006 §9
contract, already on ButtonGhost): `data-action="open-chat"`, no
handler, wired when the chat widget lands. The widget itself is future
work outside this spec (§9 R9).

## 7 · Motion

No load choreography — none was supplied for this page; the section is
born settled (§9 R10). Both grammars below are hover-only.

### 7.1 · The mosaic circles shift one cell

The nav card grammar (005 §6 / `nav.css` `.knav-decor i.c`), promoted
here at its second consumer: while the pointer rests on the card
container (hover-capable media) — amended 2026-08-27 (design review,
§9 R13): **the trigger is the pricing-button only**, the card itself
is not a hover target — each mosaic circle slides exactly one
cell in its designed direction and slides back on mouse-out, both on
the same curve. Tokens promote to the motion layer **values
unchanged**: `--motion-cell-slide-dur: 500ms` ·
`--motion-cell-slide-ease` (alias of `--motion-drawer-ease-open`);
the nav's `--knav-card-slide-*` become aliases of the promoted pair.

Directions (spec's choice; approval covers them): rt/rd1/rd2 —
[3,0] slides down · [4,3] slides left · [1,4] slides right; rm — the
strip circle [1,2] slides down. Circles stay inside their fields at
rest and shifted; the slide is a `translate`, layout never moves.

### 7.2 · The pricing-button hover

The 003 hover grammar (§4): fill, chip fill, and lattice stroke swap
on `--motion-hover-duration` / `--motion-hover-ease`. ~~No geometry,
no shadow.~~ Amended 2026-08-27 (design review, §9 R13): the md/lg/xl
row circle also slides one cell right on the §7.1 cell-slide grammar
(`--motion-cell-slide-dur/-ease`) and returns on mouse-out — the
set's hover variants draw it at the third cell, matching the card
mosaic's movement; the xs field circle stays. No shadow; the label
ink holds (§4 amendment).

### 7.3 · Reduced motion

`prefers-reduced-motion: reduce` renders both grammars
state-to-state — transitions off, the shifted/hover states still
apply while hovered (the nav's construction). A no-JS render is the
settled section; nothing here needs JavaScript.

## 8 · Deliverable — files, constants, semantics

1. **Section** `design-system/v2/sections/pricing-offer.tsx` +
   `pricing-offer.css` — a server component, **zero client islands**
   (hover is CSS; the CTAs are links; the chat buttons are inert).
   Landmarks carry `data-landmark` (header top, card container, list
   boxes, chat rows) for the page self-test.
2. **Primitive** `design-system/v2/primitives/pricing-button.tsx` +
   `pricing-button.css` — sizes xs/md/lg/xl per §4, states CSS-driven,
   `href` mandatory (it is a link), `forceState` for the /primitives
   catalog, which gains the set in the same commit.
3. **Icons** — seven verbatim console-bridge exports into
   `design-system/v2/icons.tsx`: `IconWebsite` · `IconSearch` ·
   `IconAiChat` · `IconMaps` · `IconReception` · `IconReviews` ·
   `IconTokens` (paint normalized to `currentColor` only where the
   glyph tints with text; `IconChat` and the arrow glyphs exist). The
   list logomark reuses the brand asset at material size.
4. **Constants** (component token layer, `--po-*`): the `.page` block
   carries the tick-riding header tops (112/32 · 80/64 · 120/80 ·
   120/112) and the weight-riding wrap boxes (§3); per-band material
   blocks carry the card pads, price display (88/88 · 88/88 · 128/128
   · 176/176, −1%, L Light), tag metrics, chat offsets (+38 · +30 ·
   +88), and stagger (1t is geometry, not a constant). Motion:
   `--motion-cell-slide-dur/-ease` promote per §7.1.
5. **Colors** arrive through the pre-build token re-extraction (001
   rule): `color/teal/150` · `450` · `650` are file variables as of
   2026-08-27 (§9 R7) and land in the primitives layer as
   `--color-teal-150/-450/-650`. No raw hexes in the build.
   (Amended 2026-08-27, design review — §9 R13: `teal/450` re-inked
   `#4cb3a3` and `teal/650` replaced by **`color/teal/550`**
   `#409689`; re-extracted the same day.)
6. **The checkout URL** is one named constant
   (`PRICING_CHECKOUT_URL = https://pay.keystone.app/b/fZucN6fhC7vhe6j5ux0VO02`)
   in the section's data module; both CTAs read it. Same-tab
   navigation (§9 R8).
7. **Route** — the composition module `design-system/v2/pricing.tsx`
   is born here mounting nav · pricing-offer · footer, mounted by
   `/pricing` and the permanent noindexed QA surface
   `/pricing-fixture`; 012/013 splice their sections in as they land.
   The page-level expectations module and sweep leg follow the 010
   pattern once 013 completes the stack (013's deliverable).
8. **Semantics**: one `<section>` landmark; the H1 is the page's
   `<h1>`; the slug is a decorative eyebrow (`aria-hidden` dot); the
   price renders as one paragraph reading "$50/month"; the list is an
   `<h2>` + `<ul>` (icons `aria-hidden`); every CTA is a real `<a>`,
   the chat buttons real `<button>`s. Mosaics and lattices are
   `aria-hidden` decoration on the component layer (the page lattice
   stays the engine's).
9. Docs in the same commits: plan.md's pricing record and the launch
   checklist's per-page status.

## 9 · Resolutions record

Draft-day record, 2026-08-27. Every fix re-read from the nodes
post-fix; rendered bounds re-verified through the console bridge.

- **R1 — the 768 frame's stale footer** (draft flag): the frame
  carried the pre-2026-08-22 footer (888px, 13.875t) and a 2t FAQ→
  footer gap. Fixed by design 2026-08-27: footer 960 = 15t (the 004
  record), gap 1t, frame total 3008 = 47t whole-tick. Verified.
- **R2 — the 960 frame**: designed 2026-08-27 (44t; lg component
  variants across the sets). The draft flagged the pricing container
  sitting outside the frame and the price numeral at 128px type on a
  176px line. Both fixed the same day: the container is a frame child
  at ticks 6/3 (`630:32807` — the node was recreated; the old id is
  dead), the price is 128/128. Verified from rendered bounds.
- **R3 — the 768 slug weight**: `text/xs/Regular` where every other
  band used Medium. Fixed to `text/xs/Medium`; verified (M Medium).
- **R4 — the 1344 chat copy**: "Talk to us." (trailing period) and an
  instance named `chat-button`. Copy unified to **Talk to us**;
  verified. (The instance name is hygiene, not blocking.)
- **R5 — the 768 mosaic's top circle** sat at [2,0] where 960/1344
  put it at [3,0]. Fixed to [3,0]; all three bands uniform; verified.
- **R6 — the xs pricing-button** was missing from the set and the 384
  card carried a detached CTA frame. Design added `size=xs`
  (default + hover) and the 384 card now mounts a set instance;
  verified.
- **R7 — the unbound lattice inks, bound and named** (design request
  2026-08-27): the card-lattice stroke `#dbf0eb`, the button-lattice
  stroke `#57b7a8`, and its hover ink `#33766b` had no file
  variables. Created in `00 primitives` as **`color/teal/150`** ·
  **`color/teal/450`** · **`color/teal/650`** (the `teal/250`
  intermediate-stop precedent) and bound across the Pricing section
  through the console bridge: 128 strokes + 2 fills → 150, 69
  strokes → 450, 23 strokes → 650. The 384 circle fill keeps its 80%
  paint opacity over the bound color. Sample bindings re-read.
- **R8 — CTA behavior** (owner, 2026-08-27): both Start-today buttons
  (the pricing-button and the list's ButtonFill) navigate to the
  checkout link, same tab.
- **R9 — the chat widget** is an unbuilt dependency: the talk-to-us
  buttons toggle it (owner decision). This spec ships them inert on
  the 006 `open-chat` contract; the widget gets its own spec and
  wiring later. Not a build gate here.
- **R10 — no load choreography**: none supplied with the motion
  intent (which covered the mosaic shift here and 012/013 motion).
  The section renders settled; a later entrance choreography would be
  a new spec.
- **F1 — resolved: the 384 Grid layer overlap** (fixed by design
  2026-08-27). The layer measured 88t against a footer top of 87t —
  a 1t overlap unique to that anchor. Re-read post-fix from rendered
  bounds: 2784 = 87t, flush with the footer top like every other
  band.
- **F2 (open, design; not built)** — the 768 Grid layer carries an
  invisible cell at [7,12] (`614:23519`): radius-full, no stroke, no
  fill. Likely a leftover; nothing renders. Re-checked 2026-08-27
  after the F1 fix — still present.
- **Note** — the sheet's `icons/social` and `icons/listing` are not
  referenced anywhere in the pricing frames as read (all four
  included lists carry the same seven icons + logomark). Design
  2026-08-27: they become relevant on the **Our Work** page. They
  stay sheet inventory; no export in this spec.
- **Note** — the rs anchor is derived (§1.1) by owner decision
  2026-08-27; design evaluates the built band manually and the
  evaluated totals land as a dated §1 amendment plus an entry here.
- **R11 — build erratum (2026-08-27): the rm strip circle's fill
  opacity.** R7 recorded the 384 circle keeping its 80% paint opacity
  over the bound `color/teal/150`; at build the node reads 100% (node
  and fill opacity both 1). Built at the rendered truth (100%); §4
  carries the dated amendment.
- **R12 — the rs derived band's built values (2026-08-27),** pending
  design's manual evaluation on the dev route (§1.1): section end
  **37t** (list top 24t + list 10t + 3t gap, the rm gap pattern); the
  list block is **10t** — the smallest whole tick that fits across the
  band (at the 470 gate edge the CTA gap bottoms out at +2.8px); the
  item text column derives to **424** at the 576 anchor (the 10.5t
  box's inner width), so the list hugs shorter than rm exactly as
  §1.1 predicts (items wrap 2/1/2/2/1/1/1/1); the staircase run
  extends to r36; everything else keeps the rm variants. The
  evaluated totals land as the §1 dated amendment.
- **Note** — two file observations at build (2026-08-27), neither
  built: the `pricing-button` set's md/lg/xl circle cells carry an
  invisible `bg/200` fill (`visible: false` — a leftover; the build is
  stroke-only per §4), and the set's hover variants draw the circle
  one cell right of default — §7.2's approved grammar is ink-only ("no
  geometry"), so the build keeps the circle at [1,0] in both states.
  With design as hygiene flags.
- **R13 — design review of the built section (2026-08-27), post-build
  revisions.** Seven directions, each landed as a dated inline
  amendment: (1) the pricing-button hover states revised in the set —
  fill → `teal/500`, lattice → the new `color/teal/550` (`#409689`,
  replacing `teal/650`), the label ink holds `teal/800`; `teal/450`
  re-inked `#4cb3a3`; ramp re-extracted, tokens updated (§4, §8.5).
  (2) The card mosaic and the button lattice render behind their
  content, above the fill (§4). (3) The button's md/lg/xl row circle
  slides one cell right on hover on the cell-slide grammar, matching
  the card mosaic — the set's hover variants are the record; the
  earlier hygiene flag on them is withdrawn (§7.2). (4) The mosaic
  slide triggers on the pricing-button only, never the card (§7.1;
  built with `:has()`).   (5) The card + button container carries the
  `hard-shadow-square` token, read from the container nodes at every
  anchor (§4); per the file's layer order its shadow paints over the
  hanging tag and the touching list box — built as a top-of-context
  shadow layer with the container above the list in z. (6) The chat label is material like the ghost beside
  it — fixed px per band, no weight riding (18px holds through the
  rd2 slices). (7) Only the left list box carries the shadow at
  rt/rd1; the right box sits behind the left (§5, per the box nodes).
  All values re-read from the file post-revision.
- **R14 — the button lattice registers with the page grid (design
  direction 2026-08-27, second review pass).** Off the anchors the
  material lattice cells misregistered against the card mosaic and
  the page lattice at every band. The set's cells (32/64/80/112) are
  the band anchor ticks read at 1:1 zoom, so the lattice is
  tick-riding, not material: the section mounts override the
  primitive's cell with the page tick (the spec 007 §6 grid-button
  construction — material defaults, section-owned override), and the
  lattices anchor to the button's bottom edge and the card's tick
  edges so rows and columns register at every width. §4 carries the
  dated amendment; the catalog still renders the designed anchor
  cells bare.
- **R15 — the 576 frame landed (design, 2026-08-27): the rs band is
  designed, superseding §1.1's derivation.** Frame `634:33130`
  (3072 = 64t), read fresh from rendered bounds the same day. The
  design is a new layout, not the derived rm re-lay: header at tick 1
  (top 112, H1 36/42 in a 192 box with two designed breaks, subhead
  `text/md` in 192); card at ticks 6–11 rows 3–9 (container 6t = 5t
  white card + the new **1t sm button**), pads 12/16/16/16, fine
  print `text/md/Light`, the 5×5 mosaic with two circles; **one**
  chat row +30 below the tag; the list pair at 12t — left 8t /
  right 7t staggered +2t, pads 12/16/12, gaps 16/16, item column
  176; section end 22t; the §2 staircase runs to r21. The set gained
  `size=sm` (240×48, `text/md/Medium`, pads 16/8, chip 32/18) with
  default + hover variants on the revised inks. §1–§6 carry the
  dated amendments. Three hygiene flags to design, none built: the
  H1 copy forces its breaks with double spaces; the Grid layer
  carries a paintless circle at [8,13] (the F2 class); the chat
  container sits at x45, 3px off tick 1. *Same evening: design fixed
  the H1 (canonical copy, a 32 right pad → the 160 wrap column) and
  the chat row (row-anchored at 10t); both re-read and rebuilt. The
  paintless circles stay open — located for deletion: `614:23519` at
  [7,12] in the 768 Grid and its clone `634:33559` at [8,13] in the
  576 Grid (both named "Rectangle 143").*
- **R16 — the pricing-button is proportional (design direction
  2026-08-27, third review pass).** Mid-band the material interiors
  (heights, pads, type) fought the tick-riding lattice — visibly at
  the small sizes. The button is big enough to scale (unlike the
  material 003 buttons): it is now drawn entirely in units of its
  lattice cell — box, pads, label size/line, chip, glyph are
  designed-px-over-anchor-cell fractions — so a section mount
  (--pbtn-cell: var(--t)) scales the whole button with the grid, and
  the catalog's bare render is the designed set exactly. The white
  card area becomes 5t at every width by construction (container 6t −
  button 1t at rs/rt/rd1). The focus ring stays material (a11y
  chrome). §4 carries the amendment.
- **R17 — line-inclusive list boxes (build erratum, found at design
  review 2026-08-27).** The boxes were sized k·t exactly, so their
  right/bottom borders sat one pixel short of the canonical
  lattice-line pixels ([k·t, k·t+1)) and doubled the page lines where
  the staircase runs behind them. Box spans are now k·t + 1px (the
  v5 line-inclusive rule), and the shared inner edge of the touching
  pair collapses to one line (the boxes' borders land on the same
  pixel; the left box paints above).
- **R18 — the header tops streamlined (design, 2026-08-27 evening):**
  re-read from all five anchor frames — 100 · 112 · 96 · 192 · 174
  (the §1 dated amendment); the `.page` ratios updated in place.
  The 960 value was a placement slip: design fixed it by deleting the
  frame's first row — the header re-read at **112** and the whole rd1
  band rose 1t (card 2t · list 8t · section end 15t · staircase and
  ornaments up one row · frame 43t), leaving rd1's rows identical to
  rt's. Re-read from rendered bounds and rebuilt; §1/§2 carry the
  dated amendments.
- **R19 — the pricing-button hover flicker (build erratum,
  2026-08-27 evening):** the circle's cell-slide ran on `translate`,
  which promotes a compositor layer whose creation re-rasters the
  button mid background-transition — the exact flicker 003
  documented on `.btn-glyph`. The slide now animates `left` (paints
  in place); grammar, duration, ease, and distance unchanged. The
  card mosaic keeps `translate` (§7.1) — its card does not
  transition, so no layer race exists there (the 005 nav
  construction).
- **R20 — the mosaic's outer edges unpainted (design direction,
  2026-08-27 evening):** the lattice edges lying on the card's outer
  boundary are removed — the 5×5 field renders interior lines and
  circles only, and the rm strip keeps just its interior-facing left
  (tick 9) and bottom edges — so the mosaic reads as the background
  grid bleeding off the card, not a framed box. Built as transparent
  border sides (the border box keeps the interior lines on their
  canonical tick pixels). The file's mosaics still draw the
  center-aligned perimeter strokes — a hygiene note for a later
  file pass.
- **Build note (2026-08-27)** — the four-units mechanics under
  nearest-anchor compression: all section type rides the weights with
  band-constant values (hold-then-switch at every gate — each gate is
  structural), the list's head→list/item gaps ride the weights (the
  flow-margin corollary), and the item text columns are weight-riding
  wrap-pinning widths (256 · 424 · 240 · 300 · 440). At worst-case
  compression the material icon rows press the hug a few px into the
  box pads (11px at the 1130 edge, inside the 24px pad); the boxes
  clip ("the tick wins" — slack compresses padding).

## 10 · Acceptance criteria

At each of the four designed anchors and one arbitrary width per
structural slice (stretched and compressed, including the derived rs
band), scrollbar forced on:

- [x] Every §1 landmark lands on its row (whole ticks, line-inclusive
      ±1px) and the card container and list boxes are whole-tick at
      every audited width; the header top rides its anchor ratio.
      (Headless sweep 2026-08-27, 15px scrollbar forced, at
      384/768/960/1344 + 420 · 470/520/620 · 665/700/810 ·
      860/900/1050 · 1130/1200/1600: section 45/37/16/16/13t; card top
      11/2/3/5t, container 9/5/5/5t; list top 24/8/9/6t, blocks
      18/10/6/6/5t with the +1t stagger; chat rows at 20t+62 ·
      42t+30 · 14t+30 · 11t+88; header top 3.5t · 1.25t · 1.5t ·
      120/112·t exact; the footer lands on the section end at every
      width.)
- [x] The mosaic cells register with the page lattice col-for-col at
      every audited width; the mosaic clips at the card box; the
      staircase and ornament cells render per §2 and nothing else is
      exposed over the section's rows. (Strip at page ticks 9–11 and
      field on the card's tick edge at all audited widths,
      line-inclusive; §2 verified against the Grid layers cell-by-cell
      from rendered bounds pre-build; the F2 invisible cell not
      built.)
- [x] Type is exact at the anchors per §3–§5 (styles, boxes, designed
      breaks — the subhead's two paragraphs at rm/rt/rd1, one line at
      rd2; the fine-print break; the price display constants) and
      wrap counts hold across each band's slices. (Anchors exact —
      H1 36/42 · 40/48 · 48/56 · 72/78, price 88/128/176 L Light −1%;
      wrap counts constant per band across stretched and compressed
      slices: H1 2/2/3/3/2 lines, items 3,2,3,3,2,2,2,2 rm ·
      2,1,2,2,1,1,1,1 rs · 3,2,3,3 + 2,2,2,2 rt/rd1 ·
      2,2,2,2,2,1,1,2 rd2 — the rt/rd1/rd2 counts match the frames'
      rendered item heights.)
- [x] The rs band renders per the designed 576 frame (the §1
      amendment, §9 R15 — superseding §1.1's derivation): audited at
      470/488/520/576/620 — section 22t, header top 112·t/48, card
      [3t, 6–11, 6t], the pair 8t/7t at +2t, one chat row at
      +24+30, H1 four lines on the designed breaks, item wraps
      [4,3,4,4,3,3,3,3] constant across the band and matching the
      frame's item heights; every value exact at the 576 anchor.
- [x] Both CTAs navigate to `PRICING_CHECKOUT_URL` in the same tab;
      the chat buttons render inert `data-action="open-chat"` and are
      keyboard-focusable with visible focus. (All seven CTA links
      resolve to the one constant, no target; five chat buttons inert
      and focusable, the 003 ghost ring.)
- [x] Hover per §7 on hover-capable media only: the three circles
      (one at rm) shift exactly 1t and return; the pricing-button
      swaps fill/ink/chip/lattice on the 003 grammar; touch shows
      no hover states; reduced motion renders both state-to-state;
      a no-JS render is identical. (Probed 2026-08-27: circle
      translate 0 → 1t → 0; button #5bc3b3/#0d2a28/#57b7a8/#318175 →
      #318175/#ffffff/#33766b/#236058; reduced-motion durations 0s
      with states applying; no-JS renders the settled section at
      13.000t with all landmarks.)
- [x] Zero client islands on the section; `/pricing` and
      `/pricing-fixture` render it server-only; the homepage routes
      and budgets are untouched. (No scripts or islands inside the
      section; both routes 200, the fixture noindexed; `/` renders
      unchanged.)
- [x] Zero TypeScript and lint errors; every value traces to a token,
      a named ramp style, or a §8 enumerated constant (no raw hexes —
      the three new teal stops arrive via the re-extraction).
      (`tsc --noEmit` and `next lint` clean 2026-08-27; teal
      150/450/650 landed via the pre-build re-extraction, no other
      drift across primitives, semantics, effects, and all 135 text
      styles.)
