# Spec 016 — Mobile Hero

**Status:** Ready for implementation  
**Figma node:** [Hero — Mobile](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=1272-417&m=dev) (node `1272:417`)  
**Depends on:** Spec 014 (Mobile Blank Slate), Spec 015 (Mobile Experience Model)  
**Companion:** Spec 001 (Hero Animatic — desktop)

---

## What this section is

The mobile version of the hero. It is the first thing a visitor sees when they arrive on the home page on a phone.

Unlike the desktop hero, there is no animation and no scroll hold. Everything is immediately visible. The section is calm and direct — a looping video in the top portion, the site's identity and message below it, and two calls to action at the bottom.

This section is only shown below 768px. Above that width, the desktop hero (Spec 001) takes over.

---

## Scope

### In scope

- A full-bleed photograph in the top portion of the screen
- The nav bar overlaying the top of the photograph
- The Keystone geometric mark below the photograph
- The large bold headline below the mark
- The subheadline below the headline
- Two CTA buttons at the bottom

### Out of scope

- Any scroll animation or scroll-hold behavior
- The desktop hero — it is not changed by this spec
- Any section below this one
- Any form submission or backend behavior

---

## Visual design

Refer to the Figma node above for all exact values — colors, sizes, spacing, and type styles.

### Overall structure

The section has two zones stacked vertically. The top zone is a photograph. The bottom zone is the dark green background of the site, containing the headline and all other copy. The two zones meet at a clean horizontal edge — no overlap, no gradient, no blending.

The section is as tall as its content. It does not force itself to fill the full viewport height.

### Nav bar

The nav bar sits at the top of the screen, overlaying the photograph. It is always visible. It does not scroll away. It uses the same design as the desktop nav: a pill-shaped container with the Keystone wordmark on the left and a Login button on the right. See Figma for sizing and spacing.

The nav bar is already implemented as a shared component. This spec does not change it — it simply confirms it remains visible on mobile and appears on top of the hero photograph.

### Video

A full-bleed looping video fills the top portion of the screen from edge to edge with no side insets. It occupies roughly the top two-fifths of the section. The nav bar overlays its top edge.

This is the same autoloop sequence introduced in Spec 013 — the same six clips, cycling in the same order. No new video assets are needed.

### Keystone mark

The Keystone geometric symbol appears on the left, just below the photograph, against the dark green background. This is the same mark used in the desktop hero's end state. See Figma for exact sizing and position.

### Headline

The large bold headline sits below the Keystone mark. It reads the same as the desktop: "Always ON SALES & MARKETING." On mobile the type wraps across multiple lines and is left-aligned. See Figma for the exact size and line breaks.

The headline is always fully visible. It does not animate.

### Subheadline

A short line of smaller body text below the headline: "A team of experts running your marketing while you run your business." Left-aligned, same dark green background. See Figma for type style and spacing.

### CTA buttons

Two buttons sit side by side at the bottom of the section. See Figma for exact button styles, sizing, spacing, and the surrounding container treatment.

- **"Learn more"** — the first button. See Figma for its fill and border treatment.
- **"Get started →"** — the second button, with a right-arrow icon. See Figma for its fill and type style.

---

## Behavior

There is no behavior. The section is fully static. No element moves, fades, or responds to scrolling. The visitor simply sees the section and scrolls past it naturally.

---

## Content

All text, image paths, and button labels come from props. No content is hardcoded in the component.

The mobile hero shares all of its content props with the desktop hero. No new props are needed.

| Element | Value |
|---|---|
| Headline line 1 | Same as desktop — "Always ON " |
| Headline line 2 | Same as desktop — "SALES & MARKETING" |
| Subheadline | Same as desktop — "A team of experts running your marketing while you run your business." |
| CTA 1 label | Same as desktop — "Learn more" |
| CTA 1 href | Same as desktop |
| CTA 2 label | Same as desktop — "Get started" |
| CTA 2 href | Same as desktop |
| Video clips | Same autoloop sequence as desktop — six clips from Spec 013, no new assets |

---

## Acceptance criteria

- [ ] Below 768px, the mobile hero is shown — not the desktop hero
- [ ] At 768px and above, the desktop hero is shown — the mobile hero is not visible
- [ ] A looping video fills the top of the section edge to edge with no side gaps
- [ ] The nav bar overlays the top of the photograph and remains visible as the visitor scrolls
- [ ] The Keystone geometric mark appears below the photograph, left-aligned, against the dark green background
- [ ] The full headline is visible immediately — nothing is hidden, faded out, or waiting
- [ ] The subheadline is visible below the headline
- [ ] Both CTA buttons are visible and tappable at the bottom of the section
- [ ] Nothing moves or animates when the visitor scrolls — the section is fully static
- [ ] The section height is determined by its content — it does not force itself to fill the full screen height
- [ ] No text is clipped or overflows horizontally at 390px viewport width
- [ ] All tappable elements are large enough to tap comfortably
