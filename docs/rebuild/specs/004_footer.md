# Spec 004 — Footer: the first real section

**Status:** Approved 2026-08-23 — implemented and verified 2026-08-23
**Depends on:** spec 001 (tokens, fonts, `ksLockup`) · spec 002 (grid engine,
exposure vocabulary, band classes) · spec 003 (grader-input, button-arrow,
`_nav-trigger-icon`, text primitives)
**Sources:** fresh MCP reads 2026-08-23 of the Footer nodes inside the five
anchor frames — `230:13374` (384) · `359:29963` (576) · `505:14399` (768) ·
`505:14400` (960) · `505:14569` (1344) — plus the open-drawer states
`268:31970` ("384 Footer Open") and `525:20011` ("576 Footer Open"), the
footer-item state set `523:19371`, and variable defs on `505:14569` /
`219:1558`, all in `ks-MarketingSite`. Design shipped fixes the same day
(grader gap, open-frame height, 1344 lockup, 576 open row, item states);
the affected nodes were re-read after the fixes.

The first real section and the proof of Phase 1: cell fields, ornament
cells, a lockup riding the tick, an embedded form, and the site's first
band-structural switch (accordion below 768, columns at 768 and up). Every
geometry fact below was read off the anchor nodes at writing time; nothing
is scaled from a neighboring anchor.

---

## 1 · Section anatomy — tick totals per band

The footer stacks four blocks in flow. All rows/columns below are whole-tick
(v5 §3); the section totals feed the page stack-sum self-test.

| block | rm (384) | rs (576) | rt (768) | rd1 (960) | rd2 (1344) |
|---|---|---|---|---|---|
| top block (lattice + tagline + grader) | 18t | 15t | 6t¹ | 3t¹ | 3t¹ |
| nav | (inside top block) | (inside top block) | 4t | 4t | 3t |
| logo block | 6t | 6t | 5t | 5t | 5t |
| **section total** | **24t** | **21t** | **15t** | **12t** | **11t** |

¹ At 768 the top block decomposes as 1t full row + 5t tagline/input band; at
960/1344 as 1t full row + 2t tagline/input band. At 384/576 the nav rows are
absolutely part of the top block's tick field (rows 10–17 at 384, 7–14 at
576) — in code the nav is normal-flow inside the section either way.

With a drawer open the section grows by the drawer's extra ticks (§5): the
designed open-Product states measure **29t** at 384 (`268:31970`, 384×928)
and **25t** at 576 (`525:20011`, 25×48 = 1200). Both frames are whole-tick.

## 2 · Exposure map and ornament cells

Region coordinates are zero-based ticks, section-local (`--gx/--gy/--gw/
--gh`). Bordered content boxes (nav rows/columns, tagline boxes, copyright
boxes) are **not** lattice regions — they are content-layer bordered boxes
sized `k·t+1` that merge with the grid (v5 §6.1) and are listed in §3–§6.

**rm (384):**

- regions: top full row `0,0,12,1` · right rail `11,1,1,17` · logo-r1
  `0,18,12,1` · logo side columns `0,19,1,3` and `11,19,1,3` · logo-r5
  `0,22,12,1` · copyright row `0,23,12,1`
- ornaments: filled circle `(1,0)` · outlined circle `(11,7)` · filled
  square `(8,18)` · filled circle `(3,22)`

**rs (576):**

- regions: top full row `0,0,12,1` · left rail `0,1,1,14` · right rail
  `11,1,1,14` · logo-r1 `0,15,12,1` · logo sides `0,16,1,3` / `11,16,1,3` ·
  logo-r5 `0,19,12,1` · copyright row `0,20,12,1`
- ornaments: filled circle `(1,0)` · outlined circle `(11,6)` · filled
  square `(8,15)` · filled circle `(3,19)`

**rt (768):**

- regions: top full row `0,0,12,1` · tagline rails `0,1,1,5` / `11,1,1,5`
  (center 10t is void — bounded by the rails and the nav top) · logo-r1
  `0,10,12,1` · logo sides `0,11,1,3` / `11,11,1,3` · logo-r5 left cells
  `0,14,6,1`
