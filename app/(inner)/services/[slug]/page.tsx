import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServicePageTemplate } from '@/design-system/patterns/services';
import { SERVICE_PAGES, getServicePage } from '@/data/service-pages';

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(SERVICE_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getServicePage(slug);
  if (!content) return {};
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const content = getServicePage(slug);

  if (!content) {
    notFound();
  }

  return <ServicePageTemplate content={content} />;
}
