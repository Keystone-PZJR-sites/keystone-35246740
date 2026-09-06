# Spec 019 — Homepage v2: the system section (five-engine diagram + Bloom)

**Status:** Draft 2026-09-05 — all §9 flags resolved the same evening
(fixes re-read from the nodes); awaiting approval
**Depends on:** spec 018 (the `home-next` composition and route pattern this
section splices into) · spec 002.r1/.r2 (bands, gates, the wide cap) ·
spec 001 (tokens; the new display-serif steps arrive via the pre-build
re-extraction) · plan.md Phase 10. Supersedes the v1 portfolio's slot in
the page flow (spec 007 stays the frozen record of that section).
**Sources:** fresh MCP reads 2026-09-05 of the system-section nodes at the
three drawn anchors — 384 `859:98755` (header `799:60165` · diagram
`799:60077` · ring `799:60078` · repeat group `799:60085` · intersect
`799:60079`); 768 `813:81238` (header `813:81239` · diagram `813:81244` ·
ring `813:81245` · repeat `813:81252` · intersect `813:81246`); 1344
`799:60938` (header `799:60939` · diagram `799:60944` · ring `799:60945` ·
repeat `799:60952` · intersect `799:60946`) — plus the five tag nodes per
anchor and the Grid rows behind the section. **Every geometry fact,
fill/stroke binding, noise parameter, and per-cell exposure below was read
through the console bridge against rendered bounds the same session.**
Motion intent: the owner's **Bloom** brief (2026-09-05, plain language —
growth from the shared centre, clockwise, labels resolve, intersection
last, no rotation/bounce/overshoot, play once, scroll-armed) plus four
same-day rulings (§9 R1–R4): the entrance starts at **Brand**; reduced
motion follows **site law** (settled render); the section is **inert**
after settle; the grain builds on **SVG feTurbulence as a shared
primitive** (second consumer: the 020 visibility engine).

The claim the section makes: five engines are one shared understanding
expressed five ways. The diagram is **one proportional construction** —
every part scales with the ring (petal d = 0.3542 · ring at all three
anchors, read exact) — so the derived bands (rs from 384, rd1 from 1344)
reproduce it by construction.

---

## 1 · Section anatomy — tick totals per band

| band | section rows | header | diagram box | ring |
|---|---|---|---|---|
| base 384 (t=32) | 24–40 (17t) | local rows 0–4 (160px, w 352) · gap 32 | rows 6–16 (352 tall, full width) | d 256 (8t), center (192, +16 below box center) = (6t, 36t); box 2t–10t × 32t–40t |
| rs 576 (t=48, derived) | the 384 design at t=48 — section rows 24–40 (17t) | local rows 0–4 (240 = 5t) · gap 1.5t | rows 6–16 (528 = 11t, full width) | d 384 (8t), center (6t, 36t + 24); box 2t–10t × 32t–40t |
| rt 768 (t=64) | 13–24 (12t) | local rows 0–4 (320 = 5t, w 639, pl 64 pr 80) | rows 5–11 (448 = 7t, full width) | d 384 (6t), center (384, +32) = (6t, 22t); box 3t–9t × 19t–25t, bottom flush with the section end |
| rd1 960 (t=80, derived) | the 1344 design at t=80 — section rows 12–17 (6t) | x 0–560 (pl 80 pr ~103, riding the zoom) | x 560–960, 400 × 400, v-centered | d 240 (3t), centered = (9.5t, 15t); box 8t–11t × 13.5t–16.5t |
| rd2 1344 (t=112) | 12–17 (6t) | x 0–784 (pl 112 pr 144), v-centered h 560 | x 784–1344, 560 × 560, v-centered | d 336 (3t), centered = (9.5t, 15t); box 8t–11t × 13.5t–16.5t |

The derived rows carry no drawn values: a derived band renders its
source anchor's tick geometry verbatim at its own tick (the plan's
three-anchor policy), so their cells are the source rows restated at
t=48 / t=80. They are evaluated manually on the built page; a frame
drawn later supersedes them.

All values from rendered bounds. The ring registers tick-true on both
axes at 384/768 and rides a half-tick vertical offset at 1344 (drawn).

## 2 · Exposure map

