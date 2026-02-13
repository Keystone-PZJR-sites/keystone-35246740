import { FAQHero, FAQHome, TestimonialsHome, BlogSection, ContactSection } from 'keystone-design-bootstrap/sections';
import { getFAQs, getTestimonials, getBlogPosts, getWebsitePhotos } from 'keystone-design-bootstrap/lib/server-api';

export default async function FAQPage() {
  const [faqs, testimonials, blogPosts, websitePhotos] = await Promise.all([
    getFAQs(),
    getTestimonials(),
    getBlogPosts(),
    getWebsitePhotos(),
  ]);

  return (
    <main>
      {/* Hero Section */}
      <FAQHero 
        title="*TR* Frequently Asked Questions"
        subtitle="*TR* Find answers to common questions"
      />
      
      {/* FAQ Accordion Section */}
      <FAQHome 
        faqs={faqs || []}
        title="*TR* Common Questions"
        subtitle="*TR* Everything you need to know"
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
        websitePhotos={websitePhotos}
        title="*TR* Still Have Questions?"
        subtitle="*TR* We are happy to help"
      />
    </main>
  );
}
