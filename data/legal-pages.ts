// The site's legal documents, in sidebar order. Both /privacy and /terms
// render the LegalDocumentPage with this list and mark their own href active.
// Add a legal page by adding its route here.

import type { LegalDoc } from '@/design-system/patterns/legal';

export const LEGAL_DOCS: LegalDoc[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];
