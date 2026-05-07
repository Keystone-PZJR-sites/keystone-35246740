# Spec 010 — Legal Pages: Terms of Service & Privacy Policy

**Status:** Draft  
**Figma file:** `XRbD11WIevI5szRFiRrguZ`  
**Figma nodes:** TBD — designer to add layout frames for inner document pages

> Note: These pages are intentionally minimal. They exist to fulfill a legal requirement, not to market. The design should be clean, readable, and consistent with the rest of the site — nothing more.

---

## What this covers

Two pages:

- `/terms-of-service`
- `/privacy-policy`

Both are linked from the home page: from the lead capture modal's consent checkbox and from the footer's CTA button area. They share a common layout and are built from a single shared component.

---

## Scope

### In scope

- Both legal pages using the inner-page shell from spec 009 (InnerNav, OversizedFooter, lead capture modal)
- Page header with title, company name, and effective date
- Markdown body fetched from the backend API and rendered with the site's prose styling
- Server-side substitution of placeholder tokens in the markdown before render
- SEO metadata for each page
- Responsive behavior at all three breakpoints

### Out of scope

- Any other pages
- Custom content editing (content comes from the backend API)
- Printing or PDF export

---

## Shell

Both pages use the inner-page shell defined in spec 009. The navigation bar, footer, and lead capture modal are all provided at the layout level — the page files do not add them.

---

## Page design

Both pages are identical in structure and differ only in their title and body content.

### Page header

The same dark maroon header block used by all inner pages. It reads as a continuous band with the InnerNav above it.

**Title:** The document name in FK Screamer Bold, the site's warm orange. The same typographic treatment as other inner page titles, sized for a utility document rather than a display headline.

**Subtitle:** The company name in FK Grotesk Neue Regular, in a muted warm tone. Identifies the issuing entity.

**Effective date:** A small label below the subtitle. Reads "Effective [year]" where the year is derived server-side. FK Grotesk Neue Regular, same muted warm tone as the subtitle.

### Body content

The document text stored in the backend API, rendered as markdown. Uses the same prose styling as the blog post article body:

- FK Grotesk Neue Regular for body paragraphs
- FK Grotesk Neue for headings within the document
- FK Grotesk Mono for any inline code
- Orange accent color for links
- Orange left-border treatment for blockquotes

The body text is constrained to a comfortable reading column, centered on the page — same width as blog article bodies.

If the API returns no content for a page, a short placeholder message is shown in place of the body.

### Empty state

If the API returns no markdown for a page, the body area shows a short centered message: the document is being finalized and will appear soon.

---

## Shared layout component

Both pages share a single `LegalDocumentPage` component that accepts the title, company name, effective date, and processed markdown content as props. The page files are responsible only for fetching and processing data; all rendering is delegated to the component.

---

## Data sources

| Element | Source |
|---------|--------|
| Page title | Hardcoded per page ("Terms of Service" / "Privacy Policy") |
| Company name | `company_name` from `getCompanyInformation()` |
| Effective date | Current year derived server-side |
| Terms body | `terms_of_service_markdown` from `getCompanyInformation()` |
| Privacy body | `privacy_policy_markdown` from `getCompanyInformation()` |
| Placeholder values | `primary_email`, `primary_phone` from `getCompanyInformation()`; `email` from the primary entry in `getLocations()` |

The markdown body contains placeholder tokens (`{{business.name}}`, `{{business.email}}`, etc.) that must be replaced with real values server-side before the content is passed to the rendering component.

---

## Shared inner-page header system

The dark maroon page header zone is not blog-specific — it is shared by all inner pages. The CSS classes for this zone live in `styles/sections/inner-nav.css` alongside the nav styles, and are named with the `inner-page-` prefix. The blog pages and the legal pages use these same classes. Any future inner page does the same.

---

## Responsive behavior

**Desktop (≥ 1280px):** Reading column constrained to a comfortable width, centered.  
**Tablet (768px – 1279px):** Same column with slightly wider proportional padding.  
**Mobile (< 768px):** Full available width with comfortable side padding. No horizontal overflow.

---

## SEO

- Page `<title>`: "Terms of Service | [Company Name]" or "Privacy Policy | [Company Name]", with a fallback if the company name is not available
- Meta description: a short fixed description for each page
- Both pages are fully indexable

---

## Acceptance criteria

- [ ] Both pages render at `/terms-of-service` and `/privacy-policy`
- [ ] Both pages display the InnerNav at the top and the OversizedFooter at the bottom
- [ ] Page header matches the dark maroon inner-page header treatment from spec 009
- [ ] Title appears in FK Screamer Bold, orange, uppercase
- [ ] Company name and effective year appear below the title in a muted warm style
- [ ] Markdown body renders correctly: headings, paragraphs, bold/italic, links, lists, blockquotes
- [ ] All placeholder tokens are substituted with real values before rendering
- [ ] Body text is constrained to a comfortable reading column — not full-page-width on wide screens
- [ ] If a page's markdown is empty, an appropriate message is shown in place of the body
- [ ] Page `<title>` and meta description are set correctly for each page
- [ ] No horizontal overflow at any breakpoint
