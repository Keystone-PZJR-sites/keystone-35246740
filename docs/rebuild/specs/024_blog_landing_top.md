# Spec 024 — Blog landing top: page header, podcast & grader cards, the blog header + search module

**Status:** Approved 2026-09-08 (owner, in-chat, after the preparation
review — §9 R4; the §7 R1 proposals approved with it) · **Built
2026-09-08** (§9 B1–B5; acceptance verified below)
**Depends on:** spec 003 (the `grader-input` primitive as amended
2026-09-08 — the 56/48/44 brown-chrome set; `ButtonArrow`,
`IconSparkle`, `IconArrowRight`; **this spec closes 003's deferred
`grader-select-menu`**) · spec 005 (nav) · spec 004 (footer — the
podcast URL source this spec lifts to a shared module) · spec 002.r1/.r2
· spec 001. First spec of the Resources phase (plan.md decision log
2026-09-08: the planning-pass rulings — `/blog` URLs, the re-skin scope,
front-end-only interactive inputs, the tick-rounding law for data-driven
content).
**Sources:** fresh MCP reads 2026-09-08 of the blog-landing frames at
the three drawn anchors — 1344 `921:16985` · 768 `926:29545` · 384
`928:36676` (headers `921:18086`/`922:18563` · `926:31544`/`926:32234`
· `928:39655`/`928:40439`; feature-cards `921:18562` · `926:32129`
*(re-created as `951:7473` by the F1 rework — §9 R2)* · `928:40207`) — the `search-module` set `925:27829` (six variants,
state × search-active × size), the `podcast-button` set `921:18413`,
the `grader-input` set `503:25844` (the brown active variants
`923:19025`/`923:19020`/`923:19015` carrying the select menu), and the
search-active state pages `945:55358` (1344) · `945:56487` (384; 768
derives — owner). **Every geometry fact, binding, type style, and
per-cell exposure was verified against rendered bounds through the
console bridge this session.** Design decisions received (owner,
2026-09-08): front-end only on the grader and search — the wiring
(suggestion data, submit handling, open/active contracts) is another
workstream's; podcast links ride the footer's source; search results
reuse the category-page grammar (spec 026's surface).

The blog landing's top half: the page H1, the two feature cards
(the Made Locally podcast card and the Grader card), and the blog
header row ("The Blog" + the collapsing search module). The lists
below (featured card, recent, category sections) are spec 025.

---

## 1 · Anatomy — page rows per band (zero-based, this spec's slice)

| band | this spec's rows | H1 header (material) | feature-cards | blog header |
|---|---|---|---|---|
| base 384 (t=32) | 0–27 (28t) | y 80, 320 × 158 | y 256 = r8, 320 × 480 (15t: two 320×224 cards, 1t gap) | y 768 = r24, 320 × 128 (4t) |
| rs 576 | the 384 design on the tick (three-anchor policy; type walks re-ruled only if the built evaluation demands — the 018 R9 reservation) | | | |
| rt 768 (t=64) | 0–14 (15t) | y 80, 640 × 154 | y 320 = r5, 640 × 384 (6t: two 320×320 cards flush, right card +1t) | y 768 = r12, 640 × 192 (3t) |
| rd1 960 | the 1344 design at t=80 (the policy default) | | | |
| rd2 1344 (t=112) | 0–10 (11t) | y 176, 1008 × 198 | y 448 = r4, 1120 × 448 (4t: two 560×336 cards flush, right card +1t) | y 1008 = r9, 1120 × 224 (2t) |

*Amended 2026-09-08 (the F1 fix — design re-drew the page-H1 headers
at all three anchors, re-read at rendered bounds; §9 R2): the headers
moved (y 80 · 80 · 176) and gained the standing slug pair above the
H1 (§3). The header→feature-cards clearances hold (18 · 86 · 74 px —
≥ the half-tick law at every anchor).*

Frame totals (context): 1344 = 60t (grid 49t + footer 11t) · 768 =
163t (148t + 15t) · 384 = 292t (268t + 24t). The H1 headers are flowed
content on material y — they do not sit on ticks (the content-clears-
the-lattice law); the feature-card blocks and blog headers are
tick-true at every anchor (verified at rendered bounds). The field
below the blog header (r11 · r15 · r28 — behind the featured card) is
spec 025's region.

## 2 · Exposure map (page-frame cols 0–11, page rows)

Exposure is stroke visibility on the Grid cells (the 022 B13
encoding); ink `border/000`, 1px, throughout.

- **1344**: east rail col 11 rows 2–3, with an **○ ornament**
  (radius-full, unfilled) at [11,3] · **full lattice rows 4–8**
  (behind and below the feature cards) · the blog-header rows 9–10
  bare.
- **768**: col 11 row 4 · **full lattice rows 5–11**, with an ○
  ornament at [11,5] · the blog-header rows 12–14 bare. *(Amended
  2026-09-08 — the F2 fix: the [9,7] ○ that sat fully under the
  grader card is deleted; re-read, [11,5] is the row's only ornament;
  §9 R2.)*
- **384**: east rail col 11 rows 5–7, ○ at [11,6] · **full lattice
  rows 8–23** (feature cards rows 8–22 + the r23 clearance row) · the
  blog-header rows 24–27 bare.

No filled cells in this slice. The cards paint over the field; their
1px borders land line-inclusive on the lattice pixels (the 011 R17
law — no doubled hairlines).

## 3 · The two headers

**Page H1** — canon `Resources for growing your business.` — ink
`text/100`, `ital` 100, natural wrap in the drawn boxes. *Amended
2026-09-08 (the F1 fix, re-read at rendered bounds; §9 R2): the
header carries the standing inline slug pair ABOVE the H1 — marker
square `bg/400` + label `The Blog` in `text/400`:*

| | 384 | 768 | 1344 |
|---|---|---|---|
| slug | 6×6 marker, gap 8, text/xs/Medium 12/16 | 7×7 marker, gap 12, text/sm/Medium 14/18 | 7×7 marker, gap 12, text/sm/Medium 14/18 |
| slug → H1 gap | 16 | 16 | 24 |
| H1 style | display-serif/sm+/Thin 36/42 (−3%) | display-serif/lg+/Thin 50/60 (−2%) | display-serif/3xl/Thin 72/78 (−3%) |
| header box · text box | 320 · 320 (3 lines) | 640 · 512 (2 lines) | 1008 · 736 (2 lines) |
| header y (material) | 80 | 80 | 176 |

No subhead is drawn at any anchor.

**The blog header** — an icon slug + `The Blog` + the search module,
one row, the module right-flush to the page box at every anchor:

| | 384 | 768 | 1344 |
|---|---|---|---|
| header rows | r24–27 (interior row y 44, h 40) | r12–14 (y 71, h 50) | r9–10 (y 73, h 78) |
| icon slug | 32-wide cell; chip 32Ø `text/500`, glyph 16 `IconBlog` (chip y 0) | same, chip y 9 | same, chip y 23 |
| text (x 56 — a 24 gap) | display-serif/xs/Extralight 24/30 | display-serif/md+/Extralight 42/50 | display-serif/3xl/Thin 72/78 (one line, 285) |
| search rest (right-flush) | xs 40Ø, y 0 | md 48Ø, y 1 | xl 56Ø, y 11 |

Ink `text/100`. Semantics: the page H1 is the page's one `h1`; `The
Blog` is an `h2` (§5).

## 4 · The feature cards

Two cards, flush pair; the grader card rides **1t lower** at rt/rd2
(pt 112 · 64) and stacks below with a 1t gap at base. Both cards:
radius 0, 1px INSIDE border, `overflow: clip`, interior
`justify-between` columns (title block top, action block bottom).

**Podcast card** (`Made Locally`) — fill `yellow/300`, border
`yellow/400`, all text `yellow/700`:

| | xs (base) | md (rt) | xl (rd2) |
|---|---|---|---|
| card | 320 × 224 | 320 × 320 | 560 × 336 |
| pad | 16 | 20 | 32 |
| title | display-serif/xs/Regular 24/30 | same | display-serif/xs+/Regular 28/34 |
| icon chip (top-right) | 32Ø `yellow/400`, 16 `IconPodcast` glyph `yellow/600` | same | same |
| title → desc gap | 16 | 16 | 24 |
| desc | text/md/Light, box pr 0 | text/lg/Light, pr 48 | text/xl/Light, pr 112 |
| `LISTEN ON` | text/nav-label (10/12, +2%, uppercase), box pr 48 | same | same |
| label → buttons gap | 12 | 12 | 12 |
| podcast buttons | 3 × 36Ø, gap 12 | 3 × 48Ø, gap 12 | 3 × 56Ø, gap 12 |

The three buttons carry the **Spotify · YouTube · Apple Podcasts**
marks (glyph vectors `yellow/700`, drawn in a 20%-inset box on the
`yellow/400` disc). States from the `podcast-button` set (drawn at
40Ø — the mount sizes scale the construction, §7 F4): hover fill
`yellow/500`; focus a double ring — 2px white + 4px `yellow/700`.

**Grader card** (`The Grader`) — fill `brown/100`, border `brown/200`,
text `brown/600`; same box/pad/type walk as the podcast card at every
anchor; icon chip 32Ø `brown/300` with the 16 `IconGrader` glyph
`brown/600`; desc boxes pr 0 · 48 · 112. The action block is the 003
**brown-chrome `grader-input`**, width-filling the interior (288 ·
280 · 496): **lg (56) at rd2 · md (48) at rt and base**.

**The grader select menu** (the 003 deferral, drawn in the set's brown
active variants): mounts **below the pill** — gap 12 (lg) · 8 (md/sm)
— menu width = pill width. White fill, 1px `border/000`,
radius 12, pad 8, item gap 4, **`hard-shadow-square-md`** (3/3/0,
15%). Items: pad 6/8/8/8; business name text `Medium` over address
`Light` — text/md (16/22) at lg/md, text/sm (14/18) at sm; inks
`text/200` / `text/400`; the hovered/selected item fills `bg/100` on
radius 4. The active pill re-inks: border `brown/300`, ring 4px
`brown/200`, typed text `brown/700` (the set's active state).
**Front-end only** (owner): the menu ships as a presentational,
props-driven block (`suggestions: {name, address}[]` + consumer-owned
open/selection); no data wiring, no island behavior beyond rendering —
the wiring workstream owns when it opens and what it does.

**The search module** (the set's six variants; one component, three
sizes xl/md/xs):

- **Collapsed (rest)** — a circle `bg/300` (56 · 48 · 40) with the
  `IconSearch` glyph (20 · 18 · 16, ink `darkgray/300`). Hover fill
  `bg/400`; focus ring 4px `bg/600`.
- **Active (open)** — a white pill **336×56 · 336×48 · 320×40**,
  right-anchored (it expands westward from the rest slot; verified on
  the search-active pages): pl 24/20/16 · pr 8/6/4 · gap 8; 1px border
  `border/000` (rest) / `border/100` (hover/focus/typing); ring none →
  4px `bg/300` (hover/focus) → 4px `bg/200` (typing — the file's
  focus-ring style); placeholder `Search...` in text/lg/Light (xl/md)
  · text/md/Light (xs), ink `text/500`, typed text `text/200`; the
  submit disc inside right — `bg/300`, 40 · 36 · 32, glyph 20/18/16.
- **At base the open pill replaces the header row** — the drawn 384
  search-active page hides the `The Blog` h2 (`945:60079` HIDDEN) and
  the 320×40 pill fills the row. At rt/rd2 the h2 stays beside the
  open module (drawn at 1344; 768 derives — the md pill fits the 640
  box beside the 227 h2).

## 5 · Semantics and behavior

- The page H1 is the `h1`; `The Blog`, `Made Locally`, and `The
  Grader` are `h2`s. The icon chips and slug chips are decorative
  (`aria-hidden`).
- **Podcast buttons are external links** (`<a>`, `aria-label`
  "Listen on Spotify / YouTube / Apple Podcasts"). URLs ride the
  footer's source, **lifted to a shared module** (§8): Spotify and
  Apple Podcasts are the standing constants, YouTube is
  `company_information.youtube_url` (the 004 wiring). The whole card
  is NOT a link; only the three discs.
- **The search module is a real form** — `<form role="search"
  action="/blog" method="get">` with the text input named `q`; submit
  is native navigation to the results surface (the category grammar
  without the featured card — owner ruling; the surface lands with
  spec 026). The collapsed rest is a `<button>` (`aria-expanded`)
  that opens the pill and moves focus into the input; Escape closes
  and returns focus. **No-JS renders the open pill** — a settled,
  functional GET form (owner ruling 2026-09-08, §9 R3; JS enhances to
  the drawn collapsed rest). One island. *(Amended 2026-09-08 — the
  no-flash ruling, §9 R4: the enhancement collapse applies before
  first paint — a synchronous, commented inline flip in the server
  HTML, the cold-load-guard doctrine — so a JS load never shows the
  open pill; the exact construction lands at build.)*
- **The grader card is the 003 form** (uncontrolled, the standing
  grader route contract) plus the presentational select menu; this
  spec ships no grader island (the wiring workstream's — §4).
- Reduced motion: every state above renders state-to-state (§6).
- The cards are born settled; the page-level load choreography rides
  the 025 assembly.

## 6 · Motion

- **The search open/close** rides the standing open/close asymmetry:
  the pill expands on the ease-in-out, collapses on the ease-out, one
  300ms clock (`--blog-search-dur`, aliasing the standing deck/drawer
  duration — promotion at a second consumer per the motion law). The
  glyph and placeholder swap state-to-state under the width change;
  nothing else animates. Proposed by this spec (no drawn motion
  intent); approval covers it (§7 R1).
- The select menu, podcast-button hover/focus, and search hover/focus
  are CSS state swaps on the standing hover clocks — no new grammar.
- **Reduced motion**: the search pill opens/closes state-to-state; no
  transitions anywhere in this slice.

## 7 · Assets, constants, and draft flags

**Assets** — no raster exports. Three new icon exports through the
bridge (verbatim vectors, normalized to `currentColor` — they tint
with their context): `IconSocialSpotify` · `IconSocialYoutube` ·
`IconSocialApplePodcasts` → `v2/icons.tsx`. *(Amended 2026-09-08 —
the build's fresh read, §9 B2: FOUR exports — the search module's
glyph is its own single-tone component (`search`, 766:262, bound
text/300), not the sticker sheet's two-tone `icons/search`;
`IconSearchGlyph` exported verbatim.)* `IconBlog`, `IconPodcast`,
`IconSearch`, `IconSparkle`, `IconGrader` (via the 003 primitive), and
every color stop (`yellow/300–700`, the brown chrome, `bg/300–600`,
`darkgray/300`) already exist in the layers — zero new tokens
expected; the standing pre-build re-extraction confirms. *(Amended
2026-09-08 — the preparation review, §9 R4: one new type style is
expected — the card titles' `display-serif/xs+/Regular` 28/34 is in
the file but absent from the extracted layer; it lands at the
pre-build re-extraction, the 018 `sm/Thin` precedent.)*

**Constants** (component token layer, per band where used): the §1
block geometry (header ys, card boxes, the 1t stagger), the §4
pads/gaps walks, the podcast-button sizes (56/48/36), the search
module's two-state geometry (§4), the select-menu construction
(12/8 gap, pad 8, item pads, radius 12/4), `--blog-search-dur`.

**Draft flags (F) and proposals (R):**

- **F1 — resolved 2026-09-08** (design re-drew the page-H1 headers;
  §9 R2): the y-98 oddity is gone — the headers start at 80 · 80 ·
  176 and carry the slug pair (§1/§3 as amended).
- **F2 — resolved 2026-09-08** (design deleted the occluded [9,7] ○;
  §9 R2): [11,5] is the 768 field's only ornament (§2 as amended).
- **F3 — hygiene**: all three podcast-button inner slots are named
  `icon-social / spotify` while carrying the Spotify/YouTube/Apple
  glyphs (the swapped-content class); the two card wrappers read
  `Frame 2147258529/30`; the grader card's description frame reads
  `descrption`. No build impact; the glyph content governs.
- **F4 — the podcast-button set is drawn at 40Ø only**; the cards
  mount 56/48/36. The hover/focus dressings (§4) are read at set
  scale and built at the mount sizes (the standing set-scale mount
  class). Confirm the focus ring's 2+4 px stays fixed-px at every
  mount size. *(Confirmed 2026-09-08 — owner, at the preparation
  review: fixed-px at every mount size; §9 R4.)*
- **F5 — read artifact, recorded**: the 384 apple-podcasts glyph
  carries a −1.79% inset residue; the intended 20%-inset box is
  built. The cards' hidden per-card `grid` guide frames are not
  built.
- **R1 — proposals riding approval**: the §6 search open/close
  grammar and clock; the 768 search-active derivation (right-flush
  beside the h2 — no drawn 768 state page). *(The no-JS posture was
  ruled separately — §9 R3.)*

## 8 · Deliverable — files, route

- `design-system/v2/sections/blog-top.tsx` + `blog-top.css` — server
  component: the two headers, both cards, the search rest state, the
  exposure rows; **one client island** `blog-search-island.tsx` (the
  §5 open/close + focus contract around the native form).
- `design-system/v2/primitives/grader.tsx` gains **`GraderSelectMenu`**
  (presentational, §4) — the 003 deferral closes.
- The footer's podcast constants lift to
  `design-system/v2/sections/podcast-links.ts` (Spotify · Apple
  Podcasts · the YouTube fallback contract); `footer.tsx` imports it
  (surgical, no visual change) and `blog-top.tsx` consumes the same
  module. *(Amended 2026-09-08 — owner, at the preparation review,
  §9 R4: the Spotify URL lifts with its `?si=` share-tracking
  parameter stripped; the footer takes the cleaned URL through the
  shared module.)*
- **Route `app/blog/page.tsx`** — nav · blog-top · footer, the page
  data-independent in this spec (the lists arrive with 025 on the
  same route; the expectations module, `blog-qa` wrapper, and sweep
  leg land with the 025 assembly).

## 9 · Resolutions record

- **R0 (record, 2026-09-08)** — every §1–§4 value read fresh this
  session and verified against rendered bounds through the bridge:
  the three landing frames' metadata positions all match rendered
  truth (no stale grid-auto-layout coordinates in this slice); the
  exposure maps read as stroke visibility per the 022 B13 encoding;
  the glyph inks resolve to existing tokens (`yellow/600` podcast
  chip glyph · `yellow/700` social marks · `brown/600` grader glyph ·
  `darkgray/300` search glyph); the select-menu constructions read
  per size (lg gap-below 12, md/sm 8; item text md/md/sm); the H1
  and blog-header type styles all exist in the type layer. The
  planning-pass rulings this spec builds under are in plan.md's
  2026-09-08 decision log (front-end-only inputs, the footer link
  source, `/blog` URLs, the 026 results surface).
- **R2 — F1 and F2 fixed by design and re-read the same evening**
  (every touched node re-read at rendered bounds through the bridge).
  **F1**: the page-H1 headers re-drawn at all three anchors — they
  start at y 80 · 80 · 176 (the 768 y-98 oddity gone) and gain the
  standing inline slug pair above the H1 (`The Blog` — marker
  `bg/400` 7/7/6, gaps 12/12/8, labels text/sm/Medium ·
  text/sm/Medium · text/xs/Medium in `text/400`; slug→H1 gap
  24/16/16); header heights 198 · 154 · 158; the clearances to the
  feature cards hold the half-tick law (74 · 86 · 18). Note: the
  page-header eyebrow reads `The Blog`, the same string as the §3
  blog-header h2 — as drawn, owner copy. **F2**: the occluded 768
  [9,7] ○ deleted; the rows 4–11 scan reads [11,5] as the only
  ornament. The F1 rework also recreated the 768 `feature-cards`
  frame under a new id (**`951:7473`**, replacing `926:32129`) —
  re-read child-for-child: geometry, order, and the 1t grader offset
  byte-identical to the §4 values (podcast 320×320 at 0,0; the
  grader container 320×384 at x 320, card at y 64).
- **R3 — the no-JS search posture ruled (owner, 2026-09-08)**: no-JS
  renders the OPEN pill — a functional native GET form — and JS
  enhances to the drawn collapsed rest (§5 as amended). Chosen over
  rendering the collapsed circle, whose open action is JS and would
  leave search dead without it. The provenance question the ruling
  raised is recorded for the record: the site's no-JS law is a
  rebuild-era rule, not old-site inheritance — born as the hero
  build's settled-render property (spec 006: the choreography runs
  from a class flip, "a no-JS render is identical"), folded into
  rules.md 2026-08-25 (`7ff2092`, the rebuild-lessons revision) as
  the tail of the Motion Grammars reduced-motion bullet, and carried
  through the 2026-08-27 purge revision. The old-brand rules on
  `main` carry no no-JS rule. The functional-form reading this spec
  applies extends the settled-state law through the 022 precedent
  (no-JS keeps live links) and the native-form doctrine.
- **R4 — preparation-review rulings (owner, 2026-09-08; the build
  agent's verification pass)**. The pass re-verified every §1–§4
  value at rendered bounds through the bridge — zero discrepancies
  (frames, headers, cards, exposure cell-for-cell, the search and
  podcast-button sets, the select-menu construction). Rulings and
  findings: **(1)** the F4 focus ring is confirmed **fixed-px**
  (2 + 4) at every mount size (36/48/56). **(2) No flash** — the
  search island's JS enhancement (open pill → collapsed rest)
  applies before first paint via a synchronous, commented inline
  flip in the server HTML (the cold-load-guard doctrine); a JS load
  never paints the open pill; no-JS keeps the functional open form
  (R3). **(3)** The Spotify URL lifts to `podcast-links.ts` with the
  `?si=` share-tracking parameter **stripped**; the footer follows
  through the shared module (its only change — the render is
  identical). **(4)** Token-expectation correction: the card titles'
  `display-serif/xs+/Regular` 28/34 (verified on both 1344 title
  nodes) is missing from the extracted type layer and lands at the
  pre-build re-extraction. **(5)** One hygiene note for design's
  list: the lg brown active variant's select menu is a plain frame
  where md/sm mount the `grader-select-menu` component — geometry
  child-identical, no build impact.
- **B1 — build record (2026-09-08, the same evening as approval)**.
  The pre-build re-extraction: zero drift across all 140 variables,
  the effect styles, and 137 committed text styles; exactly one
  addition — `display-serif/xs+/Regular` 28/34 (−2%), landed in
  `type-styles.json` and the regenerated `type.css` (the R4
  prediction). The fresh-read pass was the R4 preparation review
  (every §1–§4 value verified at rendered bounds, zero
  discrepancies); the copy canon, chip inks (blog chip text/500 +
  text/100 glyph; podcast yellow/400 + yellow/600; grader brown/300
  + brown/600), the search set's state dressings, and the drawn
  select-menu geometry re-read at build. Deliverables: `sections/
  blog-top.tsx` / `blog-top.css` (the section; exposure per §2; the
  cards' 1px chrome as paint overlays on line-inclusive k·t+1px
  boxes — the flush pair shares the col-6 pixel, grader on top);
  the one island `blog-search-island.tsx` (open/close + focus +
  Escape around the native GET form; open/close is CSS on
  [data-open]); `GraderSelectMenu` + `.grader-menu` in the grader
  primitive (the 003 deferral closed); four icon exports;
  `podcast-links.ts` with the footer lift (the `?si=` strip — R4);
  the `--bt-*` / `--bts-*` constants and `--blog-search-dur` in the
  token layers; `design-system/v2/blog.tsx` and the route
  `app/blog/page.tsx`. The rs derivation is the pure zoom (§1 — the
  R9 midpoint split NOT pre-applied; the owner evaluates the built
  band). Verified against the owner's server: the three drawn
  anchors byte-exact by rendered measurement (geometry, exposure
  cell-for-cell, type walks, material controls), the derived
  576/960 exact (zoom ×1.5 and ×80/112; materials hold px),
  compressed 738/1200 and the capped 1920 (the 1344 design
  byte-exact, side fields painting); the search contract (open
  336/336/full-row, the drawn dressings, the 300ms asymmetric
  clock, focus in / Escape out, aria-expanded, the base-band title
  replace, the no-JS open form in the served HTML); reduced motion
  state-to-state; the standing sweep green (all legs); tsc/lint
  zero. Working tree left uncommitted per the git rule.
- **B2 — a fourth icon export (build fresh read)**: the search
  module's glyph is its own component (`search` 766:262, one vector
  bound text/300) — not the sticker sheet's two-tone `icons/search`
  the draft's §7 assumed. `IconSearchGlyph` exported verbatim,
  normalized to `currentColor`; §7 amended.
- **B3 — the pre-paint flip and React 19 (build QA)**: the R4
  no-flash flip (a synchronous inline `data-js` set on the section)
  triggered React 19's dev-only hydration attribute-mismatch
  warning (React leaves the attribute in place — the behavior is
  correct; the warning is the dev overlay's "1 Issue").
  `suppressHydrationWarning` on the section element (the standing
  theme-script pattern) suppresses it; verified — no overlay issue,
  the attribute survives hydration, the collapsed rest renders from
  the first frame.
- **B4 — route JS**: one client island as specced; the byte
  measurement rides the 025 assembly's budget pass (the standing
  deferred-measurement pattern; 025 also brings the expectations
  module, `blog-qa` wrapper, and sweep leg).
- **B5 — the YouTube fallback (build QA)**: the local API's
  `company_information` carries no `youtube_url`, so the disc
  renders `href="#"` — the 004 contract, the footer's twin. The
  live value flows through with no code change.

## 10 · Acceptance criteria

*At the three drawn anchors, the two derived-band anchors, and one
arbitrary mid-band width per band, scrollbar forced on.*

- [x] §1 geometry tick-true at rendered pixels: the feature-card
      blocks and blog headers on their rows; the H1 headers at their
      material ys (80 · 80 · 176, §9 R2); the 1t card stagger at
      rt/rd2; the 1t stack gap at base. *(Measured at 384/768/1344:
      heads [32,80]/[64,80]/[112,176]; cards [1t,8t]+[1t,16t] ·
      [1t,5t]+[6t,6t] · [1t,4t]+[6t,5t], all k·t+1px; blog rows
      24t/12t/9t with interiors y44/71/73 h40/50/78; derived 576/960
      and compressed 738/1200/1920 exact — §9 B1.)*
- [x] §2 exposure exact per band — the rails, the ○ ornaments, the
      full-field rows, the bare header rows; card borders
      line-inclusive (no doubled hairlines against the field).
      *(Cell-for-cell at all three anchors: rails 5–7/4/2–3, fields
      8–23/5–11/4–8, ○ [11,6]/[11,5]/[11,3]; the flush pair shares
      the col-6 pixel.)*
- [x] §3 type walks exact; the page-header slug pair (marker + `The
      Blog`, the R2 values) above the H1 at every anchor; the H1
      wraps 3/2/2 lines in the drawn boxes; the blog-header icon-slug
      construction (32 chip, 24 gap) at every anchor. *(36/50/72 H1;
      slug 12+6 / 14+7 / 14+7; h2 24/42/72; line counts 3/2/2.)*
- [x] §4 cards: fills/borders/inks per chrome; the pad/gap/desc-box
      walks; the three social marks at 36/48/56 with hover/focus
      dressings; the grader mounts lg/md/md with the brown chrome;
      the select menu renders per size when fed suggestions
      (verified via forced props). *(Pads 16/20/32; desc pr 0/48/112;
      discs with 12 gaps and the fixed 2+4 focus rings; grader
      md/md/lg at 289/281/497×48/48/56; the menu: width=pill, gap 12,
      radius 12, pad 8, the 3/3 shadow, item 58 — §9 B1.)*
- [x] §5 semantics: one h1; the three external podcast links from the
      shared module (YouTube falling back per the 004 contract); the
      search form GETs `/blog?q=`; open/close moves focus per §5;
      Escape closes; at base the open pill replaces the h2 row; no-JS
      renders the functional open form. *(All verified on the
      rendered page and the served HTML; aria-expanded tracks; §9 B1,
      B5.)*
- [x] §6 motion: the open/close asymmetry on the 300ms clock; reduced
      motion state-to-state throughout. *(Open cubic-bezier(0.65, 0,
      0.35, 1), close cubic-bezier(0.22, 1, 0.36, 1), 300ms both;
      reduced motion: every transition none.)*
- [x] One client island; route JS measured; every value traces to a
      token or a §7 enumerated constant; the three icon exports
      normalized to `currentColor`. *(One island; four exports (§9
      B2), all currentColor; the route-JS byte measurement rides the
      025 assembly's budget pass — §9 B4.)*
- [x] tsc/lint zero; the standing sweep green (the built pages
      byte-untouched); the footer renders identically after the
      podcast-links lift (its Spotify href drops the stripped `?si=`
      parameter — §9 R4). *(tsc/lint zero; the sweep green across all
      legs against the owner's server; the served HTML carries only
      the cleaned Spotify URL.)*
