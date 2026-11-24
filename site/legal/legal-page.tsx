import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { Prose } from "@keystonepzjr/marketing-design-system/prose";
import { notFound } from "next/navigation";
import { Frame } from "@/site/frame";
import { ACCESSIBILITY_STATEMENT, LEGAL_DOCUMENTS, type LegalDocument } from "./documents";
import { fillLegalTemplate } from "./fill";

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

  return (
    <Frame title={LEGAL_DOCUMENTS[document].title}>
      <Prose markdown={fillLegalTemplate(source, company)} />
    </Frame>
  );
}
