# Spec 018 — Homepage v2: hero + image carousel refresh

**Status:** Approved 2026-09-05 (owner, in-chat, after the pre-approval
review) — all §9 flags resolved the same evening (fixes re-read from
the nodes); pre-approval review rulings R5–R6 landed 2026-09-05 (§9).
**Built 2026-09-05** — acceptance verified on `/hero-next` and
`/home-next` the same night (§10; the route-JS measurement rides to
023's sweep leg); the build-read pass found post-approval header
changes, ruled and amended as §9 R7
**Depends on:** spec 006 (the homepage v1 hero this supersedes — its load
choreography, carousel machine, and subhead knockout construction carry) ·
spec 002.r1/.r2 (bands, gates, the wide cap) · spec 003 (`button-fill`,
`button-ghost`, `icons/chat`, `_nav-trigger-icon`) · spec 005 (nav — the
hero starts beneath it) · plan.md Phase 10 (the parallel-build and cutover
mechanics; spec 023 owns the `/` swap).
**Sources:** fresh MCP reads 2026-09-05 of the hero nodes inside the three
drawn anchor frames — 384 `799:57207` (header `799:60159` · subhead
`799:60104` · cta `799:60101` · image-carousel `799:60128`); 768
`813:80822` (header `813:81199` · header-carousel `813:81230`); 1344
`799:60207` (header `799:60974` · header-carousel `813:80806`) — plus
variable defs on `799:60974`. **Every geometry fact below was verified
against rendered bounds through the console bridge the same session**,
including the per-cell lattice exposure and the ornament circles. Image
exports supplied 2026-09-05
(`~/Dropbox/01-work/00-projects/01-keystone/03-website/03-newsite/home/hero/export`,
16 WebP, two cuts, inventoried in §7). Owner rulings 2026-09-05, all §9:
the exports are the strip canon (the drawn 384 strip is outdated), the
multiply tint is baked into the exports, 768 rides the 1344 cuts.

The first Phase 10 spec. The hero keeps homepage v1's shape — headline,
knockout subhead with colored chips, CTA pair, auto-advancing image
carousel — with new copy, a shorter carousel (4t at rt/rd2, was larger),
new photography, and a new exposure map. **Homepage v1 stays untouched**:
this section mounts in the new `v2/home-next.tsx` composition on its own
dev routes; nothing here edits the v1 hero. Three anchors are drawn
(384 · 768 · 1344); the **rs band derives from the 384 design and rd1
derives from the 1344 design** (plan.md, three-anchor policy — evaluated
manually on the built page). *Amended 2026-09-05 at that evaluation
(owner, §9 R9): the rs derivation splits by unit — geometry re-lays
the 384 design on the tick as before, but type and wrap boxes derive
the undrawn 576 anchor as the linear midpoint of the drawn 384/768
values and ride the standard band pairs. The pure zoom blew the type
up against the material controls mid-band.*

---

## 1 · Section anatomy — tick totals per band

The hero owns the page rows from the top edge to the system-section top.
The nav (spec 005) overlays row 0 chrome; it is not part of the hero's
DOM. Content floats on the lattice (the 006 pattern) — the carousel rows
are tick-true; the header/subhead/CTA y values are drawn px riding the
weights.

| band | hero rows | carousel rows | system top |
|---|---|---|---|
| base 384 (t=32) | 0–23 (24t) | 7–12 top 224, 192 tall (6t) | 768 = 24t |
| rs 576 | derived from 384 | derived | derived |
| rt 768 (t=64) | 0–12 (13t) | 8–11 top 512, 256 tall (4t) | 832 = 13t |
| rd1 960 | derived from 1344 | derived | derived |
| rd2 1344 (t=112) | 0–11 (12t) | 7–10 top 784, 448 tall (4t) | 1344 = 12t |

Content block positions (rendered bounds, px from the frame origin):

*Amended 2026-09-05 (build-read pass, §9 R7 — the header blocks moved
in the file after approval; owner ruling: the file is the latest
intent). The table carries the re-read values; the superseded row was
header 69/128/224 · H1 top 100/128/224 · subhead 280/428 at rt/rd2 ·
CTA 386/566 at rt/rd2.*

*Amended 2026-09-08 (§9 R14 — the inline-subhead rework; every value
re-verified at rendered bounds through the bridge the same morning).
The table re-carries the re-read values; superseded: 768 header 576w ·
subhead 242, 520w · CTA 348; 1344 header 1120w · subhead 712w ·
CTA 534. The 768 gaps are now drawn tokens (h1→subhead `spacing-4xl`
32 · header→CTA `spacing-6xl` 48); the 1344 gaps read 48/64.*

| block | 384 | 768 | 1344 |
|---|---|---|---|
| header (wordmark + H1) | 16, 65 · 336w | 64, 98 · 640w | 112, 192 · 1008w |
| H1 top | 96 (3t) | 98 | 192 |
| subhead | 16, 480 · 336w | 64, 250 · 640w | 112, 396 · 708w |
| CTA row | 16, 640 · h 40 *(amended 2026-09-05, §9 R8; drawn h 48)* | 64, 355 · h 40 | 112, 529 · h 48 |
| carousel strip | 0, 224 · full-bleed | 0, 512 · full-bleed | 0, 784 · full-bleed |

At 384 the subhead and CTA sit **below** the carousel (the v1 rm
arrangement); at 768/1344 the whole header block sits above it. The 1344
nav x read 112.12 — the standing stroke-artifact class, transcribed 112
(1t).

## 2 · Exposure map

Per-cell stroke visibility read through the bridge (the 017 lesson — the
presence read lies). Lattice cells are 1px `border/000`, center-aligned,
bound. Zero-based `col,row` from the page origin. The construction is a
descending east staircase into a full-lattice field that opens one row
above the carousel and runs through it:

**384** — rows 0–4 bare · [11,5] · [10–11,6] with ○[11,6] · rows 7–13
full field (12 cols) · rows 14–23 east rail col 11 only, down to the
system section.

**768** — rows 0–3 bare · [11,4] · [10–11,5] with ○[11,5] · [9–11,6] ·
rows 7–12 full field, with ○[9,7] inside the field.

**1344** — rows 0–1 bare · [11,2] · [10–11,3] with ○[11,3] · [9–11,4] ·
[8–11,5] with ○[9,5] · rows 6–11 full field.

Ornaments: plain outline circles (radius-full, no fill, 1px
`border/000`), one cell each — the standing ornament vocabulary. No
filled cells, no controls on the lattice in this section.

## 3 · The header

**Copy (one canon):** `Sales and marketing that runs itself.` One canon
at every anchor (§9 F1). Wraps (*amended 2026-09-05, §9 R7 — the file's
headers were reworked after approval; owner ruling: the file is the
intent*): **natural at every anchor** in each anchor's wrap box — 384:
the 304 H1 box, two lines breaking after "marketing" (the drawn
explicit break is gone; the file's residual double space after
"marketing" is not built — the canon single-space string, owner
ruling); 768: the right-padded box (pad 128 in the 640 header → a 512
text box *(amended 2026-09-08, §9 R14; the box value is unchanged —
the pad moved from the header frame to the h1 node)*), two lines;
1344: the right-padded box (pad 336 in the 1008 header → a **672**
text box *(amended 2026-09-08, §9 R14; was 784)*), **two lines** (the
draft's one-line row was not geometrically buildable with this canon).

| | 384 | 768 | 1344 |
|---|---|---|---|
| style | display-serif/sm/Thin 32/38 *(amended 2026-09-05, §9 R7; was sm+/Thin 36/42)* | display-serif/lg+/Thin 50/60 *(amended 2026-09-08, §9 R14; was lg/Thin 48/56)* | display-serif/3xl/Thin 72/78 |
| tracking | −0.64 (−2%) *(amended 2026-09-05, §9 R7)* | −1.0 (−2%) *(amended 2026-09-08, §9 R14; was −1.44/−3%)* | −2.16 (−3%) |

*Derived-band walk (amended 2026-09-05, §9 R9; re-anchored 2026-09-08,
§9 R14): below the rt gate the H1 walks 32 → 50 (lh 38 → 60) through
the derived 576 midpoint (41/49), its wrap box walking 304 → 512
through 408 on the same pairs, so the break after "marketing" holds;
the walk meets the compressed 768 design at the gate. Tracking holds
each band's constant and switches at the gates, per the law — with the
768 restyle both lower anchors carry −2%, so one constant serves the
base through rt and only the rd gate switches to the 3xl −3%.*

PP Kyoto, `ital` 100, ink `text/100` — the built 006 H1 mount carries.
At 384 only, the `ksWordmark` (72×15) sits above the H1 on a 16px gap
(the 001 asset).

## 4 · The subhead + chips

The 006 knockout construction carries: the leading "keystone " renders in
`bg/100` (invisible on paper) with the wordmark vector mounted over it;
plain runs in `text/200`. One continuous flex-wrap flow — words and
chips wrap as a single stream, so no line is forced to end at the
colon mid-band *(amended 2026-09-05, owner direction at build QA, §9
R10 — was "two drawn line-groups; the 384 groups flex-wrap"; the
anchor rags re-flow to the natural wrap, an accepted consequence)*.

*Amended 2026-09-08 (§9 R14 — the inline rework; supersedes R10's flex
stream and this section's per-band gap rows). The sentence builds as
**one inline text run**: words are real text with real spaces, chips
are inline atoms that inherit the paragraph's type, and the
paragraph's line-height is the only vertical pitch. The pill is
paint, not layout — a layer behind the label sized `lh − 2` (24 · 24
· 30 at the anchors), inset 2.5 from the line-box top and overhanging
0.5 below its bottom, radius 4, px 3 · 3 · 6, with the label riding 3
above the pill bottom (the drawn pb — optical centering; descenders
hang out of the pill). The drawn wrapped-row gaps (2/4), the 4px
line-group gap, and the flex inline gaps are pill-in-flex Figma
construction artifacts (auto-layout cannot wrap a sentence with
pills) and are not built — the space character is the inline gap
(owner ruling at the plan review, 2026-09-08). The drawn line-groups
(`Frame 635` pairs) remain a drawing convention only.*

Copy (one canon):

> keystone powers your [website] and everything that runs through it:
> [ads] [social] [reviews] [content] and [follow-ups] that convert.

Chips (radius `radius-xs` 4, pill and pb per the 2026-09-08 amendment
above *(superseded: pb `spacing-2xs` 2)*, fills/inks bound):

| chip | fill | ink |
|---|---|---|
| website | `color/teal/250` | `color/teal/700` |
| ads | `color/pink/300` | `color/pink/700` |
| social | `color/orange/300` | `color/orange/600` — drawn intent, the 012 orange/600 class |
| reviews | `color/yellow/300` | `color/yellow/700` |
| content | `color/blue/300` | `color/blue/700` |
| follow-ups | `color/purple/300` | `color/purple/700` |

Per-band restatements *(amended 2026-09-08, §9 R14 — one type at every
anchor; superseded: 768 text/lg 18/26 with chip labels 18/24, chip px
4 · 4 · 8, the inline-gap row (6 · 5 · 6) and line-group-gap row
(6 · 4 · 6) — the R10-era flex-gap vocabulary has no inline
equivalent)*:

| | 384 | 768 | 1344 |
|---|---|---|---|
| type | text/xl/Light 20/26, all M Light | text/xl/Light 20/26, all M Light | text/2xl/Light 24/32, all M Light |
| pill h (= lh − 2) | 24 | 24 | 30 |
| pill px | 3 | 3 | 6 |

*Derived-band walk (amended 2026-09-05, §9 R9; collapsed 2026-09-08,
§9 R14): with the 768 anchor re-drawn at the 384 type, the subhead
type is **constant 20/26 from the base through the rt band** — no
walk remains below the rd gate. The wrap box stays the R9 grammar
with the new 768 endpoint: 336 → 640 through the 576 midpoint 488 —
lines unwrap progressively as the box outgrows them. Pill geometry
rides the type in em (002.r1 units): h 1.2em · px 0.15em below the
rd gate; h 1.25em · px 0.25em in the rd zoom (exact at both drawn
anchors by construction).*

*Amended 2026-09-08, second ruling (owner, at the built-page review;
§9 R15): the leading is an **enumerated constant, deliberately
off-token** — 20/**28** below the rd gate (text/xl says 26) and
24/**34** in the rd zoom (text/2xl says 32). The pill rhythm law
sets it: the vertical air between pills on adjacent lines
(lh − pill height) must match the horizontal air between adjacent
pills, which is the space advance (measured 0.1852em at both anchor
sizes → 3.70px at fs 20 · 4.45px at fs 24); 24 + 3.7 and 30 + 4.45
round to the whole-px 28 and 34. The pill anchors to the glyphs
(height 1.2em/1.25em, center the drawn 1.5px below the glyph
center), so the leading change moves lines apart without touching
the pill's size or its fit on the type.*

## 5 · The CTA row

The standing 003 set instances; no new primitives. Targets carry from the
built v1 hero (code is the source of truth): the fill button's link and
the ghost's inert `open-chat` contract.

*Amended 2026-09-05 (owner direction at build QA, §9 R8): the 384/rs
bands ride the md set (the drawn 384 lg is superseded), and the rd1
band mounts its own lg set instead of deriving the 1344 xl — the size
walk is md · md · lg · xl across the four gated rows. Gaps and targets
unchanged.*

| | 384 *(amended — md, was lg)* | 768 | rd1 band *(amended — lg)* | 1344 |
|---|---|---|---|---|
| button-fill | md — h 40, label 16 M Light, pl 16 pr 12 | md — h 40, label 16 M Light, pl 16 pr 12 | lg — h 48, label 18 L Light, pl 20 pr 16 | xl — h 48, label 20 M Light, pl 24 pr 20 |
| button-ghost | h 40, px 12 py 8, label 16 | h 40, px 12 py 8, label 16 | h 48, px 16 py 12, label 18 | h 48, px 20 py 12, label 20 |
| gap | 24 | 40 | 40 | 40 |

Labels: "Get Started" (with the 10px `_nav-trigger-icon`) · "Talk to us"
(with `icons/chat` at 20/18/20).

## 6 · The carousel

**Eight slides at every band, in export order 01–08; odd slides are
rectangles, even slides are circles** (radius-full clip). The drawn 384
strip (ten slides, a divergent photo set) is superseded by the owner's
exports-canon ruling — §9 R1.

| band | odd slides | even slides | strip |
|---|---|---|---|
| 384 | 6t × 6t square | 6t circle | all-square, top row 7 |
| 768 | 6t × 4t wide (384×256) | 4t circle (256) | the 1344 arrangement at t=64, top row 8 |
| 1344 | 6t × 4t wide (672×448) | 4t circle (448) | top row 7 |

Slides are contiguous (no gaps), the strip starts at x 0 full-bleed and
overflows right under the page clip. The 768 frame draws only the first
three slides — it establishes the arrangement; the full eight-slide strip
rides the 1344 order (owner direction 2026-09-05).

**The machine carries verbatim** — the built 006 island
(`sections/hero-carousel.tsx`): auto-advance on the motion tokens
(`--motion-slide-duration` / `--motion-carousel-dwell` /
`--motion-carousel-first-advance`), tick-resolved track transform
(band switches re-resolve mid-flight), seamless loop over tail clones,
hidden-tab pause, lazy frames primed a dwell ahead. Only the per-band
slide-size variables restate. Reduced motion and no-JS hold the first
frames — the settled state is slide 1 leftmost.

**The load choreography carries** — the 006 orchestration (same settle
contract, `v2-settled` on the last beat); *amended 2026-09-06 — the
homepage-load clock on `.page.v2-choreo` (006 §6/§9 craft preview,
revised the same evening to the 019 Bloom character): two-clock rises
(ring pair for the H1, engine pair elsewhere), 14px travel, bloom
stagger 120ms, engine-ease wipe, hero-scoped 350ms sweep, pass at
750/950 by band, last beat ~1770/~1970ms. Pending keep/revert.* The
new section swaps in with new content only. The 010 §7 F5 mobile-LCP
gate rides to 023's re-evaluation.

## 7 · Assets and constants

**16 exports** (WebP, 2×, the multiply tint `rgba(72,0,0,0.1)` **baked —
owner confirm 2026-09-05, the 017 precedent; the build mounts them
plain, no overlay layer**):

- `hero-carousel-1344-{01..08}.webp` — the **wide cut** for odd slides
  (1344×896 = 672×448 @2x) and the **square cut** for even slides
  (896×896 = 448 @2x; files 02/04/06/08).
- `hero-carousel-384-{01..08}.webp` — square cuts of all eight
  (896×896; 02/04/06/08 are byte-identical to the 1344 files).

Mount verbatim names under `public/media/hero-carousel-v2/` + registry
entries mapping slide index → cut per band: odd slides mount the wide cut
at and above the rt gate (665) and the square cut below it; even slides
mount the square cut everywhere. *Amended 2026-09-05 — twelve files
ship, not sixteen: the 384 even-slide exports are byte-identical to
the 1344 squares, so even slides mount the 1344 square file at every
band and the four duplicates are not committed (§9 R5).* Photo
inventory (documentation, by export number — the strip is ambient,
§8): 01 café workspace · 02 spa facial · 03 writing desk ·
04 auto mechanic · 05 reformer studio · 06 shop phone call · 07 bike
shop · 08 salon hair-wash.

**Non-token constants** (component token layer, per band only where
used): the header/subhead/CTA drawn y values (§1), the pill geometry
(h = lh − 2 · px 3·3·6 · label lift 3 · line-box offsets 2.5/−0.5,
riding the type in em — §4 as amended 2026-09-08; superseded: chip
pb 2 / px 4·4·8), the CTA gaps 24·40·40, the 384 wordmark gap 16. The
knockout vector geometry carries from the built 006 section.

## 8 · Deliverable — files, semantics

- `design-system/v2/sections/hero-v2.tsx` + `hero-v2.css` — server
  component; **one client island** (the reused `HeroCarousel`); the load
  choreography via the standing orchestrator. The v1
  `hero.tsx`/`hero.css` are not touched.
- `v2/home-next.tsx` — the homepage v2 composition (nav · hero-v2 ·
  footer for now; 019–022 splice in as they land), mounted on noindexed
  **`/home-next`** + **`/home-next-fixture`**. The hero also gets its
  permanent dev route **`/hero-next`**. `/` and `/home-fixture` keep
  mounting v1 until spec 023.
- Semantics: `<section aria-label>` with `data-landmark`; the H1 is the
  page's one `<h1>`; the strip carries the built v1 contract —
  `aria-hidden` ambient imagery, empty `alt`, no controls, no
  announcements (*amended 2026-09-05 — the draft cited a live-region
  contract the built island does not have; §9 R6*); chips are
  presentational `<span>`s inside the subhead paragraph (screen
  readers read the sentence straight through).
- The page-level expectations module and sweep leg land with 023; until
  then the section audits on `/hero-next` through the standing devtools.

## 9 · Resolutions record

All four draft flags resolved 2026-09-05, the same evening (owner
responses + design fixes; fixes re-read from the nodes):

- **F1 — fixed, then reworked the same evening.** The period fix
  re-read first (`…\nthat runs itself.`); design then removed the
  drawn break entirely — the 768 H1 re-read as the single canon
  string in a right-padded box (pad 64, text box 512, natural
  two-line wrap; the 1344 construction). §3 carries the final form.
- **F2 — designed intent.** The 768 subhead inline gap is 5 (6 at
  384/1344); sanctioned as an enumerated constant in the rt band's
  restatement (§4).
- **F3 — won't-fix (owner: "don't care").** The 1344 slide-04 circle
  (`813:80812`, the 4th slide in the strip, export 04) stacks a stale
  under-layer — slide 02's photo beneath its own. The visible image
  matches the export; nothing builds from the stray.
- **F4 — fixed.** The 768 CTA row re-read `cta-container`, matching
  1344.

**Resolved at draft:**

- **R1 (owner, 2026-09-05)** — the drawn 384 strip is outdated (ten
  slides, four photos with no exports, two exports unused): **the
  exports are canon** — eight slides at every band in export order,
  all-square at 384. The 1344 strip was verified matching the exports
  photo-for-photo before the ruling. File fix rides with design; the
  spec builds from the exports.
- **R2 (owner, 2026-09-05)** — the 10% multiply tint is **baked into
  the exports** (the 017 precedent); the drawn overlay layers are not
  built.
- **R3 (owner, 2026-09-05)** — 768 rides the 1344 cuts; the two-cut
  tier set (§7) replaces v1's six-tier art direction for this section.
- **R4 (record)** — every §1–§6 value verified against rendered bounds
  through the bridge at writing (2026-09-05); the 1344 nav x 112.12 is
  the standing artifact class, transcribed 112; the lattice ink binding
  read `border/000` at all three anchors.

**Resolved at the pre-approval review (owner, 2026-09-05):**

- **R5 — twelve asset files, not sixteen.** The 384 even-slide exports
  (02/04/06/08) are byte-identical to the 1344 square cuts; committing
  them would plant four dead duplicates nothing references ("Search
  Before You Build"). The registry maps even slides to the 1344 square
  file at every band. §7 amended.
- **R6 — the strip keeps v1's ambient accessibility posture**
  (`aria-hidden`, empty `alt`, no announcements). The draft's §8 cited
  "the built island's live-region contract", but no live region exists
  in the built island — the clause described semantics that were never
  built, and building them would contradict §6's "the machine carries
  verbatim". The §7 photo inventory stays as documentation, not alt
  text. §8   amended.
- **R11 (owner, 2026-09-05, at build QA, in-chat) — the one-flow
  subhead wraps in the H1's column from the rd1 gate, tuned the same
  session to the column minus half a tick** (6.5t — 728 at the 1344
  anchor; the full 784 column left the ads chip hanging on the first
  line, and the owner directed it down to the chip line). The
  rt band stays unpinned: the drawn 768 first line (520) is wider
  than the H1's 512 box there, and pinning it orphaned "convert." on
  a third line at the anchor — the drawn two-line rag holds
  naturally instead. Below the rt gate the §9 R9 walk boxes carry
  unchanged.

**Resolved at build (2026-09-05):**

- **R7 (owner, at the build's fresh-read pass) — the hero headers
  changed in the file after approval; the file is the latest
  intent.** Re-read through the bridge at build start: the three
  header blocks moved up (384 header 69 → 65, H1 top 100 → 96 = 3t;
  768 header 128 → 98, the h1→subhead gap 40 → 32; 1344 header
  224 → 192, subhead 428 → 396, CTA 566 → 534, gaps 48/64); the 384
  H1 downsized to display-serif/sm/Thin 32/38 −2% in a 304 box with a
  natural wrap; the 1344 H1 wraps **two** lines in its 784 box (the
  draft's one-line row could not fit this canon: the same string
  overflows 512 at 48px, so it must overflow 768 at 72px). §1/§3
  amended to the re-read values. Rulings: build the file; the 384
  text's residual double space after "marketing" is not built — the
  canon single-space string wraps naturally. Everything else re-read
  matching the approved body (carousel strips, section totals, 384
  subhead/CTA, chips, knockout, CTA internals, 768 inline gap 5).
  The 384 anchor's `display-serif/sm/Thin` style was missing from the
  committed type layer (newer than the last extraction) — landed at
  the build's re-extraction, which read zero drift elsewhere and six
  new unused hue stops (primitives.css).
- **R8 (owner, 2026-09-05, at build QA, in-chat) — the CTA sizes
  re-walked: md at 384 through the rt band, lg in the rd1 band, xl
  at rd2.** Supersedes the drawn 384 lg set and the derived rd1 xl;
  the section now mounts the four gated rows (a · b · c · d =
  md · md · lg · xl) on the standing band gating. §1 (the 384 row
  height, now 40) and §5 amended; gaps and targets unchanged. File
  fix rides with design — the 384 frame still draws lg.
- **R9 (owner, 2026-09-05, at the derived-band evaluation, in-chat) —
  the rs derivation splits by unit.** The plan's default ("the 384
  design on its tick") zoomed the type toward 62px H1 / 34px subhead
  mid-band while the CTA controls stayed material — the proportion
  broke on the built page (the evaluation the plan reserved).
  Ruling: geometry keeps the 384 re-lay on the tick (tops, carousel
  rows, the exposure map — unchanged); **type and wrap boxes derive
  the undrawn 576 anchor as the linear midpoint of the drawn 384/768
  values** and ride the standard band pairs — H1 32 → 48 in the
  304 → 512 box, subhead 20 → 18 in 336 → 520, meeting the
  compressed 768 design at the rt gate within ~2px (the pure zoom
  jumped ~20px there). Preamble, §3, and §4 amended. The construction
  is the band system's native two-anchor interpolation with a
  synthesized middle anchor; no new machinery.
- **R10 (owner, 2026-09-05, at build QA, in-chat) — the subhead is
  one continuous flow.** The two drawn line-groups forced every
  width to end a line at the colon; mid-band the second group
  orphaned ("that runs through it:" stranded above the chip line).
  Ruling: the sentence renders as a single flex-wrap stream — words
  and chips fill lines naturally at every width, chips joining text
  lines where they fit. The drawn anchor line-groups are superseded
  and the anchor rags re-flow (accepted consequence; file fix rides
  with design). The knockout construction, chip bindings, em gaps,
  and the §8 sr sentence carry unchanged; the load choreography's
  two subhead beats collapse to one (the chip pass unchanged). §4
  amended.
- **R12 (craft preview, 2026-09-06, pending keep/revert)** — the
  homepage load clock on `.page.v2-choreo` follows the
  review-animations recommendations (006 §6 as amended): shorter
  rises, hero-scoped sweep, tighter chip stagger, ease-out wipe.
  Revised the same evening to the 019 Bloom character (owner
  request): two-clock rises on the bloom ring/engine pairs, 14px
  travel, bloom stagger, band-resolved pass start (750/950). Last
  beat ~1770/~1970ms. The bloom tokens are referenced directly;
  promotion only if the preview is kept. Shared `:root` fade-rise
  tokens unchanged. Verified on `/hero-next` (006 §9 carries the
  measurement record). Owner tuning same evening: travel 12px; the
  image group opens on the CTA beat (390/510/630).
- **R13 (erratum, found at the craft preview 2026-09-06)** — this
  section's frame sizes expose the **third frame's leading edge** at
  the right bleed (left edge ~1400 in a 1920 viewport, measured), but
  the 006 entrance covered frames 1–2 only, built when frame 3 sat
  offscreen. Frame 3 joins the load entrance on the next image beat
  (`--hx-d-img3`/`-m`; base 900/470ms carries the 006 cadence so the
  fix survives a preview revert) and is priority-loaded
  (`hero-v2.tsx` `frame <= 3` — the beat needs pixels). Every
  choreography list (cold-load guard, settled, reduced-motion kills)
  widened to `-n + 3`. Verified on `/hero-next`: frame 3 animates
  eager/high-priority, frame 4 stays offscreen unanimated, reduced
  motion renders it settled.
- **R14 (owner, 2026-09-08, at the plan review, in-chat) — the
  inline-subhead rework.** Design re-drew the hero header set after
  the 2026-09-08 review of the built subhead's leading (the file is
  the latest intent — the R7 class; every value re-read fresh and
  verified at rendered bounds through the bridge the same morning:
  `absoluteBoundingBox` = `absoluteRenderBounds` on every touched
  node). The 384/768 subheads are the new `subhead - 384`
  construction (`921:16901` / `921:16933`); the 1344 subhead
  (`799:60978`) re-drawn in place. **Values:** one subhead type at
  every anchor — chip labels ride the body style (text/xl/Light
  20/26 below the rd gate; the 768 text/lg 18/26-body vs 18/24-chip
  split is gone; text/2xl/Light 24/32 at 1344). Pills are smaller
  than the line box: h = lh − 2 (24 · 24 · 30), drawn top inset 2.5
  with a 0.5 overhang past the line bottom, px 3 · 3 · 6, label
  lifted 3 off the pill bottom (optical centering — descenders hang),
  radius 4, fills/inks unchanged. The 768 H1 restyled
  `display-serif/lg+/Thin` 50/60 −2% (h 120; the style was already
  in the committed type layer — the drift check read zero); gaps are
  drawn tokens (h1→subhead 32 `spacing-4xl`, header→CTA 48
  `spacing-6xl` → subhead 250, CTA 355). The 1344 header narrowed to
  1008 — H1 text box 672 (pad 336), subhead box **708** (supersedes
  R11's H1-minus-half-tick 728), CTA 529. **Construction ruling:**
  R10's flex word-stream is superseded by **one inline text run** —
  words are real text with real spaces, chips inline atoms
  inheriting the paragraph's type, the pill painted behind the label
  (never laid out), the paragraph's line-height the only vertical
  pitch. The drawn wrapped-row gaps (2/4), the 4px line-group gap,
  and the flex inline gaps are pill-in-flex Figma construction
  artifacts (auto-layout cannot wrap a sentence with pills) and are
  not built. **Derived bands:** the rs subhead walk collapses (type
  constant 20/26 below the rd gate; wrap box 336 → 640 through 488);
  the H1 walk re-anchors 32 → 50 (38 → 60) through the 576 midpoint
  41/49, boxes unchanged; the 665 tracking alias is gone (both lower
  anchors −2%; the rd gate aliases the 3xl −3%). §1/§3/§4/§7
  amended. Anchor rags re-flow (the R10 accepted consequence); the
  load choreography carries with the chip pass unchanged (the wipe
  moves to the pill's brand layer).
- **R15 (owner, 2026-09-08, at the built-page review, in-chat) — the
  subhead leading breaks the token: 28 · 34, the pill rhythm law.**
  On the built R14 subhead the pills sat 2px apart vertically
  (lh − pill = 26−24 · 32−30) against ~3.7/4.4px horizontally (the
  space advance) — the owner ruled the vertical pill air must match
  the horizontal. Measured on the rendered page: the space advance
  is 0.1852em at both anchor sizes (3.703px at fs 20 · 4.445px at
  fs 24), so the leading becomes an **enumerated constant off the
  token styles** (the F2 class): 20/**28** below the rd gate
  (text/xl carries 26) and 24/**34** in the rd zoom (text/2xl
  carries 32; the pair rides 34·80/112 → 34). With it the
  construction re-anchors the pill to the glyphs — height
  1.2em/1.25em centered on the line box plus the drawn 1.5px
  downward shift (replacing the R14 box-edge insets 2.5/−0.5, which
  would have grown the pill under the new leading) — so the pill's
  size and fit on the type are invariant under leading changes and
  the added air lands entirely between lines. Nothing in the token
  layer moves; no other text/xl or text/2xl consumer is touched.
  §4 amended. Side effect at the anchors: the subhead block grows
  (4 lines → 112 at 384; 2 lines → 56 at 768 · 68 at 1344), landing
  the 384 subhead→CTA gap on 48 exactly (CTA tops unchanged, §1).

## 10 · Acceptance criteria

*At the three drawn anchors, the two derived-band anchors (576/960 as
derived renders), and one arbitrary mid-band width per band, scrollbar
forced on.*

- [x] Carousel rows tick-true per §1 (384: rows 7–12 · 768: 8–11 ·
      1344: 7–10); system-section top lands at 24t/13t/12t.
      *(2026-09-05: top/height measured 7t/6t · 8t/4t · 7t/4t; section
      heights 24t/13t/12t at 384/768/1344 and every swept slice —
      460 · 520 · 576 · 700 · 900 · 1050 · wide-capped.)*
- [x] Header/subhead/CTA at the §1 drawn positions at each drawn anchor;
      the 384 H1 top on 96 = 3t (amended 2026-09-05, §9 R7; was "100,
      the streamline line").
      *(2026-09-05: byte-exact at all three anchors — 384: 96/480/640,
      wordmark 65; 768: 98/242/348; 1344-capped: 192/396/534; slices
      ride the derivation lines to ±0.01px at 576 · 700 · 900 · 1050.)*
- [x] The exposure map renders exactly per §2 — staircase, ○ ornaments,
      full-field rows, the 384 east rail — and nothing else; lattice ink
      `border/000` 1px everywhere.
      *(2026-09-05: DOM audit cell-for-cell per band — rm/rs 4 regions
      + ○[11,6]; rt 4 + ○[11,5]/○[9,7]; rd1/rd2 5 + ○[11,3]/○[9,5];
      exactly one band visible per width; ink rides the engine's
      `--line` = border/000.)*
- [x] Eight slides in export order; odd rectangles / even circles;
      all-square at 384; wide cuts swap to square below the rt gate;
      no tint overlay in the DOM (baked).
      *(2026-09-05: 8 + 3 clones; parity shapes; 384 rect and circle
      both 6t with the square cut mounted; at 700/768 the wide cut
      mounts (currentSrc verified); the frames mount the exports
      plain.)*
- [x] H1 breaks per §3 at each drawn anchor; chips carry the §4
      bindings; the subhead knockout reads identically to v1's
      construction.
      *(2026-09-05: two lines at every anchor in the drawn boxes
      304/512/784; chip fills/inks are the §4 token bindings; the
      knockout markup and rules carry from the built 006 section
      verbatim.)*
- [x] The carousel machine behaves as built: first-advance delay, dwell
      advance, seamless loop, hidden-tab pause, band switch mid-flight
      re-resolves; reduced motion and no-JS hold slide 1 with the full
      strip in the HTML.
      *(2026-09-05: the 006 island reused byte-identical — first
      advance and two dwell advances observed on the motion tokens;
      the transform resolves in ticks mid-flight (read at 15.4t
      between 10t and 16t); reduced motion snaps home and holds
      through 5s with no timers. Loop and hidden-tab paths carry
      as built.)*
- [x] The load choreography settles (`v2-settled`), never replays on
      resize, and reduced motion renders the settled section.
      *(2026-09-05: replay → v2-load flips, v2-settled lands after the
      chip pass and not before; zero running CSS animations at rest,
      so band-gated re-entry has nothing to restart; reduced motion
      renders settled — chips born branded, H1 opacity 1.)*
- [ ] One client island; `/home-next` route JS in the v1 homepage's
      class; every value traces to a token or a §7 enumerated constant.
      *(2026-09-05: one island (the reused `HeroCarousel`) plus the
      standing orchestrator mount, matching v1; every value traces —
      the route-JS measurement waits for a deploy-verification build,
      with 023's sweep leg.)*
- [x] tsc/lint zero; the standing sweep stays green (v1 routes
      byte-untouched).
      *(2026-09-05: `tsc --noEmit` and lint zero; the full grid
      self-test suite passed against the owner's server with hero-v2
      in the tree; no v1 section file modified — git status carries
      only the 018 additions and the token re-extraction.)*
