# Spec 011 — Page Animation Model: Scroll States

**Status:** Draft

---

## Overview

The home page is a directed experience. Every section is part of a single continuous journey from top to bottom. The visitor moves through the page by scrolling, and the page responds by guiding them through each section in sequence — holding them while something plays out, then releasing them to continue.

Every section on the page fills the full browser window — its height is always exactly the viewport height, whatever that is on the visitor's device. There are no sections taller than the screen. The visitor never scrolls within a section; they scroll between sections.

Every section is described using the same model: a small number of named visual **states**, and **transitions** between those states triggered by scroll. When a section is active, the visitor is held in place while transitions play. When all transitions are complete, the visitor is released and the next section becomes active.

---

## Every section is viewport height

This is a foundational constraint of the page. No section may be taller than the browser window. Every section fills exactly 100% of the viewport height — no more, no less.

Four sections were not originally designed to this constraint: Work Showcase, Social Proof, Pricing, and Footer. Their redesigns are described later in this spec. Those descriptions supersede the original section specs wherever they conflict. All other content, behavior, and visual details not mentioned here remain as defined in the original specs.

---

## The animator

The **animator** is the page's single coordinator of scroll-driven animation. It knows:

- Which section is currently active
- What state that section is in
- What state the sections above and below it are in

When the visitor scrolls, the animator decides what happens next: which transition to trigger, in which direction, and in which section. Sections do not manage their own scroll tracking independently — they describe their states and transitions, and the animator drives them.

This matters most at section boundaries where animations are visually continuous across sections. The scattered channel pills from Every Channel, for example, need to travel directly into the Product Screens nav row when the visitor scrolls forward. The animator owns that handoff — it knows the pill positions from one section and passes them to the next with no visual reset or jump.

---

## How transitions work

Every transition on the page is **scene-style**: the visitor's scroll is the trigger, not the driver.

1. The visitor scrolls a small amount — roughly one flick of the mouse wheel — while the section is active.
2. The transition commits immediately and plays through at its own pace, regardless of whether the visitor keeps scrolling or stops entirely.
3. Once the transition finishes, the section holds until the visitor scrolls again, at which point the next transition commits.

The visitor never has to manually scroll through an animation frame by frame. One flick is the signal; the page takes it from there and plays the scene out. Fast scrollers and slow scrollers see the same animation at the same pace.

If the visitor scrolls back up, the state machine is not active in the reverse direction. Sections stay in whatever state they reached — the visitor scrolls back through revealed content freely, with no holds and no animations replaying. Once a section has scrolled completely out of view above the viewport, it resets silently to its initial state. If the visitor scrolls back down to it, the animation plays again from the start.

---

## Sections and their states

### Hero Animatic (Spec 001 — no changes)

| State | What the visitor sees |
|---|---|
| Start | Large headline at the bottom of the screen. Subheadline and CTAs are invisible. |
| Revealed | Headline has fully exited the top of the screen. Subheadline and CTAs are fully visible at the bottom. |

---

### Work Showcase (Spec 002 — redesign required)

The Work Showcase was designed at 1024px fixed height. It must be redesigned to fill exactly the viewport height.

**What must be preserved:**
- The headline
- The auto-scrolling horizontal carousel
- The industry category bar and sub-labels row
- All card types, card content, and hover behaviors

**What needs to change:**

The section can no longer use a fixed pixel height. All vertical dimensions — the carousel height, the card heights, the distance from the headline to the carousel, the gap between the carousel and the category bar — must be expressed as proportions of the viewport height so the section scales correctly at all screen sizes.

The carousel card heights are the most sensitive element. The Sales card, for example, is 638px in the original Figma — which is most of the viewport on a shorter screen. The cards need to scale down proportionally. The carousel should occupy the largest share of the vertical space, with the headline above it and the category bar below it each taking a compact, fixed-feeling portion.

The Figma must be updated to show the section at full viewport height before implementation begins. The updated Figma is the source of truth for all specific measurements.

| State | What the visitor sees |
|---|---|
| Hidden | Section is below the viewport. |
| Revealed | Headline, carousel, and category bar are all visible. Carousel begins auto-scrolling. |

---

### Every Channel (Spec 003 — no changes)

| State | What the visitor sees |
|---|---|
| Hidden | Video is fully below the viewport. |
| Covered | Video has snapped up to fill the full viewport. |
| Building | Display text is appearing line by line. Channel pills are popping in one by one. |
| Complete | All three text lines and all seven pills are fully visible. |

The transition from Hidden to Covered is triggered the moment the video's top edge enters the viewport — it snaps to fill the screen immediately. The transition from Covered to Complete is triggered by a small scroll after the video has settled.

---

### Product Screens (Spec 007 — no changes)

This section has a **cross-section dependency** on Every Channel. Its entrance animation begins from the scattered pill positions left behind by Every Channel's Complete state. The animator hands the pill positions from Every Channel to Product Screens so the pills travel continuously from one section to the next.

| State | What the visitor sees |
|---|---|
| Hidden | Dark card is fully below the viewport. Every Channel pills are still in their scattered positions. |
| Entering | Pills are converging toward the center. Card is rising from below and contracting. |
| Latched | Pills have attached to the rising card and are traveling with it. |
| Revealed | Card is at rest, 24px from every edge. Pills are in the nav row. Section content is visible. |

After the Revealed state, the visitor interacts with the pill nav to explore tools. Each tool selection is an in-section interaction — it does not require scroll and does not advance the state machine.

---

### Social Proof (Spec 006 — redesign required)

The Social Proof section was designed at 1024px fixed height. It must be redesigned to fill exactly the viewport height.

