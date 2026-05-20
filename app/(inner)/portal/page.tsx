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
} from '@/components/sections';
import {
  WORK_HEADLINE_PARTS,
  WORK_INDUSTRIES,
  WORK_CARDS,
  VALUE_PROP_CARDS,
  SOCIAL_THUMBNAILS,
  MOBILE_SOCIAL_THUMBNAILS,
  SOCIAL_SLIDES,
} from '@/data';

const PRICING_CHIPS = [
  { label: 'Your Website', iconColor: '#FF6F5C' },
  { label: 'Your CRM', iconColor: '#F297B7' },
  { label: 'Your Ads', iconColor: '#F38BB0' },
  { label: 'Your Sales', iconColor: '#9C65EE' },
  { label: 'Your Front Desk', iconColor: '#5BC3B3' },
  { label: 'Your Social', iconColor: '#65CF78' },
  { label: 'Your Reviews', iconColor: '#56A6FF' },
  { label: 'Your Content', iconColor: '#F1C131' },
  { label: 'Your Listings', iconColor: '#F57E56' },
];

const PRICING_CREDITS_TEXT =
  'Keystone work runs on credits. Credits are usage-based and cover anything Keystone does for you. Posts written. Leads replied to. Campaigns launched. Reviews responded to.';

const MARKETPLACE_ADDON = {
  label: 'Marketplace',
  description: "Checkout, memberships, and bookings from Keystone's consumer platform.",
};

const PAYMENTS_ADDON = {
  label: 'Payments',
  description: 'Standard payment processing on transactions.',
};

export const metadata: Metadata = {
  title: 'Portal | Keystone',
  description: 'Access Keystone booking, services, and messages.',
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  return (
    <div className="inner-page custom-portal-shell" data-theme="custom">
      <header className="inner-page-header">
        <div className="inner-page-header-inner">
          <h1 className="inner-page-title">View Services &amp; Book Demo</h1>
          <p className="inner-page-subtitle">
            Great businesses deserve to be found. Review the services we offer, chat with us, or find time to book a demo.
          </p>
        </div>
      </header>

      <main>
        <div className="custom-portal-frame">
          <PortalPage
            searchParams={searchParams}
            enabledTabs={['services', 'book', 'messages']}
            bookingLabel="Book Demo"
            tabLabels={{ services: 'Services & Pricing', messages: 'Chat with Us' }}
          />
        </div>

        <SocialProofSection
          headlineLine1="Great BUSINESSES "
          headlineLine2="deserve to be found."
          thumbnails={SOCIAL_THUMBNAILS}
          slides={SOCIAL_SLIDES}
          closeButtonSrc="/social-proof/social-proof-modal-button.svg"
        />
        <MobileSocialProof
          headlineLine1="Great BUSINESSES "
          headlineLine2="deserve to be found."
          thumbnails={MOBILE_SOCIAL_THUMBNAILS}
          slides={SOCIAL_SLIDES}
          closeButtonSrc="/social-proof/social-proof-modal-button.svg"
        />

        <WorkShowcase
          headlineParts={WORK_HEADLINE_PARTS}
          industries={WORK_INDUSTRIES}
          cards={WORK_CARDS}
        />
        <MobileWorkShowcase
          headlineParts={WORK_HEADLINE_PARTS}
          industries={WORK_INDUSTRIES}
          cards={WORK_CARDS}
        />

        <PricingSection
          tagline="Always-on Sales & Marketing"
          priceAmount="$49 "
          pricePeriod="/ MONTH"
          subCopyLine1="Per location. Every tool included."
          subCopyLine2="No contracts. No negotiation. Simple to scale."
          featureChips={PRICING_CHIPS}
          creditsText={PRICING_CREDITS_TEXT}
          addOnsHeading="ADD ONS"
          marketplace={MARKETPLACE_ADDON}
          payments={PAYMENTS_ADDON}
          comingSoonLabel="Coming soon."
          addonIconSrc="/pricing/pricing-addon-icon.svg"
        />
        <MobilePricingSection
          tagline="Always-on Sales & Marketing"
          priceAmount="$49 "
          pricePeriod="/ MONTH"
          subCopyLine1="Per location. Every tool included."
          subCopyLine2="No contracts. No negotiation. Simple to scale."
          creditsText={PRICING_CREDITS_TEXT}
          addOnsHeading="ADD ONS"
          marketplace={MARKETPLACE_ADDON}
          payments={PAYMENTS_ADDON}
          comingSoonLabel="Coming soon."
          addonIconSrc="/pricing/pricing-addon-icon.svg"
        />

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
