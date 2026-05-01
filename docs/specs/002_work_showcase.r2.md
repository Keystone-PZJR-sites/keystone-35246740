**Figma file:** `XRbD11WIevI5szRFiRrguZ`

**Figma nodes:**
- [All states overview](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1009-26343&m=dev) (node `1009:26343`)
- [Default state — no focus](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1009-25909&m=dev) (node `1009:25909`)
- [Sales card focused — Health & Body](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1009-24888&m=dev) (node `1009:24888`)
- [Ads card focused — Health & Body](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1009-25218&m=dev) (node `1009:25218`)
- [Social card focused — Health & Body](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1009-25057&m=dev) (node `1009:25057`)
- [Web card default — Health & Body](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1040-36545&m=dev) (node `1040:36545`)
- [Web card focused — Health & Body](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=998-23514&m=dev) (node `998:23514`)
- [Content card focused — Health & Body](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1009-26073&m=dev) (node `1009:26073`)
- [Sales card focused — Food & Drink](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1009-25564&m=dev) (node `1009:25564`)
- [Chip label proportions](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1009-26244&m=dev) (node `1009:26244`)
- [X2O avatar — default state](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=998-23762&m=dev) (node `998:23762`)
- [X2O avatar — focused state](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=998-23858&m=dev) (node `998:23858`)

**Delivers:** The second section of the homepage — an auto-scrolling showcase of client work organized by industry.

---

## What this section is

The second section on the homepage. Visitors reach it by scrolling normally after the hero animation completes. The section has a warm cream background and presents a continuously auto-scrolling carousel of client work examples — screenshots and mockups of sales conversations, paid ads, social posts, websites, and blog content — organized by industry.

A category bar at the bottom lets visitors jump to a specific industry. When a user hovers over a work example, it lifts upward with a gentle bounce easing, its colors become vivid, and a label chip appears below it identifying the type of work. All other visible items remain desaturated and at rest.

---

## Scope

### In scope

- Section headline
- Auto-scrolling work example carousel (all industries in one flat, continuous loop)
- Work example focus states (lift and colorize the hovered card; desaturate all others)
- Industry category bar at the bottom
- Sub-category labels row beneath the category bar
- Category click behavior: scroll to first item for that industry and resume auto-scroll
- Active-category tracking as carousel moves between industries

### Out of scope

- Any section above or below this one
- Backend data fetching or API calls
- Any form or submission behavior

---

## Visual design

### General

The section background is warm cream `#f0eee6`. On desktop the section is **1024px tall** at 1440px viewport width. There is 24px of horizontal padding on both edges — the headline and category bar are centered within the full 1440px width, and the carousel overflows beyond the right edge.

### Headline

Positioned with its vertical center at 78px from the section's top edge. The text is center-aligned and naturally breaks into two lines, with "hard as you do." rendered in FK Roman Standard Oblique.

- Text: "Marketing that works as hard as you do."
- Default words: FK Roman Standard Regular
- Oblique words ("hard as you do."): FK Roman Standard Oblique
- Size: 32px
- Line height: 1.2
- Color: `#4f4d4a`
- Letter spacing: −0.96px

### Carousel track

The carousel begins 156px from the top of the section and is 662px tall in the default state. Its left edge starts at 24px from the section's left edge. Items are laid out in a single horizontal row with 32px gaps between each card.

Each category's first card is positioned at approximately 25% of the viewport width from the left edge of the carousel container. This applies to both the initial load position and after a category click.

### Work example cards — default state

Every card renders in a warm desaturated tone — sepia-grayscale. Backgrounds are slightly varied; pay close attention to per-card values below. All photographic color is removed. UI elements and text use warm gray tones consistent with the section's warm cream palette. Nothing is pure black-and-white; the desaturation respects the warmth of the palette.

Each card sits with 24px of empty space above it within the carousel track. Cards are bottom-aligned to the same baseline.

**Card dimensions:**

| Type | Label chip text | Width | Height |
| --- | --- | --- | --- |
| Sales (mobile chat) | SALES | 302px | 638px |
| Ads (social story) | ADS | 286px | 594px |
| Social (Instagram post) | SOCIAL | 292px | 424px |
| Web (website screenshot) | WEB | 868px | 583px |
| Content (blog article) | CONTENT | 316px | 583px |

