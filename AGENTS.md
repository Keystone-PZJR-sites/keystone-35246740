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
  `--opsz` and the 384 size (`--fs-rm/--lh-rm`); the element's base rule names
  the other designed anchors (`--fs-rs/rt/rd1/rd2`, `--lh-*`) and, per band,
  where the size runs above its anchor (`--fs-rs-to: var(--fs-rt)`); a band
  without a target holds. Below an anchor the size zooms with the tick, so
  every anchor renders exactly. Never set a size inside `@container`; a band
  that switches style restates only `--font`/`--ls`/`--opsz`. A component
  that scales through its own unit pins `--fs-px: calc(var(--_u) *
  var(--fs-band))`. The law and its reasons: `primitives/text.css`.
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

## Building new pages

Open `/design/` first (`app/design/`): the tokens, type styles, every
primitive at every size, the landing kit's kinds, and this file, rendered
from the source. It is not indexed and lives in the visual gate like any
route. Then start from the landing kit. A page without its own Figma frames (a
vertical, a campaign, a persona) is copy plus two files, and it arrives
with the site's craft — lattice paint, an image slot, the entrance, seated
cards, a quote — because the kit sections already carry it:

1. `design-system/pages/name-data.ts`: a `LandingPageData` (see
   `pages/for-dentists-data.ts`): `meta`, then `sections`, an ordered list
   where each entry is `{ kind, ...data }`. Kinds today: `hero`, `benefits`,
   `quote`, `closer`. Any order, any count, kinds may repeat. The hero
   picture is `heroCarouselPicture(n)` from `media.ts` until the page has
   its own photography.
2. `app/name/page.tsx`: `metadata` from `data.meta`, then
   `<LandingPage data={NAME} />`. Add the route to `site-links.ts`,
   `app/sitemap.ts`, and `tests/visual.spec.ts`.

When no kind says what a page needs, add one — a section file pair
(`sections/landing-<kind>.tsx/.css`, registered in `index.css`), its
variant in `LandingSection`, and one line in `SECTIONS`
(`pages/landing.tsx`) — so every landing page can use it. Never a
page-local section or CSS file.

A page with its own Figma frames is composed from sections instead:

1. Read the frames for every band you will render.
2. Search before you build: `primitives/`, `sections/`, `icons.tsx`,
   `media.ts`, `tokens/`, and the existing `data-action` contracts.
3. Compose the page in `design-system/pages/name.tsx`; mount it from
   `app/name/page.tsx` with `metadata`. Add the route to `site-links.ts`,
   `app/sitemap.ts`, and `tests/visual.spec.ts`.
4. A new dependency needs a reason in the change; prefer the platform.

A section is this shape, and nothing in it is a number:

```tsx
<section className="sec my-sec" data-landmark="my">
  <Slug>Eyebrow</Slug>
  <h2 className="type ts-display-serif-xs-extralight ramp-h2 my-head">Headline</h2>
  <p className="type ts-text-md-light ramp-body my-body">Body copy.</p>
  <CtaRow cta={{ label: "See pricing", href: SITE_LINKS.pricing }} />
  <CloserRow />
</section>
```

```css
.my-sec { padding-inline: var(--t); padding-top: var(--t); }
.my-head { margin-top: var(--space-lg); max-width: calc(8 * var(--t)); }
.my-body { margin-top: var(--space-2xl); max-width: calc(6 * var(--t)); }
```

Bands rm · rs · rt · rd1 · rd2 sit at 384 · 576 · 768 · 960 · 1344; a gate opens the next band.

The vocabulary, each with its home:

- Type ramps (384 → 1344), `primitives/ramps.css`: `ramp-h1` sm-plus-thin →
  3xl-thin; `ramp-h2` xs-extralight → xl-extralight; `ramp-body` text-md-light
  → text-xl-light; `ramp-quote` 2xs-plus-extralight → sm-plus-extralight
  with the opening mark hanging. Pair each with its 384 `ts-` class.
- Lattice paint: a section sits in unpainted air, hosts a seated
  `GridRegion` frame in a `.gx` overlay (`sections/landing-hero.tsx`), or
  closes with a `CloserRow` (`primitives/closer-row.tsx`) a tick below its
  content. Cells that are the grid are line-inclusive, `k·t + 1px`, and
  overlap neighbours by that pixel (`sections/landing-benefits.css`).
- Imagery: a `PictureSet` from `media.ts` rendered by `primitives/picture.tsx`
  inside a fixed-tick frame.
- Entrance: the page class `load-sequence-rise`, `hx-rise` on each rising
  element with a `--_d` delay token, and a `LoadOrchestrator` naming the last
  beat (`pages/landing.tsx`).
- The CTA row, `primitives/cta-row.tsx`: fill button, "Got a question?" from
  rs, ghost `open-chat`; it sets `--btn-size` per band.
- A long page's side rail, `primitives/toc.tsx`: `Toc items` in a
  desktop-only absolute rail beside the content (`sections/case-study-toc.css`,
  `.ds-toc-rail` in `pages/design.css`); the active row follows
  `lib/use-active-section`.

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
