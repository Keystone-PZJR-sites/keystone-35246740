import { GenericTextHero, ServicesGrid, TestimonialsHome, BlogSection, ContactSection } from 'keystone-design-bootstrap/sections';
import { getServices, getTestimonials, getBlogPosts } from 'keystone-design-bootstrap/lib/server-api';

export default async function ServicesPage() {
  const [services, testimonials, blogPosts] = await Promise.all([
    getServices(),
    getTestimonials(),
    getBlogPosts(),
  ]);

  return (
    <main>
      {/* Hero Section */}
      <GenericTextHero 
        title="*TR* Our Services"
        subtitle="*TR* Explore our comprehensive range of services"
      />
      
      {/* Services Grid Section */}
      <ServicesGrid 
        services={services || []}
        title="*TR* Available Services"
        subtitle="*TR* Browse our complete service offerings"
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
        subtitle="*TR* Learn more about our services"
      />
      
      {/* Contact Section */}
      <ContactSection 
        title="*TR* Ready to Get Started?"
        subtitle="*TR* Contact us to learn more about our services"
      />
    </main>
  );
}
