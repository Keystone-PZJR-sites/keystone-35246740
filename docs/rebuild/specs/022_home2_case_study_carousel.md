# Spec 022 — Homepage v2: the case-study carousel

**Status:** Approved 2026-09-06 (owner, in-chat, after the R3–R7
pre-approval rulings) — **built the same day**; §9 B1–B9 is the build
record (all six draft flags resolved the same afternoon; fixes re-read
from the nodes)
**Depends on:** spec 012 (**the persona-carousel machine is this
section's grammar source** — the one-k island, the pointer lessons, the
promoted `--motion-snap-*` and `--motion-ghost-opacity` tokens) · spec
018 (the `home-next` composition) · spec 021 (splice order — the section
follows the work deck) · spec 017 (the `/case-studies/{slug}` targets) ·
spec 014 (the per-study copy canon the coming content pass draws from) ·
spec 003 (`button-fill`, `_nav-trigger-icon`) · spec 002.r1/.r2 · spec
001. Supersedes the v1 testimonials' slot (spec 009 stays the frozen
record).
**Sources:** fresh MCP reads 2026-09-06 of the case-study sections at the
three drawn anchors — 1344 `799:60908` · 768 `859:98749` · 384
`859:98748` (headers, carousels, and all nine drawn card instances) —
and the `casestudy-preview-card` set (`785:26597`, state × size, six
variants), plus the Grid rows behind the section. **Every geometry fact,
binding, style, and per-cell exposure was read through the console
bridge against rendered bounds this session**; the six draft flags were
ruled or fixed by the owner/design the same afternoon and every fix was
re-read post-fix (§9). Asset exports received
(`~/Dropbox/…/03-newsite/home/case-studies/export`, 9 WebP, §7).

The homepage's closing content section: three case-study preview cards
in a strip, one active at full color, the others resting as ghosts. The
012 pricing carousel built this interaction already — this section
reuses that machine without the slider.

---

## 1 · Section anatomy — tick totals per band

| band | section rows | header | carousel |
|---|---|---|---|
| base 384 (t=32) | 191–212 (22t) | 192 = 6t (rows 191–196) | 512 = 16t (rows 197–212); cards 288 × 512 portrait (9t × 16t), strip x 32, stride 320 (10t), gaps 1t |
| rs 576 (derived) | the 384 design — geometry on the tick, type riding the 384/768 midpoint walk | | |
| rt 768 (t=64) | 138–148 (11t) | 320 = 5t (rows 138–142; pl 64 pr 136) | 384 = 6t (rows 143–148); cards 576 × 384 (9t × 6t), strip x 64, stride 640 (10t), gaps 1t |
| rd1 960 (t=80, derived) | the 1344 design at t=80 | | |
| rd2 1344 (t=112) | 34–41 (8t) | 448 = 4t (rows 34–37; headline box pr 224) | 448 = 4t (rows 38–41); cards 784 × 448 (7t × 4t), strip x 112, stride 896 (8t), gaps 1t |

The section reads whole-tick at every anchor — **the 1344 +1px is fixed**
(§9 F1: the carousel's mis-painted top border; section re-read 896,
carousel y 448). A full-lattice row follows the section at every anchor
(r42 · r149 · r213) before the footer. The strip overflows right under
the page clip (card 2 partially visible at rest, card 3 off-canvas —
the drawn rest).

*Amended 2026-09-08 (owner report at the built review, §9 B15):* the
drawn 384 page carries **2t of bare clearance BEFORE the section**
(rows 189–190, between the work section's r188 end and this section's
r191 start — verified at rendered bounds: work bottom 14475, section
top 14539); 768 and 1344 are drawn flush. The splice had stacked the
sections flush at every band and the slug rode the work band's bottom
rule at base. The built section owns the clearance as a 2t leading
band at base (the pre-footer-row precedent): 2t + 22t + 1t = 25t,
header at 2t, carousel at 8t, the §2 exposure riding at gy +2; rs
derives it; the rt/rd constructions are unchanged.

## 2 · Exposure map

- **1344**: rows 34–37 cols 8–11 (the east field beside the header) ·
  rows 38–42 full lattice (behind the carousel and the pre-footer row).
- **768**: rows 138–142 cols 10–11 · rows 143–149 full.
- **384**: rows 191–196 col 11 · rows 197–213 full.

The lattice reads through the inactive cards (the 012 translucent-ghost
pattern); the full field behind the strip is the drawn intent at every
anchor. 1px `border/000` throughout; no ornament cells.

