# Marketing site rebuild — plan

New-brand rebuild of the Keystone corporate site — since 2026-08-27 the only
site in this tree. The old site ships from `main` until cutover, and launch
is **big-bang**: nothing deploys until every page is complete.

This is the living plan: standing policies, phasing, and the decision log
going forward. The record of the original rebuild — phases 0–9, specs
001–017, and the 2026-08-22 → 2026-09-03 decision log — is frozen in
[`plan-v1.md`](plan-v1.md). Read it for history; never edit it.

Sitemap: Home · Our Work · Solutions · Pricing · Company · Resources.
Built: Home (v1 — being replaced, Phase 10) · Pricing · Our Work · Case
Studies (template + Palm Coast Zivel). Every page, at every viewport width,
sits on the global grid system.

---

## Sources of truth

In order of authority; when two disagree, the higher one wins.

1. **The live Figma file** `ks-MarketingSite` (IBO39siJYDhiCRtuLWUTW2), read
   through the Figma MCP (`get_metadata` / `get_design_context` /
   `get_variable_defs`). All geometry, type values, and exposure maps are
   read from node data at spec- and build-time — never from screenshots,
   never from prior extractions.
2. **`reference/GRID-SPEC.md`** (v5) — the grid system mechanics. Law for
   *how* the grid is built; contains no content values.
3. **`reference/TOKENS-HANDOFF.md`** — the token architecture. Values are
   re-extracted from Figma variables before every build (spec 001 rule).
4. **Font binaries** — axis/instance facts read from the `.woff2` files
   directly (see spec 001).

## The band system

Five bands, gated by container queries at the bands' geometric midpoints
(nearest-anchor rendering, spec 002.r1). Within a band the anchor's design
renders zoomed on the tick.

| band | gate | anchor | tick |
|---|---|---|---|
| base | — | 384 | 32px |
| `rs` | 470 | 576 | 48px |
| `rt` | 665 | 768 | 64px |
| `rd1` | 860 | 960 | 80px |
| `rd2` | 1130 | 1344 | 112px |

Above 1344 the tick caps at 112px and centered side fields fill the gutters
(spec 002.r2). Light mode only.

## Three-anchor pages — derived bands

