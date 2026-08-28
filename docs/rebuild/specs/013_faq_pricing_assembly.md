# Spec 013 — FAQ + pricing page assembly

**Status:** Approved 2026-08-28 (owner); **built + verified the same
day** (§9 build record; §10 checked with measured evidence) — all six
flags resolved by design the same morning (F2–F6 fixed in the file and re-read from the nodes;
F1 resolved as a **placeholder decision** — answer 1's copy builds
under all six questions pending a content pass, now a launch gate;
F3's per-band labels confirmed as intent; F6's trueing re-read at
10t, superseding the draft's 9t artifact inference). Late morning,
one owner decision landed (§9 R7): **FAQ open heights are
content-derived** — the footer's fixed-constant treatment does not
transfer; the drawn rm/rs open states are superseded. The body
carries the dated amendments; §9 is the record.
**Depends on:** spec 001 (tokens, fonts — the pre-build re-extraction
rule) · spec 002 / 002.r1 (the engine, nearest-anchor gates, the four
units, the `/grid` harness) · spec 003 (ButtonGhost — the chat rows) ·
spec 004 (the footer accordion construction and the draw-down grammar
this section reuses; the rail cascade promoted here at its second
consumer) · spec 006 (the inert `open-chat` action contract, §9) ·
spec 010 (the page pattern: expectations module, `data-landmark`
audit, sweep legs, budgets) · spec 011 (the pricing composition
`v2/pricing.tsx` and its `qa` slot; the chat-row grammar) · spec 012
(the section-end rows this section starts from; the pricing sweep leg
deferred here)
**Sources:** fresh MCP reads 2026-08-28 (morning) of the five anchor
frames — `404:8175` (384, 3744 = 117t) · `636:38164` (576, 3360 =
70t) · `376:33078` (768, 3072 = 48t) · `625:29550` (960, 3440 = 43t)
· `356:27967` (1344, 4256 = 38t) — and the FAQ nodes: `619:27005`
(rm) · `636:39064` (rs) · `403:5407` (rt) · `625:31647` (rd1) ·
`613:20262` (rd2); the component set **`faq-question` `613:21448`**
(state closed/open × size xs/sm/md/lg/xl — 10 variants); the designed
open-state frames **`619:27309`** ("384 - FAQ Open", faq `619:28807`)
and **`340:24588`** ("1344 - Pricing- FAQ open", faq `613:21483`),
plus **`634:36435`** ("576 FAQ Open", faq `634:37332` — read through
the bridge 2026-08-28 late morning, §9 R7);
the page Grid layers `614:23968` / `636:38429` / `614:23366` /
`625:29661` / `613:19513` — all in `ks-MarketingSite`. Every frame
total, section top, block edge, row height, and painted cell verified
against rendered bounds through the console bridge the same morning;
instance variant properties and copy read from the mounted nodes.
Motion and behavior intent on record (owner, 2026-08-27): the FAQ
drawers **reuse the footer draw-down grammar** (004 §5); the
talk-to-us buttons toggle the chat widget — **inert on the 006
`open-chat` contract** until the widget's own spec lands.

The pricing page's last section and the page's assembly. This spec
covers page rows from the 012 section end (the FAQ top) to the footer
top: the FAQ header block, the six-question accordion, and the 1t
pre-footer lattice row — plus the page-level deliverables 011 §8.7
deferred here: the expectations module, the `/pricing-fixture` sweep
leg, and the **exposed-cell clearance assertion** that closes the
standing harness gap (rules.md "Audits at rest").

---

## 1 · Section anatomy — tick totals per band

Page rows, zero-based, from rendered bounds. The section top is 012's
section end at every band; the section end is the footer top. The
section's last row is a **full 12-cell lattice row** — the 1t gap
between the questions block and the footer (§2). All five anchors are
designed for this section.

| landmark | rm (384) | rs (576) | rt (768) | rd1 (960) | rd2 (1344) |
|---|---|---|---|---|---|
| section top (FAQ top) | 77t | 40t | 26t | 24t | 20t |
| layout | stacked | stacked | side-by-side | side-by-side | side-by-side |
| header box (w×h) | 11t×3t | 10t×2t¹ | 4t×6t | 4t×6t | 5t×6t |
| questions box (w, col span) | 11t, 0–11 | 10t, 0–10 | 7t, 4–11 | 7t, 4–11 | 6t, 5–11 |
| questions rows | 80–92 | 42–48 | 26–32 | 24–30 | 20–26 |
| closed row | 2t | 1t | 1t | 1t | 1t |
| open row² | ~~5t~~ 6t | ~~3t~~ 4t | 3t | 2t | 2t |
| block end | 92t | 48t | 32t | 30t | 26t |
| gap row (full lattice) | 92–93 | 48–49 | 32–33 | 30–31 | 26–27 |
| **section end (footer top)** | **93t** | **49t** | **33t** | **31t** | **27t** |
| section span | 16t | 9t | 7t | 7t | 7t |

¹ ~~the rs header box reads 431 wide — the ±1 stroke-alignment
  artifact class; transcribed at the intended 9t (432)~~ *amended
  2026-08-28 — design trued the box (§9 F6), re-read at **480 =
  10t**: the header spans the full block width, flush with the
  questions box, its top hairline running the full 10t.*

² *amended 2026-08-28 (§9 R7)* — open rows are **content-derived**
  (the §4 law: the smallest whole-tick height with bottom pad ≥ top
  pad), not designed constants; the struck values are the drawn open
  states, which under-size at rm/rs. The shown values are the
  **placeholder-copy derivations**: xs and sm verified from rendered
  bounds (xs content 168 > 5t=160 → 6t; sm content 152 > 3t=144 →
  4t, bottom pad read 4px vs 12 top in `634:37332`); md/lg/rd2
  coincide with the drawn variants and are re-verified at build.

At rm/rs the header stacks over the questions; at rt/rd1/rd2 the two
boxes sit side by side, both starting on the section top row, the
header spanning the full 6t block height. The questions column holds
six `faq-question` mounts, closed rows stacked flush. The east rail
(col 11 at rm/rt/rd1/rd2; cols 10–11 at rs) stays exposed beside/right
of the blocks — the §2 map. **With a drawer open the section grows by
the drawer's delta** (open − closed: ~~**+3t rm · +2t rs · +2t rt ·
+1t rd1 · +1t rd2**~~ *amended 2026-08-28 (§9 R7)* — the derived
deltas; with the placeholder copy **+4t rm · +3t rs · +2t rt ·
+1t rd1 · +1t rd2**), pushing the gap row and the footer down in flow
— the 004 construction; the open-state frames are the **grammar
archetypes only** (`619:28807` · `613:21483` · `634:37332`; sibling
rows and widths unchanged — their drawn rm/rs open rows, 160 = 5t
and 144 = 3t, under-size the R7 law and are superseded).

