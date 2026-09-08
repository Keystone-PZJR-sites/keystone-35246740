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
*(Re-ruled 2026-09-06, the sixth build review — §9 R19: scroll moves
between engines only; each engine's a↔b swap rides a 5000ms carousel
timer, not scroll. The runways and their scroll budget are deleted.)*

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
> *(amended 2026-09-06 — §9 R19: the runway terms are deleted with the
> carousel re-ruling; the budget is the natural flow height —
> 8t + 4·6t = **32t**)*

carried as the expectations module's tick constants (the 017
`extraTicks` pattern; every term whole-tick). The stage viewport is
672 × 672 at x 672, sticky on the pin line *(amended 2026-09-06 —
§9 R14; was 44 + 1t)*; the slug row is sticky above it
for the section's duration *(amended 2026-09-06 — §9 R23: sticky
until the carousel's **apex** — the slug rule releases at the
Engagement rest together with the stage and the pinned lattice, the
resolved frame departing whole; "the section's duration" held it 7t
too long, the orphaned-rule defect)*; the left column is the five 672-tall panels,
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

*(Re-ruled 2026-09-06, the eighth build review — §9 R21, the owner's
stack-carousel brief; the redrawn anchor frames and the `engine-visual`
set (`791:36057`) are the source, read fresh at rendered bounds. The
stacks are no longer static: each panel's visual is a **two-state
carousel resting on the `a` drawing** — R1's b-mount is superseded (the
frames now mount `-01` with the `slide1-finish` breadcrumb; the file is
the latest intent). At **rt** the illustration **auto-progresses on the
§6 carousel clock** (5000ms per state, the one blur + rise grammar, the
a↔b loop; a panel's clock counts only while its visual is substantially
in view) with the indicator drawn **vertical** (§6.2). At **base/rs**
the user **swipes** the visual between the two states — a pointer drag
with a horizontal intent lock follows the finger 1:1 (`touch-action:
pan-y` keeps vertical scroll native), the release commits past the
swipe threshold or on a flick, and the horizontal indicator's b fill
rides the drag progress *(re-ruled the same day — §9 R22: the swipe is
a **blur + slight lateral wipe** on the stage grammar, never a
full-width slide, and the b track rests **empty** with no minimum
floor below the gate)*. The same §8 island drives both (the zero-
islands line is superseded); no-JS renders the drawn rest — slide `a`,
track one full. Reduced motion: the rt timer runs with instant swaps
and quantized fill; the swipe's fill still follows the finger (direct
manipulation) with the drawings state-to-state (§9 R22).)*

Type restatements: rt — header `display-serif/sm+/Extralight`, body
`text/xl/Light`, container (24, 97) 488 × 254; base — header
`display-serif/xs/Extralight`, body `text/md/Light`, container (0, 54)
320 × 244.

## 6 · Motion — the scroll paradigm

*(Re-ruled 2026-09-06, the sixth build review — §9 R19, the owner's
carousel brief, superseding the runway constructs below at their
values. The paradigm is now an **auto-transitioning carousel**: once
the section pins and an engine settles on its rest, a **5000ms timer**
runs; at expiry the stage swaps to the other illustration on the
standing §6 blur + rise grammar and the cycle **loops** (a → b → a → …)
until the user scrolls. Scroll moves **between engines only** — free
native travel with a **gentle gesture-end snap** to the nearest engine
rest (big flicks sail through several engines; the ElevenLabs feel
stands) *(the snap re-ruled the same day — §9 R20: **paged**, one
gesture moves one engine; flicks no longer sail. Retired 2026-09-06 —
§9 R24, the owner's free-scroll promotion: **no snap and no clamp**;
the island never writes scroll. The ten states ride the scroll
directly — a **distance mapping** of one stop per drawing at
half-stride intervals with hysteresis, and the R19 timer runs as an
**idle cycle** wherever the scroll parks. Tuned the same evening —
§9 R25: hysteresis 0.5 (the swaps fire at 25% and 75% of each lap),
**the idle cycle deleted** — scroll is the rd construction's whole
interaction — and the 05a→05b boundary biased early to 0.3
half-strides past the Engagement rest)*; when an engine
settles, the stage transitions from the previous engine and its timer
starts fresh. An engine change always
resets its cycle to `a` — revisits never resume a completed `b`. The
timer counts only at a settled rest (mid-travel, the pre-pin approach,
and the released tail pause it) and pauses off-screen. The runways,
their 4t plateaus, the swap triggers/hysteresis (R14/R17), the handoff
lead (R18), and the R15 compositor window are all deleted — with no
plateaus the scroll mapping is 1:1 everywhere, so the column is plain
native flow and no transform exists to race the compositor. The
breadcrumb is re-drawn as the timer's visualization — §6.2 below.)*

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
  the only snap. Superseded 2026-09-06 — §9 R19: with the runways
  deleted the snap is the gesture-end glide to the **nearest engine
  rest**, anywhere in the section's travel (± the edge margin);
  mid-gesture scroll is native and free. Re-ruled the same day — §9
  R20, the owner's paging brief: the snap is **paged** — one gesture
  moves at most one engine (the burst clamps at the adjacent rest and
  its end commits in the gesture's direction past a small threshold);
  entry catches decisively at the boundary rest; both ends exit
  free. Retired 2026-09-06 — §9 R24: **no snap of any kind**; scroll
  is native and free through the whole section, and the stage follows
  it on the ten-stop distance mapping.)*
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
  beat. Symmetric on reverse. Superseded 2026-09-06 — §9 R19: the
  handoff fires as the scroll crosses the midpoint between rests (the
  nearest-rest resolution, lead 0); the incoming engine always enters
  at `a` with a fresh timer, which starts counting once the engine
  settles.)*
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
  never auto-advances. Superseded 2026-09-06 — §9 R19: no runways,
  no triggers; every swap — timer expiries and engine handoffs alike
  — is the one timed grammar, fired entirely at its beat.)*
