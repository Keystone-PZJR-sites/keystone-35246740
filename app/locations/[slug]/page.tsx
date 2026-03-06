import { LocationDetailHero, LocationDetailsSection, TestimonialsHome, BlogSection, ContactSection } from 'keystone-design-bootstrap/sections';
import { getLocation, getTestimonials, getBlogPosts, getWebsitePhotos, getCompanyInformation } from 'keystone-design-bootstrap/lib/server-api';
import { notFound } from 'next/navigation';
import { config } from '@/config';

interface LocationDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LocationDetailPage({ params }: LocationDetailPageProps) {
  const { slug } = await params;

  const [location, testimonials, blogPosts, websitePhotos, companyInformation] = await Promise.all([
    getLocation(slug),
    getTestimonials(),
    getBlogPosts(),
    getWebsitePhotos(),
    getCompanyInformation(),
  ]);

  if (!location) {
    notFound();
  }

  return (
    <main>
      {/* Hero Section - Book Now uses booking link when company has external_management_url */}
      <LocationDetailHero location={location} companyInformation={companyInformation} />
      
      {/* Contact Section with Icons and Map */}
      <LocationDetailsSection location={location} />
      
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
        subtitle="*TR* Learn more about this location"
      />
      
      {/* Contact Section */}
      <ContactSection 
        websitePhotos={websitePhotos}
        title="*TR* Visit Us Today"
        subtitle="*TR* We look forward to seeing you"
        config={config}
      />
    </main>
  );
}
