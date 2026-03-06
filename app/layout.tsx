import "./globals.css";
import type { Metadata } from "next";
import { KeystoneRootLayout } from 'keystone-design-bootstrap/next/layouts/root-layout';
import { getWebsitePhotos } from 'keystone-design-bootstrap/lib/server-api';
import { config } from '@/config';

export async function generateMetadata(): Promise<Metadata> {
  const websitePhotos = await getWebsitePhotos();
  const faviconUrl = websitePhotos?.favicon?.url;
  const previewImageUrl = websitePhotos?.preview_image?.url;
  return {
    title: "*TR* Your Business",
    description: "*TR* Providing exceptional services",
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
  return (
    <KeystoneRootLayout
      config={config}
    >
      {children}
    </KeystoneRootLayout>
  );
}
