# Spec 017 — The Case Study page: the template and Palm Coast Zivel

**Status:** Approved 2026-08-31 (owner; approval covers the §6
motion values); **built the same night** — the §9 build record
carries the re-verification, the deviations amended in place, and
the acceptance evidence. Every §10 box is checked except the
production-build budget pass (awaiting owner coordination — the
standing .next cohabitation hazard). Build ruling at approval: **the
rm `result-image` builds at 336** — the 0.5t column width — and the
file fix landed during the build (re-read 336×224); the two stale
export tiers (rt header 656→648 · rm result 680→672) mount as-is and
swap byte-only when the re-cuts land. The same-evening flag pass resolved most of the eleven
draft flags (owner responses + design fixes, every fix re-read from
the nodes through the bridge — §9 is the record): F1 the rd2 tops
re-read whole-tick; F3 the slug weights re-read Medium; F4 a/d/e/f
fixed (the e-residuals closed in the third pass); **F5 the quote-image shadow re-read
`hard-shadow-square-md` at all five anchors**; F6/F8 **the fifteen
image tiers landed** (`…/case-studies/zivel/export`, shadows and the
multiply tint baked — §5.4) and the tint decoded as designed; F7
resolved on the homepage-subhead precedent; F9 confirmed + the
phased content-flow direction (§5.1); **F10 — the page rises like
Our Work** (§6); F11 the rd2 Grid trued and the button set gained a
label prop. A late-evening second pass closed more (each re-read):
**F4c** — the overview item-3 string unified on the owner's
**5-star** ruling; **F11** — the six degenerate frames deleted; and
a **768 revision** rode along — the CTA→footer gap grew to 2t (footer
95t, page total **110t**, the pre-footer ■ now [11,94] — §1/§2/§9).
A third pass (late night, every fix re-read) closed the rest: **F2**
— the rm columns re-read x 16 (one interior residual: the
`result-image` still 340 wide); **F4b — the stack subhead copy
landed**; the F4e/F5c residuals fixed ("Hot leads flagged" ·
"8,000" · the rs body md); the rt header image re-read **320 = 5t**;
and **the TOC resting line ruled: aligned with `overview-content`**.
**Open:** the rm `result-image` width (340 → 336) and the two export
re-cuts that follow the resizes (§5.4/§9). Nothing else stands
between the spec and approval.
**Depends on:** spec 001 (tokens, fonts — the pre-build re-extraction
rule) · spec 002 / 002.r1 (the engine, the structural gates, the four
units) · spec 003 (ButtonFill / ButtonGhost — the CTA row mounts the
standing primitives; the hover clock the new button aliases) · spec
005 (the nav chrome; the `--z-sticky` position the TOC rides) · spec
006 (the hero's chip-flow boilerplate this page's CTA band reuses;
the `open-chat` contract the ghost ships on; the orchestrator the §6
entrance rides) · spec 010 (the page pattern: expectations
module, `data-landmark` audit, sweep legs, budgets) · spec 011
(lattices-behind-content, the line-inclusive box law) · spec 013 (the
expectations/clearance/sweep-leg shape) · spec 014 (the
`/case-studies/{slug}` owner decision and the slug canon; the header
vocabulary; the min-content label-wrap erratum) · spec 015/016 (the
canon-name discipline; the live-site URL surface — the three
case-study URLs arrived with 016's list, 016 §9 F1).
**Sources:** fresh MCP reads 2026-08-31 of the **Case Study section
`684:13645`** (`get_metadata` · `get_variable_defs` ·
`get_design_context` on the TOC and the button set): the five anchor
frames — `473:31550` (384 × 7264) · `707:29574` (576 × 7392) ·
`464:28882` (768 × 7040 — *amended 2026-08-31 at approval: the draft
read 6976 predated the same-evening 768 revision; the live frame
re-read 7040 = 110t, matching the amended §1 total*) · `689:15295`
(960 × 7120) · `434:13594` (1344 × 8288); the **scrolled-state frame `713:49098`** (1344 ×
968 — the sticky TOC drawn fixed at 1t with a mid-page active item);
the **`case-study-button` set `715:50431`** (state default/hover/
focus × size lg/sm — 6 variants); the page Grid layers. Every frame,
section container, Grid cell, fill, stroke, effect, and text style
**verified against rendered bounds and bindings through the console
bridge the same day** (the full-tree dumps carried variable names and
style ids; the exposure maps computed from rendered cell bounds);
**every flag fix re-read from the touched nodes the same evening**
(the §9 record — incl. the recreated rm `header-image` `721:50548`).
Design/owner decisions on record (owner, 2026-08-31): **the sticky
TOC** — at the 1344 anchor the TOC scrolls with the page until it is
**1t from the viewport top, then fixes**; it renders **only in the
rd2 band** (dropped at smaller sizes); **the template intent** —
multiple case studies ship on this one template, populated after this
first (Palm Coast Zivel) version is built. The three case-study live
URLs are the owner's 2026-08-29 delivery (with the 016 gallery list;
§5.2). No entrance-motion intent was supplied — §6 carries the
spec's values (the 013 §5 veto precedent).

The first page of the Case Studies surface (the 014 View-Case-Study
CTAs already target `/case-studies/{slug}`; the routes 404 today).
One spec covers the whole page: the template sections, the sticky-TOC
island, the Palm Coast Zivel content, and the page assembly
(expectations module, fixture sweep leg, budgets).

---

## 1 · Anatomy — the page stack

Page totals (rendered bounds, whole-tick at every anchor): **227 ·
154 · 110 · 89 · 74** *(the rt total amended 2026-08-31 — the
same-evening 768 revision, §9: the CTA→footer gap grew 1t → 2t, the
footer top 94t → 95t, re-read from rendered bounds)*. Section tops in
page ticks (zero-based; px where the value is px-riding):

| landmark | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| header top (px, tick-riding) | 80 (80/32·t) | 112 (112/48·t) | 80 (80/64·t) | 112 (112/80·t) | 174 (174/112·t) |
| header-image top | 10t | 8t | 5t | 2t | 2t |
| intro | 25t | 20t | 12t | 9t | 7t |
| Overview | 39t | 27t | 20t | 13t | 10t¹ |
| The Business | 68t | 44t | 31t | 22t | 17t¹ |
| The Shift | 103t | 67t² | 44t | 33t | 27t |
| The Funnel | 125t | 80t² | 51t | 39t | 32t |
| The Stack | 140t | 90t² | 59t | 46t | 38t |
| The Result | 162t | 103t² | 69t | 55t | 45t |
| call-to-action | 193t | 126t² | 90t | 72t | 59t |
| footer | 203t | 133t | 95t | 77t | 63t |
| **page total** | **227t** | **154t** | **110t** | **89t** | **74t** |

¹ *amended 2026-08-31 — the §9 F1 fix, re-read from rendered bounds:*
the rd2 Overview and The Business frames were re-boxed whole-tick —
Overview **10t–17t** (784 = 7t) · The Business **17t–26t** (1008 =
9t), contiguous with the intro's 10t end. The former 64px drift now
sits **inside** each frame as a drawn 64px interior top pad (rd2
only — §3.3/§3.4); the interiors render unchanged.
² *amended 2026-08-31 at build (the §9 build record):* the rs run
below The Business rode down 1t with the F5c body normalization
(`sm → md` grew the hugging interior) — the five landmarks re-read
whole-tick and contiguous; the footer and total unchanged.