Per-cell stroke visibility read through the bridge; 1px `border/000`
center-aligned throughout. Zero-based page `col,row`:

- **384** (rows 24–40): east rail col 11 beside the header (rows 24–29),
  with **■[11,24] filled `bg/200`** (the standing filled-cell
  vocabulary); full field rows 30–40 behind the diagram.
- **768** (rows 13–24): east rail cols 10–11 beside the header (rows
  13–17); full field rows 18–24 behind the diagram. (The [7,13] slot's
  doubled rectangle was deleted at the flag pass — §9 F2.)
- **1344** (rows 12–17): cols 7–11 painted all six rows (the field
  behind the diagram half); cols 0–6 bare behind the headline.

No ornament circles in this section; no controls on the lattice.

## 3 · The header

**Slug:** `A complete marketing system` — square marker on `bg/400`
(7px at 1344 · 6px at 768/384), gap 12 (8 at 384); text `text/400`.
**Headline (one canon, confirmed — §9 F3):**
`Five engines that deeply understand your business working together.`
Ink `text/100`, PP Kyoto `ital` 100, natural wrap in the padded boxes.

| | 384 | 768 | 1344 |
|---|---|---|---|
| slug type | text/xs/Medium 12/16 | text/xs/Regular 12/16 | text/sm/Regular 14/18 |
| headline | display-serif/xs/Extralight 24/30, tr −0.48 | display-serif/sm+/Extralight 36/42, tr −0.72 | display-serif/lg+/Thin 50/60, tr −1.0 |

The weight steps Thin → Extralight down the bands as drawn (distinct
file text styles; they ride the token re-extraction). At 384 the marker
sits in its own 32px column left of the text stack (the drawn header
row construction); headline pr 16.

## 4 · The diagram

One stage, five petals, one mark, five labels — all proportional on the
ring diameter **R** (the §1 per-band values):

- **The ring** — a circle d = R, fill `bg/100`, 1px `border/000`. The
  boundary of the business; never animated after arrival.
- **The petals** — five true circles, **d = 0.3542 · R** (read 119.0 ·
  136.0 · 90.66), each on `mix-blend-multiply`, fills bound to the
  engine canon: **Brand `color/orange/400` · Visibility
  `color/yellow/400` · Ads `color/pink/400` · Engagement
  `color/purple/300` · Reception `color/blue/300`**. Centers (px from
  ring center, read exact at each anchor; the build derives them as
  ratios of R and must land within ±1px of these at the drawn anchors):

  | petal | 384 | 768 | 1344 |
  |---|---|---|---|
  | Ads | −0.6, −37 | −1, −55.5 | −1.2, −48.3 |
  | Engagement | +34.3, −12.5 | +51.4, −18.8 | +44.6, −16.2 |
  | Reception | +21.8, +28.2 | +32.7, +42.3 | +28.2, +37.3 |
  | Brand | −20.8, +29 | −31.2, +43.5 | −27.7, +38.3 |
  | Visibility | −34.5, −11.6 | −51.7, −17.4 | −45.7, −15 |

- **The intersect mark** — the drawn boolean of all five (fill bound
  `text/050`, `mix-blend-multiply`, ≈ 0.079 · R wide, centered with a
  small drawn y offset). **Verbatim SVG export** through the bridge (one
  export; it scales with R). It is a real drawn element, not the
  accumulated blend.
- **The grain** — the `noise-duo` effect style rides the whole petal
  group: DUOTONE noise, noiseSize 0.5, density 0.8, black 15% / white
  15%. Built with the §7 shared feTurbulence primitive, clipped to the
  petal cluster.
- **The tags** — `bg/300` chips, radius `radius-sm` 6, px 8, pt 2 pb 3,
  ink `text/200`; type text/md/Regular 16/22 (768/1344) ·
  text/xs/Regular 12/16 (384). Centers (px from ring center, read):

  | tag | 384 | 768 | 1344 |
  |---|---|---|---|
  | Ads | 0, −129.5 | 0, −192.5 | 0, −168 |
  | Engagement | +128, −31.5 | +181, −60.05 | +168, −35.55 |
  | Reception | +96, +90.5 | +139, +131 | +104.76, +136.5 |
  | Brand | −96.5, +90.5 | −142.5, +131 | −104.77, +136.5 |
  | Visibility | −128, −34.5 | −181, −60.05 | −168, −35.55 |

  The 768 Ads x +0.5 is the artifact class, transcribed 0. The 384
  engagement/visibility y asymmetry (−31.5 vs −34.5) is drawn — built
  as read. Composition note (owner, 2026-09-05): the pentagon is
  rotated so the short "Ads" label sits top — optical balance of the
  resolved composition; the entrance order is independent of it.

