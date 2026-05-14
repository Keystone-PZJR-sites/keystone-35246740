import "./globals.css";
import type { Metadata } from "next";
import { KeystoneRootLayout } from 'keystone-design-bootstrap/next/layouts/root-layout';
import { config } from '@/config';

// ---------------------------------------------------------------------------
// Metadata — static so generateMetadata never blocks HTML delivery.
// The OG image is a static asset at /public/og-image.png — update the file
// to change what appears in social share previews.
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "Keystone | Sales & Marketing for Local Businesses",
  description: "Keystone is a sales and marketing team for local businesses. We help you grow your business by running your sales and marketing while you run your business.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: { images: [{ url: '/og-image.png' }] },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <KeystoneRootLayout config={config}>
      {/*
       * Critical inline CSS — embedded in the raw HTML so the dark background
       * is guaranteed from byte 1, before any external stylesheet is fetched.
       * Prevents the white flash on cold load regardless of CSS delivery speed.
       */}
      <style>{`html,body{background-color:#042019}`}</style>

      {/*
       * Only the first hero clip gets initial video priority. All other videos
       * render preload="none" and are unlocked by proximity/interaction gates.
       */}
      <link
        rel="preload"
        href="/videos/hero-autoloop-clips/hero-01.webm"
        as="video"
        type="video/webm"
        // @ts-expect-error — fetchpriority is valid but not yet in React's types
        fetchpriority="high"
        crossOrigin="anonymous"
      />

      {/*
       * Preload hints for above-the-fold FK fonts. The browser discovers
       * @font-face rules late (only after parsing the CSS file), so without
       * these hints font fetches start hundreds of milliseconds too late.
       * These tell the browser to fetch in parallel with the HTML itself.
       * Covers sections 1 and 2; all other FK variants are font-display:optional
       * and load silently in the background.
       */}
      <link rel="preload" href="/fonts/FKScreamer-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/FKGroteskNeue-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/FKGroteskNeue-Italic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/FKRomanStandard-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

      <div style={{ display: 'contents' }}>
        {children}
      </div>
    </KeystoneRootLayout>
  );
}
