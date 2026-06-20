import type { Metadata } from 'next';
import { PortalPage } from 'keystone-design-bootstrap/portal';
import {
  WorkShowcase,
  MobileWorkShowcase,
  PricingSection,
  MobilePricingSection,
  ValueProps,
  MobileValueProps,
  SocialProofSection,
  MobileSocialProof,
} from '@/design-system';
import {
  VALUE_PROP_CARDS,
  SHARED_WORK_SHOWCASE_PROPS,
  SHARED_MOBILE_WORK_SHOWCASE_PROPS,
  SHARED_PRICING_SECTION_PROPS,
  SHARED_MOBILE_PRICING_SECTION_PROPS,
  SOCIAL_THUMBNAILS,
  MOBILE_SOCIAL_THUMBNAILS,
  SOCIAL_SLIDES,
  MEDIA,
} from '@/data';

export const metadata: Metadata = {
  title: 'Portal | Keystone',
  description: 'Access Keystone booking, services, and messages.',
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  return (
    <div className="inner-page custom-portal-shell" data-theme="custom">
      <header className="inner-page-header">
        <div className="inner-page-header-inner">
          <h1 className="inner-page-title">Member Portal</h1>
          <p className="inner-page-subtitle">
            View up-to-date service pricing, schedule a marketing audit, or access marketing resources. Joining is free and just takes a minute.
          </p>
        </div>
      </header>

      <main>
        <div className="custom-portal-frame">
          <PortalPage
            searchParams={searchParams}
            enabledTabs={['services', 'book', 'messages']}
            bookingLabel="Book Demo"
            tabLabels={{ services: 'Customer Pricing', messages: 'Chat with Us' }}
          />
        </div>

        <SocialProofSection
          headlineLine1="Great BUSINESSES "
          headlineLine2="deserve to be found."
          thumbnails={SOCIAL_THUMBNAILS}
          slides={SOCIAL_SLIDES}
          closeButtonSrc={MEDIA.socialProof.modalButton.src}
        />
        <MobileSocialProof
          headlineLine1="Great BUSINESSES "
          headlineLine2="deserve to be found."
          thumbnails={MOBILE_SOCIAL_THUMBNAILS}
          slides={SOCIAL_SLIDES}
          closeButtonSrc={MEDIA.socialProof.modalButton.src}
        />

        <WorkShowcase {...SHARED_WORK_SHOWCASE_PROPS} />
        <MobileWorkShowcase {...SHARED_MOBILE_WORK_SHOWCASE_PROPS} />

        <PricingSection {...SHARED_PRICING_SECTION_PROPS} />
        <MobilePricingSection {...SHARED_MOBILE_PRICING_SECTION_PROPS} />

        <ValueProps
          headlinePreamble="Not an agency. Not software. Something "
          headlineItalic="better"
          learnMoreLabel="Get in touch"
          getStartedLabel="Services and pricing"
          cards={VALUE_PROP_CARDS}
        />
        <MobileValueProps
          headlineLine1="Not an Agency, Not Software."
          headlineLine2="Something Better."
          cards={VALUE_PROP_CARDS}
        />
      </main>
    </div>
  );
}
