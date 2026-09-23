/** Primitives: every reusable control and part, mounted for real at each
 * size and state it has, with the import that produces it. Primitives
 * that need a page's island or data to make sense are listed by file. */

import type { ComponentType, ReactNode } from "react";
import * as Icons from "../icons";
import { heroCarouselPicture } from "../media";
import { ButtonArrow, ButtonFill, ButtonGhost } from "../primitives/buttons";
import { ButtonInline } from "../primitives/button-inline";
import { CloserRow } from "../primitives/closer-row";
import { CtaRow } from "../primitives/cta-row";
import { FieldCheckbox, FieldText, FieldTextarea } from "../primitives/field";
import { Picture } from "../primitives/picture";
import { PricingTag } from "../primitives/pricing-tag";
import { Slug } from "../primitives/slug";
import { CaseStudyButton } from "../primitives/case-study-button";
import { CaseStudyCard } from "../primitives/case-study-card";
import { FaqQuestion } from "../primitives/faq-question";
import { FooterItem } from "../primitives/footer-item";
import { GraderInput } from "../primitives/grader";
import { PersonaCard } from "../primitives/persona-card";
import { PricingButton } from "../primitives/pricing-button";
import { Slider } from "../primitives/slider";
import { Toc } from "../primitives/toc";
import { FAQ_ITEMS } from "./faq-data";
import { LANDING_ICONS } from "./landing-benefits";
import { PERSONAS } from "./pricing-scale-data";
import { CASE_STUDIES as CASE_SUMMARIES } from "./work-cases-data";

const FILL_SIZES = ["xl", "lg", "md", "sm"] as const;
const GHOST_SIZES = ["xl", "lg", "md", "sm", "xs"] as const;
const ARROW_SIZES = ["lg", "md", "sm"] as const;

