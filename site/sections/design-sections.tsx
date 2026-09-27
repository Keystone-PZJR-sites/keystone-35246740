/** Sections: every section in `sections/`, mounted for real, grouped by
 * the page that composes it, each with its component, file, props, and
 * data source. Landing kit kinds first — those are the ones a new page
 * reaches for; the rest are the designed pages' sections, reusable by
 * import when a page needs exactly that thing. */

import { Fragment, type ReactNode } from "react";
import type { FormDefinition } from "@keystone-sites/core/types";
import {
  renderLandingSection,
  type LandingSection,
} from "@keystone-sites/marketing-design-system/sections/landing";
import { LANDING_SAMPLE } from "../pages/landing-sample-data";
import { CloserRow } from "@keystone-sites/marketing-design-system/primitives/closer-row";
import { Slug } from "@keystone-sites/marketing-design-system/primitives/slug";
import type { BlogFilteredModel, BlogLandingModel, BlogPostDetailModel } from "./blog-data";
import { BlogCategorySection } from "./blog-category";
import { BlogListsSection } from "./blog-lists";
import { BlogPostSection } from "./blog-post";
import { BlogTopSection } from "./blog-top";
import { CaseCarouselSection } from "./case-carousel";
import { CaseStudyBusinessSection } from "./case-study-business";
import { CaseStudyCtaSection } from "./case-study-cta";
import { CASE_STUDIES } from "./case-study-data";
import { CaseStudyFunnelSection } from "./case-study-funnel";
import { CaseStudyHeaderSection } from "./case-study-header";
import { CaseStudyIntroSection } from "./case-study-intro";
import { CaseStudyOverviewSection } from "./case-study-overview";
import { CaseStudyResultSection } from "./case-study-result";
import { CaseStudyShiftSection } from "./case-study-shift";
import { CaseStudyStackSection } from "./case-study-stack";
import { CompanyBackersSection } from "./company-backers";
import { CompanyCareersSection } from "./company-careers";
import { CompanyHeroSection } from "./company-hero";
import { CompanyStorySection } from "./company-story";
import { CompanyTeamSection, type TeamRosterMember } from "./company-team";
import { ContactSection } from "./contact";
import { EnginesSection } from "./engines";
import { FaqSection } from "@keystone-sites/marketing-design-system/sections/faq";
import { FAQ_HEAD, FAQ_ITEMS } from "./faq-data";
import { HeroSection } from "./hero";
import { LegalContentSection } from "./legal-content";
import { PricingHeaderSection } from "./pricing-header";
import { PricingIncludesSection } from "./pricing-includes";
import { PricingInquirySection } from "./pricing-inquiry";
import { PricingPlansSection } from "./pricing-plans";
import { PricingScaleSection } from "./pricing-scale";
import { SystemSection } from "./system";
import { WorkCasesSection } from "./work-cases";
import { WorkDeckSection } from "./work-deck";
import { WorkGallerySection } from "./work-gallery";
import { WorkHeaderSection } from "./work-header";

const FIELDS: Record<LandingSection["kind"], string> = {
  hero: "eyebrow · title · subhead · cta { label, href } · picture: PictureSet",
  benefits: "eyebrow · title · items[] { id, icon?, title, copy }",
  quote: "eyebrow · quote (with its own curly quotes) · attribution",
  closer: "eyebrow · title · copy · cta { label, href }",
};

/** Live data the designed pages' sections need, loaded by pages/design.tsx
 * with the same loaders the pages use. */
export interface DesignSectionsData {
  team: TeamRosterMember[];
  form: FormDefinition | null;
  blogLanding: BlogLandingModel;
  blogFiltered: BlogFilteredModel | null;
  blogPost: BlogPostDetailModel | null;
  youtubeUrl?: string;
}

interface Entry {
  name: string;
  file: string;
  props: string;
  data?: string;
  /** A wrapper the page puts around the section (a sticky bound, a page class). */
  note?: string;
  mount: ReactNode;
}

interface Group {
  id: string;
  page: string;
  route: string;
  entries: Entry[];
}

const LEGAL_SAMPLE = `## Scope

This statement covers the marketing site and every page under it.

- Semantic HTML before ARIA; every control is keyboard reachable.
- Text meets WCAG AA contrast; motion honours \`prefers-reduced-motion\`.

## Contact

Write to us and we will fix what you found.`;

