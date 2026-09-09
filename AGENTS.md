# Agent rules — keystone-35246740

Keystone's corporate site. The design system is `design-system/` on the
five-anchor grid. The rules in `.cursor/rules/` load automatically; this
file is the index and the short list you must never break.

The live Figma file is the design intent. The code is the record of what
ships. These rules are the contract.

## Read order

1. This file.
2. `.cursor/rules/00-workflow.mdc` — how work happens here: sources of truth,
   verification gates, git, and comments.
3. `.cursor/rules/10-architecture.mdc` — server/client split, the design-system
   layers, component and state rules.
4. `.cursor/rules/20-design-system.mdc` — tokens, styling, motion, fonts, assets.
5. `.cursor/rules/30-grid-and-layout.mdc` — the band system and the grid laws.
6. `.cursor/rules/40-figma.mdc` — reading the design through the Figma MCP.
7. `.cursor/rules/50-react-effects-a11y.mdc` — hydration, effects, accessibility.
8. `.cursor/rules/60-data-and-integrations.mdc` — env, packages, the widgets, forms.

## Never

- Never read geometry, type, or tokens from screenshots, memory, or a prior
  extraction. Read the live Figma file through the Figma MCP. If the MCP is
  unreachable, stop and say so.
- Never start your own dev server. The owner runs `npm run dev` on port 3000.
  Two servers share one `.next` directory and corrupt each other. If port 3000
  is not answering, say so and ask. The grid sweep runs against the owner's
  server: `GRID_URL=http://localhost:3000 npm run test:grid`.
- Never hardcode a value that means something: colors, spacing, type, motion,
  z-index, URLs, copy, asset paths, endpoints. Tokens, data modules, the media
  registry, and `.env` are the homes.
- Never write CSS outside the `design-system/` layers; never use utility
  classes, CSS modules, CSS-in-JS, `<style>` tags, or `!important`.
- Never customize a `@keystone-sites/*` widget beyond its accepted props.
- Never put `'use client'` on a page; interactivity lives in leaf islands.
- Never suppress a lint or type error; fix the cause.
- Never delete a page, route, or config file without explicit instruction.
- Never commit, stage, or push unless the human asks in that turn.

## Required verification

- `npx tsc --noEmit` — zero errors.
- `npm run lint` — zero errors, zero warnings.
- A visual change is verified in the browser at the five anchors
  (384 · 576 · 768 · 960 · 1344) and one mid-band width per band.
- The grid sweep is **not** the default layout gate. Run it only when the
  lattice contract changes — `design-system/grid/`, `app/grid/`, or asserted
  section tick geometry / exposure / stack order. See `00-workflow.mdc`.
  A one-page lattice change uses `GRID_ROUTE`. Never use the sweep as a
  mid-build loop. If it fails, stay on that route; do not restart the full
  suite from `/`.
- Every new value traces to a token, a named constant, or a data module.
- The rules describe the code. Update them with the code.

## Git

Commit only when asked. Conventional Commits (`feat:`, `fix:`, `docs:`,
`chore:`, `refactor:`), written in ASD-STE100 Simplified Technical English:
active voice, one idea per sentence, 20 words or fewer per sentence, plain
words. The smallest complete commit — one primitive, one section, one token
layer. `tsc` and `lint` pass before every commit. Never force-push `main`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