**After settle the section is inert** (owner ruling): no hover, no
links, no idle motion. The diagram is `aria-hidden` decoration with the
five engine names carried in an sr-only sentence; the tags are
presentational.

## 5 · Semantics

`<section aria-label="A complete marketing system" data-landmark>`;
the headline is an `<h2>`. The diagram subtree is `aria-hidden` (the
sr-only sentence names the five engines); no interactive elements.

## 6 · Motion — Bloom

The owner's brief governs; values are the spec's choice and approval
covers them. Non-negotiables encoded: nothing enters from outside the
ring, the clockwise order never varies, labels resolve in place, the
mark lands last, the headline never animates, no rotation, no
overshoot, full strength at rest.

- **Arming.** One IntersectionObserver on the diagram box; fires when
  ~55% of the box is in view (the headline is above it at every band by
  construction). Plays **once per page load**; after firing it
  disconnects. A load below the trigger (deep link, refresh mid-page,
  back-navigation) renders the settled section — the standing
  choreographies-settle contract (`v2-choreo-bloom` guard, settled
  attribute on the last beat).
- **Sequence.** (1) The ring fades in alone — opacity only, no travel,
  no scale. (2) The five petals grow **clockwise from Brand**: Brand →
  Visibility → Ads → Engagement → Reception. Each petal's wrapper
  scales 0.06 → 1 with **transform-origin at the ring center**, so
  growth originates on the shared core and the petal expands into its
  drawn position — no translation, no rotation, ease-out settling (the
  drawer ease family), no overshoot. The multiply accumulation in the
  core is the real blend darkening as petals land. (3) Each tag
  resolves in place — opacity 0 → 1 with a slight blur → sharp — one
  beat after its petal lands; tags never travel. (4) The grain fades
  in with the last petal. (5) The intersect mark lands last — opacity
  + scale 0.85 → 1 in place, after all five petals rest.
