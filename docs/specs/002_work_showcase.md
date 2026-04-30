# Spec 002 — Work Showcase

**Status:** Draft  
**Figma file:** `XRbD11WIevI5szRFiRrguZ`  
**Figma nodes:**
- [All states overview](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1009-26343&m=dev) (node `1009:26343`)
- [Default state — no focus](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1009-25909&m=dev) (node `1009:25909`)
- [Sales item focused — Health & Body](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1009-24888&m=dev) (node `1009:24888`)
- [Ads item focused — Health & Body](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1009-25218&m=dev) (node `1009:25218`)
- [Social item focused — Health & Body](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1009-25057&m=dev) (node `1009:25057`)
- [Web item focused — Health & Body](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1009-25379&m=dev) (node `1009:25379`)
- [Content item focused — Health & Body](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1009-26073&m=dev) (node `1009:26073`)
- [Sales item focused — Food & Drink](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1009-25564&m=dev) (node `1009:25564`)

**Delivers:** The second section of the homepage — an auto-scrolling showcase of client work organized by industry.

---

## What this section is

The second section on the homepage. Visitors reach it by scrolling normally after the hero animation completes. The section has a warm cream background and presents a continuously auto-scrolling carousel of client work examples — screenshots and mockups of sales conversations, paid ads, social posts, websites, and blog content — organized by industry.

A category bar at the bottom lets visitors jump to a specific industry. As the carousel moves, the work example closest to the center of the section is always shown in focus: it lifts upward, its colors become vivid, and a label chip appears below it identifying the type of work. All other visible items remain desaturated and at rest.

---

## Scope

### In scope

- Section headline
- Auto-scrolling work example carousel (all industries in one flat, continuous loop)
- Work example focus states (lift and colorize the centered item; desaturate all others)
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

The section background is warm cream `#f0eee6`. On desktop the section is **1024px tall** at 1440px viewport width. There is 24px of horizontal padding on both edges — the headline and category bar are centered within the full 1440px width, and the carousel overflows beyond the right edge (clipped by the section boundary).

### Headline

Positioned with its vertical center at 78px from the section's top edge. The text is center-aligned and naturally breaks into two lines.

- Text: "Marketing that works as hard as you do."
- Font: FK Grotesk Neue Regular
- Size: 32px
- Line height: 1.2
- Color: `#4f4d4a`
- Letter spacing: −0.96px

### Carousel track

The carousel begins 156px from the top of the section and is 662px tall in the default state (no item focused). Its left edge starts at 24px from the section's left edge. Items inside are laid out in a single horizontal row with 32px gaps between each item.

### Work example cards — default state (no focus)

Every card is rendered in a warm desaturated tone — think sepia-grayscale. All photographic color is removed. The UI elements and text within each card are rendered in warm gray tones consistent with the section's warm cream palette. Nothing is pure black-and-white; the desaturation respects the warmth of the overall palette.

Each card sits with 24px of empty space above it within the carousel track — the card's top edge is 24px below the top of the carousel track, and all cards are bottom-aligned to the same baseline within the track.

**Card dimensions (default state):**

| Type | Label chip text | Width | Height |
|------|-----------------|-------|--------|
| Sales (mobile chat) | SALES | 302px | 638px |
| Ads (social story) | ADS | 286px | 594px |
| Social (Instagram post) | SOCIAL | 292px | 424px |
| Web (website screenshot) | WEB | 868px | 583px |
| Content (blog article) | CONTENT | 316px | 583px |

The web card is notably wider than the others. At 868px it takes up roughly 60% of the desktop viewport width by itself and shows a horizontal slice of a real client website — header navigation, a full-width hero image, headline, and a call-to-action button.

### Work example cards — focus state

Exactly one card is in focus at all times during auto-scroll: the card whose center point is closest to the horizontal center of the section. When that card is in focus:

**1. The card lifts 24px upward.**
Its top edge moves 24px higher than in the default state. Its bottom edge stays at the same position. The 24px gap that was above the card in default state disappears as the card rises to fill it.

**2. The card transitions to full color.**
The desaturation lifts entirely. Photographic images become vivid. Brand colors in the UI elements become vivid. The transition from desaturated to color is smooth, approximately 200ms.

**3. A label chip appears below the card.**
The chip appears 16px below the card's bottom edge, horizontally centered under the card. It is a fully rounded pill. Background: `#ffbb8a` (warm peach). Text color: `#9f3722` (deep red-brown). Font: FK Grotesk SemiMono Trial Regular at 12px, all-caps. Horizontal padding: 12px. Vertical padding: 5px top, 4px bottom. See node `1009:24944` for the exact chip proportions.

**4. All other visible cards stay at their default vertical position.**
There is no downward animation applied to non-focused cards. They remain at their rest baseline. The focused card rising 24px above them creates the visual impression that the others have sunk — but only the focused card moves.

The lift animation is smooth and quick, approximately 200ms. The color transition runs concurrently.

### Category bar

