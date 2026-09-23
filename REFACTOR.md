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
- [x] **3. CSS / tokens / type** — `@layer` cascade; `component.css` dissolved
  into semantic tokens + per-file `--_locals`; one generated `ts-<style>`
  class per Figma step; type is fluid — one straight line from the 384
  size to the 1344 size on `--k` (`--k-late` holds through tablet), no
  `@container` block sets a size; ramp anchors name their step; one reduced-motion
  law; controls inherit size from their mount (no hidden per-band copies).
  *Kept on purpose:* the desktop bar-with-drawers and the mobile full-screen
  menu are two designed components, not one design across bands, so both
  trees stay (the hidden one is `display: none`); their CSS is split into
  `nav.css` (shared) · `nav-desktop.css` · `nav-mobile.css`. Footer/FAQ rail
  cells are per-band geometry.
- [ ] **4. DRY the islands** — `useSwipe`, `useAutoplayGate`, `useActiveSection`,
  `useModal` (native `<dialog>` + `inert`), `cssVars()`, `useSyncExternalStore`
  for `matchMedia`; discriminated unions where `!` lives; `useActionState` +
  server action for the contact form; zod at every boundary.
- [x] **5. Tests & tooling** — one Playwright visual gate (routes × anchors
  and gates) replaces the bespoke Puppeteer runner and dev panel; Prettier;
  `noImplicitReturns`/`noImplicitOverride`/`noFallthroughCasesInSwitch`
  (`noUnused*` blocked by widgets source in node_modules); one PR `check`
  workflow.
- [~] **6. Site hygiene** — `sitemap.ts`, `robots.ts`, `not-found.tsx`,
  `error.tsx`, per-route metadata, security headers done. *Left:*
  `next/image` for CMS imagery, sandboxed gallery iframe.

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
- P5 `chore(ts): three free strictness flags` — zero new errors.
- P3 `refactor(css): named gates` — 626 `@container (min-width: 665px)`
  become `@container (--rt)` etc.; widths live once in `grid/gates.js`, a
  30-line PostCSS plugin. Gate 100/100.
- P3 `refactor(pricing): one slider` — the scale block is one flex column;
  the mount names the slider size per band; five width tokens go.
- P3 `refactor(work-deck): one CTA` — from rd1 the head and band wrappers
  are `display: contents` and the section grid places slug, headline, CTA
  and deck; below rd1 nothing changes. `/` pixel-identical at ten widths.
- P3 `refactor(nav): split nav.css` — 1188 lines become shared 120 ·
  desktop 530 · mobile 543; same cascade order; open states identical.
- P4 `refactor(engines): one drawing swap` — `applyShown` reuses
  `swapDrawing`; scroll states and tap toggle verified identical. The rest
  of the island is one scroll state machine plus one gesture; no further
  duplication to remove.
- P3 `fluid type` (adopted from `experiment/fluid-type`) —
  `.type` interpolates `--fs0/--lh0` → `--fs1/--lh1` on `--k` (0 at the 384
  anchor, 1 at 1344, unitless via `tan(atan2())`); 65 selectors lose their
  per-band `--fs0/--lh0` switches (−416 lines). 384/1344/1600 are
  pixel-identical; between, sizes rise monotonically instead of
  sawtoothing at each gate (hero h1 before: 32 → 33.5 → 41 → 43 → 50 →
  **46** → 51 → 60 → 72; after: 32 → 35.6 → 40 → 43.7 → 48 → 51.8 → 56 →
  63 → 72). Pinned selectors (case-study-card, persona-card, faq, footer,
  nav-mobile) followed in the next commit.
- P3 `fluid type: everything` — the pinned selectors follow:
  card and FAQ pins become `calc(var(--_u) * var(--fs))` with the section
  naming `--*-fs1` end anchors once; footer names/items/copyright, blog
  card labels, work and case-study headings, the price numeral lose their
  band blocks; the mobile nav ramps on a local `--k` (384 → 768, its last
  designed anchor). No `@container` block sets a type size anywhere;
  controls (`type-fixed`, `--pbtn-size`) stay keyword-sized. 384/1344/1600
  pixel-identical; open mobile menu identical at 384 and 768.
- P3 `--k-late` — a second progress (0 through 768, 1 at 1344)
  for components whose design holds one size across phone and tablet; the
  pricing card uses it (its $50 held 88px to 768 and fluid had it at 123).
  Sweep vs production at 576/768/960: 238 type selectors differ ≥0.5px, up
  to ±40%, because Figma bands hold or step non-monotonically; a two-anchor
  line cannot reproduce that, only approximate it. Adopted: the visual
  gate's reference is now this build; 384/1344/1600 stay identical to main.
- `fix(pricing)` — the included-list CTA keeps a gap when the list fills
  the box (`margin-top: auto` alone collapses to 0).
- Landing kit — the audit's newcomer simulation produced a conformant but
  flat page (grammar documented, vocabulary not). `sections/landing.*` is
  the vocabulary pre-assembled: hero with seated media frame and entrance,
  three seated benefit cards, hanging quote, closer CTA row; painted closer
  rows between. A landing page is now a `LandingPageData` module plus a
  route (`/for-dentists/` is the first). Idioms the kit needed became
  primitives instead of local copies: `CloserRow` (was `.co-closer` ×4
  in /company, now one component), `CtaRow` (the case-study row),
  `ramps.css` (the standard h1/h2/body/quote pairs), `Picture` over a
  `PictureSet` from `media.ts`. AGENTS.md: "Building new pages" starts
  from the kit and lists the vocabulary; the skeleton example uses the
  primitives. Existing routes 100/100 on the visual gate.
- Landing kit, composable — `LandingPageData.sections` is an ordered list
  of `{ kind, …data }`; `pages/landing.tsx` renders through a kind→section
  registry, so a page chooses order and count and a new kind is one
  section file plus one registry line. /for-dentists/ pixel-identical.

