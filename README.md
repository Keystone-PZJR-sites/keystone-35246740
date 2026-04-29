# Keystone Corporate Site — `keystone-35246740`

This is **Keystone's own corporate website**, built on the Keystone platform itself. Unlike other customer sites (which are auto-generated from the standard template and rely almost entirely on `keystone-design-bootstrap` components configured through JSON), this site is a fully custom, agency-built product. It uses GSAP for complex animations and interactions while still leveraging the Keystone platform infrastructure for data fetching, SSR, routing, and design tokens.

> **For the design team / AI agents working in this repo:** This README is your primary source of context. Read it before making decisions about libraries, patterns, or architecture.

---

## Safety Rules — Read Before Touching Anything

These are hard rules. When in doubt, do less, not more.

### Never Delete Files

**Do not delete any file in this repo without explicit instruction.** This includes:

- **Pages that look unused or "orphaned"** — if a page exists under `app/` but doesn't appear in the nav, leave it. It may be linked externally, indexed by search engines, used as a landing page in an ad campaign, or simply not wired into the nav yet. Deleting it breaks live URLs and costs SEO ranking.
- **Components that appear unreferenced** — they may be used dynamically or imported from a path not immediately visible.
- **Config keys that seem redundant** — other parts of the system may depend on them.

If you think something should be removed, flag it in a comment or note — do not remove it unilaterally.

### Never Modify These Files

| File | Why |
|------|-----|
| `next.config.ts` | Controls the build — wrong changes break deployment |
| `tsconfig.json` | TypeScript config — changing paths/aliases breaks imports everywhere |
| `app/globals.css` | CSS import order matters — changing it can silently break the design system |
| `wrangler.jsonc` | Cloudflare Workers deployment config — changes affect production |
| `open-next.config.ts` | Cloudflare adapter — do not touch |
| `package.json` scripts | `build`, `deploy`, `preview` are wired to CI/CD |

### Never Install Packages Without Checking First

Before adding a dependency:
1. Check if the functionality already exists in `gsap`, `keystone-design-bootstrap`, or another installed package
2. Prefer packages that are already in the ecosystem (React Aria for accessible UI, motion for simple transitions, etc.)
3. Do not add packages that conflict with Tailwind CSS v4 or React 19

### Always Build Before Committing

```bash
npm run build
```

If the build fails, do not commit. Fix the error first. A broken build breaks the live site on the next deploy.

### Respect the Data Layer

Data fetching goes through `keystone-design-bootstrap` utilities. Do not:
- Make raw `fetch()` calls to the Keystone API from components — use the provided hooks/helpers
- Store API keys or secrets in code or committed `.env` files
- Add `'use client'` to pages that fetch data — keep server components as server components and push `'use client'` as far down the tree as possible

---

## How This Site Differs from Other Customer Sites

| | Standard Customer Sites | This Site (`keystone-35246740`) |
|---|---|---|
| Components | Config-driven via `keystone-design-bootstrap` | Mix of design-system components + fully custom |
| Animations | None / CSS only | GSAP — complex timelines, scroll effects, etc. |
| Interactivity | Minimal | Rich — parallax, morphing, path following, etc. |
| Built by | Auto-generated | Agency (high-craft, bespoke) |
| Purpose | Customer business pages | Keystone's own marketing / corporate presence |

Despite the differences, this site still uses `keystone-design-bootstrap` for:
- **Data fetching** — hooks and server utilities that talk to the Keystone API
- **SSR helpers** — `getPageData`, caching patterns, etc.
- **Design tokens** — Tailwind CSS theme (colors, spacing, typography)
- **Atomic elements** — `Button`, `Card`, `PhotoWithFallback`, `MarkdownRenderer`, etc.
- **Config schema** — `config/index.ts` still follows the standard shape

---

## Animation Stack: GSAP

