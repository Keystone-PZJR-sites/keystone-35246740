# Spec 046 — Testimonials become statement + KPI cards

**Status:** Approved — in implementation
**Type:** A content + model change to the existing testimonial rail (spec 037). The customer case-study quotes become declarative statements backed by KPIs, attribution is dropped, the video "play" affordance is removed, and each statement is paired with its supporting photo inside one split card (copy + KPIs beside the photo) instead of alternating photo cards and text cards.
**Reference:** Owner.com-style marketing pages favor declarative benefit claims with hard numbers over attributed "customer X said Y" testimonials, presented as a single card with the copy on one side and a photo filling the other.
**Depends on:** 037 (service page template + `TestimonialCarousel`).
**Names:** `TestimonialCard` (the discriminated portrait/quote union collapses into one card type). All open to a rename.

---

## What this is

Across the site, the `TestimonialCarousel` rail read as a case study: a portrait photo with a play button, plus a separate quote card with a customer name, role, "Learn more" link, and a results row. The ask is to drop the case-study framing — turn each quote into a declarative statement, keep the numbers as KPIs, remove the play buttons, and fold the photo into the same card as the copy. The homepage social proof (the `SocialProofSection` video rail) is intentionally untouched.

---

## Scope

### In scope

- **`TestimonialCarousel` model.** The separate portrait and quote cards collapse into one `TestimonialCard`: `{ id, statement, image, alt, results?, action? }`. There is no more `kind`, no play affordance, and no attribution. Each card is a split: copy + KPI row on one side, the photo filling the other (stacked below md, side-by-side at md+). The KPI `results` row is unchanged.
- **One shared rail for the whole site.** The per-page testimonial sets are replaced by a single reusable `SHARED_TESTIMONIALS_SECTION` (in `data/shared-sections.ts`) — six split cards whose claims speak to Keystone's *overall* results (all-in-one platform, faster lead response, fewer tools, higher return rate, etc.) rather than one service. **All 17 service pages**, the **pricing** page, and the **how-it-works** page now set `testimonials: SHARED_TESTIMONIALS_SECTION`, so the rail is edited in one place. Play labels, attribution, and per-card "Learn more" actions are all gone.
- **Catalog** (`panels.tsx`) testimonial preview updated to the new model.

### Out of scope

- **Homepage social proof** (`SocialProofSection` / `MobileSocialProof`) and the `/portal` page that reuses it — excluded per the request ("except the home page").
- **Careers culture wall** and **leadership investor wall** (`QuoteWall`, specs 041/042) — those are credibility/culture quotations, not case studies, and KPIs don't fit them; left as-is.
- **Section titles** (e.g. "Trusted by owners") — the KPIs carry the proof, so the titles still hold.

---

## Notes

- `TestimonialCard.action` is kept optional on the type for flexibility, but no surface uses it after this change.
- The orphaned `.ks-trail__attribution` / `.ks-trail__name` rules are removed from `testimonial-carousel.css`.
- **Full-bleed rail.** The carousel viewport is no longer constrained to the centered 1280px column — it spans the full section width and clips only at the screen edges, so cards overflow on both sides as the rail scrolls instead of being cut off mid-card inside the column. A `--ks-trail-gutter` (the header's side inset) is applied as the container's leading padding and the last slide's trailing margin so the first and last cards still line up with the header.
