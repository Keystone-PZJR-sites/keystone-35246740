# Spec 003 — Core primitives: buttons, grader input, icons, text

**Status:** Draft — awaiting approval
**Depends on:** spec 001 (tokens, fonts) · spec 002 (weights `--wA`/`--wB`)
**Sources:** fresh MCP reads 2026-08-22/23 of the component sets
`button-fill` (486:5251) · `button-ghost` (90:8297) · `grader-input`
(503:25844, incl. error states) · `button-arrow` (520:15542) · `icons`
(519:5431), all in `ks-MarketingSite`. Design decisions recorded
2026-08-22: ghost focus is derived (below); fill buttons never disable.
2026-08-23: design added grader error states, the button-arrow set
(with disabled and loading), and the expanded icon sheet — all specced
here from fresh reads.

The first components on top of the foundations. Everything here is
**material** (v5 §1): heights, paddings, radii, icon sizes, and type are
fixed px per size variant and never ride the tick. Sections choose a size
variant per band and own each instance's width; a primitive never knows
what band it is in.

---

## 1 · Grid contract

- **Pills and circles sit exactly on ticks** (v5 §6.2): no line-inclusive
  +1px, no border collapse — corners curve away from shared edges.
- **Box-shape fill buttons** are borderless filled boxes: same exact-sizing
  contract.
- **Focus rings paint outside the box** (4px spread) and never participate
  in grid geometry (v5 §6.2).
- Buttons hug their content. The grader input's width is layout-owned
  (sections size it, usually in ticks); its height comes from the size
  variant.
- Instance geometry in anchor frames is verified against **rendered
  bounds**, never metadata x/y (plan.md, "Special cells" §2).

## 2 · button-fill (486:5251)

Variants: size `xl/lg/md/sm` × chrome `teal/gray` × shape `pill/box` ×
state `default/hover/focus`. No disabled state — decision 2026-08-22.

Geometry (px). Pill is one spacing step wider than box per side; xl/lg
carry the optical `pt 10 / pb 12`:

| size | height | pill padding | box padding | label style |
|---|---|---|---|---|
| xl | 48 | 24 · 20 (t 10 b 12) | 20 · 16 (t 10 b 12) | `text/xl/Light` |
| lg | 48 | 20 · 16 (t 10 b 12) | 16 · 12 (t 10 b 12) | `text/lg/Light` |
| md | 40 | 16 · 12 (y 8) | 12 · 8 (y 8) | `text/md/Light` |
| sm | 36 | 12 · 10 (y 6) | 10 · 8 (y 6) | `text/sm/Light` |

Pill radius `--radius-full`; box radius 0. Trailing 10px nav-trigger
glyph (committed asset, see §5). Chrome:

| chrome | bg | hover bg | focus ring | label ink |
|---|---|---|---|---|
| teal | `teal-300` | `teal-400` | `teal-500` | `teal-800` |
| gray | `bg-300` | `bg-400` | `border-200` | `text-200` |

Focus = the default look plus a 4px ring (`box-shadow: 0 0 0 4px`),
mapped to `:focus-visible`.

## 3 · button-ghost (90:8297)

Variants: size `xl/lg/md/sm/xs` × color `brown/teal/gray` × state
`default/hover` (+ `disabled`, gray only). Transparent pill,
`--radius-full`, leading icon slot.

| size | height | padding | gap | icon | label style |
|---|---|---|---|---|---|
| xl | 48 | 20 (y 12) | 8 | 20 | `text/xl/Light` |
| lg | 48 | 16 (y 12) | 8 | 20 | `text/lg/Light` |
| md | 40 | 12 (y 8) | 8 | 18 | `text/md/Light` |
| sm | 36 | 12 (y 8) | 8 | 16 | `text/sm/Light` |
| xs | 32 | 12 (y 8) | 6 | 14 | `text/xs/Light` |

| color | label + icon ink | hover bg |
|---|---|---|
| brown | `brown-600` | `brown-200` |
| teal | `teal-600` | `teal-200` |
| gray | `text-200` | `bg-300` |

Disabled (gray only): ink `text-500`, no hover, not focusable.

**Derived focus** (decision 2026-08-22 — the set has no focus variants):
the fill button's ring construction at the color's 200 tint —
`brown-200` / `teal-200` / `bg-200` — on `:focus-visible`.

The icon slot is swappable; the set's default instance is
`icons/case-studies`. Icons tint with the label (`currentColor`).

## 4 · button-arrow (520:15542)

The circular submit button, a primitive of its own (the grader input
embeds it). Variants: size `lg/md/sm` × chrome `teal/gray` × state
`default/hover/disabled/loading`. Filled circle, `--radius-full`;
loading swaps the arrow for the spinner glyph (committed asset).

| size | circle | glyph |
|---|---|---|
| lg | 40 | 24 |
| md | 32 | 18 |
| sm | 28 | 16 |

| chrome | disabled | default | hover | loading |
|---|---|---|---|---|
| teal | `teal-250` | `teal-400` | `teal-500` | `teal-300` |
| gray | `bg-200` | `bg-300` | `bg-500` | `bg-300` |

## 5 · grader-input (503:25844)

