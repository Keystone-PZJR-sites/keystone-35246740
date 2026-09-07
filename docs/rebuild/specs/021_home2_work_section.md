# Spec 021 — Homepage v2: the work section (the website deck)

**Status:** Approved 2026-09-06 (owner, in-chat, after the pre-approval
review rulings §9 R3–R6) — all draft flags resolved (the slug canon
fixed and re-read; the 18 asset cuts landed and verified; the six-site
roster received). **Built 2026-09-06** (§9 B1–B6 the build record;
acceptance verified the same day)
**Depends on:** spec 018 (the `home-next` composition) · spec 019 (the
shared grain primitive `lib/noise.tsx` — **this section is its second
consumer**, on the browser-window chrome per owner direction) · spec 020
(splice order — the section follows the engine section) · spec 003
(`button-fill`, `_nav-trigger-icon`) · spec 002.r1/.r2 · spec 001.
**Sources:** fresh MCP reads 2026-09-06 of the work-section nodes at the
three drawn anchors — 1344 `799:60917` (header `799:60918` · cascade
`799:60926` · the `website-stack` instance and its six `website-browser`
cards); 768 `859:98761` (header `813:88435` · cascade `813:88677`); 384
`859:98762` (header `799:60183` · cascade `799:60192`) — plus the
`website-stack` component set (`785:26279`) and the Grid rows behind the
section. **Every geometry fact, binding, and per-cell exposure was read
through the console bridge against rendered bounds this session**; the
slug canon fix was re-read at all three anchors the same morning. Motion
intent: the owner's 2026-09-06 deck brief (six windows, click = next, a
single 300ms reorder, no stagger, nothing else animates, riffle-tolerant,
never a queued backlog; the grain borrowed from the system engine).
Asset exports received 2026-09-06
(`~/Dropbox/…/03-newsite/home/work-cascade/export`, 18 WebP, §7). The
six-site roster and cascade order received the same morning (§4).

The section is a stack of six stylized browser windows — one per client
site — and a click anywhere on the deck cycles it. The deck answers the
click; nothing else moves.

---

## 1 · Section anatomy — tick totals per band

| band | section rows | header | cascade |
|---|---|---|---|
| base 384 (t=32) | 169–188 (20t) | 160 = 5t (rows 169–173; w 352, the marker-column construction) · 2t gap | the band: 416 = 13t (rows 175–187), full width, `bg/100`, top/bottom `border/000` hairlines, p 32; stack 320 × 232 + the md button, gap 32 |
| rs 576 (derived) | the 384 design — geometry on the tick, type riding the 384/768 midpoint walk (the standing derivation split) | | |
| rt 768 (t=64) | 122–137 (16t) | 320 = 5t (rows 122–126; w 639, pl 64 pr 104) | the band: 704 = 11t (rows 127–137), full width, `bg/100`, top/bottom hairlines, p 64; stack 640 × 468 + the md button, gap 40 |
| rd1 960 (t=80, derived) | the 1344 design at t=80 | | |
| rd2 1344 (t=112) | 27–33 (7t), py 1t | x 0–672 (px 112), v-centered; the CTA in the header | x 672–1344 (px 38 py 90, clip); stack 548 × 404; no band chrome |