*Amended 2026-09-06 (owner report at the built review, §9 B13):* the
**1344 section frame carries a visible 1px `border/000` top stroke** —
the full-width rule on the section's top row line, over the entire
section (not the header frame). The draft's exposure read checked the
Grid cells and the child frames but not the section frame's own
stroke. The 768/384 frames carry none, so the rule mounts from the
rd1 gate (the 1344 derivation), line-inclusive — it shares its pixel
with the east field's region edge.

## 3 · The header

**Slug:** `Demand that turns into growth` — the standing marker
construction, present at **all three anchors** (§9 F5 — the 384 pair
lives in the section-level `case-study header` node). **Headline (one
canon — §9 F4):** `Marketing that delivers on its promise.` —
single-space, wrapping naturally in right-padded boxes (pr 32 · 136 ·
224), the 018 H1 construction. Ink `text/100`, `ital` 100.

| | 384 | 768 | 1344 |
|---|---|---|---|
| slug type | text/xs/Medium | text/xs/Regular | text/sm/Regular |
| headline | display-serif/xs/Extralight 24/30 | display-serif/sm+/Extralight 36/42 | display-serif/lg+/Thin 50/60 |

*Amended 2026-09-06 (build, §9 B5):* the headline wrap boxes are the
header frames' interior text widths — **288 · 439 · 560** (the §1 "pr"
values resolve against the header frames, not the section); the drawn
rag reproduces exactly in these boxes. ~~The 384 slug is text-only as
drawn.~~ *Corrected 2026-09-08 (owner report, §9 B14):* the **384
marker IS drawn** — a 6×6 `bg/400` square centered in its own 1t cell
left of the text stack (the work-section 384 construction verbatim;
the build's read walked the slug row and missed the sibling cell —
§9 F5 had it right all along). All three anchors carry the standing
marker pair: the 1t-cell construction at 384, the inline 6/7 markers
on 12 gaps at 768/1344.

## 4 · The cards

Three studies, strip order **Zivel → YHS → Bare Lúx** (the 014 card
order; identities confirmed from the drawn stats). The card is an
info panel + a site photo:

| | xl (rd2) | md (rt) | xs (base) |
|---|---|---|---|
| card | 784 × 448 | 576 × 384 | 288 × 512 (portrait) |
| info | 448 × 448 left | 320 × 384 left | 288 × 288 below the image |
| image | 336 × 448 right | 256 × 384 right | 288 × 224 top |
| desc/stats box | 32, 32 · 352 col | 24, 20 · 264 col | 20, 16 · 248 col |
| CTA (drawn box) | 32, 370 · 238 × 46 | 24, 320 · 186 × 40 | 20, 228 · 162 × 36 |
| desc type | text/xl/Light | text/lg/Light | text/md/Light |
| stat type | display-sans/xs/Light | display-sans/2xs/Light | text/2xl/Light |
| stat label | text/sm/Regular | text/xs/Regular | text/xs/Regular |

**Stats canon (drawn, per study):** Zivel — 257 `Leads tracked` · 14
`New members` · 1 `New sales hire`; YHS — $25k `Monthly revenue` · 320
`Leads tracked` · $3.50 `Cost per lead`; Bare Lúx — 100k+
`Ad impressions` · 100+ `Leads tracked` · 5 `Average rating` (the 014
"100k+" canon). Stat labels wrap in min-content boxes (the 014 lesson);
the stat-row dividers are 1px hairlines as drawn.