New pages may be designed at three anchors only: **384 · 768 · 1344** (owner
decision 2026-09-05, generalizing pricing's 011 §1.1). The undrawn bands
derive: `rs` renders the 384 design on its tick; `rd1`'s source is ruled per
section at spec time (default: the 1344 design, which zooms down cleanly by
construction). Design evaluates the derived bands on the built page — derive
until it looks broken. A frame drawn later supersedes the derivation, as
pricing's 576 did.

## Spec cadence — just-in-time, never batched

Every phase is gated by its own spec, and **specs are written just-in-time,
one phase ahead at most** — never batched upfront. A spec is written only
when its sources are stable: the Figma inputs it cites exist and are
confirmed, and any mechanical lessons from the phase before it have landed.
The rhythm per phase:

1. Design shares/confirms the phase's Figma inputs.
2. The spec is written **from fresh MCP reads of those nodes at writing
   time** — never from memory of earlier reads, prior extractions, or the
   planning passes that informed this plan.
3. Spec approved → implementation → acceptance criteria checked at every
   anchor and mid-band → next phase.

A spec written ahead of its inputs would be written from stale or guessed
values and would need editing later — which spec immutability forbids.

## Special cells — ornament and function on the lattice

Some tick cells in anchor frames are not plain lattice: cells with a radius,
cells with radius and fill, and cells that host controls. Three standing
lessons (full history in `plan-v1.md`):

1. **Metadata reads cannot see what a cell is** — no radius, fill, or
   interactivity. Special cells are inventoried per spec and read per-node
   with `get_design_context`; controls live on the content layer, never the
   lattice.
2. **Metadata reads cannot always see where a node is.** Grid auto-layout
   children can carry stale `x`/`y`. Geometry is verified against rendered
   bounds (`absoluteBoundingBox`, via the console bridge) before it is
   committed.
3. **Carousel frames overflow their anchors** (off-canvas slides). Rendered-
   bounds verification uses the in-frame clip, not the overflowing frame box.

## Phasing

**Phases 0–9 are complete** — foundations, grid engine + harness, core
primitives, footer, nav, homepage v1 (sections + assembly), Pricing, Our
Work, Case Studies Phase A. The record lives in `plan-v1.md`; the open
launch gates live in [`launch-checklist.md`](launch-checklist.md).

- **Phase 10 — Homepage v2** (specs 018–023): the redesigned homepage,
  built in parallel and cut over at 023. See below.
- **Phase 11+ — Solutions · Company · Resources**: same per-page pattern as
  Pricing/Our Work — planning pass from fresh reads → planning flags →
  per-section specs at the next sequential numbers → page assembly spec.
  Order decided when Phase 10 ends.
- **Phase B — Case-study content passes**: Your Health Solutions · Bare Lúx
  Studio on the built 017 template. Content only; no new design inputs.
- **Launch**: the checklist gates (metadata wipe, content passes, budgets,
  sign-off), big-bang after all pages.

## Homepage v2 — Phase 10 (specs 018–023)

The homepage is redesigned between the nav and the footer: same grid
harness, entirely different content, simpler exposure maps, **three drawn
anchors** (384 `799:57207` · 768 `813:80822` · 1344 `799:60207`). The old
homepage specs 006–010 stay frozen as the v1 record; each new spec lists its
superseded predecessor under `Depends on:`.

One spec per section, top-down, just-in-time:

| spec | section | supersedes |
|---|---|---|
| 018 | hero + image carousel refresh (new copy, smaller carousel, new assets) | 006 |
| 019 | system-section (engines diagram + loading animation) | 007's slot |
| 020 | engine section (rd2 sticky two-panel scroll machine; stacked panels below) | 008 |
| 021 | work section (browser-window stack, click-to-advance) | — |
| 022 | case-study carousel (the 012 persona-carousel grammar, no slider) | 009 |
| 023 | page assembly + cutover (expectations, sweep leg, budgets, the `/` swap) | 010 |

Build mechanics: a new composition module mounts on a noindexed dev route
(`/home-next` + fixture; names fixed at 018). `/` and `/home-fixture` keep
mounting homepage v1 untouched until 023. New sections are new components;
the hero fork-vs-parameterize call lands at the 018 build. 023 enumerates
the retired v1 sections and routes for explicit owner approval, retires the
v1 expectations, updates the launch checklist, and re-evaluates the 010 §7
F5 mobile-LCP gate against the new hero.

## Inputs needed from design, by spec

- **018**: carousel image exports + tier direction (copy is in the frames).
- **019**: loading-animation intent in plain language; whether the diagram
  is drawn vector or exported asset.
- **020**: the full interaction description (sticky trigger position, the
  two-state × three-visualization sequence, left-panel scroll vs right-panel
  transition interleave); the small-anchor decision (hijack vs carousel);
  the rd1 derivation ruling; visualization assets; reduced-motion intent.
- **021**: browser-window assets; the advance interaction (click zones,
  wrap, keyboard); whether the windows link out.
- **022**: case-study copy/stat source — preferred: the same per-study data
  modules the case-study pages use, so Phase B passes update both surfaces.
- **023**: cutover approval list and budget targets.

## Decision log — 2026-09-05

- **Homepage v2 is planned as specs 018–023** (owner decisions at the
  planning review). A new sequential block, not `.r1` revisions — the
  redesign replaces sections rather than revising them, and the v1 and v2
  spec sets must live side by side while both homepages exist (the rules'
  second immutability exception). Six specs, one per section plus assembly
  (the table above). Design supplies **three anchors** (384 · 768 · 1344);
  `rs`/`rd1` derive per 011 §1.1 — owner: "derive until we see how broken
  it is"; `rd1` defaults to the 1344 design, ruled per section.
- **The planning pass read all three frames** (metadata-grade, this
  session; rendered-bounds verification happens at each spec's writing).
  Page totals read **238 · 165 · 54** ticks. Sections at every anchor:
  hero (H1 on the streamline line) · image carousel (6/4/4t) ·
  system-section (17/12/6t) · engine section(s) (4×25t / slug + 5×19t /
  8t active-inactive) · work-section (20/16/7t) · case-study section ·
  footer. Section behavior received in plain language: the rd2 engine
  section is a sticky two-panel scroll machine (left description scrolls,
  right panel steps two states across three visualizations); below rt the
  panels stack and the right panel hijacks or carousels (TBD at 020); the
  work section advances a stack of stylized browser windows on click; the
  case-study carousel is the 012 grammar without the slider; the
  system-section has a loading animation. Detail arrives per spec.
- **Planning flags with design** (from the metadata reads): **F1 — the 384
  frame is missing `brand-engine`** — four engine panels, not five, with a
  26t hole (one slug row + one 25t panel) between the system section (ends
  41t) and `visibility-engine` (starts 67t); the 768 frame carries all
  five. **F2 — the 384 case-study section reads off-tick** (700 tall where
  22t is 704; carousel interior 508; a 36px pre-footer gap) and the 1344
  section carries a +1px (897). **F3 — hygiene**: the 384 `reception-egine`
  name typo; the 1344 Grid layer ends at 49t against the 54t frame (verify
  intent).
- **This plan restarted** (owner approval): the original plan archived
  unedited to `plan-v1.md` with a frozen banner — the plan-v1/plan split
  mirrors the frozen spec series. `plan.md` stays the living plan for all
  remaining work; the archive cut is repeatable when the next era
  completes.
- **The F1–F3 fixes landed and were re-read the same evening** (design
  fixes; verification against rendered bounds through the bridge). **F1**
  — `brand-engine` exists at 384 (`866:98781`, 42t–67t, flush to
  `visibility-engine`), **with one residual: its x reads 13.02 at
  rendered bounds** (siblings sit at 0) — a real misplacement, with
  design; blocks 020, not 018. **F2** — the 384 section re-read
  whole-tick (704, carousel 512, a 1t pre-footer gap); **the 1344 +1px
  persists** (897 at rendered bounds) — with design; blocks 022. **F3**
  — the typo fixed at both anchors and the 1344 Grid re-read 43t, ending
  at the footer top.
- **Spec 018 is drafted** (evening, from fresh reads of the hero and
  carousel nodes at all three drawn anchors — every §1–§6 value verified
  against rendered bounds and the per-cell exposure read through the
  bridge; 018 §9 is the record). The hero exposure is a descending east
  staircase with one ○ ornament per anchor into a full-lattice field
  opening one row above the carousel; lattice ink `border/000` at every
  anchor. The 16 hero exports landed and verified (WebP, 2×, two cuts —
  wide 1344×896 · square 896×896). Owner rulings at the draft (018 §9):
  **the exports are the strip canon** — the drawn 384 strip (ten slides,
  four photos without exports) is outdated; eight slides at every band
  in export order, all-square at 384; **the multiply tint is baked** in
  the exports (the 017 precedent); **768 rides the 1344 cuts** (the
  two-cut tier set). **All four draft flags resolved the same evening**
  (018 §9; fixes re-read from the nodes): the 768 H1 reworked to the
  single canon string wrapping naturally in a right-padded box (pad 64,
  the 1344 construction; period restored, drawn break removed),
  the 768 subhead's 5px inline gap ruled intent (enumerated
  constant), the 1344 slide-04 stale under-layer ruled won't-fix
  (nothing builds from it), and the `question-container` naming fixed
  and re-read. Route names fixed: `/home-next` · `/home-next-fixture` ·
  `/hero-next`. **The spec awaits approval** (sent to the build agent
  the same evening).
- **Spec 019 is drafted** (late evening, from fresh reads of the
  system-section nodes at all three drawn anchors — every geometry
  fact, binding, noise parameter, and per-cell exposure verified
  against rendered bounds through the bridge; 019 §9 is the record).
  The diagram is one proportional construction (petal d = 0.3542 ·
  ring at every anchor; engine fills bound — Brand `orange/400` ·
  Visibility `yellow/400` · Ads `pink/400` · Engagement `purple/300` ·
  Reception `blue/300`; the intersect boolean bound `text/050`; the
  `noise-duo` DUOTONE effect rides the petal group). Motion intent
  received: the owner's **Bloom** brief (growth from the shared
  centre, clockwise, labels resolve, mark last, play once,
  scroll-armed) with four same-day rulings (019 §9 R1–R4): the
  entrance starts at **Brand** (the drawn Ads-top rotation is optical
  balance); reduced motion follows **site law** (settled render); the
  section is **inert** after settle; the grain builds on **SVG
  feTurbulence as a shared primitive** (the 020 visibility engine is
  the known second consumer). **Both 019 flags resolved the same
  evening** (019 §9): the doubled lattice cell at 768 [7,13] deleted
  and re-read (immaterial to the build — the slot was unpainted), and
  the headline canon confirmed ("Five engines that deeply understand
  your business working together."). One **022-scope flag stays with
  design**: the 384/768 case-study headers carry neighbors' copy (the
  system and work sections' pairs); the 1344 header is correct with a
  double-space residual. Dev route fixed: `/system-next`. **The spec
  awaits approval.**
- **018 pre-approval review rulings** (owner, late evening; 018 §9
  R5–R6): **twelve carousel files ship, not sixteen** — the 384
  even-slide exports are byte-identical to the 1344 squares, so even
  slides mount the 1344 square file at every band and the four
  duplicates are not committed; **the strip keeps v1's ambient
  accessibility posture** (`aria-hidden`, empty alt) — the draft's §8
  had cited a live-region contract the built island does not have.
  Both landed as dated §7/§8 amendments. Approval still pending.
- **018 approved (owner, in-chat); the build's fresh-read pass found
  the hero headers changed post-approval** (018 §9 R7): the three
  header blocks moved up, the 384 H1 downsized to
  `display-serif/sm/Thin` 32/38 in a 304 box, and the 1344 H1 wraps
  two lines. Owner ruling: **the file is the latest intent** — §1/§3
  amended from the bridge re-reads; the 384 text's residual double
  space is not built (canon single-space, natural wrap). The build's
  token re-extraction read zero drift, six new unused hue stops, and
  the `display-serif/sm/Thin` style newer than the last extraction —
  all landed in the token layers.
- **The 018 build landed the same night**: `hero-v2.tsx`/`hero-v2.css`
  (the fork-vs-parameterize call: fork the section, reuse the 006
  carousel island and orchestrator byte-identical, share the hx-
  machine grammar in the cascade), the `home-next.tsx` composition
  (nav · hero-v2 · footer), routes `/home-next` ·
  `/home-next-fixture` · `/hero-next` (noindexed), twelve carousel
  exports under `hero-carousel-v2/` with the registry's two-cut
  mapping. Acceptance verified at the three drawn anchors, the two
  derived bands, and mid-band slices; the standing grid sweep green;
  tsc/lint zero. The route-JS measurement rides to 023. Working tree
  left uncommitted per the git rule.
- **019 approved and built the same night** (owner approval in-chat —
  the build instruction; 019 §9 is the build record). The build's
  fresh-read pass re-read every §1–§4 value against rendered bounds
  through the bridge: one post-approval change (the 1344 headline box
  re-read 504; §1 amended on the 018 R7 precedent — the file is the
  latest intent), one read-artifact class recorded (the petal vectors'
  bounding boxes inflate under their rotational-copy transforms; the
  node widths confirm the 0.3542 ratio — §9 B2, so later reads don't
  flag it as drift), and one stale draft parenthetical amended (the
  384 slug gap; §9 B5). Deliverables: `sections/system.tsx` /
  `system.css` (settled server render; the diagram one proportional
  construction on the ring), the `system-bloom.tsx` island (scroll-
  armed, plays once, settles on the last beat; reduced motion, no-JS,
  and at-or-past-trigger loads render the server's settled HTML), the
  **Bloom** grammar tokens in `tokens/motion.css` (re-ruled at build
  QA — the owner's revised timing table, 019 §9 B8: one overlapping
  ≈1.38s clock at every band, engines launching centre→position,
  a standing 1.6s ceiling on the grammar), the shared grain primitive
  `lib/noise.tsx` (feTurbulence duotone with a scaled-group size
  lever — §9 B4; a `/primitives` catalog row; the 020 visibility
  engine is the known second consumer), `IconSystemIntersect` (the
  verbatim bridge export), the noindexed **`/system-next`** route,
  and the `home-next.tsx` splice after the hero. **The 018 R9 rs
  derivation split was adopted** (019 §9 B7 — the candidate default
  hit its predicted evaluation: the pure zoom rendered the slug 18px
  at 576 where both drawn anchors carry 12): geometry keeps the 384
  re-lay; type and wrap boxes ride the 384/768-midpoint walk, meeting
  the compressed 768 at the rt gate within ~1.6px. Acceptance
  verified at the three drawn anchors (byte-exact), the derived
  576/960, and mid-band slices; exposure maps cell-for-cell; real
  multiply accumulation confirmed by pixel sample; the grain accepted
  at the rd2 side-by-side; the standing sweep green against the
  owner's server; tsc/lint zero. The route-JS measurement rides to
  023. Working tree left uncommitted per the git rule. (Note: the
  parallel 018-fix session's 23:05 commit swept this build's
  in-flight component-layer constants into `fix(hero-v2): wrap the
  subhead as one flow` — the 019 tokens are committed there, ahead of
  the 019 build commit.)
- **The hero's derived rs band was evaluated on the built page and
  re-ruled** (owner, at build QA; 018 §9 R9 — the evaluation the
  three-anchor policy reserves): the pure zoom blew the type up
  against the material CTAs mid-band. For the hero, geometry keeps
  the 384 re-lay on the tick; **type and wrap boxes derive the
  undrawn 576 anchor as the linear midpoint of the drawn 384/768
  values** and ride the standard band pairs, meeting the compressed
  768 design at the rt gate within ~2px. Candidate refinement for
  the policy's default when 019+ hit the same evaluation. (The same
  session also re-walked the CTA sizes — md · md · lg · xl, 018
  §9 R8.)

## Decision log — 2026-09-06

- **Spec 020 is drafted** (morning, from fresh reads of the ten
  engine-state frames, the breadcrumb keyframe set, the `engine-detail`
  set, and the three anchors' stacked sections — every geometry fact,
  binding, copy string, and per-cell exposure verified against rendered
  bounds through the bridge; 020 §9 is the record). **The interaction
  model was revised at the planning review** (owner, same morning — the
  ElevenLabs articulation): a normal-flow left column drives a
  top-stuck stage that swaps by **blur + rise**; the only hijack is
  each engine's a→b micro-pin (a 4t snap-stopped runway; the column
  holds still — both drawn rests show the sliver at one line); engine
  handoffs fire on the column's document position with no pin; short
  viewports clip the stage's tail passively; reduced motion keeps the
  structure with instant swaps; no-JS renders the flow at 01a. Section
  document height at rd2 = 52t over the drawn 8t viewport (the runway
  constants ride the expectations). Below the rd1 gate the section is
  the drawn static stack with the **b** visuals (owner ruling; the
  drawn `-01` instances are stale — the set carries `-02` at every
  size, verified). Five planning flags were fixed by design and
  re-read the same morning (the 05 frame names, the 02b copy, the
  sliver copy, the 384 `brand-engine` x, the 01a crop). Copy canon:
  five engines × three drawn paragraphs, order Brand → Visibility →
  Ads → Reception → Engagement (Bloom's start). Assets are
  **placeholder exports from the `engine-detail` nodes** (owner
  direction; the native-visual pass lands later and brings the 019
  grain primitive its second consumer). **F6 resolved the same
  morning** (owner): the section's engine dots are canon — Reception
  `purple/400` · Engagement `blue/400`; the built 019 diagram's
  *labels* were the error. Design swapped the two label texts
  file-side, re-read at all three anchors (with the swap, the
  diagram's clockwise walk from Brand reads the engine narrative
  order); **the built 019 section's re-label is a pending surgical
  fix** (019 §9 R6 — label texts, petal identities, and the sr-only
  sentence; positions, colors, and the beat sequence unchanged). Dev
  route fixed: `/engines-next`. **The spec awaits approval.**
- **020 approved and built the same day** (owner approval in-chat
  after the pre-approval review; 020 §9 R11–R13 are the record). The
  review landed three body edits before approval (R11): the stale §7
  F6 parenthetical removed, the §3 copy structure clarified against a
  fresh node read (each description is one drawn three-paragraph
  `text/xl/Light` node — the tagline plus **two** body paragraphs;
  the serif header is the engine-name node), and the stage loading
  posture added to §7 (all ten drawings mount, the Brand pair eager,
  the island decode-primes neighbors). **The 019 re-label landed
  first as its own surgical fix** (019 §9 R6 record): the two
  identities swapped in the engine table, the petal fills and tag
  position tokens swapped names with every position value
  byte-unchanged, the bloom island's final beat follows, and the
  sr-only sentence now reads the narrative order — verified on the
  rendered page. The build's fresh-read pass (R12) re-read every
  §1–§5 value against rendered bounds: zero token drift (the
  type-styles snapshot gained the already-built
  `display-serif/sm/Thin` entry); three §2 amendments (the two ○
  ornament cells at 1344, the filled ○ on the 384 seam row the draft
  missed) and the `engine-detail` mount amendment (64/64/32 top-left
  pads, flush bottom-right — never centered); the drawn container
  centering, dot sizes (20/16/7), per-side strokes, and the seam-row
  ownership recorded; two file residuals with design (the 05b
  breadcrumb unswapped; the brand/engagement-02 xs width 358.1,
  clipped to 352 at export). Deliverables: twenty placeholder exports
  under `engines-v2/` with the registry block; `sections/engines.tsx`
  / `engines.css` (both constructions CSS-gated at 860 — the
  interactive fluid stage and the static stack); the one island
  `engines-scroll.tsx` (the §6 mapping, plateaus, stop-always snap,
  swaps, and indicator on one rAF clock — mechanism record in R13);
  the runway constants exported from `engines-data.ts` for the 023
  expectations; the `--e2-*` component tokens and the
  `--motion-stage-*` blur + rise grammar; the `home-next.tsx` splice
  after the system section (flush on page row 18) and the noindexed
  **`/engines-next`** route. Acceptance verified at the three drawn
  anchors (768/384 byte-exact), the derived 576/960 (the R9 split and
  the 1344 zoom, both exact), compressed slices at 738/1200 and the
  capped 1920; reduced motion, no-JS, and the scroll-restoration
  compensation verified; the standing sweep green against the owner's
  server; tsc/lint zero; route JS rides to 023. **One new flag with
  design** (launch gate G10): the file's **engagement `engine-detail`
  variants are drawn as empty stubs** at all three sizes — the
  placeholder exports faithfully carry the stub; the drawings arrive
  with the native-visual pass. Working tree left uncommitted per the
  git rule.
- **Three owner rulings at the 020 build review landed the same day**
  (020 §9 R14; the `883:99636` redraw, read fresh through the
  bridge): **(1) the pin line** — the construction pins so the slug
  row's bottom edge sits the drawn 45 below the nav bottom (the
  active row's drawn top rule; the slug label rides up behind the
  opaque nav rail and its bg/100 mask reaches the viewport top, so no
  content peeks beside the nav; the freed 67px goes to the panels;
  R2's top-44 superseded); **(2) no occluding rules** — the redraw
  drops the sliver-row outline, so the pinned assembly paints no rule
  that crosses a moving panel (the sliver look is the boxes' own
  borders; the only pinned rule is the active-top line); **(3) no
  bounce** — a gesture ending inside a runway completes to the rest
  in the gesture's direction, never gliding backward, even under the
  midpoint threshold (the island's direction-aware snap; direction is
  tracked on scroll events, not the rAF clock — scrollend can beat
  the frame). Re-verified: rests pin at the new line with the release
  exact; forward/reverse under-threshold gestures complete without
  bounce; free segments carry no snap; tsc/lint zero.
- **The bounce persisted and was re-ruled the same day** (020 §9 R15):
  the stutter was structural — the column sat in native flow while
  pinned, and compositor-thread scroll paints a frame ahead of the
  island's main-thread counter-transform, so every scroll event moved
  the column and pulled it back. The construction changed to the
  compositor window: the column rides inside a sticky, clipped 7t
  wrapper (locked while a runway runs — no element left that can
  jitter), translated only through the free travels; the body carries
  the 51t budget explicitly and the runway spacer is gone. With it,
  the owner's fluid ruling landed: the a→b transition is a **scroll
  scrubber** (the blur + rise values ride the runway position,
  reversible, resolved at the ends; handoffs keep the timed grammar),
  and the stop-always wheel clamp is dropped — the gesture-end
  directional completion is the only snap. The window also clips the
  sliver exactly as the drawn frames crop it. Verified at 1344: every
  pinned element static to the pixel through a runway, scrub at p 0.5
  mid-plateau, free travel 1:1, parks/release/completions exact,
  no-JS copy reachable; tsc/lint zero.
- **Third build review, same day** (020 §9 R16): the scrubber stalled
  mid-transition under slow scrolls and felt stodgy — superseded; the
  **timed midpoint swap stands everywhere** on the compositor window
  (a started transition fires entirely; the directional completion
  and the dropped clamp stay). Two redraw values landed with it: the
  upcoming panel's dot is the drawn **bg/400 gray** (the redraw's
  `gray-ellipse`), taking its engine hue on the stage clock as the
  panel reaches the active slot (symmetric on reverse; the stacks
  keep colored dots); and the window **does not clip** — the inactive
  card runs to the viewport's edge as the redraw crops it, the slug
  mask hiding the overflow above the pin line. Verified at 1344;
  tsc/lint zero.
