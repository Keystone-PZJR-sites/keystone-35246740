# Spec 009 — Blog & Inner-Page Shell

**Status:** Draft — awaiting designer review  
**Figma file:** `XRbD11WIevI5szRFiRrguZ`  
**Figma nodes:**
- Inner-page shell (nav + footer): TBD — designer to add nodes to the Figma file
- Blog gallery: TBD
- Blog post detail: TBD

> Note: The design system (typography, colors, spacing, component styles) is fully defined by the existing Figma file and the home page specs. The blog pages apply that same design language to a new layout. A designer should add explicit blog layout frames to the Figma file before implementation begins.

---

## What this covers

This spec defines three things that work together:

1. **The inner-page shell** — the navigation bar and footer that appear on every page except the home page. This shell is the foundation for the blog, and for all future pages (terms of service, privacy policy, FAQ, about, etc.).

2. **The blog gallery page** — the listing page at `/blog` showing all published posts in a clean grid.

3. **The blog post detail page** — the individual post page at `/blog/[slug]` showing the full article.

---

## Scope

### In scope

- Inner-page shell: site navigation bar for all non-home pages
- Inner-page shell: shared footer (same footer as the home page, reused without modification)
- Inner-page shell: lead capture modal available on all inner pages (CTA buttons open it)
- Blog gallery: page header with title and subtitle
- Blog gallery: grid of post cards with thumbnail, title, excerpt, date, author, and tags
- Blog gallery: featured post displayed prominently above the grid (when one exists)
- Blog gallery: SEO metadata derived from the page content
- Blog post detail: post header with title, author, date, and tags
- Blog post detail: full article body rendered from markdown
- Blog post detail: featured image
- Blog post detail: related posts section at the bottom
- Blog post detail: per-post SEO metadata from the post's own fields
- Responsive behavior at all three breakpoints

### Out of scope

- Home page (covered in specs 001–008)
- Tag or author archive pages
- Search functionality
- Comments
- Post sharing buttons
- Newsletter inline signup (email signup is in the footer, not inside posts)
- Any page other than the two blog pages, though the shell they introduce is reused by future specs

---

## Part 1 — Inner-page shell

### What the shell is

The shell is an invisible wrapper around every inner page. It contributes two visible elements — the navigation bar at the top and the footer at the bottom — and makes the lead capture modal available across the entire site.

Every inner page that uses the shell looks like: nav → content → footer.

### Navigation bar

A clean, always-visible horizontal bar pinned to the top of every inner page. Unlike the home page's animated navigation, this bar does not respond to scroll position — it is simply always present.

**Left side:** The Keystone wordmark logotype (the same green version used in the home page nav). Clicking it returns the visitor to the home page.

**Right side:** A single pill-shaped CTA button ("Get started") in the same style and color as the CTA buttons on the home page. Clicking it opens the lead capture modal.

**Background:** The same deep maroon as the home page background. The bar does not go transparent at any point.

**Border:** A subtle bottom border separates the nav from the page content below it. See Figma for the exact weight and color.

**Height:** Compact — similar to the home page's `HeroNav`. See Figma for the exact value.

The navigation bar is the same component on every inner page. It is never customized for a specific page.

### Footer

The exact same footer component used on the home page, with no modifications. It includes the video collage, breathing space, taglines, CTA buttons, email signup, social links, and the large "keystone" wordmark. A visitor arriving at the bottom of any inner page sees the identical footer they would see at the bottom of the home page.

The footer is shared at the application layout level so it does not need to be added to individual page files.

### Lead capture modal

The lead capture modal (spec 008) is available on every inner page. The "Get started" button in the navigation bar triggers it. The modal is initialized at the layout level so it wraps all inner pages without each page needing to set it up individually.

---

## Part 2 — Blog gallery page

### URL

`/blog`

### What this page is

A listing page showing all published blog posts. It gives visitors an overview of the company's writing and lets them browse, search, and filter through to any post. The page is simple and fast — its primary job is to surface content clearly and rank well in search.

### Page header

A compact hero at the top of the page, below the navigation bar, that introduces the blog. Same dark maroon background as the navigation bar — the two read as one continuous element.

**Heading:** "Blog" or a short brand-voice variant. Large display type, FK Screamer Bold, in the site's warm orange accent color. Significantly smaller than the home page's full-screen headlines — this is a section heading, not a cinematic type treatment.

