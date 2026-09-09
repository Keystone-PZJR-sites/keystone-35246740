# Spec 023 — Homepage v2: page assembly and the cutover

**Status:** Approved 2026-09-08 (owner, in-chat — the approval is the
§5 explicit deletion instruction; the build's five preparation flags
sanctioned with it: the hero.css split, the v2/home.css retirement,
the rules.md/media.ts sync edits, the per-fixture expectations home,
the Bloom promotion landing with this build). Draft 2026-09-08 — all
six §9 asks resolved the same day (the entrance kept and Bloom
promoted · swap-now with the §6 post-swap checklist · measure-first
on LCP and the budget line · the deletion list approved · the build
window granted). Amended 2026-09-08 evening — `/home-fixture` and
`/engines-free-2` retire; homepage QA and the sweep run on `/` (§9 B5).
**Depends on:** specs 018–022 (the five built sections and their §9
records — every value below defers to the built code, the source of
truth) · spec 010 (the v1 assembly this supersedes; its §7 F5
mobile-LCP gate transfers here) · spec 002.r1/.r2 (the harness, gates,
and cap the expectations ride) · the launch checklist (updated in step).
**Sources:** the plan's Phase 10 decision log through 2026-09-08; the
built `home-next` composition and its five section modules (fresh code
reads at build time — no Figma inputs; this spec has no new design
surface). The 022 B13 exposure-encoding lesson and the standing
declared-overlap patterns carry into the expectations.

Phase 10's closing spec: the page-level expectations and sweep leg, the
production budget pass, and **the cutover — the new homepage promoted
to `/` and the v1 homepage retired**. Cutover is not launch: the site
ships from `main` until the big-bang; this swap changes what the
rebuild tree serves at its root.

---

## 1 · The assembled page and the expectations module

`v2/home-next.tsx` composes nav · hero (018) · system (019) · engines
(020, the R24/R25 free distance-mapped contract at rd; the R21/R22
timer/swipe stacks below) · work deck (021) · case-study carousel
(022, circular) · footer. The content stack is complete and every
section audits green on its own route.

The **homepage v2 expectations module** assembles from the built
sections' constants (code is the source of truth — the engine section's
scroll-stop budget, the 022 base clearance band, the pre-footer rows)
plus the drawn anchor totals, and carries:

- per-band section-top and page-total tables (the four standing
  homepage rest states plus the engine stops — §2);
- the declared overlaps (the strip off-canvas cards, the deck's
  proportional unit, the engine stage) with citations;
- the runway/stop constants read from `engines-data.ts`, never
  restated by hand.

The module replaces the v1 homepage expectations at cutover; the v1
tables retire with their page.

## 2 · The sweep leg and the audits

- The fixture leg runs **`/home-next-fixture`** pre-cutover and swaps
  to **`/home-fixture`** at the cutover commit — same module, same
  checks; the five anchors, the standing slice widths, and the capped
  wide legs. *(Amended 2026-09-08 — §9 B5: `/home-fixture` retires;
  the sweep leg is `/`.)*
- **Rest states audited**: the settled load (post-choreography); Bloom
  pre-fire and settled; the engine section at each of its ten
  distance-mapped stops and both parked ends (drives synthesized per
  the 020 QA note — real gesture semantics, not `scrollBy` loops);
  the deck at all six positions (one full cycle); the carousel at
  each k through a full circular revolution both ways; the footer
  drawers on the standing `data-drawer` contract.
- The **exposed-cell clearance assertion** runs on the assembled page
  with the sections' declared exceptions (the 022 east rail through
  the base clearance band among them).
- Reduced motion and no-JS render the settled page at the drawn
  totals; the choreography guard settles (`v2-settled`) and never
  replays on resize.

## 3 · Budgets — the production pass

Measured on a production build (§9 F6 — the owner's build window; the
standing `.next` cohabitation hazard):

