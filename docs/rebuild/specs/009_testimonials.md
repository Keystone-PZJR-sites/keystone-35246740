# Spec 009 — Testimonials: the full-grid paint and the auto-rotating strip

**Status:** Approved 2026-08-26 (draft same day — all seven §9 flags
resolved by design the same day; every file fix re-read post-fix,
nothing pending at approval). Built and verified the same day — §10
checked with measured evidence; this completes the Phase 5 sections
(the fixture's stack-sum audit now runs against five real sections and
the footer).
**Depends on:** spec 001 (tokens, fonts) · spec 002 (grid engine, exposure
vocabulary, band classes) · spec 002.r1 (nearest-anchor gates, the settle
contract, the four units) · spec 005 (nav — mounted on the QA surfaces; the
nav card's shadow-growth constants promote here at their second consumer) ·
spec 006 (hero — the fade-rise and carousel-slide grammars are reused; the
timer discipline extends the hero's) · spec 007 (portfolio — the
`grid-button` primitive is mounted; the entrance-gate fractions and the
entrance stagger promote here at their second consumers; the hero-pause
joint is inherited by construction) · spec 008 (engine — the section above;
the 576 derivation precedent is reused)
**Sources:** fresh MCP reads 2026-08-26 of the testimonial nodes inside the
five anchor frames — headers `230:13360` (384) · `359:29949` (576) ·
`142:4439` (768) · `334:21853` (960); carousels `230:13364` · `359:29953` ·
`199:12807` · `334:21856`; the 1344 grid section `399:4605` (header
`161:36944`, columns `397:4546` / `397:4556` / `397:4566`); the
**`testimonial-card` component set `117:11219`** (color × breakpoint —
20 variants post-fix; the 576 breakpoint landed at flag review, §9 F5);
the control pairs `509:6344`/
`509:6347` · `505:16167`/`505:16164` · `560:12933`/`560:12936` ·
`505:13380`/`505:13377`; the page Grid layers `509:5403` · `505:15527` ·
`505:13888` · `505:12908` · `505:10884` (per-cell stroke visibility over
the testimonial rows) — all in `ks-MarketingSite`. Every landmark was
verified against rendered bounds through the console bridge (section tops,
block ticks, the strip offsets, the control cells, the exposure cells, the
image-fill hashes and crops). Motion intent (the hover hard-shadow, the
staggered entrance, the ~6.5s auto-rotation) supplied 2026-08-26 with the
spec request; behavior decisions recorded the same day (hover is
shadow-only; fade-rise reuse; press resets the dwell and hover holds it;
seamless clone loop; placeholder copy ships as-is; single-tier placeholder
exports); values specced in §7. No image exports were supplied — the
photos are **placeholders**, exported from the file by the build (§5).

The fourth and last Phase 5 homepage section (top-down). At 1344 it is the
rebuild's first **full-grid composition**: a fully painted lattice with six
content elements — three circle photos and three quote cards — staggered
across it. Below 1344 the same six elements present as an
**auto-rotating strip** (photo + card pairs) with the side-by-side control
pair. Every geometry fact below was read off the anchor nodes at writing
time; nothing is scaled from a neighboring anchor.

---

## 1 · Section anatomy — tick totals per band

The section owns the page rows from the engine accordion's last row to the
footer's first. Its top lands exactly on the engine total at every anchor
(66t/44t/31t/31t/29t page ticks, verified from rendered bounds); all blocks
are whole-tick.

| | rm (384) | rs (576) | rt (768) | rd1 (960) | rd2 (1344) |
|---|---|---|---|---|---|
| section top (page ticks) | 66t (2112) | 44t (2112) | 31t (1984) | 31t (2480) | 29t (3248) |
| header | 4t (128) | 3t (144) | 2t (128) | 2t (160) | 2t (224) |
| clear row | 1t | 1t | 1t | 1t | — |
| strip / grid | 5t (160) | 4t (192) | 3t (192) | 3t (240) | 9t (1008) |
| control row | 1t | 1t | 1t | 1t | — |
| trailing clear row | — | — | — | 1t | — |
| **section total** | **11t** | **9t** | **7t** | **8t** | **11t** |

- Left inset: t/2 at rm (16 at the anchor, tick-riding — 007 §9 R23 is
  normative); 1t at rs and up. Same rule as the portfolio and engine.
- **Structural switch at 1344** (the 1130 gate): rd2 alone renders the
  grid composition; rm/rs/rt/rd1 render the strip + control row. One DOM,
  band-gated presentation (v5 §7.5): the six content elements exist once;
  the loop clones (§7.3) are presentation-only and render at strip bands
  only.
- **The section-top rule.** Every band draws a designed 1px `border/000`
  rule on the section's first row line, from col 0, spanning **11t · 9t ·
  8t · 8t · 11t** (all whole-tick, rendered 352/432/512/640/1232) — the
  first designed top rule in the rebuild. It is chrome, `aria-hidden`,
  drawn by the section, not by the lattice layer.
- At rd2 the designed **1t clear row above the footer** stays page
  assembly (007 §8.8's fixture element), outside this section's ticks.
  *(Amended 2026-08-27 — flagged by design at build QA: the row is
  painted lattice, not clear space — the rd2 page Grid layer draws the
  full 12-cell row (page row 41, cols 0–11, stroke-only), verified
  through the console bridge. "Clear" means clear of content. The
  fixture element carries the paint; still outside this section's
  ticks.)*

## 2 · Exposure map

Per-cell stroke visibility on the five page Grid layers, read through the
console bridge at writing time. This is the **full grid paint** the motion
intent names: below the header rows the field is (near) fully exposed at
every band, with the engine's right-side rail continuing through the
header rows. Zero-based section-local ticks (cols × rows):

| band | plain cells | ornament cells |
|---|---|---|
| rm | 11 × 0–3 · 0–11 × 4–9 · 0–8 and 11 × 10 | f-cell 11 × 0 · circle 1 × 4 |
| rs | 9–11 × 0–2 · 0–11 × 3–7 · 0–7 and 10–11 × 8 (post-fix — §9 F7) | f-cell 11 × 0 · circle 10 × 3 |
| rt | 8–11 × 0–1 · 0–11 × 2–5 · 0–7 and 10–11 × 6 | f-cell 11 × 0 · circles 1 × 2, 8 × 3 · f-cell 0 × 5 |
| rd1 | 8–11 × 0–1 · 0–11 × 2–5 and 7 · 0–7 and 10–11 × 6 | f-cell 11 × 0 · circles 1 × 2, 8 × 3 · f-cells 0 × 5, 11 × 7 |
| rd2 | 8–11 × 0–1 · 0–11 × 2–10 | f-cell 11 × 0 · circles 7 × 5, 0 × 6, 5 × 7, 11 × 9 · f-cells 0 × 9, 11 × 10 |

- The f-cells are the promoted `bg/200`-fill ornament vocabulary; the
  circles are outline-only `radius-full` cells. (Two f-cells — rt/rd1
  0 × 5 and rd2 0 × 9 — are drawn as VECTOR nodes and one rd2 plain cell
  at 1 × 3 as an empty FRAME; both are file hygiene, they paint as
  ordinary cells.) *(Amended 2026-08-27 — flagged by design at build
  QA: the VECTOR cells are **not** ordinary cells. They are corner
  triangles — path 0,0 → t,t → 0,t: a `bg/200` lower-left fill with a
  1px `border/000` hypotenuse from the cell's top-left to bottom-right
  corner, verified through the console bridge at all three positions
  (64/80/112 squares, identical orientation). A new shade of the
  ornament vocabulary, built as CSS per the CSS-dot doctrine; no
  triangle exists in the 384/576 designs. The rd2 1 × 3 empty FRAME
  remains hygiene.)*
- The control-row gaps host the arrow pair (§6): rm 9–10 × 10 · rs
  8–9 × 8 · rt 8–9 × 6 · rd1 8–9 × 6. The file draws no lattice cells at
  the control positions; the controls paint their own cell chrome.
  **These rendered-truth positions supersede plan.md's "Special cells"
  testimonial-pair rows for 768/960** (37, not 38 — the 1t portfolio
  resize of 007 §9 moved everything below it up one row; rm 76 and rs 52
  are unchanged).
- The photos and cards float on the content layer and are opaque over the
  cells they cross; the header rows sit on the unpainted field beside the
  rail.

## 3 · Header

Ink `text/100`, PP Kyoto. Copy at every anchor: **"A system that feels
designed for your business."** (content decision 2026-08-26 — §9 F4: the
draft's four small-band nodes carried "This is marketing that feels built
for your business."; design unified all five to the rd2 line, re-read
clean — no band copy swap exists). Two natural wrap lines at every
anchor. This is an `<h2>`.

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| style | `display-serif/xs/Extralight` 24/30 | `xs+/Extralight` 28/34 | `xs+/Extralight` 28/34 | `sm/Extralight` 32/38 | `md+/Thin` 42/50 |
| tracking | −2% | −2% | −2% | −2% | **−3%** |
| text box | 304 (9.5t) | 384 (8t) | 384 (6t) | 448 (post-fix — §9 F3) | 560 (5t) |

Type walks 24→28 across the base band, holds 28 across rs (shared
anchors), interpolates 28→32 across rt and 32→42 across rd1. Weight and
tracking are band constants: Extralight/−2% through rd1, switching to
Thin/−3% at the 1344 gate — the same ladder as the portfolio and engine
headers (007 §3 · 008 §3). Vertical centering in the block at every
anchor (rendered: 34/60/34 · 38/68/38 · 30/68/30 · 42/76/42 · 62/100/62).
The two-line wrap is pinned by the text box per 007 §9 R16; the boxes
ride the interpolation weights (002.r1's four units — text columns are
weight-riding, not tick-bound).

## 4 · The testimonial-card

Component set `testimonial-card` (117:11219): color (green · yellow ·
pink · brown) × breakpoint (384 · 576 · 768 · 960 · 1344; the 576
breakpoint was added at flag review — §9 F5 — and carries the 768
internals at a 336-wide card, re-read clean; *amended 2026-08-27 —
design narrowed the 576 card 1t to 288 (6t), all four colors re-drawn
and re-read, internals unchanged*). **The `green` variant
binds the teal variables** — the set's name, the tokens' hue. Pink is
drawn but instanced nowhere; the section uses green, brown, and yellow.
The card is square-cornered, hairline-free, and effect-free at rest
(every variant carries an invisible NOISE effect — hygiene, not
painted; the hover shadow is motion, §7.2).

**Chrome** — fill the color's /400; one interior column
(justify-between): the quote top-left, the attribution row bottom (name
left, business badge right; badge fill /200, ink /700, `radius-full`).
Quote and name ink /800:

| color | fill /400 | badge /200 | badge ink /700 | text ink /800 |
|---|---|---|---|---|
| green (teal) | #5bc3b3 | #d2ede6 | #236058 | #0d2a28 |
| yellow | #f5b83d | #fceac6 | #70531a | #3a2a0e |
| brown | #ad8261 | #e5d7cc | #513b2a | #2f2218 |

**Per-breakpoint values** (pads listed top/right/bottom/left):

| | 384 | 576 | 768 | 960 | 1344 |
|---|---|---|---|---|---|
| card | 192×160 | 288×192 (amended 2026-08-27; was 336×192) | 320×192 | 400×240 | 336×336 |
| pads | 12/16/16/16 (post-fix — §9 F2) | 16 uniform | 16 uniform | 16/20/20/20 | 20/24/24/24 |
| quote | `display-serif/4xs+/Light` 14/18, −2% | `2xs+/Light` 20/24, −1% | `2xs+/Light` 20/24, −1% | `xs/Light` 24/30, −2% | `xs+/Light` 28/34, −2%, hanging indent −0.45em |
| name | `text/xs/Regular` 12/16 | `text/lg/Light` 18/26 | `text/lg/Light` 18/26 | `text/lg/Light` 18/26 | `text/xl/Light` 20/26 |
| badge | `text/2xs/Regular` 10/12 · px 6 py 2 | `text/sm/Light` 14/18 · px 12 py 2 | same | same | same |

- The 1344 quote carries a **hanging-quote indent** (first-line indent
  −0.45em) so the opening quotation mark hangs outside the text column;
  the smaller breakpoints do not.
- The name's optical-size pins differ per breakpoint (M Regular at 384,
  L Light at 768/960, M Light at 1344) — the spec 001 axis contract
  carries them.
