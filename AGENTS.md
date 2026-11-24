# AGENTS.md — keystone-35246740

Keystone's marketing site: the homepage, the legal pages and nothing else. Every way off the
homepage is a prompt sent to Ask Keystone in the console. Next.js App Router on Cloudflare
Workers (OpenNext).

## Never

- Never start a dev server on port 3000. `pnpm dev` runs on 3340.
- Never commit, stage, or push unless asked in that turn.
- Never read, print or copy `.env`.
- Never restyle a design-system part or a `@keystone-sites/*` widget from here. A part that
  should look different changes in `@keystone-sites/marketing-design-system`, with its catalog
  demo, and the site takes the new version.

## How the site is built

- **The design system** is `@keystone-sites/marketing-design-system` 2.x: tokens, fonts, the Set
  (`.ks`, the lattice cell `--u`, keys) and its parts (nav, composer, chip, plans, prose, footer
  and the rest), in plain CSS and React, with motion from its `motion` hooks and no animation
  library. A change to how something looks lands in the design system and comes here as a new
  version. `site/styles.css` takes its stylesheet, then Tailwind's theme and utilities for the
  consent bar's own classes, and nothing else.
- **The homepage** (`site/home/`) is a section to a file, each a `.tsx` and its `.css`: `hero`,
  `platform` (with `proof`, what each part leaves behind), `steps`, `pricing` and `foot`, with
  `ask` (the composer's frame, its cycling line and the chips) shared by the fold and
  the foot. `home.tsx` sets them out under the system's `Nav`; `home.css` imports the sheets in
  the order their cascade was drawn in, and `page.css` holds the page's scale. `content.ts` holds
  the words, the five ways in and the plans. Classes are `home-*`; the system's are `ks-*`.
  Photographs are in `public/photos/`, the sites Keystone built in `public/sites/`.
- **Every composer sends to the console**: `launch` in `site/console.ts` opens its `/guest` with
  the prompt, and Log in goes to its `/login`. On the way the composer grows into Keystone: the
  console's `/handoff.js`, which the homepage loads from the console, draws the move on both
  pages and carries it across in the address's fragment, so it works across origins. Without the
  script, `launch` just goes.
- **The legal pages** (`site/legal/`) are `site/frame.tsx`, the system's `Nav` and `Footer` around
  a title, with the document in the system's `Prose`. Terms and Privacy are the backend's markdown
  for Keystone (`getCompanyInformation`); Accessibility is `ACCESSIBILITY_STATEMENT`.
  `{{business.*}}` tokens are filled from Keystone's company record, and a token it has nothing
  for fails loudly. The not-found and error pages use the same frame.
- **Consent and analytics** come from `@keystone-sites/*`: the regime bootstrap script and the
  proxy's cookie (`proxy.ts`), `KeystoneServices` (PostHog, GTM, Meta Pixel, configured by the backend
  and gated by consent), and `CookieConsentModal`, the consent bar every Keystone site shares, in
  its own look. `site/consent/cookie-choices.tsx` names the way back to it by regime (CCPA's
  "Do Not Sell or Share My Personal Information") and opens it.
- **The console** is `NEXT_PUBLIC_CONSOLE_URL`, read only through `site/console.ts`.

## Running it with the console

1. The console (`keystone-console`) on 5500, with sor-service and the services it talks to.
2. `.env` from `.env.example`, with `NEXT_PUBLIC_CONSOLE_URL=http://localhost:5500`.
3. `pnpm install`, then `pnpm dev`: <http://localhost:3340>. Sending from a composer opens the
   console's guest chat on the prompt.

## Verify before you say done

`pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm format:check`, `pnpm build`. A change to the
homepage's look: screenshot it at 1440, 1100 and 375, with and without reduced motion.

## Git

Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`). Branches `feature/`,
`fix/`, `chore/`. Never force-push `main`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
