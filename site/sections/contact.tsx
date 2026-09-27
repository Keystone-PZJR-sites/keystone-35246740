import type { FormDefinition } from "@keystone-sites/core/types";
import { ContactFormIsland } from "./contact-form";
import { CONTACT_EYEBROW, CONTACT_LEDE, CONTACT_TITLE } from "../pages/contact-data";

export function ContactSection({ form }: { form: FormDefinition | null }) {
  return (
    <article className="sec contact-section">
      <header className="contact-header">
        <p className="type type-fixed ts-text-nav-label contact-eyebrow">{CONTACT_EYEBROW}</p>
        <h1 className="type type-fixed ts-display-serif-md-extralight contact-h1">
          {CONTACT_TITLE}
        </h1>
        <p className="type type-fixed ts-text-md-light contact-lede">{CONTACT_LEDE}</p>
      </header>
      <div className="contact-body">
        <ContactFormIsland form={form} />
      </div>
    </article>
  );
}