- **Values** (tokens in `tokens/motion.css`, `--motion-bloom-*`):
  rd2/rd1 — ring 400ms; petal stagger 400ms, each petal 700ms; tag
  resolve 300ms at petal + 250ms; mark 350ms at last petal + 300ms
  (total ≈ 3.0s — the headline-reading class). rt/rs/base — stagger
  250ms, petal 550ms, total ≈ 2.0s (the brief's single-scroll rule).
- **Reduced motion: site law** (owner ruling) — the settled section
  renders with no animation, superseding the brief's gentle-assembly
  suggestion. **No-JS** renders the settled section (the island only
  orchestrates the entrance; the server HTML is the final frame).

## 7 · Assets and constants

- **`IconSystemIntersect`** (working name) — the verbatim SVG export of
  the intersect boolean (`799:60946`), exported through the bridge at
  build; one export, scaled with R, fill riding `currentColor` bound to
  the `text/050` token at the mount.
- **The grain primitive** (owner direction — born shared; second
  consumer is the 020 visibility engine): an SVG **feTurbulence**
  duotone grain — `design-system/v2/lib/noise.tsx` (or the filter-def
  equivalent), prop-driven (scale, density, dark/light inks and
  alphas). The 019 instance carries the file's `noise-duo` constants:
  size 0.5 · density 0.8 · black 15% / white 15%. Acceptance is a
  side-by-side against the file render at rd2 — grain character and
  weight match; exact pixels are not reproducible and not required.
- **Proportional constants** (component token layer): petal ratio
  0.3542 · R; per-petal and per-tag center tables (§4) as per-band
  values; ring sizes per §1; slug marker 7/6/6; chip pt 2 / pb 3.
- No raster assets in this section.

## 8 · Deliverable — files, semantics, routes

- `design-system/v2/sections/system.tsx` + `system.css` — server
  component rendering the settled section; **one client island**
  (`system-bloom.tsx`) carrying the §6 observer and beat sequence
  (class/attribute flips only; geometry stays CSS).
- `design-system/v2/lib/noise.tsx` — the shared grain primitive (§7),
  with a `/primitives` catalog row.
- Splices into `v2/home-next.tsx` after the 018 hero; permanent
  noindexed dev route **`/system-next`**.
- Homepage v1 untouched; the page expectations and sweep leg land with
  023 — until then the section audits on `/system-next` through the
  standing devtools, with both rest states (pre-fire below the trigger,
  settled after) passing the landmark and clearance assertions.

## 9 · Resolutions record

All flags resolved 2026-09-05, the same evening:

- **F2 — fixed.** The doubled [7,13] cell (`Rectangle 142` +
  `Rectangle 143`) had one rectangle deleted; the slot re-read a
  single `Rectangle 143` through the bridge. Immaterial to the build
  (both rectangles were unpainted — the slot was already in the
  bare-cell set); recorded for file hygiene.
- **F3 — headline canon confirmed** (owner):
  `Five engines that deeply understand your business working
  together.` — the word order all three anchors read at draft. (The
  older order survives only in the stale 384 case-study header — the
  022-scope flag below.)

**Resolved at draft (owner, 2026-09-05):**

- **R1 — the entrance starts at Brand**, clockwise: Brand → Visibility
  → Ads → Engagement → Reception. The drawn composition's rotation
  (Ads top) is optical balance of the resolved frame, independent of
  the entrance order.
- **R2 — reduced motion follows site law** (settled render),
  superseding the brief's gentle-assembly suggestion.
- **R3 — the section is inert after settle** — no hover, links, or
  idle motion.
- **R4 — the grain builds on SVG feTurbulence as a shared primitive**;
  the 020 visibility engine is the known second consumer.
- **R5 (record)** — every §1–§4 value verified against rendered bounds
  through the bridge at writing; all diagram fills/strokes bound
  (engine colors, `bg/100`/`bg/300`/`bg/400`, `border/000`,
  `text/050`); the noise parameters read from the effect style; the
  petal/ring ratio identical at all three anchors (0.3542, ±0.05px).

**Recorded for 022 (not this spec's blocker):** the case-study headers
at 384/768 carry neighbors' copy — 384 (`799:60200`/`799:60203`) reads
the system section's slug + the old-word-order headline; 768 (inside
`813:90528`) reads the work section's pair; 1344 is correct with a
double-space residual. Flagged to design 2026-09-05; the fix rides
before 022 is written.

## 10 · Acceptance criteria

*At the three drawn anchors, the two derived-band anchors (576/960 as
derived renders), and one arbitrary mid-band width per band, scrollbar
forced on.*

- [ ] Section rows tick-true per §1 (384: 24–40 · 768: 13–24 · 1344:
      12–17); the ring lands on its §1 box at each drawn anchor.
- [ ] The exposure map renders exactly per §2 — rails, fields,
      ■[11,24] `bg/200` at 384 — and nothing else; single hairlines
      everywhere (the F2 fix verified).
- [ ] Petal diameters, centers, and fills match §4 within ±1px at each
      drawn anchor; the core darkens by real multiply accumulation (no
      opacity simulation); the intersect mark is the verbatim export on
      `text/050`.
- [ ] The grain reads as the file's noise-duo at rd2 side-by-side; it
      clips to the petal cluster and fades with the entrance.
- [ ] Bloom: arms on the §6 threshold, plays once, never re-fires on
      scroll or resize; order Brand → Visibility → Ads → Engagement →
      Reception; ring first, labels resolve in place a beat behind,
      mark last; no element originates outside the ring; no rotation,
      no overshoot; all five petals at full strength at rest.
- [ ] Reduced motion and no-JS render the settled section (site law);
      a load below the trigger renders it settled.
- [ ] Inert after settle: no pointer targets inside the diagram; the
      sr-only sentence carries the five engine names.
- [ ] One client island; `/system-next` route JS in the section-island
      class; every value traces to a token or a §7 enumerated constant.
- [ ] tsc/lint zero; the standing sweep stays green (v1 routes
      byte-untouched).
