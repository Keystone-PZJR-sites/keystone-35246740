import { 
  HeroHome, 
  ServicesHome, 
  AboutHome, 
  TestimonialsHome, 
  FAQHome,
  BlogSection,
  ContactSection 
} from 'keystone-design-bootstrap/sections';
import {
  getServices,
  getTestimonials,
  getFAQs,
  getBlogPosts,
  getCompanyInformation,
  getWebsitePhotos,
} from 'keystone-design-bootstrap/lib/server-api';

export default async function HomePage() {
  // Fetch all data in parallel on the server
  const [
    services,
    testimonials,
    faqs,
    blogPosts,
    companyInformation,
    websitePhotos,
  ] = await Promise.all([
    getServices(),
    getTestimonials(),
    getFAQs(),
    getBlogPosts(),
    getCompanyInformation(),
    getWebsitePhotos(),
  ]);

  return (
    <main>
      {/* 1. Hero Section - CTA uses booking link when company has external_management_url */}
      <HeroHome 
        websitePhotos={websitePhotos}
        companyInformation={companyInformation}
        reviews={{ rating: 5.0, count: 200 }}
        headline="*TR* Your Slogan Here"
        subhead="*TR* A brief description of your business and what makes you special"
        tagline="*TR* Your Tagline"
        ctaText="*TR* Book Now"
        statistics={[
          { number: '*TR* 10+', label: '*TR* Years Experience', icon: 'Users01' },
          { number: '*TR* 500+', label: '*TR* Happy Clients', icon: 'Heart' },
          { number: '*TR* 50+', label: '*TR* Team Members', icon: 'Building07' },
          { number: '*TR* 100%', label: '*TR* Satisfaction', icon: 'Star01' },
        ]}
      />
      
      {/* 2. Services Section */}
      <ServicesHome 
        services={services || []}
        title="*TR* Our Services"
        subtitle="*TR* Comprehensive solutions for all your needs"
      />
      
      {/* 3. About Us Section */}
      <AboutHome 
        companyInformation={companyInformation}
        websitePhotos={websitePhotos}
        title="*TR* About Us"
        subtitle="*TR* Learn more about our company"
        ctaText="Learn more"
        tagline="*TR* A header label (a few words) for the about us section"
        description="*TR* Your about us description here"
        bullets={[
          "*TR* First bullet point",
          "*TR* Second bullet point",
          "*TR* Third bullet point"
        ]}
        ctaHref="/about"
      />
      
      {/* 4. Testimonials Section */}
      <TestimonialsHome 
        testimonials={testimonials || []}
        title="*TR* What Our Clients Say"
        subtitle="*TR* Hear from our satisfied customers"
      />
      
      {/* 5. Blog Section (after testimonials) */}
      <BlogSection 
        blogPosts={blogPosts || []}
        title="*TR* Latest News"
        subtitle="*TR* Stay updated with our blog"
      />
      
      {/* 6. Contact Section */}
      <ContactSection 
        websitePhotos={websitePhotos}
        title="*TR* Get in Touch"
        subtitle="*TR* We would love to hear from you"
      />
      
      {/* 7. FAQ Section (last, before footer) */}
      <FAQHome 
        faqs={faqs || []}
        title="*TR* Frequently Asked Questions"
        subtitle="*TR* Find answers to common questions"
      />
    </main>
  );
}
