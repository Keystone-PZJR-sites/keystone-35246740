# Spec 035 — Tabbed Showcase

**Status:** Approved — implementing
**Type:** Reusable design-system section (usable on any page)
**Reference:** Two screenshots attached in chat — an auto-advancing tabbed feature showcase, shown in its "More Google Traffic" and "More Online Sales" states. No Figma; built per the "Reference-Driven Components" workflow in the rules.
**Proposed name:** `TabbedShowcase` (open to a rename)

---

## What this is

A reusable section that presents a small set of related features as a row of tabs. One tab is active at a time; the active tab reveals a large panel that shows a short eyebrow label, a headline, and a supporting visual. The tabs advance on their own on a timer — a slim progress bar under the active tab's name fills from left to right over a fixed interval, and when it completes the next tab becomes active. After the last tab it loops back to the first. The visitor can also select any tab directly, which makes it active immediately and restarts the timer from that tab.

It is content-agnostic: each tab's name, eyebrow, headline, and visual are supplied by the page. The visual is an arbitrary block (a product mock, an image, an illustration) that the component simply frames.

---

## Scope

### In scope

- A horizontal tab row (desktop / tablet) and a swipeable single-tab carousel (mobile), both driven by the same active-tab state.
- A progress indicator beneath the active tab's name that fills over a fixed interval.
- Automatic advance to the next tab when the progress completes; looping after the last tab.
- Manual selection: on desktop, clicking a tab; on mobile, swiping or tapping a previous / next arrow, or a dot. Any manual selection activates that tab and restarts the timer.
- On mobile, dot indicators (one per tab) and a pair of circular previous / next arrow buttons.
- A content panel showing the active tab's eyebrow, headline, and visual.
- Pausing the auto-advance while the visitor is hovering over or keyboard-focused within the section.
- A configurable interval (one value for all tabs) with a sensible default.

### Out of scope

- The specific visuals inside each tab — those are content, supplied per use.
- Any data fetching or routing a tab might trigger.
- A separate next / previous arrow control (selection is via the tabs themselves).

---

## Visual design

Exact colors, sizes, and spacing are chosen at implementation against our tokens. The reference screenshots are the visual anchor, but the component must read as Keystone — our cream surfaces, our type, our eyebrow treatment — not as the reference site.

The mobile↔desktop hand-off is the app-wide **985px** boundary (see the "Responsive-Native" rule), not a component-specific cutoff. Tablets and iPad portrait fall below it and get the mobile carousel.

### Desktop (≥ 985px)

A single row of tab names spans the full content width, evenly distributed. Each name sits above a thin, full-width track line. The active name is in the site's body font at the bold weight in the primary dark text color; the inactive names are in the muted tone. Under the active name the track shows a filled portion in the dark text color that grows from left to right as the timer runs; the inactive tracks show only the faint base line.

Below the tab row sits a large panel with generously rounded corners on a soft cream fill, a shade off the page background. The panel is wide and clearly taller than the tab row. Inside, content is split: the left holds a small eyebrow label above a short, multi-line headline (body font, bold, primary dark); the right holds the tab's visual, vertically centered. The panel has comfortable internal padding.

When the active tab changes, the panel's content gives a quick, gentle crossfade — the outgoing content fades out as the incoming content fades in. The panel frame itself stays put; only its contents change.

### Mobile / tablet (< 985px)

The row of tabs would not fit, so the section becomes a swipeable single-tab carousel. Only the active tab is shown: its name sits at the top, left-aligned, with the thin progress track spanning the full width beneath it and filling left to right as the timer runs. Below that is the panel — the same soft cream, generously rounded surface — holding the eyebrow, headline, and visual. On the narrowest phones the panel's content stacks (eyebrow and headline first, the visual below) so nothing is cramped; where there is room it may keep the side-by-side split.

Beneath the panel are two manual controls: a row of small dots, one per tab, with the active tab's dot emphasized; and below them a pair of circular previous / next arrow buttons. The visitor can swipe the panel horizontally, tap an arrow, tap a dot, or simply let it auto-advance. Any manual navigation activates the chosen tab and restarts the timer from empty. The progress fill and auto-advance otherwise behave exactly as on desktop, looping after the last tab. The arrow buttons meet the minimum tappable size.

---

## Animation behavior

### Progress + auto-advance

