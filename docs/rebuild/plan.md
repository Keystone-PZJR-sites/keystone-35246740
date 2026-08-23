# Marketing site rebuild — plan

New-brand rebuild of the Keystone corporate site. Complete visual and structural
rebuild; the Keystone data/API layer (`@keystone-sites/*`) is retained. Work
happens **in place** on `new-brand-marketing-site` — the new design system
progressively replaces the old one.

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
  pass, cutover checklist.

Subsequent pages (Our Work, Solutions, Pricing, Company, Resources) follow the
same per-section pattern after Home ships.

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

- Phase 2: component nodes for `button-fill`, `button-ghost`, `grader-input`.
- Phase 3: footer nodes are already in the anchor frames; confirm accordion
  behavior at 384.
- Phase 4: nav nodes incl. mobile-menu open state.
- Phase 5: `portfolio-card`, `engine`, `testimonial-card`,
  `hero-carousel-image` component nodes; per-anchor active/inactive states for
  the engine accordion; carousel/scroll motion intent; the gallery
  carousel-control node (see "Special cells" below).

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
   stale-metadata artifact of point 2.

## Rules deltas (to fold into the rules revision)

Old-brand facts the current `docs/rules/rules.md` encodes that the rebuild
replaces:

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
