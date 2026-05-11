# Spec 024 — Product Screens Refresh

**Status:** Ready for implementation
**Figma file:** `XRbD11WIevI5szRFiRrguZ`
**Figma nodes:**
- Desktop layout — all seven tool states with final product screenshots: [Product Screens — Desktop](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1087-2360&m=dev) (node `1087:2360`)
- Mobile layout — full mobile resting state: [Product Screens — Mobile](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1255-1117&m=dev) (node `1255:1117`)

**Position:** Refresh of the desktop Product Screens (Spec 007) and the mobile Product Screens (Spec 018). Replaces the resting-state visual design of both components. Does not change which component renders at which breakpoint, the entrance animation, the pill convergence handoff from Every Channel, or the tool-switching transition.

**Depends on:** Spec 007 (Product Screens — desktop), Spec 018 (Mobile Product Screens), Spec 017 (Mobile Every Channel).

---

## Why this spec exists

The polished product screenshots and mark icons are now final in Figma — both for desktop and mobile — and the existing implementation has accumulated visual drift from the design:

- Product screenshots and mark icons are placeholders that no longer match Figma.
- Spacing, padding, type sizes, screenshot positions, pill geometry, and decorative shapes were eyeballed against a single reference viewport (1440 × 1024 px on desktop, 393 × 852 px on mobile) rather than read directly from the Figma design context. They drift visibly at any other viewport size.
- Elements overlap, get clipped, or float in dead space as the viewport scales inside both the mobile range and the desktop range. The mobile screenshot can collide with the value copy on shorter phones; the desktop screenshot can clip its bottom edge on shorter desktops; the pill nav can wrap on narrower desktops in awkward ways.
- Two structural visual elements present in the latest Figma are missing from the implementation entirely: a multi-layer stacked screenshot composition on desktop (described below), and a per-tool decorative panel color on mobile (described below).

This spec re-establishes pixel-perfect alignment with Figma at the reference viewport **and** specifies how the layout must scale fluidly between viewport sizes so nothing overlaps, clips, or floats at any width or height the section is shown at.

### On Figma variables

