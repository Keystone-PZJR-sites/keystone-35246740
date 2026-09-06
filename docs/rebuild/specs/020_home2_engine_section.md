# Spec 020 — Homepage v2: the engine section (scroll-driven stage)

**Status:** Approved 2026-09-06 (owner, in-chat, after the R11
approval-review edits) — all §9 flags resolved the same morning
(F6: the dots are canon; the 019 diagram's labels were the error, fixed
file-side and re-read). **Built the same day** — §9 R12 (fresh-read
pass) and R13 (build record) carry the record; acceptance verified,
one open flag with design (the engagement stub drawings, launch gate
G10)
**Depends on:** spec 018 (the `home-next` composition) · spec 019 (splices
after the system section; the engine color canon and the shared grain
primitive — this section's future native visuals are its known second
consumer) · spec 002.r1/.r2 (bands, gates, the wide cap) · spec 001
(tokens). Supersedes the v1 engine accordion's slot (spec 008 stays the
frozen record).
**Sources:** fresh MCP reads 2026-09-06 — the **engine-steps** section
(`877:98954`): ten full-page state frames at 1344
(`799:54533` 01a · `799:55081` 01b · `799:70246` 02a · `799:71046` 02b ·
`799:72588` 03a · `799:73388` 03b · `799:74969` 04a · `799:75769` 04b ·
`799:77701` 05a · `799:78501` 05b); the **breadcrumb** keyframe set
(`877:98990`, four variants); the `engine-detail` component set
(`771:18256`, 30 variants — five engines × 01/02 × xs/md/xl); the anchor
frames' stacked engine sections (384 `866:98781` + `859:98757–98760` ·
768 `859:98750–98754` · the 1344 rest section `799:60928`); the Grid rows
behind all of it. **Every geometry fact, binding, copy string, and
per-cell exposure was read through the console bridge against rendered
bounds this session**; the five draft-review flags (frame names, the 02b
copy, the sliver copy, the 384 `brand-engine` x, the 01a crop) were fixed
by design and re-read the same morning. Interaction intent: the owner's
2026-09-06 brief (ten states, one gesture per state, the sliver
affordance, the verify list) **revised the same morning to the fluid
paradigm** (the ElevenLabs articulation): a normal-flow left column
drives a top-stuck stage; the only hijack is each engine's a→b
micro-pin. Rulings on record (§9 R1–R7): static **b** visuals below the
rd1 gate · pin top **44** · **blur + rise with a gentle settle**, one
treatment for every swap · short viewports clip passively · reduced
motion keeps the structure with instant swaps · no-JS renders the flow
with the stage holding 01a · the runway/threshold positions blessed for
build-QA tuning.

The most complex section on the page. Five marketing engines, each with
two visualization states — ten states, `01a → 05b`. The left column is
the narrative; the right stage is the proof; scroll is the only control.

---

## 1 · Section anatomy — tick totals per band

**rd2 1344 (t=112) — the interactive construction.** The drawn viewport
(every state frame): slug row 1t · active row 6t (left box 672 + stage
672) · sliver row 1t = **8t visible**. *(Pin geometry amended
2026-09-06 — owner ruling at build review, the `883:99636` redraw,
§9 R14, superseding R2's top 44: the construction pins so the **slug
row's bottom edge sits 45 below the nav bottom** — the pin line, the
active row's drawn top rule. The 1t slug row rides up behind the
opaque nav rail, its label hidden at rest and only its bottom strip
showing; the redraw gives the panels the freed vertical space and the
masking row reaches the viewport top, so no content peeks beside the
nav. The 45 rides the zoom below the rd2 anchor.)* The
**document height grows over the drawn 8t by the scroll budget**: four
free inter-engine travels of 6t (the column rises one panel-height each)
plus five a→b runways of 4t (§6) —

> section document height at rd2 = 8t + 4·6t + 5·4t = **52t**

carried as the expectations module's runway constants (the 017
`extraTicks` pattern; every term whole-tick). The stage viewport is
672 × 672 at x 672, sticky on the pin line *(amended 2026-09-06 —
§9 R14; was 44 + 1t)*; the slug row is sticky above it
for the section's duration; the left column is the five 672-tall panels,
contiguous (the sliver line = active top + 6t, drawn identical in every
state frame).

**rd1 960 (t=80, derived)** — the 1344 construction at t=80 (the
three-anchor policy; geometry rides the tick, the §6 mapping is
tick-denominated so the runway scales).

