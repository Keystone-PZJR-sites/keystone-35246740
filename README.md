# Keystone Corporate Site — `keystone-35246740`

Keystone's own corporate website, built on the Keystone platform. This is a **fully custom, agency-built site** driven by a central, professional-grade design system at `design-system/`. No stock design-system visual components or CSS are loaded — the Keystone data/API layer is used for backend data only.

> **AI agents and designers: read `docs/rules/rules.md` before doing anything else.**

---

## Docs

| Folder | Purpose |
|--------|---------|
| `docs/rules/` | Non-negotiable rules — read before touching anything |
| `docs/specs/` | Numbered pre-implementation plans with acceptance criteria |
| `docs/explainers/` | Reference docs: design-system, animations, components, responsive, roadmap |

The design system is documented in `docs/explainers/design-system.md`, and its live catalog is the `/styles` page.

---

## Key Facts

- **Design system:** central, at `design-system/` (tokens → primitives → components → sections). Catalog at `/styles`.
- **Theme:** `custom` — no stock design-system CSS loaded
- **All styles:** `design-system/styles/` (assembled by `design-system/styles/index.css`)
- **Animation engine:** GSAP 3.15.0
- **Design source:** [Figma — ks-BrandID, node 915:2616](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=915-2616&m=dev)
- **Data layer:** `keystone-design-bootstrap` (API utilities + entity types)

---

## Development

```bash
# Install
npm install

# Dev server
API_URL="http://localhost:3000/api/v1" API_KEY="your-key" npm run dev -- --port 4002

# Must pass before every commit (see rules — never use `next build` as a pre-commit check)
npx tsc --noEmit && npm run lint
```

**Finding your API key:**
```bash
cd /path/to/proto-product-mono-repo/apps/api
bin/rails runner "puts AccountUser.where(role: 'api_service', account_id: YOUR_ACCOUNT_ID).first.user.api_key"
```

---

## Project Structure

```
keystone-35246740/
├── app/                     # Next.js App Router
│   ├── page.tsx             # Homepage
│   ├── styles/              # /styles — live design-system catalog (noindex)
│   ├── (inner)/             # Inner pages sharing InnerPageShell chrome
│   └── [live pages]/        # about, services, contact, faq, etc.
├── design-system/           # The central design system
│   ├── tokens/              # Color, type, radius, spacing, z-index, motion
│   ├── primitives/          # Text, Heading, Button, Card, Link, Pill, …
│   ├── components/          # Nav, footer, lead-capture, InnerPageShell
│   ├── sections/            # Homepage + reusable inner-page sections
│   ├── patterns/            # Page-specific groups (blog, legal)
│   ├── providers/ hooks/ lib/
│   └── styles/              # CSS per layer, assembled by index.css
├── config/index.ts          # Site config (theme: "custom")
├── docs/
│   ├── rules/               # Non-negotiable rules
│   ├── specs/               # Numbered pre-implementation specs
│   └── explainers/          # Reference docs (design-system, animations, …)
└── public/
    └── fonts/               # FK font files (licensed — add before launch)
```

---

## Local Design Bootstrap Development

```bash
# Link local design bootstrap
cd /path/to/keystone/site-builder/keystone-design-bootstrap
npm link

cd /path/to/keystone/site-builder/customer-sites/keystone-35246740
npm link keystone-design-bootstrap

# Restore published version
npm unlink keystone-design-bootstrap
npm install
```

---

## Deployment

```bash
npm run build          # Next.js build
npm run preview        # Build + run locally via Cloudflare Workers
npm run deploy         # Build + deploy to Cloudflare Workers
```