Centered horizontally in the section, with its top edge at 890px from the section top. Height: 41px. The five category labels are laid out in a horizontal row with 24px gaps between them.

**Five industries in order:**

| Label | State on load |
|-------|---------------|
| HEALTH & BODY | Active |
| FOOD & DRINK | Inactive |
| HOME & PROPERTY | Inactive |
| MONEY & BUSINESS | Inactive |
| CARE & MAINTENANCE | Inactive |

**Active category:**
- Color: `#f57e56` (warm orange)
- Font: FK Screamer Bold
- Size: 50px
- Line height: 0.82
- All caps

**Inactive category:**
- Color: `#cbc5b4` (warm gray)
- Same font, size, and line height
- All caps

When a category becomes active its color transitions from `#cbc5b4` to `#f57e56`. The transition is smooth, approximately 300ms.

### Sub-labels row

Centered horizontally in the section, with its top edge at 963px from the section top. Shows the sub-category breakdown for the currently active industry, with items separated by bullet points.

- Font: FK Grotesk Mono Regular
- Size: 18px (bullet separators at 16px)
- Color: `#f57e56` (same orange as active category)
- Letter spacing: −0.36px
- Items and separators are baseline-aligned with 8px gap between each

**Sub-labels by industry:**

| Industry | Sub-labels |
|----------|------------|
| Health & Body | Fitness • Wellness • Beauty • Grooming • Medical • Dental |
| Food & Drink | Restaurants • Cafés • Bars • Food Trucks • Bakeries • Catering |
| Home & Property | *(confirm from Figma before implementation)* |
| Money & Business | *(confirm from Figma before implementation)* |
| Care & Maintenance | *(confirm from Figma before implementation)* |

The Home & Property, Money & Business, and Care & Maintenance sub-label lists are not yet confirmed in the Figma. They must be verified before implementation begins.

---

## Carousel behavior

### Flat array order

All work examples across all industries sit in a single, ordered, flat array. The order is:

1. Health & Body — Sales, Ads, Social, Web, Content
2. Food & Drink — Sales, Ads, Social, Web, Content
3. Home & Property — Sales, Ads, Social, Web, Content
4. Money & Business — Sales, Ads, Social, Web, Content
5. Care & Maintenance — Sales, Ads, Social, Web, Content

Total: 25 cards (5 industries × 5 types). After the last card, the carousel loops seamlessly back to the first Health & Body Sales card. There should be no visible jump or flash at the loop point.

### Auto-scroll speed and direction

The carousel moves continuously from right to left (cards enter from the right, exit to the left). The pace is steady and leisurely — visitors should feel they have time to read each card without rushing. Exact speed is to be tuned during implementation; a starting point of approximately one card width every 4 seconds is suggested. The auto-scroll never pauses.

### Focus tracking during scroll

As the carousel moves, the card whose horizontal center is closest to the center of the section's visible width is always the focused card. Focus passes from one card to the next as the carousel moves — the transition between focused states is smooth (the outgoing card desaturates and lowers back to the rest position while the incoming card colorizes and lifts). The two transitions overlap slightly so there is never a moment with zero focused cards.

### Active-category tracking during scroll

As the focused card changes, the category bar and sub-labels row update to reflect which industry the focused card belongs to. When a Health & Body card is focused, "HEALTH & BODY" is active in orange. When the focus shifts to the first Food & Drink card, "FOOD & DRINK" becomes active. This happens without any user interaction.

### Category click behavior

When a visitor clicks a category label:

1. The carousel animates (smooth ease-in-out, approximately 600ms) to a position where the first work example for that industry is centered in the visible section.
2. The clicked category becomes the active category in the bar.
3. The sub-labels row immediately updates to show that industry's sub-categories.
4. Auto-scroll resumes from the new position and continues through the remaining items for that industry, then through subsequent industries.

---

## Work example card content

Each card is a realistic, detailed mockup showing actual marketing work. All text, images, brand colors, and UI elements within the cards are real — not placeholder boxes or lorem ipsum.

**Health & Body (example client: X2O Studio — a Pilates and fitness studio):**

| Type | Card content |
|------|-------------|
| Sales | A mobile SMS/chat interface. A conversation between X2O Studio and a prospective client named Jamie, booking a free 30-minute intro consultation. Messages show the back-and-forth of scheduling for Thursday at 5:30pm. The studio's messages are on the left; Jamie's are on the right. |
| Ads | A mobile social story format. An X2O Studio profile header ("x2o Studio / Sponsored"), four workout photos in a 2×2 grid (gym equipment, instructor, people on reformers), a short caption about low-impact full-body classes, and a "Learn More" button with a link icon at the bottom. |
| Social | An Instagram post card. X2O Studio profile header, a single vivid action photo of someone on a reformer, engagement icons (heart, comment, share, bookmark), and a caption: "Starting the day strong with @MovaPilates! Join us for a class! #pilates #fitness #healthylifestyle". |
| Web | A wide website screenshot. Top navigation with X2O Studio logo, Locations / Blog / About Us / FAQ links, and "Buy Classes" / "Book Now" buttons. A full-width hero image with "High Intensity. Low Impact. Real Results." in large white type. A "Book Your Class" button. Below the fold: "Train Your Way at X2O Studio" heading and three thumbnail images. |
| Content | A blog article card. "BLOG" tag, headline "A Personal Journey to Strength and Flexibility", byline "by Ellen Piccolotti", a photo of a Pilates session, and several paragraphs of article body text about Pilates vs. weight training. |

