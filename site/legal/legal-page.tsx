import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { Prose } from "@keystonepzjr/marketing-design-system/prose";
import { notFound } from "next/navigation";
import { Frame } from "@/site/frame";
import { ACCESSIBILITY_STATEMENT, LEGAL_DOCUMENTS, type LegalDocument } from "./documents";
import { fillLegalTemplate } from "./fill";

// A document's sections are its `##` headings; its length is read at 230 words a minute.
const sectionsIn = (markdown: string) => markdown.match(/^##\s/gm)?.length ?? 0;
const minutesIn = (markdown: string) => Math.max(1, Math.round(markdown.split(/\s+/).length / 230));

/** Terms and Privacy are the backend's markdown for Keystone; Accessibility is the site's own. */
export async function LegalPage({ document }: { document: LegalDocument }) {
  const company = await getCompanyInformation();
  const source =
    document === "terms"
      ? company?.terms_of_service_markdown
      : document === "privacy"
        ? company?.privacy_policy_markdown
        : ACCESSIBILITY_STATEMENT;
  if (!company || !source?.trim()) notFound();

  const markdown = fillLegalTemplate(source, company);
  const sections = sectionsIn(markdown);
  return (
    <Frame
      title={LEGAL_DOCUMENTS[document].title}
      description={LEGAL_DOCUMENTS[document].description}
      documents={Object.entries(LEGAL_DOCUMENTS).map(([id, each]) => ({
        label: each.short,
        href: each.href,
        current: id === document,
      }))}
      meta={
        <>
          {sections} {sections === 1 ? "section" : "sections"} <span aria-hidden>·</span>{" "}
          {minutesIn(markdown)} min read
        </>
      }
    >
      <Prose markdown={markdown} />
    </Frame>
  );
}