- **Fourth build review, same day** (020 §9 R17): the b state fired
  the moment a resolved (any overshoot past a fresh rest read as
  "heading to b"). The swap trigger is raised to **0.65 of the
  runway, hysteretic** (symmetric on reverse; the current state holds
  between the triggers), and the gesture-end completion parks at the
  trigger-resolved state's rest, derived from the live scroll
  position (the scrollend-beats-the-frame race, found again). A
  within-runway settle is invisible — the column is
  compositor-locked. Verified at 1344 in all four cases; tsc/lint
  zero.
- **Fifth build review, same day** (020 §9 R18): the engine handoff
  fired only as the incoming panel arrived (the crossing is the
  arrival), so the crossfade trailed the column. `HANDOFF_LEAD_T` —
  the R7 tunable — set to **2t**: the b→a crossfade starts two ticks
  before the panel settles and lands with it; the dot lights on the
  same beat; symmetric on reverse. Verified at 1344 both ways;
  tsc/lint zero.
- **Sixth build review, same day — the engine section re-ruled to an
  auto-transitioning carousel** (020 §9 R19; the owner's simplification
  brief at the review of the built section). The scroll-jacked a→b
  runways are deleted: once the section pins and an engine settles on
  its rest, a **5000ms timer** drives the a→b swap (the standing
  blur + rise grammar) and the cycle **loops** until the user scrolls;
  scroll moves between engines only — free native travel with a gentle
  gesture-end snap to the nearest rest (big flicks sail; no paging);
  an engine change always resets to `a` with a fresh timer (revisits
  never resume a completed b); reduced motion keeps the timer with
  instant swaps and quantized fill. The **breadcrumb was redrawn as
  the timer's visualization** (`877:98990`, six keyframes read fresh
  at rendered bounds): two 24 × 6 `bg/500` tracks (gap 8), one per
  illustration, the `text/300` fill growing 6 → 24 over the clock —
  a scrubber without drag or click. Construction consequence: with no
  plateaus the scroll mapping is 1:1 everywhere, so the R15 compositor
  window, the column transform, the swap triggers (R17), the handoff
  lead (R18), and the ready construction are all deleted — the column
  is plain native flow, the JS and no-JS documents identical, and the
  rd2 budget drops **52t → 32t** (the expectations constants follow).
  One file residual with design: the state frames' sliver panels still
  carry the old 39 × 7 breadcrumb instance (active panels carry the
  new set). Verified at the capped 1920 (the 1344 zoom): geometry,
  the timer walkthrough with the loop, the snap both ways, the
  midpoint handoff, the revisit reset, the pixel-exact release, and
  reduced motion — the record in 020 §9 R19; tsc/lint zero; the
  standing sweep against the owner's server. Working tree left
  uncommitted per the git rule.
