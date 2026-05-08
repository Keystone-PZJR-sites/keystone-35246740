# Spec 012 — Work Showcase: Industry-Specific Assets

**Status:** Active

**Figma file:** `XRbD11WIevI5szRFiRrguZ`

**Figma nodes — industry rows (both states):**

| Industry | Desaturated (default) | Saturated (focused) |
| --- | --- | --- |
| Health & Body | [`1116:4276`](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1116-4276&m=dev) | [`1116:4443`](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1116-4443&m=dev) |
| Food & Drink | [`1152:745`](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1152-745&m=dev) | [`1125:5347`](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1125-5347&m=dev) |
| Home & Property | [`1165:782`](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1165-782&m=dev) | [`1152:1022`](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1152-1022&m=dev) |
| Money & Business | [`1200:5383`](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1200-5383&m=dev) | [`1165:1161`](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1165-1161&m=dev) |
| Care & Maintenance | [`1204:656`](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1204-656&m=dev) | [`1202:497`](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1202-497&m=dev) |

Both states must be checked for **every card of every type** — the desaturated node shows the default render (warm greyscale tones, exact background colors, exact text content) and the saturated node shows the focused render (full color, vivid brand colors). Neither state can be skipped or inferred from the other.

---

## Background

The Work Showcase section displays 25 cards across 5 industries (5 cards per industry). The original implementation built out Health & Body (X2O Studio) in full and used those assets as placeholders for the remaining four industries. This spec covers replacing all placeholders with real, industry-specific assets and the correct process for doing so across all 25 cards — not just website cards.

The problems with the placeholder approach applied to every card type:
- **Sales cards:** Wrong business name, wrong chat participants, wrong conversation topic
- **Ads cards:** Wrong photos, wrong brand avatar, wrong caption, wrong CTA label
- **Social cards:** Wrong avatar, wrong photos, wrong username, wrong caption
- **Web cards:** Wrong background color, wrong layout structure, wrong fonts, invented content
- **Listings cards:** Wrong business name, wrong category, wrong reviews, wrong photos
- **Content cards:** Wrong wordmark, wrong tag label, wrong headline, wrong article text and photos

The root cause was the same in every case: content was written from memory or copied from the Health & Body card rather than extracted from Figma.

---

## Core principles

### Everything comes from Figma — no exceptions

Every field in every content constant in `app/page.tsx` must trace back to a specific node in Figma. This includes:
- All text strings (business names, captions, chat messages, nav links, menu items, headlines, bylines)
- All colors (background, text, button fills, icon fills)
- All fonts (family, weight, size, letter spacing, line height)
- All layout values (positions, sizes, gaps, padding, border radii)
- All photos and SVG assets

If a value cannot be confirmed in Figma, it must be looked up in Figma before being written. The Figma MCP gives you everything — reference code, assets, and a screenshot. Use it.

### DRY content data

Each of the 25 cards is defined as a plain-object constant in `app/page.tsx`. That constant is typed by an interface in `WorkShowcase.tsx`. The constant contains only the data that varies between instances — never layout logic or rendering decisions. Rendering is the component's job; content is the constant's job.

### Discriminated union approach

Card types that vary in layout across industries use a TypeScript discriminated union. The `variant` field determines which rendering path is used. The TypeScript compiler enforces that every variant has a matching interface, component, and dispatcher case — it is not possible to add a new variant without all three.

Current discriminated unions:

| Component | Variants | Discriminant field |
| --- | --- | --- |
| `WebCard` | `standard`, `food`, `home`, `care` | `variant` |
| `AdsCard` | `standard`, `home` | `variant` |
| `ListingsCard` | via `photoLayout` prop | `photoLayout?: 'grid-2x2' \| 'tall-left'` |

---

## Correct workflow — applies to every card of every type

These steps apply identically regardless of card type (Sales, Ads, Social, Web, Listings, Content). The food web card was the first card implemented correctly using this process. Everything else must follow the same sequence.

### Step 1 — Get a screenshot of the card from Figma

Call `get_screenshot` on the industry row's **saturated** node. Keep the result visible for the entire implementation. This is the source of truth for what the card should look like when focused. If the output does not match this screenshot, it is wrong.

```
get_screenshot(nodeId: "1125:5347")  // Food saturated row — shows all 5 food cards in color
```

Also call `get_screenshot` on the **desaturated** node to see the default state colors and content.

```
get_screenshot(nodeId: "1152:745")  // Food desaturated row
```

### Step 2 — Find the specific card node

Call `get_metadata` on the saturated industry row node to get a full node map. Each card in the row is a named child frame with its own ID. Match the card type you are implementing to its node ID.

