# Spec 001 — Splash Page Alpha

**Status:** Draft  
**Figma file:** `XRbD11WIevI5szRFiRrguZ` — [ks-BrandID, node 915:2616](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=915-2616&m=dev)  
**Output:** `app/page.tsx` — single-page homepage  
**Depends on:** FK font files in `public/fonts/`, CSS tokens in `styles/custom-overrides.css`

---

## Font Variants

These are the exact `font-family` names needed for `@font-face` declarations:

| Name | CSS family string | Usage |
|------|------------------|----|
| FK Screamer Bold | `FK_Screamer:Bold` | Hero headlines, category tabs, touchpoint, footer, pricing price |
| FK Screamer Legacy Upright | `FK_Screamer_Legacy_Trial:Upright` | Not an Agency cols 2 & 3 |
| FK Grotesk Neue Trial Regular | `FK_Grotesk_Neue_Trial:Regular` | All body text, buttons, nav |
| FK Grotesk Mono Trial Regular | `FK_Grotesk_Mono_Trial:Regular` | Category marquee, pricing subtext |
| FK Roman Standard Trial Light | `FK_Roman_Standard_Trial:Light` | Pricing plan name |

---

## Scope

Build the Keystone corporate homepage as a standalone single page.

### In scope
- All 9 sections from the Figma
- Desktop layout (1440px Figma width)
- Tablet and mobile responsive adaptation
- Static content passed as props in `app/page.tsx`
- GSAP scroll animations (added last, after layout is verified)
- `getCompanyInformation()` API call — used only for the sign-up/portal CTA href

### Out of scope
- Any existing orphaned pages (`/about`, `/services`, `/blog`, etc.) — leave untouched
- Multi-page nav header (Phase 2)
- Sitemap footer (the Footer CTA section IS the footer for Phase 1)
- Mobile hamburger menu (Phase 2)
- Newsletter/email form submission logic — UI only
- Any page other than `/`

---

## Pre-work: Tokens + Elements

Before any section work:

1. Write all CSS custom properties into `styles/custom-overrides.css` under `[data-theme="custom"]` — colors, font stacks, radius, spacing
2. Set up `@font-face` declarations for all five FK font variants (files go in `public/fonts/`)
3. Set base body background (`#f0eee6`) and default font on `[data-theme="custom"] body`
4. Build reusable elements — `VideoClip`, `PillLabel`, `PillButton`, `ButtonGroup`, `SectionHeadline`, `CategoryTab` — all in `components/elements/` before touching sections

---

## Sections

The page is a single 1440px-wide Figma frame. Sections are stacked vertically. Build in this order — each section must build and render correctly before moving to the next.

---

### Section 1 — Hero

**Figma nodes:** `915:2619` (bg), `915:2663` (video), `915:2666` (nav), `915:2664`–`915:2665` (headlines)  
**Component:** `HeroSection`  
**Height:** 1048px

**Background:** Dark green `#042019`, full-width.

**Nav bar:** Pill-shaped, bg `#042019`, 1344px wide, centered, `px-[48px] py-[20px]`. Keystone SVG logo on the left. Login button on the right — bg `#6ecc8b`, text `#042019`, 16px FK Grotesk, with a right-arrow icon.

**Video:** Full-width looping video, 1392px wide (24px margin each side), 1024px tall, no border-radius.

**Headlines:** Two stacked FK Screamer Bold lines, 216px, cream `#f0eee6`, `line-height: 0.82`, uppercase, positioned over the video:
- Line 1: "ALWAYS ON "
- Line 2: "SALES & MARKETING"

---

### Section 2 — UI Showcase

**Figma nodes:** `946:358` (social ad), `946:419` (iPhone), `946:391` (Instagram), `946:324` (website), `946:483` (subheadline)  
**Component:** `UIShowcaseSection`  
**Height:** ~927px (1048px → 1975px)

