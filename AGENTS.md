# AGENTS.md — keystone-35246740

Keystone's marketing site. Next.js App Router on Cloudflare (OpenNext).
Design intent is the Figma file `ks-MarketingSite`; the code is what ships.
Read this file, then `REFACTOR.md` if it exists.

## Never

- Never read geometry, type, or color from screenshots or memory. Read the
  live Figma node through the Figma MCP. If the MCP is unreachable, stop and say so.
- Never start a dev server on port 3000. Run yours on another port, or use the
  owner's if it is running.
- Never hardcode a value that means something. Colors, spacing, type, motion,
  z-index, URLs, copy, and asset paths live in `design-system/tokens/`,
  `*-data.ts` modules, `design-system/media.ts`, or `.env`.
- Never write CSS outside `design-system/`. No utility classes in site markup,
  no CSS modules, no CSS-in-JS, no `<style>`, no `!important`.
- Never customize a `@keystone-sites/*` widget beyond its props.
- Never put `'use client'` on a page or layout. Interactivity is a leaf island.
- Never suppress a lint or type error. Never use `any` or `as` at a data boundary.
- Never invent copy, a component API, or a file. Read it first; ask if unclear.
- Never delete a route or config file without being asked.
- Never commit, stage, or push unless asked in that turn.

## How the site is built

- `app/` routes only mount a `design-system/pages/*` composition and pass data.
- `design-system/` layers build strictly upward: `tokens` → `base` → `grid`
  → `primitives` → `sections` → `pages`. A layer imports only layers below it.
  `index.css` assembles the cascade; add a file to its layer, never rules to the index.
- A section owns `name.tsx`, `name.css`, `name-data.ts`, and at most one
  island `name-island.tsx`. Sections compose primitives; pages compose sections.
- Server Components by default. An island receives typed props or wraps
  server-rendered children; it never fetches. Route JS is measured in bytes.
- Layout is container-query driven on `.site-root` with the tick `--t`
  (page width ÷ 12, capped at 112px). Structure is written in `--t`; type and
  spacing come from tokens; controls are fixed material px. See
  `design-system/grid/engine.css`.
- Motion is CSS only. Every duration, curve, and distance is a token in
  `tokens/motion.css`; read the laws in its header before adding any motion.
- Data comes from `@keystone-sites/core` (`lib/server-api`) or a typed
  `*-data.ts` module, validated at the boundary. Forms and chat go through the
  Keystone route handlers in `app/api/`.
- Images are art-directed `<picture>` tier sets from `media.ts`, with
  `width`/`height`, WebP, `alt=""` when ambient. Fonts are licensed and
  self-hosted; never load them from a URL.
- Accessibility baseline: semantic HTML before ARIA, keyboard reachable,
  visible `:focus-visible`, 44px targets, WCAG AA contrast, `<dialog>`
  semantics for overlays with focus returned to the opener.

## Adding a page

1. Read the Figma frames for every band you will render.
2. Reuse: search `primitives/` and `sections/` before writing a new one.
3. Compose the page in `design-system/pages/name.tsx`; mount it from
   `app/name/page.tsx` with `metadata`. Add the route to `site-links.ts`.
4. Verify in the browser at 384 · 576 · 768 · 960 · 1344 and one width between.

## Verify before you say done

- `npx tsc --noEmit` and `npm run lint`: zero errors, zero warnings.
- Visual change: checked in the browser at the widths above, reduced motion on
  and off. Report what you measured, not "looks right".
- Lattice change (`design-system/grid/`, section tick geometry): also
  `GRID_URL=<dev url> npm run test:grid`. Not for copy, tokens, or motion.

## Git

Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).
Plain, short, active sentences. One logical change per commit; `tsc` and
`lint` pass before each. Branches `feature/`, `fix/`, `chore/`. Never force-push `main`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
