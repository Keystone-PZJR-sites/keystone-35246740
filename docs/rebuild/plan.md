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

Subsequent pages (Our Work, Solutions, Pricing, Company, Resources) follow the
same per-section pattern once the homepage is done — **Pricing first**
(owner decision 2026-08-27). Launch is big-bang after all pages are built.

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
