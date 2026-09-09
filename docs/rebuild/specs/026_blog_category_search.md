# Spec 026 — Blog category page, pagination, and the search-results surface

**Status:** Draft 2026-09-08 — awaiting approval
**Depends on:** spec 025 (the article-card and featured-card grammars,
`blog-data.ts`, the 48-gap stack canon — §9 R1) · spec 024 (the
`/blog` route and search module; search submits land here) · spec 003
(`button-arrow` — the gray chrome with its disabled state) · spec
002.r1/.r2 · spec 001. Third spec of the Resources phase, under the
plan's 2026-09-08 planning-pass rulings: the category page is the live
filtered mode re-skinned (`/blog?tag={slug}&page=N`), and **search
results reuse this grammar without the featured card** (owner ruling
at the planning pass).
**Sources:** fresh MCP reads 2026-09-08 (late evening) of the Blog
Category frames at the three drawn anchors — 1344 `930:42246` · 768
`931:43604` · 384 `931:47017` — headers (breadcrumb slug + h1),
featured cards, card rows/stacks, the pagination constructions
(buttons, the five-cell indicator, the drawn disabled state), the
per-row exposure scans, and every type style and ink **verified
against rendered bounds through the console bridge this session**.
The category headers already carry the landing's reworked header
construction (y 176 · 80 · 80 — the 024 F1 family).

One page grammar, two data modes: a **category page**
(`/blog?tag={slug}`) and the **search-results surface**
(`/blog?q={query}`) — the same route in filtered mode, matching the
live blog's URL scheme. Both render on the 025 card grammar; search
drops the featured card.

---

## 1 · Anatomy — page rows per band

| band | header (material) | featured | card rows/stack | pagination | pre-footer |
|---|---|---|---|---|---|
| base 384 (t=32) | y 80, 320 × 116 | y 256 = r8, 16t | y 832 = r26, six cards stride 352 (65t), ends r91 | y 2976 = r93, 320 × 64 (2t) | r95 bare + r96 full |
| rs 576 | the 384 design on the tick | | | | |
| rt 768 (t=64) | y 80, 640 × 90 | y 256 = r4, 4t | y 640 = r10, six cards in a 37t box (§7 F1) | y 3072 = r48, 384 × 64 (1t) | r49 bare + r50 full |
| rd1 960 | the 1344 design at t=80 | | | | |
| rd2 1344 (t=112) | y 176, 1120 × 120 | y 448 = r4, 3t | y 1008 = r9, two 3-card rows (3t each, 1t between), ends r16 | y 1904 = r17, 352 × 112 (1t) | r18 bare + r19 full |

Frame totals: 31t · 66t · 121t (footers 11t · 15t · 24t). Block gaps:
featured → rows **2t**; rows → pagination **1t** at rt/rd2, **2t** at
base. Page fill `bg/100`. **Six cards per page** at every anchor (two
3-across rows at rd2; one stack below the rd1 gate).

**The 768 stack (§7 F1):** drawn `SPACE_BETWEEN` in a FIXED 2368
(37t) box, rendering fractional 51.2 gaps — against the 025 §9 R1
ruled canon of 48. The build mounts the **400 stride** (352 + 48;
stack content 2352) inside the drawn 37t box, the 16px slack at the
bottom; flagged for design to confirm or re-draw.

## 2 · Exposure map (ink `border/000`)

- **1344**: full rows 4–7 (the featured rows + one below) · all else
  bare · full r19 (pre-footer). No east rail on this page.
- **768**: full rows 4–8 (the featured rows + one below), with an ○
  ornament at [11,5] · bare 9–49 · full r50. *(The file also draws an
  ○ at [9,7], fully occluded under the featured info half — owner
  ruling 2026-09-08, §9 R1: disregard; it is unpaintable and excluded
  from the built map.)*
- **384**: east rail col 11 rows 5–7 with ○ at [11,6] (the landing's
  construction) · **full rows 8–24** (the featured rows + one below —
  the other anchors' pattern) · bare 25–95 · full r96. *(Amended
  2026-09-08 — the F2 fixes re-read: the stroke-hidden [0,24]
  restored and the stray full r81 deleted; §9 R1.)*

## 3 · The header

The landing's reworked page-header construction (slug pair above the
h1, material y 80 · 80 · 176), with the slug grown to a **breadcrumb**:
marker square `bg/400` (6 · 7 · 7), then `The Blog` `/` `Category` —
text/xs/Medium 12/16 at base, text/sm/Medium 14/18 at rt/rd2, ink
`text/400`, gaps 8 · 12 · 12 (marker→text), 24 (crumb→h1 at rd2, 34 ·
32 at rt/base per the drawn boxes).

**The h1 is the category name** (drawn `Customer Engagement`), ink
`text/100`, `ital` 100, natural wrap:

| | 384 | 768 | 1344 |
|---|---|---|---|
| h1 | display-serif/sm+/Thin 36/42 (2 lines drawn) | display-serif/lg/Thin 48/56 (one line) | display-serif/3xl/Thin 72/78 (one line) |

