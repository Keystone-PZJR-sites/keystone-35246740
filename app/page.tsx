// ============================================================
// HOME PAGE — Custom Corporate Site
// ============================================================
// Server Component. Fetches data and passes it down to client
// leaf components. No 'use client' here.
//
// Section content lives in `@/data` — page files compose, data files hold
// data. This file should stay focused on layout and values that change
// with the page rendering context (CTA copy, company-info-derived urls,
// hero metadata, etc.).
// ============================================================

import {
  HeroAnimatic,
  MobileHero,
  HeroNav,
  WorkShowcase,
  EveryChannel,
  MobileEveryChannel,
  ProductScreens,
  MobileProductScreens,
  ValueProps,
  MobileValueProps,
  SocialProofSection,
  MobileSocialProof,
  PricingSection,
  MobilePricingSection,
  OversizedFooter,
  MobileFooter,
  LeadCaptureProvider,
} from '@/components/sections';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { PillHandoffProvider } from '@/components/PillHandoffProvider';
import { getCompanyInformation } from 'keystone-design-bootstrap/lib/server-api';
import {
  WORK_INDUSTRIES,
  WORK_HEADLINE_PARTS,
  WORK_CARDS,
  EVERY_CHANNEL_PILLS,
  MOBILE_EVERY_CHANNEL_PILLS,
  PRODUCT_SCREENS_TOOLS,
  VALUE_PROP_CARDS,
  SOCIAL_THUMBNAILS,
  MOBILE_SOCIAL_THUMBNAILS,
  SOCIAL_SLIDES,
} from '@/data';

const HERO_VIDEOS = [
  '/videos/hero-autoloop-clips/herovideo-01.mp4',
  '/videos/hero-autoloop-clips/herovideo-02.mp4',
  '/videos/hero-autoloop-clips/herovideo-03.mp4',
  '/videos/hero-autoloop-clips/herovideo-04.mp4',
  '/videos/hero-autoloop-clips/herovideo-05.mp4',
  '/videos/hero-autoloop-clips/herovideo-06.mp4',
];