- **The a/b indicator** (§6.2): the four drawn keyframes
  (`877:98990`) — a base track (24 pill + 7 dot, both `bg/500`) with a
  `text/300` overlay pill that grows 7 → 14 → 24 across the runway's
  progress, continuously (scroll-linked, not stepped — the owner's
  "progresses smoothly"); at the b rest the slots swap arrangement
  (dot 7 at x0, pill 24 at x15 — the drawn `second-slide-start`).
  Reversing runs it backward. *(Superseded 2026-09-06 — §9 R19: the
  set was redrawn as six keyframes
  (`slide1-start/-mid/-finish · slide2-start/-mid/-finish`, read fresh
  at rendered bounds) and the indicator is now the **timer's
  visualization** — a scrubber without drag or click. Geometry: 56 × 6
  — two 24 × 6 full-radius `bg/500` tracks, gap 8, one track per
  illustration; a `text/300` full-radius fill inside the active track
  grows continuously from the drawn **6 minimum to the full 24** as
  the 5000ms clock runs. Track one holds full while b's clock runs;
  the b track carries no fill until its clock starts (the drawn
  slide1 variants); the loop back to a resets both. Resting and
  upcoming panels hold the drawn `slide1-start` (the minimum dot on
  track one). Placement verified in the redrawn 01a frame: flush at
  the container's bottom edge (y 522, height 6), left on the text
  column line — the old anchoring. Reduced motion quantizes the fill
  state-to-state. Amended the same day — §9 R21: the **fill law is
  the drawn `max(6, 24·f)`** (the mid keyframe is 12 = 24 × 0.5; the
  first build's linear 6 + 18f was a misread, corrected in the shared
  vocabulary). The set also carries a **vertical orientation** for the
  rt stack (the `engine-visual` md variant mounts the component
  rotated −90°): 6 × 56 — two 6 × 24 tracks stacked, gap 8, the fill
  growing downward;   drawn at left 29 / bottom 32 in the 768 visual
  (the xs horizontal sits at left 32 / bottom 29 — the mirrored 29/32
  reads like a rotation-pivot artifact, flagged with design, built as
  drawn). The track/thickness/gap/minimum (24/6/8/6) are identical at
  both drawn anchors — material constants below the rd gate; the rd2
  card indicator keeps riding the zoom. The floored law is **timer
  vocabulary only** (amended the same day — §9 R22): the base/rs
  swipe fill carries no minimum — the b track rests empty (the
  owner's mock) and fills from nothing under the drag.)*
- **The last state holds.** After 05b's runway the section releases;
  the empty sliver row (drawn — the 05 frames' `inactive-engine` is
  empty) shows bare lattice *(amended 2026-09-06, §9 R14 — the
  `883:99636` redraw drops the sliver row's outline: the sliver look
  is the boxes' own borders, and no pinned rule ever crosses a moving
  panel)*; the column parks on Engagement after
  exactly **four panel-heights of travel**; nothing advances past 05b.
  *(Amended 2026-09-06 — §9 R19: while parked and settled the
  Engagement cycle keeps looping; once the scroll passes the release
  the timer pauses and the stage holds its current state.)*
- **Short viewports** (§9 R4): the stage top-anchors and the fold
  crops its tail passively — no height gate, no fallback layout; the
  mapping stays document-keyed so swaps fire normally.
- **Reduced motion** (§9 R5): the structure (pin, snap, mapping)
  stands — it is navigation, not decoration; every swap and the
  indicator go state-to-state instantly (no blur, rise, or travel).
  *(Amended 2026-09-06 — §9 R19, owner ruling: the carousel timer
  keeps running under reduced motion — the stage is decorative and
  the copy never moves; swaps render instantly, the fill quantizes,
  snap glides land instantly.)*
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
  consumer arrives with that pass). *(Amended 2026-09-06 — §9 R21: the
  **md and xs `-01` cuts joined** (ten more files — the stack
  carousels mount both states; 1416/704, the exports' 1–2px raster
  bound inflation cropped to canon at conversion) — thirty files
  total.)*
- **Non-token constants** (component token layer, per band): pin top
  44; runway 4t *(deleted 2026-09-06 — §9 R19)*; the swap values (§6);
  the **carousel timer 5000ms** (island constant, the R7 QA-tunable
  class — added 2026-09-06, §9 R19);   the **paging capture margin 1.5t
  and commit threshold 0.25t** (island constants, the same class —
  added 2026-09-06, §9 R20; *deleted the same day — §9 R24, with the
  whole paged apparatus*); the **distance-mapping constants** (island
  constants, the R7 QA-tunable class — added 2026-09-06, §9 R24:
  hysteresis 0.6 half-strides · jump threshold 1.5 half-strides ·
  idle epsilon 0.5px/frame; *tuned the same evening — §9 R25:
  hysteresis **0.5**, the idle epsilon deleted with the idle cycle,
  and the **last-boundary bias 0.3** half-strides past the Engagement
  rest, riding the tick*); the **stack-carousel constants** (island
  constants, the same class — added 2026-09-06, §9 R21: the swipe
  intent lock 8px · commit fraction 0.15 · flick velocity 0.3 px/ms;
  the stack indicator's material 24/6/8/6 and its drawn 29/32
  offsets); the indicator geometry
  (39 × 7 · pill 24 · dot 7 · x 32 / x 15) *(superseded 2026-09-06 —
  §9 R19, the redrawn keyframes: 56 × 6 — two 24 × 6 tracks · gap 8 ·
  fill minimum 6)* and its inks
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
  them). *(Amended 2026-09-06 — §9 R19: the island owns the carousel
  timer, the gesture-end snap, the swaps, and the indicator fills;
  the column is plain flow with or without it — no spacers, no ready
  construction, the JS and no-JS documents identical.)*
