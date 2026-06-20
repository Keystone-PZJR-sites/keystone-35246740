# Spec 048 — How It Works returns to a standalone page

**Status:** Approved — in implementation
**Type:** A reversal of the how-it-works half of spec 047. How It Works is a normal page again, at its own address, reached by normal navigation. The slide-in overlay, its link interception, and the retirement of the route are all undone. The spec-040 design of the page is restored unchanged.
**Depends on:** 040 (the how-it-works page design this restores), 047 (the modal this reverses — its reusable demo-modal button is kept).

---

## What this is

Spec 047 delivered the how-it-works content as a right-sliding overlay and retired its standalone address, intercepting every link that pointed there. That was the wrong call: How It Works is a normal page. This spec puts it back.

The page returns exactly as spec 040 designed it — the same header, six-step narrative, recap, testimonial rail, FAQ, and closing band — living at its own address inside the standard inner-page shell. Every link to it (the nav "How it Works" item, the Services-dropdown promo, the service-page secondary calls to action) navigates there like any other page. No overlay, no click interception.

The other half of spec 047 — the reusable demo-modal button for "get a free demo / get in touch" — is unaffected and stays.

---

## Scope

### In scope

- **The standalone how-it-works page is restored** at its own address, composed from the inner-page sections per spec 040, inside the standard inner-page shell.
- **Links navigate normally.** The nav link, the Services-dropdown promo, and the service-page secondary CTAs are plain links to the page; nothing intercepts them.
- **The overlay is removed** — the how-it-works modal component, its stylesheet, its provider, and the document-level link interceptor are all deleted.

### Out of scope

- **The how-it-works page content** — unchanged from spec 040.
- **The demo-modal button** (spec 047) and the lead-capture modal — unchanged.
- **The homepage "Services and pricing" buttons** — still point at the pricing page (spec 047).

---

## Acceptance criteria

- [ ] The how-it-works address resolves to the spec-040 page inside the standard inner-page shell.
- [ ] The nav "How it Works" link, the Services-dropdown promo, and the service-page secondary CTAs navigate to that page with no overlay and no interception.
- [ ] The how-it-works overlay component, stylesheet, provider, and link interceptor no longer exist and nothing references them.
- [ ] The demo-modal button still opens the lead-capture modal everywhere a demo/get-in-touch action appears.
- [ ] `npx tsc --noEmit` and `npm run lint` pass; the affected explainers are updated in the same commit.
