# Spec 037 — Service Page Template

**Status:** Implemented
**Type:** A reusable page template (a `patterns/` composition) plus the new reusable sections it needs. Drives every individual service's detail page (`/services/<slug>`).
**Reference:** Four screenshots attached in chat — a full marketing landing page for a restaurant-website product (hero with a framed testimonial-video card, a "your website could be doing more" media-and-feature-list split, a bento grid of feature tiles, an FAQ, a "trusted by owners" testimonial rail, and a full-bleed green closing call-to-action above the footer). No Figma; built per the "Reference-Driven Components" workflow in the rules.
**Proposed names:** `ServicePageTemplate` (the pattern), with three new sections — `SplitHero`, `MediaFeatureList`, `TestimonialCarousel` — plus additive options on the existing `CtaBand` and `FaqAccordion`. All open to a rename.

---

## What this is

One template that lays out a service's detail page as a complete, persuasive landing page, in the order the reference uses:

1. **A split hero** — a headline, supporting line, and two actions on one side; a single framed media card (a testimonial photo with an overlaid quote and a play affordance) on the other.
2. **A media + feature-list section** — a centered section heading, then a framed product visual beside a short vertical list of points, each point a small round icon with a bold title and a line of supporting copy.
3. **A feature bento** — a centered section heading, then a small grid of feature tiles in mixed sizes (one wide hero tile above a pair), each tile naming one benefit with a supporting visual.
4. **A short FAQ** — a centered label and a handful of expandable question rows.
5. **A testimonial rail** — a left-aligned section title with previous / next controls on the right, then a horizontally scrollable row of cards: some are a portrait photo (optionally with a play affordance), some are a quote with attribution, a small action, and a row of headline results.
6. **A closing call-to-action band** — a full-bleed brand-green band with one centered headline and a single light action, sitting directly above the site footer.

The whole page is content-agnostic: every string, image, icon, stat, and link is supplied per service. The template only arranges; it hardcodes nothing.

The page chrome (site nav, footer, lead-capture modal) comes from the standard inner-page shell, exactly like every other inner page. The template supplies only the body between the nav and the footer.

---

## Scope

### In scope

- A new `ServicePageTemplate` pattern that composes the six blocks above from a single typed content object.
- Three new reusable sections used by the template and available to any page: `SplitHero`, `MediaFeatureList`, `TestimonialCarousel`.
- Reuse of existing pieces: the bento is the existing card + card-grid (spec 036); the section headings are the existing content-section heading block; the FAQ is the existing accordion; the closing band is the existing CTA band.
- Two additive, backward-compatible options on existing components: a brand-green, full-bleed treatment on the CTA band, and a plain (non-API) item list on the FAQ accordion.
- One new shared gradient token for the green band.
- The first real service page, with its values supplied centrally in a data module and rendered through the template.

### Out of scope

- Any change to the services **index** page (the list of all services) — this spec is the per-service detail page only.
- Fetching service content from the public API — the first page's values are authored centrally (a later spec can map API data onto the same template).
- The specific imagery, copy, icons, stats, and links — those are content, supplied per service.
- Autoplaying or lightboxing the testimonial / hero videos — the play affordance is present but wiring a player is a later concern.

---

## Visual design

Exact colors, sizes, and spacing are chosen at implementation against our tokens. The screenshots are the visual anchor, but the result must read as Keystone — our cream and ink surfaces, our brand orange, ink-green, and mint, our display and body type, our eyebrow treatment — not as the reference site.

The mobile↔desktop hand-off is the app-wide **985px** boundary (the "Responsive-Native" rule), not a component-specific cutoff. Tablets and iPad portrait fall below it.

### Split hero

A two-column band at the top of the page, below the nav. One column holds an optional eyebrow, a large display headline (two to four lines), a short supporting paragraph in muted body copy, and a row of two actions — a solid primary and a quieter secondary. The other column holds a single media card: a photo filling a tall rounded card, a soft bottom darken so text holds, a short bold quote and a quieter attribution line anchored low, and a circular play affordance in a corner. The media card is wrapped in a thin **brand-colored frame** — a band of brand color showing as a inset border around the rounded card, echoing the reference's colored outline. The frame color is a prop (defaulting to a brand tone).

