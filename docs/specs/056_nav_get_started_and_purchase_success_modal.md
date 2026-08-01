# 056 — Nav “Get Started” CTA and post-purchase welcome modal

**Status:** Implemented
**Depends on:** 034 (full site navigation), 055 (pricing checkout returns)

---

## What this is

Two small follow-ups after the pricing checkout work:

1. The primary site-nav call to action becomes **Get Started** and takes visitors
   to the pricing page. The Login control leaves the nav.
2. After a successful Stripe purchase, when someone returns to the success page,
   a welcome modal explains next steps and how to get help. It stays until they
   close it on purpose.

## Site navigation

On desktop and mobile:

- The primary CTA label reads **Get Started** (not “Get a Demo” / “Get a free demo”).
- That control goes to the pricing page.
- Login is not shown in the bar or the mobile menu panel.
- Mobile keeps the compact top CTA and the panel CTA; both use the same Get
  Started label and destination.

## Post-purchase welcome modal

On the checkout success return page (any plan):

- A modal appears as soon as the page loads.
- It tells the visitor that Keystone will reach out to the email they used to
  sign up to activate their account and start onboarding within the next
  **1 business day**.
- It asks them to email **growthpartners@keystone.app** with questions.
- The only way to dismiss it is the close (X) control. It must not close on
  backdrop click, Escape, a timer, or any other automatic path.
- Behind the modal, the success page still shows its thank-you content so the
  visit remains useful after close.

## Responsive behaviour

- Nav: same label and destination at mobile and desktop; Login absent at both.
- Modal: readable card centered on the viewport at mobile and desktop; close
  control remains easy to hit.

## Edge cases

- **Mobile:** Get Started fits the compact top control without wrapping oddly.
- **`prefers-reduced-motion`:** no decorative motion required; open/close may be
  instant.
- **Return without a plan query:** modal still appears with the same message.

## Acceptance criteria

- [x] Desktop and mobile nav show **Get Started** and send visitors to pricing.
- [x] Login is gone from desktop and mobile nav.
- [x] After a successful purchase return, the welcome modal appears with the
      activation / 1-business-day copy and the growthpartners email.
- [x] The modal closes only when the visitor clicks the close (X) control.