const PRICING_CHIPS = [
  { label: 'Your Website',    iconColor: '#FF6F5C' },
  { label: 'Your CRM',        iconColor: '#F297B7' },
  { label: 'Your Ads',        iconColor: '#F38BB0' },
  { label: 'Your Sales',      iconColor: '#9C65EE' },
  { label: 'Your Front Desk', iconColor: '#5BC3B3' },
  { label: 'Your Social',     iconColor: '#65CF78' },
  { label: 'Your Reviews',    iconColor: '#56A6FF' },
  { label: 'Your Content',    iconColor: '#F1C131' },
  { label: 'Your Listings',   iconColor: '#F57E56' },
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

export default async function HomePage() {
  const companyInfo = await getCompanyInformation();
  return (
    <LeadCaptureProvider
      wordmarkSrc="/images/keystone-wordmark.svg"
      markColor="#6ECC8B"
      ctaArrowSrc="/lead-capture/lead-capture-cta-arrow.svg"
      submitLabel="Learn More"
      subheadline="The modern sales and marketing team for local businesses. Reach out below to connect with our team."
      termsHref="/terms-of-service"
      privacyHref="/privacy-policy"
    >
      <PillHandoffProvider>
        <SmoothScrollProvider
          fixedChildren={<HeroNav wordmarkSrc="/images/keystone-wordmark.svg" />}
        >
          {/*
           * Animated sections — one contained group driven by the scroll state machine.
           * Every section inside <main> is viewport-height and participates in the
           * pin + snap animator. The footer is intentionally a sibling, not a child.
           */}
          <main>
            {/* Mobile hero — visible below 768 px, hidden at md+ (MobileHero is md:hidden) */}
            <MobileHero
              headlineLine1="Always ON "
              headlineLine2="SALES & MARKETING"
              subheadline="A team of experts running your marketing while you run your business."
              cta1Label="Learn more"
              cta2Label="Get started"
              videoSrcs={HERO_VIDEOS}
              markColor="#6ECC8B"
            />
            {/* Desktop/tablet hero — hidden below 768 px (HeroAnimatic is hidden md:block) */}
            <HeroAnimatic
              headlineLine1="Always ON "
              headlineLine2="SALES & MARKETING"
              subheadline="A team of experts running your marketing while you run your business."
              cta1Label="Learn more"
              cta2Label="Get started"
              videoSrcs={HERO_VIDEOS}
              markColor="#6ECC8B"
            />
            <WorkShowcase
              headlineParts={WORK_HEADLINE_PARTS}
              industries={WORK_INDUSTRIES}
              cards={WORK_CARDS}
            />
            <EveryChannel
              line1="Every CHANNEL."
              line2="Every INTERACTION."
              line3="done-for-you."
              videoSrc="/every-channel/every-channel-bg.mp4"
              pills={EVERY_CHANNEL_PILLS}
            />
            <MobileEveryChannel
              line1="Every CHANNEL."
              line2="Every INTERACTION."
              line3="done-for-you."
              videoSrc="/every-channel/every-channel-bg.mp4"
              pills={MOBILE_EVERY_CHANNEL_PILLS}
            />
            <ProductScreens tools={PRODUCT_SCREENS_TOOLS} />
            <MobileProductScreens tools={PRODUCT_SCREENS_TOOLS} />
            <ValueProps
              headlinePreamble="Not an agency. Not software. Something "
              headlineItalic="better"
              learnMoreLabel="Learn more"
              getStartedLabel="Get started"
              cards={VALUE_PROP_CARDS}
            />
            <MobileValueProps
              headlineLine1="Not an Agency, Not Software."
              headlineLine2="Something Better."
              cards={VALUE_PROP_CARDS}
            />
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
          </main>

          {/*
           * Footer — outside the animated sections group.
           * Not viewport-height, not held by the animator, no states or transitions.
           * The visitor scrolls into it naturally after Pricing releases.
           */}
          <OversizedFooter
            line1="FOR BUSINESSES"
            line2="THAT ARE"
            line3=" DONE FIGURING"
            line4="IT OUT THEMSELVES"
            leftTagline="The modern growth team for local business."
            rightTagline="Stay informed about our latest features and product releases"
            cta1Label="The Blog"
            cta1Href="/blog"
            cta2Label="Get started"
            emailPlaceholder="Email Address"
            signUpLabel="Sign Up"
            podcastUrl="https://open.spotify.com/show/41MuXEI3TIvCAQW20Ko9cX?si=777efb21569d4d94"
            youtubeUrl={companyInfo?.youtube_url}
            instagramUrl={companyInfo?.instagram_url}
            facebookUrl={companyInfo?.facebook_url}
            linkedinUrl={companyInfo?.linkedin_url}
            keystoneMarkColor="#F57E56"
            ctaArrowSrc="/footer/footer-cta-arrow.svg"
            keystoneWordmarkSrc="/footer/footer-wordmark.svg"
            videoA="/footer/footer-video-businesswoman.mp4"
            videoB="/footer/footer-video-storefront.mp4"
            videoC="/footer/footer-video-barbershop.mp4"
            videoD="/footer/footer-video-phone-call.mp4"
            videoE="/footer/footer-video-ceramics.mp4"
          />
          <MobileFooter
            line1="FOR BUSINESSES"
            line2="THAT ARE"
            line3=" DONE FIGURING"
            line4="IT OUT THEMSELVES"
            leftTagline="The modern growth team for local business."
            rightTagline="Stay informed about our latest features and product releases"
            cta1Label="The Blog"
            cta1Href="/blog"
            cta2Label="Get started"
            emailPlaceholder="Email Address"
            signUpLabel="Sign Up"
            podcastUrl="https://open.spotify.com/show/41MuXEI3TIvCAQW20Ko9cX?si=777efb21569d4d94"
            youtubeUrl={companyInfo?.youtube_url}
            instagramUrl={companyInfo?.instagram_url}
            facebookUrl={companyInfo?.facebook_url}
            linkedinUrl={companyInfo?.linkedin_url}
            keystoneMarkColor="#F57E56"
            ctaArrowSrc="/footer/footer-cta-arrow.svg"
            keystoneWordmarkSrc="/footer/footer-wordmark.svg"
            videoA="/footer/footer-video-businesswoman.mp4"
            videoB="/footer/footer-video-storefront.mp4"
            videoC="/footer/footer-video-barbershop.mp4"
            videoD="/footer/footer-video-phone-call.mp4"
            videoE="/footer/footer-video-ceramics.mp4"
          />
        </SmoothScrollProvider>
      </PillHandoffProvider>
    </LeadCaptureProvider>
  );
}
