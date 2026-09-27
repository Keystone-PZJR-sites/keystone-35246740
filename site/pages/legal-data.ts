export type LegalDocument = "terms" | "privacy" | "accessibility";

export const LEGAL_EYEBROW = "Keystone";

export const LEGAL_DOCUMENT_TITLES: Record<LegalDocument, string> = {
  terms: "Terms of Service",
  privacy: "Privacy Policy",
  accessibility: "Accessibility Statement",
};

export const ACCESSIBILITY_STATEMENT = `
## Our commitment

Keystone is committed to making this website usable by as many people as possible, including people who use assistive technologies.

## How we support accessibility

We design and maintain this site with accessibility as a core requirement. Our work includes:

- Using semantic page structure and meaningful headings.
- Supporting keyboard navigation and visible focus states.
- Providing text alternatives for meaningful images.
- Maintaining readable color contrast and scalable typography.
- Respecting reduced-motion preferences.
- Testing common interactions with assistive technology.

We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.

## Feedback and assistance

If you encounter an accessibility barrier or need information in another format, use the chat on this site to contact Keystone. Please include the page and a description of the problem. We will make reasonable efforts to provide access and correct the issue.

## Ongoing improvement

Accessibility is an ongoing part of our design, engineering, and content process. We review this statement and the website as the product changes.

_Last updated: September 2026._
`.trim();
