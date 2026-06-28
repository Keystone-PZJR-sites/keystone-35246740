# Case study source dossiers

> **Building a new case study? Start with the [PLAYBOOK](./PLAYBOOK.md)** — the
> full end-to-end process for gathering data, quotes, images, and shipping the study.

Source material for the published Keystone case studies. Each dossier holds the
real data (pulled from the Keystone production CRM), the verified owner quotes
(from text/email threads), business facts, and image references used to author
the corresponding story. Keep these in sync with the published studies so the
numbers and quotes on the site stay verifiable.

| Dossier | Published study | Story data | Photos |
| --- | --- | --- | --- |
| [palm-coast-zivel.md](./palm-coast-zivel.md) | `/case-studies/palm-coast-zivel` | `data/case-studies/palm-coast-zivel.ts` | `public/media/case-studies/palm-coast-zivel/` |
| [your-health-solutions.md](./your-health-solutions.md) | `/case-studies/your-health-solutions` | `data/case-studies/your-health-solutions.ts` | `public/media/case-studies/your-health-solutions/` |
| [bare-lux-studio.md](./bare-lux-studio.md) | `/case-studies/bare-lux-studio` | `data/case-studies/bare-lux-studio.ts` | `public/media/case-studies/bare-lux-studio/` |

## Provenance

- **Quantitative data:** Keystone production CRM (`keystone-api-prod`), pulled
  2026-06-28 — leads, hot-lead flags, bookings, AI follow-up volume, Meta ad
  impressions/clicks/spend, website analytics, social/blog counts, and reviews.
- **Owner quotes:** verbatim from each owner's text thread with the Keystone
  team (raw iMessage exports are intentionally **not** committed — they contain
  personal contact info; the curated quotes live in each dossier).
- **Photos:** customer-provided / customer-site-hosted imagery, downloaded into
  `public/media/case-studies/<slug>/` and registered in `data/media.ts` under
  `MEDIA.caseStudies.<study>`.

## Authoring notes

Studies are authored as block-driven `CaseStudyContent` objects (see
`design-system/patterns/case-studies/types.ts`). The long-form template renders
a hero plus an ordered `blocks` array: TL;DR, prose sections, bar charts,
callouts, stat bands, before/after comparisons, pull quotes, photo galleries,
rollout timelines, and a tools rundown.
