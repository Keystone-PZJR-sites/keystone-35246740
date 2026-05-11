# Spec 025 — Homepage Pinning Toggle

**Status:** Ready for implementation
**Depends on:** Spec 011 (Page Animation Model: Scroll States), Spec 015 (Mobile Experience Model)

---

## What this spec is

A site-wide setting that turns the homepage's pin / snap / hold scroll behaviour on or off in one place. When the setting is on, the homepage is the directed, "powerpoint slide" experience described in Spec 011 — every section pins, holds the visitor while its entrance animation plays, and snaps to the next section. When the setting is off, the homepage is a normal scrolling page — the visitor scrolls freely from top to bottom and nothing holds them in place.

This spec does not change either experience. It only introduces the switch between them and sets the default.

---

## The default

The setting is **off** by default. A visitor arriving at the homepage today scrolls through it freely.

The Spec 011 model is preserved as the design intent — turning the setting on must reproduce that experience exactly, with no other changes required. The default may flip back to on later; nothing in this spec forecloses that.

---

## What the visitor experiences when the setting is off

The visitor scrolls the homepage like any normal long page. No section holds the viewport. There is no snap, no hold, and no "you cannot move forward yet" feeling. The visitor's scroll input always moves the page.

Sections that have a staged entrance animation — text revealing line by line, elements fading in, pills popping into place — still play their animation. The animation begins the moment the section first enters the visitor's viewport, and plays through at its own pace just as it would when pinned. The visitor keeps scrolling while the animation plays; the section does not wait.

The first section on the page (the hero) is a special case. It is already in the viewport when the page loads. Its entrance animation does not play on page load — it waits until the visitor has scrolled forward a small amount, the same trigger threshold used when the setting is on. This prevents the headline animation from starting before the visitor has done anything.

Scrolling back up is, as always, free.

The footer behaves identically in both modes — it has never been part of the animation model.

---

## What the visitor experiences when the setting is on

Spec 011 in full. No changes from what is documented there.

---

## Mobile

The setting affects every section that participates in the homepage scroll-state machine on every breakpoint where it participates — desktop and the mobile sections that pin per Spec 015. Mobile sections that have always scrolled freely (e.g. the Mobile Work Showcase and the Mobile Footer) are unaffected because they were never pinned.

The setting is one switch for the whole homepage, not one per breakpoint.

---

## Reduced motion

Unchanged. A visitor with reduced-motion turned on continues to see what Spec 011 describes for that case: every section displays in its final revealed state, no transitions play, no section holds the viewport. Reduced motion takes precedence over this setting in both directions — it always disables animation regardless of whether pinning is on or off.

---

## Technical recommendations

These are not requirements — they are suggestions for the implementer.

**One switch in one place.** A single boolean constant in the module that already mediates every pinning call (`lib/sectionPin.ts`). No environment variable. No per-section override. No setting in a separate config file that the rest of the codebase would have to learn about. Flipping the constant must affect every desktop and every mobile pinned section in lockstep.

**Entrance animations still fire when the switch is off.** Several sections start with elements at full transparency and rely on the entrance animation to reveal them. Skipping the entrance entirely would leave hero CTAs, channel pills, and product-screen content invisible. The implementation must keep firing each section's entrance once on viewport entry even when no pin is created — this is the only way "no pinning" results in a usable page.

**No new prop on the section components.** Sections already pass an `onEnter` callback to `createSectionPin`. The toggle lives below that callsite, not above it. A section's component file should not need to know whether pinning is on or off.

**Document the toggle in the animations explainer.** A developer or designer iterating on the homepage should be able to find the switch from a single search of the docs.

---

## Acceptance criteria

- [ ] A single boolean constant in `lib/sectionPin.ts` controls the entire homepage scroll-state machine
- [ ] The constant defaults to off
- [ ] With the constant off: no homepage section pins, snaps, or holds the visitor on any breakpoint
- [ ] With the constant off: every section's entrance animation still plays once when the section first enters the viewport
- [ ] With the constant off: the hero entrance animation does not play on page load — it waits for the visitor to scroll forward
- [ ] With the constant off: the visitor can scroll forward and backward freely through the entire page from hero to footer
- [ ] With the constant off: sections that previously stayed visible without an entrance animation continue to look the same
- [ ] With the constant on: the homepage behaves exactly as described in Spec 011
- [ ] Reduced motion behaviour is unchanged in both modes
- [ ] Mobile sections that were never pinned (Mobile Work Showcase, Mobile Footer) are unaffected
- [ ] The toggle is documented in `docs/explainers/animations.md`
- [ ] TypeScript and ESLint pass with zero errors or warnings
