# Marketing site rebuild — plan

New-brand rebuild of the Keystone corporate site. Complete visual and structural
rebuild; the Keystone data/API layer (`@keystone-sites/core` · `services` ·
`widgets`) is retained. Since 2026-08-27 the rebuild is the **only site in
this tree** (the old-brand code was purged — see the decision log); the old
site ships from `main` until the rebuild launches, and launch is
**big-bang** — nothing deploys until the site is complete.

Sitemap: Home · Our Work · Solutions · Pricing · Company · Resources.
First page built: Home. Every page, at every viewport width, sits on the global
grid system.

---

## Sources of truth

In order of authority; when two disagree, the higher one wins.

1. **The live Figma file** `ks-MarketingSite` (IBO39siJYDhiCRtuLWUTW2), read
   through the Figma MCP (`get_metadata` / `get_design_context` /
   `get_variable_defs`). All geometry, type values, and exposure maps are read
   from node data at spec- and build-time — never from screenshots, never from
   prior extractions.
2. **`reference/GRID-SPEC.md`** (v5) — the grid system mechanics. Law for *how*
   the grid is built; contains no content values.
3. **`reference/TOKENS-HANDOFF.md`** — the token architecture (extracted
   2026-08-22). Values are re-extracted from Figma variables before building
   (its §9 has the snippets).
4. **Font binaries** — axis/instance facts read from the `.woff2` files
   directly (see spec 001).

Other pre-work artifacts in the grid playground (earlier prototypes and
extraction notes) are **not** inputs. The one exception is `keystone-v5.html`,
which GRID-SPEC.md names as the reference implementation of the mechanics —
consulted for patterns only, never for values.

## The five anchors

| anchor | tick | Figma node | band gated |
|---|---|---|---|
| 384 | 32px | `230:12906` — `16x32x12 @ 384 wide` | base CSS (no switch) |
| 576 | 48px | `359:29494` — `16x48x12 @ 576 wide` | `rs` |
| 768 | 64px | `142:4180` — `16x64x12 @ 768 wide` | `rt` |
| 960 | 80px | `142:3151` — `16x80x12 @ 960 wide` | `rd1` |
| 1344 | 112px | `378:34835` — `1344 - Homepage` | `rd2` |

Verified against node data 2026-08-22: every section top lands on a whole tick
at every anchor, every anchor's page total is whole-tick (384: 101t · 576:
74t · 768: 54t · 960: 52t · 1344: 52t), and the lattice is drawn as 1px
`border/000` cell
strokes. Two earlier anomalies were fixed in Figma the same day and
re-verified from node data: the 768 footer is now whole-tick (15t) and the
384 frame's prototype-only iPhone chrome was removed (frame resized to 3232).

## Decision log — 2026-08-22

- **Rebuild in place** on `new-brand-marketing-site`; old site remains live on
  `main` until cutover.
- **New spec series** under `docs/rebuild/specs/`, numbered from 001. Ticks,
  anchors, and cells are the permitted numeric vocabulary — they are this
  design's language (the Figma frames are named in them). The old series
  (`docs/specs/001–056`) describes the old site and stays frozen.
- **Container queries, not media queries**, gate the bands. One width source
  (the page container) for both structure switches and interpolation weights;
  eliminates the scrollbar kink GRID-SPEC.md §2 accepts. The grid-engine phase
  re-verifies the v5 mechanics under this substitution.
- **Light mode only.** Dark-mode token values exist in Figma; they are not
  wired or shipped in this build.
- **Above 1344: pure zoom** (everything rides the tick, uncapped), per
  GRID-SPEC.md §2. Below 384 the base band's interpolation line extrapolates
  downward.
- `docs/rules/rules.md` gets a revision for the rebuild when development
  starts (see "Rules deltas"). Interim protection added 2026-08-22: a
  supersession banner atop `rules.md`, a rebuild-first pointer in the README,
  and a repo-root `AGENTS.md` routing agents here.

## Decision log — 2026-08-25

- **The rules revision landed** (`docs/rules/rules.md`). The "Rules deltas"
  below are folded in, plus the laws and practices specs 002–006
  accumulated: the grid/type laws (hold-then-switch, the tick wins,
  derived states, audits at rest, band-constant weight/tracking, the
  material/tick-riding/chrome taxonomy), the motion-grammar policy
  (reuse before inventing, promotion at second consumer, alias-never-fork,
  open/close asymmetry, reduced-motion state-to-state), the Figma
  verification protocol (metadata blind spots, rendered bounds through
  the console bridge, stroke-alignment artifacts, the flag→fix→re-read
  loop, pre-build token re-extraction), the rebuild spec conventions
  (template, acceptance preamble, dev route per spec, island/bundle
  criteria), the amendment protocol for post-approval changes, the
  CSS-dot precedent, and the art-directed image-tier doctrine.
  `AGENTS.md` carries the agent-facing digest.

## Decision log — 2026-08-26

- **Nearest-anchor rendering adopted** (spec 002.r1), from the design
  owner's mid-band quality review on real Phase 5 content: structural
  gates move from the anchors to the bands' geometric midpoints
  (470 · 665 · 860 · 1130); above a gate the upper anchor's design
  renders compressed (worst-case zoom drops from +50% to ~±20%); in a
  compressed slice the weights collapse to a pure zoom of the slice's
  anchor, so wrap counts and designed clearances hold by construction.
  Type steps down at gates — invisible to fixed-width devices,
  accepted. The anchors render unchanged.
- **The four units** (002.r1 §4): geometry rides ticks, text columns
  ride the weights, line-internal spacing rides the type in em,
  material stays px. Constants that reference `--t` or the weights are
  declared on `.page`, never `:root`. The hero's constants were
  converted (006 carries the amendments); remaining sections are
  audited as they are touched.
- **Choreographies settle** (002.r1 §5): the load orchestrator ends its
  run explicitly (`v2-settled` on the last beat), so band-gated
  display variants never replay animations on resize.
- **Image tier cuts follow the structural gates** (006/007 §5
  amendments) so each band's crop shows wherever its design renders.

## Decision log — 2026-08-27

