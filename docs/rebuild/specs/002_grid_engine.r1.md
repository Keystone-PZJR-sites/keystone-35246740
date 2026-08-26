# Spec 002.r1 — Grid engine: nearest-anchor rendering

**Status:** Approved 2026-08-26 — prototyped on the real Phase 5 content,
verified, and approved by the design owner the same day
**Depends on:** spec 002 (the engine this revises; everything not revised
here stands) · specs 004–007 (the built surfaces the revision was
verified against)
**Sources:** `docs/rebuild/reference/GRID-SPEC.md` (v5) as amended by
spec 002 · the design owner's mid-band quality review 2026-08-26 (the
570/776 findings and the follow-up directions recorded in §7) ·
measurements on `/home-fixture` with nav, hero, portfolio, and footer
mounted

This revision supersedes **where a band's structure renders and how
values scale between anchors** (v5 §2's band-switch placement and the
weight formulas outside the designed lines). The five anchors, the
tick, the exposure vocabulary, hairline rules, and everything else in
spec 002 and v5 stand as written.

---

## 1 · The problem this revises away

Between anchors the old engine scaled three things by three different
rules: structure zoomed the floor anchor's arrangement linearly with
the tick, type walked the flatter interpolation line, and material held
still. The divergence peaked just under each switch — at 570 the 384
design rendered stretched +48% (a 451px portfolio card six pixels from
a width whose design wants it at 192px); at a 776 window (container
761, still rs) the 576 design rendered +32% with the H1 holding at 42
and the slack pooling as dead whitespace. The design owner judged the
tops of the base and rs bands unacceptable on real content.

## 2 · Nearest-anchor rendering

Every width now renders **the nearest anchor's design**:

- **Structural gates move from the anchors to the bands' geometric
  midpoints**, rounded: **470 · 665 · 860 · 1130** (√(384·576) ·
  √(576·768) · √(768·960) · √(960·1344)). Below a gate the lower
  anchor's arrangement renders stretched, as before; above it the upper
  anchor's arrangement renders **compressed**. Compression reads better
  than stretch — denser, never emptier — and the worst-case zoom drops
  from +50% to roughly ±20%, split evenly by the geometric cut.
- **Anchors are unchanged and interior to their halves** — each renders
  byte-identical to spec 002's engine.
- Above 1344 the pure zoom stands; below 384 the base band's line still
  extrapolates downward.

## 3 · Zoom weights in the compressed slices

In a compressed slice — from a gate up to its anchor — the band weights
collapse to a **pure zoom of the slice's anchor**:

```
--wA: calc(var(--t) / T0);   --wB: 0px;      /* T0 = the anchor tick */
```

the same construction v5 §2 uses above 1344. Every weight-carried value
(type, line-height, text columns) then scales with the structure, so
**wrap counts, line breaks, and designed clearances hold by
construction** — a compressed slice is a true proportional render of
its anchor. From the anchor upward the designed interpolation line
resumes unchanged.

The cost, accepted at review: type **steps down** at each gate
(e.g. 38.7 → 34.3 crossing 470; 28 → 25.9 crossing 665). No fixed-width
device ever sees a step; it is visible only while dragging a window
across a gate, and a downward step reads as densification.

## 4 · The four units

v5 §1's two units become four. Every dimension is classified:

| unit | scales by | examples |
|---|---|---|
| **geometry** | ticks | footprints, positions, section heights, insets, content-layer offsets |
| **text columns** | the weights | wrap-pinning max-widths, text-block heights inside flow margins |
| **line-internal spacing** | em (exact anchor ratios) | inline gaps, chip paddings — anything inside a wrapping line |
| **material** | fixed px per band | buttons, icons, marks, control inners, radii, hairlines |

A px value that encodes geometry, a text column, or line-internal
spacing is a defect (v5 §2's "secretly encodes a tick relationship"
corollary, now with teeth in the compressed slices — that is exactly
where such values break rag, fit, and clearance). Conversions are
written as **exact anchor ratios** (67/32 · 99/48 · t/2 · 6/20em), so
anchors render identically before and after.

**Scope rule:** tick- and weight-riding constants reference `--t`/
`--wA`/`--wB`, which live on `.page` — and a custom property resolves
its inner `var()`s at the element that declares it. Such constants are
therefore declared in a **`.page` block** of the component token layer,
never on `:root` (where they silently compute invalid and consumers
fall back).

## 5 · Choreographies settle

Display-gated band variants restart their CSS animations whenever a
gate crossing re-displays them. Under midpoint gates (and before them,
at the anchor gates) this replayed the entire load choreography on
resize. The contract: **a choreography ends its run explicitly** — the
orchestrator marks the page `v2-settled` on the final beat's
`animationend` (the follow-ups chip's wipe), and a settled rule turns
the choreography's animations off. `animation: none` is visually a
no-op once every animation has completed into the natural state, so the
mark changes nothing except that re-displayed elements have nothing to
restart. `v2-load` stays (the cold-load guard keys on it); the dev
replay clears the settled mark before re-flipping. Reduced motion runs
no animations and needs no settle. Future choreographies (specs 008+)
inherit this contract.

## 6 · Applied conversions

The revision landed with the engine change and the §4 audit of the
built surfaces:

- **Engine** (`grid/engine.css`): the weight cascade gains the four
  zoom slices; the ~110 band gates across the v2 styles and dev-route
  CSS move to 470/665/860/1130.
- **Image tiers** (`media.ts`): the art-directed `<source>` cuts follow
  the structural gates so each band's crop shows wherever its design
  renders; the hero's 1152 mid-cut serves the compressed rd2 slice;
  the portfolio's 1344 tier serves from 1130 (superseding 007 §5's
  1152 line — 007 carries the amendment).
