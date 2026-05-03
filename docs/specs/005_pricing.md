# Spec 005 — Pricing

**Status:** Ready for implementation  
**Figma file:** `XRbD11WIevI5szRFiRrguZ`  
**Figma node:**
- [Pricing section](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1071-253&m=dev) (node `1071:253`)

**Delivers:** A pricing section that sits directly above the Oversized Footer on the homepage — between the Work Showcase and the footer. It presents Keystone's single flat price, confirms all nine features are included, explains the credits model, and previews two coming-soon add-ons.

---

## What this section is

This section sits between the Work Showcase and the Oversized Footer. Its purpose is to present Keystone's pricing simply and confidently. The dominant visual is a massive "$49 / MONTH" price in two-tone type — bright mint for the dollar amount, darker teal for the period. Nine pill-shaped chips beneath the price confirm every tool is included. A short monospaced paragraph explains how credits work. Below that, a sparse "Add Ons" block previews two upcoming features — Marketplace and Payments — both labeled "Coming soon."

The section uses a very dark teal-green background and a cool mint palette, distinct from the warm orange of the Work Showcase above it and the deep maroon of the footer below.

---

## Scope

### In scope

- Section tagline
- "$49 / MONTH" price display
- Sub-copy beneath the price
- Nine feature chips in a centered wrap layout
- Credits explanation paragraph
- "ADD ONS" heading
- Marketplace add-on column
- Payments add-on column

### Out of scope

- Any section above or below this one
- Any interactive behavior (no hover states, no toggles, no accordions)
- Functional payment UI
- Any backend or pricing logic

---

## Visual design

### General

Section background: very dark teal-green `#0a1f1e`. All content is horizontally centered. At 1440px viewport width the section is approximately **980px tall**. Content has approximately 24px of horizontal padding on each side.

### Tagline

A single centered line at the very top of the section, approximately 64px below the section's top edge.

- Text: "Always-on Sales & Marketing"
- Font: FK Grotesk Neue Regular, 32px
- Color: `#4fafa0` (muted teal)
- Letter-spacing: −0.96px

### Price display

The visual centerpiece. A single line of oversized FK Screamer Bold type, centered. The "$49 " part is bright mint and "/ MONTH" is a darker teal — a deliberate two-tone effect on one line.

- "$49 " — color `#9febd7` (bright mint). The trailing space is intentional and part of the Figma design.
- "/ MONTH" — color `#399587` (dark teal)
- Font: FK Screamer Bold, all-caps
- Size: 168px
- Line-height: 0.82
- Approximately 104px below the tagline (top ~168px from section edge)

### Sub-copy

Two short lines of monospaced text centered beneath the price. Both lines are part of a single text block.

- Line 1: "Per location. Every tool included."
- Line 2: "No contracts. No negotiation. Simple to scale."
- Font: FK Grotesk Mono Regular, 16px
- Color: `#5bc3b3` (medium teal)
- Letter-spacing: −0.32px
- Line-height: 1.3
- Top: approximately 338px from the section edge

### Feature chips

Nine pill-shaped chips in a centered, wrapping layout. Max content width: 1177px. At desktop the chips naturally form two rows — five in the top row and four in the bottom row — with 12px gaps between chips in all directions.

**Chip appearance:**
- Shape: fully rounded pill
- Border: `#19524e` solid, 1.423px
- Background: none (transparent)
- Height: 54px
- Horizontal padding: 20px on each side
- Vertical padding: approximately 12–13px

**Chip contents:** Each chip holds a checkmark icon on the left and a label on the right, with a 12px gap between them.

- Icon: 23.25×23.25px checkmark SVG. Each of the nine chips has its own uniquely-colored checkmark icon (see SVG assets section below). The icon color is set via `var(--fill-0, #fallback)` in each SVG — the fallback color is the intended display color.
- Label: FK Grotesk Neue Regular, 21.138px, color `#f8f7f2` (off-white), letter-spacing −0.2114px

**Nine chips, in order (left-to-right, top row first):**

| # | Label | Figma node |
|---|-------|------------|
| 1 | "Your Website" | `1071:276` |
| 2 | "Your CRM" | `1071:280` |
| 3 | "Your Ads" | `1071:284` |
| 4 | "Your Sales" | `1071:288` |
| 5 | "Your Front Desk" | `1071:292` |
| 6 | "Your Social" | `1071:296` |
| 7 | "Your Reviews" | `1071:300` |
| 8 | "Your Content" | `1071:304` |
| 9 | "Your Listings" | `1071:308` |

The chip row begins at approximately 419px from the section top.

### Credits paragraph

A single centered block of small monospaced text beneath the chips.

- Text: "Keystone work runs on credits. Credits are usage-based and cover anything Keystone does for you. Posts written. Leads replied to. Campaigns launched. Reviews responded to."
- Font: FK Grotesk Mono Regular, 14px
- Color: `#5bc3b3`
- Letter-spacing: −0.28px
- Line-height: 1.3
- Max-width: 786px
- Top: approximately 587px from the section edge

### "ADD ONS" heading

A short all-caps centered heading directly above the add-on columns.

