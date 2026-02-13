import "./globals.css";
import type { Metadata } from "next";
import { KeystoneRootLayout } from 'keystone-design-bootstrap/next/layouts/root-layout';
import { config } from '@/config';

export const metadata: Metadata = {
  title: "*TR* Your Business",
  description: "*TR* Providing exceptional services"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <KeystoneRootLayout
      config={config}
    >
      {children}
    </KeystoneRootLayout>
  );
}