- Route JS and first-load for `/` (v2), plus the per-section dev
  routes for the record — the measurements deferred from the 018–022
  builds land here.
- Island census on the assembled page (expected: the hero carousel +
  orchestrator guard, Bloom, the engine island, the deck, the
  carousel — plus the standing nav/footer chrome).
- CLS 0.000 and the TBT class at every anchor; **the 010 §7 F5
  mobile-LCP gate re-measures against the v2 hero** (the
  hydration-gated H1 pattern carried into 018) — the ruling on the
  result is §9 F3.
- The budget line itself is §9 F5 (the v1 class, ~112 kB first load,
  proposed as the acceptance line).

## 4 · The cutover

One commit, after this spec's approval and the §2/§3 passes:

1. **The composition promotes**: `home-next.tsx` renames to `home.tsx`
   (the v1 file retires); `/` (`app/page.tsx`) and `/home-fixture`
   mount it. The `data-landmark` wiring and the devtools mounts ride
   the composition unchanged. *(Amended 2026-09-08 — §9 B5:
   `/home-fixture` retires; `/` is the sole mount and the sweep
   surface. The production stub keeps the self-test off the
   production module graph.)*
2. **The v1 homepage retires** (§5 — the enumerated list; approval of
   this spec is the explicit deletion instruction the workspace rule
   requires).
3. **Routes**: `/home-next` and `/home-next-fixture` retire (their
   job passes to `/` and `/home-fixture`). The section QA routes
   stay permanent under their standing names — `/hero-next` ·
   `/system-next` · `/engines-free-2` · `/work-next` ·
   `/case-carousel-next` (§9 R2). The dead engine sandboxes
   (`/engines-next` · `/engines-free`) delete with the v1 routes.
   *(Amended 2026-09-08 — §9 B5: `/home-fixture` and
   `/engines-free-2` retire; homepage QA is `/`.)*
4. **The expectations swap** (§1); the sweep list drops the v1 leg
   and gains `/` + `/home-fixture`. *(Amended 2026-09-08 — §9 B5:
   the homepage sweep leg is `/` only.)*
5. **The launch checklist updates in the same commit**: the Home line
   reads v2-built; the open gates (§6) carry their owners and
   sequencing.
6. The frozen records stand: specs 006–010 unedited; 010's Status
   line gains the superseded-by-023 note (a Status-line edit is
   within the mutable zone).

## 5 · The retirement list (deletions at the cutover commit)

**Section modules** (v1-only consumers verified at build before
deletion): `sections/hero.tsx` · `hero.css` · `sections/portfolio.tsx`
· `portfolio.css` · `portfolio-gallery.tsx` · `sections/engine.tsx` ·
`engine.css` · `engine-row.tsx` · `sections/testimonials.tsx` ·
`testimonials.css` · `testimonials-block.tsx` · the v1 `v2/home.tsx`
composition. **Shared survivors** (multi-consumer, verified):
`hero-carousel.tsx` (the 018 island), `hero-load.tsx`,
`load-orchestrator.tsx` (Our Work and case studies consume it),
`engines-data.ts`/`engines-scroll.tsx` (the v2 section's own).

**Routes**: `app/hero` · `app/portfolio` · `app/engine` ·
`app/testimonials` · `app/home-next` · `app/home-next-fixture` ·
`app/engines-next` · `app/engines-free`.

**Assets** (v1-only tiers): `public/media/hero-carousel/` (the v1
six-tier set; the v2 strip lives in `hero-carousel-v2/`) ·
`public/media/portfolio/` · `public/media/testimonials/` · the v1
engine washes under `public/media/engines/` (the v2 placeholders live
in `engines-v2/`). Registry entries retire with their files; the build
verifies no surviving consumer before each deletion.

**Expectations/harness**: the v1 homepage tables and the v1 fixture
leg.

## 6 · The post-swap checklist (owner ruling 2026-09-08 — swap now,
finish after; mirrored onto `launch-checklist.md` at the cutover
commit)

