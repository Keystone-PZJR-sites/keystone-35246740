import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/design-system/v2/case-study";
import { CASE_STUDIES, getCaseStudy } from "@/design-system/v2/sections/case-study-data";

/** `/case-studies/[slug]` — the case-study template (spec 017 §8.4;
 * the 014 §9 F9 slug canon). Static params come from the data
 * module: only populated studies build, everything else 404s (the
 * 017 §9 F9 owner decision — no placeholder pages; the Phase B
 * studies land as content passes). The title is the interim
 * per-study metadata — the pre-launch metadata wipe (checklist G4)
 * covers the final copy. */

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
  return <CaseStudyPage study={study} />;
}
