# Spec 018 — Mobile Product Screens

**Status:** Ready for implementation  
**Figma node:** [Product Screens — Mobile](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1277-417&m=dev) (node `1277:417`)  
**Depends on:** Spec 017 (Mobile Every Channel)  
**Companion:** Spec 007 (Product Screens — desktop)

---

## What this section is

The mobile version of the Product Screens section. It is the fourth section on the home page, reached after the Every Channel animation completes.

This section retains the full entrance animation from the desktop — the pills converging from their Every Channel scatter positions, the section rising from below, and the content loading in as it arrives. The visual design is restructured for mobile: there is no cream outer background, the pill nav wraps into two rows, and the layout is a vertical stack rather than a side-by-side split.

This section is only shown below 768px. Above that width, the desktop ProductScreens component (Spec 007) takes over.

---

## Scope

### In scope

- Section entrance: pills converge from their mobile Every Channel scatter positions (scroll-driven)
- Section entrance: section rises from below while content loads in (scroll-driven)
- Section entrance: pills latch onto the rising section and travel to the two-row nav position
- Seven tool states matching the desktop: Web, Leads, Ads, Social, Sales, Reviews, Content
- Two-row pill nav at the top of the section
- Keystone mark and tool label stacked vertically, left-aligned
- Value copy below the mark and label
- Product screenshot filling the lower portion, extending slightly beyond the right edge of the screen
- Tool switching: same horizontal slide transition as desktop, adapted for the stacked layout

### Out of scope

- The desktop ProductScreens — it is not changed by this spec
- The Every Channel mobile section (Spec 017)
- The Social Proof section
- Backend integration of any kind

---

## Visual design

Refer to Figma node `1277:417` for all exact values.

### Overall layout

The section fills the full browser viewport height. Unlike the desktop version, there is no warm cream outer background — the tool's dark background color fills edge to edge. A slightly darker decorative shape sits behind the content, partially visible and extending beyond the section edges; see Figma for its exact size and opacity.

From top to bottom, the section contains:

1. A two-row pill nav, centred horizontally near the top of the section
2. The Keystone mark icon and tool label, left-aligned below the nav
3. The value copy sentence, left-aligned below the mark
4. The product UI screenshot, left-aligned and wider than the screen, clipped at the right edge

### Pill nav

On mobile, seven pills do not fit in a single row at a comfortable size. The nav wraps naturally into two rows. The full pill group is centred horizontally and sits near the top of the section. The pills are the same construction as desktop — a small colour square on the left and a label on the right. See Figma for exact padding, font size, and spacing.

**Active pill:** Solid fill in the tool's pill colour. The colour square matches the section background (appears to sink in). The text matches the section background.

**Inactive pill:** A 1px solid outline border in a muted tone derived from the active tool's background. The colour square shows the tool's own colour. The text is off-white.

The inactive border colour changes to match the active tool's card background — the same per-tool adaptation as on desktop.

### Keystone mark and tool label

Below the pill nav, on the left: the Keystone mark icon at the size shown in Figma, followed by the tool label in small caps (e.g. "LEADS") directly below it. The tool label uses the site's monospaced font. Both are in the active tool's accent colour. See Figma for exact sizes and spacing.

### Value copy

Left-aligned below the mark and label. FK Grotesk Neue Regular in the active tool's accent colour. See Figma for exact font size, line height, letter spacing, and maximum width. The copy text for each tool is the same as in the desktop spec (Spec 007).

### Product screenshot

Left-aligned, starting at the same left edge as the mark and copy. The screenshot is wider than the screen and is intentionally clipped at the right edge — the visitor sees a partial view of the product UI, creating a sense of depth. The screenshot has rounded corners. See Figma for exact top position, width, height, and corner radius.

---

## Animation behavior

The entrance animation mirrors the desktop exactly — the same three phases. See Spec 007 for the full behavioral description. The notes below describe only the mobile-specific differences.

### Phase 1 — Pill convergence and section rise (scroll-driven)

