import { GenericTextHero, ValuesSection, TeamGrid, TestimonialsHome, BlogSection, ContactSection } from 'keystone-design-bootstrap/sections';
import { getWebsitePhotos, getTeamMembers, getTestimonials, getBlogPosts } from 'keystone-design-bootstrap/lib/server-api';

export default async function AboutPage() {
  const [websitePhotos, teamMembers, testimonials, blogPosts] = await Promise.all([
    getWebsitePhotos(),
    getTeamMembers(),
    getTestimonials(),
    getBlogPosts(),
  ]);

  return (
    <main>
      {/* Hero Section */}
      <GenericTextHero 
        title="*TR* About Us"
        subtitle="*TR* Learn more about our story and mission"
      />
      
      {/* Values Section */}
      <ValuesSection 
        title="*TR* Founded to Democratize Access"
        subtitle="*TR* Our Mission & Values"
        values={[
          { 
            title: '*TR* Accessibility', 
            description: '*TR* Making high-end tools available to everyone, regardless of their background',
            icon: 'Users01'
          },
          { 
            title: '*TR* Quality', 
            description: '*TR* We never compromise on the quality of our services',
            icon: 'Star01'
          },
          { 
            title: '*TR* Innovation', 
            description: '*TR* Constantly improving and adopting the latest techniques',
            icon: 'Zap'
          },
        ]}
      />
      
      {/* Team Section */}
      <TeamGrid 
        teamMembers={teamMembers || []}
        title="*TR* Our Team"
        subtitle="*TR* Meet the dedicated professionals behind our success"
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
        title="*TR* Company News"
        subtitle="*TR* Stay updated with our latest updates"
      />
      
      {/* Contact Section */}
      <ContactSection 
        websitePhotos={websitePhotos}
        title="*TR* Get in Touch"
        subtitle="*TR* We would love to hear from you"
      />
    </main>
  );
}
