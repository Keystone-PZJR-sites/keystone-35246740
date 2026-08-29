# Spec 014 — Our Work: the header and the case studies

**Status:** Approved and built 2026-08-28 (owner approval, then the
build the same day — the token layer re-extracted first with zero
drift; every §1/§2/§3/§4/§5 value re-verified from rendered bounds at
build; two §2 deviations and one label-wrap erratum amended in place —
§9 build record). Draft 2026-08-28 — **all nine flags resolved**
(same-day flag pass: F1–F7 resolved and re-read post-fix, F8 withdrawn
as author error, F9 decided by the owner — the CTAs target
`/case-studies/{slug}`). One hygiene residual: the
1344 H1 still carries its double space (§9 F3) — cleanup only,
nothing builds from it
**Depends on:** spec 001 (tokens, fonts — the pre-build re-extraction
rule) · spec 002 / 002.r1 (the engine, nearest-anchor gates, the four
units) · spec 003 (ButtonFill / ButtonGhost primitives, the hover
grammar, the glyph paint-in-place doctrine) · spec 005 (the nav-item /
trigger-icon vocabulary the inline button reuses) · spec 006 (the inert
`open-chat` action contract, §9) · spec 009 (the `hard-shadow-square`
token) · spec 010 (the v2-only tree, `data-landmark`, the page pattern)
· spec 011 (the line-inclusive box law §9 R17; the page-composition
birth pattern) · spec 013 (the exposed-cell clearance assertion the
page expectations will adopt in 016)
**Sources:** fresh MCP reads 2026-08-28 of the Our Work section
`647:41297` — the five anchor frames `454:23319` (384, 3552 = 111t) ·
`648:43608` (576, 4080 = 85t) · `447:21642` (768, 3840 = 60t) ·
`648:42365` (960, 4240 = 53t) · `429:10937` (1344, 5376 = 48t); the
headers `652:48282` / `648:44462` / `447:22184` / `648:42850` /
`654:49107`; the case-studies frames `655:50016` / `655:50979` /
`655:50290` / `648:45887` / `636:37938`; the **`case-study-card` set
`648:41389`** (size × arrangement — 8 variants) and the
**`button-inline` set `648:41368`** (3 states); the page Grid layers
`648:44752` / `648:43872` / `648:43209` / `648:42366` / `636:37612`;
`get_variable_defs` on the section — all in `ks-MarketingSite`. Every
frame total, section top, card box, stack gap, header offset, and
lattice cell verified against rendered bounds through the console
bridge the same day; all fifteen card instances read for variants and
copy; ornament fills/strokes read with their variable bindings
(`bg/200` / `border/000`); the star vector exported verbatim. Design
decisions received 2026-08-28 (plan.md decision log): **the Get
Started CTAs navigate to `/pricing`**; the chat ghosts ship inert on
the 006 `open-chat` contract; no load choreography supplied — the
sections are born settled (the 011 §9 R10 precedent); the asset
exports landed as WebP (all fifteen case-study tiers verified at 2×
their band's rendered frame). The planning flags F1 (the 576 Grid
frame) and F5 (the hidden 768 header layer) were fixed by design the
same day and re-verified from rendered bounds before this spec was
written.

The Our Work page's first spec (014–016 build the page top-down; 015
takes the gallery, 016 the fullscreen overlay + page assembly). This
spec covers page rows 0 → the gallery-header top: the header (slug ·
H1 · subhead · CTA row) and the three case-study cards.

---

## 1 · Section anatomy — tick totals per band

