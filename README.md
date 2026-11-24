# Keystone marketing site

The homepage and the legal pages of keystone.app. Next.js 16 (App Router, Turbopack) on
Cloudflare Workers through OpenNext, drawn with `@keystone-sites/marketing-design-system`.
Agents and contributors: read `AGENTS.md` first.

## Run

```bash
cp .env.example .env   # fill in every variable; the build fails without them
pnpm install
pnpm dev               # http://localhost:3340
```

## Verify

```bash
pnpm exec tsc --noEmit
pnpm lint
pnpm format:check
pnpm preview           # OpenNext build + wrangler dev
```

## Routes

`/` · `/terms` · `/privacy-policy` · `/accessibility`

## Deploy

`main` deploys through `.github/workflows/deploy.yml`; `website-mod-**` branches upload a preview
version.