*Amended 2026-09-06 (pre-approval, §9 R3):* the drawn stats above are
**the new cross-surface per-study canon** — they land in the shared
`work-cases-data.ts` module and the Our Work cards follow (the plan's
preferred single-source direction; 014's §5 values are superseded on
the changed stats — Zivel's `22 Consults booked` slot, YHS's rating
stat and `Per lead` label, Bare Lúx's `109`). `case-carousel-data.ts`
imports the studies and keeps only carousel wiring (§8 as amended).

*Amended 2026-09-06 (pre-approval, §9 R4):* Bare Lúx's `Average
rating` stat carries **a star at xl only** — a 17×16 flattened star
vector, `text/600` fill, on a 4 gap after the numeral,
center-aligned to the numeral's 38 line (the 014 star grammar at the
xl scale). Drawn at the 1344 anchor only; the md/xs cards read bare,
as drawn. The star is instance slot content — the set's own stat3
slot is a bare placeholder, which is how the draft's set-read missed
it (owner pointer `898:102319`; verified in the section instance
through the bridge).

*Amended 2026-09-06 (build, §9 B4):* the **md/xs stat rows carry the
first two stats only** — systematic across all nine drawn cards (the
fresh-read pass); three stats render at the xl design alone. Stat
ORDER in the shared module is therefore material. The row construction
at every size: equal-fill columns on 20-gapped 1px hairline dividers,
value→label gap 2, all riding the band unit.

*Amended 2026-09-06 (build, §9 B3):* the drawn inactive state is **the
full 012 translucent-ghost grammar**, superseding this section's draft
"info panel unchanged": the card fill washes to the 012 cost-card
constant verbatim (rgba(234,232,224,.5) — how §2's lattice reads
through), every ink drops to `text/600` (description, wordmark, stats,
labels, the pill's ink and glyph), the dividers to `border/050`, and
the image ghosts on the promoted token. Verified against rendered
paint on both xl states through the bridge.

**Descriptions — the F2 placeholder ruling (owner):** all three cards
carry Zivel's drawn description for now (`keystone helped a
Florida-based recovery and wellness studio…`); **updated per-study copy
exists and lands as a content pass** before launch (tracked with the
G-class content gates; the card-1 `Leads  tracked` double-space
residual rides the same pass). The build renders the drawn copy from
the data module so the pass is a data-only change.

*Amended 2026-09-06 (the F2 pass landed — owner copy at the built
review, §9 B13):* YHS — `keystone supported a newly opened MedSpa in
Connecticut fill their calendar and hit $25k monthly revenue in 7
months.`; Bare Lúx — `keystone enabled a MedSpa in New Jersey expand
their reach and capture demand in two languages on a lean budget.`
Zivel's drawn string was always its own copy and stands. The pass was
data-only, as designed.

**States:**

- **Active** — full color; the card grows **`hard-shadow-square-md`**
  (the bound effect style — 3/3/0, 15%) on the standing shadow law.
- **Inactive** — the promoted ghost grammar: the image at
  **`--motion-ghost-opacity` (0.5), luminosity blend** (§9 F3 — the
  site canon governs; the drawn 0.6 is superseded), no shadow, info
  panel unchanged.
- The drawn image filters (exposure/contrast/highlights…) are **baked
  into the exports** (§9 F6) — the build mounts the files plain.
- *Amended 2026-09-06 (built review, §9 B10):* every card, both
  states, carries a **1px `border/000` border** at every size —
  line-inclusive against the full-lattice field (a paint overlay
  extending 1px past the right/bottom tick edges, the 011 R17 law, so
  no lattice line doubles). The **active card's image zooms on hover**
  — the Our Work card's grammar verbatim (`--csc-img-zoom` 1% per
  side = a 1.02 cover grow, paint-in-place, in on the shadow's 450
  clock, out on the 300 — never a transform); the ghost card's hover
  reads as select and does not zoom; keyboard parity through the
  link's focus-visible.

**The CTA** — a standing gray `button-fill` reading
`Read the case study` with the 10px `_nav-trigger-icon`,
**presentational** (the card owns the link — §5). The drawn boxes
(238×46 / 186×40 / 162×36) read as the stale-scale artifact class
against the standing set sizes — the build mounts the set's lg/md/sm
pills and QA compares at the drawn anchors (the 018 R8 walk precedent).

## 5 · Semantics and behavior

- **The 012 machine minus the slider**: one `k ∈ {1,2,3}`, resting
  `k=1` (Zivel active, as drawn). Inputs: strip swipe/drag (the 012
  pointer lessons — lazy capture, dragstart suppression,
  click-swallow after a drag), a click on an inactive card selects
  it, arrow keys move k. **No auto-advance** (matching 012, not the
  v1 testimonials). *Amended 2026-09-06 (§9 R6):* with no slider
  input to carry them, the arrow keys move k while focus sits
  anywhere inside the strip; an **inactive** card's link activates
  as *select* (click or Enter — the 012 overlay semantics,
  navigation suppressed); only the **active** card's link navigates.
  No-JS keeps all three links live (§6). *Amended 2026-09-06 (built
  review, §9 B10–B12):* **the strip loops — as the circular
  construction** (§9 B12, the ruling as finally clarified; B10's
  modulo snap-back and B11's no-loop reading were both wrong
  turns): one virtual K ∈ ℤ, unbounded both ways, with per-slot
  revolution shifts keeping the window [K, K+2] alive — the first
  card slots in to the right of the last (and the last to the left
  of the first), every advance travelling exactly one stride.
  Teleports are scheduled off-canvas only; the swipe clamps to ±1
  stride (the circle holds one neighbor per side); an inactive
  select walks the shortest way (+1 visible ghost · −1 parked
  card). Still no auto-advance.
- **The whole card is a link** (the 012/014 overlay pattern) to
  `/case-studies/{slug}` — `palm-coast-zivel` live; the YHS and Bare
  Lúx routes 404 until their Phase B content passes (the 014 F9
  precedent). Overlay name: `Read the {study} case study`.
- Born settled — no entrance choreography. The section is the page's
  last content block before the footer.
- Images: alt `The {study} website`; the stats read inline to screen
  readers (figure/label order per the DOM).

## 6 · Motion

- **The strip snap** rides the promoted tokens verbatim
  (`--motion-snap-dur` 450ms / `--motion-snap-ease`).
- **The state handoff** on one clock: the arriving card's image lifts
  from ghost to full color while the leaving card drops to ghost; the
  active shadow grows/shrinks on the standing shadow law (the
  005/009/012 clocks — 450/300ms). No other properties animate.
  *Amended 2026-09-06 (build, §9 B3):* with the inactive dressing read
  as the full ghost grammar, the card wash and the ink drops **cross on
  the same snap clock** (the 012 §7.2 grammar verbatim — the draft's
  "no other properties" sentence rode its unchanged-panel belief); the
  image's luminosity leg is not animatable and swaps state-to-state
  under the opacity cross (the 012 record); the shadow follows the 012
  carousel law — the outgoing drops at once when the strip starts, the
  incoming grows only after it lands.
- **Reduced motion** snaps state-to-state (k applies instantly, no
  travel, no fades). **No-JS** renders the settled strip at k=1 with
  three working card links.

## 7 · Assets and constants

**9 exports received; two unique cuts per study** (the 768 tier's
files are byte-duplicates of the 1344 tier's — the 018 R5 dedup
precedent: **six files commit**, the registry maps both bands to one
cut; the 01-pair's trivial byte diff is re-export noise, the 1344 file
governs):

| cut | pixels | serves |
|---|---|---|
| portrait `case-study-1344-{01..03}` | 672 × 896 (336 × 448 @2x) | the rt gate up (≥ 665) |
| landscape `case-study-384-{01..03}` | 576 × 448 (288 × 224 @2x) | below 665 |

Numbering follows strip order (01 Zivel · 02 YHS · 03 Bare Lúx); the
filters are baked (§9 F6). Mount under `public/media/case-carousel/`.
*Amended 2026-09-06 (build, §9 B2):* the numbering is **reversed
against the strip order** — the files' content reads 01 Bare Lúx ·
02 YHS · 03 Zivel (verified against the drawn card fills at both
tiers; the 021 §7 export class). The data module maps strip index →
file (3 − i); no re-cut. The draft's numbering line was transcribed
from the received naming, not the pixels.
*Amended 2026-09-06 (build, §9 B2):* the numbering is **reversed** —
the files' content reads 01 Bare Lúx · 02 YHS · 03 Zivel (the 021 §7
export class, found at the mount QA). The data module maps strip
index → file (3 − i); no re-cut.

*Amended 2026-09-06 (pre-approval, §9 R5):* the portrait cut's 3:4
aspect against the drawn 768 image box's 2:3 means cover-fit trims
≈11% of the image width at the rt anchor — **accepted** (owner; the
021 R4 precedent). No re-export; six files commit as above.

**Constants** (component token layer): the §1 strip geometry per band;
the §4 card boxes and pads; the stat-row dividers; the ghost/snap
grammars ride their standing tokens — no new motion tokens in this
section.

## 8 · Deliverable — files, routes

- `design-system/v2/sections/case-carousel.tsx` + `case-carousel.css` —
  server component (header, strip settled at k=1, exposure rows);
  **one client island** (`case-carousel-island.tsx`) carrying the §5
  machine; `case-carousel-data.ts` — *amended 2026-09-06 (§9 R3):*
  the per-study canon (names, slugs, stats, alt) lives in the shared
  `work-cases-data.ts`, updated to the §4 drawn stats; the carousel
  module imports the studies and keeps only carousel wiring (strip
  order, the file map, the F2 placeholder description — the F2 pass
  lands here). The `case-carousel-*` prefix keeps clear of the
  case-study page's `case-study-*` family (the 021 R6 precedent).
- Splices into `v2/home-next.tsx` after the work deck — completing the
  page's content stack; permanent noindexed dev route
  **`/case-carousel-next`**.
- The expectations gain the section rows (§1); the sweep leg lands
  with 023; until then the section audits on `/case-carousel-next`
  through the standing devtools at each k.

## 9 · Resolutions record

All six draft flags resolved 2026-09-06, the same afternoon:

- **F1 — the 1344 +1px fixed.** The carousel's top border was painted
  wrong (the carousel frame sat at y 449); design fixed it — the
  section re-read **896 (8t), carousel y 448** through the bridge.
- **F2 — descriptions ship as the Zivel string for now** (owner:
  updated per-study copy exists and arrives as a content pass; the
  build renders from the data module so the pass is data-only). The
  card-1 `Leads  tracked` double space rides the same pass.
- **F3 — the ghost is the site canon 0.5** (owner) — the drawn 0.6
  fill opacity is superseded; the build mounts
  `--motion-ghost-opacity`/luminosity (the 012/015 grammar verbatim).
- **F4 — the headline rag fixed with padding** (design): the double
  space removed at all three anchors; the canon single-space string
  wraps naturally in right-padded boxes (32/136/224) — re-read
  post-fix at every anchor.
- **F5 — the 384 slug exists** (owner pointer `799:60195`): the
  section-level header node carries the full pair; the draft's
  missing-slug read had caught an inner frame. No band drops the slug
  in this section.
- **F6 — the image filters are baked into the exports** (owner
  confirm; the 017 pipeline). The build never reproduces them.
- **R1 (positions, owner-blessed)** — the §5 machine, links, order,
  no-auto-advance, born-settled, reduced-motion/no-JS postures, the
  `case-carousel-*` naming, and the `/case-carousel-next` route.
- **R2 (record)** — every §1–§4 value verified against rendered bounds
  through the bridge at writing; the active shadow reads the bound
  `hard-shadow-square-md` style; the CTA pill boxes read 238×46 /
  186×40 / 162×36 (the stale-scale artifact class — the build mounts
  the standing set sizes); the 768 asset tier is byte-duplicate of the
  1344 tier (six files commit).

Pre-approval review rulings, 2026-09-06 (owner, at the build agent's
preparation review; landed as the dated body amendments above):

- **R3 — the stats canon is cross-surface** (owner: "update the data
  model"). The §4 drawn stats are the per-study canon; they land in
  the shared `work-cases-data.ts` and **the Our Work cards follow**
  (Zivel: `22 Consults booked` → `1 New sales hire`; YHS: the rating
  stat → `$25k Monthly revenue`, label `Per lead` → `Cost per lead`;
  Bare Lúx: `109` → `100+`). 014 §5 is superseded on those values —
  recorded here, 014 unedited (the content-pass mechanism). The
  carousel module imports the studies; the plan's preferred
  single-source direction holds and the draft's standalone-copy
  concern dissolves.
- **R4 — the star is drawn** (owner pointer `898:102319`; the draft's
  set-read missed it — the star is instance slot content, the set's
  stat3 a bare placeholder). Verified in the 1344 section instance
  through the bridge: 17×16 flattened star, `text/600` fill, gap 4,
  centered to the numeral line; **xl only** — the 768/384 sections
  carry no star (scanned; owner confirm). Built as drawn.
- **R5 — the 768 cover trim accepted** (owner). The "768" exports are
  the 1344 cut (checksum-verified at the review), so cover-fit trims
  ≈11% of the width at the rt anchor's 2:3 box; accepted per the 021
  R4 precedent, six files commit.
- **R6 — keyboard semantics blessed** (the build reco): arrows move k
  with focus inside the strip; an inactive card's link activates as
  select; the active card's link navigates; no-JS keeps three live
  links.
- **R7 (record)** — the plan's 2026-09-05 "the 1344 +1px persists —
  blocks 022" entry is stale against §9 F1's same-day fix (owner
  reconfirmed at the review); the build's decision-log entry records
  the resolution.

Build record, 2026-09-06 (approval in-chat after the R3–R7 rulings;
the fresh-read pass and the dated body amendments above):

- **B1 — the fresh-read pass.** Zero token drift (106 color
  primitives, spacing/radii/type aliases one-for-one; every §3/§4
  type style already in the layer). Every §1 value verified at
  rendered bounds at all three anchors — the F1 fix holds (carousel
  y 448, section 896). The drawn frame confirms the section owns the
  pre-footer full-lattice row: exactly 1t between the section box and
  the footer (13131 → 13243 at 1344), the Grid layer running to the
  footer top — the built section is 23t · 12t · 9t. **Two file
  residuals with design:** the 384 card 2 (YHS) carries stale Zivel
  stat overrides (257/14 where md carries $25k/320 — the build renders
  the per-study canon, never the stale override), and the 384 cards
  2–3 stat labels read `M Light` against card 1's and both other
  anchors' `Regular` (built Regular, the canon).
- **B2 — the asset numbering is reversed** (§7 as amended): file
  content reads 01 Bare Lúx · 02 YHS · 03 Zivel, verified against the
  drawn card fills at both tiers (the 1344 Zivel card is the 03 team
  shot; the linked Bare Lúx card is the 01 studio shot; the drawn 384
  Zivel card is the 03 landscape cut). The data module maps strip
  index → file (3 − i); the 021 §7 export class, no re-cut. §7's
  "two unique cuts per study" is confirmed as per-tier art direction —
  the landscape cuts are different photographs, not crops.
- **B3 — the inactive dressing** (§4/§6 as amended): the full 012
  translucent-ghost grammar, read from the drawn inactive card's
  paint; the wash constant is the 012 `--ps-cost-inactive` value
  verbatim (landed as `--cc-card-inactive`); the panel inks and wash
  cross on the snap clock.
- **B4 — the two-stat md/xs rows** (§4 as amended): systematic across
  all nine drawn cards; the third stat and its divider mount at the
  xl design only (the rd1 derivation shows them zoomed).
- **B5 — the wrap boxes** (§3 as amended): the header frames' interior
  text widths 288 · 439 · 560; the derived 576 midpoint 363.5.
- **B6 — the star mounts the standing IconStar** stretched to the
  drawn 17×16 box: the drawn vector is the 15×14 glyph under a
  non-uniform ~1% scale (×17/15, ×16/14 — every path point matches;
  the scale-artifact class), so no new cut ships (the icons file's
  reuse rule). The ratio-locked mount letterboxes 0.13px vertical —
  sub-pixel, recorded. The star inherits the stat ink (text/100
  active · text/600 ghost — the drawn ghost value; no drawn active
  Bare Lúx exists at any anchor).
- **B7 — the min-content label law meets the new 3-word labels**: the
  canon single-space `New sales hire` and `Cost per lead` wrap three
  lines in min-content boxes where the drawn cards read two (the
  drawn wrap rides the residual double space — the F2 class). Built
  per the spec's min-content law; the rows have vertical slack and
  nothing collides. **With design**: if the two-line grouping is
  intent, the content pass ships the grouping (e.g. a no-break space)
  — data-only.
- **B8 — the §5 404 premise is overtaken**: the 017 data module gained
  the draft Phase B passes 2026-09-04 (marked not yet owner-approved),
  so `/case-studies/your-health-solutions` and `/bare-lux-studio`
  resolve with draft content instead of 404. The carousel's links are
  the canonical slugs either way; nothing in this build changes.
- **B9 — deliverables and verification.** Six §7 cuts under
  `public/media/case-carousel/` with the registry block (the reversed
  map, the R5 trim note); the R3 stats landed in `work-cases-data.ts`
  (the Our Work cards follow with no code change — the star flag and
  stats render data-driven); `case-carousel-data.ts` (strip order,
  file map, the F2 placeholder descriptions); `case-carousel.tsx` /
  `case-carousel.css` (header, exposure incl. the pre-footer row,
  strip settled at k=0, the full state dressing, the R9 rs type walk,
  the rd zoom); the one island `case-carousel-island.tsx` (the 012
  machine minus the slider: lazy capture, clamped live drag,
  click-swallow, dragstart suppression, the R6 inactive-link select
  intercept and strip-scoped arrow keys); the `--cc-*` component
  tokens; the `home-next.tsx` splice after the work deck; the
  noindexed `/case-carousel-next` route. Verified against the owner's
  server: the three drawn anchors byte-exact at rendered bounds
  (every §1/§3/§4 number, both drawn states' paint, tier swaps at the
  gates), the derived 576 (geometry ×1.5, type on the midpoint walk)
  and 960 (the 1344 zoom, three stats + star riding), compressed
  slices 738/1200 tick-true with no horizontal overflow, the capped
  1920 centered with the strip clipping at the field edge; the
  machine (click-select without navigation, arrows both ways, live
  drag with the 896 clamp, commit-on-release, props cleaned); reduced
  motion kills every clock (media query + dev belt); no-JS HTML is
  the settled k=0 strip with three live links; tsc/lint zero; the
  standing grid sweep green. Route JS rides to 023. Working tree left
  uncommitted per the git rule.
- **B10 — built-review rulings, same day** (owner, four items; landed
  as the dated §4/§5 amendments and verified on the rendered page):
  **(1) the strip loops** — commit wraps modulo; arrows wrap at the
  ends and the swipe clamp gains a half-stride overhang whose release
  commits the wrap (the release rounds half AWAY from the rest —
  `Math.round` alone rounds −0.5 toward zero and the backward wrap
  could never fire; found at implementation). **(2) the clipped
  shadow fixed** — the viewport's `overflow: clip` bottom edge sat
  flush on the card bottom and amputated the 3px shadow (diagnosed
  from the computed clip chain); the viewport gains 4px of interior
  bottom pad (border + shadow) hanging over the transparent
  pre-footer row — no geometry shifts. **(3) the 1px border/000 on
  every size, both states** — a line-inclusive paint overlay (inset
  0/−1/−1/0) so all four borders land on their lattice lines'
  canonical pixels; the shadow overlay's box follows the bordered
  edge. **(4) the hover image zoom** — the Our Work card's grammar
  verbatim (`--csc-img-zoom`, the paint-in-place 1.02 cover grow on
  the shadow clocks; the 003 no-transform doctrine); scoped to the
  active card (a ghost's hover is the select affordance) with
  focus-visible parity; the ghost's opacity leg keeps the snap clock
  beside the zoom's box legs. Verified at 1344: the border reads 1px
  border/000 on the line pixels, the full shadow renders below the
  card, arrows and swipe wrap both ways (overhang clamps at 448 =
  half the 896 stride), the forced-hover zoom measures 342.72×456.95
  (the exact 1.02 grow) with the pill dressing on the same hover;
  tsc/lint zero.
- **B11 — the B10 loop withdrawn, same evening** (owner, at the
  looped build's review): the wrap rendered as a multi-stride
  snap-back — at the last rest the strip travelled two strides home
  instead of the next card arriving from the right. The ruling: **no
  looping** unless it is the circular construction (the first card
  slotting in to the right of the last — a per-card virtual-slot
  shift this section does not build). The island reverted to the
  approved clamped machine verbatim (clamped commit, travel-clamped
  drag, `Math.round` release — the B10 overhang and away-rounding
  removed with their reason); the B10 items 2–4 (the shadow room,
  the line-inclusive border, the hover zoom) stand. Re-verified at
  1344: arrows and drags clamp at both ends, no wrap paths remain;
  tsc/lint zero.
- **B12 — the loop ruling clarified and built circular, same
  evening** (owner: the B10/B11 exchanges were misreadings — the
  review's report was that **no loop had ever existed**: advancing to
  the last card dead-ended on empty lattice; the ask was always the
  circular strip, "the first slide slots to the right of the last").
  The construction: one **virtual K ∈ ℤ** drives the strip translate
  (−K × stride, unbounded both directions); each slot carries a
  revolution count `--cc-rev` repositioning its card by whole
  strip-lengths (3 strides — never transitioned), so the window
  **[K, K+2]** always exists: active at the origin, next partial,
  third parked off-canvas (the drawn rest at every K). Teleports are
  scheduled only while a card is outside the clip: the arriving card
  is placed at commit (both candidate slots render off-canvas at a
  rest), a forward step's departing card holds its slot through the
  travel and re-parks on the strip's settle (the snap duration read
  from the computed transition — 0 under reduced motion, and flushed
  by any earlier commit or gesture), and a backward drag parks the
  third card leftward at the gesture's sign crossing (both slots
  off-canvas there). The swipe clamps to ±1 stride; every input path
  commits K±1; an inactive select walks the shortest way (+1 for the
  visible ghost, −1 for the parked card — its backward face is one
  step away on the circle); pitch measures rect-difference corrected
  by the slots' revolution offsets (exact at any width). K re-derives
  from the strip's inline `--cc-k` across HMR; the server HTML stays
  the plain K=0 window (no revs — no-JS unchanged). Verified at 1344:
  a full forward cycle and beyond (K 0→4, Zivel arriving from the
  right of Bare Lúx at K=2, revs advancing 0→1→2), backward past the
  start (K→−1, Bare Lúx arriving from the left), settle re-parks on
  the timer, forward/backward swipes with the left-park at the sign
  crossing, ghost-click and parked-click walks, navigation still
  suppressed on selects; tsc/lint zero. (One test artifact recorded:
  synthetic pointer sequences fire no derived click, so a QA
  harness's lingering click-swallow eats the next scripted click —
  real input always leads with a pointerdown, which resets the
  flag.)
- **B13 — two built-review items, late evening** (owner; the dated
  §2/§4 amendments above). **(1) The section top rule**: the owner
  reported it missing; the bridge located it as the 1344 section
  frame's own visible 1px `border/000` top stroke (full section
  width — the draft read the Grid cells and child frames, never the
  section frame's stroke; the 768/384 frames carry none). Built as a
  1px paint overlay on the section's top row line from the rd1 gate —
  line-inclusive, no box-height change. The read also confirmed the
  exposure encoding for later specs: the Grid layer draws the full
  reference lattice everywhere and **exposure is the cells' stroke
  VISIBILITY** — presence alone means nothing. **(2) The F2 content
  pass landed**: the owner's YHS and Bare Lúx card copy replaced the
  Zivel placeholder in the data module (data-only, as the F2 ruling
  designed); the G-class carousel-copy gate closes. Verified on the
  rendered page: the rule spans the full 1344 section width at rd2,
  absent at 768/384; both new strings render with the wordmark
  construction; tsc/lint zero.
- **B14 — the 384 slug marker restored, 2026-09-08** (owner report at
  the built review: the small section's eyebrow was not the canonical
  treatment). The drawn 384 header DOES carry the marker — a 6×6
  `bg/400` square centered in its own 32×32 (1t) cell LEFT of the
  text stack, the work-section 384 construction verbatim; the build's
  fresh read had walked the slug row's children and missed the
  sibling cell (the B5 "text-only" note was a read error — F5's "the
  full pair" was correct). Lesson for later reads: the 384 slug
  marker lives one level ABOVE the slug row, beside the text stack.
  Built as the wd-slug twin: the marker's 1t cell is the gap
  construction at base (headline indents 1t to the text stack), the
  inline 6/7-px markers on 12 gaps stand at 665+/860+ unchanged.
  Verified at rendered bounds through the bridge (cell 0,0 32×32 ·
  dot 13,13 6×6 bg/400 · text x32 · headline 32,44/288 — the built
  text sits at the construction's centered y8 against the drawn y7,
  the standing 1px artifact class) and on the rendered page at
  384/1344; tsc/lint zero.
- **B15 — the drawn 2t pre-section clearance restored at base,
  2026-09-08** (owner report at the built review: the slug rode the
  rule above it — "that section should be a carbon copy of the work
  section's elements"). The eyebrow constructions had measured
  pixel-identical (B14); the real defect was compositional: the drawn
  384 page keeps rows 189–190 bare between the work and case-study
  sections (2t — bridge-verified at rendered bounds: work bottom
  14475, section top 14539) while 768/1344 are drawn flush, and the
  splice stacked all three bands flush. The §1 page-row bookkeeping
  had the gap all along (work ends r188, this section starts r191) —
  the build never carried the two unowned rows. Fixed as the §1
  amendment: the base section owns a 2t leading band (height 25t,
  header top 2t, carousel top 8t, exposure gy +2; the
  pre-footer-row precedent). Verified at the 384 anchor (slug 2t
  below the work band's rule, headline at 2t+44, carousel 8t) and at
  768/1344 (unchanged, drawn flush); tsc/lint zero.

## 10 · Acceptance criteria

*At the three drawn anchors, the two derived-band anchors, and one
arbitrary mid-band width per band, scrollbar forced on.*

- [ ] Section rows tick-true per §1 (384: 191–212 · 768: 138–148 ·
      1344: 34–41); the strip at its drawn starts/strides/gaps; card 2
      partially visible at rest, card 3 off-canvas.
- [ ] Exposure per §2 exactly; the lattice reads through the ghosts.
- [ ] Cards per §4: info/image splits, type walks, stats canon per
      study (the R3 shared-module canon; the Our Work cards render the
      same values; the xl star per R4), one description string (the F2
      placeholder), the standing pill CTAs, alt text per §5.
- [ ] Active card full color with `hard-shadow-square-md`; inactive
      images at the ghost token (0.5, luminosity), no shadow; the
      exports mount plain (filters baked).
- [ ] The machine: swipe/drag/click-select/arrows all write one k;
      snap on the promoted 450ms tokens; the state handoff on one
      clock; the pointer lessons hold (no image drags, no click
      pass-through after a swipe).
- [ ] The whole card links to its `/case-studies/{slug}`; Zivel
      resolves, YHS and Bare Lúx 404 until Phase B *(overtaken — §9
      B8: the 2026-09-04 draft passes make the routes resolve)*; the
      active card's link navigates, an inactive card's selects (R6).
- [ ] Reduced motion snaps state-to-state; no-JS renders k=1 settled
      with three working links.
- [ ] One client island; every value traces to a token or a §7
      enumerated constant; six asset files committed, both bands
      mapped.
- [ ] tsc/lint zero; the standing sweep green (v1 routes and the built
      018–021 sections byte-untouched).