(The 768 category h1 is `lg/Thin 48/56` where the landing drew
`lg+/Thin 50/60` — as drawn, per-page walks differ.) Proposed
semantics (§7 R1): `The Blog` in the crumb is a link to `/blog`; the
literal `Category` is a static type label (the h1 carries the name —
the crumb never duplicates it); the search surface reads `Search` in
that slot. The marker and `/` are decorative.

## 4 · The featured card, the rows, and pagination

**The featured card is the 025 §4 component verbatim** (identical
drawn boxes at every anchor — 1120×336 · 640×256 · 320×512, verified).
Data: **the category's newest post**, page 1 only (§5).

**The rows** are the 025 §3 `article-card` verbatim: two 3-across
rows (32 gaps, 1t between rows) at rd2; a six-card stack on the 400
stride at rt (§7 F1); a six-card stack on the 352 stride (320 + 1t)
at base.

**Pagination** — a centered row: back button · the indicator · next
button:

| | 384 | 768 | 1344 |
|---|---|---|---|
| bar | 320 × 64 centered | 384 × 64 centered | 352 × 112 centered |
| buttons | `button-arrow` **md** (32Ø) in 48-wide cells | **lg** (40Ø) in 56-wide cells | **lg** (40Ø) in 56-wide cells |
| indicator | 180 × 36 — five 36×36 cells | same | same |

The back button is the standing `button-arrow` **rotated 180°** (gray
chrome); at the first page it renders the set's **disabled** state
(drawn); the next button likewise at the last page. The indicator
cells read the page numbers in text/md/Light 16/22, ink `text/300` at
every anchor; **the current page's cell fills `bg/000` white**
(square, radius 0); the ellipsis cell (`...`) is static. Drawn state:
`1 2 3 … 24`.

**The five-cell window (§7 R2, proposed):** N ≤ 5 pages → all
numbers, centered; k ≤ 3 → `1 2 3 … N`; k ≥ N−2 → `1 … N−2 N−1 N`;
otherwise → `1 … k … N`. Numbers are links (`?tag={slug}&page=k` —
`page=1` drops the param); the arrows step ±1.

## 5 · The two data modes

- **Category mode** (`?tag={slug}`): posts carrying the tag, newest
  first. **Page 1**: the newest post mounts the featured card; the
  next six fill the rows. **Pages ≥ 2**: no featured card — the rows
  region shifts up to the featured card's slot (r8 · r4 · r4) and the
  page shortens by the featured band + its 2t gap (§7 R3, proposed —
  the same derived construction search uses). Total pages =
  `ceil((N − 1) / 6)`, the featured post outside the paginated set.
  An unknown tag 404s (the live behavior).
- **Search mode** (`?q={query}`, the 024 form's target): the 025
  boundary-validated set filtered on the live blog's match fields
  (title, excerpt, content — the live `filterPosts` contract), newest
  first, six per page, **never a featured card** (owner ruling). The
  crumb reads `The Blog / Search` (§7 R1); **the h1 is the query
  string** (natural wrap at the §3 walks — §7 R4, proposed). Empty
  results render one `text/xl/Light` line in the first card slot —
  `No posts matched.` (§7 R5, proposed). Combined `q` + `tag` follows
  the live behavior (both filters apply); the crumb keeps `Search`.
- Both modes preserve non-default params in the pagination links;
  the page renders per-request (`searchParams` — the standing 60s
  data cache under it).
- **Semantics**: the h1 is the page's `h1` (these are distinct
  documents from the landing); the crumb's `The Blog` is the one link
  in the header; the pagination is a `<nav aria-label="Pages">` with
  the current page's cell `aria-current="page"`, the arrows real
  links (disabled ends render non-link spans in the drawn disabled
  chrome); the cards ride the 025 semantics. **Zero client islands.**
