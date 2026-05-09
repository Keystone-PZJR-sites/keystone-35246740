# Spec 021 — Mobile Pricing Section

**Status:** Ready for implementation
**Figma node:** [Pricing — mobile](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1281-583&m=dev) (node `1281:583`)

**Position:** Replaces `PricingSection` on mobile. `PricingSection` is hidden below 768px; `MobilePricingSection` is hidden at 768px and above.

**Depends on:** Spec 015, Spec 016

---

## What this section is

The mobile counterpart to the desktop pricing section. It presents the same pricing information — plan tagline, price, sub-copy, credits description, and two add-ons — but in a vertically stacked, centered, single-column layout optimised for a phone viewport. The nine feature chips shown on the desktop are not shown on mobile.

---

## Scope

### In scope

- Full-viewport `h-screen` section, pinned via `createSectionPin` (mobile only)
- Tagline, price, sub-copy, "ADD ONS" heading, credits text
- Two add-on pills with "+" icon and description columns
- "Coming soon." labels for both add-ons

### Out of scope

- The nine feature chips (desktop-only)
- Any entrance animation (no staged reveal — `isAnimComplete` returns `true` immediately)

---

## Visual design

**Background:** `#0a1f1e` — same dark teal as the desktop pricing section.

**Canvas reference:** 393 × 852 px. All spacing values below are in px on this canvas.

### Layout (top to bottom)

All content is horizontally centered on the section. The layout is composed of a flex column or absolutely positioned elements per the exact Figma coordinates:

**Tagline** (`top: 56px`)
- Font: FK Grotesk Neue Regular, 24px, line-height `none`, letter-spacing −0.72px
- Color: `#4fafa0`
- Width: ~190px, centered
- Text: "Always-on Sales & Marketing"

**Price display** (`top: 144px`)
- Font: FK Screamer Bold, 100px, line-height 0.82, uppercase
- Two inline spans:
  - Amount: `#9febd7` — e.g., "$49 " (trailing space is intentional)
  - Period: `#399587` — e.g., "/ MONTH"

**Sub-copy block** (`top: 251px`)
- Font: FK Grotesk Mono Regular, 12px, line-height 1.3, letter-spacing −0.24px
- Color: `#5bc3b3`
- Text-align: center
- Two lines separated by 12px margin: `subCopyLine1` then `subCopyLine2`

**"ADD ONS" heading** (`top: 365px`)
- Font: FK Screamer Bold, 40px, line-height 0.82, uppercase, letter-spacing 0.8px
- Color: `#5bc3b3`
- Centered

**Credits paragraph** (`top: 422px`)
- Font: FK Grotesk Mono Regular, 12px, line-height 1.3, letter-spacing −0.24px
- Color: `#5bc3b3`
- Text-align: center
- Max-width: ~309px

**Add-on pills row** (`top: 542px`)
- Two pills side by side (flex row, gap between them) — approximately left=31px and left=218px for a 393px canvas
- Each pill: dark background `#0d2a28`, border-radius full (rounded pill), padding 9px 15px, gap 9px
- "+" icon: 18px × 18px SVG from `addonIconSrc`
- Label: 16px FK Grotesk Neue Regular, line-height ~22px, letter-spacing −0.16px, color `#5bc3b3`

**Add-on descriptions** (`top: 603px`)
- Two columns side by side (flex row, gap 9px, left=24px)
- Each column: 168px wide, 8px padding, centered text
- Description: 12px FK Grotesk Neue Trial Regular, line-height 15.3px, color `#5bc3b3`
- "Coming soon." label: same size, color white (`#ffffff`)

---

## Animation

No entrance animation. The section pins via `createSectionPin` (mobile only: `max-width: 767px`) with `isAnimComplete: () => true`.

Reduced motion: no change required (no animation to disable).

---

## Technical notes

- Component file: `components/sections/MobilePricingSection.tsx`
- CSS file: `styles/sections/mobile-pricing.css`
- Props type: `MobilePricingSectionProps` — a subset of `PricingSectionProps` (no `featureChips`)
- `PricingSection` gains `hidden md:block` on its root `<section>` element
- The `(max-width: 767px)` pin branch added to `PricingSection` previously is removed — redundant once the desktop component is hidden on mobile
- `addonIconSrc` is `/pricing/pricing-addon-icon.svg` (existing asset)
- The `addOnsHeading` prop is kept for prop-driven content consistency
- No `featureChips` prop — not shown on mobile
- `sectionPin.ts` debug color: `'mobile-pricing-pin'`

---

## Acceptance criteria

- [ ] Below 768px: `MobilePricingSection` is shown; `PricingSection` is hidden
- [ ] At 768px and above: `PricingSection` is shown; `MobilePricingSection` is hidden
- [ ] Tagline renders in correct font, color, and size
- [ ] Price amount and period render as two spans with their respective colors
- [ ] Sub-copy renders as two centered lines with correct spacing
- [ ] "ADD ONS" heading renders in correct font, color, and uppercase
- [ ] Credits text renders centered with correct font and color
- [ ] Two add-on pills render side by side with "+" icon and label
- [ ] Two add-on description columns render below the pills
- [ ] Each description column shows the description text and "Coming soon." in white
- [ ] Section pins on mobile via `createSectionPin`
- [ ] No feature chips are rendered
- [ ] TypeScript and ESLint pass with zero errors
