# Spec 034 — Full Site Navigation

**Status:** Draft  
**Depends on:** Spec 030 (Homepage Hero Legibility Refresh), Spec 031 (Hero Load Sequencing)  
**Figma file:** `XRbD11WIevI5szRFiRrguZ`  
**Figma node:** [Website 3](https://www.figma.com/design/XRbD11WIevI5szRFiRrguZ/ks-BrandID?node-id=964-1392&m=dev) (node `964:1392`)  
**Reference model:** Owner.com navigation screenshots supplied during design review

---

## Source Notes

The Figma MCP metadata for node `964:1392` was available and includes nav layer structure. The MCP variable and design-context calls were blocked because Figma Desktop had no selected layer. This spec therefore records the approved navigation behavior from the design review screenshots and the current Keystone visual system.

If this spec is implemented from scratch later, re-run the Figma MCP calls once the target layer is selected.

---

## What This Spec Changes

The homepage nav becomes a full business-site navigation system instead of a single CTA bar.

The visual model is Owner.com:

- a dark rounded nav bar over the hero
- centered top-level navigation links
- large desktop dropdown panels
- compact mobile menu with accordion sections

The styling remains Keystone:

- Keystone wordmark
- dark green nav shell
- cream dropdown surfaces
- green and orange promo tiles
- FK Grotesk typography

---

## Top-Level Structure

Desktop and tablet nav contains:

1. Keystone wordmark on the left
2. centered navigation group
3. Login link on the right
4. primary "Get a free demo" CTA on the far right

The centered navigation order is:

1. Services
2. Pricing
3. How it works
4. Company
5. Resources

Services, Company, and Resources have dropdowns. Pricing and How it works are direct links.

---

## Desktop Nav Bar

The nav bar is fixed over the page and centered within the viewport.

It keeps the current homepage scroll behavior:

- visible while the user is in the hero
- hides when scrolling down after the hero
- returns when scrolling back up

Visual treatment:

- dark green rounded pill
- subtle translucent border
- soft shadow
- Keystone green wordmark
- muted light text for inactive links
- green filled CTA

The hovered or focused dropdown trigger receives a soft pill highlight and the chevron points upward.

---

## Desktop Dropdown Behavior

Dropdowns open on hover and keyboard focus.

The dropdown panel is positioned relative to the full nav container, not relative to the individual trigger. This keeps panels visually centered under the nav bar.

Dropdowns use:

- cream surface
- large rounded corners
- soft shadow
- left content zone
- right promo-tile rail
- vertical divider between content and promo rail

Dropdown panels should not all be the same width.

Services is the wide mega menu. Company and Resources are compact menus.

---

## Services Dropdown

Services uses the wide dropdown.

Layout:

- left content zone arranged as four service categories
- categories flow as a two-column by two-row grid
- right rail contains three vertical promo tiles
- promo tiles share the same width used by all dropdown promo tiles

The service links are title-only. Do not show descriptions under service links.

### Services Content

**A beautiful, elevated presence**

- Website
- Instagram, Facebook & TikTok
- Maps
- Reviews

**New leads and potential clients**

- Instagram & Facebook Ads
- Google Ads
- Content Marketing

**Convert long-term customers**

- Sales Team
- Text-Based Sales
- Call-Based Sales

**Turn happy customers into evangelists**

- Email Campaigns
- Smart Re-Engagement
- Reviews
- Rebookings
- Loyalty & Rewards

### Services Promo Rail

Services has three vertically stacked tiles:

- See how local teams grow without hiring an agency
- Explore the Keystone service system
- Start building your always-on growth team

The rail should feel like a column of cards, not a single advertisement block.

---

## Company Dropdown

Company uses the compact dropdown.

Layout:

- panel is only as wide as needed for one content column plus the promo rail
- left content zone has one column
- right rail has two vertical promo tiles
- promo tiles have the same width as Services promo tiles
- the panel must not span the full nav width

### Company Content

**Company**

- About Keystone
- Leadership
- Careers
- Contact

### Company Promo Rail

Company has two vertically stacked tiles:

- Built for local businesses ready to scale
- Meet the people behind Keystone

---

## Resources Dropdown

Resources uses the compact dropdown.

Layout matches Company:

- one content column
- two vertical promo tiles
- same promo tile width as Services
- compact panel width

### Resources Content

**Resources**

- Blog
- Testimonials
- FAQ
- Service areas

### Resources Promo Rail

Resources has two vertically stacked tiles:

- Read practical growth notes from Keystone
- See what local businesses are saying

---

## Promo Tile Rules

Promo tiles are rectangular cards with rounded corners.

Each tile includes:

- a subtle top divider line
- short stacked headline copy
- arrow on the lower right

Tiles use Keystone green and orange treatments. Use color to add rhythm, but do not introduce new brand colors.

The important layout rule is consistency: compact dropdown tiles must be the same visual width as Services dropdown tiles.

---

## Mobile Navigation

Mobile does not show desktop dropdowns.

The mobile nav starts as a compact dark rounded bar:

- Keystone wordmark on the left
- circular green menu button on the right

When opened, the menu becomes a compact light panel below the bar.

The closed-state mobile menu must not show every nested link. It should feel calm and compressed.

Top-level rows are:

1. Services
2. Pricing
3. How it works
4. Company
5. Resources

Services, Company, and Resources are accordion rows with chevrons. Pricing and How it works are direct links.

Only one accordion row can be open at a time.

Opening a new accordion row closes the previously open row. Tapping the active row closes it.

Mobile nested content uses the same category labels and link labels as desktop, but without promo tiles.

Login and "Get a free demo" sit below the row list as secondary and primary actions.

---

## Responsive Behavior

At mobile widths, use the compact accordion menu.

At tablet and desktop widths, use the full nav bar and hover/focus dropdowns.

Desktop dropdown panels must not cause horizontal overflow.

Compact dropdowns must stay visibly smaller than Services.

---

## Accessibility and Interaction

All interactive nav items are reachable by keyboard.

Dropdowns remain open while focus is inside them.

Focus states are visible on:

- top-level nav triggers
- dropdown links
- promo tiles
- mobile accordion triggers
- Login and CTA links

Mobile accordion triggers expose expanded and collapsed state to assistive technology.

The nav has a clear "Main navigation" label.

---

## What Does Not Change

- The homepage nav remains fixed over the hero.
- Existing hero scroll-hide behavior is preserved.
- The Keystone wordmark remains the brand anchor.
- Lead-capture behavior for the primary CTA remains consistent with the rest of the site.
- Pricing still targets the homepage pricing area.
- Inner page nav can remain separate until a future spec unifies site chrome.

---

## Acceptance Criteria

### Desktop

- [x] Nav displays wordmark, centered links, Login, and "Get a free demo"
- [x] Services, Company, and Resources show dropdowns on hover
- [x] Dropdowns also remain usable by keyboard focus
- [x] Services dropdown uses the wide layout
- [x] Services content appears as four categories in a two-by-two grid
- [x] Services has three vertical promo tiles
- [x] Company dropdown is compact and does not use the full Services width
- [x] Company has two vertical promo tiles
- [x] Resources dropdown is compact and does not use the full Services width
- [x] Resources has two vertical promo tiles
- [x] Promo tiles in compact dropdowns match the visual width of Services promo tiles
- [x] Service links show titles only, with no visible descriptions

### Mobile

- [ ] Closed mobile menu shows only the wordmark and menu button
- [ ] Open mobile menu shows top-level rows first
- [ ] Services, Company, and Resources can expand
- [ ] Only one accordion section is expanded at a time
- [ ] Expanding a different section collapses the previous section
- [ ] Pricing and How it works act as direct links
- [ ] Mobile nested sections do not show promo tiles
- [ ] Login and "Get a free demo" are visible below the menu rows

### No Regressions

- [x] Nav remains visible at first paint over the hero
- [ ] Nav hide/show on scroll still feels smooth
- [ ] No horizontal overflow at mobile, tablet, or desktop widths
- [x] Focus states remain visible
- [ ] Reduced-motion users do not receive unnecessary decorative motion