- SEO: filtered modes carry `noindex` metadata (the live blog's
  filtered pages are canonical to `/blog` — carried forward; the
  launch checklist's metadata pass governs final tags).

## 6 · Motion

Nothing new. The cards carry the 025 hover dressing (zoom + the
card-shadow pair); the pagination buttons ride the standing
`button-arrow` hover/focus states; reduced motion state-to-state. The
lists are born settled — no entrance choreography (any page-level
load pass rides the owner's post-build review, the 025 posture).

## 7 · Assets, constants, and draft flags

**Assets** — none (backend images per 025; no new icons — the back
arrow is the standing `IconArrowRight` under the instance rotation).

**Constants** (component token layer, per band): the §1 block
geometry; the pagination bar boxes, button cells, the 36×36 indicator
cell, the active-cell white fill; the six-per-page count and the §4
window constants.

**Draft flags (F) and proposals (R):**

- **F1 — approved as proposed** (owner, 2026-09-08; §9 R1): the build
  mounts the 400 stride (352 + the 48 canon) with the 16px tail slack
  inside the drawn 37t box; the file's fractional `SPACE_BETWEEN`
  render is not transcribed.
- **F2 — resolved** (owner rulings + design fixes, re-read; §9 R1):
  the 768 [9,7] ○ is **disregarded** (occluded, unpaintable, excluded
  from the built map); the 384 [0,24] stroke restored and the stray
  r81 row deleted (§2 as amended).
- **R1 — approved**: `The Blog` links `/blog`; the literal
  `Category` / `Search` type labels; never the tag name (the h1
  carries it).
- **R2 — approved**: the five-cell pagination window (§4).
- **R3 — approved**: pages ≥ 2 drop the featured card and the rows
  shift to its slot — the search construction reused; the featured
  post stays out of the paginated set.
- **R4 — approved**: the search h1 is the raw query at the §3 walks,
  natural wrap.
- **R5 — OPEN**: the empty-results line (`No posts matched.`,
  text/xl/Light, the first card slot) — not yet ruled.

## 8 · Deliverable — files, assembly

- `design-system/v2/sections/blog-category.tsx` + `blog-category.css`
  — the header (crumb + h1), the six-card region (both drawn-mode and
  the R3 no-featured construction), and the pagination row; consumes
  the 025 `ArticleCard`/`FeaturedArticleCard` and `blog-data.ts`
  (which gains the tag/query selectors and the paging math — no new
  fetch).
- `app/blog/page.tsx` switches on `searchParams`: no params → the
  024/025 landing; `tag`/`q` → this surface (the live blog's mode
  switch, re-skinned). Unknown tags 404 via `notFound()`.
- `app/blog-expectations.ts` gains the filtered-mode constructions
  (data-dependent totals per the standing ruling); the sweep's `/blog`
  leg gains a `?tag=` pass on the top tag and a `?q=` pass (the qa
  wrapper reads the live top tag from the rendered landing).
- **Zero new islands**; route JS unchanged (024's search island
  stays the page's only one).

## 9 · Resolutions record

- **R0 (record, 2026-09-08)** — every §1–§5 value read fresh this
  session and verified at rendered bounds through the bridge at all
  three anchors: the headers carry the reworked landing construction
  (y 80/80/176) with the breadcrumb slug; the featured card boxes are
  byte-identical to the landing's (the 025 component mounts
  unchanged); the pagination constructions, the drawn disabled back
  at page 1, the −180° instance rotation, the white active cell, and
  the `1 2 3 … 24` drawn state read from the nodes; the exposure
  scanned per cell (§2, with the F2 anomalies); the 768 stack's
  fractional 51.2 gaps measured (§7 F1). The category h1 walk reads
  sm+/Thin · **lg/Thin** · 3xl/Thin (the 768 step differs from the
  landing's lg+ — as drawn).
- **R1 — the F flags and four of the five R proposals ruled the same
  evening** (owner, in-chat; the F2 design fixes re-read at rendered
  bounds through the bridge). **F1** approved as proposed (the 400
  stride in the drawn 37t box). **F2**: the 768 [9,7] ○ ruled
  *disregard* — it stays in the file, occluded and unpaintable, and
  the built map excludes it; the 384 Grid fixed and re-read — the
  full field now runs rows 8–24 complete (the [0,24] stroke restored)
  and the stray r81 row is gone (the exposure scan reads rail 5–7 ·
  full 8–24 · bare 25–95 · full 96). **R1–R4** approved as drafted
  (crumb semantics, the five-cell window, the pages-≥2 featured drop,
  the query h1). **R5 (the empty-results line) remains open.**

## 10 · Acceptance criteria

*At the three drawn anchors, the two derived-band anchors, and one
arbitrary mid-band width per band, scrollbar forced on; against live
data AND pinned fixtures (a 25-page tag, a 2-post tag, an empty
query).*

- [ ] §1 geometry tick-true per band; the six-card archetype
      byte-exact against the drawn frames (the F1-ruled 400 stride at
      rt); the §2 exposure exact as amended.
- [ ] §3 header: the crumb construction and walks; the h1 = tag name
      at the three drawn styles; the R1 link semantics.
- [ ] §4: the featured card identical to the landing's mount; the
      pagination bar per band — buttons, disabled ends, the white
      `aria-current` cell, the R2 window at page 1 / mid / last on
      the 25-page fixture.
- [ ] §5 data: newest-first; page 1 featured + six; pages ≥ 2 the R3
      shifted construction; `ceil((N−1)/6)` pages; search drops the
      featured always, filters per the live contract, renders the
      query h1 (R4) and the empty state per the R5 ruling (open);
      unknown tags 404; params preserved in page links.
- [ ] Zero new islands; every value traces to a token or a §7
      constant; filtered modes carry noindex.
- [ ] tsc/lint zero; the standing sweep green with the new `?tag=` /
      `?q=` passes; the landing (024/025 surfaces) byte-untouched at
      `/blog` with no params.
