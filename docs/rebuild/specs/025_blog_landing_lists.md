# Spec 025 — Blog landing lists: the post-card grammar, data layer, featured/recent/category sections, landing assembly

**Status:** Draft 2026-09-08 — awaiting approval
**Depends on:** spec 024 (the `/blog` route, the blog header the lists
sit under, the `blog-*` file family) · spec 003 (`button-fill`) · spec
002.r1/.r2 · spec 001. Second spec of the Resources phase; builds under
the plan's 2026-09-08 planning-pass rulings — **the blog is the
rebuild's first data-driven surface**: tick rounding at the bottom of
variable content, the live rendering posture (server-rendered,
`serverApi`'s 60-second revalidate), categories = the live top-5 tags
by count, featured = newest, `/blog` URLs.
**Sources:** fresh MCP reads 2026-09-08 (late evening) of the landing
lists at the three drawn anchors — featured card `924:27822` ·
`926:32380` · `928:40553`; recent section `925:28155` · `927:32402` ·
`929:40650`; category-posts `926:28281` · `927:32636` · `930:41184`
(five sections each; titles read: Customer Engagement · Content
Strategy · Local Business · Local SEO · Operations) — with the card
type styles, clamp modes (`maxLines`/`TRUNCATE` — drawn, not
inferred), chromes, list constructions (layout modes, item spacings,
rendered gaps), page fills, and the per-row exposure scans **all
verified against rendered bounds through the console bridge this
session**. The data layer is the live one: `@keystone-sites/core`
`serverApi` → `/public/blog_posts` (the `BlogPost` type: tags,
authors, `photo_attachments`, `excerpt_markdown`, `published_at`).

The landing's lower half: one featured article card, a Recent Posts
row, and five category sections of the shared post-card grammar —
every card populated from the backend. With this spec the `/blog`
landing assembles complete (nav · 024 top · these lists · footer).

---

## 1 · Anatomy — page rows per band (zero-based)

| band | featured | recent section | category sections ×5 | pre-footer |
|---|---|---|---|---|
| base 384 (t=32) | r28–43 (16t: image 8t over info 8t) | y 1472 = r46, 320 × 1088 (34t: title 1t + 1t gap + stack 32t) | y 2656 = r83, each 35t (title 2t + 1t gap + stack 32t), 2t between | r266 bare + r267 full lattice |
| rs 576 | the 384 design on the tick (three-anchor policy) | | | |
| rt 768 (t=64) | r15–18 (4t: 320 image + 320 info halves) | y 1344 = r21, 640 × 1216 (19t: title 1t + stack 18t) | y 2752 = r43, each 19t (title 1t + stack 18t), 2t between | r146 bare + r147 full |
| rd1 960 | the 1344 design at t=80 (the policy default) | | | |
| rd2 1344 (t=112) | r11–13 (3t: 560 image + 560 info halves) | y 1792 = r16, 1120 × 448 (4t: title row 1t + card row 3t) | y 2576 = r23, each 4t (title 1t + card row 3t), 1t between | r47 bare + r48 full |

Block gaps: featured → recent **2t**, recent → categories **3t**, at
every anchor. Frame totals: 60t · 163t · 292t (footer 11t · 15t ·
24t). Page fill `bg/100`. **The drawn counts are the archetype** —
three cards per row/stack, five category sections; the §5 data rules
and §7 R proposals govern when live data diverges (the plan's
tick-rounding ruling).

*Amended 2026-09-08 (the F1/F2 fixes — design re-drew the recent
sections to the category construction, re-read at rendered bounds; §9
R1): the 768 recent title container is 64 (posts at y 64, matching
the categories) and the 384 recent section is whole-tick (title box
32 + 1t gap, stack at 2t, total 1088 = 34t, ending r80 with the clean
3t gap to the categories).*

**The 768 stacked-list construction (decoded at rendered bounds;
gap ruled 2026-09-08, §9 R1):** the section boxes are whole-tick
FIXED heights (stacks 1152 = 18t) and the card stacks inside run
`SPACE_BETWEEN`, rendering **48px gaps** — the ruled canon (owner:
"it should be 48"); the declared 32 item spacing is inert. Both the
recent and category stacks now carry the identical construction. The
build mounts a fixed 400 stride (352 card + 48 gap) inside whole-tick
section boxes; §7 R1's n<3 derivation is approved on that stride.

## 2 · Exposure map (cols 0–11; ink `border/000`, no ornaments, no rails in this slice)

- **1344**: full rows 11–12 (behind the featured card's first two
  rows) · bare 13 · **full 14** (the rule row under the featured
  card) · bare 15–20 · **full 21** (mid-gap before the categories) ·
  bare 22–47 · **full 48** (the pre-footer row).
- **768**: full 15–19 (the featured rows + one below) · bare 20–40 ·
  **full 41** (mid-gap) · bare 42–146 · **full 147**.
- **384**: full 28–44 (the featured rows + one below) · bare 45–80 ·
  **full 81** (mid-gap) · bare 82–266 · **full 267**.

The cards are opaque (image + white panel), so the full-field rows
behind the featured card read in the gutter columns only. The 022
B13 encoding (stroke visibility) verified per cell.

## 3 · The post-card grammar (`article-card` — the shared unit)

One card, three size constructions; **the whole card is a link** to
`/blog/{slug}`. Image on top (cover-fit, radius 0, no stroke), white
info panel (`bg/000`), no borders anywhere:

| | xs (base) | md (rt) | xl (rd2) |
|---|---|---|---|
| card | 320 × 320 (stacked) | 640 × 352 (stacked) | 352 × 336 (3-across, 32 gaps) |
| image | 320 × 128 | 640 × 192 | 352 × 138 |
| info pad | 16 / 12 top | 20 | 20 |
| eyebrow → title gap | 8 | 8 | 8 |
| title | text/md/Medium, **2-line clamp** (box 44) | text/lg/Medium, **1-line clamp** (26) | text/xl/Medium, **2-line clamp** (52) |
| desc | text/md/Light in a **fixed 96 box** (4 lines + slack, TRUNCATE) | text/lg/Light, **2-line clamp** (52) | text/xl/Light, **3-line clamp** (78) |

The clamps are drawn (`maxLines` 2/3 with `ENDING` truncation at
xl/md; the xs description is a fixed-height `TRUNCATE` box) — the
build renders `-webkit-line-clamp` equivalents; variable copy never
grows a card.

**The eyebrow** (both texts `text/nav-label` 10/12 +2% uppercase, one
`justify-between` row): the topic label in `text/200` (the post's
category tag, uppercase — §5) and the read time in `text/300`
(`{n} min read`).

## 4 · The featured card

Image half + info half; the info panel white, `justify-between` (title
block top, description bottom); the whole card one link:

| | xs (base) | md (rt) | xl (rd2) |
|---|---|---|---|
| card | 320 × 512 (image 320×256 OVER info 320×256) | 640 × 256 (image 320×256 beside info 320×256) | 1120 × 336 (560 × 336 halves) |
| info pad | 20 | 20 | 32 |
| title | display-serif/xs/Extralight 24/30, 3-line box (90) | same | display-serif/sm+/Extralight 36/42, 2-line box (84, text box 507) |
| desc | text/md/Light, 3 lines (66) | text/lg/Light, 3 lines (78) | text/xl/Light, 3 lines (78) |

The eyebrow rides §3's construction. *Amended 2026-09-08 (§9 R1, the
F3 ruling): the label is the **bare tag name** everywhere — the
featured card's drawn `ON AI` is placeholder copy, not a prefix
grammar.* Title ink `text/100`, `ital` 100; description `text/300`.

