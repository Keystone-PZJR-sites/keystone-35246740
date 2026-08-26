# Spec 006 — Hero: headline, chips, and the image carousel

**Status:** Approved 2026-08-25 (draft same day; §9 records the flag
resolutions and the build-prep decisions)
**Depends on:** spec 001 (tokens, fonts, `ksWordmark`) · spec 002 (grid engine,
exposure vocabulary, band classes) · spec 003 (button-fill, `icons/chat`,
`_nav-trigger-icon`, text primitives) · spec 005 (nav — the hero starts
beneath it and the nav participates in the load choreography)
**Sources:** fresh MCP reads 2026-08-25 of the hero nodes inside the five
anchor frames — 384: `383:37879` (header) · `500:24680` (subhead) ·
`500:24705` (cta) · `230:13574` (image-carousel, component `162:37092`);
576: `359:30033` (h1 header) · `506:4395` (subhead + cta header) ·
`359:30330` (image-carousel); 768: `498:24438` (header) · `499:24568`
(header-carousel); 960: `496:24139` · `496:24123`; 1344: `494:14211` ·
`495:21919` — plus the `hero-carousel-image` variants read through the
instances (`132:17132`/`132:17135` at 1344, `162:37086`/`162:37089` at
384), all in `ks-MarketingSite`. Motion intent (load choreography,
highlight pass, carousel behavior) supplied by design 2026-08-25 with
the spec request; values specced in §6. Carousel image exports supplied
2026-08-25 and re-supplied the same day after the flag review (84 files,
WebP only, six width tiers; inventoried in §5). The F2/F3 node fixes were
re-read from the file after design shipped them (§9).

The first homepage section (Phase 5, top-down) and the first section on a
**pure lattice field**: no bordered content boxes, no ornament cells — the
full-page grid runs behind the hero and the content floats above it. Every
geometry fact below was read off the anchor nodes at writing time; nothing
is scaled from a neighboring anchor.

---

## 1 · Section anatomy — tick totals per band

The hero owns the page rows from the top edge to the portfolio section's
first row. Section totals are whole-tick at every anchor and feed the page
stack-sum self-test. The nav (spec 005) overlays the first rows; it is not
part of the hero's DOM.

| | rm (384) | rs (576) | rt (768) | rd1 (960) | rd2 (1344) |
|---|---|---|---|---|---|
| header block top (px from page top) | 67 | 99 | 88 | 144 | 152 |
| carousel top | 8t (256) | 7t (336) | 7t (448) | 7t (560) | 6t (672) |
| carousel height | 8t | 6t | 5t | 5t | 5t |
| subhead block top | 18t (576) | 14t (672) | (in header) | (in header) | (in header) |
| CTA row top | 738 | 834 | (in header) | (in header) | (in header) |
| **section total** | **26t** | **20t** | **13t** | **13t** | **12t** |

- **Band-structural switch at 768.** Below 768 the carousel sits *between*
  the H1 and the subhead: wordmark + H1 · carousel · subhead · CTA. At 768
  and up all text stacks in one header block (H1 · subhead · CTA) above
  the carousel. One DOM, band-gated order (v5 §7.5) — the carousel is one
  element whose position in the visual order switches with the band.
- Header block left inset: 16 (= t/2) at rm; 1t at rs/rt/rd1/rd2. The
  header y offsets in the table are content-layer constants (the blocks
  float on the field); at rm/rs the header block's *bottom* lands on a
  tick (7t at 384, 6t at 576).
- At rm/rs a `ks-Wordmark` (72×15, the spec 001 wordmark asset) sits above
  the H1 — gap 16 (rm) / 24 (rs) — because the nav at those bands does not
  carry the mark. Absent at rt+.
- Whole-tick joints around the carousel: at rm it spans rows 8–15 with a
  2t gap to the subhead row (16t→18t); at rs rows 7–12 with a 1t gap
  (13t→14t); at rt/rd1 it ends exactly at 12t with a 1t clear row before
  the portfolio (13t); at rd2 it ends at 11t with a 1t clear row (12t).

## 2 · Exposure map