- Splices into `v2/home-next.tsx` after the system section; permanent
  noindexed dev route **`/engines-next`**. *(Amended 2026-09-06 —
  §9 R24: `/engines-next` is retired with the paged contract; the QA
  route is **`/engines-free-2`** — born as the promotion experiment's
  sandbox, kept as the section's permanent QA surface, mounting the
  canonical section.)*
- The expectations module gains the section's tick constants (52t at
  rd2 interactive *(amended 2026-09-06 — §9 R19: 32t)*; 96t/127t
  static stacks at rt/base per §1); the
  sweep leg lands with 023 — until then the section audits on
  `/engines-next` through the standing devtools at every rest state
  (each of the ten states is a rest). *(Route per the R24 amendment
  above: `/engines-free-2`; under the distance mapping each of the
  ten states is a scroll stop.)*

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
- **R19 (owner re-ruling at the sixth build review, 2026-09-06 — the
  carousel brief).** The owner rejected the two-panel scroll-jack and
  re-ruled the paradigm to the **auto-transitioning carousel** (§0/§6
  amendments at their values): no scroll-driven a→b — once the
  section pins and an engine settles on its rest, a **5000ms timer**
  runs and at expiry the stage swaps on the standing blur + rise
  grammar; scroll moves between engines only, free native travel with
  a gentle gesture-end snap. Four rulings at the review: **(1) the b
  expiry loops** — a → b → a → … repeats until the user scrolls;
  **(2) revisits reset** — an engine change always enters at `a` with
  a fresh timer and an empty breadcrumb, never resuming a completed
  b; **(3) the snap is gesture-end to the nearest rest** — big flicks
  sail through several engines (the R15 fluid feel stands; no paging,
  no stop-always); **(4) reduced motion keeps the timer** — the stage
  is decorative and the copy never moves; swaps render instantly, the
  fill quantizes, glides land instantly. The **breadcrumb was
  redrawn as the timer's visualization** (`877:98990`, six keyframes,
  read fresh at rendered bounds this session): 56 × 6 — two 24 × 6
  full-radius `bg/500` tracks, gap 8, one per illustration; the
  `text/300` fill grows from the drawn 6 minimum to the full 24 over
  the clock; the b track carries no fill until its clock starts;
  placement re-verified in the redrawn 01a (flush at the container's
  bottom edge, y 522, left on the text column line — the old anchor).
  **Construction consequence — the machinery deleted:** the runways,
  plateaus, swap triggers/hysteresis (R14/R17), the handoff lead
  (R18), and the R15 compositor window all go; with no plateaus the
  mapping is 1:1 everywhere, so the column is **plain native flow**
  and nothing exists to race the compositor. The budget drops
  52t → **32t** (the natural flow height; the ready construction, the
  explicit body height, and the scroll-restoration compensation are
  gone — the JS and no-JS documents are identical). The island is
  reduced to the timer, the gesture-end glide, the swaps, the
  indicator fills, and the dots on one rAF clock; the timer
  accumulates clamped frame deltas (≤100ms), so it pauses off-screen
  and a backgrounded tab never jumps a swap. One file residual with
  design (the R9 class): the state frames' **sliver panels still
  carry the old 39 × 7 breadcrumb instance** (the active panels carry
  the new set); the build follows the keyframe canon — resting and
  upcoming panels hold the drawn `slide1-start`. Verified at the
  capped 1920 (the 1344 zoom, t=112): geometry exact (body 31t + 1 =
  3473, rail 30t + 1, column transform none; stage 89 / slug bottom
  90 shared-pixel at every rest); the timer walkthrough (fill 0.89 at
  ~4.5s → the swap at the beat → the b fill riding → the loop back
  with both fills reset); the snap both ways (a 300px park settles
  back to the rest with the timer resumed — same engine, no reset; a
  370px park crosses the midpoint, hands off to 02a, and glides to
  the rest); a 2.4-panel jump crossfades to the resolved engine only;
  the revisit reset exact (fresh `a`, fill 0.003 on the first frame
  back, the prior engine's indicator cleared; dots un-lit
  symmetrically); the release pixel-exact at the Engagement rest with
  the state holding past it; reduced motion — instant snap landing,
  quantized fill (the bar holds the 6 minimum between beats), stage
  transitions 0s; tsc/lint zero (every reported lint finding
  pre-existing in other files); the standing sweep green against the
  owner's server.
