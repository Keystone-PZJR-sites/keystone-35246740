# Spec 001 — Splash Page Alpha

**Status:** Draft  
**Figma:** [ks-BrandID, node 915:2616](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=915-2616&m=dev)  
**Output:** `app/page.tsx` — single-page homepage  
**Depends on:** Design tokens + `@font-face` in `styles/custom-overrides.css`, FK font files in `public/fonts/`

---

## Scope

Build the Keystone corporate homepage as a standalone single page. This is a pure visual/marketing implementation — no multi-page navigation, no forms wired to backends, no sub-pages linked.

### In scope
- All 9 sections from the Figma (see below)
- Desktop layout (1440px Figma width)
- Tablet and mobile responsive adaptation
- Static content passed via props in `app/page.tsx`
- GSAP scroll animations (added last, after layout is verified)
- `getCompanyInformation()` API call — used only for the sign-up/portal CTA href

### Out of scope
- Any existing orphaned pages (`/about`, `/services`, `/blog`, etc.) — leave untouched
- Multi-page nav header (Phase 2)
- Sitemap footer (the Footer CTA section IS the footer for Phase 1)
- Mobile hamburger menu (Phase 2)
- Newsletter/email form submission logic — UI only
- Blog rendering
- Any page other than `/`

---

## Sections

Build in this order. Each section must build and render correctly before starting the next.

### Pre-work: Tokens + Elements

Before any section work:

1. Write all CSS custom properties into `styles/custom-overrides.css` under `[data-theme="custom"]` — look at the Figma for exact values (colors, fonts, spacing, radius)
2. Set up `@font-face` declarations for FK fonts (files go in `public/fonts/`)
3. Set base body background and font on `[data-theme="custom"] body`
4. Build reusable elements: `VideoClip`, `PillLabel`, `PillButton`, `ButtonGroup`, `SectionHeadline`, `CategoryTab` — all in `components/elements/` before touching sections

---

### Section 1 — Hero

**Figma nodes:** `915:2619` (bg), `915:2663` (video), `915:2666` (nav)  
**Component:** `HeroSection`

Full-viewport dark green (`#042019`) section. Looping video background. Massive FK Screamer headline in two lines. Minimal pill-shaped nav — Keystone logo left, Login button right.

---

### Section 2 — Category Strip

**Figma nodes:** `946:472`, `946:460`, `946:483`  
**Component:** `CategoryStripSection`

Cream background (`#f0eee6`). Horizontal row of 5 business category tabs in FK Screamer 50px — active tab in coral (`#f57e56`), inactive in muted parchment (`#cbc5b4`). Below: a dot-separated industry marquee in FK Grotesk Mono. Below that: a centered body subheadline.

---

### Section 3 — UI Showcase

**Figma nodes:** `946:358`, `946:419`, `946:391`, `946:324`  
**Component:** `UIShowcaseSection`

Cream background. Four floating UI mockup cards side-by-side with subtle vertical offsets: a mobile social ad card, an iPhone AI-chat mockup (with `border-radius: 56px`), an Instagram post card, and a large glassmorphism website preview card (`backdrop-blur`). All images come from props.

---

### Section 4 — Every Touchpoint

**Figma node:** `915:2680`  
**Component:** `TouchpointSection`

Cream background with looping video. Large FK Screamer headline: "Every touchpoint and every surface, done-for-you." Seven feature label chips (`PillLabel`) scattered across the section at specific absolute positions from the Figma. Colors per chip: Web `#5bc3b3`, Content `#f38bb0`, Ads `#ff7c1f`, Reviews `#f6523c`, Leads `#f2ba46`, Sales `#56a6ff`, Social `#9c65ee`.

---

### Section 5 — Product Screen

**Figma node:** `915:2712`  
**Component:** `ProductScreenSection`

Warm dark brown (`#3a2a0e`) rounded card (`border-radius: 20px`) inset 24px from viewport edges. Product dashboard screenshot positioned to the right, bleeding off-edge. Seven filter pill chips along the top center — one active chip (Leads, `bg-[#f1c131]`), rest bordered (`border-color: #594117`). Yellow FK Grotesk quote text (`#f2ba46`) bottom-left.

---

### Section 6 — Not an Agency

