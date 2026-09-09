# Keystone Corporate Site — `keystone-35246740`

Keystone's corporate website. The design system lives under
`design-system/` on the five-anchor grid. The Keystone data/API layer
(`@keystone-sites/core` and `@keystone-sites/widgets`) powers backend data,
chat, and forms; everything visual is custom.

> **AI agents — read `AGENTS.md`, then every rule in `.cursor/rules/`.**
> They are the binding contract for this codebase.

---

Agent behavior is defined by `AGENTS.md` and `.cursor/rules/`. The live
Figma file defines design intent, and the code defines the shipped site.

---

## Key facts

- **Design system:** `design-system/` — tokens → base → grid engine →
  primitives → sections.
- **Grid:** five anchors (384 · 576 · 768 · 960 · 1344), container-query
  band gates at the geometric midpoints (470 · 665 · 860 · 1130),
  nearest-anchor rendering, the tick capped at 112px.
- **Fonts:** GT Standard Standard VF + PP Kyoto Variable Upright —
  licensed, self-hosted.
- **Motion:** CSS only — named grammars in `design-system/tokens/motion.css`.
  No animation runtime ships.
- **Design source:** the live Figma file `ks-MarketingSite`, read through
  the Figma MCP only.
- **Data layer:** `@keystone-sites/core` (`lib/server-api`, chat/form
  route handlers under `app/api/`). Site chat is the
  `@keystone-sites/widgets` `ChatWidget`, compiled through
  `design-system/widgets.css`.
- **Grader:** the grader input queries the Grader search API and
  deep-links into the Grader app (`design-system/lib/grader.ts`); URLs come from
  `.env`.
- **Deploy:** Cloudflare via OpenNext (`npm run preview` / `deploy`).

## Environment

Copy the variables in `.env` for local work: `API_URL`, `AUTH_API_URL`,
`API_KEY`, `NEXT_PUBLIC_GRADER_URL`, `NEXT_PUBLIC_GRADER_API_URL`,
`NEXT_PUBLIC_GRADER_SEARCH_PATHS`. The Grader variables are required; a
missing one fails the build. The public site origin is `SITE_URL` in
`design-system/site.ts`.

## Routes

`/` · `/pricing` · `/our-work` · `/case-studies/[slug]`. The grid sweep
runs on those pages.

## Verification

```bash
npx tsc --noEmit
npm run lint
GRID_URL=http://localhost:3000 npm run test:grid  # the grid sweep, against the running dev server
```