**Units.** Box widths, row heights, column spans, and the gap row are
geometry (tick spans — the closed rows read exactly 1t per band, 2t
at rm; the tick-riding tell). **Every interior value — pads, wrap
boxes, chat offsets — is a band constant riding the weights**
(`calc((wA + wB) * V)`, the grid-digest law), so wraps and fits hold
by construction through each band's stretch and collapse to the
anchor zoom in the compressed slices. Type rides the standard ramp
mechanics. Material px survives as chrome only: the 1px hairlines,
the 12px chevron, the focus rings, and the 003 ghost buttons (their
material law). Tick- and weight-riding constants live in the `.page`
block of the component token layer (002.r1 §4 scope rule).

## 2 · Exposure map

From the page Grid layers, every painted cell over the section's rows
read per-node and verified against rendered bounds (paint is invisible
to metadata — the standing blind spot). Cells are `[col,row]`,
zero-based page ticks. All strokes are the lattice's `border/000`;
all other cells in the section's rows are unpainted.

| band | exposed run (this section's rows) |
|---|---|
| rm | r77–r91: col 11 · r92: cols 0–11 (the full gap row) |
| rs | r40–r47: cols 10–11 · r48: cols 0–11 |
| rt | r26–r31: col 11 · r32: cols 0–11 |
| rd1 | r24–r29: col 11 · r30: cols 0–11 |
| rd2 | r20–r25: col 11 · r26: cols 0–11 |

The east staircase takes its final step at the FAQ top — the run
narrows from 012's widths (10–11 · 9–11 · 8–11 · 8–11 · 8–11) to the
single rail above, and the section closes on the full-width gap row
the footer's own top row then mirrors.

**Ornament cells** (fills `bg/200`, `.decor` vocabulary — never
content, never pointer targets):

- rm: filled square [11,92].
- rs: outlined circle [10,48] (stroke-only, `radius-full`).
- rt: filled square [11,32].
- rd1 / rd2: none.

With a drawer open the rail extends through the grown rows (verified
in both open-state frames: the rail runs the full grown block) — the
004 rail-cascade grammar animates the extension cells (§6). The
header and question boxes draw 1px top hairlines on the section top
row line, line-inclusive on the canonical `[k·t, k·t+1)` pixel, so
they coincide with — never double — the exposed rail cell's stroke
where they meet it.

## 3 · The FAQ header block

A transparent box with a **1px `border/000` top hairline** across its
width, on the section's top row line. Contents: the head (· the chat
row at rt/rd1/rd2 — rm/rs carry none; 011's section already holds the
rm/rs chat rows).

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| box pads (t/r/b/l) | 0/160/0/16, centered | 0/~~32~~48⁴/0/48, centered | 0/0/20/64, between | 32/0/20/80, between | 40/128/32/112, between |
| head style | `display-serif/xs/Extralight` 24/30 | same | same | `display-serif/sm/Extralight` 32/38 | `display-serif/md+/Extralight` 42/50 |
| head wrap box (weights) | 176 | 400³ | 160² | 240 | 320 |
| head lines | 2 | 1 | 2 | 2 | 2 |
| chat label | — | — | Got a question? | Got a question? | Got another question? |
| chat label style | — | — | `text/sm/Light` | `text/md/Light` | `text/lg/Light` |
| chat ghost (003) | — | — | sm (36, icon 16) | md (40, icon 18) | lg (48, icon 20) |
| chat gaps | — | — | label pl 12 · 16 | label pl 12 · 16 | label pl 16 pb 2 · 24 |