**Subtext:** One short sentence describing the blog's purpose. FK Grotesk Neue Regular, muted warm tone. See Figma for size and color.

**Vertical spacing:** Compact. The header does not fill the full viewport. It provides breathing room above and below the text, then transitions immediately into the search, filter, and post grid.

### Search and filter bar

A horizontal bar sitting between the page header and the post grid. This is the primary tool for narrowing down the post list.

**Search input:** A text input on the left side of the bar. Placeholder text: "Search articles…". As the visitor types and submits (via Enter or a search icon button), the page reloads with the query applied and the post grid filtered to matching posts. Search is case-insensitive and matches post titles and content. The current query is reflected in the URL (`?q=...`) so results are shareable and indexable.

**Tag filter pills:** To the right of the search input (or below it on mobile), a row of clickable pill labels — one for each tag that exists in the published posts. Clicking a tag filters the grid to posts with that tag. The active tag is visually highlighted. Clicking the active tag again clears the filter. Only one tag can be active at a time. The active tag is reflected in the URL (`?tag=...`). If no tags exist in the backend, this row is omitted entirely.

**Clear / reset:** When either a search query or a tag filter is active, a small "Clear" control appears that resets both filters at once and returns to the full post list.

**No results state:** If the search query or tag filter returns no matching posts, the post grid is replaced by a short message explaining that no posts matched, with a prompt to clear the filter. See Figma for the exact treatment.

### Featured post

If any post is marked featured, it appears in a single prominent card above the main grid. It is visually larger than the grid cards — wider, with a bigger image area and more generous typography. It reads clearly as "highlighted" without needing any special label.

If no post is featured, this area is omitted entirely. The featured post is suppressed when a search query or tag filter is active, since the visitor is looking for specific content and the featured override would be distracting.

### Post grid

A grid of post cards below the featured post (or below the search bar if there is no featured post). Three columns on desktop, two on tablet, one on mobile.

**Post card anatomy:**

- **Thumbnail image** — the post's featured image, if one exists. The image fills the top portion of the card. Cards without a featured image show a plain color placeholder in the accent palette. No cards should appear broken.
- **Tags** — small pill labels in the site's accent color, appearing above the title. If there are no tags, this row is omitted.
- **Title** — the post title, in a medium display weight. FK Screamer or FK Grotesk Neue — see Figma. Two or three lines maximum; titles longer than that are truncated with an ellipsis.
- **Excerpt** — two to three lines of body text from the post's excerpt. FK Grotesk Neue Regular. Truncated if too long.
- **Metadata row** — author name and publish date, in a small, muted style. Sits at the bottom of each card.

Clicking anywhere on the card navigates to the post detail page.

Cards have no heavy drop shadows, no entrance animations, and no hover videos. On hover, a subtle visual shift (opacity change or border highlight) indicates the card is interactive. See Figma for exact hover state.

### Pagination

The post list is paginated. A fixed number of posts appear per page (see Figma for the exact count — 12 is a sensible default). When more posts exist than fit on the current page, a pagination control appears below the grid.

The pagination control shows:
- A "Previous" link (disabled and visually muted on page 1)
- Numbered page links for nearby pages, with ellipsis for skipped ranges on large collections
- A "Next" link (disabled and visually muted on the last page)

The current page is reflected in the URL (`?page=2`). Pagination, search query, and tag filter all compose correctly in the URL — navigating to page 2 while a tag filter is active produces `?tag=marketing&page=2`. The post grid always shows results consistent with all active filters.

All paginated pages are indexable by search engines (no `noindex` on page 2+).

### Empty state

If no posts exist yet, the grid and search bar are replaced by a single centered message telling the visitor that content is coming soon. The page header still appears normally.

---

## Part 3 — Blog post detail page

### URL

`/blog/[slug]`

### What this page is

The full reading view for a single blog post. Its job is to deliver a clean, distraction-free reading experience and rank well for the post's target keywords. It has no sidebar, no interruptive overlays, and no auto-playing media.

### Post header

A contained section at the top of the page, directly below the navigation bar. Same dark maroon background as the nav, reading as one continuous block.

**Tags:** Tag pills if the post has any, in the accent color. Appears above the title.

**Title:** The post title in large FK Screamer Bold, orange. The single largest text element on the page — clearly the headline. Shorter than the home page's display type but still commanding. See Figma for exact size.