- (The 384 pads disagreed inside the set at first read; design unified
  all four colors to 12/16/16/16 the same day, re-read clean — §9 F2.)

**Copy** — three testimonials, canonical order green · brown · yellow
(the strip's slide order; quotes ship curly per the 008 F8 canon). **The
attribution is placeholder content** on every card (decision 2026-08-26 —
ship as-is, §9 records the content-pass flag):

1. **green** — "I’ve got more leads than I can chase down and now I’m
   actually hiring because of it." — Kelly L. · Zivel Palm Coast
2. **brown** — "Doesn’t matter if someone calls, texts, or fills out a
   form. It’s all one conversation now." — Kelly L. · Zivel Palm Coast
3. **yellow** — "I had five logins, three vendors, and zero answers. Now
   I have one conversation." — Kelly L. · Zivel Palm Coast (designed
   break after "Now I have" at rd2 only; natural wrap elsewhere)

## 5 · The grid, the strip, and the placeholder assets

**The rd2 grid.** Content region cols 1–11, rows 2–10 (1t left inset;
the grid is 10t wide with a designed 1t skip at col 7). Three columns of
stacked 3t×3t (336px) elements — six in all, every element square, every
photo a `radius-full` circle mask:

| column (cols) | upper element (rows) | lower element (rows) |
|---|---|---|
| A (1–3) | photo 01 (2–4) | yellow card (7–9) |
| B (4–6) | green card (3–5) | photo 03 (8–10) |
| C (8–10) | photo 02 (2–4) | brown card (6–8) |

