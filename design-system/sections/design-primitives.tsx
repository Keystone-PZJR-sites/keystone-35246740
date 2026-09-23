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
import { LANDING_ICONS } from "./landing-benefits";

const FILL_SIZES = ["xl", "lg", "md", "sm"] as const;
const GHOST_SIZES = ["xl", "lg", "md", "sm", "xs"] as const;
const ARROW_SIZES = ["lg", "md", "sm"] as const;

/* Primitives whose mounts depend on a section's island or data model. */
const BY_FILE = [
  { name: "GraderInput", file: "primitives/grader.tsx", used: "homepage hero, footer" },
  { name: "Slider", file: "primitives/slider.tsx", used: "pricing scale" },
  { name: "PersonaCard", file: "primitives/persona-card.tsx", used: "homepage personas" },
  { name: "CaseStudyCard", file: "primitives/case-study-card.tsx", used: "our work" },
  { name: "CaseStudyButton", file: "primitives/case-study-button.tsx", used: "case studies" },
  { name: "PricingButton", file: "primitives/pricing-button.tsx", used: "pricing offer" },
  { name: "FaqQuestion", file: "primitives/faq-question.tsx", used: "homepage FAQ" },
  { name: "FooterItem", file: "primitives/footer-item.tsx", used: "footer" },
];

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
        <h3 className="type type-fixed ts-text-xl-medium ds-h3">{title}</h3>
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
        title="Mounted elsewhere"
        file="primitives/"
        note="These need a section's island or data model; see the file and the page that uses it."
      >
        <table className="ds-table">
          <tbody className="type type-fixed ts-text-sm-light">
            {BY_FILE.map((p) => (
              <tr key={p.name}>
                <td>
                  <code className="ds-code">{p.name}</code>
                </td>
                <td>
                  <code className="ds-code">{p.file}</code>
                </td>
                <td>{p.used}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Spec>

      <CloserRow />
    </section>
  );
}
