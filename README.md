# Keystone Customer Site Template

Automated template for new Keystone customer websites.

---

## 🤖 How It Works

1. **Customer onboarding** → Rails creates `Website` record with unique slug
2. **GitHub repo creation** → Python agent creates repo from this template
3. **Automatic deployment** → Site goes live at `[slug].localkeystone.com`

---

## 📁 Structure

```
customer-site-template/
├── app/                  # Next.js pages (SSR)
├── config/               # Site config (navigation, theme)
├── styles/               # Custom CSS overrides
├── public/               # Static assets
└── package.json          # Dependencies
```

---

## 🎨 Customization Per Customer

When you need to modify or extend components from `keystone-design-bootstrap`, follow this hierarchy:

### Component Customization

```
components/
├── sections/      # Custom or wrapped section components
└── elements/      # Custom or wrapped element components
```

#### 1. Prop-Based Customization (Preferred)
Use when the existing component supports the customization through props.
- Pass custom titles, subtitles, data, and configuration
- No new components needed
- Cleanest approach

#### 2. Wrapper Components (Light Customization)
Use when you need to add behavior or small tweaks to existing components.
- Create wrapper in `components/sections/` or `components/elements/`
- Import the base component from design system
- Add custom logic, extra elements, or modified layout around it
- Example use cases: Adding a play button overlay, extra CTA buttons, modified layout

#### 3. Custom Components (Heavy Customization)
Use when you need completely different structure or behavior.
- Copy/paste the original component from `keystone-design-bootstrap` as starting point if applicable
- Modify as needed
- **Always use atomic foundational elements** from design system (Button, Card, PhotoWithFallback, MarkdownRenderer, etc.)
- Ensure styles and format match other pages
- Don't create basic elements from scratch - reuse from design system


### Guidelines

#### Style Consistency
- Match the look and feel of existing pages
- Use the same spacing, typography, and color patterns
- Import and reuse atomic elements (Button, Card, etc.) from design system
- Copy/paste from similar existing components to maintain consistency

#### Quality Standards
- Lint and build after changes
- Resolve 100% of warnings and errors before committing
- Test responsive behavior on mobile and desktop

#### Import Pattern
```
// Direct from design system
import { ComponentName } from 'keystone-design-bootstrap/sections';

// Custom components
import { CustomComponent } from '@/components/sections';
```

#### Files to Edit:
- `config/index.ts` - Site title, theme, navigation
- `styles/custom-overrides.css` - Custom colors/fonts
- `app/` - Add custom pages

#### Files NOT to Edit:
- `next.config.ts` - Build configuration
- `tsconfig.json` - TypeScript configuration
- `app/globals.css` - CSS import structure

---

## 📦 Dependencies

```bash
npm install
```

---

## 🚀 Development

### Running the Dev Server

The dev server requires two environment variables: `API_URL` and `API_KEY`.

Find the API_KEY:

```bash
cd /path/to/product-mono-repo/apps/api
bin/rails runner "puts AccountUser.where(role: 'api_service', account_id: YOUR_ACCOUNT_ID).first.user.api_key"
```

```bash
# Edit .env.local with your API_URL and API_KEY, or

# Local API server
API_URL="http://localhost:3000/api/v1" API_KEY="your-api-key-here" npm run dev -- --port 4002

# Production API server  
API_URL="https://api.localkeystone.com/api/v1" API_KEY="your-api-key-here" npm run dev -- --port 4002

# Development/Staging API server
API_URL="https://your-ngrok-url.ngrok-free.app/api/v1" API_KEY="your-api-key-here" npm run dev -- --port 4002
```

## 🔧 Local Development with Design Library

For testing changes to `keystone-design-bootstrap` locally before publishing:

```bash
# 1. Create global link in the design library
cd /path/to/keystone/site-builder/keystone-design-bootstrap
npm link

# 2. Link to it in the customer site
cd /path/to/customer-site-template
npm link keystone-design-bootstrap

# 3. Restart dev server
npm run dev
```

**To restore published version:**
```bash
npm unlink keystone-design-bootstrap
npm install keystone-design-bootstrap@latest
```

**Check if linked:**
```bash
ls -la node_modules/keystone-design-bootstrap
# Shows symlink arrow (->) if locally linked
```

---

## ✏️ Style Guidelines

**Use Tailwind classes:**
```tsx
✅ <div className="flex gap-5 bg-primary">
❌ <div style={{ display: 'flex', gap: '20px', backgroundColor: '#fff' }}>
```

**Override styles in custom-overrides.css:**
```css
html[data-theme="aman"] {
  --color-bg-primary: rgb(249, 250, 251) !important;
}
```
