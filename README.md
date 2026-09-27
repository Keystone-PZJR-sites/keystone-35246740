# Keystone marketing site

Next.js 16 (App Router, Turbopack) deployed to Cloudflare Workers via OpenNext.
Agents and contributors: read `AGENTS.md` first.

## Run

```bash
cp .env.example .env   # fill in every variable; the build fails without them
npm install
npm run dev            # add -p <port> if 3000 is taken
```

## Verify

```bash
npx tsc --noEmit
npm run lint
npm run format:check                                # prettier, TS/TSX only
BASE_URL=http://localhost:3000 npm run test:visual  # screenshots vs tests/__screenshots__
npm run preview                                     # OpenNext build + wrangler dev
```

## Layout

- `app/` — routes; each mounts a `site/pages/*` composition.
- `site/` — this site's sections and pages, on top of `@keystone-sites/marketing-design-system`
  (tokens → base → grid → primitives → shared sections), linked from `../keystone-marketing-design-system`.
- `public/media/` — fonts and art-directed image tiers, indexed by the design system's `media.ts`.
- `tests/` — the Playwright visual gate (`playwright.config.ts`).

## Routes

`/` · `/pricing` · `/our-work` · `/case-studies/[slug]` · `/blog` · `/blog/[slug]`
· `/company` · `/contact` · `/terms` · `/privacy` · `/privacy-policy` · `/accessibility`

Blog and legal content come from the Keystone API; case studies, pricing, FAQ,
and nav copy are typed `*-data.ts` modules.

## Deploy

`main` deploys through `.github/workflows/deploy.yml`; `website-mod-**` branches
upload a preview version. Both run `tsc` and `lint` first.