² the rt head sits in a 2t-tall centered sub-box at the header top
  (the between-axis partner of the bottom-anchored chat row); rd1's
  equivalent box is top-anchored under the 32 pad.
³ the box's inner width after the trued 10t span (§9 F6 amendment,
  480 − 48 − 32); the head renders one line well inside it. *Amended
  2026-08-28 at build (⁴): the right pad re-read **48** — inner 384;
  the head still runs its one designed line.*

⁴ re-read from the node at build (§9 build record) — the box pads are
  symmetric 48/48, superseding the morning's 32 read.

Copy: head **Questions we get a lot.**, ink `text/100`. Chat label
ink `text/400`; the button is the 003 ButtonGhost (brown,
`icons/chat`), label **Talk to us** — the 011 R4 canon (~~the rt/rd1
instances read a trailing period and stale internals, §9 F3/F4~~
*amended 2026-08-28 — design fixed both and the fixes were re-read:
the labels are period-free and the instances are proper 003 set
mounts at the set sizes*) — and renders the **inert `open-chat`
action** (`data-action="open-chat"`, no handler) until the chat
widget's own spec lands. **The per-band label copy is intent** (§9
F3, design decision 2026-08-28): rt/rd1 **Got a question?** · rd2
**Got another question?** — the build renders each band's designed
string.

## 4 · The faq-question — a new primitive

`FaqQuestion` — state (**closed · open**) × size (**xs · sm · md ·
lg · xl**), one size per band: **xs rm · sm rs · md rt · lg rd1 ·
xl rd2**. Row chrome: transparent fill, a **1px `border/000` top
hairline** (line-inclusive), no effects. The mount owns the width
(the §1 tick spans); heights are whole ticks. From the set, every
value verified against rendered bounds:

| | xs | sm | md | lg | xl |
|---|---|---|---|---|---|
| closed / open height | 2t / ~~5t~~ 6t* | 1t / ~~3t~~ 4t* | 1t / 3t* | 1t / 2t* | 1t / 2t* |
| pads (t/r/b/l) | 20/24/20/16 | 12/48/12/48 | 20/40/20/40 | 20/40/20/40 | 40/40/40/40 |
| question row h | 24 | 24 | 24 | 40 | 32 |
| question style | `text/md/Light` | `text/md/Light` | `text/md/Light` | `text/md/Light` | `text/xl/Light` |
| answer style | `text/md/Light` | `text/md/Light` | `text/md/Light` | `text/md/Light` | `text/lg/Light` |
| question→answer gap | 16 | 16 | 16 | 8 | 16 |
| answer right inset | 0 | 0 | 0 | 0 | 96 |

Question ink `text/200`; answer ink `text/400`. The **chevron** is a
12px stroked glyph (1.25 stroke, ink **`border/400`** — a bound
variable), right-aligned in the question row; the open state draws it
flipped. It is compared against `IconChevronDownMedium` at build —
the standing export is a 16-grid drawn at 1.25, which renders 0.94 at
12, so the set's 12-grid/1.25 glyph likely ships as its own verbatim
export (the 012 `IconSliderArrow` precedent). *Measured 2026-08-28
(bridge, §9 R8): the set mounts the 16-grid icon **resized** to 12 —
Figma keeps the stroke absolute on resize (path 6.25×3.125,
`strokeWeight` 1.25), so the rendered truth is a 12px glyph at 1.25,
which the scaled SVG export cannot reproduce. The verbatim 12-viewBox
export at stroke 1.25 ships; the prediction is confirmed.*

~~The open row is fixed tick height with the answer top-anchored under
the question row; where the designed pads + content exceed the tick
(xs at the anchor: 20+24+16+88+20 = 168 over 160), the bottom pad
compresses — **the tick wins** (the 004 §5 precedent).~~

\* *Amended 2026-08-28 — the derivation law (owner decision, §9 R7).*
**Open heights are content-derived, never designed constants**: a
drawer opens to the **smallest whole-tick height whose bottom padding
is equal to or greater than its top padding** (top pad + question row
+ gap + answer + bottom pad ≥ top pad, rounded up to the tick). The
FAQ is dynamic content — questions can be added and the G9 content
pass replaces the placeholder answers with real exposition — so the
island **measures the answer at rest and derives each drawer's open
ticks**, re-measuring when the tick or the band changes; the closed
rows, pads, gaps, and type stay the designed constants above. This
diverges deliberately from the footer, whose drawers are fixed chrome
over content that never changes (its 004 constants stand). The drawn
open variants are the placeholder-copy archetypes: md/lg/xl coincide
with the derivation (re-verified at build); xs/sm under-size it
(bottom pads 12 and 4 against top pads 20 and 12) and are superseded
— the table's derived values govern. The answer stays top-anchored
under the question row; the slack sits as bottom clear space.