**Metadata row:** Author name (with a small avatar or initial if an author photo is available), publish date, and an estimated reading time derived from the article length. FK Grotesk Neue Regular, muted warm color. Appears below the title.

**Featured image:** Full-width image below the metadata row, if the post has one. The image spans the full content column width. A post without a featured image has no gap — the header transitions directly into the article body.

### Article body

The rendered markdown content of the post. This is the primary reading area.

**Column width:** The article text is constrained to a comfortable reading width — narrower than the full page width. Centered on the page. See Figma for the exact column width at each breakpoint.

**Typography:**

- Body paragraphs: FK Grotesk Neue Regular, a comfortable reading size. See Figma for size, line height, and paragraph spacing.
- H2 and H3 headings within the article: FK Grotesk Neue or FK Screamer in a scaled-down size. Clear visual hierarchy between heading levels.
- Blockquotes: visually distinct with a left accent line in the orange color.
- Inline code and code blocks: FK Grotesk Mono, slightly smaller size, with a subtle background tint.
- Bold and italic: standard weight variations of FK Grotesk Neue.
- Links: orange accent color, underlined. On hover, opacity shifts.
- Images within the body: full column width, with optional captions below in a small muted style.
- Unordered and ordered lists: standard indentation and spacing, consistent with the body text size.

**No animations.** The article body simply renders. No staggered entrance, no scroll-triggered reveal.

### Related posts

A section below the article showing up to three other posts from the same blog. Headed with a short label ("More posts" or similar) in the same display style as section headings elsewhere on the site.

Uses the same post card component as the gallery grid. Three cards in a row on desktop, stacked on mobile.

If fewer than three other posts exist, only the available posts are shown. If no other posts exist, this section is omitted.

### Navigation between posts (optional consideration)

A previous / next post link at the bottom of the article, below the body and above the related posts section. Minimal — just the post title and a directional arrow. See Figma to confirm whether this is included.

---

## Design language

The blog inherits the home page's design system exactly:

- **Typefaces:** FK Screamer Bold for all display headings; FK Grotesk Neue Regular for body text, labels, and metadata; FK Grotesk Mono for code.
- **Colors:** The site's warm orange accent for headings, tags, and interactive elements; deep maroon for the navigation and footer chrome; a clean neutral for the main content area background. All exact values from Figma.
- **Spacing and rhythm:** Generous vertical breathing room between sections. The same proportional spacing language as the home page.
- **Interactive elements:** Pill-shaped buttons with the same style as the home page CTAs. Tag pills, hover states, and link treatments are consistent with what appears on the home page.
- **No gratuitous motion.** The blog is content-first. Hover states and link transitions are subtle. There are no scroll-triggered entrance animations, parallax effects, or auto-playing videos in the blog content area.

---

## Responsive behavior

**Desktop (≥ 1280px):** Three-column post grid. Article body constrained to a comfortable reading column. Navigation bar full-width with left/right groupings.

**Tablet (768px – 1279px):** Two-column post grid. Article body slightly wider proportionally but still constrained. Navigation bar same structure.

**Mobile (< 768px):** Single-column post grid. Article body full available width with comfortable side padding. Navigation bar collapses — the wordmark and CTA button remain; see Figma for any additional treatment of the nav at this breakpoint.

At all breakpoints, no element may overflow the viewport horizontally.

---

## SEO

The blog is the site's primary SEO surface. Every decision about markup, content rendering, and metadata must serve search visibility.

**Blog gallery page:**
- Page title and meta description are set in the site's metadata config — not pulled from any individual post.
- Clean semantic markup: `<main>`, `<article>`, `<h1>`, `<h2>` used correctly throughout.

**Blog post detail page:**
- Page `<title>` uses the post's `seo_title` field if populated; falls back to the post's `title`.
- Meta description uses `seo_description` if populated; falls back to `excerpt_markdown`.
- Open Graph and Twitter Card tags are populated from the same fields plus the featured image URL.
- The full article body is rendered as static HTML — not JavaScript-hydrated — so search engines can index it without executing scripts.
- Canonical URL is the post's own URL.
- Structured data (Article schema) should be considered — confirm with designer whether to include.

---

## Accessibility

- The navigation bar must be keyboard-navigable. The CTA button has a clear focus ring.
- Post cards are fully keyboard-accessible — the entire card is a single focusable link with a descriptive accessible label derived from the post title.
- Article body markdown rendering produces correct heading hierarchy: one `<h1>` per page (the post title), `<h2>` and `<h3>` for sections within the article.
- Images have meaningful `alt` text sourced from the photo's `alt_text` field, with an empty `alt` for purely decorative images.
- Color contrast for all text meets WCAG AA minimum.
- No functionality is dependent on hover alone.

