import type { Metadata } from "next";
import { ContactPage } from "@/site/pages/contact";

export const metadata: Metadata = {
  title: "Contact | Keystone",
  description: "Contact Keystone about sales, marketing, and growth support for your business.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