**Copy** (one set at every band; curly apostrophes, the 008 canon):

1. What if I use more than usual?
2. Am I locked in?
3. Will I have an account manager?
4. What happens if I run out of credits? *(~~rt/rd1/rd2 carry "What
   happens if I stop paying or run out of credits?"; the rm/rs bands
   the designed short variant — question 4 is band-gated copy~~
   amended 2026-08-28 at build, §9 build record: re-read from all
   five anchor frames and the 384/576 open frames — **every band now
   carries the short string**; the file superseded the morning's F2
   band split the same day, so question 4 is one canon like the rest.
   The 1344-open frame's full string is the stale archetype residual
   — the anchor frames are the copy record, per F5's standing.)*
5. If I cancel, will I keep my website?
6. I already have a website. Why switch?

**Answers: only question 1's exists in the file** — every instance
carries the set's default answer prop ("You hear from us first. Set
a monthly cap, or turn on auto-reload so nothing stops. Do neither
and work pauses until you top up. Your site stays live unless you
cancel."), and both open-state frames open only drawer 1. ~~**§9
F1 — the build gate**: design supplies the five answers (or an
explicit placeholder decision, the 009 precedent) before this
section is built.~~ *Amended 2026-08-28 — resolved by the owner as
the 009 precedent: **answer 1's copy builds under all six questions
as a designed placeholder**; a content pass replaces the five
placeholder answers before cutover (a launch-checklist gate, §9
F1). The data module carries the six pairs so the pass is a
copy-only change.*

## 5 · Behavior

A **single-open accordion** — the 004 footer decision, adopted here
as the spec's choice with the grammar it reuses (§9 note; design may
veto at review): at most one drawer is open; opening B while A is
open runs both height animations concurrently (the 004 handoff);
focus stays on the pressed header. Each question row is a disclosure
`<button>` with `aria-expanded` and `aria-controls`; the answer
region is hidden from the tree when closed. At rest all drawers are
closed. No timers, no auto-behavior — nothing to pause. The chat
buttons are inert (§3). All inputs work under reduced motion.

## 6 · Motion

No load choreography — the section is born settled, like 011/012.

- **The drawer draws down from itself** — the 004 §5 grammar, reused
  verbatim: the closed row is the origin; its bottom edge draws to
  the open tick height on `--motion-drawer-duration` (250ms), open on
  `--motion-drawer-ease-open`, close on `--motion-drawer-ease`; the
  answer is revealed by the moving clip edge; everything below (later
  rows, the gap row, the footer) moves down in flow. No shadow beat —
  the rows carry no effects (unlike the footer's `bg/100` drawers,
  these are transparent hairline rows; there is no shadow to grow).
- **The chevron** rotates 180° at the height's duration and curve in
  each direction (the 004 construction; the set's open variants draw
  the flipped rest state).
- **The rail cascade** — the 004 §5 grammar at its **second
  consumer**: the growth ticks extend the exposed rail (col 11; cols
  10–11 at rs, mirrored), each extension cell fading in over 250ms
  staggered `--motion-rail-stagger` (40ms) per cell away from the
  opening drawer; on close the extension fades with the collapse, no
  stagger. **The stagger token promotes to `tokens/motion.css`**,
  value unchanged, per the promotion law — the footer's
  component-layer reference becomes an alias.
- **Reduced motion / no JS**: `prefers-reduced-motion: reduce`
  renders every change state-to-state — no transitions, drawers snap,
  all inputs work. A no-JS render is the settled section: all drawers
  closed, the answer copy present in the HTML but not expandable (the
  004 posture).

## 7 · Page assembly — expectations, sweep leg, the clearance assertion

The pricing page's page-level machinery, following the 010 pattern.

### 7.1 · The expectations module

`app/pricing-fixture/expectations.ts` — the pricing page's designed
stack as typed `GridExpectations` data, the single home the self-test
reads. Totals **117 · 70 · 48 · 43 · 38** ticks; sections, matched
against the page's `.sec` flow children in DOM order:

| section | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| pricing-offer (011) | 0–48 | 0–27 | 0–16 | 0–15 | 0–13 |
| pricing-scale (012) | 48–77 | 27–40 | 16–26 | 15–24 | 13–20 |
| faq (§1) | 77–93 | 40–49 | 26–33 | 24–31 | 20–27 |
| footer (004) | 93–117 | 49–70 | 33–48 | 31–43 | 27–38 |

`/pricing-fixture` mounts the devtools through the 011 `qa` slot
(the production build keeps the 010 R6 null-stub alias — no devtools
code in any production graph).

### 7.2 · The drawer allowance generalizes

