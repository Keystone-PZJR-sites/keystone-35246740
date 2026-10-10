import type { FormFieldItem } from "@keystone-sites/core/types";
import { SITE_LINKS } from "@keystone-sites/marketing-design-system/site-links";

export const CONTACT_EYEBROW = "Contact";
export const CONTACT_TITLE = "Talk with Keystone";
export const CONTACT_LEDE =
  "Tell us about your business and how we can help with sales, marketing, and growth. We’ll reply shortly.";

/** For people already on Keystone, who want a guide rather than a sales reply. */
export const CONTACT_CUSTOMER_NOTE = {
  lead: "Already a customer?",
  support: { label: "The Support Center", href: SITE_LINKS.support },
  middle: " has guides for every tool, and the ",
  developers: { label: "Developer Center", href: SITE_LINKS.developers },
  tail: " covers the API and MCP server.",
} as const;

export const CONTACT_SUBMIT_LABEL = "Send message";
export const CONTACT_SUBMITTING_LABEL = "Sending…";
export const CONTACT_SUCCESS_MESSAGE =
  "Thanks — your message is on its way. We’ll be in touch shortly.";
export const CONTACT_ERROR_FALLBACK = "We couldn’t send your message just now. Please try again.";
export const CONTACT_NETWORK_ERROR = "We couldn’t reach the server. Please try again in a moment.";

/** Static field list used when the live lead form definition is unavailable. */
export const CONTACT_FALLBACK_FIELDS: FormFieldItem[] = [
  [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      required: true,
      placeholder: "First name",
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      required: true,
      placeholder: "Last name",
    },
  ],
  {
    name: "email",
    type: "email",
    label: "Email",
    required: true,
    placeholder: "you@email.com",
  },
  {
    name: "phone",
    type: "tel",
    label: "Phone",
    required: false,
    placeholder: "(555) 000-0000",
  },
  {
    name: "message",
    type: "textarea",
    label: "Message",
    required: true,
    placeholder:
      "Tell us a little bit about your business, and how Keystone may be able to help you with your sales, marketing and growth.",
  },
  {
    name: "tos_privacy_consent",
    type: "checkbox",
    label: "I agree to the Terms of Service & Privacy Policy.",
    required: true,
  },
];
