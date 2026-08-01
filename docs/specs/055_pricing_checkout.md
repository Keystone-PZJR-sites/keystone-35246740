# 055 — Pricing page checkout rewrite (two plans + Stripe Payment Links)

**Status:** Implemented
**Depends on:** 039 (original pricing page)

---

## What this is

A rewrite of `/pricing` around the two real subscription offers from the sales
playbook. Visitors pick a plan and check out via Stripe Payment Links. The
usage calculator and single $249 summary go away.

## The two plans

Shown side by side. One or the other — not a stack you buy twice.

1. **Foundation — $50/month**  
   Custom website, ongoing SEO content, Maps optimization, and the embedded
   website sales chat / marketing platform foundation. Month-to-month.

2. **Sales & Marketing — $250/month**  
   Everything in Foundation, plus ads, social, newsletters, SMS, and CRM lead
   pursuit. The full always-on system. Month-to-month.

Each card has a clear price, a short description, a feature list, and a primary
action that opens the matching Stripe Payment Link in a new tab. One card may
carry a quiet "Most popular" label (the full system).

## Checkout returns

After Stripe Checkout, buyers land on site pages we control:

- **Success** — `/pricing/success` (optional `?plan=` so we can thank them by plan)
- **Cancel** — `/pricing/cancel` (optional `?plan=`)

Those absolute URLs are configured on each Payment Link in the Stripe
Dashboard (After payment → Don't show confirmation page → redirect). The site
cannot set them from the Payment Link URL alone.

## Page structure

Cream inner page under the floating nav:

1. Centered hero (pricing eyebrow, short title, supporting line)
2. Two-plan comparison / purchase cards
3. Short "why it's easy" reassurances
4. Trusted-by-owners proof rail (shared)
5. FAQ aligned to the playbook ($50 vs $250, cancel, keep website, timelines)
6. Closing green CTA band (demo / get in touch still available)

## Homepage pricing section

The homepage single-price block is updated so it no longer claims $249. It
leads with Foundation at $50 and points visitors to `/pricing` for the full
choice — no separate homepage checkout.

## Acceptance criteria

- [x] `/pricing` shows exactly two purchasable plans at $50 and $250.
- [x] Each plan CTA opens its Stripe Payment Link.
- [x] `/pricing/success` and `/pricing/cancel` exist for Stripe return URLs.
- [x] FAQ and copy match the Foundation vs full-system story.
- [x] Homepage pricing no longer advertises $249 as the only price.
- [x] `/billing` (and `/manage-subscription`) redirect to the Stripe Customer Portal login; pricing page links to it.