The devtools' open-drawer growth allowance is footer-specific today
(`.fnav-group[data-open]`, `--open-rm/--open-rs`). It generalizes to
a shared contract: **any element carrying `data-drawer` in an open
state (`data-open`) publishes `--drawer-extra` — its growth in ticks
for the current band** — and the audit sums the property over
`[data-drawer][data-open]` within scope. ~~The FAQ items publish
+3 · +2 · +2 · +1 · +1 per band (§1)~~ *amended 2026-08-28 (§9 R7)*
— the FAQ items publish their **measured derived growth** (the §4
law; with the placeholder copy +4 · +3 · +2 · +1 · +1 per band), so
the contract carries content-derived and designed drawers alike; the
footer nav adopts the attribute and publishes its existing designed
`open − 2` values through the same property — a markup/CSS-alias
change only, tracing to 004 §5 and 010 §3.2, its `--open-*`
mechanics unchanged (the footer's content is fixed; R7 does not
apply to it).

### 7.3 · The exposed-cell clearance assertion — new

Closes the standing harness gap (rules.md "Audits at rest": the
sweep audits vertical stacks only; the footer's rail collision hid
there until the 011 review). The in-page audit gains one check, run
at rest in every rest state:

- **No `[data-landmark]` content box intersects a rendered exposed
  cell.** The audit reads the exposed lattice from the DOM — the
  engine's region/cell elements and `.decor` cells, their client
  rects — and intersects them with every landmark rect. Shared edges
  are not intersections (the line-inclusive ±1px tolerance);
  contained lattice (a section's own `.gx` field *inside* a landmark
  box, like the 011 card mosaic) does not participate — the check
  targets the page-exposure layer.
- **Designed overlaps are declared, not tolerated silently**: the
  expectations module lists the landmark ids allowed to overlap
  (`clearanceExceptions`) — on this page the 012 carousel `strip`
  and `card` landmarks, which paint over the staircase by design
  (012 §2). Any overlap found on `/grid` or `/home-fixture` at build
  is a defect or gets recorded here as a designed exception with its
  spec citation (§9 build record). *Amended 2026-08-28 at build (§9
  build record) — the first full run surfaced the standing designed
  overlaps: on this page also `head` and `list` (the 011 boxes over
  the staircase — the lattices-behind-content revision, 011 §9 R13)
  and the footer's `top`/`nav` (its ornament cells sit inside its
  own blocks, 004 §2/§3); on the homepage `carousel` (006 §2),
  `gallery` (007 §2), `row` (008 §2), `strip` (009 §2/§9), and the
  same footer pair. The finer landmarks (`bar` · `ctrl` · `logo` ·
  `item` · `header` · `questions` · `price-scale` · the /grid
  fixtures) stay fully asserted. The expectations also gain
  `latticeExempt` for the check-6 landmark audit: the 011/012
  landmark kinds whose boxes are designed content offsets, not tick
  geometry — `head` (the designed px header tops, 011 §3), `chat`
  (content rows, 011 §6), `strip`/`card` (the hanging tag rides
  outside the tick box, 012 §5) — first audited by the devtools on
  this page; the FAQ landmarks and every other kind stay on the
  half-tick law.*

The assertion runs on all three audited routes with one contract.

### 7.4 · The sweep leg

`scripts/grid-selftest.mjs` gains the `/pricing-fixture` leg: the
five anchors + the ten 010 §3.1 slice widths, scrollbar forced on,
settle after every resize (the drawer grammar retriggers on tick
changes). Rest-state drives, asserted per state:

- the 012 machine on each `k` (card-overlay clicks to k = 1, k = 2,
  arrow keys back to k = 0);
- an FAQ drawer open (item 1), then a second (item 2 — the
  single-open handoff), then closed;
- a footer drawer open and closed at rm/rs;
- the mobile nav open and closed (an overlay — the stack unchanged).

Continuity stays asserted on `/grid` only (a gate is a designed
step). `npm run test:grid` stays the entry point and CI gate.

### 7.5 · Budgets

Measured on the production build and recorded in acceptance: both
pricing routes static; the page's island count becomes **five**
(nav-desktop · nav-mobile · pricing-scale · **faq** · footer-nav —
the FAQ section ships exactly one); `/pricing` route JS and first
load recorded against 012's 2 kB / 107 kB baseline; the homepage
routes and budgets untouched.

## 8 · Deliverable — files, constants, semantics

1. **Section** `design-system/v2/sections/faq.tsx` + `faq.css` +
   `faq-data.ts` (the six question/answer pairs — content never
   hardcoded in components) — a server component with **one client
   island** (`faq-island.tsx`: the §5 single-open machine, the §6
   height animation, and the §4 R7 derivation — measure the answers
   at rest, re-measure on tick/band change, publish each drawer's
   open ticks and `--drawer-extra`). Landmarks carry `data-landmark` (header,
   questions block, each item) for the §7 audit.
2. **Primitive** `design-system/v2/primitives/faq-question.tsx` +
   `.css` (§4 — sizes and states, `forceState` for the catalog). The
   `/primitives` catalog gains the set in the same commit, rendering
   the designed anchor sizes bare.