The web card is notably wider than the others. At 868px it takes up roughly 60% of the desktop viewport and shows a horizontal slice of a real client website — header navigation, a full-width hero image, headline, and a call-to-action button.

### Work example cards — focus state (hover)

**1. The card lifts 24px upward.**
Its top edge slides 24px higher than in the default state. The bottom edge stays in place. The 24px gap above the card disappears as it rises to fill it. The movement is a smooth slide using a fast ease-out spring curve (`cubic-bezier(0.16, 1, 0.3, 1)`), taking approximately 350ms.

**2. The card transitions to full color.**
The desaturation lifts entirely. Photographic images become vivid. Brand colors in UI elements become vivid. Backgrounds transition from their sepia tone to their specific focus-state background color. This transition is smooth at 350ms.

**3. A label chip appears below the card.**
The chip appears 16px below the card's bottom edge, horizontally centered. It is a fully rounded pill. All chips share the same construction; each industry has its own color pair.

**Chip construction:**

- Font: FK Grotesk Mono Regular, 12px, all-caps, `line-height: 1`
- Padding: 5px top, 10px left/right, 4px bottom (1px more on top for optical centering with FK Grotesk Mono's metrics)
- Shape: fully rounded pill (`border-radius: 9999px`)
- See Figma node `1009:26244` for chip proportions

**Chip colors by industry:**

| Industry | Background | Text |
| --- | --- | --- |
| Health & Body | `#ffbb8a` | `#9f3722` |
| Food & Drink | `#D8C2FF` | `#6E3CA7` |
| Home & Property | `#F2D474` | `#835F20` |
| Money & Business | `#AAE0D2` | `#318175` |
| Care & Maintenance | `#9DCBFF` | `#055CFF` |

**4. All other visible cards stay at their default vertical position.**
Only the hovered card moves. The focused card rising 24px above the others creates a visual impression of depth.

### Per-card color transitions (default → focus)

Each card type has specific background and element color changes. All transitions are 350ms.

#### Sales card (iPhone chat UI)
- Outer wrapper: `#e9e7dd` → `#fcfbf8`
- Dynamic Island pill: `#cbc5b4` → `#242323`
- Studio message bubbles: `#f0eee6` → `#ece2f3` (soft lavender)
- Studio message text: `#5d5a56` → `#422457` (deep purple)
- Customer message bubbles: `#e0ddd1` → `#d9e7f7` (soft blue)
- Customer message text: `#4f4d4a` → `#153b65` (dark blue)
- Home indicator bar: `#cbc5b4` → `#242323`

#### Ads card (Instagram Story format)
- Background: `#e0ddd1` (default) — on hover, a dark gradient overlay (`#3a3836` → `#000000` top-to-bottom) fades in at 350ms via an absolutely-positioned overlay div (opacity 0 → 1). CSS `transition-colors` cannot animate gradient backgrounds; the overlay technique is required.
- Story progress bar track: 35% white opacity (unchanged)
- Profile name + "Sponsored" text: `#4f4d4a` → white (instant snap, no transition)
- Three-dots icon: `#4f4d4a` tint → white (instant snap via CSS `filter: brightness(100)`, no transition)
- Photo grid: desaturated (mix-blend-mode: luminosity) → full color (mix-blend-mode: normal, instant snap)
- Caption: `#847f71` → white (instant snap, no transition)
- CTA button background: `#d6d2c2` → white (instant snap, no transition)
- CTA button text: `#989281` → `#242323` (instant snap, no transition)
- Link arrow icon: swaps between two SVG files — default uses `ads-icon-link-arrow.svg` (light), hover uses `ads-icon-link-dark.svg` (dark) — instant swap via `group-hover:hidden` / `group-hover:block`

All Ads card element transitions snap **instantly** (no duration), so the entire card state change occurs at the same moment as the dark overlay reaches full opacity.

#### Social card (Instagram post)
- Outer wrapper: `#e0ddd1` → `#fcfbf8`
- X2O avatar: `avatar-x20-default.svg` (grey circle) → `avatar-x20-focused.svg` (near-black circle), instant swap
- Profile name: `#4f4d4a` → `#242323`
- Photo: desaturated via CSS filter (`grayscale(1) sepia(0.1) brightness(0.97)`) → no filter (full color), 350ms transition
- Caption text: `#4f4d4a` → `#242323`

#### Web card (website screenshot)
- Outer wrapper: `#e9e7dd` → `rgba(255,255,255,0.3)` (retains `backdrop-filter: blur(12px)`)
- Inner card: `#e0ddd1` → `#fcfbf8`
- Nav link text: `#847f71` → `#4f4d4a`
- "Buy Classes" button background: `#ede9e4` → white
- "Buy Classes" button text: `#726c63` → `#4f4d4a`
- CTA "Book Your Class" button background: `#f0eee6` → white
- Hero images: mix-blend-mode luminosity → normal (instant snap via `work-img-blend` CSS class)
- Below-fold heading: `#4f4d4a` → `#242323`
- Gallery images: mix-blend-mode luminosity → normal (instant snap)

#### Content card (blog article)
- Outer wrapper: `#e9e7dd` → `rgba(255,255,255,0.3)` (retains `backdrop-filter: blur(12px)`)
- Inner card: `#e0ddd1` → white
- Hamburger menu lines: `#cbc5b4` → `#242323`
- BLOG tag background: `#d6d2c2` → `#fcd8e5` (pink)
- BLOG tag text: `#5d5a56` → `#ff3d81`
- Headline: `#5d5a56` → `#242323`
- Article photo: desaturated via CSS filter → full color, 350ms
- Article body text: `#4f4d4a` → `#3a3836`

### X2O avatar

The X2O logo avatar appears in the header of both the Ads card and the Social card. It has a default state and a focused state that swap on hover.

Both states are self-contained SVG files — each file draws its own dark circle and white X2O letterforms as solid-filled paths. **No `bg-white` or `overflow-hidden` is needed on the container for the white letters to appear.** The container is simply a `35px × 35px` rounded-full div.

Default state: `avatar-x20-default.svg` — grey circle (`#4F4D4A` background), white X2O.
Focused state: `avatar-x20-focused.svg` — near-black circle (`#242323` background), white X2O.

On hover, the default image is hidden and the focused image is revealed (instant swap, no transition).

### Photo desaturation technique

Two techniques are used depending on whether the card's background color also transitions on hover:

**CSS filter (`work-card-img` class):** Used on photos in the Social card and Content card. The filter `grayscale(1) sepia(0.1) brightness(0.97)` desaturates the photo with a warm cast. On hover, the filter is removed smoothly over 350ms. This technique is used when the card's background is also transitioning — combining `mix-blend-mode: luminosity` with a transitioning background color causes a visible color blink.

**mix-blend-mode (`work-img-blend` class):** Used on photos in the Ads card and Web card. The photo sits in a container with `mix-blend-mode: luminosity`, which desaturates it against the background. On hover, the blend mode snaps to `normal` (full color) instantly. This technique is safe when the background is either stable (Ads card: gradient snaps) or transitions smoothly (Web card: the brief mismatch during transition is imperceptible).

### Category bar

Centered horizontally in the section, with its top edge at 890px from the section top. Height: 41px. Five category labels in a horizontal row with 24px gaps between them.

**Five industries in order:**

| Label | Load state |
| --- | --- |
| HEALTH & BODY | Active |
| FOOD & DRINK | Inactive |
| HOME & PROPERTY | Inactive |
| MONEY & BUSINESS | Inactive |
| CARE & MAINTENANCE | Inactive |

**Active category:**

- Font: FK Screamer Bold, 50px, all-caps, line-height 0.82
- Colors:
  - Health & Body: `#f57e56`
  - Food & Drink: `#9c65ee`
  - Home & Property: `#F2BA46`
  - Money & Business: `#399587`
  - Care & Maintenance: `#56a6ff`

**Inactive category:**

- Same font, size, line-height
- Color: `#cbc5b4` (warm gray)
- Hover color: `#b1aa9a` — gentle 150ms ease transition
- `cursor: pointer`

The active-to-inactive color transition is 150ms. Category labels cannot use `transition-colors` with an inline style color override simultaneously; the active color is applied via the `style` prop only when active (`style={isActive ? { color: industry.activeColor } : undefined}`), and the inactive CSS color rule handles the rest.

### Sub-labels row

Centered horizontally in the section, with its top edge at 963px from the section top.

- Font: FK Grotesk Mono Regular, 18px
- Bullet separators: 16px
- Color: matches the active category's color
  - Health & Body: `#f57e56`
  - Food & Drink: `#56a6ff`
  - Home & Property: `#F2BA46`
  - Money & Business: `#399587`
  - Care & Maintenance: `#9c65ee`
- Letter spacing: −0.36px
- Items baseline-aligned, 8px gap between each item and separator

**Sub-labels by industry:**

| Industry | Sub-labels |
| --- | --- |
| Health & Body | Fitness • Wellness • Beauty • Grooming • Medical • Dental |
| Food & Drink | Restaurants • Cafés • Bars • Food Trucks • Bakeries • Catering |
| Home & Property | Contractors • Trades • Landscaping • Cleaning |
| Money & Business | Retail • Legal • Accounting • Tax • Real Estate • Insurance |
| Care & Maintenance | Pet Services • Auto • Repair • Restoration |

---

## Carousel behavior

### Flat array order

All 25 work examples sit in a single ordered flat array:

1. Health & Body — Sales, Ads, Social, Web, Content
2. Food & Drink — Sales, Ads, Social, Web, Content
3. Home & Property — Sales, Ads, Social, Web, Content
4. Money & Business — Sales, Ads, Social, Web, Content
5. Care & Maintenance — Sales, Ads, Social, Web, Content

After the last card, the carousel loops seamlessly back to the first card. No visible jump or flash at the loop point.

### Auto-scroll behavior

- **Trigger:** Auto-scroll does not begin until the section enters the viewport (the top of the section reaches 80% of the viewport height). This is detected with a ScrollTrigger; the scroll fires once and is not repeated.
- **Interval:** The carousel advances every 5 seconds.
- **Direction:** Right to left (cards enter from the right, exit left).
- **Pace:** Each advance scrolls to the next category's first card, which comes to rest at ~25% from the left edge of the container. The scroll animation takes approximately 600ms with smooth ease-in-out.
- **Pause on hover:** When the user hovers any card, the 5-second timer is cancelled. It restarts when the cursor leaves.
- **Restart after settle:** The timer only restarts once the Embla carousel has settled at its new position. This prevents stacked scrolls.

### Active-category tracking

The category with the most visible cards in the current scroll position becomes active. As the carousel scrolls, the active category in the bar and the sub-labels row update continuously to reflect the frontmost industry.

### Category click behavior

1. The carousel animates (smooth ease-in-out, approximately 600ms) to place the first card for that industry at ~25% from the left edge.
2. The clicked category becomes active.
3. The sub-labels row immediately updates.
4. Auto-scroll resumes from the new position.

---

## Work example card content

Each card is a realistic, detailed mockup. All text, images, brand colors, and UI elements within the cards represent real marketing work.

**Health & Body (example client: X2O Studio — a Pilates and fitness studio):**

| Type | Content |
| --- | --- |
| Sales | iPhone chat UI. A conversation between X2O Studio (messages on the left, bubble bg `#f0eee6`) and a prospective client named Jamie (messages on the right, bubble bg `#e0ddd1`). The conversation books a free 30-minute intro consultation for Thursday at 5:30pm with instructor Maya. Five messages total. Studio messages use text color `#5d5a56`; Jamie's messages use `#4f4d4a`. |
| Ads | Instagram Story format. Profile header: X2O avatar + "x2o Studio / Sponsored" in `#4f4d4a`. Four workout photos in a 2×2 staggered grid (top-right photo offset 22px lower than top-left; bottom-right offset 23px lower than bottom-left). Caption: "The workout that actually sticks. Low-impact, full-body, never the same workout twice. Come try us, the first class is on us!" in `#847f71`. CTA button: "Learn More" with link arrow icon, bg `#d6d2c2`, text `#989281`. Story progress bar at top: translucent track with a partial filled indicator. |
| Social | Instagram post. Profile header: X2O avatar + "x2o Studio" in `#4f4d4a`. Single 250×250px photo, slightly composited (`opacity: 80%` base layer + overlaid detail layer). Engagement icons row (heart, comment, share, save). Caption: "Starting the day strong with @MovaPilates! Join us for a class! #pilates #fitness #healthylifestyle" in `#4f4d4a`. |
| Web | Website screenshot. Top navigation: X2O Studio logo (left), nav links "Locations / Blog / About Us / FAQ" in `#847f71` (center-left), "Buy Classes" button in `#ede9e4` + "Book Now" gradient button (right). Full-width hero image with two composited layers. Headline "High Intensity. Low Impact. Real Results." in `#f0eee6` at 50.67px. "Book Your Class" CTA button in `#f0eee6`. Below-fold section heading "Train Your Way at X2O Studio" in `#4f4d4a` + three 200px gallery thumbnails. |
| Content | Blog article. Wordmark top-left. Hamburger icon top-right. "BLOG" tag in `#d6d2c2` bg. Headline "A Personal Journey to Strength and Flexibility" in `#5d5a56` at 24px light weight. Byline "by Ellen Piccolotti" in `#b1aa9a`. 280×187px article photo. Two paragraphs of article body text in `#4f4d4a` at 12px. |

**Other industries (Food & Drink, Home & Property, Money & Business, Care & Maintenance):** Full card assets for these industries are not yet provided. Use existing Health & Body assets as placeholders until real assets are delivered.

---

## Assets

All assets live in `/public/work-showcase/`. The naming convention is:

| Type | Pattern | Examples |
| --- | --- | --- |
| Industry-specific image | `[industry]-[card-type]-[descriptor].[ext]` | `health-ads-photo-1.png`, `health-web-hero.png` |
| Industry-specific vector | `[industry]-[card-type]-[descriptor].svg` | `health-web-logo.svg`, `health-content-wordmark.svg` |
| Shared avatar | `avatar-[brand]-[state].svg` | `avatar-x20-default.svg`, `avatar-x20-focused.svg` |
| Card UI icon (ADS) | `ads-icon-[name].svg` | `ads-icon-three-dots.svg`, `ads-icon-link-arrow.svg` |
| Card UI icon (Social) | `social-icon-[name].svg` | `social-icon-heart.svg`, `social-icon-comment.svg` |

**Current Health & Body assets:**

| File | Used in |
| --- | --- |
| `health-ads-photo-1.png` | Ads card — top-left grid photo |
| `health-ads-photo-2.png` | Ads card — top-right grid photo |
| `health-ads-photo-3.png` | Ads card — bottom-left grid photo |
| `health-ads-photo-4.png` | Ads card — bottom-right grid photo |
| `health-social-photo.png` | Social card — main photo layer |
| `health-social-photo-2.png` | Social card — detail overlay layer |
| `health-web-hero.png` | Web card — full-width hero base |
| `health-web-hero-2.png` | Web card — hero detail overlay |
| `health-web-gallery-1.png` | Web card — below-fold gallery 1 |
| `health-web-gallery-2.png` | Web card — below-fold gallery 2 |
| `health-web-gallery-3.png` | Web card — below-fold gallery 3 |
| `health-web-logo.svg` | Web card — X2O Studio wordmark in nav |
| `health-content-photo.png` | Content card — article photo |
| `health-content-wordmark.svg` | Content card — site wordmark |

**Shared assets:**

| File | Used in |
| --- | --- |
| `avatar-x20-default.svg` | Ads card + Social card — default state avatar |
| `avatar-x20-focused.svg` | Ads card + Social card — focused state avatar |
| `ads-icon-three-dots.svg` | Ads card — more/options icon |
| `ads-icon-link-arrow.svg` | Ads card — CTA link arrow (default state) |
| `ads-icon-link-dark.svg` | Ads card — CTA link arrow (focused state) |
| `social-icon-heart.svg` | Social card — like icon |
| `social-icon-comment.svg` | Social card — comment icon |
| `social-icon-share.svg` | Social card — share icon |
| `social-icon-save.svg` | Social card — save/bookmark icon |

---

## Design tokens

Defined in `styles/custom-overrides.css` under `[data-theme="custom"]`:

| Token | Hex | Used for |
| --- | --- | --- |
| `--color-work-accent` | `#f57e56` | Active category label (Health & Body), default sub-labels color |
| `--color-work-muted` | `#cbc5b4` | Inactive category labels |
| `--color-work-muted-hover` | `#b1aa9a` | Inactive category label hover |
| `--color-work-text` | `#4f4d4a` | Section headline |

The section background (`#f0eee6`) reuses the existing `--color-hero-text` token.

---

## CSS classes for shared behaviors

Defined in `styles/custom-overrides.css`:

| Class | Effect |
| --- | --- |
| `.work-card-img` | Applies `grayscale(1) sepia(0.1) brightness(0.97)` filter with 350ms transition. Used on photos in Social and Content cards. |
| `.work-card-wrapper:hover .work-card-img` | Removes the filter (full color). |
| `.work-img-blend` | Applies `mix-blend-mode: luminosity` (desaturates against background). Used on photos in Ads and Web cards. |
| `.work-card-wrapper:hover .work-img-blend` | Snaps to `mix-blend-mode: normal` (full color). |
| `.ads-icon-bright` | `transition: none` — ensures instant snap, not a 350ms fade. |
| `.work-card-wrapper:hover .ads-icon-bright` | `filter: brightness(100)` — inverts icon to white. |
| `.work-card-body` | `transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1)` — spring lift. |
| `.work-card-wrapper:hover .work-card-body` | `transform: translateY(-24px)` — lifts card 24px. |
| `.work-category-btn` | `cursor: pointer; transition: color 150ms ease` |
| `.work-category-btn[data-active="false"]` | `color: var(--color-work-muted)` |
| `.work-category-btn[data-active="false"]:hover` | `color: var(--color-work-muted-hover)` |

---

## Responsive behavior

- **Desktop (≥ 1280px):** Full experience as described above.
- **Tablet (768–1279px):** Carousel auto-scrolls and is visible. Category bar and sub-labels are present at proportionally reduced sizes. Focus states apply on hover. The Figma does not show a tablet layout — implement as a proportional scale-down of the desktop layout and verify visually.
- **Mobile (< 768px):** Carousel is stationary and swipeable by touch (no auto-scroll). All cards remain in their default desaturated state — no lift, no color, no label chips. The category bar and sub-labels are hidden. No hover-based interactions.

At all breakpoints, no element may overflow horizontally at the section container level.

---

## Acceptance criteria

- [ ] Section background is warm cream `#f0eee6`
- [ ] Headline "Marketing that works as hard as you do." is centered, FK Roman Standard Regular/Oblique at 32px, color `#4f4d4a`, "hard as you do." in oblique
- [ ] Carousel does not auto-scroll until the section enters the viewport (top of section at 80% viewport height)
- [ ] Once triggered, carousel auto-scrolls every 5 seconds, right to left, without ever pausing unless a user hovers on a card
- [ ] All cards in the default state appear in warm desaturated (sepia-grayscale) tones that match the Figma default-state nodes
- [ ] Hovering a card immediately transitions it to the focused state (lift, full color, label chip)
- [ ] Only one card can be in the focused state at any time
- [ ] The focused card's top edge is 24px higher than in the rest state; the lift animates with a spring ease over 350ms
- [ ] The focused card's images are in full color (filter or blend-mode removed)
- [ ] A chip appears 16px below the focused card, horizontally centered, with correct colors and FK Grotesk Mono 12px text
- [ ] Chip text is optically centered: 5px top padding, 10px left/right, 4px bottom padding
- [ ] Non-focused cards do not move vertically
- [ ] ADS card background transitions from beige to dark gradient over 350ms (not an instant snap); other card background transitions are also 350ms
- [ ] ADS card's profile name, caption, CTA, and icons all snap instantly (no per-element transition delay)
- [ ] X2O avatar swaps between default (grey) and focused (near-black) states instantly with no white halo
- [ ] "HEALTH & BODY" is the active category on page load, shown in `#f57e56`
- [ ] Inactive categories display in `#cbc5b4` and transition to `#b1aa9a` on hover at 150ms
- [ ] Sub-labels row shows correct sub-categories for the currently active industry in the correct color
- [ ] Category bar and sub-labels update automatically as the carousel scrolls
- [ ] First card for each category rests at approximately 25% from the left edge of the container
- [ ] Clicking a category scrolls the carousel to the first card for that industry in approximately 600ms ease-in-out
- [ ] After a category click, auto-scroll resumes from the new position
- [ ] The carousel loops seamlessly — no visible jump at the wrap point
- [ ] Sales card Studio message text uses `#5d5a56` in the default state and `#422457` on hover
- [ ] On mobile: carousel is touch-scrollable, auto-scroll is off, all cards remain desaturated, no label chips visible
- [ ] With reduced motion on: auto-scroll is paused, lift animation is suppressed, color transitions are preserved
- [ ] No horizontal overflow at 390px, 768px, 1280px, or 1440px viewport widths
