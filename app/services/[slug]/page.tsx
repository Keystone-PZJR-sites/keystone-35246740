import { ServiceDetailHero, FAQHome, TestimonialsHome, ContactSection } from 'keystone-design-bootstrap/sections';
import { getService, getFAQs, getTestimonials, getWebsitePhotos } from 'keystone-design-bootstrap/lib/server-api';
import { notFound } from 'next/navigation';
import { Button, MarkdownRenderer, PhotoWithFallback } from 'keystone-design-bootstrap/elements';
import { config } from '@/config';

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;

  const [service, faqs, testimonials, websitePhotos] = await Promise.all([
    getService(slug),
    getFAQs(),
    getTestimonials(),
    getWebsitePhotos(),
  ]);

  if (!service) {
    notFound();
  }

  const serviceData = service as { 
    name?: string; 
    summary?: string; 
    description_markdown?: string; 
    id?: number;
  };

  return (
    <main>
      {/* Hero Section */}
      <ServiceDetailHero service={service} />
      
      {/* Why We're Different Section with Image Split */}
      {serviceData.description_markdown && (
        <section className="flex flex-col gap-12 md:gap-16">
          <div className="mx-auto flex w-full max-w-container flex-col items-stretch justify-between gap-8 px-4 md:flex-row md:items-start md:px-8">
            <div className="flex max-w-3xl flex-col">
              <span className="text-sm font-semibold text-brand-secondary md:text-md">*TR* Why we&apos;re different</span>
              <h2 className="mt-3 font-display text-4xl font-normal text-fg-primary md:text-5xl">
                {serviceData.name}
              </h2>
              <p className="mt-4 font-body text-lg text-tertiary md:mt-5 md:text-xl">
                {serviceData.summary || '*TR* Learn more about our comprehensive service offering.'}
              </p>
            </div>
            <Button
              size="xl"
              color="primary"
              href="/portal"
            >
              Services and pricing
            </Button>
          </div>

          <div className="mx-auto grid w-full max-w-container grid-cols-1 gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-8">
            <div className="prose md:prose-lg font-body">
              <MarkdownRenderer content={serviceData.description_markdown} />
            </div>

            <PhotoWithFallback
              item={service}
              fallbackId={serviceData.id || 1}
              className="h-60 w-full object-cover md:h-[560px]"
              alt={serviceData.name || "Service image"}
            />
          </div>
        </section>
      )}
      
      {/* FAQ Section */}
      <FAQHome 
        faqs={faqs || []}
        title="*TR* Frequently Asked Questions"
        subtitle="*TR* Common questions about this service"
      />
      
      {/* Testimonials Section */}
      <TestimonialsHome 
        testimonials={testimonials || []}
        title="*TR* What Our Clients Say"
        subtitle="*TR* Hear from our satisfied customers"
      />
      
      {/* Contact Section */}
      <ContactSection 
        websitePhotos={websitePhotos}
        title="*TR* Ready to Get Started?"
        subtitle="*TR* Contact us to learn more"
        config={config}
      />
    </main>
  );
}