Same as desktop: after the Every Channel animation (Spec 017) completes and the visitor scrolls, two things happen simultaneously. The seven pills begin converging from their mobile Every Channel scatter positions toward a central point near the top of the viewport. At the same time, the section begins rising from below.

On mobile, the pills converge into two rows (matching the mobile pill nav layout), not a single horizontal row. The convergence point is where the pills will eventually settle in the nav.

### Phase 2 — Pills latch onto the rising section (scroll-driven, continuous from Phase 1)

Same threshold as desktop: the moment the section's top edge reaches 46px below the converged pill group, the pills stop moving independently and begin travelling upward with the rising section. They are now locked to the section.

The section continues rising to its final resting position filling the full viewport. The pills arrive at their two-row nav position as the section settles.

### Phase 3 — Content loads in as section settles

Same as desktop: as the section approaches its final position, the Keystone mark, tool label, value copy, and product screenshot become visible. The content is settled before the section fully comes to rest, so the section feels alive on arrival.

### Tool switching

Same as desktop: clicking a pill slides the inset content horizontally in the direction of the selected pill, the copy resolves slightly before the screenshot arrives, and the section background crossfades to the new tool's colour. The active pill updates to its filled style; inactive pills update their border to match the new tool's background tone.

---

## Content

All per-tool colours, copy text, mark icons, and screenshots are shared with the desktop version (Spec 007). No new content is needed. The mobile layout uses the same props.

For exact per-tool values — card backgrounds, accent colours, pill colours, inactive borders, and copy text — refer to the Content table in Spec 007.

---

## Accessibility

- All GSAP animations must respect `prefers-reduced-motion`. When reduced motion is on, the section displays immediately in its complete resting state for the default tool (Web), pill nav is interactive, no entrance animation.
- All seven pill nav items must be keyboard-navigable and activatable with Enter or Space.
- Product screenshots are decorative — `alt=""`.
- Keystone mark icons are decorative — `alt=""`.

---

## Acceptance criteria

- [ ] Below 768px, the mobile Product Screens section is shown — not the desktop version
- [ ] At 768px and above, the desktop version is shown unchanged
- [ ] After the Every Channel animation completes and the visitor scrolls, all seven pills begin converging from their mobile Every Channel positions toward the top of the viewport
- [ ] Simultaneously, the section begins rising from below
- [ ] The pill convergence and section rise are both directly tied to scroll position — they advance on scroll down and reverse on scroll up
- [ ] As the section rises, its top edge approaches the converged pills; the moment the top edge is 46px below the pills, the pills latch on and travel upward with the section
- [ ] The pills settle into their two-row nav layout as the section reaches its final position
- [ ] Section content (mark, label, copy, screenshot) becomes visible as the section approaches its final position — before it fully comes to rest
- [ ] The section fills the full viewport height in its final position
- [ ] The pill nav wraps into two rows and is centred horizontally near the top of the section
- [ ] The active tool's pill shows as a solid-filled pill; all others show an outlined border
- [ ] Pill border colours match the inactive border tone for the active tool
- [ ] The Keystone mark icon and tool label are left-aligned below the nav, in the active tool's accent colour
- [ ] The value copy is left-aligned below the mark, in the active tool's accent colour
- [ ] The product screenshot starts at the left edge and extends beyond the right edge of the screen, clipped at the right
- [ ] The section background fills edge to edge in the active tool's dark colour — no cream outer background
- [ ] Clicking a pill to the right of the active one slides new content in from the right
- [ ] Clicking a pill to the left of the active one slides new content in from the left
- [ ] The copy resolves slightly before the screenshot finishes arriving
- [ ] The section background crossfades to the new tool's colour during the transition
- [ ] All seven tool states show the correct background, accent colour, copy, mark, and screenshot
- [ ] Scrolling back up at any point reverses the entrance animation cleanly
- [ ] With reduced motion on: section shows immediately in its complete Web resting state, no animation, pill nav interactive
- [ ] All pill nav items are reachable by keyboard Tab and activatable with Enter or Space
- [ ] No text overflows horizontally at 390px viewport width
