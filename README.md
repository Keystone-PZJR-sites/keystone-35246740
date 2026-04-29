# Keystone Corporate Site — `keystone-35246740`

Keystone's own corporate website, built on the Keystone platform. This is a **fully custom, agency-built site** — no design-system visual components or CSS. The Keystone data/API layer is used for backend data only.

> **AI agents and designers: read `docs/rules/rules.md` before doing anything else.**

---

## Docs

| Folder | Purpose |
|--------|---------|
| `docs/rules/` | Non-negotiable rules — read before touching anything |
| `docs/specs/` | Numbered pre-implementation plans with acceptance criteria |
| `docs/explainers/` | Reference docs: animations, components, responsive, roadmap |

---

## Key Facts

- **Theme:** `custom` — no design-system CSS loaded whatsoever
- **All styles:** `styles/custom-overrides.css` only
- **Animation engine:** GSAP 3.15.0
- **Design source:** [Figma — ks-BrandID, node 915:2616](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=915-2616&m=dev)
- **Data layer:** `keystone-design-bootstrap@^1.0.75` (API utilities only)

---

## Development

```bash
# Install
npm install

# Dev server
API_URL="http://localhost:3000/api/v1" API_KEY="your-key" npm run dev -- --port 4002

# Build (must pass before every commit)
npm run build
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
│   ├── page.tsx             # Homepage (Phase 1)
│   └── [other pages]/       # Orphaned — do not delete, do not link to
├── components/
│   ├── sections/            # Full-width page sections
│   └── elements/            # Reusable UI elements
├── config/index.ts          # Site config (theme: "custom")
├── styles/
│   └── custom-overrides.css # ALL CSS lives here
├── docs/
│   ├── rules/               # Non-negotiable rules
│   ├── specs/               # Numbered pre-implementation specs
│   └── explainers/          # Reference docs (animations, responsive, etc.)
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