The owner's working list once `/` serves the v2 homepage. None of
these block the swap; items 1 and 4 carry owner decisions.

1. **[owner review] The phone/tablet engine section.** It still runs
   the earlier timer + swipe behavior while desktop carries the new
   free-scroll contract (deferred 2026-09-06, 020 §9 R25). Review it
   on `/` at phone width; decide whether aligning it jumps the queue.
2. **[build, after item 1] The 384/768 engine pass** — whatever item
   1 rules, executed.
3. **[design → build] The engine native-visuals pass.** The ten
   illustrations (+ thirty small-band cuts) are placeholder exports;
   production art replaces them file-for-file through the registry,
   and the grain primitive gains its engine consumer.
4. **[owner ruling, at the §3 record] Mobile headline speed (LCP).**
   The measurement lands with the budget pass; then the call: accept
   the number as baseline, or rework the load entrance so the
   headline paints before JavaScript (recommended before launch if
   the number stays ~5s; never a swap blocker).
5. **[owner ruling, at the §3 record] The budget line.** Measured
   first (owner 2026-09-08); guide: within ~10–15% of the v1 112 kB
   passes, above investigates.
6. **[watch] The 022 stat-label wrap** (022 §9 B7) when the remaining
   copy passes land.
7. **[launch gate, unchanged] The pre-launch metadata wipe**
   (tab title, description, share image, manifest colors — the 010
   §5 lineage), plus the standing launch-checklist gates (sign-off,
   the big-bang sequencing).

## 7 · Constants

None new. The spec introduces no design values; every number the
expectations carry traces to a built section constant or a drawn
anchor read already on record.

## 8 · Deliverable — files

- `grid/expectations-home-v2.ts` (working name) — the §1 module;
  the sweep-config swap; the §2 drive additions to the harness.
  *(Amended 2026-09-08 — §9 B5: the module lives at
  `app/home-expectations.ts`; `/` mounts it.)*
- The §4 cutover commit (rename, mounts, deletions, checklist).
- The budget record appended to this spec's §9 at the pass (the
  013/016 pattern).

## 9 · Resolutions record

**Open (owner asks — the "what I need from you" list):**

- ~~F1~~ **Resolved (owner, 2026-09-08): the Bloom-character entrance
  is kept.** The bloom tokens promote to shared entrance names — the
  hero is the grammar's second consumer (the 019 §7 promotion path);
  the ~1.77/1.97s last beat stands as the owner's by-eye acceptance
  over the 1.6s ceiling (the ceiling note stays on the grammar for
  future consumers).
- ~~F2~~ **Resolved (owner, 2026-09-08): swap now; nothing blocks.**
  The §6 post-swap checklist is the owner's working list (owner
  request — carried in this spec and mirrored onto the launch
  checklist at the cutover commit); the small-band engine review is
  its first item.
- ~~F3~~ **Resolved (owner, 2026-09-08): measure first.** The
  mobile-LCP ruling lands at the §3 budget record (§6 item 4).
- ~~F4~~ **Resolved (owner, 2026-09-08): the §5 deletion list is
  approved as enumerated.**
- ~~F5~~ **Resolved (owner, 2026-09-08): measure first.** The line is
  set at the §3 record (§6 item 5 carries the ~10–15% guide).
- ~~F6~~ **Resolved (owner, 2026-09-08): the window is granted** —
  the owner stopped the dev server at the ruling (14:03); the
  production pass runs at the build's convenience, and the dev server
  (and the sweep runs that depend on it) resume after.

**Resolved at draft:**

- **R1 (record)** — the 019 Reception/Engagement re-label is verified
  landed in the built section (`system.tsx` — the right petal reads
  Reception); the 2026-09-06 pending-fix note closes.
- **R2 (position)** — the section QA routes keep their standing names
  post-cutover (including `/engines-free-2`); renames are cosmetic
  churn against permanent-route references.