The progress fill grows smoothly from empty to full over the interval. The instant it reaches full, the next tab becomes active and its fill starts again from empty. This repeats around the loop indefinitely. Selecting a tab manually — clicking a tab, tapping an arrow or dot, or swiping on mobile — snaps its fill back to empty and starts it again from the newly active tab.

### Pause

While the pointer is hovering anywhere over the section, or keyboard focus is inside it, the progress holds in place and does not advance; moving away resumes it.

### Reduced motion

When the visitor's system prefers reduced motion: there is no automatic advance and no animated fill. The first tab is shown by default; the tabs remain fully usable by click / tap and keyboard, and the panel content swaps instantly with no crossfade. The track under the active tab renders as a static full bar (so the active tab is still clearly marked) rather than an animating one. On mobile the carousel still works via swipe, arrows, and dots, but slide changes snap with no scroll animation.

---

## Content

Each tab is fully prop-driven:

- **Tab name** — the short label shown in the tab row / accordion.
- **Eyebrow** — a small label above the headline.
- **Headline** — a short statement, one to three lines.
- **Visual** — an arbitrary block the page supplies (a mock, image, or illustration), framed on the right (desktop) or stacked below (mobile).

The interval — how long each tab stays active — is a single value for the whole component, with a sensible default if not supplied. Nothing (names, copy, visuals, colors) is hardcoded in the component.

---

## New tokens & variants

- **A shared large panel corner-radius.** The big rounded panel needs a corner radius well beyond our standard component radius, and the system has no named large radius today — existing large panels each hardcode their own. Add one shared large-radius token and use it here so future large panels reference the same value.

No new color tokens — the panel uses an existing cream surface role, and the active / inactive names, the progress fill, the carousel dots, and the arrow buttons all use existing text and border tokens. No new primitive — the tab row, progress track, mobile carousel dots, and previous / next arrow buttons are internal to this section, and the mobile carousel reuses the shared Embla hook that the site's other mobile carousels use. The eyebrow, headline, and copy use the existing Eyebrow, Heading, and Text primitives.

---

## Accessibility

- Desktop (≥ 985px) uses a proper tablist: the tab row is a tablist, each tab is a tab with a selected state, and the panel is the associated tabpanel. Left / right arrow keys move between tabs, Enter / Space activates, and focus is visible.
- Mobile is a carousel: the previous / next controls are real buttons with clear labels, the dots are buttons that jump to a tab, and the panel is swipeable. It follows the same accessible-carousel pattern as the site's other mobile carousels (the shared Embla hook).
- The auto-advance pauses on hover and on keyboard focus within the section, and is disabled entirely under reduced motion — satisfying the requirement that auto-updating content can be paused.
- The visual is decorative framing supplied by the page; any meaningful imagery inside carries its own alt text from the page.
- Active and inactive tabs meet AA contrast; the progress fill is never the only indicator of the active tab — the active name is also bolder and darker.

---

## Acceptance criteria

- [ ] On load, the first tab is active and its progress bar begins filling (full motion).
- [ ] The progress bar under the active tab fills from empty to full over the interval.
- [ ] When the bar completes, the next tab becomes active automatically and its bar starts from empty.
- [ ] After the last tab, it loops back to the first.
- [ ] Clicking / tapping a tab makes it active immediately and restarts its progress from empty.
- [ ] The active tab's name is visibly bolder and darker than the inactive names.
- [ ] The active tab's content (eyebrow, headline, visual) shows in the panel; switching tabs crossfades the content.
- [ ] Hovering over the section pauses the progress; leaving resumes it.
- [ ] Moving keyboard focus into the section pauses the progress; tabs are operable with arrow keys and Enter / Space.
- [ ] At ≥ 985px the tabs are a horizontal row above a single panel.
- [ ] Below 985px only the active tab shows — its name and a full-width progress track above the panel — with dot indicators and previous / next arrow buttons below.
- [ ] On mobile, swiping the panel, tapping an arrow, or tapping a dot changes the active tab, updates the dots, and restarts the progress from empty.
- [ ] With reduced motion enabled there is no auto-advance and no animated fill; tabs still switch on click / tap and keyboard, content swaps instantly, and the active tab shows a static full bar.
- [ ] No horizontal overflow at 390px; long tab names wrap or fit without clipping.
- [ ] The panel uses the new shared large-radius token — no hardcoded radius.