- **Seventh build review, same day — the engine snap re-ruled to
  paged** (020 §9 R20; the owner's paging brief, superseding R19's
  nearest-rest glide). One gesture moves exactly one engine: every
  scroll burst has an origin rest and clamps at the adjacent rest
  until it ends (the R13 stop-always semantics, re-ruled back for the
  carousel); the burst's end commits one engine in the gesture's
  direction past a 0.25t threshold (no bounce) or settles back under
  it. Entry is pronounced — a scroll-through catches at the boundary
  rest and a gesture ending within 1.5t outside pulls in; both ends
  exit free, so the section never traps the scroll; teleports
  re-origin without clamping. The timer, loop, reset, indicator, and
  reduced-motion posture stand; the stage still crossfades once per
  gesture at the midpoint crossing. Known caveat accepted: a
  scrollbar drag is one burst — one engine per drag. Verified at the
  capped 1920 with input-synthesized gestures (catch, one-engine
  paging both ways, commit/settle-back, free exits, pull-ins,
  teleports); tsc clean. One QA note recorded: instant `scrollBy`
  loops fire per-step `scrollend`s and cannot exercise paging — test
  with real gestures. Working tree left uncommitted per the git rule.
- **Eighth build review, same day — the engine stacks re-ruled to
  carousels** (020 §9 R21; the owner's brief, the redrawn anchor
  frames and the `engine-visual` set read fresh at rendered bounds).
  The static stacks are no longer static: every panel's visual is a
  two-state carousel resting on the **`a` drawing** (R1's b-mount
  superseded — the frames mount `-01` with the `slide1-finish`
  breadcrumb). At **rt** the illustration auto-progresses on the same
  5000ms clock (a↔b loop, the one blur + rise grammar; counts only
  in view) with the indicator drawn **vertical** (the component
  rotated −90°: 6 × 56, fill growing downward). At **base/rs** the
  user **swipes** between the states — a pointer drag with a
  horizontal intent lock follows 1:1, commits past 0.15 of the
  stride or a 0.3 px/ms flick, and the horizontal indicator's b fill
  rides the drag. The same one island drives all three modes off the
  container width. Fresh-read corrections: the indicator fill law is
  the drawn **max(6, 24·f)** (the linear first read corrected); the
  24/6/8/6 geometry is material at both drawn anchors; the mirrored
  29/32 offsets flagged with design (rotation-pivot artifact class),
  built as drawn. Ten `-01` md/xs placeholder cuts exported through
  the bridge (thirty files total); **G10 rises** — the engagement
  stub now rests visible below the rd gate. Verified under 768/384
  emulation (timer, swap beat, drag/commit/return/nudge, drawn
  geometry exact); tsc/lint clean; the standing sweep green. Working
  tree left uncommitted per the git rule.
