import "@/design-system/v2/index.css";
import "@/design-system/v2/widgets.css";
import type { Metadata, Viewport } from "next";
import { SiteChat } from "@/design-system/v2/sections/site-chat";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://keystone.app");

/* Metadata is static so it never blocks HTML delivery. The title,
 * description, and og-image are the standing site copy — the new-brand
 * copy and social card are an open content decision (spec 010 §7 F2)
 * and replace these values in place when design supplies them. */
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

/** The root layout — owned by the rebuild (spec 010 §4). `body` carries
 * `.v2-root`: the site base styles and the size container the grid
 * engine's container queries read (design-system/v2/base.css,
 * grid/engine.css). The site chat (spec 024) mounts after the page on
 * every route — fixed chrome outside `.page`, so the grid sweep never
 * sees it. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
         * small self-hosted variable fonts (spec 001; font-display: swap).
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
      <body className="v2-root">
        {children}
        <SiteChat />
      </body>
    </html>
  );
}
