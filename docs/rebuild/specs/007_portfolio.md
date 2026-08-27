# Spec 007 — Portfolio gallery: cards, carousel, and the page joins

**Status:** Approved 2026-08-26 (draft same day; §9 records the flag
resolutions)
**Depends on:** spec 001 (tokens, fonts) · spec 002 (grid engine, exposure
vocabulary, band classes) · spec 003 (button-ghost + sizes, the icon sheet,
`IconArrowLeft`/`IconArrowRight`, the button-arrow pass-through grammar) ·
spec 005 (nav — mounted on the QA surfaces) · spec 006 (hero — the fade-rise,
wipe, and carousel-slide grammars are reused; §7's pause protocol extends the
hero carousel's behavior)
**Sources:** fresh MCP reads 2026-08-26 of the portfolio nodes inside the
five anchor frames — sections `230:13338` (384) · `359:29929` (576) ·
`142:4417` (768) · `333:20793` (960) · `135:1363` (1344); headers
`230:13340` · `359:29930` · `142:4418` · `333:20794` · `135:1365`;
button-bars `230:13347` · `588:18093` · `142:4426` · `333:20802` ·
`135:1372` (re-read post-fix, see §9); the `portfolio-card` component set
`58:5520` — active/inactive defaults (`559:12675` / `559:12687`) and the
loading state (`587:18073` / `587:16286`, identical pair); the
`grid-button` component set `590:18139` (direction × size × state, received
2026-08-26); the in-frame control pairs `509:5918`/`509:5932` ·
`505:15862`/`505:15876` · `505:14139`/`505:14153` · `505:13159`/`505:13173`
· `505:11110`/`505:11124` — all in `ks-MarketingSite`. Every landmark was
verified against rendered bounds through the console bridge (grid
auto-layout metadata was stale on every arrow pair — §2, §9). Motion intent
(curtain-reveal entrance, hero-pause behavior, inactive-state desaturation
directive) supplied 2026-08-26 with the spec request; values specced in §7.
Site screenshot exports supplied 2026-08-26 (40 files, WebP only, five
width tiers; inventoried in §5). Design fixes to the button-bars (icon
mapping, casing, 384 sizes) shipped and re-read the same day (§9).

The second homepage section (Phase 5, top-down). Like the hero it sits on a
pure lattice field — but it introduces the first **content-layer controls
on the lattice** (the carousel arrow pair) and the first **cross-section
behavior contract** (the hero pause, §7.4). Every geometry fact below was
read off the anchor nodes at writing time; nothing is scaled from a
neighboring anchor.

---

## 1 · Section anatomy — tick totals per band

The section owns the page rows from the hero's last row to the engine
accordion's first. Its top lands exactly on the hero total at every anchor
(26t/20t/13t/13t/12t — spec 006 §1); all three blocks are whole-tick.

| | rm (384) | rs (576) | rt (768) | rd1 (960) | rd2 (1344) |
|---|---|---|---|---|---|
| section top (page ticks) | 26t (832) | 20t (960) | 13t (832) | 13t (1040) | 12t (1344) |
| header | 4t (128) | 3t (144) | 2t (128) | 2t (160) | 2t (224) |
| gallery row | 12t (384) | 6t (288) | 5t (320) | 5t (400) | 5t (560) |
| button-bar | 3t (96) | 2t (96) | 2t (128) | 2t (160) | 2t (224) |
| **section total** | **19t** | **11t** | **9t** | **9t** | **9t** |

- Left inset: 16 (= t/2) at rm; 1t at rs and up — same rule as the hero
  header block.
- The header text and the button-bar buttons are vertically centered in
  their blocks at every anchor (verified from rendered bounds; e.g. rm
  header 34+60+34 = 128, rd2 bar 88+48+88 = 224).
- No structural switch: the same three-block stack at every band. Band
  differences are values (sizes, counts, insets), not order.

## 2 · Exposure map

**Amended 2026-08-26 (build-day — §9 R13).** The draft transcribed the
field as fully exposed (one region `0,0,12,{19|11|9|9|9}` per band). Per-cell
stroke visibility on the five page Grid layers (`509:5403` · `505:15527` ·
`505:13888` · `505:12908` · `505:10884`), read through the console bridge
at build, shows the file paints a **right-side rail continuing the
hero's** — the same cell-presence-is-not-paint blindness the hero's §2
correction recorded at its own build. Design confirmed the rail is the
intent (decision 2026-08-26). The painted lattice, zero-based
section-local ticks (cols × rows):

| band | plain cells | ornament cells |
|---|---|---|
| rm | 9–10 × 0 · 9–11 × 1–2 · 10–11 × 3 · 9–11 × 4–15 · 9 and 11 × 16–17 · 9–11 × 18 | `bg/200`-filled cell 11 × 0 · outlined circle 9 × 3 |
| rs | 9–10 × 0–1 · 10–11 × 2 · 9–11 × 3–6 · 9 and 11 × 7–8 · 9–11 × 9 · 10–11 × 10 | filled cell 11 × 0 · circles 9 × 2 and 9 × 10 |
| rt | 8–10 × 0 · 8–11 × 1–5 · 9–11 × 6 · 10–11 × 7 · 8–11 × 8 | filled cell 11 × 0 |
| rd1 | 8–10 × 0 · 8–11 × 1–5 · 9–11 × 6–7 · 8–11 × 8 | filled cell 11 × 0 |
| rd2 | identical to rd1 | filled cell 11 × 0 |

The rt gap at 9 × 7 and the rs gap at 11 × 1 are deliberate (§9 R15).
The filled cell and the circles are the promoted f-cell ornament
vocabulary (`bg/200` + `border/000`; outline-only for the circles). The
cards, header, and buttons float on the content layer; the cards are
opaque and cover the cells they cross.

**The carousel control pair** is the section's only special-cell presence:
two 1×1t cells, stacked vertically (forward above, back below), sitting in
the card gutter after the last active card. Rendered-bounds positions
(zero-based; page-absolute row and section-local row):

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| column | 10 | 10 | 8 | 8 | 8 |
| page rows | 42–43 | 27–28 | 19–20 | 19–20 | 18–19 |
| section-local rows | 16–17 | 7–8 | 6–7 | 6–7 | 6–7 |

The control paints its own cell chrome (§6); the file draws no lattice
cells at the control positions — the control's ring is the only cell
chrome there (amended 2026-08-26; the §2 table above carries the
re-read truth). Controls need pointer events — they are real
content-layer components, never lattice paint (plan.md, "Special
cells"). The in-frame
metadata read diagonally-offset positions for every pair at every anchor —
the known grid auto-layout staleness; the table above is rendered truth
and **supersedes the gallery-pair positions recorded in plan.md** from the
2026-08-22 audit (768/960/1344 have since moved — §9).

*Amended 2026-08-26 (§9 R26):* the section also draws a **designed top
rule** the per-cell sweep could not see: the anchor section frames carry
a **top-only 1px `border/000` stroke** (`strokeTopWeight` 1, the other
sides 0; stroke-aligned center — the ±0.5px artifact class, the intended
value is 1px on the section's first row line). It is section chrome, not
lattice paint. Visible span: the **full 12t at every band** — the frame
hugs the overflowing card track (1328/960/1024/1280/1792 wide) and the
page clips it to the anchor width; where the rail's row-0 cell tops meet
it they share the row line's pixels (v5 §4). Drawn by the section,
`aria-hidden`.

## 3 · Header

Copy at every anchor: **"It starts with a site that's worth the visit."**
Ink `text/100`, PP Kyoto:

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| style | `display-serif/xs/Extralight` 24/30 | `xs+/Extralight` 28/34 | `xs+/Extralight` 28/34 | `sm/Extralight` 32/38 | `md+/Thin` 42/50 |
| tracking | −2% | −2% | −2% | −2% | **−3%** |
| block width | 272 | 384 | 448 | 560 | 784 (7t) |

Type walks 24→28 across the base band, **holds 28 across rs** (shared
anchors), interpolates 28→32 across rt and 32→42 across rd1. Weight and
tracking are band constants: Extralight/−2% through rd1, switching to
Thin/−3% at the 1344 gate. The text wraps to two natural lines at every
anchor. This is an `<h2>` (the page's `<h1>` is the hero's).

*Amended 2026-08-26 (build-day — §9 R16):* the two-line wrap is pinned
by the **text node's own box**, narrower than the block above at rs+ —
272 · 336 · 384 · 400 · 560, read from the header nodes at build; all
whole or half ticks (8.5t · 7t · 6t · 5t · 5t). The block width row
above is the header frame; the frame alone lets the rd2 line fit
unwrapped.

## 4 · The portfolio-card

Component `portfolio-card` (58:5520): variants active × breakpoint × state.
One card = shell → site-thumbnail → image slot. All values below are read
from the 1344 variants and hold at every breakpoint variant (sizes differ
per §5; chrome is identical).

| | active | inactive | loading |
|---|---|---|---|
| shell fill | `bg/050` #fcfbf8 | rgba(234,232,224,0.5) — deliberate, its own token (§9 R11) | same as inactive |
| shell hairline | `border/000` 1px | `border/000` 1px | `border/000` 1px |
| shell padding | 8 (`spacing-md`) | 8 | 8 |
| thumbnail radius | `radius-md` 8 | none | none |
| thumbnail hairline | `border/000` 1px | `border/050` #e0ddd1 1px | `border/050` 1px |
| image | full color | desaturated (below) | **no image — `bg/100` #f8f7f2 panel** |

- The thumbnail hairline is drawn as an **overlay** above the image and
  the curtain (z-order in the slot: image · curtain · hairline), so it
  never disappears behind either.
- The image fills the thumbnail interior top-anchored, cover-fit. The
  Figma fill's 102.72% top-anchored crop is **baked into the exports**
  (each export is exactly 2× the thumbnail interior) — the build renders
  the supplied pixels 100%-wide with no extra scaling or overlay.

**Inactive desaturation — CSS filter, not the file's blend mode.** The
Figma inactive variant paints the image `mix-blend-mode: luminosity` at
80% opacity. The rules forbid transcribing it: the card background
transitions with the active state, and a luminosity image over a
transitioning background blinks ("CSS Transition Constraints",
`docs/rules/rules.md`); blend modes also cannot interpolate, so the
active⇄inactive change would snap. Build instead:

- `filter: grayscale(1) sepia(0.1) brightness(0.97)` + `opacity: 0.8` on
  the inactive image (component-layer constants
  `--pf-inactive-filter` / `--pf-inactive-opacity`).
- `grayscale(1)` reproduces the luminance read; the small `sepia()` term
  supplies the warm cast the blend inherits from the backdrop; the 80%
  opacity over the same card background reproduces the show-through
  exactly. Filter and luminosity are different operations — the constants
  are a starting point, **visually tuned against the rendered inactive
  variant (559:12687)** at build QA (console-bridge screenshot
  side-by-side); the tuned values are recorded here as an amendment.
- *Amended 2026-08-26 (build QA):* tuned values
  `grayscale(1) sepia(0.1) brightness(0.98)` at opacity 0.8 — brightness
  0.97 → 0.98. Tuned quantitatively: a canvas grid search against the
  exact luminosity composite (the image luminosity-blended at 80% over
  the shell backdrop), averaged over all eight exports; the tuned
  values minimize the mean RGB delta at 1.5/255 (the draft constants
  measured 2.1/255).

**Active-slot rule.** Activity belongs to track slots, not cards: the
leftmost **1** slot at rm and the leftmost **2** slots at rs+ are active
(matches the anchor frames: one active card at 384, two at 576+). When
navigation slides the track, the cards entering those slots become active
and the leaving ones inactive; the chrome and filter morph per §7.2.

## 5 · The gallery carousel — geometry and image assets

**Geometry per band** — the strip starts at the section inset and bleeds
off the right frame edge; pitch = card + 1t gap everywhere:

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| card w×h | 304×384 (9.5t×12t) | 192×288 (4t×6t) | 192×320 (3t×5t) | 240×400 (3t×5t) | 336×560 (3t×5t) |
| thumbnail interior | 288×368 | 176×272 | 176×304 | 224×384 | 320×544 |
| pitch | 336 | 240 | 256 | 320 | 448 |
| cards fully visible at rest | 1 | 2 | 3 (third ends at frame edge) | 3 | 3 |
| partially visible | 2nd (32px sliver) | 3rd | — | — | — |

*Amended 2026-08-26 (build erratum — §9 R21):* the cards render
**line-inclusive** (width and height `+1px`, the gap giving the pixel
back), the same v5 §5 convention the lattice vocabulary uses — a card's
far hairlines land **on** the lattice lines they meet (the rail's edge,
the gallery's bottom row) instead of one pixel short. Every card still
starts on its designed tick; the §5 tick geometry above is unchanged.

Eight sites populate the strip (the anchor frames draw four instances; the
canonical sequence is the eight exports). Above 1344 the frames zoom on
the tick by construction. The gallery window clips at the viewport edges;
the left inset is the track's resting offset, so a leaving card visibly
crosses the inset zone mid-slide (no designed clip edge exists in the
file — decision at draft, approval covers it).

**Assets.** 40 files, WebP only, supplied 2026-08-26 (source:
`~/Dropbox/01-work/00-projects/01-keystone/03-website/03-newsite/portfolio/export`),
named `portfolio-{01–08}-{tier}.webp`, ~1.7 MB total. Commit verbatim under
`public/media/portfolio/`; register in `design-system/v2/media.ts`
(`PORTFOLIO_TIERS` + the eight-entry site list) mirroring the hero-carousel
registry shape. The sites, in export order (names from content 2026-08-26,
§9 R12): 01 Palm Coast Zivel · 02 Lune Bodywork · 03 x2o Studio ·
04 DreFadez · 05 Your Health Solutions · 06 Miriam Merin, LCSW ·
07 House of Aesthetics · 08 X2Talent. Five width tiers, each exactly 2× its anchor's thumbnail
interior; **the 1344 tier serves down to 1152** (decision 2026-08-26 — no
mid-rd1 cut this time):

| tier | export size | serves container | density across the slice |
|---|---|---|---|
| 384 | 576×736 | < 576 | 2.0× → 1.31× |
| 576 | 352×544 | 576–767 | 2.0× → 1.47× |
| 768 | 352×608 | 768–959 | 2.0× → 1.57× |
| 960 | 448×768 | 960–1151 | 2.0× → 1.65× |
| 1344 | 640×1088 | ≥ 1152 | 2.35× → 2.0×, easing up as the zoom rides |

The tiers are **art direction, not resolution steps** — the crops differ
per band — so the image renders as `<picture>` with one media-gated
`<source>` per tier, largest-first, and the 384 file as the `<img>`
fallback (the spec 006 §5 pattern; the same scrollbar-lag caveat is
accepted as density-only). *Amended 2026-08-26 (spec 002.r1 — §9 R25):
the media cuts follow the nearest-anchor structural gates (470 · 665 ·
860 · 1130), superseding the table's "serves container" column and the
1152 line — the 1344 tier now serves from the 1130 gate.* Worst-case densities (1.31–1.65× at band tops)
match the range accepted for the hero (006 §9 F6); the known remedy —
re-cut a tier at a higher width — applies if any slot reads soft on
device. `decoding="async"`, explicit width/height. Loading: the at-rest
visible cards load eagerly (the entrance needs their pixels — §7.1); the
rest lazy-load and are primed to eager on the first navigation press (the
hero island's priming pattern), so navigated-in cards always arrive
painted.

## 6 · Button-bar and the carousel control

**Button-bar** — spec 003 ghost-with-icon buttons (the committed intrinsic
two-tone icons), centered in the bar block, post-fix truth (§9):

| | rm | rs | rt | rd1 | rd2 |
|---|---|---|---|---|---|
| buttons | 2 | 3 | 3 | 3 | 3 |
| ghost size | sm (36) | sm (36) | md (40) | md (40) | xl (48) |
| icon px | 16 | 16 | 18 | 18 | 20 |
| gap | 8 | 4 | 8 | 16 | 32 |

The three buttons everywhere but rm: **"Our work"** (`icons/projects`,
ink `color/brown/600`) · **"Our approach"** (`icons/approach`, ink
`color/teal/600`) · **"Case studies"** (`icons/case-studies`, ink
`text/200`). At rm the bar carries two: "Our work" and "Our approach" —
"Case studies" is dropped at the smallest band (§9 R10). The rs gap of 4
(`spacing-xs`) is designed — it fits three buttons in the 384-wide column.
The three inks are three `data-chrome` variants of the spec 003 ghost
(brown exists; teal and gray are enumerated by this spec). All three are
real links to **`/our-work`** (decisions 2026-08-26: "Our approach" also
goes to Our Work; "Case studies" points there too until its own route
ships — re-point then, like the hero's Get Started).

**The carousel control** — new primitive **`grid-button`**
(`design-system/v2/primitives/`), from the component set `590:18139`:
direction (forward/back) × size (xs 32 · sm 48 · md 64 · lg 80 · xl 112 —
the five cell sizes) × state (default/hover/focused). The section mounts
size per band: rm xs · rs sm · rt md · rd1 lg · rd2 xl, at §2's cells —
forward above back.

| | forward | back |
|---|---|---|
| cell chrome | 1px `border/000` ring, `radius-full`, **no fill** | 1px `border/000` ring, **no radius, no fill** |
| inner | disc `text/300`, `radius-full` | square `bg/300` |
| inner size (xs/sm/md/lg/xl) | 26/28/32/40/48 | 24/26/30/38/46 |
| glyph | `IconArrowRight`, ink `bg/200` | `IconArrowLeft`, ink `text/200` |
| glyph box | 56.8% of inner (14.77→27.26) | 59.8% of inner (14.35→27.5) |
| hover | inner `text/100` | inner `bg/500` |
| focused | + ring `0 0 0 2px bg/100, 0 0 0 4px bg/600` | + ring `0 0 0 2px bg/100, 0 0 0 4px bg/500` |

- Cell fill amended 2026-08-26 (§9 R14): the set carries a `bg/200`
  fill on every variant with its visibility **off**, and the in-frame
  instances agree — the unfilled cell is the design (invisible in Figma
  means not painted; decision 2026-08-26). The draft's `bg/200` fill
  column is superseded.
- The square-vs-circle inner is back/forward **chrome**, not a disabled
  state (the set styles all three states for both directions).
- **Hover motion inherits the button-arrow pass-through** (direction
  2026-08-26): the glyph slides out through the leading edge and re-enters
  through the trailing edge — two stacked glyphs on `left` transitions,
  aliasing `--btn-arrow-thru-dur` and the enter/exit eases unchanged,
  travel `(inner + glyph) / 2`, `overflow: clip` on the inner. Mirrored
  for back (exits left, re-enters right). Alias, never fork.
- **Bounds behavior:** navigation clamps — back is natively `disabled` at
  the start position, forward at the end (the last card fully inside the
  frame edge; max presses from rest: 7 at rm, 6 at rs, 5 at rt/rd1/rd2).
  The set designs no disabled chrome: disabled buttons keep default chrome,
  drop hover/cursor affordances, and expose `disabled` to the tree (§9).
  *Superseded 2026-08-26 (design direction at build review — §9 R19):
  navigation **loops** — no bounds, no disabled states; see §7.3.*
- **Layering (amended 2026-08-26 — §9 R18):** the pair sits **under the
  card layer** — sliding cards pass over the buttons; the gallery window
  is pointer-transparent so the buttons stay clickable whenever a card
  does not cover them, and a covering card swallows the press.
- **Touch target:** the xs cell is 32×32 — below the 44px floor
  (`docs/rules/rules.md`, "Responsive-Native"). The xs control extends its
  hit area to 44×44 via an inset-negative pseudo-element
  (`--gbtn-hit-extend`); visual chrome unchanged.

## 7 · Motion and the page joins

Intent supplied 2026-08-26; values below are the spec. One new grammar —
the **curtain reveal** — born in the component token layer (promotes to
`tokens/motion.css` at its second consumer). Existing grammars reused:
fade-rise (unchanged tokens), the wipe ease, the carousel slide. Reused
tokens are aliased, never forked.

### 7.1 · Entrance — the curtain reveal

Plays **once per page view**, when the section first enters the viewport
(§7.4's observer, at 20% section visibility). *Amended 2026-08-26 (build
review — §9 R20): the entrance gates on the **gallery window**, not the
section — first time 25% of the gallery row is visible
(`--pf-enter`). The section-level gate opened on the header alone: 20%
of the section is less than the header block at every band, so curtains
lifted while the cards were still a sliver. Further amended the same
day (§9 R22): the base band opens at 18% (`--pf-enter-rm`) — portrait
devices held the reveal too long at 25%.* A `data-entered` flag
guards re-runs, including scroll re-entry. Only the cards visible at rest
participate (rm: 2 incl. the sliver · rs: 3 · rt/rd1/rd2: 3), indexed
i = 0.. left→right; fully off-screen cards render settled from the start.

The pre-reveal card is the **loading variant** (587:18073 — the designed
curtain, §9): loading chrome with the `bg/100` panel where the screenshot
goes. The sequence per card: shell frames in wearing loading chrome → the
curtain (the `bg/100` panel) slides down and out, revealing the site
top-first → active-slot cards morph to active chrome as their curtain
lands. *Amended 2026-08-26 (design direction at build review — §9 R17):
the curtain reveals the slot's own image treatment — active-slot cards
lift onto the full-color image, inactive slots onto the desaturated one.
The landing morph carries the shell fill, hairline, and radius only; the
image filter never rides the morph.*

| element | property | from → to | duration | delay | ease |
|---|---|---|---|---|---|
| header | fade-rise | per grammar | `--motion-rise-duration` (800ms) | 0 | `--motion-rise-ease` |
| card shell | opacity, scale | 0, 0.985 → 1, 1 | 450ms | i × 120ms | `--motion-drawer-ease` (ease-out) |
| curtain panel | translateY | 0 → 101% | 700ms | i × 120ms + 350ms | `--motion-wipe-ease` |
| active chrome morph | §4 chrome + filter | loading → active | 450ms | with its curtain's landing | `--motion-drawer-ease` |

- Constants (component layer): `--pf-frame-dur` 450ms ·
  `--pf-frame-scale` 0.985 · `--pf-stagger` 120ms · `--pf-curtain-dur`
  700ms · `--pf-curtain-delay` 350ms. The curtain ease **is** the 006 wipe
  ease; the frame ease-out and the rise alias the existing curves. Full
  entrance settles ≈ 1.29s.
- 101% (not 100%) avoids a 1px seam at the end frame. The curtain is
  clipped by the thumbnail (`overflow: hidden`; the radius arrives with
  the active morph). All layers `fill: both`; no layout shift — cards
  occupy final geometry from the first frame.
- A curtain never lifts over undecoded pixels: each card's lift fires at
  `max(scheduled delay, image decode complete)` (`img.decode()`); the
  scheduled stagger holds whenever decode wins the race (eager-loaded
  visible cards, §5, make that the normal case).
- If the user navigates mid-reveal, running reveals finish; nothing
  restarts or snaps (they cancel to the settled state only if their card
  leaves the viewport).

### 7.2 · Active-state morph (post-entrance)

On every navigation slide the slot occupancy changes (§4): the affected
cards transition shell fill, thumbnail radius, hairline colors, and the
image filter/opacity **with the slide** — same duration and ease as the
track (`--motion-slide-duration` 900ms, `--motion-slide-ease`) so the
state change reads as part of the movement. The filter transition is the
blink-free replacement for the file's blend mode (§4).

### 7.3 · Navigation

Forward/back move the track one pitch (§5) per press on the carousel-slide
grammar — `--motion-slide-duration`/`--motion-slide-ease`, no overshoot.
Presses during a slide queue at most one ahead. No auto-advance, no
timers — this carousel only moves by hand. Navigated-in cards arrive
fully painted (§5 priming): no curtain, no frame-in, no skeleton.

*Amended 2026-08-26 (design direction at build review — §9 R19,
superseding R9's clamp):* navigation **loops seamlessly** over three
tail clones of the leading cards (the hero's wrap mechanics). Forward
past the last position slides onto the clone frame — visually identical
to home — and snaps to the true frame without transition; back from the
start snaps to the clone frame first, then slides. The clones carry slot
chrome like real cards, are `aria-hidden`, never focusable, and show no
curtains. Neither button ever disables; under reduced motion the offset
wraps modularly with no clone traversal.

### 7.4 · The hero pause — a page joint, not a section detail

Two carousels must never slide at once (direction 2026-08-26). The
portfolio island owns one `IntersectionObserver` on the section root
(thresholds 0 and 0.2) and dispatches window events — the spec 006
`v2:replay` pattern:

- any intersection → **`v2:portfolio-visible`** — the hero island clears
  its auto-advance timers (its existing `clear()`; a mid-flight slide
  finishes, no new one schedules). This fires before the entrance
  threshold, so the hero is still by the time the curtains move.
- intersection ends → **`v2:portfolio-hidden`** — the hero reschedules at
  one dwell (`--motion-carousel-dwell`), same as its visibility-resume
  path.
- 0.2 visibility, first time only → the §7.1 entrance. *(Amended
  2026-08-26 — §9 R20: the entrance moved to its own observer on the
  gallery window at `--pf-enter` (0.25) visibility; the section-root
  observer keeps threshold 0 and carries only the pause events.)*

This extends the hero carousel's specced behavior (006 §6); 006's body
stays untouched — this spec is the change record, and the hero island
gains only the two listeners.

### 7.5 · Reduced motion

`prefers-reduced-motion: reduce` (or the dev toggle): everything
state-to-state — no entrance (cards born settled in their slot states, no
curtains), navigation snaps the track and the slot morph instantly, the
pause protocol stays wired (it only ever clears timers the hero doesn't
run under reduced motion). A no-JS render shows the settled at-rest state.

## 8 · Deliverable — files, constants, semantics

1. **Images** — the 40 WebP exports (§5), committed verbatim to
   `public/media/portfolio/`; registry entries in `v2/media.ts`.
2. **Section** `design-system/v2/sections/portfolio.tsx` + `portfolio.css`;
   one client island (the gallery: entrance, navigation, active slots, the
   observer/events). Header and button-bar are server-rendered.
3. **New primitive** `grid-button` (+ CSS) under `v2/primitives/`, with
   the five material sizes — never band-aware; the section chooses size
   per band. `/primitives` catalog updated in the same commit.
4. **Ghost chromes** — `teal` and `gray` ink variants of the spec 003
   button-ghost (§6).
5. **Hero island** — the two pause listeners (§7.4). No new island.
6. **Component-layer constants** (`v2/tokens/component.css`, per band only
   where used): `--pf-card-inactive-bg` rgba(234,232,224,0.5) (§9 R11),
   `--pf-inactive-filter`, `--pf-inactive-opacity`, `--pf-frame-dur`,
   `--pf-frame-scale`, `--pf-stagger`, `--pf-curtain-dur`,
   `--pf-curtain-delay`, `--gbtn-hit-extend`, the grid-button inner/glyph
   dimensions (§6), the rs bar gap 4. No new global motion tokens — the
   curtain reveal's constants promote at a second consumer. *(Amended
   2026-08-26 — §9 R20/R22: plus the entrance gate's gallery-visibility
   fractions `--pf-enter` 0.25 and `--pf-enter-rm` 0.18.)*
7. **Semantics.** The section is a labeled region under `<main>`; the
   header is the page's first `<h2>`. Cards are **non-interactive**
   (decision 2026-08-26): list semantics (`<ul><li>`), each image with its
   site-name alt from the registry (§9 R12). The arrows are
   real `<button>`s ("Previous sites" / "Next sites") with `disabled` at
   the bounds; the strip is not a focus trap and emits no clones. The
   button-bar renders real links (§6). The curtain and lattice chrome are
   `aria-hidden`. *Amended 2026-08-26 (§9 R19): with the loop, the
   arrows never disable, and the three wrap clones exist in the DOM but
   are `aria-hidden` with empty alts and never focusable — the
   accessibility tree still carries no clones.*
8. **QA surfaces.** A permanent, noindexed **`/portfolio`** dev page —
   the section beneath the mounted nav at all bands, with a replay
   control and the reduced-motion toggle. The page joins run on
   **`/home-fixture`**: the placeholder is replaced by the real section
   under the hero, and two new placeholders hold the remaining Phase 5
   rows so the footer joint stays testable — engine 21t/13t/9t/9t/8t and
   testimonials 11t/9t/7t/8t/11t (+ the designed 1t clear row above the
   footer at rd2 only), from the anchor frames at writing time; specs
   008/009 replace them.

## 9 · Resolutions record

Draft-day record, 2026-08-26. Fixes were re-read from the nodes after
design shipped them.

- **R1 — button-bar icon mapping: fixed in the file.** "Our work" now
  carries `icons/projects` at every anchor (it wore `icons/case-studies`
  at 384–960 at first read); "Our approach"/`icons/approach` and "Case
  studies"/`icons/case-studies` are consistent. Re-read clean at all five
  bars (the 576 bar was rebuilt as `588:18093`).
- **R2 — label casing: fixed in the file.** Sentence case everywhere
  ("Our work" / "Our approach" / "Case studies"); the 1344 title-case
  instances were normalized.
- **R3 — 384 bar sizes: fixed in the file.** Two ghosts at the material
  sm height 36 (first read: 34 — a hug-height artifact vs the fixed-height
  primitive).
- **R4 — curtain = the loading state** (decision 2026-08-26): the
  portfolio-card set's `state=loading` variants are the designed
  pre-reveal card — loading chrome with the `bg/100` panel. The motion
  directive's guessed `rgb(240,238,230)` panel is superseded (that value
  is `bg/200` — the arrow cell fill, a coincidence). Active/inactive
  loading variants are identical (verified).
- **R5 — arrow states received** (`grid-button` set, 2026-08-26):
  default/hover/focused × both directions × five cell sizes; hover
  inherits the button-arrow pass-through (direction 2026-08-26, §6). The
  in-frame instances predate the set where they disagree (e.g. the 576
  inner reads 26, the set's sm says 28) — **the set wins**.
- **R6 — 44px touch floor**: sourced from `docs/rules/rules.md`
  ("Responsive-Native"), not Figma; the xs control extends its hit area
  (§6).
- **R7 — destinations** (decisions 2026-08-26): "Our work" → `/our-work`
  (the nav's route, spec 005); "Our approach" → `/our-work` too; "Case
  studies" → `/our-work` until its own route ships.
- **R8 — cards non-interactive** (decision 2026-08-26); revisit when the
  Our Work page ships.
- **R9 — bounds behavior** (spec decision at draft): clamp with native
  `disabled`, chrome unchanged — the set designs no disabled state;
  looping was not designed.
- **R10 — the rm second button: fixed in the file** (flagged at draft:
  label "Case studies" over `icons/approach` + teal ink). Design resolved
  it to **"Our approach"**; re-read clean — the rm bar is "Our work"
  (`icons/projects`, brown/600) + "Our approach" (`icons/approach`,
  teal/600), both sm 36. "Case studies" is deliberately dropped at rm.
- **R11 — inactive shell fill is deliberate, its own token** (decision
  2026-08-26; flagged at draft as a near-miss of `bg/300` @ 50%). The
  value is not an alias: it ships as the dedicated component-layer
  constant `--pf-card-inactive-bg: rgba(234, 232, 224, 0.5)` (§8.6). The
  Figma paint stays unbound by design's choice; verified unchanged on
  re-read (default and loading shells identical).
- **R12 — the eight site names received** (content, 2026-08-26), in
  export order 01–08: Palm Coast Zivel · Lune Bodywork · x2o Studio ·
  DreFadez · Your Health Solutions · Miriam Merin, LCSW · House of
  Aesthetics · X2Talent. They ship as the registry alt names (§8.7;
  "Aesthetics" spelling confirmed by content same day).
- **R13 — the field is a rail, not full exposure** (build-day,
  2026-08-26). Per-cell stroke reads through the console bridge showed
  the draft's fully-exposed §2 map does not match the file: the painted
  lattice is the right-side rail carried over from the hero, with a
  filled ornament cell and outlined circles the draft missed. Design
  confirmed the rail as intent; §2 is amended with the per-cell
  transcription and the build renders it. Same failure class as the
  hero's §2 correction — cell presence is not paint.
- **R14 — grid-button cells are unfilled** (build-day, 2026-08-26). The
  set's `bg/200` cell fill is toggled invisible on every variant and on
  every in-frame instance. Decision: invisible in Figma means not
  painted — the cell chrome is the 1px ring only; §6 amended. (R4's
  "arrow cell fill" reading described the fill the set carries, not one
  it paints.)
- **R15 — the rt 9 × 7 and rs 11 × 1 rail gaps are deliberate**
  (design decision, 2026-08-26): built exactly as the file paints them,
  sibling asymmetry included.
- **R17 — the curtain reveals the slot color** (design direction at
  build review, 2026-08-26). §7.1's draft had active-slot cards lift
  onto the loading/desaturated image and morph to color at landing;
  design directed the reveal to show each slot's own treatment —
  active slots lift onto full color. The landing morph now carries
  shell fill, hairline, and radius only. §7.1 amended.
- **R18 — the control pair sits under the card layer** (design
  direction at build review, 2026-08-26): sliding cards pass over the
  buttons. The gallery window paints above the pair but is
  pointer-transparent; cards swallow presses only while covering the
  buttons. §6 amended.
- **R19 — navigation loops** (design direction at build review,
  2026-08-26; supersedes R9's clamp): seamless wrap in both directions
  over three aria-hidden tail clones — forward slides onto the
  visually-identical clone frame and snaps home; back from the start
  snaps to the clone frame, then slides. No disabled states. §6, §7.3,
  and §8.7 amended.
- **R20 — the entrance gates on the gallery window** (design direction
  at build review, 2026-08-26). §7.1's 20% *section* visibility opened
  on the header alone (20% of the section is less than the header block
  at every band — e.g. 202px vs the 224px header at 1344), so curtains
  lifted with the cards barely on screen. The entrance now fires the
  first time 25% of the gallery row is visible (`--pf-enter`, its own
  observer); the section-root observer keeps threshold 0 for the §7.4
  pause events only. §7.1, §7.4, and §8.6 amended.
- **R21 — cards render line-inclusive** (build erratum, flagged by
  design 2026-08-26): the build sized cards at exactly `cw·t`, leaving
  a card's right hairline one pixel left of the rail line it lands on
  (two parallel hairlines with a seam where the file draws one shared
  line — visible against the rail at every band). Cards now size
  `+1px` with the track gap giving the pixel back (`t − 1px`), the v5
  line-inclusive convention; the gallery window clips `+1px` taller so
  bottom hairlines land on their row line. §5 amended; tick geometry
  unchanged.
- **R22 — the base band's entrance gate is 18%** (design direction,
  2026-08-26): portrait devices held the reveal too long at the
  uniform 25% — the rm band now opens at `--pf-enter-rm` 0.18; rs+
  keeps `--pf-enter` 0.25. The island reads the band's value live, so
  the gate follows band switches. §7.1/§8.6 amended.
- **R23 — the rm inset rides the tick** (build erratum, flagged by
  design 2026-08-26): the build transcribed §1's "16 (= t/2)" as a
  fixed 16px, which shifted the whole rm track off the lattice on
  non-anchor widths (≈2px on a 440-wide phone), so card hairlines
  missed their lines. The parenthetical is normative: header, track,
  and bar insets at rm are `t/2` — 16 exactly at the anchor,
  line-landing at every width.
- **R24 — the image clip's anti-aliased edge ghosted past the
  hairline** (build erratum, flagged by design 2026-08-26): at
  fractional-tick widths the thumbnail's rounded clip anti-aliasing
  bled image pixels just outside the light `border/000` ring — a dark
  ghost hugging the stroke. The picture now clips 0.75px inside the
  thumbnail (`clip-path`, radius reduced to match, riding the slot
  morph's timing), tucking the clip edge fully under the ring's paint.
  Verified at 10× magnification against the reproduced artifact.
- **R25 — tier cuts follow the structural gates** (spec 002.r1,
  2026-08-26): under nearest-anchor rendering the rs design renders
  from 470, so the anchor-width `<source>` cuts showed a neighboring
  band's crop across each compressed slice. The cuts moved to
  470/665/860/1130; the 1344 tier serves from 1130, superseding the
  draft's 1152 decision. Density worst cases stay within the accepted
  range.
- **R26 — the designed section-top rule was invisible to the exposure
  read** (build erratum, flagged by design 2026-08-26): the anchor
  frames paint a **top-only 1px `border/000` stroke on the section
  frame itself** — chrome the per-cell stroke sweep (R13) never
  covered, and the fixture placeholder's accidental full-width region
  border had been standing in for it, so the line vanished when the
  real section landed. §2 amended; the build draws it as section
  chrome (`.pf-toprule` — full width, 1px `border/000`, `aria-hidden`,
  under the content layer), sharing pixels with the rail's row-0 tops.
- **R16 — the header wrap is the text box's, not the frame's**
  (build-day, 2026-08-26). §3's block widths are the header frames; the
  designed two-line wrap comes from the narrower text nodes
  (272/336/384/400/560 — tick values 8.5t/7t/6t/5t/5t). Found at build
  QA: at the 1344 anchor the line fits the 784 frame unwrapped. §3
  amended; the build pins the heading's max-width to the text-box
  ticks.
- **Page-total drift explained** (design, 2026-08-26): the 768 and 960
  anchor frames measure 1t shorter than plan.md's 2026-08-22 audit
  (53t/51t vs 54t/52t) because the **portfolio cards were reduced by
  1t** at those anchors — the gallery row went 6t→5t. §1/§5 carry the
  post-resize truth; Phase 6's stack-sum audit uses the then-current
  frames. The gallery control positions recorded in plan.md's "Special
  cells" are likewise superseded (§2).

## 10 · Acceptance criteria

At each of the five anchors and one arbitrary mid-band width per band,
scrollbar forced on:

- [ ] Section height ÷ t equals 19/11/9/9/9 exactly; the three blocks land
      on §1's ticks; the section top sits on the hero's last row; stack sum
      and landmark audit pass on `/home-fixture` with the real section and
      the §8.8 placeholders mounted.
- [ ] The lattice renders §2's amended rail transcription through the
      spec 002 vocabulary (amended 2026-08-26 — was "fully exposed";
      §9 R13); the control pair paints its cell chrome at §2's
      rendered-truth cells (verify against rendered bounds, never
      metadata).
- [ ] Header type walks its lines (24→28, hold across rs, 28→32, 32→42);
      weight/tracking are band constants switching at 1344; values exact at
      band floors and ceilings; two-line wrap at every anchor.
- [ ] Cards render §4's chrome per state and §5's geometry — sizes, 1t
      gaps, insets, visible counts, right bleed; the correct tier is
      fetched per band with the 1344 tier serving from 1152 (network log:
      WebP only, one tier per width); the at-rest visible cards are
      eager-loaded.
- [ ] The inactive treatment matches the rendered Figma inactive variant
      in a side-by-side (tuned filter values recorded as an amendment);
      no blend modes anywhere in the section's CSS.
- [ ] Entrance per §7.1: order, durations, delays, staggers, and eases as
      specced; loading chrome before the curtain, the reveal showing each
      slot's own image treatment with the shell morph on the curtain's
      landing (amended 2026-08-26 — §9 R17); plays exactly once per page
      view; no lift over undecoded pixels; no layout shift
      (transform/opacity only).
- [ ] Navigation per §7.3: one pitch per press on the slide grammar;
      seamless loop in both directions with invisible wrap snaps and no
      disabled states (amended 2026-08-26 — §9 R19); navigated-in cards
      arrive painted; the active-slot morph rides the slide (§7.2); the
      sliding cards pass over the control pair and the buttons stay
      pressable in the gutter (§9 R18).
- [ ] The hero pause per §7.4: hero auto-advance never fires while the
      section intersects the viewport (verify by timestamped slide events
      at the boundary); it resumes one dwell after the section leaves;
      the two carousels are never in motion simultaneously.
- [ ] grid-button renders §6's chrome, states, and sizes; hover runs the
      pass-through on the aliased button-arrow tokens; focus shows the
      two-layer ring; the xs hit area measures ≥44×44.
- [ ] `prefers-reduced-motion: reduce` renders state-to-state per §7.5; a
      no-JS render shows the settled at-rest state.
- [ ] Accessibility: `<h2>` header; list semantics with alt text from the
      registry; arrows are labeled buttons, keyboard-operable, never
      disabled, and the wrap clones are hidden from the tree (amended
      2026-08-26 — §9 R19); the buttons are real links to `/our-work`;
      contrast passes on all three ghost inks.
- [ ] Every value traces to a token or a §8.6 constant; the images are
      committed verbatim; one new client island; the hero island diff is
      the two listeners only; `/portfolio` renders all bands with replay
      and reduced-motion controls; the old site's routes and bundles are
      unchanged in the production build.
