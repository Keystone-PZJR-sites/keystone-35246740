# Spec 014 — Mobile Blank Slate

**Status:** Ready for implementation  
**Depends on:** None  
**Blocks:** Spec 015 (Mobile Experience Model), all mobile implementation specs (016+)

---

## What this spec is

Before mobile is implemented properly, several sections have leftover mobile handling that was added without a real mobile design. This includes: a simplified text-only version of the footer collage that shows on small screens, an override that rearranges the social proof section into a stacked grid on small screens, a hidden hero element that only appears at tablet width and above, and padding and layout adjustments applied to the pricing section on small screens.

None of this was designed. It is patchwork. This spec removes all of it.

After this spec, every section shows its full desktop layout at every screen width. Mobile will look wrong below 768px — that is intentional and expected. Proper mobile layouts are introduced section by section in specs 016+.

One additional change: on mobile, the page currently shows a loading overlay before content appears. That overlay was introduced to cover the moment while scroll animations initialise. Since no scroll animations run on mobile, the overlay should not appear at all. After this spec, the page on mobile loads with content immediately visible, no overlay.

---

## Scope

### In scope

- Removing the text-only footer headline variant that currently shows on small screens
- Removing the stacked-grid override for the social proof section on small screens
- Removing the rule that hides the hero bottom content on small screens
- Removing the layout adjustments applied to the pricing section on small screens
- Removing the loading overlay on mobile

### Out of scope

- Building any mobile layout or mobile component
- Changing anything about the desktop experience
- Blog and legal pages — they are not affected by this spec

---

## What does NOT change

The desktop experience is unchanged at every viewport width from 768px and above. Every section looks and behaves exactly as it does today.

---

## Acceptance criteria

- [ ] On mobile, the footer shows the video collage — not a text-only version
- [ ] On mobile, the social proof section shows the full canvas layout — not a simplified stacked grid
- [ ] On mobile, the hero bottom content (subheadline and CTA buttons) is visible — it is not hidden
- [ ] On mobile, the pricing section shows its full desktop layout — no stacked add-on columns or reduced padding
- [ ] On mobile, there is no loading overlay — page content is immediately visible when the page loads
- [ ] On desktop (768px and above), every section is visually identical to before this spec
