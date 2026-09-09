import { notFound } from "next/navigation";
import { getCompanyInformation } from "@keystone-sites/core/lib/server-api";
import { GridField } from "@/design-system/grid/field";
import { replaceLegalPlaceholders } from "@/design-system/lib/legal";
import { LegalContentSection } from "@/design-system/sections/legal-content";
import { NavChrome } from "@/design-system/sections/nav";
import { FooterSection } from "@/design-system/sections/footer";
import {
  ACCESSIBILITY_STATEMENT,
  LEGAL_DOCUMENT_TITLES,
  LEGAL_EYEBROW,
  type LegalDocument,
} from "./legal-data";

export type { LegalDocument } from "./legal-data";

export async function LegalPage({ document }: { document: LegalDocument }) {
  const company = await getCompanyInformation();
  const source =
    document === "terms"
      ? company?.terms_of_service_markdown
      : document === "privacy"
        ? company?.privacy_policy_markdown
        : ACCESSIBILITY_STATEMENT;

  if (!source?.trim()) notFound();

  const markdown =
    document === "accessibility"
      ? source
      : company
        ? replaceLegalPlaceholders(source, company)
        : notFound();

  return (
    <div className="page legal-page">
      <GridField />
      <NavChrome />
      <main>
        <LegalContentSection
          eyebrow={LEGAL_EYEBROW}
          title={LEGAL_DOCUMENT_TITLES[document]}
          markdown={markdown}
        />
      </main>
      <FooterSection
        social={{
          linkedin: company?.linkedin_url,
          facebook: company?.facebook_url,
          instagram: company?.instagram_url,
          youtube: company?.youtube_url,
        }}
      />
    </div>
  );
}
