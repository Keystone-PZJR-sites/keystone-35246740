# Spec 008 — Lead Capture Modal

**Status:** Draft  
**Figma file:** `XRbD11WIevI5szRFiRrguZ`  
**Figma nodes:**
- [Modal — empty/resting state](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1182-605&m=dev) (node `1182:605`)
- [Modal — focused and filled state](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1182-5133&m=dev) (node `1182:5133`)

**Delivers:** A full-screen modal overlay that opens when any primary CTA button on the homepage is clicked. The entire page blurs and darkens behind a deep green overlay. A compact lead capture form appears centered on screen. The visitor fills it out and submits.

---

## What this is

A lead capture overlay that sits above the entire page. When a visitor clicks "Learn more" or "Get started" anywhere on the homepage, the modal fades in. The page content — videos, navigation, everything — blurs and darkens behind a deep green wash. A cream-colored form card appears centered in the viewport, anchored by the Keystone K mark floating above it. The visitor fills in their contact details and a brief description of their business, then clicks "Learn More." On success, the modal closes and the page returns to its normal state.

---

## Scope

### In scope

- Full-screen backdrop: dark green overlay with blur applied to everything behind it
- Keystone K mark centered above the card in the blurred space
- Form card with folded-corner shape, wordmark, subheadline, and all form fields
- Animated floating label on focus for all fields except the message field
- Submit button and Terms/Privacy links at the bottom of the card
- Success state after form submission
- Fade in and fade out transitions
- Close behavior: backdrop click, Escape key, successful submission
- Responsive behavior at all three breakpoints

### Out of scope

- Any section or page content itself
- The form fields' internal validation behavior
- Backend or API integration
- Any page other than the homepage — the modal is triggered only from homepage CTAs

---

## Visual design

### Backdrop

The backdrop is a full-viewport layer that covers the entire page — including the navigation bar at the top. Its color is the same deep dark green used as the hero background throughout the site, at heavy opacity. A blur is applied to all page content behind it. Whatever the page looks like at the moment the modal opens — whatever section is in view, whatever videos or text are visible — all of it blurs together into a softened, atmospheric dark green impression. Nothing behind the backdrop is sharp or readable.

The backdrop fills the screen completely, edge to edge. There are no gaps.

### Keystone K mark

The green Keystone geometric mark (the "K" symbol, same asset used in the navigation bar) floats centered horizontally above the card, visible in the blurred space. It sits well above the card's top edge, creating clear breathing room between the mark and the card. The mark uses the site's green accent color.

Nothing else accompanies it — no label, no ring, no additional element.

### Form card

The card is centered horizontally in the viewport and positioned in the upper-center area of the screen, with enough space above it for the K mark to breathe. See Figma node `1182:605` for exact dimensions and positioning.

**Background:** The same cream off-white used throughout the site. The card is not a plain rectangle — the top-right corner has a small diagonal cut, creating a subtle paper-fold or dog-ear effect. All other corners are sharp right angles — no rounding.

The card has consistent padding on all four sides. All content sits inside this padded area.

---

### Card content — top to bottom

#### Wordmark

The green "keystone" wordmark logotype at the top-left of the card content, in the site's green accent color. See Figma node `1182:605` for size.

#### Subheadline

One paragraph of supporting copy directly below the wordmark, with a small gap between them:

> "The modern sales and marketing team for local businesses. Reach out below to connect with our team."

Small body text in a muted warm gray, FK Grotesk Neue Regular, full content width. See Figma for exact type styles.

#### Form fields

Four form inputs stacked vertically with consistent gaps between them. The header group (wordmark + subheadline) is separated from the fields by a slightly larger gap.

All inputs share the same base visual treatment: a warm light gray background slightly darker than the card background, gently rounded corners, and consistent padding. All standard fields are the same height. The message field is the only exception — see below.

