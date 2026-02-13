import { JobDetailHero, JobDetailSection } from 'keystone-design-bootstrap/sections';
import { getJobPosting } from 'keystone-design-bootstrap/lib/server-api';
import { notFound } from 'next/navigation';

interface JobDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params;

  const job = await getJobPosting(slug);

  if (!job) {
    notFound();
  }

  return (
    <main>
      <JobDetailHero job={job} />
      <JobDetailSection job={job} />
    </main>
  );
}
