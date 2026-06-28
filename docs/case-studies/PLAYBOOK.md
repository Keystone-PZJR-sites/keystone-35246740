# Case study playbook

How to research, write, and ship a Keystone customer case study — end to end.
Following this produces four artifacts that stay in sync:

1. **A source dossier** — `docs/case-studies/<slug>.md` (data + verified quotes + image refs).
2. **The published study** — `data/case-studies/<slug>.ts` (a block-driven `CaseStudyContent`).
3. **Photos** — `public/media/case-studies/<slug>/` (real, downloaded assets),
   registered in `data/media.ts` under `MEDIA.caseStudies.<study>`.
4. **Wiring** — registry + the "Trusted by owners" rail + the relevant industry page.

The first real run (Palm Coast Zivel, Your Health Solutions, Bare Lúx Studio)
took most of a day. With this playbook the next one should take an hour or two.

---

## Prerequisites

- **Heroku CLI**, authenticated, with read access to `keystone-api-prod`.
  Quick check: `heroku pg:info -a keystone-api-prod`.
- **`imessage-exporter`** installed (https://github.com/reagentx/imessage-exporter),
  plus **Full Disk Access** granted to your terminal (see Phase 2).
- This repo, with deps installed (`npm install`) so you can typecheck/build.
- The Rails schema is the source of truth for table/column names:
  `proto-product-mono-repo/apps/api/db/schema.rb`. Tables evolve — when a query
  below errors on a column, re-check the schema (or `\d <table>` in psql).

> All `heroku pg:psql` calls below are **read-only** SELECTs. Never write to prod.

---

## Phase 0 — Pick the customer & find the account

Choose customers who (a) have real, flattering numbers, and (b) you have quotes
from (texts or email). Then find the `account_id` — everything keys off it.

```bash
heroku pg:psql -a keystone-api-prod -c \
  "SELECT id, name, created_at FROM accounts WHERE name ILIKE '%zivel%';"
```

Record the `account_id` and the `created_at` (the "live since" date). Use it as
`:id` in every query below.

---

## Phase 1 — Gather the quantitative data

Run these against prod and drop the results straight into the dossier. **Only
numbers that come out of these queries may appear in the published study.**

### 1a. Leads, hot leads, booked, purchased

`contacts` are the leads. `ai_assessment` (jsonb) holds the AI front desk's
read; `manually_marked_booked` / `manually_marked_purchased` are the outcome
flags.

```sql
-- Inspect what the AI priority values actually are for this account first:
SELECT DISTINCT ai_assessment->'priority'->>'value' AS priority, COUNT(*)
FROM contacts WHERE account_id = :id GROUP BY 1 ORDER BY 2 DESC;

-- Then the headline funnel:
SELECT
  COUNT(*)                                                      AS leads,
  COUNT(*) FILTER (WHERE ai_assessment->'priority'->>'value'
                         IN ('hot','high','urgent'))            AS hot,
  COUNT(*) FILTER (WHERE manually_marked_booked)                AS booked,
  COUNT(*) FILTER (WHERE manually_marked_purchased)             AS purchased,
  MIN(created_at)::date                                         AS first_lead
FROM contacts
WHERE account_id = :id;
```

> The "hot" definition is fuzzy by design — if the priority values vary, report
> a range (e.g. "42–52 hot") rather than over-precise single number.

### 1b. Lead sources (for the bar chart)

Source attribution lives in `contacts.metadata` and/or `contact_ad_interactions`
(ad-attributed) and `meta_raw_leads` (Meta lead forms). Start with metadata:

```sql
SELECT metadata->>'source' AS source, COUNT(*)
FROM contacts WHERE account_id = :id
GROUP BY 1 ORDER BY 2 DESC;
```

### 1c. AI follow-up volume

`communications` join to contacts (they carry `contact_id`, not `account_id`).
Inspect the enums for this account before counting:

```sql
SELECT type, direction, sender_type, communication_type, COUNT(*)
FROM communications c JOIN contacts ct ON ct.id = c.contact_id
WHERE ct.account_id = :id
GROUP BY 1,2,3,4 ORDER BY 5 DESC;

-- Outbound AI texts (adjust the filters to the enums you just saw):
SELECT COUNT(*) AS ai_texts,
       COUNT(DISTINCT c.contact_id) AS leads_reached
FROM communications c JOIN contacts ct ON ct.id = c.contact_id
WHERE ct.account_id = :id
  AND c.direction = 'outgoing'
  AND c.sender_type ILIKE '%ai%';
```

### 1d. Ads & website metrics (the time-series)

All numeric, dated metrics — Meta ad impressions/clicks/spend, website page
views, unique visitors, portal sign-ups — live in `report_data_points`, keyed by
`metric_types.code`. Discover the codes, then sum a window:

```sql
-- What metrics exist?
SELECT id, code, display_name, unit FROM metric_types ORDER BY code;

-- Totals for a date window (use the campaign window for ad metrics):
SELECT mt.code, mt.display_name, mt.unit, SUM(rdp.value) AS total
FROM report_data_points rdp
JOIN metric_types mt ON mt.id = rdp.metric_type_id
WHERE rdp.account_id = :id
  AND rdp.period_date BETWEEN '2026-01-01' AND CURRENT_DATE
GROUP BY mt.code, mt.display_name, mt.unit
ORDER BY mt.code;
```

For ad spend efficiency, also grab the campaign window from `ad_entities`
(`start_time` / `stop_time`) so you can describe "≈6 weeks of ads".

### 1e. Reviews

```sql
SELECT COUNT(*) AS reviews, ROUND(AVG(rating)::numeric, 1) AS avg_rating
FROM reviews WHERE account_id = :id;

-- Pull the best ones for optional pull-quotes:
SELECT reviewer_name, rating, content_markdown
FROM reviews WHERE account_id = :id ORDER BY rating DESC, created_at DESC;
```

### 1f. Content & social cadence

```sql
SELECT COUNT(*) AS blog_posts FROM blog_posts
WHERE account_id = :id AND status = 'published';

SELECT platform, COUNT(*) AS posts FROM social_posts
WHERE account_id = :id AND status = 'published'
GROUP BY platform ORDER BY 2 DESC;
```

### 1g. Business facts

```sql
SELECT * FROM company_informations WHERE account_id = :id;
```

Use this for category, tagline, location, and links (Instagram/Facebook).

---

## Phase 2 — Gather owner quotes

Real owner voice is what makes the study credible. Two sources: texts and email.

### 2a. iMessage (preferred when available)

1. **Grant Full Disk Access**: System Settings → Privacy & Security → Full Disk
   Access → enable your terminal app (or Cursor, if using its integrated
   terminal) → **fully quit and reopen** the app.
2. **Export** (Desktop is TCC-protected — export to `/tmp`, not `~/Desktop`):
   ```bash
   imessage-exporter -f txt -o /tmp/imessage_export
   ```
3. **Find the thread** by the owner's phone number — the file is named
   `+1XXXXXXXXXX.txt`. (Get numbers from the owner's contact / the account.)
4. **Read it** and pull verbatim quotes. Note **who said what** — threads mix the
   owner and the Keystone team. Only attribute the owner's own words to the owner.

### 2b. Email (fallback / supplement)

If there are no texts, the owner's Gmail thread works the same way — pull
verbatim quotes and attribute carefully.

### 2c. Privacy (important)

- **Do not commit raw transcripts** (`+1….txt`) — they contain personal contact
  info and unrelated messages. Keep them in a scratch dir (e.g. a local
  `case-studies-temp/`), not in the repo.
- Only the **curated quotes** (with dates/context) go into the dossier, which is
  what gets committed.

---

## Phase 3 — Gather images

Prefer the customer's **own** imagery (their site, Google Business Profile, the
account photos) over generic stock — it's authentic and on-brand.

```sql
-- Account photos (verified working): bucket/host varies by account.
SELECT p.id, p.title, p.large_url
FROM photos p JOIN account_photos ap ON ap.photo_id = p.id
WHERE ap.account_id = :id AND p.large_url IS NOT NULL
ORDER BY p.id;
```

Other good sources surfaced by that query: the customer's live website CDN
(e.g. `cdn.prod.website-files.com/...` for Webflow sites) and GBP photos
(`lh3.googleusercontent.com/...`). Avoid short-lived Meta/Instagram CDN URLs.

All static media lives under `public/media/`, organized by function, and is
referenced through the central registry in `data/media.ts` — code never
hardcodes an asset path (see the "Public Asset Naming & The Media Registry"
rule). Case-study photos go under `public/media/case-studies/<slug>/`.

Download into the repo, dedupe, and sanity-check:

```bash
mkdir -p public/media/case-studies/<slug>
cd public/media/case-studies/<slug>
curl -sL -o hero.jpg "https://…"
curl -sL -o owner.jpg "https://…"
# …
md5 *.jpg          # spot duplicates (GBP often returns the same file twice)
file *             # confirm real images + see dimensions; delete tiny/broken ones
```

Then add a `caseStudies.<study>` block to `data/media.ts` mapping each kept
file to a `MediaImage` descriptor, and reference `MEDIA.caseStudies.<study>.<key>.src`
from the study data — never the literal path. Delete (don't register) any
downloaded file the study doesn't end up using.

Pick by aspect ratio for where each lands in the template:

- **Hero** → a wide/landscape image (rendered ~16:9).
- **Prose / quote side media** → portrait (rendered ~4:5).
- **Gallery** → any; 3 reads best.

---

## Phase 4 — Write the dossier

Create `docs/case-studies/<slug>.md`. Mirror the existing dossiers
(`palm-coast-zivel.md`, etc.). Suggested skeleton:

```markdown
# <Business> — Case Study Source Dossier

> Real data pulled from `keystone-api-prod` (account_id = <id>) on <date>.

## Business snapshot
- Business name, owner/spokesperson (confirm spelling AND gender — see QA),
  location, category, tagline, socials, "Keystone live since" date.

## Headline results (real, from prod)
- Leads / hot / booked / purchased
- AI follow-up texts + distinct leads reached
- Meta ads: impressions · clicks · spend (+ window)
- Website: page views · unique visitors · sign-ups
- Social posts, blog posts, reviews (count + avg)

## Tools Keystone runs for them
## Before / after framing
## Real customer reviews (for optional pull quotes)
## High-quality images (the URLs you downloaded)

---

## Owner text/email transcript — <Name>
> Verbatim owner quotes, with dates/context. (Raw export NOT committed.)
```

---

## Phase 5 — Author the published study

Studies are **block-driven** `CaseStudyContent` objects. The model and all block
types live in `design-system/patterns/case-studies/types.ts`; the long-form
template renders `hero` + an ordered `blocks` array. Copy an existing study
(`data/case-studies/palm-coast-zivel.ts`) as your starting point.

### Block types (cheat sheet)

| `type` | Renders | Use for |
| --- | --- | --- |
| `tldr` | Raised card: lede + checklist + KPI row | The scannable opener |
| `prose` | Heading + paragraphs, optional sticky side photo + inline `callout` | Narrative sections |
| `stat-band` | Dark band of oversized KPIs | Headline numbers |
| `comparison` | Before/after columns | "How it changed" |
| `chart` | Token-driven horizontal bar chart | Funnels, lead sources, comparisons |
| `callout` | Highlighted aside (`insight` / `tip` / `quote` / `metric`) | Pull a stat or quote |
| `quote` | Big pull quote + photo + result KPIs | The emotional peak |
| `gallery` | Responsive photo grid | "Inside the business" |
| `timeline` | Vertical dated rollout | "How it came together" |
| `tools` | Grid of tool cards | "The stack" |

### Recommended order (what we shipped)

`tldr` → `prose` (the business, + quote callout) → `stat-band` → `comparison`
→ `tools` → `chart` → `prose` (how it works, + insight callout) → `callout`
(metric) → `timeline` → `quote` → `gallery` → `prose` (where they are now, +
takeaway callout). Then the top-level `closing` CTA.

### Skeleton

```ts
import type { CaseStudyContent } from '@/design-system/patterns/case-studies';
import { MEDIA } from '@/data/media';

const IMG = MEDIA.caseStudies.<study>; // reference IMG.<key>.src, never a literal path

export const <CONST_NAME>: CaseStudyContent = {
  slug: '<slug>',
  metaTitle: '…',
  metaDescription: '…',
  card: { summary, stats: [3], person, business, media: { image, alt } },
  hero: { eyebrow, title, subtitle, meta: [3 chips], stats: [3], media },
  blocks: [
    { type: 'tldr', summary, takeaways: ['…'], stats: [3] },
    { type: 'prose', id, eyebrow, title, body: ['…'], media, mediaSide, callout },
    { type: 'stat-band', eyebrow, title, description, stats: [4-5] },
    { type: 'comparison', eyebrow, title, before, after },
    { type: 'tools', eyebrow, title, description, items: [{ name, detail }] },
    { type: 'chart', eyebrow, title, caption, bars: [{ label, value, display, highlight? }], footnote },
    // …callout / quote / timeline / gallery as above
  ],
  closing: { title, action: { label, href: '/get-in-touch' } },
};
```

Chart note: `value` sets bar width (relative to the largest bar); `display` is
the label shown (e.g. `'94,493'`); set `highlight: true` on the hero datapoint.

---

## Phase 6 — Register & wire it up

1. **Register** in `data/case-studies/index.ts` — import the const and add it to
   `ALL`. (The gallery, `/case-studies/[slug]` route, and "other stories" all
   read from here automatically.)
2. **"Trusted by owners" rail** — add a linked card to
   `CASE_STUDY_TESTIMONIAL_CARDS` in `data/shared-sections.ts`. Each card needs
   an `action: { label: 'Read the story', href: '/case-studies/<slug>' }`. This
   rail is shared across service pages, pricing, and how-it-works.
3. **Industry page** — the relevant industry (e.g. `HEALTH_WELLNESS` in
   `data/industry-pages/index.tsx`) points its `testimonials.cards` at
   `CASE_STUDY_TESTIMONIAL_CARDS`, so it picks up new cards automatically.

---

## Phase 7 — Verify & QA

```bash
npx tsc --noEmit          # types
npx next lint             # lint
npx next build            # confirms all /case-studies/[slug] prerender + images resolve
npx next start -p 4123    # preview, then screenshot each new page top-to-bottom
```

### Accuracy & voice rules (non-negotiable)

- **Only real numbers.** Every stat must trace to a Phase 1 query. No invented
  metrics, no rounding that flatters.
- **Verbatim quotes, correctly attributed.** Don't put the team's words in the
  owner's mouth, and vice-versa. Keep the owner's own quotes exact — including
  when they use pronouns about a third party (e.g. a lead).
- **Confirm the owner's name spelling _and_ gender** — never infer gender from a
  first name. (Lesson learned: "Kelly" was a man.) Get it from the owner directly
  or someone who knows them.
- **Don't over-claim photos.** If you're not certain who's pictured, use generic
  alt text ("A consultation at <Business>") rather than naming/identifying a
  person.
- **Don't claim causation you can't support.** Pre-Keystone revenue an owner
  mentions isn't a Keystone result — tie claims to what Keystone actually did.

---

## File map

| Artifact | Path |
| --- | --- |
| Content model + block types | `design-system/patterns/case-studies/types.ts` |
| Block components | `design-system/patterns/case-studies/CaseStudy*.tsx` |
| Template (hero + block renderer) | `design-system/patterns/case-studies/CaseStudyTemplate.tsx` |
| Styles | `design-system/styles/patterns/case-studies.css` |
| Study data | `data/case-studies/<slug>.ts` + `index.ts` |
| Shared proof rail | `data/shared-sections.ts` (`CASE_STUDY_TESTIMONIAL_CARDS`) |
| Industry wiring | `data/industry-pages/index.tsx` |
| Photos | `public/media/case-studies/<slug>/` |
| Media registry | `data/media.ts` (`MEDIA.caseStudies.<study>`) |
| Dossiers | `docs/case-studies/<slug>.md` |