3. **Icon** — the 12-grid chevron compared against
   `IconChevronDownMedium` at build; if the geometry differs (the
   stroke math says it will), a verbatim console-bridge export ships
   as its own icon. Ink normalizes to `currentColor` (the glyph tints
   with `border/400` via the component layer).
4. **Constants** (component token layer, `--faq-*`, in the `.page`
   block where they ride the weights): the §3/§4 pads, wrap boxes,
   and chat offsets per band; ~~the §7.2 `--drawer-extra` values~~
   *amended 2026-08-28 (§9 R7) — the FAQ's `--drawer-extra` values
   are measured by the island, not constants; only the footer's
   designed values alias through the property.*
   Motion: `--motion-rail-stagger` promotes to `tokens/motion.css`
   (§6), the footer's reference becoming an alias. No new colors —
   every ink above is a standing token (`border/000` · `border/400` ·
   `text/100/200/400`); the pre-build re-extraction (001 rule) runs
   regardless.
5. **Route** — `v2/pricing.tsx` splices the section between the
   price scale and the footer; the expectations module wires into the
   `qa` slot; `/pricing` + `/pricing-fixture` render it.
6. **Harness** — the §7 work: `app/pricing-fixture/expectations.ts`,
   the generalized drawer allowance, the clearance assertion, and the
   sweep leg (`app/grid/grid-devtools.tsx` ·
   `scripts/grid-selftest.mjs` · the footer-nav attribute adoption).
7. **Semantics**: one `<section>` landmark; the head is an `<h2>`;
   the questions are a `<ul>` of six items — each an `<h3>` wrapping
   a disclosure `<button>` (`aria-expanded`, `aria-controls`) plus
   the answer region, hidden when closed; the chevron and ornament
   cells `aria-hidden`; the chat button a real `<button>`, inert on
   the `open-chat` contract.
8. Docs in the same commits: plan.md's pricing record, the launch
   checklist's Pricing row (built pending gates), and the rules.md
   "Audits at rest" note — the harness gains the clearance assertion,
   so the "until spec 013" sentence updates to the standing fact.

## 9 · Resolutions record

Draft-day flags, 2026-08-28, from the morning's reads. All six
resolved by the owner and design the same morning; every fix re-read
from the nodes post-fix.

- **F1 — resolved (owner decision 2026-08-28): the placeholder
  answers.** Five of the six answers had no copy in the file — every
  `faq-question` instance carries the component's default `answer`
  prop (question 1's copy) and both open-state frames open only
  drawer 1. Resolution, the 009 precedent: **answer 1's copy builds
  under all six questions as a designed placeholder**; a content
  pass supplies the five real answers before cutover — recorded as a
  launch-checklist gate. The data module carries six explicit pairs
  so the pass is copy-only.
- **F2 — resolved (fixed 2026-08-28): the rm/rs question-4
  override.** Re-read post-fix: the ungrammatical "What happens if
  run out of credits?" is now the **designed short variant "What
  happens if I run out of credits?"** at rm and rs; rt/rd1/rd2 keep
  the full string. Question 4 is band-gated copy (§4 amendment); the
  set is otherwise one canon.
- **F3 — resolved (fixed + intent 2026-08-28): chat-row copy.**
  The rt/rd1 button labels re-read period-free (**Talk to us**, the
  011 R4 canon). The per-band label copy is **intent**: rt/rd1
  **Got a question?** · rd2 **Got another question?** — the build
  renders each band's designed string (§3 amendment).
- **F4 — resolved (fixed 2026-08-28): the stale chat instances.**
  Re-read post-fix: the rt button is a **new proper set instance**
  (`648:42086`, `button-ghost / sm`, 36 high, `icons/chat` — the old
  detached `400:5385` is gone) and the rd1 instance mounts the set's
  md at 40 with the icon layer correctly named `icons/chat`.
  Residual, naming only: the rd1 instance is still named
  `chat-button` — no build impact.
- **F5 — resolved (fixed 2026-08-28): the open-state frames.**
  Re-read post-fix: the 384-open frame's header is renamed
  `faq-header` and its gap row now matches the anchor record — a
  full row with the **filled square at [11,18]**, the col-10 circle
  gone. Residual, no build impact: the 1344-open strip still carries
  the stray col-0 cell at its top row — the anchor frames are the §2
  exposure record; the open frames supply the drawer archetypes only.
- **F6 — resolved (fixed 2026-08-28): the rs header box.** "rs" is
  the 576 band; the box is the FAQ header frame in the 576 anchor
  (`636:39065`, "Questions we get a lot."), which read 431 wide at
  draft — flagged as the ±1 artifact class and transcribed at an
  inferred 9t (432). Design trued the box the same morning; re-read
  post-fix at **480 = 10t** — the full block width, flush with the
  questions box — superseding the draft's 9t inference. §1/§3 carry
  the amendments (header 10t×2t; wrap inner 400); the top hairline
  spans the full 10t.
- **R7 — owner decision 2026-08-28 (late morning): FAQ open heights
  are content-derived.** The footer and the FAQ are not treated the
  same: the footer's drawers are fixed chrome over content that
  never changes (its designed 004 constants stand), while the FAQ is
  dynamic content — questions can be added and the G9 pass replaces
  the placeholder answers with real exposition. The law: **a drawer
  opens to the smallest whole-tick height whose bottom padding ≥ its
  top padding**, measured from the rendered answer by the island and
  re-derived on tick/band change — the grid never breaks, only the
  source of the number changes (measured, not transcribed). Evidence
  the drawn open states under-size the placeholder copy: xs content
  20+24+16+88+20 = 168 over the drawn 5t = 160 (the draft's
  tick-wins compression, bottom pad 12 vs 20 top), and the **576
  open frame `634:36435`** ("576 FAQ Open" — a new source, read
  through the bridge the same morning) draws the sm drawer at 3t =
  144 with the answer ending at 140 — **4px bottom pad vs 12 top**.
  Derivations with the placeholder copy: **6t · 4t · 3t · 2t · 2t**
  (deltas +4/+3/+2/+1/+1; md/lg/xl coincide with the drawn variants,
  re-verified at build). The open-state frames demote to grammar and
  exposure archetypes; no Figma trueing needed. §1, §4, §7.2, §8,
  and §10 carry the amendments.
- **R8 — the chevron's rendered truth (measured 2026-08-28,
  bridge).** The set mounts the standing 16-grid
  `IconChevronDownMedium` resized to 12; Figma keeps the stroke
  absolute on resize (`strokeWeight` 1.25, path 6.25×3.125), so the
  file renders a 12px glyph at 1.25 — which the standing SVG export
  scaled to 12 cannot reproduce (its stroke scales to 0.94). The §4
  prediction is confirmed as measured fact: the verbatim 12-viewBox
  export at stroke 1.25 ships as its own icon.