- **R20 (owner re-ruling at the seventh build review, 2026-09-06 —
  the paging brief).** R19's nearest-rest gesture-end snap is
  superseded: the snap is **paged** — a more pronounced catch at the
  first rest, then **one gesture moves exactly one engine**. The
  mechanism: every burst of scroll activity (a wheel gesture with its
  momentum, a trackpad flick, a PgDn, a scrollbar drag) has an
  **origin rest** (−1 above the section · 0–4 · 5 below); while the
  burst runs, the scroll **clamps at the adjacent rest** in each
  direction (the R13 stop-always semantics, re-ruled back for the
  carousel — one write per rAF frame), and the burst's end glides to
  the adjacent rest in the gesture's direction — net travel past the
  **commit threshold (0.25t)** advances (the R14 no-bounce ruling
  stands: direction completes, never glides backward), under it the
  gesture settles back to its origin. **Entry is pronounced**: a
  scroll-through from either side catches at the boundary rest (the
  clamp), and a gesture ending within the **capture margin (1.5t)**
  outside the section pulls in. **Both ends exit free** — from Brand
  scrolling up and from Engagement scrolling down the window is
  open-ended, so the section never traps the scroll; a gesture ending
  beyond the capture margin re-origins with no glide. **Teleports**
  (anchor jumps, find-in-page, a restored position — a frame delta
  past one panel) re-origin without clamping, never fought. The stage
  handoff (the nearest-rest midpoint crossing, R19) is unchanged —
  under the clamp at most one boundary away, so the stage crossfades
  once per gesture, mid-glide; the timer, loop, reset, indicator, and
  reduced-motion posture all stand (a reduced-motion glide lands
  instantly; the clamp is instant by nature). `CAPTURE_T` and
  `COMMIT_T` are named island constants (the R7 QA-tunable class).
  Known caveat, accepted at the ruling: a scrollbar drag is one long
  burst and therefore also moves one engine per drag (inherent to
  paging; the R13 build carried the same). Verified at the capped
  1920 (the 1344 zoom) with input-synthesized gestures: a 900px
  scroll-through from above catches exactly at the Brand rest (one
  clamp write, settle 1215); a 1500px gesture from Brand lands
  exactly on Visibility (one engine, never two); a 20px nudge settles
  back and a 100px flick commits forward; reverse paging one rest per
  gesture from Reception; free exits at both ends (no snap-back at
  615 above / 4503 below); the pull-in from below catches at the
  Engagement rest; teleports to any position re-origin cleanly with
  the island writing nothing; tsc clean. One test artifact recorded
  for future QA: **instant programmatic `scrollBy` steps each fire
  their own `scrollend`** in Chromium, so a step-scripted "burst"
  reads as many one-step gestures and walks the origin — paged
  behavior must be exercised with real or input-synthesized gestures,
  never `scrollBy` loops.
