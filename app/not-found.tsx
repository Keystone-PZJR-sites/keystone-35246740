import type { Metadata } from "next";
import { Frame } from "@/site/frame";

export const metadata: Metadata = {
  title: "Page not found | Keystone",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Frame
      title="Page not found"
      description="That page isn’t here. It may have moved, or the link may be out of date."
    />
  );
}
