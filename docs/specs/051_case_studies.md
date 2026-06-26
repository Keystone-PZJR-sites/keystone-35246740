# 051 — Case Studies

**Status:** In progress
**Depends on:** 037 (service page template), 046 (statements), 050 (resources nav)
**Reference:** attached screenshots — a case-study gallery and a single case-study detail page from a well-designed reference site. Value-free; the implementer reads exact spacing and proportion against our tokens, never from this spec. This is a reference-driven design (no Figma node), so the Figma-MCP gate does not apply.

A new Resources destination: a gallery of customer success stories, and a detail page for each story. Both live on the shared cream page surface under the floating site nav, and both close with the full-bleed green call-to-action band the service pages use.

---

## Navigation

Case Studies joins the **Resources** dropdown as its first item, above Blog.

---

## Gallery page

A centered, light header opens the page: a short eyebrow, a large display headline, and a one-line supporting sentence, all centered on the cream surface, the same family as the blog gallery header.

Below the header is a single vertical column of wide story cards, one per customer, stacked with generous breathing room between them. Each card is one row at desktop:

- A rounded photo of the business or owner fills the left portion of the card.
- The right portion carries, top to bottom: a short quote-style summary of the result in large body type, a thin row of two or three headline statistics (an oversized value over a small label each), and an attribution line naming the person and their business.
- The whole card is a link to that story's detail page. On hover it lifts the way other cards on the site lift.

At mobile the card stacks to one column — photo on top, the summary, stats, and attribution beneath.

The page closes with the deep-green full-bleed call-to-action band.

---

## Detail page

One scrolling story, top to bottom:

### Hero
Centered on the cream surface: a small eyebrow, a large display headline naming the customer and their headline result, and a supporting sentence. Beneath the copy sits a row of three headline statistics (oversized value over small label). Below the stats, a single wide media card holds a photo of the owner, the same media-card treatment used elsewhere on the site. (When a story has a video, the same card can carry a play affordance; the placeholder ships a photo, so no play control is rendered.)

### How their experience changed
A titled section holding two cards side by side that read as a before / after contrast:

- The **before** card sits on a quiet cream surface. A short label, a row of statistics, and a few plain bullet points describing the old state.
- The **after** card sits on the brand green and carries light text. The same shape — a label, a row of statistics, and a few bullet points — but describing the result with Keystone.

The two cards are equal width at desktop and stack at mobile, after first.

### Narrative
A two-column body: a column of short question-and-answer blocks (a small heading over a paragraph, repeated) beside a single supporting photo. The photo sits opposite the prose and holds its side as the prose scrolls past at desktop. Stacks at mobile, prose first.

### Pull quote
A wide block pairing a large pull quote and its attribution with a row of result statistics, beside a supporting photo that fills one side. Reads as the emotional peak of the page.

### Other success stories
A titled section showing two more story cards drawn from the other published case studies, in a two-up row at desktop, each linking to its detail page. Stacks to one column at mobile. Reuses the gallery's story card.

### Closing
The deep-green full-bleed call-to-action band.

---

## New design values

None. The before/after green card reuses the existing flat brand-green card fill; every other color, radius, and type step is an existing token.

---

## Responsive

- Single mobile↔desktop hand-off at 985px, like the rest of the site.
- Every multi-column block (gallery card, before/after pair, narrative, pull quote, other-stories row) collapses to one column below 985px in the reading order noted per section.
- The narrative photo only holds its side at desktop; at mobile it sits inline.

## Edge cases

- A story with only two hero statistics still balances; the row centers.
- The gallery with a single published story shows that one card and no "other success stories" row appears on its detail page.
- No scroll-triggered animation; hover and focus shifts only, so `prefers-reduced-motion` needs no special handling.

## Acceptance criteria

- [ ] Case Studies appears first under the Resources nav dropdown, above Blog.
- [ ] `/case-studies/` shows the centered header and a vertical column of story cards, each linking to its detail page, closing with the green band.
- [ ] `/case-studies/<slug>/` shows hero (headline + stat row + media), before/after contrast, narrative, pull quote, other-stories row, and the green band, in that order.
- [ ] Both pages render the floating nav and footer (mounted through InnerPageShell).
- [ ] Every block collapses cleanly to one column below 985px in the reading order described.
- [ ] All copy is supplied from data outside the components; no string is hardcoded in a component.