- **Build record — 2026-08-28 (the build, same day).** The token
  layer re-extracted first (001 rule): **zero drift** across
  primitives, the semantic library (light mode), spacing, radii, the
  135 text styles, and the three effect styles. Every §1/§2/§3/§4
  value re-verified from rendered bounds through the bridge; the R7
  derivations verified live on the built page — open ticks
  **6 · 4 · 3 · 2 · 2** with the placeholder copy, bottom pad ≥ top
  pad at every anchor, the audits green through open, handoff, and
  close at all five anchors. Deviations found and resolved:
  - **Question 4 is one canon** — re-read at build: all five anchor
    frames and the 384/576 open frames carry the short string; the
    file superseded the morning's F2 band split the same day. Built
    unbanded (§4 amendment); the 1344-open frame's full string is
    the stale archetype residual (F5's grammar-only standing). With
    the short string the rt row keeps its designed one-line rag.
  - **The rs header's right pad re-read 48** (symmetric 48/48,
    inner 384), superseding the morning's 32 (§3 amendment ⁴).
  - **The open md variant's question row reads 32** against its own
    closed 24 and the constant rows of the other four sizes — a set
    quirk; built as the constant closed row (the header never moves,
    the 004 construction). No visual delta beyond an 8px answer
    offset well inside the derived tick.
  - **The clearance assertion's first full run** surfaced the
    standing designed overlaps and the 011/012 off-lattice landmark
    kinds — declared per the §7.3 amendment (`clearanceExceptions`
    grew; `latticeExempt` added), every citation in the amendment;
    nothing silent, nothing built around.
  - **The close's wrap sweep, found at owner review (same day):**
    the built close ran the box edge and the delayed visibility flip
    but missed the 004 construction's third piece — the wrap's own
    bottom-up clip sweep. The closed row legitimately contains the
    answer's first pixels at xs/rt/rd1/rd2 (4/4/12/24px — the
    designed pads sit above the tick edge), so the answer's top line
    lingered inside the closed box until the visibility flip, reading
    as residue after the drawer looked closed — the identical defect
    the footer hit before its sweep existed. Fixed verbatim per the
    grammar: `clip-path inset(0 0 100% 0)` sweeps on the close curve,
    visibility flips after; paint-only, so the R7 measurement and
    every audit are untouched. Verified frame-by-frame at rd1 (the
    residue gone by 120ms) and at rest at every band.
  - **The assertion's first catch — the 007/008 button-bars** (the
    defect class the rules' grid digest predicted): both bars'
    material rows held ~0.2t of designed clearance against the
    exposed east cells, and the compressed slices ate it — at 520
    the portfolio sm row ran 0.6t into the col-9 cells, at 700 the
    engine md row 0.18t into col-8 (26 sweep failures, one cause).
    Fixed as 007 §6 / 008 §6 errata (dated amendments in both): the
    bar mounts' button geometry rides the weight sum — anchors
    byte-identical, compressed slices zoom the row, clearance holds
    by construction; the 003 primitive stays material. Verified: the
    520 bar edge now lands at 8.776t against the anchor's 8.78t.