**Figma nodes:** `915:2790`, `915:2791`, `915:2797`–`915:2818`  
**Component:** `NotAnAgencySection`

Cream background. Top row: left-aligned FK Grotesk headline + right-aligned button group (`ButtonGroup`). Below: three equal-width columns, each with a rounded-top video/photo card, an SVG corner-cut decoration, an FK Screamer label in 50px, and a body paragraph. Each column has its own color scheme.

---

### Section 7 — Great Businesses Deserve to Be Found

**Figma node:** `915:2757`  
**Component:** `FoundSection`

Dark teal (`#0d2a28`). FK Screamer headline "Great BUSINESSES deserve to be found." at 128px, centered. Scattered photos and videos at exact Figma coordinates — use absolute positioning within a `relative` container. Small decorative sparkle SVG icons at 3–4 positions.

---

### Section 8 — Pricing

**Figma node:** `950:877`  
**Component:** `PricingSection`

Near-black teal (`#0a1f1e`). Top label in FK Screamer. Left: FK Roman "One plan, one price" at 64px. Right: large "$49" in FK Screamer 184px mint-light (`#9febd7`). Center: 9 feature `PillLabel` chips in two rows (bordered, icon + text). Bottom: two "add-on" chips with `+` icon. Coming-soon descriptions below.

---

### Section 9 — Footer CTA

**Figma node:** `915:2620`  
**Component:** `FooterCTASection`

Dark burgundy (`#3d1719`). Four-line cascading FK Screamer headline at 216px, each line offset progressively right for editorial stagger. Scattered video clips between headline lines. Bottom: left tagline + right newsletter block (email placeholder + Sign Up CTA). Double CTA button group bottom-left. Large "keystone" SVG wordmark at the very bottom.

---

## Build Checklist (Acceptance Criteria)

Design these test cases before writing any code. Each item must be manually verified before the spec is marked complete.

### Visual Fidelity
- [ ] All 9 sections are present and render in the correct order
- [ ] Section background colors match the Figma exactly
- [ ] FK Screamer headlines render at the correct size, weight, and line-height (0.82)
- [ ] FK Grotesk body text renders at correct sizes with correct tracking
- [ ] FK Grotesk Mono renders correctly in the pricing and marquee sections
- [ ] Feature label chips have correct background colors for each feature
- [ ] Pill buttons have correct border-radius (9999px), colors, and spacing

### Video
- [ ] All background videos autoplay on page load with no controls visible
- [ ] Videos are `muted`, `loop`, `playsInline`
- [ ] Videos do not cause layout shift on load
- [ ] Videos do not block scroll on touch devices

### Responsive
- [ ] 390px (mobile): no horizontal overflow, all text readable, no clipping
- [ ] 768px (tablet): layout shifts correctly, category strip fits
- [ ] 1280px (desktop threshold): matches Figma proportionally
- [ ] 1440px: pixel-close match to Figma
- [ ] FK Screamer headlines scale down gracefully on mobile (not absurdly large)
- [ ] Category strip is horizontally scrollable on mobile without showing scrollbar

### Build & Code Quality
- [ ] `npm run build` passes with zero errors and zero warnings
- [ ] Zero TypeScript errors (`tsc --noEmit`)
- [ ] Zero ESLint errors or warnings
- [ ] No hardcoded content strings in component files — everything via props
- [ ] No `style={{}}` inline styles except CSS variable passthrough

### Animations (after layout is complete)
- [ ] Hero headline animates in on load
- [ ] Feature chips in TouchpointSection scatter in on scroll
- [ ] Sections have entrance animations on scroll
- [ ] All animations are wrapped in `gsap.matchMedia()` for `prefers-reduced-motion`
- [ ] Enabling "Reduce Motion" in OS settings disables all GSAP animations
- [ ] No scroll jank or dropped frames (test on a real mobile device)

### Accessibility
- [ ] All images have `alt` text (`alt=""` for decorative)
- [ ] All autoplaying videos are `muted`
- [ ] Interactive elements (Login button, CTA buttons) are keyboard-navigable
- [ ] Focus states are visible on interactive elements

### Data
- [ ] `getCompanyInformation()` is called in `app/page.tsx` and `portal_url` is used for the sign-up CTA
- [ ] If `portal_url` is null, the CTA falls back gracefully (e.g. `/contact`)