This section of the file is only partially bound to Figma variables. As of writing, the implementer-visible variables for these nodes are `radius-3xl` (the card's corner radius), `radius-full` (the pill radius), font-weight tokens, and a pair of `effects/shadows/2xl_…` tokens. Spacing, font sizes, letter spacing, line heights, colors, and per-tool values are *not* bound to variables and live as raw values in the design.

For this section, "pixel-perfect to Figma using the variables" means:

1. Where a Figma variable does exist, the implementation uses it via a corresponding CSS custom property in `[data-theme="custom"]`.
2. Where Figma exposes a raw value, the implementer reads that value directly from the MCP design context (`get_design_context`) at the node level — not by eyeballing the screenshot. Repeated raw values across tools get promoted to per-section CSS custom properties so they have one source of truth in code.

There is no implicit promise that Figma will provide a complete token layer for every measurement.

---

## Scope

### In scope

- Replace all seven product screenshots with the final exports from Figma node `1087:2360` (desktop) and `1255:1117` (mobile). Mobile uses the same screenshot file per tool as desktop unless Figma shows a distinct mobile crop — verify per tool in the MCP output.
- Replace all seven Keystone mark icons with the final exports from Figma. Verify whether the mobile mark is a distinct color variant per tool or shares the desktop variant — read from Figma, do not assume.
- Re-derive every measurement (paddings, gaps, font sizes, line heights, letter spacing, border weights, corner radii, screenshot box, decorative bg shape) from the Figma file's variable / token system. No eyeballing, no rounding to "looks close", no carry-over of magic numbers from the previous implementation that aren't backed by a Figma token.
- Re-architect the layout so it scales fluidly across all viewport sizes within both the mobile range and the desktop range. The Figma layout is a snapshot at one viewport size for each breakpoint; the implemented layout must hold its proportions, prevent overlap, and prevent clipping at every viewport size the section is shown at.
- Verify all per-tool colors (card background, copy accent, pill fill, inactive border, square color, mark color) against Figma. Where the existing data differs from Figma, update the data file — never change the component.

### Out of scope

- The entrance animation choreography from Every Channel (pill convergence, card rise, content load-in). Behavior remains as defined in Spec 007 (desktop) and Spec 018 (mobile).
- The pill handoff mechanism (`PillHandoffProvider`) connecting Every Channel to Product Screens.
- The tool-switching transition (slide direction, copy-leads-image timing, card background crossfade).
- The pinned scroll state machine (`createSectionPin`) — pin behavior, snap thresholds, and `isAnimComplete` semantics are unchanged.
- The copy text per tool. Copy strings stay as currently defined in `data/product-screens.ts` unless Figma's text content differs — in that case update the data file, not the component.
- The Every Channel section (Spec 017 mobile, Spec 003 desktop).
- The Social Proof section.

---

## Before building

Use the Figma MCP to fetch the design context for both nodes (`1087:2360` and `1255:1117`) and the screenshot for each. Read in this order:

1. The file's variables / design tokens — colors, spacing, font sizes, line heights, letter spacing, corner radii, breakpoints. These are the source of truth for every measurement in this section.
2. Each per-tool variant of the desktop frame — all seven tools share the same layout primitives but each has its own background, accent color, mark icon, copy text, and screenshot. Confirm any per-tool layout differences.
3. The mobile frame — confirm whether mobile uses the same per-tool colors and copy as desktop, or whether the mobile design specifies different values.
4. The full set of screenshot assets and mark icon assets — note their natural sizes and whether they include any padding inside the asset itself.

Cross-reference every measurement against the variables. If a value in Figma is not bound to a variable, ask before hardcoding it — most likely there is a token that should have been bound and Figma's binding is missing.

---

## Visual design

All exact values — colors, spacing, type ramp, corner radii, asset dimensions, decorative shape size and position, pill geometry — come from Figma. The descriptions below name each element and how it behaves; the implementer reads exact numbers from Figma's variables.

### Desktop (≥ 768 px)

Refer to Figma node `1087:2360`.

The section fills the full browser viewport height. A warm cream outer background frames a single dark inset card, inset on all four sides by a uniform gap. The card has fully rounded corners. The card's background color is unique per tool.

Inside the card:

- **Pill nav.** Seven pills in a single centered horizontal row near the top of the card. Each pill has a small color square on the left and a label on the right. The active pill is filled in the tool's pill color; the square and label inside the active pill match the card background, making the square appear to recess into the card surface. The other six pills are outlined in a muted tone derived from the active tool's background; their squares show each tool's own assigned color and their labels are off-white. Note: in Figma the centered row sits at `calc(50% + 24.5px)` — slightly right-of-center — because of how auto-layout centers around the screenshot stack. Match this offset; do not silently re-center.
- **Left content zone.** Near the bottom-left of the card: the Keystone mark icon in the tool's mark color, followed beneath it by the value copy sentence in the tool's accent color.
- **Right content zone — stacked screenshot composition.** This is a structural change from the current implementation and must be implemented faithfully. The product UI screenshot sits at the right side of the card and is **wider than the card itself** — its right edge extends past the card's right edge and is clipped by the card's rounded boundary. In Figma, this zone is composed of two or three stacked rounded rectangles at the same position: the primary screenshot (`image 40`) plus one or two slightly-larger sibling rectangles (`image 42`, `image 43`) layered behind it. The implementer pulls each layer's asset from the design context and confirms the stacking order, sizes, and any opacity differences per tool. The stack reads as a single image with a subtle page-stack / shadow depth effect; it does not read as a "card-in-card." Verify visually against Figma per tool — the layer count can vary (some tools have two siblings, others have three).

### Mobile (< 768 px)

Refer to Figma node `1255:1117`.

The section fills the full mobile viewport height. There is no cream outer frame on mobile — the tool's dark background fills the section edge to edge.

**Important:** node `1255:1117` is the Leads variant of the mobile design. The other six tools are not present in the file at any sibling node the spec author was able to find. The implementer must confirm with the designer whether (a) per-tool mobile variants exist elsewhere in the file or (b) all seven tools share this single layout with per-tool data overrides (colors, copy, mark, screenshot). The spec assumes (b) until told otherwise; if (a) turns out to be true, pull each variant separately and verify per-tool differences before implementation.

From top to bottom inside the section:

1. **Pill nav.** Seven pills, centered, wrapping into two rows (four on top, three on bottom in the Leads variant). Pill anatomy mirrors desktop (color square + label) but at the mobile sizes and spacing read from Figma — the pills are smaller, with a smaller color square and tighter padding. The inactive border color is a darker, more muted version of the active tool's card background. Note: the mobile inactive border tone may differ per tool from the desktop inactive border tone — verify each one against Figma rather than reusing the desktop `inactiveBorder` value.
2. **Per-tool decorative panel.** A large rounded rectangle sits behind the content, filling most of the lower-right portion of the section and extending past the right edge of the viewport where it is clipped. The panel uses a **per-tool darker shade of the active card background** (e.g., Leads' card is `#3a2a0e` and its panel is `#2f2218` at 80% opacity) — not a universal `rgba(0,0,0,Nx)` darken. The panel's position, size, corner radius, and per-tool color all come from Figma. This is a new piece of per-tool data the data file does not currently have.
3. **Mark + tool label.** The Keystone mark icon, with the tool name in small caps directly below it (e.g., `LEADS`), both in the tool's accent color. The small-caps text uses a monospaced font; verify the exact font, size, and letter spacing from Figma.
4. **Value copy.** A short copy sentence in the tool's accent color. **The mobile copy may be different from the desktop copy per tool.** The Leads variant in Figma shows `"A team of experts running your marketing while you run your business."`, while the desktop Leads copy in the data file is `"Every inbound lead gets a reply in minutes — 24/7 — so warm interest never goes cold."` The implementer must check every tool's mobile copy against Figma. If mobile copy differs from desktop, the data model needs a `mobileCopyText` field per tool (or analogous structure) so each layout gets the right string.
5. **Product screenshot.** Starts at the left content gutter and extends beyond the right edge of the viewport. The portion beyond the viewport is clipped by the section. Top position, width, height, and corner radius all come from Figma. The mobile screenshot is **not** stacked with sibling rectangles — that effect is desktop-only.

---

## Responsive behavior

This is the part the current implementation gets wrong and that this spec is most concerned with.

### Single-viewport mockups, multi-viewport reality

The Figma frames are mockups at a single canvas size each — one desktop canvas and one mobile canvas. The implemented section must look correct and feel intentional at **every** viewport size at which it is shown, not only at the canvas sizes.

The card, the pill nav, the mark, the copy, and the screenshot must hold their proportions and never overlap or clip as the viewport scales. "Hold their proportions" means the relationships visible in Figma — the screenshot's relative size to the card, the gap between the pill row and the card top, the position of the copy relative to the screenshot — remain visually consistent at any width or height in the supported range.

### Desktop range

The desktop layout is shown at 768 px wide and above. At all widths in this range:

- The card's gap to the viewport edges stays uniform on all four sides as the viewport resizes.
- The pill nav remains a single horizontal row, centered, with the same vertical offset from the card top edge that Figma specifies — never wrapping to two rows, never sliding into the content area, never overlapping the mark.
- The mark and value copy stay in the lower-left of the card and never collide with the screenshot, even at the shortest viable desktop heights and the widest desktop widths.
- The screenshot stays anchored to its Figma position and never clips below the bottom of the card or pushes up under the pill nav.
- All type stays readable — never collapses to one line per word, never breaks awkwardly between lines. If the copy must wrap differently at narrower desktop widths, the wrap point must look intentional.

If a value scales with viewport width, it scales smoothly using fluid sizing keyed to viewport width (clamped to a Figma-defined minimum and maximum). If a value scales with viewport height, it scales smoothly using fluid sizing keyed to viewport height (clamped similarly). No fixed-pixel breakpoint switches in the middle of the desktop range.

### Mobile range

The mobile layout is shown below 768 px. At all widths in this range — from the smallest phone (~320 px) to just below the breakpoint (~767 px) — and at all common mobile heights (~568 px to ~932 px):

- The two-row pill nav stays centered horizontally and fits the screen with the same per-pill padding Figma specifies, with the two rows never colliding, never overflowing the gutter, never crowding the section edges.
- The mark icon, tool label, and value copy stay left-aligned at the section gutter and never wrap into the screenshot.
- The value copy fits within its Figma-specified maximum width and never overlaps the screenshot below it on shorter phones, and never leaves an awkwardly large blank stripe on taller phones.
- The screenshot's horizontal position and width hold their proportions to the section width. The intentional clip at the right edge stays present at every mobile width — never narrows to a faint sliver, never expands to dominate the layout.
- The decorative background shape behind the content stays subtly visible at every size; never crowds the content; never disappears below the screenshot.
- All type stays readable on the smallest supported phone.

### Tablet range (768 px – 1279 px)

This is the desktop layout, scaled down. The card's edge inset, the screenshot box, the pill row, and the type ramp all scale proportionally. If any element would clip, overlap, or wrap awkwardly at tablet widths, the proportional scale-down must adjust to keep the layout intact. The implementer verifies visually at 768 px, 1024 px, and 1280 px before considering this section done.

### Edge cases

- Very short desktop viewports (e.g., 1280 × 700 px): the card and its contents must scale vertically so the mark, copy, and screenshot all remain visible inside the card and the pill nav stays at its Figma vertical offset from the card top.
- Very wide desktop viewports (e.g., 2560 px or wider): the card grows with the viewport but its type, mark, screenshot, and decorative spacing reach a sensible maximum derived from Figma. The section never feels emptied out by absurd whitespace.
- Browser zoom (up to 200%): the layout remains usable; type stays readable; no element clips beyond the section bounds.

---

## Pixel-perfect to Figma — no eyeballing

Every measurement in this section is sourced directly from the Figma MCP output for the relevant node, not eyeballed from a screenshot. The implementer:

1. Runs `get_design_context` on each tool's variant node (desktop) and on the mobile node.
2. Where a Figma variable backs a value (currently: card corner radius via `radius-3xl`, pill corner radius via `radius-full`), maps it through a CSS custom property in `[data-theme="custom"]`.
3. Where Figma exposes a raw value, reads it from the design context output and uses it directly. Raw values that repeat across the section are promoted to a per-section CSS custom property so they have one source of truth in code.
4. Cross-references per-tool values across all seven desktop variants — many measurements are auto-layout positions that snap differently per variant (e.g., the mark icon sits at `(48, 663)` on most tools but `(48, 667)` on Content, sized `37×41` on most but `36.18×40.95` on Content). The implementer either picks one canonical value and confirms it visually across all seven, or models the per-tool variation explicitly.

Raw values "from memory," "by inspection of the screenshot," or carried over from the previous implementation without re-verification against the MCP output are not acceptable.

This rule covers, at minimum:

- All per-tool colors (card background, copy accent, pill fill, inactive border, square color, mark color).
- The pill nav offset from the card top, the auto-layout horizontal offset (the `calc(50% + 24.5px)` shift on desktop), pill padding (horizontal and vertical), pill gap, pill border weight, pill corner radius, pill color-square size, pill label type ramp.
- The card's inset gap from the viewport edges, the card's corner radius.
- The mark icon's intrinsic dimensions and its offset from the card edges (per tool — verify all seven).
- The value copy's max-width, font size, line height, letter spacing, and offset from the mark.
- The screenshot zone's position and size on desktop, including the layered sibling rectangles (`image 40`, `image 42`, `image 43`), the per-layer sizes (`1288 × 837` for the primary, `1300 × 845` for the siblings), the per-layer corner radius, and the overflow past the card's right edge.
- The mobile decorative panel's offset, size, corner radius, color, and opacity — read per tool from Figma.
- The mobile screenshot's offset and overflow past the right viewport edge.

---

## Assets

All product screenshots and mark icons are now final in Figma. Export them via the MCP design-context output (the URLs returned are `https://www.figma.com/api/mcp/asset/<uuid>` and expire after 7 days — download immediately, do not link to them in the component).

Each desktop tool variant exposes **three screenshot assets** in the stack (`image 40` plus `image 42` and `image 43`). The implementer pulls each one and verifies which layers are visible per tool — some tools may use only two layers, others three. Mobile exposes one screenshot asset per tool.

Place all downloaded assets in `public/product-screens/` and rename per the existing convention before any code references them. Recommended naming:

- `screen-<tool>.png` — primary screenshot (the foreground `image 40`)
- `screen-<tool>-back-1.png`, `screen-<tool>-back-2.png` — the layered sibling rectangles behind the primary screenshot, in stacking order from front to back
- `screen-<tool>-mobile.png` — the mobile screenshot if it differs from the desktop primary
- `mark-<tool>.svg` — the Keystone mark icon

Per the Figma MCP rule (`docs/rules/rules.md` § Search Before You Build), SHA-named assets from Figma never ship — always rename. Any asset already present in `public/product-screens/` that no longer matches Figma is replaced; orphaned assets are deleted.

Verify per tool:

- The screenshot's natural pixel dimensions match what Figma exports (no upscaling or downscaling at the asset level — the component scales it via layout).
- The screenshot is exported at adequate resolution for retina displays.
- The mark icons are valid SVG with no Figma exclude-style cutouts (see `docs/rules/rules.md` § SVG Export Rules) and use the mark color from Figma.
- The mobile screenshot per tool either matches the desktop primary screenshot or is a distinct asset — verify in Figma, do not assume.

The `ProductScreensTool` type likely needs new fields to accommodate the layered stack and any mobile-specific values:

- `screenshotLayers: string[]` — ordered front-to-back stack of screenshot asset paths for desktop. The first entry is the primary; subsequent entries sit behind it. The component renders one `<img>` per layer.
- `mobileScreenshotSrc?: string` — optional override for mobile if the asset differs.
- `mobileCopyText?: string` — optional override for mobile if the copy differs (see Visual design § Mobile).
- `mobileInactiveBorder?: string` — optional override if the mobile inactive border tone differs from the desktop tone.
- `mobileDecoColor: string` and `mobileDecoOpacity: number` — per-tool color and opacity for the mobile decorative panel.

The implementer adds only the fields that are actually needed once per-tool data is verified. Unused fields are not added speculatively.

---

## Content data

Per-tool content lives in `data/product-screens.ts`. The implementer:

- Verifies every field on every tool against Figma. Where Figma differs from the data file (color hex, copy text, asset path, mark color), update the data file.
- Adds any new fields the new design introduces (e.g., a separate `mobileMarkColor`, a per-tool decorative-shape color, a per-tool screenshot box override) and threads them through the component as props.
- Removes any field the new design no longer uses.

The component receives all content via the `tools` prop. No string, color, or asset path may be hardcoded inside the component or its stylesheet.

---

## Accessibility

Carries forward verbatim from Specs 007 and 018. In particular:

- All seven pills are keyboard-navigable and activate with Enter or Space.
- Switching tools via keyboard produces the same result as clicking.
- Product screenshots are decorative (`alt=""`).
- Keystone mark icons are decorative (`alt=""`).
- All GSAP animations remain wrapped in `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)`.
- With reduced motion on: the section displays immediately in its complete Web resting state; the pill nav remains fully interactive.
- Each tool's copy accent color must meet WCAG AA contrast (3:1 minimum, since the type is large) against its card background. Verify against the refreshed Figma colors and flag any pair that fails.

---

## Acceptance criteria

### Asset and content fidelity

- [ ] All seven primary product screenshots in `public/product-screens/` are the final exports from Figma and visibly match each tool's variant under node `1087:2360` (desktop) at the reference viewport.
- [ ] For each desktop tool that uses a layered screenshot stack, the back layers (`image 42`, `image 43`) are exported, renamed, and rendered behind the primary — the depth effect from Figma is visible in the implementation.
- [ ] All seven Keystone mark icons in `public/product-screens/` are the final exports from Figma and visibly match Figma at the reference viewport.
- [ ] No placeholder or stale asset remains in `public/product-screens/`. No SHA-named files from the Figma MCP are shipped.
- [ ] Every per-tool color, copy string (desktop **and** mobile), and asset path in `data/product-screens.ts` matches Figma.
- [ ] If mobile copy differs from desktop copy for any tool, the data model carries both strings (e.g., via a `mobileCopyText` field) and the mobile component renders the mobile string.
- [ ] If the mobile inactive border tone differs from the desktop tone for any tool, the data model carries the mobile variant.
- [ ] Every tool has a verified per-tool color and opacity for the mobile decorative panel.

### Pixel-perfect at reference viewport

- [ ] Desktop layout at 1440 × 1024 px matches Figma node `1087:2360` pixel-for-pixel (visual diff, not approximate) for each of the seven tools — including the screenshot extending past the card's right edge with the layered stack visible behind it.
- [ ] Mobile layout at 393 × 852 px matches Figma node `1255:1117` pixel-for-pixel for the Leads tool, and matches the equivalent per-tool design (whether a sibling variant in Figma or derived from this layout) for all other six tools.
- [ ] Every measurement in the component and stylesheet is either bound to a Figma variable through a CSS custom property (where Figma provides one) or sourced directly from the MCP design-context output for the specific node (where Figma does not). No measurement is eyeballed from a screenshot or carried over from the previous implementation without re-verification.
- [ ] Repeated raw values across tools that come from Figma are promoted to a single per-section CSS custom property so they have one source of truth in code.

### Desktop responsive scaling (768 px – 2560 px)

- [ ] At 1280 px, 1440 px, 1680 px, 1920 px, and 2560 px width: the card's edge gap is uniform on all four sides; the pill nav stays in a single row at its correct vertical offset from the card top; the mark, copy, and screenshot remain in their Figma positions relative to the card; nothing overlaps or clips.
- [ ] At desktop heights of 700 px, 900 px, 1024 px, and 1200 px: the mark, copy, and screenshot fit within the card; the screenshot does not clip below the card bottom; the pill nav does not encroach on the screenshot or copy.
- [ ] At 768 px and 1024 px width (tablet range): the desktop layout scales proportionally without overlap or wrap.
- [ ] Browser zoom from 100% to 200% on desktop: the layout remains intact at every step; type remains readable; nothing clips beyond the section bounds.

### Mobile responsive scaling (320 px – 767 px)

- [ ] At 320 px, 375 px, 390 px, 414 px, and 767 px width: the two-row pill nav stays centered, fits the viewport with its Figma per-pill padding, and never overflows.
- [ ] At mobile heights of 568 px, 667 px, 812 px, 852 px, and 932 px: the mark + tool label, value copy, and screenshot all fit within the viewport without overlapping each other and without leaving a visibly unintentional blank stripe.
- [ ] The decorative background shape stays subtly visible at every mobile size.
- [ ] The screenshot remains intentionally clipped at the right edge at every mobile width — never narrows to a sliver, never fits inside the viewport.
- [ ] No text overflows horizontally at 320 px viewport width.

### Behavior preserved (regression checks)

- [ ] The entrance animation (pill convergence from Every Channel, card rise / contract on desktop, section rise on mobile, content load-in) plays exactly as before this spec, with no visible regression.
- [ ] Tool switching (slide direction, copy-leads-screenshot timing, card background crossfade) plays exactly as before this spec.
- [ ] The pin / snap behavior (the section holds the viewport until its entrance completes, then releases) is unchanged.
- [ ] With reduced motion on: the section shows immediately in its complete Web resting state; the pill nav remains fully interactive.
- [ ] All seven pills are reachable by keyboard and activatable with Enter or Space.
- [ ] No new TypeScript errors and no new ESLint warnings (`npx tsc --noEmit` and `npm run lint` both pass clean).