function groups(d: DesignSectionsData): Group[] {
  const study = CASE_STUDIES[0];
  return [
    {
      id: "home",
      page: "Homepage",
      route: "/",
      entries: [
        {
          name: "HeroSection",
          file: "sections/hero.tsx",
          props: "—",
          data: "hero-data.ts · media.ts (hero carousel)",
          note: "Islands: HeroLoad, HeroCarousel. The page class load-sequence runs its entrance.",
          mount: <HeroSection />,
        },
        {
          name: "SystemSection",
          file: "sections/system.tsx",
          props: "—",
          data: "system-data.ts",
          note: "Island: SystemBloom.",
          mount: <SystemSection />,
        },
        {
          name: "EnginesSection",
          file: "sections/engines.tsx",
          props: "—",
          data: "engines-data.ts",
          note: "Island: EnginesScroll.",
          mount: <EnginesSection />,
        },
        {
          name: "WorkDeckSection",
          file: "sections/work-deck.tsx",
          props: "—",
          data: "work-deck-data.ts",
          mount: <WorkDeckSection />,
        },
        {
          name: "CaseCarouselSection",
          file: "sections/case-carousel.tsx",
          props: "—",
          data: "case-carousel-data.ts",
          mount: <CaseCarouselSection />,
        },
      ],
    },
    {
      id: "pricing",
      page: "Pricing",
      route: "/pricing/",
      entries: [
        {
          name: "PricingHeaderSection",
          file: "sections/pricing-header.tsx",
          props: "—",
          data: "pricing-header-data.ts",
          mount: <PricingHeaderSection />,
        },
        {
          name: "PricingPlansSection",
          file: "sections/pricing-plans.tsx",
          props: "—",
          data: "pricing-plans-data.ts (PLANS)",
          note: "Uses PlanCard.",
          mount: <PricingPlansSection />,
        },
        {
          name: "PricingIncludesSection",
          file: "sections/pricing-includes.tsx",
          props: "—",
          data: "pricing-includes-data.ts",
          mount: <PricingIncludesSection />,
        },
        {
          name: "PricingScaleSection",
          file: "sections/pricing-scale.tsx",
          props: "—",
          data: "pricing-scale-data.ts (PERSONAS)",
          note: "Uses PersonaCard and Slider.",
          mount: <PricingScaleSection />,
        },
        {
          name: "PricingInquirySection",
          file: "sections/pricing-inquiry.tsx",
          props: "—",
          data: "pricing-inquiry-data.ts",
          mount: <PricingInquirySection />,
        },
        {
          name: "FaqSection",
          file: "sections/faq.tsx",
          props: "—",
          data: "faq-data.tsx (FAQ_ITEMS)",
          note: "Uses FaqQuestion.",
          mount: <FaqSection head={FAQ_HEAD} items={FAQ_ITEMS} />,
        },
      ],
    },
    {
      id: "work",
      page: "Our Work",
      route: "/our-work/",
      entries: [
        {
          name: "WorkHeaderSection",
          file: "sections/work-header.tsx",
          props: "—",
          data: "work-header-data.ts",
          mount: <WorkHeaderSection />,
        },
        {
          name: "WorkCasesSection",
          file: "sections/work-cases.tsx",
          props: "—",
          data: "work-cases-data.ts (CASE_STUDIES summaries)",
          note: "Uses CaseStudyCard.",
          mount: <WorkCasesSection />,
        },
        {
          name: "WorkGallerySection",
          file: "sections/work-gallery.tsx",
          props: "—",
          data: "work-gallery-data.ts (GALLERY_SITES)",
          note: "The page mounts GalleryOverlay for open-gallery.",
          mount: <WorkGallerySection />,
        },
      ],
    },
    {
      id: "company",
      page: "Company",
      route: "/company/",
      entries: [
        {
          name: "CompanyHeroSection",
          file: "sections/company-hero.tsx",
          props: "—",
          data: "company-data.ts · company-hero-data.ts",
          note: "Island: CompanyHeroVideo.",
          mount: <CompanyHeroSection />,
        },
        {
          name: "CompanyStorySection",
          file: "sections/company-story.tsx",
          props: "—",
          data: "company-data.ts",
          mount: <CompanyStorySection />,
        },
        {
          name: "CompanyBackersSection",
          file: "sections/company-backers.tsx",
          props: "—",
          data: "company-backers-data.ts",
          mount: <CompanyBackersSection />,
        },
        {
          name: "CompanyTeamSection",
          file: "sections/company-team.tsx",
          props: "members: TeamRosterMember[]",
          data: "getTeamMembers() → toTeamRoster()",
          mount: <CompanyTeamSection members={d.team} />,
        },
        {
          name: "CompanyCareersSection",
          file: "sections/company-careers.tsx",
          props: "—",
          data: "company-data.ts",
          mount: <CompanyCareersSection />,
        },
      ],
    },
    {
      id: "case-study",
      page: "Case study",
      route: `/case-studies/${study.slug}/`,
      entries: [
        {
          name: "CaseStudyHeaderSection",
          file: "sections/case-study-header.tsx",
          props: "study: CaseStudy",
          data: `case-study-data.ts (${study.slug})`,
          mount: <CaseStudyHeaderSection study={study} />,
        },
        ...(
          [
            ["CaseStudyIntroSection", "intro", CaseStudyIntroSection],
            ["CaseStudyOverviewSection", "overview", CaseStudyOverviewSection],
            ["CaseStudyBusinessSection", "business", CaseStudyBusinessSection],
            ["CaseStudyShiftSection", "shift", CaseStudyShiftSection],
            ["CaseStudyFunnelSection", "funnel", CaseStudyFunnelSection],
            ["CaseStudyStackSection", "stack", CaseStudyStackSection],
            ["CaseStudyResultSection", "result", CaseStudyResultSection],
          ] as const
        ).map(([name, slug, Section]) => ({
          name,
          file: `sections/case-study-${slug}.tsx`,
          props: "study: CaseStudy",
          note: "On the page these sit inside .cs-stack with the sticky CaseStudyToc.",
          mount: (
            <div className="cs-stack">
              <Section study={study} />
            </div>
          ),
        })),
        {
          name: "CaseStudyCtaSection",
          file: "sections/case-study-cta.tsx",
          props: "—",
          mount: <CaseStudyCtaSection />,
        },
      ],
    },
    {
      id: "blog",
      page: "Blog",
      route: "/blog/",
      entries: [
        {
          name: "BlogTopSection",
          file: "sections/blog-top.tsx",
          props: "youtubeUrl? · searchQuery?",
          mount: <BlogTopSection youtubeUrl={d.youtubeUrl} />,
        },
        {
          name: "BlogListsSection",
          file: "sections/blog-lists.tsx",
          props: "landing: BlogLandingModel",
          data: "getBlogLanding()",
          note: "Uses ArticleCard and FeaturedArticleCard (blog-cards.tsx).",
          mount: <BlogListsSection landing={d.blogLanding} />,
        },
        ...(d.blogFiltered
          ? [
              {
                name: "BlogCategorySection",
                file: "sections/blog-category.tsx",
                props: "model: BlogFilteredModel",
                data: "getBlogFiltered({ page })",
                mount: <BlogCategorySection model={d.blogFiltered} />,
              },
            ]
          : []),
        ...(d.blogPost
          ? [
              {
                name: "BlogPostSection",
                file: "sections/blog-post.tsx",
                props: "post: BlogPostDetailModel",
                data: `getBlogPostDetail("${d.blogPost.slug}")`,
                note: "Renders markdown through BlogPostMarkdown.",
                mount: <BlogPostSection post={d.blogPost} />,
              },
            ]
          : []),
      ],
    },
    {
      id: "contact-legal",
      page: "Contact and legal",
      route: "/contact/ · /terms/ · /privacy/ · /accessibility/",
      entries: [
        {
          name: "ContactSection",
          file: "sections/contact.tsx",
          props: "form: FormDefinition | null",
          data: 'getForm("lead")',
          note: "Island: ContactFormIsland; posts to /api/form.",
          mount: <ContactSection form={d.form} />,
        },
        {
          name: "LegalContentSection",
          file: "sections/legal-content.tsx",
          props: "eyebrow · title · markdown",
          data: "company terms/privacy markdown · legal-data.ts",
          mount: (
            <LegalContentSection
              eyebrow="Keystone"
              title="Sample document"
              markdown={LEGAL_SAMPLE}
            />
          ),
        },
      ],
    },
  ];
}

