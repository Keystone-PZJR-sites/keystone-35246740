import { BlogPostSection } from 'keystone-design-bootstrap/sections';
import { serverApi } from 'keystone-design-bootstrap/lib/server-api';
import { notFound } from 'next/navigation';
import type { BlogPost } from 'keystone-design-bootstrap/types';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  // Fetch all blog posts to find the one by slug
  const blogPosts = await serverApi.get<BlogPost[]>('/public/blog_posts').catch(() => []);
  
  const post = blogPosts?.find((p: BlogPost) => p.slug === slug) || null;
  
  if (!post) {
    notFound();
  }
  
  // Get related posts (excluding current)
  const relatedPosts = blogPosts?.filter((p: BlogPost) => p.id !== post.id).slice(0, 3) || [];

  return (
    <main>
      <BlogPostSection blogPost={post} relatedPosts={relatedPosts} />
    </main>
  );
}
