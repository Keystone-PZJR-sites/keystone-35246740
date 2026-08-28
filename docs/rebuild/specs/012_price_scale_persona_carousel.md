# Spec 012 — Price scale + persona carousel

**Status:** Approved 2026-08-28 (owner) — **built and verified the
same day** (acceptance checked at the five anchors and one width per
structural slice, stretched and compressed; §9 carries the build
record). Drafted 2026-08-27; all seven flags resolved by design
2026-08-28 (F1/F4/F6/F7 fixed in the file and re-read from the nodes;
F2/F5 confirmed as intent; residuals in §9) — the body carries the
dated amendments.
**Depends on:** spec 001 (tokens, fonts — the pre-build re-extraction
rule) · spec 002 / 002.r1 (the engine, nearest-anchor gates, the four
units) · spec 003 (ButtonFill and the hover grammar) · spec 005 (the
card shadow-growth grammar this spec consumes) · spec 009 (the
`hard-shadow-square` token) · spec 010 (the `data-landmark` self-test
vocabulary, the page pattern) · spec 011 (the pricing composition and
`PRICING_CHECKOUT_URL`; the proportional-primitive taxonomy, §9 R16;
the line-inclusive box law, §9 R17)
**Sources:** fresh MCP reads 2026-08-27 (evening) of the five anchor
frames — `404:8175` (384, 3680 = 115t) · `636:38164` (576, 3312 =
69t) · `376:33078` (768, 3072 = 48t) · `625:29550` (960, 3440 = 43t) ·
`356:27967` (1344, 4256 = 38t) — and the section nodes: price-scale
blocks `408:9007` / `636:39041` / `376:33517` / `625:30938` /
`372:31882`; persona carousels `636:40578` / `636:40452` / `619:26834`
/ `625:31747` / `356:28579`; the carousel state frames `372:31138`
("Carousel 2") · `613:20614` ("Carousel 3"); the component sets
**`persona-card` `615:25245`** (persona × size × state — 30 variants),
**`slider` `613:21217`** (state × size — 9), **`pricing-tag`
`615:25357`** (size — 4); the page Grid layers `614:23968` /
`636:38429` / `614:23366` / `625:29661` / `613:19513` — all in
`ks-MarketingSite`. Every frame total, section top, block edge, card
box, and ornament cell verified against rendered bounds through the
console bridge the same evening; instance variant properties read from
the mounted nodes. The **persona image exports** (three personas ×
five width tiers, multiply overlay baked) arrived 2026-08-27. Behavior
decisions on record (owner, 2026-08-27): the slider is **three states
with a gentle snap**; the carousel also moves by **click/swipe and the
slider follows**; the design supplies **no auto-advance and no arrow
controls** — the section never moves on its own.

The pricing page's second section (011 built the offer above; 013
takes the FAQ below). This spec covers page rows from the 011 section
end (the price-scale top) to the FAQ top: the price-scale block (head,
keyword chips, subhead, the slider, and the rt/rd1/rd2 CTA) and the
three-card persona carousel, two views of one three-state machine.

---

## 1 · Section anatomy — tick totals per band

Page rows, zero-based, from rendered bounds. The section top is 011's
section end at every band; the section end is the FAQ top (013's first
row). Rendered truth 2026-08-27: **the FAQ top sits exactly 2t below
the card-box end at every band** — the hanging tag lives in that gap.

| landmark | rm (384) | rs (576) | rt (768) | rd1 (960) | rd2 (1344) |
|---|---|---|---|---|---|
| section top | 48t | 27t | 16t | 15t | 13t |
| price-scale box (w×h) | 10t×10t | 5t×10t | 5t×7t | 5t×7t | 5t×7t |
| price-scale col span | 0–10 | 0–5 | 0–5 | 0–5 | 0–5 |
| price-scale end | 58t | 37t | 23t | 22t | 20t |
| carousel top | 59t¹ | 27t | 16t | 15t² | 13t |
| strip origin (card 1 left) | t/2 | tick 5 | tick 5 | tick 5 | tick 5 |
| card width | 9.5t | 6t | 5t | 5t | 5t |
| card gap | 1t | 1t | 1t | 1t | 1t |
| card box height | 16t | 11t | 8t | 7t | 5t |
| — image band | 6t | 4t | 3t | 3t | 2t |
| — cost card | 10t | 7t | 5t | 4t | 3t |
| card box end | 75t | 38t | 24t | 22t | 18t |
| hanging tag (material) | 24 | 24 | 24 | 24 | 32 |
| **section end (FAQ top)** | **77t** | **40t** | **26t** | **24t** | **20t** |
| section span | 29t | 13t | 10t | 9t | 7t |

¹ rm stacks the two blocks: price-scale ends 58t, 1t gap, carousel
  59t. Every other band sets the carousel beside the block, top-flush
  with the section top.