The hero's field is **fully exposed at every band**: one region
`0,0,12,{26|20|13|13|12}` per band, drawn through the spec 002 vocabulary
(interior lines are real 1px elements — this is what §6's grid sweep
animates). No ornament cells; no cell-merging bordered boxes. The carousel
images and the text float on the content layer; the images are opaque and
cover the cells they cross. The Figma `Grid` layers read as complete
fields in the hero rows at all five anchors (`509:5403` · `505:15527` ·
`505:13888` · `505:12908` · `505:10884`); the forward/back button frames
inside those layers belong to the portfolio and testimonial sections, not
the hero.

## 3 · Header block — H1, subhead, chips

**H1** — ink `text/100`, PP Kyoto Thin, tracking −3% at every anchor:

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| style | `display-serif/sm+/Thin` 36/42 | `md+/Thin` 42/50 | `md+/Thin` 42/50 | `lg/Thin` 48/56 | `3xl/Thin` 72/78 |
| copy | "You built a great business. Let's make it grow like one." | same | "You built a great business, now let's make it grow like one." | same | same |
| break | natural wrap (3 lines) | natural wrap (3 lines) | designed break after the comma (2 lines) | designed break (2 lines) | designed break (2 lines) |

Type walks the interpolation lines 36→42 across the base band, **holds 42
across rs and rt** (both anchors carry 42 — the shared-anchor pair), then
42→48 across rt is void — the hold ends at 768; rt interpolates 42→48 and
rd1 48→72. The copy switch rides the 768 band gate (band-gated spans, one
DOM). See §9 F8.

**Subhead** — two logical rows, ink `text/200`:

- Row 1: "keystone powers your `[website]` and everything that runs
  through it:" — the word "keystone" is **the wordmark, not type**: Figma
  paints the text `#f8f7f2` (invisible against `bg/100`) and overlays the
  `ks-Wordmark` vector scaled to the type (79.13×16.06 at rm/rs/rd1,
  71.37×14.49 at rt, 94.75×19.23 at rd2). Build: inline `ksWordmark`
  sized to the band, with visually-hidden "keystone" text.
- Row 2: "`[ads]` `[social]` `[reviews]` `[content]` and `[follow-ups]`
  that convert."

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| prose style | `text/xl/Light` 20/26 | `text/xl/Light` 20/26 | `text/lg/Light` 18/26 | `text/xl/Light` 20/26 | `text/2xl/Light` 24/32 |
| chip label line-height | 26 | 26 | **24** | 26 | 32 |
| chip padding-x | 4 | 4 | 4 | 6 | 8 |
| inline gap | 6 | 6 | **5** | 6 | 6 |
| row gap | 6 | 6 | 4 | 8 | 8 |
| h1 → subhead gap | (carousel between) | (carousel between) | 40 | 40 | 48 |

Subhead type holds 20 across the base band and rs, drops to 18 with the
768 structure switch (the same hold-then-switch pattern as the footer
accordion, 004 §4), then interpolates 18→20 across rt and 20→24 across
rd1. At rm/rs the rows wrap (row 1 breaks after "and", row 2 after
`[follow-ups]`); wrapping is natural, not designed breaks. (The source
nodes briefly carried a duplicated "and" at rm/rs; design removed it
2026-08-25 and the nodes were re-read clean — §9 F2.)

**Chips** — the signature element. Chrome at every anchor: fill the
brand color, `radius-xs`, padding-x per the table, padding-bottom 2
(`spacing-2xs`), baseline-aligned with the prose. Color pairs (from the
node fills, all five anchors agree):

| chip | fill | ink |
|---|---|---|
| website | `color/teal/250` #aadfd7 | `color/teal/700` #236058 |
| ads | `color/pink/300` #feaac8 | `color/pink/700` #783551 |
| social | `color/orange/300` #ffbb8a | `color/orange/600` #a03722 |
| reviews | `color/yellow/300` #f7ca6f | `color/yellow/700` #70531a |
| content | `color/blue/300` #a3ceff | `color/blue/700` #24509e |
| follow-ups | `color/purple/300` #d8c2ff | `color/purple/700` #4f2573 |