- **Hero** (spec 006 carries matching dated amendments): header y
  offsets ride the tick (67/32 · 99/48 · 88/64 · 144/80 · 152/112);
  the rm inset and the header wordmark's gap are `t/2` (one rule
  replaces two band constants); the rm header right inset is 1t; the
  subhead wrap box and the CTA drop's 122 text height ride the
  weights; the subhead's inline gap and chip padding ride the type in
  em (0.3 · 0.3 · 0.2778 · 0.3 · 0.25 and 0.2 · 0.2 · 0.2222 · 0.3 ·
  0.3333 per band). The load orchestrator settles per §5.
- **Portfolio** (spec 007): already tick/weight/em-clean — only its
  gates moved. The footer and nav passed the compressed-slice sweep
  unchanged; their constant audit continues under §4 as sections are
  touched.

## 7 · Resolutions record

Review-day record, 2026-08-26. Each rule above traces to a finding on
real content:

- **R1 — 570/776 disproportion** (design owner): the motivating
  finding; resolved by §2's midpoint gates. At 570 the rs design now
  renders at 96%; at 776 (container 761) the rt design at 99%.
- **R2 — the H1 cut off at ~488**: the rs slice held the H1's 42px
  (a held pair extrapolates flat) while the structure shrank 18%; four
  wrapped lines ran under the carousel. Resolved by §3's zoom weights;
  the design owner's "minimum 1t between the H1 and the carousel"
  resolves via §4 (the header offsets ride the tick): 0.93–0.97t in
  the slice, exactly 1t at the anchor, the residue being the material
  wordmark's fixed 15px — accepted.
- **R3 — the subhead rag broke below ~539**: the fixed 384px wrap box
  and fixed inline gaps/chip paddings at zoomed type re-broke the
  designed lines. Resolved by §4: the box rides the weights, the
  line-internal spacing rides the type in em. The designed rag
  ("…website and / everything…", "…content and / follow-ups…") now
  holds at every width in the band.
- **R4 — everything replayed on resize except the subhead**: the
  subhead was the only choreographed element with no display-gated
  variants — the exception that identified the mechanism. Resolved by
  §5's settle contract.
- **R5 — the `:root` scope trap**: the first tick-riding constants
  computed invalid on `:root` and silently fell back (`max-width:
  none`, `top: auto`). Resolved by §4's scope rule; recorded here
  because the §4 audit will hit it again.
- **R6 — tier/crop mismatch in compressed slices**: with structure
  gating at midpoints but `<source>` cuts at the anchors, a slice
  showed the neighboring band's crop. Resolved by moving the cuts to
  the gates (§6); the scrollbar-width lag stays accepted as before.

## 8 · Acceptance criteria

At each of the five anchors and one arbitrary width per structural
slice (stretched and compressed), scrollbar forced on:

- [x] Anchors render byte-identical to spec 002's engine: right band
      active, weights exactly 1/0, type exact, stack sums whole-tick.
      (576: rs, h2 28px, 74t, head-top 99, wrap box 384px, gap 6px,
      chip pad 4px, H1 clearance 1.000t; 768: rt, 28px, 53t.)
- [x] Structure switches at 470/665/860/1130 on container width; every
      width renders the nearest anchor's arrangement. (570 → rs at
      0.96×; 761 → rt at 0.99×; 1185 → rd2 at 0.88×.)
- [x] Compressed slices render pure zooms: wrap counts and designed
      rags hold. (473: H1 three lines as at the anchor; both subhead
      rows break on the designed rag at 473 and 524.)
- [x] No overlaps in any compressed slice; the hero H1 clears the
      carousel by ≥0.93t. (Fit sweep at 473/524/685/885/1185.)
- [x] Type steps at gates are downward only. (38.7 → 34.3 at 470;
      28 → 25.9 at 665.)
- [x] The desktop nav fits its compressed slice. (987px used of the
      1185 container at 1200, no overflow.)
- [x] After the choreography settles, crossing any gate in either
      direction triggers zero animation restarts; the dev replay still
      runs the full choreography and re-settles. (0 running
      CSSAnimations after 860↑, 1130↑, and 1130/860/665↓ crossings;
      replay: 194 animations → settled → 0.)
- [x] The image tier fetched follows the structural gate at every
      width; WebP only, one tier per width. (500 → the 576 tiers for
      hero and portfolio; 1140 → the portfolio 1344 tier and the hero
      1152 mid-cut.)
- [x] Zero TypeScript and lint errors; the old site's routes and
      bundles unchanged.
