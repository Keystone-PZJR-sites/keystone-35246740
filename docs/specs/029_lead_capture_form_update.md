# Spec 029 — Lead Capture Form Update

**Status:** Draft  
**Realigns:** Spec 008 (Lead Capture Modal), Spec 028 (No Auto-Focus)  
**Figma file:** `XRbD11WIevI5szRFiRrguZ`  
**Figma nodes:**
- [Section overview — all breakpoints](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1182-5181) (node `1182:5181`)
- [Desktop — form open](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1369-463) (node `1369:463`)
- [Desktop — success](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1422-15220) (node `1422:15220`)
- [Tablet — form open](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1389-598) (node `1389:598`)
- [Mobile — form open](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1381-3109) (node `1381:3109`)
- [Mobile — form open, bottom aligned](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1422-1140) (node `1422:1140`)
- [Mobile — success](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1422-15315) (node `1422:15315`)
- [Flag icon library](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1422-1466) (node `1422:1466`)

---

## What this spec changes

This spec replaces the visual design, entry/exit animations, responsive layout, and phone input treatment of the lead capture modal introduced in Spec 008. It does **not** replace the backend integration, form field definitions, submission logic, scroll lock, focus management, or any behaviour described in Spec 028 — all of that carries forward unchanged.

The central shift is from a centered overlay card to a **breakpoint-aware slide-in card**: on desktop it enters from the right, on tablet and mobile it rises from the bottom. Each breakpoint has a distinct card shape and close mechanism. The entire experience is designed to feel like a fast, purposeful single-page app transition — not a modal popup.

---

## Breakpoints

| Label | Range |
|---|---|
| Mobile | < 640px |
| Tablet | 641 – 1023px |
| Desktop | ≥ 1024px |

---

## What does not change

Everything in Spec 008 and Spec 028 that is not explicitly overridden here remains in effect:

- `useLeadSubmit` hook and the `/api/form` POST endpoint
- `useFormDefinitions()` — form fields, placeholders, consent checkboxes, and company name all come from the backend definition
- `classifyField` routing in `lib/leadFormFields.ts`
- `CheckboxField` and `CheckboxGroupField` — backend-driven consent fields
- `LeadCaptureContext`, `LeadCaptureProvider`, `useLeadCapture` — the context and provider API are unchanged
- Scroll lock via `lockScroll()` on modal open
- Visual Viewport height sync for mobile soft keyboard
- `createPortal` to `document.body`
- Focus management: on open, focus moves to the card container (`tabIndex={-1}`), not to any field (Spec 028)
- Escape key closes the modal
- Clicking or tapping outside the card closes the modal
- On close, focus returns to the triggering element without scrolling the page
- Reduced motion: all entrance and exit animations are suppressed; the modal appears and disappears instantly

---

## Overlay

The dark green semi-transparent backdrop (`lc-backdrop`) is unchanged in color and blur. It fades in over **200 ms** (`ease-out`) as the trigger is clicked. The card enters simultaneously — the fade and the slide are independent GSAP tweens that start at the same moment.

The overlay covers the full viewport edge to edge including the navigation bar, identical to Spec 008.

---

## Desktop layout and entry (≥ 1024px)

### Card position

The card is **708px wide** and occupies the right half of the screen. It is pinned to the right edge of the viewport with a **24px margin** on the right and top. The bottom of the card stops 24px from the bottom of the viewport. The card does not extend behind the navigation bar — the 24px top margin clears it.

The Keystone K mark that appeared floating above the card in Spec 008 does not appear in this layout. The K mark is part of the card header instead (see Card header below). The wordmark is not in the card header.

### Card shape

All four corners are rounded — `border-radius: 20px` (`--radius-3xl`). This replaces the folded top-right corner from Spec 008. The card background remains the same cream off-white (`var(--bg/200, #f0eee6)`).

### Card entry animation

When the overlay fades in, the card simultaneously **slides in from the right**: it starts 100% of its own width offscreen to the right (`translateX(100%)`) and translates to its resting position in **300 ms** with a `cubic-bezier(0.22, 1, 0.36, 1)` ease (a gentle deceleration — fast start, soft landing). Both tween start at `t = 0`.

### Progressive content reveal

After the card reaches its resting position (at `t = 300ms`), the card's content elements reveal themselves **row by row, top to bottom** with a staggered fade. Each row fades from `opacity: 0` to `opacity: 1` with a slight upward drift (`translateY(8px)` → `translateY(0)`). Each row's reveal takes **200 ms** at `ease-out`. The stagger interval between rows is **40 ms** — fast enough to read as a single flowing motion, slow enough to feel intentional.

