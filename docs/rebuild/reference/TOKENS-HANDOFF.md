# keystone design tokens — handoff

Variables, styles, and semantic layers extracted from Figma `ks-MarketingSite`
(IBO39siJYDhiCRtuLWUTW2) via figma-console on **2026-08-22**. Written for an agent
implementing the token layer in the production codebase.

**Figma is the live source of truth — re-extract before building** (§9 has the snippets).
Companion: `GRID-HANDOFF-v3.md` (layout), `type-reduction.md` (type-per-anchor).

---

## 0 · Architecture at a glance

Four local collections in the marketing file + one library collection supplying color semantics:

```
00 primitives   (local, 1 mode)        raw hex + spacing px scale          ← everything aliases here
01 typography   (local, 1 mode)        families + weight names only (sizes live in text styles)
02 spacing      (local, 1 mode)        spacing-none … spacing-12xl  → 00 primitives
03 radii        (local, 1 mode)        radius-none … radius-full    → 00 primitives
1. color modes  (library ks-v0 DesignSystem, modes: light | dark)
                                       bg/ text/ border/ alpha/ success/ warning/ danger/  → primitives
Text styles     (local, 134)           display-serif/ display-sans/ text/  — bind fontFamily to 01 typography
Effect styles   (local, 4)             noise, hard-shadow-*
```

Naming conventions in the file:
- Primitives use `group/name` (`color/teal/400`, `spacing/4 (16px)`).
- Semantic/alias tokens use `kebab` (`spacing-xl`, `radius-md`) or `role/step` (`bg/200`, `text/100`).
- Type styles use `voice/size/Weight` (`display-serif/md/Light`, `text/sm/Regular`).
- Color semantic steps go **000 → 600**, low = closest to page background, high = strongest contrast.

Suggested CSS mapping: `--color-bg-200`, `--color-text-100`, `--space-xl`, `--radius-md`,
`--font-serif`, `--text-md-size` / `--text-md-lh`. Keep the Figma names recoverable 1:1.

---

## 1 · Color primitives (`00 primitives`, single mode)

### Neutrals — warm grays (the brand's paper/ink axis)

| step | lightgray | darkgray |
|---|---|---|
| 050 | `#fcfbf8` | `#8e897b` |
| 100 | `#f8f7f2` | `#847f71` |
| 200 | `#f0eee6` | `#6c6860` |
| 300 | `#e9e7dd` | `#5d5a56` |
| 400 | `#e0ddd1` | `#4f4d4a` |
| 500 | `#d6d2c2` | `#444240` |
| 600 | `#cbc5b4` | `#3a3836` |
| 700 | `#beb8a7` | `#2f2e2d` |
| 800 | `#b1aa9a` | `#242323` |
| 900 | `#a49d8e` | `#1d1c1c` |
| 950 | `#989281` | `#141313` |

`color/base/white #ffffff` · `color/base/black #000000`

### Hues (100 → 800, light → dark)

| hue | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 |
|---|---|---|---|---|---|---|---|---|
| orange | `#fff5ec` | `#ffebd9` | `#ffbb8a` | `#f57e56` | `#cf5330` | `#a03722` | `#6e271d` | `#3c1618` |
| red | `#fff1ec` | `#ffe8e0` | `#ffb2a3` | `#f55c47` | `#cb452f` | `#9f3722` | `#792b20` | `#3c1618` |
| yellow | `#fdf5e3` | `#fceac6` | `#f7ca6f` | `#f5b83d` | `#dc9c19` | `#9f7318` | `#70531a` | `#3a2a0e` |
| green | `#eefdec` | `#dcfbd9` | `#a7f0b4` | `#66cc86` | `#46a56d` | `#267d54` | `#16573d` | `#063126` |
| teal | `#e9f6f3` | `#d2ede6` | `#8cd4c9` | `#5bc3b3` | `#4aac9d` | `#318175` | `#236058` | `#0d2a28` |
| blue | `#edf8ff` | `#dbf1ff` | `#a3ceff` | `#3393ff` | `#307be8` | `#2566d0` | `#24509e` | `#0f223d` |
| purple | `#f8f3ff` | `#f0e8ff` | `#d8c2ff` | `#9c69ea` | `#8552c9` | `#6e3ca7` | `#4f2573` | `#2f0d3f` |
| pink | `#fceef2` | `#f9dce4` | `#feaac8` | `#f38bb0` | `#da749b` | `#bd527e` | `#783551` | `#3d1324` |
| brown | `#f6f1ee` | `#e5d7cc` | `#cbaf9a` | `#ad8261` | `#946b4d` | `#72523b` | `#513b2a` | `#2f2218` |