(website's `/250` fill and social's `/600` ink break the `/300`+`/700`
pattern — §9 F4.) The chips' **neutral load state** (motion intent, not in
the file): fill `bg/300` #e9e7dd, ink `text/200` — the brand color arrives
in the §6 highlight pass.

## 4 · CTA row

Two actions side by side; the row is `question-container` at rt+
(`cta-container` at rm):

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| button-fill "Get Started" | lg (48h, 18/26) | lg | md (40h, 16/22) | lg (48h, 18/26) | xl (48h, 20/26) |
| second action "Talk to us" | button-ghost 48h, 18/26 | button-ghost 48h, 18/26 | 40h, 16/22 | button-ghost 48h, 18/26 | button-ghost 48h, 20/26 |
| gap | 24 | 24 | 40 | 40 | 40 |

- button-fill is the spec 003 primitive at its designed size variants,
  chrome gray (`bg/300`), pill, label + 10px `_nav-trigger-icon`.
- The second action is one ghost pill at every anchor: leading
  `icons/chat` glyph (20px; 18px at rt), label "Talk to us", ink
  `color/brown/600` #72523b. Heights track the button size variants
  (48/48/40/48/48). Design normalized the small-band instances
  2026-08-25 (§9 F3); the rt instance keeps the layer name `chat-button`
  but is geometrically the md ghost. Build one ghost-with-icon variant
  of the spec 003 button-ghost.
- CTA top gap: 40 above the row at rm/rs (from the subhead block), 56 at
  rt, 64 (`spacing-7xl`) at rd1/rd2. Button gap 24 (`spacing-3xl`) at
  rm/rs, 40 (`spacing-5xl`) at rt+.

## 5 · The carousel

**Component.** `hero-carousel-image` — variants breakpoint × shape
(`rectangle` / `circle`). Both shapes carry a full-bleed
`rgba(72,0,0,0.1)` multiply overlay in Figma, but the overlay is
**baked into the exports** — the build renders the images as supplied
and adds no overlay layer (decision 2026-08-25, §9). The circle is a
`radius-full` mask over a square frame; the photo fills the mask with
cover-fit. The anchor frames draw the first
frames only (rect + circle at rs–rd2; the `image-carousel` strip component
`162:37092` at rm shows ten squares); the canonical sequence is the
**fourteen exported images**, alternating rectangle (odd) / circle (even).

**Geometry per band** — the strip starts at x 0 (full-bleed left) and the
running edge bleeds off the right frame edge; frames butt with **no gap**:

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| rectangle | 8t × 8t (square) | 8t × 6t | 8t × 5t | 8t × 5t | 8t × 5t |
| circle | 8t × 8t (square) | 6t × 6t | 5t × 5t | 5t × 5t | 5t × 5t |
| right bleed at rest | strip runs on (10-frame design) | 2t | 1t | 1t | 1t |

At rm both shapes render square (the circle is the same square under the
radius mask). The rs rectangle is 4:3 (8t×6t) — a designed band
difference from the 8:5 of rt+ — and the re-cut rs exports are 4:3 to
match (§9 F1). Above 1344 the frames zoom on the tick by construction.

**Assets.** 84 files, **WebP only** (decision at flag review, §9 F5),
re-supplied 2026-08-25 (source:
`~/Dropbox/01-work/00-projects/01-keystone/03-website/03-newsite/hero/export2`),
named `hero-{01–14}-{tier}.webp`, ~4.9 MB total. Commit under
`public/media/hero-carousel/` (the old-brand `public/media/hero/` ships
from `main` and is untouched). Six width tiers — the five anchors plus a
**1152 mid-rd1 cut** that splits the widest band; every tier is exactly
2× its cut width's rendered frame size:

| tier | odd (rect) | even (circle) | serves container | density across the slice |
|---|---|---|---|---|
| 384 | 512×512 | 512×512 | < 576 | 2.0× → 1.33× |
| 576 | 768×576 (4:3) | 576×576 | 576–767 | 2.0× → 1.5× |
| 768 | 1024×640 | 640×640 | 768–959 | 2.0× → 1.6× |
| 960 | 1280×800 | 800×800 | 960–1151 | 2.0× → 1.67× |
| 1152 | 1536×960 | 960×960 | 1152–1343 | 2.0× → 1.71× |
| 1344 | 1792×1120 | 1120×1120 | ≥ 1344 | 2.0×, easing as the zoom rides up |

The tiers are **art direction, not resolution steps** — the crops differ
(square at 384, 4:3 at 576, 8:5 above) — so frames render as `<picture>`
with one media-gated `<source>` per tier and the 384 file as the `<img>`
fallback. The media conditions mirror the band gates plus the 1152 split
(a presentation-only cut inside rd1, no structural switch); they are
viewport queries, so near a band edge with a scrollbar the tier may
lag the container band by the scrollbar width — a density detail only,
geometry is CSS-driven and unaffected. *Amended 2026-08-26 (spec
002.r1 — §9): the media cuts follow the nearest-anchor structural
gates (470 · 665 · 860 · 1130) so each band's crop shows wherever its
design renders; the 1152 mid-cut serves the compressed rd2 slice. The
scrollbar-lag caveat stands.* `object-fit: cover;
object-position: center`, explicit width/height, `decoding="async"`.
The first rectangle and first circle are priority-loaded (§6 needs
pixels at +620/+760ms); later frames lazy-load.

## 6 · Motion

Intent supplied by design 2026-08-25; values below are the spec. Two new
global grammars join `tokens/motion.css` (the drawer grammar carries over
unchanged): the **fade-rise** and the **carousel slide**. Constants: rise
distance 26px · rise duration 800ms · rise ease `cubic-bezier(0.22, 1,
0.36, 1)` (the existing ease-out curve — alias, do not fork) · wipe
duration 420ms · wipe ease `cubic-bezier(0.76, 0, 0.24, 1)` · chip stagger
150ms · slide duration 900ms · slide ease `cubic-bezier(0.45, 0.05, 0.15,
1)` · dwell 3500ms · first-advance delay 4500ms.

**Load choreography** — one cascade, one motion language. Every entry is
the same fade-rise: opacity 0→1 with translateY(26px)→0, 800ms, ease-out,
`both` fill. Delays from page ready (fonts loaded, first frame after
hydration):

| t (ms) | element | motion |
|---|---|---|
| 0 | lattice verticals | scaleY 0→1, origin top, 700ms, ease-out |
| 120 | lattice horizontals | scaleX 0→1, origin left, 700ms, ease-out |
| 0 | nav rail | fade + translateY(−8px)→0, 600ms |
| 80 | H1 line 1 | fade-rise |
| 190 | H1 line 2 | fade-rise |
| 330 | subhead row 1 | fade-rise — chips in the **neutral state** (§3) |
| 410 | subhead row 2 | fade-rise — neutral chips |
| 490 | CTA row | fade-rise |
| 620 | rectangle image | fade-rise (nothing image-specific) |
| 760 | circle image | fade-rise |
| ~1450 | highlight pass | see below |

- The lattice sweep animates the exposure region's interior line elements
  (§2 — they are real elements by spec 002 construction); the region's
  edges fade with the vertical sweep. The sweep is page-wide, not
  hero-scoped; 006 owns the orchestrator, later sections inherit it.
- The nav's participation is one class the orchestrator sets on the nav
  root; nav internals (spec 005) are unchanged.
- H1 lines animate separately only where the break is designed (rt+). At
  rm/rs the H1 rises as one unit at +80ms — natural wrap must not be
  re-broken for motion (decision at draft; approval covers it).
- At rm/rs the visual order differs (§1): the same delays apply by
  element, not by position — the carousel images still enter at
  +620/+760ms between the H1 and the subhead.
- At rm only the first ~1.5 frames are visible; the rectangle and the
  visible circle sliver are the two image entries.

**Highlight pass** — the signature moment, strictly after all fade-rises
settle (~1450ms). In reading order — website, ads, social, reviews,
content, follow-ups — 150ms apart, each chip:

- wipes its brand fill (§3 table) left→right over the neutral base:
  `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)`, 420ms, wipe ease, on
  a color layer above the neutral fill;
- cross-fades its label ink `text/200` → the brand ink, 420ms, ease.

Last chip lands ~2620ms. The neutral base never animates position — the
wipe is purely chromatic.

**Carousel** (post-load). Auto-advance right→left: the track translates
by the width of the leaving frame (frame widths alternate, §5) so the
next frame's left edge lands at x 0. 900ms per slide on the slide ease —
smooth, no overshoot. First advance at +4500ms from load start (the
highlight pass must finish first); then every 3500ms. Seamless loop:
clone the three leading frames at the tail; after sliding onto the
clones, snap to the true frame without transition on the next tick. The
timer pauses while the document is hidden and resets its phase on
resume; it does not pause on hover (no user controls in the design).

**Reduced motion.** `prefers-reduced-motion: reduce` renders everything
state-to-state: no sweep, no fade-rise, chips born in their brand state,
and the carousel holds the first frames — no auto-advance, no timers.

*Amended 2026-08-26 (spec 002.r1's settle contract — §9):* the
choreography ends its run explicitly. On the final beat's
`animationend` (the follow-ups chip's wipe) the orchestrator marks the
page `v2-settled`, whose CSS turns the choreography animations off —
band-gated elements re-entering `display` then have nothing to
restart, so resizing across gates no longer replays the load. The
`v2-load` class stays (the cold-load guard keys on it); the dev replay
clears the settled mark before re-flipping.

## 7 · New assets and non-token constants

1. **Carousel images** — the 84 WebP exports (§5), committed verbatim to
   `public/media/hero-carousel/`.
2. **Section component** `design-system/v2/sections/hero.tsx` + `hero.css`;
   the carousel track and the load orchestrator are the only client
   islands. Chips, subhead, H1, CTA are server-rendered.
3. **Ghost-with-icon button** (§4) — variant of the spec 003 button-ghost
   with the committed `icons/chat` glyph; no new vector assets.
4. **Motion tokens** (global layer, §6): rise duration/distance, wipe
   duration/ease, chip stagger, slide duration/ease, dwell, first-advance
   delay. The rise ease aliases the existing ease-out token.

Non-token material constants (component token layer, per band only where
used): header block y offsets 67/99/88/144/152 and the rm 16px inset;
wordmark-in-subhead sizes (§3); the rt inline gap 5 and chip line-height
24; nav drop 8px. (The Figma overlay `rgba(72,0,0,0.1)` is baked into
the exports — no code constant; §5, §9.)

*Amended 2026-08-26 (spec 002.r1's four units — §9):* several of these
constants were geometry or typography in disguise and now scale, as
exact anchor ratios that render identically at the anchors: the header
y offsets ride the tick (67/32 · 99/48 · 88/64 · 144/80 · 152/112);
the rm inset and the header wordmark's gap are `t/2` (16 at rm and 24
at rs collapse into one rule); the rm header right inset is 1t; the
subhead wrap box (384) and the CTA drop's 122 text height ride the
weights; the subhead inline gap and chip padding-x ride the type in em
(6/20 · 6/20 · 5/18 · 6/20 · 6/24 and 4/20 · 4/20 · 4/18 · 6/20 ·
8/24). True material — the wordmark mark, row gaps, buttons, icons —
stays px. Tick- and weight-riding constants moved to the component
token layer's `.page` block (the 002.r1 scope rule).

## 8 · Semantics, deliverable

- The section is the `<main>` opening block; the H1 is the page's only
  `<h1>`. The subhead is one paragraph — chips are `<span>`s (no semantics
  beyond emphasis; they are not links), the wordmark carries
  visually-hidden "keystone" text. CTA: "Get Started" is a real link to
  `/pricing` (matching the nav, spec 005) until the grader flow ships;
  "Talk to us" is a real `<button>` carrying the stable hook
  `data-action="open-chat"` — inert until the chat overlay is encoded —
  both styled as the spec 003 buttons (decisions 2026-08-25, §9).
- The carousel is ambient imagery: the strip is `aria-hidden` with empty
  alts, no controls, no live-region announcements. It must never trap
  focus or emit focusable clones.
- Server component except the two islands (§7.2); zero hydration
  mismatches; the load choreography runs from a class flip, so a no-JS
  render shows the settled, branded state.
- QA surface: a permanent, noindexed **`/hero`** dev page rendering the
  section beneath the mounted nav (spec 005) at all bands — the nav is
  present so §6's choreography is complete, including its t=0 beat —
  with a replay control for the load choreography and a reduced-motion
  toggle. The page-level checks run on **`/home-fixture`**, the
  noindexed dev route that stacks the new-brand homepage sections in
  order as Phase 5 lands them (hero now, above a portfolio placeholder
  block sized to the portfolio's expected ticks); Phase 6 promotes it
  to `/` at cutover.

## 9 · Resolutions record

All eight flags raised at draft were resolved 2026-08-25, the same day;
node fixes were re-read from the file after design shipped them.

- **F1 — rs carousel geometry: resolved by re-export.** The rs band's
  4:3 rectangle (8t×6t) is the designed geometry; the exports were
  re-cut 4:3 to match (768×576). The 576 rectangle remains a plain frame
  rather than a `hero-carousel-image` instance — file hygiene only, no
  build consequence.
- **F2 — duplicated "and": fixed in the file.** Design removed the
  stray "and" from the rm/rs row-1 nodes; re-read clean
  (`500:24687–24689` · `506:4403–4405`: "…website and" / "everything
  that runs through it:").
- **F3 — second CTA: fixed in the file.** All anchors now carry the
  ghost pill at the component height (48/48/40/48/48) with the label
  "Talk to us" — no period anywhere. The fix also set the rm/rs button
  gap to 24 (`spacing-3xl`, was 32 at first read) — §4 carries the new
  value. The rt instance keeps the layer name `chat-button`; it is
  geometrically the md ghost.
- **F4 — chip palette exceptions: deliberate.** website binds
  `teal/250`, social ink binds `orange/600`; the build binds exactly
  these variables.
- **F5 — image format: WebP only.** Decision at flag review: single
  format, no AVIF. (The draft had specced AVIF-first after the original
  request said WebP-first with AVIF fallback — mooted; the re-export is
  WebP only.)
- **F6 — export densities: resolved by the re-export's tier scheme.**
  Six 2×-at-cut tiers including the new 1152 mid-rd1 split (§5 table).
  Worst-case density is now the top slice of each band, 1.33×–1.71×,
  softest at 480–576px containers (the base band's top). Accepted:
  ambient photography under the multiply overlay; a 768×768 re-cut of
  the 384 tier is the known remedy if it ever reads soft on device.
- **F7 — rt subhead constants: deliberate.** Inline gap 5 and chip
  line-height 24 at rt are designed values; built as such (component
  token layer).
- **F8 — H1 copy switch: deliberate.** "business. Let's" at rm/rs,
  "business, now let's" at rt+ — a designed width-fitting choice; the
  copy swap rides the 768 band gate in one DOM.
- **Overlay baked into the exports** (decision 2026-08-25, post-review):
  the component's `rgba(72,0,0,0.1)` multiply overlay was applied at
  export time — the build renders the supplied pixels and adds no
  overlay layer or blend mode in code (§5, §7).

Post-approval amendments, 2026-08-26 (spec 002.r1 — nearest-anchor
rendering; approved by the design owner at the mid-band review):

- **Constants reclassified under the four units** (§7 amendment): the
  header offsets, insets, and wordmark gap ride the tick; the subhead
  wrap box and CTA drop ride the weights; the subhead's line-internal
  spacing rides the type in em. Found at review: the fixed 384px wrap
  box and fixed line spacing re-broke the designed subhead rag below
  ~539, and the fixed header offsets ate the H1's carousel clearance
  in the compressed rs slice (002.r1 §7 R2/R3 carry the findings).
- **The choreography settles** (§6 amendment): resizing across gates
  replayed every display-gated element's animation — everything except
  the subhead, the one choreographed element with no band variants
  (002.r1 §7 R4). The orchestrator now ends the run on the last chip's
  `animationend`.
- **Tier cuts follow the structural gates** (§5 amendment): under
  midpoint gating the old anchor-width cuts showed a neighboring
  band's crop across a compressed slice (002.r1 §7 R6).

Pre-approval decisions, 2026-08-25 (build-prep review):

- **"Get Started" destination:** `/pricing`, matching the nav's Get
  Started (spec 005) — the grader flow the draft named does not exist
  as a route yet; re-point when it ships.
- **"Talk to us" behavior:** opens a chat bubble that is not yet
  encoded. Ships as an inert `<button>` with the stable hook
  `data-action="open-chat"`; wired when the chat overlay lands. It is
  server-rendered — no third island.
- **`/hero` mounts the nav** so the load choreography is testable end
  to end, including the nav's t=0 entry.
- **Fixture route named `/home-fixture`** — the growing Phase 5
  assembly surface, promoted to `/` at Phase 6 cutover (§8).
- **ButtonGhost gains an `href` prop** (link rendering with identical
  chrome), mirroring the extension spec 005 made to ButtonFill — needed
  so ghost chrome can serve real links; the hero's own "Talk to us"
  uses the button form.

## 10 · Acceptance criteria

At each of the five anchors and one arbitrary mid-band width per band,
scrollbar forced on:

- [ ] Section height ÷ t equals 26/20/13/13/12 exactly; the carousel top
      and height land on §1's ticks; stack sum and landmark audit pass
      with the hero mounted above the portfolio placeholder on
      `/home-fixture`.
- [ ] The hero field renders fully exposed through the spec 002
      vocabulary — one region per band, correct interior line counts, no
      ornament cells; the images cover the cells they cross
      (rendered-bounds check, never metadata x/y).
- [ ] Structure switches at 768 exactly: below, wordmark + H1 · carousel
      · subhead · CTA; at and above, H1 · subhead · CTA · carousel — one
      DOM, band-gated, zero hydration mismatches.
- [ ] Type walks its lines: H1 36→42, hold across rs/rt, 42→48→72;
      subhead 20 hold to 768, 18 at rt floor, 18→20→24; values exact at
      band floors and ceilings; weight and tracking are band constants;
      the H1 copy swap rides the 768 band gate.
- [ ] Chips render §3's fills, inks, paddings, and radius exactly at
      every anchor; baseline alignment with the prose holds at a
      mid-band width.
- [ ] The carousel renders frame sizes, butt joints, and right bleed per
      §5; the correct tier is fetched at each band including the 1152
      split (verify in the network log — WebP only, one tier per width);
      the first two frames are priority-loaded and painted before their
      choreography slots.
- [ ] Load choreography matches §6's table: computed delays, durations,
      curves, and the neutral chip state before ~1450ms; the highlight
      pass wipes in reading order at 150ms spacing after every fade-rise
      completes; the lattice sweep hits verticals-then-horizontals at
      the 120ms offset.
- [ ] Carousel behavior: first advance ≥4500ms from load start, then
      3500ms dwell; 900ms slides on the slide ease; the wrap snap is
      invisible (no flash, no reverse travel); the timer pauses when the
      document is hidden.
- [ ] `prefers-reduced-motion: reduce` renders the settled branded state
      with no timers running; a no-JS render is identical.
- [ ] Accessibility: one `<h1>`; the subhead reads as one sentence pair
      (including "keystone" via hidden text); chips are not announced as
      interactive; the carousel is hidden from the accessibility tree;
      "Get Started" is a real link and "Talk to us" a real button
      carrying the open-chat hook, both with the spec 003 states; the
      tree carries no clones.
- [ ] Every color, spacing, radius, type, and effect value traces to a
      token; §7's constants exist only in the component token layer; the
      motion constants live in the global motion token layer; the images
      are committed verbatim exports.
- [ ] Server/client split per §8 (two islands only); `/hero` dev page
      renders all bands with the replay and reduced-motion controls; the
      old site's routes and bundles unchanged in the production build.