```
get_metadata(nodeId: "1125:5347")
```

The metadata lists every frame, its name, dimensions, and children. For example, the food row contains `ads-card`, `social-card`, `Frame 2147238432` (desktop web), a listings card, and a content card — each at a known node ID.

### Step 3 — Get the design context for the specific card

Call `get_design_context` on the card's node ID with `dirForAssetWrites` pointing to `/public/work-showcase/`. This returns:
1. React + Tailwind reference code with exact hex values, font strings, pixel dimensions, and positioning
2. All image and SVG assets written to disk with content-hash filenames
3. Identification of which elements are images vs. inline SVGs vs. text

```
get_design_context(
  nodeId: "1125:5467",                              // the specific card node
  clientLanguages: "typescript",
  clientFrameworks: "react,next.js",
  dirForAssetWrites: "/absolute/path/to/public/work-showcase"
)
```

If the response is truncated, call `get_design_context` again on individual child nodes (e.g., just the header, just the avatar, just the photo grid) to get their values separately.

**What to extract from the reference code for each card type:**

| Card type | What to capture |
| --- | --- |
| Sales | Bubble background colors (default + focus), text colors (default + focus), dynamic island color, timestamp format, exact message text |
| Ads | Photo grid layout and offsets, avatar dimensions, caption text, CTA label and button colors, dark overlay gradient values |
| Social | Avatar dimensions, photo dimensions and composite opacity, caption text, engagement icon sources |
| Web | Background color, header layout (positions of every element), font family and weight, nav link colors and case, presence/absence of hero text overlay, presence/absence of below-fold section, all exact pixel positions |
| Listings | Business name, category, rating, review count, description text, photo grid layout, pill labels |
| Content | Wordmark source, tag label and colors, headline text and weight, byline text, photo source, body paragraph text |

### Step 4 — Rename saved assets

The Figma MCP writes assets with content-hash filenames. Immediately after `get_design_context`, list the most recently modified files in `/public/work-showcase/` and rename each hash file to the project convention using `cp`:

```bash
ls -lt /public/work-showcase/*.svg | head -10   # find recently written SVGs
ls -lt /public/work-showcase/*.png | head -10   # find recently written PNGs
```

Naming convention: `[industry]-[card-type]-[descriptor].[ext]`

```
# Examples
a3f9...svg  →  food-ads-avatar-default.svg
06e6...png  →  food-web-hero.png
063892...svg →  food-web-logo-mark.svg
```

Use `cp`, not `mv`, so the original hash file remains in place.

### Step 5 — Determine if the layout requires a new component variant

Before writing any component code, compare the card's visual structure against the existing component variants:

- **If the layout is structurally identical to an existing variant** (same regions, same element arrangement, only content differs) — use the existing interface and add new content data to `page.tsx`. No new component needed.
- **If any layout region is structurally different** — create a new discriminated union variant: interface → component → dispatcher case.

Structural differences that require a new variant:
- Different element arrangement within a region (e.g., logo-center vs. logo-left)
- Presence or absence of entire regions (e.g., no below-fold section, no hero text overlay, no action buttons)
- Different content zones within a region (e.g., a services grid instead of a photo gallery)
- Different font or layout system (e.g., a split-column layout vs. a stacked layout)

Differences that do NOT require a new variant (they are just props):
- Different photos, colors, text, or logo files
- Different number of nav items or message bubbles
- Different CTA labels or button text

### Step 6 — Implement using only values from the design context

Never approximate or infer values. Copy:
- Exact hex strings (`#e6edfa`, not "light blue")
- Exact font family strings (`'Josefin Slab'`, not `'Georgia'`)
- Exact pixel numbers for all positions and dimensions
- Exact text strings including casing, punctuation, and line breaks

If a required font is not yet in `app/layout.tsx`, add it via `next/font/google` before the card will render correctly.

### Step 7 — Visual validation before moving on

Navigate to `/cards-preview` (the static preview page, no GSAP). Take a screenshot of the rendered card. Place it next to the Figma `get_screenshot` output from Step 1. Every element must match. Fix all discrepancies before touching the next card. Do not batch discrepancies across cards.

---

## What to look for in each card type

Each card type has specific elements that are easy to get wrong without Figma verification.

### Sales card

- **Exact chat messages** — the conversation content, number of turns, and timestamp placement all vary by industry. Do not invent plausible-sounding messages.
- **Bubble colors** — both the background and text colors differ between the default and focused states and must be read from Figma (not copied from another industry).
- **Participants** — each industry has named participants. Read the actual names from the Figma text nodes.