**First name / Last name** — Two equal-width inputs sitting side by side in a single row, with a gap between them. Placeholder text: "First name" and "Last name".

**Mobile phone number** — A full-width input. On its left side, before the text entry area, sits a compact country code dropdown. The dropdown is a small rounded-rectangle tile with a cream background (matching the card), a subtle drop shadow, a downward-pointing caret icon, and the text "+1". The text entry area fills the remaining width to the right of the dropdown. Placeholder: "Mobile phone number".

**Email address** — Full-width input. Placeholder: "Email address".

**Message** — Full-width input, noticeably taller than the others. Placeholder: "Tell us a little about your business, and how Keystone may be able to help." The text wraps across multiple lines. Same background and padding as the other inputs. **This field does not have the animated label behavior described below.**

#### Field states and animated label

This section applies to all fields except the message field.

**Empty / resting state**

The placeholder text sits vertically centered within the field at full size, in the same muted warm gray used for all placeholder copy. Background is the standard warm light gray. No border.

**Focus state**

When the visitor clicks into or tabs to a field, two things happen simultaneously in a smooth, quick animation:

1. The placeholder text shrinks noticeably and rises to sit at the top of the field interior, becoming a small floating label. Its color stays the same muted gray.
2. The text cursor appears below the label at full input size, in a dark near-black color.

At the same time, the field's background lightens to the same cream as the card background, and a visible border appears in a warm medium gray.

The floating label and the cursor sit close together, stacked vertically, centered as a pair within the field height. See Figma node `1182:5133` for exact type sizes, spacing, and border weight.

**Filled / non-focused state**

Once the visitor has typed something and moved focus away, the field returns to its standard light gray background and the border disappears — but the floating label **stays in its small, risen position** at the top of the field. The entered value remains visible at full size below it. The placeholder never returns to its large centered position as long as the field has a value.

**Empty / blur state**

If the visitor focuses a field, types nothing, and clicks away, the label animates back down — growing back to its full size and settling at the vertically centered position. Background returns to the standard light gray, border disappears.

#### Bottom row

At the bottom of the card, flush with the card's padded sides, two elements appear on the same horizontal baseline.

**Left side — Terms and Privacy links:** Two small underlined text links, "Terms" and "Privacy", sitting side by side with natural spacing. Small, muted warm gray text. See Figma for exact type styles.

**Right side — Submit button:** A fully rounded pill button in the site's green accent color, labeled "Learn More" with a small right-arrow icon to its right. Dark text. The button is right-aligned to the card's content edge. Horizontal padding is equal on both sides of the label, including the side adjacent to the arrow icon — no visual asymmetry. See Figma node `1182:605` for exact sizing.

---

## Open and close transitions

### Opening

When a visitor clicks a triggering CTA, the modal fades in. The backdrop and the card both fade in simultaneously — opacity from invisible to fully visible in a quick, smooth fade. There is no sliding, scaling, expanding, or sequencing. Everything appears at once.

### Closing

The modal closes in three situations:

1. The visitor clicks anywhere on the backdrop outside the card
2. The visitor presses the Escape key
3. The form is submitted successfully (see Success state below)

In all three cases, the backdrop and card fade out together in the same quick fade. The page reappears cleanly at its existing scroll position — no scroll reset, no layout shift.

**Reduced motion:** With reduced motion enabled in the visitor's operating system, the modal appears and disappears in a single instant. No fade in, no fade out — it is simply present or absent.

---

## Success state

After the visitor submits the form and the submission is received successfully, a brief confirmation message replaces the form fields inside the card. The card remains visible for a few seconds while the confirmation is displayed. The card then fades out using the same fade-out transition described above.

If the submission fails, an error message appears below the form fields. The card remains open and the visitor can try again.

---

## Data and integration

**Form fields are defined in the Keystone backend, not hardcoded.** The field labels, order, types, placeholder copy, and consent checkboxes all come from the lead form definition configured in the dashboard. This definition is fetched once when any page on the site loads and is available immediately — the modal opens with no loading state, no spinner, and no delay before the fields appear.

