import type { FormDefinition } from "@keystone-sites/core/types";
import { ContactFormIsland } from "./contact-form";
import {
  CONTACT_EYEBROW,
  CONTACT_LEDE,
  CONTACT_TITLE,
} from "../pages/contact-data";

export function ContactSection({ form }: { form: FormDefinition | null }) {
  return (
    <article className="sec contact-section">
      <header className="contact-header">
        <p className="contact-eyebrow">{CONTACT_EYEBROW}</p>
        <h1>{CONTACT_TITLE}</h1>
        <p className="contact-lede">{CONTACT_LEDE}</p>
      </header>
      <div className="contact-body">
        <ContactFormIsland form={form} />
      </div>
    </article>
  );
}