*(Amended 2026-09-06 — the `911:103458` scroll-state redraw, read at
rendered bounds; 020 §9 R23 carries the cross-record: at rd1/rd2 the
section carries a **1px `border/000` top rule across the frame** — the
engines→work seam hairline, drawn as the section frame's INSIDE top
stroke. Line-inclusive: the section holds its 7t flow height
(border-box) and the content sits the drawn 1px lower (the redraw's
header at y 113). The rule rides the flow and resolves flush under the
engine section's sliver row at the carousel's apex. rt/base carry no
drawn top rule — the engine stack's last visual draws that seam.)*

The cascade bands' hairlines at rt/base sit against the lattice rails —
line-inclusive edges at build (the standing law). The deck itself is
**one proportional unit** *(amended 2026-09-06 — owner ruling at the
pre-approval review, §9 R3; supersedes the draft's "material, fixed
px" wording)*: it floats in its box and only the box rides the ticks;
the §4 constants render as drawn at the anchors, and off-anchor the
whole cascade — card widths, width steps, stack offsets, bar
internals — scales by the band's one zoom factor, so the spacing
between cards stays congruent at every width.

## 2 · Exposure map

- **1344** (rows 27–33): **no painted cells** — the section sits on bare
  paper; the deck and header float with no lattice behind them.
  *(Amended 2026-09-06 — 020 §9 R23: the frame-wide top rule per §1 as
  amended; still no cells.)*
- **768** (rows 122–137): the east rail cols 10–11, nothing else.
- **384** (rows 169–188): the east rail col 11, nothing else.

The rails continue into the case-study rows below (one run — the
expectations treat the boundary per section).

## 3 · The header

**Slug (one canon — fixed and re-read 2026-09-06, §9 F1):**
`Work that creates demand` — the standing marker construction (7px
square at 1344 · 6px at 768/384; `bg/400`; the 384 marker sits in its
own 32px column). **Headline:**
`Beautiful websites, ads, social, and content that grow your business.`
Ink `text/100`, `ital` 100, natural wrap.

| | 384 | 768 | 1344 |
|---|---|---|---|
| slug type | text/xs/Medium 12/16 | text/xs/Regular 12/16 | text/sm/Regular 14/18 |
| headline | display-serif/xs/Extralight 24/30 | display-serif/sm+/Extralight 36/42 | display-serif/lg+/Thin 50/60 |

**The CTA** — the standing `button-fill` with `View our work` + the 10px
`_nav-trigger-icon`, target **`/our-work`**: lg (h 48, 18 L Light) in
the header at 1344; md (h 40, 16 M Light) inside the cascade band under
the stack at 768/384.

## 4 · The deck

**The card** (`website-browser`) *(amended 2026-09-06 — the owner's
component rebuild, set `813:89840`, read fresh through the bridge;
§9 B7; supersedes the draft's full-card swatch construction)*: a
**browser bar** and a **site-image box**, nothing behind them. The
bar is the chrome — colored fill with a 1px bound stroke on the
**top/left/right** edges (the color pair derived from the fill's
step, §4 roster), **square corners**, three dots — and carries the
**`web-swatch` effect style — NOISE (the 019 grain, this section's
borrow) + the hairline drop shadow (0, 1, 2, `#6C6860` at 5%)**. The
white site-image box holds the screenshot with 1px `border/000` on
the **left/bottom/right**, **rounded bottom 12 at xl/md · 8 at xs**
(the rebuild's radii), 8px pad.

**The roster — cascade order, front → back (owner, 2026-09-06):**

| # | site | category | chrome fill · border |
|---|---|---|---|
| 1 | Your Health Solutions | MedSpa | `teal/250` · `teal/300` |
| 2 | Lune Bodywork | Massage | `blue/250` · `blue/350` |
| 3 | X20 Studio | Pilates Gym | `purple/300` · `purple/350` |
| 4 | DreFadez | Barbershop | `pink/250` · `pink/300` |
| 5 | Ora Medical Clinic | — | `yellow/250` · `yellow/300` |
| 6 | Miriam Merim | Therapist | `orange/250` · `orange/300` |

Chrome pairs verified bound at all drawn sizes; the mixed steps
(purple/300+350, blue/250+350) are drawn intent. The rotation cycles
this order; the chrome color belongs to the **site**, not the slot —
the deck re-forms with each site keeping its chrome. *(Amended
2026-09-06 — owner ruling, §9 B8: the SITE-IMAGE border re-inks per
site for X20 Studio (`text/100`) and DreFadez (`border/200`) over the
shared `border/000`; the bar borders above stay derivative of their
fills.)*

**Deck geometry** *(the drawn-anchor px per size; the deck scales as
one proportional unit off-anchor — amended 2026-09-06, §9 R3)*:

| | xl (rd1/rd2) | md (rt) | xs (base/rs) |
|---|---|---|---|
| stack box | 548 × 404 | 640 × 468 | 320 × 232 |
| front card | 548 × 360 | 640 × 424 | 320 × 208 |
| width step / level | 24 (12 per side) | 24 | 16 (8 per side) |
| top offsets (back → front) | 0 · 8 · 16 · 24 · 34 · 44 | same | 0 · 4 · 8 · 12 · 18 · 24 |
| browser bar / dots | 24 / 8px dots, pl 8, gap 7.125→8 | 24 / 8, pl 8, gap 8 | 16 / 4px dots, pl 6, gap 4 |
| site-image aspect | 548/336 | 640/400 | 320/192 |

The drawn cards carry stacked stale under-layers (each card holds the
previous cards' screenshots beneath its own) — the build mounts **one
image per card**; hygiene rides with design (§9 F2). The set's `site`
axis (three drawn variants) is design preview only; the build owns the
rotation.

## 5 · Semantics and behavior

- The deck is **one button**: click, Enter, or Space anywhere on it
  advances one position ("next"). No links on the cards, no other
  targets, no auto-advance, no hover dressing.
- `aria-label` on the deck ("Show the next website"); an `aria-live`
  polite announcement carries "Now showing {name}" per advance; an
  sr-only list names all six sites and categories (§4 roster; Ora
  reads name-only — the category is in the name, the drawn "—" is not
  built; amended 2026-09-06, §9 R5). Images: alt `The {name} website`.
- The section is **born settled** — no entrance choreography.

## 6 · Motion — the reorder

One clock, per the owner's brief verbatim:

- **300ms, ease-out** (starts fast, settles — `--motion-deck-dur` /
  `--motion-deck-ease` in `tokens/motion.css`). All six cards animate
  **simultaneously** — no stagger.
- Each card FLIPs to its next slot's box (position + width); the front
  card goes **directly to the backmost slot** (its z-index flips at
  swap start — no dip, no slide-off, no intermediate state; the deck
  simply re-forms).
- **Nothing else animates**: no shadow, color, chrome, or scale
  changes; the grain and hairlines ride their cards statically.
- **Rapid clicks work**: each click advances immediately, retargeting
  every card from its current interpolated position — overlapping
  300ms transitions read as a riffle. **Never a queued backlog**: no
  click is deferred, and the deck never keeps animating after the
  clicking stops (the last transition settles ≤ 300ms after the last
  click).
- **Reduced motion**: the reorder applies instantly (state-to-state);
  the announcement still fires. **No-JS**: the static deck with Your
  Health Solutions in front; the CTA link works.

## 7 · Assets and constants

**18 exports verified** (WebP, 2×, one cut per site per size —
`work-cascade-{1344|768|384}-{01..06}.webp`):

| tier | pixels | serves |
|---|---|---|
| 1344 | 1096 × 672 (548 × 336 @2x) | the rd1 gate up (≥ 860) |
| 768 | 1280 × 800 (640 × 400 @2x) | 470–860 *(amended 2026-09-06 — §9 R4; the draft's 665)* |
| 384 | 640 × 384 (320 × 192 @2x) | below 470 *(amended 2026-09-06 — §9 R4)* |

The tiers are not one proportion (each is cut 2× its band's image box:
1344 at 1.631 · 768 at 1.600 · 384 at 1.667), so a cross-served cut
cover-crops. The rs band's mismatch — the 768 cut in the 320/192 box,
≈4% of the file height — is accepted (§9 R4); no re-export, all 18
files ship unchanged.

**The export numbering is reversed against the cascade order** (owner,
2026-09-06 — a numbering mistake, not re-cut): file `06` = Your Health
Solutions (front) … file `01` = Miriam Merim (back). The registry maps
slug → file explicitly, so the reversal is harmless and recorded:
`yhs→06 · lune→05 · x20→04 · drefadez→03 · ora→02 · miriam→01`.
Mount verbatim names under `public/media/work-cascade/`.

**Constants** (component token layer): the §4 deck tables; the image
radius 12 at xl/md · 8 at xs / pad 8 *(amended 2026-09-06 — the
component rebuild, §9 B7: the bar is square and the 14.25 swatch
radius is gone)*; the `web-swatch` shadow (rides the token
re-extraction as the file's fifth effect style — bind, don't
hardcode); the grain mounted through `lib/noise.tsx` with the
`web-swatch` NOISE parameters read at build (the 019 B9 pattern: the
primitive's defaults stay the extracted values, the instance carries
any tune).

## 8 · Deliverable — files, routes

- `design-system/v2/sections/work-deck.tsx` + `work-deck.css` — server
  component (header, band chrome, the deck settled with YHS in front);
  **one client island** (`work-deck-island.tsx`) owning the §6 click
  machine (the 012 pointer lessons apply to the button surface).
  *(File names amended 2026-09-06 — §9 R6; the draft's `work.tsx` /
  `work.css` / `work-deck.tsx` island.)*
- The site roster + registry in `work-deck-data.ts` (names, categories,
  slugs, chrome tokens, file mapping).
- Splices into `v2/home-next.tsx` after the engine section; permanent
  noindexed dev route **`/work-next`**.
- The expectations gain the section rows (§1); the sweep leg lands with
  023; until then the section audits on `/work-next` — every deck
  position is a rest state (six states, cycled).

## 9 · Resolutions record

All draft flags resolved 2026-09-06, the same morning:

- **F1 — the slug canon fixed.** The draft reads split ("Work that
  creates demand" at 1344 · "Work that converts" at 768/384); design
  unified to **`Work that creates demand`** — re-read at all three
  anchors post-fix.
- **F2 — the stale card under-layers ruled immaterial** (each drawn
  card stacks the previous cards' screenshots beneath its visible one;
  the build mounts one image per card). The flag prompted the asset
  delivery: the 18 cuts landed the same morning and verified (§7).
- **F3 — the six-site roster received** (§4): Your Health Solutions
  (MedSpa) · Lune Bodywork (Massage) · X20 Studio (Pilates Gym) ·
  DreFadez (Barbershop) · Ora Medical Clinic · Miriam Merim
  (Therapist), in cascade order front → back — matching the drawn deck
  layer-for-layer. The canon spelling is **X20 Studio** (the set's
  `x2o` variant name lags — file hygiene, immaterial). The export
  numbering reversal is recorded in §7.
- **R1 (positions, owner-blessed)** — the CTA targets `/our-work`; the
  deck is one button with the §5 semantics; no auto-advance; born
  settled; reduced motion instant; no-JS static with YHS in front;
  rapid clicks retarget and never queue.
- **R2 (record)** — every §1–§4 value verified against rendered bounds
  through the bridge at writing; the rd2 section reads **zero painted
  cells** (bare paper — a first for a v2 section, drawn intent); the
  deck constants are material (identical px at xl/md, halved at xs);
  the `web-swatch` effect style carries the section's grain + shadow
  and arrives via the pre-build token re-extraction.

Pre-approval review rulings, 2026-09-06 (owner, at the build agent's
preparation review):

- **R3 — the deck scales as one proportional unit** (owner ruling; §1,
  §4, and §10 amended). The draft's "material, fixed px at every band"
  reading breaks off-anchor: the drawn decks exactly fill their
  interiors at rt/base (640-in-640, 320-in-320), so every width below
  an anchor renders the box smaller than a fixed deck — worst at the
  derived rd1 band, where the 1344 design at t=80 gives a 480-wide
  cascade panel against a fixed 548 deck. Ruling: the deck floats in
  its box, only the box rides the ticks, and the deck scales
  proportionally with the spacing between cards congruent — the §4 px
  are the drawn-anchor values riding the band-constant construction
  (`calc((wA + wB) * V)`), rendering byte-exact at the anchors and
  zooming with the tick everywhere else. R2's "material" phrase stands
  as what it recorded — the cross-anchor pattern (identical px at
  xl/md, halved at xs), not an off-anchor law.
- **R4 — the 768 asset tier extends down to the rs gate** (owner; §7
  amended). The draft's 665 lower gate rendered the rs deck at ~1.33×
  density; re-gated at 470 it serves rs at ~2.67×. The tiers are not
  one proportion (each cut is 2× its own band's image box), so the
  cross-serve cover-crops ≈4% of the 768 file's height inside the rs
  band — accepted; no re-export, all 18 files ship unchanged. Gates:
  ≥ 860 the 1344 cut · 470–860 the 768 cut · below 470 the 384 cut.
- **R5 — Ora reads name-only in the sr-only roster** (owner; §5
  amended): the category is in the name ("Ora Medical Clinic"); the
  drawn "—" is not built.
- **R6 — the section's files take the `work-deck-*` prefix** (owner
  accepted the build recommendation; §8 amended): `work-deck.tsx` /
  `work-deck.css` (section), `work-deck-island.tsx` (the click
  machine, the `-island` naming precedent), `work-deck-data.ts`. The
  draft's `work.tsx` would interleave with the Our Work page's
  `work-*` family (`work-header` · `work-gallery` · `work-cases`) in
  the sections folder.

Build record, 2026-09-06 (approval in-chat the same day; built against
the owner's dev server):

- **B1 — the fresh-read pass.** Every §1–§4 value re-verified against
  rendered bounds through the bridge at the three anchors: the section
  frames, stack boxes, slot widths/offsets, and image aspects matched
  the tables byte-for-byte; the chrome fill/border pairs read bound
  per site (the §4 canon); the CTAs read `button-fill` **gray** pill —
  lg (1344) · md (768/384); the header inks read `text/400` (slug) ·
  `text/100` (headline); §3's "`ital` 100" is the Kyoto instance's own
  axis — nothing to build. The token re-extraction read **zero
  drift** across the primitives; the `web-swatch` DROP_SHADOW landed
  as `--shadow-web-swatch` in semantic.css (ink `#6c6860` =
  darkgray/200 at 5%) and its NOISE leg read **size 0.5 · density 0.6
  · black 10% / white 15%** — carried on the NoiseDuo instance (the
  019 B9 pattern; the primitive's defaults stay noise-duo's). The
  file's other new effect styles (`noise-icon` · `product` ·
  `vis-cards`) are unconsumed here — they arrive with the 020
  native-visual pass.
- **B2 — a new read-artifact class: stored corner radii inverted
  against the render.** The swatch's per-corner values read bottom
  14.25 / top 0 through the plugin API (no flip on any transform in
  the chain), while the render — the page render and an isolated
  node export, independently — rounds the **top** at 14.25; the
  site-image's stored bottom 12 renders at the bottom. Built to the
  rendered truth: chrome corners 14.25 above, the image box's 12
  closing the card below, no chrome wedge. The §4 "rounded bottom
  14.25" transcribes the stored value; treat the class like the
  stroke-alignment artifacts.
- **B3 — build constructions within the spec's language.** The deck
  unit `--wd-u` (component.css: `t/32` base+rs · the weight pair at
  rt · `t/112` from the rd1 gate) multiplies every §4 design-px
  constant — anchor-exact, zooming off-anchor per R3; the §4 slot
  tables ride `data-slot` rules in work-deck.css (the 019 petal-table
  precedent). The card is one proportional render (bar and image on
  aspect-ratio boxes, dots and insets in percentages), so the drawn
  back-card heights land within 0.25px of the file's integer reads
  (344.23 vs 344 — the proportional render of the drawn scale; the
  artifact class, recorded so later reads don't flag it); the 1px
  chrome and border/000 hairlines stay 1px at every slot as drawn.
  The reorder is CSS transitions on width · top · border-radius —
  one clock, native mid-flight retargeting, z state-to-state.
- **B4 — file constructions recorded, not built:** the site-image
  slot's drawn 8px pad has no rendered consequence (the fills paint
  the full box; the §7 exports are full-box cuts); the stale
  under-layers per F2; the drawn 7.125 dot gap is §4's own 8
  transcription.
- **B5 — two fixes at build QA.** (1) The advance is a **functional
  state update** — the draft build computed the next index from the
  render closure, and rapid clicks landing in one React batch
  collapsed to one advance (five synthetic clicks moved one
  position); the aria-live message now derives from the committed
  front. (2) The cascade band's centering excludes the
  line-inclusive **+1px** (padding-bottom on the band) — without it
  the stack group sat 0.5px off the drawn offsets at rt/base.
- **B6 — acceptance evidence** is in §10's checked boxes; tsc and
  lint zero; the standing sweep green against the owner's server;
  the route-JS measurement rides to 023 (the standing posture).
  Working tree left uncommitted per the git rule.
- **B7 — the component rebuild landed post-build, same day** (owner,
  in-chat, with the new set `813:89840` — one `size` axis, no site
  axis; read fresh through the bridge; §4/§7 amended). The card is
  now bar + image with nothing behind them: the bar carries the
  chrome (fill + top/left/right stroke per site, square corners) and
  the `web-swatch` grain + shadow; the image box keeps `border/000`
  left/bottom/right with the rounded bottom re-drawn **12 at xl/md ·
  8 at xs**. The B2 radius-inversion artifact is moot (the rebuild's
  stored values read true). The build followed the same day: chrome,
  grain, and shadow moved to the bar; the card box carries no paint;
  the dot metrics ride the slot scale as lengths on the §6 clock.
  Re-verified at 1344: card 548×360 (bar 548×24, stroke t/r/l only,
  radius 0, the token shadow; shot 548×336, border r/b/l, bottom
  radius 12, dots 8); the reorder and riffle unchanged; tsc/lint
  zero. **Two file residuals with design:** (1) **the xl variant's
  height reads 548×336 total (image 312)** — md/xs kept their totals
  (424/208, image aspects matching the §7 cuts) while xl shrank from
  360, an aspect no export matches (the 1344 cuts are 2× 548×336 for
  the image alone), and the drawn 1344 stack is a broken mid-edit
  state (the front instance sits at y −79 outside the 548×404 stack
  box; the back instances keep stale old-height boxes) — the build
  keeps the approved xl geometry (bar 24 + image 336 = 360; the
  stack box 548×404) until design re-heights the variant or rules
  the trim (which would need six xl re-cuts and §1/§4 amendments);
  (2) **the bar instance carries a second, scale-artifact copy of
  the shadow** (0 / 1.1875 / 2.375 on the instance, atop the style's
  0/1/2) — the build paints the one token shadow.
- **B8 — the B7 residuals fixed file-side and four review rulings
  landed, same day** (owner, in-chat; re-read through the bridge:
  the xl variant reads 548×360 again with the 1344 stack repaired —
  front at y 44 — and the bar instance's duplicate shadow is gone).
  The rulings, from the owner's review of the built deck: **(1) the
  screenshot clips to the image box's rounded corner** — the build's
  unclipped `<img>` painted square over the curve, hiding the corner
  entirely on dark screenshots and cutting the border's rounded
  stroke on light ones (`overflow: hidden` on the box; the bogus
  `border-radius: inherit` on the img — which resolved against its
  `<picture>` wrapper, not the box — removed). **(2) The bottom
  radii are MATERIAL: 12 at 1344 and 768 · 8 at 384**, fixed px per
  band at every slot and every mid-band width — the build's
  slot-scaled radius (u·w·12/548) superseded; the radius transition
  goes with it. **(3) The 1px borders hold at 1px** while the cards
  scale mid-band and mid-flight (already the built behavior —
  affirmed as law). **(4) Two SITE-IMAGE borders re-inked** *(the
  ruling as corrected in-session — the build's first pass wrongly
  re-inked the bar lines, caught by the owner and reverted)*: X20
  Studio's image border is **`text/100`** and DreFadez's is
  **`border/200`** over the shared `border/000`; the bar borders
  stay derivative of their fills (the §4 pairs, purple/350 and
  pink/300 included). Re-verified: all six cards read radius 12 (at
  1344), overflow hidden; the bar lines the §4 pairs; the two image
  borders computing to darkgray-600 / lightgray-600; the reorder
  unchanged; tsc/lint zero.
- **B9 — the frame-wide top rule landed, same day** (the engines→work
  seam pass; the ruling and the full record live in **020 §9 R23** —
  the `911:103458` scroll-state redraw, read at rendered bounds). At
  rd1/rd2 the section carries a 1px `border/000` top rule as its
  drawn INSIDE stroke, line-inclusive via border-box: the 7t flow
  height holds and the content sits the drawn 1px lower (the
  redraw's header at 113). With it, the standing line-inclusive
  collapse (`margin-top: −1px`, corrected at the owner's same-evening
  hairline review): the rule shares the engine lattice's bottom-line
  pixel instead of stacking under it (the doubled east-half hairline),
  and the page returns to the tick. §1/§2 amended at their values.
  Verified on the composition by document pixel: the rule spans the
  frame at workTop = engBottom − 1 (the shared pixel) at rest and in
  motion, resolving under the sliver row exactly at the engine
  carousel's apex.

## 10 · Acceptance criteria

*At the three drawn anchors, the two derived-band anchors, and one
arbitrary mid-band width per band, scrollbar forced on.*

- [x] Section rows tick-true per §1 (384: 169–188 · 768: 122–137 ·
      1344: 27–33); the cascade bands' hairlines line-inclusive against
      the rails; the deck boxes at their §4 values at the drawn
      anchors and at the band's one zoom factor off-anchor (amended
      2026-09-06, §9 R3). *(2026-09-06: sections 384×640 · 768×1024 ·
      1344×784; bands 417/705 = k·t+1; decks 320×232 · 640×468 ·
      548×404 byte-exact at the anchors, 480×348 at the derived 576
      (×1.5), 391.42×288.57 at the derived 960 (×80/112, fits the
      480 half-panel), 615 at the compressed 738 (= 640·t/64), 489.28
      at 1200, 548 exact at the capped 1920; header slug/h2/CTA at
      the drawn px at all three anchors — 112/195 · 253 · 541 at
      1344, 64/77 · 117 at 768, 0/0 · 32/44 at 384.)*
- [x] Exposure per §2 exactly — bare paper at 1344, the east rails at
      768/384, nothing else. *(2026-09-06: zero visible regions at
      960/1200/1344/1920; rt one region x=10t w=2t+1 h=16t+1; 384 one
      region x=11t w=t+1 h=20t+1.)*
- [x] The deck renders the §4 roster in order, chrome bound per site,
      one screenshot per card (the right tier per band), the grain and
      the `web-swatch` shadow on every swatch. *(2026-09-06: six
      cards, slots 0–5 in cascade order; chrome pairs the §4 tokens
      per data-site; one <picture> per card — the 1344 cut at ≥860,
      the 768 cut at 470–860 (the R4 re-gate, verified serving at
      576), the 384 cut below; NoiseDuo at 0.6/10%/15% + 
      --shadow-web-swatch on every card.)*
- [x] Click/Enter/Space advances exactly one position; six clicks
      return to YHS; the front card re-slots to the back with no
      intermediate state; all six cards share the one 300ms ease-out
      clock, no stagger; nothing else animates. *(2026-09-06: click
      verified per-advance with the aria-live naming; six clicks
      returned YHS front; Enter/Space are the native button; the
      transition list is width/top/border-radius only at 0.3s on the
      deck ease for every card; z flips state-to-state.)*
- [x] Rapid clicking riffles (retargets mid-flight, one advance per
      click) and stops ≤ 300ms after the last click — no backlog.
      *(2026-09-06: five clicks in one batch advanced five positions
      (the §9 B5 functional-update fix); mid-flight widths read
      interpolated (544.85 at 100ms); settled exact ≤350ms after the
      last click.)*
- [x] The aria-live announcement names each new front site; the sr-only
      roster reads all six; alt text per §5. *(2026-09-06: "Now
      showing {name}" per advance, empty on load; the roster list
      reads all six with Ora name-only (R5); alt "The {name} website"
      in the served HTML.)*
- [x] Reduced motion reorders instantly; no-JS renders the static deck
      with YHS in front and a working CTA. *(2026-09-06: under
      data-motion=reduce the transitions read 0s and the advance
      landed state-to-state with the announcement; the served HTML
      carries the settled deck (yhs slot 0) and the /our-work CTAs.)*
- [x] One client island; every value traces to a token or a §7
      enumerated constant; the slug canon reads `Work that creates
      demand` at every band. *(2026-09-06: work-deck-island.tsx is
      the section's only island; the constants live in
      component.css/motion.css/work-deck.css per §9 B3; one slug
      string in the section source.)*
- [x] tsc/lint zero; the standing sweep green (v1 routes and the built
      018/019 sections byte-untouched). *(2026-09-06: tsc clean, zero
      ESLint warnings; GRID_URL sweep "All grid self-tests passed"
      against the owner's server; no v1 or 018–020 source touched —
      home-next.tsx gained only the splice.)*