### Ads card

- **Photo grid layout** — some industries use a symmetric 2×2 staggered grid, Home & Property uses a single full-bleed hero. Read the layout from Figma, not from the previous industry.
- **Avatar** — each industry has its own brand avatar in both default and focused states. The avatar file is an SVG that must be extracted from Figma.
- **Caption text** — read the exact caption from Figma. Length and tone vary significantly.
- **CTA label** — varies by industry (Learn More, Book Now, Shop Now). Read from Figma.

### Social card

- **Username** — the Instagram-style handle (e.g., `almacafe`, `canopyworks`). Read from Figma.
- **Caption** — the post caption including hashtags. Read from Figma.
- **Photo composite** — some social cards have two photo layers (base + overlay). Read both sources from Figma.

### Web card

- **Layout variant** — this is the highest-risk card type. Every industry has a structurally different website. Do not assume any two industries share the same layout. Always call `get_design_context` before writing a single line of component code.
- **Background color** — the inner card background differs per industry. Read it from Figma.
- **Header structure** — logo position, nav position, social icons, action buttons — all vary. Map each element's exact `top`, `left`, `width`, `height` from the reference code.
- **Fonts** — each industry website uses a different typeface. Check that the font is loaded in `app/layout.tsx`.
- **Hero text overlay** — some sites have a headline overlaid on the hero image; others have no text at all. Read from Figma.
- **Below-fold section** — some sites have a gallery or services section below the hero; others do not. Read from Figma.

### Listings card

- **All text fields** — business name, category label, description paragraph, review count, rating score, pill labels. All must be read from Figma.
- **Photo layout** — most industries use the symmetric 2×2 grid, Care & Maintenance uses the asymmetric tall-left layout. Confirm the layout in Figma for each industry before setting the `photoLayout` prop.
- **Map presence** — the Google Business listing card includes a map section. Verify it is rendering in the implementation.
- **Map offset (CRITICAL)** — the map is a composite of 8 SVG layers (roads, yellow artery, green parks, frame, two street grids, overlay, and text label) positioned on a `#85d5eb` background. All layers share the same inner positions and dimensions — the **only difference per industry** is the `left` and `top` offset of the outer MAP 2 container, which pans to show a different area of the same River North map. These values must come directly from Figma via `get_design_context`. **Do not hardcode a generic offset** — a wrong offset makes the map look zoomed-in or misaligned. Per-industry values:
  - Food & Drink (Alma Café): `mapOffset: { left: -120.18, top: -69.38 }`
  - Home & Property (CanopyWorks): `mapOffset: { left: -51, top: -258 }`
  - All other industries: run `get_design_context` on the listings card node and read `left-[?px] top-[?px]` from the `data-name="MAP 2"` container.
- **Map SVG assets** — the 8 SVG layers are shared across all industries. The named files in `public/work-showcase/` are:
  - `map-roads-base.svg` — main roads outline (imgVector32, 536×419)
  - `map-roads-yellow.svg` — yellow highlighted artery (imgYellow, 272×400)
  - `map-parks-green.svg` — green park areas (imgGreen, 428×275)
  - `map-frame.svg` — frame/boundary overlay (imgFrame7, 488×415)
  - `map-streets-west.svg` — west street grid (imgVector30, 399×417)
  - `map-streets-east.svg` — east street grid (imgVector33, 268×417)
  - `map-streets-overlay.svg` — street label overlay layer (imgVector29/35, 490×415)
  - `map-pin.svg` — red location pin (imgVector1, 56×61 with inset)
- **Pin position** — the location pin is always at `left: 111px, top: 49px` within the 252×125px clip container (same for all industries).

### Content card

- **Tag label** — varies by industry (BLOG, JOURNAL, WEB, etc.). Read from Figma.
- **Wordmark** — each industry uses its own wordmark SVG at the top of the card.
- **Food & Drink content card** — in Figma this card is labeled WEB (not CONTENT) and renders a mobile café menu, not a blog article. It may require its own component variant. Use node `1125:5504` from the food saturated row and compare its structure against `ContentCard` before deciding.

---

## Card type × industry matrix

Each cell shows the component variant used and the Figma node to reference. The row nodes in the table at the top of this spec give you access to all five cards in one `get_metadata` call.

### Sales cards — `SalesCardContent` (uniform structure, content varies)