**Food & Drink:** The Figma shows this industry's carousel begins with a chat/Sales card of the same format as Health & Body. Full card assets for all Food & Drink items, and all remaining industry items, must be provided before implementation.

---

## New design tokens required

Add these to `styles/custom-overrides.css` before implementation. All are first appearances in the codebase:

| Token name | Hex value | Used for |
|------------|-----------|----------|
| `--color-work-accent` | `#f57e56` | Active category label, sub-labels, label chip text border |
| `--color-work-muted` | `#cbc5b4` | Inactive category labels |
| `--color-work-text` | `#4f4d4a` | Section headline |
| `--color-work-chip-bg` | `#ffbb8a` | Focus label chip background |
| `--color-work-chip-text` | `#9f3722` | Focus label chip text |

The section background (`#f0eee6`) already exists as `--color-hero-text` and must be reused under that token name until a shared background token is introduced.

---

## New font required

The focus label chip uses **FK Grotesk SemiMono Trial Regular**. This variant is not yet registered in `custom-overrides.css`. The font file must be obtained, placed in `public/fonts/`, and registered with `@font-face` before the label chip can be implemented. Until the file is provided, use FK Grotesk Mono Regular as a fallback — it is already registered and visually similar.

---

## Responsive behavior

- **Desktop (≥ 1280px):** Full experience as described above.
- **Tablet (768–1279px):** Carousel auto-scrolls and is visible. Category bar and sub-labels are present at proportionally reduced sizes. Focus states apply on hover. The Figma does not show a tablet layout — implement as a proportional scale-down of the desktop layout and verify visually.
- **Mobile (< 768px):** Carousel is stationary and swipeable by touch (no auto-scroll). All cards remain in their default desaturated state — no lift, no color, no label chips. The category bar and sub-labels are hidden. No hover-based interactions.

At all breakpoints, no element may overflow horizontally at the section container level.

---

## Content — all text and assets come from props

| Element | Default value |
|---------|---------------|
| Headline | "Marketing that works as hard as you do." |
| Industries | Array of industry objects. Each object has: a `name` string, a `subLabels` array of strings, and a `workItems` array |
| Work item type label | One of: "SALES", "ADS", "SOCIAL", "WEB", "CONTENT" |
| Work item image(s) | One or more image URLs per card |

No industry name, sub-label string, card image URL, or label chip text may be hardcoded in the component file. All content passes through props.

---

## Acceptance criteria

- [ ] Section background is warm cream `#f0eee6`
- [ ] Headline "Marketing that works as hard as you do." is centered, FK Grotesk Neue Regular, 32px, color `#4f4d4a`
- [ ] Carousel auto-scrolls continuously without ever pausing
- [ ] All cards in the default state appear in warm desaturated (sepia-grayscale) tones — no vivid color
- [ ] The card whose center is closest to the section's horizontal center is always in the focused state
- [ ] Only one card is in the focused state at any time during auto-scroll
- [ ] The focused card's top edge is 24px higher than in the rest state
- [ ] The focused card's images and UI elements are in full color
- [ ] A peach pill (`#ffbb8a` background, `#9f3722` text) appears 16px below the focused card, horizontally centered under it, showing the work type label in all-caps
- [ ] Non-focused cards do not move — they remain at their rest vertical position
- [ ] The transition between focused/unfocused states is smooth (approximately 200ms) with no flash
- [ ] "HEALTH & BODY" is the active category on page load, shown in orange `#f57e56`
- [ ] Inactive categories display in warm gray `#cbc5b4`
- [ ] The sub-labels row shows the correct sub-categories for the currently active industry, in orange `#f57e56`
- [ ] The category bar and sub-labels update automatically as the carousel scrolls items from different industries into the center position
- [ ] Clicking a category button scrolls the carousel to center the first item for that industry within approximately 600ms using a smooth ease-in-out curve
- [ ] After a category click, auto-scroll resumes from the new position
- [ ] The carousel loops seamlessly — no visible jump or flash when it wraps from the last item back to the first
- [ ] Hovering a card with the mouse immediately transfers focus to that card (lift, colorize, label chip)
- [ ] Moving the cursor away from a card returns to the nearest-to-center focus behavior
- [ ] On mobile: carousel is touch-scrollable, auto-scroll is off, all cards remain desaturated, no label chips visible
- [ ] With reduced motion on: auto-scroll is paused, the lift animation is suppressed, focus state colors are still applied (no motion, but color change is preserved)
- [ ] No horizontal overflow at 390px, 768px, 1280px, or 1440px viewport widths
