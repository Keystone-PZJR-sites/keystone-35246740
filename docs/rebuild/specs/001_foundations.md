# Spec 001 — Foundations: tokens, fonts, brand marks

**Status:** Approved 2026-08-22 — in progress
**Depends on:** `docs/rebuild/plan.md`
**Sources:** `docs/rebuild/reference/TOKENS-HANDOFF.md` · Figma variables API
(re-extract before building) · font binaries · logo SVGs

The ground layer everything else stands on. No layout, no components, no
pages. When this spec is done the repo can express every color, type style,
spacing step, radius, and brand mark the new site uses — and nothing else can
define them anywhere else.

---

## 1 · Tokens

Implement the token architecture of TOKENS-HANDOFF.md as CSS custom
properties, in three layers mirroring Figma:

1. **Primitives** — raw hex ramps (warm grays, hues, base), spacing px scale,
   radii. One `:root` block.
2. **Semantic** — `bg/*`, `text/*`, `border/*`, `alpha/*`, status ramps as
   aliases into primitives. **Light mode only** (decision log): the dark
   values are not wired. Naming keeps the Figma names recoverable 1:1
   (`--color-bg-200`, `--color-border-000`, `--space-xl`, `--radius-md`).
3. **Component** — starts empty; populated by later specs.

Rules carried from the handoff:

- Values are **re-extracted from the Figma variables API at build time**
  (handoff §9), not copied from the handoff tables — Figma is live truth.
- The Figma file currently binds a mix of local and library token sources with
  identical values (handoff §7 warning); the code normalizes to **one** set of
  names.
- The 16px cell is `spacing-xl`. The tick is **not** a token — it is derived
  geometry (`100cqw / 12`, spec 002).
- Effect styles (`noise`, `hard-shadow-*`) become named tokens; the shadow ink
  `#32261b` is carried as a literal `--shadow-ink` token.

## 2 · Fonts

Two licensed variable fonts, self-hosted under `public/media/fonts/`, loaded
via `@font-face`. Facts below were read from the actual binaries (fvar table,
2026-08-22) and are the implementation contract:

**GT Standard Standard VF** (`GT-Standard-Standard-VF.woff2`)

- Axes: `wght` 300–900 (**default 900** — the `@font-face` must declare
  `font-weight: 300 900` and every style must set an explicit weight, or text
  renders Black), `opsz` 10–30 (default 10), `slnt` 0–6 (unused; uprights
  only).
- The font is a VF: CSS sets `font-weight` and `opsz` independently.
  Figma's L/M/S named instances are presets that pin both axes at once;
  we do not call them. Implement with `font-optical-sizing: none` plus
  `font-variation-settings: 'opsz' <value>` per type-scale step:
  **text** 3xs / 2xs / xs / nav-label = **24**; sm–2xl = **26**.
  **display-sans** 2xs = **28**; xs and up = **30**.
- Weight mapping: Light 300 · Regular 400 · Medium 500 · Semibold 600.

**PP Kyoto Variable Upright** (`PPKyoto-VariableUprightVF.woff2`)

- Axes: `wght` 100–900 (default 100), `ital` locked at 100 (family quirk; no
  action). Family name in the binary reads "PP Kyoto Thin" — the `@font-face`
  declares the clean name `PP Kyoto`.
- Weight mapping: Thin 100 · Extralight 200 · Light 300 · Regular 400 ·
  Medium 500.

Type styles (`display-serif/*`, `display-sans/*`, `text/*`) ship as size/
line-height/tracking/weight sets read from the Figma **text styles** (handoff
§3.2–3.3), not from the typography variables. Tracking is percent-of-em →
`em` letter-spacing. Note the two display ramps are deliberately not shared
(§3.4): serif carries `+` half-steps, sans does not, and they diverge at 2xs.

Font files are licensed: never CDN-imported, never committed to a public
mirror. System-font fallbacks are acceptable in development only.

## 3 · Brand marks

Three SVGs from brand-id 2.0: `ksLockup`, `ksLogomark`, `ksWordmark`. They
land in `public/media/brand/` (kebab-case names) and are registered in the
media registry. Verify each is a flattened export (no Exclude/Boolean-subtract
paths) before committing; request re-exports if not.

## 4 · Acceptance criteria

- [x] Every color, spacing, radius, and effect value in the token layer traces
      to a Figma variable or style re-extracted at build time; a diff of the
      extraction against the committed tokens is empty. (Extracted and built
      2026-08-22; type styles regenerate byte-identical from the snapshot.)
- [x] No hex, px-spacing, or radius literal exists outside the token files.
- [ ] Both fonts load from `public/media/fonts/`; GT Standard renders at
      weights 300–600 with the correct optical size per type step (spot-check
      a `text/md` and a `text/xl` sample against Figma); Kyoto renders at
      weights 100–500. (Both fonts load and every weight renders on the
      /primitives specimens, 2026-08-23; opsz is pinned per type-scale
      step, not Figma L/M/S instances. Open: visual spot-check on
      /primitives against the intended 24/26/28/30 pins.)
- [x] With fonts blocked, fallbacks render without layout explosion
      (`font-display` chosen deliberately and documented in the font CSS).
      (Verified 2026-08-23 with woff2 requests blocked: system fallbacks
      render, all fixed material heights hold.)
- [x] The three brand marks render from the media registry; no SHA-named or
      duplicate assets. (Rendered on /primitives from `MEDIA_V2`,
      2026-08-23.)
- [x] A `/styles`-style catalog page (or the grid harness of spec 002) can
      display the full token set for visual QA. (The /primitives page of
      spec 003 renders the full token catalog from the committed token
      files.)