**Submission goes to the existing form endpoint.** When the visitor submits, their information is sent to the Keystone backend, which creates a contact record and triggers any configured follow-up. This is the same submission path used by every other form on the site (including the Contact page). No new backend work is required.

**What is already in place and does not need to be built:**
- The form definition is already fetched at the site level on every page load — this modal reads from that existing data, it does not fetch anything itself.
- The form submission endpoint already exists on this site.
- The consent checkboxes (SMS opt-in, Terms & Privacy) are driven by the backend form configuration — they appear or are omitted automatically based on how the form is configured in the dashboard.

**What is new and must be built:**
- The modal overlay, backdrop, and animation.
- The custom form field inputs with the animated floating label behavior (the existing site-wide form components do not have this interaction, so new input components are needed for the modal).
- The wiring between the homepage CTA buttons and the modal open/close state.

---

## What triggers the modal

Four CTA buttons on the homepage each open this modal:

1. **"Learn more"** — Hero section
2. **"Get started"** — Hero section
3. **"Learn more"** — Oversized Footer
4. **"Get started"** — Oversized Footer

All four currently behave as visual placeholders (linked to `#`). The modal replaces this behavior — clicking any of them opens the modal instead of navigating.

---

## Responsive behavior

**Desktop (≥ 1280px):** Full layout as described. Card is centered, with the K mark floating above it. See Figma for exact card width and vertical positioning.

**Tablet (768–1279px):** The card remains centered. A comfortable horizontal margin is maintained on each side at all times. The K mark stays centered above the card. If the card's natural height exceeds the available viewport height, the overlay becomes scrollable.

**Mobile (< 768px):** The card fills the full viewport width minus small margins on each side. All fields remain visible and fully usable. The K mark stays centered above the card. If the card exceeds the viewport height, the overlay scrolls vertically so the visitor can reach every field and the submit button.

No element may overflow the viewport horizontally at any breakpoint.

---

## Content — all text and assets come from props

| Element | Default value |
|---------|---------------|
| Keystone K mark | `KeystoneMark` component — pass the site's green accent color via the `color` prop |
| "keystone" wordmark | Green version of the wordmark (`public/images/keystone-wordmark.svg`) |
| Card background SVG | `public/lead-capture/lead-capture-card-bg.svg` (see Assets section below) |
| Subheadline | "The modern sales and marketing team for local businesses. Reach out below to connect with our team." |
| Submit button label | "Learn More" |
| Submit button arrow | `public/lead-capture/lead-capture-cta-arrow.svg` |
| Terms link href | `/terms-of-service` |
| Privacy link href | `/privacy-policy` |
| Form definition | The lead form definition loaded from the API (form type: `lead`). Fields, placeholder text, and consent checkboxes all come from this definition. |

No text, color, or asset path may be hardcoded in the component.

---

## SVG assets

All assets have been exported from Figma and are named and placed at their final paths.

| File | Description | Used for |
|------|-------------|----------|
| `public/lead-capture/lead-capture-card-bg.svg` | The cream card shape with the diagonal top-right corner cut (Figma node `1182:1398`). | Card background |
| `public/lead-capture/lead-capture-cta-arrow.svg` | Right-pointing arrow for the submit button. | "Learn More →" button |
| `public/lead-capture/lead-capture-caret-down.svg` | Downward-pointing caret for the country code dropdown. | Phone field country selector |
| `KeystoneMark` component (`components/elements/KeystoneMark.tsx`) | The Keystone geometric K mark, rendered as inline SVG. Already exists — no file needed. | Floating above the card |
| `public/images/keystone-wordmark.svg` | The "keystone" logotype. Already present. | Card header wordmark |

---

## New design tokens required

No new tokens are needed. All colors used in this component are part of the existing site palette already defined in `styles/custom-overrides.css`.

