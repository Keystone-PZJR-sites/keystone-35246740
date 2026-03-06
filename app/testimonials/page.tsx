import { TestimonialsHero, TestimonialsHome, StatisticsSection, BlogSection, ContactSection } from 'keystone-design-bootstrap/sections';
import { getTestimonials, getBlogPosts, getWebsitePhotos } from 'keystone-design-bootstrap/lib/server-api';
import { config } from '@/config';

export default async function TestimonialsPage() {
  const [testimonials, blogPosts, websitePhotos] = await Promise.all([
    getTestimonials(),
    getBlogPosts(),
    getWebsitePhotos(),
  ]);

  return (
    <main>
      {/* Hero Section */}
      <TestimonialsHero 
        title="*TR* Testimonials"
        subtitle="*TR* See what our clients have to say"
      />
      
      {/* Stats Section */}
      <StatisticsSection 
        title="*TR* By the Numbers"
        subtitle="*TR* Our track record speaks for itself"
        statistics={[
          { number: '*TR* 500+', label: '*TR* Happy Clients' },
          { number: '*TR* 5.0', label: '*TR* Average Rating' },
          { number: '*TR* 98%', label: '*TR* Would Recommend' },
        ]}
      />
      
      {/* Main Testimonials Grid */}
      <TestimonialsHome 
        testimonials={testimonials || []}
        title="*TR* What Our Clients Say"
        subtitle="*TR* Real stories from real people"
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
        title="*TR* Ready to Join Them?"
        subtitle="*TR* Get in touch with us today"
        config={config}
      />
    </main>
  );
}
