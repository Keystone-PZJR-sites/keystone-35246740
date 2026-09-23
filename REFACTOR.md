# Refactor plan — `refactor/simplify`

Goal: same look, behaviour, and motion; far simpler under the hood. Every
commit builds, passes `tsc` + `lint`, and leaves the site working. A marketing
teammate with an agent should be able to add a page that is beautiful and
conformant by default.

Fluid-over-stepped and grid-maintainability improvements are welcome even when
the end result differs slightly from today, if it is better.

## Phases

- [x] **1. Platform & deps** — Turbopack (drop `--webpack`), dev grid panel gated
  by `NODE_ENV` (no webpack alias), declare `@keystone-sites/services`,
  `.nvmrc` + `engines`, `.env.example`, preview CI runs `tsc`/`lint` with full
  env. Tailwind stays (widgets need it). *Blocked:* `proxy.ts` — OpenNext
  cannot bundle a Node-runtime proxy while `@opentelemetry/api` is installed
  (pulled in by `@keystone-sites/services`); revisit on the next OpenNext release.
- [x] **2. AGENTS.md** — one file, ~70 lines: Never list, how the site is built,
  adding a page, verification, git. Deleted `.cursor/rules/*`, `.agents/`,
  `.claude/`, `skills-lock.json`. README rewritten and accurate.
- [ ] **3. CSS / tokens / type** — `@layer` cascade; `component.css` dissolved
  into semantic tokens + per-file `--_locals`; one fluid type class per step
  (`clamp()`, `rem`) replacing 142 hand-copied blocks and the `--wA/--wB`
  weight ladder; accent token family for chips; kill dead tokens; one class
  naming scheme; no DOM band duplicates (`.rm/.rs/…` toggles); no magic px.
- [ ] **4. DRY the islands** — `useSwipe`, `useAutoplayGate`, `useActiveSection`,
  `useModal` (native `<dialog>` + `inert`), `cssVars()`, `useSyncExternalStore`
  for `matchMedia`; discriminated unions where `!` lives; `useActionState` +
  server action for the contact form; zod at every boundary.
- [ ] **5. Tests & tooling** — one Playwright visual gate (routes × anchors
  and gates) replaces the bespoke Puppeteer runner and dev panel; Prettier;
  stricter tsconfig; one PR `check` workflow.
- [ ] **6. Site hygiene** — `sitemap.ts`, `robots.ts`, `not-found.tsx`,
  `error.tsx`, per-route metadata, security headers, `next/image` for CMS
  imagery, sandboxed gallery iframe.

## Log

- P1 `chore: build with Turbopack and gate the dev grid panel on NODE_ENV` — also
  services dep, `.nvmrc`/`engines`, `.env.example`, preview CI gates + env.
- P2 `docs: replace the rules tree with one AGENTS.md` — 600+ lines of rules and
  third-party skills → 70 lines; README matches the actual routes.
- P3 `refactor(css): declare the cascade with @layer` — import order no longer
  decides; `theme` (Tailwind) first so widgets cannot win shared vars.
- P3 `refactor(css): one type mechanism` … `footer tagline … onto .type` (4
  commits) — every typeset element is `.type`; a step is `--font/--ls/--opsz`
  (+ `--fs0/--lh0` when it rides the grid, `--fs-px` for a pinned band,
  `type-fixed` for chrome). Tokens gain unitless `-fs/-lh`. Removed the
  `InterpText` inline-style path, ~60 token-alias hacks, the `--_font`,
  `--_f`, `--csc-*-f`, `--pc-*-f`, `--fq-*` local copies.
- P5 (pulled forward) `chore: delete the grid self-test harness` — `app/grid/*`
  (dev panel, expectations, fixtures), `scripts/grid-selftest.mjs`, the
  `gridCheck` prop threaded through every page, the `?_grid=` fixture param.
  Regression gate is now the visual snapshot diff (see Verify).
- P3 `refactor(css): dissolve component.css; size controls per band with one
  DOM node` — the 406 designed constants move to the top of the file that
  uses them (27 shared ones to `semantic.css`); `--z-base` was dead. Buttons
  read their size from `--btn-size` (`data-size` sets it; `size="inherit"`
  inherits it), so hero, work header, FAQ, pricing offer, pricing scale, and
  case carousel render one CTA row instead of one hidden copy per band
  (−17 duplicated button rows, −70 CSS gate rules).
- P3 `refactor(css): tokenize literal spacing; footer nav items ride the .type
  ramp` — 41 literal gaps/paddings → `--space-*`; dead one-off tokens gone.
- P4 `refactor(islands): one swipe engine, one autoplay gate, one
  active-section hook` — `lib/swipe.ts`, `lib/autoplay-gate.ts`,
  `lib/use-active-section.ts`; three copies of each pattern collapse.
- P4 `refactor(islands): discriminated unions` — nav rows, contact status.
- P5 `test: Playwright visual gate` — `tests/visual.spec.ts` + config; system
  Chrome, baselines gitignored and refreshed from the reference build;
  `puppeteer-core` removed.
- P6 `feat(routes): not-found, robots, sitemap; pricing title` — the 404
  reuses the legal composition; `/privacy-policy` is a config redirect.
- P3 `refactor(css): one reduced-motion law in base.css` — 28 per-file
  cancel lists (−280 lines) replaced by one reset; smooth scroll ungated.
- P3 `refactor(pricing): one pricing button reads --pbtn-size` — five
  hidden per-band copies become one node; union lattice; `/pricing/`
  pixel-identical at all ten widths.
- P3 `refactor(controls): arrow and grader inherit their size` — the last
  four hidden-per-band mounts (careers CTA, blog-top grader, category
  arrows, footer grader) become one node each; footer grader overrides
  reduce to `--grader-size` per band. Geometry verified identical.
- P4 `refactor(tsx): drop the Text wrapper; type custom properties once` —
  40 `<Text>` become plain elements with `className="type …"` (the other 125
  already were); `css-vars.d.ts` lets `style={{ "--n": 3 }}` type-check, so
  29 `as CSSProperties` casts go. Visual gate settles images before shooting.
- Known intentional deviation from main: `/company/` team cells are 3px
  shorter per row below 860 — main held `.co-cell-role` at an unscaled 16px
  line-height while `.co-cell-name` scaled; both now ride the ramp.
- P5 `style: prettier` — `.prettierrc` (width 100), TS/TSX only; CSS keeps
  its hand-set one-line band rules. `format`/`format:check` scripts.
- P5 `ci: one check workflow` — PRs run types, lint, format, build.
- P6 `feat(routes): error boundary, descriptions, security headers` —
  `error.tsx` on the legal classes (markup only); every route has a
  description; nosniff, referrer and permissions policies.
- P3 `refactor(type): generated ts-<style> classes` — type.css emits one
  class per Figma style; 92 five-line declarations move from section CSS to
  the element's className. Gate: 100/100 vs bc6e2dc.
- P3 `refactor(type): ts- classes for templated classNames` — slug,
  button-inline, nav drawer labels, faq, funnel, stack. Gate 100/100.
- P3 `refactor(css): ramp anchors name their step` — 53 raw fs/lh pairs
  become `var(--ts-<step>-fs/-lh)` where the family and weight match.
  Value-identical; gate 100/100.
- P4 `refactor(cta): one CTA row in case-study CTA and gallery header` —
  size="inherit" replaces three hidden copies each. Gate 20/20.
