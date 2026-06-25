import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IndustryPageTemplate } from '@/design-system/patterns/industries';
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

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const content = getIndustryPage(slug);

  if (!content) {
    notFound();
  }

  return <IndustryPageTemplate content={content} />;
}
