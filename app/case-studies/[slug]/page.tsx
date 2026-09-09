import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/design-system/pages/case-study";
import { CASE_STUDIES, getCaseStudy, ZIVEL } from "@/design-system/sections/case-study-data";
import CaseStudyGridCheck from "../../grid/pages/case-study";

/** Only populated case studies receive static routes. Unknown slugs 404. */

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  return { title: study ? `${study.name} | Keystone` : "Keystone" };
}

export default async function CaseStudyRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  return (
    <CaseStudyPage
      study={study}
      gridCheck={study.slug === ZIVEL.slug ? <CaseStudyGridCheck /> : undefined}
    />
  );
}
