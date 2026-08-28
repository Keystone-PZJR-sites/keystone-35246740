# Spec 008 — Engine accordion: the spring reflow and the small-band carousel

**Status:** Approved 2026-08-26 (draft same day; all §9 flags resolved
same day; file fixes re-read post-fix; pre-approval tier-cut amendment
in §5/§9/§10). Built and verified the same day — §10 checked with
measured evidence except the accessibility box, held open on the
title-ink contrast flag (§9 F9).
**Depends on:** spec 001 (tokens, fonts) · spec 002 (grid engine, exposure
vocabulary, band classes) · spec 003 (button-ghost + sizes, the icon sheet)
· spec 005 (nav — mounted on the QA surfaces; the subitem dot-morph hover
is promoted here at its second consumer) · spec 007 (portfolio — the
section above; the inactive-card treatment and the filter replacement
precedent are reused)
**Sources:** fresh MCP reads 2026-08-26 of the engine nodes inside the five
anchor frames — sections `230:13351` (384) · `359:29940` (576) ·
`142:4430` (768) · `334:21587` (960) · `135:1354` (1344); headers
`230:13353` · `359:29941` · `142:4431` · `334:21589` · `135:1356`;
button-bars `588:18113` · `503:25313` · `503:25290` · `334:21592` ·
`135:1359`; the **`engine` component set `104:10164`** (engine ×
breakpoint, 21 variants — §9 F1), the **`engine-card-collapsed` set
`139:3273`** (sizes xl/md/sm), and the **`engine-circle` set `139:3276`**
(five colors); the page Grid layers `509:5403` · `505:15527` · `505:13888`
· `505:12908` · `505:10884` (per-cell stroke visibility, engine rows); the
25 export frames on the Photos page (`592:18568`–`592:18753`) — all in
`ks-MarketingSite`. Every landmark was verified against rendered bounds
through the console bridge (section tops, block ticks, pill anchors, the
exposure cells). Motion intent (the spring reflow behavior guidance, the
pill hover, the sub-768 carousel-with-breadcrumb directive) supplied
2026-08-26 with the spec request; values specced in §7. Engine image
exports supplied 2026-08-26 (25 files, WebP only, five width tiers;
inventoried in §5).

The third homepage section (Phase 5, top-down) and the rebuild's first
**stateful reflow**: five cards in one row, one expanded, four collapsed
into pills; clicking a pill redistributes the row's width in a single
spring-driven layout change. Below 768 the same five cards present as a
swipe carousel with a breadcrumb. Every geometry fact below was read off
the anchor nodes at writing time; nothing is scaled from a neighboring
anchor.

---

## 1 · Section anatomy — tick totals per band

The section owns the page rows from the portfolio's last row to the
testimonial strip's first. Its top lands exactly on the portfolio total at
every anchor (45t/31t/22t/22t/21t page ticks, verified from rendered
bounds); all three blocks are whole-tick.

| | rm (384) | rs (576) | rt (768) | rd1 (960) | rd2 (1344) |
|---|---|---|---|---|---|
| section top (page ticks) | 45t (1440) | 31t (1488) | 22t (1408) | 22t (1760) | 21t (2352) |
| header | 4t (128) | 3t (144) | 2t (128) | 2t (160) | 2t (224) |
| engine row | 14t (448) | 8t (384) | 5t (320) | 5t (400) | 4t (448) |
| button-bar | 3t (96) | 2t (96) | 2t (128) | 2t (160) | 2t (224) |
| **section total** | **21t** | **13t** | **9t** | **9t** | **8t** |

- Left inset: t/2 at rm (16 at the anchor, tick-riding — the 007 §9 R23
  precedent is normative); 1t at rs and up. Same rule as the portfolio.
- **Structural switch at 768.** At rt/rd1/rd2 the engine row is the
  **accordion**: a 10t-wide row (1t inset both sides — cols 1–11) of one
  expanded card (6t) and four collapsed pills (1t each), butted with **no
  gap**. Below 768 it is the **carousel**: a clipped window from the left
  inset to the right frame edge; the row block is card + a 1t breadcrumb
  row (rm: 13t card + 1t · rs: 7t card + 1t). One DOM, band-gated order
  (v5 §7.5).
- Header text is vertically centered in its block at every anchor
  (rendered: 34/60/34 · 38/68/38 · 30/68/30 · 42/76/42 · 62/100/62); the
  bar's buttons are centered in the bar block (30/36/30 · 30/36/30 ·
  44/40/44 · 60/40/60 · 88/48/88).

## 2 · Exposure map

Per-cell stroke visibility on the five page Grid layers, read through the
console bridge at writing time. The field continues the right-side rail
the portfolio's §2 established (cell presence is not paint — 007 §9 R13).
Zero-based section-local ticks (cols × rows):

| band | plain cells | ornament cells |
|---|---|---|
| rm | 11 × 0–3 · 9–11 × 4–20 | filled circle 11 × 0 |
| rs | 9–11 × 0–12 | filled circle 11 × 0 · outlined circle 9 × 12 |
| rt | 8–11 × 0–8 | filled circle 11 × 0 · outlined circle 9 × 8 |
| rd1 | 8–11 × 0–8 (two strays fixed 2026-08-26 — §9 F7) | filled circle 11 × 0 · outlined circle 8 × 8 |
| rd2 | 8–11 × 0–7 | filled circle 11 × 0 · outlined circle 9 × 6 |

- The **filled circle at 11 × 0** is a new shade of the f-cell ornament
  vocabulary: `bg/200` fill **with `radius-full`** (the portfolio's 11 × 0
  was a square fill; the engine's is round — rendered truth, both read the
  same day). The outlined circles are the established outline-only kind.
- The rm rail narrows to col 11 alone over the header rows and widens to
  9–11 from the engine row down. (At first read rd1 carried two extra
  painted cells at 7 × 0 and 0 × 1; design fixed them the same day —
  strokes toggled invisible, re-read confirms they no longer paint;
  §9 F7.)
- The engine row and header float on the content layer; the expanded card
  and pills are opaque and cover the cells they cross.

