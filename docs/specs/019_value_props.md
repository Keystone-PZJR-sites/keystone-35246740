# Spec 019 — Value Props

**Status:** Ready for implementation
**Figma nodes:**
- Desktop: [Not an Agency](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1276-7564&m=dev) (node `1276:7564`)
- Mobile slide 1: [ValueProps — slide 1](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1278-467&m=dev) (node `1278:467`)
- Mobile slide 2: [ValueProps — slide 2](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1271-6342&m=dev) (node `1271:6342`)
- Mobile slide 3: [ValueProps — slide 3](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1271-6402&m=dev) (node `1271:6402`)

**Position:** After Product Screens, before Social Proof.

---

## What this section is

Three value-proposition cards that articulate why Keystone is different from a typical agency or software product. The section headline reads "Not an agency. Not software. Something *better*." The three cards each name a distinct value dimension: sales and marketing expertise, output quality, and local business experience.

This section is not a full-viewport hold like the Product Screens or Every Channel sections. It is a standard scrolling section — the visitor scrolls through it naturally.

---

## Scope

### In scope

- Desktop layout: three side-by-side cards with header and CTA buttons
- Mobile layout: a horizontally swipeable carousel with one active card at a time
- Scroll-triggered entrance animation on desktop (cards animate in as section enters the viewport)
- Mobile carousel: swipe and snap navigation using Embla Carousel
- Three card states: Sales & Marketing Expertise, Quality Focused, Local Business Experience
- Each card contains a looping video, a styled headline, and body copy
- The CTA button pair (Learn more / Get started) in the desktop header

### Out of scope

- The Social Proof section
- The Product Screens section
- Backend routing for the CTA buttons (they are placeholders for Phase 2)

---

## Visual design

Refer to Figma nodes listed above for all exact values.

### Desktop

The section sits on the same warm cream background used throughout the desktop experience. A single row at the top holds the headline on the left and two CTA buttons on the right.

The headline reads: "Not an agency. Not software. Something *better*." The word "better" is in the site's serif italic font (FK Roman Standard Oblique). The rest of the headline uses FK Roman Standard Regular. The headline is the site's muted warm gray tone.

The two CTA buttons sit together in a rounded pill group:
- "Learn more" on the left: a lightly tinted pill with the site's copy text in the site's muted tone.
- "Get started" on the right: a darker pill in the site's dark-gray text color, with the site's cream label and a right-arrow icon.

Below the header, three cards are arranged in a horizontal row with a small gap between them. Each card is the same width and taller than wide. The three cards together span the full content width of the section.

#### Card structure

Each card has two distinct halves:

**Top half — video panel.** A looping video fills the top half of the card. The top-left and top-right corners are rounded. The bottom of the video bleeds slightly behind the colored panel beneath it.

**Bottom half — colored panel.** A shaped colored panel occupies the lower portion of the card and overlaps slightly with the video above. The top-left corner of the colored panel has a small diagonal notch — the corner is cut off at a shallow angle rather than meeting at a 90-degree point. All other corners of the colored panel are square. See Figma for the exact notch size.

Inside the colored panel, the card headline appears in the site's large display font (FK Screamer, uppercase), positioned in the vertical middle of the card. Below that, the body copy appears in the site's regular body font (FK Grotesk Neue), left-aligned.

Each card has its own color identity. See Figma for exact background colors and text colors per card:
- Card 1 (Sales & Marketing): teal background, dark teal text
- Card 2 (Quality Focused): golden-yellow background, dark amber text
- Card 3 (Local Business): warm pink background, dark rose text

### Mobile

The section uses the same warm cream background. A two-line headline appears near the top of the section: "Not an Agency, Not Software." on the first line, "*Something Better.*" on the second line in italic. The headline uses FK Roman Standard (Regular first line, Oblique second line). A short horizontal rule sits below the headline.

Below the headline and rule, the carousel begins. The carousel shows one card as the primary focus, with the neighboring cards partially visible on the left and right edges of the screen. The visitor swipes horizontally to navigate between cards.

The active (center) card is taller than the partially-visible neighboring cards. The card structure mirrors the desktop: a video panel on top with rounded upper corners, a colored panel below with the diagonal notch at the top-left, a headline, and body copy. See Figma for exact card dimensions, font sizes, and spacing at mobile scale.

The inactive cards visible on the sides are the same width but shorter — they show the same card layout but with slightly different proportions. Only the active card is fully readable; the side cards act as navigation affordances.

There is no pagination indicator (dots or numbers). The horizontal peekthrough of neighboring cards makes navigation discoverable.

---

## Animation behavior

### Desktop entrance

