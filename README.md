# Keystone Corporate Site — `keystone-35246740`

Keystone's own corporate website: the **new-brand rebuild**, built on the
five-anchor grid system under `design-system/v2/`. The Keystone data/API
layer (`@keystone-sites/core` · `services` · `widgets`) powers backend
data, chat, and forms; everything visual is custom.

On 2026-08-27 the old-brand site was purged from this branch (owner
decision — big-bang launch). The old site still ships from `main` until
the rebuild launches.

> **AI agents and designers — read `AGENTS.md`, then every rule in
> `.cursor/rules/`.** They are the binding contract for this codebase.

---

## Docs

| Location | Purpose |
|--------|---------|
| `AGENTS.md` | The agent rules index and the non-negotiables |
| `.cursor/rules/` | The rules: workflow, architecture, design system, grid, Figma, React and accessibility, data and integrations |
| `docs/reference/grid-engine.md` | The grid mechanics — how the engine is built, painted, and kept crisp |
| `docs/reference/tokens.md` | The token architecture and the re-extraction procedure |
| `docs/launch-checklist.md` | Page status, launch gates, and the launch steps |

There are no spec documents. The live Figma file is the design intent, the
code is the record of what was built, and the rules are the contract.

---

## Key facts

- **Design system:** `design-system/v2/` — tokens → base → grid engine →
  primitives → sections.
- **Grid:** five anchors (384 · 576 · 768 · 960 · 1344), container-query
  band gates at the geometric midpoints (470 · 665 · 860 · 1130),
  nearest-anchor rendering, the tick capped at 112px.
- **Fonts:** GT Standard Standard VF + PP Kyoto Variable Upright —
  licensed, self-hosted.
- **Motion:** CSS only — named grammars in `v2/tokens/motion.css`.
  No animation runtime ships.
- **Design source:** the live Figma file `ks-MarketingSite`, read through
  the Figma MCP only.
- **Data layer:** `@keystone-sites/core` (`lib/server-api`, chat/form
  route handlers under `app/api/`). The site chat is the
  `@keystone-sites/widgets` `ChatWidget`, compiled through
  `v2/widgets.css`.
- **Grader:** the grader input queries the Grader search API and
  deep-links into the Grader app (`v2/lib/grader.ts`); URLs come from
  `.env`.
- **Deploy:** Cloudflare via OpenNext (`npm run preview` / `deploy`).

## Environment

Copy the variables in `.env` for local work: `API_URL`, `AUTH_API_URL`,
`API_KEY`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GRADER_URL`,
`NEXT_PUBLIC_GRADER_API_URL`, `NEXT_PUBLIC_GRADER_SEARCH_PATHS`. The
Grader variables are required; a missing one fails the build.

## Routes

Live routes: `/` · `/pricing` · `/our-work` · `/case-studies/[slug]`.
The grid sweep runs on those pages. There are no QA or fixture routes.

## Checks

```bash
npx tsc --noEmit                                  # zero errors before every commit
npm run lint                                      # zero warnings before every commit
GRID_URL=http://localhost:3000 npm run test:grid  # the grid sweep, against the running dev server
```
