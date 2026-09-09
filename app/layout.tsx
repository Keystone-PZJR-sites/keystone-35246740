import "@/design-system/index.css";
import "@/design-system/widgets.css";
import type { Metadata, Viewport } from "next";
import { getConsentRegime } from "@keystone-sites/core";
import { CookieConsentModal } from "@keystone-sites/widgets/consent/CookieConsentModal";
import { SiteChat } from "@/design-system/sections/site-chat";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!siteUrl) {
  throw new Error("Missing required environment variable: NEXT_PUBLIC_SITE_URL");
}

/* Static metadata never blocks HTML delivery. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Keystone | Sales & Marketing for Local Businesses",
  description:
    "Keystone is a sales and marketing team for local businesses. We help you grow your business by running your sales and marketing while you run your business.",
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
  openGraph: { images: [{ url: "/og-image.png" }] },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
};

export const viewport: Viewport = {
  // bg/100 — the literal because the token stylesheet cannot be read here.
  themeColor: "#f8f7f2",
};

/** `.site-root` provides the grid's size container. Site chat mounts
 * outside `.page`, so fixed chat chrome does not affect grid geometry. */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const consentRegime = await getConsentRegime();

  return (
    <html lang="en" data-consent-regime={consentRegime}>
      <head>
        {/*
         * Cold-load guard — inlined in the raw HTML so the page color is
         * right from byte 1, before any stylesheet arrives. The literal is
         * the bg/100 token value; a token var cannot be used here because
         * the token stylesheet has not loaded yet.
         */}
        <style>{`html,body{background-color:#f8f7f2}`}</style>

        {/*
         * Preload hints for the two site fonts. The browser discovers
         * @font-face rules only after parsing the CSS, so without these
         * the font fetches start hundreds of milliseconds late. Both are
         * small self-hosted variable fonts.
         */}
        <link
          rel="preload"
          href="/media/fonts/gt-standard-standard-vf.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/media/fonts/pp-kyoto-variable-upright-vf.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="site-root">
        {children}
        <SiteChat />
        <CookieConsentModal />
      </body>
    </html>
  );
}
