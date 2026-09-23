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
  `*-data.ts` modules, `design-system/media.ts`, or `.env`. A constant only
  one file needs is a custom property on that file's root selector, at the top.
- Never write CSS outside `design-system/`. No utility classes in site markup,
  no CSS modules, no CSS-in-JS, no `<style>`, no `!important` (two
  exceptions: the reduced-motion law in `base.css` and the packaged consent
  widget's bridge in `widgets.css`).
- Never customize a `@keystone-sites/*` widget beyond its props.
- Never put `'use client'` on a page or layout (`app/error.tsx`, which Next
  requires to be a client component, stays markup-only). Interactivity is a
  leaf island.
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
  spacing come from tokens; controls are fixed material px. Gates are named
  by the band they open: `@container (--rs)`, `(--rt)`, `(--rd1)`, `(--rd2)`;
  never a pixel width. See `design-system/grid/engine.css` and `gates.js`.
- A control's size is a keyword its mount can set per band: `--btn-size` for
  `ButtonFill`/`ButtonGhost`/`ButtonArrow`, `--grader-size` for `GraderInput`,
  `--pbtn-size` for `PricingButton`. Pass `size="inherit"` and declare the
  keyword on the mount at each gate; never render one hidden copy per band.
- Text is `type ts-<figma-style>` (for example `type ts-text-md-light`;
  `type-fixed` for material sizes). The generated class sets `--font`/`--ls`/
  `--opsz` and the 384 size (`--fs0/--lh0`); the element's base rule sets
  `--fs1/--lh1` for its 1344 size and the size runs fluidly between. Never
  set a size inside `@container`; a band that switches style restates only
  `--font`/`--ls`/`--opsz`.
  Every state change is a CSS transition or animation; `base.css` zeroes them
  all under reduced motion.
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
  semantics for overlays with focus returned to the opener. Overlays lock
  scroll only through `lib/scroll-lock.ts`.
- Inline `style` carries only per-instance values the CSS cannot know
  (a CSS custom property, a color role, a frame index). Anything constant
  is a class.
- Comments say why, never what, and record the Figma node id a value came
  from. User-facing strings use literal Unicode, not escapes.

## React islands

- Browser APIs (`window`, `document`, measurement) run only in effects or
  handlers, never during render; the first client render matches the SSR HTML.
- One owner per piece of state: React, or a timer/animation the component
  reads through a ref. No module-level mutable state. Derive, don't sync:
  status computed from other state is computed in render, not stored.
- Every effect cleans up (listeners, timers, observers) and survives Strict
  Mode double-mount and HMR. Timers are not a sync primitive.
- Prefer native CSS state (`:hover`, `:focus-within`, `:has()`, `data-*`)
  over JS. Classify external data into a discriminated union at the boundary.
- Cross-section behaviour is a declarative `data-action` attribute on the
  control (`open-chat`, `open-gallery`), handled by one delegated document
  listener in the owning island. Never wire `onClick` across sections.
- Forms are uncontrolled, work without JS (real `action`), and submit
  through the Keystone route handlers. No `console.log` in shipped code.

## Reading Figma

- Before building or changing anything designed, run `get_metadata`,
  `get_variable_defs`, and `get_design_context` on the node, fresh.
- Read every variant of a component set; never scale one to derive another.
  Cells equal to the anchor ticks (32/48/64/80/112) are `1t`, not px.
- Metadata `x`/`y` inside a grid auto-layout can be stale; verify geometry
  against rendered bounds through the Figma console bridge. Strokes produce
  ±0.5px artifacts (23/31/33 mean 24/32): transcribe the intended value.
- Token values come from the variables API and text styles, not rendered
  frames. Type changes: update `tokens/type-styles.json`, then run
  `node scripts/generate-type-css.mjs`.
- When a node disagrees with its siblings or the pattern, flag it to design
  and record the resolution in a comment at the value. Never build the error.

## Adding a page

1. Read the Figma frames for every band you will render.
2. Search before you build: `primitives/`, `sections/`, `icons.tsx`,
   `media.ts`, `tokens/`, and the existing `data-action` contracts.
3. Compose the page in `design-system/pages/name.tsx`; mount it from
   `app/name/page.tsx` with `metadata` (title and description). Add the
   route to `site-links.ts` and `app/sitemap.ts`.
4. Verify in the browser at 384 · 576 · 768 · 960 · 1344 and one width between.
5. A new dependency needs a reason in the change; prefer the platform.

A section is this shape, and nothing in it is a number:

```tsx
<section className="sec my-sec" data-landmark="my">
  <Slug>Eyebrow</Slug>
  <h2 className="type ts-display-serif-sm-plus-thin my-head">Headline</h2>
  <p className="type ts-text-md-light my-body">Body copy.</p>
  <ButtonFill size="inherit" href={SITE_LINKS.pricing}>See pricing</ButtonFill>
</section>
```

```css
.my-sec { padding-block: var(--space-3xl); --btn-size: md; }
.my-head { --fs1: var(--ts-display-serif-md-thin-fs); --lh1: var(--ts-display-serif-md-thin-lh); }
.my-body { margin-top: var(--space-lg); max-width: calc(6 * var(--t)); }
@container (--rd1) {
  .my-sec { --btn-size: lg; }
}
```

Bands rm · rs · rt · rd1 · rd2 sit at 384 · 576 · 768 · 960 · 1344; a gate opens the next band.

## Verify before you say done

- `npx tsc --noEmit`, `npm run lint`, `npm run format:check`: zero errors, zero warnings.
- Visual change: `npm run test:visual` (every route × every anchor and gate)
  against baselines refreshed from the reference build with
  `BASE_URL=<ref> npm run test:visual -- --update-snapshots`. Then look at the
  widths you touched with reduced motion on and off. Report what you
  measured, not "looks right".

## Git

Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).
Plain, short, active sentences. One logical change per commit; `tsc` and
`lint` pass before each. Branches `feature/`, `fix/`, `chore/`. Never force-push `main`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