Page rows, zero-based, from rendered bounds. The nav is overlay chrome
(44px material) and enters no stack. The section's last row is the
gallery-header top (spec 015's first row).

| landmark | rm (384) | rs (576) | rt (768) | rd1 (960) | rd2 (1344) |
|---|---|---|---|---|---|
| header top (px, tick-riding) | 100 (100/32·t) | 112 (112/48·t) | 80 (80/64·t) | 112 (112/80·t) | 174 (174/112·t) |
| header block (px, hugs) | 390 | 372 | 366 | 434 | 500 |
| case-studies top | 17t | 11t | 8t | 8t | 7t |
| card box (span × height) | 10.5t × 18t | 10t × 13t | 10t × 6t | 10t × 5t | 10t × 4t |
| card column span (ticks) | 0.5–11 | 1–11 | 1–11 | 1–11 | 1–11 |
| stack gaps between cards | 1t | 1t | 1t | 1t | 1t |
| case-studies end | 73t | 52t | 28t | 25t | 21t |
| gap to the gallery header | 2t | 1t | 1t | 1t | 1t |
| **section end (gallery-header top)** | **75t** | **53t** | **29t** | **26t** | **22t** |

Horizontal: the rm content inset is **t/2** (16px), the standing rm
rule; at rs/rt/rd1/rd2 the content sits at tick 1. The header hugs
inside its wrap boxes (§3); the cards are the tick spans above.

**Units.** Card boxes, stack gaps, and the section rows are geometry
(tick spans). Card interiors (pads, type, gaps, the stat dividers) are
material per size variant — the section chooses the variant per band
(§4) and owns each card's width. The header top offsets ride the tick
at the exact anchor ratios above; the H1/subhead wrap boxes and the
header flow gaps ride the weights as band constants (§3). Tick- and
weight-riding constants live in the `.page` block of the component
token layer (002.r1 §4 scope rule).

Within each card the image/profile split is whole-tick at the anchors:
xl 6t + 4t · lg 5t + 5t · md 5t + 5t (the row arrangements); sm 6t
over 7t · xs 6t over 12t (the centered stacks). In a section mount the
split rides the same ratios (image 6/10 · 5/10 · 5/10 of the card
span; the stacked images are full-span), so the interior edges stay on
ticks at every width.

## 2 · Exposure map

From the page Grid layers, verified cell-by-cell against rendered
bounds with fills/strokes and their variable bindings (grid
auto-layout metadata is never trusted alone). Cells are `[col,row]`,
zero-based page ticks. The lattice over this section is an **east-edge
staircase** descending from the top-right corner — the pricing
construction (011 §2) — reaching its run width by row 5–6 and holding
it to the section end; all other cells in rows 0 → section end are
unexposed. Cell strokes are `border/000`; ornament fills are `bg/200`.
As on the pricing page, the runs continue behind the content: the
cards (cols 1–10; 0.5–11 at rm) cover the staircase's inner columns
at the card rows, leaving col 11 (and the gap rows' full runs)
visible. The gallery rows and the pre-footer full-lattice row below
this section are spec 015's record.

| band | staircase (rows of this section, as drawn; re-read post-fix 2026-08-28 — §9 F6) |
|---|---|
| rm | r4: 11 · r5–74: 10–11 (amended 2026-08-28 at build — the r24/r33 widened cells read unpainted at the build re-read; the run is uniform, §9 build record) |
| rs | r4: 11 · r5: 10–11 · r6–52: 9–11 |
| rt | r2: 11 · r3: 10–11 · r4: 9–11 · r5–28: 8–11 |
| rd1 | r2: 11 · r3: 10–11 · r4: 9–11 · r5–25: 8–11 |
| rd2 | r2: 11 · r3: 10–11 · r4: 9–11 · r5–21: 8–11 |

**Ornament cells** (stroke-inclusive overlays per the 002 region
construction; ○ stroke-only circle · ● filled circle · ■ filled
square):

- rm: ○[11,5] · ●[10,7] · ■[11,16] · ●[11,45] · ■[11,73].
- rs: ○[11,5] · ○[9,7] · ○[10,14] · ■[11,20] · ●[11,38].
- rt: ○[11,3] · ○[9,5] · ■[11,7] · ●[11,14] · ○[8,15] · ■[11,28]
  (amended 2026-08-28 at build — the closing square landed in the file
  after the draft reads, completing the section-run pattern the other
  bands carry; §9 build record).
- rd1: ○[11,3] · ○[9,5] · ■[11,7] · ○[8,11] · ●[11,13] · ■[11,25].
- rd2: ○[11,3] · ○[9,5] · ■[11,6] · ●[11,11] · ○[8,12] · ■[11,21].

Ornament cells are `.decor` vocabulary — never content, never pointer
targets. The filled circles at rm [11,45] / rs [11,38] / rt [11,14] /
rd1 [11,13] / rd2 [11,11] sit in the visible east rail or the gap
rows between the cards; the filled squares close each band's section
run. Four stroke-only circles (rs [10,14] · rt [8,15] · rd1 [8,11] ·
rd2 [8,12]) sit inside the runs under the opaque cards — drawn as
read, covered at rest (a hygiene note for a later file pass, not a
build change).

**Declared overlaps** (for 016's clearance-assertion expectations,
the 013 pattern): the card boxes cross the staircase's inner columns
at the card rows per band (col 10 at rm · 9–10 at rs · 8–10 at
rt/rd1/rd2, ~~plus rm's [9,24]/[9,33]~~ — the rm widened cells read
unpainted at the build re-read, amended 2026-08-28; §9 build record);
the rt subhead's weight-riding
wrap box (480 → right edge 544) crosses [8,5] by 32px at the anchor.
All designed — the content renders over the lattice exactly as the
file does; declared, never tolerated silently.

**Not built (§9 F7, owner decision):** the paintless circles rm
[9,29] · rs [8,13] · rt [7,12] · rd1 [8,39] (015's range) — the
standing 011 F2 "Rectangle 143" class, invisible strokes; they stay
in the file and are never built.

## 3 · Header

One column: slug · H1 · subhead · CTA row.

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| slug style | `text/xs/Medium` | `text/xs/Medium` | `text/xs/Medium`¹ | `text/sm/Medium` | `text/sm/Medium` |
| slug dot (bg/400, square) | 6px | 6px | 6px | 7px | 7px |
| slug dot gap | 8 | 8 | 8 | 12 | 12 |
| H1 style | `display-serif/sm+/Thin` 36/42 | `display-serif/sm+/Thin` 36/42 | `display-serif/md/Thin` 40/48 | `display-serif/lg/Thin` 48/56 | `display-serif/3xl/Thin` 72/78 |
| H1 wrap box (weights) | 304 | 336 | 480² | 560 | 896² |
| H1 lines | 4 | 4 | 3 | 3 | 3 |
| subhead style | `text/md/Light` | `text/md/Light` | `text/lg/Light` | `text/xl/Light` | `text/2xl/Light` |
| subhead wrap box (weights) | 240 | 336 | 480 | 560 | 560 |
| gaps slug→H1 / H1→subhead / subhead→CTA | 12 / 24 / 24 | 12 / 24 / 24 | 16 / 24 / 40 | 24 / 40 / 40 | 24 / 40 / 40 |

¹ read `text/xs/Regular` at draft (the 011 R3 recurrence); fixed by
design and re-read 2026-08-28 (§9 F1) — **`text/xs/Medium`**, uniform
with the other bands' Medium weights. The table row above carries the
built truth.
² design intent confirmed 2026-08-28 (§9 F3): every H1 rags
**naturally inside its padded wrap box** (tick-based padding — the rt
box is 512 − 32 pad, the rd1 720 − 160). The build renders the
canonical copy with natural wrap; the rag is verified against the
frames' rendered line breaks at build. The rt/rd2 nodes still carried
residual double spaces at the re-read — file cleanup pending, nothing
built from them.

Copy (curly apostrophes, the 008 canon — the canonical single-spaced
strings): slug **Our Work** · H1 **Beautiful websites, ads, social,
and content that grow your business.** · subhead **Designed to convert
and built to rank, your website is the foundation for a system powered
by five interconnected engines that drive your marketing.** Colors:
slug and subhead `text/400`, H1 `text/100`.

**The CTA row.** A hugging row: the 003 **ButtonFill** (teal pill,
label **Get Started**, the trigger glyph) · at rd1/rd2 a material
label **Got a question?** · the 003 **ButtonGhost** (brown,
`icons/chat`, label **Talk to us**³).

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| ButtonFill size (003) | sm (36) | md (40) | lg (48) | lg (48) | lg (48) |
| ButtonGhost size (003) | sm (36, icon 16) | md (40, icon 18) | lg (48, icon 20) | lg (48, icon 20) | lg (48, icon 20) |
| Got a question? | — | — | — | `text/lg/Light` `text/400` | `text/lg/Light` `text/400` |
| gaps fill→label / label→ghost | 32 (fill→ghost) | 32 | 32 | 32 / 16 | 40 / 24 |

³ the 384 frame read "Talk to Us" at draft; fixed by design and
re-read 2026-08-28 (§9 F2) — the canon **Talk to us** now holds at
every band.

The Get Started buttons are links to **`/pricing`** (owner decision
2026-08-28), same tab. The chat ghosts render the **inert `open-chat`
action** (the 006 §9 contract on ButtonGhost): `data-action=
"open-chat"`, no handler, wired when the chat widget lands. The label
is material like the buttons beside it (the 011 R13 rule).

## 4 · The case-study card — a new primitive

A two-part card: the **site image** (the customer's website, an
art-directed export — §7) and the **profile card** (a `bg/000` box,
1px `border/000`, line-inclusive per the 011 R17 law). Row
arrangements at md/lg/xl put them side by side (`left-image` /
`right-image`); sm/xs stack the image over the profile (`centered`).

**Shadow and z-order.** The site image carries the
`hard-shadow-square` token (read from the effect style on every
variant); the profile card carries **no** effect. *Amended 2026-08-28
(evening, design addition): the site image also carries a **1px
`border/000` stroke** — read from all eight variants and the section
instances with its variable binding (first through the official MCP
with the console bridge down, re-verified through the bridge when it
returned; the CENTER stroke-align is the standing ±0.5 read-artifact
class — the intended whole value is the 1px hairline). The image is
therefore a bordered box under the 011 R17 law: its trailing edges
take the same line-inclusive +1px treatment as the profile, so the
seam and the lattice lines stay single hairlines.* At `left-image` and
`centered` the image sits **above** the profile in z, so its shadow
paints over the card where they touch; at `right-image` the profile
sits above and the image's shadow falls east and south. The touching
edge shares its pixel (line-inclusive); z decides whose ink paints.

**Interiors — material per size** (`justify-between` column: the
title/description block anchors top, the stats/CTA block anchors
bottom; where the designed content hugs shorter than the tick height
the slack sits between them — the tick wins):

| | xl | lg | md | sm | xs |
|---|---|---|---|---|---|
| profile pads (t/x/b) | 24/32/32 | 20/24/24 | 20/20/20 | 16/16/16 | 16/16/16 |
| category style | `text/sm/Light` | `text/sm/Light` | `text/sm/Light` | `text/xs/Light` | `text/xs/Light` |
| category→title gap | 6 | 2 | 6 | 6 | 6 |
| title style (serif) | `display-serif/xs+/Light` 28/34 | `display-serif/xs+/Light` 28/34 | `display-serif/xs/Light` 24/30 | `display-serif/xs/Light` 24/30 | `display-serif/xs/Light` 24/30 |
| title→description gap | 16 | 8 | 12 | 12 | 12 |
| description style | `text/lg/Light` | `text/lg/Light` | `text/md/Light` | `text/md/Light` | `text/md/Light` |
| stats→CTA gap | 32 | 20 | 20 | 20 | 20 |
| stat slug style | `text/sm/Light` | `text/sm/Light` | `text/sm/Light` | `text/xs/Light` | `text/xs/Light` |
| slug→stats-row gap | 8 | 8 | 6 | 6 | 6 |
| stat numeral style | `display-sans/2xs/Light` 28/36 | `text/2xl/Light` 24/32 | `text/2xl/Light` | `text/2xl/Light` | `text/2xl/Light` |
| numeral→label gap | 4 | 0 | 4 | 4 | 4 |
| stat label style | `text/sm/Regular` | `text/sm/Regular` | `text/sm/Regular` | `text/xs/Light` | `text/xs/Light` |

Inks: title `text/100` · description and numerals `text/300` ·
category, stat slug, and stat labels `text/400`. The stats row is
three equal flex cells on a 16 gap with 1px `border/000` full-height
dividers between; labels render two lines in the narrow cells (the
file forces the breaks with explicit break characters — built as
natural wrap, which reproduces the two-line rag in the fixed cells;
verified at build). A stat value may carry the **star** (§7 —
`IconStar`, 15×14, `text/500`) on a 4 gap after the numeral; the set's
`stat3-container` slot is the record. The starred numerals step with
their size like the siblings (24/32; 28/36 at xl) — fixed by design
and re-read at every anchor 2026-08-28 (§9 F5).

**The inline button** (`button-inline`, a new primitive): label
**View Case Study** in `text/md/Regular` 16/22, `text/100`, the 10px
trigger glyph (`IconNavTrigger`, the 005 vocabulary) on a 4 gap — one
size at every band. Hover: the glyph advances 4px right (gap 4 → 8 in
the set's hover variant) on `--motion-hover-duration` /
`--motion-hover-ease`, paint-in-place `left` (the 003 glyph doctrine),
and returns on mouse-out. Focus: `:focus-visible` paints the row's
`bg/400` wash (the set's focus variant — the visible focus style).
Destination: each card's **case-study page, `/case-studies/{slug}`**
(owner decision 2026-08-28 — §9 F9); the slugs are §5's. The routes
404 on this branch until the rebuilt case-studies surface lands (the
010 F1 precedent; its design is ready and follows the Our Work
phase — plan.md), and the same URLs are live on the old site until
cutover.

## 5 · The case studies — order and copy

Three cards, top-down, verified identical across all fifteen instances
(one canon slip — §9 F4). Arrangement at md/lg/xl alternates
**left-image · right-image · left-image**; sm/xs render all three
centered.

1. **Palm Coast Zivel** — category **Recovery & Wellness** ·
   description **Kelly Lang had a beautiful wellness studio and real
   demand but follow-up was manual and leads were slipping through the
   cracks until Keystone gave him one system to manage it all.** ·
   stat slug **In the first four months:** · stats **257** Leads
   tracked · **22** Consults booked · **14** New members.
2. **Your Health Solutions** — **Medical Spa** · **Jessica Roche
   opened Your Health Solutions and flipped on every Keystone tool at
   once. Within just a few months, the calendar was filling on a
   $10-a-day ad budget.** · **In the first five months:** · **320**
   Leads tracked · **$3.50** Per lead · **5**★ Average rating.
3. **Bare Lúx Studio** — **Medical Spa** · **Estefany Crook wanted
   reach and a way to capture demand. Keystone delivered both on a
   lean budget, including a front desk agent that answers every lead,
   even in Spanish.** · **In the first five months:** · **100k+**⁴ Ad
   impressions · **109** Leads tracked · **5**★ Average rating.

⁴ the 1344 instance read "+100k" at draft; the canon is **100k+**
(design decision, fixed and re-read 2026-08-28 — §9 F4).

The image slots map to the export set (§7): zivel · yhs · barelux.
The View Case Study destinations (§9 F9) use the standing slugs,
verified against the old site's data modules on `main`:
`/case-studies/palm-coast-zivel` · `/case-studies/your-health-solutions`
· `/case-studies/bare-lux-studio`.

## 6 · Motion

**No load choreography** — none was supplied (plan.md, 2026-08-28);
the sections are born settled (the 011 §9 R10 precedent). A later
entrance choreography would inherit the 006 orchestrator via a new
spec. ~~The one grammar here is hover-only~~ *(superseded the same
evening — see §6.0)*:

### 6.0 · The entrance (amended 2026-08-28, owner direction)

The page runs a **rises-only** cut of the homepage load sequence —
the 006 grammar and rhythm with **no nav beat** (the nav never
reloads), **no lattice sweep** (the exposure lines are born settled),
and **no highlight pass** (nothing here has chips). The above-the-fold
elements ride the shared fade-rise (`hx-rise`,
`--motion-rise-duration` / `--motion-rise-ease`) at the 006 delays
(the component-layer constants, built for inheritance):

| beat | element | delay |
|---|---|---|
| h1a | slug | 80ms |
| h1b | H1 | 190ms |
| sub1 | subhead | 330ms |
| cta | CTA row | 490ms |
| rect | card 1 | 620ms |

Cards 2–3 are below the fold at every band and stay born settled.
Card 1's hard shadow never paints while its box moves (the shadow
law): it grows from the `--shadow-hard-square-0` origin over
`--motion-card-shadow-dur` on the drawer ease-out after the rise
lands — and that growth is the choreography's **final beat**: the
orchestrator settles the page on its `animationend`.

Mechanics: the 006 orchestrator generalized at this second consumer
(`load-orchestrator.tsx`, the final beat parameterized; `HeroLoad`
stays as the homepage's thin wrapper — behavior unchanged). The page
opts in via its own root class `v2-choreo-rise`, whose cold-load
guard (our-work.css) holds **only** the rise elements hidden until
`v2-load`; the homepage's page-wide sweep and nav-drop rules are
suppressed under it. The composition therefore carries **one client
island** (the orchestrator — the homepage pattern); both sections
stay island-free. `v2:replay` re-runs; reduced motion and no-JS
render the settled page (the §6.2 contract unchanged).

### 6.1 · The inline-button glyph advance

While the pointer rests on the button (hover-capable media), the
trigger glyph slides exactly 4px right and slides back on mouse-out,
both on `--motion-hover-duration` / `--motion-hover-ease` — the 003
button-glyph grammar at its designed distance; animated as
paint-in-place `left` (the 003 doctrine). Geometry never changes; the
label never moves.

### 6.2 · Reduced motion

`prefers-reduced-motion: reduce` renders the grammar state-to-state —
transitions off, the advanced state still applies while hovered. A
no-JS render is the settled section; nothing here needs JavaScript.

## 7 · Assets and constants

1. **Case-study images** — fifteen WebP tiers received 2026-08-28
   (`…/03-newsite/ourwork/export`), verified at exactly 2× each band's
   rendered frame: per site (zivel · yhs · barelux) the tiers 384
   (672×384) · 576 (960×576) · 768 (640×768) · 960 (800×800) · 1344
   (1344×896). The five cuts are **art direction** (aspect changes per
   band), so every band gets its own `<source>`; tier cuts follow the
   structural gates (470 · 665 · 860 · 1130), the smallest tier is the
   `<img>` fallback, explicit `width`/`height` per tier. They land in
   `public/media/case-studies/` as
   `casestudy-{zivel|yhs|barelux}-{384|576|768|960|1344}.webp` (the
   export names, already kebab and identifiable) with a registry
   builder `caseStudySrc(site, cut)` in `v2/media.ts`. Meaningful alt
   (the images are the customers' sites, not ambient): "The {name}
   website". Card 1 loads eager; cards 2–3 lazy.
2. **The star** — `IconStar`, a verbatim console-bridge export (15×14,
   one path), paint normalized to `currentColor`, inked `text/500` at
   the mount. Exported 2026-08-28; the SVG is on record in this spec's
   source reads.
3. **Constants** (component token layer, `--wk-*`): the `.page` block
   carries the tick-riding header tops (100/32 · 112/48 · 80/64 ·
   112/80 · 174/112) and the weight-riding wrap boxes and header flow
   gaps (§3); per-band material blocks carry the CTA-row gaps and the
   Got-a-question label metrics. The card interiors are the
   primitive's size-variant values (§4), owned by its stylesheet — not
   `--wk-` constants. No new file variables are needed; every ink
   above is a standing token (the pre-build re-extraction still runs,
   001 rule).

## 8 · Deliverable — files, semantics

1. **Sections** `design-system/v2/sections/work-header.tsx` +
   `work-header.css` and `work-cases.tsx` + `work-cases.css` — server
   components, **zero client islands** (hover is CSS; the CTAs are
   links; the chat ghost is inert). *Amended 2026-08-28 (§6.0): the
   composition mounts the generalized load orchestrator — one page
   island, the homepage pattern; the sections themselves stay
   island-free.* Landmarks carry `data-landmark`
   (header top, each card, the section end) for the 016 page
   self-test. Copy and card data live in
   `sections/work-cases-data.ts` (prop-driven components, the §5 canon
   with curly apostrophes and the ú in Bare Lúx).
2. **Primitives** `design-system/v2/primitives/case-study-card.tsx` +
   `.css` (size × arrangement per §4, content prop-driven, the star an
   opt-in per stat) and `button-inline.tsx` + `.css` (states
   CSS-driven, `href` mandatory, `forceState` for the catalog). The
   `/primitives` catalog gains both sets in the same commit.
3. **Icons** — `IconStar` into `design-system/v2/icons.tsx` (§7.2);
   `IconNavTrigger` and `IconChat` exist — never re-exported.
4. **Routes** — the composition module `design-system/v2/our-work.tsx`
   is born here mounting nav · work-header · work-cases · footer,
   mounted by `/our-work` (the route the nav, footer, and the 007/008
   button bars already target) and the permanent noindexed QA surface
   `/our-work-fixture`; 015/016 splice their sections in as they land.
   Until 015, the footer sits directly below the section end — the
   interim composition, the 011 pattern. Page metadata ships the
   placeholder title ("Our Work | Keystone"); the pre-launch metadata
   wipe (010 §7 F2 / checklist G4) covers the final copy.
5. **Semantics**: `work-header` is a `<section>` with the page's
   `<h1>`; the slug is a decorative eyebrow (`aria-hidden` dot). Each
   case study is an `<article>` with an `<h2>` (the customer name);
   the stats are a `<dl>` (value `<dd>`, label `<dt>`); the star is
   `aria-hidden` beside its numeral (the label "Average rating"
   carries the meaning); the site image has meaningful alt; the View
   Case Study CTA is a real `<a>`; the chat ghost a real `<button>`.
   Lattice, ornament cells, and dividers are presentation
   (`aria-hidden` where SVG; CSS borders otherwise).
6. Docs in the same commits: plan.md's Our Work record and the launch
   checklist's per-page row.

## 9 · Resolutions record

Draft-day flags, 2026-08-28; resolutions the same afternoon, every
fix re-read from the nodes post-fix. Nothing is built from a node
known to be wrong.

- **F1 — resolved (design, 2026-08-28)**: the 768 slug read
  `text/xs/Regular` where every other band is Medium — the exact 011
  R3 recurrence. The first reported fix did not land (the re-read
  still returned Regular); design re-fixed the same afternoon and the
  confirming re-read returned **M Medium**. Built Medium.
- **F2 — resolved (design, 2026-08-28)**: the 384 ghost label read
  "Talk to Us"; fixed and re-read — **Talk to us** at every band.
- **F3 — resolved as intent (design, 2026-08-28)**: every H1 rags
  **naturally inside its padded wrap box** (tick-based padding); no
  designed breaks anywhere. The build renders the canonical
  single-spaced copy with natural wrap and verifies the rag against
  the frames' rendered breaks. The rt node's double spaces were
  cleared and re-read clean the same afternoon (canonical string,
  three natural lines in the 480 box); **the rd2 node still carries
  one double space** (before "grow") at the latest re-read — a
  hygiene residual for the file, nothing builds from it.
- **F4 — resolved (design, 2026-08-28)**: the Bare Lúx stat canon is
  **100k+**; the 1344 instance's "+100k" fixed and re-read.
- **F5 — resolved (design, 2026-08-28)**: the starred numerals now
  step with their size (24/32 at xs/sm/md/lg · 28/36 at xl); re-read
  at all five anchors.
- **F6 — resolved (design, 2026-08-28)**: the four east-rail holes
  ([11,21] rs · [11,5]/[11,19]/[11,20] rd2) are filled; every cell
  re-read inked, the runs continuous. §2 carries the post-fix map.
- **F7 — resolved (owner, 2026-08-28): the paintless circles are not
  built.** The standing 011 F2 "Rectangle 143" class (invisible
  strokes, nothing renders): rm [9,29] · rs [8,13] · rt [7,12] · rd1
  [8,39] (gallery rows, 015's range). They stay in the file; the
  build ignores them.
- **F8 — withdrawn (spec author error, 2026-08-28)**: the draft
  misread the Grid layers as over-drawing versus a supposed
  "effective exposure" convention. The pricing Grid layers draw the
  same way — the 011 rt staircase (r5–15: 8–11) runs behind the list
  boxes (ticks 1–11) exactly as these runs pass behind the cards.
  §2 was rewritten the same day to the drawn map (the 011 shape),
  with the content-over-lattice spans carried as declared overlaps
  (the 013 expectations pattern). No design action.
- **F9 — resolved (owner, 2026-08-28): the View Case Study CTAs link
  to the case-study pages, `/case-studies/{slug}`** — the URLs live
  on the old site today (e.g. keystone.app/case-studies/
  palm-coast-zivel/) and return as rebuilt pages: the owner has a
  case-studies design ready to go after the Our Work page and the
  gallery (plan.md carries the pipeline note). Until that page
  lands, the routes 404 on this branch — the 010 F1 precedent
  (nav/footer already ship such targets). Slugs verified against
  `main`'s data modules (§5). The build gate is closed.
- **Note** — the stat labels' two-line rag: the set forces the breaks
  with explicit break characters ("Leads␣␣tracked" class); the build
  uses natural wrap in the fixed stat cells, which reproduces the rag;
  verified at build against the frames' rendered label heights.
- **Note** — "Got a question?" exists only at rd1/rd2 by design (the
  hidden rt layer was deleted at planning — plan.md F5, verified gone
  2026-08-28); rm/rs/rt render the two buttons only.
- **Note** — no load choreography supplied; born settled (011 §9 R10).
  A later entrance is a new spec on the 006 orchestrator.
- **Note** — the declared overlaps (§2): the card boxes over the
  staircase's inner columns per band, and the rt subhead wrap box
  over [8,5] (32px at the anchor) — per the file's render. Carried
  into 016's expectations as designed overlaps, the 013 pattern.

**Build record, 2026-08-28.** The token layer re-extracted first (001
rule) — zero drift across primitives, library semantics, spacing,
radii, text styles (all 135), and the three hard-shadow effect styles;
one observation: the `noise` effect style no longer returns from the
file (no consumer — the `--noise-opacity` token stands). Every
§1/§3/§4/§5 value re-verified from rendered bounds; the file had moved
since the draft reads (the rm/rs/rt case-studies frames were recreated
under new node IDs — 662:10387 · 662:10521 · 662:10656 — with
identical geometry), and the re-read surfaced two §2 deviations plus
one erratum, amended in place:

- **The rm r24/r33 widened cells are gone** — both read as unpainted
  rectangles at the build re-read (fills and strokes empty, verified
  per-cell). The rm run is uniform 10–11; the two cells drop from the
  declared overlaps. Both were card-covered either way.
- **rt gained its closing square** — ■[11,28] (`bg/200` fill,
  `border/000` stroke, verified per-cell), completing the "filled
  square closes the section run" pattern rm/rd1/rd2 already carried.
  Built; rs remains the designed outlier (its run ends open at r52).
- **The stat labels' two-line rag** — the label note's premise did not
  survive the wide cells: natural wrap in the full cell width holds
  one line at xl/lg (the cells are wider than the label text; the file
  forces per-word breaks in every instance). Built as natural wrap in
  a **min-content label box**, which reproduces the file's per-word
  rag at every size with the canonical copy — no break characters.
- Two node observations, nothing built from them: the rs CTA wrapper
  still carries its "Got a question?" layer **hidden**
  (`visible: false` — the same class as the deleted rt layer; §9
  note stands, two buttons at rs); the rd1 header frame hugs 434
  while its content ends at 416 (an 18px frame slack — the build
  positions the case-studies top absolutely, so no value derives from
  the frame hug). The rd2 CTA label wrapper carries a 16px left pad
  in the file; the designed 40/24 gaps sit on the label text and are
  built as read there.

**Same-evening design revisions, 2026-08-28** (the 011 R13 cadence —
owner direction after the built page's review; both landed as dated
amendments, §4 and §6.0):

- **R1 — the site-image stroke.** Design added a 1px `border/000`
  stroke to the card set's site-image on all eight variants; read
  with its binding through the official MCP (the console bridge was
  down at the read; re-verified through the bridge the same session)
  and built with the line-inclusive trailing edges (§4 as amended).
  The seam scans verified single hairlines: the interior boundary is
  one shared pixel (plus the image's designed 4px shadow band over
  the profile at left-image/centered), the card's outer borders land
  on the lattice pixels, and the image/profile bottom borders align.
  The same pass corrected a first-build R17 miss the stroke exposed:
  the row-mode profile's bottom border sat one pixel short of the gap
  row's line (now −1px, shared with the exposed run cells' tops).
- **R2 — the rises-only entrance (§6.0).** The homepage sequence
  minus the nav beat, the lattice sweep, and the highlight pass; the
  006 orchestrator generalized at its second consumer
  (`load-orchestrator.tsx`; `HeroLoad` wraps it — homepage behavior
  and composition unchanged). Verified 2026-08-28: exactly six
  animations in the run (five rises at 80/190/330/490/620 × 800ms +
  the shadow beat at 1420 × 450ms), nav and lattice never animate,
  the settle lands on the shadow beat, `v2:replay` restarts, reduced
  motion and no-JS render settled, and the landmark audit passes at
  rest at all nine re-checked widths (the audit waits for
  `v2-settled` — the audits-at-rest law).

## 10 · Acceptance criteria

At each of the five anchors and one arbitrary mid-band width per band
(stretched and compressed), scrollbar forced on:

- [x] Every §1 landmark lands on its row (whole ticks, line-inclusive
      ±1px) at every audited width: header top rides its anchor ratio;
      case-studies top 17/11/8/8/7t; cards 18/13/6/5/4t with 1t stack
      gaps; section end 75/53/29/26/22t; the footer (interim
      composition) lands on the section end until 015 splices in.
      (Measured 2026-08-28 at 384 · 576 · 768 · 960 · 1344 and slices
      420 · 500 · 620 · 700 · 820 · 900 · 1050 · 1150 · 1500 — every
      landmark exact: header tops 100/32·t … 174/112·t, section ends
      75.000/53.000/29.000/26.000/22.000t, footer on the end at all
      fourteen widths.)
- [x] The card boxes and their image/profile splits are whole-tick at
      every audited width; the profile borders sit line-inclusive on
      the lattice pixels; the image's hard shadow paints per §4's
      z-order and never while anything moves.
      (Splits 50%/50%/60% verified at all row-band widths; stacked
      images 6t; profiles k·t+1px trailing edges; the shadow is the
      static `--shadow-hard-square` token — nothing moves. Amended
      2026-08-28 with the stroke and the entrance: both boxes
      line-inclusive, seams pixel-scanned as single shared hairlines;
      card 1's shadow holds the 0,0 origin through its rise and grows
      after it lands — the law holds through §6.0.)
- [x] The §2 staircase registers with the page lattice col-for-col at
      every audited width (line-inclusive), with the ornament cells
      (`bg/200` fills, `border/000` strokes) per band and nothing else
      exposed over the section's rows; the paintless circles are not
      built (§9 F7); the declared overlaps render exactly as the file
      does — content above the runs, col 11 and the gap rows visible.
      (Built from the §2 map as amended at build — the rm uniform run,
      the rt closing square; screenshots compared against the file at
      all five anchors.)
- [x] Type is exact at the anchors per §3–§5 (styles, wrap boxes, line
      counts — H1 4/4/3/3/3, subhead 5/4/3/3/3) and wrap counts hold
      across each band's slices; the H1 and stat-label rags follow the
      §9 F3 and label-note resolutions.
      (Line counts measured 4/4/3/3/3 and 5/4/3/3/3 at all fourteen
      widths; H1/subhead rags compared against the header frames at
      every anchor — identical; the stat labels wrap per-word via the
      min-content erratum, §9 build record.)
- [x] The three cards render §5's copy canon (curly apostrophes, the ú,
      the F4-resolved stat) in the designed order and arrangements
      (L·R·L at rt/rd1/rd2, centered at rm/rs); the stars render on
      the two Average-rating stats only, inked `text/500`.
      (Copy from the §5 data module; flip verified on card 2 only at
      the row bands; two stars, `currentColor` = text/500.)
- [x] Every Get Started navigates to `/pricing` same-tab; the chat
      ghosts are inert `data-action="open-chat"` and keyboard-focusable
      with visible focus; the View Case Study CTAs resolve to
      `/case-studies/{slug}` on §5's three slugs (§9 F9); the inline
      button's glyph advances 4px on hover and returns (hover-capable
      media only), with the focus wash visible on `:focus-visible`.
      (Hrefs asserted at all fourteen widths; hover advance measured
      exactly 4px paint-in-place, box width unchanged; keyboard focus
      reached the inline button with the bg/400 wash — #e0ddd1
      computed.)
- [x] Reduced motion renders state-to-state; a no-JS render is the
      settled page byte-identical above the fold; zero client islands
      on both sections; `/our-work` and `/our-work-fixture` render
      server-only; the homepage and pricing routes and budgets are
      untouched.
      (Reduced-motion emulation reads 0s transitions; both routes
      prerender static — 832 B route JS · 105 kB first load; no
      `use client` in any 014 file; `/` 135 B/111 kB and `/pricing`
      133 B/107 kB unchanged; the full grid sweep green post-build.
      Amended 2026-08-28 (§6.0): the composition gains the
      orchestrator island — the sections stay island-free; reduced
      motion and no-JS verified born settled with zero running
      animations; budgets re-measured at the amendment build —
      `/our-work` 1.17 kB route JS · 106 kB first load, still static;
      `/` and `/pricing` unchanged; the full sweep green after the
      orchestrator refactor.)
- [x] The images serve the correct art-directed tier per band
      (media-gated at the structural gates), explicit dimensions, card
      1 eager / cards 2–3 lazy; every asset path resolves through the
      media registry.
      (currentSrc asserted per band at all fourteen widths — the
      384/576/768/960/1344 tiers at their gates; width/height on every
      source and the fallback img; `caseStudySrc` is the only path
      source.)
- [x] Zero TypeScript and lint errors; every value traces to a token, a
      named ramp style, or a §7 enumerated constant; the token layer
      re-extracted before the build (001 rule) with drift recorded.
      (tsc + lint zero 2026-08-28; re-extraction zero drift — one
      observation, the `noise` effect style gone from the file, no
      consumer; §9 build record.)
- [x] Accessibility: keyboard-reachable CTAs with visible focus, the
      §8 semantic structure, contrast measured and recorded (text/400
      on bg/000 and bg/100 at the used sizes), decorative chrome
      hidden from the tree.
      (Measured 2026-08-28: text/400 #847f71 on bg/000 4.00:1, on
      bg/100 3.73:1 — the standing sitewide secondary-ink pairs, 14–24
      Light; text/300 on bg/000 6.86:1; text/100 on bg/100 10.88:1;
      the star's text/500 on bg/000 3.10:1, decorative beside its
      labeled stat. Lattice, ornaments, dividers, star aria-hidden;
      stats a `<dl>`; the h1/h2 structure per §8.5.)
