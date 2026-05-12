# Spec 028 — Lead Capture Modal Does Not Auto-Focus the First Field

**Status:** Ready for implementation
**Realigns:** Spec 008 (Lead Capture Modal — replaced the "focus moves to the first name field on open" behavior described in its Accessibility section and acceptance criteria)
**Depends on:** Spec 008 (Lead Capture Modal)

---

## What this spec changes

Spec 008 specified that when the lead capture modal opens, keyboard focus immediately lands inside the First Name input. That is no longer the case.

When the modal opens, no form field is in its focused state. Every input — First Name, Last Name, Phone, Email, Message — sits in its resting appearance. The visitor sees the form as a whole, reads the subheadline, and chooses where to start. Clicking or tabbing into a field activates it as usual; the floating-label animation and focus styling are unchanged from Spec 008.

The modal itself still receives keyboard focus on open — pressing Escape still closes it from a fresh page-load, and pressing Tab still walks through the form in order. The difference is that the focus lands on the modal as a whole, not on any one field.

---

## Why

Two reasons, both about respecting visitor intent.

**Password manager extensions interpret an auto-focused input as a request to autofill.** 1Password and similar tools watch for focused form fields and surface their dropdown the moment one becomes active. When the visitor clicks a CTA expecting to read a contact form, having an autofill prompt appear over the First Name field before they have done anything reads as the site (or their browser) overstepping. Removing the auto-focus removes the trigger.

**The visitor has just clicked a CTA, not a "fill out form" link.** The expected next moment is *seeing* the form, not *being inside* it. Auto-focusing the first field skips that moment and assumes the visitor is ready to type. Letting them choose where to start matches the rest of the site, where no field is ever activated until the visitor decides to activate it.

---

## What does not change

- The opening and closing fade transitions (Spec 008).
- The Escape-key dismissal (Spec 008).
- The backdrop-click dismissal (Spec 008).
- Focus returning to the triggering CTA when the modal closes (Spec 008).
- The floating-label animation and focused-field visual treatment when a visitor activates a field (Spec 008).
- Every other Spec 008 acceptance criterion that does not mention auto-focus.

---

## Acceptance criteria

- [ ] When any homepage CTA opens the modal, no form field appears in its focused / floating-label state. Every field shows its resting placeholder.
- [ ] After the modal opens, pressing Escape (without first clicking anything) closes the modal — confirming that keyboard focus did move into the modal, just not onto an input.
- [ ] After the modal opens, pressing Tab moves focus to the First Name input. Pressing Tab again moves through Last Name, Phone, Email, Message, and the Submit button in order.
- [ ] Clicking into any field activates it exactly as Spec 008 describes — placeholder shrinks and rises, background lightens, border appears, cursor sits below the floating label.
- [ ] With a password manager extension active (1Password tested), opening the modal does not trigger an autofill dropdown over any field. The dropdown appears only after the visitor clicks into a field that the extension recognises.
- [ ] When the modal closes, focus returns to the CTA that opened it, with no page scroll (carried forward from Spec 008).
- [ ] With reduced motion enabled, the modal still appears instantly and no field is focused on appearance.
- [ ] Screen reader announces the dialog on open ("Get in touch with Keystone, dialog") rather than announcing the First Name field directly.

---

## Notes

`docs/rules/rules.md` § Focus management is updated in the same commit to describe the new default (focus moves to the dialog container, not the first input) and the password-manager rationale. Future modals follow that rule by default.