**The column.** rm: the 0.5t column (x 16, 10.5t wide — The Result
and the CTA re-read on it 2026-08-31, the §9 F2 fix; one interior
residual rides in §3.8). rs–rd1: cols 1–11. rd2: the
content column is **cols 3–11** (x 336, 8t); the header, intro, and
TOC sit at col 1; The Funnel is 7t (cols 3–10); The Business bleeds
to col 12 (§3.4). Section heights are whole-tick except the
content-hugging Overview/Business/Shift/Result/CTA interiors recorded
in §3 (the next section's whole-tick top absorbs the slack — "the
tick wins").

Footer heights 24 · 21 · 15 · 12 · 11 (the 004 record, unchanged).
The nav is the standing overlay chrome. Frame fills `bg/100` at all
six frames.

## 2 · Exposure map — a full-field lattice with an east ornament rail

New to this page: the Grid layers draw the **full 12-column field on
every row** from row 0 to the footer top, at every anchor — the 011
lattices-behind-content law generalized to a whole page. Content
boxes cover the field; the visible exposure is the page margins and
the designed gaps. (The rd2 Grid frame's empty 4t overrun was fixed
2026-08-31 — re-read 63t, flush with the footer top; §9 F11.)

*Amended 2026-08-31 at build (the §9 build record):* the paragraph
above was the **presence read** — the hero §2 erratum class. The
Grid layers hold a cell rectangle at every position, but only some
carry the visible stroke: the **painted** exposure is the standing
east-edge staircase, a col-11 rail running the whole page, designed
widenings beside the stat rows, and one full-lattice row directly
above the footer at every band. The per-cell transcription (re-read
from stroke visibility) is the build's
`design-system/v2/sections/case-study-lattice.tsx`. The ornament
table below stands, less four invisible radius cells (rm ○[9,29] ·
rs ○[8,14] · rd1 ○[8,12] · rd2 ○[8,12] — no stroke, no fill; the
pricing [8,13] hygiene class, riding with design); the rs ●/■ rows
ride the §1 amendment (●[11,67] · ■[11,90]).

Ornament cells ride the east rail (zero-based [col, row]; ○ = radius
cell unfilled · ● = radius cell filled `bg/200` · ■ = square cell
filled `bg/200`):

| band | ornaments |
|---|---|
| rm | ○[11,5] · ○[9,7] · ■[11,10] · ○[10,14] · ●[11,27] · ○[9,29] · ■[11,59] · ●[11,103] · ■[11,140] · ■[11,202] |
| rs | ○[11,5] · ○[9,7] · ○[8,14] · ●[11,21] · ■[11,39] · ■[11,60] · ●[11,66] · ■[11,89] · ■[11,132] |
| rt | ○[11,3] · ○[8,5] · ●[11,13] · ■[11,27] · ●[11,44] · ■[11,59] · ■[11,94]* |
| rd1 | ○[11,3] · ○[8,5] · ●[11,10] · ○[8,12] · ■[11,19] · ●[11,33] · ■[11,46] · ■[11,76] |
| rd2 | ○[11,3] · ○[8,5] · ●[11,8] · ○[8,12] · ■[11,15] · ●[11,27] · ■[11,38] · ●[11,55] · ■[11,62] |

Every ornament sits in content-clear cells; the last ■ of each band
is the row directly above the footer (* the rt ■ re-read [11,94]
after the 768 revision moved the footer to 95t — 2026-08-31, §9). The build draws the field as
the page-level lattice layer (behind every section, `z −1` by the
standing construction) and the ornaments as `.decor` vocabulary.

## 3 · Content blocks

Shared ink discipline: heads `text/100` · bodies `text/100` (section
prose) or `text/300` (cell prose, lists) · labels/chrome `text/400` ·
metadata labels `text/500`. All stroked boxes are 1px `border/000`,
line-inclusive where they sit on lattice.

*Amended 2026-09-01 (design type revision, re-read from the nodes —
the §9 record):* the rd2 section-head step across §3.3–§3.8 moved
`display-sans/xs/Regular` → **`display-sans/2xs/Regular`** (28/36);
the §3.2 intro head ramp moved to **xl / xl / 2xl / 2xl /
display-sans-2xs** (was lg/xl/xl/xl/2xl). Wrap-box revisions in the
same pass: the §3.6 rd2 subhead 608 → **520**, the §3.7 rd2 subhead
→ **652**, the §3.8 rd2 body 608 → **544** with the quote→head gap
84 → **60**; the §3.3 body/list boxes read **304/432/576/640/608**.

### 3.1 · Header — slug · H1 · metadata · tags · site photo

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| slug style² | `text/xs/Medium` | `text/xs/Medium`² | `text/xs/Medium`² | `text/sm/Medium` | `text/sm/Medium` |
| slug dot (bg/400, square) | 6px | 6px | 6px | 7px | 7px |
| slug dot gap / slug→H1 gap | 8 / 16 | 8 / 16 | 8 / 16 | 12 / 24 | 12 / 24 |
| H1 style | `display-serif/sm+/Thin` | `display-serif/md/Thin` | `display-serif/md/Thin` | `display-serif/md+/Thin` | `display-serif/lg+/Thin` |
| H1 wrap box (weights) | 305 | 384 | 512 | 320 | 448 |
| metadata label / value styles | `2xs/Regular` / `sm/Light` | `xs/Regular` / `md/Light` | `xs/Regular` / `md/Light` | `sm/Regular` / `md/Light` | `sm/Regular` / `lg/Light` |
| tag chip text | `text/2xs/Regular` | `text/sm/Regular` | `text/sm/Regular` | `text/sm/Regular` | `text/md/Regular` |
| image box (cols × rows) | 0.5–11 × 10–18 | 1–11 × 8–14 | 6–11 × 5–10³ | 6–11 × 2–7 | 6–11 × 2–7 |

² the slug ink is `text/400` everywhere; the rs/rt Regular reads (the
011 R3 / 014 F1 recurrence, §9 F3) were **fixed and re-read Medium
2026-08-31** — Medium at every band.
³ *amended 2026-08-31 (§9 F5):* design resized the rt image from the
full-bleed 6t (6–12 × 5–11) to a **5t × 5t** square at 6t/5t — first
read 324, trued to **320 = 5t** at the closing pass (re-read); the
delivered 656×656 export tier re-cuts to 648×648 (§5.4).

Copy (curly apostrophes): slug **Case Study** · H1 **How Keystone
helped Palm Coast Zivel turn lead gen into a new hire.** — the
canonical single-spaced string; **the drawn per-band double spaces
are designed rag** (owner ruling 2026-08-31, §9 F4g — each anchor
pins its own break: rs/rd2 after "lead", rt after "helped"). The
build renders each band's drawn break explicitly (the 012
built-explicit precedent); the accessible string is the canon. Metadata pairs (label → value): **Category → Wellness,
Recovery** · **Location → Palm Coast, FL** · **Founders → Nikki Lang
& Kelly Lang** · **On Keystone Since → February 2026**. The pairs sit
in two columns (Category/Location · Founders/On Keystone Since); at
rs the whole metadata block moves below the image.

**The tags.** Six chips on the homepage chip vocabulary (radius 4,
`{color}/300` fill, `{color}/700` ink — Sales calls on the standing
`orange/600`): **Ads** pink · **Sales calls** orange · **Social**
yellow · **Phone answering** teal · **High-volume messaging** blue ·
**Multi-location campaigns** purple. Wrap counts and per-band chip
order are drawn (rag balance, the 012 precedent): 4+2 at rm/rs/rd1/
rd2, 3+2+1 at rt (Phone answering joins row 1 before Social at rm/rt
per the drawn order — the build renders each band's order).

**The site photo** (`header-image`): the storefront/owner photograph,
`hard-shadow-square`, no radius. Over the image every frame draws a
**`#5a0b0b` multiply overlay at 10%** — a designed warm tint (§9 F6,
decoded 2026-08-31), **baked into the delivered exports** along with
the shadow (§5.4; the persona baked-wash precedent — the build mounts
the composited asset, no CSS shadow or blend on this image).
Meaningful alt (the §5.1 data module). *(The rm node was recreated in
the F1 pass — `721:50548`, now a header-frame child; geometry
unchanged, re-read 2026-08-31.)*

### 3.2 · Intro — the stat band

A stroked-cell band: head + N stat cells + the disclaimer cell, every
cell a 1px `border/000` line-inclusive box.

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| head style (the 2026-09-01 revision) | `text/xl/Regular` | `text/xl/Regular` | `text/2xl/Regular` | `text/2xl/Regular` | `display-sans/2xs/Regular` |
| head row | 2t | 1t | 1t | 1t | 1t |
| cell grid | 2×2 + 2t disclaimer row | 2×2 + 1t disclaimer row | 3+2 (disclaimer in row 2) | 5 across | 5 across |
| cell box | 5.25t × 4t³ | 5t × 2t | 3t × 3t | 2t × 2t | 2t × 2t |
| numeral style (`display-sans/*/Light`) | sm | xs | lg | md | 2xl *(amended 2026-09-04 — owner direction: the drawn 3xl stepped down; see §9)* |
| label style | `text/sm/Regular` | `text/xs/Regular` | `text/sm/Regular` | `text/md/Light` | `text/md/Light` |

³ at rm the grid is the 0.5t column halved — the cell edges between
columns do not land on lattice (content-box lines, the 014 rm-card
class); at rd1/rd2 the cells register with the lattice columns.

Head copy **In the first four months:** *(amended 2026-08-31 — the
§9 F4a fix, re-read at all five anchors; now matching the built 014
card)*.
The stats: **257** Leads tracked · **22** Consults booked · **14**
New members · **5★** Average rating (the star `color/yellow/400`, the
015 IconStar class — verify the glyph against the built export at
build). Numeral ink `text/200`, labels `text/400` in the `_nav-item`
pill chrome (r 9999, presentational). The fifth cell is the
**disclaimer**: `text/xs/Regular` `text/400` — **Real figures pulled
from Keystone as of June 2026.** *(one canon at all five anchors —
amended 2026-08-31, the §9 F4d fix re-read)*.

### 3.3 · Overview

Head + body + five-point checklist + a three-cell stat row. Container
spans the content column, whole-tick at every anchor (rd2 10t–17t
with the drawn 64px interior top pad — the §1 F1 re-box).

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| head style | `text/xl/Regular` | `text/xl/Regular` | `text/2xl/Regular` | `text/2xl/Regular` | `display-sans/xs/Regular` |
| body / list style | `text/md/Light` | `text/md/Light` | `text/md/Light` | `text/lg/Light` | `text/lg/Light` |
| stat cell box | 4.75t × 4t (2+1) | 5t × 2t (2+1) | 3t × 3t (3 across) | 2t × 2t | 2t × 2t |
| stat numeral (`display-sans/*/Light`) | xs | xs | lg | md | lg |

Head **The Overview**. Body (one canon, all bands): *"Palm Coast
Zivel is a performance-and-recovery studio in Palm Coast, FL — sauna,
cryotherapy, red-light, float, compression, and body contouring.
Keystone replaced a patchwork of manual follow-up with one connected
system: managed Meta ads, a conversion-focused website, and an AI
front desk that texts every new lead back in under a minute."*

The checklist: five rows on the **double-checkmark icon** (24 box,
two strokes `teal/400` + `teal/500` — a new verbatim export, §5.4),
list ink `text/300`:

1. 257 leads captured and tracked in the Keystone CRM since going live.
2. 22 consults booked and 14 leads converted to paying members.
3. A wall of 5-star reviews and weekly blog posts, all run from one
   platform. *(one canon at all five anchors — amended 2026-08-31,
   the §9 F4c fix re-read; the rm/rs/rt variants are gone from the
   file)*
4. An AI front desk sent 12,515 follow-up texts, reaching 243 distinct leads.
5. Produced over 71k impressions and 8k clicks at about 12¢ a click.

The stat row: **8,000** Ad clicks · **47** Hot leads flagged · **14**
New members. Same cell/label construction as §3.2. *(One canon at
every band — the F4e residuals fixed and re-read at the closing
pass: "Hot leads flagged" single-spaced everywhere, the rm numeral
"8,000".)*

### 3.4 · The Business

Head + long body + the **quote-callout** (pull-quote beside a studio
photograph).

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| head style | `text/xl/Regular` | `text/xl/Regular` | `text/2xl/Regular` | `text/2xl/Regular` | `display-sans/xs/Regular` |
| body style | `text/md/Light` | `text/md/Light`⁴ | `text/md/Light` | `text/lg/Light` | `text/lg/Light` |
| quote style (`display-serif/*/ExtraLight`) | 2xs+ | xs | xs | sm | sm+ |
| quote-image box | 10.5t × 10t | 10t × 10t | **6–12** × 6t | **7–12** × 5t | **8–12** × 4t |
| callout top hairline | — | — | 1px `border/000` | 1px | 1px |
| image shadow⁵ | `hard-shadow-square-md` | `hard-shadow-square-md` | `hard-shadow-square-md` | `hard-shadow-square-md` | `hard-shadow-square-md` |

⁴ the rs body's `text/sm/Light` read (a non-monotonic ramp step, §9
F5c) was **fixed at the closing pass — re-read `text/md/Light`**,
matching rm/rt.
⁵ *amended 2026-08-31 — the §9 F5a fix, re-read at all five anchors:*
the `hard-shadow-square-md` now draws at every band (the rt/rd1/rd2
omissions fixed). The shadow is **baked into the delivered exports**
(§5.4) — the build mounts the composited asset; on the rt+ bleed
boxes the export clips the right shadow at the page edge, as
rendered. At rd2 the section carries the drawn 64px interior top pad
(the §1 F1 re-box); heights 9t/7t per §1.