Variants: size `lg/md/sm` × state
`default/hover/focus/active/filled/error`. White pill (`bg-000`, 1px
border, `--radius-full`) · 20px sparkle icon · placeholder text ·
embedded button-arrow (§4). A 4px ring is **always present** and
recolors per state. Pill heights are 66 / 50 / 44; the error variant
adds a message row below (gap 8, message inset 16), totalling
92 / 76 / 70.

| size | padding | gap | text style | button-arrow |
|---|---|---|---|---|
| lg | 16 · 12 (y 12) | 16 | `text/xl/Light` | lg |
| md | 12 · 8 (y 8) | 16 | `text/md/Light` | md |
| sm | 12 · 8 (y 8) | 16 | `text/md/Light` | sm |

| state | border | ring | text ink | sparkle | arrow (chrome·state) |
|---|---|---|---|---|---|
| default | `border-000` | `bg-200` | `text-500` | teal | teal · disabled |
| hover | `teal-250` | `teal-200` | `text-400` | teal | teal · disabled |
| focus | `teal-400` | `teal-300` | `text-400` | teal | teal · disabled |
| active | `teal-300` | `teal-200` | `text-200` | teal | teal · disabled |
| filled | `teal-300` | `teal-200` | `text-200` | teal | teal · default |
| error | `red-400` | `red-300` | `text-200` | red | gray · default |

Error message: `text/sm/Light` in `red-500`, linked to the field with
`aria-describedby`; the field carries `aria-invalid`. The arrow-to-state
mapping above is the set's embedded truth (read from variant instances
2026-08-23): the arrow is disabled until the value is non-empty, teal
when submittable, gray while the field is in error; hover/loading on the
arrow itself come from §4 (loading = submission in flight).

Semantics: a real form — labeled `input` plus submit button; states map
to CSS/attribute state (`:hover`, `:focus-visible` on the field wrapper,
`:focus-within` for active-while-typing, a filled class/attribute when
the value is non-empty, an error class/attribute set by the consumer).
*When* error and loading trigger (validation rules, submission flow) is
section behavior and stays out of this spec.

## 6 · Icons (519:5431)

The sticker sheet (re-read 2026-08-23 after expansion):

- Four 20-grid outline icons: `projects` · `approach` · `case-studies` ·
  `chat`.
- `icons/sparkle` — a color set: `teal` and `red` (the grader's error
  sparkle).
- `IconArrowRight` / `IconArrowLeft` — 24-grid arrows (the button-arrow
  glyph and the carousel decor arrows).
- `_nav-trigger-icon` — 10-grid set: `chevron` / `arrow` / `hover` (the
  fill button's trailing glyph and nav affordances).
- `_nav-menu-mobile` — 32-grid set: `default` / `open` (committed with
  the sheet; its consumer is the Phase 4 nav).

All exported from Figma and committed (never hand-authored); the only
permitted edit is normalizing paint attributes to `currentColor` where an
icon tints with text — geometry is never touched. The loading-circle
glyph ships inside button-arrow the same way. All decorative icons are
hidden from the accessibility tree; the owning control carries the name.

## 7 · Text primitives

Two primitives, no design values in this spec (per-band value pairs are
section data and arrive with section specs):

1. **Token text** — applies one Figma text style from the type tokens:
   `font` shorthand + letter-spacing + pinned optical size
   (`font-optical-sizing: none` + `font-variation-settings: "opsz"`).
2. **Interpolating text** — same, but size and line-height ride the
   band weights (v5 §2): the consumer supplies per-band floor/ceiling
   pairs as custom properties (`--fs0/--fs1/--lh0/--lh1`, restated per
   band) and the primitive resolves
   `calc(var(--wA) * var(--fs0) + var(--wB) * var(--fs1))`. At an anchor
   the designed value renders exactly; between anchors it walks the line.

## 8 · Deliverable

The primitives as server components + CSS under `design-system/v2/`
(component-scoped constants — including the set's two non-token 10px
paddings — live in the component token layer). A permanent, noindexed
**`/primitives` dev page** renders the full variant × state matrix of all
four components, the icon sheet, and the token catalog — the visual-QA
surface spec 001's last criterion calls for, and where type rendering
(including the pinned M/L optical masters) is eyeballed against Figma.

## 9 · Acceptance criteria

- [ ] Every variant × state in the four sets renders pixel-identical to
      its Figma component (spot-check the matrix against node screenshots;
      geometry, inks, rings, radii, type).
- [ ] Every color, spacing, radius, and type value traces to a token; the
      set's non-token constants exist only in the component token layer.
- [ ] Keyboard: fill and ghost show their rings on `:focus-visible` only;
      disabled ghost is skipped and announced disabled; the grader field
      and submit are reachable and labeled.
- [ ] Grader error state: `aria-invalid` on the field, message linked via
      `aria-describedby` and announced; the arrow's disabled state is not
      focusable-actionable; loading is conveyed to assistive tech.
- [ ] Hover styles apply only on hover-capable devices.
- [ ] Icons render from committed assets, tint via `currentColor`, and are
      absent from the accessibility tree.
- [ ] The interpolating text primitive renders its floor/ceiling values
      exactly at band-floor/band-ceiling anchors and is continuous across
      switches (probe check on the harness or /primitives).
- [ ] All primitives are server components; zero hydration mismatches; the
      old site's bundles are unchanged.
- [ ] `/primitives` displays the full matrix plus the token catalog
      (closes spec 001's remaining catalog criterion).
