# Spec 016 — Our Work: the fullscreen gallery viewer + page assembly

**Status:** Approved 2026-08-29 (owner; approval covers §6's motion
values) · built and verified the same day — the §9 build record
carries the re-extraction (zero drift), the rendered-bounds
re-verification, one §7.1 amendment (the `cta` clearance exception),
two construction facts, and one open file flag (the desktop-view
icon's ink binding). Acceptance checked 2026-08-29; one box stays
open — the §9 shared-icons-chunk deviation against the
byte-unchanged line awaits the owner's ruling. Previously: Draft
2026-08-29 — awaiting approval. The six planning
flags raised at the 016 prep review were **all resolved by the owner
the same day** (§9 F1–F6: live embeds with the nine URLs; one name
set; the Mobile-view rail override fixed and re-read; scaled-down
desktop mode at narrow widths; the CTA opens site 1 and the gallery
thumbnails open their own site; the stale hidden layers and
placeholder geometry fixed and re-read). The same afternoon: **F7
resolved** — the active-button shadow tokenized as
`hard-shadow-square-xs` in the file (bound through the bridge,
propagation re-read) and in `tokens/semantic.css`; **the site-5
canon renamed** to Jesse's Barbershop & Tattoo (the site's own
title — the Izakali precedent; 015 amended, the built data module
updated in step). Early afternoon, the last three closed: **F8
confirmed** — the mobile stage is **384 × 832** (the owner approved
the recommendation; the Mobile-view frame's box trued in the file
through the bridge and re-read at 480/124, whole px); **the chevron
ends clamp with a drawn disabled state** — design added
`state=disabled` to the `gallery-button` set (re-read the same
hour; §2.1); and **the rm/rs CTA opens on the strip's active
slide** (owner reversal of the draft's site-1-always rule — §4.1,
§9). **Nothing is open; the spec awaits approval.**
**Depends on:** spec 001 (tokens, fonts — the pre-build re-extraction
rule) · spec 002 / 002.r1 (the engine, the structural gates, the
overlay-chrome taxonomy) · spec 003 (the button hover grammar the rail
buttons alias) · spec 005 (the nav chrome vocabulary — `_nav-logo` /
`_nav-item` the rail reuses; the z scale) · spec 006 (the inert action
contract this spec finally wires) · spec 010 (the page pattern:
expectations module, `data-landmark` audit, sweep legs, budgets) ·
spec 012 (the card-overlay trigger pattern the gallery tiles adopt) ·
spec 013 (the expectations/clearance/sweep-leg shape this page's
assembly mirrors; the `data-drawer` contract the footer already
carries) · spec 014 (the composition and its declared overlaps) ·
spec 015 (the gallery section and its site data; the
`open-gallery` contract; the strip machine whose k the viewer never
reads). The old spec 054 (`docs/specs/`, frozen) is the **behavioral
ancestor** — the v1 `/gallery` site-frame takeover whose mechanics
(live iframe, portal, scroll lock, Escape, viewport switcher) this
surface succeeds under new-brand chrome; cited as precedent, never
built from.
**Sources:** fresh MCP reads 2026-08-29 of the **Gallery overlay
section `660:8898`** (`get_metadata` · `get_variable_defs` ·
`get_design_context`): the seven takeover frames — `462:28096` (384 ·
750) · `660:9113` (576 · 768) · `461:27054` (768 · 1024) · `660:8899`
(960 · 768) · `434:12756` (1344 — Desktop view) · `661:9888` (1344 —
Tabloid view) · `661:10073` (1344 — Mobile view); the two new
component sets — **`gallery-navRail` `660:9380`** (size xs/sm/md/lg/xl)
and **`gallery-button` `661:9472`** (state default/hover/active); the
six new rail icons (`661:9454` left-chevron · `661:9455` right-chevron
· `661:9456` tablet-view · `661:9457` mobile-view · `661:9458`
desktop-view · `661:9471` gallery-close). Every frame, rail instance
(with per-frame overrides), stage box, set variant, and effect
**verified against rendered bounds through the console bridge the same
day** — fills, strokes, and effects read with their variable bindings;
the §9 F3/F6 file fixes re-read post-fix. Design decisions on record
(owner, 2026-08-29): **the viewer embeds the live sites** (the v1
precedent) — the nine URLs received (§4.2); **one name set** — the
rail label derives from the embedded site's 015 canon name; **desktop
mode at narrow widths renders a scaled-down desktop site**; **the
View-fullscreen CTAs open on site 1, and the gallery thumbnails open
the viewer on their own site** (a 015-section extension this spec
owns). No open/close motion intent was supplied — §6's values are the
spec's choice (approval covers; design may veto — the 013 §5
precedent).

The Our Work page's last spec (014–016 build the page top-down). Two
halves: **the fullscreen gallery viewer** — a viewport takeover paging
the nine 015 sites as live embeds under a browser-chrome rail — and
**the page assembly**: the expectations module, the
`/our-work-fixture` sweep leg, and the clearance-assertion
expectations carrying the overlaps 014/015 declared.

---

## 1 · Anatomy — the viewer is overlay chrome

