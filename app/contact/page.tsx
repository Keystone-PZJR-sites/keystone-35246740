import { GenericTextHero, ContactSection } from 'keystone-design-bootstrap/sections';
import { getWebsitePhotos } from 'keystone-design-bootstrap/lib/server-api';
import { config } from '@/config';

export default async function ContactPage() {
  const websitePhotos = await getWebsitePhotos();

  return (
    <main>
      {/* Hero Section */}
      <GenericTextHero 
        title="*TR* Contact Us"
        subtitle="*TR* We would love to hear from you"
      />
      
      {/* Contact Section */}
      <ContactSection 
        websitePhotos={websitePhotos}
        title="*TR* Get in Touch"
        subtitle="*TR* Have questions? Reach out to us and we will get back to you soon"
        config={config}
      />
    </main>
  );
}
