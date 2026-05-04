# Spec 007 — Product Screens

**Status:** Draft  
**Figma file:** `XRbD11WIevI5szRFiRrguZ`  
**Figma nodes:**
- [Product Screens — all 7 tool states](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1087-2360) (node `1087:2360`)
- [Pill nav styling — Web active state](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1087-1849) (node `1087:1849`)

**Delivers:** The fourth section of the homepage — a full-viewport product showcase that enters via a dramatic animation linked to the Every Channel section, then lets the visitor explore each of Keystone's seven marketing tools through a pill nav row.

---

## Before building

Before writing any code, use the Figma MCP to run `get_design_context` on both nodes listed above (file `XRbD11WIevI5szRFiRrguZ`). Also run `get_screenshot` on node `1087:2360` for a visual overview of all seven tool states side by side.

Node `1087:2360` is a wide composite frame containing seven 1440×1024px panels — one per tool — arranged left to right: Web, Leads, Ads, Social, Sales, Reviews, Content. Each panel shows the complete resting state: the warm cream outer background, the dark inset card, the pill nav near the top of the card, the Keystone mark and value copy at the lower-left of the card, and the product UI screenshot filling the right side of the card.

Node `1087:1849` shows the pill nav row in its Web-active state, providing exact measurements for pill dimensions, spacing, typography, color square size, border weight, and border radius.

Use the MCP output as the source of truth for:

- Exact inset card dimensions, top offset, and corner radius per tool
- All card background colors, copy accent colors, and pill colors per tool
- All copy text per tool
- All Keystone mark icon assets and product UI screenshot assets
- Font size, line-height, letter-spacing, and max-width for all text
- The exact position of the nav, mark, copy, and screenshot within the card

Do not build from the tables in this spec alone. Always cross-reference against the live Figma data — the spec describes intent and behavior; Figma describes exact visual values.

---

## What this section is

The fourth section on the homepage. Visitors reach it by scrolling past the Every Channel section (003). It sits immediately before the Social Proof section (006).

The section enters with a fully scroll-driven animation that is visually continuous with the Every Channel section. As the visitor scrolls after the Every Channel animation completes, two things happen simultaneously: the seven scattered channel pills converge toward the vertical center of the viewport, while the dark inset card rises from below the page, contracting and rounding at its corners as it rises. The card is always mid-contraction — it never covers the entire screen. The cream outer background is visible around it throughout the entire entrance. As the card rises, its top edge approaches the converged pill row from below. The moment the card's top edge is exactly 46px below the pills, the pills latch on and travel upward with the card. Before the card reaches its final resting position — 24px from every viewport edge — the section content loads in within the card. The card settles, and the section is at rest.

At rest, the section is a full-viewport-height dark card sitting on a warm cream background with a thin margin of cream visible around all four edges. Seven pills in a row near the top of the card identify Keystone's marketing tools. The left portion of the card shows the Keystone mark icon and a one-sentence value proposition in the active tool's accent color. The right portion shows a product UI screenshot.

The visitor clicks any pill to switch tools. The inset card content slides horizontally in the direction of the selected pill while the background color crossfades and the copy resolves slightly ahead of the image.

---

## Scope

### In scope

- Section entrance: pill convergence from Every Channel scattered positions (scroll-driven)
- Section entrance: card rises from below while simultaneously contracting and rounding (scroll-driven)
- Section entrance: pills latch onto the rising card and travel with it to the nav position
- Section entrance: section content loads in as the card approaches its final position
- Seven tool states, one per pill: Web, Leads, Ads, Social, Sales, Reviews, Content
- Pill nav row: active and inactive states per tool
- Keystone mark icon per tool (different color variant per tool)
- One-sentence copy per tool in the tool's accent color
- Product UI screenshot per tool
- Tool switching: horizontal slide transition for the inset content
- Card background color crossfade on tool switch
- Copy transition leading the image by a short interval

### Out of scope

- Any section above or below this one
- Mobile layout (explicitly deferred to a future spec revision)
- Auto-advance or any carousel behavior
- Any CTA buttons, links, or form elements
- Backend integration of any kind

---

## Visual design

### General

