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
  return (
    <KeystoneRootLayout
      config={config}
    >
      {children}
    </KeystoneRootLayout>
  );
}
