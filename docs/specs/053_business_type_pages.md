# 053 — Business-type pages, enriched

**Status:** Implemented
**Depends on:** 050 (industry pages + Resources nav), 052 (the long-form case-study treatment whose depth this borrows)
**Reference:** Square's "by business type" vertical pages and the long, layered service/industry pages on well-run SaaS sites — a single scrollable page that contextualizes the product for one kind of business through many varied sections, not a short brochure. Value-free; the implementer reads exact spacing, proportion, and type steps against our tokens. Reference-driven (no Figma node), so the Figma-MCP gate does not apply.

Spec 050 shipped three industry landing pages on a fixed, fairly short template (hero → benefits → capabilities → results → case studies → resources → FAQ → CTA). This spec does three things, leaving the 050 route, registry, and surroundings intact:

1. **Renames the menu category and the framing** from "By industry" to **"By business type"** (Square's language).
2. **Adds a fourth business type — "New businesses"** — for owners just opening or recently launched.
3. **Deepens the page** with several new sections so each page reads as a richer, more contextual story: who it's for, the old way vs. the Keystone way, how it works step by step, and what's included.

The page still opens with the split hero, still closes with the deep-green full-bleed call-to-action band, and still carries the proof rail, resources, and FAQ from 050. All four business types share the same enriched structure.

---

## Navigation

The Solutions mega-menu's last category heading reads **"By business type"** (was "By industry") and lists four leaves, in order: Health & Wellness, Home Services, New Businesses, Small Business. It stays the last category so the menu's column layout is unchanged.

---

## New business type — New businesses

A fourth page at `/industries/new-businesses`, for owners who are opening soon or have launched recently. Its angle: look established from day one, get found, and land the first wave of customers without hiring an agency or assembling a pile of tools. Same structure and tone as the other three; copy speaks to starting from zero rather than scaling an established book of business.

---

## Page structure (after)

Top to bottom, every business-type page renders:

1. **Hero** — unchanged from 050: eyebrow, headline, supporting line, primary/secondary actions, and a single media card.
2. **Who it's for** *(new)* — a short titled block naming the specific kinds of business inside this type as a wrapped row of quiet rounded tags (e.g. studios, spas, clinics, trainers). Pure contextualization so a visitor sees themselves immediately.
3. **Benefits** — the 050 four-up benefit grid.
4. **The old way vs. the Keystone way** *(new)* — a two-card contrast in the same shape as the case-study before/after: a quiet "old way" card listing the status-quo pain as plain points, beside a brand-green light-text "with Keystone" card listing the same concerns resolved as checked points. Equal width at desktop, stacking with the Keystone card first at mobile.
5. **Capabilities** — the 050 media + capability list.
6. **How it works** *(new)* — a numbered step narrative (three or four steps), each a number on a connecting rail, a short heading and sentence, and a framed supporting visual. Describes the journey from signup to a full calendar.
7. **Results** — the 050 dark results stat band.
8. **Proof** — the 050 case-study / testimonial rail.
9. **What's included** *(new)* — a titled grid of small cards naming everything one plan covers, so the breadth is concrete before the FAQ.
10. **Resources** — the 050 resource card grid.
11. **FAQ** — the 050 accordion, expanded to five or six questions per type.
12. **Closing** — the 050 deep-green full-bleed call-to-action band.

The four new sections (who it's for, old-vs-Keystone, how it works, what's included) are content-driven and optional in the model, but all four launch business types supply them, so the pages stay structurally identical.

---

## New design values

None. The "old way / with Keystone" cards reuse the existing quiet-secondary and brand-green-solid card surfaces and the existing check/dot point treatment. The tags reuse the existing rounded-label (pill) style. The step narrative reuses the existing numbered-rail treatment. Every color, radius, and type step is an existing token.

---

## Responsive

- Single mobile↔desktop hand-off at 985px, like the rest of the site.
- The tag row wraps; the two-card contrast and the what's-included grid collapse to one column below 985px (contrast stacks Keystone-first); the step narrative stacks number, copy, then media.
- No new intermediate breakpoint is introduced for any single section.

## Edge cases

- A business type that omits any new section simply doesn't render it — nothing appears empty.
- The contrast block balances with as few as three points per side.
- No scroll-triggered animation; hover and focus shifts only, so `prefers-reduced-motion` needs no special handling.

## Acceptance criteria

- [x] The Solutions menu category reads "By business type" and lists Health & Wellness, Home Services, New Businesses, and Small Business; it remains the last category and the menu layout is unchanged.
- [x] `/industries/new-businesses` renders the full enriched template with a per-page title/meta description; an unknown slug still 404s.
- [x] All four business-type pages render, in order: hero, who it's for, benefits, old-vs-Keystone, capabilities, how it works, results, proof, what's included, resources, FAQ, and the green band.
- [x] The new sections are content-driven — no copy is hardcoded in a component.
- [x] Every multi-column section collapses cleanly to one column below 985px; no section introduces a new breakpoint.
- [x] `npx tsc --noEmit` and `npm run lint` pass with zero errors or warnings.