| Industry | Business | Content summary |
| --- | --- | --- |
| Health & Body | X2O Studio | Studio ↔ Jamie — booking a Pilates intro consultation |
| Food & Drink | Alma Café | Read from Figma node `1152:745` / `1125:5347` |
| Home & Property | CanopyWorks | Studio ↔ Alex — oak tree health assessment |
| Money & Business | Meridian | Read from Figma node `1200:5383` / `1165:1161` |
| Care & Maintenance | Good Dog Grooming | Studio ↔ John — grooming appointment for golden retriever Rufus |

### Ads cards — dispatches on `variant`

| Industry | Variant | Layout | CTA label |
| --- | --- | --- | --- |
| Health & Body | `standard` | 4-photo staggered grid | Learn More |
| Food & Drink | `standard` | 4-photo staggered grid | Learn More |
| Home & Property | `home` | Single full-bleed hero photo | Book Now |
| Money & Business | `standard` | 4-photo staggered grid | Shop Now |
| Care & Maintenance | `standard` | 4-photo staggered grid | Book Now |

### Social cards — `SocialCardContent` (uniform structure, content varies)

| Industry | Username | Caption source |
| --- | --- | --- |
| Health & Body | x2o Studio | Read from Figma |
| Food & Drink | almacafe | Read from Figma |
| Home & Property | canopyworks | Read from Figma |
| Money & Business | meridian | Read from Figma |
| Care & Maintenance | gooddoggrooming | Read from Figma |

### Web cards — dispatches on `variant` (every industry is a distinct layout)

| Industry | Variant | Background | Key layout differences from Health |
| --- | --- | --- | --- |
| Health & Body | `standard` | `#fcfbf8` | Reference implementation |
| Food & Drink | `food` | `#e6edfa` | Wordmark left, logo-mark center, social icons right; separate nav row; no headline overlay; no below-fold |
| Home & Property | `home` | Read from Figma | Fraunces serif; half-and-half layout with stats panel |
| Money & Business | `standard` | `#fcfbf8` | Same structure as Health; different brand assets |
| Care & Maintenance | `care` | Read from Figma | Dongle font brand name; services grid below hero |

**Food web card implemented values (node `1125:5467`):**
- Outer: `868 × 584px`, `border-radius: 16px`, `padding: 7px`, `backdrop-filter: blur(12.024px)`
- Inner: `852 × 568px`, `border-radius: 10px`, `background: #e6edfa`
- Wordmark: `left: 33px`, `top: 42px`, Josefin Slab Bold, 20px, `#8a7050`
- Logo mark: horizontally centered, `top: 23px`, `52 × 52px` — `food-web-logo-mark.svg`
- Instagram icon: `left: 772px`, `top: 42px`, `20 × 20px` — `food-web-icon-instagram.svg`
- Facebook icon: `left: 808px`, `top: 42px`, `20 × 20px` — `food-web-icon-facebook.svg`
- Nav links: centered, `top: 107px`, gap 24px, Josefin Slab SemiBold/Bold, 14px, lowercase, `#ff6a56`
- Hero: `top: 150px`, `852 × 418px`, image at 135.89% height offset −14.83% — `food-web-hero.png`

For Home & Property and Care & Maintenance, run `get_design_context` on their respective web card nodes (from the row metadata) before implementing — their values have not been audited against Figma.

### Listings cards — `ListingsCardContent` (uniform structure, `photoLayout` prop varies)

| Industry | Business | Rating / Reviews | `photoLayout` |
| --- | --- | --- | --- |
| Health & Body | Read from Figma | Read from Figma | `grid-2x2` |
| Food & Drink | Alma Café | 4.7 / 59 reviews | `grid-2x2` |
| Home & Property | CanopyWorks | 4.6 / 35 reviews | `grid-2x2` |
| Money & Business | Meridian | 4.9 / 61 reviews | `grid-2x2` |
| Care & Maintenance | Good Dog Grooming | 4.8 / 88 reviews | `tall-left` |

### Content cards

| Industry | Tag | Type | Notes |
| --- | --- | --- | --- |
| Health & Body | BLOG | `ContentCardContent` | Blog article — X2O Studio |
| Food & Drink | WEB | Needs audit | Figma renders a mobile menu page, not an article. Node `1125:5504`. May need `WebCardContentFoodMenu` variant. |
| Home & Property | — | TBD | Read from Figma |
| Money & Business | JOURNAL | `ContentCardContent` | Journal article — Meridian |
| Care & Maintenance | — | TBD | Read from Figma |

---

## Required fonts

Each industry website uses a typeface that must be loaded in `app/layout.tsx` before its web card will render correctly. All five below are already loaded.