The rows, in order:

1. Keystone K mark + close button (top of card)
2. Subheadline
3. Form section header ("TELL US ABOUT YOUR BUSINESS")
4. First Name + Last Name row
5. Mobile Phone input
6. Email input
7. Business info textarea
8. Terms text + CTA row (Cancel + Get in Touch)

Before the reveal begins, all card content is `opacity: 0`. This initial hidden state is set synchronously as the card mounts — not via GSAP — so there is never a flash of visible content before the animation starts.

### Close mechanism

A **close button** (`×`) sits in the top-right area of the card, 40×40 px, with a fully rounded background. It replaces the X from the old centered card design. Clicking it closes the modal using the same exit animation described in the Exit animation section below.

### Card exit

On close (close button click, backdrop click, Escape, or post-success auto-close), the card **slides back out to the right** (`translateX(0)` → `translateX(100%)`) in **250 ms** with `cubic-bezier(0.4, 0, 1, 1)` ease (fast out). The overlay backdrop fades out simultaneously over **200 ms**. After both are complete, the modal unmounts.

---

## Tablet layout and entry (641 – 1023px)

### Card position

The card is **centered horizontally** in the viewport with `24px` margins on each side. It is positioned in the upper area of the screen with a `24px` top margin. The card width fills the available width minus margins (`calc(100% - 48px)`), up to a maximum of `786px` (matching the Figma tablet frame width). Card height is determined by content.

The card is internally scrollable when content exceeds the visible card height.

### Card shape

Same as desktop: all four corners rounded at `border-radius: 20px`. Card has the same cream background.

### Card entry animation

The card **slides in from the bottom**: it starts fully below the viewport (`translateY(100%)`) and translates upward to its resting position in **300 ms** with the same `cubic-bezier(0.22, 1, 0.36, 1)` ease as desktop. The overlay fade starts at `t = 0`, the slide starts at `t = 0`.

### Progressive content reveal

Identical to desktop — same rows, same 40 ms stagger, same 200 ms per row, same `translateY(8px)` drift.

### Close mechanism

Same close button (`×`) in the top-right of the card as desktop. Same backdrop-click and Escape behavior.

### Card exit

The card **slides back down** (`translateY(0)` → `translateY(100%)`) in **250 ms** with the same fast-out ease. Overlay fades out simultaneously.

---

## Mobile layout and entry (< 640px)

### Card position

The card sits at the **very bottom of the viewport**, flush with the bottom edge. There are no side margins — the card spans the full viewport width. The card does not have a fixed height; it expands to fit its content, up to the available viewport height minus the navigation bar area. If card content exceeds the available height (which it typically will, especially with the keyboard open), the card scrolls internally.

### Card shape

The card has **rounded top corners only**: `border-top-left-radius: 16px` and `border-top-right-radius: 16px`. The bottom corners are sharp — no radius. This is the standard bottom sheet treatment. The card background is the same cream off-white.

### Card entry animation

The card **slides up from the bottom**: it starts fully below the viewport (`translateY(100%)`) and translates upward to its resting position (bottom edge flush with viewport bottom) in **300 ms** with the same `cubic-bezier(0.22, 1, 0.36, 1)` ease. The overlay fade starts at `t = 0`.

### Safe area

The card's **content padding at the bottom** must account for the device safe area: `padding-bottom: max(16px, env(safe-area-inset-bottom))`. This prevents the CTA row from sitting under the iOS home indicator. The card itself remains flush with the bottom — only the inner content padding adjusts.

### Progressive content reveal

Same rows, timing, and easing as desktop and tablet.

### Close mechanism — pull bar

There is **no close button** (×) on mobile. Instead, a **centered pull bar** — a 40×4 px rounded pill in `var(--bg/600, #cbc5b4)` — sits at the top center of the card, 16px from the top edge.


#### Drag to close

When the visitor begins dragging the card downward from the pull bar area (or from anywhere on the card header), the card follows the drag: `translateY(dragDelta)` where `dragDelta` is the distance dragged in the downward direction only (upward drags are clamped to 0). The overlay opacity scales inversely with drag distance, reaching `0` at the dismiss threshold.

