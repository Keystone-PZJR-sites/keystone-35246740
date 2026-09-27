import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage } from "@/site/pages/blog-post";
import { getBlogPostDetail } from "@/site/sections/blog-data";
import { SITE_LINKS } from "@keystone-sites/marketing-design-system/site-links";

interface BlogPostRouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostDetail(slug);
  if (!post) return { title: "Keystone" };
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.description,
    alternates: { canonical: `${SITE_LINKS.blog}/${post.slug}` },
  };
}

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
  const { slug } = await params;
  const post = await getBlogPostDetail(slug);
  if (!post) notFound();
  return <BlogPostPage post={post} />;
}