[GSAP (GreenSock Animation Platform)](https://gsap.com) is the core animation engine. It is framework-agnostic and works seamlessly with React/Next.js when used carefully (see patterns below).

**Installed version:** `gsap@3.15.0`

### Core GSAP Concepts to Know

```ts
import { gsap } from 'gsap';

// Tween a single element
gsap.to('.hero-title', { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });

// Timeline — chain multiple tweens
const tl = gsap.timeline();
tl.from('.hero-title', { y: 40, opacity: 0, duration: 0.6 })
  .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3');

// Register plugins before using them
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

### React / Next.js Integration Pattern

Always initialize GSAP inside `useLayoutEffect` (or `useGSAP` from `@gsap/react`) and clean up on unmount to avoid memory leaks and SSR issues.

```tsx
'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hero-title',
          start: 'top 80%',
        },
      });
    }, container); // scope all selectors to this container ref

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <div ref={container}>
      <h1 className="hero-title">...</h1>
    </div>
  );
}
```

**Rules:**
- Always wrap GSAP code in `gsap.context()` scoped to a ref — this prevents selector leaks across components
- Always call `ctx.revert()` on cleanup
- Never run GSAP at module level or in SSR — use `'use client'` and `useLayoutEffect`
- Register each plugin once, at the top of the file that first uses it (or in a shared `lib/gsap.ts` setup file)

---

## GSAP Plugins

GSAP has a rich plugin ecosystem. Plugins split into two tiers:

### Free Plugins (included with `gsap` npm package)

| Plugin | Import | What It Does |
|--------|--------|--------------|
| **ScrollTrigger** | `gsap/ScrollTrigger` | Trigger animations based on scroll position; pin, scrub, snap |
| **ScrollTo** | `gsap/ScrollToPlugin` | Smooth scroll to element or position |
| **Draggable** | `gsap/Draggable` | Drag-and-drop with bounds, snapping, inertia |
| **Flip** | `gsap/Flip` | Animate layout changes using the FLIP technique |
| **MotionPath** | `gsap/MotionPathPlugin` | Animate elements along an SVG path |
| **Observer** | `gsap/Observer` | Unified scroll/touch/pointer event observer |
| **TextPlugin** | `gsap/TextPlugin` | Animate text character by character |
| **EasePack** | `gsap/EasePack` | Extra easing functions (SlowMo, ExpoScaleEase, etc.) |
| **CSSPlugin** | `gsap/CSSPlugin` | Auto-included; handles all CSS property tweens |

**Usage:**
```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, Flip, MotionPathPlugin);
```

### Club / Business Plugins (require GSAP license)

These plugins require a GSAP Club or Business Green membership. They are installed via npm using a private registry token (contact the team for credentials). See [GSAP Club docs](https://gsap.com/docs/v3/Installation?tab=npm&module=esm&method=private+registry).

| Plugin | What It Does | Use Case |
|--------|-------------|----------|
| **SplitText** | Split text into chars/words/lines for per-element animation | Hero headlines, staggered reveals |
| **ScrollSmoother** | Smooth virtual scroll (wraps ScrollTrigger) | Silky parallax, full-page smooth scroll |
| **DrawSVG** | Animate SVG stroke drawing | Logo reveals, path drawing effects |
| **MorphSVG** | Morph between SVG shapes | Icon transitions, shape morphing |
| **GSDevTools** | Visual timeline debugger | Development only — never ship to prod |
| **ScrambleText** | Randomize characters before settling on final text | Cyber/hacker-style text reveals |
| **MotionPathHelper** | Visual editor to build motion paths in the browser | Development only |
| **Physics2D** | Physics-based x/y movement (gravity, friction) | Particle effects, playful interactions |
| **PhysicsProps** | Physics for arbitrary CSS properties | Physics on rotation, scale, etc. |
| **Inertia** | Momentum-based tweens (velocity tracking) | Post-drag flick, scroll-linked momentum |
| **CSSRule** | Tween CSS rules / stylesheets directly | Animate pseudo-elements, bulk rule changes |
| **DrawSVG** | Stroke animation for SVG paths | Line drawings, signature effects |
| **Easel** | GSAP + CreateJS/EaselJS canvas integration | Canvas-based animations |
| **Pixi** | GSAP + PixiJS integration | WebGL canvas animations |

**Note:** `GSDevTools`, `MotionPathHelper` should only be imported in development (`process.env.NODE_ENV === 'development'`). Strip them from production builds.

---

## Project Structure

```
keystone-35246740/
├── app/                     # Next.js App Router pages
│   ├── layout.tsx           # Root layout (fonts, global providers)
│   ├── page.tsx             # Homepage
│   ├── about/
│   ├── services/
│   ├── blog/
│   ├── careers/
│   ├── contact/
│   ├── faq/
│   ├── locations/
│   ├── testimonials/
│   ├── privacy-policy/
│   └── terms-of-service/
├── config/
│   └── index.ts             # Site config: title, theme, nav, account ID
├── styles/
│   └── custom-overrides.css # Theme token overrides (Tailwind CSS vars)
├── components/              # Custom components for this site (create as needed)
│   ├── sections/            # Custom/wrapped section-level components
│   └── elements/            # Custom/wrapped atomic elements
└── public/                  # Static assets
```

---

## Design System: `keystone-design-bootstrap`

**Current version:** `^1.0.74`

This package is the shared design system and data layer for all Keystone customer sites. Import from it for:

```ts
// Section-level components
import { HeroSection, ServicesSection } from 'keystone-design-bootstrap/sections';