| Font | Used in | `app/layout.tsx` variable |
| --- | --- | --- |
| Inter | Health & Body web, body text | `--font-inter` |
| Josefin Slab | Food & Drink web (wordmark, nav) | `--font-josefin-slab` |
| Fraunces | Home & Property web | `--font-fraunces` |
| Dongle | Care & Maintenance web | `--font-dongle` |
| Bangers | Care & Maintenance web | `--font-bangers` |

Reference in inline styles: `fontFamily: "'Josefin Slab', Georgia, serif"`.

If `get_design_context` returns a font not in this list, add it to `app/layout.tsx` before implementing the card.

---

## Asset naming conventions

All assets live in `/public/work-showcase/`.

| Type | Pattern | Examples |
| --- | --- | --- |
| Industry photo | `[industry]-[card-type]-[descriptor].png` | `food-ads-photo.png`, `care-web-hero.png` |
| Industry SVG | `[industry]-[card-type]-[descriptor].svg` | `food-web-logo-mark.svg`, `money-wordmark.svg` |
| Industry avatar (default) | `[industry]-avatar-default.svg` | `food-avatar-default.svg` |
| Industry avatar (focused) | `[industry]-avatar-focused.svg` | `food-avatar-focused.svg` |
| Web card icon | `[industry]-web-icon-[name].svg` | `food-web-icon-instagram.svg` |
| Shared ADS icon | `ads-icon-[name].svg` | `ads-icon-three-dots.svg` |
| Shared social icon | `social-icon-[name].svg` | `social-icon-heart.svg` |

---

## Component architecture reference

```
WorkCard dispatcher (type: 'sales' | 'ads' | 'social' | 'web' | 'listings' | 'content')
│
├── SalesCard          — uniform across all industries
├── AdsCard            — dispatches on content.variant
│   ├── AdsCardStandard   (4-photo staggered grid)
│   └── AdsCardHome       (single full-bleed hero)
├── SocialCard         — uniform across all industries
├── WebCard            — dispatches on content.variant
│   ├── WebCardStandard   (health, money)
│   ├── WebCardFood       (food — lavender bg, logo-mark center, no below-fold)
│   ├── WebCardHome       (home — Fraunces serif layout)
│   └── WebCardCare       (care — Dongle brand name, services grid)
├── ListingsCard       — uniform, photoLayout prop for grid variant
└── ContentCard        — uniform for blog/journal articles
```

Every card component receives: `content` (typed payload), `chipLabel`, `chipBg`, `chipText`.

---

## Per-card implementation checklist

Apply this checklist to each of the 25 cards individually. Do not move to the next card until the current one is verified.

- [ ] `get_screenshot` called on both the desaturated and saturated row nodes for this industry
- [ ] `get_metadata` called on the saturated row node to identify the specific card's node ID
- [ ] `get_design_context` called on the card node with `dirForAssetWrites`
- [ ] All hash-named assets renamed to the project naming convention
- [ ] All text content verified against Figma text nodes (no invented strings)
- [ ] All colors verified against `get_design_context` output (no approximated hex values)
- [ ] Layout structure compared to existing variants — new variant created if needed
- [ ] Required fonts confirmed present in `app/layout.tsx`
- [ ] Content constant added to `app/page.tsx` and `app/cards-preview/page.tsx`
- [ ] `npx tsc --noEmit` passes clean
- [ ] Screenshot taken at `/cards-preview` and compared side-by-side with Figma screenshot
- [ ] All visible discrepancies fixed before proceeding

---

## What went wrong in the initial implementation

The original attempt added four industries without following this workflow. Every card type was affected:

1. **Figma MCP not used.** Content was written from memory or copied from Health & Body. This caused wrong text in every card type — wrong captions in Ads, wrong chat messages in Sales, wrong business descriptions in Listings, invented section headings in Web.

2. **One component variant assumed for all web cards.** The assumption that all website cards share the X2O Studio structure (logo-left, nav-center, hero-overlay, below-fold gallery) was wrong for three out of five industries. Food, Home, and Care all have structurally distinct layouts.

3. **No visual validation step.** Without comparing a screenshot of each rendered card against Figma, discrepancies accumulated silently across all 25 cards before anyone noticed.

4. **Assets referenced before extraction.** File paths were written in content constants before the actual assets were extracted from Figma, leading to broken image references and incorrect substitutes.

5. **Desaturated state ignored.** Default-state background colors and text tones were approximated rather than read from the desaturated Figma node. The desaturated state has specific warm-grey hex values per card; they are not just "greyscale."

The correct sequence is always: **Figma screenshot → card node ID → design context + assets → rename assets → variant decision → implement → visual validation.**