Head **A recovery studio built on great in-person experiences**. Body
(one canon): *"Walk into Zivel in Palm Coast and you exhale. It's a
modern wellness and recovery studio — infrared sauna, cryotherapy,
red-light therapy, float, compression, body contouring, and
cryofacials — built around helping people heal faster, move better,
and feel like themselves again. Regulars describe it as immaculate,
zen, and beautifully curated. Owner Kelly Lang had the hard part
nailed: a space and a team people rave about. What he didn't have was
a way to keep up with the interest it generated. Inquiries came in
from Facebook, Instagram, and the website, but answering them was
manual and slow — and the busier the studio got, the more leads went
cold while Kelly was on the floor with clients."*

The pull-quote: *"I can't imagine what we would be like if we
actually had a website, a brand presence, and AI-driven processes in
place."* — attribution **—Kelly Lang before going all-in with
Keystone** (`text/lg/Light`·`text/400`; the missing space after the
em-dash diverges from §3.7's "— Kelly Lang" — §9 F4). At rt+ the
image bleeds to the page's right edge (the §3.1 class); at rm/rs the
callout stacks (rm: image above quote · rs: image above quote,
full-column).

### 3.5 · The Shift — the before/after cards

Two cards: **before** (`lightgray/200` fill + 1px `border/000`) and
**after** (`base/white` + 1px `border/000` + **`hard-shadow-square`**,
resting — this card's shadow is drawn at rest, not a hover state).
Side-by-side at rt/rd1/rd2, stacked at rm/rs.

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| card box | 10.5t × 10t (stacked) | 10t × 6t (stacked) | 5t × 6t | 5t × 5t | 4t × 4t |
| card label | `text/nav-label` `text/200` — **Before Keystone** / **After Keystone** | | | | |
| stat numeral | `text/xl/Regular` | `text/xl/Regular` | `text/2xl/Light` | `text/2xl/Light` | `display-sans/xs/Light` |
| stat sub-label | `text/xs/Regular` | `text/xs/Regular` | `text/sm/Regular` | `text/md/Light` | `text/md/Light` |
| body / checklist style | `text/md/Light` | `text/md/Light`* | `text/md/Light` | `text/md/Light` | `text/md/Light` |

\* *amended 2026-08-31 at build:* the rs body re-read `md/Light`
(the drafted `sm` rode the F5c rs normalization). The before body is
a **drawn unordered list** (bullets at every band) and the card
labels carry textCase upper — both re-read at build (§9).
| stat-pair divider (1px `bg/500`) | — | — | — | drawn | drawn |

Stat pairs: before **Manual** Lead follow-up · **1–2 hrs** Response
time; after **Automatic** · **< 1 min**. Before body (one text node,
four lines): *Several disconnected tools to juggle / Leads from ads
and the site landed in different places / Follow-up waited until
someone got off the floor / No single view of what was actually
working*. After checklist (the §3.3 double-checkmark at 20): *One
platform to run everything · Ads, site, leads, and reviews live in
one dashboard · Every lead gets an instant, on-brand text back · The
dashboard shows what's working*.

**The Wow! tag**: `yellow/400` fill, radius 0/0/6/6 (bottom corners),
`text/xs/Medium` ink `yellow/700`, 52 × 28, hanging below the after
card's bottom-left (x 20/24) into the section gap at every band — the
012 bottom-tag grammar.

### 3.6 · The Funnel

A stroked container (1px `border/000` all sides, line-inclusive; 7t
wide at rd2 — narrower than its neighbors, cols 3–10) holding head ·
subhead · four funnel rows · disclaimer. Pad 16 (rm/rs/rt) / 20
(rd1/rd2).

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| container | 10.5t × 14t | 10t × 9t | 10t × 7t | 10t × 6t | 7t × 5t |
| head style | `text/xl/Regular` | `text/xl/Regular` | `text/2xl/Regular` | `text/2xl/Regular` | `display-sans/xs/Regular` |
| subhead style | `text/md/Light` | `text/md/Light` | `text/md/Light` | `text/lg/Light` | `text/lg/Light` |
| row label style | `text/xs/Regular` | `text/sm/Regular` | `text/sm/Regular` | `text/md/Light` | `text/md/Light` |
| numeral style | `text/xl/Regular` | `text/2xl/Regular` | `text/2xl/Regular` | `display-sans/2xs/Light` | `display-sans/2xs/Light` |
| bar height / label col | 48 / 80 | 48 / 104 | 48 / 104 | 56 / 104 | 56 / 104 |

Head **From first click to paying member** · subhead *"How tracked
leads moved through the pipeline once the AI front desk started
replying instantly."* The four rows (label · bar · value): **Leads
captured 257** — the bar fills the row to the container pad; **Flagged
as hot by the AI 47** — bar 130px; **Consults booked 22** — bar 60px;
**Converted to members 14** — bar 40px. Bars 1–3 fill `bg/300` with
the numeral inside at 16 (ink `text/200`); bar 4 is **`teal/400`**
with its numeral **outside** the bar (rows 3–4 numerals sit 16px right
of the bar), ink `teal/800` on the teal bar's row. The small-bar
widths are material px at every band (only bar 1 rides the width).
Disclaimer (`text/sm/Light` · `text/400`; `xs` at rm): *"Hot-lead
count reflects leads the AI front desk flagged as high-intent.
Members = leads marked purchased in the CRM."* The drawn "Consults
booked" carries a double space at several bands — §9 F4.

### 3.7 · The Stack — the services table

A stroked header block + a table of stroked cells (all 1px
`border/000`, shared line-inclusive edges — the 011 R17 law).

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| header block | 10.5t × 5t | 10t × 3t | 10t × 3t | 10t × 2t | 8t × 2t |
| logo cell | — | — | 1t × 9t | 1t × 6t | 2t × 4t |
| service cells | 2 × 3 of 5.25t × 5t | 2 × 3 of 5t × 3t | 3 × 2 of 3t × 3t | 3 × 2 of 3t × 3t | 3 × 2 of 2t × 2t |
| title style | `text/md/Medium` | `text/md/Medium` | `text/lg/Medium` | `text/xl/Medium` | `text/xl/Medium` |
| desc style | `text/xs/Light` | `text/xs/Light` | `text/sm/Light` | `text/md/Light` | `text/md/Light` |

Head **Everything Keystone runs for Zivel** (`display-sans/xs/Regular`
at rd2, `text/2xl/Regular` rt/rd1, `text/xl/Regular` rm/rs, ink
`text/100`). Subhead *(the F4b replacement copy, landed and re-read
at the closing pass — one canon at every band)*: **"How Zivel looks,
who answers, and what people are saying about it all handled from
one platform."** (`text/md/Light` rm/rs/rt · `text/lg/Light`
rd1/rd2 — re-read with the copy; the draft's rs `sm` read rode the
same fix). The logo cell
(rt+): a `bg/300` radius-8 chip (32/40/48 box) holding the standing
registry logomark at 16/20/24, ink `text/200`. Six service cells,
icons 26–32 at pad 16/20, titles/descs ink `text/300`:

1. **Website** — A custom website, built for your business, hosted
   with no traffic limits.
2. **Meta Ads** — Campaigns managed end-to-end and optimized for
   spend. *(hyphen-space drift drawn per band — §9 F4)*
3. **AI Front Desk** — Instant text follow-up that answers questions,
   qualifies, and books 24/7.
4. **Content Engine** — 14 published blog posts that build local
   search visibility over time.
5. **Reviews** — Review capture that turned happy clients into a
   5-star public reputation. *(rm/rs drop "public" — designed
   per-band shortening, the §9 F4f resolution)*
6. **Reporting** — Ads, leads, bookings, and reviews tracked in a
   single place. *(one canon at every band — amended 2026-08-31, the
   F4f fix re-read; the draft's "…Kelly actually checks" is gone
   from the file)*

The cell icons are sheet glyphs (the 011 list-icon family — website,
Meta/ads, reception bell, listings, reviews, rotate-sparkle); §5.4
inventories reuse vs new export.

### 3.8 · The Result

The proof block: full-width site photograph · pull-quote · head +
body · the **case-study-button** (§5.3) linking to the live site.

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| image box | 10.625t × 7t⁶ | 10t × 6t | 10t × 6t | 10t × 6t | 8t × 5t |
| quote style (`display-serif/*/ExtraLight`) | 2xs+ | xs | sm | sm | sm+ |
| quote top hairline | —⁷ | 1px `border/000` | 1px | 1px | 1px |
| head style | `text/xl/Regular` | `text/xl/Regular` | `text/2xl/Regular` | `text/2xl/Regular` | `display-sans/xs/Regular` |
| body style | `text/md/Light` | `text/lg/Light` | `text/lg/Light`* | `text/lg/Light` | `text/lg/Light` |
| button size | sm | lg | lg | lg | lg |

\* *amended 2026-08-31 at build:* the rt body re-read `lg/Light`
(with rs/rd1 — the drafted `md` was the outlier). The §3.4/§3.8
bodies are each two drawn paragraphs and the attributions step with
the body (`md` rm/rs/rt · `lg` rd1/rd2) — the §9 build record.

⁶ the rm blocks re-read on the 0.5t column at the closing pass (the
§9 F2 fix — quote, head, body, and button all x 16 / 336-wide); **one
interior residual**: the `result-image` is still **340 wide** (16 →
356, 4px past the 352 column edge; its container hugs 368) — 336
expected, the export re-cuts with it (§5.4/§9). ⁷ the rm quote block
draws no hairline — **intent** (owner, 2026-08-31 — §9 F5b); every
other band keeps it.

Quote: *""Too many leads! Had a great conversation with a new lead
that came in through the website. She'd seen the Facebook ad... filled
out the form, and I booked her for a Day Pass today.""* — **— Kelly
Lang, Owner of Palm Coast Zivel**. Head **A front office that runs
itself**. Body (one canon): *"Zivel is closing memberships at a pace
Kelly describes as "a new member close per day," and the lead engine
has gone from a trickle he chased to a flow he has to keep up with.
The reviews back it up: a perfect 5-star average across the studio's
public profile. The deeper win is leverage. The same small team now
reaches hundreds of prospects, answers every one instantly, and never
loses a lead to a slow reply — without anyone working nights to make
it happen. That's the difference between a great studio and a great
studio that's also a growing business."* The button label **View the
Palm Coast Zivel website** → the live site (§5.2), opening in a new
tab (an external destination — the site's first; `rel="noopener"`).

### 3.9 · Call-to-action — the boilerplate band

A top-hairline band (1px `border/000` top edge): the **hero's
chip-flow boilerplate** (spec 006 §3 — the same words, chips, and
inks; the "keystone" wordmark vector at `text/200`; the `website`
chip on `teal/250`, the five engine chips on the 300-ramp with /700
inks, Sales-calls-class orange/600 absent here) at `text/lg/Light` rm
· `xl` rs · `lg` rt · `xl` rd1 · `2xl` rd2 — followed by the CTA row:
the 003 **ButtonFill** `chrome=gray` (md at rm/rs, lg at rt/rd1, xl
at rd2 — *amended 2026-08-31 at build: the drawn rd2 mounts read
`size=xl`; the draft's "lg at rt+" was the rt/rd1 read*) **Get
Started** → `/pricing` (the 014 decision) · the material label **Got
a question?** (dropped at rm) · the 003 **ButtonGhost** brown
(md/md/lg/lg/xl) **Talk to us** — inert on the standing `open-chat`
contract. Copy:
*keystone powers your [website] and everything that runs through it:
[ads] [social] [reviews] [content] and [follow-ups] that convert.*
The rm chip labels are drawn unbound and the rd2 "keystone powers
your" run reads mixed — **resolved 2026-08-31 (§9 F7): the same
known condition as the homepage hero's subhead component; the build
follows the built hero's treatment** (the band's subhead style bound
in CSS; no file dependency).

## 4 · The sticky TOC — rd2-only chrome, one island

**Geometry** (drawn at 1344): a column at **col 1** (x 1t; *amended
2026-09-01 — design widened the hugging 119 to a fixed **176** item
width so "The Business" holds one line; re-read from the nodes*),
six items 30px tall on an 8px gap (220 total); item pad 16 left / 8
right / 4 vertical; a **1px `border/000` left rail** on the list
container — the rail sits on the col-1 lattice line. Items `text/md/Light` ink `text/400`; the **active item**
carries a **2px `teal/400` left border** (replacing the hairline over
its 30px) with `text/md/Medium` ink `text/200`. Items: **Overview ·
The Business · The Shift · The Funnel · The Stack · The Result** —
anchor links to the six §3.2–§3.8 sections.

**Band gate:** the TOC renders **only in the rd2 band** (the ≥1130
structural gate; owner direction — it disappears at smaller sizes).
No other anchor frame draws it.

**Behavior** (owner intent: scroll with the page, fix at 1t; the
drawn evidence: the resting frame draws the TOC at the Overview top
with Overview active; the scrolled frame `713:49098` draws it fixed
at **y 112 = 1t** (111 = the −1 artifact class) with **The Shift**
active mid-page):

- **Sticky:** the TOC lives in the col-1 rail beside the section
  stack, `position: sticky; top: 1t` (the offset rides the tick —
  `calc(var(--t))`), from its resting line at the Overview top until
  its containing rail ends at The Result's end. CSS-only; no
  measurement. *(The resting line is ruled — owner, 2026-08-31 at
  the closing pass: the TOC rests **aligned with `overview-content`**,
  the Overview's interior content line (y 1184 at the anchor — 64px
  inside the section's 10t top), not the section frame's top. Verified
  level with the node.)*
- **Scrollspy** (the island): the active item tracks the section
  under the reading line. The spec's rule (the drawn scrolled state
  confirms it): **active = the last section whose top sits at or
  above one-third of the viewport height**; below the first section
  and past the last, the ends clamp. Driven by an
  IntersectionObserver on the six section roots (no scroll-handler
  math); the island writes one value (the active id) as a `data-`
  attribute on the list root, CSS renders the dressing.
- **Click:** native anchor navigation (the sections carry ids);
  smooth scroll under motion-ok, instant under reduced motion (§6).
  The URL hash updates per anchor semantics.
- **No-JS:** the rail renders sticky (CSS) with working anchor links
  and the drawn resting state (Overview active). Reduced motion:
  active updates state-to-state.

The island is this page's one new client island. It never measures
the grid; the band gate is the standing container-query display
switch.

## 5 · The template, the data, the new set

### 5.1 · One template, N case studies

The page is a **template**: every section renders from a typed
per-study data module (the prop-driven law). This spec builds the
template and its first instance — **Palm Coast Zivel** at
`/case-studies/palm-coast-zivel` (the 014 slug canon, verified against
`main`). **The delivery is phased** (owner direction 2026-08-31, the
§9 F9 resolution): **Phase A** — the template + Zivel, built and
QA'd under §10; **Phase B** — the remaining studies flow in as
**content passes** (copy + image tiers per study, each a
content-only commit touching the data module and the media registry,
nothing else — no new spec unless design changes the template).
Until a study's pass lands its route stays 404 — no placeholder
pages ship.

The data module `design-system/v2/sections/case-study-data.ts`: one
`CaseStudy` record carrying slug · name · H1 · metadata (category,
location, founders, since) · tags (label + color role) · intro stats
(+ disclaimer) · overview (body + checklist + stats) · business
(head, body, quote) · shift (pairs, lines) · funnel (rows + bar
widths + disclaimer) · stack (cells) · result (quote, head, body) ·
the live URL · image alts. The §3 copy above is the Zivel canon
(single-spaced, curly apostrophes).

*Amended 2026-09-04 (owner ruling — the clearance law, rules.md
"Content clears the lattice"):* the record also carries optional
**`extraTicks`** (overview · shift · result, per band) — per-study
whole-tick growth on the template's fixed frames where a study's copy
runs longer than the drawn Zivel interior. Flowed content keeps ≥
half a tick of vertical clearance from the next section or a
bottom-anchored block; an overrunning frame grows to the next tick so
the anchored block (the overview stat row) and everything below slide
down whole-tick. The heights ride `--csx-*` vars set inline from the
data (0 when unset — Zivel renders byte-identical); the shift growth
lands on the section + the after card (the variable-length checklist
interior; the before card keeps the drawn box). **The painted
lattice rides the growth** (amended 2026-09-04, second pass — the
owner's grid–content relationship ruling): each growable section's
map is [leading col-11 rail, …bottom-anchored regions] per band —
the leading rail extends by the extra rows; the widenings drawn
beside the stat rows and the tail rails shift down with the frame
bottom; ornament cells at or below the bottom-anchored run shift
with it (`grownBand` in `case-study-lattice.tsx`). A break in the H1
renders only before a non-empty segment, so a study without drawn
breaks carries its whole H1 in seg1 (the same pass).

### 5.2 · The live URLs (owner delivery 2026-08-29, with the 016 list)

| study | slug | URL |
|---|---|---|
| Palm Coast Zivel | `palm-coast-zivel` | `https://palm-coast-zivel-35621640.rahul-0b6.workers.dev/` |
| Your Health Solutions | `your-health-solutions` | `https://your-health-solutions-66700434.rahul-0b6.workers.dev/` |
| Bare Lúx Studio | `bare-lux-studio` | `https://bare-lux-studio-93591379.rahul-0b6.workers.dev/` |

The §3.8 button targets the study's URL (a plain external link — not
the 016 viewer; the viewer stays a gallery surface).

### 5.3 · The `case-study-button` set — a new primitive

`715:50431`, state (default/hover/focus) × size (lg/sm). An
underlined text link + arrow icon:

| | lg | sm |
|---|---|---|
| label style | `text/lg/Light` | `text/md/Light` |
| icon box | 24 | 20 |
| label→icon gap | 12 (hover **16**) | 12 (hover 16) |

States: default ink `text/300` · **hover** ink-up `text/100` with the
gap advancing 12 → 16 (the 014 ButtonInline glyph-advance grammar —
built paint-in-place on the standing hover clock, alias never fork) ·
**focus** the label box washes `bg/300` (the standing focus wash).
The underline is drawn on the text: solid, **5% thickness,
`bg/500`-bound decoration ink, skip-ink** — carried in CSS as
`text-decoration` with the token *(amended 2026-09-01, owner
direction: plus `text-underline-offset: 18%`; the set's drawn
underline remains dropped file-side post-F11 — §9)*. Icon ink `text/500` (the arrow
holds its own ink through states as drawn). *(Amended 2026-08-31 —
§9 F11: design added a `label` text prop to the set (default "View
the Palm Coast Zivel website") and renamed the stale layer; the label
is per-instance content, as the primitive's prop API assumed.)*
Primitive `design-system/v2/primitives/case-study-button.tsx` +
`.css`, prop-driven (label, href, size), a real `<a>`; `/primitives`
rows in the same commit.

### 5.4 · Assets and icons

1. **Images — received 2026-08-31** (§9 F6/F8 resolution): fifteen
   WebP tiers in
   `~/Dropbox/…/03-newsite/case-studies/zivel/export`, three
   photographs (header · quote/studio · result) × five anchors,
   verified against the drawn boxes at 2×. **The suffixes are
   Figma's dedup numbering** — unsuffixed = 768 · `-1` = 1344 ·
   `-2` = 384 · `-3` = 960 · `-4` = 576; renamed at intake to
   `casestudy-zivel-{header|studio|result}-{384|576|768|960|1344}.webp`
   in `public/media/case-studies/` (the registry naming law) with a
   builder extension in `v2/media.ts`; tier gates on the structural
   gates. **The header and quote exports are composited**: the
   header carries the `hard-shadow-square` + the §3.1 multiply tint
   baked (+4px canvas right/bottom at 1×), the quote carries
   `hard-shadow-square-md` baked (+3px; the rt/rd1/rd2 right shadow
   clipped at the page edge, as rendered); the result tiers are
   exact 2× with no dressing. **Mount rule:** the `<img>` renders at
   the canvas size anchored to the drawn box's top-left, so the
   baked shadow lands exactly where the token shadow would — no CSS
   shadow or blend on these two images (the 012 persona baked-wash
   precedent). Accepted consequence, recorded: a baked shadow rides
   the image's tick scaling between anchors (±20% worst-case in the
   compressed slices) where a token shadow would hold material px.
   **Two tiers await re-cuts after the closing-pass resizes** (the
   delivered files still match the old boxes): the rt header tier
   656×656 → **648×648** (the box trued 324 → 320 = 5t), and the rm
   result tier 680×448 → **672×448** once the §3.8 image residual
   (340 → 336) lands. Byte-only swaps; nothing else in the set moves.
2. **Icons.** New verbatim console-bridge exports:
   `IconDoubleCheckmark` (the 24-grid two-stroke check, inks
   `teal/400`/`teal/500` baked as currentColor pair — export decides
   at build per the 013 R8 stroke test). The six stack glyphs and the
   intro star are checked against the built sheet exports
   (`IconWebsite` · `IconReception` · `IconReviews` · `IconStar` ·
   `IconArrowRight` already ship) — reuse on glyph match only; export
   the missing (Meta-ads, listings/content, rotate-sparkle) verbatim.
   The CTA wordmark vector is the built hero's asset (never
   re-exported).
3. **Constants** (`--cs-*`, component token layer): the TOC offsets
   (item pad 16/8/4, gap 8, the 2px active rule, the 1t sticky top —
   tick-riding, declared on `.page`), the funnel bar widths
   (130/60/40 + per-band heights 48/56 and label cols 80/104), the
   Wow-tag box (52×28, radius 0/0/6/6), the chip radius 4 (shared
   with the hero's standing constant), the stat-cell pads (12/16/20/
   24 per band as drawn). Shadows are the standing tokens
   (`--shadow-hard-square`, `--shadow-hard-square-md`); inks and
   type all standing tokens. No new file variables anticipated; the
   pre-build re-extraction runs regardless (001 rule).

## 6 · Motion

**The page rises like Our Work** (owner direction 2026-08-31 — the
§9 F10 resolution): the 014 rises-only entrance through the
**generalized load orchestrator** (its third consumer; the page opts
in via its own choreography guard, the `v2-choreo-rise` pattern —
the homepage and Our Work untouched). The spec's beat table (the 006
delay ladder, fade-rise only — no nav beat, no lattice sweep, no
highlights):

