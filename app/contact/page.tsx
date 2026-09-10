import type { Metadata } from "next";
import { ContactPage } from "@/design-system/pages/contact";

export const metadata: Metadata = {
  title: "Contact | Keystone",
  description:
    "Contact Keystone about sales, marketing, and growth support for your local business.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
