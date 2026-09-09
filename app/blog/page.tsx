import type { Metadata } from "next";
import BlogGridCheck from "../grid/pages/blog";
import { BlogPage } from "@/design-system/pages/blog";
import { getBlogLanding } from "@/design-system/sections/blog-data";

export const metadata: Metadata = {
  title: "Blog | Keystone",
};

export default async function Blog() {
  const landing = await getBlogLanding();
  return <BlogPage landing={landing} gridCheck={<BlogGridCheck landing={landing} />} />;
}