## 5 · The lists, the data, and the selection rules

- **Recent Posts** — heading walk display-serif/xs/Extralight 24/30 ·
  sm+/Extralight 36/42 · md/Extralight 40/48 (`text/100`); then the
  card row (3-across at rd2) / stack (rt, base).
- **Category sections** — a title row (the same serif walk as Recent
  Posts) with a **`button-fill` sm gray pill reading `View all`**
  (text/sm/Light 14/18, 83×36 drawn at both ends of the walk)
  right-flush, linking to the category page (`/blog?tag={slug}` — the
  live URL pattern; the page itself is spec 026); then the card
  row/stack. At base the title wraps two lines in its 2t box
  (drawn: `Customer Engagement` at 229 × 60).
- **Selection (the planning-pass rulings + live behavior):** featured
  = the newest published post; recent = the next 3 newest (the
  featured excluded); the five category sections = the **top-5 tags
  by post count**, each showing its 3 newest posts (overlap with
  recent allowed — the live behavior); the drawn five names match
  today's live tags and stay data-driven.
- **The data layer** — `blog-data.ts`: one server-side fetch of
  `/public/blog_posts` through `serverApi` (the default 60s
  revalidate), **typed and validated at the boundary** against the
  package's `BlogPost` type (the rules' boundary law); selectors
  (newest, recent-excluding, tags-by-count, posts-for-tag) and
  mappers — topic = the post's first tag name; read time =
  `max(1, ceil(words(content_markdown)/200))` (the live algorithm,
  reimplemented — the old util is purged with the old tree);
  description = `excerpt_markdown` as plain text; image = the
  featured photo attachment's URL (backend data, not the media
  registry — registry law covers static assets only).
