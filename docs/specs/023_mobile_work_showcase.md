# Spec 023 — Mobile Work Showcase

**Status:** Ready for implementation
**Figma node:** [Mobile Work Showcase](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1305-453&m=dev) (node `1305:453`, frame name `work-showcase`, 393 × 3354)

Per-industry carousel frames, all anchored to the left section gutter:
- [`work-carousel-health`](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1305-475&m=dev) (node `1305:475`)
- [`work-carousel-food`](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1305-693&m=dev) (node `1305:693`)
- [`work-carousel-home`](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1305-877&m=dev) (node `1305:877`)
- [`work-carousel-money`](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1305-1111&m=dev) (node `1305:1111`) — corresponds to the "Retail & Services" industry
- [`work-carousel-care`](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1305-1262&m=dev) (node `1305:1262`)

**Position:** Replaces `WorkShowcase` on mobile. `WorkShowcase` becomes hidden below 768px; `MobileWorkShowcase` is hidden at 768px and above. Mounted in `app/page.tsx` immediately after `WorkShowcase`, between the hero and Every Channel sections.

**Depends on:** Spec 002 (Work Showcase), Spec 015 (Mobile Experience Model), Spec 019 (Value Props — for the existing mobile Embla carousel pattern this section centralizes with).

---

## What this section is

The mobile counterpart to the desktop "Marketing that works as hard as you do." Work Showcase. The desktop section is one continuously auto-scrolling rail of all twenty-five cards across five industries with hover-driven focus and a category bar at the bottom. None of that translates to a touch device.

On mobile, the section becomes **five stacked industry strips**. Each strip is one industry — its name, its sub-category labels, and a horizontally swipeable rail of *that industry's* cards (Sales, Ads, Social, Web, Content, Listings — whichever five cards that industry has on desktop). A thin horizontal divider separates each industry from the next.

The visitor swipes horizontally inside a strip to browse one industry's work, then scrolls vertically to reach the next industry. There is no global category bar, no auto-scroll, no hover state, no per-card label chip, and no scroll-state-machine pinning of the section.

---

## Scope

### In scope

- Section headline at the top, left-aligned to the section gutter.
- Five stacked industry strips rendered from the existing `WorkIndustry[]` and `WorkCardData[]` arrays — no new content data needed.
- Per-industry header: industry name in the site's display font, in the industry's accent color, followed by a sub-category labels row that wraps after four labels.
- Per-industry horizontally swipeable card rail. Cards keep their existing `ScaledMockCard` mock UIs and their natural width variation (the Web card is much wider than Sales / Ads / Social / Listings / Content cards).
- Thin horizontal divider line between every consecutive pair of industries.
- A small reusable hook in `lib/` that owns the Embla setup + active-index tracking + `scrollTo` helper, consumed by both `MobileWorkShowcase` (one instance per industry strip) and the existing `MobileValueProps` (one instance for its single carousel).
- Hiding the desktop `WorkShowcase` below 768px.
- Reduced-motion behaviour explicitly defined.

### Out of scope

- Auto-scroll. Cards advance only when the visitor swipes.
- Hover focus, lift, color/desaturate transitions, label chips. None of these exist on mobile.
- A global industry category bar or jump-to-industry navigation. Industries are reached by vertical scroll.
- New card variants or card content. The same `WorkCardData[]` array drives both desktop and mobile; the order of cards within each industry on mobile matches the order in the existing `WORK_CARDS` array.
- Pagination dots or counters.
- Any change to the desktop `WorkShowcase` other than its visibility breakpoint.
- Section-level pinning (`createSectionPin`). This is the only mobile section that exceeds one viewport — see below.

---

## Visual design

All exact measurements, type sizes, colors, and gaps come from Figma node `1305:453`. The spec describes structure and intent; values come from Figma at implementation time.

### Section background and rhythm

- The section sits on the same warm cream as the desktop Work Showcase and the rest of the cream sections.
- The section is naturally tall (the sum of the five industry strips plus the headline). Total Figma height is 3354 — roughly four mobile viewports.
- The section is **not pinned**, consistent with Spec 015's mobile experience model and matching how `MobileFooter` sits in the page flow. Mobile Work Showcase is the only mobile section whose intentional content height exceeds one viewport — every other mobile section is one viewport pinned by `createSectionPin`. Document this as a comment at the top of the component.

