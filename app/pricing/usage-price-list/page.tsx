import type { Metadata } from "next";
import { UsagePriceListPage } from "@/site/pages/usage-price-list";

export const metadata: Metadata = {
  title: "Usage Price List | Keystone",
  description:
    "What a credit buys: twenty-three common jobs across website, content, social, ads, listings, conversations, and strategy, with what they typically cost.",
};

export default function UsagePriceList() {
  return <UsagePriceListPage />;
}