- ornaments: filled square `(11,0)` · filled circles `(0,2)` and `(11,2)` ·
  outlined circle `(3,9)` (1×1t, bottom-left corner of the Resources
  column) · filled square `(8,10)` · filled circle `(3,14)`

**rd1 (960):**

- regions: top full row `0,0,12,1` · logo-r1 `0,7,12,1` · logo sides
  `0,8,1,3` / `11,8,1,3` · logo-r5 left cells `0,11,7,1`
- ornaments: filled circle `(1,0)` · outlined circle `(3,6)` (Resources
  column bottom-left) · filled square `(8,7)` · filled circle `(3,11)`

**rd2 (1344):**

- regions: top full row `0,0,12,1` · logo-r1 `0,6,12,1` · logo sides
  `0,7,1,3` / `11,7,1,3` · logo-r5 left cells `0,9,7,1`
- ornaments: filled circle `(3,0)` · outlined circle `(3,5)` · filled
  square `(8,6)` · filled circle `(3,9)`

Ornament vocabulary (all 1×1t, cell contract `t+1`, `z-index: 0`, band-
gated compound classes per v5 §4): **filled square** = `bg/200` fill +
`border/000` stroke; **filled circle** = same + `--radius-full`; **outlined
circle** = `border/000` stroke + `--radius-full`, no fill. The nav-column
outlined circle at rt/rd1/rd2 straddles the column's bottom-left corner
(Figma draws it at −0.5px inside the bordered box); build it as a `.decor`
cell anchored to that tick intersection, not as a child of the nav column.

Note: the 384 top-grid contains fourteen unpainted radius-only cells (col
6, rows 2–15) with no fill or stroke — Figma artifacts, not transcribed.
The 576 Footer frame sits at x −0.5 with width 577 (stroke-alignment
artifact); its children land on whole ticks.

## 3 · Tagline + grader block

Layout per anchor (content values from the nodes):

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| container | 10t overlay, left 0, top 1t, pl 20, pt 32 | 10t×6t at 1,1; centered, px 32, pb 12 | 10t×5t void at 1,1; centered, px 64 | two 6t×2t bordered boxes at gy1 | two 6t×2t bordered boxes at gy1 |
| tagline→input gap | 32 | 40 | 40 | (separate boxes) | (separate boxes) |
| content column | 300 → interpolates | 416 | 416 (fixed) | 416 | 528 |
| grader (spec 003) | sm, w 300 | md, w 416 | md, w 416 | md, w 416 | lg, w 528 |

- **Tagline** ("Great businesses deserve to be found.", designed two-line
  break): `display-serif/xs+/Light` 28/34 (−2%) at 384 →
  `display-serif/sm/Extralight` 32/38 (−2%) at 576/768/960 →
  `display-serif/md+/Thin` 42/50 (−3%) at 1344. Ink `text/200`. Size and
  line-height interpolate with the band weights; weight and tracking are
  band constants restated per band. Bullet: 6px (rm/rt) / 8px (rs/rd1/rd2)
  dot, `orange/400`, gap 12 to text, top offset per anchor 12/21/21/19/19px
  (component-layer constants).
- **Prompt** ("Show us your site, we'll show you the rest.", two lines at
  384 only): `text/md/Light` 16/22 at 384–960 → `text/lg/Light` 18/26 at
  1344. Ink `text/300`. Bullet: 6px (rm/rt) / 8px dot, `teal/400`, gap 12.
- **Prompt→grader gap:** 16 (`spacing-xl`) at every anchor (the 384 anchor
  frame was fixed to 16 on 2026-08-23 and re-read). Grader placeholder
  "yourbusiness.com"; state wiring per spec 003 §5.
- At rd1/rd2 the two bordered boxes merge with the lattice (`6t+1` wide,
  `2t+1` tall, `border/000`); tagline box padding px 32 (rd1) / 56 (rd2),
  input box px 32 (rd1) / 56 (rd2), both py 8, content vertically centered.
  (The rd2 input padding was 72 at approval; design updated it to 56 on
  2026-08-24 for optical alignment with the tagline box — §9.)