// Atomic elements
import { Button, Card, PhotoWithFallback } from 'keystone-design-bootstrap/elements';

// Data fetching (server components / route handlers)
import { getPageData, getServices } from 'keystone-design-bootstrap/data';
```

When `keystone-design-bootstrap` components don't fit the custom design, follow this hierarchy:

1. **Prop customization** — pass custom data, className, or config props first
2. **Wrapper component** — wrap the base component, add behavior around it
3. **Full custom component** — write from scratch, but still use atomic elements from the design system (never reinvent `Button`, `Card`, etc.)

---

## Creating Custom CSS

All CSS customization lives in `styles/custom-overrides.css`. This file is already imported in the correct order — do not move or rename it.

### Theme Token Overrides

The design system exposes CSS custom properties (variables) for colors, spacing, typography, and more. Override them scoped to the site's theme attribute:

```css
html[data-theme="keystone"] {
  --color-bg-primary: #0a0a0a;
  --color-text-primary: #f5f5f5;
  --color-accent: #6c47ff;
}
```

To see all available tokens, look at the Tailwind config exported from `keystone-design-bootstrap` or inspect `node_modules/keystone-design-bootstrap/styles/`.

### Component-Level Custom CSS

For one-off styles on custom components, use Tailwind utility classes first. Only fall back to `custom-overrides.css` for:
- CSS that Tailwind can't express (complex `::before`/`::after`, `clip-path`, SVG filters, etc.)
- Targeting third-party or design-system elements you can't add a `className` to

```css
/* Target a design-system component you can't directly className */
html[data-theme="keystone"] .ks-hero-section {
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
}
```

### Animation CSS

For CSS-driven animations (that don't need GSAP), add them in `custom-overrides.css`. Always pair with `prefers-reduced-motion`:

```css
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-slide-up {
  animation: fadeSlideUp 0.6s ease-out forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-slide-up {
    animation: none;
    opacity: 1;
  }
}
```

### What NOT to Do with CSS

- No `style={{ }}` inline styles — use Tailwind classes
- No new `.css` files scattered in `components/` — keep everything in `custom-overrides.css`
- Do not import any CSS file in `app/globals.css` — it has a specific import order managed by the design system
- Do not override Tailwind's base reset or preflight

---

## Creating Custom Components

### Where to Put Things

```
components/
├── sections/     # Full-width page sections (Hero, About, Features, etc.)
│   └── index.ts  # Re-export all sections here
└── elements/     # Small reusable pieces (custom buttons, cards, badges, etc.)
    └── index.ts  # Re-export all elements here
```

If `components/` doesn't exist yet, create it. If `index.ts` barrel files don't exist, create them too.

### Naming Conventions

- Files: `PascalCase.tsx` — e.g. `HeroSectionCustom.tsx`, `AnimatedCounter.tsx`
- Exports: named exports only, no default exports
- Suffix wrappers with the type they wrap: `HeroSectionWithVideo.tsx` wraps `HeroSection`

### How to Create a New Custom Section

1. Create the file in `components/sections/YourSectionName.tsx`
2. Mark it `'use client'` only if it needs interactivity or GSAP animations
3. Import atomic elements from `keystone-design-bootstrap` — never build a `Button` or `Card` from scratch
4. Export it from `components/sections/index.ts`
5. Use it in the relevant page under `app/`

**Template:**

```tsx
'use client'; // only if needed for GSAP or interactivity

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from 'keystone-design-bootstrap/elements';

