import { GenericTextHero, TeamGrid, JobGallery, TestimonialsHome, BlogSection, ContactSection } from 'keystone-design-bootstrap/sections';
import { getTeamMembers, getJobPostings, getTestimonials, getBlogPosts, getWebsitePhotos } from 'keystone-design-bootstrap/lib/server-api';

export default async function CareersPage() {
  const [teamMembers, jobs, testimonials, blogPosts, websitePhotos] = await Promise.all([
    getTeamMembers(),
    getJobPostings(),
    getTestimonials(),
    getBlogPosts(),
    getWebsitePhotos(),
  ]);

  return (
    <main>
      {/* Hero Section */}
      <GenericTextHero 
        title="*TR* Careers"
        subtitle="*TR* Join our growing team and make an impact"
      />
      
      {/* Team Section (showing current team) */}
      <TeamGrid 
        teamMembers={teamMembers || []}
        title="*TR* Meet the Team"
        subtitle="*TR* Work alongside talented professionals"
      />
      
      {/* Jobs Section */}
      <JobGallery 
        jobs={jobs || []}
        websitePhotos={websitePhotos}
        title="*TR* Open Positions"
        subtitle="*TR* Find your next opportunity"
      />
      
      {/* Testimonials Section */}
      <TestimonialsHome 
        testimonials={testimonials || []}
        title="*TR* What Our Team Says"
        subtitle="*TR* Hear from our employees"
      />
      
      {/* Blog Section */}
      <BlogSection 
        blogPosts={blogPosts || []}
        title="*TR* Company Culture"
        subtitle="*TR* Learn about life at our company"
      />
      
      {/* Contact Section */}
      <ContactSection 
        websitePhotos={websitePhotos}
        title="*TR* Ready to Join Us?"
        subtitle="*TR* We are always looking for talented individuals"
      />
    </main>
  );
}
