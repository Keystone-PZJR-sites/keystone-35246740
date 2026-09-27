import type { Metadata } from "next";
import { PriceListPage } from "@/site/pages/price-list";

export const metadata: Metadata = {
  title: "Price List | Keystone",
  description:
    "What each job costs: twenty-three common jobs across website, content, social, ads, listings, conversations, and strategy, with what they typically cost.",
};

export default function UsagePriceList() {
  return <PriceListPage />;
}