² the rd1 frame's carousel container reads y at 15t−1px and 576 tall
  against its 584 cards — transcribed at the intended 15t / hugging
  height (§9 F1). *Amended 2026-08-28 — fixed by design and re-read:
  the container sits on the 15t row, cards top-aligned; its 576
  height remains against the 584 cards (no clip, no rendered
  consequence — the strip hugs its cards in the build).*

Horizontal: the price-scale box sits at column 0 at every band; its
content is inset per §3 (t/2 at rm, 1t elsewhere). The carousel strip
runs from its origin past the page's right edge — the strip's viewport
clips at the origin on the left and at the page edge on the right; the
overflow is design (the state frames advance the strip through it, §6).

Card mounts at rest, read from the instance properties at every band:
card 1 **steady/active**, card 2 **active-persona/inactive**, card 3
**highgrowth/inactive** — one size per band: **xs rm · sm rs · md rt ·
lg rd1 · xl rd2**. Slider mounts: **lg rm · sm rs · md rt · lg rd1 ·
lg rd2**, state **less** at rest.

**Units.** The block box, card boxes, image bands, strip origin, card
widths, and the 1t gaps are geometry (tick spans — the card boxes and
image bands read as exact tick multiples at every anchor, the
tick-riding tell from rules.md). **Every interior value of the block
and the card — pads, type, chips, the hanging tag — is a band constant
riding the weights** (`calc((wA + wB) * V)`, the grid-digest law): the
designed px holds through each band's stretch (the tick slack absorbs
into the §4/§5 anchored gaps) and collapses to the anchor zoom in the
compressed slices, so wraps and fits hold by construction. The
**slider is proportional over its width** (the 011 R16 taxonomy, §4).
Material px survives only as chrome: the 1px hairlines and the focus
rings. Tick- and weight-riding constants live in the `.page` block of
the component token layer (002.r1 §4 scope rule).

## 2 · Exposure map

From the page Grid layers, every cell's paint read per-node and
positions verified against rendered bounds. Cells are `[col,row]`,
zero-based page ticks. The east staircase continues from 011's run;
all other cells in the section's rows are unexposed. The FAQ-top row
itself is 013's record.

| band | exposed run (this section's rows) |
|---|---|
| rm | r48–r76: cols 10–11 (the run narrows from 011's 9–11 at the section top) |
| rs | r27–r39: cols 9–11 |
| rt | r16–r25: cols 8–11 |
| rd1 | r15–r23: cols 8–11 |
| rd2 | r13–r19: cols 8–11 |

**Ornament cells** (fills `bg/200`, strokes the lattice's
`border/000`, `.decor` vocabulary — never content, never pointer
targets):

- rm: filled square [11,73].
- rs: circle [9,33] (stroke-only) · filled circle [11,38].
- rt: filled circle [11,25].
- rd1: filled circle [11,23].
- rd2: filled square [11,19].

The carousel cards paint over the exposed cells as content; the
**inactive cards are translucent by design** (§5) so the staircase
reads through them — the lattice never moves into the content layer
for this. The price-scale box's top hairline lies on the section's top
row line, drawn line-inclusive on the canonical line pixel (§3), so it
coincides with — never doubles — the page lattice where 011's
staircase touches that line.

## 3 · The price-scale block

A transparent box (no fill) with a **1px `border/000` top hairline**
across its full width, on the section's top row line (line-inclusive —
the border occupies the canonical `[k·t, k·t+1)` pixel). One column:
head · keyword chips · subhead · slider (· CTA at rt/rd1/rd2). The
column is space-between inside the box: at rm/rs the **slider's bottom
edge sits flush on the box's bottom row line** (a tick line — 58t rm,
37t rs); at rt/rd1 the **CTA's bottom edge** sits flush on it (23t /
22t); at rd2 the CTA rests 48 above it.

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| box pads (t/r/b/l) | 24/0/0/16 | 24/32/0/48 | 32/64/0/64 | 32/80/0/80 | 40/40/48/112 |
| head style | `display-serif/xs/Extralight` 24/30 | same | same | `display-serif/sm/Extralight` 32/38 | `display-serif/md+/Extralight` 42/50 |
| head wrap box (weights) | 288 | 160 | 192 | 240 | 408 |
| chip text | `text/xs/Regular` | `text/2xs/Regular` | `text/xs/Regular` | `text/xs/Regular` | `text/md/Regular` |
| chip pads (t/x/b) | 1/4/2 | 1/4/2 | 1/4/2 | 1/4/2 | 2/6/2 |
| chip gaps | 4 | 4 | 6 | 6 | 8 |
| subhead style | `text/md/Light` | `text/md/Light` | `text/sm/Light` | `text/md/Light` | `text/lg/Light` |
| subhead wrap box (weights) | 288 | 160 | 192 | 240 | 336 |
| stack gaps | 24 uniform | 32 head→chips, 24 chips→subhead | 24 uniform | 32 uniform | 32 uniform |
| slider (size, placement) | lg, flush bottom | sm, flush bottom | md, in flow | lg, in flow | lg, in flow |
| CTA (ButtonFill teal pill) | — | — | sm | md | lg |

