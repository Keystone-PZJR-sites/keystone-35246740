// Case studies gallery — /case-studies
// =====================================
// Server Component. Renders the centered header and a vertical column of story
// cards from the authored registry, closing with the green CTA band. No
// client-side data loading. See spec 051.

import type { Metadata } from 'next';
import { CenteredHero, CtaBand } from '@/design-system/sections';
import { CaseStudyCard } from '@/design-system/patterns/case-studies';
import { CASE_STUDIES_LIST } from '@/data/case-studies';

export const metadata: Metadata = {
  title: 'Case Studies | Keystone',
  description:
    'Real local businesses growing with Keystone — the stories, the numbers, and how they got there.',
};

const GALLERY_EYEBROW = 'Case studies';
const GALLERY_TITLE = 'Local businesses, growing with Keystone';
const GALLERY_SUBTITLE =
  'The stories behind the numbers — how real owners turned an online presence into more customers.';
const CLOSING_TITLE = 'The easiest way to grow your business online';

export default function CaseStudiesPage() {
  return (
    <div className="case-studies-page" data-theme="custom">
      <CenteredHero eyebrow={GALLERY_EYEBROW} title={GALLERY_TITLE} subtitle={GALLERY_SUBTITLE} />

      <main className="ks-cs-gallery" aria-label="Customer success stories">
        {CASE_STUDIES_LIST.map((study) => (
          <CaseStudyCard key={study.slug} slug={study.slug} content={study.card} variant="row" />
        ))}
      </main>

      <CtaBand tone="accent" fullBleed title={CLOSING_TITLE} />
    </div>
  );
}
