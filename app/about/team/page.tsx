import { GenericTextHero, TeamGrid, TestimonialsHome, BlogSection } from 'keystone-design-bootstrap/sections';
import { getTeamMembers, getTestimonials, getBlogPosts } from 'keystone-design-bootstrap/lib/server-api';

export default async function TeamPage() {
  const [teamMembers, testimonials, blogPosts] = await Promise.all([
    getTeamMembers(),
    getTestimonials(),
    getBlogPosts(),
  ]);

  return (
    <main>
      {/* Hero Section */}
      <GenericTextHero 
        title="*TR* Our Team"
        subtitle="*TR* Meet the dedicated professionals behind our success"
      />
      
      {/* Team Grid Section */}
      <TeamGrid 
        teamMembers={teamMembers || []}
        title="*TR* Meet the Team"
        subtitle="*TR* Passionate experts committed to your success"
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
        title="*TR* Team Updates"
        subtitle="*TR* News from our team"
      />
    </main>
  );
}