Column gaps ride the ticks (A: 2t between elements · B: 2t · C: 1t; B
starts 1t below the grid top, C's card 1t below its photo's 2t-lower
sibling line). **The photo–card pairings differ from the strip's**
(A pairs photo 01 with the yellow card; the strip pairs it with green) —
transcribed as drawn; the six elements are one flat DOM group re-slotted
per band.

**The strip (rm/rs/rt/rd1).** Slide = photo (left) butt-joined to card
(right), no gap inside the slide; 1t gap between slides; the window is
the viewport (no designed clip edge — the portfolio's decision, not the
engine's):

| | rm | rs | rt | rd1 |
|---|---|---|---|---|
| strip rows | 5–9 | 4–7 | 3–5 | 3–5 |
| photo | 160 (5t) | 192 (4t) | 192 (3t) | 240 (3t) |
| card | 192×160 (6t×5t) | 288×192 (6t×4t) | 320×192 (5t×3t) | 400×240 (5t×3t) |
| slide | 352 (11t) | 480 (10t) | 512 (8t) | 640 (8t) |
| gap / pitch | 32 / 384 (12t) | 48 / 528 (11t) | 64 / 576 (9t) | 80 / 720 (9t) |
| resting offset | **−1t** (−32) | **0** | +1t (64) | +1t (80) |
| at-rest visible | photo clipped 1t left · full card · 1t sliver of the next photo | full slide from the frame edge · 1t sliver | full slide from the 1t inset · 2t sliver | same, 2t sliver |

*Amended 2026-08-27 — the rs column above carries the post-change
truth: design narrowed the 576 card 1t (336 → 288), which makes the
slide 480 (10t) on a 528 (11t) pitch, and re-rested the strip on the
frame edge (x reads −0.5, the ±0.5 stroke-alignment artifact class —
the intended value is 0): full slide + 1t gap + 1t sliver fill the
frame edge to edge. The draft's rs values (336-wide card, 11t slide,
12t pitch, −1t rest — §9 F5/F6) are superseded for rs only; rm/rt/rd1
re-read unchanged. Still fully tick-true; the at-rest visible
elements (first photo, first card, sliver photo) are unchanged, so
the §7.1 beat plan holds.*

- **The rs unit is fully tick-true by decision** (2026-08-26 — §9 F5):
  the draft found the rs strip reusing the 768 slide unit (card 320,
  slide 512 — off-tick at t=48); design rejected the derivation and
  drew the 576 card variant at 336 (7t), making the rs slide mirror
  rm's 11t + 1t gap + 12t pitch pattern exactly. The variant, the
  re-instanced slides, and the 48 (1t) gap are all re-read clean —
  slide 528, pitch 576, offset −48, fully tick-true. *(Amended
  2026-08-27: the card narrowed again to 288 — 6t, still tick-true;
  the rm-mirror pattern no longer holds. The table above is the
  record.)*
- The **resting offsets differ by band by design** (confirmed
  2026-08-26 — §9 F6): at rm/rs the strip bleeds 1t off the left frame
  edge (the first photo arrives clipped), at rt/rd1 it rests on the 1t
  inset. *(Amended 2026-08-27: rs now rests on the frame edge — 0, not
  −1t; rm keeps the −1t bleed.)*