When the section first enters the viewport during scroll, the three cards animate in. They start slightly below their final positions and at zero opacity, then rise and fade in together. The three cards are staggered slightly so they do not arrive in exact unison — left card first, then center, then right. The total entrance plays over a short duration. The header (headline and buttons) is visible before the cards enter.

This is a one-way entrance animation — it plays once when the section enters view. It does not reverse or replay if the visitor scrolls back up and returns.

### Mobile

On mobile, there is no scroll-triggered entrance animation. The section appears immediately as the visitor reaches it. The carousel responds to touch swipe gestures and mouse drag. Each card snaps cleanly into the active position when released. There is no autoplay.

### Reduced motion

When the visitor's system has reduced motion enabled:
- Desktop: cards appear in their final positions immediately, no animation.
- Mobile: no change required (carousel swiping is gesture-driven, not animated by the page).

---

## Content

Each card is fully prop-driven. The content data is:

**Card 1 — Sales & Marketing Expertise**
- Headline: "SALES & MARKETING EXPERTISE"
- Copy: "Your Growth Partner knows your trade and your market, providing strategy and oversight from someone fluent in your business."
- Background: teal (see Figma for exact value)
- Text: dark teal (see Figma for exact value)
- Video: florist / flowers scene

**Card 2 — Quality Focused**
- Headline: "QUALITY FOCUSED"
- Copy: "Every output earns your name on it, websites, ads, social, follow-ups, etc. Each built to the same standard you set for your services."
- Background: golden yellow (see Figma for exact value)
- Text: dark amber (see Figma for exact value)
- Video: tradespeople / craftwork scene

**Card 3 — Local Business Experience**
- Headline: "LOCAL BUSINESS EXPERIENCE"
- Copy: "For every vertical we serve, we've done the work to understand. You get strategy and deliverables informed by deep context."
- Background: warm pink (see Figma for exact value)
- Text: dark rose (see Figma for exact value)
- Video: local business / storefront scene

The headline text, copy, card background, and text color for each card are all passed as props — none of this is hardcoded in the component.

---

## Accessibility

- Videos autoplay, are muted, and include `playsInline`. They loop silently in the background. No captions are needed for decorative ambient footage.
- Videos are marked as decorative (`aria-hidden`).
- The carousel (mobile) is implemented with Embla and follows standard accessible carousel patterns. Arrow key navigation should advance and retreat between slides.
- CTA buttons are keyboard-focusable. Both support Enter to activate.
- Color contrast for all body copy must meet WCAG AA (4.5:1 minimum against the card background).
- All GSAP animations are gated behind `prefers-reduced-motion: no-preference`.

---

## Acceptance criteria

- [ ] The section appears between the Product Screens section and the Social Proof section
- [ ] Desktop: three cards are side by side in a single horizontal row
- [ ] Desktop: the headline and CTA buttons appear above the cards
- [ ] Desktop: each card shows a looping muted video in the top portion with rounded upper corners
- [ ] Desktop: each card shows a colored panel in the lower portion with a diagonal notch at the top-left corner
- [ ] Desktop: the diagonal notch size matches Figma exactly
- [ ] Desktop: the video bleeds slightly behind the colored panel
- [ ] Desktop: the headline inside each card uses the large display font, uppercase, in the card's text color
- [ ] Desktop: the body copy inside each card uses the regular body font in the card's text color
- [ ] Desktop: the three cards have the correct background and text colors as specified in Figma
- [ ] Desktop: the section header headline uses FK Roman Standard Regular + Oblique for "better"
- [ ] Desktop: the CTA button pair appears correctly — "Learn more" (light) and "Get started" (dark with arrow)
- [ ] Desktop: when the section enters the viewport, the cards animate in — rising from below, staggered left to right
- [ ] Desktop: the card entrance stagger is visible and natural, not simultaneous
- [ ] Desktop: with reduced motion on, cards appear in place immediately — no animation
- [ ] Mobile: the section shows a single card in focus with partial views of the neighboring cards on each side
- [ ] Mobile: the carousel swipes horizontally and snaps to the nearest card on release
- [ ] Mobile: the active card is taller than the partially-visible side cards
- [ ] Mobile: the first and last cards show partial previews of one neighboring card each
- [ ] Mobile: no CTA buttons are shown on mobile
- [ ] Mobile: the headline reads "Not an Agency, Not Software. / Something Better." with the second line in italic
- [ ] Mobile: a short horizontal rule sits below the headline
- [ ] Mobile: all three cards have the correct colors, headline, copy, and video as specified
- [ ] At 768px and above, the desktop layout is shown
- [ ] Below 768px, the mobile carousel is shown
- [ ] No text overflows at 390px viewport width