**rt 768 (t=64) — static stack.** Full-lattice seam row r25 · slug row
r26 (1t) · five panels rows 27–121, each **19t** (box 768 × 448 = 7t,
visual 768 × 768 = 12t below it, `engine-detail` 708 × 708 at (64, 64)
in the clipping visual — 4px clipped bottom-right; *amended 2026-09-06,
build fresh-read, §9 R12 — the draft's "centered" was the error*) ·
no tail gap (work-section starts r122).

**rs 576 (derived)** — geometry keeps the 384 re-lay on the tick; type
rides the 384/768 midpoint walk (the 018 R9 / 019 B7 derivation split,
now the working default).

**base 384 (t=32) — static stack.** Full-lattice seam row r41 · **no
slug row** (drawn intent — §9 R8) · five panels rows 42–166, each
**25t** (box 352 × 352 = 11t with a 1t east margin, visual 384 × 448
full-bleed = 14t, detail 352 × 352) · a 2t tail gap rows 167–168 before
the work-section (r169).

## 2 · Exposure map

Per-cell stroke visibility read through the bridge; 1px `border/000`
throughout. Zero-based page `col,row`:

- **1344**: seam row r18 full lattice · **slug row r19 bare** · rows
  20–24 cols 7–11 (the field behind the stage) · rows 25–26 cols 6–11
  (the field widens one column at the bottom two rows). *(Amended
  2026-09-06, build fresh-read — §9 R12: two ○ ornament cells ride the
  field, `[8,20]` and `[11,25]` — full-round stroked circles,
  `border/000`, no fill, identical in all ten state frames; the
  draft's "no ornament cells" line missed them.)* The painted
  cells sit behind the sticky stage assembly and **ride it** — the
  pinned viewport's lattice is static through all ten states (the state
  frames' Grid never moves); the left half is bare, so the scrolling
  column crosses no drawn cells.
- **768**: seam row r25 full lattice · rows 26–121 east rail cols 10–11
  (through the slug row and the whole stack).
- **384**: seam row r41 full lattice · rows 42–168 east rail col 11
  (through the stack and the 2t tail gap). *(Amended 2026-09-06, build
  fresh-read — §9 R12: the seam row's east cell `[11,41]` is a filled
  ○ ornament — full-round, `border/000` stroke, `bg/200` fill — the
  019 ■[11,24] vocabulary in its round form.)*

No controls on the lattice; the ornament cells are the three amended
above (2026-09-06 — the draft's "no ornament cells" line was the
error; the cells are drawn identically in every state frame).

## 3 · The left column — copy canon and the panel

**Slug** (rd2/rt only): `Designed to drive growth` — the standing
marketing-slug construction (dot marker + `text/400` label), drawn 18
tall at rd2, 16 at rt.

**The panel** (one per engine; rd2 values — the drawn `engine-box /
size=lg`): 672 × 672; `engine-container` at (64, 72), 480 × 528; the
20px `engine-color` dot leading the header row *(amended 2026-09-06 —
§9 R16, the `883:99636` redraw's `gray-ellipse`: an upcoming panel's
dot is drawn `bg/400`; it takes its engine hue on the stage clock as
the panel scrolls up into the active slot, symmetric on reverse; the
static stacks keep their drawn colored dots)*; header
`display-serif/md+/Extralight`, ink `text/100`; description
`text/xl/Light` in a 432 column — the description is **one drawn
three-paragraph text node per engine**, uniformly `text/xl/Light`
(ps 12): the tagline sentence first, then two body paragraphs (the
`\n` breaks are canon; the tagline trailing spaces in the
Brand/Visibility nodes are read artifacts, not built). The serif
header is the engine name node beside the dot, not a description
paragraph. The a/b indicator at the container's bottom edge
(y 521, 39 × 7 — §6.2).

**Engine order and copy (one canon, all read post-fix):**

1. **Brand** (dot `color/orange/400`) — *Look like the obvious choice.*
   ¶ A custom website and one identity everywhere: logo, colors, fonts,
   photography, voice. ¶ Listings accurate everywhere customers check,
   reviews monitored, answered, and steadily earned, and social
   profiles that match and stay active.
2. **Visibility** (dot `color/yellow/400`) — *Show up where customers
   search.* ¶ Your website, maps profiles, listings, reviews, and
   content, all on-brand, kept accurate and working the moment someone
   starts looking. ¶ See exactly where you stand: your rank, your
   reach, your reviews, and your sources.
3. **Ads** (dot `color/pink/400`) — *Ads that pay for themselves.*
   ¶ Campaigns built from your own photos and content, landing on a
   site built to convert, with leads answered instantly and
   followed-up. ¶ See exactly what's working: your spend, your cost per
   lead, and your best-performing ad, sharper each time the results
   come back in.
4. **Reception** (dot `color/purple/400` — canon, §9 F6) — *Never
   miss a customer again.* ¶ Webchat, texts, and calls answered
   instantly day or night, all landing in one inbox, nothing gets
   lost. ¶ Contacts captured and appointments booked right inside the
   conversation, so the serious ones reach you and the rest get
   handled.
5. **Engagement** (dot `color/blue/400` — canon, §9 F6) — *Keep
   every customer warm.* ¶ Existing lists and old leads put back to
   work with newsletters, offers, and updates on a steady cadence,
   texts and social for anything time-sensitive. ¶ Rebooking nudges and
   win-backs reach customers who've lapsed, so nobody on your list goes
   cold. *(The drawn curly apostrophe in "who've" is canon — the 008
   precedent.)*

## 4 · The stage

672 × 672 at x 672 (rd2), sticky under the slug. Content: one
`engine-detail` drawing, 608 × 608 at (64, 64) — 64 top/left pads,
flush bottom-right *(amended 2026-09-06, build fresh-read, §9 R12 —
the draft's "centered (32 pads)" was the error; the drawn placement
is identical in all ten state frames and both static stacks)*. Ten
drawings —
`{engine}-01` (a) and `{engine}-02` (b) — mounted as **placeholder
exports** (§7) until the native-visual pass. The stage renders exactly
one state; swaps are the §6 blur + rise. The stage subtree is
decorative (`aria-hidden`, empty alt — the 018 R6 posture); the left
column carries all meaning.

## 5 · The static stacks — rt / rs / base

Below the rd1 gate the section is the drawn stack: slug row (rt only),
then five panels top-down in the §3 engine order, each panel = the
engine-box above its full-bleed visual. **The visuals are the `b`
(`-02`) drawings** (§9 R1 — the drawn `-01` instances are stale against
the ruling; the set carries `-02` at xs/md, verified). No a/b
indicator (none drawn in the stack boxes), no interaction, born settled
(the 011 R10 precedent), zero islands in this variant.

Type restatements: rt — header `display-serif/sm+/Extralight`, body
`text/xl/Light`, container (24, 97) 488 × 254; base — header
`display-serif/xs/Extralight`, body `text/md/Light`, container (0, 54)
320 × 244.

## 6 · Motion — the scroll paradigm

**The mapping contract (rd2/rd1).** The section consumes 52t of
document scroll (§1). The left column's position is a **piecewise
function of scroll**: free segments map 1:1 (native feel — the column
is normal flow); five **4t plateaus** (the a→b runways) hold the column
still while scroll advances. Both drawn rests of every engine show the
sliver at the same line — the column moves only between engines. The
stage and slug are sticky at top 44 throughout. The build chooses the
mechanism (scroll-linked transform on one rAF clock is the standing
pattern); the contract is the mapping, verified by the §10 checks.
*(Mechanism amended 2026-09-06 — §9 R15, the owner's bounce report:
the column is never in native flow while pinned. It rides inside a
sticky, clipped 7t window that the compositor holds — a runway cannot
jitter the panels — and the island translates it inside the window
through the free travels only, where nothing pinned exists to lag
against. The first cut's flow-plus-compensation stuttered by
construction: native scroll paints a frame ahead of a main-thread
counter-transform. The mapping contract above is unchanged.)*

- **Snap.** The two ends of each runway are snap rest points with
  stop-always semantics — one gesture crosses one runway, never two
  states. Free segments carry no snap. Reverse is symmetric
  (`05b → 01a` scrolling up, re-pinning at each runway). *(Amended
  2026-09-06 — owner ruling at build review, §9 R14: **no bounce** —
  a gesture ending inside a runway completes to the rest in the
  gesture's direction, never gliding backward, even when the
  midpoint threshold was not met. Amended again the same day — §9
  R15, the fluid ruling: the stop-always clamp is **dropped**; big
  flicks sail through several states with everything scrubbing (the
  ElevenLabs behavior). The gesture-end directional completion is
  the only snap.)*
- **Engine handoff (free segments).** As the incoming panel's top
  crosses the stage's top line, the stage fires its swap to that
  engine's `a` drawing (b→a when reversing). Keyed to the column's
  document position, never to viewport-relative stage geometry — fast
  flicks scroll through several engines and the stage crossfades
  through each in turn (the ElevenLabs behavior). Threshold tuned at
  build QA (§9 R7). *(Tuned 2026-09-06 — §9 R18, owner ruling: the
  handoff leads the rest by **2t**, so the crossfade starts while the
  incoming panel is still two ticks from settling and the stage
  resolves with the column, not after it; the dot lights on the same
  beat. Symmetric on reverse.)*
- **The swap treatment — blur + rise, one grammar for every swap**
  (§9 R3; a→b, b→a, and engine handoffs identical — never
  special-cased): incoming — opacity 0→1, blur 8→0, translateY
  +24 → 0; outgoing — opacity 1→0, blur 0→8, translateY 0 → −12;
  ≈ 500ms on the drawer-ease family with a gentle ease-out settle.
  Tokens `--motion-stage-*` in `tokens/motion.css`. During a runway
  the swap fires at the plateau's midpoint. *(Amended 2026-09-06 —
  §9 R15, the owner's fluid ruling: inside a runway the transition is
  a **scroll scrubber** — the same blur + rise values ride the runway
  progress directly (0 → 1 across the 4t), fully reversible, resolved
  to the settled state at the runway's ends; the timed midpoint swap
  is superseded there. Engine handoffs in the free segments keep the
  timed grammar — a crossing, not a range. Reduced motion quantizes
  the scrub at the midpoint, state-to-state.   Re-ruled the same day —
  §9 R16: the scrubber stalled mid-transition under slow scrolls and
  felt stodgy; **the timed midpoint swap stands everywhere** — a
  started transition fires entirely. The compositor window and the
  rest of R15 are unchanged. Trigger raised the same day — §9 R17:
  the swap fires past **0.65 of the runway** (symmetric on reverse)
  with a hysteresis band between the triggers, so arriving at a rest
  never auto-advances.)*
- **The a/b indicator** (§6.2): the four drawn keyframes
  (`877:98990`) — a base track (24 pill + 7 dot, both `bg/500`) with a
  `text/300` overlay pill that grows 7 → 14 → 24 across the runway's
  progress, continuously (scroll-linked, not stepped — the owner's
  "progresses smoothly"); at the b rest the slots swap arrangement
  (dot 7 at x0, pill 24 at x15 — the drawn `second-slide-start`).
  Reversing runs it backward.
- **The last state holds.** After 05b's runway the section releases;
  the empty sliver row (drawn — the 05 frames' `inactive-engine` is
  empty) shows bare lattice *(amended 2026-09-06, §9 R14 — the
  `883:99636` redraw drops the sliver row's outline: the sliver look
  is the boxes' own borders, and no pinned rule ever crosses a moving
  panel)*; the column parks on Engagement after
  exactly **four panel-heights of travel**; nothing advances past 05b.
- **Short viewports** (§9 R4): the stage top-anchors and the fold
  crops its tail passively — no height gate, no fallback layout; the
  mapping stays document-keyed so swaps fire normally.
- **Reduced motion** (§9 R5): the structure (pin, snap, mapping)
  stands — it is navigation, not decoration; every swap and the
  indicator go state-to-state instantly (no blur, rise, or travel).
- **No-JS** (§9 R6): the column renders in normal flow with the stage
  holding 01a; all five engines' copy is in the document; the runway
  plateaus collapse (no spacers without the island — the section
  renders at its drawn 8t + the flow column).

## 7 · Assets and constants

- **Ten placeholder exports** — the `engine-detail` xl variants
  (`771:18256`), exported through the bridge at build as
  `placeholder-{engine}-{01|02}.webp` (2×, 1216 × 1216) into
  `public/media/engines-v2/`, plus the **md and xs `-02` cuts** for the
  static stacks (five each). **Placeholders by owner direction
  2026-09-06** — a native/production visual pass replaces them later
  (tracked on the launch checklist; the 019 grain primitive's second
  consumer arrives with that pass).
- **Non-token constants** (component token layer, per band): pin top
  44; runway 4t; the swap values (§6); the indicator geometry
  (39 × 7 · pill 24 · dot 7 · x 32 / x 15) and its inks
  (`bg/500` track, `text/300` fill); panel container boxes (§3/§5);
  stage pads — top/left 64 (xl) · 64 (md, 4px clipped bottom-right) ·
  32 (xs), flush bottom-right *(amended 2026-09-06, §9 R12 — drawn
  placement, not the draft's centered halves)*.
- Engine dot bindings ride the §3 canon (F6 resolved — the dots are
  canon, §9).
- **Stage loading posture** (approval review 2026-09-06): all ten
  drawings mount in the stage subtree with only the active state
  visible; the Brand pair (01a/01b) loads eager; the island
  decode-primes each adjacent state as its runway or handoff threshold
  approaches on the rAF clock, so a swap never reveals an undecoded
  drawing. The static stacks keep the standing lazy tier posture.

## 8 · Deliverable — files, routes

- `design-system/v2/sections/engines.tsx` + `engines.css` — server
  component rendering the full document (column, stage holding 01a,
  slug, lattice cells); **one client island** (`engines-scroll.tsx`)
  owning the §6 mapping, snap, swaps, and indicator on one rAF clock,
  with the runway spacers mounted by the island (no-JS never sees
  them).
- Splices into `v2/home-next.tsx` after the system section; permanent
  noindexed dev route **`/engines-next`**.
- The expectations module gains the section's runway constants (52t at
  rd2 interactive; 96t/127t static stacks at rt/base per §1); the
  sweep leg lands with 023 — until then the section audits on
  `/engines-next` through the standing devtools at every rest state
  (each of the ten states is a rest).

## 9 · Resolutions record

All flags resolved 2026-09-06, the same morning:

- **F6 — resolved (owner): the dots are canon** — Reception is purple,
  Engagement is blue. The 019 system diagram's *labels* were the error;
  design swapped the two label texts and the fix was re-read at all
  three anchors (the right tag now reads Reception beside the purple
  petal, the bottom-right Engagement beside the blue). With the swap,
  the diagram's clockwise walk from Brand reads Brand → Visibility →
  Ads → Reception → Engagement — this section's narrative order. The
  **built 019 section's re-label rides as a pending surgical fix**
  (owner: after this spec) — label texts, petal identities, and the
  sr-only sentence swap; positions, colors, and the Bloom beat
  sequence are positional and unchanged. The tag node names now lag
  their texts (`engagement-tag` holds "Reception") — file hygiene,
  immaterial.

**Resolved at draft (owner, 2026-09-06):**

- **R1** — below the rd1 gate the stacks are static with the **b**
  visuals; the drawn `-01` stack instances are stale against the
  ruling (the `-02` variants verified present at xs/md); the build
  mounts `-02`, the file fix rides with design.
- **R2** — pin top **44** (flush under the nav; the state frames'
  drawn value). *(Superseded 2026-09-06 by the R14 pin-line ruling —
  the `883:99636` redraw.)*
- **R3** — the swap treatment is **blur + rise with a gentle settle**
  (the ElevenLabs blur-crossfade plus the brief's rise), identical for
  every transition.
- **R4** — short viewports clip the stage's tail passively; no height
  gate (the stage top-anchors; content ordered so the crop is safe).
- **R5** — reduced motion keeps the structure, swaps go
  state-to-state.
- **R6** — no-JS renders the flow with the stage holding 01a.
- **R7** — runway ≈ 4t with stop-always snap and the handoff
  threshold at the stage top line, both tuned at build QA.
- **R8 (record)** — the 384 stack has **no slug row** (drawn; the
  seam row r41 is bare lattice) and a drawn 2t tail gap; the 768/1344
  constructions carry the slug.
- **R9 (record)** — the five draft flags fixed and re-read 2026-09-06:
  the 05 frames renamed Engagement, the 02b Visibility copy trued, the
  sliver boxes' descriptions trued (immaterial — the 1t clip hides
  them), the 384 `brand-engine` re-read x 0, the 01a frame re-cropped
  972. The revised interaction model (this spec's §6) supersedes the
  original brief's all-pinned construction and its "sticky top: 0"
  verify line.
- **R10 (record)** — every §1–§5 value verified against rendered
  bounds through the bridge at writing; the ten states' contents
  mapped (engine order Brand → Visibility → Ads → Reception →
  Engagement, matching the stacks and Bloom's start); the state
  frames' Grid is static across all ten states (the pinned viewport
  carries its lattice).
- **R11 (record, approval review 2026-09-06)** — pre-approval edits
  from the owner's review: the stale §7 "F6 pending" parenthetical
  removed (F6 was already resolved); §3's paragraph structure
  clarified against a fresh node read — each engine's description is
  one drawn three-paragraph `text/xl/Light` node (ps 12): the tagline
  sentence, then **two** body paragraphs (never three body
  paragraphs); the serif header is the engine-name node, separate
  from the description; the stage loading
  posture added to §7. The same read found one sliver residual: the
  **04b frame's sliver box carries a stale Visibility copy variant**
  (wrong engine, old string) — immaterial under the 1t clip (the R9
  class), with design for file hygiene; the build's fresh-read pass
  must not treat it as drift. The Brand/Visibility headline trailing
  spaces are read artifacts and are not built (the 018 posture).
- **R12 (record, build fresh-read pass 2026-09-06)** — every §1–§5
  value re-read against rendered bounds through the bridge; the token
  re-extraction read zero drift (the snapshot gained the already-built
  `display-serif/sm/Thin` entry). Amendments landed at their values
  (the 018 R7 precedent — the file is the latest intent): the three
  ornament cells the draft missed (○ `[8,20]` and `[11,25]` at 1344;
  filled ○ `[11,41]` at 384); the `engine-detail` placement — 64
  top/left pads at xl/md and 32 at xs, flush bottom-right (md clips
  4px), never centered. Drawn facts recorded for the build: the
  engine containers hug their content and **center on the box's
  vertical midline** (the §3/§5 boxes are the shortest-engine
  archetypes; Ads and Engagement run taller); the engine dots are
  20 (rd2) · 16 (rt) · 7 (xs); the slug label is `text/sm/Medium` at
  rd2 and `text/xs/Regular` at rt over the standing 7px `bg/400`
  square marker, gap 12; the slug row strokes its **top line only**;
  the sliver row keeps its full 1px outline even when empty (the 05
  frames); the boxes are borderful (`border/000` 1px) with the visual
  filled `bg/100` and the xs visual dropping its side borders at the
  page edges; the section paints its leading full-lattice **seam row**
  (r18/r25/r41) — the §8 totals (52t/96t/127t) measure from the slug
  row (384: the panels) down, the seam riding above them as a named
  `+1t` constant. Two file residuals, with design (the R9 class; the
  build follows canon): the **05b breadcrumb is unswapped** (shows the
  a arrangement; §6.2's swap-at-b is canon, drawn in 01b–04b), and the
  **brand-02/xs and engagement-02/xs variants read 358.1 wide**
  against the set's 352 — exported through a 352 × 352 clip.
- **R13 (build record, 2026-09-06).** The §6 mechanism as built: the
  20t runway budget is **one spacer at the column's bottom** plus a
  **cumulative rAF transform** on the column (T = Σ clamp(s − 10t·i,
  0, 4t) — zero through free segments, 1:1 inside a runway), so free
  scroll is native and every rest needs no transform change. The
  sticky structure is pure CSS (slug top 44 · stage and the pinned
  lattice assembly top 44 + 1t; the pin releases against the body
  exactly at the 05b rest). **Snap** is JS on the island's clock (the
  document scroller cannot take mandatory CSS snap with free
  segments): gesture end inside a runway ± ½t glides to the nearest
  rest on the carousel-snap tokens (alias); a **wheel gesture that
  would sail past the runway it entered clamps at the far rest until
  the burst ends** (stop-always; touch rides the 4t plateau plus the
  end snap); the glide **cedes to any external scroll** (found at
  build QA — the first cut fought programmatic jumps). The handoff
  lead is 0 (the stage top line) — R7's tunables are named constants
  at the island head. The island compensates a restored
  below-section scroll position when the spacer mounts. Verified at
  build QA on `/engines-next` and `/home-next`: all ten rests at 1344
  (stage/slug pinned 156/44, the sliver line 828 in every state, the
  column's total travel exactly 4 panel-heights, T = 20t at 05b, the
  release pixel-exact, 05b holds); 960 renders the 1344 zoom exactly
  (t·V/112 across container, type, indicator, drawing); 768 and 384
  byte-exact against the drawn stacks (97t/128t sections, 19t/25t
  panels, `-02` md/xs cuts at the drawn mounts); 576 holds the
  geometry-on-tick + midpoint-type derivation (name 30/36 · desc
  18 · wrap 368 · dot 11.5); compressed slices at 738 and 1200 and
  the capped 1920 all ride their zooms; reduced motion renders
  instant swaps, quantized fill, and instant snap landings with the
  structure standing; no-JS holds 01a with a 0-height spacer (the
  server HTML carries no ready attribute). One new flag:
  **the file's engagement `engine-detail` variants are drawn as
  empty stubs** (5–8 descendants, no text, all three sizes; every
  other engine carries a full drawing) — the placeholder exports
  faithfully carry the stub; with design, tracked as launch gate
  G10 with the native-visual pass. The standing sweep ran green
  against the owner's server; tsc/lint zero; the route-JS
  measurement rides to 023 (the 018/019 precedent).
- **R14 (owner rulings at the build review, 2026-09-06 — the
  `883:99636` redraw, read fresh through the bridge).** Three
  amendments, landed the same day: **(1) the pin line** — the
  construction pins so the slug row's bottom edge sits the drawn 45
  below the nav bottom (`engine-section` at −23 in the redraw; the
  active row at 89 carries a drawn top rule; the Grid rode the move,
  keeping the pinned lattice on its rows). The 1t slug row pins above
  the line, its label hidden behind the opaque nav rail at rest; its
  bg/100 fill masks passing panels to the viewport top (nothing peeks
  beside the nav) and its line-inclusive bottom border is the
  ever-present active-top rule. The 45 rides the zoom
  (`--e2-pin-line`); R2's top-44 is superseded. **(2) No occluding
  rules** — the redraw drops the `inactive-engine` outline; the
  build's pinned sliver-row `GridCellX` (whose bottom line crossed
  the moving panels below the fold) is removed. The sliver look is
  the boxes' own borders; the only pinned rule is the active-top
  line. **(3) No bounce** — a gesture ending inside a runway
  completes to the rest in the gesture's direction, never gliding
  backward, even under the midpoint threshold (the island's
  direction-aware snap). Re-verified after the change: rests pin the
  active panel and stage on the pin line with the slug bottom rule
  shared-pixel on the resting panel's top border; the release exact;
  the walkthrough green at 1344 and 960.
- **R15 (owner ruling at the second build review, 2026-09-06 — the
  bounce persisted; root cause and the fluid re-ruling).** The R14
  build still stuttered during runways **by construction**: the
  column was in native flow while pinned, native scroll paints on the
  compositor thread, and the island's counter-transform lands on the
  main thread a frame later — the column moved and snapped back every
  scroll event; the stop-always clamp writing scroll positions
  against live momentum compounded it. No tuning fixes a cross-thread
  race, so the construction changed (§6 amendments at their values):
  **(1) the compositor window** — the ready construction turns the
  column's wrapper into a sticky, clipped 7t window (the left frame
  is locked while a runway runs — the owner's "lock the left frame"
  option, structurally); the island translates the column inside it
  through the free travels only, where everything else visible is
  pinned and a frame of lag has nothing to show against; the body
  carries the 51t scroll budget explicitly and the runway spacer is
  gone (the no-JS flow render is unchanged). The window also clips
  the sliver exactly as the drawn frames crop it — the continuing
  column no longer hangs below the fold on tall viewports. **(2) the
  scrubbed runway** — the owner's scrubber option: inside a runway
  the a→b blur + rise rides the scroll position directly (--e2-p),
  fully reversible, no timed swap; handoffs keep the timed grammar.
  **(3) the stop-always clamp dropped** (the "too sticky" feel); the
  gesture-end directional completion (R14) is the only snap, so a
  half-scrubbed stage always resolves and the page never moves
  against the user. Verified: at the runway midpoint every pinned
  element reads exactly 89 with the column transform untouched and
  the scrub pair at p 0.5; free travel 1:1 (−3t at 7t); the parks,
  release, and directional completions all exact; no-JS keeps every
  engine's copy reachable; tsc/lint zero.