- **Phase 5 is complete** (specs 006–009 approved, built, and verified;
  the fixture stacks five real sections and the footer). **Spec 010
  drafted** for Phase 6 from fresh reads of the five anchor frames,
  every section top and page total verified against rendered bounds
  the same day: page totals **101 · 74 · 53 · 51 · 52** ticks (the
  2026-08-26 1t card reductions at 768/960 stand; 010 §2 is the
  current record).
- **The 002.r1 harness erratum found at review**: the `/grid` sweep's
  band classification kept the anchor floors when the engine gates
  moved to the midpoints, so the sweep fails at compressed-slice
  widths (470/1150) against a correct build. Recorded in 002.r1
  (§6 amendment, §7 R7); the fix is specced in 010 §3 with the
  page-level self-test.
- Phase 6 needs **no design inputs** beyond the launch gates already
  on record: the testimonials content pass (009), and 010 §7's flags —
  F1 (nav/footer targets to unbuilt routes) resolved same day by the
  owner: **ship 404s**; F2 (the `/` metadata copy, og-image, and theme
  colors — old-brand today, full inventory in 010 §7) stays open for
  design's content decision.
- **The old-brand site was purged from this branch** (owner decision,
  same day — "it's a big bang, it's always been a big bang"). Nothing
  deploys until the new site is complete, so the cohabitation bought
  nothing and cost real friction (the old root chrome, head preloads,
  and global CSS underneath every v2 route; two design systems in one
  tree). Deleted: every old route and page, the old `design-system/`
  tree, `lib/`/`data/`/`config/`/`types/`, the old assets, scripts,
  and explainers, `@keystone-sites/legacy`, Tailwind, and all old UI
  dependencies. Kept: `design-system/v2/`, the dev routes, the
  chat/form API routes on the current packages (`core` · `services` ·
  `widgets`), the v2 assets, and both spec series (the old series is
  a frozen record). Rewritten from scratch: the root layout (v2-owned
  — light guard, light theme-color, v2 font preloads), a v2 `base.css`
  carrying the reset contract the sections were verified under, the
  scroll lock (`v2/lib/scroll-lock.ts`, no animation-engine branch),
  and the homepage as a shared composition (`v2/home.tsx`) mounted by
  both `/` and `/home-fixture`. Verified post-purge: tsc/lint zero,
  the production build green (18 routes; `/` 128 B route JS · 111 kB
  first load, static), the grid sweep byte-identical to pre-purge
  (anchors pixel-exact; only the known 002.r1 R7 failures), and the
  page visually verified in the browser at desktop and phone widths.
  `docs/rules/rules.md` was revised the same day for the v2-only tree.
  Spec 010 (draft) carries the revision for Phase 6's changed shape.
- **Phase 6 is built** (spec 010 approved and implemented the same
  day). The token layer re-extracted first (001 rule): one drift —
  `text/xl/Light` paragraph spacing 0 → 12 — flowed through the
  tokens, no consumer. The harness realigned to the 002.r1 gates
  (010 §3.1; two build errata amended in place — the
  compressed-slice weights identity and the negative-wB probe); the
  §2 page table ships as the expectations module and the devtools
  audit the real homepage on `/home-fixture` (sections carry
  `data-landmark` now); the sweep runs both routes at the five
  anchors + ten slice widths through every rest state — green in one
  run. Budgets measured on the production build: `/` 128 B route
  JS · 111 kB first load · eight islands · static; CLS 0.000 and
  TBT ≤ 28ms everywhere; LCP 1.12s at the desktop class but
  **5.3s at the mobile classes** — the LCP element is the H1 under
  the 006 hydration-gated cold-load guard, not the predicted hero
  image; recorded as **010 §7 F5, an open launch gate** (owner:
  re-baseline the budget or commission a 006 pre-hydration
  orchestration revision). The devtools now swap to a null stub in
  production through a webpack alias (010 §7 R6), keeping the QA
  mounts out of every production graph (`/grid` route JS fell to
  134 B). Reduced-motion and no-JS render the settled page at
  101.000t. Phase 6 ends with the homepage done; work shifts to
  Pricing.
- **The launch checklist is a living doc** (owner direction, same
  day): [`docs/rebuild/launch-checklist.md`](launch-checklist.md) —
  extracted from spec 010 §5 (which carries the dated amendment and
  stays the frozen record). It tracks the gates (incl. the open F2
  metadata wipe and the F5 mobile-LCP decision), the launch steps,
  the rollback line, and per-page completion status; every page
  completion updates it in the same commit.
- **The old-URL surface at launch** (blog, services, case-studies, …)
  — 010 §7 F3, resolved by the owner the same day: **pure 404s, zero
  backwards compatibility**. No redirect map, no legacy URL support.
  All 010 flags are now settled (owner, same day): F4 — Login points
  at the external console (`https://console.localkeystone.com/login`,
  implemented in the nav and footer); F2 — a **pre-launch metadata
  wipe** replaces the title/description, og-image, and manifest colors
  in one pass once all pages are done (a 010 §5 launch gate, not a
  Phase 6 question). Phase 6 does not launch: after it, work shifts to
  the remaining pages, **Pricing next**; several old paths (like
  `/pricing`) return as rebuilt pages, and whatever never returns
  stays a 404.