- The rd1 third slide was a stale 768 unit at first read; design fixed
  it in two passes (the card, then the photo) — re-read clean: photo
  240×240, card 400×240, slide 640, identical to its siblings (§9 F1).

**Assets — placeholders, exported from the file by the build.** Three
photos, one export each (decision 2026-08-26: no tier set until real
assets arrive). The image fills are identical at every band — one hash
and one crop per photo, verified through the console bridge — so each
export serves all five bands:

| file | subject | fill hash (verification) |
|---|---|---|
| `testimonial-01-672.webp` | pizzaiolo at a wood-fired oven | 3686c899… |
| `testimonial-02-672.webp` | owner taking a call at her laptop | f63cd505… |
| `testimonial-03-672.webp` | counter worker writing an order | 07aa4a4e… |

Cut at **672×672 — exactly 2× the largest slot** (the rd2 336 circle),
crops baked at export (the Figma fill transforms; the exports are the
square crop — the circle is a CSS `radius-full` mask, per the CSS-dot
doctrine that shapes without vector geometry are built, not exported).
WebP, exported through the console bridge, renamed from the SHA names,
committed under `public/media/testimonials/`; registry entries in
`design-system/v2/media.ts` with the subject descriptors. Densities run
2.0× at the rd2 slot up to ~4× at the rm slot — accepted for
placeholders; the real assets arrive as an art-directed tier set and
drop into the same `<picture>` markup (the build renders the single
export through the 006/007/008 `<picture>` pattern with one source, so
the swap is additive). `decoding="async"`, explicit width/height, empty
alts (ambient photography). Loading: the at-rest visible elements load
eagerly (the entrance needs their pixels — §7.1); the rest lazy-load and
are decode-primed at idle once the section first enters the viewport
(the engine's priming rule), so a rotation never reveals unpainted
pixels.

## 6 · The carousel control

The spec 007 **`grid-button`** primitive, mounted per band at §2's
cells — **side-by-side, back (square) left of forward (round)**, unlike
the portfolio's vertical pair:

| | rm | rs | rt | rd1 |
|---|---|---|---|---|
| size | xs (32) | sm (48) | md (64) | lg (80) |
| cells (col × row) | 9–10 × 10 | 8–9 × 8 | 8–9 × 6 | 8–9 × 6 |

- Chrome, states, hover pass-through, and focus rings are the
  primitive's (007 §6) — nothing new is designed. The in-frame pairs
  predate the `grid-button` set where they disagree (the rs inners read
  26/24 vs the set's sm 28/26; the glyph inks read one neutral off) —
  **the set wins**, the 007 §9 R5 artifact class exactly.
- rd2 has no controls — the grid does not rotate.
- **Navigation loops** (§7.3), so neither button ever disables.
- The xs pair extends its hit area to 44×44 (`--gbtn-hit-extend`,
  007 §6); the sm/md/lg cells clear the floor natively.
- Layering follows 007 §9 R18: the pair sits under the card layer;
  sliding elements pass over it; the strip window is
  pointer-transparent so the buttons stay pressable whenever uncovered.

## 7 · Motion

Intent supplied 2026-08-26 with the spec request; values below are the
spec. No new grammar is invented: the entrance reuses **fade-rise**, the
rotation reuses the **carousel slide**, and the hover reuses the nav
card's **shadow growth** — which gains its second consumer here and
**promotes to `tokens/motion.css`** (values unchanged; the `--knav-*`
names become aliases — the 004→005 and 008 dot-morph promotion pattern).
The portfolio's entrance-gate fractions and entrance stagger promote the
same way (second consumers, values unchanged).

### 7.1 · Entrance — the staggered fade-rise

Plays **once per page view**, the first time the content block (the grid
at rd2, the strip elsewhere) reaches the promoted visibility gate —
`--motion-enter-frac` (0.25; 0.18 at rm via `--motion-enter-frac-rm`),
its own observer, the 007 §9 R20/R22 mechanics. A `data-entered` flag
guards re-runs, including scroll re-entry.

Every participant runs the unchanged fade-rise grammar
(`--motion-rise-duration` 800ms · `--motion-rise-distance` 26px ·
`--motion-rise-ease`, `both` fill). Beats at i × `--motion-enter-stagger`
(120ms, promoted from `--pf-stagger`):

- **header** — beat 0.
- **rd2**: the six elements in reading order (top edge, then left):
  photo 01 · photo 02 · green card · brown card · yellow card ·
  photo 03 — beats 1–6; the last beat lands at 720ms and settles
  ≈ 1.52s.
- **rm/rs/rt/rd1**: the at-rest visible elements left→right — the
  first photo, the first card, the next slide's sliver photo — beats
  1–3. Off-screen slides render settled from the start.
- A beat never lifts over undecoded pixels: each image's beat fires at
  `max(scheduled delay, decode complete)` (the 007 §7.1 race; eager
  loading §5 makes the schedule win normally).
- **The choreography settles** (002.r1): the island marks the section
  settled on the final beat's `animationend`; band-gated presentation
  re-entering the tree has nothing to restart, so resizing across the
  1130 gate never replays the entrance.
- The lattice does not participate — the page-wide sweep is the hero
  load choreography's; by the time this section enters, the field is
  standing. The controls and the top rule render settled.

### 7.2 · Hover — the hard shadow grows; the card never moves

Hovering a **testimonial-card** (any band, grid or strip) grows the hard
shadow from its origin token: `--shadow-hard-square-0` →
`--shadow-hard-square` (4px 4px 0 0 rgba(85,77,68,0.15)) over
`--motion-card-shadow-dur` (450ms, promoted) on `--motion-drawer-ease`
(the shadow-growth curve, per the drawer grammar's shadow law); on leave
it reverses over `--motion-card-shadow-out-dur` (300ms, promoted). The
card itself never moves — no lift, no scale (decision 2026-08-26), so
the "no hard shadow while the box moves" law holds trivially at rest.
While the strip is sliding, the shadow is suppressed — it drops at once
when a slide starts and may grow again only after the track lands.
Photos have no hover state. Hover rules sit under hover-capable media.
The cards are not interactive — no focus state exists or is needed.

### 7.3 · The rotation (rm/rs/rt/rd1)

- **Auto-advance** one pitch per beat on the carousel-slide grammar
  (`--motion-slide-duration` 900ms · `--motion-slide-ease` — alias,
  never fork), right→left. The dwell is **`--tst-dwell` 6500ms**
  (component layer; from the ~6.5s intent). The first advance fires one
  dwell after the entrance settles (§7.1); if the entrance was skipped
  (reduced motion — §7.4 — never runs timers; a re-entry after
  `data-entered`), one dwell after the strip re-enters the viewport.
- **The timer runs only while the strip intersects the viewport**
  (threshold 0, the section-root observer) **and the document is
  visible**; on hide or exit it clears, and re-entry or resume
  reschedules at one full dwell (the hero's phase-reset rule). No
  timer ever runs at rd2.
- **Hover holds, press resets** (decisions 2026-08-26): while the
  pointer is over the strip (hover-capable media) or focus is inside
  the section, the dwell holds and resumes with a full dwell on leave —
  the WCAG 2.2.2 pause affordance. An arrow press slides immediately,
  queues at most one ahead (007 §7.3), and resets the dwell phase; any
  touch on the strip resets the phase too.
- **Seamless clone loop, both directions** (decision 2026-08-26 — the
  007 §9 R19 mechanics): three `aria-hidden` tail clones; forward past
  the last position slides onto the visually identical clone frame and
  snaps to the true frame without transition; back from the start snaps
  to the clone frame first, then slides. Clones carry no entrance
  beats, are never focusable, and keep empty alts.
- **Two carousels never slide at once — by construction.** For the hero
  and this strip to co-intersect, the portfolio must be fully in view
  between them, and its §7.4 joint already holds the hero whenever it
  intersects; the engine carousel only moves by hand. No new wiring.

### 7.4 · Reduced motion

`prefers-reduced-motion: reduce` (or the dev toggle): no entrance
(elements born settled), **no timers ever** (no auto-rotation),
navigation snaps with a modular wrap (no clone traversal), and the hover
shadow renders state-to-state. A no-JS render shows the settled at-rest
state — resting offsets per §5, controls inert.

## 8 · Deliverable — files, constants, semantics

1. **Images** — the three 672×672 WebP placeholder exports (§5), exported
   through the console bridge at build, committed to
   `public/media/testimonials/`; registry entries in `v2/media.ts`
   (`TESTIMONIAL_IMAGES`, subjects as descriptors).
2. **Section** `design-system/v2/sections/testimonials.tsx` +
   `testimonials.css`; **one client island** (the entrance observer and
   beats, the strip track, the timer, the clones, the decode priming).
   Header and the rd2 grid chrome are server-rendered. Band detection by
   container measurement — never `matchMedia`; the island reads its
   constants from computed style.
3. **Promotions** (values unchanged; prior names become aliases):
   `--knav-card-shadow-dur` 450ms → `--motion-card-shadow-dur` ·
   `--knav-card-shadow-out-dur` 300ms → `--motion-card-shadow-out-dur` ·
   `--pf-stagger` 120ms → `--motion-enter-stagger` · `--pf-enter` 0.25 →
   `--motion-enter-frac` · `--pf-enter-rm` 0.18 →
   `--motion-enter-frac-rm`. The nav and portfolio render identically
   through the aliases.
4. **Component-layer constants** (`v2/tokens/component.css`, per band
   only where used, `--tst-` prefix): the dwell 6500ms; the §4 material
   facts the token layers do not carry (card sizes per breakpoint, the
   badge pads, the 384 type exceptions); the §5 strip facts (the resting
   offsets ±1t as tick expressions on `.page` — the rs unit is tick-true
   post-F5 and needs no material constant; *amended 2026-08-27: the rs
   offset is 0 post-narrowing*); the §1 top-rule spans (tick
   expressions). Everything else
   traces to existing tokens (the color /200 /400 /700 /800 variables,
   `border/000`, `text/100`, radius-full, the spacing scale, the shadow
   and motion tokens). *Amended 2026-08-26 (build): the enumerated §4
   facts all resolved to existing layers — the card boxes are §5 tick
   geometry, every pad lands on the spacing scale, and the 384 type
   steps are type-style tokens — so the dwell is the only `--tst-`
   constant in `:root`; the resting offsets, top-rule spans, and header
   wrap boxes are the `.page` tick/weight expressions, each wrap box
   blending its band's two anchor widths on the band weights (the v5 §2
   line the type rides), which is what holds the two-line wrap through
   the interpolation zones.*
5. **Semantics.** The section is a labeled region under `<main>`; the
   header is an `<h2>`. The three testimonials are a `<ul>`; each is a
   `<figure>` — `<blockquote>` for the quote, `<figcaption>` for the
   name and business. Photos carry empty alts (ambient). The arrows are
   real `<button>`s ("Previous testimonial" / "Next testimonial"), never
   disabled; the strip is not a focus trap; the accessibility tree
   carries no clones. The timer's hover/focus hold satisfies pause
   requirements; no live region announces rotation (ambient content).
   The lattice chrome and the top rule are `aria-hidden`.
6. **QA surfaces.** A permanent, noindexed **`/testimonials`** dev page —
   the section beneath the mounted nav at all bands, with an entrance
   replay control, a dwell/timer readout, and the reduced-motion toggle.
   The page joins run on **`/home-fixture`**: the testimonial placeholder
   is replaced by the real section under the engine; the rd2 1t clear row
   stays page assembly. This completes the Phase 5 sections — the
   fixture's stack-sum audit runs against five real sections and the
   footer.

## 9 · Resolutions record

Draft-day record, 2026-08-26. All seven flags were resolved by design
the same day; every shipped file fix was re-read from the nodes
post-fix. Nothing remains open.

- **F1 — the rd1 third slide was a stale 768 unit: fixed in the file.**
  At first read `334:21863` rendered 512×192 (photo 192, card 320×192,
  centered in the 3t row) beside two correct 960 slides. Design fixed it
  in two passes the same day (the card, then the photo); final re-read
  clean — photo 240×240, card 400×240, slide 640 at y 0, identical to
  its siblings.
- **F2 — the 384 card pads: fixed in the file.** The green 384 variant
  padded 12 vertical / 16 horizontal while its siblings padded 16
  uniform. Design unified the canon to **12/16/16/16** (top/right/
  bottom/left) across all four colors — re-read clean; §4 carries it.
- **F3 — the rd1 header text box: fixed in the file.** The text node
  read 456 wide, overflowing its 448 frame. Design normalized the box to
  448 — re-read clean (text = frame). 448 is weight-riding, not
  tick-bound (002.r1's four units put wrap boxes on the weights), so no
  tick constraint applies; §3 carries 448 as the wrap pin.
- **F4 — the header copy: unified in the file** (content decision
  2026-08-26). The draft found "This is marketing that feels built for
  your business." at rm–rd1 against "A system that feels designed for
  your business." at rd2. Design resolved to the rd2 line **at every
  band** — re-read: all five text nodes carry it, still two natural wrap
  lines per anchor. No band copy swap exists; nothing rides the 1130
  gate.
- **F5 — the rs 768-unit derivation: rejected; the true 576 unit is in
  the file** (design decision 2026-08-26). The rs card widens to
  **336 (7t)** so the slide lands tick-true — 4t photo + 7t card = 11t
  slide, 1t gap, 12t pitch, mirroring rm's pattern exactly. The fix
  landed in three passes the same day (the variants, the instances, the
  gap); final re-read clean — the set carries `breakpoint=576` in all
  four colors (336×192, the 768 internals: pads 16 uniform, quote
  20/24 −1%, name 18/26, badge 14/18), the rs slides instance them, and
  the gap reads 48 (slides at 0/576/1152 — pitch 576, fully tick-true).
- **F6 — the resting offsets are designed** (confirmed 2026-08-26):
  −1t at rm/rs (the first photo arrives clipped 1t off the left frame
  edge), +1t at rt/rd1 (the strip rests on the inset). Built exactly so.
- **F7 — the rs control-row corner cell: moot at re-read.** The flag:
  at first read the rs control row (row 8) painted cols 0–7 and 10 but
  drew no lattice cell at col 11 — the section's bottom-right corner —
  while every other band's control row painted through its last column.
  At re-read the file paints the cell (cols 0–7 and 10–11 around the
  arrows); §2 carries the full row. Nothing remains to decide.

Decisions recorded at draft (approval covers them):

- **Motion values are this spec's** (§7), chosen from the intent supplied
  2026-08-26: hover is shadow-only (no lift); the entrance reuses
  fade-rise; a press resets the dwell and hover/focus holds it; the loop
  is seamless clones; the dwell is 6500ms from the "~6.5s" intent.
- **The copy is placeholder** (decision 2026-08-26): the quotes and the
  repeated "Kelly L. / Zivel Palm Coast" attribution ship as-is;
  a content pass replaces them before cutover (tracked here, not a
  build gate).
- **The photos are placeholders, single-tier** (decision 2026-08-26):
  one 672×672 export each, cut by the build from the file (identical
  fill hashes and crops at every band, §5); the real assets arrive as an
  art-directed tier set into the same `<picture>` markup and registry.
- **The promotions** (§8.3) — the card shadow-growth, the entrance
  stagger, and the entrance-gate fractions all gain second consumers
  here and move to `tokens/motion.css`, values unchanged.
- **The photo–card pairings differ between the grid and the strip** —
  transcribed as drawn (§5); the six elements are one flat group
  re-slotted per band.
- **The section draws the top rule** (§1) as its own chrome; the spans
  are the rendered whole-tick values.

- **Amendment 2026-08-27 — the rs card narrowed 1t in the file**
  (design change, announced by the design owner post-approval). Fresh
  re-reads through the console bridge: all four `breakpoint=576`
  variants re-drawn at **288×192 (6t×4t)** — internals unchanged
  (pads 16 uniform, now on a nested frame — hygiene; quote 20/24 −1%;
  name 18/26; badge 14/18 px12 py2); the rs slides re-instanced at
  480 (10t) on a **528 (11t) pitch** with the 48 (1t) gap; the strip
  re-rested on the **frame edge** (x −0.5 — the ±0.5 artifact class,
  intended 0), so the at-rest frame shows the full slide + 1t gap +
  1t sliver, exactly 12t edge to edge. rm/rt/rd1 strips and the rs
  control cells (8–9 × 8) re-read unchanged. §4/§5/§8.4 carry dated
  amendments; the build's rs card width, pitch, and rest constant
  updated and re-verified at 576 and 520 (§10). The §7.1 beat plan is
  unaffected — the at-rest visible elements are the same three.

- **Amendment 2026-08-27 — two exposure errata, flagged by design at
  build QA** (dev/Figma screenshot comparison). (1) **The corner
  triangles:** the draft transcribed the VECTOR cells at rt/rd1 0 × 5
  and rd2 0 × 9 as ordinary square f-cells ("file hygiene"); rendered
  truth is a corner triangle — 0,0 → t,t → 0,t, `bg/200` fill below
  the diagonal, 1px `border/000` hypotenuse — identical at all three
  positions and absent from the 384/576 designs. Built as CSS (the
  CSS-dot doctrine — three corners, no curve geometry): one
  linear-gradient paints the fill and the diagonal hairline
  (`.tst-tri`, born in the section's vocabulary, promotes at a second
  consumer); the underlying region cell draws the square outline.
  §2 carries the dated amendment. (2) **The rd2 row above the
  footer:** §1 called the 1t page-assembly row "clear"; the rd2 page
  Grid layer paints it as a full 12-cell stroke-only row (page row
  41). The fixture's `.hfx-clear-rd2` element now carries a 12 × 1
  exposure region; §1 amended. Both re-verified in the browser at the
  anchors post-fix.

Build record, 2026-08-26: §8.4's enumerated card/badge/type constants
all traced to existing tokens at build (the spacing scale, the type
styles, the §5 ticks) — the dwell is the only `:root` `--tst-`
constant; §8.4 carries the dated amendment. The header wrap boxes ship
as `.page` expressions blending each band's two anchor widths on the
band weights (304→384 across the base band, 384→448 across rt,
448→560 across rd1) — a flat per-anchor box broke the two-line wrap at
420 during build QA (three lines at fs 24.75 in a 304 box); the blend
restores two lines at every audited width. The three placeholder
photos were exported through the console bridge as square clones of
the verified fill paints (the circle stays a CSS mask), converted to
WebP at 672×672, and the temporary export nodes were removed from the
file.

Hygiene, no build consequence (noted, not flagged): the invisible NOISE
effect on every set variant; the rd2 grid cell at 1 × 3 drawn as an empty
FRAME and the f-cells at rt/rd1 0 × 5 and rd2 0 × 9 drawn as VECTORs; the
rm third slide's `items-center` (equal heights make it moot); the nested
"portfolio-header" frame naming inside the rs/rt/rd1 headers; the unused
pink card variants; the in-frame arrow pairs predating the `grid-button`
set (§6); float-artifact bounds (the rd1 240.00001s, the rs 47.999996s).

## 10 · Acceptance criteria

At each of the five anchors and one arbitrary mid-band width per band,
scrollbar forced on:

- [x] Section height ÷ t equals 11/9/7/8/11 exactly; the blocks land on
      §1's ticks; the section top sits on the engine's last row; the
      top rule spans 11t/9t/8t/8t/11t; stack sum and landmark audit pass
      on `/home-fixture` with all five real sections and the footer —
      audited at rest at every strip position. (Measured at containers
      384/576/768/960/1344 and 420/520/700/900/1200: section
      11/9/7/8/11t exact; header 4/3/2/2/2t, strip rows
      5–9 · 4–7 · 3–5 · 3–5, grid rows 2–10; top rule
      11t/9t/8t/8t/11t + 1px line-inclusive; fixture testimonial tops
      66/44/31/31/29t on the engine totals, footer tops
      77/53/38/39/41t, page totals 101/74/53/51/52t (±1px), plus an
      off-anchor pass at container 369; audited at rest at strip
      offsets 0–2 — every position tick-exact.)
- [x] The lattice renders §2's transcription through the spec 002
      vocabulary — the full paint below the header rows, the rail through
      them, the ornament cells, and the control-row gaps; verified
      against rendered bounds, never metadata.       (Regions, bg/200
      f-cells, and outline circles render §2's per-cell runs at every
      band; the control-row gaps at rm 9–10 × 10 · rs 8–9 × 8 ·
      rt/rd1 8–9 × 6 host the pair, which paints its own cell chrome;
      screenshot-verified at 768 and 1344. Amended 2026-08-27: the
      corner triangles render at rt/rd1 0 × 5 and rd2 0 × 9 — bg/200
      below the top-left→bottom-right diagonal with the 1px hairline,
      none at rm/rs — and the fixture paints the rd2 page row 41
      (12 × 1, stroke-only) above the footer; both verified against
      the console-bridge reads and re-screenshot at 768/960/1344.)
- [x] Header type walks its lines (24→28, hold across rs, 28→32, 32→42);
      weight/tracking are band constants switching at 1344; one unified
      copy at every band (§9 F4); two lines at every anchor with the
      wrap pinned to the §3 text boxes. (Anchors 24/28/28/32/42 exact;
      420 → 24.75 on the base line; 520/700/900/1200 →
      25.28/25.52/30/37.5 — pure zooms of the slice anchors;
      Extralight/−2% through rd1, Thin/−3% at 1130+; one line
      everywhere; two lines at all ten widths with the boxes
      304→384→384→448→560 riding the band weights between their
      anchor pairs.)
- [x] Cards render §4 exactly at every breakpoint — chrome, the unified
      pads (§9 F2), type ladders, the 1344 hanging indent, the badge —
      and every color traces to the /200 /400 /700 /800 variables.
      (Sizes 192×160 · 288×192 (amended 2026-08-27) · 320×192 ·
      400×240 · 336×336 = 6×5 · 6×4 · 5×3 · 5×3 · 3×3t; pads
      12/16/16/16 · 16 · 16 ·
      16/20/20/20 · 20/24/24/24; quote 14/18 −2% · 20/24 −1% ·
      20/24 −1% · 24/30 −2% · 28/34 −2% with the rd2 −0.45em hanging
      indent and the yellow card's rd2-only break; name 12 Regular ·
      18 Light · 18 Light · 20 Light; badge 10/12 px6 py2 · 14/18
      px12 py2, radius-full; all inks and fills computed from the
      teal/yellow/brown /200 /400 /700 /800 variables.)
- [x] The rd2 grid renders §5's composition — six 3t elements at their
      cells, circle masks, the col-7 skip — and the strip renders §5's
      geometry per band, including the completed rd1 third slide and the
      tick-true 576 unit **verified from post-fix re-reads** (§9 F1/F5)
      and the confirmed resting offsets (§9 F6). (rd2: photo 01 (1,2) ·
      yellow (1,7) · green (4,3) · photo 03 (4,8) · photo 02 (8,2) ·
      brown (8,6), all 3t squares with radius-full masks; strip: slides
      11/10/8/8t on pitches 12/11/9/9t with 1t gaps — the 576 unit
      measures card 288, slide 480, pitch 528 (amended 2026-08-27;
      re-measured at 576 and 520 post-change); resting offsets
      −1t/0/+1t/+1t exact, incl. at 420/520/700/900.)
- [x] The three placeholder exports are committed verbatim at 672×672
      WebP with crops matching the file's fills (hash-verified sources);
      one file serves every band through the tier-set markup; at-rest
      visible elements are eager, the rest decode-primed. (Exported
      2026-08-26 through the console bridge from square clones of the
      fill paints — source hashes 3686c899… / f63cd505… / 07aa4a4e…
      match §5 — to `public/media/testimonials/testimonial-{01–03}-672.webp`;
      one `<picture>` per photo, no `<source>`; photos 01/02 eager,
      photo 03 island-primed at rd2; everything else decode-primed at
      idle on first intersection.)
- [x] The entrance per §7.1: fade-rise on the promoted gate and stagger,
      beat order as specced, the decode race honored, once per page
      view, settled on the last beat — resizing across the 1130 gate
      never replays it. (Beats measured at the 120ms promoted stagger —
      header 42ms, then photo 01/green/photo 02 at 163/283/402ms in
      strip order, seven beats in grid order at rd2; each image beat
      fires at max(scheduled, decode); data-entered guards re-runs;
      data-settled lands on the final beat's animationend and the
      settled state is the un-attributed default, so band re-entry has
      nothing to restart.)
- [x] Hover per §7.2: the shadow grows 0→`--shadow-hard-square` in 450ms
      and reverses in 300ms on the promoted tokens; the card never
      moves; the shadow never paints while the track slides; hover rules
      sit under hover-capable media; the nav card is visually unchanged
      through its aliases. (Forced :hover — shadow lands at
      4px 4px 0 0 rgba(85,77,68,0.15) on a 450ms transition; resting
      rule times the 300ms out; under data-sliding the shadow reads
      0,0 with transition none — dropped at once; the card's box never
      transforms; the --knav names alias the promoted tokens, values
      unchanged.)
- [x] Rotation per §7.3: 6500ms dwell, 900ms slides on the slide ease,
      one pitch per beat, invisible wrap in both directions, presses
      queue at most one and reset the phase, hover/focus holds, the
      timer runs only in-viewport with the document visible, and no
      timer exists at rd2. (First beat slid at 7724ms vs settle
      (~1202ms) + 6500 = 7702 — one dwell after settle; back from 0
      snapped −3 pitches to the identical clone frame then slid,
      landing offset 2; forward past the end snapped home to 0; three
      rapid presses landed offset 2 — one queued, no more; every
      press/touch re-emits cleared + scheduled:6500 — the phase reset;
      pointerenter cleared and pointerleave rescheduled the full
      dwell, focusin/focusout the same; the section-root observer
      clears off-viewport and visibilitychange clears on hide; zero
      schedule events at rd2.)
- [x] The controls per §6: `grid-button` sizes xs/sm/md/lg at §2's
      cells, back left of forward, never disabled, the xs hit area
      ≥ 44×44, cards pass over the pair and it stays pressable when
      uncovered. (Pairs render xs/sm/md/lg at (9,10) · (8,8) · (8,6) ·
      (8,6), back first, cells t + 1px sharing the middle line; no
      disabled state exists in the island; the window paints above the
      pair (z 1) but is pointer-transparent — only photos and cards
      take the pointer; the xs hit extends per the 007 primitive.)
- [x] `prefers-reduced-motion: reduce` renders per §7.4 — no entrance,
      no timers, snap navigation with modular wrap; a no-JS render shows
      the settled at-rest state. (Under the dev toggle every part is
      born settled at opacity 1 with no reveal states; zero timer
      schedules; back from 0 snapped 0→2 modularly with transitions
      none — no clone traversal; the SSR HTML carries no island
      attributes and the pre-hydration guard sits under
      scripting: enabled, so a no-JS render is the settled default with
      inert controls.)
- [x] Accessibility: `<h2>`; list-of-figures semantics with blockquotes
      and captions; empty-alt ambient photos; labeled never-disabled
      arrow buttons; no clones in the accessibility tree; the rotation
      is pausable by hover and focus; contrast passes for the quote,
      name, and badge inks on their fills. (Tree carries the labeled
      region, the h2, and exactly three list items — figures with
      blockquote/figcaption; clones aria-hidden; photos alt="";
      "Previous testimonial"/"Next testimonial" buttons never disable;
      hover and focus hold the dwell; contrast — /800 on /400:
      teal 7.18 · yellow 7.78 · brown 4.51; /700 on /200: 5.89 ·
      6.03 · 7.43; header 10.88 — all ≥ 4.5:1.)
- [x] Every value traces to a token, a §8.4 constant, or the promoted
      motion tokens; one client island; the promotions leave the nav and
      portfolio visually unchanged; `/testimonials` renders all bands
      with replay, timer readout, and reduced-motion controls; the old
      site's routes and bundles are unchanged in the production build.
      (Colors, type, radii, and pads trace to the token and type
      layers; the dwell, resting offsets, rule spans, and header boxes
      are the §8.4 constants; the shadow/stagger/gate values moved to
      tokens/motion.css with the --knav/--pf names as aliases — values
      unchanged; one island (testimonials-block.tsx); /testimonials
      ships 778 B route JS / 112 kB first load with replay, dwell
      readout, and the RM toggle; the shared first load holds at
      102 kB and every old-site route builds unchanged; tsc and lint
      clean.)
