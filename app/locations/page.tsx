import { GenericTextHero, LocationGrid, TestimonialsHome, BlogSection, ContactSection } from 'keystone-design-bootstrap/sections';
import { getLocations, getTestimonials, getBlogPosts, getWebsitePhotos } from 'keystone-design-bootstrap/lib/server-api';

export default async function LocationsPage() {
  const [locations, testimonials, blogPosts, websitePhotos] = await Promise.all([
    getLocations(),
    getTestimonials(),
    getBlogPosts(),
    getWebsitePhotos(),
  ]);

  return (
    <main>
      {/* Hero Section */}
      <GenericTextHero 
        title="*TR* Our Locations"
        subtitle="*TR* Find a location near you"
      />
      
      {/* Locations Grid Section */}
      <LocationGrid 
        locations={locations || []}
        title="*TR* Where We Serve"
        subtitle="*TR* Visit any of our convenient locations"
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
        title="*TR* Location News"
        subtitle="*TR* Updates from our locations"
      />
      
      {/* Contact Section */}
      <ContactSection 
        websitePhotos={websitePhotos}
        title="*TR* Visit Us Today"
        subtitle="*TR* We look forward to seeing you"
      />
    </main>
  );
}