The viewer enters **no tick stack** (the 002.r1 taxonomy: overlay
chrome never participates in a section's geometry). Every value is
**material px**: the 56px rail, the 24px buttons, the stage boxes.
There are no ticks and no weights anywhere in this surface; its only
responsive machinery is the rail's five size variants and the stage's
view-mode rules (§3), gated at the standing structural gates
(470 · 665 · 860 · 1130) on the **viewer's own measured width**
(ResizeObserver on the overlay root — never `matchMedia`, the
standing rule). The page's tick table is §7's expectations module.

The takeover: a fixed, full-viewport layer on `--z-modal` — the
**rail** (56px, `bg/200`) across the top, the **stage** (the scrim
`text/050`, a bound variable on every drawn frame) filling the rest.
Body scroll locks through `v2/lib/scroll-lock.ts` (the single
approved entry point; the kept gutter means the viewer's measured
width equals the page's).

## 2 · The rail — `gallery-navRail`

56px tall, `bg/200`, *with a 1px `border/050` hairline on its bottom
edge (amended 2026-08-29 — owner direction at the built review, §9;
line-inclusive in the 56)*, five size variants on the overlay-width
gates:
**xs** <470 · **sm** 470–665 · **md** 665–860 · **lg** 860–1130 ·
**xl** ≥1130. From the set and the rendered bounds (xl transcribed;
the other variants differ only by the dropped elements below):

**West group:** the logo box (56×48, vertically centered; the
standing brand logomark at 18px inside the 005 `_nav-logo` 44px
box — the registry asset, never re-exported) · a **1px × 24px
`border/050` divider** *(amended 2026-08-29 — re-bound from `bg/400`
in the owner's re-ink pass, the same resolved ink; §9)* · the label
**Keystone Gallery**
(`text/sm/Medium`, ink `text/300`, 16px side pads — the 005
`_nav-item` vocabulary; static text, not a control). At **xs** the
label is dropped (logo + divider only).

**East group** (right-aligned on a **24px group gap**, 16px right
pad): the **website name** (`text/sm/Light`, ink `text/300` — §4.2's
canon name of the embedded site; dropped at sm/xs) · the **chevron
pair** (prev/next, two `gallery-button`s on an 8px gap) · the **view
switcher** — a segmented control (`lightgray/300` container,
`radius-lg`, 4px pad, 8px gap) holding three `gallery-button`s
(desktop · tablet · mobile view icons) · the **close button**. At
sm/xs the same elements minus the name.

### 2.1 · The button — `gallery-button`

24×24, 6px pad, `radius-sm`, a 16px icon. States, every fill and ink
bound (the disabled variant added by design 2026-08-29 — the
chevrons' end state, §4.1; re-read from the set the same hour):

| state | fill | icon ink | effect |
|---|---|---|---|
| default | `bg/400` | `text/200` | none |
| hover | `bg/600` | `text/200` | none |
| active | `bg/100` | `text/200` | **`hard-shadow-square-xs`** — 1px 1px 0 rgba(85,77,68,0.2)¹ |
| disabled | `bg/400` | **`text/600`** | none |

*Fills amended 2026-08-29 (owner re-ink at the built review, re-read
from the set and the mounted rails — §9): default/disabled
`bg/300 → bg/400`, hover `bg/500 → bg/600`; active unchanged. The
same pass zeroed the set's declared pad (matching the built centered
glyph) and renamed the switcher container `segment-control` (values
unchanged).*

¹ drawn raw and unbound at draft; **tokenized 2026-08-29 (owner
direction, §9 F7)**: the effect style `hard-shadow-square-xs` was
created in the file and bound to the active variant through the
bridge (propagation verified on the frame rails), and the token
`--shadow-hard-square-xs` landed in `tokens/semantic.css`. The 0.20
alpha is the style's drawn value — the 1px chrome step is its own
ink, not the larger steps' 0.15.

The active state marks the current view mode (the switcher); hover
runs on the standing button clock (`--motion-hover-duration` /
`--motion-hover-ease` — aliased, never forked). The six icons are
new **verbatim console-bridge exports** (14-grid vectors, fills bound
`text/200`, mounted at 16 — fills scale cleanly on resize, unlike the
013 R8 stroke case; paint normalizes to `currentColor`).

## 3 · The stage — the scrim and the three view modes

The stage is the `text/050` scrim under the rail; the embedded site
renders in **one `<iframe>`** placed by the active view mode. Modes
and their reference widths:

| mode | reference width | drawn source |
|---|---|---|
| mobile | 384 | the 384 frame · the 1344 Mobile view |
| tablet | 768 | the 576 frame · the 1344 Tabloid view |
| desktop | the viewer width (≥665); **1344 scaled** below² | the 768/960/1344 frames |

² the owner's F4 resolution: at narrow widths desktop mode shows "a
scaled-down desktop site". The 1344 reference (the site design's own
desktop anchor) is the spec's choice — approval covers it.

**Placement rules**, from the drawn frames (rendered bounds; the
Desktop/960 frames' image-top reads of 53 are the placeholder-artifact
class — every box bottom is flush with the frame and the intended top
is the rail's 56 line):

- **Reference ≤ viewer width:** the iframe renders at its reference
  width, centered horizontally, flush under the rail, filling to the
  viewport bottom (the Desktop view at 1344; the Tabloid view's
  768×968 box centered at x 288). **Exception — mobile mode at wide
  viewers:** a floating phone-proportioned box, not a fill —
  **384 × 832** (19.5:9, the modern phone class at the site's mobile
  anchor width; the §9 F8 resolution, owner-confirmed 2026-08-29 and
  trued in the Mobile-view frame, re-read at 480/124), centered
  under the rail, height clamping to the available space on short
  viewports — the width never scales, so the embed stays a true
  384-px mobile viewport. At a 384-wide viewer, mobile mode fills
  under the rail (the drawn 384 frame: 384 × 694 = the full
  sub-rail area).
- **Reference > viewer width:** fit-width scaling — the iframe renders
  at the reference width, CSS-scaled by `viewer / reference`, filling
  the sub-rail area exactly (the drawn 576 frame: tablet mode at 0.75
  scale, full-bleed; the iframe's layout height is the available
  height divided by the scale, so the scaled box fills to the bottom).

**Default mode at open**, from the drawn rails' active buttons:
**mobile** below 470 · **tablet** 470–665 (the 576 rail draws tablet
active) · **desktop** at 665 and up (the 768/960/1344 rails draw
desktop active). A user's mode choice persists while the viewer is
open (the fit rules keep every mode valid at every width); the
default re-derives at the next open.

## 4 · Behavior — the viewer machine

One client island owning three values: **open**, **s ∈ 1…9** (the
embedded site, in the 015 strip order), **v** (the view mode). At
most one iframe is mounted; its `src` swaps with s.

### 4.1 · Writers

- **Open:** the 015 View-fullscreen CTAs (the standing
  `data-action="open-gallery"` contract — this spec wires the
  handler) and the gallery thumbnails (§4.4; s = the tile's site).
  The CTA's opening site *(amended 2026-08-29, owner — superseding
  the morning's site-1-always rule)*: **at rm/rs, the strip's active
  slide** — the strip island publishes its k on the section root
  (`data-k`, the DOM as the one shared source; the standing
  data-attribute state rule) and the open handler reads it at the
  click; **at rt+ (no k), s = 1**. The two islands stay otherwise
  independent (§9 note). On open: scroll locks, focus moves to
  the dialog container (`tabIndex={-1}`, the standing focus law —
  never an input), v defaults per §3.
- **Page:** the chevrons write s∓1, **clamped at 1/9 — the end
  chevron renders the set's drawn `disabled` state** (§2.1; added by
  design 2026-08-29 at the clamp review) and carries the real
  `disabled` attribute. Left/Right
  arrows do the same while focus is on the viewer's chrome (keys
  inside the embedded document belong to the embedded site).
- **Switch:** the view switcher writes v — a radiogroup (the v1
  precedent), the active button carrying the drawn active dressing.
- **Close:** the close button and Escape. Focus returns to the
  opener (`focus({ preventScroll: true })` both directions); the
  scroll lock's unlock callback runs as the effect cleanup.

### 4.2 · The nine sites — one name set, the URLs

The rail label and the iframe title derive from the embedded site's
**015 canon name** (owner decision 2026-08-29 — one name set; the
drawn "Lune Massage Therapy" is placeholder copy, not canon). The
URLs, received from the owner 2026-08-29:

| s | site (the 015 canon) | URL |
|---|---|---|
| 1 | Izakali body practice | `https://keystone-site-prod-dulce-luna-massage-wellnes-gfm36wi3.rahul-0b6.workers.dev/` |
| 2 | House of Aesthetics | `https://keystone-site-prod-house-of-aesthetics-o9vcdsfn.rahul-0b6.workers.dev/` |
| 3 | DreFadez Barber | `https://keystone-site-prod-drefadez-hvzjaquz.rahul-0b6.workers.dev/` |
| 4 | Ora Medical Clinic | `https://keystone-site-prod-ora-medical-clinic-wniko3sf.rahul-0b6.workers.dev/` |
| 5 | Jesse's Barbershop & Tattoo³ | `https://keystone-site-prod-jesse-s-barbershop-2-b2zum1m8.rahul-0b6.workers.dev/` |
| 6 | X2Talent Recruiting | `https://keystone-site-prod-x2talent-t7540oy7.rahul-0b6.workers.dev/` |
| 7 | Davin Security | `https://keystone-site-prod-davin-security-wqpbsfjs.rahul-0b6.workers.dev/` |
| 8 | EntheaCare | `https://keystone-site-prod-enthea-care-mwv8s7a3.rahul-0b6.workers.dev/` |
| 9 | Lune Bodywork | `https://keystone-site-prod-rebeccaeberhardtcmt-7igkyq6p.rahul-0b6.workers.dev/` |

³ the URL was received as "Jesse's Barbershop" against the 015
canon's "State College Barbershops & Tattoo" (the same site — the
served page titles itself "Jesse's Barbershop & Tattoo"); **resolved
2026-08-29 (owner): the canon follows the site's own title** — the
Izakali precedent. Amended in 015 §4/§9 with the built data module
updated in step; the name above is the one canon everywhere (alt,
ghost button, rail label). The owner's
list also carried the three case-study sites (Palm Coast Zivel · Your
Health Solutions · Bare Lúx Studio) — not part of this surface;
recorded for the coming case-studies page (§9 note). The URLs live in
the 015 section data (`work-gallery-data.ts` gains `url`) — one
module feeds the section, the alt text, and the viewer.

### 4.3 · The embed

One `<iframe src={url}>` with `title="{name} — live website"` (the
v1 shape). Nothing loads until the viewer opens; paging swaps `src`.
The scrim shows through while a site loads — no spinner is designed;
none is built. The embedded documents are third-party content — the
viewer never reaches into them, and their own scrolling is native
iframe behavior (the drawn 576 placeholder's 1037px-tall content is
that scroll, not a layout fact).

### 4.4 · The gallery thumbnails become triggers

The owner's F5 extension to the built 015 section: **every gallery
image opens the viewer on its own site.** In mosaic mode (rt+) each
tile gains an overlay `<button>` ("View {name} fullscreen") on the
012 card-overlay pattern — the whole tile is the target (≥44px at
every audited width). In strip mode (rm/rs) the **active slide**
gains the same trigger; the off-slide ghost buttons **keep writing
k** (the 012 select grammar — select, then open). This split is the
spec's choice — a ghost tap selecting rather than opening preserves
the strip's browsing gesture; design may veto at review (§9 note).
The viewer still never reads k (the 015 §9 boundary): a thumbnail
passes its own site index at the moment of the click, nothing more.

### 4.5 · No-JS and failure posture

A no-JS render never mounts the viewer; the CTAs and tile triggers
render in their standing inert posture (the 006 contract's no-JS
behavior, unchanged). A site that fails to load shows the scrim
(third-party availability is not this build's to guard; the URLs are
the owner's operational surface).

## 5 · Assets and constants

1. **Icons** — six verbatim console-bridge exports into
   `v2/icons.tsx` (§2.1): `IconGalleryClose` · `IconDesktopView` ·
   `IconTabletView` · `IconMobileView` · `IconChevronLeftSm` ·
   `IconChevronRightSm` (14-grid, `currentColor`). The logomark is
   the standing registry asset — never re-exported.
2. **Constants** (component token layer, `--gv-*` — all material, so
   a plain block, no `.page` scoping needed): the rail height (56),
   the button box (24, pad 6), the switcher pad/gap (4/8), the group
   gap (24), the rail's side pads (16), the divider (1×24), the view
   reference widths (384 · 768 · 1344²), and the Mobile-view float
   height (§9 F8). The active-button shadow is the **standing
   `--shadow-hard-square-xs` token** (§2.1 — tokenized in the file
   and in `semantic.css` 2026-08-29, the §9 F7 resolution; it arrives
   through re-extraction like its siblings). The scrim is the standing `text/050`
   token; the z position is the standing `--z-modal`. No new file
   variables; the pre-build re-extraction runs regardless (001 rule).
3. **No new images.** The site content is live; the drawn CleanShot
   rectangles are placeholders and nothing exports from them.

## 6 · Motion

No intent was supplied with the delivery (the plan.md F3 note
anticipated it; it did not arrive) — these are the **spec's values**,
flagged for approval (§9 note; the 013 §5 veto precedent):

- **Open/close:** the whole takeover fades — in on
  `--motion-drawer-duration` (250ms) / `--motion-drawer-ease-open`,
  out on `--motion-drawer-ease` (the open/close asymmetry law;
  aliased, never forked). Nothing moves — a fade only, so no shadow
  or paint-transition interactions arise.
- **Paging and view switches** are state-to-state — the iframe
  re-lays-out either way; animating its box against third-party
  paint buys nothing.
- **The rail buttons** hover on the standing 003 clock (§2.1).
- **Reduced motion:** the fades run at 0s — open and close are
  state-to-state; every input works. (No-JS: §4.5.)

## 7 · Page assembly — expectations, sweep leg, budgets

The Our Work page's page-level machinery, the 013 §7 shape.

### 7.1 · The expectations module

`app/our-work-fixture/expectations.ts` — the page's designed stack as
`GridExpectations`, read by the fixture's devtools mount (the 011
`qa` slot pattern already wired in `v2/our-work.tsx`). Totals
**111 · 85 · 60 · 53 · 48** (the 014/015 records, rendered-bounds
re-verified 2026-08-28); sections against the `.sec` flow children in
DOM order:

| section | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| work-header | 0–17 | 0–11 | 0–8 | 0–8 | 0–7 |
| work-cases | 17–75 | 11–53 | 8–29 | 8–26 | 7–22 |
| work-gallery | 75–87 | 53–64 | 29–45 | 26–41 | 22–37 |
| footer | 87–111 | 64–85 | 45–60 | 41–53 | 37–48 |

Footer heights 24 · 21 · 15 · 12 · 11 (the 004 record, as on the
pricing page); section tops are the 014/015 landmark records.

**Clearance exceptions** (the 013 §7.3 contract; every citation in
the source specs): `card` (the case-study boxes over the staircase's
inner columns — 014 §2), `head` (the rt subhead's weight-riding wrap
box over [8,5] — 014 §2), `cta` *(amended 2026-08-29 at build — §9:
the assertion's first run on this page read the header CTA row's
hugging flex box over the staircase's top cells at the drawn anchors
themselves — [8,5] at rt/rd2, the col-10 run at the rm extrapolation —
while its ink, the two buttons, ends 1.5–2t clear; box-only, the same
lattices-behind-content class as `head`, 014 §2/§3)*, `gallery` (the
strip's ghost slides over the col-11 rail at rm/rs — 015 §2), `top` ·
`nav` (the footer's own ornament cells — 004 §2/§3).
**latticeExempt:** `head` · `cta` (the 014 header block — px-riding
tops and hugging content rows, the 013 precedent's kind). Every other
landmark kind (`card` · `gallery-head` · `gallery` · `logo` ·
`item` …) stays on the half-tick law.

### 7.2 · The sweep leg

`scripts/grid-selftest.mjs` gains the `/our-work-fixture` leg: the
five anchors + the ten slice widths, scrollbar forced on, settled
before asserting (the page's five-beat rise choreography — the
audits-at-rest law). Rest-state drives, asserted per state:

- the 015 strip machine at rm/rs (a sliver click to k=2, keys back,
  clamps at 1/9);
- a footer drawer open and closed at rm/rs (the standing
  `data-drawer` contract);
- the mobile nav open and closed (an overlay — the stack unchanged);
- **the viewer open (s=1), paged (s=2), view-switched, closed** — an
  overlay on `--z-modal`: the stack beneath unchanged, the audits
  green in every state, focus restored on close. **The sweep blocks
  non-localhost requests during this leg** (puppeteer request
  interception) so CI never touches the nine live sites — the
  embed's `src` is asserted as a URL, never loaded.

Continuity stays on `/grid` only. `npm run test:grid` remains the
entry point; the sweep runs all four routes green in one run.

### 7.3 · Budgets

Measured on the production build and recorded in acceptance: both
Our Work routes static; the page's island count becomes **six**
(nav-desktop · nav-mobile · the load orchestrator · the 015 strip ·
footer-nav · **the viewer**); `/our-work` route JS and first load
recorded against 015's 1.97 kB / 107 kB baseline; `/` and `/pricing`
untouched.

## 8 · Deliverable — files, semantics

1. **The viewer** `design-system/v2/sections/gallery-overlay.tsx` +
   `gallery-overlay.css` — **one client island** (the §4 machine; a
   portal to `document.body` on the approved hydration-safe pattern,
   `--z-modal`). It wires the standing `data-action="open-gallery"`
   contract (a delegated listener — the 006 contract's promised
   wiring; the CTA markup is untouched) and receives the site data
   as props from the composition.
2. **The 015 section extension** — `work-gallery.tsx` /
   `work-gallery-island.tsx` gain the §4.4 tile triggers, and the
   strip island publishes its k as `data-k` on the section root
   (the §4.1 handoff — a one-line addition to the standing machine);
   `work-gallery-data.ts` gains `url` per site (§4.2's table — the
   one module feeding section, alt, and viewer).
3. **Icons** — the six §5.1 exports into `v2/icons.tsx`.
4. **Harness** — `app/our-work-fixture/expectations.ts` (§7.1); the
   sweep leg + request interception
   (`scripts/grid-selftest.mjs`); the fixture wires the module into
   the standing `qa` slot.
5. **Semantics:** the takeover is `role="dialog"` `aria-modal="true"`
   named "{name} — live website" (updating as s changes); the rail's
   logo and divider decorative (`aria-hidden`); "Keystone Gallery"
   static text; the chevrons real `<button>`s ("Previous site" /
   "Next site", the end one `disabled` — §4.1); the switcher a `role="radiogroup"` ("Preview
   viewport") of three `aria-checked` buttons ("Desktop view" /
   "Tablet view" / "Mobile view"); the close button "Close gallery";
   every control keyboard-reachable with the visible focus style;
   the iframe titled; the tile triggers named "View {name}
   fullscreen". Focus in on open, restored on close (§4.1).
6. Docs in the same commits: plan.md's Our Work record and the
   launch checklist's row (the page completes pending gates).

## 9 · Resolutions record

The prep-review flags, 2026-08-29 — six resolved by the owner the
same day, two file flags open with design:

- **F1 — resolved (owner, 2026-08-29): live embeds.** The viewer
  embeds the live production sites (the v1 `/gallery` behavior, old
  spec 054); the drawn CleanShot rectangles are placeholders. The
  nine URLs received the same day (§4.2's table). The list also
  carried Palm Coast Zivel, Your Health Solutions, and Bare Lúx
  Studio — the 014 case-study sites, not part of this surface; on
  record for the coming case-studies page.
- **F2 — resolved (owner, 2026-08-29): one name set.** The rail's
  website-name label derives from the embedded site's canonical 015
  name (the §4.2 table). The set's drawn "Lune Massage Therapy"
  default is placeholder copy — nothing builds from it; the canon
  for s=9 is **Lune Bodywork**.
- **F3 — resolved (design fix, re-read 2026-08-29): the Mobile-view
  rail override.** The 1344 Mobile-view frame's rail drew the
  *tablet* button active at the prep review; fixed the same day —
  re-read through the bridge with the **mobile** button active
  (`bg/100` + the shadow), the drawn record for §3's default-mode
  table.
- **F4 — resolved (owner, 2026-08-29): desktop mode at narrow
  widths renders a scaled-down desktop site.** The spec's
  construction: the 1344 reference scaled fit-width below the 665
  gate (§3, note ²). The reference width is the spec's choice —
  approval covers it.
- **F5 — resolved (owner, 2026-08-29): the open targets.** The
  View-fullscreen CTAs open on **site 1**; the gallery thumbnails
  **also become triggers**, opening the viewer on their own site —
  a designed extension of the built 015 section, this spec's §4.4
  scope. The strip-mode split (active slide opens; ghosts keep the
  012 select grammar) is the spec's choice; design may veto.
- **F6 — resolved (design fix, re-read 2026-08-29): file hygiene.**
  The hidden "page-default - workstream - home" console mockups and
  "iphone Ui" layers are deleted from every frame (re-read: gone);
  the Desktop-view image trued to full-bleed 1344 (the draft's
  −39px/1422 read is gone); the Mobile-view stage box trued to a
  whole 384 wide. Residual, the standing artifact class: the
  Desktop/960 frames' image tops read 53 (3px under the opaque 56
  rail — bottoms flush with the frames) and the Mobile-view box's
  fractional position (x 479.625 · y 164.8) — the intended reads are
  flush-under-rail and centered (§3); nothing builds from the
  artifacts.
- **F7 — resolved (owner, 2026-08-29): the active-button shadow is
  tokenized.** The `gallery-button` active variant carried a raw,
  unbound drop shadow — 1px 1px 0 rgba(85,77,68,0.2) — where every
  standing hard-shadow effect is a bound style at 0.15 alpha. The
  owner ruled the drawn value intent and directed the tokenization:
  the effect style **`hard-shadow-square-xs`** (the 1px step of the
  hard-shadow scale, alpha 0.2 as drawn) was created in the file and
  bound to the active variant through the bridge the same day —
  propagation re-read on the 768/384/Mobile-view rails, each active
  button reporting the style. Dev side, `--shadow-hard-square-xs`
  landed in `tokens/semantic.css`; the file now carries **four**
  effect styles and the pre-build re-extraction picks the set up as
  usual.
- **F8 — resolved (owner confirm, 2026-08-29): the Mobile-view stage
  is 384 × 832.** The drawn float (384 × 693) was the placeholder
  screenshot's own height with no rule attached; the owner asked
  what best serves the display's purpose — emulating a mobile
  viewport — and confirmed the recommendation: **width 384** (the
  site's own mobile anchor — the embed must lay out at true 384 CSS
  px to render the mobile design, so the width never scales) ×
  **height 832**, the modern phone proportion (19.5:9 — the
  iPhone/Pixel class) at that width; centered in the area under the
  rail; on short viewports the height clamps to the available space
  (the phone gets shorter — never wider, never scaled). At viewers
  ≤384 wide, mobile mode fills under the rail as drawn (the 384
  frame). **The Mobile-view frame's box was trued through the bridge
  the same hour** — re-read 384 × 832 at 480/124 (whole px, centered
  under the rail), replacing the fractional placeholder geometry.
- **Note — the site-5 canon renamed (owner, 2026-08-29).** The URL
  list named s=5 "Jesse's Barbershop"; the served site titles itself
  "Jesse's Barbershop & Tattoo" where the 015 canon said "State
  College Barbershops & Tattoo" (the same site — the list's only
  barbershop-and-tattoo entry). The owner ruled the canon follows
  the site's own title (the Izakali precedent): **Jesse's Barbershop
  & Tattoo** — amended in 015 §4/§9, the built data module updated
  in step (alt, ghost button, and this viewer's rail label all flow
  from the one module).
- **Note** — no open/close motion intent arrived with the delivery;
  §6's values are the spec's choice under the standing grammars
  (fade on the drawer clock and eases, asymmetric; paging and
  switches state-to-state). Approval covers them; design may veto.
- **Note — the clamp confirmed with a drawn end state (design,
  2026-08-29).** The chevrons clamp at 1/9 (the site's carousel
  convention); at the clamp review design answered with the file —
  the `gallery-button` set gained **`state=disabled`** (`689:16287`:
  fill `bg/300`, icon ink `text/600`, no effect — re-read from the
  set the same hour). The end chevron renders it with the real
  `disabled` attribute (§2.1/§4.1).
- **Note — the k handoff reversed (owner, 2026-08-29,
  superseding the morning's F5 rule).** The draft had the CTA always
  opening on site 1 and the viewer never reading the strip's k (the
  015 §9 boundary left the handoff to this spec). The owner ruled at
  review: **at rm/rs the CTA opens on the strip's active slide** —
  what the strip shows is what fullscreen shows. Mechanism: the
  strip island publishes k as `data-k` on the section root and the
  viewer's open handler reads it at the click (§4.1) — one-way, at
  open time only; the islands share no live state (paging the
  viewer never moves the strip; closing restores the page as it
  was). At rt+ there is no k and the CTA opens on site 1. A
  thumbnail still passes its own site index.
- **Note** — the drawn 576 placeholder's 1037px-tall content is
  iframe scroll, not layout; the 693/968-class heights in the
  Mobile/Tabloid frames describe the stage boxes only.

### Build record, 2026-08-29

- **The token layer re-extracted first (001 rule) — zero drift**
  across primitives (incl. the four teal intermediate stops),
  spacing/radii, the library semantics, and the text styles; the file
  carries exactly four effect styles and `hard-shadow-square-xs`
  reads 1px 1px 0 rgba(85,77,68,0.2), matching the F7 token already
  in `semantic.css`. The `noise` style is still absent (no consumer —
  the standing 014/015 observation).
- **Every §1/§2/§3 value re-verified from rendered bounds through
  the bridge at build** — the seven frames (every scrim bound
  `text/050`; the Mobile-view box whole-px 384 × 832 at 480/124), the
  five rail variants with their designed drops, the per-frame active
  buttons confirming §3's default-mode table, and the button set's
  four states with their bindings — all exact. Two rendered-truth
  construction facts: the set's 24px button declares a 6px pad that
  the 16px glyph overflows symmetrically (rendered at 4,4 — the build
  centers the glyph in the padded box, which reproduces the render),
  and the mounted icons are the 14-grid components resized to 16
  (fills scale cleanly, as §2.1 anticipated).
- **One open file flag (design): the desktop-view icon's ink
  binding.** The `icons/desktop-view` component and every mounted
  instance bind the vector fills `text/100` where the five sibling
  icons bind `text/200` (§2.1's ink table). Nothing builds from it —
  paint normalizes to `currentColor` and the button state supplies
  the ink — but the file diverges from the set's own table.
- **§7.1 amended: the `cta` clearance exception.** The exposed-cell
  assertion's first run on this page (it had no expectations module
  before 016) read `cta ∩ [8,5]` at the rt and rd2 anchors and the
  col-10 run at the below-384 extrapolation — not the compressed-slice
  defect class (the anchors themselves read the overlap). Measured:
  the 014 header CTA row's hugging flex box reaches tick 8.5 (rt)
  while its ink ends at 5.79 — box-only, the staircase passing behind
  an empty stretch of the row, the same class as the declared `head`
  exception. Declared with its citation; the body carries the
  amendment.
- **Construction fact: the close fade is its own keyframes name**
  (`gv-fade-out`). Re-declaring a finished CSS animation with only
  its direction reversed does not restart it, so a reversed
  `gv-fade-in` never fires the `animationend` the island's unmount
  rides — found at build QA when the first close hung on a finished
  animation. Both directions still alias the drawer clock and eases
  (§6 — alias, never fork).
- **Construction fact: the iframe is keyed by s.** Swapping `src` on
  a live iframe pushes a session-history entry per page and breaks
  the browser's back button; the keyed remount keeps the §4 one-iframe
  invariant with no history pollution.
- **Budgets (production build 2026-08-29):** every route static;
  the page's island count **six** (nav-desktop · nav-mobile · the
  orchestrator · the 015 strip · footer-nav · the viewer);
  `/our-work` **133 B route JS · 108 kB first load** and
  `/our-work-fixture` 132 B · 108 kB (the 015 baseline recorded
  1.97 kB · 107 kB — the strip and viewer chunks now sit in the
  shared graph, so the route chunk thinned while first load carries
  the viewer). **Deviation against §10's byte-unchanged line:** the
  six §5.1 icons land in `v2/icons.tsx` per §8.3, and that module is
  a chunk shared by every route — `/` reads 112 kB (was 111) and
  `/pricing` 108 kB (was 107) first load, ~1 kB rounded from the
  shared icons chunk; the few-byte route-JS shifts are that chunk's
  hash rippling through referencing chunks. Inherent to the spec's
  own icon-registry deliverable under the bundler's chunking;
  recorded for owner review (splitting the gallery icons out of the
  registry would restore the bytes at the cost of the one-home rule).
- **The sweep is green on all four routes in one run** — anchors, ten
  slices, and every §7.2 rest state including the viewer drives, with
  non-localhost requests blocked during the Our Work leg (the embed's
  src asserted as a URL, never loaded): 445 checks, zero failures.
  tsc and lint zero.
- **Three same-day review fixes (owner report at the built viewer,
  2026-08-29 — the 011 R13 cadence).** (1) *The button glyph sat at
  6,6, down-right of center*: the first build padded the 24px box by
  the set's declared 6px and relied on grid centering — but a padded
  grid track originates at the content-box corner and its auto track
  grows to the 16px glyph, so the glyph rendered at the pad offset,
  not the drawn 4,4. Rebuilt with no pad, the glyph centered in the
  24px box (the rendered truth); the `--gv-btn-pad` constant left the
  component layer with the fix (no consumer). (2) *The rail labels
  were missing the GT Standard opsz mount*: `.gv-label`/`.gv-name`
  set the §2 text styles but omitted the standing
  `font-optical-sizing: none` + `"opsz"` variation pin every other
  section carries (spec 001 — auto optical sizing renders the wrong
  instance); both now mount the full pattern on their §2 styles
  (Medium for the label, Light for the name). (3) *The rail gained a
  1px `border/050` bottom hairline* — owner direction, amended into
  §2; drawn line-inclusive in the 56 so the stage math is untouched.
- **The button fills re-inked (owner, 2026-08-29, the same review
  session — re-read from the set and the 768 rail through the
  bridge, propagation confirmed).** Default and disabled
  `bg/300 → bg/400`, hover `bg/500 → bg/600`, active unchanged
  (`bg/100` + the F7 shadow); §2.1 amended. The same file pass
  zeroed the set's declared button pad (the drawn 4,4 glyph the
  build already centers), re-bound the divider `bg/400 → border/050`
  (the same resolved ink — the build follows the binding), and
  renamed the switcher container `segment-control` (fill
  `lightgray/300`, radius, pad, gap all unchanged). Contrast
  re-measured on the new fills: icon `text/200` on `bg/400` 6.2:1,
  on the hover `bg/600` 4.9:1 — both past the 3:1 UI floor (the §10
  evidence updated).

## 10 · Acceptance criteria

At each of the five anchors and one arbitrary width per structural
slice (stretched and compressed), scrollbar forced on; the viewer
audited at the same widths (its gates ride its own measured width):

- [x] The viewer opens from every trigger: the View-fullscreen CTAs
      (the wired `open-gallery` contract — s = the strip's published
      k at rm/rs, s = 1 at rt+; the §4.1 amendment) and every gallery
      thumbnail (s = its site; mosaic tiles at rt+, the active slide
      at rm/rs with ghosts still writing k); scroll locks through
      the module (the page's measured width unchanged — the grid
      never re-gates); focus lands on the dialog and returns to the
      opener on close; Escape and the close button both close.
      (Verified 2026-08-29: CTA at wide → s=1; CTA at 500 after a
      ghost click → the strip's k=2; the Jesse mosaic tile → s=5 with
      focus returning to that tile; only the active slide's trigger
      visible at rs, ghosts selecting; the sweep's t exact in every
      open state at all fifteen widths — the lock kept the gutter;
      Escape and the close button both exercised.)
- [x] The rail renders §2 exactly at every audited width: the right
      variant per gate (xs/sm/md/lg/xl), the drawn drops (no name at
      sm/xs, no label at xs), every fill/ink on its bound token, the
      active view button carrying `bg/100` + the F7 shadow, hover
      `bg/500` on the standing clock, the six verbatim icons at 16.
      (Verified 2026-08-29: the element drops are the overlay's own
      container gates, exercised in the browser at 500 — label, no
      name — and at wide desktop — full rail; every fill/ink built on
      the token the re-read set binds; the active dressing and
      disabled end state confirmed in the drives at all fifteen sweep
      widths.)
- [x] The stage runs §3: the scrim `text/050`; the default mode per
      band (mobile <470 · tablet 470–665 · desktop ≥665); desktop
      natural-width ≥665 and 1344-scaled below; tablet 768 centered
      (968-class full height under the rail) or fit-width scaled
      below 768; mobile filling under the rail at 384 and the F8
      float at wide viewers; a user's mode choice persisting while
      open.
      (Verified 2026-08-29: measured in the browser — desktop at the
      viewer width at 1905; tablet fit-width 0.651 = 500/768
      full-bleed at 500; the mobile float 384 × 832 centered at
      x 768 / y 96; the default mode read tablet at 500 and desktop
      wide, per the drawn rails; the mode a state value that only the
      open handler re-derives.)
- [x] The machine pages s 1…9 with clamps (chevrons, arrows on the
      chrome; the end chevron rendering the drawn `disabled` state
      with the real attribute — §2.1), the rail name and iframe
      title tracking s on the §4.2
      canon; one iframe mounted, nothing loaded before open, src
      swapping on page; reduced motion renders open/close
      state-to-state with every input working; a no-JS render never
      mounts the viewer and the triggers hold the inert posture.
      (Verified 2026-08-29: chevrons and arrows paged with the west
      clamp disabled at s=1; name/src tracked the canon on every
      page; the portal renders nothing closed, so nothing loads
      before open; under emulated reduce the overlay computed
      animation none, opened settled, paged by arrow, and closed
      instantly with focus restored; the no-JS render carried all
      ten inert triggers and no viewer chrome.)
- [x] The page assembly: the expectations module carries §7.1 (totals
      111 · 85 · 60 · 53 · 48, the four section spans, the declared
      exceptions with citations); the sweep runs `/grid` +
      `/home-fixture` + `/pricing-fixture` + `/our-work-fixture`
      green in one run — anchors, slices, and every §7.2 rest state
      including the viewer drives; non-localhost requests blocked in
      the viewer leg; the 014 five-beat choreography byte-identical.
      (Verified 2026-08-29: 445 checks green in one run, zero
      failures — after the §9 `cta` amendment; the choreography
      untouched by this build and settled before every assert.)
- [ ] Exactly **one** new client island (six on the page); both Our
      Work routes static; `/our-work` route JS and first load
      recorded against the 1.97 kB / 107 kB baseline; `/` and
      `/pricing` byte-unchanged.
      (2026-08-29: one island, six on the page, both routes static,
      `/our-work` 133 B · 108 kB recorded — but `/` and `/pricing`
      are **not** byte-unchanged: the §5.1 icons ride the shared
      icons chunk, ~1 kB first-load ripple on every route — the §9
      build record; the box stays open for the owner's ruling on the
      deviation.)
- [x] Zero TypeScript and lint errors; every value traces to a token,
      a named ramp style, or a §5 enumerated constant; the token
      layer re-extracted before the build (001 rule) with drift
      recorded; accessibility per §8.5 (the dialog contract, the
      radiogroup, the named controls, focus in/out, contrast on the
      standing `text/300`-on-`bg/200` rail pair recorded).
      (Verified 2026-08-29: tsc and lint zero; re-extraction zero
      drift; focus in/out exercised in the browser and the sweep;
      contrast — label `text/300` on `bg/200` 5.9:1, icon `text/200`
      on the re-inked `bg/400` 6.2:1, on the hover `bg/600` 4.9:1,
      and on the active `bg/100` 7.9:1, all past the 4.5:1/3:1
      floors; the disabled ink is exempt chrome.)
