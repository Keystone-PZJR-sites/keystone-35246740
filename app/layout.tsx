import "@/site/styles.css";
import type { Metadata, Viewport } from "next";
import { CONSENT_REGIME_BOOTSTRAP_SCRIPT } from "@keystone-sites/core/consent";
import { KeystoneServices } from "@keystone-sites/services/services/KeystoneServices";
import { CookieConsentModal } from "@keystone-sites/widgets/consent/CookieConsentModal";
import { AnalyticsConsent } from "@/site/consent/analytics-consent";
import { COPY } from "@/site/home/content";
import { SITE_URL } from "@/site/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Keystone | ${COPY.h1.join(" ")}`,
  description: COPY.sub,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Great businesses deserve to be found.",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
};

export const viewport: Viewport = { viewportFit: "cover" };

/* The consent bootstrap stamps data-consent-regime on <html> before hydration, which React must not
 * treat as a mismatch. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: CONSENT_REGIME_BOOTSTRAP_SCRIPT }} />
      </head>
      <body>
        <KeystoneServices posthog={false}>{children}</KeystoneServices>
        <CookieConsentModal />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