- **R3 (record)** — cutover ≠ launch: the metadata wipe, G6
  sign-offs, and the big-bang sequencing stay on the launch
  checklist; this spec moves the rebuild tree's root only.

**Build record (2026-09-08 — approved, built, and cut over the same
day; the five preparation flags sanctioned at approval ride as B1–B4):**

- **B1 (the expectations home and the identity flag).** The module
  lives per the standing per-fixture convention —
  `app/home-fixture/expectations.ts` since the cutover (§8's
  `grid/expectations-home-v2.ts` was a working name) — deriving the
  section tables from the built heights and importing
  `ENGINES_V2_TICKS` (§1's no-restatement rule). Page totals
  237 · 234 · 165 · 79 · 78 (the drawn 238/165/54 planning reads,
  post the 2026-09-08 384 restructures, plus the 24t engine travels
  at rd — 020 §9 R19). One devtools extension landed with it: the v2
  sections carry `data-landmark` on their `.sec` roots (section
  identity for the QA routes), which under the 013 semantics would
  have emptied the assembled page's exposure set and voided the
  clearance assertion. The expectations now carry
  `secLandmarksAreIdentity` — a `.sec`-root landmark skips the
  clearance audit (the boundary check covers it) and its exposure
  stays live. Opt-in per module, so the four standing legs are
  byte-identical (verified: the pre-cutover sweep ran all six legs
  green). Declared exceptions: `carousel` (018 §2) · `strip` ·
  `card` (022 §2/§9 B15/B16 — the east rail through the base lead
  clearance among them) · `top` · `nav` (004, carried). The deck and
  the engine stage carry no landmark boxes, so their §1 declared
  overlaps are structural documentation, not assertions.
- **B2 (the sweeps).** Pre-cutover: six legs (the v1 and v2 homepage
  legs side by side), 896 checks green in one run — the §2 drives'
  first full pass (Bloom pre-fire/settled; the ten engine stops plus
  both parked ends, driven by real scroll position against the
  island's own mapping, with the active-drawing index asserted per
  stop; the six-position deck cycle with the front card asserted per
  click; the circular carousel through a full revolution forward and
  a full revolution backward past the start, K and the active index
  asserted per step; the standing footer-drawer and mobile-nav
  drives). Post-swap: five legs, 714 checks green in one run —
  `/home-fixture` on the v2 module and drives, the v1 leg retired.
- **B3 (the cutover mechanics, and two §5 additions).** The
  composition promoted (`home-next.tsx` → `home.tsx`, export
  `HomePage`); every §5 deletion executed with tsc proving no
  surviving importer. The sanctioned hero.css split: the shared
  machinery (the CTA display gating, the carousel
  window/track/frame machine, the inline wordmark, the load
  choreography + cold-load guard + settled/reduced-motion contract,
  `.hx-sr`) folded into hero-v2.css with the v1-only selectors
  dropped; the v1 indirection block and the `.hx-chip` pass retired
  with their section. Two v1-only files beyond the §5 enumeration
  retired on the same verified-no-consumer basis: `v2/home.css` (the
  v1 page chrome, `.hfx-clear-rd2` — its sole consumer was the v1
  composition) and the `wordmarkSm` registry entry +
  `ks-wordmark-sm.svg` (the v1 hero's rm/rs eyebrow; the 018 §9 R16
  restructure removed the v2 eyebrow). One found-at-build rehoming:
  the five section QA routes imported their shared dev controls from
  the retiring `/hero` route — `controls.tsx` + the devbar styles
  moved to `app/hero-next/` (the permanent hero QA surface) and the
  five imports updated; the controls stylesheet now travels with the
  component. rules.md's two dev-route enumerations and the media
  registry updated in step (docs-sync).
- **B4 (the §3 budget record — production build, the F6 window;
  Lighthouse local, default throttling, the 010 §4.2 method).**
  Route JS / first load: **`/` 138 B · 112 kB, static** — the §9 F5
  line met exactly (the v1 line was 112 kB; Δ ≈ 0%, within the
  ~10–15% guide). The deferred 018–022 section-route measurements:
  `/hero-next` 1.62 kB · 107 kB · `/system-next` 989 B · 106 kB ·
  `/engines-free-2` 529 B · 108 kB · `/work-next` 528 B · 107 kB ·
  `/case-carousel-next` 1.59 kB · 107 kB; `/home-fixture` 138 B ·
  112 kB (the devtools stub swaps in — the fixture costs nothing).
  Island census on `/`: **nine** — the §3 expectation exactly (hero
  carousel + the load-orchestrator guard, Bloom, the engine island,
  the deck, the carousel, plus the standing nav desktop/mobile and
  footer-nav chrome). **CLS 0.000 and TBT 0 ms at all three
  classes.** LCP: 1344-class **1.1 s** · 384-class **5.6 s** ·
  768-class **5.9 s** (v1 record: 1.12 / 5.33 / 5.25). **The F5
  re-measurement (the F3 ruling is the owner's, §6 item 4):** the
  mobile-class number holds the v1 class and the mechanism is
  unchanged — the cold-load guard holds choreographed content until
  hydration (the 010 G5 analysis) — but the LCP element moved: it
  now reads the carousel's first frame (`.hx-frame img`), not the
  H1 (the 2026-09-08 384 restructure moved the carousel up to rows
  14–19 and downsized the H1 to `display-serif/sm/Thin`). FCP 1.4 s
  at both small classes shows unchoreographed content painting
  early. Route surface verified on the production server: the eight
  retired routes 404; `/`, the five QA routes, and the fixtures
  respond 200.
- **B5 (owner, 2026-09-08 evening — homepage QA on `/`).** `/home-fixture`
  and `/engines-free-2` retire. The expectations module moves to
  `app/home-expectations.ts`; `/` mounts the self-test (devtools
  still production-stubbed). The sweep homepage leg is `/`. Engine
  QA is the assembled page. R2's "standing names are permanent" is
  superseded for `/engines-free-2` only.

## 10 · Acceptance criteria

*The assembled page at the three drawn anchors, the two derived-band
anchors, one arbitrary mid-band width per band, and the capped
1456/1920 legs, scrollbar forced on.*

- [x] The expectations module derives from the built constants; every
      section top and page total whole-tick at every audited width in
      every §2 rest state (§9 B1/B2 — totals 237 · 234 · 165 · 79 ·
      78; the engine constants imported from `engines-data.ts`).
- [x] The full sweep green in one run — `/` + `/home-fixture` post-
      swap, all other routes untouched — including the engine drives,
      the deck cycle, the circular carousel revolution, and the
      clearance assertion with its declared exceptions (§9 B2 — 714
      checks post-swap; 896 pre-cutover with both homepage legs).
- [x] Reduced motion and no-JS render the settled page; the
      choreography settles once and survives resize (the settle
      contract asserted at every audited width by the sweep — the
      audits only run settled and the resize walk never replays; the
      guard's reduced-motion/no-JS media contract carried unchanged
      through the hero.css fold, §9 B3).
- [x] The §3 budget pass recorded (route JS, first load, islands,
      CLS/TBT/LCP per class) with the F5 measurement (§9 B4); the §9
      F5 line met (112 kB, Δ ≈ 0%); the F3 ruling awaits the owner
      (§6 item 4 — the measurement stands ~5.6 s at the mobile
      class).
- [x] The cutover: `/` serves the v2 composition; every §5 deletion
      executed with no surviving importer (tsc zero); the retired
      routes 404; the QA routes respond (§9 B4); the launch checklist
      updated in the same change set (the Home row + the mirrored §6
      list).
- [x] Specs 006–009 untouched; 010's Status line carries the
      supersession note; this spec's §9 carries the budget record.
- [x] tsc/lint zero; the production build green; the working tree
      left uncommitted and reported (commit only on the owner's
      instruction).