---

## Fonts

No new fonts are required. The modal uses FK Grotesk Neue Regular, which is already registered.

---

## Accessibility

- The modal must be announced to screen readers as a dialog.
- When the modal opens, keyboard focus must move to the first interactive element inside the card (the first name field).
- The Escape key must close the modal from any focused element within it.
- Clicking the backdrop must close the modal and count as an accessible dismissal — the backdrop must be reachable and operable by keyboard.
- When the modal closes, keyboard focus must return to the button that triggered it. This must not cause the page to scroll.
- All form inputs must have accessible labels.
- With reduced motion enabled: no fade animation in either direction.

---

## Acceptance criteria

- [ ] Clicking "Learn more" or "Get started" in the Hero section opens the modal
- [ ] Clicking "Learn more" or "Get started" in the Oversized Footer opens the modal
- [ ] The backdrop covers the full viewport edge to edge, including over the navigation bar
- [ ] The backdrop is dark green and heavy enough that page content behind it is barely perceptible — everything blurs into a dark wash
- [ ] The Keystone K mark appears centered above the card, with clear breathing room between the mark and the card's top edge
- [ ] The form card is centered horizontally in the viewport
- [ ] The card background is cream, matching the site's standard off-white
- [ ] The card's top-right corner has a small diagonal cut — all other corners are sharp right angles with no rounding
- [ ] The green "keystone" wordmark appears at the top-left of the card content
- [ ] The subheadline text appears in small, muted warm gray, FK Grotesk Neue, full content width
- [ ] First Name and Last Name inputs appear side by side in a single row with a gap between them
- [ ] All standard form inputs are the same height and share the same warm light gray background, rounded corners, and consistent padding
- [ ] The mobile phone field has a country code dropdown with a caret icon and "+1" label on its left side
- [ ] The message field is noticeably taller than the other fields and displays its full multi-line placeholder without cutoff
- [ ] In the resting state, placeholder text for all non-message fields sits vertically centered at full size in muted warm gray
- [ ] Clicking into any non-message field triggers a smooth, quick animation: the placeholder text shrinks noticeably and rises to sit as a small label at the top of the field, the background lightens to match the card, and a visible border appears
- [ ] While a field is focused, the text cursor appears below the floating label in dark near-black
- [ ] After typing and clicking away, the floating label stays small at the top of the field — it does not return to center while the field has a value
- [ ] If focus leaves an empty field, the label animates back down to its full-size centered position, the background returns to the standard light gray, and the border disappears
- [ ] The message field has no animated label behavior — it behaves as a plain textarea throughout
- [ ] "Terms" and "Privacy" appear at the bottom-left of the card as small underlined links in muted gray
- [ ] The "Learn More →" submit button appears at the bottom-right of the card — green pill, dark text, with a right-arrow icon
- [ ] The submit button has equal horizontal padding on both sides, with no visual asymmetry around the arrow
- [ ] The modal fades in with the backdrop and card appearing simultaneously — no sequencing, no sliding or scaling
- [ ] Clicking anywhere on the backdrop outside the card closes the modal
- [ ] Pressing Escape closes the modal
- [ ] The modal fades out with the backdrop and card disappearing together
- [ ] After successful form submission, a confirmation message appears in the card and the modal closes after a brief pause
- [ ] If form submission fails, an error message appears inside the card and the modal stays open
- [ ] When the modal closes, keyboard focus returns to the button that triggered it — without the page scrolling
- [ ] On tablet (768–1279px): card remains centered with a comfortable horizontal margin on each side
- [ ] On mobile (< 768px): card fills the full width minus small side margins, all fields and the submit button are reachable
- [ ] No element overflows the viewport horizontally at 390px, 768px, 1280px, or 1440px widths
- [ ] With reduced motion on: the modal appears and disappears instantly — no fade in or out
- [ ] No text, color, or asset path is hardcoded in the component