| beat | element | delay |
|---|---|---|
| h1a | slug | 80ms |
| h1b | H1 | 190ms |
| meta | metadata column (+ tags) | 330ms |
| img | the header photo | 440ms |
| settle | — the img beat's `animationend` marks `v2-settled` | |

Four animations exactly; everything below the header (intro, the six
sections, TOC, CTA, footer) is born settled and never animates. The
TOC never joins the choreography (chrome-adjacent; born settled).
Resizing across gates never replays (the settle contract).

The other values (approval covers; design may veto):

- **TOC active handoff:** the teal rule and ink swap state-to-state
  (no slide — the 30px items sit on an 8px gap; a sliding rule reads
  as lag against anchor jumps). The item hover: ink-up
  `text/400 → text/200` on the standing hover clock.
- **Anchor scroll:** `scroll-behavior: smooth` on the motion-ok
  media; instant under reduce.
- **The §5.3 button:** hover ink-up + the 4px advance on the standing
  003 clock (`--motion-hover-duration`/`-ease`, aliased); focus wash
  instant (the standing focus law).
- **Buttons in §3.9** are the standing primitives' own grammars.
- **Reduced motion / no-JS:** the whole page renders settled (no
  rise, no timers — the cold-load guard's standing media exclusions);
  the TOC's no-JS posture is §4's.

## 7 · Page assembly

The 013 §7 shape, fourth page.

### 7.1 · The expectations module

`app/case-study-fixture/expectations.ts` — totals **227 · 154 · 110 ·
89 · 74**; the §1 landmark table as the section spans (the rd2
Overview/Business rows whole-tick per the F1 re-box); footer heights
24 · 21 · 15 · 12 · 11. Landmark kinds: `header` (px-riding top —
latticeExempt, the 013 precedent's kind) · `intro` · `overview` ·
`business` · `shift` · `funnel` · `stack` · `result` · `cta`
(content-hugging — latticeExempt class per the 016 `cta` precedent) ·
`toc` (rd2 only; overlay-adjacent rail — declared, the col-1 line is
its designed seat) · `top`/`nav` (the footer's standing cells).

**Clearance:** the page draws the full-field lattice *behind* content
by construction, so the assertion's exposed-cell set is the
**ornament rail** (§2's specials) plus the drawn margins; the
full-field backdrop is declared page-wide (a `latticeField` flag —
the harness gains it in this spec's sweep-leg commit; the ornaments
themselves must stay content-clear at every audited width, no
exceptions anticipated).

### 7.2 · The sweep leg

`scripts/grid-selftest.mjs` gains `/case-study-fixture`: the five
anchors + the ten slice widths, scrollbar forced on, **settled before
asserting** (the §6 four-beat rise — the audits-at-rest law).
Rest-state drives:

- the footer drawer open/closed at rm/rs (the standing `data-drawer`
  contract) and the mobile nav open/closed (overlays — the stack
  unchanged);
- **the TOC**: at the rd2 widths — resting (above the sticky line),
  scrolled (fixed at 1t; the audits green with the rail fixed),
  active-follows-scroll (drive to The Shift's range, assert the
  active id), an anchor click (land on the target top, hash
  updated); at sub-rd2 widths — the TOC absent from the tree;
- the §3.8/§3.9 links resolve (the external URL asserted as an
  attribute, never loaded — the 016 hermetic precedent).

`npm run test:grid` stays the entry point; five routes green in one
run.

### 7.3 · Budgets

Measured on the production build and recorded in acceptance: the
route static; the page's island count **five** (nav-desktop ·
nav-mobile · footer-nav · **the TOC island** · **the §6
orchestrator**); `/case-studies/palm-coast-zivel` route JS and first load
recorded (the first `/case-studies/*` baseline); every other route
byte-unchanged (the icons-chunk lesson, 016 §9, is the known ripple
class — new icon exports land in `v2/icons.tsx` and the shared-chunk
delta is recorded, not hidden).

## 8 · Deliverable — files, semantics

1. **Sections** `design-system/v2/sections/case-study-*.tsx` + css —
   server components: `case-study-header` · `case-study-intro` ·
   `case-study-overview` · `case-study-business` · `case-study-shift`
   · `case-study-funnel` · `case-study-stack` · `case-study-result` ·
   `case-study-cta` (the CTA band reuses the hero boilerplate's
   markup pattern and the standing button primitives).
2. **The TOC island** `case-study-toc.tsx` (+ css) — §4's machine —
   and the §6 entrance: the generalized orchestrator mounted through
   a page wrapper (the `HeroLoad`/Our-Work pattern at its third
   consumer), the page's own choreography guard in the composition's
   css. Two new islands on the page.
3. **The primitive** `primitives/case-study-button.tsx` + css
   (§5.3) + `/primitives` rows.
4. **The composition** `v2/case-study.tsx` (nav · header · intro ·
   TOC rail + section stack · CTA · footer) mounted by
   `app/case-studies/[slug]/page.tsx` (static params from the data
   module — only populated studies build; unpopulated slugs 404) and
   the noindexed **`/case-study-fixture`** (the QA mount, the `qa`
   slot wired).
5. **Data** `sections/case-study-data.ts` (§5.1, the Zivel record) ·
   the media-registry builder + the §5.4 tiers (received; renamed at
   intake) · icons into `v2/icons.tsx`.
6. **Harness** — §7.1 expectations · the §7.2 sweep leg (+ the
   `latticeField` assertion extension).
7. **Semantics:** the page `<h1>` is the H1; the slug an aria-hidden
   eyebrow; the metadata a `<dl>`; the tags a `<ul>` (decorative
   color, real text); every §3 section a `<section>` with an id and
   `aria-labelledby` its heading (h2); the TOC a
   `<nav aria-label="On this page">` `<ul>` of anchors,
   `aria-current="true"` on the active item; the stat cells `<dl>`s
   (the 014 pattern); the quotes `<figure>`/`<blockquote>` with
   `<figcaption>` attributions; the funnel a `<dl>` (term = the
   label, value = the numeral; the bars presentational); the checkmark
   lists `<ul>` with aria-hidden icons; the photographs meaningful
   `alt` from the data module; the §3.8 link named "View the
   {name} website" opening a new tab with `rel="noopener"`; the §3.9
   chips the hero's standing aria treatment (the visual chip row
   aria-hidden, the prose readable). Interim `<title>` from the study
   name (the G4 wipe covers final metadata).
8. Docs in the same commits: plan.md's record and the launch
   checklist's Case Studies row.

## 9 · Resolutions record

Draft flags raised 2026-08-31 (afternoon); the owner's responses and
design's fixes landed the same evening — **every fix re-read from the
touched nodes through the bridge** (the flag→fix→re-read loop).
Resolved unless marked open.

- **F1 — resolved (design fix, re-read 2026-08-31): the rd2
  Overview and The Business frames re-boxed whole-tick.** The draft
  read their tops off-tick at 1184/1968 (10t+64 / 17t+64) with
  whole-tick bottoms. Re-read: Overview **10t–17t** (784 = 7t) · The
  Business **17t–26t** (1008 = 9t), contiguous with the intro's 10t
  end; the 64px moved inside each frame as a drawn interior top pad
  (the interiors render unchanged). §1/§3.3/§3.4 amended. The
  `fixed-toc-nav` resting line rode as a residual and **was ruled at
  the closing pass (owner): the TOC rests aligned with
  `overview-content`** — the interior content line (y 1184), not the
  section frame top; verified level with the node (§4 amended).
- **F2 — resolved (design fix after a plain-language walkthrough +
  an in-file selection of the two nodes; re-read at the closing
  pass), one interior residual.** At the 384 anchor, `The Result`
  (`711:40682`) and `call-to-action` (`711:40714`) had sat at x 12 /
  w 340 against the page's 0.5t column (x 16 / w 336). Re-read:
  both frames and every interior block are on the column — the CTA
  at 16/336, the Result's quote/head/body/button at 16/336. **The
  residual: `result-image` is still 340 wide** (16 → 356, 4px past
  the 352 column edge; its hug containers read 368) — 336 expected;
  its export tier re-cuts with it (§5.4). With the fix, the delivered
  rm result tier (680×448 = 2×340) goes stale the same way.
- **F3 — resolved (design fix, re-read 2026-08-31): the rs/rt slug
  weights.** Both re-read `text/xs/Medium` — Medium at every band
  (the third recurrence of the 011 R3 class, fixed same-day). §3.1
  amended.
- **F4 — the copy canon set:** **(a — resolved, fixed + re-read):**
  the intro head reads **"In the first four months:"** at all five
  anchors, matching the built 014 card.   **(b — resolved, owner copy delivered + re-read at the closing
  pass):** the stack subhead was a copy-paste slip of the funnel's;
  the replacement landed — **"How Zivel looks, who answers, and what
  people are saying about it all handled from one platform."** — one
  canon at all five anchors (§3.7 amended; the rs style rode along
  sm → md).   **(c —
  resolved, owner + design fix, re-read 2026-08-31 late evening):**
  overview checklist item 3 had been drawn three ways (5.0★/5-star ·
  "14 published"/"weekly" · "one login"/"one platform"); the owner
  ruled **5-star** and design unified the string — re-read one canon
  at all five anchors: **"A wall of 5-star reviews and weekly blog
  posts, all run from one platform."** §3.3 amended.
  **(d — resolved, fixed + re-read):** the intro disclaimer is one
  canon — "Real figures pulled from Keystone as of June 2026."   **(e —
  resolved in two passes, re-read):** "Hot leads flagged" landed at
  rm/rd1/rd2 first; the rs/rt double space and the rm "8,000+" (the
  014 F1 didn't-land class) were fixed at the closing pass — one
  canon everywhere ("Hot leads flagged" · "8,000"). **(f — resolved, fixed + re-read):**
  Reporting is one canon everywhere ("Ads, leads, bookings, and
  reviews tracked in a single place."); the Reviews rm/rs shortening
  (no "public") is **designed per-band copy**. §3.7 amended. **(g —
  resolved, owner ruling):** the H1 double spaces are **designed
  per-viewport rag** — each anchor pins its own break (rs/rd2 after
  "lead", rt after "helped"); the build renders the drawn breaks
  explicitly (§3.1 amended). The remaining g-items are fixed or
  designed as intended (the funnel "Consults booked" re-read
  single-spaced).
- **F5 — resolved:** the flag bundled the rt header-image and the
  shadow/hairline splits. **(size — resolved in two passes):** design
  resized the rt header image from the full-bleed 384 (6t, cols
  6–12) first to 324, then trued it **320 × 320 = 5t** at the closing
  pass (re-read; §3.1 amended); the delivered 656×656 tier re-cuts to
  648×648 (§5.4). **(a — resolved, fixed + re-read):** the quote
  image draws `hard-shadow-square-md` at **all five anchors** now
  (the rt/rd1/rd2 omissions fixed); §3.4 amended. **(b — resolved,
  owner):** the rm Result quote's missing hairline is **correct as
  drawn**. **(c — resolved at the closing pass, re-read):** the rs
  Business body reads `text/md/Light`, matching rm/rt; §3.4 amended.
- **F6 — resolved (owner, 2026-08-31): the `#5a0b0b` is a designed
  tint.** The draft misread it as residue under the image; it sits
  **on top** — a 10% multiply overlay warming every header photo —
  and is **baked into the delivered exports** with the shadow. The
  build mounts the composited asset (§3.1/§5.4 amended); the unbound
  hex stays a file-side note only.
- **F7 — resolved (owner, 2026-08-31): the homepage precedent.** The
  same unbound-subhead condition exists in the hero's file component
  and was resolved at the 006 build: the build binds the band's
  subhead style in CSS. This page's CTA band follows the built hero's
  treatment; no file dependency.
- **F8 — resolved (delivery, 2026-08-31): the fifteen image tiers
  landed** in `~/Dropbox/…/case-studies/zivel/export` — verified
  against the drawn boxes at 2× (§5.4 carries the suffix map, the
  baked shadow/tint canvases +4/+3, the bleed-edge clipping, and the
  intake renames). The build gate is clear; two tiers track the F2
  and F5-size residuals.
- **F9 — resolved (owner, 2026-08-31): 404s confirmed + the phased
  content-flow.** No placeholder pages. The delivery is phased —
  **Phase A: template + Zivel, built and QA'd; Phase B: the remaining
  studies flow in as content-only passes** (copy + tiers into the
  data module and registry; no new spec unless the template changes).
  §5.1 amended; plan.md carries the phasing.
- **F10 — resolved (owner, 2026-08-31): the page rises like Our
  Work.** §6 rewritten: the 014 rises-only entrance through the
  generalized orchestrator at its third consumer — four beats (slug ·
  H1 · metadata · the header photo) on the 006 delays, settle on the
  photo's rise; everything below the header born settled. The island
  count becomes five (§7.3) and the sweep waits for settled (§7.2).
- **F11 — resolved (design fixes, re-read 2026-08-31):** **the rd2
  Grid frame trued** (re-read 63t, flush with the footer top); **the
  `case-study-button` set gained a `label` text prop** (default the
  Zivel string; the stale variant layer renamed — re-read, §5.3
  amended); and **the six degenerate one-px "Frame 312"
  `_nav-button` shells are deleted** (the exact node list supplied at
  the late-evening pass; all six re-read GONE). (The 1px "Frame 612"
  nodes inside the Shift cards were never this class — they are the
  designed `bg/500` stat dividers, §3.5.) The stale "Case studies"
  layer name on the CTA ghost's label stands as a note; nothing
  builds from it.
- **Revision — the 768 CTA→footer spacing (design, 2026-08-31 late
  evening, delivered with the F2 answer; re-read from rendered
  bounds).** The rt call-to-action→footer gap grew 1t → 2t: the CTA
  holds 90–93t, the footer top moved 94t → **95t**, the page total
  **109t → 110t**, the Grid layer 95t (cells 1140), and the
  pre-footer ornament rode along — ■[11,93] → **■[11,94]**. §1, §2,
  and §7.1 amended; no other anchor moved.

**Build record (2026-08-31, the night build — every value re-verified
from rendered bounds and, for the exposure, per-cell stroke
visibility through the bridge; the token layer re-extracted first
with one drift: the new `display-serif/2xs+/ExtraLight` style — this
page's rm quote step — landed in the snapshot and type.css, nothing
else moved; the four effect styles confirmed, `noise` still absent).**

- **The rs run below The Business rode down 1t** (the F5c rs body
  normalization `sm → md` grew the hugging interior; the §1 draft
  column predated the knock-on). Re-read whole-tick and contiguous:
  The Shift **67t** · The Funnel **80t** · The Stack **90t** · The
  Result **103t** · call-to-action **126t**; the footer (133t) and
  total (154t) unchanged; the §2 ornaments moved with it —
  ●[11,66] → **●[11,67]** · ■[11,89] → **■[11,90]**. §1/§2 amended.
- **The §2 exposure corrected — the "full-field lattice" was the
  presence read** (the hero §2 erratum class: the Grid layers hold a
  cell rectangle at every position, but only some carry the visible
  stroke). Per-cell stroke re-read at build: the painted exposure is
  the standing east-edge staircase, a col-11 rail running the whole
  page, designed widenings beside the stat rows (rm r58–65 [10,11] ·
  rs r41–42 [6–11] · rt r13–15 [10,11] + r16–18 [7–11] · rd1 r19–20
  [7–11] · rd2 r15–16 [9–11]), and **one full-lattice row directly
  above the footer at every band** (r202 · r132 · r94 · r76 · r62).
  Four of the §2 draft's ○ cells carry radius but neither stroke nor
  fill — invisible (the pricing [8,13] hygiene class): rm [9,29] ·
  rs [8,14] · rd1 [8,12] · rd2 [8,12]; nothing builds from them,
  riding with design. §2 amended; `case-study-lattice.tsx` is the
  transcription record. The §7.1 `latticeField` harness flag is moot
  under the corrected map and was not built; the drawn behind-content
  overlaps land as declared clearance exceptions instead
  (header/intro/overview/business/cta, citations in the expectations
  module).
- **The rm `result-image` fix landed file-side during the build**
  (re-read 336×224 at x 16 — the status ruling's 336 now matches the
  file). The delivered 680×448 tier mounts until the 672×448 re-cut
  lands (byte-only swap; ditto the rt header 656→648).
- **Structure re-reads built explicitly:** the §3.4 and §3.8 bodies
  are each **two drawn paragraphs** (breaks after "beautifully
  curated." / before "The deeper win"; the style's ps-12 carries the
  gap); the §3.5 before-lines are a **drawn unordered list**
  (bullets); the card labels carry textCase upper (the nav-label
  mount). §3 amended in place.
- **Style/geometry deviations, all monotonic-normalization class,
  amended in place:** the rs Shift body/checklist reads `md/Light`
  (the drafted `sm` rode the F5c normalization); the rt Result body
  reads `lg/Light` (with rs/rd1 — the drafted `md` was the outlier);
  the quote attributions step with the body (`md` rm/rs/rt · `lg`
  rd1/rd2 — the §3.4 flat `lg` was the rd2 read); the rd2 CTA
  buttons mount **size xl** (the §3.9 "lg at rt+" was the rt/rd1
  read); the rm header chips draw **radius 2** (4 from rs — the 012
  radius-step class); the rm chip order is **canonical** (the §3.1
  "rm/rt" parenthetical holds at rt alone); the stack icon boxes are
  material per band as drawn (rm 26 · rs 20 · rt 26 · rd1/rd2
  per-icon 26–32); the §3.8 quote blocks carry drawn designed slack
  (min-heights 240/224/334/320/336, u-riding) and the §3.5 stat
  pills wrap-pin at the drawn 72 (rd1/rd2).
- **File flags riding with design, nothing built from them:** the rt
  stack subhead ink binds `text/100` against the §3 `/300`
  discipline (the 011 R3 binding class — built `/300`); the rs
  funnel "Consults  booked" double space (the didn't-land class —
  the canon single-spaced string builds); the `case-study-button`
  set's text decoration reads NONE post-F11 (the label-prop pass
  recreated the layer and dropped the drawn underline — the build
  renders the approved §5.3 underline); the four invisible ○ cells
  above; the ads/reviews cells' stale layer names ("website" /
  "listings2" — glyph identity verified against the rd2 draws).
- **Harness errata found by this page (fixed in the same commits):**
  the devtools measured the assertion tick from the probe box, which
  the browser rounds to 1/64px — on this page's 227t stack the
  rounding scaled past the ±1.1px row tolerance at 620 against a
  correct build (0.0104px × 133 rows); the assertions now ride the
  exact container ÷ 12 and the probe still verifies the engine's
  resolution. The settle waits (devtools meta + the sweep) matched
  the literal `v2-choreo` class only; they now prefix-match
  `v2-choreo*`, so the rise pages' guards wait too.
- **Revision — the 2026-09-01 type/flow pass (owner direction, the
  011 R13 cadence; every value re-read from the nodes, the renders
  re-compared at rm/rd2 — identical).** Design re-tuned the larger
  anchors' flow and the head ramp: the rd2 section heads stepped
  down to `display-sans/2xs/Regular`, the intro head ramp stepped up
  at rm/rt/rd1 (xl/xl/2xl/2xl/ds-2xs), the §3.6/§3.7/§3.8 rd2 wrap
  boxes and the §3.8 quote→head gap moved (520 · 652 · 544 · 60),
  and **the TOC items widened to a fixed 176** so "The Business"
  holds one line (the scrolled frame `713:49098` still draws the
  stale 119-wide rail — file hygiene, riding with design). The
  build-side pass also pinned the §3.3 body/list wrap boxes
  (304/432/576/640/608 — drawn all along, unpinned in the first
  build). §3/§4 amended in place; the audits re-ran green at the
  anchors and slices. **Owner direction in the same pass: the §5.3
  underline stays** (the set's drawn value remains dropped
  file-side) **and gains `text-underline-offset: 18%`** — a §5.3
  value amendment.
- **Three first-build defects found at the owner's same-day review
  (2026-09-01), fixed and re-measured at all fifteen audit widths:**
  **(a) the tag row gaps doubled** — the forced-break lines each
  added a second flex row-gap (built 8/16 against the drawn 4/8);
  the vertical rhythm moved to item margins (row-gap 0, the breaks
  contribute nothing) and the rows now land on the drawn pixels at
  every band. **(b) the overview stat row rode 1px high** — the
  line-inclusive cells (+1px) were bottom-anchored at the frame end,
  pushing the top border off its tick; the grid now anchors at
  −1px so the bottom border owns the frame-end lattice pixel and the
  top lands exactly (58/39/27/19/15t measured). **(c) the header
  photo mount was doubly wrong** — the canvas-pad calc multiplied
  two lengths (invalid CSS, silently dropped; the reset's max-width
  then squeezed the canvas into the box), and the rm/rs seat was
  flow-derived, drifting off-grid across the rs band (21px high at
  620 — the four-units defect class). The mount now sizes the box at
  exact ticks with the u-riding §5.4 canvas pads (the image edge
  rides the grid, the baked shadow hangs past it), the rm/rs photo
  seats absolutely on its drawn rows (10t/8t), and the metadata
  column seats on its drawn ticks where the file draws them
  (19t/15t/5t at rm/rs/rt; the drawn flow gaps at rd1/rd2). The
  studio and result mounts carried the same width/pad defects —
  fixed in step (exact tick boxes; `--cs-shadow-pad(-md)` consumed
  as lengths). Verified: image top on its tick row at all fifteen
  widths; the tag rows at the drawn 724/743 · 848/878 · 568/598/628
  · 572/602 · 648/682.
- **Revision — the intro numeral step (owner direction, 2026-09-04,
  in-chat; no file re-read — the direction is the source).** The §3.2
  rd2 numeral stepped `display-sans/3xl/Light` (72/78) →
  **`display-sans/2xl/Light`** (64/72); the smaller bands' ramp
  (sm/xs/lg/md) unchanged. Landed in `case-study-intro.css` (the rd2
  container block); template-wide — every case-study page rides it.
  Prompted alongside the Phase B draft records, whose longer metrics
  ("$3.50" · "$25k" · "100k+") crowd the rd2 2t cell at 3xl. §3.2
  amended in place; the grid sweep re-ran green at the anchors and
  slices.
- **Revision — the clearance law and per-study frame growth (owner
  ruling, 2026-09-04, in-chat; the rules.md "Content clears the
  lattice" law landed in the same pass).** Found on the Phase B
  drafts: the Bare Lúx overview checklist touched the bottom-anchored
  stat row (rd2 −7px, rm −38px overlap), the shift after card and
  the rm Result overran their drawn boxes on both new studies. The
  owner ruled content never touches a tick line and keeps ≥ half a
  tick before the next section; the template gained per-study
  `extraTicks` (§5.1 as amended) with the audited values in the two
  draft records (YHS overview rm+1/rd2+1 · shift rm+1 · result
  rm+2/rd1+1; Bare Lúx overview rm+2/rt+1/rd1+1/rd2+1 · shift rm+1 ·
  result rm+3/rd1+1/rd2+1). Zivel carries none and renders
  byte-identical; the clearance probe re-ran green at the ten sweep
  widths on all three pages, and the grid sweep stays green (the
  fixture's Zivel geometry unchanged). The H1 break render went
  conditional in the same pass (a break only before a non-empty
  segment — the YHS title wraps naturally, owner direction). **One
  flag to design:** the drawn Zivel rm Result leaves only ~5px
  between the §5.3 button and the section end (the CTA band's top
  hairline) — under the new half-tick law but drawn that way in the
  file; riding as-drawn pending a design ruling (the
  never-build-a-known-error protocol).
- **Revision — the lattice rides the growth (owner, 2026-09-04,
  second clearance pass).** The first growth build extended the east
  rail from the drawn section end but left the widenings beside the
  stat rows (and their ■ ornaments) on their drawn rows — on the
  grown Bare Lúx and YHS overviews the painted cells sat a row above
  the stat row they were drawn against (the owner's screenshots).
  Replaced with the anchored model in §5.1 as amended: leading rail
  extends, bottom-anchored regions and their ornaments shift with
  the frame bottom. Verified: the widening top re-measured level
  with the stat-row top on both grown pages at every grown band;
  Zivel (no growth) byte-identical.
- **Erratum — the stack's doubled header seam (owner-found
  2026-09-04, fixed same day).** The §3.7 header-block→cell-grid seam
  rendered **two** stacked hairlines at every band (measured −2px
  cell-top→header-bottom against the −1px shared-edge construction):
  the `.cst-table` −1px already seats the grid on the header's bottom
  border, but the cells container carried its own −1px at rm/rs, and
  the rt+ block zeroed the compensating 1px padding so the row-1 −1px
  margin rode above the border. Both removed; the seam re-measured
  **one shared pixel at all five anchors** and the logo-cell top now
  aligns exactly with the cell row (it had sat 1px below the grid's
  top line — the visible misalignment in the owner's screenshot). The
  011 R17 doubled-hairline class, inside one table unit.
- **Revision — hanging punctuation on the pull-quotes (owner
  direction, 2026-09-05, in-chat).** The §3.4/§3.8 quotes hang their
  opening “ outside the wrap box (`hanging-punctuation: first` where
  supported; elsewhere a −0.434em first-line indent — the measured “
  advance in the quote face, em-riding across the band steps). Every
  study's quote canon opens with “, so the fallback indent never
  shifts an unquoted line. Accepted consequence, recorded: the first
  line gains the glyph's width, so its rag may re-break against the
  drawn Zivel render (the owner directed the treatment over the
  drawn rag).
- **Acceptance evidence:** all five anchors + ten slices green in the
  in-page audit (stack sums 227 · 154 · 110 · 89 · 74; landmarks,
  band gates, seams, clearance); renders compared against the file
  at rm and rd2 across every section — identical after the
  structure re-reads above (residual word-level rag is the standing
  metric class); the §6 entrance runs **exactly four animations**
  (slug · H1 · metadata · photo) with the settle on the photo's rise
  and no replay across gate resizes; reduced motion renders born
  settled with zero animations and instant anchors; a no-JS render
  carries all ten sections, the TOC's drawn resting state (Overview
  active) with working anchors, and the live-site link; the sticky
  TOC verified at 1344/1200 (rests at the overview-content line,
  fixes at exactly 1t, active follows the §4 rule to The Shift
  mid-page, anchor clicks land with the hash updated) and absent
  below the rd2 gate; the §3.8 link asserted as an attribute
  (`target="_blank" rel="noopener"`), never loaded.

## 10 · Acceptance criteria

At each of the five anchors and one arbitrary width per structural
slice (stretched and compressed), scrollbar forced on:

- [x] Every §1 landmark lands on its row (the in-page audit green at
      the five anchors + ten slices; page totals 227 · 154 · 110 ·
      89 · 74 measured exact; the header top rides its anchor ratio;
      the rd2 Overview/Business on the F1 re-box; the rs run on the
      build-record amendment). The lattice renders per the corrected
      §2 map with the ornaments in their cells; clearance green with
      the declared exceptions (expectations module).
- [x] The header renders §3.1 exactly (renders compared against the
      file at rm/rt/rd2 — identical): slug Medium everywhere, the H1
      on each band's drawn break, the metadata `<dl>`, the chips in
      each band's drawn order and wrap (canonical + the rt reorder),
      the photo tiers mounted at canvas size with the baked shadow +
      tint on the drawn box.
- [x] The intro and overview stat cells render §3.2/§3.3 (compared
      at rm/rd2): stroked line-inclusive boxes on shared hairlines,
      the drawn numeral/label steps, the yellow star, the
      double-checkmark export, the F4 canon copy.
- [x] §3.4–§3.8 render as drawn (compared at rm/rd2): the resting
      after-card `hard-shadow-square`, the baked
      `hard-shadow-square-md` at every band, no rm Result hairline,
      the square-ended funnel bars (bar 1 riding, 130/60/40
      material, the teal end bar with the outside numeral), the
      stack's shared hairlines and hue-toned icons, the two-paragraph
      bodies and the drawn bullet list (the build record), the
      pull-quotes on their serif steps.
- [x] The CTA band mounts the hero boilerplate verbatim (the 006
      chip vocabulary and inks) and the standing buttons: gray
      ButtonFill **Get Started** → `/pricing` (asserted), the ghost
      inert on `open-chat`, the label dropped at rm.
- [x] **The TOC (§4):** rd2-only (hidden at 960 and below —
      asserted); rests level with `overview-content` (1184 measured
      at 1344); fixes at exactly 1t (112.00/100.00 measured at
      1344/1200); the active item follows the §4 rule (The Shift
      mid-page reproduced); anchor clicks land the target at 0 with
      the hash updated; `aria-current` follows; the audits stay
      green with the rail fixed. No-JS renders the rail with working
      anchors and Overview active; reduced motion is state-to-state
      with instant anchors.
- [x] **The template (§5):** every §3 string renders from the data
      module; the §3.8 button carries the Zivel URL with
      `target="_blank" rel="noopener"` (asserted as attributes); the
      unpopulated slugs 404 (`dynamicParams: false`, params from the
      populated list); `/primitives` carries the six-variant rows.
- [x] The page assembly: the sweep runs all five routes green in one
      run — 499 checks (anchors, ten slices, every §7.2 rest state
      incl. the TOC drives at both rd2 widths and the sub-gate
      absence); the external URL asserted, never loaded.
- [x] **The §6 entrance:** exactly four animations measured (slug ·
      H1 · metadata · photo, all hx-rise), the settle on the photo's
      rise; nothing below the header animates; gate resizes replay
      nothing (4 → 4 across rm↔rd2); reduced motion runs zero
      animations born settled; no-JS renders the settled page.
- [ ] Exactly **two** new client islands (the TOC and the
      orchestrator mount — five on the page, §7.3); the route
      static; route JS and first load recorded; other routes'
      first-load deltas limited to the recorded icons-chunk ripple,
      if any. *(Open: the production-build budget pass awaits owner
      coordination — the standing .next cohabitation hazard, 016 §9;
      everything else on this box is verified on the dev server.)*
- [x] Zero TypeScript and lint errors; every value traces to a
      token, a named style, or a §5.4 constant (the `--cs-*` block);
      the token layer re-extracted before the build with one drift
      recorded (the new `2xs+/ExtraLight` quote step); reduced
      motion and no-JS render the settled page; semantics per §8.7
      (measured contrast: bodies `text/300` on `bg/100` **6.39:1** ·
      the funnel's `teal/800` on `teal/400` **7.18:1** · the pill
      labels' `text/400` **3.73:1** and the metadata labels'
      `text/500` **2.89:1** — the standing secondary/tertiary ink
      treatment shared with every built page; the chip /700-on-/300
      pairs carry the standing hero ratios).