Below 985px the two columns stack — copy first, then the media card — the headline steps down, and the actions may go full-width.

### Media + feature list

A centered heading block (eyebrow optional, a two-line section title) sits above a two-column body. One column is a product visual framed in a soft, tinted rounded panel (a shade off the page background), generously padded so the visual floats inside it. The other column is a vertical list of three or so points; each point is a row with a small round bordered icon badge on the left and, beside it, a bold title (one to two lines, body face) above a short muted supporting line. Comfortable vertical spacing separates the points. Which side the visual sits on is a prop.

Below 985px the columns stack — visual first by default — and the feature rows keep the icon-beside-text layout.

### Feature bento

The existing card + card-grid (spec 036), composed as a bento: one wide tile spanning the full width on top (a gradient-filled tile carrying an eyebrow, a title, and a supporting visual to one side), and a pair of equal tiles beneath (one a flat surface tone, one a gradient or media tile), each with an eyebrow, a title, and a framed mini visual. No new card work — this is purely a composition of spec 036. Below 985px it collapses to one column per that spec.

### FAQ

The existing accordion, under a centered short label / heading, constrained to a comfortable reading width. Rows expand and collapse on click with the existing plus/minus affordance. The only change is that the accordion can now be fed a plain list of question/answer pairs (the template's authored content) in addition to the API-typed list it already accepts.

### Testimonial rail

A section whose header is a left-aligned title (the brand's two-weight treatment is fine) with a pair of circular previous / next buttons aligned to the right on the same line. Beneath it, a single row of cards that scrolls horizontally, with the next card peeking at the right edge to signal more. Two card shapes appear in the same row:

- **A portrait card** — a photo filling a rounded card, optionally with a circular play affordance.
- **A quote card** — a soft surface card holding a bold quote, an attribution line, a small action, and, anchored at the bottom, a row of one or two headline results (an oversized value with a small label beneath).

The visitor scrolls the row by dragging / swiping, or with the previous / next buttons. The buttons disable (or wrap) sensibly at the ends. Below 985px it is the same horizontally scrollable rail (one-plus cards in view with a peek), driven by swipe and the same buttons; the buttons meet the minimum tappable size.

### Closing CTA band

The existing closing CTA, in a new full-bleed brand-green treatment: the band spans edge to edge (no rounded inset panel, no page gutter), filled with a brand-green so deep that a large white headline and a light action read at AA over it, and carries a single centered headline and one light action. It sits flush above the footer.

---

## Animation behavior

- **Hero & testimonial play affordances** are present as controls but do not yet launch a player; they show a clear hover and focus state.
- **Testimonial rail** scrolls smoothly when a previous / next button is used and follows the finger on drag / swipe, using the same carousel behavior as the site's other rails.
- **FAQ** rows expand / collapse with the existing accordion motion.
- **Reduced motion:** the rail still scrolls but snaps without a smooth animation; no element auto-advances anywhere on the page; hover lifts and nudges are suppressed.

---

## Content

Everything is supplied per service through one typed content object the page passes to the template:

- **Hero** — eyebrow (optional), headline, supporting line, primary and secondary actions (label + link each), and the media card (image + alt, quote, attribution, play label, and the frame color).
- **Feature-list section** — heading block (eyebrow optional, title), the product visual (image + alt), the side it sits on, and the list of points (each an icon, a title, and a supporting line).
- **Bento** — heading block, and the tiles (each a background choice, eyebrow, title, supporting copy, and an optional mini visual), with their grid spans.
- **FAQ** — heading / label and the list of question + answer pairs.
- **Testimonials** — section title and the ordered list of cards (portrait or quote; each carrying its own image / quote / attribution / action / results as appropriate).
- **Closing band** — headline and the single action.

Meaningful images carry their own alt text from the content; purely decorative backgrounds are marked decorative. Nothing (copy, imagery, icons, stats, colors, links) is hardcoded in the template or the sections.

---

## New tokens & variants

- **A green call-to-action band fill.** The closing band needs a brand-green deep enough to carry a white headline and a light button at AA — the system's existing greens are either too light (the mint accent) for white text at that scale or read as near-black (the ink surface). Add one shared green band gradient token and use it for the CTA band's accent treatment, so any future green band references the same value.
- **CTA band options.** Two additive props on the existing CTA band: a tone selecting the green band treatment, and a full-bleed flag that drops the rounded inset panel and gutter so the band spans edge to edge. The existing dark, inset default is unchanged.
- **FAQ accordion plain items.** One additive option on the existing accordion: accept a plain list of question/answer pairs alongside the API-typed list it already takes. Existing callers are unchanged.

No new color tokens beyond the band gradient. The hero frame uses existing brand / accent roles via a prop. The feature-list icon badges, the soft visual panel, the testimonial surfaces, the rail buttons, and the results all use existing surface, border, text, and brand roles. The headlines, eyebrows, titles, and copy all use the existing Heading, Eyebrow, and Text primitives. The bento and its tiles reuse spec 036 unchanged. The testimonial rail reuses the shared carousel hook the site's other rails use. The hero and bento media cards reuse the spec-036 spotlight card; the feature-list and bento mini-visuals are built from the existing Card primitive.

---

## Accessibility

- The hero and testimonial play affordances are real buttons with clear labels and a visible focus state.
- The testimonial rail is an accessible carousel: previous / next are real labeled buttons, the cards are reachable, and it follows the same accessible-carousel pattern as the site's other rails.
- The feature-list icon badges are decorative (hidden from assistive tech); the meaning is in the adjacent title and copy.
- The FAQ uses native expandable rows operable by keyboard.
- Section headings use a correct, single-H1-per-page outline: the hero headline is the page H1; section titles are H2s; tile and feature titles are lower.
- Text over the hero media scrim and over the green band meets AA contrast at the chosen sizes.
- Decorative backgrounds and frames are hidden from assistive tech; meaningful imagery carries page-supplied alt text.
- Every interactive element (actions, rail buttons, play buttons, FAQ rows, whole-card links) shows a visible focus state.

---

## Acceptance criteria

- [x] A service detail page renders, in order: split hero, media + feature list, feature bento, FAQ, testimonial rail, full-bleed green CTA band — between the standard nav and footer.
- [x] The whole page is driven by one typed content object; no copy, image, icon, stat, or link is hardcoded in the template or sections.
- [x] The hero shows a headline, supporting line, and two actions on one side and a framed media card (photo, overlaid quote + attribution, play button) on the other; the frame color is content-driven.
- [x] The media + feature-list section shows a centered heading, a product visual in a soft tinted panel, and a vertical list of icon-badge + title + copy rows; the visual's side is content-driven.
- [x] The bento is composed entirely from the spec-036 card + card grid (one wide tile over a pair), no new card component.
- [x] The FAQ renders the template's authored question/answer pairs through the existing accordion, expandable by keyboard.
- [x] The testimonial rail shows a left title with previous / next buttons on the right, scrolls horizontally with a peek, and renders both portrait cards (optional play) and quote cards (quote + attribution + action + a results row).
- [x] The closing CTA band is a full-bleed brand-green band with a single white headline and a light action, flush above the footer; white text passes AA over the green.
- [x] The CTA band's existing dark inset treatment and the FAQ accordion's existing API-typed usage are both unchanged where already in use.
- [x] At ≥985px the hero and feature-list are two columns and the bento honors its spans; below 985px the hero and feature-list stack, the bento collapses to one column, and the rail stays a swipeable peek.
- [x] No horizontal overflow at 390px; headlines, tiles, and cards step down so nothing is clipped or cramped.
- [x] Under reduced motion nothing auto-advances, the rail snaps without smooth scrolling, and hover lifts / nudges are suppressed.
- [x] The new sections (`SplitHero`, `MediaFeatureList`, `TestimonialCarousel`) and the new green CTA band treatment appear in the `/styles` catalog, and the new band gradient appears in the gradients foundation panel.