---

## Data sources

All content is fetched server-side before the page renders. No content is loaded client-side after the initial page load.

| Element | Source |
|---------|--------|
| Post list | Backend API — `/public/blog_posts` with optional params: `q` (search), `page`, `per_page`, `tag_id` |
| Individual post | Backend API — `/public/blog_posts/by_slug/:slug` |
| Post title | `title` |
| Post slug | `slug` |
| Excerpt | `excerpt_markdown` |
| Full body | `content_markdown` |
| Featured image | First item in `photo_attachments` where `featured: true`, or first item if none is marked featured |
| Author name | First entry in `blog_post_authors` |
| Author photo | `photo_attachments` on the author object |
| Tags | `blog_post_tags` — `name` field on each |
| Publish date | `published_at` |
| SEO title | `seo_title`, falling back to `title` |
| SEO description | `seo_description`, falling back to `excerpt_markdown` |
| Company social URLs | `getCompanyInformation()` — used in the footer |

---

## Acceptance criteria

### Inner-page shell

- [ ] Navigation bar appears at the top of every inner page, never obscured by page content
- [ ] Navigation bar background matches the home page's dark maroon at all times — no transparency or color shift
- [ ] Keystone wordmark is visible and links to the home page
- [ ] "Get started" button in the nav opens the lead capture modal
- [ ] Footer appears at the bottom of every inner page and is visually identical to the footer on the home page
- [ ] The nav and footer render on every inner page without each page explicitly adding them

### Blog gallery

- [ ] Page renders at `/blog` with all published posts displayed
- [ ] Search input is visible in the search and filter bar
- [ ] Typing a query and submitting filters the post grid to matching results and updates the URL (`?q=...`)
- [ ] Tag pills appear when tags exist; clicking a tag filters the grid and updates the URL (`?tag=...`)
- [ ] The active tag pill is visually highlighted; clicking it again clears the filter
- [ ] A "Clear" control appears when any filter is active and resets both search and tag filters
- [ ] Search, tag filter, and page number all compose correctly in the URL simultaneously
- [ ] If a search or tag filter returns no results, a clear "no results" message is shown — not a broken or empty grid
- [ ] If a featured post exists, it appears above the main grid in a visually distinct larger format — and is hidden when a search or tag filter is active
- [ ] Post grid shows three columns on desktop, two on tablet, one on mobile
- [ ] Each card shows: thumbnail (or placeholder), tags, title, excerpt, author, and date
- [ ] Clicking any card navigates to the correct post detail page
- [ ] Cards without a featured image show a clean placeholder — no broken image icons
- [ ] Pagination control appears when more posts exist than fit on one page
- [ ] Pagination previous/next links and page numbers work correctly and update the URL (`?page=N`)
- [ ] Page 2+ is not marked `noindex` — all paginated pages are crawlable
- [ ] Empty state is shown if no posts exist at all
- [ ] Page has correct `<title>` and meta description for SEO
- [ ] No horizontal overflow at any breakpoint

### Blog post detail

- [ ] Page renders at `/blog/[slug]` for any valid post slug
- [ ] A request for an invalid slug shows the site's 404 page
- [ ] Post title, author, publish date, and tags all appear in the header
- [ ] Featured image renders at full column width when present
- [ ] Article body renders all markdown elements correctly: headings, paragraphs, bold/italic, links, blockquotes, lists, code blocks, images
- [ ] Body text is constrained to a comfortable reading width — not stretching to full page width on wide screens
- [ ] Related posts section shows up to three other posts using the same card style as the gallery
- [ ] Related posts section is omitted if no other posts exist
- [ ] Page `<title>` uses `seo_title`, falling back to `title`
- [ ] Meta description uses `seo_description`, falling back to `excerpt_markdown`
- [ ] No horizontal overflow at any breakpoint
- [ ] Article body renders as static HTML, not client-side JavaScript

### General

- [ ] No page in the blog uses GSAP scroll-driven animations
- [ ] With reduced motion turned on in the OS, the pages display in their complete, fully visible state immediately
- [ ] All interactive elements are keyboard-accessible with visible focus states
- [ ] All images have appropriate `alt` text