Extra: `color/teal/250 #aadfd7` (added locally; the only half-step in the hue ramps).
Note `orange/800` and `red/800` are the same hex (`#3c1618`).

---

## 2 · Color semantics (`1. color modes`, library, modes **light / dark**)

All are aliases into the primitives; the dark mode mirrors the ramp.

### bg / text / border

| token | light → | dark → | role |
|---|---|---|---|
| `bg/000` | base/white | base/black | page / card surface |
| `bg/050` | lightgray/050 | darkgray/950 | |
| `bg/100` | lightgray/100 | darkgray/900 | default page bg (site uses this) |
| `bg/200` | lightgray/200 | darkgray/800 | raised / card bg (most-used on site) |
| `bg/300` | lightgray/300 | darkgray/700 | |
| `bg/400` | lightgray/400 | darkgray/600 | |
| `bg/500` | lightgray/500 | darkgray/500 | |
| `bg/600` | lightgray/600 | darkgray/400 | |
| `text/000` | darkgray/800 | lightgray/100 | strongest ink |
| `text/050` | darkgray/700 | lightgray/300 | |
| `text/100` | darkgray/600 | lightgray/500 | headings / primary |
| `text/200` | darkgray/400 | lightgray/700 | body |
| `text/300` | darkgray/300 | lightgray/900 | body (site's most-used text color) |
| `text/400` | darkgray/100 | darkgray/050 | secondary |
| `text/500` | lightgray/950 | darkgray/200 | tertiary / placeholder |
| `text/600` | lightgray/800 | darkgray/300 | disabled |
| `border/000` | lightgray/300 | darkgray/600 | hairline (site's grid lines — 3,448 uses) |
| `border/050` | lightgray/400 | darkgray/500 | |
| `border/100` | lightgray/500 | darkgray/400 | |
| `border/200` | lightgray/600 | darkgray/300 | |
| `border/300` | lightgray/700 | darkgray/200 | |
| `border/400` | lightgray/950 | darkgray/050 | |
| `border/500` | darkgray/200 | lightgray/700 | strongest |

### status (000 → 500)

| token | light | dark |
|---|---|---|
| `success/000…500` | green 100, 200, 300, 400, 500, 700 | green 800, 700, 600, 500, 400, 300 |
| `warning/000…500` | yellow 100, 200, 300, 400, 500, 700 | yellow 800, 700, 600, 500, 400, 300 |
| `danger/000…500` | red 100, 200, 300, 400, 500, 700 | red 800, 600, 500, 400, 300, 200 |

### alpha

`alpha/black-{00,05,10,20,30,40,50,60,70,80,90,100}` — light: black at that opacity; **dark: white** at that opacity.
`alpha/white-{…}` — the inverse. (i.e. "black" means "ink-colored", "white" means "paper-colored".)

Library also contains `nav/*` and `badge/*` tokens — product-app only, not used on the marketing site.

---

## 3 · Typography

### 3.1 Variables (`01 typography`)

| group | token | value |
|---|---|---|
| font family | `font-family-serif` | PP Kyoto |
| | `font-family-sans` | GT Standard Standard VF |
| font weight | extralight · light · regular · medium · semibold · bold (+ `-italic`) | string names |

`01 typography` holds only families and weight names — the font-size / line-height variables were deleted 2026-08-22 (they were unbound and disagreed with the styles). **Sizes and line-heights live in the text styles (3.2–3.3).**

### 3.2 Display ramp — shared sizes, two voices

`display-serif` = PP Kyoto · `display-sans` = GT Standard. Whole-step sizes xs→4xl match; serif adds `+` half-steps sans lacks, and 2xs differs (see 3.4).
GT Standard VF instance names carry an optical-size master prefix: **`L`** (`L Light`…) for `text/lg` and up, **`M`** (`M Light`…) for `text/md` and below. Map both to the same CSS weight; set `font-optical-sizing`/`opsz` per size.

| size | px/lh | serif weights | serif tracking | sans weights | sans tracking |
|---|---|---|---|---|---|
| 4xl+ | 96/72 | — | | Semibold | +1% |
| 4xl | 88/90 | Extralight Light Regular Medium | −2% | Light Regular Medium Semibold | −1% |
| 3xl | 72/78 (Thin 72/80) | Thin Extralight Light Regular Medium | Thin −3%, else −2% | L R M SB | −1% |
| 2xl | 64/72 | Thin Extralight Light Regular Medium | −2% | L R M SB | −1% |
| xl+ | 60/68 | Thin | −3% | — | |
| xl | 56/64 (Extralight 56/62) | Thin Extralight Light Regular Medium | −2% | L R M SB | −1% |
| lg+ | 50/60 | Thin ExtraLight Light | −2% | — | |
| lg | 48/56 | Thin Extralight Light Regular Medium | Thin −3%, else −2% | L R M SB | −1% |
| md+ | 42/50 (Light 42/52) | Thin Extra Light Light | Thin −3%, else −2% | — | |
| md | 40/48 (Extralight 40/46) | Thin Extralight Light Regular Medium | −2% | L R M SB | −1% |
| sm+ | 36/42 | Thin Extralight Light Regular Medium | Thin −3%, else −2% | L R M SB | −1% |
| sm | 32/38 | Extralight Light Regular Medium | −2% | L R M SB | −1% |
| xs+ | 28/34 | ExtraLight Light | −2% | — | |
| xs | 24/30 | Extralight Light Regular Medium | EL/L −2%, R/M −1% | — | |
| 2xs+ | 20/24 | Light | −2% | — | |
| 2xs | 18/24 | Extralight Light Regular Medium | 0% | (sans 2xs = 28/36 L R — different size!) | −1% |
| 3xs | 16/20 | Extralight Light Regular Medium | 0% | — | |
| 4xs+ | 14/18 | Light (−2%), Medium (0%) | | — | |
| 4xs | 12/16 | Extralight Light Regular Medium | −2% | — | |

`+` sizes are half-steps inserted for the responsive anchors (see `type-reduction.md`).

### 3.3 Text ramp — GT Standard, tracking −1% (2xs −2%, 3xs −5%)

| token | px/lh | weights | notes |
|---|---|---|---|
| text/2xl | 24/32 | L R M SB | |
| text/xl | 20/26 | L R M SB | |
| text/lg | 18/26 | L R M SB | Light has paragraph-spacing 12 (literal) |
| text/md | 16/22 | L R M SB | Light has paragraph-spacing 12 |
| text/sm | 14/18 | L R M SB | |
| text/xs | 12/16 | L R M SB | Light has paragraph-spacing 8 |
| text/2xs | 10/12 | L R M SB | |
| text/3xs | 8/10 | L R M SB | |
| text/nav-label | 10/16 Medium, +2%, UPPERCASE | | the only transformed style |

Convention observed on site: **Light** weight for reading copy, **Regular** for UI/nav/links, **Medium** for CTAs/labels.

### 3.4 Type-system status (re-verified 2026-08-22)

Resolved: `text/sm/Light` instance name (now `M Light`, 300) · md tier lh 22 · lg tier lh 26 · `Extralight` spelling · orphaned size/lh variables deleted · 768 hero/footer inconsistencies.

Still by design (not defects, but the agent must know):
1. `display-serif` and `display-sans` are NOT a shared ramp. Sans has no half-steps (only `4xl+`); serif has `xl+ lg+ md+ sm+ xs+ 2xs+ 4xs+`. They also differ at `2xs` (serif 18/24, sans 28/36). Treat as two ramps that share whole-step sizes xs→4xl.
2. `display-sans/4xl+/Semibold` 96/72 (lh < size) — intentional.

---

## 4 · Spacing

### 4.1 Primitive scale (`00 primitives / spacing`) — 4px base, Tailwind-style index

`0 (0) · 0.5 (2) · 1 (4) · 1.5 (6) · 2 (8) · 2.5 (10) · 3 (12) · 4 (16) · 5 (20) · 6 (24) · 8 (32) · 10 (40) · 12 (48) · 16 (64) · 18 (72) · 20 (80) · 24 (96) · 32 (128) · 40 (160) · 48 (192) · 56 (224) · 64 (256) · 80 (320) · 96 (384) · 120 (480) · 140 (560) · 160 (640) · 180 (720) · 192 (768) · 256 (1024) · 320 (1280) · 360 (1440) · 400 (1600) · 480 (1920)`

Upper values are layout widths/breakpoints (768, 1024, 1280, 1440, 1600, 1920), not gaps.

### 4.2 Semantic (`02 spacing`, scopes: gap, width/height)

| token | px | → primitive | site usage |
|---|---|---|---|
| `spacing-none` | 0 | spacing/0 | heavy (grid-flush sections) |
| `spacing-2xs` | 2 | spacing/0.5 | |
| `spacing-xs` | 4 | spacing/1 | |
| `spacing-sm` | 6 | spacing/1.5 | |
| `spacing-md` | 8 | spacing/2 | |
| `spacing-lg` | 12 | spacing/3 | |
| `spacing-xl` | 16 | spacing/4 | = 1 grid cell; most common padding |
| `spacing-2xl` | 20 | spacing/5 | |
| `spacing-3xl` | 24 | spacing/6 | |
| `spacing-4xl` | 32 | spacing/8 | |
| `spacing-5xl` | 40 | spacing/10 | |
| `spacing-6xl` | 48 | spacing/12 | |
| `spacing-7xl` | 64 | spacing/16 | = 1 tick @768 |
| `spacing-8xl` | 72 | spacing/18 | |
| `spacing-9xl` | 80 | spacing/20 | |
| `spacing-10xl` | 96 | spacing/24 | |
| `spacing-11xl` | 128 | spacing/32 | |
| `spacing-12xl` | 160 | spacing/40 | |

Relationship to the grid (GRID-HANDOFF): the 16px **cell** is `spacing-xl`; the fluid **tick** is not a token (it's `100cqw/12`). Don't tokenize tick.

---

## 5 · Radii (`03 radii`, scope: corner radius)

| token | px | → primitive |
|---|---|---|
| `radius-none` | 0 | spacing/0 |
| `radius-2xs` | 2 | spacing/0.5 |
| `radius-xs` | 4 | spacing/1 |
| `radius-sm` | 6 | spacing/1.5 |
| `radius-md` | 8 | spacing/2 |
| `radius-lg` | 10 | spacing/2.5 |
| `radius-xl` | 12 | spacing/3 |
| `radius-2xl` | 16 | spacing/4 |
| `radius-3xl` | 20 | spacing/5 |
| `radius-4xl` | 24 | spacing/6 |
| `radius-full` | 9999 | literal |

Site usage is bimodal: `radius-none` (most things, grid-aligned) and `radius-full` (pills, avatars, buttons). `xs`, `md`, `xl`, `2xl` appear a handful of times.

---

## 6 · Effects (local effect styles)

| style | spec |
|---|---|
| `noise` | noise effect, `#000000` @ 6% |
| `hard-shadow-round` | drop shadow, blur 0, offset 3/4, `#32261b` @ 20% |
| `hard-shadow-square` | drop shadow, blur 0, offset 4/4, `#32261b` @ 15% |
| `hard-shadow-square-md` | drop shadow, blur 0, offset 3/3, `#32261b` @ 15% |

Shadow ink `#32261b` is not a token — it's a warm near-black. Consider aliasing to `alpha/black-*` on `darkgray/800` or keep as a literal `--shadow-ink`.

Layout grid style: `16px` square grid (red 10%) — authoring aid only.

---

## 7 · What the marketing frames actually consume (768 anchors, 2026-08-22)

Ranked by bound-property count across Home / Solutions / Our Work / Case Study:

**Color** — `border/000` (hairlines, 3.4k), `bg/200`, `text/300`, `text/200`, `text/400`, `text/100`, `text/500`, `bg/100`, `bg/000`, `bg/300`, `bg/400`, `bg/500`, `bg/600`, `border/050`, `alpha/black-05`, `alpha/black-10`; raw primitives for brand accents and the logo collage: teal 200–800 (+250), orange 100–800, yellow 200–800, purple/blue/pink/brown 300–700, lightgray 200–400, base/white.
**Spacing** — `spacing-none`, `-xl`, `-lg`, `-2xl`, `-md`, `-3xl`, `-4xl`, `-5xl`, `-6xl`, `-7xl`, `-10xl`, `-11xl`, `-xs`, `-sm`, `-2xs`.
**Radii** — `radius-none`, `radius-full`; `-xs`, `-md`, `-xl`, `-2xl`, `-2xs` rarely.
**Type** — `font-family-sans` (271 binds), `font-family-serif` (43).

⚠ Duplicate token sources in use: some nodes bind the **local** `02 spacing`/`03 radii`/`00 primitives` and others the **library** `3. spacing`/`6. radii`/`0. primitives` (identical values). Normalize to one source in code — values match today but can drift.

---

## 8 · Implementation notes for the agent

- Emit three CSS layers mirroring Figma: `primitives` → `semantic` (with `[data-theme=dark]` / `prefers-color-scheme` remapping bg/text/border/alpha/status) → `component`.
- Semantic color tokens are **aliases**, so the dark theme is a re-pointing of the same names, not a second palette. Implement as one `:root` block of primitives plus two mode blocks that only reassign semantic names.
- Type: ship `display-serif`, `display-sans`, `text` as size/lh pairs per the text-style tables (§3.2/3.3), **not** the typography variables. Weights: map `M Light → 300`, `M Regular → 400`, `M Medium → 500`, `M Semibold → 600`; PP Kyoto `Thin → 100`, `Extralight → 200`, `Light → 300`, `Regular → 400`, `Medium → 500`.
- Tracking is percent-of-em in Figma → `letter-spacing: -0.02em` etc.
- §3.4 has no open defects; note the sans/serif ramp divergence when building the scale.

---

## 9 · Re-extraction (figma-console MCP)

```js
// collections + variables with alias resolution
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const vars = await figma.variables.getLocalVariablesAsync();
// library semantics
const libs = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
const cm = libs.find(l => l.name === '1. color modes');
const lv = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(cm.key);
// importVariableByKeyAsync(v.key) each, then read valuesByMode per collection mode
// text styles
const ts = await figma.getLocalTextStylesAsync();   // fontName, fontSize, lineHeight, letterSpacing, boundVariables
```

Library keys: `1. color modes` b7496de9…, `0. primitives` f72532aa…, `2. typography` c5bd3e8d…, `3. spacing` 606bcb81…, `6. radii` 8823a2b1… (all in `ks-v0 DesignSystem`).