- Above 1344 the content column zooms (`528 · t/112`); across rd1 it
  interpolates 416→528; across the base band 300→416; constant 416 through
  rs/rt.

## 4 · Nav — one DOM, two structures

One DOM, band-gated CSS (v5 §7.5). Four groups: **Product** (Our Approach ·
Solutions · Our Work · Case Studies · Pricing · Login) · **Resources**
(Blog · Podcast · Marketing Report) · **Company** (Our Story · Leadership ·
Careers) · **Find Us** (LinkedIn · Facebook · Instagram · YouTube · Spotify
· Apple Podcast). Group dots: `yellow/400` · `pink/400` · `purple/400` ·
`blue/400`; sizes/gaps as in §3 (6px + gap 8 at rt, 6px + gap 12 at rm, 8px
+ gap 12 elsewhere); heading indent `spacing-2xs` (2px).

**Accordion (rm, rs).** Stacked full-width bordered rows, closed height 2t:

| | row width | padding | heading style |
|---|---|---|---|
| rm | 11t (col 12 stays exposed rail) | 20 | `display-serif/3xs/Medium` 16/20 |
| rs | 10t at col 1 (cols 0 and 11 stay rails) | px 32 · py 20 | `display-serif/2xs+/Regular` 20/24 (−1%) |

Header row is 24px tall: dot + heading left, 16px `IconChevronDownMedium`
right, vertically centered in the closed row. Rows are disclosure buttons
(§5).

**Columns (rt, rd1, rd2).** Four bordered columns left-to-right in source
order:

| | column | padding | heading | items | list indent · gap · top gap |
|---|---|---|---|---|---|
| rt | 3t×4t | 20 | `display-serif/4xs+/Medium` 14/18 | `text/sm/Regular` 14/18 | 16 · 8 · 12 |
| rd1 | 3t×4t | px 32 · py 24 | `display-serif/3xs/Medium` 16/20 | `text/md/Regular` 16/22 | 24 · 12 · 12 |
| rd2 | 3t×3t | px 56 · py 48 | `display-serif/2xs/Medium` 18/24 | `text/md/Regular` 16/22 | 24 · 12 · 16 |

(Heading→list top gap is 12 at rt/rd1 and 16 at rd2 — design aligned the
768 columns to 12 on 2026-08-23, re-read from `223:10382`.)

**footer-item** — new primitive (set `523:19371`, incl. states added
2026-08-23). Variants: size `sm/md` × chrome `light/dark` × state
`default/hover/focus`. Sizes: sm = `text/sm/Regular` 14/18 (−1%), md =
`text/md/Regular` 16/22 (−1%). Optional trailing 10px `_nav-trigger-icon
type=arrow` (spec 003 §6), gap 3px (component-layer constant),
`currentColor` — only Login carries it in this section (chrome `dark`).

| state | light ink | dark ink | chrome |
|---|---|---|---|
| default | `text/400` | `text/300` | — |
| hover | `text/200` | `text/100` | label→arrow gap grows 3 → 5 |
| focus | `text/300` | `text/200` | `bg/400` highlight bar behind the label, square, 3px side bearings |

Hover applies on hover-capable devices only; focus maps to
`:focus-visible`. The arrow tints with the label in every state.

## 5 · The drawer — open states (`268:31970` · `525:20011`)

Product is the designed archetype at both accordion bands; the other
groups derive from it (sanctioned by design 2026-08-23).

| | closed row | open row | section (Product open) | open-row internals |
|---|---|---|---|---|
| rm (384) | 2t | **7t** (224) | 29t | p 20 · header 24 · gap 8 · **sm** items, indent 16, item gap 8 |
| rs (576) | 2t | **6t** (288) | 25t | px 32 · py 36 · header 24 · gap 12 · **md** items, indent 22, item gap 10 |

- Open-row chrome (both bands): fill `bg/100`, border `border/000`, effect
  **`hard-shadow-square-md`** (3px 3px 0 `#32261B` 15% — spec 001 effect
  token). Rows stack with descending z-order (each row above the next) so
  an open drawer's shadow paints over the following row's top edge; the nav
  container isolates. The chevron rotates 180° when open. Item content and
  primitive are identical to the rt/rd columns.