const CHROME = [
  { name: "NavChrome", file: "sections/nav.tsx", note: "The bar at the top of this page." },
  { name: "FooterSection", file: "sections/footer.tsx", note: "The footer of this page." },
  {
    name: "LoadOrchestrator",
    file: "sections/load-orchestrator.tsx",
    note: "Adds load-active once fonts are ready; names the final beat.",
  },
  {
    name: "SiteChat / SiteChatOpen",
    file: "sections/site-chat.tsx",
    note: "The chat widget and the open-chat data-action handler.",
  },
  {
    name: "GalleryOverlay",
    file: "sections/gallery-overlay.tsx",
    note: "The work gallery <dialog>; opened by open-gallery.",
  },
];

function EntryLabel({ e }: { e: Entry }) {
  return (
    <div className="ds-kind-label" id={`s-${e.name}`}>
      <code className="type type-fixed ts-text-md-medium ds-code">{e.name}</code>
      <code className="type type-fixed ts-text-sm-regular ds-code ds-kind-file">{e.file}</code>
      <span className="type type-fixed ts-text-sm-light ds-kind-fields">props: {e.props}</span>
      {e.data && (
        <span className="type type-fixed ts-text-sm-light ds-kind-fields">data: {e.data}</span>
      )}
      {e.note && <span className="type type-fixed ts-text-sm-light ds-kind-note">{e.note}</span>}
    </div>
  );
}