- **Spec 011 is approved and built** (same day): the token layer
  re-extracted first (001 rule — the three teal stops 150/450/650
  landed, no other drift across primitives, semantics, effects, and
  text styles); every §1/§2 value re-verified from rendered bounds at
  build; the `PricingButton` primitive, the seven list icons, the
  pricing-offer section (zero islands, born settled), and the
  `v2/pricing.tsx` composition on `/pricing` + `/pricing-fixture`
  landed; the cell-slide grammar promoted to tokens/motion.css at its
  second consumer. The audit sweep passed at the four designed anchors
  and ten slice widths (landmarks whole-tick, wrap counts
  band-constant). Two §9 build records: the rm mosaic circle's fill
  reads 100% (the draft's 80% amended in place) and the rs derived
  band's built totals (37t; list 10t) await design's manual
  evaluation — the one open item, plus the standing F2 hygiene flag.
  Same-day design review of the built section landed seven revisions
  (011 §9 R13, all re-read from the file): revised button hover
  states on a re-inked `teal/450` and the new `teal/550` (replacing
  650), lattices behind content, the button circle joining the
  cell-slide, the slide triggering on the button only, the container
  hard shadow, the material chat label, and left-box-only list
  shadows with the right box behind. Two further review passes the
  same evening: the button lattice re-architected tick-riding so it
  registers with the page grid (R14), then the whole button made
  proportional — drawn in cell units, scaling with the tick (R16);
  the list boxes went line-inclusive to kill doubled hairlines
  (R17). **Design then drew the 576 frame** (`634:33130`) — the rs
  band is designed, not derived (011 §1 amendment, §9 R15): a new
  layout (card 6–11 over a 22t section, the list pair 8t/7t at +2t,
  one chat row) and a new `size=sm` button in the set; built and
  audited from fresh reads the same day.
- **The Pricing page is planned as specs 011–013** (owner review
  2026-08-27, from fresh reads of the Pricing section `619:26832`):
  011 the offer (header · $50 card · included list · chat rows), 012
  the price scale + persona carousel (one spec — the slider and the
  carousel are two-way linked), 013 the FAQ. The composition module
  (`v2/pricing.tsx`) mounts on `/pricing` plus the noindexed
  `/pricing-fixture`; the page-level expectations and sweep leg land
  with 013. Design supplies **four anchors** here — 384 · 768 · 960
  (drawn 2026-08-27) · 1344 — and **the 576 anchor is derived** from
  the 384 design (011 §1.1) and evaluated manually on the built page;
  persona image exports gain their new size tiers now that 960 is
  drawn. Behavior decisions on record: the slider is three states
  with a gentle snap; the carousel also moves by click/swipe and the
  slider follows; both Start-today CTAs go to the checkout link (one
  named constant); the talk-to-us buttons toggle the **chat widget —
  an unbuilt dependency** that ships inert on the 006 `open-chat`
  contract until its own spec lands; the card-mosaic circles shift
  one cell on the nav card grammar (promoted at this second
  consumer); FAQ drawers reuse the footer draw-down grammar. Six
  file flags from the planning review were fixed by design and
  re-read the same day (011 §9), and the pricing lattice inks were
  bound to three new file variables — `color/teal/150` · `450` ·
  `650` — through the console bridge.

- **Spec 012 is drafted** (late evening, from fresh reads of all five
  anchor frames, every landmark verified against rendered bounds — the
  rs 012 rows are designed in the redrawn 576 frame, so all five
  anchors are designed for this section). The design's simplified
  scaling system reads clean: the price-scale box is 5t×7t at
  rt/rd1/rd2 (10t-wide/10t-tall variants at rm/rs), card boxes and
  image bands are exact tick multiples at every size, and the FAQ top
  sits card-box end + 2t at every band. New sets specced:
  `persona-card` (persona × size × state, 30 variants; inactive cards
  are translucent ghosts the lattice reads through), `slider` (3
  states × 3 sizes, proportional over width per the 011 R16
  taxonomy), `pricing-tag`. Interiors ride the weights as band
  constants (the grid-digest law) — no fixed-px defects this pass.
  The persona exports landed (three personas × five tiers, incl. the
  new sm/lg for the 576/960 bands). Seven draft flags with design
  (012 §9 F1–F7): the off-grid rd1 carousel container, three chip
  orders in one file, copy-canon slips, unbound inks/effects (incl.
  an off-doctrine soft shadow on the cost cards, not built), the
  Sales-calls 600-ink outlier, naming hygiene, and the rm/rs frames
  not closing over their footers (24t at row 93 → 117t vs the 115t
  frame; 21t at row 49 → 70t vs 69t) — the frame fix is needed before
  013 is written. The rt/rm frame totals grew with the section (47t →
  48t · 114t → 115t); 012 §1 is the current record.

## Decision log — 2026-08-28

- **All seven 012 flags resolved by design** (morning; every fix
  re-read from the nodes — 012 §9 is the record). Fixed: the rd1
  carousel on its tick row, the cost-card soft shadow removed, the
  slider track bound `lightgray/300 → 500`, the notch bound to a
  **new `alpha/black-20` variable** (arrives via the pre-build
  re-extraction), the chip instances and rs block name trued, and
  **the rm/rs frames closed — 117t and 70t** (012 §9 F7 supersedes
  the draft's 115t/69t reads; nothing for 013 blocks). Decided as
  intent: the per-band chip orders (rag balance — the build renders
  each band's designed order, 012 §3 amendment) and the Sales-calls
  `orange/600` ink. Sanctioned as enumerated constants: the inactive
  cost fill and the slider thumb bevel. Copy residuals stay with
  design (the rd2 subhead apostrophe, the xl U+2028 breaks); the
  build's copy set is canonical. The spec awaits approval.
- **Spec 012 is approved and built** (owner approval, then the build
  the same day). The token layer re-extracted first (001 rule) —
  zero drift; the new `alpha/black-20` file variable resolves to the
  standing semantic token. Every §1/§2/§3/§4/§5 value re-verified
  from rendered bounds at build. Landed: the fifteen persona tiers
  into `public/media/personas/` + the media registry; three new
  primitives — `Slider` (proportional over width, the native range
  carrying the semantics), `PersonaCard` (prop-driven, var-driven
  interiors riding the section's band restatements), `PricingTag` —
  plus the verbatim `IconSliderArrow` export; the pricing-scale
  section with **one client island** (the §6 three-state machine:
  slider drag/track/keys, strip swipe, card-overlay clicks, all
  writing one k; the snap on one 450ms clock; the shadow on the
  005/009 law); the `/primitives` catalog rows; the splice into
  `v2/pricing.tsx`. Four build errata amended in place (012 §9
  build record): the chip radius steps 2/2/2/2/4, the head's
  designed U+2028 break (built explicit — natural wrap cannot
  reproduce it at rm), the active/highgrowth service-chip order,
  and the unspaced highgrowth estimate (spec copy canonical). Two
  island lessons: a carousel viewport must **capture the pointer
  lazily** (capture at pointerdown retargets the derived click and
  the overlay buttons never fire) and must **suppress dragstart**
  (a swipe starting on a card photo becomes a native image drag
  that cancels the pointer stream). Acceptance checked at the five
  anchors + nine slice widths; tsc/lint zero; the production build
  static — `/pricing` 2 kB route JS · 107 kB first load (011's
  island-less 141 B is the prior record), the homepage untouched.
  013 (FAQ + page assembly) is the remaining pricing spec.
- **Spec 013 is drafted** (morning, from fresh reads of all five
  anchor frames — every landmark, row height, and painted cell
  verified against rendered bounds; all five anchors are designed
  for the FAQ). The section reads clean: FAQ blocks at 012's section
  ends, six-question accordion (closed rows exactly 1t per band, 2t
  at rm; open +3/+2/+2/+1/+1t), a full-lattice 1t gap row before the
  footer at every band, the east staircase narrowing to its final
  rail. New set specced: `faq-question` (state × size, 10 variants);
  the drawers reuse the footer draw-down grammar and promote the
  rail-cascade stagger at its second consumer. The page half
  delivers the pricing expectations module, the `/pricing-fixture`
  sweep leg, and the **exposed-cell clearance assertion** (the
  standing harness gap from rules.md "Audits at rest"). Six draft
  flags (013 §9): **F1 — five of the six answers have no copy in the
  file** (every instance carries the set's default answer; the build
  gate), the ungrammatical rm/rs question-4 override, chat-row copy
  drift ("Talk to us." · "Got a question?" vs "Got another
  question?"), stale rt/rd1 chat instances, open-frame/anchor-frame
  ornament divergence, and the rs header's ±1 artifact. **All six
  flags resolved the same morning** (013 §9 is the record; fixes
  re-read from the nodes): the placeholder-answer decision (answer
  1's copy under all six questions, the 009 precedent — the content
  pass is launch gate G9), the designed short question-4 variant at
  rm/rs, the per-band chat labels as intent with the periods fixed,
  the rt/rd1 chat instances replaced/trued, and the open-frame
  hygiene fixed. The spec awaits approval.
- **The FAQ drawer-height law** (owner decision, late morning —
  013 §9 R7): the footer and the FAQ diverge deliberately. The
  footer's drawers are fixed chrome over content that never changes
  (its designed 004 constants stand); the FAQ is dynamic content
  (questions can be added; the G9 pass brings real answers), so its
  **open heights are content-derived** — the smallest whole-tick
  height with bottom pad ≥ top pad, measured by the island and
  re-derived on tick changes. Prompted by the drawn open states
  under-sizing the placeholder copy at rm **and** rs (the new 576
  open frame `634:36435`, read through the bridge the same morning,
  draws 3t with a 4px bottom pad vs 12 top; the rule derives 4t).
  The open frames demote to grammar archetypes; the §7.2
  `--drawer-extra` contract carries measured and designed drawers
  alike. Same session, the chevron measured (013 §9 R8): the set
  mounts the 16-grid icon resized to 12 with the stroke absolute at
  1.25, confirming the verbatim 12-viewBox export.
- **Spec 013 is approved and built** (owner approval, then the build
  the same day — the Pricing page is complete pending its launch
  gates). The token layer re-extracted first (001 rule) — **zero
  drift** across every layer. Every §1–§4 value re-verified from
  rendered bounds at build; three deviations found and amended in
  place (013 §9 build record): **question 4 is one canon** (the file
  superseded the morning's F2 band split — every anchor carries the
  short string), the rs header's right pad re-read 48, and the open
  md variant's question-row quirk (built as the constant row). Landed:
  the `FaqQuestion` primitive (+ catalog rows) with the 12-grid
  chevron export; the faq section with **one island** carrying the §5
  single-open machine and the **R7 content-derived heights** (the
  island measures the answers and publishes `--fq-open` +
  `--drawer-extra`; live derivations 6·4·3·2·2 with the placeholder
  copy); the rail-cascade stagger promoted to tokens/motion.css at
  its second consumer; the pricing expectations module; the
  generalized `data-drawer`/`--drawer-extra` audit contract (the
  footer adopted it, mechanics unchanged); and the **exposed-cell
  clearance assertion** on all three audited routes — closing the
  standing "Audits at rest" harness gap (rules.md updated). The
  assertion's first run surfaced the standing designed overlaps
  (declared in the expectations with citations) and **caught its
  first real defect: the 007/008 button-bars** collided with the
  east cells at compressed-slice widths (520/700) — fixed as errata
  in both specs (the bar mounts' button geometry rides the weight
  sum; anchors byte-identical). The sweep runs `/grid` +
  `/home-fixture` + `/pricing-fixture` green in one run — anchors,
  ten slices, every rest state incl. the FAQ single-open handoff and
  the 012 machine on each k. Budgets on the production build: both
  pricing routes static, five islands, `/pricing` 133 B route JS ·
  107 kB first load; the homepage graph untouched (111 kB; its route
  chunk +7 B from the footer's attribute adoption). Reduced motion
  snaps state-to-state; a no-JS render is the settled closed section
  with all six answers in the HTML. Remaining for Pricing: launch
  gates only (G9 content pass, G6 sign-off).
- **The Our Work page is planned as specs 014–016** (owner direction,
  afternoon, from fresh reads of the Our Work section `647:41297`):
  014 the header + case studies (slug · h1 · subhead · CTA row · the
  three case-study cards) · 015 the gallery (the "The Gallery" header
  row · the nine-image mosaic at rt/rd1/rd2 · the horizontal strip at
  rm/rs) · 016 the fullscreen gallery overlay + page assembly (the
  expectations module and the fixture sweep leg). The composition
  module (`v2/our-work.tsx`) mounts on `/our-work` — the route the
  nav, footer, and the 007/008 button bars already target — plus the
  noindexed `/our-work-fixture`. **All five anchors are designed**
  (384 `454:23319` · 576 `648:43608` · 768 `447:21642` · 960
  `648:42365` · 1344 `429:10937`); the metadata reads are whole-tick —
  page totals **111 · 85 · 60 · 53 · 48**, every section top on a
  tick (case studies 17/11/8/8/7t · gallery header 75/53/29/26/22t ·
  gallery 79/56/32/28/24t · footer 87/64/45/41/37t) — with
  rendered-bounds verification at spec writing per the protocol (the
  console bridge was down during this planning pass). New sets in the
  section: `case-study-card` (`648:41389`, size xl/lg/md/sm/xs ×
  arrangement — alternating left/right image at md and up, centered
  stack at sm/xs; 8 variants, tick-true at 4/5/6/13/18t with 1t stack
  gaps) and `button-inline` (`648:41368`, default/hover/focus — the
  View-Case-Study CTA); the gallery-header CTA is the `_nav-button`
  grammar at rt/rd1/rd2 and a sm `button-fill` at rm/rs; the gallery
  mosaic interiors ride half-tick gutters (read at every drawn
  anchor — a designed interior, not an artifact). Behavior decisions
  on record: **the Get Started CTAs go to `/pricing`**; **the
  View-fullscreen CTAs open the fullscreen gallery overlay** — an
  updated, new-brand version of the v1 site's `/gallery` site-frame
  takeover (`main`, old spec 054: fullscreen takeover on a scrim,
  slim header with visit/close, Escape and the close control restore
  scroll) — the old `/gallery` URL itself stays a 404 per 010 §7 F3
  unless the owner says otherwise; the header's ghost-button +
  "Got a question?" pair reads as the 011 chat-row grammar (the
  inert `open-chat` contract) — confirmed at spec writing. **The
  asset exports landed** (`~/Dropbox/01-work/00-projects/01-keystone/
  03-website/03-newsite/ourwork`): the three case studies (zivel ·
  yhs · barelux) at all five anchor tiers, and the nine gallery
  images at three tiers — `gallery-lg` serving 768–1344, `gallery-md`
  576, `gallery-sm` 384 (design's tier direction). Planning flags,
  with design before the specs are written (the future 014 §9 records
  resolutions): **F1 — the 576 Grid lattice frame runs 10t past its
  footer top** (3552 vs 3072; every other anchor's lattice ends at
  its footer) — the frame fix is needed first; F2 — the exports are
  PNG (rules: WebP only) — re-export or convert at build; F3 — **no
  overlay frames exist in the file** — the fullscreen overlay needs
  design inputs (frames, or explicit intent to derive from the v1
  behavior under new-brand chrome); F4 — motion/behavior intent not
  yet received (gallery strip behavior at rm/rs — swipe/controls,
  card entrances, overlay open/close); F5 — the 768 header carries a
  hidden "Got a question?" layer (stale or per-band intent — verify
  at spec writing).
- **Four of the five Our Work planning flags closed** (same
  afternoon; fixes verified from the nodes and the export folder):
  **F1** — the 576 Grid lattice re-read 576×3072, ending at its
  footer top (rendered bounds through the bridge); **F2** — the WebP
  exports landed in `…/ourwork/export` (all 42 tiers: three case
  studies × five anchors, nine gallery images × three tiers); **F4**
  — gallery-strip intent received: the rm/rs strip behaves like the
  site's other carousels — swipe/drag with a snap to the active slot
  (the 012 pointer lessons apply); no card-entrance choreography
  supplied — 014 defaults to born-settled (the 011 §9 R10 precedent)
  and flags it at draft; **F5** — the hidden 768 "Got a question?"
  layer is gone (the node reads deleted from the live file). The
  bridge returned the same session and **every planning landmark was
  re-verified against rendered bounds at all five anchors** — the
  metadata tables stand unchanged (the 576 footer's x 0.5 / w 577
  read is the standing stroke artifact, read as 0/576). **F3 stays
  open by design's cadence** (owner, same session): the overlay
  files arrive after the page sections are built — needed only
  before 016 is written, from fresh reads then; the 014/015 builds
  do not block. Overlay open/close motion intent rides with that
  delivery.
- **Spec 014 is drafted** (afternoon, from fresh reads of the header
  and case-studies nodes at all five anchors, the two component sets,
  and the Grid layers — every landmark, card box, and lattice cell
  verified against rendered bounds; all fifteen card instances read
  for variants and copy). The section reads clean: tick-true card
  boxes (18/13/6/5/4t on 1t stack gaps), whole-tick image/profile
  splits, one copy set across the anchors, the `hard-shadow-square`
  effect style on every site image; the lattice is the pricing
  east-edge staircase (the 011 §2 construction), with the runs
  passing behind the cards as declared overlaps (the 013
  expectations pattern). Nine draft flags went to design/owner and
  **seven closed the same afternoon** (014 §9, every fix re-read
  post-fix): the rm "Talk to Us" casing, the H1 rag (intent — natural
  wrap in tick-padded boxes; two residual double spaces pend file
  cleanup), the "100k+" canon, the starred numerals' size stepping,
  the four east-rail holes, the paintless circles (owner: stay in
  the file, never built), and F8 withdrawn (a spec-author misread of
  the drawn-map convention — §2 rewritten to the 011 shape). The last
  two closed the same evening: **F1** — the rt slug weight re-fixed
  (the first fix hadn't landed) and re-read Medium; **F9** — the View
  Case Study CTAs link to **`/case-studies/{slug}`** (owner: the URLs
  live on the old site today and return as rebuilt pages — **a
  case-studies page design is ready and follows the Our Work and
  gallery work**; until it lands the routes 404 per the 010 F1
  precedent; slugs verified against `main`'s data modules). One
  hygiene residual: the rd2 H1's double space (nothing builds from
  it). **All nine 014 flags are resolved; the spec awaits
  approval.**
- **Spec 014 is approved and built** (owner approval, then the build
  the same evening). The token layer re-extracted first (001 rule) —
  **zero drift** across every layer (one observation: the `noise`
  effect style no longer returns from the file; no consumer). Every
  §1/§3/§4/§5 value re-verified from rendered bounds at build; the
  file had moved since the afternoon's draft reads — the rm/rs/rt
  case-studies frames were recreated under new node IDs (identical
  geometry) — and the §2 re-read surfaced two deviations amended in
  place (014 §9 build record): the rm r24/r33 widened cells read
  unpainted (the run is uniform 10–11) and **rt gained its closing
  square ■[11,28]**, completing the section-run pattern. One build
  erratum: the stat labels' two-line rag — natural wrap in the full
  cell width holds one line at the wide cells, so the labels wrap in
  a **min-content box**, which reproduces the file's per-word rag at
  every size with the canonical copy. Landed: the fifteen case-study
  tiers into `public/media/case-studies/` + the registry builder;
  the verbatim `IconStar` export; two new primitives —
  `ButtonInline` (the 4px paint-in-place glyph advance, the bg/400
  focus wash) and `CaseStudyCard` (size × arrangement, prop-driven,
  var-driven interiors riding the band restatements — the 012
  persona-card architecture) — plus their `/primitives` rows; the
  work-header and work-cases sections (**zero client islands** —
  hover is CSS, the CTAs links, the chat ghost inert on the 006
  contract); the `v2/our-work.tsx` interim composition on
  `/our-work` + the noindexed `/our-work-fixture` (nav · header ·
  cases · footer; 015/016 splice in as they land; placeholder
  title, the G4 wipe covers final copy). Acceptance checked at the
  five anchors + nine slice widths (every landmark whole-tick, wrap
  counts 4/4/3/3/3 and 5/4/3/3/3 holding across the slices, tiers
  media-gated per band); header and card renders compared against
  the file at every anchor — identical, incl. the rd1/rd2 CTA-row
  gaps and the two starred stats. tsc/lint zero; the full sweep
  green post-build (homepage and pricing untouched); the production
  build static — `/our-work` 832 B route JS · 105 kB first load.
  015 (the gallery) is next; the page expectations and sweep leg
  land with 016.
- **Two same-evening 014 revisions** (owner direction at the built
  page's review — the 011 R13 cadence; dated amendments in 014 §4 /
  §6.0, resolutions in the §9 build record): **the site-image
  stroke** (design added a 1px `border/000` stroke to the card set's
  image on all eight variants — read with its binding, built with
  line-inclusive trailing edges; seam scans verified single shared
  hairlines, and the pass corrected a first-build R17 miss on the
  row-mode profile's bottom border) and **the rises-only entrance**
  (the homepage load sequence minus the nav beat, the lattice sweep,
  and the highlight pass: the header elements and card 1 fade-rise
  on the 006 delays; card 1's shadow grows after its box lands — the
  shadow law — and that beat settles the run). The 006 orchestrator
  **generalized at its second consumer**
  (`load-orchestrator.tsx`, the final beat parameterized; `HeroLoad`
  wraps it, homepage untouched); the page opts in via its own
  `v2-choreo-rise` guard and gains its one island. Verified: six
  animations exactly, nav/lattice never animate, settle · replay ·
  reduced-motion · no-JS all green, landmarks re-pass at rest; the
  full sweep green after the orchestrator refactor (the homepage
  settle intact); budgets re-measured —   `/our-work` 1.17 kB route
  JS · 106 kB first load, still static, `/` and `/pricing`
  unchanged.
- **The page-load streamline** (owner direction, evening — design
  re-tuned how every page opens on the y axis before more pages are
  added; all fifteen anchor frames re-read, changes verified against
  rendered bounds). The header lines align across the three built
  pages: the homepage measures from the **H1** at rm/rs (not the
  wordmark above it) — hero header tops 69/73/80/112/160 (were
  67/99/88/144/152), putting the H1 on 100/112 at rm/rs and the
  rt/rd1 headers on the pricing/our-work line; the pricing rt header
  re-read **80** (was 96); Our Work is the reference and did not
  change. At the homepage 960 anchor the hero compressed 1t (carousel
  top 6t, tightened header gaps) and the whole rd1 stack rides up one
  tick — page total **51t → 50t** (010 §2 amended; the expectations
  module updated in step). Dated amendments + resolution entries:
  006 §9, 010 §7 R9, 011 §9 R24. A 960 Grid-layer 1t overrun found
  at the read was fixed by design and re-read clean the same evening.

## Phasing

Each phase covers **all five anchors** and is done only when its spec's
acceptance criteria are checked at every anchor and at mid-band widths.

- **Phase 0 — Foundations** (spec 001): tokens, fonts, brand marks. No layout.
- **Phase 1 — Grid engine + harness** (spec 002): the v5 mechanics under
  container queries, the exposure-region vocabulary, the lattice injector, and
  a permanent `/grid` dev harness with the self-tests. No real sections.
- **Phase 2 — Core primitives**: buttons (fill/ghost), the grader input,
  text/heading primitives wired to the interpolation weights. Needs component
  Figma nodes from design.
- **Phase 3 — Footer**: first real section; the most grid-native surface
  (cell fields, ornament cells, lockup, form) and the proof of Phase 1.
- **Phase 4 — Nav**: global chrome incl. the mobile menu (needs the menu-open
  design states).
- **Phase 5 — Homepage, section by section, top-down**: hero (+ carousel),
  portfolio gallery, engine accordion, testimonials. One spec per section;
  each spec covers all anchors, its exposure regions per band, its type
  interpolation, and its motion.
- **Phase 6 — Homepage assembly**: page-level stack-sum self-test, performance
  pass, launch checklist (delivered, not executed — launch is big-bang
  after all pages).
- **Phase 7 — Pricing, section by section, top-down** (specs 011–013):
  the offer (011) · the price scale + persona carousel (012) · the FAQ
  and page assembly (013). Four designed anchors; the 576 band derives
  per 011 §1.1 and is evaluated manually at build.
- **Phase 8 — Our Work, section by section, top-down** (specs 014–016):
  the header + case studies (014) · the gallery (015) · the fullscreen
  gallery overlay and page assembly (016). All five anchors designed
  (decision log 2026-08-28); the overlay's design inputs are the one
  open dependency (F3).

Subsequent pages (Solutions, Company, Resources) follow the same
per-section pattern — **Pricing first** (owner decision 2026-08-27),
**Our Work second** (owner direction 2026-08-28). A **Case Studies
page** joins the queue directly after the Our Work phase: its design
is ready (owner, 2026-08-28), and the 014 View-Case-Study CTAs
already target its `/case-studies/{slug}` routes. Launch is big-bang
after all pages are built.

## Spec cadence — just-in-time, never batched

Every phase is gated by its own spec, and **specs are written just-in-time,
one phase ahead at most** — never batched upfront. A spec is written only
when its sources are stable: the Figma inputs it cites exist and are
confirmed, and any mechanical lessons from the phase before it have landed.
The rhythm per phase:

1. Design shares/confirms the phase's Figma inputs (see next section).
2. The spec is written **from fresh MCP reads of those nodes at writing
   time** — never from memory of earlier reads, prior extractions, or the
   anchor-frame passes that informed this plan.
3. Spec approved → implementation → acceptance criteria checked at all five
   anchors and mid-band → next phase.

A spec written ahead of its inputs would be written from stale or guessed
values and would need editing later — which spec immutability forbids.

## Inputs needed from design, by phase

- Phase 2: component nodes for `button-fill`, `button-ghost`, `grader-input`
  — received 2026-08-22 (486:5251 · 90:8297 · 503:25844, plus the `icons`
  sheet 519:5431); specced in 003. 2026-08-23: design added grader error
  states, the `button-arrow` set (520:15542, incl. loading), and the
  expanded icon sheet — folded into 003. Nothing open for Phase 2.
- Phase 3: footer nodes are already in the anchor frames; confirm accordion
  behavior at 384 — received 2026-08-23: the open-drawer states at 384
  (268:31970) and 576 (525:20011) and the footer-item state set
  (523:19371); same day design fixed the 384 grader gap, the open-frame
  height, the 1344 lockup (now 8t), and the 768 heading gap (12, uniform);
  single-open accordion decided; drawer motion intent supplied (draw-down,
  chevron rotation, rail cascade — 004 §5). All specced in 004 from
  post-fix re-reads; nothing open for Phase 3 (004 §9 records the
  resolutions).
- Phase 4: nav nodes incl. mobile-menu open state — received 2026-08-24:
  the `_nav` component section (94:8739 — navRail, nav-item, nav-button,
  the marketing-nav set with desktop solutions/resources open states,
  nav-solutions-subitem, nav-drawer) and the Mobile Nav states
  (540:23937 — open, Solutions expanded, Resources expanded, at 384 and,
  added later the same day, at 576; the 384 frames were re-cut without
  iPhone chrome and "Our Approach" was dropped from the menu). Same day
  design added `icons/blog`/`icons/grader`/`icons/podcast` to the sheet
  and supplied motion intent (button-hover underline, subnav reveal
  cascade, hamburger icon swap, footer-grammar mobile drawers and panel).
  Later the same day design resolved all fifteen spec flags: 768 open
  states, full-height panels, rebuilt drawer groups (pinned labels),
  nav-drawer lg/md size variants, the 576 nav position, rail geometry,
  shadow tokens bound and re-inked `#554D44`, canonical engine colors,
  and the behavior decisions (desktop bar fixed; desktop triggers
  navigate and disclose). All re-read post-fix and specced in 005
  (draft); 005 §9 is the resolutions record. Follow-ups the same day:
  F16/F17 fixed, Visibility/Brand subitem copy reworded (set-wide), and
  the F18 stale drawer copy overrides cleared — all verified from the
  nodes; nothing remains open for Phase 4.
- Phase 5: `portfolio-card`, `engine`, `testimonial-card`,
  `hero-carousel-image` component nodes; per-anchor active/inactive states for
  the engine accordion; carousel/scroll motion intent; the gallery
  carousel-control node (see "Special cells" below). Hero inputs received
  2026-08-25: `hero-carousel-image` variants in the anchor frames, the
  hero motion intent (load choreography, chip highlight pass, carousel
  behavior), and the fourteen-frame image exports (WebP, six width
  tiers, re-cut same day at flag review) — specced in 006 (approved
  2026-08-25; all eight §9 flags resolved same day, fixes re-read
  post-fix, build-prep decisions in 006 §9). Phase 5
  specs are per-section (006 hero · 007 portfolio · 008 engine ·
  009 testimonials), written just-in-time as each section's inputs
  stabilize. Portfolio inputs received 2026-08-26: the eight-site
  exports (WebP, five width tiers, the 1344 tier serving from 1152),
  the motion intent (curtain-reveal entrance, hero pause, desaturation
  directive), the `grid-button` control set (590:18139), and same-day
  button-bar fixes (icon mapping, casing, 384 sizes, the rm second
  button) — specced in 007 (draft; all twelve §9 flags resolved the
  same day, fixes re-read post-fix, incl. the site names and the
  1t card-resize explanation for the 768/960 frame totals).
  Engine inputs received 2026-08-26: the `engine` component set
  (104:10164, engine × breakpoint — 21 variants; the 576 breakpoint
  carries visibility only), the collapsed-pill and engine-circle sets,
  the five-engine exports (WebP, five width tiers, washes baked), and
  the motion intent (the accordion spring reflow, pill dot-morph hover,
  sub-768 carousel with breadcrumb) — specced in 008 (draft; all eight
  §9 flags resolved the same day, fixes re-read post-fix, incl. the
  un-swapped 384 reception/engagement fills, the sanctioned 576
  derivation, and the curly-apostrophe copy canon). Testimonial inputs
  received 2026-08-26: the `testimonial-card` set (117:11219, color ×
  breakpoint — no 576 breakpoint, the 008-style derivation), the
  in-frame sections (strip at rm–rd1, the full-grid composition at
  rd2), and the motion intent (staggered fade-rise entrance, the hover
  hard-shadow, the ~6.5s auto-rotation with the grid-button pair) —
  specced in 009 (draft; all seven §9 flags resolved by design the
  same day — the 384 pads unified, the rd1 header box normalized, the
  header copy unified to one line at every band, the rs 768-unit
  derivation rejected in favor of a tick-true 576 unit with a 336-wide
  card, the resting offsets confirmed, the rs corner cell painted;
  every fix re-read post-fix, nothing pending — the draft is ready for
  approval). The photos and attribution are
  placeholders by design decision: the build exports the three images
  from the file at a single 672 tier, and a content pass replaces the
  copy before cutover.
- Phase 6: **no new design inputs** — assembly, self-test, performance,
  and the launch checklist (spec 010, drafted 2026-08-27 from fresh
  reads of the five anchor frames). What design owes is at the launch
  gates, not the build: the testimonials content pass (009), the
  pre-launch metadata wipe (010 §7 F2), and sign-off on the assembled
  page.
- Phase 7 (Pricing): the Pricing anchor frames at 384/768/1344 plus
  the 960 frame drawn 2026-08-27 (no 576 — derived, 011 §1.1); the
  component sets `pricing-button` (incl. the xs added at flag review)
  · `slider` · `faq-question` · `persona-card` · `pricing-tag`, all
  with the lg sizes added with the 960 frame; the nine pricing icons
  on the sheet (519:5431); the persona exports (multiply overlay
  baked; new size tiers arriving now that 960 is drawn — needed for
  012, not 011); motion and behavior intent received 2026-08-27
  (slider snap, two-way carousel link, mosaic cell-shift, FAQ
  draw-down reuse, CTA and chat-widget decisions). 011 is specced
  from post-fix reads; six file flags fixed and re-read the same day
  (011 §9). Still open for later specs: nothing for 012 except the
  new persona tiers; the chat widget is future work outside the
  pricing phase. For 013: the page expectations gain an
  **exposed-cell clearance assertion** — the sweep audits vertical
  stacks only, and the footer's rail collision hid in that gap until
  the 011 review (rules.md "Audits at rest", 2026-08-27).
- Phase 8 (Our Work): the five anchor frames — all drawn (384
  `454:23319` · 576 `648:43608` · 768 `447:21642` · 960 `648:42365` ·
  1344 `429:10937`); the component sets `case-study-card` (8
  variants) · `button-inline` (3 states), plus the standing
  `_nav-button` / `button-fill` / `button-ghost` reuse — received
  with the frames; the asset exports — received 2026-08-28 as WebP
  in the Dropbox `ourwork/export` folder (three case studies at five
  tiers, nine gallery images at three tiers — all 42 verified);
  gallery-strip behavior intent received 2026-08-28 (swipe/drag,
  snap to the active slot). F1/F2/F4/F5 closed the same day
  (decision log). Still open: **the fullscreen-overlay inputs (F3)**
  — design shares them after the page sections are built; needed
  before 016 is written. 014/015 have everything they need.

## Special cells — ornament and function on the lattice

Noted 2026-08-22 while verifying Phase 1. Some tick cells in the anchor
frames are not plain lattice: cells with a radius (full-radius circles),
cells with radius **and** fill, and cells that host controls (the
carousel forward/back buttons). Three consequences:

1. **Metadata reads cannot see what a cell is.** `get_metadata` returns
   position and size only — no corner radius, fill, or interactivity.
   Cell-map transcription therefore treats every tick-sized rectangle as a
   plain cell. When a phase spec covers a section, its special cells are
   inventoried explicitly and read per-node with `get_design_context`;
   they are built as ornament vocabulary (`.decor`, shaped elements) or as
   real content-layer components (controls need pointer events; the
   lattice never takes them), never painted as plain cells.
2. **Metadata reads cannot always see where a node is.** The lattice
   layers are Figma **grid auto-layouts**; a grid child's `x`/`y` can be a
   stale cached value that disagrees with where the grid actually renders
   it (found 2026-08-22: every `back-button`'s metadata x was one column
   off; its grid anchor and rendered bounds were correct). Transcription
   from a grid-auto-layout frame is verified against **rendered bounds**
   (`absoluteBoundingBox`, via the console bridge) before it is committed.
   The full five-anchor audit found every cell rectangle correct; only the
   moved button frames were stale.
3. **The arrow arrangement, from rendered truth:** the gallery carousel
   control is a vertical pair — forward arrow with the back arrow directly
   below, exactly filling the lattice's 1×2 notch (384: col 10, rows
   42–43 · 576: col 10, 27–28 · 768/960: col 10, 20–21 · 1344: col 9,
   18–19, zero-based). The testimonial-strip pair sits side-by-side (back
   left of forward: 384: 9–10,76 · 576: 8–9,52 · 768/960: 8–9,38). No
   Figma reconciliation is needed; the earlier "diagonal" reading was the
   stale-metadata artifact of point 2. *Superseded 2026-08-26 for the
   gallery pair:* the file moved it — rendered truth is now 384: col 10,
   rows 42–43 · 576: col 10, 27–28 · 768/960: col 8, 19–20 · 1344: col 8,
   18–19 (spec 007 §2, which is the current record).    The same re-audit
   measured the 768 frame at 53t and the 960 frame at 51t page total
   (vs 54t/52t above) — design reduced the portfolio cards by 1t at those
   anchors after 2026-08-22    (gallery row 6t→5t; spec 007 §9); Phase 6
   re-verified the totals 2026-08-27 from rendered bounds — 101 · 74 ·
   53 · 51 · 52 (spec 010 §2, the current record). *Superseded
   2026-08-26 for the testimonial pair's 768/960 rows:* the same 1t
   resize moved them — rendered truth is 8–9,37 (spec 009 §2, the
   current record); the 384 (9–10,76) and 576 (8–9,52) positions are
   unchanged.

## Rules deltas (folded into the rules revision, 2026-08-25)

Old-brand facts the pre-revision `docs/rules/rules.md` encoded that the
rebuild replaces — kept as the record of what the revision changed:

- Single 985px breakpoint → five anchors, four container-query band switches,
  mobile-first (384 base).
- "Design from desktop (1440 Figma)" → design exists at five anchors; base CSS
  is the 384 design.
- FK fonts → GT Standard Standard VF + PP Kyoto Variable Upright.
- Value-free specs → rebuild specs use tick/anchor/cell vocabulary; exact px
  still lives in Figma and is read through the MCP.
- Add: just-in-time spec cadence (see "Spec cadence" above) — one phase ahead
  at most, written from fresh MCP reads when the phase's inputs are stable.

Everything else (server/client discipline, token centrality, effects
hygiene, accessibility baseline, spec immutability, MCP-only Figma reads)
carries forward unchanged.