function Spec({
  title,
  file,
  note,
  children,
}: {
  title: string;
  file: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div className="ds-spec-block" id={`p-${title.toLowerCase()}`}>
      <div className="ds-spec-head">
        <h3 className="type type-fixed ts-text-xl-medium ds-h3" data-toc={title}>
          {title}
        </h3>
        <code className="type type-fixed ts-text-sm-regular ds-code">{file}</code>
      </div>
      {note && <p className="type type-fixed ts-text-md-light ds-note">{note}</p>}
      <div className="ds-spec-body">{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="ds-row">
      <code className="type type-fixed ts-text-sm-regular ds-code ds-row-label">{label}</code>
      <div className="ds-row-items">{children}</div>
    </div>
  );
}

export function DesignPrimitivesSection() {
  return (
    <section
      className="sec ds-sec ds-primitives"
      id="primitives"
      aria-label="Primitives"
      data-landmark="ds-primitives"
    >
      <header className="ds-sec-head" data-landmark="head">
        <Slug>Primitives</Slug>
        <h2 className="type ts-display-serif-xs-extralight ramp-h2 ds-h2">
          The parts sections are made of.
        </h2>
        <p className="type ts-text-md-light ramp-body ds-copy">
          A control&rsquo;s size is a keyword its mount sets per band (<code>--btn-size</code>);
          pass <code>size=&quot;inherit&quot;</code> in a section and declare the keyword on the
          mount. Here each size is pinned so you can see it.
        </p>
      </header>

      <Spec
        title="ButtonFill"
        file="primitives/buttons.tsx"
        note="chrome teal | gray · shape pill | box · href renders a link"
      >
        {FILL_SIZES.map((size) => (
          <Row key={size} label={`size="${size}"`}>
            <ButtonFill size={size}>See pricing</ButtonFill>
            <ButtonFill size={size} chrome="gray">
              See pricing
            </ButtonFill>
            <ButtonFill size={size} shape="box">
              See pricing
            </ButtonFill>
            <ButtonFill size={size} forceState="hover">
              hover
            </ButtonFill>
            <ButtonFill size={size} forceState="focus">
              focus
            </ButtonFill>
            <ButtonFill size={size} disabled>
              disabled
            </ButtonFill>
          </Row>
        ))}
      </Spec>

      <Spec
        title="ButtonGhost"
        file="primitives/buttons.tsx"
        note='color brown | teal | gray · optional leading icon · action="open-chat" opens the site chat'
      >
        {GHOST_SIZES.map((size) => (
          <Row key={size} label={`size="${size}"`}>
            <ButtonGhost size={size} color="brown" icon={<Icons.IconChat />}>
              Talk to us
            </ButtonGhost>
            <ButtonGhost size={size} color="teal">
              Learn more
            </ButtonGhost>
            <ButtonGhost size={size} color="gray">
              Learn more
            </ButtonGhost>
            <ButtonGhost size={size} color="brown" forceState="hover">
              hover
            </ButtonGhost>
          </Row>
        ))}
      </Spec>

      <Spec title="ButtonArrow" file="primitives/buttons.tsx" note="Icon-only; label is required.">
        {ARROW_SIZES.map((size) => (
          <Row key={size} label={`size="${size}"`}>
            <ButtonArrow size={size} label="Next" />
            <ButtonArrow size={size} chrome="gray" label="Next" />
            <ButtonArrow size={size} chrome="brown" label="Next" />
            <ButtonArrow size={size} label="Next" forceState="hover" />
            <ButtonArrow size={size} label="Next" disabled />
          </Row>
        ))}
      </Spec>

      <Spec
        title="ButtonInline"
        file="primitives/button-inline.tsx"
        note="Prose-weight link with a sliding glyph; 44px hit target on a 22px row."
      >
        <Row label="default · hover">
          <ButtonInline href="#">Read the case study</ButtonInline>
          <ButtonInline href="#" forceState="hover">
            Read the case study
          </ButtonInline>
        </Row>
      </Spec>

      <Spec
        title="Slug"
        file="primitives/slug.tsx"
        note='The eyebrow. layout="rail" puts the mark in a 1t column.'
      >
        <Row label="inline">
          <Slug>Why practices switch</Slug>
        </Row>
        <Row label='layout="rail"'>
          <Slug layout="rail">Why practices switch</Slug>
        </Row>
      </Spec>

      <Spec
        title="CtaRow"
        file="primitives/cta-row.tsx"
        note="Fill button, the question from rs, ghost open-chat. Sets --btn-size md · lg (rt) · xl (rd2). Resize to see it."
      >
        <CtaRow cta={{ label: "See pricing", href: "/pricing" }} />
      </Spec>

      <Spec
        title="CloserRow"
        file="primitives/closer-row.tsx"
        note="One painted 12-cell row a tick below a section's content. Mount last in a section that pads 1t inline."
      >
        <div className="ds-closer-demo">
          <CloserRow />
        </div>
      </Spec>

      <Spec
        title="Picture"
        file="primitives/picture.tsx"
        note="Renders a PictureSet from media.ts; the owner's box crops it. heroCarouselPicture(n), n = 1…8."
      >
        <div className="ds-pictures">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <figure key={n} className="ds-picture">
              <div className="ds-picture-box">
                <Picture set={heroCarouselPicture(n)} />
              </div>
              <figcaption className="type type-fixed ts-text-sm-light">
                <code className="ds-code">heroCarouselPicture({n})</code>
              </figcaption>
            </figure>
          ))}
        </div>
      </Spec>

      <Spec title="Fields" file="primitives/field.tsx" note="Uncontrolled; forms work without JS.">
        <form className="ds-form" action="#">
          <FieldText id="ds-name" name="name" label="Your name" required placeholder="Jane Doe" />
          <FieldText
            id="ds-email"
            name="email"
            type="email"
            label="Work email"
            helpText="We reply within one business day."
          />
          <FieldTextarea id="ds-msg" name="message" label="Message" rows={3} />
          <FieldCheckbox id="ds-ok" name="consent" label="Keep me posted" />
        </form>
      </Spec>

      <Spec title="PricingTag" file="primitives/pricing-tag.tsx">
        <Row label="xs · md · lg · xl">
          <PricingTag size="xs">Included</PricingTag>
          <PricingTag size="md">Included</PricingTag>
          <PricingTag size="lg">Included</PricingTag>
          <PricingTag size="xl">Included</PricingTag>
          <PricingTag size="md" muted>
            Muted
          </PricingTag>
        </Row>
      </Spec>

      <Spec
        title="Icons"
        file="icons.tsx"
        note="Two-tone icons keep their palettes. Names in the landing kit's LandingIcon list are marked."
      >
        <ul className="ds-icons">
          {(Object.keys(Icons) as (keyof typeof Icons)[])
            .filter((k) => k.startsWith("Icon"))
            .map((k) => {
              const Icon = Icons[k] as ComponentType<{ size?: number }>;
              const kitName = Object.entries(LANDING_ICONS).find(([, v]) => v === Icon)?.[0];
              return (
                <li key={k} className="ds-icon">
                  <span className="ds-icon-glyph" aria-hidden="true">
                    <Icon size={24} />
                  </span>
                  <code className="type type-fixed ts-text-sm-regular ds-code">{k}</code>
                  {kitName && (
                    <span className="type type-fixed ts-text-sm-light ds-icon-kit">
                      icon: &quot;{kitName}&quot;
                    </span>
                  )}
                </li>
              );
            })}
        </ul>
      </Spec>

      <Spec
        title="GraderInput"
        file="primitives/grader.tsx"
        note="The website grader field: suggestions from Google Places, submits to the grader. chrome teal | brown."
      >
        {(["lg", "md", "sm"] as const).map((size) => (
          <Row key={size} label={`size="${size}"`}>
            <GraderInput size={size} />
            <GraderInput size={size} chrome="brown" />
          </Row>
        ))}
      </Spec>

      <Spec
        title="Slider"
        file="primitives/slider.tsx"
        note="The pricing-scale range; the hue follows the persona."
      >
        {(["lg", "md", "sm"] as const).map((size) => (
          <Row key={size} label={`size="${size}"`}>
            <Slider size={size} label="Team size" />
            <Slider size={size} label="Team size" forceHue="purple" />
          </Row>
        ))}
      </Spec>

      <Spec
        title="PersonaCard"
        file="primitives/persona-card.tsx"
        note="A pricing persona (pricing-scale-data.ts PERSONAS). state active | inactive."
      >
        <Row label='size="md"'>
          <PersonaCard persona={PERSONAS[0]} size="md" />
          <PersonaCard persona={PERSONAS[1]} size="md" state="inactive" />
        </Row>
      </Spec>

      <Spec
        title="CaseStudyCard"
        file="primitives/case-study-card.tsx"
        note="A work card (work-cases-data.ts CASE_STUDIES); sized by its section's grid."
      >
        <div className="work-cases-section ds-card-host">
          <CaseStudyCard study={CASE_SUMMARIES[0]} eager />
        </div>
      </Spec>

      <Spec title="CaseStudyButton" file="primitives/case-study-button.tsx">
        <Row label='size="lg" · "sm"'>
          <CaseStudyButton label="Read the case study" href="#" />
          <CaseStudyButton label="Read the case study" href="#" size="sm" />
          <CaseStudyButton label="hover" href="#" forceState="hover" />
        </Row>
      </Spec>

      <Spec
        title="PricingButton"
        file="primitives/pricing-button.tsx"
        note="Sized by --pbtn-size on its mount; pinned here."
      >
        {(["xl", "lg", "md", "sm", "xs"] as const).map((size) => (
          <Row key={size} label={`size="${size}"`}>
            <PricingButton size={size} href="#">
              Get started
            </PricingButton>
            <PricingButton size={size} href="#" forceState="hover">
              hover
            </PricingButton>
          </Row>
        ))}
      </Spec>

      <Spec
        title="FaqQuestion"
        file="primitives/faq-question.tsx"
        note="A disclosure row (faq-data.ts FAQ_ITEMS). Section mounts are unsized; the section island toggles open."
      >
        <ul className="ds-faq-host">
          <FaqQuestion
            id="ds-fq-a"
            question={FAQ_ITEMS[0].question}
            answer={FAQ_ITEMS[0].answer}
            size="md"
          />
          <FaqQuestion
            id="ds-fq-b"
            question={FAQ_ITEMS[1].question}
            answer={FAQ_ITEMS[1].answer}
            size="md"
            open
          />
        </ul>
      </Spec>

      <Spec
        title="FooterItem"
        file="primitives/footer-item.tsx"
        note="chrome light | dark · optional trailing arrow."
      >
        <Row label='chrome="light"'>
          <FooterItem href="#">Our Approach</FooterItem>
          <FooterItem href="#" arrow>
            Login
          </FooterItem>
          <FooterItem href="#" forceState="hover">
            hover
          </FooterItem>
        </Row>
        <Row label='chrome="dark"'>
          <span className="ds-dark-host">
            <FooterItem href="#" chrome="dark">
              Our Approach
            </FooterItem>
            <FooterItem href="#" chrome="dark" arrow>
              Login
            </FooterItem>
          </span>
        </Row>
      </Spec>

      <Spec
        title="Toc"
        file="primitives/toc.tsx"
        note="A sticky table of contents; the active row follows the section past a third of the viewport (lib/use-active-section). Case studies, blog posts, and this page's side rail at rd2 host it."
      >
        <Row label="items · aria-current on the active row">
          <div className="ds-toc-host">
            <Toc
              items={[
                { id: "p-toc", label: "Overview" },
                { id: "p-toc-b", label: "The Business" },
                { id: "p-toc-c", label: "The Result" },
              ]}
            />
          </div>
        </Row>
      </Spec>

      <CloserRow />
    </section>
  );
}
