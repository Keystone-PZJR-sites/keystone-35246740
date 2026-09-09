# Keystone Corporate Site — `keystone-35246740`

Keystone's own corporate website: the **new-brand rebuild**, built on the
five-anchor grid system under `design-system/v2/`. The Keystone data/API
layer (`@keystone-sites/core` · `services` · `widgets`) powers backend
data, chat, and forms; everything visual is custom.

On 2026-08-27 the old-brand site was purged from this branch (owner
decision — big-bang launch). The old site still ships from `main` until
the rebuild launches; its spec series (`docs/specs/`) stays frozen here
as the historical record.

> **AI agents and designers — read `docs/rebuild/plan.md` first, then
> `docs/rules/rules.md` in full.**

---

## Docs

| Folder | Purpose |
|--------|---------|
| `docs/rules/` | Non-negotiable rules — read before touching anything |
| `docs/rebuild/` | The rebuild plan, reference docs, and spec series (001–) |
| `docs/specs/` | The old-brand spec series — frozen, historical record only |

---

## Key facts

- **Design system:** `design-system/v2/` — tokens → base → grid engine →
  primitives → sections. Catalog at `/primitives`.
- **Grid:** five anchors (384 · 576 · 768 · 960 · 1344), container-query
  band gates at the geometric midpoints, nearest-anchor rendering
  (spec 002 + 002.r1; mechanics in `docs/rebuild/reference/GRID-SPEC.md`).
- **Fonts:** GT Standard Standard VF + PP Kyoto Variable Upright —
  licensed, self-hosted (spec 001).
- **Motion:** CSS only — named grammars in `v2/tokens/motion.css`.
  No animation runtime ships.
- **Design source:** the live Figma file `ks-MarketingSite`, read through
  the Figma MCP only.
- **Data layer:** `@keystone-sites/core` (`lib/server-api`, chat/form
  route handlers under `app/api/`).
- **Deploy:** Cloudflare via OpenNext (`npm run preview` / `deploy`).

## Routes

`/` is the assembled homepage (QA and the grid sweep run here). The
remaining noindexed QA surfaces: `/grid` (engine harness + self-tests)
· `/primitives` · `/footer` · `/nav` · `/hero-next` · `/system-next` ·
`/work-next` · `/case-carousel-next` · the other page fixtures.

## Checks

```bash
npx tsc --noEmit   # zero errors before every commit
npm run lint       # zero warnings before every commit
npm run test:grid  # the grid self-test sweep (starts its own dev server)
```