*Amended 2026-08-26 (§9 F15):* the section also draws a **designed top
rule** the per-cell sweep could not see: a **top-only 1px `border/000`
stroke on the section frame itself** (stroke-aligned center — the
±0.5px artifact class; the intended value is 1px on the section's first
row line). The deliberately-sized frames span **11t** — 352 (rm) · 704
(rt) · 1233 (rd2, line-inclusive, ending ON the col-11 line where the
filled circle's cell begins); the rs/rd1 frame widths are stale rt/rd2
copies overflowing the page. The distinction never paints: at every
band the rail's row-0 cell tops continue the same row line to col 12
(shared pixels, v5 §4), so the visible line is full width regardless.
Built as **11t + 1px at every band**, drawn by the section,
`aria-hidden`.

## 3 · Header

Ink `text/100`, PP Kyoto. **The copy differs by band — deliberate**
(§9 F5):
rm/rs/rt — **"Then every piece of your marketing comes together."**
(natural 2-line wrap at rm; a designed break after "your" at rs/rt);
rd1/rd2 — **"Then your marketing starts working together."** (natural
2-line wrap). This is an `<h2>`.

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| style | `display-serif/xs/Extralight` 24/30 | `xs+/Extralight` 28/34 | `xs+/Extralight` 28/34 | `sm/Extralight` 32/38 | `md+/Thin` 42/50 |
| tracking | −2% | −2% | −2% | −2% | **−3%** |
| text box | 304 (9.5t) | 384 (8t) | 448 (7t) | 480 (6t) | 672 (6t) |

Type walks 24→28 across the base band, holds 28 across rs (shared
anchors), interpolates 28→32 across rt and 32→42 across rd1. Weight and
tracking are band constants: Extralight/−2% through rd1, switching to
Thin/−3% at the 1344 gate — the same ladder as the portfolio header
(007 §3). The copy switch is a designed width-fitting choice (§9 F5) and
rides the 960 band gate in one DOM, like the hero's H1 swap (006 §9 F8).

## 4 · The engine card — chrome, states, colors, copy

Component set `engine` (104:10164): engine (visibility · ads · brand ·
reception · engagement) × breakpoint. The five engines always render in
**canonical order** — Visibility · Ads · Brand · Reception · Engagement —
with the expanded card in its own sequence position (the nav's canonical
engine order, spec 005 §5). Visibility is expanded at rest (every anchor
frame instances `engine=visibility`).

**Engine palette** — expanded fill and dot share one variable per engine;
title and body inks are that hue's /100 and /800:

| engine | fill + dot (/400) | title ink (/100) | body ink (/800) |
|---|---|---|---|
| Visibility | `orange/400` #f57e56 | #fff5ec | #3c1618 |
| Ads | `yellow/400` #f5b83d | #fdf5e3 | #3a2a0e |
| Brand | `pink/400` #f38bb0 | #fceef2 | #3d1324 |
| Reception | `purple/400` #9c69ea | #f8f3ff | #2f0d3f |
| Engagement | `blue/400` #3393ff | #edf8ff | #0f223d |

(At first read the 384 reception/engagement variants carried each
other's fills; design fixed the swap the same day — re-read clean, every
variant now binds the canon above — §9 F2.)

*Amended 2026-08-26 (interim design direction at build review): the
title ink ships plain white (#ffffff, `base-white`) at every band and
state, superseding the table's per-hue /100 inks for now. The §9 F9
title-contrast question stays open — accessibility of this section is
deferred by the design owner's direction; the /100 column above remains
the file's canon until it is resolved.*

**The expanded card** (accordion bands) — engine-color fill, two interior
columns laid out at the card's full expanded size (text 3t · image 3t):

| | rt | rd1 | rd2 |
|---|---|---|---|
| card | 384×320 (6t×5t) | 480×400 (6t×5t) | 672×448 (6t×4t) |
| corner radius | `radius-2xl` 16, **left corners only** | `radius-3xl` 20, left only | `radius-4xl` 24, left only |
| text column | 192 (3t), pl 20 · pt 16 · pr 24 · pb 20 | 240 (3t), pl 20 · pt 20 · pr 32 · pb 20 | 336 (3t), pl 24 · pt 24 · pr 48 · pb 24 |
| title | `text/2xl/Light` 24/32 | `display-sans/xs/Light` 32/38 | `display-sans/sm/Light` 36/42 |
| body | `text/sm/Light` 14/18 | `text/lg/Light` 18/26 | `text/xl/Light` 20/26 |
| image column | 192×320 (3t) | 240×400 (3t) | 336×448 (3t) |

Title top-left, body bottom-left (column justify-between), both −1%
tracking, title never wraps. The image fills its column cover-fit; the
engine wash is **baked into the exports** (§5) — no wash layer, no blend
mode in code. Title type interpolates 24→32 across rt and 32→36 across
rd1; body 14→18 across rt and 18→20 across rd1; weight/tracking are
constants (Light, −1%).

**The collapsed pill** — set `engine-card-collapsed` (139:3273), material
sizes sm/md/xl mounted per band (rt sm · rd1 md · rd2 xl):

| | sm (rt) | md (rd1) | xl (rd2) |
|---|---|---|---|
| pill | 64×320 (1t) | 80×400 (1t) | 112×448 (1t) |
| chrome | fill `lightgray/200` #f0eee6 (the `bg/200` value) · 1px `border/000` hairline · `radius-full` capsule | same | same |
| padding | px 12 · py 24 | px 24 · py 40 | px 24 · py 40 |
| rotated label | `text/xl/Light` 20/26 | `text/2xl/Light` 24/32 | `display-sans/2xs/Light` 28/36 |
| dot | 12 | 16 | 18 |

The label is the engine name, ink `text/300`, rotated 90° clockwise
(reads top-to-bottom), horizontally centered, **anchored at the top
padding edge** (rendered: all four labels start at the same y). The dot —
the `engine-circle`, a plain circle in the engine's /400 — sits
bottom-center at the bottom padding. Per the CSS-dot precedent (003 §6 /
004 §7) it is built as CSS with a token fill, never an exported file.
Pill label type interpolates 20→24 across rt and 24→28 across rd1. (The
file draws the pill hairline stroke-aligned center — the ±0.5px artifact
class; the intended value is the 1px hairline.) *Amended 2026-08-26
(build erratum, flagged by design — §9 F12): butted boxes each drew
their own ring, doubling every pill boundary into two hairlines. The
  cards now render line-inclusive (+1px with a −1px overlap — the v5 §5 /
  007 §9 R21 convention adapted to the shared row): adjacent hairlines
  share one pixel, every boundary lands on its lattice line, and the row
  is 10t + 1px so the last ring lands on the col-11 line. Further
  amended the same day (§9 F14): the active card always paints on top —
  its edges are clean color, and a neighboring pill's shared-pixel
  hairline tucks underneath it.*

**Copy** — one title + one body per engine, identical at every breakpoint
variant. Apostrophes ship **curly** everywhere (content decision
2026-08-26 — §9 F8; the file still carries a straight quote in the
Visibility body):

- **Visibility** — "A profile that ranks in Maps and content that keeps
  coming. When someone nearby searches, on Google or with AI, you’re the
  one they find."
- **Ads** — "Campaigns built from your own media, landing on a site built
  to convert. Every lead answered, every dollar tracked. Ads that pay for
  themselves."
- **Brand** — "One look and one voice, everywhere customers check. From
  your website to reviews and social; so when they’re comparing, it’s not
  close."
- **Reception** — "Webchat, texts, and calls answered at any hour. Every
  interaction tied to one contact, so the conversation always picks up
  wherever it left off."
- **Engagement** — "Newsletters, offers, and nudges on a steady rhythm.
  Old leads worked and quiet customers brought back. Nobody on your list
  goes untouched."

## 5 · The small-band carousel, and the image assets

**Below 768 the accordion becomes a swipe carousel with a breadcrumb.**
All five cards render in the expanded layout; one is active, the rest wear
the inactive treatment. The window clips at the left inset and the right
frame edge (`overflow` clipped in the file — the designed behavior; the
portfolio's visible-crossing decision does not carry over).

*Amended 2026-08-26 (design direction at build QA — §9 F16):* the left
clip moves to the **viewport edge**; the window box and every resting
value are unchanged. The static anchors cannot express the swipe: the
frame's inset clip guillotined the outgoing card mid-word at the inset
line, floating short of the viewport. Directed: the card stays visible
across the inset strip and exits at the true edge. Built as a
clip-plane extension only (a negative `clip-path` left inset on the
window), never a wider box — the row, track, breadcrumb, and the
island's arithmetic are untouched. The right clip stays on the frame
edge.

| | rm | rs |
|---|---|---|
| window | 368 wide from x 16 (t/2) to the frame edge | 528 wide from x 48 (1t) to the frame edge |
| card | 304×416 (13t tall) | 432×336 (9t×7t) |
| card layout | **vertical**: text block 304×160 (pl 16 · pt 12 · pr 32 · pb 16) over image 304×256 | horizontal, as §4: text 216 (pl 20 · pt 16 · pr 24 · pb 20) · image 216×336 |
| corner radius | `radius-2xl` 16, **all four corners** | `radius-2xl` 16, left corners only |
| title / body | `text/2xl/Light` 24/32 · `text/sm/Light` 14/18 | same |
| gap / pitch | 32 (1t) / 336 | 48 (1t) / 480 |
| at-rest visible | active + 32px sliver of the next | active + 48px sliver |

At the last position (Engagement) no sliver follows — the designed end
state (the engagement variant draws no neighbor; §9 F2).
| breadcrumb row | 1t (32) below the card | 1t (48) below the card |

(The rm image frame is drawn 270 tall and clipped by the 416 card to a
visible 304×256; the export is cut at 2× the visible slot — the 270 is a
file artifact with no build consequence.)

*Amended 2026-08-26 (build erratum, flagged by design — §9 F12): the
carousel cards render line-inclusive too (+1px, the track gap giving
the pixel back — pitches unchanged), so the active card's right edge
resolves ON the col-10 hairline instead of rasterizing a sub-pixel seam
beside it at fractional-tick widths.*

- **Breadcrumb**: five stops under the active card, horizontally centered
  (72 wide), bottom-aligned in its 1t row. The active stop is a 24×6
  `radius-full` pill in the **active engine's /400**; inactive stops are
  6px `bg/500` #d6d2c2 circles; gap 6. (A second, opacity-0 breadcrumb
  with 8px dots sits under the inactive cards in the file — hygiene, not
  built.)
- **Inactive treatment**: shell fill rgba(234,232,224,0.5) — exactly the
  portfolio's inactive fill; the engine **aliases
  `--pf-card-inactive-bg`** (alias, never fork). Title and body ink
  `bg/600` #cbc5b4. The file paints the inactive image
  `mix-blend-luminosity` at 70% — as in 007 §4 the rules forbid
  transcribing it (the shell fill transitions with the state); build a
  CSS filter + opacity replacement (`--eng-inactive-filter` /
  `--eng-inactive-opacity`, starting `grayscale(1) sepia(0.08)
  brightness(0.99)` at 0.7), visually tuned at build QA against the
  rendered file treatment (the 007 canvas-grid-search method) and
  recorded here as an amendment. *Amended 2026-08-26 (build QA): tuned
  values `grayscale(1) sepia(0.12) brightness(0.975)` at opacity 0.7.
  Tuned quantitatively: a canvas grid search against the exact
  luminosity composite (the image luminosity-blended at 70% over the
  shell backdrop), averaged over all five engine exports; the tuned
  values minimize the mean RGB delta at 1.49/255 (the draft constants
  measured 1.86/255).*
- The inactive card's interior layout was normalized in the file
  2026-08-26 (§9 F4): its text pads now match the active card's
  (pl 16 · pt 12 · pr 32 · pb 16, re-read clean). The build uses **one
  layout with a chrome-only state morph** (fill, ink, filter), so
  activation never moves text; the inactive mock's residual top-grouped
  hug (164 vs the active's fixed 160 block) is a file artifact the
  single layout supersedes.

**Assets.** 25 files, WebP only, supplied 2026-08-26 (source:
`~/Dropbox/01-work/00-projects/01-keystone/03-website/03-newsite/engines/export`),
named `{01–05}-{engine}-{tier}.webp`, ~1.0 MB total. Commit verbatim under
`public/media/engines/`; register in `design-system/v2/media.ts`
(`ENGINE_TIERS` + the five-engine list) mirroring the portfolio registry
shape. Each export is exactly **2× its band's visible image slot**, cut
from the Photos-page export frames; the engine wash is **baked in** — one
color per engine (visibility #f98f04 · ads #f9bc04 · brand #eeb3fb ·
reception #b869ea · engagement #69c3ea, at 8–10% multiply). The supplied
exports are the canon; the build adds no wash or overlay layer (confirmed
2026-08-26 — §9 F3). The 1344 tier serves from 1152 (the 007 decision
pattern — no mid-rd1 cut):

| tier | export size | serves container | density across the slice |
|---|---|---|---|
| 384 | 608×512 | < 576 | 2.0× → 1.34× |
| 576 | 432×672 | 576–767 | 2.0× → 1.5× |
| 768 | 384×640 | 768–959 | 2.0× → 1.6× |
| 960 | 480×800 | 960–1151 | 2.0× → 1.67× |
| 1344 | 672×896 | ≥ 1152 | 2.33× → 2.0×, easing up as the zoom rides |

*Amended 2026-08-26 (pre-approval — §9): the `<source>` cuts follow the
nearest-anchor structural gates (470 · 665 · 860 · 1130, spec 002.r1 §6),
superseding the table's "serves container" column and the 1152 line — the
1344 tier serves from the 1130 gate, matching the built portfolio tiers
(007 §9 R25). Anything else would show a neighboring band's crop across
each compressed slice — the defect R25 fixed. Densities shift only at the
slice bottoms (each tier now also serves its design's stretched slice,
e.g. the 576 tier from 470 at ≈2.45×); the worst-case soft ends at the
band tops are unchanged, and the known remedy — re-cut a tier at a higher
width — applies if any slot reads soft on device.*

The tiers are **art direction, not resolution steps** — the crops and
aspects differ per band — so the image renders as `<picture>` with one
media-gated `<source>` per tier, largest-first, the 384 file as the
`<img>` fallback (the 006/007 pattern; the scrollbar-lag caveat is
accepted as density-only). `decoding="async"`, explicit width/height,
empty alt (ambient photography; the engine name is the card's own text).
Loading: the expanded card's image loads eagerly; the other four
lazy-load and are **decode-primed at idle** once the section first enters
the viewport, so an expansion or slide never reveals unpainted pixels.

## 6 · Button-bar

The spec 003 ghost-with-icon buttons, centered in the bar block — the
same three actions as the portfolio's bar (007 §6), in the same inks:
**"Our work"** (`icons/projects`, `color/brown/600`) · **"Our approach"**
(`icons/approach`, `color/teal/600`) · **"Case studies"**
(`icons/case-studies`, `text/200`). At rm the bar carries the first two
only.

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| buttons | 2 | 3 | 3 | 3 | 3 |
| ghost size | sm (36) | sm (36) | md (40) | md (40) | xl (48) |
| icon px | 16 | 16 | 18 | 18 | 20 |
| gap | 8 | 4 | 8 | 16 (fixed 2026-08-26 — §9 F6) | 32 |

All three are real links to **`/our-work`** (carrying 007 §9 R7's
destinations: "Our approach" and "Case studies" point there until their
own routes ship). (The rm first button's icon layer keeps a stale
`icons/case-studies` name over the projects glyph — the known
stale-layer-name artifact; the rendered glyph is correct.)

*Erratum 2026-08-28 (found by the 013 §7.3 clearance assertion, its
first run): the bar's material row held only ~0.2t of designed
clearance against the exposed east cells, and the compressed slices
ate it — at 700 the md row ran 0.18t into the col-8 cells (the
four-units defect, the 004/011 erratum class; it hid in the harness's
vertical-only gap). Fixed in engine.css: the bar mount's button
geometry — heights, pads, icon, type, gaps — rides the weight sum, so
every designed width renders byte-identically and a compressed slice
zooms the row with its band's design; the 003 primitive itself stays
material. 013 §9 carries the build record.*

## 7 · Motion

Intent supplied 2026-08-26 with the spec request; values below are the
spec. One new grammar — **the accordion spring** — born in the component
token layer (promotes to `tokens/motion.css` at its second consumer). The
nav's **dot morph** gains its second consumer here and **promotes to
`tokens/motion.css`** (values unchanged; `--knav-*` names become aliases —
the 004→005 promotion pattern exactly).

### 7.1 · The spring reflow — one animated layout

Expanding a card is **a single redistribution of width across the row**,
never per-card animations that could drift apart:

- Each card carries an expansion fraction f ∈ [0,1]; exactly one card
  targets 1, the rest 0. A card's width derives from its fraction —
  collapsed 1t → expanded 6t — and the row renders **normalized shares**,
  so the five widths always sum to the row's exact width, mid-flight and
  at rest, including interrupted transitions. Nothing overlaps; the row
  fills its container edge to edge at every frame.
- The fractions are driven by a **physical spring, not an easing curve**:
  `--eng-spring-stiffness` 210 · `--eng-spring-damping` 24 ·
  `--eng-spring-mass` 1 (ζ ≈ 0.83 — starts gently, peak velocity near
  mid-travel, decelerates hard, overshoots ≈ 1% and relaxes back; settles
  in ≈ 400ms). Rest threshold `--eng-spring-rest` 0.001 (fraction and
  velocity). The overshoot is felt, not watched: when in doubt, tune
  stiffer. *Amended 2026-08-26 (design direction at build review —
  §9 F11): no bounce — the spring is critically damped and stiffer:
  stiffness **420** · damping **41** · mass 1 (ζ ≈ 1.0; tighter and
  snappier, zero overshoot, visibly settled ≈ 250ms). The ≈1%-overshoot
  language above is superseded; the spring remains a retargetable
  physical spring with preserved velocity.*
- **Interruption retargets.** Clicking a new card mid-flight re-aims the
  running springs from their current positions **and velocities**;
  nothing restarts, snaps, or reverses discontinuously.
- **Implementation note (decision, approval covers it):** a retargetable
  spring with preserved velocity cannot be expressed as a CSS transition
  or an existing GSAP ease. The island integrates the spring per frame
  and writes one custom property per card; this is the sanctioned
  exception to the "no hand-rolled rAF animation" rule, scoped to this
  grammar. Audits stay at rest (the grid law): mid-flight widths are
  transiently fractional-tick by design.

**Content is revealed, not resized.** Each card's interior — title, body,
image — is laid out once at the band's full expanded size (§4) and
clipped by the card's edges; the leading edge anchors the content, the
trailing edge sweeps across it. Text and images never scale, squish, or
reflow mid-transition. The pill layer (rotated label + dot) is a second
interior layer anchored to the leading edge at the collapsed width. The
card's fill interpolates collapsed chrome ⇄ engine /400, and the corner
radii relax capsule ⇄ the band's expanded radii, both riding the same
fraction.

### 7.2 · Crossfades ride the fraction

Every fade is a function of the card's own fraction f — one driver, so
the pieces can never desynchronize, and interrupts inherit correct
mid-states:

| layer | ramp |
|---|---|
| pill label + dot | opacity 1 → 0 over f = 0 → `--eng-pill-fade-end` (0.35) |
| expanded content (title, body, image) | opacity 0 → 1 over f = `--eng-content-fade-start` (0.25) → `--eng-content-fade-end` (0.75) |
| card fill, corner radii | linear with f |

Opening and closing cards mid-exchange are both partially visible — the
handoff moment the intent asks for; a closing card's body dims as its
edge slices it away, while the opening card's content reaches full
strength (f ≥ 0.75) well before its width settles.

### 7.3 · Pill hover and focus — the dot, not the row

Hovering a collapsed pill moves nothing: the pill's dot runs the **dot
morph** — circle → square with the 180° rotation, on the promoted tokens
(in 450ms ease-out, out 600ms ease-in-out; resting radius authored 50%) —
exactly the nav subitem's grammar. Keyboard focus (`:focus-visible`)
triggers the same morph plus the two-layer ring (`0 0 0 2px bg/100, 0 0 0
4px bg/500` — the grid-button recipe, aliased). The expanded card has no
hover state. Hover rules sit under hover-capable media. Clicking the
expanded card does nothing.

### 7.4 · The carousel (rm/rs)

The same spring drives the track: navigation retargets the track's spring
to the destination snap (one card per position, pitch per §5), so
interrupted slides retarget from current position and velocity like the
accordion. Activation chrome (shell fill, inks, the inactive filter, the
breadcrumb swap) transitions with the slide on the drawer tokens
(`--motion-drawer-duration`/`--motion-drawer-ease` — alias, never fork).
*Amended 2026-08-26 (design direction at build review — §9 F13): the
250ms drawer duration read as instant on the full-card swap — the
activation chrome now fades in both directions on its own
`--eng-chrome-fade-dur` (450ms) with the drawer ease-out; the ease stays
aliased, never forked.*

- **Drag**: the track follows the finger 1:1; past either end it resists
  at `--eng-overscroll-resist` (0.3) and springs back. Release snaps to
  the nearest position, biased one position in the fling direction when
  release speed exceeds `--eng-fling-speed` (500 px/s), handing the
  release velocity to the spring.
- **Breadcrumb stops are real buttons** ("Show Visibility" …); pressing
  one retargets the track to that engine. Tapping a visible inactive
  card does the same. No auto-advance, no timers — the carousel only
  moves by hand (no hero-pause protocol is needed; the section never
  moves on its own).
- Bounded, no loop: five positions, ends clamp (with the overscroll
  spring under drag).

### 7.5 · Reduced motion

`prefers-reduced-motion: reduce` (or the dev toggle): the spring never
runs — expansion switches state directly (same end state, no travel, no
overshoot); the carousel snaps; the dot morph and crossfades render
state-to-state. A no-JS render shows the settled state, Visibility
expanded.

## 8 · Deliverable — files, constants, semantics

1. **Images** — the 25 WebP exports (§5), committed verbatim to
   `public/media/engines/`; registry entries in `v2/media.ts`.
2. **Section** `design-system/v2/sections/engine.tsx` + `engine.css`; one
   client island (the row: the spring, the shares, the carousel track,
   drag, and the decode priming). Header and button-bar are
   server-rendered. Band detection by container measurement
   (ResizeObserver) — never `matchMedia`; the island reads its constants
   from computed style.
3. **Promotion** — the dot morph moves to `tokens/motion.css`
   (`--motion-dot-morph-dur` 450ms · `--motion-dot-morph-out-dur` 600ms ·
   `--motion-dot-morph-out-ease` · `--motion-dot-rotation` 180deg, values
   unchanged); `--knav-dot-*` become aliases. The accordion-spring
   constants are born in the component layer and promote at their second
   consumer.
4. **Component-layer constants** (`v2/tokens/component.css`, per band only
   where used, `--eng-` prefix): the spring (stiffness 210 · damping 24 —
   *amended 2026-08-26: 420 · 41, critically damped, §9 F11* ·
   mass 1 · rest 0.001), the ramps (pill-fade-end 0.35 ·
   content-fade-start 0.25 · content-fade-end 0.75), the carousel
   (overscroll-resist 0.3 · fling-speed 500 · *chrome-fade-dur 450ms,
   added 2026-08-26 — §9 F13*), the inactive treatment
   (`--eng-card-inactive-bg: var(--pf-card-inactive-bg)` ·
   `--eng-inactive-filter` · `--eng-inactive-opacity` 0.7, tuned at build
   QA), and the §4/§5 material facts the token layers do not carry (text
   and image column widths, interior paddings, the rm text-block height
   160, breadcrumb stop sizes 24×6/6 and gap 6, pill label anchor pads).
   Everything else traces to existing tokens (engine /400 · /100 · /800
   variables, `lightgray/200`, `border/000`, `text/300`, `bg/500`,
   `bg/600`, radius-2xl/3xl/4xl/full, the spacing scale).
5. **Semantics.** The section is a labeled region under `<main>`; the
   header is an `<h2>`. The five cards are an `<ul>`; each card is a real
   `<button>` (its accessible name is the engine title) carrying
   `aria-expanded`, with the body copy associated to it as its panel —
   keyboard focusable, visible focus per §7.3, expanded state exposed to
   the tree. Clicking the expanded card is a no-op. At rm/rs the
   breadcrumb stops are labeled buttons; the track is not a focus trap
   and emits no clones. The images carry empty alts; the lattice chrome
   is `aria-hidden`.
6. **QA surfaces.** A permanent, noindexed **`/engine`** dev page — the
   section beneath the mounted nav at all bands, with a state readout,
   an interrupt-storm control (rapid re-targeting), and the
   reduced-motion toggle. The page joins run on **`/home-fixture`**: the
   engine placeholder is replaced by the real section under the
   portfolio; the testimonial placeholder stays until spec 009.

## 9 · Resolutions record

Draft-day record, 2026-08-26. All eight flags were resolved by design the
same day; file fixes were re-read from the nodes after they shipped.

- **F1 — the 576 breakpoint has one variant: derivation sanctioned**
  (design decision 2026-08-26). The set carries `engine=visibility,
  breakpoint=576` only; the other four engines derive from that
  variant's pattern with the §4 palette, copy, and images swapped in —
  the derived-states law (004 §5). No new 576 variants are drawn.
- **F2 — the 384 reception/engagement swap: fixed in the file.** At
  first read `engine=reception, breakpoint=384` bound `blue/400` with a
  root gap of 30 and `engine=engagement, breakpoint=384` bound
  `purple/400`. Design fixed the swap and the gap; re-read clean —
  reception binds `purple/400` [4:65] with gap 32 and an inactive
  neighbor, engagement binds `blue/400` [4:73]. The engagement variant's
  **missing neighbor is designed**: it is the last carousel position, so
  nothing follows it (§5). Residual observed at re-read, hygiene only:
  the rebuilt reception variant's neighbor mock carries Ads copy where
  canonical order puts Engagement next — the build renders all five
  cards from canonical order and never transcribes neighbor mocks.
- **F3 — washes are baked into the exports** (confirmed 2026-08-26): the
  build adds no wash or overlay layer; the supplied export pixels are
  the canon (one wash per engine, per the Photos-page export frames).
  The in-set "image 70" layers' per-band inconsistencies are file
  hygiene with no build consequence.
- **F4 — the 384 inactive card layout: fixed in the file.** The inactive
  text block now carries the active card's pads (pl 16 · pt 12 · pr 32 ·
  pb 16; re-read clean). The build uses one layout with a chrome-only
  state morph (§5); the mock's residual top-grouped hug is superseded.
- **F5 — the header copy switch is deliberate** (design decision
  2026-08-26): "Then every piece of your marketing comes together." at
  rm/rs/rt, "Then your marketing starts working together." at rd1/rd2 —
  a designed width-fitting choice; the swap rides the 960 band gate in
  one DOM (§3).
- **F6 — the rd1 bar gap: fixed in the file.** Both sections' rd1 bars
  now read 16 (engine bar re-read 16; the portfolio bar verified
  unchanged at 16). §6 carries the post-fix value.
- **F7 — the rd1 stray cells: fixed in the file.** The painted cells at
  7 × 0 and 0 × 1 (Grid children `505:13184` / `505:13188`) had their
  strokes toggled invisible — invisible in Figma means not painted
  (007 §9 R14). Re-read confirms; the rd1 rail is 8–11 uniformly (§2).
- **F8 — apostrophes ship curly** (content decision 2026-08-26): all
  copy renders curly apostrophes as literal Unicode. The Visibility body
  still carries a straight quote in the file at re-read — the spec's §4
  transcription is the normalized canon; file normalization is
  content-side hygiene, not a build gate.
- **Hygiene, no build consequence** (noted, not flagged): the hidden
  120×120 "Rectangle 90" inside the expanded text columns; the opacity-0
  duplicate breadcrumb (8px dots) under the inactive carousel cards; the
  rm image frame drawn 270 tall under a 256 clip; the section frames'
  stale hug widths (352 at rm, 1233 at rd1/rd2); the rm bar's stale icon
  layer name; the rs/rt header frames' nested "portfolio-header" naming.

Build-QA flags, 2026-08-26 (open — awaiting design decision):

- **F9 — title-ink contrast (open).** Measured at build QA: the /100
  title inks read below the WCAG AA large-text 3:1 floor on four of
  the five /400 fills — visibility 2.44 · ads 1.64 · brand 2.04 ·
  engagement 2.88 (reception passes at 3.42). Body inks pass everywhere
  (4.5–7.78) and the pill label passes (5.9). The pairs are the
  canonical palette bindings (§4, re-verified from the set at build),
  so the build renders the canon and the §10 accessibility box stays
  unchecked until design resolves the pairs or records acceptance.
  The engine name is also each card's accessible button name, so the
  low-contrast render is not the only path to the information.
  Addendum, same day: the titles ship plain white as an interim design
  direction (§4 amendment) — a visual choice, not the contrast
  resolution; white on the /400 fills measures 2.63 · 1.78 · 2.30 ·
  3.72 · 3.11 (reception and engagement clear 3:1, the rest do not),
  so this flag stays open and section accessibility is deferred by the
  design owner.
- **F11 — the spring bounces (design direction, 2026-08-26).** The
  approved 210/24 pair (ζ ≈ 0.83, ≈1% overshoot) read as bounce on the
  real row; design directed tighter/snappier with no bounce. Resolved:
  critically damped 420/41 (ζ ≈ 1.0), zero overshoot, visibly settled
  ≈250ms; §7.1/§8.4/§10 carry dated amendments. Retargeting with
  preserved velocity is unchanged.
- **F12 — card edges off their hairlines (build erratum, flagged by
  design 2026-08-26).** Two symptoms, one cause: the accordion's butted
  boxes each drew their own 1px ring (doubled boundary lines, pills
  reading off-grid), and the rm active card's right edge sat adjacent
  to the col-10 line, rasterizing a sub-pixel seam at fractional-tick
  widths. Resolved by the line-inclusive convention (v5 §5 / 007 §9
  R21): all engine cards size +1px — the accordion overlaps −1px so
  boundary hairlines share one pixel and land on the lattice lines
  (the ring rides a raised overlay so a neighbor's opaque fill never
  swallows the shared pixel; the row is 10t + 1px); the carousel's
  track gap gives the pixel back, pitches unchanged. The width shares
  move from flex-grow normalization to the island's explicit
  normalized write (`--_w`, Σ ≡ 10) — the edge-to-edge invariant holds
  by the same construction. §4/§5 amended. Follow-up erratum, same
  day: the first cut left the interior at its designed 6t (rs: 9t)
  inside the +1px box, so one pixel of the card's own /400 fill showed
  at the image's trailing edge; the image column now flex-fills the
  line-inclusive interior (its designed 3t/4.5t plus the shared
  pixel), and the interior spans the full box.
- **F13 — activation chrome read as instant (design direction,
  2026-08-26).** The §7.4 drawer-duration choice (250ms) read as an
  instant swap on the full card; design directed a visible fade with
  an ease-out. Resolved: `--eng-chrome-fade-dur` 450ms on the drawer
  ease-out (aliased), both directions — card fill, inks, the inactive
  filter, and the breadcrumb swap. §7.4/§8.4 amended.
- **F14 — the active card paints on top (design direction,
  2026-08-26).** After F12's shared-pixel rings, a pill's hairline
  could paint across the active card's colored edge (the ring overlay
  sat above sibling fills), reading as the pill overlapping the card.
  Resolved: every card is its own stacking context and the active card
  raises above the pills — its edges are always clean color; between
  two pills the later sibling's ring repaints the shared pixel in the
  same color, so the single boundary hairline stands without any
  overlay. §4 amended.
- **F15 — the designed section-top rule was invisible to the exposure
  read** (build erratum, flagged by design 2026-08-26): the same
  finding as 007 §9 R26 — the anchor frames carry a top-only 1px
  `border/000` stroke on the section frame, chrome the per-cell sweep
  never covered; the engine placeholder's full-width region border had
  masked its absence until the real section landed. §2 amended; the
  build draws it as section chrome (`.eng-toprule` — 11t + 1px, 1px
  `border/000`, `aria-hidden`, under the content layer), the rail's
  row-0 cell tops completing the visible line to the page edge.
- **F16 — the carousel's left clip moves to the viewport edge**
  (design direction at build QA, 2026-08-26): §5 transcribed the
  file's overflow-clipped frame (left edge at the inset) as the
  designed behavior, but the static anchors never show a card crossing
  that edge — mid-swipe the outgoing card cut at the inset line, short
  of the viewport. Directed: clip at the viewport edge — the
  portfolio's visible-crossing instinct carried to the engine's own
  window. The build extends only the clip plane (a negative
  `clip-path` left inset replaces `overflow: hidden` at the carousel
  bands); the row box, track, and breadcrumb hold every §5 resting
  value, and the island's math reads the same geometry. §5 amended.
- **F10 — breadcrumb touch targets (noted).** The designed stops are
  6px dots at a 6px gap: a 44×44 target is geometrically impossible
  without heavy overlap. Built: each stop extends its hit area to the
  full stop pitch × 44px (no overlap); the full-size touch paths to
  the same action are the swipe and the card taps. Recorded here so
  the §10 "≥ 44px where interactive" line reads against this
  constraint.

Decisions recorded at draft (approval covers them):

- **Motion values are this spec's** (§7), chosen from the design intent
  supplied 2026-08-26; the spring-integrator island is the sanctioned
  rAF exception (§7.1).
- **No scripted entrance.** None was supplied; the section renders
  settled (Visibility expanded). An entrance, if design wants one, lands
  as an amendment or in the Phase 6 pass.
- **Destinations** carry 007 §9 R7 (`/our-work` × 3) until dedicated
  routes ship.
- **The inactive fill aliases the portfolio's constant** (§5); the
  luminosity blend is replaced by the tuned filter (rules, "CSS
  Transition Constraints").
- **The 1344 tier serves from 1152** (the 007 tier-scheme decision
  applied unchanged). *Amended 2026-08-26 (pre-approval): superseded —
  the draft transcribed 007's original 1152 decision, which 007 §9 R25
  had already superseded under spec 002.r1 (tier cuts follow the
  structural gates). The cuts are 470 · 665 · 860 · 1130; the 1344 tier
  serves from 1130. §5 and §10 carry matching amendments.*
- **Bounded carousel** — five positions, no loop, no timers.

## 10 · Acceptance criteria

At each of the five anchors and one arbitrary mid-band width per band,
scrollbar forced on:

- [x] Section height ÷ t equals 21/13/9/9/8 exactly; the three blocks
      land on §1's ticks; the section top sits on the portfolio's last
      row; stack sum and landmark audit pass on `/home-fixture` with the
      real section and the testimonial placeholder mounted — audited at
      rest in every expansion state. (Measured at containers
      384/576/768/960/1344 and 399/520/700/900/1200: section 21/13/9/9/8t
      exact; blocks 4+14+3 · 3+8+2 · 2+5+2 · 2+5+2 · 2+4+2t; fixture
      engine tops 45/31/22/22/21t on the portfolio totals, testimonial
      top on the engine total, page totals 101/74/53/51/52t; the 768
      fixture re-audited at rest in the brand state — same ticks,
      widths [1,1,6,1,1]t.)
- [x] The lattice renders §2's rail transcription through the spec 002
      vocabulary, including the filled-circle ornament at 11 × 0 and the
      fixed rd1 rail (no strays — §9 F7); verified against rendered
      bounds, never metadata. (Rendered regions 11×0–3 + 9–11×4–20 ·
      9–11×0–12 · 8–11×0–8 · 8–11×0–8 · 8–11×0–7; `f-cell fill round`
      at 11×0 every band; outlined circles rs 9×12 · rt 9×8 · rd1 8×8 ·
      rd2 9×6; source cells verified through the console bridge,
      §9 F7's strokes confirmed invisible at build.)
- [x] Header type walks its lines (24→28, hold across rs, 28→32, 32→42);
      weight/tracking are band constants switching at 1344; the designed
      copy swap rides the 960 gate (§9 F5); two lines at every anchor.
      (Anchors 24/28/28/32/42 exact; 399 → 24.3125 on the designed line;
      520/700/900/1200 → 25.28/25.52/30/37.5 — pure zooms of the slice
      anchors; the copy swaps at the 860 gate; two lines at all nine
      widths.)
- [x] The accordion renders §4 exactly at rt/rd1/rd2: 10t row, 6t + 4×1t,
      no gaps, canonical order, engine palette per the table, pill chrome
      and anchors, left-only expanded radii; every expansion state lands
      whole-tick at rest. (Re-verified 2026-08-26 post-F12: cards
      line-inclusive — widths [6t+1, 1t+1 ×4] with the −1px overlaps,
      boundaries exactly on cols 7/8/9/10, the row spanning 10t + 1px;
      a pixel scan across a boundary reads exactly one 1px border/000
      column on the lattice line, and the bottom tangents land on their
      row line; pills 64/80/112 with labels 20/24/28 and dots 12/16/18;
      expanded radii 16/20/24 left, 0 right; all five rest states
      exact.)
- [x] The carousel renders §5 exactly at rm/rs: window, card sizes,
      pitches, all-corner radius at rm, breadcrumb geometry and colors,
      inactive treatment (tuned filter recorded as an amendment; no blend
      modes in the section's CSS); the correct tier is fetched per band
      with the cuts at the structural gates and the 1344 tier serving
      from 1130 (amended 2026-08-26 — §9; network log: WebP only, one
      tier per width).       (384: card 9.5×13t, pitch 10.5t, 1t sliver,
      crumbs 24×6 + 6px at the row bottom; 576: 9×7t, pitch 10t; tiers
      384/576/768/960/1344 fetched at 384/520/700/900/1200 — the gate
      cuts; filter tuned to grayscale(1) sepia(0.12) brightness(0.975)
      @ 0.7, mean delta 1.49/255 vs the luminosity composite; no blend
      modes in engine.css. Re-verified post-F12/F13: the active card's
      right edge lands at exactly 10t + 1px — on the col-10 hairline,
      pitch unchanged at 10.5t; the activation chrome fades both ways
      on the 450ms ease-out — sampled mid-fade at 91%/59% at 150ms,
      settled by 450ms.)
- [x] The spring reflow per §7.1: one redistribution — the row fills its
      container edge to edge at every frame (assert during motion);
      opening and closing land together; nothing overlaps; *amended
      2026-08-26 (§9 F11): zero overshoot — the critically damped
      spring never exceeds its target, tight with no bounce*; content
      is clipped, never scaled (title and body pixel positions relative
      to the leading edge are constant throughout). (Re-measured
      post-F11 at 1344: 43-frame sample, max span error 0.008px against
      the 10t + 1px row; the expanding card peaks exactly at its target
      — 0.00px overshoot; visible travel completes ≈230–320ms on the
      critical curve; title offset constant through the flight.)
- [x] Interrupts retarget:       rapid clicks across all five cards (the
      `/engine` interrupt-storm control) never restart, jump, or leave
      the row off its edge-to-edge sum; fractions and velocities carry
      through every retarget. (Re-run post-F11/F12: 10 retargets at
      70ms — span error ≤ 0.031px across 94 frames, zero overshoot
      mid-storm, continuous motion, consistent settled end state.)
- [x] Crossfades ride the fraction per §7.2's ramps; mid-exchange both
      cards' contents are briefly visible; the pill label and dot are
      gone by f 0.35; fill and radii track f linearly. (All three ramps
      are CSS functions of the card's own --_f — clamp(1 − f/0.35),
      clamp((f − 0.25)/0.5), color-mix/radius calc linear in f — one
      driver by construction; verified live against the island's
      per-frame fraction writes.)
- [x] Pill hover/focus per §7.3: the row never moves on hover; the dot
      morphs on the promoted tokens both directions; focus adds the
      two-layer ring; the expanded card has no hover response; clicking
      it does nothing. (Forced :hover — dot radius 0 / rotate 180deg in
      450ms, card width constant 112; resting out 600ms on the
      ease-in-out; forced :focus-visible — morph + rings bg/100 2px,
      bg/500 4px; hover rules under hover-capable media; the expanded
      card's hit is a guarded no-op.)
- [x] Carousel behavior per §7.4: spring-driven slides, drag follows the
      finger with 0.3 overscroll resist and spring-back, fling bias over
      500 px/s, breadcrumb and inactive-card presses retarget, chrome
      morphs fade on `--eng-chrome-fade-dur` with the drawer ease-out
      (amended 2026-08-26 — §9 F13), no timers ever run. (Crumb press →
      settled x exactly −3 pitches, active card on the window edge;
      100px overscroll drag → 30px travel, sprang back to 0; ~2000px/s
      fling → one-position bias, settled −1 pitch exactly; the 450ms
      two-way fade sampled mid-flight; the island sets no timers or
      auto-advance.)
- [x] `prefers-reduced-motion: reduce` renders every change
      state-to-state per §7.5; a no-JS render shows the settled state.
      (Under the reduce toggle a press lands the full settled state
      [1,1,1,1,6]t within two frames — no travel; with script execution
      disabled the render is the settled accordion, Visibility
      expanded.)
- [ ] Accessibility: `<h2>`; the cards are labeled buttons with
      `aria-expanded` and associated panels; breadcrumb stops are labeled
      buttons; focus is never trapped; contrast passes for every
      engine's title/body inks on its /400 fill and the pill label on
      `lightgray/200`; touch targets ≥ 44px where interactive.
- [x] Every value traces to a token, a §8.4 constant, or the promoted
      motion tokens; the images are committed verbatim; one client
      island; the dot-morph promotion leaves the nav visually unchanged;
      `/engine` renders all bands with the state readout,
      interrupt-storm, and reduced-motion controls; the old site's routes
      and bundles are unchanged in the production build. (25 WebPs
      verbatim under public/media/engines; one island — engine-row.tsx;
      the nav subdot computes identical values through the --knav
      aliases (0.6s out on the ease-in-out, resting 50%); /engine ships
      2.63 kB route JS / 112 kB first load; the shared first-load holds
      at 102 kB and every old-site route builds unchanged; tsc and lint
      clean.)