**Dismiss threshold:** If the visitor releases the drag having moved more than `120px` downward, or with a downward velocity greater than `400px/s`, the card animates to fully off-screen and the modal closes. If neither threshold is met, the card springs back to its resting position in **200 ms** with `cubic-bezier(0.22, 1, 0.36, 1)`.

The drag behavior is touch-only (`touchstart`, `touchmove`, `touchend`). Pointer events (mouse drag) do not trigger it on mobile.

### Card exit

On dismiss (tap pull bar, swipe to threshold, or backdrop click above card), the card **slides back down** (`translateY(0)` → `translateY(100%)`) in **250 ms** fast-out ease. Overlay fades out simultaneously.

---

## Card content — all breakpoints

### Card header

At the top of the card (inside the card, above the form):

- **Left:** Keystone K mark (the existing `KeystoneMark` component) at 31×34 px, vertically centered with the subheadline
- **Right (desktop + tablet):** Close button (`CloseButton` component — see Component Library section)
- **Top center (mobile):** Pull bar in place of close button

Immediately below the header row, a short subheadline in `FK Grotesk Neue Regular`, warm gray (`var(--text/500, #989281)`), ~20px / 28px line-height on desktop, with partial bold-green emphasis on the phrase "modern sales and marketing team".

### Form section header

Below the subheadline, the text "TELL US ABOUT YOUR BUSINESS" in `FK Screamer Bold` at 56px on desktop/tablet (40px on mobile), dark green with "YOUR BUSINESS" in the site's light green accent (`#66cc86`).

### Form fields

The form fields are **not hardcoded**. They come from `useFormDefinitions()` exactly as in Spec 008. The `classifyField` function determines the input type rendered for each field. The existing `FloatingLabelInput`, `PhoneInput`, `CheckboxField`, `CheckboxGroupField`, and textarea branches all continue to apply.

**Desktop and tablet layout:** First Name and Last Name appear **side by side** in a single row. All other fields are full-width.

**Mobile layout:** First Name and Last Name **stack vertically** (each full-width). All other fields remain full-width.

The `lc-field-row` → `lc-field-row-item` pattern that renders side-by-side fields is already driven by the backend field definition. To collapse it on mobile, the `lc-field-row` CSS class gains a media query:

```css
@media (max-width: 639px) {
  .lc-field-row {
    flex-direction: column;
  }
}
```

### Field heights

Desktop/tablet fields: 60px (unchanged from Spec 008).  
Mobile fields: 52px. The `lc-field-wrapper`, `lc-phone-wrapper`, and `lc-phone-input-wrapper` gain responsive height overrides.

### Business info textarea

Same as Spec 008. No floating label. Min-height 120px on all breakpoints.

### Bottom row

The bottom row is rearranged compared to Spec 008:

**Desktop and tablet:**
- Left: "By submitting you agree to our [Terms] & [Privacy]." in 14px warm gray. Terms and Privacy are underlined links.
- Right: `CtaSecondary` ("Cancel") followed by `CtaDefault` ("Get in Touch →"), both 48px tall.

**Mobile:**
- Full-width row: `CtaSecondary` (48×48 px square, icon-only cancel) on the left, `CtaDefault` ("Get in Touch →") filling remaining width on the right.
- The Terms & Privacy line sits above the CTA row, full-width.

---

## Phone input — flag update

The existing `PhoneInput` component shows a pill with a caret-down SVG and the phone code as text (e.g., "+1"). This is replaced with a **flag + caret** treatment:

- The country flag is shown as a **rectangular flag image** using the `@untitledui/country-flags` React component library (`npm install @untitledui/country-flags`). The active country's flag is loaded via `next/dynamic` and rendered at `24×16px`. This matches the rectangle flag format shown in the Figma flag library (node `1422:1466`).
- The caret-down icon remains to the left of the flag (or may move to the right — match Figma node `1377:514`).
- The `+1` / phone code text **is removed** from the pill. Only the flag and caret are shown. The selected dial code is still prefixed to the field value sent to the backend (this logic in `handlePhoneChange` is unchanged).
- The phone number input field accepts **digits only**. The existing `handlePhoneChange` already strips non-digits via `.replace(/\D/g, '')`. No change needed to that logic. The `inputMode="numeric"` attribute should be added to the `<input>` for mobile keyboard hints (the `type="tel"` already does this in most browsers, but explicit `inputMode` is a belt-and-suspenders improvement).
- Default country on load: **United States (US, +1)**. The visitor can change it via the dropdown. Auto-detection is out of scope.
- The country dropdown remains a **native `<select>`** overlaid invisibly over the pill — no custom dropdown, no search.