- **R21 (owner re-ruling at the eighth build review, 2026-09-06 —
  the stack-carousel brief).** The static stacks become carousels
  (§5 amendments at their values; the redrawn 384/768 anchor frames
  and the `engine-visual` set `791:36057` are the source, every
  geometry fact read fresh at rendered bounds through the bridge):
  **(1) rt auto-progresses like rd** — each panel's visual runs the
  5000ms clock (a↔b loop, the one blur + rise grammar), counting only
  while the visual is substantially in view; the indicator is the
  drawn **vertical** breadcrumb (the same component rotated −90°:
  6 × 56, two 6 × 24 tracks, gap 8, fill growing downward, at the
  drawn left 29 / bottom 32 of the visual). **(2) base/rs swipes** —
  the visual is a two-cell horizontal track under a pointer drag with
  a horizontal intent lock (8px; `touch-action: pan-y` keeps vertical
  scroll native); the track and the horizontal indicator's b fill
  follow the finger 1:1, the release commits past **0.15 of the
  stride** or a **0.3 px/ms flick** (direction-committed, the R14
  posture) and settles on the carousel-snap clock. **(3) the rest
  state is the `a` drawing** — the frames now mount `-01` with the
  `slide1-finish` breadcrumb; R1's b-mount is superseded (the 018 R7
  precedent — the file is the latest intent), and no-JS renders that
  drawn rest. Fresh-read corrections and records: the **fill law is
  the drawn `max(6, 24·f)`** (the mid keyframe reads 12 = 24 × 0.5;
  the first build's linear 6 + 18f corrected in the shared
  vocabulary); the indicator's 24/6/8/6 are **material constants at
  both drawn anchors** (the rd2 card indicator keeps the zoom); the
  mirrored **29/32 offsets** (md left 29 / bottom 32 · xs left 32 /
  bottom 29) read like a rotation-pivot artifact — flagged with
  design, built as drawn. Build rulings recorded: after the first
  swipe engagement the b track rests at its drawn minimum dot (the
  `slide2-start` vocabulary; the pristine render carries none); the
  rt fill resets from full (the drawn sample) to the riding clock
  when a visual first arms — momentary, the timer grammar. Assets:
  **ten `-01` md/xs cuts exported through the bridge** (1416/704,
  bounds cropped to canon; thirty placeholder files total; the
  engagement pair carries the G10 stub — **the stub now rests
  visible below the rd gate**, raising G10's priority with the
  native-visual pass). The §8 one-island contract holds — the same
  island drives all three modes off the container width (never
  matchMedia); a mode change re-arms the stacks at the drawn rest.
  Verified under 768 and 384 emulation against the owner's server:
  rt — the vertical indicator at its drawn geometry (6 × 56, tracks
  6 × 24), the clock pausing off-view and riding in view, the swap
  to b on the beat with track one full and track two riding; 384 —
  the horizontal indicator at its drawn geometry, the track
  following a drag 1:1 (fill 0.26 at 100px of the 385 stride), a
  41% release committing to b (track settled at exactly one stride,
  fill full), the swipe back returning with the fill draining, and
  a slow 32px nudge settling back uncommitted; tsc/lint clean (the
  standing `<img>` warning only); the standing sweep green against
  the owner's server.
