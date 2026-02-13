import { GenericTextHero, SocialMediaGrid, TestimonialsHome, BlogSection, ContactSection } from 'keystone-design-bootstrap/sections';
import { getTestimonials, getBlogPosts, getSocialPosts } from 'keystone-design-bootstrap/lib/server-api';

export default async function SocialMediaPage() {
  const [socialPosts, testimonials, blogPosts] = await Promise.all([
    getSocialPosts(),
    getTestimonials(),
    getBlogPosts(),
  ]);

  return (
    <main>
      {/* Hero Section */}
      <GenericTextHero 
        title="*TR* Social Media"
        subtitle="*TR* Follow us and stay connected"
      />
      
      {/* Social Media Posts Grid */}
      <SocialMediaGrid 
        socialPosts={socialPosts || []}
        title="*TR* Latest Posts"
      />
      
      {/* Testimonials Section */}
      <TestimonialsHome 
        testimonials={testimonials || []}
        title="*TR* What Our Clients Say"
        subtitle="*TR* Hear from our satisfied customers"
      />
      
      {/* Blog Section */}
      <BlogSection 
        blogPosts={blogPosts || []}
        title="*TR* Related Articles"
        subtitle="*TR* Learn more"
      />
      
      {/* Contact Section */}
      <ContactSection 
        title="*TR* Get in Touch"
        subtitle="*TR* We would love to hear from you"
      />
    </main>
  );
}