---

## Input error states

When a field fails validation (e.g., a required field is empty on submit, or the email format is invalid), the field transitions to an **error state**:

- The field wrapper border becomes a warm red/amber: `#c27b5a` (extrapolated from the Figma error state shown on text inputs, node `1182:5181`)
- The field background stays the same light gray; the focus-within highlight does not apply while in error
- A small error message appears directly below the field (not at the bottom of the form — per-field, inline) in the same red/amber color at 12px
- The floating label stays in its normal position; it does not change color

This behavior applies to all `FloatingLabelInput` fields. For `PhoneInput`, the same border color is applied to the `lc-phone-wrapper` when the phone field fails validation.

**Email validation:** The email field is validated for correct format (`type="email"` plus a manual regex check on submit, consistent with browser behavior). No other field has format-specific validation beyond what `react-hook-form` already provides.

**On re-focus:** When the visitor focuses an errored field to correct it, the error state clears immediately (the error message disappears and the border returns to the normal focus treatment).

The existing `lc-error-message` class is repurposed from a single form-level error to per-field inline errors. The form-level submission error (network error, server error) continues to appear at the bottom of the form stack as before.

---

## Success state

### What the visitor sees

After a successful form submission, the form content is replaced with a compact confirmation. The message reads:

> **THANK YOU** WE'LL BE IN TOUCH

"THANK YOU" is in dark green (`#063126`); "WE'LL BE IN TOUCH" is in the light green accent (`#66cc86`). Both are `FK Screamer Bold`. Font size: 56px on desktop/tablet, 40px on mobile. Line-height: 0.96.

The Keystone K mark remains visible in the card header. The close button (desktop/tablet) or pull bar (mobile) remains. No other content is shown.

After **3.5 seconds**, the modal automatically closes using the same exit animation described per breakpoint above.

### Transition into success state

The transition from "form state" to "success state" is a two-part sequence:

**Part 1 — Card collapses:** The form content (everything below the card header) fades out rapidly: `opacity: 1 → 0` over **150 ms**. As the content fades, the card's height animates downward to the collapsed size:
- Desktop/tablet: `226px` (matching the Figma success node `1422:15220`)
- Mobile: `122px` (matching node `1422:15315`)

Simultaneously with the height collapse, the card **slides to the bottom of the viewport**: the card's vertical position transitions so its bottom edge is flush with the viewport bottom. On desktop (where the card is right-aligned), it stays right-aligned while sliding down. On tablet, it moves to the bottom-center. On mobile, it stays at the bottom (it was already there).

This entire collapse-and-sink motion takes **350 ms** with a `cubic-bezier(0.22, 1, 0.36, 1)` ease.

**Part 2 — Success content reveals:** Once the collapse is complete (at `t = 500ms` from submit success), the success message fades in over **200 ms**.

---

## Component library

The component library lives in **`components/ui/`** (new directory). The components below are scoped to the lead capture form but named generically enough to serve other parts of the site. Each component must accept the state variants and breakpoint variants shown in Figma as props.

---

### `CloseButton`

**File:** `components/ui/CloseButton.tsx`  
**Figma:** node `1377:467` (component set)

A 40×40 px fully rounded button. Background is `var(--bg/200, #f0eee6)`. Contains a centered 12×12 px `×` icon (inline SVG or an existing icon asset).

```typescript
type CloseButtonProps = {
  onClick: () => void;
  className?: string;
  property1?: 'default' | 'hover' | 'active';
};
```

States:
- `default` — base background, icon at full opacity
- `hover` — background darkens slightly (`var(--bg/300)` or `opacity: 0.85`)
- `active` (Variant3 in Figma) — pressed appearance; background darkens further, icon scale 0.9

The `onClick` prop must be wired to `closeModal()`. No internal state — the parent drives behavior.

---

### `TextInput`

**File:** `components/ui/TextInput.tsx`  
**Figma:** node `1377:487` (component set with `Property 1` × `breakpoint` variants)

This is the already-implemented `FloatingLabelInput` extracted into a standalone, reusable component. The CSS class names (`lc-field-wrapper`, `lc-field-label`, `lc-field-input`) stay as-is; this component is a React-layer wrapper for reuse outside the modal.