Copy: head **Then it scales with you** (~~wraps naturally in its box,
two lines at every anchor~~ *amended 2026-08-28 at build: the file
carries a designed U+2028 break after "scales" at rm/rt/rd1/rd2 — rs
breaks there naturally in its 160 box — and natural wrapping cannot
reproduce it at rm, where the string fits the 288 box on one line;
built as an explicit two-line break, §9 build record*) · subhead
**Everything runs on credits. Use
Keystone for the work you want. Don't pay for anything you don't.**
(the file's closing apostrophe is straight — §9 F3; built curly per
the 008 canon; *amended 2026-08-28: design fixed the copy — both
apostrophes curly, re-read at rm/rs/rt/rd1; the rd2 node still reads
straight, a residual with design, and the build's single copy set is
canonical either way*). Head ink `text/100`, subhead `text/400`.

**The keyword chips.** Six chips, ~~`radius-xs`~~ (*amended
2026-08-28 at build: the rendered radius is 2 — `radius-2xs` — at
rm/rs/rt/rd1 and 4 — `radius-xs` — at rd2 only; the draft's blanket
radius-xs was a transcription slip, §9 build record*), wrapping in
the box — each with its own hue pair (300 fill / 700 ink):

| chip | fill | ink |
|---|---|---|
| Ads | `pink/300` | `pink/700` |
| Sales calls | `orange/300` | `orange/600` (§9 F5 — the odd one out) |
| Social | `yellow/300` | `yellow/700` |
| Phone answering | `teal/300` | `teal/700` |
| High-volume messaging | `blue/300` | `blue/700` |
| Multi-location campaigns | `purple/300` | `purple/700` |

~~The file hand-arranges different chip orders per band (§9 F2); the
build renders **one canonical order** — the rt/rd2 order above — and
wraps naturally in the weight-riding box.~~ Amended 2026-08-28 —
design decision (§9 F2): **the per-band orders are intentional**, set
to balance each band's rag in its wrap box. The build renders each
band's designed order (re-read and frozen 2026-08-28; one copy set,
band-gated order):

- rm — Ads · Sales calls · Social · High-volume messaging · Phone
  answering · Multi-location campaigns
- rs / rd1 — Ads · Sales calls · Phone answering · Social ·
  High-volume messaging · Multi-location campaigns
- rt / rd2 — Ads · Sales calls · Social · Phone answering ·
  High-volume messaging · Multi-location campaigns

**The CTA** is the 003 ButtonFill (teal pill, `teal/300` fill,
`teal/800` label + the arrow glyph), label **Start today**, a link to
`PRICING_CHECKOUT_URL` (the 011 §8 constant), same tab. rm/rs carry no
CTA in this section — the card and list CTAs above serve those bands.

## 4 · The slider — a new primitive

`Slider` — three sizes (**sm 160 · md 192 · lg 224**, all 45 designed
height), three snap states (**less · middle · more**). The primitive
is **proportional over its width** (the 011 R16 taxonomy, applied over
the width instead of a lattice cell): every interior value below is a
designed-px-over-width fraction, so the bare primitive renders the
designed size and a section mount drives the width from a weight-riding
constant (`--ps-slider-w-*`). The focus ring stays material (a11y
chrome). Anatomy, from the set (values at the designed widths):

- **Track** — full width, 6 high, `radius-full`, vertically centered
  on the thumb row (top 6 of the 18 row); fill a left→right linear
  gradient ~~`bg/300 → #d6d1c5` (the end stop is off-ramp — §9 F4)~~
  *amended 2026-08-28 — design bound the stops (§9 F4):
  `lightgray/300 → lightgray/500`* with an inset top hairline shadow
  `inset 0 1 0 rgba(0,0,0,0.25)`.
- **Progress fill** — same height/radius/inset shadow, from the left
  edge to the thumb center; width 0 at less, half at middle, full at
  more. Fill a linear gradient of the **active persona's hue**,
  200 → 400 stops (middle: `blue/200 → blue/400` · more:
  `purple/200 → purple/400` — the set's own states; at less the fill
  is width 0).
