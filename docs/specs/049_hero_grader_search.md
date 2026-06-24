# Spec 049 — Hero business search → Keystone Grader

**Status:** Built.
**Type:** A new feature added to the existing homepage hero (desktop `HeroAnimatic` and `MobileHero`). A "find your business" search field with live typeahead is added to the hero's bottom content band. Choosing a result opens the Keystone Grader in a new tab, pre-loaded with that business, so the Grader starts its scan immediately. The existing hero calls to action (Get in touch / Services and pricing) are unchanged.
**Reference:** Owner.com's hero search — a single rounded field ("Find your restaurant name") paired with a primary submit button ("Get my AI report"). Typing surfaces a Google Places dropdown; choosing an entry hands off to a report tool. We mirror the interaction, dressed in Keystone's dark-hero design language.
**Depends on:** 013 / 030 / 031 (the hero structure, legibility band, and load sequencing this rides inside), and the external Keystone Grader app + API (`grader.keystone.app`).

---

## What this is

The hero is the page's entry hook. Today it presents the brand, headline, subheadline, and two calls to action. This adds a third, self-serve path: a visitor types their business name, the field autocompletes against the Grader's Google Places search, and choosing a result opens the Grader in a new tab already scanning that business. It is the same move Owner makes on its homepage, adapted to Keystone's hero.

The field is content-driven (placeholder and button label come from hero data) and reuses the Grader's existing search and scan rather than introducing any new credentials on this site.

---

## Scope

### In scope

- **A search field in the hero bottom band**, on both the desktop and mobile hero, sitting beneath the headline and above the existing subheadline / call-to-action row. A leading search glyph, a free-text field, and a primary submit button carrying the Grader-report label.
- **Live typeahead.** Keystrokes are debounced, then queried against the Grader's business search; up to a handful of matches show as a dropdown of name + address rows, navigable by mouse and keyboard (up/down/enter).
- **Hand-off to the Grader.** Choosing a result — or submitting (top match, else the typed text) — opens the Grader in a new browser tab, pre-loaded with the chosen business, so it begins scanning immediately with no further interaction.
- **Hero content additions.** The hero data gains a search placeholder and a submit-button label; both heroes thread them through to the field.

### Out of scope

- **The Grader app and its scan UI** — separate codebase. This spec only defines the entry point and the hand-off contract.
- **The existing hero calls to action and their behavior** — unchanged. The Grader search is additive.
- **Any new analytics, login, or Google credentials on this site** — the search reuses the Grader API; nothing new is provisioned here.

---

## Interaction & motion

- The field enters as part of the hero's existing bottom-band reveal — it shares the band's fade/rise; no separate animation is added.
- **Focus** lifts the field's shadow slightly. Typing drives the dropdown; an empty field shows none.
- **Results menu direction is dictated by layout, not preference:** the desktop hero band is anchored to the bottom of the viewport and the section clips overflow, so the menu opens **upward**. The mobile content zone has room below, so it opens **downward** (the mobile content zone clips only horizontally so the menu is not cut off).
- **Choosing** a row (click or Enter) opens the Grader in a new tab. The submit button is a convenience that resolves to the top match, or scans the typed text when there is no match; an empty field does nothing.

---

## Accessibility

- The field is a labelled text input; the submit button carries the report label as its accessible name even when it shows only an arrow (mobile).
- The dropdown is keyboard-navigable (up/down to move, Enter to choose) and closes on blur.
- Result rows are real buttons with discernible name + address text.

---

## Responsive behavior

- **Desktop (≥985px):** larger field constrained to the hero column width; submit button shows its full label and arrow; menu opens upward.
- **Mobile (<985px):** full-width compact field; submit button collapses to an arrow (label preserved as its accessible name); menu opens downward.

---

## Hand-off contract (this site → Grader)

- **Typeahead source:** the Grader API business search. This site's origin must be allowed by the Grader API's CORS list.
- **Deep link:** the Grader is opened with the chosen business in the URL — its place id, name, and address. Name is the only required field; a typed-text scan carries an empty id/address. The Grader reconstructs the business from these and auto-starts the scan, skipping its own landing.
- **Endpoints/URLs** live as named constants in one place on this site, never inline.

---

## Notes

- No hardcoded colors or hex: the field uses the surface/text/border tokens; the submit button and active-row use the hero accent/background tokens.
- The Grader URL and API base are the only external endpoints and are centralized as constants.

---

## Acceptance criteria

- [ ] The hero (desktop and mobile) shows a search field beneath the headline, above the existing calls to action, with the data-driven placeholder and submit label.
- [ ] Typing surfaces live business matches (name + address); the menu opens upward on desktop and downward on mobile and is keyboard-navigable.
- [ ] Choosing a result — or submitting with a match present — opens the Grader in a new tab and the scan starts immediately for that business, with no landing step shown.
- [ ] Submitting typed text with no match opens the Grader scanning that text; an empty field does nothing.
- [ ] The existing hero calls to action and the hero load sequence are unchanged.
- [ ] `npx tsc --noEmit` and `npm run lint` pass.