**Background:** Cream `#f0eee6` (the page base — no separate bg element needed).

**Subheadline:** "Marketing that works as hard as you do." — centered, FK Grotesk Neue Trial, 32px, `#042019`, `tracking: -0.96px`.

**Four floating UI mockup cards:** Positioned in a single horizontal row. All anchored at the same top, varying heights create the stagger effect. The leftmost card bleeds slightly off the left edge.

| Card | Width | Height | Left position | bg |
|------|-------|--------|--------------|--|
| Social ad (946:358) | 284px | 594px | -18px (bleeds left) | `#e0ddd1` |
| iPhone chat (946:419) | 302px | 638px | `calc(14.29% + 92px)` | `#e9e7dd`, `border-radius: 56px` |
| Instagram post (946:391) | 292px | 424px | `calc(42.86% + 14px)` | `#e0ddd1`, `backdrop-blur` |
| Website preview (946:324) | 868px | 583px | `calc(64.29% + 30px)` | `#e9e7dd`, `backdrop-blur`, `border-radius: 16px` |

All card content (images, mock UI) comes from props.

---

### Section 3 — Category Strip

**Figma nodes:** `946:472` (tabs), `946:460` (marquee)  
**Component:** `CategoryStripSection`  
**Height:** ~320px (1975px → 2295px)

**Background:** Cream `#f0eee6`.

**Category tabs:** Five tabs in a centered horizontal row, FK Screamer Bold, 50px, `line-height: 0.82`, uppercase, `px-[8px] py-[16px]`:

| Label | State | Color |
|-------|-------|-------|
| HEALTH & BODY | Active | `#f57e56` |
| FOOD & DRINK | Inactive | `#cbc5b4` |
| HOME & PROPERTY | Inactive | `#cbc5b4` |
| MONEY & BUSINESS | Inactive | `#cbc5b4` |
| CARE & MAINTENANCE | Inactive | `#cbc5b4` |

**Industry marquee:** Centered below the tabs. FK Grotesk Mono Trial, 20px, coral `#f57e56`, dot-separated: "Fitness • Wellness • Beauty • Grooming • Medical • Dental"

---

### Section 4 — Every Touchpoint

**Figma node:** `915:2680`  
**Component:** `TouchpointSection`  
**Height:** 1024px

**Background:** Cream `#f0eee6` with a full-bleed looping video overlay.

**Headline:** "Every touchpoint and every surface, done-for-you." — FK Screamer Bold, 216px, cream `#f0eee6`, centered, `line-height: 0.82`, 1238px wide.

**Seven feature chips:** Absolutely positioned within the 1440px × 1024px section. Each chip has a small filled dot + label. The Leads chip uses dark text/dot on yellow — all others use cream `#f0eee6` text/dot.

| Label | bg | dot color | text color | left | top |
|-------|-----|-----------|-----------|------|-----|
| Web | `#5bc3b3` | `#f0eee6` | `#f0eee6` | 299px | 830px |
| Content | `#f38bb0` | `#f0eee6` | `#f0eee6` | 1116px | 745px |
| Ads | `#ff7c1f` | `#f0eee6` | `#f0eee6` | 583px | 559px |
| Reviews | `#f6523c` | `#f0eee6` | `#f0eee6` | 1252px | 283px |
| Leads | `#f2ba46` | `rgba(58,42,14,0.7)` | `rgba(58,42,14,0.7)` | 473px | 142px |
| Sales | `#56a6ff` | `#f0eee6` | `#f0eee6` | 896px | 382px |
| Social | `#9c65ee` | `#f0eee6` | `#f0eee6` | 86px | 453px |

Chip style: `px-[16px] py-[8px]`, `border-radius: 9999px`, 18px FK Grotesk, dot is 10px square.

---

### Section 5 — Product Screen

**Figma node:** `915:2712`  
**Component:** `ProductScreenSection`  
**Height:** 973px

