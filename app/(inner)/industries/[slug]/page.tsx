import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CenteredHero } from '@/design-system';
import { INDUSTRY_PAGES, getIndustryPage } from '@/data/industry-pages';

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(INDUSTRY_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getIndustryPage(slug);
  if (!content) return {};
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

// Scaffold only: renders the shared nav + footer (via the (inner) layout) with a
// placeholder hero. The industry-specific positioning/messaging body is added
// later (spec 050).
export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const content = getIndustryPage(slug);

  if (!content) {
    notFound();
  }

  return (
    <div className="inner-page" data-theme="custom">
      <CenteredHero eyebrow={content.eyebrow} title={content.title} />
    </div>
  );
}