- **Note** — single-open (§5) is the spec's choice on the 004
  precedent, carried with the grammar the drawers reuse; approval
  covers it, and design may veto at review.
- **Note** — rm/rs carry no FAQ chat row by design: 011's section
  already places two chat rows at each of those bands.
- **Note** — the FAQ closed rows read exactly 1t per band (2t rm) and
  the set's widths are the anchor mounts — a material-per-size
  primitive whose *mounts* are tick spans, like the footer rows; not
  the 011 R16 proportional class. The §1 units paragraph is the law.

## 10 · Acceptance criteria

At each of the five anchors and one arbitrary width per structural
slice (stretched and compressed), scrollbar forced on:

- [x] Every §1 landmark lands on its row (whole ticks, line-inclusive
      ±1px): the header and questions boxes, the six closed rows, the
      gap row, and the footer top at every audited width; with a
      drawer open the section grows by exactly the derived delta
      (§4 R7; placeholder copy: +4/+3/+2/+1/+1), every open drawer's
      bottom pad reads ≥ its top pad, and the footer lands on the
      grown row. *(Sweep green at the five anchors + ten slices;
      live drives: derived open 6/4/3/2/2t, bottom pads 43/51/43/25/57
      vs top 20/12/20/20/40, section 16→20 · 9→12 · 7→9 · 7→8 ·
      7→8t, sections check green with the cumulative-growth tops.)*
- [x] The §2 exposure renders per the map and nothing else is exposed
      over the section's rows: the narrowed rail, the full gap row,
      the three ornament cells; the header/row hairlines lie on
      canonical line pixels (never doubling the lattice); the rail
      extension cells render through a drawer's grown rows. *(Map
      re-verified cell-by-cell from the Grid layers at build; the
      bandgate/seams/landmark checks green everywhere; extensions
      verified visually at 384-open and by the drawer-open sweep
      states.)*
- [x] Type is exact at the anchors per §3/§4 (styles, wrap boxes, the
      head's designed line counts 2/1/2/2/2) and wrap counts hold
      across each band's slices — interiors ride the weights;
      horizontal clearance verified by the §7.3 assertion at every
      audited width. *(Head probes: 2/1/2/2/2 lines at 24/30 · 24/30
      · 24/30 · 32/38 · 42/50; every interior rides --faq-u; the
      assertion green at all 15 audited widths per route.)*
- [x] The §5 machine: single-open with the concurrent handoff;
      keyboard-operable disclosure buttons with visible focus,
      correct `aria-expanded`/`aria-controls`; closed answers hidden
      from the tree; the chat button inert
      (`data-action="open-chat"`) and focusable. *(Verified live:
      handoff closes 1 while 2 opens; aria-controls region visibility
      flips; focus stays on the pressed trigger; closed answers
      visibility-hidden; the chat button a real un-disabled button.)*
- [x] Motion per §6: the draw-down on the 004 clock and curves, the
      chevron rotating on the same clock, the rail cascade staggered
      on the promoted token; reduced motion renders every change
      state-to-state with all inputs working; a no-JS render is the
      settled closed section with the answer copy in the HTML.
      *(Grammar reused verbatim from footer.css; reduced-motion probe:
      full derived height 80ms after the click, transition none; no-JS
      probe: six answers in the HTML, none expandable, section at its
      designed 16t.)*
- [x] The page assembly: the expectations module carries the §7.1
      table; the sweep runs `/grid` + `/home-fixture` +
      `/pricing-fixture` green in one run — anchors, slices, and
      every §7.4 rest state; the §7.3 clearance assertion passes on
      all three routes with only the declared exceptions (any
      homepage exceptions recorded in §9 with citations). *(One run,
      exit 0, 328 checks; the declared exceptions in both fixture
      expectations modules with citations — §7.3 amendment/§9; the
      assertion's first catch, the 007/008 bars, fixed as errata.)*
- [x] Exactly **one** client island on the section (five on the
      page); both pricing routes static; `/pricing` route JS and
      first load recorded; the homepage routes and budgets untouched.
      *(faq-island.tsx is the section's only island; page islands:
      nav-desktop · nav-mobile · pricing-scale · faq · footer-nav.
      Production build: `/pricing` 133 B · 107 kB static,
      `/pricing-fixture` 132 B · 107 kB static (the 010 R6 null stub
      holding); `/` 111 kB first load unchanged — its route chunk
      read 135 B (+7 B), the footer-nav's §7.2 attribute adoption.)*
- [x] Zero TypeScript and lint errors; every value traces to a token,
      a named ramp style, or a §8 enumerated constant (no raw hexes;
      the pre-build re-extraction run and any drift recorded); the
      launch checklist's Pricing row updated in the same commit.
      *(tsc + lint clean; re-extraction zero drift across all layers
      — §9 build record; checklist and plan.md updated with the
      build.)*