- **Ninth build review, same day — two swipe refinements** (020 §9
  R22; the owner's rest-state mock). The base/rs **b track rests
  empty** (the full first pill beside a bare second track; R21's
  persistent minimum dot superseded — the floored fill law is timer
  vocabulary only, and the swipe fill rides 24·f from nothing,
  draining back to nothing). And the swipe transition is a **blur +
  slight lateral wipe** on the stage grammar — kin to the larger
  bands' blur + rise, never a full-width slide: the two drawings
  stack at every band, the axis is the band's (vertical rise at rt,
  lateral below the gate), the direction follows the gesture, the
  island scrubs the values inline mid-drag, and the release settles
  drawings and fill together on the stage clock. Reduced motion
  keeps the fill on the finger with state-to-state drawings.
  Verified under 384 emulation (rest exact to the mock; the scrub
  values exact mid-drag both directions; commit and drain exact);
  tsc/lint clean; the standing sweep green. Working tree left
  uncommitted per the git rule.
- **Tenth build review, same evening — the engines→work seam pass**
  (020 §9 R23 · 021 §9 B9; the `911:103458` scroll-state redraw read
  fresh at rendered bounds). Two defects: the **seam hairline was
  missing** — drawn as the work section's frame-wide 1px `border/000`
  top rule (INSIDE stroke; line-inclusive border-box at the rd gate,
  the 7t flow height held, content the drawn 1px lower), a plain flow
  rule that resolves flush under the engines' sliver row at the
  carousel's apex; and the **slug rule held 7t past the apex** (its
  sticky containment was the whole section — the orphaned frozen rule)
  — re-scoped via the pinhost pattern to an absolute host ending
  exactly 7t above the section's bottom, so the resolved frame
  releases as ONE unit at the Engagement rest and re-pins
  symmetrically on reverse. Two hairline doublings caught at the
  owner's follow-up review and corrected the same evening: the host's
  first-cut 7t + 1px released the slug a pixel early (stacked borders
  from the apex on — now the slug and Engagement borders share one
  document pixel and depart merged), and the work rule stacked under
  the engine lattice's bottom line (the −1px line-inclusive collapse
  shares the pixel and returns the page to the tick).   A third, from
  the owner's Safari report (the Engagement rest resolving 1px too
  low): Safari renders the pinned sticky a pixel off the computed
  pin-line calc the island derived its rests from — the rests now
  anchor to the stage's RENDERED position while pinned (the
  browser's resolved pixel is the truth), the snap's ±1px dead zone
  is gone (gesture end always corrects to the exact rest, covering
  Safari's fractional momentum ends), and the island re-measures at
  every gesture end against stale layout.   Verified on the
  composition at the capped 1920 by document pixel (no Chromium
  regression) — but **the owner's Safari re-check still read the
  panels 1px low and parked the chase: an OPEN FLAG** (020 §9 R23;
  the hardenings stand, Chromium exact, the Safari mechanism not yet
  isolated); tsc clean; the standing sweep green. Working tree left
  uncommitted per the git rule.
- **Spec 021 is drafted** (morning, from fresh reads of the work-section
  nodes at all three drawn anchors and the `website-stack` set — every
  geometry fact, binding, and per-cell exposure verified against
  rendered bounds through the bridge; 021 §9 is the record). The
  section: a header (slug canon **"Work that creates demand"** — the
  draft's split copy fixed by design and re-read at all three anchors)
  and a six-card **website deck** — colored chrome swatches on the
  `web-swatch` effect style (NOISE + hairline shadow — **the 019 grain
  primitive's second consumer**, owner direction), material px
  constants at every band, bare paper behind it at rd2 (a first), east
  rails at rt/base. Motion: the owner's deck brief verbatim — click
  anywhere = next, one 300ms ease-out clock for all six cards, no
  stagger, the front card straight to the back slot, nothing else
  animates, rapid clicks riffle (retarget, never queue); reduced motion
  instant; no-JS static. **The roster received** (front → back): Your
  Health Solutions · Lune Bodywork · X20 Studio · DreFadez · Ora
  Medical Clinic · Miriam Merim — matching the drawn deck; **the 18
  asset cuts landed and verified** (three tiers × six sites, 2×; the
  export numbering is reversed against the cascade order — recorded,
  the registry maps it, no re-cut). Dev route fixed: `/work-next`.
  **The spec awaits approval.**
- **021 pre-approval review rulings** (owner, afternoon, at the build
  agent's preparation review; 021 §9 R3–R6, landed as dated body
  amendments). **R3** — the deck scales as **one proportional unit**:
  it floats in its box, only the box rides the ticks, and the §4 px
  are the drawn-anchor values riding the band-constant construction
  (the draft's "material, fixed px" wording superseded — a fixed deck
  overflowed every below-anchor width, worst at rd1's 480-wide panel
  against 548). **R4** — the 768 asset tier re-gated to serve
  **470–860** (the rs density fix; the ≈4% cover-crop from the tiers'
  proportion mismatch accepted; no re-export, all 18 files unchanged).
  **R5** — Ora reads name-only in the sr-only roster (the category is
  in the name). **R6** — the section's files take the `work-deck-*`
  prefix (`work-deck.tsx` · `work-deck.css` · `work-deck-island.tsx` ·
  `work-deck-data.ts`), keeping clear of the Our Work page's `work-*`
  family. The preparation pass also verified the 18 cuts on disk at
  the §7 dimensions, the ten chrome color stops in the token layer,
  and the `web-swatch` effect style in the file (NOISE duotone 0.5 /
  0.6 density, black 10% / white 15%, shadow 0/1/2 `#6C6860` 5%) —
  the style is new since the last extraction and lands with the
  pre-build re-extraction. **Approval still pending.**
- **021 approved and built the same day** (owner approval in-chat after
  the review rulings; 021 §9 B1–B6 the build record). The build's
  fresh-read pass re-read every §1–§4 value against rendered bounds:
  zero token drift; the `web-swatch` shadow extracted to
  `--shadow-web-swatch` (its NOISE leg — 0.5 / 0.6 / 10% / 15% — rides
  the NoiseDuo instance per the 019 B9 pattern); the CTAs read gray
  pill lg·md·md; one **new read-artifact class recorded** (B2): the
  swatch's stored per-corner radii read inverted against the render —
  the rendered truth (chrome 14.25 top, image 12 bottom) governs.
  Deliverables: the 18 cuts under `public/media/work-cascade/` with
  the media-registry tier set re-gated per R4; `work-deck.tsx` /
  `work-deck.css` (header, band chrome, exposure rails, the settled
  deck) with **one island** `work-deck-island.tsx` (the §6 click
  machine — CSS transitions on width/top/radius, one 300ms clock,
  native retargeting; the advance a functional update after batched
  clicks collapsed at QA, B5) and `work-deck-data.ts` (roster + the
  reversed file map); the deck unit `--wd-u-*` and header walk tokens
  in `component.css`; the deck grammar `--motion-deck-dur/-ease` in
  `motion.css` (the ease aliases the drawer ease-out); the
  `home-next.tsx` splice after the engine section; the noindexed
  **`/work-next`** route. Acceptance verified at the three drawn
  anchors (byte-exact), the derived 576/960 (the R3 proportional unit:
  ×1.5 and ×80/112 exact — the rd1 deck 391.42 fits its 480
  half-panel), compressed slices 738/1200 and the capped 1920; the
  R4 re-gate serves the 768 cut at rs; reduced motion, no-JS, the
  riffle, and the six-click cycle verified; tsc/lint zero; the
  standing sweep green against the owner's server; route JS rides to
  023. Working tree left uncommitted per the git rule.
- **The website-browser rebuild landed post-build, same day** (owner;
  the new set `813:89840`, one `size` axis; 021 §9 B7, §4/§7 amended
  from fresh bridge reads). The card is bar + image with nothing
  behind them — the chrome (fill, top/left/right stroke, the
  web-swatch grain + shadow) rides the **bar**, square-cornered; the
  image box keeps border/000 left/bottom/right with the bottom radius
  re-drawn 12/12/**8**. The build followed the same day and
  re-verified at 1344; tsc/lint zero. **Two file residuals with
  design** (B7): the **xl variant's total height reads 336** (image
  312 — an aspect no export matches; md/xs kept their totals) and the
  drawn 1344 stack is a broken mid-edit state (the front instance at
  y −79, stale back-instance boxes) — the build keeps the approved
  548×360 card / 548×404 stack until design re-heights the variant or
  rules the trim; and the bar instance stacks a scale-artifact second
  shadow atop the style's — the build paints the one token shadow.
- **The B7 residuals fixed file-side and the deck review rulings
  landed, same day** (owner; 021 §9 B8; re-read through the bridge —
  the xl variant is 548×360 again, the 1344 stack repaired, one
  shadow). Rulings from the built-deck review: the screenshot clips
  to the image box's rounded corner (the unclipped img painted square
  over the curve — hidden corner on dark shots, cut stroke on light
  ones); the bottom radii are **material** — 12 at 1344/768 · 8 at
  384, fixed px at every slot and mid-band width (the slot-scaled
  radius superseded); the 1px borders hold at 1px through all
  scaling; X20's and DreFadez's **site-image borders** re-inked
  **text/100** and **border/200** (the ruling as corrected
  in-session — the build's first pass wrongly re-inked the bar
  lines, which stay derivative of their fills; §4 amended). The
  Miriam re-exports (three tiers) replaced verbatim under
  `public/media/work-cascade/`. Re-verified on the built page;
  tsc/lint zero.
- **Spec 022 is drafted** (afternoon, from fresh reads of the
  case-study sections at all three drawn anchors and the
  `casestudy-preview-card` set — every geometry fact, binding, style,
  and per-cell exposure verified against rendered bounds through the
  bridge; 022 §9 is the record). The section reuses **the 012
  persona-carousel machine minus the slider**: three preview cards
  (strip order Zivel → YHS → Bare Lúx, identities confirmed from the
  drawn stats), one k resting on Zivel, whole-card links to
  `/case-studies/{slug}` (YHS/Bare Lúx 404 until Phase B), the
  promoted 450ms snap, and the ghost grammar on the site-canon 0.5
  (the drawn 0.6 superseded — owner ruling). **All six draft flags
  resolved the same afternoon** (022 §9, every fix re-read): the
  long-standing **1344 +1px fixed** (a mis-painted carousel top
  border; the section re-read 896/448), the headline rag re-built as
  single-space canon in right-padded boxes, the 384 slug pair located
  (a draft misread), descriptions ship as the Zivel string **for now**
  (owner: updated per-study copy lands as a data-only content pass —
  a G-class gate), the image filters confirmed baked in the exports,
  and the active shadow reads the bound `hard-shadow-square-md`. Six
  of the nine asset files commit (the 768 tier is byte-duplicate of
  the 1344 tier — the 018 R5 dedup; gate at 665). Dev route fixed:
  `/case-carousel-next`. **The spec awaits approval.** With it, every
  Phase 10 section spec (018–022) is written; 023 (assembly + cutover)
  remains.
- **022 pre-approval review rulings** (owner, afternoon, at the build
  agent's preparation review; 022 §9 R3–R7, landed as dated body
  amendments). **R3** — the §4 drawn stats are **the cross-surface
  per-study canon**: they land in the shared `work-cases-data.ts` and
  the Our Work cards follow (Zivel `22 Consults booked` → `1 New sales
  hire`; YHS's rating stat → `$25k Monthly revenue`, `Per lead` →
  `Cost per lead`; Bare Lúx `109` → `100+`); 014 §5 is superseded on
  those values (recorded in 022 §9, 014 unedited); the carousel data
  module imports the studies — the plan's preferred single-source
  direction holds. **R4** — the Bare Lúx rating stat carries a drawn
  star **at xl only** (owner pointer; instance slot content the
  draft's set-read missed — verified through the bridge: 17×16,
  `text/600`, gap 4; the 768/384 sections carry none). **R5** — the
  768 asset tier's ≈11% cover trim accepted (the tier files are the
  1344 cut, checksum-verified; the 021 R4 precedent) — six files
  commit. **R6** — keyboard semantics: arrows move k with focus
  inside the strip; an inactive card's link selects, the active
  card's navigates. **R7** — the 2026-09-05 log's "the 1344 +1px
  persists — blocks 022" is resolved (022 §9 F1, owner reconfirmed).
  The preparation pass also verified the nine exports on disk at the
  §7 dimensions, the dedup checksums, the promoted snap/ghost tokens,
  the bound `--shadow-hard-square-md` (3/3/0, 15%), and every §3/§4
  type style in the token layer. **Approval still pending.**
- **022 approved and built the same day** (owner approval in-chat after
  the R3–R7 rulings; 022 §9 B1–B9 the build record). The build's
  fresh-read pass re-read every §1–§4 value against rendered bounds:
  zero token drift; the F1 fix holds (the 2026-09-05 log's "+1px
  persists — blocks 022" is resolved, §9 R7); the drawn frame ruled
  the pre-footer full-lattice row into the section (exactly 1t to the
  footer top — the section builds 23t · 12t · 9t). Five fresh-read
  findings landed as dated body amendments: the **md/xs cards carry
  the first two stats only** (systematic, all nine drawn cards — §9
  B4); the **inactive dressing is the full 012 translucent-ghost
  grammar** (the 012 cost-wash constant verbatim, inks to text/600,
  dividers border/050 — the draft's "info panel unchanged" superseded;
  the wash and inks cross on the snap clock, §9 B3); the **headline
  wrap boxes are the header frames' interiors** (288 · 439 · 560, §9
  B5); the **asset numbering is reversed against the strip order**
  (01 Bare Lúx · 03 Zivel, verified from the drawn fills at both
  tiers — the 021 export class, the data module maps it, §9 B2); and
  the **384 slug is text-only as drawn**. The star mounts the standing
  IconStar stretched to the drawn 17×16 (the 15×14 glyph under a ~1%
  non-uniform scale — no new cut, §9 B6). Two file residuals with
  design (§9 B1): the 384 YHS card's stale Zivel stat overrides and
  the 384 cards' Light stat labels (the build renders the canon). One
  content-pass watch (§9 B7): the canon 3-word labels wrap three lines
  in the min-content boxes where the drawn residual double-space reads
  two. One record (§9 B8): the §5 "YHS/Bare Lúx 404" premise was
  overtaken by the 2026-09-04 draft Phase B passes — the routes
  resolve; the carousel links are canonical either way. Deliverables:
  six §7 cuts under `public/media/case-carousel/` + the registry
  block; the R3 cross-surface stats in `work-cases-data.ts` (the Our
  Work cards follow, data-driven, no code change);
  `case-carousel-data.ts` · `case-carousel.tsx` · `case-carousel.css`
  · the one island `case-carousel-island.tsx` (the 012 machine minus
  the slider + the R6 select/arrow semantics); the `--cc-*` tokens;
  the `home-next.tsx` splice after the work deck — **the Phase 10
  content stack is complete**; the noindexed `/case-carousel-next`
  route. Acceptance verified against the owner's server: the three
  drawn anchors byte-exact, the derived 576/960 (the R9 split and the
  1344 zoom), compressed 738/1200, the capped 1920; the machine, the
  clamp, reduced motion, no-JS; tsc/lint zero; the standing sweep
  green. Route JS rides to 023 — only 023 (assembly + cutover)
  remains. Working tree left uncommitted per the git rule.
- **Four owner rulings at the 022 built review landed the same day**
  (022 §9 B10; dated §4/§5 amendments): **the strip loops** (arrows
  wrap modulo; the swipe gains a half-stride overhang past each end
  whose release commits the wrap — with a rounding fix, since
  `Math.round(−0.5)` rounds toward zero and the backward wrap could
  never fire); **the clipped shadow fixed** (the viewport clip sat
  flush on the card bottom — 4px of interior bottom pad restores the
  border + shadow room over the transparent pre-footer row);
  **a 1px border/000 on every card size and state**, line-inclusive
  against the full-lattice field (paint overlay, the 011 R17 law —
  no doubled hairlines); and **the active card's image zooms on
  hover** (the Our Work card's `--csc-img-zoom` grammar verbatim —
  the paint-in-place 1.02 cover grow on the shadow clocks; ghosts
  don't zoom, their hover is the select affordance; focus-visible
  parity). Verified at 1344 on the rendered page; tsc/lint zero.
  Working tree left uncommitted per the git rule. **The loop ruling
  clarified twice and built circular the same evening** (022 §9
  B10–B12): the review's report was that no loop had ever existed —
  the ask was always the circular strip. After a modulo snap-back
  (B10) and a mistaken no-loop reversion (B11), the island now runs
  one virtual K ∈ ℤ with per-slot revolution shifts keeping the
  window [K, K+2] alive: the first card slots in to the right of the
  last (and the last to the left of the first), every advance one
  stride, teleports scheduled off-canvas only, swipe clamped to ±1
  stride, inactive selects walking the shortest way. Verified at
  1344 through a full cycle forward and backward past the start;
  tsc/lint zero. B10's other three rulings (shadow room, the
  line-inclusive border, the hover zoom) stand.
- **Two late-evening 022 items** (owner, at the built review; 022 §9
  B13). **(1) The section top rule**: reported missing; the bridge
  located it as the 1344 case-study section FRAME's own visible 1px
  `border/000` top stroke — full section width, absent at 768/384
  (the draft read Grid cells and child frames, never the section
  frame's stroke; the work section's twin stroke was already built by
  the 020 R23 seam pass, 021 §9 B9 — no change there). Built as a
  line-inclusive paint overlay from the rd1 gate. The diagnosis also
  recorded the exposure encoding for later specs: the Figma Grid
  layer draws the full reference lattice everywhere and **exposure is
  the cells' stroke visibility**, not their presence. **(2) The F2
  content pass landed** (owner copy): YHS and Bare Lúx carousel
  descriptions replaced the Zivel placeholder — data-only, as the F2
  ruling designed; the G-class carousel-copy gate closes. Verified on
  the rendered page at 1344/768/384; tsc/lint zero. Working tree left
  uncommitted per the git rule.
- **The engine section's scroll contract re-ruled: free +
  distance-mapped** (owner, evening; 020 §9 R24, superseding R20's
  paged snap; §6/§7/§8/§10 amended in place). Prompted by the owner's
  ElevenLabs Studio audit (the free-scrolling left panel against the
  sticky fading stage): two sandbox routes tested the contract in
  isolation first — the dwell-timer variant exposed the structural
  miss (free scroll removes the dwell the R19 carousel trades for; a
  pass-through never showed the `b` drawings), the distance-mapped
  variant fixed it (ten scroll stops, one per drawing — every `a`
  and `b` on the scroll path; hysteresis 0.6 half-strides; the R19
  timer re-cast as an idle cycle). The owner promoted the
  distance-mapped contract to the canonical island
  (`engines-scroll.tsx`): **no scroll writes** — the paged clamp,
  snap glide, and all input listeners deleted; the R23 rendered-pin
  anchoring carried forward per-frame (stale-geometry-proof with no
  gesture ends); the R23 Safari 1px OPEN FLAG mooted (no rests, no
  rest-vs-frame contract). The stacks, indicator, dots, reduced
  motion, and the no-JS document are unchanged; `/home-next` carries
  the new contract through the standing splice. Routes: `/engines-next`
  and `/engines-free` retired (owner instruction), **`/engines-free-2`**
  kept as the section's QA surface, mounting the canonical section.
  Verified against the owner's server at 1344 (the ordered ten-state
  walk, the no-write-back jump, boundary hysteresis, the idle flip);
  tsc/lint zero. **The tuning pass is pending** (the R24 QA-tunable
  constants). The two sandbox commits precede this change in the
  branch history; the promotion itself left uncommitted per the git
  rule *(committed the same evening on the owner's instruction)*.
- **The R24 contract dialed in, same evening** (owner tuning rulings
  on the lap vocabulary; 020 §9 R25, §6/§7 amended in place).
  Hysteresis 0.5 — the swaps fire at each lap's exact quarter points
  (a→b at 25%, the handoff at 75%, symmetric); **the auto
  progression removed at rd** — no clock, scroll is the whole
  interaction, the indicator reads the drawn slide-start keyframes
  discretely (the rt stack timer and base/rs swipe out of scope —
  the 384/768 pass is deferred by owner instruction); the 05a→05b
  boundary biased to 0.3 half-strides past the Engagement rest
  (≈101px at 1344, riding the tick — the last `b` lands before the
  release progresses; the boundary moves for both directions, never
  inverts). Verified against the owner's server at 1344 (the
  25/75 triggers by pixel, the parked no-flip, the 101px Engagement
  trigger, the ordered walk); tsc/lint zero. Working tree left
  uncommitted per the git rule.
- **Homepage load clock preview** (review-animations on the 006
  choreography; pending keep/revert). Overrides on `.page.v2-choreo`
  only: rise 8px / 300ms, nav 250ms, sweep 350ms hero-scoped, chip
  stagger 60ms, wipe ease-out, last beat ~1470ms. Our Work / case
  studies keep the `:root` 26px / 800ms grammar. 006 §6/§9 and 018
  §6/§9 R12 amended. Visualize on `/hero-next` (Replay) or
  `/home-next`.
- **The preview revised to the 019 Bloom character, same evening**
  (owner request: the entrance — at least the highlight pass — should
  feel like the system-diagram bloom in pacing and character). The
  homepage rises take the Bloom two-clock construction (a 400ms fade
  inside a 750ms travel — the H1 rides the ring pair, 700 in 900),
  14px travel, beats and chip pass at the bloom stagger (120ms), the
  wipe/nav on the engine ease, the sweep on the ring ease; the pass
  start rides the band (750ms at rt+ / 950ms below — the rm/rs
  cascade runs deeper). Last wipe ~1770/~1970ms — above the 019 1.6s
  ceiling; the owner judges by eye (dials: pass start, stagger). The
  bloom tokens are referenced directly, no promotion — the tokens
  promote to shared entrance names only if the preview is kept (the
  hero would be the bloom grammar's second consumer). Verified on
  `/hero-next` against the owner's server: cascade end times match
  the 006 §6 table (follow-ups wipe 1779ms), reduced motion settled,
  `v2-settled` lands, the below-gate 950ms pass resolves.
- **Preview tuning + a found erratum, same evening** (owner, in-chat).
  Tuning: travel 14 → 12px; the image group opens exactly on the CTA
  beat (390, frames staggered 120 inside the group). Erratum (018 §9
  R13): the v2 hero's frame sizes expose the third frame's leading
  edge at the right bleed, but the 006 entrance covered frames 1–2 —
  frame 3 now rides the entrance on the next image beat
  (`--hx-d-img3`/`-m`, base 900/470 on the 006 cadence so the fix
  survives a preview revert), is priority-loaded, and every
  choreography list widened to `-n + 3`. Verified on `/hero-next`:
  frame 1 fires with the CTA, frame 3 animates eager, frame 4 stays
  offscreen unanimated, reduced motion settled, the run settles
  (1796ms).

## Decision log — 2026-09-08

- **The 022 384 slug marker restored** (owner report at the built
  review; 022 §9 B14). The drawn 384 header carries the standing
  marker pair — the 6×6 `bg/400` square centered in its own 1t cell
  left of the text stack (the work-section construction verbatim);
  the build's fresh read had walked the slug row and missed the
  sibling cell, recording a wrong "text-only" §3 note (022 §9 B5, now
  corrected — F5's "full pair" read was right). Read lesson recorded
  for later specs: the 384 slug marker lives beside the text stack,
  not inside the slug row. Verified at rendered bounds through the
  bridge and on the page at 384/1344; tsc/lint zero. Working tree
  left uncommitted per the git rule.
- **The doubled seam hairline fixed below the rd1 gate** (owner report
  at the 022 built review — a double line on the east rail beside the
  work-section header on the phone; 021 §9 B10). Pixel measurement
  isolated it: the engines→work seam read 2px while every other rail
  edge read 1px — the engines section ends k·t + 1px (its
  line-inclusive bottom border on the row line's pixel) and only the
  rd1+ block pulled the work section up 1px to share it (021 §9 B9);
  base/rt stacked two adjacent lines. The `margin-top: −1px` collapse
  moved to the work section's base rule (every band). The same
  measurement pass confirmed the two eyebrows (work · case-study)
  render pixel-identical after the B14 marker restore — the perceived
  spacing difference was the doubled seam. Verified at 440 by pixel:
  all rail edges and both section seams read exactly 1px on their
  ticks; the standing sweep green; tsc/lint zero. Working tree left
  uncommitted per the git rule.
- **The 022 drawn pre-section clearance restored at base** (owner
  report at the built review — the slug rode the work band's rule;
  022 §9 B15). The drawn 384 page keeps rows 189–190 bare between
  the work and case-study sections (2t, bridge-verified); 768/1344
  are drawn flush; the home-next splice had stacked all bands flush.
  The section now owns the clearance as a 2t leading band at base
  (25t total; header 2t, carousel 8t, exposure gy +2 — the
  pre-footer-row precedent; §1 bookkeeping had the gap all along:
  work ends r188, the section starts r191). Verified at the 384
  anchor and at 768/1344 (unchanged); tsc/lint zero. Working tree
  left uncommitted per the git rule.