### Section headline

- Text matches desktop: "Marketing that works as hard as you do." with the same regular / oblique mix carried over from desktop (`works` and `hard as you do.` in oblique, the rest regular).
- **Left-aligned** to the section's left gutter (24px from the left edge), not centered. This is a deliberate departure from the desktop centered headline.
- Sits at the top of the section with the breathing room defined in Figma above and below it.
- Wraps onto two lines at the design width.

### Industry strip — repeating five times

Industry order matches the existing `WORK_INDUSTRIES` array: Health & Body → Food & Drink → Home & Property → Retail & Services → Care & Maintenance.

Each strip is composed top-to-bottom of:

1. **Industry name header.** The industry's full label in the site's display font (the same FK Screamer face used for the desktop category bar), uppercase, in that industry's accent color (`WorkIndustry.activeColor`). Aligned to the section's left gutter.
2. **Sub-category row.** The industry's `subLabels`, separated by bullets, in the site's monospace face at the size and color shown in Figma (matches `subLabelsColor`). The row wraps to a second line after every four labels (Health, Food, and Retail show two lines; Home shows two lines because the Figma packs Cleaning onto a second row; Care shows one line). Wrap behavior is read directly from Figma.
3. **Horizontally swipeable card rail.** Embla carousel containing that industry's cards — that industry's slice of `WORK_CARDS` filtered by `industryId`, in the order they appear in the existing array. Cards retain their existing per-variant widths and heights — the Web card stays wide, the Sales card stays tall, the Ads / Social / Listings / Content cards keep their respective dimensions. Mobile uses a smaller scale than desktop (the Figma renders cards at roughly 72% of their desktop natural width — the implementation should derive the exact scale from Figma per card type).
4. **Bottom-of-strip divider.** A thin horizontal rule that spans the full section width (extends past the gutters), separating this industry from the next. The first industry has no rule above it — the rule sits *between* industries. The last industry has no rule beneath it (the section ends with the strip's natural padding).

### Card rail layout

- The rail starts at the section's left gutter (24px from the left edge).
- Cards are laid out in a horizontal row at their natural mobile-scale widths, separated by a small fixed gap (read from Figma).
- The first card sits flush with the gutter — it is **not** centered with peek on both sides. This matches the Figma design, which shows the first card aligned to the start, with subsequent cards extending to the right beyond the viewport.
- The visitor swipes left to scroll the rail and reveal subsequent cards. The rail snaps to card boundaries on release.
- Total rail width per industry exceeds the viewport (Figma rail widths: 1569–1686). The visitor swipes through all five cards in that industry.
- Card vertical alignment within the rail: cards bottom-align so that the rail row reads as a single baseline (matches Figma).

### Cards

- Cards render the same mock UIs they render on desktop, using the same `ScaledMockCard` pattern. Internal pixel layout is unchanged; the wrapper transform-scales each card to its mobile size.
- **No desaturation, no warm sepia overlay, no luminosity blend.** Mobile cards render in their full-color (focused) state at all times. The per-card "default" desaturated treatment from Spec 002 does not apply on mobile.
- **No label chip** appears beneath any card on mobile.
- **No hover-driven lift, color transition, or focus chrome.** Cards are rendered statically; the only motion comes from the visitor's own swipe / scroll.
- Tapping a card has no effect (the cards are decorative mock UIs, not interactive controls). The card rail itself is the interactive surface — visitors swipe it.

### What is removed compared to desktop

- The category bar across the bottom.
- The flat 25-card auto-scrolling carousel.
- Hover focus / lift / color transitions / label chips.
- Auto-scroll.

---

## Behavior

### Within an industry strip

- Visitor swipes the rail left or right to scroll between cards. Embla handles drag and snapping.
- Each strip tracks its **own** scroll position and active card index independently — scrolling Health & Body does not affect Food & Drink.
- No tap-to-activate behavior on cards (cards are decorative).
- Keyboard: when focus is inside a strip, Left / Right arrow keys advance / retreat that strip's rail (matches the existing `MobileValueProps` keyboard treatment).

### Between industries

- Visitor scrolls vertically. There is no jump-to-industry control on mobile.
- Each industry strip is a normal block in the page flow.

### Auto-scroll

There is none on mobile.

### Initial state

- Each rail opens with its first card flush against the section's left gutter.
- The first card visible per industry is the first card in that industry's slice of `WORK_CARDS`. For Health & Body that means the Web card (which is much wider than the others and visibly extends past the right edge of the viewport on first paint — the visitor must swipe to see the rest of it). This is intentional per Figma; do not retrofit the design to make the first card fit.

### Decorative video playback inside cards

Card mock UIs that contain looping video (e.g. the Web card hero) autoplay muted with `playsInline` exactly as on desktop. They do not pause when off-screen.

---

## Centralization — the shared Embla hook

`MobileValueProps` already implements an Embla-driven mobile carousel. `MobileWorkShowcase` needs the same primitive five times over (one rail per industry). The shared logic is extracted so both sections agree on:

- Embla initialization and teardown.
- Subscribing to the `select` event and tracking the current slide index.
- A `scrollTo(index)` that triggers a programmatic snap.
- Cleanup of the `select` listener on unmount, following the codebase's "Effects Are Idempotent" rule.

The shared piece lives in `lib/` as a small hook (e.g. `useEmblaWithIndex`). It accepts the Embla options object as input — letting each consumer pick its own `align`, `containScroll`, `dragFree`, `loop` settings — and returns the Embla viewport ref to attach, the current active index, and the imperative `scrollTo` function. The hook owns no markup; each section renders its own slides.

Embla options differ by section:

- `MobileValueProps`: `{ align: 'center', containScroll: 'trimSnaps', dragFree: false, loop: false }` (centered card with peeking neighbours of uniform width).
- `MobileWorkShowcase` (per industry rail): `{ align: 'start', containScroll: 'trimSnaps', dragFree: false, loop: false }` (first card flush to gutter; cards have variable widths).

The visual / interaction behaviour of `MobileValueProps` does not change as part of this refactor — it simply uses the shared hook instead of inline `useEmblaCarousel` + `useEffect` plumbing. The deduplication is the only observable change.

A note in `docs/explainers/components.md` records the hook as the canonical entry point for any future mobile Embla carousel.

---

## Responsive behaviour

- **Below 768px:** `MobileWorkShowcase` is shown; `WorkShowcase` is hidden.
- **At 768px and above:** `WorkShowcase` is shown; `MobileWorkShowcase` is hidden.
- The visibility flip is CSS-only (`hidden md:block` / `md:hidden`) — no JavaScript media-query gating, no flash of the wrong layout.
- Mobile design is read from a 393px reference canvas. The layout must work down to 360px and up to 767px without horizontal overflow at the section root. The card rails themselves intentionally scroll horizontally; the section's outer `<section>` element does not.
- The section gutter is the standard mobile gutter (24px from each edge). Headlines, industry names, sub-category rows, and the start of each card rail all anchor to this gutter on the left side. The right side of every card rail extends past the right edge of the viewport — that's the design.

---

## Reduced motion

- Carousel swiping is gesture-driven, not animated by the page. It remains usable.
- There is no GSAP entrance animation on this section, so there is nothing to suppress.
- Embla's snap animation on release is brief and ornamental; if `prefers-reduced-motion: reduce` is set, configure each rail's Embla `duration` option to `0` so snaps are instant. Do this through the shared hook so `MobileValueProps` benefits from the same treatment in the same change.

---

## Accessibility

- The section root carries an `aria-label` matching the section headline.
- Each industry strip is wrapped in a landmark with the industry name as its accessible name (e.g. `aria-label="Health & Body work"`), so screen-reader users can navigate by industry.
- Each card rail uses `role="region"` with the industry name + "carousel" as its accessible name.
- Card rails are keyboard reachable. Tabbing into a rail focuses the rail; Left / Right arrow keys scroll the rail by one card.
- Decorative videos inside cards stay `aria-hidden="true"` exactly as on desktop.
- Color contrast for the industry name in its accent color against the cream background must meet WCAG AA. Existing accent colors already pass for all five industries on the cream background — verify after implementation, do not invent new colors.
- Sub-category labels are presented as plain text (visual list), not as a list of links. They are decorative and do not need to be in a `<ul>` unless the implementer judges otherwise.

---

## Edge cases

- **Industry with fewer than 5 cards.** Rail still works — Embla simply has fewer snap points. Do not pad with empty slides.
- **Industry name wraps.** "RETAIL & SERVICES" and "CARE & MAINTENANCE" are long. The header must wrap onto a second line cleanly without truncation if the viewport is narrow enough to require it.
- **Sub-category row wrap.** Each industry's sub-category row wraps as shown in Figma — most wrap to two lines. The wrap behavior must remain stable across phone widths down to 360px; never overflow horizontally and never truncate.
- **Web card on Health & Body.** The first card in this industry is the wide Web card (the X2O Studio website mockup). It extends past the viewport on first paint and the visitor swipes to see the rest. This is correct, not a bug.
- **Reduced motion.** Documented above.
- **Hot reload during development.** The shared hook follows the same effect-cleanup pattern as the rest of the codebase — Embla is destroyed and recreated cleanly on remount.

---

## Acceptance criteria

- [ ] Below 768px the mobile work showcase is shown; the desktop `WorkShowcase` is not visible.
- [ ] At 768px and above the desktop `WorkShowcase` is shown; the mobile work showcase is not visible.
- [ ] The section headline appears at the top of the section, left-aligned to the section gutter, with the same regular / oblique treatment as desktop.
- [ ] Five industry strips are rendered in the order Health & Body → Food & Drink → Home & Property → Retail & Services → Care & Maintenance.
- [ ] Each industry strip shows the industry name in that industry's accent color, in the site's display font, uppercase, left-aligned.
- [ ] Each industry strip shows that industry's sub-category labels separated by bullets, wrapping to a second line as in Figma.
- [ ] Each industry strip contains a horizontally swipeable rail of that industry's cards only — no other industry's cards appear in that rail.
- [ ] In each rail, the first card is flush with the section's left gutter; subsequent cards extend to the right beyond the viewport.
- [ ] Cards retain their existing variable widths — the Web card is visibly wider than the Sales / Ads / Social / Listings / Content cards.
- [ ] Cards bottom-align within the rail so the rail reads as a single baseline.
- [ ] All cards render in full color — there is no desaturated default state on mobile.
- [ ] No label chip appears beneath any card on mobile.
- [ ] No hover-driven lift or color transition runs on any card on mobile.
- [ ] No category bar appears at the bottom of the section on mobile.
- [ ] No auto-scroll runs in any rail on mobile.
- [ ] A thin horizontal rule appears between every consecutive pair of industries; no rule appears above the first industry or below the last.
- [ ] Vertically scrolling the page moves through the five industry strips in order.
- [ ] Each rail tracks its scroll position independently of the others.
- [ ] At 360px viewport width, the section's outer container does not overflow horizontally and no text is truncated.
- [ ] Industries with long names ("RETAIL & SERVICES", "CARE & MAINTENANCE") wrap cleanly without truncation.
- [ ] Decorative videos inside cards autoplay muted and in-place exactly as on desktop.
- [ ] Each card rail is keyboard reachable; Left / Right arrow keys scroll the rail by one card while focus is inside it.
- [ ] Under `prefers-reduced-motion: reduce` Embla snap animations are instant (duration 0).
- [ ] `MobileValueProps` and `MobileWorkShowcase` share one Embla hook. Each consumer passes its own Embla options. The Embla setup, select-event subscription, and `scrollTo` helper are not duplicated between the two component files.
- [ ] `MobileValueProps`'s observable behaviour (active card lift, snap, click-to-activate, keyboard) is unchanged after the refactor.
- [ ] `npx tsc --noEmit` and `npm run lint` pass with zero errors and zero warnings.