The section fills the full browser viewport height at all times. The outer background is warm cream `#f0eee6`. A large dark inset card sits inset 24px from every edge of the viewport — its width and height are always derived from the viewport size, never fixed values. At 1440×1024px the card would be 1392×976px, but at any other viewport size it adjusts automatically so the 24px gap on all four sides is always maintained. The card has fully rounded corners (20px radius).

The card's background color is unique to the active tool and changes when the visitor switches tools.

### Pill nav

Seven pills sit in a centered horizontal row near the top of the dark inset card, approximately 46px from the card's top edge. The full row is approximately 679px wide.

**Active pill:** Solid fill in the tool's pill color. No border. The small color square inside the pill matches the card's background color — it appears to disappear into the card. The text label also matches the card's background color.

**Inactive pill:** A 1.346px solid outline border in a muted tone derived from the card's background color (slightly lighter than the card). The small color square displays the tool's own assigned color. The text label is off-white `#f8f7f2`.

The border color of inactive pills adapts to the currently active tool — each tool has its own specific border tone. Exact border colors come from Figma node `1087:2360`.

**Pill anatomy:**
- Shape: fully rounded pill (border-radius 9999px)
- Horizontal padding: approximately 14px each side
- Vertical padding: approximately 6px each side
- Color square: approximately 9×9px, positioned to the left of the label
- Gap between square and label: approximately 8px
- Font: FK Grotesk Neue Regular, approximately 15.2px, line-height approximately 26.9px, letter-spacing approximately −0.15px

### Left content zone

The leftmost approximately 508px of the inset card contains two elements near the bottom of the card:

**Keystone mark icon** — positioned approximately 48px from the card's left edge and approximately 667px from the card's top edge. Approximately 36×41px. Each tool has its own color variant of the mark icon. Exact assets come from Figma.

**Value copy** — positioned approximately 48px from the card's left edge and approximately 760px from the card's top edge, approximately 412px wide. FK Grotesk Neue Regular, approximately 32px, line-height 1.2, letter-spacing approximately −0.96px. The text color is the tool's accent color, which is unique per tool and listed in the Content table below.

### Right content zone

The right side of the inset card — from approximately 508px from the card's left edge to the card's right edge — contains the product UI screenshot. The image begins approximately 162px from the card's top edge. Corner radius approximately 20px. The image scales to fill its zone completely with no letterboxing or empty edges.

Exact image assets and dimensions come from Figma node `1087:2360`.

---

## Animation behavior

### Phase 1 — Card rise and contraction, simultaneous with pill convergence (scroll-driven)

After the Every Channel (003) pin releases and the visitor begins scrolling, two things happen simultaneously, both tied directly to scroll progress.

**Pills converge:** The seven scattered channel pills begin moving toward the vertical center of the viewport. Pills whose center point is above the vertical midpoint (50% of viewport height) slide downward; pills below the midpoint slide upward. All seven converge into a single centered horizontal row at the viewport's vertical midpoint. The pills float above all other page content throughout — they are always fully visible regardless of what is beneath them.

**Card rises and contracts:** The dark inset card begins rising from below the page while simultaneously contracting — narrowing, shortening, and rounding at its corners — toward its final card shape. The contraction and the rise happen together as a single scroll-driven motion. At no point does the card cover the entire screen. The warm cream outer background is always visible around the card throughout the entrance. The further the visitor scrolls, the higher and more card-shaped the dark element becomes.

### Phase 2 — Pills latch onto the rising card (scroll-driven, continuous from Phase 1)

As the card continues rising, its top edge approaches the converged pill row from below. The moment the card's top edge reaches exactly 46px below the pills — placing the pills at their final nav position relative to the card — the pills stop moving independently and begin traveling upward with the card as it continues to rise. They are now fixed to the card surface.

The card continues rising to its final resting position: 24px from the top, left, right, and bottom of the viewport. The pills arrive at the top of the card as the card settles.

### Phase 3 — Content loads in as card settles (auto-plays as card approaches final position)

As the card nears its final resting position, the section content — the Keystone mark icon, the value copy, and the product UI screenshot — loads in within the card. The content is visible and settled before the card reaches its exact final position, so the section feels alive and complete as it comes to rest rather than popping in after a hard stop.

Once the card has reached its final position and the content is visible, the section is at rest and the visitor can interact with the pill nav.

### Easing and timing sensibility