- **Derived states (ruled 2026-09-08, §9 R1):** a tag with fewer than
  3 posts renders its 1–2 cards (row left-aligned at rd2; shorter
  stack below on the fixed 400 stride at rt — §7 R1, approved);
  fewer than five qualifying tags renders fewer sections, and **empty
  tags drop their sections** (§7 R3, approved); an empty backend
  renders the 024 top + footer with no lists. **Every post carries an
  image** (owner: the backend guarantees it — §7 R2 superseded); the
  boundary validator treats an imageless record as malformed and
  drops it. Every variable total obeys the tick-rounding ruling —
  stacks grow/shrink by whole card+gap strides and the page bottom
  stays on the tick.
- **Semantics**: the featured title and the section headings are
  `h3`s under 024's `The Blog` h2; card titles are `h4`s inside their
  link; images `alt=""` (the title names the link); the read time and
  topic read inline. Zero client islands — every interaction is a
  plain link.

## 6 · Motion

- **None drawn.** The lists are born settled; no entrance
  choreography (the page-level load pass, if any, rides the 026
  assembly review with the owner).
- **The card hover (ruled 2026-09-08 — §7 R4 approved plus the
  shadow):** the card link hover rides the standing card grammars —
  the image-zoom (`--csc-img-zoom`, the paint-in-place 1.02 cover
  grow) **and the promoted card-shadow pair**: `hard-shadow-square`
  grows on the card box, born at its 0,0 origin token, in on
  `--motion-card-shadow-dur` (450) / out on
  `--motion-card-shadow-out-dur` (300), both on the drawer ease —
  the blog card is that grammar's next consumer (nav feature cards ·
  Our Work card · this). Focus-visible parity through the card
  link.
- Reduced motion: state-to-state throughout (no timers; the hover
  dressing applies instantly).

## 7 · Assets, constants, and draft flags

**Assets** — none. Post images are backend data (remote URLs on the
card `<img>`s, cover-fit; explicit width/height from the drawn boxes).
The drawn stock photos (`AdobeStock_*` layers) are placeholders and
never ship.