- **R22 (owner rulings at the ninth build review, 2026-09-06 — the
  swipe refinements; the owner's rest-state mock).** Two same-day
  refinements on R21's base/rs swipe: **(1) the b track rests
  EMPTY** — at slide 1 the indicator is the full first pill beside a
  bare second track (the owner's mock; R21's "minimum dot persists
  after engagement" ruling is superseded). Below the rt gate the b
  fill carries **no minimum floor**: it rides the swipe from nothing
  (24 · f) and drains back to nothing, so the settle animates
  continuously to the drawn rest. The rd2 card and the rt vertical
  indicator keep the timer grammar's floored law (max(6, 24 · f)) —
  the minimum dot is timer vocabulary, not swipe vocabulary. **(2)
  the swipe transition is a blur + slight lateral wipe**, not a
  full-width slide — kin to the larger bands' blur + rise (the R3
  one-grammar posture, axis per band): the two drawings stack at
  every band (the R21 200%-slide track is superseded) and swap on
  the stage values turned horizontal — incoming from
  rise(24) · direction, outgoing to drop(−12) · direction, blur 8,
  the direction following the gesture (forward from a, backward
  from b; `--e2-sdir` carries it for the CSS settle). Mid-drag the
  island scrubs the values inline with the drag's away-ness; the
  release clears the scrub and the CSS stage clock (500ms) settles
  the drawings and the fill together — the fill's settle moved from
  the snap clock to the stage clock on the same beat. Reduced
  motion: no mid-drag scrub (the resting drawing holds), the fill
  still rides the finger (direct-manipulation feedback), the commit
  renders state-to-state. Verified under 384 emulation against the
  owner's server: the pristine rest reads track one 24 / track two
  0 wide with b hidden at translateX +24 blur 8; mid-drag at
  q 0.31 — a at opacity 0.69 / blur 2.5 / x −3.7 (drop · q), b at
  opacity 0.31 / blur 5.5 / x +16.5 (rise · (1 − q)), fill 7.5 =
  24 · p; the release commits to b (fill 24/24) and the return
  swipe mirrors on the left axis, draining the fill to the empty
  rest; tsc clean; the standing sweep green.
- **R23 (owner rulings at the tenth build review, 2026-09-06 — the
  seam pass; the `911:103458` scroll-state redraw, read fresh at
  rendered bounds through the bridge).** Two defects at the
  engines→work seam: **(1) the seam hairline was missing** — the
  redraw draws it as the **work section's frame-wide 1px `border/000`
  top rule** (an INSIDE stroke; the work-header at the redraw's
  y 113 = 1t + the line). It is a plain flow rule — never pinned —
  riding up with the approaching work section and resolving flush
  under the engine section's sliver row exactly at the carousel's
  apex (the owner's articulation: hairline A is the active box's
  bottom border riding the column; hairline B resolves at the seam
  when the last box's bottom reaches A). Built work-side (021 §1/§2
  amended, §9 B9): border-box + border-top at the rd gate, the 7t
  flow height held, the content the drawn 1px lower. The engines'
  sliver row stays strokeless (R14 holds); rt/base carry no drawn
  top rule (the stack's last visual draws that seam). **(2) the slug
  rule held 7t past the apex** — its sticky containment was the
  whole section, so the frame's top rule stayed frozen at the pin
  line while everything else departed (the orphaned rule over bare
  paper). Re-scoped with the pinhost pattern: the slug row rides an
  absolute host ending **exactly 7t** above the section's bottom,
  with a 1t flow spacer keeping the document height. *(Corrected the
  same evening at the owner's hairline review — the first cut's
  7t + 1px "sync pixel" released the slug one scroll pixel EARLY,
  stacking its border above the panel's for a doubled top rule from
  the apex on; at 7t the release lands on the apex's pixel, where
  the slug's bottom border and Engagement's top border share one
  document pixel and depart merged.)* One release: at the apex the
  resolved frame — the slug rule, Engagement's bottom on the sliver
  line, the trailing cells, the seam rule — departs as one unit;
  re-pinning on reverse is symmetric. A second doubling found at the
  same review: the work top rule sat ADJACENT to the pinned
  lattice's bottom line (its 1px directly below the cells' last
  pixel — 2px on the east half); the standing line-inclusive
  collapse (`margin-top: −1px` on the work section at the rd gate)
  shares the pixel and returns the page to the tick. Verified on
  the composition at the capped 1920, by document pixel: at the
  apex slug border and panel-5 top border both read [89, 90] and
  300px past both read [−211, −210] (merged through departure); the
  work rule reads workTop = engBottom − 1 = the lattice line's
  pixel at rest and in motion; the work top border 1px `#e9e7dd`
  border-box, height exactly 7t; the reverse re-pin restores the
  shared pixel; tsc clean; the standing sweep green against the
  owner's server. A third correction the same evening (the owner's
  Safari report — the Engagement rest resolving **1px too low**: the
  doubled top rule and the stepped bottom-right seam): the island
  derived the pin line from the computed `--e2-pin-line` calc, but
  **Safari renders the pinned sticky a pixel off that computed
  value**, so every rest target aligned the column to a line the
  frame wasn't on. The rests now anchor to the stage's **rendered**
  position whenever it is pinned (the browser's own resolved sticky
  pixel is the truth; the computed value is the flow-state
  fallback). Two hardenings landed with it: the snap's ±1px dead
  zone is gone (a gesture end always corrects to the exact rest —
  sub-pixel offsets write the target directly, covering Safari's
  fractional momentum ends), and the island re-measures its
  geometry at every gesture end so late layout settling above the
  section cannot leave the rests on a stale origin. Verified in
  Chromium (no regression: rendered pin = computed pin; the
  fractional-end simulation corrects to the exact rest; the borders
  read shared — 89/90 top, 762/762 bottom seam, 873/874 work rule).
  **The owner's Safari re-check still read every left panel resting
  1px low — the rendered-pin anchoring did not resolve it, and the
  owner parked the chase (2026-09-06). OPEN FLAG, the build-QA
  class: Safari resolves the rest-vs-frame alignment differently by
  1px through a mechanism not yet isolated (the hardenings above
  stand — they are correct in themselves and Chromium is exact).
  Candidates for the next session: per-element sticky rounding
  divergence inside the frame, or Safari's flow-position rounding of
  the column against integer scroll.**