- Whole-tick growth is a hard rule, and the fixed tick height governs over
  the padding sum (at 576 the 6t row compresses the declared 36px bottom
  padding by 2px — the tick wins; items stay top-anchored under the
  header).
- **Derived open rows** — a group's open row is the smallest whole-tick
  height that fits its header block and item list at the band's internals:
  Resources/Company (3 items) = **5t** at both bands (160 / 240); Find Us
  (6 items) = the Product values. Section totals follow (closed total +
  open row − 2t).
- Disclosure semantics: each header is a `<button>` with `aria-expanded`
  and `aria-controls`; the list is hidden from the tree when closed.
  **Single-open accordion** (decision 2026-08-23): at most one drawer is
  open at a time — opening a drawer closes any other, and focus stays on
  the pressed header.
**Motion** (intent supplied by design 2026-08-23; values chosen here and
approved with the spec):

- **The drawer draws down from itself.** The closed 2t row is the origin:
  the header stays put and the row's bottom edge draws downward to the open
  tick height, pushing every block below it (later rows, logo block) down
  in flow. One height animation, **250ms** on the ease-out curve
  `cubic-bezier(0.22, 1, 0.36, 1)`. The item list is revealed by the moving
  clip edge — content never scales or squishes; the border, `bg/100` fill,
  and hard shadow ride the growing box. Close is the exact reverse at the
  same duration and curve (one reversible motion, not an open/close pair).
- **Chevron** rotates 180° (pointing up when open), same 250ms ease-out,
  synchronized with the height change; rotates back on close.
- **Rail cascade.** The growth ticks extend the exposed rails (right rail
  at rm; both rails at rs, mirrored left/right). Each new rail cell fades
  in with an ease-out opacity ramp (250ms), staggered **40ms per cell
  cascading away from the opening drawer** — nearest row first, downward —
  so the lattice reads as growing to support the drawer (total stagger
  160–200ms). On close the extension cells fade out with the collapse —
  no stagger, no delay.
- **Single-open handoff:** opening B while A is open runs both height
  animations concurrently on the same curve; the rails animate to the net
  section change.
- The motion constants (250ms · 40ms stagger · the ease-out cubic-bezier)
  are the build's first motion values and live in the component token
  layer; promotion to a global motion-token layer waits until a second
  section needs them.
- `prefers-reduced-motion: reduce` renders every part of this
  state-to-state, no transitions.
- Mid-flight the section is transiently fractional-tick by design; the
  stack-sum and landmark audits are asserted **at rest** in both states.

## 6 · Logo block

Same construction at every anchor: full cell row (r1, with the filled
square at col 8) · 3t-tall middle band with 1×3t cell columns at both edges
and a 10t center void hosting `ksLockup` (centered both axes) · full or
partial cell row (r5, with the filled circle at col 3) · copyright.

- **Lockup width is 8t at every anchor** (256/384/512/640/896 — the 1344
  frame was corrected to 8t on 2026-08-23 and re-read). Pure tick
  structure: `width: calc(8 * var(--t))` in every band, zooming above 1344
  by construction. Height from the intrinsic ratio, centered in the 3t
  band.
- **Copyright** ("© 2026 Keystone" · "Terms of Service" · "Privacy Policy";
  the last two are links):
  - rm/rs: its own 1t full-width bordered row below r5; three items
    `justify-between` with **1t side insets** (tick-riding — Figma's 32/48
    px paddings equal t at those anchors). Style `text/2xs/Regular` 10/12
    at 384 → `text/xs/Regular` 12/16 at 576.
  - rt: inside r5 — six cells then a 6t bordered box; items centered, gap
    16, `text/xs/Regular`.
  - rd1/rd2: inside r5 — seven cells then a 5t bordered box; items
    centered, gap 32 (rd1) / 48 (rd2); `text/xs/Regular` at 960 →
    `text/sm/Regular` 14/18 at 1344.

## 7 · New assets and primitives

1. **`IconChevronDownMedium`** (`523:19955`) — 16-grid chevron, the
   accordion trigger glyph. Export from Figma and commit to
   `design-system/v2/icons.tsx` under spec 003 §6 rules (verbatim geometry,
   `currentColor`, aria-hidden). Not in the committed sheet today.