- Text: "ADD ONS"
- Font: FK Screamer Bold, 40px
- Color: `#5bc3b3`
- Letter-spacing: +0.8px (slightly expanded — positive value, unlike the negative tracking used elsewhere in the section)
- Line-height: 0.82
- Top: approximately 685px from the section edge

### Add-ons

Two columns displayed side-by-side, symmetrically centered in the section. At 1440px the left column begins approximately 330px from the left edge (width ~276px) and the right column begins approximately 833px from the left edge (width ~280px). Both columns are top-aligned at approximately 758px from the section top.

Both add-ons are labeled "Coming soon." Neither is interactive.

**Each column contains three vertically stacked elements:**

1. **Add-on pill chip** (dark background): a fully rounded pill with background `#0d2a28`, 20px horizontal padding, 12px vertical padding. Contains a "+" icon (24×24px) on the left and a label on the right, with a 12px gap.
2. **Description text**
3. **"Coming soon." line**

**Marketplace column** (left column, Figma node `1071:259`):
- Pill label: "Marketplace"
- Pill label font: FK Grotesk Neue Regular, 21.138px, `#5bc3b3`, letter-spacing −0.2114px
- Description: "Checkout, memberships, and bookings from Keystone's consumer platform."
- Description font: FK Grotesk Neue Regular, 16px, `#5bc3b3`, letter-spacing −0.32px, line-height 20px, centered
- Gap between pill and description: 24px
- Gap between description and "Coming soon.": 24px

**Payments column** (right column, Figma node `1071:267`):
- Pill label: "Payments"
- Pill label font: FK Grotesk Neue Regular, 21.138px, `#5bc3b3`, letter-spacing −0.2114px
- Description: "Standard payment processing on transactions."
- Description font: FK Grotesk Neue Regular, 16px, `#5bc3b3`, letter-spacing −0.32px, line-height 20px, centered
- Gap between pill and description: 29px
- Gap between description and "Coming soon.": 39px

**"Coming soon." text** (same styling in both columns):
- Font: FK Grotesk Neue Regular, 16px
- Color: `#f8f7f2` (off-white)
- Centered

---

## SVG assets

All ten SVG icons were exported from Figma and placed in `public/pricing/` with their final descriptive names. No additional downloads are needed.

| File | Description | Fill color | Figma icon node |
|------|-------------|------------|-----------------|
| `public/pricing/pricing-chip-icon-website.svg` | Checkmark for "Your Website" chip | `#FF6F5C` (orange-red) | `1071:277` |
| `public/pricing/pricing-chip-icon-crm.svg` | Checkmark for "Your CRM" chip | `#F297B7` (pink) | `1071:281` |
| `public/pricing/pricing-chip-icon-ads.svg` | Checkmark for "Your Ads" chip | `#F38BB0` (deep pink) | `1071:285` |
| `public/pricing/pricing-chip-icon-sales.svg` | Checkmark for "Your Sales" chip | `#9C65EE` (purple) | `1071:289` |
| `public/pricing/pricing-chip-icon-front-desk.svg` | Checkmark for "Your Front Desk" chip | `#5BC3B3` (teal) | `1071:293` |
| `public/pricing/pricing-chip-icon-social.svg` | Checkmark for "Your Social" chip | `#65CF78` (green) | `1071:297` |
| `public/pricing/pricing-chip-icon-reviews.svg` | Checkmark for "Your Reviews" chip | `#56A6FF` (blue) | `1071:301` |
| `public/pricing/pricing-chip-icon-content.svg` | Checkmark for "Your Content" chip | `#F1C131` (yellow) | `1071:305` |
| `public/pricing/pricing-chip-icon-listings.svg` | Checkmark for "Your Listings" chip | `#F57E56` (orange) | `1071:309` |
| `public/pricing/pricing-addon-icon.svg` | "+" icon used in both Marketplace and Payments add-on pill chips | `#F8F7F2` (off-white) | `1071:262` |

All nine checkmark icons share the same path shape (23.25×23.25px viewBox). Their fill colors differ: each SVG uses `var(--fill-0, #fallback)` where the fallback is the intended display color. The "+" icon is a distinct path on a 24×24px viewBox.

**Important:** The hash-to-chip mapping in the table above was inferred from the screenshot and the SVG fill colors. Before implementation, verify each file's fill color matches the intended chip by checking the Figma node at the reference links above. The SVG fill color is the single distinguishing property — if any mapping is incorrect it will be visible immediately.

---

## New design tokens required

Add to `styles/custom-overrides.css` before implementation:

| Token | Value | Used for |
|-------|-------|----------|
| `--color-pricing-bg` | `#0a1f1e` | Section background |
| `--color-pricing-tagline` | `#4fafa0` | Tagline text |
| `--color-pricing-price-primary` | `#9febd7` | "$49 " portion of the price |
| `--color-pricing-price-secondary` | `#399587` | "/ MONTH" portion of the price |
| `--color-pricing-accent` | `#5bc3b3` | Sub-copy, credits text, "ADD ONS" heading, add-on labels and descriptions |
| `--color-pricing-chip-border` | `#19524e` | Feature chip borders |
| `--color-pricing-chip-label` | `#f8f7f2` | Feature chip labels, "Coming soon." text, "+" icon |
| `--color-pricing-addon-chip-bg` | `#0d2a28` | Dark pill background in the add-on chips |