**What must be preserved:**
- The dark teal background
- The centered headline
- All six video thumbnails with their marker badges
- The floating animation behavior
- The click-to-modal behavior and the full modal carousel

**What needs to change:**

The section can no longer use a fixed pixel height. The headline and the six floating thumbnails must compose within the viewport height at all screen sizes. Because the thumbnails are already positioned as percentages of the section's width and height, they should adapt naturally to a viewport-height container — but the positions themselves may need adjusting in Figma to feel balanced at different aspect ratios.

The Figma must be updated to show the section at full viewport height before implementation begins.

| State | What the visitor sees |
|---|---|
| Hidden | Section is below the viewport. |
| Revealed | Headline is visible and centered. All six video thumbnails are in their positions and drifting. |

---

### Pricing (Spec 005 — redesign required)

The Pricing section was designed at approximately 980px fixed height. It must be redesigned to fill exactly the viewport height.

**What must be preserved:**
- All content: tagline, price display, feature chips, credits copy, add-ons heading, add-on columns
- The overall visual hierarchy — price as the dominant element, chips confirming features, add-ons as secondary

**What needs to change:**

The section can no longer use a fixed pixel height. All vertical spacing must be expressed as proportions of the viewport height so the content sits comfortably at all screen sizes without overflowing or leaving excessive empty space.

The content density is the main design challenge here. The price is 168px type, the nine chips stack into two rows, and the add-on block sits below. On shorter screens these need to either scale down together or be given less vertical breathing room between them. The Figma must resolve this before implementation.

| State | What the visitor sees |
|---|---|
| Hidden | Section is below the viewport. |
| Revealed | The price, feature chips, credits copy, and add-ons are all visible. |

---

### Footer (Spec 004 — excluded from animation model)

The footer is a shared element used across all pages of the site, not a section of the homepage journey. It is not viewport-height, not held by the animator, and has no states or transitions.

Once the Pricing section releases, the footer is simply there — the visitor scrolls into it naturally, reads it, and that is the end of the page.

**DOM structure note:** Because the footer sits outside the animation model, it should live outside whatever structural wrapper contains the animated sections. The animated sections form one contained group in the page structure; the footer is a sibling to that group, not a child of it. This may require updating the current page layout.

---

## The visitor's journey, end to end

When a visitor arrives at the page and scrolls from top to bottom, they experience the following sequence:

1. The hero headline is visible. A small scroll triggers it — the headline exits upward and the CTA appears. The hero releases.
2. The Work Showcase appears. The carousel is visible and moving. A small scroll releases it.
3. The Every Channel video rises from below. The moment its top edge enters the viewport, it snaps to full coverage. A small scroll triggers the text and pill sequence. The section releases.
4. A small scroll triggers the Product Screens entrance. The card rises and the pills converge from their Every Channel positions. The pills latch onto the card. The card settles. The visitor explores tools, then scrolls.
5. A small scroll triggers the Social Proof entrance. The headline and thumbnails appear and begin drifting. The visitor scrolls.
6. A small scroll triggers the Pricing entrance. The price and chips come into view. The visitor scrolls.
7. The Pricing section releases. The visitor scrolls naturally into the footer and reads it freely.

At any point, the visitor can scroll back up freely. Sections stay in their revealed state as the visitor moves back through them. A section only resets to its initial state once it has scrolled fully out of view above the viewport — at which point it is ready to animate again if the visitor scrolls back down.

---

## Sections that hold the viewport

Every section holds the viewport for as long as it has available transitions to play. The visitor cannot scroll past a section until it has reached its final state.

| Section | Final state before releasing |
|---|---|
| Hero Animatic | Revealed |
| Work Showcase | Revealed |
| Every Channel | Complete |
| Product Screens | Revealed |
| Social Proof | Revealed |
| Pricing | Revealed |

The footer is not part of this table — it is outside the animation model entirely.

---

## Accessibility

If the visitor has reduced motion turned on in their operating system, no transitions play anywhere on the page. Every section displays immediately in its final revealed state. No section holds the viewport. The visitor scrolls through the page freely.

---

## Mobile

Below the tablet breakpoint, no section uses the state machine model. Every section displays its content statically. No section holds the viewport. The visitor scrolls freely from top to bottom.

Whether sections remain viewport-height on mobile or revert to natural content height is to be defined in each section's responsive behavior as its Figma is updated.

---

## Acceptance criteria

- [ ] Every section fills exactly the full browser window height — no section is taller or shorter than the viewport
- [ ] Every section holds the visitor in place while its transitions play — the visitor cannot scroll past it until it reaches its final state
- [ ] A small scroll input is enough to commit any transition — the visitor never has to hold or drag a scroll to push an animation forward
- [ ] Every transition plays at a consistent pace regardless of how fast or slow the visitor scrolled to trigger it
- [ ] Scrolling back up is always free — no section holds the viewport when scrolling in reverse
- [ ] Sections stay in their final revealed state when the visitor scrolls back through them — no animations replay on the way up
- [ ] A section resets to its initial state only after it has scrolled completely out of view above the viewport
- [ ] If the visitor scrolls back down to a reset section, its animation plays again from the start
- [ ] The Every Channel pills travel continuously into the Product Screens nav — their movement does not reset or jump at the section boundary
- [ ] After a section reaches its final state, it holds until the visitor scrolls again — it does not auto-advance
- [ ] After the Pricing section releases, the visitor scrolls into the footer naturally — no hold, no animation, no state machine involvement
- [ ] The footer is visually and structurally separate from the animated sections
- [ ] With reduced motion on: no section holds the viewport, all sections display in their final state immediately, visitor scrolls freely
- [ ] On mobile: no section holds the viewport, all sections display statically