```typescript
type TextInputProps = {
  id: string;
  type?: 'text' | 'email';
  placeholder: string;
  registerProps: UseFormRegisterReturn;
  error?: string;
  breakpoint?: 'desktop' | 'mobile';
  state?: 'default' | 'focused' | 'hover' | 'active' | 'filled';
};
```

The `state` and `breakpoint` props drive the height (60px desktop, 52px mobile) and are used in Storybook / component docs. In production, actual state is CSS-driven (`:focus-within`, `:placeholder-shown`) — the `state` prop is for documentation and snapshot testing only.

The `error` prop renders an inline error message below the field and applies the error border.

---

### `MobileNumberInput`

**File:** `components/ui/MobileNumberInput.tsx`  
**Figma:** node `1377:542` (component set with `state` × `breakpoint` variants)

This is the existing `PhoneInput` component extracted and updated with the flag treatment described above.

```typescript
type MobileNumberInputProps = {
  id: string;
  placeholder: string;
  registerProps: UseFormRegisterReturn;
  error?: string;
  breakpoint?: 'desktop' | 'mobile';
  state?: 'default' | 'hover' | 'focused' | 'active' | 'filled';
};
```

The flag is rendered as a dynamically imported `@untitledui/country-flags` component at 24×16px (see Flag icon library section). The invisible native `<select>` overlay pattern for the country dropdown is preserved.

The number-only behavior is enforced:
- `inputMode="numeric"` on the input
- `handlePhoneChange` already strips non-digits (no change needed)

The `error` prop applies the error border to `lc-phone-wrapper`.

---

### `CtaDefault`

**File:** `components/ui/CtaDefault.tsx`  
**Figma:** node `1377:776` (component set with `Property 1` variants)

The primary "Get in Touch →" button. 160px wide, 48px tall. Background `#66cc86`. Text: FK Grotesk Neue Regular, 18px, dark green (`#0f2e18`). Right-arrow icon (20×20 px) to the right of the label.

On mobile, this button is `flex: 1` (fills remaining row width beside the cancel icon).

**Shape transition on hover:** In the default state the button is a fully rounded pill (`border-radius: 9999px`). On hover, the border-radius transitions to `0px` (a sharp rectangle). This transition animates smoothly: `transition: border-radius 200ms ease-in-out`. On mouse-out, the radius returns to `9999px` over the same duration and easing.

```typescript
type CtaDefaultProps = {
  label: string;
  onClick?: () => void;
  type?: 'submit' | 'button';
  disabled?: boolean;
  className?: string;
  property1?: 'default' | 'hover' | 'focused';
};
```

States:
- `default` — full green background, pill shape (`border-radius: 9999px`)
- `hover` — full green background, rectangle shape (`border-radius: 0`), transition as described above
- `focused` — keyboard focus ring: `outline: 2px solid #66cc86; outline-offset: 2px`; shape stays as pill (no radius change on keyboard focus)
- Disabled (via `disabled` prop) — `opacity: 0.6`, `cursor: not-allowed`, no hover transition

---

### `CtaSecondary`

**File:** `components/ui/CtaSecondary.tsx`  
**Figma:** node `1377:743` (component set with `Property 1` variants)

The "Cancel" secondary action. On desktop and tablet: 114px wide, 48px tall, flat background (`var(--bg/400, #e0ddd1)`), no border. Label "Cancel" with a small `×` icon to the right. Text: FK Grotesk Neue Regular, 18px, muted gray (`var(--text/300, #5d5a56)`).

On mobile: **48×48 px square** (icon only — no label text). The `×` icon is centered.

**Shape transition on hover:** The inverse of `CtaDefault`. In the default state the button is a sharp rectangle (`border-radius: 0`). On hover, the border-radius transitions to a fully rounded pill (`border-radius: 9999px`). Same timing: `transition: border-radius 200ms ease-in-out`. On mouse-out, the radius returns to `0` over the same duration and easing.

```typescript
type CtaSecondaryProps = {
  onClick: () => void;
  className?: string;
  property1?: 'default' | 'hover' | 'focused';
};
```

States:
- `default` — flat background, rectangle shape (`border-radius: 0`)
- `hover` — background darkens slightly (`var(--bg/500)` or `opacity: 0.85`), pill shape (`border-radius: 9999px`), transition as described above
- `focused` — keyboard focus ring; shape stays as rectangle (no radius change on keyboard focus)

The `onClick` prop must be wired to `closeModal()`.

---

## Flag icon library