2. **footer-item** (§4) — server component + CSS beside the other v2
   primitives.
3. **Dot ornament** — the 6/8px colored bullets are plain filled circles;
   built as CSS dots with token fills (decision: the no-hand-authoring rule
   protects vector geometry; a circle has none). Colors as in §3/§4.
4. Everything else reuses committed work: grader-input, button-arrow,
   `_nav-trigger-icon`, `ksLockup`, tokens, type styles.

Non-token material constants found in the set (component token layer, per
band only where used): nav paddings 56 (rd2), tagline/input box padding 56
(rd2, both boxes — §3), footer-item icon gap 3 (5 on hover), the rs
open-row internals 36 · 22 · 10 (§5), and bullet top offsets (§3).

## 8 · Semantics, deliverable

- The section is a `<footer>` (contentinfo) containing a labeled `<nav>`;
  groups are headed lists; items are links (Login too — chrome is visual).
  Copyright links are real links. The grader is the spec 003 form with its
  full state and ARIA wiring; submission behavior is out of scope here.
- Server component under the v2 design system; the only client code is the
  accordion toggle island. Lattice/ornaments render through the spec 002
  vocabulary; zero hydration mismatches; the old site's bundles unchanged.
- QA surface: a permanent, noindexed **`/footer`** dev page rendering the
  section alone, drawer states toggleable, at all bands.

## 9 · Resolutions record

No confirmations remain open. All flags raised while drafting were
resolved 2026-08-23 through design fixes or decisions, each re-read from
the nodes after the fix:

- Prompt→grader gap is 16 (`spacing-xl`) at every anchor.
- "384 Footer Open" (`268:31970`) measures its content exactly (29t).
- The 1344 lockup is 8t (§6 — pure tick structure at every anchor).
- The 576 open row is designed (`525:20011`) — §5.
- footer-item hover/focus states are designed (`523:19371`) — §4.
- The 768 heading→list gap is **12**, uniform across all four columns
  (`223:10382`, matching rd1; rd2's 16 is the designed value there).
- **Accordion policy decided: single-open** — at most one drawer open at a
  time (§5).
- **Drawer motion intent supplied** — draw-down expansion from the closed
  row, 180° chevron rotation, origin-aware rail cascade, all ease-out;
  specced with values in §5.
- **The Resources group dot is `pink/400` at every band** (decision at
  approval, 2026-08-23). The 384/576 frames bind `pink/400`; the
  768/960/1344 frames bind `pink/300` — the code follows the decision and
  the file is to be normalized to `pink/400`.
- **The rd2 input box padding is 56, not 72** (design update,
  2026-08-24): design changed the approved 72 to 56 for optical
  alignment with the tagline box. §3 and §7 carry the new value; the
  build follows it.
- **Erratum (found at build, 2026-08-23):** §2's rd2 map lists logo-r5 at
  gy 9 and its filled circle at (3,9) — off by one against §1's totals
  (logo r1 at gy 6 + 3t sides puts r5 at gy 10) and the node read
  (`505:14569`: r1 112 + middle 336 + r5 112 = 5t). Built from the node:
  r5 at gy 10, circle at (3,10).

## 10 · Acceptance criteria

At each of the five anchors and one arbitrary mid-band width per band,
scrollbar forced on:

- [x] Section height ÷ t equals 24/21/15/12/11 exactly at anchors (drawers
      closed); with the Product drawer open it equals 29 at 384 and 25 at
      576; the derived drawers land on their §5 ticks. Stack sum and
      landmark audit pass with the footer mounted on the fixture page.
      (Measured 2026-08-23 on /footer: all five anchor totals exact;
      open Product 29/25 exact; derived Resources row 5t+1; page stack
      sum whole-tick with a live scrollbar, e.g. 738 = 24 × 30.75.)
- [x] Every region, ornament cell, bordered box edge, and the lockup's
      left/right column edges land on tick lines (rendered-bounds check,
      never metadata x/y — plan.md "Special cells"). (Landmark rects
      divide to integers at anchors: top 0–10t, nav rows 11t+1 wide,
      tagline boxes 6t+1 × 2t+1 at gx 0/6, lockup left edge 2t, width
      8t exact.)
- [x] Seam inspection at a fractional-tick width: nav row/column borders,
      tagline boxes, copyright boxes, and region lines coincide — one line,
      one pixel; the outlined ornament circles sit tangent without
      doubling. (At t = 71.667 adjacent column borders share one pixel
      and the nav's bottom border lands on the logo row's top line.)
- [x] Exactly one band's regions/ornaments render at every width
      (band-gate sweep, compound-gated `.decor` included). (Swept ten
      widths; one band class visible at each, extension cells included.)
- [x] Type walks its interpolation lines: tagline, prompt, nav headings,
      and footer items render the designed values exactly at band floors
      and ceilings and are continuous across all four switches; weight and
      tracking switch only at band boundaries. (Anchor values exact —
      tagline 42/50 Thin −3% at 1344; mid-band walk verified, e.g.
      tagline 36.95 at t 95.833; above 1344 pure zoom, 46.875 =
      42·t/112 at 1500. Continuity comes from shared-anchor pairs;
      weight/tracking are band constants in the CSS.)
- [x] The lockup measures exactly 8t wide at every anchor and keeps riding
      the tick above 1344. (8.0000t at 384/960/1344/1500.)
- [x] Accordion: headers are buttons with correct `aria-expanded`/
      `aria-controls`; closed lists absent from the accessibility tree;
      chevron flips when open; the open drawer shows `bg/100` fill and the
      `hard-shadow-square-md` token over the row below; keyboard operation
      end-to-end. Single-open holds: opening a drawer closes any other and
      focus stays on the pressed header. At 768+ no accordion semantics
      remain in the tree. (Verified in-browser: aria states track opens,
      closed lists are visibility-hidden, single-open handoff leaves one
      drawer open; the 768 accessibility tree carries headed lists only.)
- [x] Drawer motion matches §5: the header never moves while the row draws
      down at 250ms on the specified curve; the chevron's 180° rotation
      tracks the height change; rail extension cells cascade in at 40ms per
      cell away from the drawer (both rails mirrored at 576, right rail
      only at 384); close reverses with no stagger and no delay; under
      `prefers-reduced-motion: reduce` everything renders state-to-state;
      stack-sum and landmark audits pass at rest in both states.
      (Computed transitions: height/rotate/opacity 250ms on
      cubic-bezier(0.22, 1, 0.36, 1); cascade delays 0/40/80/120/160ms
      on open, none on close; reduced motion zeroes durations and the
      cascade delay; at-rest totals exact in both states.)
- [x] The grader inside the footer passes its spec 003 criteria at the
      per-band size variants (sm/md/md/md/lg) and widths (§3). (Field
      heights 44/50/50/50/66 via the band overrides; widths 300→416,
      416, 416→528 — 471.41 measured mid-rd1 — and 528 zooming.)
- [x] Every color, spacing, radius, type, and effect value traces to a
      token; §7's non-token constants exist only in the component token
      layer; the chevron icon is a committed verbatim export. (Constants
      added: fitem gap/bar and the three drawer motion values; chevron
      exported from 523:19955 through the console bridge.)
- [x] footer-item states render as designed (§4): hover ink shift and 5px
      arrow gap on hover-capable devices only; the `bg/400` highlight bar
      on `:focus-visible` only, at both sizes and chromes. (Settled
      computed values: hover text/200 + 5px gap; focus text/300 with the
      bg/400 bar and 3px bearings; hover rules sit under hover-capable
      media.)
- [x] All decorative ornaments and dots are hidden from the accessibility
      tree. (Overlays, decors, dots, and the rail layer are aria-hidden;
      the tree carries only the form, nav, headings, links, and text.)
- [x] Server/client split as §8; zero hydration mismatches; `/footer` dev
      page renders all bands and drawer states. (The accordion island is
      the only client code — 938 B route JS; a clean load logs no
      console errors; the old site's routes and the 102 kB shared
      first-load are unchanged in the production build.)
