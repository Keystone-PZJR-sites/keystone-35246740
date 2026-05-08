import "./globals.css";
import type { Metadata } from "next";
import { Inter, Bangers, Dongle, Fraunces, Josefin_Slab, DM_Mono } from 'next/font/google';
import { KeystoneRootLayout } from 'keystone-design-bootstrap/next/layouts/root-layout';
import { getWebsitePhotos } from 'keystone-design-bootstrap/lib/server-api';
import { config } from '@/config';

// ---------------------------------------------------------------------------
// Google Fonts — loaded and self-hosted by Next.js at build time.
// Importing them registers the @font-face rules globally so the work-showcase
// card mocks can reference these fonts by name in inline styles.
// ---------------------------------------------------------------------------
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});
const bangers = Bangers({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-bangers',
});
const dongle = Dongle({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-dongle',
});
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
});
const josefinSlab = Josefin_Slab({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-josefin-slab',
});
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-dm-mono',
});

export async function generateMetadata(): Promise<Metadata> {
  const websitePhotos = await getWebsitePhotos();
  const faviconUrl = websitePhotos?.favicon?.url;
  const previewImageUrl = websitePhotos?.preview_image?.url;
  return {
    title: "Keystone | Sales & Marketing for Local Businesses",
    description: "Keystone is a sales and marketing team for local businesses. We help you grow your business by running your sales and marketing while you run your business.",
    ...(faviconUrl && {
      icons: { icon: faviconUrl, shortcut: faviconUrl },
    }),
    ...(previewImageUrl && {
      openGraph: { images: [{ url: previewImageUrl }] },
      twitter: { card: 'summary_large_image', images: [previewImageUrl] },
    }),
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Apply font CSS-variable classes to a wrapper so Next.js self-hosts the
  // font files and injects the @font-face rules globally. The variables are
  // available throughout the tree and the fonts can be referenced by name
  // in inline styles (e.g. fontFamily: "'Inter', system-ui, sans-serif").
  const fontClasses = [
    inter.variable,
    bangers.variable,
    dongle.variable,
    fraunces.variable,
    josefinSlab.variable,
    dmMono.variable,
  ].join(' ');

  return (
    <KeystoneRootLayout
      config={config}
    >
      <div className={fontClasses} style={{ display: 'contents' }}>
        {children}
      </div>
    </KeystoneRootLayout>
  );
}