All entrance animations use GSAP with ScrollTrigger. The entire entrance is scroll-driven — the visitor's scroll position directly controls how far the card has risen and contracted, and how far the pills have converged. All animations must be wrapped in `gsap.matchMedia()` to respect reduced motion.

The card's rise and contraction should feel like a single unified motion — a dark shape emerging from below while simultaneously becoming more defined. The easing on the contraction and rise should be smooth throughout: no abrupt jumps, no hard stops mid-animation. The pills latching onto the card and traveling with it should feel natural — as if they were always going to end up there. The content loading in just before the card settles should feel like the section waking up, not popping in.

### Reversibility

The entire entrance is scroll-driven and reverses cleanly. If the visitor scrolls back up at any point: the card descends and expands back toward its starting state, the pills deconverge and return toward their Every Channel positions. Phase 3 (content load-in) is the only part that does not need to reverse — the content may simply remain hidden if the card has not yet reached its load-in threshold on the way back down.

### Tool switching

Clicking a pill triggers the following sequence:

The active pill updates immediately to the clicked tool's filled style. All other pills switch to their outlined style with border colors matching the new tool's card background.

The copy and Keystone mark transition to the new tool's content. The copy begins resolving slightly before the image finishes sliding in — the text lands first, then the picture arrives.

The inset card content slides horizontally: clicking a pill to the right of the current active one brings new content in from the right (content slides left). Clicking a pill to the left brings new content in from the left (content slides right). The outgoing content exits in the opposite direction from where the new content enters.

The card background color crossfades to the new tool's color over the course of the slide. The transition feels crisp and directional — a medium-fast ease-out deceleration.

---

## Design tokens required

The outer section background reuses the existing warm cream token. Verify that `--color-hero-text` (`#f0eee6`) is already registered in `styles/custom-overrides.css`. If it is, no new outer-background token is needed.

All per-tool card background colors and accent colors are unique to this section and passed as props — they are not registered as tokens.

---

## Fonts

No new fonts required. The section uses:

- FK Grotesk Neue Regular — already registered

---

## Responsive behavior

- **Desktop (≥ 1280px):** Full entrance animation and layout as described above.
- **Tablet and mobile (< 1280px):** Out of scope for this spec. For now the section displays in its complete Web resting state — card visible, pill nav interactive, copy and screenshot visible — with no entrance animation, no pill convergence, and no scroll jacking. Mobile layout and behavior will be defined in a future revision.

At all supported breakpoints, no element may overflow horizontally.

---

## Content — all text and assets come from props

No text, color, asset path, or configuration value may be hardcoded in the component file.

**Per-tool values:**

| Tool | Card bg | Copy accent | Pill fill | Inactive border | Copy text |
|------|---------|-------------|-----------|-----------------|-----------|
| Web | `#042019` | `#6ecc8b` | `#65cf78` | `#0a4d3c` | "A fast, conversion-optimized site built to your brand and kept current without you lifting a finger." |
| Leads | `#3a2a0e` | `#f2ba46` | `#f1c131` | `#594117` | "Every inbound lead gets a reply in minutes — 24/7 — so warm interest never goes cold." |
| Ads | `#3c1618` | `#f57e56` | `#f57e56` | `#652528` | "Meta campaigns that target the right customers, in your market, with the right offer at the right moment." |
| Social | `#2f0d3f` | `#9c65ee` | `#9c65ee` | `#581876` | "On-brand, consistent posting across your channels — without you writing a single caption." |
| Sales | `#0f223d` | `#56a6ff` | `#56a6ff` | `#1b3e6f` | "On-brand, consistent posting across your channels — without you writing a single caption." |
| Reviews | `#0d2a28` | `#5bc3b3` | `#5bc3b3` | `#174a46` | "On-brand, consistent posting across your channels — without you writing a single caption." |
| Content | `#3d1324` | `#f38bb0` | `#f38bb0` | `#611e39` | "Continuous, search-optimized content that builds your visibility over time." |

**Pill color squares** (the small square inside each pill, same in all tool states):

| Pill | Square color |
|------|-------------|
| Web | `#65cf78` |
| Leads | `#f1c131` |
| Ads | `#f57e56` |
| Social | `#9c65ee` |
| Sales | `#56a6ff` |
| Reviews | `#5bc3b3` |
| Content | `#f38bb0` |

When a pill is active, its square changes to match the active card background color. When inactive, the square displays the tool's own color as shown above.