- **R24 (owner re-ruling at the eleventh build review, 2026-09-06 —
  the free-scroll promotion; supersedes R20's paged snap).** The
  scroll contract is **free and distance-mapped**: the island never
  writes scroll — the R20 paged clamp, the gesture-end snap glide,
  the burst/origin model, the capture margin, the commit threshold,
  and every input listener (wheel/touch/key/scroll/scrollend) are
  deleted. The stage has **ten scroll stops, one per drawing**:
  `state = round(s / halfStride)` over the ten states, halfStride =
  half the 6t engine panel — each engine's `a` shows while its copy
  is aligned with the stage and its `b` shows mid-travel toward the
  next engine, so **one pass plays all ten drawings** as a stepped
  sequence on the one R3 grammar. **Hysteresis 0.6** half-strides
  from the current state's center (resting near a boundary never
  flutters); a raw-index jump past **1.5** goes straight to the
  nearest state (teleports, anchor jumps, fast flicks — the swaps
  coalesce, CSS transitions retarget mid-fade). **The R19 timer
  becomes the idle cycle**: distance mapping runs only on moving
  frames (idle epsilon 0.5px/frame); on idle frames the a↔b flip
  runs within the current engine's pair every 5000ms from whatever
  state the mapping chose (the R19 reset-to-`a` rule is retired with
  the rests it assumed). The R23 rendered-pin anchoring carries
  forward **per-frame**: s derives from rendered positions every
  frame (the pinned stage's rendered top preferred, computed top the
  flow fallback), replacing R23's gesture-end re-measure — the free
  contract has no gesture ends, and stale geometry can no longer
  shift the mapping. R23's snap-specific hardenings (the sub-pixel
  glide write, the ±1px dead-zone removal) die with the glide; the
  **R23 OPEN FLAG (Safari 1px rest alignment) is mooted** — with no
  rests and no scroll writes there is no rest-vs-frame contract to
  misalign, only the sticky elements' own rendering. The paradigm
  was proven on two sandbox routes first (the dwell-timer variant
  showed the structural miss — free scroll removes the dwell, so a
  pass-through never showed the `b` drawings; the distance-mapped
  variant fixed it), promoted to the canonical island, and the
  sandboxes deleted; `/engines-next` and `/engines-free` retired,
  **`/engines-free-2`** kept as the QA route mounting the canonical
  section (§8 amended). Stacks (R21/R22), the indicator grammar, the
  lit dots, decode priming, reduced motion (quantized fill,
  state-to-state swaps — nothing else remains to still), and the
  no-JS document are unchanged. Verified against the owner's server
  at 1344: the slow walk plays states 0→8 strictly in order across
  the four travels (state 9 sits past the last rest, covered by the
  idle cycle and reachable on the way out); a 3.4-panel jump holds
  its exact landing for 80+ frames (no write-back) with the stage
  following live; ±4px jiggle on a state boundary holds one state
  for 60 frames; the idle flip fires at 5s on a parked rest;
  tsc/lint zero. **Tuning pass pending (owner: "then we will tune a
  little bit")** — the QA-tunable class: HYST, JUMP, IDLE_EPS_PX,
  CAROUSEL_MS, and the last engine's `b` boundary bias. *(The pass
  landed the same evening — R25.)*