Add `@untitledui/country-flags` as a dependency:

```
npm install @untitledui/country-flags
```

No CSS import is required. Each country flag is a self-contained React component — the same model as the existing `@untitledui/icons` package already in the project. Components are named by title-cased ISO 3166-1 alpha-2 code: `US` → `Us`, `GB` → `Gb`, `DE` → `De`, and so on.

Static import (for a known country):

```tsx
import Us from '@untitledui/country-flags/Us';

<Us />
```

Dynamic import for the currently selected country (since the flag changes as the user picks from the dropdown, use `next/dynamic` to avoid loading 260+ flag SVGs upfront):

```tsx
import dynamic from 'next/dynamic';

// Utility — converts 'US' → 'Us', 'GB' → 'Gb'
function titleCase(code: string) {
  return code.charAt(0).toUpperCase() + code.charAt(1).toLowerCase();
}

const Flag = dynamic(
  () => import(`@untitledui/country-flags/${titleCase(selectedCountryCode)}`),
  { ssr: false }
);

// Render at 24×16px to match the Figma rectangular flag dimensions
<Flag width={24} height={16} aria-hidden="true" />
```

Country codes from `keystone-design-bootstrap/utils/countries` are already ISO 3166-1 alpha-2 — use `country.code` directly with the `titleCase` utility above.

The flag components render inline SVGs. No stylesheet or additional configuration is required. Check the package README for the prop that selects the rectangular shape (matching Figma node `1422:1466`) if a shape variant prop exists — default may already be rectangular.

---

## Animation summary

| Event | Element | Duration | Easing |
|---|---|---|---|
| Open | Overlay fade in | 200 ms | `ease-out` |
| Open | Card slide in (desktop: from right; tablet/mobile: from bottom) | 300 ms | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Open | Content row reveal stagger (per row) | 200 ms | `ease-out` |
| Open | Content row stagger interval | 40 ms | — |
| Open | Content row drift | `translateY(8px → 0)` | same tween |
| Close | Card slide out (desktop: to right; tablet/mobile: to bottom) | 250 ms | `cubic-bezier(0.4, 0, 1, 1)` |
| Close | Overlay fade out | 200 ms | `ease-in` |
| Close | Mobile drag-back spring (below threshold) | 200 ms | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Success | Form content fade out | 150 ms | `ease-out` |
| Success | Card collapse + slide to bottom | 350 ms | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Success | Success message fade in | 200 ms | `ease-out` |
| Success | Auto-close delay | 3500 ms | — |
| Field | Floating label transition | 150 ms | `ease` |
| Field | Focus background/border transition | 150 ms | `ease` |
| Field | Input opacity reveal | 100 ms | `ease` |
| CtaDefault | Pill → rectangle on hover (`border-radius: 9999px → 0`) | 200 ms | `ease-in-out` |
| CtaDefault | Rectangle → pill on mouse-out | 200 ms | `ease-in-out` |
| CtaSecondary | Rectangle → pill on hover (`border-radius: 0 → 9999px`) | 200 ms | `ease-in-out` |
| CtaSecondary | Pill → rectangle on mouse-out | 200 ms | `ease-in-out` |

All animation is implemented via GSAP (existing dependency), consistent with current usage in `LeadCaptureModal.tsx`. All animation sequences must be wrapped in `gsap.matchMedia()` with a `(prefers-reduced-motion: reduce)` branch that skips all tweens.

---

## Data and integration

No changes to data flow or backend integration. For reference:

- Form field definitions come from `useFormDefinitions()` → `leadFormDefinition.fields`
- Submission uses `useLeadSubmit({ fields, formId, onSuccess })` which POSTs to `/api/form` with `{ formType: 'lead', ...values, form_id? }`
- On success, `onSuccess` (which calls `reset()` on the RHF instance) fires before the success animation begins
- Error messages from `useLeadSubmit` (`errorMessage` when `submitState === 'error'`) continue to render at the bottom of the form stack
- Meta pixel and PostHog tracking in `useLeadSubmit` are unchanged

---

## What triggers the modal

Unchanged from Spec 008. The `openModal(triggerElement)` call from `useLeadCapture` is wired to:

1. Hero section CTA buttons (`HeroAnimatic.tsx`, `HeroNav.tsx`, `MobileHero.tsx`)
2. Footer CTA buttons (`OversizedFooter.tsx`, `MobileFooter.tsx`)
3. Any other CTA on the site that calls `useLeadCapture().openModal()`

