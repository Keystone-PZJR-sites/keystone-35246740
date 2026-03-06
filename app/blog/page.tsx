import { BlogGallery, TestimonialsHome, ContactSection } from 'keystone-design-bootstrap/sections';
import { getBlogPosts, getTestimonials, getWebsitePhotos } from 'keystone-design-bootstrap/lib/server-api';
import { config } from '@/config';

export default async function BlogPage() {
  const [blogPosts, testimonials, websitePhotos] = await Promise.all([
    getBlogPosts(),
    getTestimonials(),
    getWebsitePhotos(),
  ]);

  return (
    <main>
      {/* Blog Gallery with integrated hero */}
      <BlogGallery 
        blogPosts={blogPosts || []}
        title="*TR* Our Blog"
        subtitle="*TR* Stay updated with the latest news and insights"
        postsPerPage={12}
      />
      
      {/* Testimonials Section */}
      <TestimonialsHome 
        testimonials={testimonials || []}
        title="*TR* What Our Clients Say"
        subtitle="*TR* Hear from our satisfied customers"
      />
      
      {/* Contact Section */}
      <ContactSection 
        websitePhotos={websitePhotos}
        title="*TR* Have Questions?"
        subtitle="*TR* We are here to help you"
        config={config}
      />
    </main>
  );
}