---

## Fonts

No new fonts are required. This section uses:

- FK Screamer Bold — already registered
- FK Grotesk Neue Regular — already registered
- FK Grotesk Mono Regular — already registered

---

## Responsive behavior

The Figma shows the desktop layout only. Adapt as follows:

- **Desktop (≥ 1280px):** Full layout as described. Feature chips: five chips across in the top row, four in the bottom row. Add-on columns side-by-side.
- **Tablet (768–1279px):** All elements centered and visible. Price display scales down proportionally. Feature chips wrap naturally (may form three or more rows). Add-on columns remain side-by-side at reduced widths.
- **Mobile (< 768px):** Price display scales down to fit without horizontal overflow. Feature chips wrap into two columns or single-column, maintaining the pill appearance. Add-on columns stack vertically — Marketplace on top, Payments below. All text scales down gracefully.

No element may overflow horizontally at any breakpoint.

---

## Content — all text and assets come from props

| Element | Default value |
|---------|---------------|
| Tagline | `"Always-on Sales & Marketing"` |
| Price amount | `"$49 "` (trailing space intentional) |
| Price period | `"/ MONTH"` |
| Sub-copy line 1 | `"Per location. Every tool included."` |
| Sub-copy line 2 | `"No contracts. No negotiation. Simple to scale."` |
| Feature chips | Array of 9 objects, each with a `label` string and an `iconSrc` string (see chips table above for label values and icon asset paths) |
| Credits text | `"Keystone work runs on credits. Credits are usage-based and cover anything Keystone does for you. Posts written. Leads replied to. Campaigns launched. Reviews responded to."` |
| Add-ons heading | `"ADD ONS"` |
| Add-on 1 label | `"Marketplace"` |
| Add-on 1 description | `"Checkout, memberships, and bookings from Keystone's consumer platform."` |
| Add-on 2 label | `"Payments"` |
| Add-on 2 description | `"Standard payment processing on transactions."` |
| Coming soon label | `"Coming soon."` (shared by both add-ons) |
| Add-on icon src | `"/pricing/pricing-addon-icon.svg"` (shared by both add-on pill chips) |

No text, label, description, or asset path may be hardcoded in the component file.

---

## Accessibility

- Feature chips are informational only — not interactive. They are not buttons and require no keyboard interaction.
- Add-on pill chips are visual-only — not interactive.
- The "+" icon in add-on chips is decorative — use `alt=""` or `aria-hidden="true"`.
- Checkmark icons in feature chips are decorative — use `alt=""` or `aria-hidden="true"`.
- Color contrast between `#5bc3b3` text and `#0a1f1e` background must meet WCAG AA. Feature chip labels (`#f8f7f2` on `#0a1f1e`) pass with very high contrast.

---

## Acceptance criteria

- [ ] Section background is very dark teal-green `#0a1f1e` across the full width at all viewport sizes
- [ ] "Always-on Sales & Marketing" tagline is centered, FK Grotesk Neue Regular 32px, color `#4fafa0`
- [ ] "$49 " is bright mint `#9febd7` and "/ MONTH" is dark teal `#399587`, both FK Screamer Bold 168px on the same line, line-height 0.82
- [ ] Sub-copy appears on two lines, centered, FK Grotesk Mono Regular 16px, color `#5bc3b3`
- [ ] Nine feature chips are displayed in a centered flex-wrap row, forming two rows (5 + 4) at desktop
- [ ] Each feature chip is a rounded pill with a `#19524e` border, transparent fill, 54px tall, 20px horizontal padding
- [ ] Each chip shows the correct checkmark icon on the left (23.25px × 23.25px) and its label in `#f8f7f2` on the right
- [ ] Chip gaps are 12px in both horizontal and vertical directions
- [ ] Credits paragraph is centered, FK Grotesk Mono Regular 14px, `#5bc3b3`, max-width 786px
- [ ] "ADD ONS" heading is centered, FK Screamer Bold 40px, `#5bc3b3`, with slightly positive letter-spacing
- [ ] Marketplace and Payments add-on columns appear side-by-side at desktop, symmetrically positioned around the section center
- [ ] Each add-on column shows a dark pill chip (`#0d2a28` background) with a "+" icon and the correct label
- [ ] Each add-on column shows the correct description in `#5bc3b3` and "Coming soon." in `#f8f7f2`
- [ ] The "+" icon and all checkmark icons have `alt=""` or `aria-hidden="true"`
- [ ] On mobile (< 768px), the two add-on columns stack vertically — Marketplace above Payments
- [ ] On mobile, the price display scales down proportionally with no horizontal overflow
- [ ] Feature chips wrap gracefully and remain fully readable at all tested widths
- [ ] No element overflows horizontally at 390px, 768px, 1280px, or 1440px viewport widths
- [ ] No text, label, or asset path is hardcoded in the component
