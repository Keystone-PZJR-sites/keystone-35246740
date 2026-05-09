# Spec 022 — Mobile Footer

**Status:** Ready for implementation
**Figma node:** [Footer — mobile](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1281-607&m=dev) (node `1281:607`)

**Position:** Replaces `OversizedFooter` on mobile. `OversizedFooter` is hidden below 768px; `MobileFooter` is hidden at 768px and above.

**Depends on:** Spec 015, Spec 016

---

## What this section is

The mobile counterpart to the desktop oversized footer. It shares the same brand identity — the FK Screamer word collage interspersed with video clips, the Keystone mark, tagline, "Get started" CTA, social links, email signup, wordmark, and legal links — but adapts it to a single-column scrolling layout for phone viewports.

The mobile footer is **not** pinned. Unlike all other sections on the page, the footer scrolls naturally.

---

## Scope

### In scope

- FK Screamer text collage with 3 embedded video clips at top
- Keystone mark (K logo) below the collage
- Tagline + "Get started" CTA row
- Blog/podcast copy + social icon row (all 4 icons: Instagram, Facebook, YouTube, LinkedIn)
- Email signup row (text + pill input with "Sign Up" button)
- Full-width Keystone wordmark
- Legal links (Terms, Privacy, © year)
- Email form wired to the same submit handler as the desktop footer

### Out of scope

- Section pinning (`createSectionPin` is NOT used — footer is exempt per project rules)
- Desktop `OversizedFooter` layout

---

## Visual design

**Background:** `#3d1719` — dark maroon/rust, same as the desktop footer.

**Canvas reference:** 393 × ~900 px (natural-height section, not `h-screen`).

---

### Top zone — text collage

An `overflow: hidden` relative-positioned block. Height: ~460px (enough to contain the collage text, videos, and Keystone mark). All child elements use absolute positioning with values derived from the 393px Figma canvas.

**Text lines** — FK Screamer Bold, 77–78px, uppercase, line-height 0.82, color `#f57e56`:

| # | Text | left | top | Notes |
|---|------|------|-----|-------|
| 1 | `FOR BUSINESSES` | `calc(50% - 172.5px)` = 24px | 24px | |
| 2 | `THAT ARE` | right-aligned to `calc(50% + 170.5px)` | 95px | `-translate-x-full` in Figma |
| 3 | `DONE` | `calc(50% - 172.5px)` = 24px | 167px | |
| 4 | `FIGURING` | `calc(50% - 28.5px)` = 168px | 167px | Same row as DONE |
| 5 | `IT OUT` | `calc(50% - 172.5px)` = 24px | 239px | |
| 6 | `THEMSELVES` | `calc(50% - 98.5px)` = 98px | 311px | |

**Three video clips** — small landscape clips with rounded 1px corners, object-fit cover:

| # | left | top | width | height | Video prop |
|---|------|-----|-------|--------|------------|
| A | 24px | 97px | 133px | 59px | `videoA` |
| B | `calc(50% + 74.5px)` = 271px | 241px | 192px | 59px | `videoB` |
| C | 24px | 313px | 71px | 59px | `videoC` |

**Keystone mark** — the K geometry mark icon at `left: 24px; top: 415px`, 37px × 41px, color `#f57e56`. Use `<KeystoneMark>` component with `color="#f57e56"` and `width={37} height={41}`.

---

### Content zone — rows stacked from bottom

Below the collage, the content rows are stacked top-to-bottom as natural-flow flex children. Refer to Figma `bottom` measurements for visual spacing; approximate row gaps are derived from the difference between consecutive `bottom` values:

**Row 1 — Tagline + Get Started CTA**
- Flex row, `justify-content: space-between`, items centered, full width, horizontal padding 24px
- Left: tagline paragraph, 14px FK Grotesk Neue Regular, line-height 1.2, letter-spacing −0.42px, color `#f57e56`, max-width 169px
- Right: "Get started" pill button — bg `#ffbb8a`, text `#3d1719`, 14px FK Grotesk Neue, with right-arrow icon (12px, from `ctaArrowSrc`)
- Button wired to `openModal` (lead capture modal, same as desktop footer "Get started")

**Row 2 — Blog / Podcast + Social icons**
- Flex row, `justify-content: space-between`, items centered, horizontal padding 24px
- Left: 14px FK Grotesk Neue Regular, line-height 1.2, letter-spacing −0.42px, color `#f57e56`, max-width 169px
  - Text: "Read [the blog] and check out [our podcast]." where `[the blog]` and `[our podcast]` are underlined links pointing to `cta1Href` and `podcastUrl` respectively