---

## What must be built

The following work is new. Everything else carries forward from Spec 008.

**Animations and layout:**
- Breakpoint-aware card positioning (right-pinned on desktop, centered on tablet, full-width bottom on mobile)
- Entry slide animations via GSAP, replacing the simple opacity fade
- Progressive content reveal (staggered row fade-in)
- Exit slide animations
- Success state collapse + slide-to-bottom transition
- Mobile drag-to-dismiss (touch gesture)

**Mobile card:**
- Top-only border radius
- Flush bottom positioning
- Pull bar component replacing the close button
- Safe area inset padding on card inner content
- Internal scroll when content exceeds available height

**Phone input update:**
- `@untitledui/country-flags` dependency (zero-config, no CSS import — consistent with existing `@untitledui/icons`)
- Replace caret + phone code pill with flag + caret pill
- Add `inputMode="numeric"` to phone input

**Error states:**
- Per-field inline error messages (below each field)
- Error border color on `lc-field-wrapper` and `lc-phone-wrapper`
- Error clear on re-focus

**Success state redesign:**
- "THANK YOU WE'LL BE IN TOUCH" heading replacing old plain-text success message
- `FK Screamer Bold` rendering with green accent on "WE'LL BE IN TOUCH"
- Collapse-and-sink animation sequence
- Breakpoint-aware collapsed heights (226px desktop/tablet, 122px mobile)

**Component library (new `components/ui/` directory):**
- `CloseButton.tsx`
- `TextInput.tsx` (extracted from `FloatingLabelInput`)
- `MobileNumberInput.tsx` (extracted and updated `PhoneInput`)
- `CtaDefault.tsx`
- `CtaSecondary.tsx`

---

## CSS changes

`styles/sections/lead-capture.css` requires the following additions and modifications:

- `.lc-card` positioning becomes breakpoint-aware (right-pinned desktop, centered tablet, full-width mobile)
- `.lc-card` border-radius becomes `20px` all sides on desktop/tablet; `16px 16px 0 0` on mobile
- `.lc-field-wrapper` and `.lc-phone-wrapper` height: add `@media (max-width: 639px)` override for 52px
- `.lc-field-row`: add `@media (max-width: 639px) { flex-direction: column; }`
- New `.lc-pull-bar` class: `40×4px`, `background: var(--bg/600, #cbc5b4)`, `border-radius: 9999px`, centered horizontally at top of card
- New `.lc-field-wrapper--error`, `.lc-phone-wrapper--error` for error border
- New `.lc-field-error` for per-field inline error text (12px, `#c27b5a`)
- `.lc-success` update: `FK Screamer Bold` heading styles, sized for desktop/tablet vs mobile, two-tone color treatment
- Remove `.lc-content-area` padding-top, padding-left, padding-right, flex centering (card is now absolutely positioned per breakpoint, not flow-centered)
- Remove `.lc-kmark-wrapper` (K mark is now inside the card header, not floating above)
- Remove `.lc-card` `max-width: 480px` (card is now 708px desktop, fluid tablet, full-width mobile)

---

## Accessibility

All accessibility requirements from Spec 008 and Spec 028 remain in effect. Additions:

- The pull bar (mobile) must be a `<button>` element with `aria-label="Close"` — not a decorative `<div>`.
- Per-field error messages must be associated with their input via `aria-describedby` and have `role="alert"` so screen readers announce them on appearance.
- The drag-to-dismiss gesture must not be the only way to close the modal on mobile — the backdrop tap and any future close button remain available.
- With reduced motion, the progressive content reveal is suppressed: all card content is immediately visible at `opacity: 1` when the card mounts.

---

## Acceptance criteria

### Overlay and card entry

- [ ] Clicking any lead-capture CTA fades in the dark green overlay in ~200 ms
- [ ] On desktop (≥ 1024px): the card slides in from the right and rests right-aligned with 24px margin, filling approximately the right half of the viewport
- [ ] On tablet (641–1023px): the card slides up from the bottom and rests centered with 24px side margins
- [ ] On mobile (< 640px): the card slides up from the bottom and sits flush with the bottom edge of the viewport, full width, with no bottom margin
- [ ] The overlay fade and the card slide begin at the same moment
- [ ] After the card settles, card content rows reveal top-to-bottom in a staggered fade (~40 ms apart)
- [ ] Each row fades in with a subtle upward drift

### Card shape and chrome