- **Center notch** — 1×3, ~~black at 20%~~ *amended 2026-08-28 —
  design bound the ink to a new file variable, **`alpha/black-20`**
  (§9 F4); it lands in the primitives layer via the pre-build
  re-extraction*, on the track at half width (the middle snap
  target). *Amended 2026-08-28 at build review (owner): the notch
  draws OVER the progress fill so it stays visible at `more` (the
  set's more-state layer order); the thumb still covers it at
  `middle`.*
- **Thumb** — an 18 circle, `text/300` fill, with the set's bevel:
  inner shadows −1,−1 `rgba(0,0,0,0.3)` and +1,+1
  `rgba(255,255,255,0.25)`, drop shadow 1,1 `rgba(0,0,0,0.1)`. Thumb
  positions: left edge at less, centered at middle, right edge at
  more.
- **Label row** — 11 below the thumb row: **Less work** ·
  center arrow glyph (13×10, `bg/600`) · **More work**, justified to
  the edges, `text/xs/Regular` `text/400`. The glyph is compared
  against `IconArrowRight` at build and exported verbatim through the
  console bridge only if it differs (SVG export rules).

The bevel shadows are enumerated `--sldr-*` constants (design-
sanctioned chrome, §9 F4 — amended 2026-08-28: the track stops and
notch ink are bound file variables now, so only the bevel stays
enumerated).

## 5 · The persona-card — a new primitive

`PersonaCard` — persona (**steady · active · highgrowth**) × size
(**xs · sm · md · lg · xl**) × state (**active · inactive**). The card
box (image band over cost card) is whole-tick geometry (§1); the
hanging tag is drawn below it, right-aligned. Interiors ride the
weights per size (§1 units). The active card box carries
`hard-shadow-square`; content comes from the section's data module —
the primitive is prop-driven.

**Personas** (one copy set, all sizes):

| | steady | active | highgrowth |
|---|---|---|---|
| color | `pink/400` | `blue/400` | `purple/400` |
| image | persona-steady (01) | persona-active (02) | persona-highgrowth (03) |
| title | A wedding planner averaging one event a month. | A plumbing company with four trucks. | A medspa with three locations. |
| estimate | $50 – $55 | $250 – $450 | $1,000 – $3,000 |
| tag label | Steady | Active | High Growth |

Stories (en dashes and curly apostrophes; the file's xl copy-hack
breaks are not built — §9 F3):

1. *steady* — A gallery site that shows her taste and her experience,
   always current. Photos from each event go up. The blog publishes
   for couples searching. Social stays active. Every inquiry gets
   attention until she needs to step in.
2. *active* — A conversion site with landing pages for every city,
   service, and question they get asked. Service areas and pricing
   stay current. Calls get answered so jobs get booked and ads run for
   the high-margin services. After every job, we ask for the review.
3. *highgrowth* — One system across all three locations. A beautiful
   site with seamless booking integrations, dynamic pricing, and new
   photography every week. Spending $30,000 every month on highly
   optimized ads, pursuing thousands of leads seamlessly, with heavy
   seasonal swings.

Service chips (pricing-tag instances, §5.1): steady — Website · Social
· Content · Reviews & Listings · Lead follow-up; active and highgrowth
— Website · Social · Ads · Content · Reviews & Listings · Lead
follow-up · Growth Partner. *(Amended 2026-08-28 at build when the
mounted active/highgrowth instances read Reviews & Listings before
Content; superseded the same day by owner decision at build review:
one consolidated order across the personas — this list as drafted,
Content first, matching the steady card. The file's swapped
instances are design-side hygiene.)*

**Size materials** (weight-riding band constants in section mounts):

| | xs | sm | md | lg | xl |
|---|---|---|---|---|---|
| image band pads | 16/40/16/16 | same | same | same | 24 all |
| title anchor | bottom | bottom | bottom | bottom | top |
| title style | `text/lg/Medium` | `text/md/Medium` | `text/lg/Medium` | `text/xl/Medium` | `text/2xl/Medium` |
| title wrap box | 248 | 232 | 264 | 292 | 232 |
| cost pads (t/x/b) | 12/16/16 | 12/16/16 | 12/16/16 | 16/20/20 | 24/32/32 |
| estimate style | `text/2xl/Light` | `text/2xl/Light` | `text/2xl/Light` | `display-sans/2xs/Light` 28/36 | `display-sans/sm/Light` 36/42 |
| estimate→story gap | 8 | 8 | 8 | 16 | 24 |
| story style | `text/md/Light` | `text/md/Light` | `text/sm/Light` | `text/md/Light` | `text/lg/Light` |
| story column | 272 | 256 | 288 | 360 | 496 |
| chips (pricing-tag size) | xs | xs | md | lg | xl |
| chips gap | 6 | 6 | 6 | 6 | 8 |
| tag box / pads | h24, 4/8/6/8 | same | same | same | h32, 4/12/8/12 |
| tag style | `text/2xs/Medium` | same | same | same | `text/xs/Semibold` |
| tag right inset | 24 | 24 | 32 | 32 | 32 |

The cost card is space-between: estimate + story anchored top, the
chips row anchored to the bottom pad — the tick slack lives between
story and chips ("the tick wins"). Title ink `bg/000` on the image;
estimate in the persona color; story `text/400`; the hanging tag is
the persona color filled, `color/base/white` ink, bottom corners
`radius-sm`.

**States.**

- **active** — the box carries `hard-shadow-square`; the cost card is
  `bg/000` white; the image renders its export (the persona multiply
  overlay is baked in the tiers); all inks as above. *Amended
  2026-08-28 at build review (owner): the shadow paints OVER the
  hanging tag — the 011 pricing-card construction (an ::after overlay
  at the top of the box's stacking context carries it); the shadow
  lies entirely outside the box, so the card content is untouched.*
- **inactive** — a ghost on the lattice: no box shadow; the cost card
  fill drops to the set's translucent grey (`#eae8e0` at 50% — an
  off-ramp value, §9 F4) so the exposed staircase reads through it;
  the image renders desaturated and lightened — luminosity blend over
  the page, per the set (`mix-blend-mode: luminosity` on the image;
  the band has no backing fill, and no ancestor paint transitions
  behind it, so the 007 filter directive is not triggered; the baked
  10% overlay's luminosity residue is accepted); estimate, story, and
  tag text drop to `bg/600`; chips go `bg/300` fill / `bg/600` ink;
  the hanging tag goes `bg/300` fill / `bg/600` ink; the title holds
  `bg/000`.

~~The file's cost cards also carry a soft drop shadow (0/2/20
`rgba(41,41,41,0.37)`) in both states — off the site's hard-shadow
doctrine and bound to no effect style; **not built** pending design's
answer (§9 F4).~~ Amended 2026-08-28 — design removed the soft shadow
from the set (§9 F4); re-read from both states, the cost cards carry
no effects. The inactive fill stays the set's raw `#eae8e0` at 50%
(design's call) — an enumerated `--ps-` constant, the §8.5 carve-out.

### 5.1 · The pricing-tag primitive

`PricingTag` — the neutral service chip the cards mount (a named set
in the file): `bg/100` fill, `text/400` ink, `radius-xs`, sizes
**xs** (`text/2xs/Regular`, pads 2/6/3) · **md** (`text/xs/Regular`,
pads 2/6/3) · **lg** (`text/sm/Regular`, pads 4/8/4) · **xl**
(`text/sm/Regular`, pads 4/10/4). The set carries no sm — the sm card
mounts xs chips (the file's own choice). Distinct from §3's colored
keyword chips, which are section-local vocabulary.

### 5.2 · The persona images

Three personas × five width tiers, received 2026-08-27 (multiply
overlay baked; heights match the image bands at exactly 2×):

| tier | file px | serves band | rendered frame |
|---|---|---|---|
| xs | 608×384 | rm | 304×192 |
| sm | 576×384 | rs | 288×192 |
| md | 640×384 | rt | 320×192 |
| lg | 800×480 | rd1 | 400×240 |
| xl | 1120×448 | rd2 | 560×224 |

Art-directed `<picture>` sets on the structural gates (470/665/860/
1130 — the 002.r1 image doctrine): xs as the `<img>` fallback, one
media-gated `<source>` per tier above it. Explicit width/height,
WebP, `alt=""` (the titles carry the meaning), `object-fit: cover`,
lazy — all three cards are visible in the strip (the ghosts included),
so no decode priming is needed beyond flow order. Files land as
`public/media/personas/persona-{steady|active|highgrowth}-{tier}.webp`
via the media registry.

## 6 · Behavior — one machine, two views

One state `k ∈ {0, 1, 2}` (steady · active-persona · highgrowth) owns
the section, held by the island (one source of truth). At rest `k = 0`.

- **The strip** translates `−k × (card width + 1t)` — 10.5t per step
  at rm, 7t at rs, 6t at rt/rd1/rd2 (geometry, never a px constant).
  The card at the stage slot (the strip origin) is `state=active`; the
  others are `state=inactive`. The strip's viewport clips at the
  origin's left edge and the page's right edge.
- **The slider** renders `k` (thumb position, progress width, progress
  hue = active persona's).
- **Inputs**, all writing the same `k`: dragging the thumb (tracks the
  pointer live, snaps to the nearest of the three positions on
  release); clicking the track (snaps to the nearest position);
  arrow keys on the focused slider; swiping/dragging the strip
  (tracks the pointer live, snaps to the nearest state on release);
  clicking an inactive card (goes to that card's state).
- The design supplies **no timers and no arrow controls** — the
  section never moves on its own, so the 009 timer discipline has
  nothing to pause.

## 7 · Motion

No load choreography — the section is born settled at `k = 0`, like
011.

### 7.1 · The snap

Slider thumb, progress fill, and strip translate move on **one
clock**: `--ps-snap-dur: 450ms` on `--ps-snap-ease` (an alias of
`--motion-slide-ease` — reuse, never fork; the hero's 900ms is an
ambient auto-advance, this is a user gesture, so the duration is this
section's own constant, born in the component layer). During a drag
the dragged surface tracks the pointer with no transition; the snap
runs on release. The progress fill's hue swap rides the same clock.

### 7.2 · The card state swap

Card inks and fills (cost-card fill, estimate/story/tag/chip inks)
cross on the snap clock. The shadow follows the 005/009 shadow law —
**a hard shadow never paints while its box moves**: the outgoing
card's `hard-shadow-square` drops at once when the strip starts; the
incoming card's shadow grows from the 0,0 origin on
`--motion-card-shadow-dur` / `--motion-drawer-ease` only after the
strip lands. The image's blend/overlay change is not animatable and
swaps state-to-state under the move.

### 7.3 · Reduced motion, no JS

`prefers-reduced-motion: reduce` renders every change state-to-state —
no transitions, positions apply instantly; all §6 inputs still work.
A no-JS render is the settled `k = 0` section: the strip at origin,
the slider drawn at less, nothing wired (the range input renders
disabled so an unwirable control is not offered).

## 8 · Deliverable — files, constants, semantics

1. **Section** `design-system/v2/sections/pricing-scale.tsx` +
   `pricing-scale.css` + `pricing-scale-data.ts` (persona copy, chip
   sets, estimates — content never hardcoded in components) — a server
   component with **one client island**
   (`pricing-scale-island.tsx`: the §6 machine — slider wiring, strip
   transform, card clicks, swipe). Landmarks carry `data-landmark`
   (price-scale box, carousel strip, each card) for the 013 page
   self-test.
2. **Primitives** `design-system/v2/primitives/slider.tsx` + `.css`
   (§4 — proportional over width, `forceState`/`forceHue` for the
   catalog), `persona-card.tsx` + `.css` (§5 — prop-driven),
   `pricing-tag.tsx` (§5.1). The `/primitives` catalog gains all three
   in the same commit, rendering the designed anchor sizes bare.
3. **Assets** — the fifteen persona tiers into
   `public/media/personas/` (renamed from the numbered exports per the
   §5 persona mapping), registered in `v2/media.ts`; §5.2 tier markup.
4. **Constants** (component token layer, `--ps-*`, in the `.page`
   block where they ride ticks or weights): the weight-riding interior
   constants of §3/§5 per band, the slider widths
   (`--ps-slider-w-*`), and the §7 snap pair. The strip step is
   geometry (ticks), never a constant. Slider chrome constants
   (`--sldr-*`) per §4 (amended 2026-08-28: the bevel shadows and the
   inactive cost fill — the F4-sanctioned leftovers).
5. **Colors** arrive through the pre-build token re-extraction (001
   rule): every stop this section binds already exists in the ramp
   (the persona 400s, the chip 300/600/700 pairs, blue/purple 200);
   the two off-ramp greys and the unbound effects are F4 — nothing raw
   ships. *Amended 2026-08-28 (§9 F4): the track stops are bound
   `lightgray/300 → 500` and the notch to the new **`alpha/black-20`**
   variable (re-extraction picks it up); the inactive cost fill
   (`#eae8e0` @50%) and the slider bevel shadows stay design-sanctioned
   enumerated constants.*
6. **Route** — `v2/pricing.tsx` splices the section between the offer
   and the footer; `/pricing` + `/pricing-fixture` render it. The
   page-level expectations and sweep leg stay with 013.
7. **Semantics**: one `<section>` landmark; the head is an `<h2>`; the
   slider is a native `<input type="range">` (min 0 · max 2 · step 1,
   an accessible name, `aria-valuetext` announcing the persona names);
   the cards are a `<ul>` of three `<li>`s — each inactive card's
   click target is a real `<button>` overlay ("Show the … example"),
   never a click handler on the card `<div>`; estimates, stories, and
   chips are readable content; the keyword chips are readable content;
   images `alt=""`; the slider glyph and all ornament cells
   `aria-hidden` decoration.
8. Docs in the same commits: plan.md's pricing record and the launch
   checklist's per-page status.

## 9 · Resolutions record

Draft-day flags, 2026-08-27. All seven resolved by design 2026-08-28;
every fix re-read from the nodes the same morning, resolutions and
residuals below.

- **F1 — resolved (fixed 2026-08-28): the rd1 carousel container was
  off-grid** — rendered bounds put it 1px above the 15t row (y 1199),
  center-aligned against its own 584 cards. Re-read post-fix: the
  container sits on the 15t row, cards top-aligned. Its declared 576
  height still undershoots the 584 cards — no clip and no rendered
  consequence (the frame doesn't clip; the build's strip hugs its
  cards); left as a residual.
- **F2 — resolved (design decision 2026-08-28): the per-band chip
  orders are intentional** — hand-set to balance each band's rag in
  its wrap box. The draft's one-canonical-order stance is withdrawn;
  §3 carries the amendment with the three orders re-read and frozen
  (rm · rs/rd1 · rt/rd2). The build renders one copy set with the
  band-gated order.
- **F3 — resolved (fixed 2026-08-28, with residuals): copy canon.**
  Design fixed the subhead apostrophes — re-read curly at rm/rs/rt/
  rd1; the rd2 node (`372:31884`) still reads the straight `don't.`,
  a residual with design (no build impact — the section renders one
  canonical copy set, both apostrophes curly). The xl copy-hack
  breaks (U+2028 in the steady/active titles and the steady story)
  remain in the set — the build wraps naturally in the weight-riding
  boxes; residual hygiene with design.
- **F4 — resolved (fixed 2026-08-28): the unbound inks and effects.**
  Design removed the soft drop shadow from the cost cards (re-read:
  both states carry no effects); bound the track gradient stops to
  **`lightgray/300 → lightgray/500`** (the end stop re-inked onto the
  ramp); and bound the notch ink to a **new file variable
  `alpha/black-20`** — it arrives in the token layers through the
  pre-build re-extraction (001 rule). Design-sanctioned leftovers,
  enumerated as spec constants: the inactive cost-card fill
  (`#eae8e0` at 50%) and the thumb bevel shadows; the active
  cost-card's raw white builds as `bg/000`.
- **F5 — resolved (design decision 2026-08-28): the Sales calls chip
  ink is `orange/600` by intent** — the one chip off the 700 pattern
  stands as designed.
- **F6 — resolved (fixed 2026-08-28, with residuals): file hygiene.**
  Re-read post-fix: the rs block is renamed `price-scale`, and the xl
  active/highgrowth cards now mount `pricing-tag` instances like
  every other variant. Design confirmed the persona-image CROP/FILL
  variance is moot — **the exports carry the fixed crops** (the
  tiers are the truth). Residuals, no build impact: the rm block
  still reads `pricing-scale`, the rs carousel frame is still
  unnamed, and the xl hanging-tag pads still differ across personas
  (steady 4/12/8/12, siblings 4/12/4/12 — a fixed h32 box with
  centered content renders identically; built at the 011 tag grammar,
  4 top / 8 bottom).
- **F7 — resolved (fixed 2026-08-28): the rm and rs frames close.**
  Re-read from rendered bounds: the rm frame is 3744 = **117t**
  (footer 93t + 24t flush) and the rs frame 3360 = **70t** (footer
  49t + 21t flush). The section's §1 rows are unchanged; the Sources
  frame totals (115t · 69t) were the draft-day reads and this entry
  is the current record. rt/rd1/rd2 closed as drafted.
- **Note** — the rt and rm frame totals grew since 011's records (47t
  → 48t · 114t → 115t) with this section's design; the 011 records
  stand as the history of their day.
- **Note** — the slider's set carries no colored fill at `less` (the
  fill is width 0); the middle/more fills are the set's own
  blue/purple gradients, which match the active persona by
  construction. The section binds the fill hue to the persona, which
  coincides with the set at every designed state.
- **Build record, 2026-08-28.** Pre-build token re-extraction: zero
  drift across primitives, text styles, and effects; the new
  `alpha/black-20` file variable resolves to the standing semantic
  token's value (`rgba(0,0,0,0.2)`) — no token-file change. Every
  §1/§2 landmark, exposure run, and ornament cell re-verified from
  rendered bounds at all five anchors; every §3/§4/§5 interior
  (pads, styles, wrap boxes, chip hues/inks, slider anatomy and
  bound stops, card size materials, state dressing, tag set)
  re-read from the nodes. Four errata found at build, amended
  inline at their values: the keyword-chip radius steps (2 at
  rm/rs/rt/rd1 · 4 at rd2 — the draft's blanket radius-xs); the
  head's designed U+2028 break (built as an explicit two-line
  break — natural wrapping cannot reproduce it at rm); the
  active/highgrowth service-chip order (Reviews & Listings before
  Content in the mounted instances — *superseded the same day at
  build review, owner decision: one consolidated order across the
  personas, Content first as drafted; the file's swapped instances
  stay with design as hygiene*); and one copy residual with
  design — the highgrowth estimate reads unspaced `$1,000–$3,000`
  in the set where its siblings space the en dash; the §5 table's
  spaced copy is canonical and built. The slider glyph differs
  from IconArrowRight (13×10 edge-to-edge geometry vs the 24×24
  cut) and shipped as its own verbatim export (`IconSliderArrow`).
- **Build review, 2026-08-28 (owner).** Two direction fixes, amended
  at their values: the persona-card's active shadow paints over the
  hanging tag (§5 — the 011 pricing-card ::after construction), and
  the slider notch draws over the progress fill so it stays visible
  at `more` (§4 — the set's more-state layer order; the thumb covers
  it at `middle`). The service-chip order consolidated to one list
  (§5). A third note — ghost cards reading as missing at every band
  but 576 — was a dead-dev-server artifact of the review session
  (failed tier fetches on band resize), not a build defect: on a
  healthy server the ghost sliver measures 1.000t at 384/768/960/
  1344 and 0t at 576, exactly the file's design (the rs frame
  places card 2 at column 12, on the page edge).

## 10 · Acceptance criteria

At each of the five anchors and one arbitrary width per structural
slice (stretched and compressed), scrollbar forced on:

- [x] Every §1 landmark lands on its row (whole ticks, line-inclusive
      ±1px): the block box, the carousel top, the card boxes and image
      bands whole-tick at every audited width; the FAQ top sits 2t
      below the card-box end at every band; the strip origin holds
      t/2 (rm) / tick 5; the card gaps hold 1t. (Verified 2026-08-28,
      headless audit at 384 · 420 · 500 · 576 · 620 · 700 · 768 ·
      800 · 900 · 960 · 1050 · 1200 · 1344 · 1500: spans 29/13/10/9/7t,
      blocks 10×10 / 5×10 / 5×7t, cards 9.5/6/5t, boxes 16/11/8/7/5t,
      image bands 6/4/3/3/2t, gaps 1.000t, FAQ-top gap 2.000t, all
      within ±1px.)
- [x] The block's top hairline lies on the canonical row-line pixel
      (never doubling the page lattice); the slider (rm/rs) and CTA
      (rt/rd1) bottom edges sit flush on their tick lines; the §2
      staircase and ornament cells render per the map and nothing else
      is exposed over the section's rows; the exposed cells read
      through the inactive cards' translucent cost cards. (Verified
      2026-08-28: block top ≡ section top at every audited width;
      slider/CTA bottoms ≡ block bottom ±1px; the §2 map re-read
      cell-by-cell from the page Grid layers at build — runs 10–11 ·
      9–11 · 8–11 · 8–11 · 8–11, ornaments [11,73]sq · [9,33]○
      [11,38]● · [11,25]● · [11,23]● · [11,19]sq — and rendered
      through the 002 vocabulary; ghost translucency confirmed
      visually at all five anchors.)
- [x] Type is exact at the anchors per §3/§5 (styles, wrap boxes, the
      Extralight serif heads at 24/30 · 32/38 · 42/50) and wrap counts
      hold across each band's slices — the interiors ride the weights,
      so compressed slices zoom and stretched slices hold designed px
      with the slack in the anchored gaps; horizontal clearance
      against the exposed cells checked manually at the compressed
      slice widths (the harness gap, rules.md "Audits at rest").
      (Verified 2026-08-28: every style/wrap-box re-read from the
      nodes and restated per band on --ps-u; the head holds two lines
      at all fourteen audited widths; the block spans cols 0–5 clear
      of the cols 8–11 staircase at every band — the carousel cards
      paint over it by design; checked at 500/700/900/1200.)
- [x] The §6 machine: three states; slider drag/track-click/keys,
      strip swipe, and inactive-card click all commit the same state;
      the slider and strip never disagree (one owner); the strip
      translate is exactly k × (card + 1t) in ticks at every width;
      card 1/2/3 render steady/active/highgrowth with the §5 state
      dressing. (Verified 2026-08-28, headless behavior audit at 768:
      overlay clicks, ArrowLeft, track press, thumb drag, and swipe
      all committed the same k; translate −384/−768px exact at t=64;
      aria-valuetext and hue followed every change.)
- [x] Motion per §7: one snap clock (450ms on the slide ease); drags
      track the pointer with no transition; the outgoing shadow drops
      at slide start and the incoming shadow grows only after the
      strip lands; reduced motion renders every change state-to-state
      with all inputs working; a no-JS render is the settled k = 0
      section with the range input disabled. (Verified 2026-08-28:
      strip/thumb/progress transitions read 0.45s on the slide ease;
      live tracking through --sldr-f/--ps-drag-dx with data-dragging
      killing the transition; the active box's shadow transition
      carries the 0.45s delay, the inactive 0s; reduced-motion
      emulation read 0s durations with the keyboard still committing;
      the JS-disabled render served the disabled range at k = 0.)
- [x] Exactly **one** client island on the section; the CTA navigates
      to `PRICING_CHECKOUT_URL` in the same tab; `/pricing` and
      `/pricing-fixture` render the spliced page; the homepage routes
      and budgets are untouched; the pricing route's JS size recorded.
      (Verified 2026-08-28: one island — pricing-scale-island; both
      routes static in the production build; `/` unchanged at 111 kB
      first load; `/pricing` route JS 2 kB · 107 kB first load, up
      from 011's island-less 141 B — the island is the §6 machine.)
- [x] The slider is keyboard-operable with a visible focus ring and
      persona-name `aria-valuetext`; the card overlay buttons are
      focusable with accessible names; touch targets ≥ 44px for the
      slider's hit area (padding above the drawn control, not
      geometry). (Verified 2026-08-28: arrow keys on the native range
      commit k with aria-valuetext Steady/Active/High Growth; the
      ring rides :focus-visible through the row's :has() onto the
      thumb; overlay buttons carry "Show the … example" names; the
      row's pseudo pads the hit area to 44px wherever the drawn 18px
      row falls short.)
- [x] Zero TypeScript and lint errors; every value traces to a token,
      a named ramp style, or a §8 enumerated constant (no raw hexes;
      the new `alpha/black-20` variable arrives via the pre-build
      re-extraction; the F4-sanctioned leftovers — the inactive cost
      fill and thumb bevel — are enumerated constants per §8.4/§8.5).
      (Verified 2026-08-28: tsc and lint zero; the re-extraction ran
      with zero drift — alpha/black-20 resolves to the standing
      semantic token; --ps-cost-inactive, --sldr-track-bevel, and
      --sldr-thumb-bevel are the only enumerated non-token values.)