- Right: row of 4 social icon buttons (gap 16px)
  - Each icon: 32px × 32px filled circle, bg `#f57e56`, with centred social icon SVG
  - Order: **Instagram, Facebook, YouTube, LinkedIn** (Figma shows 2; project adds YouTube and LinkedIn per user requirement)
  - All icons rendered only when their respective URL prop is non-empty
  - Instagram, Facebook paths match those in the desktop `OversizedFooter`; YouTube and LinkedIn paths also reused

**Row 3 — Email signup**
- Flex column, horizontal padding 24px, gap 16px
- Top: description text, 14px FK Grotesk Neue Regular, line-height 1.2, letter-spacing −0.42px, color `#f57e56`, max-width 169px
  - Text: "Stay informed about our latest features and product releases"
- Bottom: pill-shaped email form
  - Border: 1px solid `#9f3722`, border-radius full, padding: 8px 8px 8px 20px
  - Left: email input, placeholder text in `#f57e56`, 14px FK Grotesk Neue, letter-spacing −0.42px, `flex: 1`
  - Right: "Sign Up" pill button — bg `#f57e56`, text `#3d1719`, 14px FK Grotesk Neue, with right-arrow icon, border-radius full, padding 12px
  - Form `onSubmit` wired to the same pixel tracking + state logic as the desktop footer (see `OversizedFooter` email submit handler for reference)

**Wordmark bar**
- Full-width centered block, horizontal padding 24px
- Keystone logotype: `<Image src={keystoneWordmarkSrc}>` — height 67px, width 345px

**Legal row**
- Flex row, centered, horizontal padding 24px, gap 16px
- Font: FK Grotesk Neue Regular, 12px, line-height 24px, letter-spacing −0.36px, color `#b24934`
- Three items: "Terms" (underlined link), "Privacy" (underlined link), "© {year} Keystone" (static text)

---

## Row spacing (approximate, from Figma `bottom` positions)

The four content rows inside the content zone (plus wordmark and legal) have the following approximate spacing when measured from the bottom of the footer (~900px tall):

| Item | bottom value | approx gap above |
|------|-------------|-----------------|
| Legal | 24px | — |
| Wordmark bottom | 50px (top at 117px from bottom) | 26px |
| Email row | 149px | 32px from wordmark top |
| Social row | 326px | ~177px between social row and email row (padding) |
| Tagline row | 416px | ~90px between tagline and social row |

For implementation, use a flex column with appropriate padding/gap values rather than absolute `bottom` positioning.

---

## Technical notes

- Component file: `components/sections/MobileFooter.tsx`
- CSS file: `styles/sections/mobile-footer.css`
- Props type: `MobileFooterProps` — shares the same prop interface as `OversizedFooterProps` except the video props `videoD` and `videoE` are not used on mobile (only `videoA`, `videoB`, `videoC` appear in the collage)
- `OversizedFooter` gains `hidden md:block` on its root element; the footer is **not** subject to the `md:hidden` rule on `MobileFooter`'s parent wrapper (footer is the last element, after all pinned sections)
- `/_videos/v1/` paths from Figma are placeholders; reuse existing `/footer/` video files
- The email submit handler must import `setPixelUserData` and `captureEvent` from `keystone-design-bootstrap/tracking`, matching the desktop footer pattern exactly
- Social icons are inline SVG paths — reuse the desktop footer SVG path data for consistency
- "Get started" CTA button calls `openModal` from `useLeadCapture` (same as desktop footer)
- `OversizedFooter` currently has no `hidden md:block`. It needs to gain `hidden md:block` in this change
- No `createSectionPin` call — the footer is exempt from pinning per project rules
- No `sectionPin.ts` changes needed

---

## Acceptance criteria

- [ ] Below 768px: `MobileFooter` is shown; `OversizedFooter` is hidden
- [ ] At 768px and above: `OversizedFooter` is shown; `MobileFooter` is hidden
- [ ] FK Screamer text lines render at correct positions against the dark maroon background
- [ ] Three video clips are embedded within the text collage at Figma-specified positions
- [ ] Keystone K mark renders at `left: 24px; top: 415px` within the collage zone in orange
- [ ] Tagline text and "Get started" button render in a horizontal row with correct colors
- [ ] "Get started" button opens the lead capture modal
- [ ] Blog/podcast copy renders with underlined links
- [ ] All 4 social icons render as 32px filled orange circles (shown only when URL provided)
- [ ] Email input and "Sign Up" button render as a pill form
- [ ] Email form submits correctly with pixel tracking
- [ ] Keystone wordmark renders full-width and centered
- [ ] Legal row renders at the bottom with Terms, Privacy, and © links/text
- [ ] TypeScript and ESLint pass with zero errors