- [ ] Desktop and tablet card: all four corners rounded at 20px
- [ ] Mobile card: top-left and top-right corners rounded at 16px; bottom corners have no radius
- [ ] Desktop and tablet card: Keystone K mark in top-left of card header, close button (×) in top-right
- [ ] Mobile card: centered pull bar pill (40×4px, warm gray) at top center; no × close button

### Close behavior

- [ ] Clicking the × close button closes the modal (desktop + tablet)
- [ ] Tapping the pull bar closes the modal (mobile)
- [ ] Clicking or tapping the overlay outside the card closes the modal on all breakpoints
- [ ] Pressing Escape closes the modal on all breakpoints
- [ ] On mobile, dragging the card downward more than 120px (or with velocity > 400px/s) closes the modal
- [ ] On mobile, a drag that doesn't reach the threshold springs the card back to its resting position
- [ ] On close, the card slides back out in the direction it entered
- [ ] On close, focus returns to the triggering element without scrolling the page

### Phone input

- [ ] The country dropdown pill shows a rectangular flag icon and a caret; no phone code text
- [ ] Default country is United States (US flag, +1 dial code)
- [ ] Changing the country updates the flag in the pill
- [ ] The phone number field accepts only digits
- [ ] The phone value submitted to the backend is prefixed with the dial code (existing behavior preserved)

### Form fields and validation

- [ ] First Name and Last Name appear side by side on desktop and tablet; stacked on mobile
- [ ] All text input fields are 60px tall on desktop/tablet, 52px tall on mobile
- [ ] On submit with an empty required field, an inline error message appears below that field with a warm red border
- [ ] On submit with an invalid email format, an inline error message appears below the email field
- [ ] Clicking into an errored field clears the error state
- [ ] The floating label animation and focus styling are unchanged from Spec 008
- [ ] Field-level errors are announced to screen readers

### Success state

- [ ] After successful submission, the form content fades out and the card collapses to a compact size while sliding to the bottom of the viewport
- [ ] The collapsed card shows the Keystone K mark, the pull bar (mobile) or close button (desktop/tablet), and "THANK YOU WE'LL BE IN TOUCH" in FK Screamer Bold
- [ ] "THANK YOU" appears in dark green, "WE'LL BE IN TOUCH" in light green accent
- [ ] The collapsed card automatically closes after ~3.5 seconds
- [ ] The visitor can still manually close the success card early

### Mobile safe area

- [ ] The CTA row is not obscured by the iOS home indicator — card inner content has bottom padding equal to `max(16px, env(safe-area-inset-bottom))`

### Reduced motion

- [ ] With reduced motion enabled: modal appears and disappears instantly, no slide, no stagger, no collapse animation; card content is immediately fully visible

### CTA hover transitions

- [ ] Hovering `CtaDefault` smoothly transitions `border-radius` from `9999px` (pill) to `0` (rectangle) over 200ms `ease-in-out`
- [ ] Mouse-out on `CtaDefault` returns to pill over the same duration and easing
- [ ] Hovering `CtaSecondary` smoothly transitions `border-radius` from `0` (rectangle) to `9999px` (pill) over 200ms `ease-in-out`
- [ ] Mouse-out on `CtaSecondary` returns to rectangle over the same duration and easing
- [ ] Neither CTA changes shape on keyboard focus — focus ring appears but `border-radius` is unchanged
- [ ] Disabled `CtaDefault` has no hover transition

### Component library

- [ ] `CloseButton`, `TextInput`, `MobileNumberInput`, `CtaDefault`, `CtaSecondary` exist as standalone files in `components/ui/`
- [ ] Each component accepts the state and breakpoint props matching the Figma component set variants
- [ ] `TextInput` and `MobileNumberInput` accept an `error` prop that renders an inline error message and error border

### No regressions

- [ ] Form field definitions still come from `useFormDefinitions()` — no fields are hardcoded
- [ ] Form submission still uses `useLeadSubmit` and posts to `/api/form`
- [ ] Consent checkboxes (backend-driven) still render when present in the form definition
- [ ] The `LeadCaptureProvider` / `useLeadCapture` context API is unchanged — all existing CTA wiring continues to work
- [ ] Scroll lock still fires on modal open and releases on close
- [ ] Visual Viewport height sync still fires so the soft keyboard doesn't bury the submit button
- [ ] No element overflows the viewport horizontally at 390px, 640px, 1024px, or 1440px widths