**Constants** (component token layer, per band): the §1 block
geometry and gaps; the §3/§4 card boxes, pads, image heights, clamp
counts; the 768 whole-tick section boxes (1142/1152 stacks — or the
F1 ruling's values); the category `View all` pill mount.

**Draft flags (F) and proposals (R) — all ruled 2026-09-08 (§9 R1):**

- **F1 — resolved** (design fix, re-read): the gap canon is **48**;
  the recent title container re-drawn to 64 and both 768 stacks now
  carry the identical whole-tick-box construction (§1 as amended).
- **F2 — resolved** (design fix, re-read — the same short-title
  defect): the 384 recent section is whole-tick (1088 = 34t, §1 as
  amended).
- **F3 — ruled**: bare tag names everywhere; the featured card's
  `ON AI` is placeholder copy (§4 as amended).
- **F4 — ruled moot** (owner): every string and image on these
  surfaces is backend data; the drawn content is placeholder
  throughout and nothing in the file's copy or photos ships.
- **R1 — approved**: fewer than 3 cards keep the drawn stride (352 +
  48 = 400 at rt; 320 + 32 at base) and the section box rounds down
  to the whole tick that fits — never re-stretched.
- **R2 — superseded** (owner: the backend guarantees an image; the
  boundary validator drops an imageless record). **R3 — approved**:
  empty tags drop their sections; an empty backend renders the top +
  footer. **R4 — approved, plus the card shadow** (§6 as amended —
  the standing image-zoom AND the promoted card-shadow pair).

**Preparation-review flags and proposals (2026-09-08, the build
agent's pre-approval pass — §9 R2; F5–F10 await rulings, R5–R6 ride
approval):**

- **F5 — the "one fetch" premise breaks against the paginated
  endpoint.** `/public/blog_posts` is paginated server-side (default
  `per_page=10`, max 100 — the core package's own documentation): a
  bare `serverApi.get('/public/blog_posts')` returns **ten posts**,
  and even a `per_page=100` call truncates past 100 — corrupting the
  top-5-tags-by-count selection. The package already carries
  **`getBlogPosts()`** — the full-set pagination walk
  (`meta.total_count`, 100/page, a 5000-post cap) on the same 60s
  revalidate. Proposal: `blog-data.ts` consumes `getBlogPosts()`;
  §5's "one server-side fetch" reads "one full-set fetch through the
  package's `getBlogPosts()`".
- **F6 — "the featured photo attachment's URL" is underdetermined.**
  `PhotoAttachment.photo` is optional and carries four URL variants
  (`thumbnail/medium/large/original`); `featured` is optional too.
  Proposal: image = the `featured: true` attachment, falling back to
  the first by `sort_order`; URL preference `large_url` →
  `original_url` → `medium_url` (the largest drawn box is 640 CSS px
  wide — ~1280 at 2×); "imageless" (the R2 validator drop) = no
  attachment resolving to a usable URL.
- **F7 — `excerpt_markdown` is optional in the type.** Is an
  excerptless post malformed (validator drop, the image precedent)
  or does the description derive from `content_markdown`'s lead as
  plain text? Recommendation: derive from content — a missing
  excerpt is an authoring gap, not a malformed record. Needs the
  ruling.
- **F8 — the production API is down** (checked this session:
  `/public/blog_posts` AND `/public/company_information` return 503
  Application Error from the Heroku app). Blocks: verifying "the
  drawn five match today's live tags" (§5), the acceptance run
  against live data (§10), and capturing the pinned fixture payload
  from live data. The build can proceed on fixtures; the live-data
  acceptance leg waits for the backend. With the owner — known?
- **F9 — selection determinism.** (a) Top-5 tags: tie-break and
  section order need a rule — proposal: count descending, ties by
  the tag's newest post, newest first (the drawn order is
  placeholder data per F4). (b) Newest-post sorting: ties on
  `published_at` break by `id` descending. (c) `published_at` is
  optional in the type — proposal: the boundary validator requires
  it (the public endpoint serves published posts; belt-and-braces).
- **F10 — the eyebrow inside a category section.** §5 maps topic =
  the post's first tag name, so a card in the `Local SEO` section
  can read a different tag's eyebrow when that isn't its first tag.
  Confirm intended (the live behavior), or rule the section's tag
  for category-section cards (first-tag for featured/recent).
- **R5 — proposal: the `/blog` sweep leg runs `blockRemote`** (the
  016 §7.2 hermetic precedent) — the card images are remote URLs
  and the geometry carries explicit width/height, so image bytes are
  immaterial to the sweep.
- **R6 — proposal: the pinned fixture mounts through a dev-only
  payload override in `blog-data.ts`** (env-gated, aliased away in
  production on the standing `qa.prod` pattern — the fixture routes
  are retired, and this is the first data-driven surface). The §10
  starved shapes (2-post tag, empty tag, empty backend, imageless
  record) assert on that override.
- **Q1 — the pre-026 param posture**: until spec 026 lands, `View
  all` (`/blog?tag={slug}`) and the 024 search submit (`/blog?q=`)
  navigate to this landing, which ignores both params. The 022
  precedent (links to unshipped case-study routes) suggests
  acceptable phasing — confirm.

## 8 · Deliverable — files, assembly

- `design-system/v2/sections/blog-cards.tsx` + `blog-cards.css` — the
  §3 `ArticleCard` and §4 `FeaturedArticleCard` (prop-driven, no
  fetching); `design-system/v2/sections/blog-lists.tsx` +
  `blog-lists.css` — the recent section, category sections, and the
  §2 exposure rows.
- `design-system/v2/sections/blog-data.ts` — the §5 fetch, boundary
  validation, selectors, and mappers (server-only).
- **The landing assembles**: `app/blog/page.tsx` (024's route) mounts
  the lists under the blog header; `app/blog-expectations.ts` +
  `app/blog-qa.tsx` (production-aliased to the null stub, the
  standing pattern) — the expectations derive the variable totals
  from the fetched data's counts (the plan's data-dependent ruling),
  asserting the §1 constructions per count; the sweep gains the
  `/blog` leg.
- **Zero client islands** in this spec (024's search island is the
  page's only one).

## 9 · Resolutions record

- **R0 (record, 2026-09-08)** — every §1–§5 value read fresh this
  session and verified at rendered bounds through the bridge: block
  positions match metadata at all three anchors (no stale grid
  coordinates); the clamps are drawn (`maxLines` 2/3 `ENDING` at
  xl/md; the xs description a fixed `TRUNCATE` box); the chromes
  read borderless white panels on `bg/100` with square cover images;
  the five category titles and the `View all` sm gray pill read from
  the nodes; the 768 `SPACE_BETWEEN` constructions and their 43/48
  rendered gaps measured (§7 F1); the exposure rows scanned per cell
  at all three anchors (§2). The data layer facts (endpoints, the
  `BlogPost` shape, the 60s default) read from the live
  `@keystone-sites/core` package in this tree.
- **R1 — every draft flag and proposal ruled the same evening**
  (owner, in-chat; the F1/F2 fixes re-read at rendered bounds through
  the bridge). **F1**: the 768 recent title container re-drawn 42 →
  64 (posts at y 64) and the gap canon ruled **48** — the recent and
  category stacks now read the identical construction (whole-tick
  1152 boxes, `SPACE_BETWEEN`, rendered ys 0/400/800). **F2**: the
  384 recent section re-drawn whole-tick — title box 32 + 1t gap,
  stack at 2t (AUTO, gap 32), section 1088 = 34t ending r80; the
  categories hold at r83, restoring the standard 3t gap; the §2 [81]
  full row now sits mid-gap like its 768/1344 twins. **F3**: bare
  tag names. **F4**: moot — all content is backend data. **R1**
  approved (the fixed-stride derivation). **R2** superseded — the
  backend guarantees an image; the validator drops imageless
  records. **R3** approved (empty tags drop their sections). **R4**
  approved **plus the card shadow** — the hover dresses the card
  with the standing image-zoom and the promoted card-shadow grammar
  (grow 450 / reverse 300 on the drawer ease, the 0,0-origin shadow
  law; this card is the grammar's next consumer).
- **R2 — preparation review (2026-09-08, the build agent's
  pre-approval pass)**. Verified in the tree and the live package:
  024 is built and hands off cleanly (the section marks r28 · r15 ·
  r11 as this spec's region; the route, search island, and
  `podcast-links.ts` in place); every §3–§5 type style exists in the
  extracted layer (including `text/nav-label` and
  `display-serif/md/Extralight` 40/48); the promoted card-shadow
  pair (450/300) and the `--csc-img-zoom` grammar exist under their
  §6 names; `btn-fill[data-size="sm"]` exists; the §1 row
  bookkeeping re-derived consistent at all three anchors against the
  R1-amended values; the `BlogPost` type matches §5's citations; the
  QA-stub aliasing (`next.config.ts` → `qa.prod`) and the sweep's
  route table are ready for the `/blog` leg. Found and flagged (§7):
  the endpoint's server-side pagination breaks the literal
  single-fetch construction (F5 — the package's `getBlogPosts()` is
  the proposed vehicle); the photo-attachment URL mapping is
  underdetermined (F6); optional `excerpt_markdown` needs a ruling
  (F7); **the production API is down this session — every endpoint
  503s** (F8), blocking the live-tag verification and the live-data
  acceptance leg; selection determinism rules proposed (F9); the
  category-section eyebrow question (F10); two proposals (R5
  blockRemote sweep leg · R6 the fixture override) and the pre-026
  param-posture confirmation (Q1).
- **B1 — the build landed 2026-09-08 (evening)**, on the owner's
  in-chat instruction — **in parallel with the R2 preparation pass
  (a coordination collision, reconciled here: two agents were put on
  this spec; the flags landed while the build was in flight)**.
  Deliverables per §8: `blog-data.ts` (the boundary-validated full
  set; the §5 selectors and mappers; `getBlogPostList` exported for
  026), `blog-cards.tsx`/`.css` (both cards, the drawn clamps as
  line-clamps, the R4 hover on the standing zoom + card-shadow
  grammars), `blog-lists.tsx`/`.css` (tick-sized flow blocks, the
  data-computed exposure riding the counts, the rt stacks on the R1
  400 stride in server-computed whole-tick boxes, `blogListsTicks`
  exported as the expectations' source), the `--bl-u-*` band units,
  the landing assembly (one fetch feeds the composition AND the qa
  snapshot), the data-dependent expectations (totals 292 · 163 · 60
  at the full archetype — the drawn frames exactly) through the
  production-aliased `blog-qa`, and the sweep's `/blog` leg.
  **R2 reconciliation:** **F5 adopted** — the fetch is the package's
  `getBlogPosts()` full-set walk (the first cut's bare
  `serverApi.get` was one page deep; fixed same evening). **F6
  adopted as proposed** — featured-first, `sort_order` fallback,
  large → original → medium, thumbnail-only drops. **R5 was built
  identically** (the hermetic leg with the search drives). **F7, F9,
  F10, Q1 stay with the owner** — the build's interim postures:
  excerptless renders an empty description (no content-derived lead
  until ruled); tag ties break count desc → name asc → slug asc, and
  date ties keep source order; category-section cards read the
  post's FIRST tag (the live behavior); the landing ignores
  `tag`/`q` until 026. **R6 stays open** (no fixture override built;
  the starved-shape acceptance waits on it or on live data). tsc/lint
  zero. **Verification state:** the standing sweep ran green across
  all five legs — but per F8 the production API 503s, so the leg
  exercised the EMPTY-BACKEND path (verified live: the boundary
  returned `[]`, the lists rendered null, the 024 top + footer stood
  — the R3 posture). The populated-data §10 acceptance (the drawn
  archetype at the anchors, the starved shapes, the clamps on long
  copy) **remains open on the backend outage**.
- **B2 — the R6 dev fixture built, same evening** (owner report: the
  outage left `/blog` visually empty — the built work unreviewable).
  `blog-fixture.ts`: fourteen pinned posts across the five live tag
  names plus a starved sixth tag, long-copy seeds exercising the
  drawn clamps, already-committed local images (the hermetic sweep
  posture holds). It mounts through `getBlogPostList`'s
  DEVELOPMENT-ONLY branch — the fetch yielded nothing AND
  `NODE_ENV === "development"` — via a dynamic import with a
  `console.warn` marker; production never loads the module. Verified
  on the owner's dev server at 1344: the featured card, the recent
  row, and the five category sections render populated (count order
  Local Business 6 · Content Strategy 5 · Customer Engagement 5 ·
  Local SEO 4 · Operations 4 — the F9 interim tie-break visible),
  the title/description clamps truncate the long seeds, the `View
  all` pills link `/blog?tag={slug}`, and the heading tree reads
  h1 → h2s → h3s → h4s per §5. The live-data acceptance still waits
  on the backend (B1).
- **B3 — the backend swapped and the live-data acceptance ran, same
  evening** (owner-supplied environment: the SOR API at
  `sor.localkeystone.com` — the URL corrected to carry `/api/v1`,
  which the `serverApi` path construction requires and where the
  endpoints answer; the bare host 404s). Live posts replaced the
  fixture on the standing revalidate with no code change (the B2
  branch only fires on an empty result). **The full sweep ran green
  against the live data** — the populated `/blog` leg at every
  anchor and slice, the expectations deriving from the live counts
  (the F8 outage blocker closes; the empty-backend path stays
  covered by B1's run). One content observation for the owner/design:
  the live top-5 tags differ from the drawn placeholder five, and
  three arrive slug-cased from the backend (`local-marketing` ·
  `operations` · `lead-response` beside `Local Business` ·
  `Conversion`) — the section titles render the delivered `name`
  verbatim, so tag-name hygiene is a backend content pass, not a
  build change.
- **B4 — the R2 preparation flags ruled, same evening** (owner
  in-chat; F7 ruled from live-data inspection per the owner's
  direction). **F7 — the content-derived lead adopted**: the live set
  reads 99/100 posts with a real plain-text excerpt (avg 273 chars,
  no markdown syntax) and exactly one `excerpt_markdown: null`
  (`turn-your-booking-confirmation`) — an authoring gap, not
  malformation. An excerptless post now derives its description as a
  plain-text lead from `content_markdown` (minimal markdown strip,
  a 240-char word-boundary bound; the drawn clamps own display
  truncation). Verified on the live record — the derived lead reads
  clean (it opens with the content's own heading text; slightly
  title-adjacent, accepted). **F9 ruled fine as built** (newest-first
  on `published_at ?? created_at`; tag ties count desc → name asc →
  slug asc; date ties keep source order). **F10 ruled fine as
  built** (category-section cards read the post's FIRST tag — the
  live behavior). **Q1 ruled fine** (the landing ignores `tag`/`q`
  until spec 026 lands — the 022 unshipped-target precedent). All
  preparation-review items are now closed except none — R5 was built,
  R6 landed as B2, F5/F6 adopted in B1, F8 closed in B3.

## 10 · Acceptance criteria

*At the three drawn anchors, the two derived-band anchors, and one
arbitrary mid-band width per band, scrollbar forced on; against live
backend data AND a pinned fixture payload (the §5 selection rules
asserted on known data).*

- [ ] §1 geometry tick-true: block rows and gaps per band (the R1
      re-read values — the 48-gap stacks at rt, the 34t recent
      section at base); the drawn 3-card archetype byte-exact at
      every anchor when the data carries ≥3 posts per surface.
- [ ] §2 exposure exact per band, including the mid-gap full rows and
      the pre-footer bare + full pair.
- [ ] §3/§4 cards: type walks, pads, image boxes, clamp behavior
      (long titles/descriptions truncate, never grow the card), the
      eyebrow mapping (topic uppercase + `{n} min read`), whole-card
      links to `/blog/{slug}`.
- [ ] §5 selection: featured = newest; recent = next 3 excluding it;
      top-5 tags by count with 3 newest each; bare-tag eyebrows;
      `View all` → `/blog?tag={slug}`; the derived states per the R1
      rulings on a starved fixture (2-post tag, empty tag, empty
      backend; an imageless record drops at the boundary).
- [ ] The page bottom stays whole-tick at every data shape (the
      tick-rounding ruling); the footer starts on its row.
- [ ] §6: the card hover dresses zoom + shadow on the standing
      clocks with focus-visible parity; reduced motion
      state-to-state; zero new islands (route JS unchanged from 024
      ± the lists' HTML).
- [ ] Every value traces to a token or a §7 enumerated constant; the
      boundary validation rejects malformed posts without crashing
      the page (a bad record drops, the page renders).
- [ ] tsc/lint zero; the standing sweep green including the new
      `/blog` leg; the expectations derive from the live counts.
