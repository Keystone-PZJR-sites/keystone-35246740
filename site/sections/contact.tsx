import type { FormDefinition } from "@keystone-sites/core/types";
import { ContactFormIsland } from "./contact-form";
import { EXTERNAL_LINK } from "@keystone-sites/marketing-design-system/site-links";
import {
  CONTACT_CUSTOMER_NOTE,
  CONTACT_EYEBROW,
  CONTACT_LEDE,
  CONTACT_TITLE,
} from "../pages/contact-data";

export function ContactSection({ form }: { form: FormDefinition | null }) {
  return (
    <article className="sec contact-section">
      <header className="contact-header">
        <p className="type type-fixed ts-text-nav-label contact-eyebrow">{CONTACT_EYEBROW}</p>
        <h1 className="type type-fixed ts-display-serif-md-extralight contact-h1">
          {CONTACT_TITLE}
        </h1>
        <p className="type type-fixed ts-text-md-light contact-lede">{CONTACT_LEDE}</p>
        <p className="type type-fixed ts-text-sm-light contact-note">
          <span className="contact-note-lead">{CONTACT_CUSTOMER_NOTE.lead}</span>{" "}
          <a href={CONTACT_CUSTOMER_NOTE.support.href} {...EXTERNAL_LINK}>
            {CONTACT_CUSTOMER_NOTE.support.label}
          </a>
          {CONTACT_CUSTOMER_NOTE.middle}
          <a href={CONTACT_CUSTOMER_NOTE.developers.href} {...EXTERNAL_LINK}>
            {CONTACT_CUSTOMER_NOTE.developers.label}
          </a>
          {CONTACT_CUSTOMER_NOTE.tail}
        </p>
      </header>
      <div className="contact-body">
        <ContactFormIsland form={form} />
      </div>
    </article>
  );
}