**Static assets** (export from Figma before implementation, place in `public/product-screens/`):

| Asset | Filename |
|-------|----------|
| Web — Keystone mark | `mark-web.svg` |
| Leads — Keystone mark | `mark-leads.svg` |
| Ads — Keystone mark | `mark-ads.svg` |
| Social — Keystone mark | `mark-social.svg` |
| Sales — Keystone mark | `mark-sales.svg` |
| Reviews — Keystone mark | `mark-reviews.svg` |
| Content — Keystone mark | `mark-content.svg` |
| Web — product screenshot | `screen-web.png` |
| Leads — product screenshot | `screen-leads.png` |
| Ads — product screenshot | `screen-ads.png` |
| Social — product screenshot | `screen-social.png` |
| Sales — product screenshot | `screen-sales.png` |
| Reviews — product screenshot | `screen-reviews.png` |
| Content — product screenshot | `screen-content.png` |

Export mark icons as SVGs. Export screenshots as static images. Exact pixel dimensions come from Figma.

---

## Accessibility

- All GSAP animations must be wrapped in `gsap.matchMedia()` using the `(prefers-reduced-motion: no-preference)` media query.
- With reduced motion on: the section displays immediately in its complete Web resting state with no animation of any kind. No pill convergence, no cover snap, no card contraction. The pill nav is fully interactive.
- All seven pill nav items must be keyboard-navigable. The visitor must be able to tab to each pill and activate it with Enter or Space.
- Switching tools via keyboard must produce the same result as clicking.
- Product UI screenshots are decorative — use `alt=""`.
- Keystone mark icons are decorative — use `alt=""`.
- Verify that each tool's copy accent color meets WCAG AA contrast (3:1) against its card background color. If any pair fails, flag it for the designer.

---

## Acceptance criteria

- [ ] The section is off-screen below the viewport when the page first loads
- [ ] Once the Every Channel animation completes and the visitor scrolls, all seven pills begin moving — pills above 50% viewport height slide down, pills below 50% viewport height slide up
- [ ] Simultaneously, the dark card begins rising from below while contracting and rounding at its corners
- [ ] At no point during the entrance does the dark background fill the entire screen — warm cream is always visible around it
- [ ] The pill convergence and card rise are both directly tied to scroll position — both advance as you scroll and reverse if you scroll back
- [ ] While converging, the pills float above all other page content and are always visible
- [ ] As the card rises and its top edge reaches 46px below the converged pill row, the pills latch onto the card and travel upward with it
- [ ] The section content (copy, mark, screenshot) becomes visible as the card approaches its final position — before the card fully comes to rest
- [ ] The card settles at its final position: 24px from every edge of the viewport
- [ ] The card is always exactly 24px from every edge of the viewport — resize the browser and the gap stays 24px on all four sides at all desktop widths
- [ ] The card has fully rounded 20px corners in its final resting state
- [ ] Scrolling back up at any point causes the card to descend, expand back toward its starting state, and the pills to deconverge toward their Every Channel positions
- [ ] At rest: cream outer background, dark inset card, pill nav near card top, mark and copy lower-left of card, product screenshot on the right
- [ ] The active Web pill is solid green (`#65cf78`) with a dark-matching square and dark text
- [ ] All inactive pills show their own outline border, their own color square, and off-white text (`#f8f7f2`)
- [ ] Pill border colors match the inactive border tone for the active tool (not a single universal color)
- [ ] Clicking a pill immediately updates the active pill's filled style
- [ ] Clicking a pill to the right of the active one slides new content in from the right
- [ ] Clicking a pill to the left of the active one slides new content in from the left
- [ ] Outgoing content exits in the direction opposite to where new content enters
- [ ] The copy resolves visibly before the image finishes sliding in
- [ ] The card background color crossfades to the new tool's color during the transition
- [ ] All seven tool states display the correct copy color, copy text, mark icon, and screenshot
- [ ] The section height fills the full viewport height at all viewport widths
- [ ] Below 1280px: section shows in its Web resting state with no entrance animation, pill nav is interactive
- [ ] With reduced motion on: section shows immediately in its complete Web resting state, no animation of any kind
- [ ] All pill nav items are reachable by keyboard Tab and activatable with Enter or Space
- [ ] No text, color, asset path, or configuration value is hardcoded in the component