- **R16 (owner rulings at the third build review, 2026-09-06).**
  Three same-day refinements on the R15 architecture (the compositor
  window stands): **(1) the scrubber is superseded** — it stalled
  mid-transition under slow scrolls and felt stodgy; the timed
  midpoint swap stands everywhere (a started transition fires
  entirely, the R3 500ms grammar; the directional gesture-end
  completion and the dropped clamp stay). **(2) The upcoming panel's
  dot is the drawn `bg/400` gray** (the redraw's `gray-ellipse`,
  read: `#e0ddd1`); it transitions to its engine hue on the stage
  clock as the panel reaches the active slot (data-lit,
  island-driven; symmetric on reverse; panel 0 born lit — the drawn
  01a rest; the static stacks keep colored dots; reduced motion
  renders the hue state-to-state). **(3) The window does not clip**
  — the inactive card runs to the viewport's edge as the redraw
  crops it; the column's overflow above the pin line hides under the
  slug row's mask. Verified at 1344: the swap fires once at the
  midpoint (state 0 at 1.5t, 1 at 2.5t, no scrub attributes), dot 1
  reads bg/400 at rest and mid-hue through a passed handoff, the
  window computes overflow visible with the Ads card visible below
  the sliver line at 2a; tsc/lint zero.
- **R17 (owner ruling at the fourth build review, 2026-09-06).** The
  b state fired the moment a resolved: any penetration past a fresh
  rest read as "heading to b" (the R14 directional completion), so a
  momentum overshoot auto-advanced the swap. The trigger is raised
  and made hysteretic: **a→b fires past 0.65 of the runway, b→a past
  0.65 from the other end**; between the triggers the current state
  holds, and the gesture-end completion parks at the
  trigger-resolved state's rest — derived from the live scroll
  position, never the frame-stale state (the same scrollend-beats-
  the-frame race R14 hit, found again here). Settling back within a
  runway is invisible: the column is compositor-locked, so nothing
  the user watches moves. `SWAP_TRIGGER_FRAC` is the named constant
  (R7's QA-tunable class). Verified at 1344: a 200px overshoot
  settles back to a with no swap; 320px fires b and completes;
  reverse holds b through the band and flips at the deep trigger;
  reduced motion quantizes fill and state at the same trigger;
  tsc/lint zero.
- **R18 (owner ruling at the fifth build review, 2026-09-06).** The
  engine handoff fired only as the incoming panel arrived at its rest
  (the crossing IS the arrival), so the crossfade read as an
  afterthought. `HANDOFF_LEAD_T` — the R7 tunable, built for exactly
  this — is set to **2t**: the b→a crossfade starts while the
  incoming panel is still two ticks from settling and lands roughly
  as the column does; the panel's dot lights on the same beat.
  Symmetric on reverse (the stage holds the resolved a for the first
  2t of upward departure, then crossfades back to the prior b).
  Verified at 1344 both ways; tsc/lint zero.

## 10 · Acceptance criteria

*At the three drawn anchors, the two derived-band anchors, and one
arbitrary mid-band width per band, scrollbar forced on; the interactive
checks at rd2/rd1, the static checks at rt/rs/base.*

- [x] The stage and slug hold sticky top 44 through the section at
      every scroll position; the stage never drifts at short viewport
      heights (tail clips passively). *(Measured 156/44 at every rest
      and mid-travel at 1344, 1200, 990, 1920; the release exact —
      §9 R13.)*
- [x] The mapping runs `01a → 01b → 02a → … → 05b` forward and reverse
      cleanly; every runway rest is a snap point; one gesture never
      crosses two states; free flicks pass multiple engines with the
      stage crossfading through each. *(The ten-rest walkthrough
      forward and reverse; the wheel stop-always clamp and gesture-end
      snap per §9 R13; a 15t free jump crossfaded through the passed
      states.)*
- [x] The left column moves only between engines (both rests of each
      engine show the sliver at the same line); it parks on Engagement
      after exactly four panel-heights of travel; 05b holds while the
      pin releases. *(Sliver line 828 in all ten rests; travel 2688 =
      4 × 672; T = 2240 = 20t at 05b; state 9 held past release.)*
- [x] Every swap is the one blur + rise grammar (a→b, b→a, handoffs
      identical); the indicator fills continuously across each runway
      and swaps arrangement at b. *(One --motion-stage-* transition
      set for every drawing; fill read 0.55 mid-runway, arrangement
      flipped exactly at the b rest, reverted on reverse.)*
- [x] Section anatomy per §1 (52t document at rd2 with the drawn 8t
      viewport; 19t/25t static panels at rt/base); exposure per §2
      exactly; the pinned viewport's lattice static through all ten
      states. *(53t element = the leading seam + 52t, flush on page
      row 18 in the composition; 97t/128t stacks; the §2 map as
      amended verified per cell; the pin assembly static at 156
      through every state.)*
- [x] Copy canon per §3 (tagline + two body paragraphs per engine,
      drawn breaks); the stacks mount the `-02` visuals; no indicator
      in the stacks. *(Strings verbatim from the fresh node reads;
      md/xs `-02` cuts mounted; no .e2-bc in the stack DOM.)*
- [x] Reduced motion keeps pin + snap with instant swaps; no-JS
      renders the flow with the stage at 01a and every engine's copy
      readable; the runway spacers never render without the island.
      *(transition 0s + quantized fill + instant snap under the
      simulation; the server HTML carries no ready attribute and the
      spacer is 0-height without it.)*
- [x] One client island; every value traces to a token or a §7
      enumerated constant. *(engines-scroll.tsx; the --e2-* component
      tokens and --motion-stage-* grammar; the island's tunables are
      named constants at its head.)*
- [x] tsc/lint zero; the standing sweep green (v1 routes and the built
      018/019 sections byte-untouched). *(Sweep green against the
      owner's server 2026-09-06; hero-v2 byte-untouched; the system
      section's only change is the owner-ordered 019 §9 R6 re-label,
      landed before this build as its own surgical fix.)*
