// Inner-page shell layout
// ========================
// Applies to all non-home pages routed through the (inner) group
// (/blog, /blog/[slug], etc.). All chrome — sticky nav, footer, and
// the site-wide lead-capture modal — is centralized in the design
// system's <InnerPageShell>, so the configuration lives in exactly
// one place and standalone inner pages can opt into the same chrome.

import { InnerPageShell } from '@/design-system';

export default function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <InnerPageShell>{children}</InnerPageShell>;
}
