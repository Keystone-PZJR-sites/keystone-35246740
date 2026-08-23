# Spec 002 — Grid engine, all bands, with dev harness

**Status:** Draft — awaiting approval
**Depends on:** spec 001 (tokens: `--color-border-000` is the line color)
**Sources:** `docs/rebuild/reference/GRID-SPEC.md` (v5 — normative mechanics)
· the five anchor frames (plan.md table) · `keystone-v5.html` in the grid
playground (reference implementation; patterns only, never values)

This spec adopts GRID-SPEC.md v5 **as written** as the normative definition of
the grid system — the two units (tick/cell), bands and anchor interpolation,
the section skeleton, exposure regions, hairline rules, lattice contracts, and
component tick-definition method (its §1–§7). It is vendored beside this spec
and is not restated here. What follows is the delta this build applies, the
repo integration, and the deliverable.

---

## 1 · Amendment: container queries gate the bands

Decision log 2026-08-22. GRID-SPEC.md §2 gates band switches with viewport
media queries and accepts a sub-1% type kink where classic scrollbars make
viewport ≠ container. This build uses **container queries** so structure
switches and interpolation weights read the same width:

- `body` is the size container (v5 already requires this for the tick);
  band blocks become `@container (min-width: …)` rules targeting `.page` and
  descendants.
- Weights are exactly 0/1 at every switch on every platform; anchors stay
  pixel-exact with scrollbars forced on.
- JavaScript that needs the current band (there should be almost none)
  measures the container (ResizeObserver), never `matchMedia`.
- Everything else in v5 §2 is unchanged: five anchors (384 base · 576 · 768 ·
  960 · 1344), four switches, mobile-first, per-band `--wA`/`--wB`, pure zoom
  above 1344, extrapolation below 384.

Because this deviates from what the pre-work validated, the harness (§4)
re-verifies the v5 mechanics under the substitution before any section is
built on it.

## 2 · Bindings to this codebase

- `--line` = `--color-border-000` (spec 001). One token paints the lattice,
  region borders, and any component border meant to merge with the grid.
- Band classes as in v5 §4: `rm` (base) · `rs` · `rt` · `rd1` · `rd2`, with
  compound gating for any late-added absolute vocabulary (v5's ordering
  gotcha).
- Engine CSS lives in the design system's styles layer as its own file(s);
  the lattice injector (the ~10-line script that reads `--gw`/`--gh` and
  injects interior line divs) is a small client component in the design
  system, mounted once per section overlay.
- No designed exceptions remain: as of 2026-08-22 every anchor's sections and
  page totals are whole-tick (the earlier 768 fractional footer and the 384
  iPhone-chrome artifact were fixed in Figma). The stack-sum self-test
  therefore asserts whole-tick totals at every anchor with no allowances;
  any future designed fraction must be added here explicitly before the
  test learns to accept it.

## 3 · Deliverable

The engine plus a permanent, noindexed **`/grid` dev harness** — no real
sections. The harness contains:

1. **Fixture sections** transcribed from real exposure maps in the anchor
   frames (at minimum: one full cell field, one field with an interior
   ornament hole, one edge-void decomposition, one scroll strip with
   compensated gaps) so every v5 mechanic is exercised at least once.
2. **Debug overlay** — a keyboard-toggled full-lattice layer for eyeballing
   any future section against the grid; ships in dev, tree-shaken from
   production.
3. **Self-test readout** — the v5 §8 checks (stack sum, landmark audit,
   seam inspection aids, band-gate sweep) run in-page against the fixtures
   and render pass/fail; the same checks are scripted as an automated test
   so structural regressions fail CI, not eyes.

## 4 · Acceptance criteria

At each of the five anchor widths, and at one arbitrary mid-band width per
band, with a classic scrollbar forced on:

- [ ] `--t` measures exactly anchor-width ÷ 12 at every anchor (container, not
      viewport, drives it).
- [ ] Interpolation weights read exactly 1/0 at band floors and ceilings; a
      sample interpolated value is continuous across all four switches (no
      jump at any width, scrollbar on or off).
- [ ] Fixture landmarks divide by `--t` to integers (or the designed
      half-ticks/fractions) — the v5 landmark audit passes.
- [ ] Stack sum passes on the fixture page at every width in every band.
- [ ] At a fractional-tick width, zoomed inspection of (a) two adjacent
      regions' shared edge, (b) a bordered box over a region line, and (c) a
      scroll strip's card edges shows one line, one pixel — no doubling, no
      gaps, no drift down the strip.
- [ ] Exactly one band class renders at every width (band-gate sweep),
      including for `.decor`-style compound-gated vocabulary.
- [ ] The lattice never intercepts pointer events and never paints above
      content; ornament cells paint between lattice and content.
- [ ] Lattice, overlay, and injector produce zero hydration mismatches and
      survive Strict Mode double-mount and HMR (idempotent effects).
- [ ] The debug overlay and self-test readout are absent from the production
      bundle.
