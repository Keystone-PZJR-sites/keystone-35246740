import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyTemplate } from '@/design-system/patterns/case-studies';
import { CASE_STUDIES, getCaseStudy, getOtherCaseStudies } from '@/data/case-studies';

interface CaseStudyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getCaseStudy(slug);
  if (!content) return {};
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { slug } = await params;
  const content = getCaseStudy(slug);

  if (!content) {
    notFound();
  }

  return <CaseStudyTemplate content={content} otherStories={getOtherCaseStudies(slug)} />;
}