**Container:** Warm dark brown `#3a2a0e`, `border-radius: 20px`, 1392px wide (24px inset each side), centered.

**Product screenshot:** `imgImage40` positioned right-of-center, bleeds off the right edge, `border-radius: 23px`.

**Seven filter chips** centered near the top of the card. One active (Leads), rest bordered:

| Label | Style | dot color |
|-------|-------|-----------|
| Web | Bordered `#594117` | `#5bc3b3` |
| Leads | Filled `#f1c131`, text `#3a2a0e` | `#3a2a0e` |
| Ads | Bordered `#594117` | `#f57e56` |
| Social | Bordered `#594117` | `#9c65ee` |
| Sales | Bordered `#594117` | `#56a6ff` |
| Reviews | Bordered `#594117` | `#ff6f5c` |
| Content | Bordered `#594117` | `#f297b7` |

Chip style: `px-[14px] py-[6px]`, `border-radius: 9999px`, `border-width: 1.346px`, 15.2px FK Grotesk, dot is 9px.

**Quote text:** Bottom-left of the card. FK Grotesk Neue Trial, 32px, `#f2ba46`, `tracking: -0.96px`, `line-height: 1.2`, `width: 412px`:
"Every inbound lead gets a reply in minutes — 24/7 — so warm interest never goes cold."

**Sparkle icon** (SVG) at `left: 48px, top: 667px` within the card.

---

### Section 6 — Not an Agency

**Figma nodes:** `915:2790` (headline), `915:2791` (button group), `915:2797`–`915:2803` (video cards), `915:2804`, `915:2814`, `915:2815` (labels), `915:2813`, `915:2817`, `915:2818` (body text)  
**Component:** `NotAnAgencySection`  
**Height:** ~915px

**Background:** Cream `#f0eee6`.

**Top row:** Left-aligned headline + right-aligned button group.
- Headline: "Not an agency. Not software. Something better." — FK Grotesk Neue Trial, 32px, `#0f223d`, `tracking: -0.96px`
- Button group: `bg: #e0ddd1` pill container. "Learn more" button — bg `#f0eee6`, text `#5d5a56`. "Get started" button — bg `#5d5a56`, text `#f0eee6`, with right-arrow icon.

**Three equal columns** (each 448px wide, `left: 24px`, `left: calc(28.57% + 84px)`, `left: calc(64.29% + 42px)`):

| | Col 1 | Col 2 | Col 3 |
|--|-------|-------|-------|
| Top | Looping video, rounded-top (10px top radius) | Looping video, rounded-top | Looping video, rounded-top |
| Below video | SVG corner-cut decoration (from props) | SVG corner-cut decoration | SVG corner-cut decoration |
| Label text | "SALES & MARKETING expertise" | "output\noriented" | "LOCAL BUSINESS\nEXPERIENCE" |
| Label font | FK Screamer Bold | FK Screamer Legacy Trial: Upright | FK Screamer Legacy Trial: Upright |
| Label size | 50px | 50px | 50px |
| Label color | `#0d2a28` | `#3a2a0e` | `#3d1324` |
| Body text | "Your Growth Partner knows your trade and your market, providing strategy and oversight from someone fluent in your business." | "Every output earns your name on it, websites, ads, social, follow-ups, etc. Each built to the same standard you set for your services." | "For every vertical we serve, we've done the work to understand. You get strategy and deliverables informed by deep context." |
| Body font | FK Grotesk, 22px | FK Grotesk, 22px | FK Grotesk, 22px |
| Body color | `#0d2a28` | `#3a2a0e` | `#3d1324` |

---

### Section 7 — Great Businesses Deserve to Be Found

**Figma node:** `915:2757`  
**Component:** `FoundSection`  
**Height:** 1024px

**Background:** Dark teal `#0d2a28`.

**Headline:** Two-line, centered, FK Screamer Bold, 128px, cream `#f0eee6`, `line-height: 0.82`, `width: 953px`:
- "Great BUSINESSES "
- "deserve to be found."

