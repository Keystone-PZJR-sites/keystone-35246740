# Spec 038 — Blog Redesign (Gallery + Post Template)

**Status:** Implemented
**Type:** A visual + structural redesign of the two existing blog pages — the gallery (`/blog`) and the post detail (`/blog/[slug]`) — plus the new reusable `patterns/blog` pieces they need. This is a redesign of a live, working blog: the data, routes, API calls, search, tag filtering, and pagination all already exist (spec 009) and are kept. Only the layout and components change.
**Reference:** Six screenshots attached in chat. Gallery (three): a centered light page header; a large full-width featured card (image on one side, eyebrow + title + excerpt + meta on a colored gradient panel on the other); a row of three compact highlight cards with a small side thumbnail; a "Most Recent" stack of wide horizontal rows; a full-bleed green "Explore topics" band with topic pills; then one editorial section per topic (a left rail with the topic name, a blurb, and a "View all" action, beside a feature post and two smaller posts); then a full-bleed green closing call-to-action above the footer. Post detail (three): a light header with a breadcrumb (Blog / topic), a large title, and a read-time · date meta line; a full-width featured image; a two-column reading layout with the markdown article on the left and a sticky right sidebar (author byline, an "In this article" table of contents, and a promo card); the article body containing callouts, data charts, and sub-headings that live inside the markdown; an author bio card at the end; and the same full-bleed green closing call-to-action above the footer. No Figma; built per the "Reference-Driven Components" workflow in the rules.
**Proposed names:** New `patterns/blog` pieces — gallery: `BlogGalleryHeader`, `BlogFeatureHero`, `BlogHighlightCard`, `BlogRecentList` (with `BlogRecentRow`), `BlogTopicBand`, `BlogCategorySection`, `BlogAllTopics`; post detail: `BlogBreadcrumb`, `BlogPostSidebar` (composing `BlogArticleToc` + a universal `BlogPromoCard`), `BlogAuthorBio` — plus tag utilities (`topTagsByCount`, `postsForTag`) and a markdown heading extractor (`extractHeadings`) that powers the table of contents. Reuses the existing `BlogPostCard`, `BlogPagination`, `BlogFilterBar`, and the spec-037 `CtaBand` (full-bleed green). All names open to a rename.

---

## Why a redesign

The reference shows an editorial topic-led gallery: it leads with a featured story, surfaces the most recent posts, then organizes everything by a small set of topics. The reference only has **five** topics, so it can give each one a rich, hand-built section. Our blog has a **flat list of many tags**, not five curated topics. So the redesign:

- Gives the **top five tags by article count** the full editorial treatment — the green topic band and one rich per-topic section each (the reference's whole topic experience).
- Adds a **separate "All topics" section below** that lists **every** tag, so nothing is hidden just because it is not a top-five tag. This is the key adaptation from the reference to our data.

Counts, ordering, topics, posts, images, and copy are all derived from the live post data. The pages hardcode nothing.

---

## Scope

### In scope

- A redesigned `/blog` gallery with two modes:
  - **Index mode** (no `q`/`tag` filter): the full editorial layout — header, featured hero, recent list, top-five topic band, one rich section per top-five topic, an "All topics" section, and a closing CTA band.
  - **Filtered mode** (`?tag=…` or `?q=…`): a focused results view — a results heading, the existing post-card grid, pagination, and a clear control. This is what every "View all" and tag link leads to, and it reuses the existing filter/search/pagination machinery unchanged.
- A redesigned `/blog/[slug]` post template in the same editorial language: a light header (breadcrumb, title, read-time · date), a full-width featured image, a two-column body (markdown article + sticky sidebar with author byline, an "In this article" TOC derived from the markdown, and a universal promo card), an author bio card, a topic band, and a closing CTA band.
- New reusable `patterns/blog` components for the blocks above.
- Tag utilities (top-N tags by article count, posts belonging to a tag) and a markdown heading extractor that powers the table of contents and applies matching anchors to the rendered body.
- A single universal, hardcoded promo card on the post sidebar (its copy is not in our data); everything else on both pages is derived from the live post data.
- Registration of the new components in the `/styles` catalog.

### Out of scope

- The backend, the API endpoints, the data model, and what fields a post has — all unchanged from spec 009.
- New routes or archive pages. Topic / "View all" links reuse the existing `/blog?tag=<slug>` filtered view; no `/blog/tag/[slug]` route is added.
- Authoring or curating which tags are "topics" — the top five are computed from article counts, not hand-picked.
- The inner-page chrome — site nav, footer, lead-capture modal — which keeps coming from the standard inner-page shell.
- Comments, sharing buttons, author archive pages, inline newsletter signup.

---

## Visual design

Exact colors, sizes, and spacing are chosen at implementation against our tokens. The screenshots are the visual anchor, but the result must read as Keystone — our cream and ink surfaces, brand orange, ink-green and mint, our display and body type, our eyebrow treatment — not as the reference site. In particular the reference's blue featured panel and bright kelly-green bands map to **our** brand gradients and **our** accent green; no new brand hue is introduced.

The mobile↔desktop hand-off is the app-wide **985px** boundary (the "Responsive-Native" rule), not a component-specific cutoff.

### Gallery — page header

A compact, centered header on a light page surface (our cream), sitting directly below the nav. A short display title and one line of muted supporting copy beneath it. Unlike the current maroon blog header, this reads as the top of an editorial page, not a chrome band. Generous but not full-viewport vertical space, then it hands off to the content.

### Gallery — featured hero

The newest featured post (the post flagged `featured`, else the most recent) in one wide card spanning the content column. One side is the post's image filling a tall rounded area; the other is a colored gradient panel — **a brand gradient from our tokens**, not the reference's blue — carrying an eyebrow (the post's leading topic), the title, a short excerpt, and a meta line (author · reading time · date). The whole card is a single link to the post. Below 985px the two halves stack — image on top, panel beneath — and the type steps down.

### Gallery — highlight row

Directly beneath the featured hero, a row of three compact cards drawn from the next most recent posts. Each is a horizontal card: a small rounded thumbnail to one side, and beside it a topic eyebrow, a two-to-three-line title, and a small meta line (reading time · date). Each card is a single link. Three across at ≥985px; they stack to one column below it.

### Gallery — "Most Recent"

A left-aligned section heading ("Most Recent") above a vertical stack of wide rows — the most recent posts after the ones already shown above. Each row is a full-width horizontal card: a rounded thumbnail on the left, then a topic eyebrow, the title, and a meta line, with comfortable separation between rows. Each row is a single link. Below 985px the thumbnail shrinks and the row stays horizontal, or stacks if space is tight — nothing clips.

### Gallery — topic band ("Explore topics")

A full-bleed band in **our accent green** (the same green the closing CTA band uses), spanning edge to edge. A centered short heading ("Explore topics") above a centered, wrapping row of **pills for the top five tags by article count**. Each pill carries the tag name (a small leading glyph is optional) and links to that tag's section below (an in-page anchor) or to its filtered view — implementation picks the more useful of the two; the default is to jump to the rich section below. White / light text reads at AA over the green.

### Gallery — per-topic sections (top five)

One section per top-five tag, in article-count order. Each section is a two-part editorial block:

- **A left rail** — the tag name as a section heading, the tag's own description as a short blurb (omitted cleanly if the tag has none), and a "View all" action linking to that tag's filtered gallery (`/blog?tag=<slug>`).
- **A post group** — the posts carrying that tag: one feature post shown larger (image + topic + title + meta) beside two smaller stacked posts (compact, side-thumbnail). If a tag has fewer than three posts, only what exists is shown, and the layout holds without gaps.

Below 985px the left rail sits above its post group, and the post group collapses to a single column. A subtle divider or rhythm separates one topic section from the next.

### Gallery — "All topics"

The key adaptation for our data. A section, clearly below the five rich topic sections, headed with a short label ("All topics" / "Browse every topic"). Beneath it, **every** tag rendered as a chip in a wrapping set, each chip linking to its filtered gallery (`/blog?tag=<slug>`). Optionally each chip shows its article count. This guarantees the full flat tag list is reachable even though only five tags get the rich treatment. If there are five or fewer tags total, this section may be omitted (the rich sections already cover them).

### Gallery — closing CTA band

The existing spec-037 closing CTA band, full-bleed brand-green, one centered headline and one light action, flush above the footer.

### Gallery — filtered mode

When a `tag` or `q` filter is active, the editorial layout is replaced by a focused results view: a results heading that names the active filter ("Posts tagged 'Marketing'" or "Results for '…'"), the existing post-card grid, the existing pagination, and a clear control that returns to the full gallery. The featured hero, recent list, topic band, and topic sections are suppressed in this mode. Search and tag filtering behave exactly as they do today (spec 009): URL-driven, server-filtered, shareable, indexable.

### Post detail — header

A light editorial header on the page surface (our cream), directly below the nav — not the old maroon band. It carries, in order: a **breadcrumb** ("Blog / <leading topic>", each segment a link — Blog to `/blog`, the topic to its filtered gallery), the post **title** as the page's single largest text, and a compact **meta line** (estimated reading time · publish date). The author is not repeated inline here — the byline lives in the sidebar and the full bio at the end.

### Post detail — featured image

A full-width featured image below the header, spanning the content width above the two-column body (omitted with no gap when absent).

### Post detail — two-column reading layout

Below the featured image the page is two columns at ≥985px: a wide **article column** on the left and a narrower **sticky sidebar** on the right.

**Article column** — the rendered markdown body in a comfortable reading measure, with the existing prose treatment on our type and color tokens: headings, paragraphs, lists, blockquotes (orange left rule), inline + block code, links, and images. The reference body also contains a "Key takeaways" callout box, embedded data charts, and "What the data says / Why it matters" sub-headings — **these all live inside the post's markdown, which we do not control**, so they are rendered and styled generically by the prose rules (callout boxes are just blockquotes, charts are just images), not parsed into bespoke components. We do not invent structure the markdown does not carry.

**Sidebar (`BlogPostSidebar`)** — a sticky column holding three stacked pieces:

- **Author byline** — the post author's avatar (or initial), name, and role/title line, derived from the author data.
- **"In this article" (`BlogArticleToc`)** — a table of contents listing the article's section headings as in-page anchor links. This *is* data-driven: the headings are extracted from the post's markdown and the same heading anchors are applied to the rendered body so the links jump correctly. If the post has too few headings to be useful, the TOC is omitted cleanly.
- **Promo card (`BlogPromoCard`)** — a small call-to-action card. Its copy is **not** in our post data, so it is a single **universal, hardcoded** Keystone promo (one headline, one supporting line, one action that opens the standard lead-capture / "get started" flow). It is the same on every post for now; a later spec can make it data-driven.

Below 985px the sidebar is not sticky: the byline sits under the header meta, the TOC is collapsed or omitted, and the promo card drops below the article body so the reading column gets the full width.

### Post detail — author bio + closing CTA

- **Author bio (`BlogAuthorBio`)** — at the end of the article, a card with the author's avatar, name, a short bio (from the author's `bio_markdown`), and optional "Follow us" social links (from company info when available, otherwise omitted). Fully data-driven; omitted entirely when the post has no author.
- **Closing CTA** — the full-bleed green CTA band, flush above the footer (no topic band on the article page — that keeps the post view faithful to the reference, which ends on the bio then the closing band).

---

## Animation behavior

- The blog is content-first: no scroll-driven entrance animations, no parallax, no autoplaying media (consistent with spec 009).
- Cards, rows, pills, and chips show a subtle hover/focus shift (opacity, border, or background) to signal they are links; nothing lifts dramatically.
- **Reduced motion:** all pages render in their complete, fully visible state immediately; hover transitions are suppressed.

---

## Content & data sources

All content is fetched server-side before render, exactly as today. No new endpoints.

| Element | Source |
|---|---|
| All posts (gallery + relations + counts) | `GET /public/blog_posts` |
| Single post | `GET /public/blog_posts/by_slug/:slug` |
| Featured hero post | The post with `featured: true`, else the most recent by `published_at` |
| Recent / highlight / "Most Recent" posts | Most recent by `published_at`, after the featured post, de-duplicated across blocks |
| Top-five topics | The five `blog_post_tags` with the most posts across the full list, ties broken by name |
| Topic name / blurb / link | Tag `name`, tag `description`, and `/blog?tag=<slug>` |
| Posts in a topic section | Posts whose `blog_post_tags` include that tag, most recent first |
| All topics | Every unique tag across all posts (existing `extractUniqueTags`), optionally with per-tag counts |
| Card thumbnail | Post featured image via existing `getFeaturedImage` (clean placeholder when absent) |
| Eyebrow / topic on a card | The post's leading tag `name` |
| Meta | `blog_post_authors[0].name`, `published_at` (via `formatDate`), reading time (via `estimateReadingTime`) |
| Post body | `content_markdown` rendered as static HTML |
| Breadcrumb topic | The post's leading tag (`name` + `slug`) |
| "In this article" TOC | Section headings extracted from `content_markdown` (data-driven) |
| Sidebar / bottom author | `blog_post_authors[0]` — `name`, role line, `bio_markdown`, photo |
| Promo card copy + action | **Universal, hardcoded** Keystone CTA (not in post data) |
| Author social links | Company info (`getCompanyInformation()`) when available, else omitted |
| Post SEO | `seo_title`/`seo_description` with the existing fallbacks |

No copy, image, count, topic, or link is hardcoded in the components — every value comes from the post data above.

---

## New utilities, components & tokens

### Utilities (`patterns/blog/utils.ts`)

- **`topTagsByCount(posts, n)`** — returns the `n` tags with the most posts, each with its post count, ordered by count then name. Built on the existing tag iteration.
- **`postsForTag(posts, slug)`** — returns the posts carrying a given tag slug, most recent first.
- **`extractHeadings(markdown)`** — returns the article's section headings (text + a stable slug id) from the post's markdown, used to build the TOC; the same slug rule is applied to the rendered headings so the anchors line up.

Existing `getFeaturedImage`, `formatDate`, `estimateReadingTime`, `extractUniqueTags`, `filterPosts`, and `getPageNumbers` are reused unchanged.

### Components (`patterns/blog/`)

Gallery: `BlogGalleryHeader`, `BlogFeatureHero`, `BlogHighlightCard`, `BlogRecentList` (+ `BlogRecentRow`), `BlogTopicBand`, `BlogCategorySection`, `BlogAllTopics`. Post detail: `BlogBreadcrumb`, `BlogPostSidebar` (composing `BlogArticleToc` + `BlogPromoCard`), `BlogAuthorBio`. Each is presentational and prop-driven; all reuse the `Heading`, `Eyebrow`, and `Text` primitives, the existing tag/meta treatments, and `getFeaturedImage` for imagery. `BlogPostCard`, `BlogPagination`, and `BlogFilterBar` are reused (the post card may gain light restyling but keeps its props). The closing band is the spec-037 `CtaBand` in its full-bleed green treatment. The article body keeps rendering through `react-markdown`; heading anchors are added so the TOC links resolve.

### Tokens

No new brand hues. The featured hero's gradient panel reuses an existing brand/ink gradient token; the topic band and closing CTA band reuse the existing accent-green band gradient (spec 037). A new shared token is added **only** if no existing gradient reads correctly at the featured-panel scale — and if so it is one shared token in the gradient foundation, not a one-off. All surfaces, borders, text, eyebrow, tag, and pill treatments use existing roles.

---

## Accessibility

- Each card, row, highlight, pill, and chip is a single focusable link with a descriptive accessible name derived from the post title or tag name, and a visible focus state.
- One `<h1>` per page: the gallery header title on the gallery, the post title on the detail page. Section titles ("Most Recent", each topic, "All topics", "More posts") are `<h2>`; card titles are lower.
- Text over the featured gradient panel, the green topic band, and the green CTA band meets WCAG AA at the chosen sizes.
- Topic pills and tag chips are real links/controls operable by keyboard; nothing depends on hover alone.
- Images carry meaningful `alt` from the photo's `alt_text`; decorative placeholders and backgrounds are hidden from assistive tech.
- The filtered-mode results heading announces the active filter so the change of context is clear.

---

## Acceptance criteria

- [x] `/blog` with no filter renders, in order: centered light header, featured hero, three-card highlight row, "Most Recent" list, green top-five topic band, one rich section per top-five topic, an "All topics" section listing every tag, and a full-bleed green closing CTA band — between the standard nav and footer.
- [x] The featured hero is the `featured` post (else the most recent), shown as an image beside a brand-gradient panel with eyebrow, title, excerpt, and meta, linking to the post.
- [x] The highlight row and "Most Recent" list show the next most recent posts with no post duplicated across the featured / highlight / recent blocks.
- [x] The top-five topics are the five tags with the most posts (ties broken by name), and the same five drive both the green topic band pills and the rich per-topic sections.
- [x] Each topic section shows the tag name, the tag's description (cleanly omitted when empty), a "View all" link to `/blog?tag=<slug>`, and that tag's posts as one feature + up to two smaller posts, holding its layout when a tag has fewer than three.
- [x] The "All topics" section lists **every** tag as a chip linking to `/blog?tag=<slug>`; the full flat tag list is reachable from the gallery.
- [x] Visiting `/blog?tag=<slug>` or `/blog?q=<term>` shows the focused results view (results heading, post-card grid, pagination, clear control) and suppresses the editorial blocks; search, tag filtering, and pagination behave exactly as before and stay URL-driven and indexable.
- [x] `/blog/[slug]` renders the redesigned post: a light header with a breadcrumb (Blog / leading topic, both links), the title (page H1), and a read-time · date meta line; a full-width featured image; a two-column body with the markdown article and a sticky sidebar (author byline, an "In this article" TOC whose links jump to the matching body headings, and a universal hardcoded promo card); an author bio card; and a full-bleed green closing CTA band. Invalid slugs 404; SEO fields and fallbacks are unchanged.
- [x] The TOC is derived from the post's own markdown headings and is omitted cleanly when there are too few; callouts, charts, and sub-headings inside the body are rendered from the markdown as-is (not bespoke components), since that content is not under our control.
- [x] At ≥985px the multi-column blocks (featured hero, highlight row, topic sections) are multi-column; below 985px they stack and the reading column stays comfortable, with no horizontal overflow at 390px.
- [x] Under reduced motion every page renders complete and fully visible immediately, with hover transitions suppressed.
- [x] All text over the gradient panel and the green bands passes AA; every card/row/pill/chip is a keyboard-focusable link with a visible focus state.
- [x] The new `patterns/blog` components appear in the `/styles` catalog (Sections → Blog). No new gradient token was needed — the featured panel and promo reuse `--gradient-ink`, and the bands reuse `--gradient-band-accent`.