gsap.registerPlugin(ScrollTrigger);

interface YourSectionNameProps {
  title: string;
  subtitle?: string;
}

export function YourSectionName({ title, subtitle }: YourSectionNameProps) {
  const container = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.section-title', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.section-title', start: 'top 80%' },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="py-24 px-6">
      <h2 className="section-title text-4xl font-bold">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-secondary">{subtitle}</p>}
      <Button className="mt-8">Get Started</Button>
    </section>
  );
}
```

### How to Create a Wrapper Component

Use when you need small changes to an existing design-system component without replacing it entirely:

```tsx
import { HeroSection } from 'keystone-design-bootstrap/sections';
import type { HeroSectionProps } from 'keystone-design-bootstrap/sections';

interface HeroSectionWithVideoProps extends HeroSectionProps {
  videoUrl: string;
}

export function HeroSectionWithVideo({ videoUrl, ...props }: HeroSectionWithVideoProps) {
  return (
    <div className="relative">
      <HeroSection {...props} />
      <video
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
    </div>
  );
}
```

### Adding a New Page

1. Create a folder under `app/` — e.g. `app/team/`
2. Add a `page.tsx` inside it — this becomes the route at `/team`
3. Use server component by default (no `'use client'` at the page level)
4. Fetch data using `keystone-design-bootstrap` utilities at the page level, pass down as props
5. If the page should appear in the nav, add it to `config/index.ts`

**Do not delete existing page folders**, even if they seem empty or unused — see Safety Rules above.

### Local Development with the Design Library

```bash
# Link local design system for live development
cd /path/to/keystone/site-builder/keystone-design-bootstrap
npm link

cd /path/to/keystone/site-builder/customer-sites/keystone-35246740
npm link keystone-design-bootstrap
npm run dev

# Restore published version
npm unlink keystone-design-bootstrap
npm install keystone-design-bootstrap@latest
```

---

## Development

### Running the Dev Server

```bash
# Local API
API_URL="http://localhost:3000/api/v1" API_KEY="your-api-key" npm run dev -- --port 4002

# Production API
API_URL="https://api.localkeystone.com/api/v1" API_KEY="your-api-key" npm run dev -- --port 4002
```

**Finding your API key:**
```bash
cd /path/to/proto-product-mono-repo/apps/api
bin/rails runner "puts AccountUser.where(role: 'api_service', account_id: YOUR_ACCOUNT_ID).first.user.api_key"
```

### Build & Deploy

```bash
npm run build          # Next.js production build
npm run preview        # Build + run locally via Cloudflare Workers (opennextjs)
npm run deploy         # Build + deploy to Cloudflare Workers
```

---

## Style Guidelines

**Tailwind classes only — no inline styles:**
```tsx
✅ <div className="flex gap-5 bg-primary">
❌ <div style={{ display: 'flex', gap: '20px' }}>
```

**Theme overrides in `styles/custom-overrides.css`:**
```css
html[data-theme="keystone"] {
  --color-bg-primary: rgb(249, 250, 251) !important;
}
```

**Quality bar:**
- Zero lint/TypeScript errors before committing
- Test responsive behavior (mobile + desktop)
- Animations must respect `prefers-reduced-motion` — wrap GSAP animations in a check or use GSAP's `matchMedia` utility

```ts
// Respect reduced motion
gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  // all your GSAP animation code here
});
```

---

## Quick Reference: What to Edit

| What you want to do | Where to do it |
|---------------------|----------------|
| Change site title, nav links, theme | `config/index.ts` |
| Override design token colors/fonts | `styles/custom-overrides.css` |
| Add a new page | Create `app/your-page/page.tsx` |
| Add a custom section component | `components/sections/YourSection.tsx` |
| Add a custom element/widget | `components/elements/YourElement.tsx` |
| Add a GSAP animation | Inside `useLayoutEffect` + `gsap.context()` in a `'use client'` component |
| Add a CSS animation | `styles/custom-overrides.css` with `prefers-reduced-motion` fallback |
| Add a new npm package | `npm install <package>` — check it doesn't conflict first |

See **Safety Rules** at the top for the full list of files never to modify or delete.