**Six scattered media elements** — absolutely positioned within the 1440px × 1024px frame:

| Node | Type | left | top | width | height |
|------|------|------|-----|-------|--------|
| 915:2759 | Video | 934px | 684px | 381px | 267px |
| 915:2760 | Video | 0px | 503px | 275px | 214px |
| 915:2761 | Video | 226px | 60px | 382px | 214px |
| 915:2762 | Video | 328px | 768px | 178px | 100px |
| 915:2763 | Still image | 1238px | 287px | 178px | 100px |
| 915:2764 | Video | 833px | 87px | 277px | 156px |

All media elements have `border-radius: 5px`.

**Five sparkle SVG icons** at positions: `(267, 496)`, `(498, 760)`, `(1307, 677)`, `(594, 52)` (this one is rotated 45°), `(1099, 82)`. The sparkle SVG comes from props.

---

### Section 8 — Pricing

**Figma node:** `950:877`  
**Component:** `PricingSection`  
**Height:** 1039px

**Background:** Near-black teal `#0a1f1e`.

**Left column** (starting `left: calc(50% - 595px)`, top 132px):
- Plan name: "Always on sales\n& marketing." — FK Roman Standard Trial: Light, 56px, `#5bc3b3`, `tracking: -1.12px`, `line-height: 1.12`
- Sub-text below: "No contracts. No negotiation, transparent pricing." — FK Grotesk Mono Trial, 16px, `#5bc3b3`, `tracking: -0.32px`

**Right column** (right-aligned, `left: calc(50% + 595px)`, top 132px):
- Price: "$49" — FK Screamer Bold, 184px, mint `#9febd7`, right-aligned
- "per month" — FK Grotesk Mono Trial, 16px, `#5bc3b3`, right-aligned, below the price

**Nine feature chips** — centered, flex-wrap, `width: 1177px`, top 410px. All chips are bordered (`#19524e`, 1.42px), bg transparent, text `#f8f7f2`, 21px FK Grotesk, 54px tall, `border-radius: 9999px`, `px-[20px]`. Each has a unique SVG icon (from props) + label:

| Label | | Label | | Label |
|-------|--|-------|--|-------|
| Your Website | | Your CRM | | Your Ads |
| Your Sales | | Your Front Desk | | Your Social |
| Your Reviews | | Your Content | | Your Listings |

**Description text** below chips at top 564px, centered, FK Grotesk Mono Trial, 12px, `#5bc3b3`:
"Includes 2 blog and 2 social posts per month. Add credits for extra agent work."

**Add-ons row** at top 682px. "ADD ONS" label centered in FK Screamer Bold, 40px, `#5bc3b3`. Two add-on chips — bg `#0d2a28`, text `#5bc3b3`, 21px FK Grotesk, `border-radius: 9999px`, each with a `+` icon:

| Label | left | Description below |
|-------|------|-------------------|
| Marketplace | 265px | "Checkout, memberships, and bookings from Keystone's consumer platform." |
| Payments | 984px | "Standard payment processing on transactions." |

Both add-ons have a "Coming soon." note in `#f8f7f2` below the description.

---

### Section 9 — Footer CTA

**Figma node:** `915:2620`  
**Component:** `FooterCTASection`  
**Height:** 2095px

**Background:** Dark burgundy `#3d1719`.

**Four-line cascading FK Screamer headline**, 216px, coral `#f57e56`, `line-height: 0.82`, uppercase. Each line is offset progressively to the right:

| Line | Text | left (within 1440px frame) | approx top |
|------|------|--------------------------|-----------|
| 1 | FOR BUSINESSES | ~24px | ~38px |
| 2 | THAT ARE | ~234px | ~237px |
| 3 | DONE FIGURING | ~500px | ~436px |
| 4 | IT OUT THEMSELVES | ~24px | ~635px |