- **R25 (owner tuning rulings, 2026-09-06 — the R24 dial-in, ruled
  on the lap vocabulary).** Three rulings: **(1) hysteresis 0.6 →
  0.5** — the boundaries sit at each lap's exact quarter points, so
  a→b fires 25% into the travel toward the next engine and the
  handoff at 75%, symmetric both directions (the 30/80–20/70 split's
  dead band is gone; the strict-inequality boundary and the CSS
  swaps' mid-fade retargeting absorb an exact-line crossing). **(2)
  The auto progression is REMOVED at rd** — R24's idle cycle is
  deleted (the idle epsilon with it); scroll is the rd
  construction's whole interaction, no clock of any kind. The
  indicator loses its countdown meaning and reads the drawn
  slide-start keyframes **discretely**: slide a holds slide1-start
  (the minimum dot on track one — the resting look; the lit dot
  carries the active distinction), slide b holds slide2-start (track
  one full beside track two's minimum dot). No fill animates. The
  rt stack timer and the base/rs swipe are OUT OF SCOPE (owner:
  "we'll deal with 384 and 768 later") — the stacks keep R21/R22
  unchanged, CAROUSEL_MS now serves them alone. **(3) The 05a→05b
  boundary biased 0.6 → 0.3 half-strides** past the Engagement rest
  (≈202px → ≈101px at 1344; the fraction rides the tick) — the last
  `b` lands just past the final rest instead of deep in the pin's
  release. The boundary MOVES for both directions (up-commit and
  down-commit agree at 0.3) — a one-sided bias would have inverted
  the hysteresis into a per-frame flutter band. Verified against
  the owner's server at 1344 on a 4px-step walk: the a→b swap
  detected at s = 176 and the handoff at s = 512 — the 168/504
  boundaries (25%/75% of the 672 lap) within step granularity
  (previously ≈202/538); a 5.6s park on the Ads rest holds its
  state (no flip — the clock is gone); the Engagement `b` detected
  108px past the final rest against the 100.8 boundary;
  tsc/lint zero.
- **R26 (owner direction, 2026-09-08 — the nav's engine anchors;
  paired with spec 005 §9 F19).** The nav's Solutions subitems and
  mobile Solutions chips now target the section's engines directly:
  `/#engine-<id>`. The mechanics, both constructions from one hash:
  **(1) The ids live on the stack panels** (`.e2-spanel`, one
  `engine-<id>` each — an id cannot repeat on the rd column's panels,
  and the nav's mobile chrome shares the engines' 860 gate, so a chip
  click always finds its id visible). The panels carry
  `scroll-margin-top: knav-bar-h + t/2` — the jump clears the fixed
  rail by the half-tick clearance ruling. **(2) At the rd bands the
  stack is display:none and the browser cannot place the jump; the
  island scrolls the column to `s = k·stride`** (the target engine's
  panel at the pin line) on the arrival hash and on every
  `hashchange`; the R24 mapping's JUMP path then resolves the state
  to the engine's `a` drawing. This is the island's one scroll
  write — a navigation, not the mapping; R24's free-scroll contract
  (never write scroll on the mapping clock) stands. A repeated click
  on the already-current hash at rd fires no `hashchange` and is a
  no-op (native anchors at the stack bands do re-scroll; accepted).
  No geometry changes; the sweep is untouched.

*At the three drawn anchors, the two derived-band anchors, and one
arbitrary mid-band width per band, scrollbar forced on; the interactive
checks at rd2/rd1, the static checks at rt/rs/base.*

*(Re-verified 2026-09-06 under the §9 R19 carousel re-ruling. The
runway-dependent language below reads per its R19 supersessions: the
mapping item's runway rests and one-gesture semantics are superseded
by the timer beats and the gesture-end snap — **paged** since the
same-day R20 re-ruling: one gesture, one engine, pronounced entry,
free exits; the anatomy item's 52t reads 32t (31t body + the slug
row); the indicator item reads the two-track timer scrubber; the
spacer line is moot — no spacers exist and the JS/no-JS documents are
identical. Since the same-day R21 stack re-ruling, the copy-canon
item's "-02 visuals / no indicator in the stacks" reads per §5 as
re-ruled: the stacks rest on the `a` visuals with the drawn indicator
(vertical at rt, horizontal at base/rs) and their carousels run on the
same island. The R19–R21 entries carry the full re-verification
records. Re-ruled again 2026-09-06 — §9 R24: the paged semantics are
retired; the mapping and snap items read per R24 — ten distance stops
riding free scroll, no snap points, no gesture clamp, the idle cycle
replacing the settled-rest timer. R24 carries that re-verification.)*

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
