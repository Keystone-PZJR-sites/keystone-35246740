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
- [ ] **2. AGENTS.md** — ≤ 80 lines: read order, Never list, verification, git.
  System descriptions move to `design-system/README.md`. Rules state what
  tooling cannot enforce; the rest becomes lint/tests.
- [ ] **3. CSS / tokens / type** — `@layer` cascade; `component.css` dissolved
  into semantic tokens + per-file `--_locals`; one fluid type class per step
  (`clamp()`, `rem`) replacing 142 hand-copied blocks and the `--wA/--wB`
  weight ladder; accent token family for chips; kill dead tokens; one class
  naming scheme; no DOM band duplicates (`.rm/.rs/…` toggles); no magic px.
- [ ] **4. DRY the islands** — `useSwipe`, `useAutoplayGate`, `useActiveSection`,
  `useModal` (native `<dialog>` + `inert`), `cssVars()`, `useSyncExternalStore`
  for `matchMedia`; discriminated unions where `!` lives; `useActionState` +
  server action for the contact form; zod at every boundary.
- [ ] **5. Tests & tooling** — port grid contract checks to Playwright; delete
  the bespoke Puppeteer runner and dev panel; axe per route; vitest for
  schemas; Prettier; stricter tsconfig; one PR `check` workflow.
- [ ] **6. Site hygiene** — `sitemap.ts`, `robots.ts`, `not-found.tsx`,
  `error.tsx`, per-route metadata, security headers, `next/image` for CMS
  imagery, sandboxed gallery iframe.

## Log

- P1 `chore: build with Turbopack and gate the dev grid panel on NODE_ENV` — also
  services dep, `.nvmrc`/`engines`, `.env.example`, preview CI gates + env.