**Five scattered video clips** in the upper portion of the footer frame:

| Node | left | top | width | height |
|------|------|-----|-------|--------|
| 915:2652 | 998px | 39px | 417px | 166px |
| 915:2653 | 19px | 242px | 189px | 163px |
| 915:2651 | 799px | 237px | 617px | 168px |
| 915:2649 | 19px | 445px | 480px | 158px |
| 915:2650 | 1169px | 635px | 247px | 168px |

All video clips have `border-radius: 2px`.

**Sparkle SVG icon** at `left: 26px, top: 1435px`.

**Bottom area** (top ~1536px):

Left side:
- Tagline: "The modern growth team for local business." — FK Grotesk, 22px, coral `#f57e56`, `width: 243px`
- Button group at top ~1671px: coral-bordered pill container. "Learn more" — bg `#f57e56`, text `#3d1719`. "Get started" — bg `#ffbb8a`, text `#3c1618`, with right-arrow icon.

Right side (centered around `left: calc(50% + 303px)`):
- Newsletter copy at top ~1536px: "Stay informed about our latest features and product releases" — FK Grotesk, 22px, coral, `width: 388px`
- Email placeholder: "Email Address" — FK Grotesk, 22px, coral, at top ~1695px
- Sign Up button at top ~1671px: coral-bordered pill, bg `#ffbb8a`, text "Sign Up" with right-arrow icon

**Keystone wordmark SVG** at the very bottom-right of the footer.

---

## Build Checklist (Acceptance Criteria)

### Visual Fidelity
- [ ] All 9 sections present and in the correct order
- [ ] Section background colors match the Figma exactly
- [ ] FK Screamer headlines render at the correct size and `line-height: 0.82`
- [ ] FK Screamer Legacy Upright is used (not FK Screamer Bold) for Not an Agency cols 2 & 3
- [ ] FK Roman Standard Trial Light is used for pricing plan name
- [ ] Chip dot/text colors on the Leads chip are dark, not cream
- [ ] All seven Product Screen chips render correctly — active Leads chip is yellow-filled, rest bordered
- [ ] Not an Agency: three columns each render with their own label font, label color, and body text color
- [ ] Footer headline: four lines with the correct stepped left-offset cascade

### Video
- [ ] All videos are `autoPlay muted loop playsInline`
- [ ] No layout shift on video load
- [ ] Videos do not block scroll on touch

### Responsive
- [ ] 390px (mobile): no horizontal overflow, all text readable, no clipping
- [ ] 768px (tablet): layout shifts correctly
- [ ] 1280px: matches Figma proportionally
- [ ] 1440px: pixel-close to Figma
- [ ] Touchpoint chips switch from absolute to flex-wrap on mobile
- [ ] Category strip is horizontally scrollable on mobile without showing a scrollbar

### Build & Code Quality
- [ ] `npm run build` passes with zero errors and zero warnings
- [ ] Zero TypeScript errors
- [ ] Zero ESLint errors or warnings
- [ ] No hardcoded content strings in component files — everything via props
- [ ] No `style={{}}` except CSS variable passthrough

### Animations (add after layout is complete)
- [ ] Hero headline animates in on load
- [ ] Touchpoint chips scatter in on scroll
- [ ] Sections have entrance animations on scroll
- [ ] All animations wrapped in `gsap.matchMedia()` for `prefers-reduced-motion`
- [ ] Enabling "Reduce Motion" in OS settings stops all animations
- [ ] No scroll jank on mobile

### Accessibility
- [ ] All images have `alt` text (`alt=""` for decorative)
- [ ] All autoplaying videos are `muted`
- [ ] Interactive elements are keyboard-navigable
- [ ] Focus states are visible

### Data
- [ ] `getCompanyInformation()` is called in `app/page.tsx`
- [ ] `portal_url` is used for the sign-up CTA — falls back to `/contact` if null