export function DesignSectionsSection({ data }: { data: DesignSectionsData }) {
  const samples = (["hero", "benefits", "quote", "closer"] as const).map((kind) =>
    LANDING_SAMPLE.sections.find((s) => s.kind === kind)!,
  );

  return (
    <section
      className="sec ds-sec ds-sections"
      id="sections"
      aria-label="Sections"
      data-landmark="ds-sections"
    >
      <header className="ds-sec-head" data-landmark="head">
        <Slug>Sections</Slug>
        <h2 className="type ts-display-serif-xs-extralight ramp-h2 ds-h2">
          Every section, mounted for real.
        </h2>
        <p className="type ts-text-md-light ramp-body ds-copy">
          First the landing kit — what a new page composes from data. Then each designed
          page&rsquo;s sections in page order, with the props and data each one takes. Anything here
          can be imported into a page; the kit is what you reach for without a Figma frame.
        </p>
      </header>

      <div className="ds-group" id="g-landing">
        <h3 className="type type-fixed ts-text-xl-medium ds-h3" data-toc="Landing kit">
          Landing kit <span className="ds-group-route">any /page/ · pages/landing.tsx</span>
        </h3>
        <p className="type type-fixed ts-text-md-light ds-note">
          A landing page is <code>meta</code> plus an ordered <code>sections</code> list of{" "}
          <code>{"{ kind, …data }"}</code>. Each kind below renders from{" "}
          <code>pages/landing-sample-data.ts</code>.
        </p>
        <div className="ds-kinds">
          {samples.map((section) => (
            <Fragment key={section.kind}>
              <div className="ds-kind-label" id={`kind-${section.kind}`}>
                <code className="type type-fixed ts-text-md-medium ds-code">
                  kind: &quot;{section.kind}&quot;
                </code>
                <code className="type type-fixed ts-text-sm-regular ds-code ds-kind-file">
                  sections/landing-{section.kind}.tsx
                </code>
                <span className="type type-fixed ts-text-sm-light ds-kind-fields">
                  {FIELDS[section.kind]}
                </span>
              </div>
              <div className="ds-kind-frame">{renderLandingSection(section)}</div>
            </Fragment>
          ))}
        </div>
      </div>

      {groups(data).map((g) => (
        <div key={g.id} className="ds-group" id={`g-${g.id}`}>
          <h3 className="type type-fixed ts-text-xl-medium ds-h3" data-toc={g.page}>
            {g.page} <span className="ds-group-route">{g.route}</span>
          </h3>
          <div className="ds-kinds">
            {g.entries.map((e) => (
              <Fragment key={e.name}>
                <EntryLabel e={e} />
                <div className="ds-kind-frame">{e.mount}</div>
              </Fragment>
            ))}
          </div>
        </div>
      ))}

      <div className="ds-group" id="g-chrome">
        <h3 className="type type-fixed ts-text-xl-medium ds-h3" data-toc="Chrome and behaviour">
          Chrome and behaviour <span className="ds-group-route">every page</span>
        </h3>
        <table className="ds-table">
          <tbody className="type type-fixed ts-text-sm-light">
            {CHROME.map((c) => (
              <tr key={c.name}>
                <td>
                  <code className="ds-code">{c.name}</code>
                </td>
                <td>
                  <code className="ds-code">{c.file}</code>
                </td>
                <td>{c.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CloserRow />
    </section>
  );
}
