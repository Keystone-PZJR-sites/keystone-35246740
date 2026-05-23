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
  MobileWorkShowcase,
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
  EVERY_CHANNEL_PILLS,
  MOBILE_EVERY_CHANNEL_PILLS,
  PRODUCT_SCREENS_TOOLS,
  VALUE_PROP_CARDS,
  SHARED_WORK_SHOWCASE_PROPS,
  SHARED_MOBILE_WORK_SHOWCASE_PROPS,
  SHARED_PRICING_SECTION_PROPS,
  SHARED_MOBILE_PRICING_SECTION_PROPS,
  SOCIAL_THUMBNAILS,
  MOBILE_SOCIAL_THUMBNAILS,
  SOCIAL_SLIDES,
} from '@/data';

const HERO_VIDEOS_DESKTOP = [
  { webm: '/videos/hero-autoloop-clips/hero-01-desktop.webm', mp4: '/videos/hero-autoloop-clips/hero-01-desktop.mp4', poster: '/videos/hero-autoloop-clips/posters/hero-01' },
  { webm: '/videos/hero-autoloop-clips/hero-02-desktop.webm', mp4: '/videos/hero-autoloop-clips/hero-02-desktop.mp4', poster: '/videos/hero-autoloop-clips/posters/hero-02' },
  { webm: '/videos/hero-autoloop-clips/hero-03-desktop.webm', mp4: '/videos/hero-autoloop-clips/hero-03-desktop.mp4', poster: '/videos/hero-autoloop-clips/posters/hero-03' },
  { webm: '/videos/hero-autoloop-clips/hero-04-desktop.webm', mp4: '/videos/hero-autoloop-clips/hero-04-desktop.mp4', poster: '/videos/hero-autoloop-clips/posters/hero-04' },
  { webm: '/videos/hero-autoloop-clips/hero-05-desktop.webm', mp4: '/videos/hero-autoloop-clips/hero-05-desktop.mp4', poster: '/videos/hero-autoloop-clips/posters/hero-05' },
  { webm: '/videos/hero-autoloop-clips/hero-06-desktop.webm', mp4: '/videos/hero-autoloop-clips/hero-06-desktop.mp4', poster: '/videos/hero-autoloop-clips/posters/hero-06' },
];

const HERO_VIDEOS_MOBILE = [
  { webm: '/videos/hero-autoloop-clips/hero-01-mobile.webm', mp4: '/videos/hero-autoloop-clips/hero-01-mobile.mp4', poster: '/videos/hero-autoloop-clips/posters/hero-01' },
  { webm: '/videos/hero-autoloop-clips/hero-02-mobile.webm', mp4: '/videos/hero-autoloop-clips/hero-02-mobile.mp4', poster: '/videos/hero-autoloop-clips/posters/hero-02' },
  { webm: '/videos/hero-autoloop-clips/hero-03-mobile.webm', mp4: '/videos/hero-autoloop-clips/hero-03-mobile.mp4', poster: '/videos/hero-autoloop-clips/posters/hero-03' },
  { webm: '/videos/hero-autoloop-clips/hero-04-mobile.webm', mp4: '/videos/hero-autoloop-clips/hero-04-mobile.mp4', poster: '/videos/hero-autoloop-clips/posters/hero-04' },
  { webm: '/videos/hero-autoloop-clips/hero-05-mobile.webm', mp4: '/videos/hero-autoloop-clips/hero-05-mobile.mp4', poster: '/videos/hero-autoloop-clips/posters/hero-05' },
  { webm: '/videos/hero-autoloop-clips/hero-06-mobile.webm', mp4: '/videos/hero-autoloop-clips/hero-06-mobile.mp4', poster: '/videos/hero-autoloop-clips/posters/hero-06' },
];

const EVERY_CHANNEL_VIDEOS_DESKTOP = [
  { webm: '/every-channel/everychannel-01-desktop.webm', mp4: '/every-channel/everychannel-01-desktop.mp4', poster: '/every-channel/posters/everychannel-01' },
  { webm: '/every-channel/everychannel-02-desktop.webm', mp4: '/every-channel/everychannel-02-desktop.mp4', poster: '/every-channel/posters/everychannel-02' },
  { webm: '/every-channel/everychannel-03-desktop.webm', mp4: '/every-channel/everychannel-03-desktop.mp4', poster: '/every-channel/posters/everychannel-03' },
  { webm: '/every-channel/everychannel-04-desktop.webm', mp4: '/every-channel/everychannel-04-desktop.mp4', poster: '/every-channel/posters/everychannel-04' },
];

const EVERY_CHANNEL_VIDEOS_MOBILE = [
  { webm: '/every-channel/everychannel-01-mobile.webm', mp4: '/every-channel/everychannel-01-mobile.mp4', poster: '/every-channel/posters/everychannel-01' },
  { webm: '/every-channel/everychannel-02-mobile.webm', mp4: '/every-channel/everychannel-02-mobile.mp4', poster: '/every-channel/posters/everychannel-02' },
  { webm: '/every-channel/everychannel-03-mobile.webm', mp4: '/every-channel/everychannel-03-mobile.mp4', poster: '/every-channel/posters/everychannel-03' },
  { webm: '/every-channel/everychannel-04-mobile.webm', mp4: '/every-channel/everychannel-04-mobile.mp4', poster: '/every-channel/posters/everychannel-04' },
];

export default async function HomePage() {
  const companyInfo = await getCompanyInformation();
  return (
    <LeadCaptureProvider
      wordmarkColor="#6ECC8B"
      markColor="#6ECC8B"
      ctaArrowSrc="/lead-capture/lead-capture-cta-arrow.svg"
      submitLabel="Get in touch"
      subheadline="The modern sales and marketing team for local businesses. Reach out below to connect with our team."
      termsHref="/terms-of-service"
      privacyHref="/privacy-policy"
    >
      <PillHandoffProvider>
        <SmoothScrollProvider
          fixedChildren={<HeroNav wordmarkColor="#6ECC8B" />}
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
              cta1Label="Get in touch"
              cta2Label="Services and pricing"
              cta2Href="/how-it-works"
              videoSrcs={HERO_VIDEOS_MOBILE}
              markColor="#6ECC8B"
            />
            {/* Desktop/tablet hero — hidden below 768 px (HeroAnimatic is hidden md:block) */}
            <HeroAnimatic
              headlineLine1="Always ON "
              headlineLine2="SALES & MARKETING"
              subheadline="A team of experts running your marketing while you run your business."
              cta1Label="Get in touch"
              cta2Label="Services and pricing"
              cta2Href="/how-it-works"
              videoSrcs={HERO_VIDEOS_DESKTOP}
              markColor="#6ECC8B"
            />
            <WorkShowcase {...SHARED_WORK_SHOWCASE_PROPS} />
            <MobileWorkShowcase {...SHARED_MOBILE_WORK_SHOWCASE_PROPS} />
            <EveryChannel
              line1="Every CHANNEL."
              line2="Every INTERACTION."
              line3="done-for-you."
              videoSrcs={EVERY_CHANNEL_VIDEOS_DESKTOP}
              pills={EVERY_CHANNEL_PILLS}
            />
            <MobileEveryChannel
              line1="Every CHANNEL."
              line2="Every INTERACTION."
              line3="done-for-you."
              videoSrcs={EVERY_CHANNEL_VIDEOS_MOBILE}
              pills={MOBILE_EVERY_CHANNEL_PILLS}
            />
            <ProductScreens tools={PRODUCT_SCREENS_TOOLS} />
            <MobileProductScreens tools={PRODUCT_SCREENS_TOOLS} />
            <ValueProps
              headlinePreamble="Not an agency. Not software. Something "
              headlineItalic="better"
              learnMoreLabel="Get in touch"
              getStartedLabel="Services and pricing"
              getStartedHref="/how-it-works"
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
            <PricingSection {...SHARED_PRICING_SECTION_PROPS} />
            <MobilePricingSection {...SHARED_MOBILE_PRICING_SECTION_PROPS} />
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
            cta1Href="/blog"
            cta2Label="Services and pricing"
            emailPlaceholder="Email Address"
            signUpLabel="Sign Up"
            podcastUrl="https://open.spotify.com/show/41MuXEI3TIvCAQW20Ko9cX?si=777efb21569d4d94"
            applePodcastsUrl="https://podcasts.apple.com/us/podcast/made-locally/id1895736090"
            youtubeUrl={companyInfo?.youtube_url}
            instagramUrl={companyInfo?.instagram_url}
            facebookUrl={companyInfo?.facebook_url}
            linkedinUrl={companyInfo?.linkedin_url}
            keystoneMarkColor="#F57E56"
            ctaArrowSrc="/footer/footer-cta-arrow.svg"
            keystoneWordmarkColor="#F57E56"
            videoA={{ webm: '/footer/footer-video-pet-desktop.webm',       mp4: '/footer/footer-video-pet-desktop.mp4',       poster: '/footer/posters/footer-pet' }}
            videoB={{ webm: '/footer/footer-video-truck-desktop.webm',     mp4: '/footer/footer-video-truck-desktop.mp4',     poster: '/footer/posters/footer-truck' }}
            videoC={{ webm: '/footer/footer-video-cafe-desktop.webm',      mp4: '/footer/footer-video-cafe-desktop.mp4',      poster: '/footer/posters/footer-cafe' }}
            videoD={{ webm: '/footer/footer-video-phonecall-desktop.webm', mp4: '/footer/footer-video-phonecall-desktop.mp4', poster: '/footer/posters/footer-phonecall' }}
            videoE={{ webm: '/footer/footer-video-barber-desktop.webm',    mp4: '/footer/footer-video-barber-desktop.mp4',    poster: '/footer/posters/footer-barber' }}
          />
          <MobileFooter
            line1="FOR BUSINESSES"
            line2="THAT ARE"
            line3=" DONE FIGURING"
            line4="IT OUT THEMSELVES"
            leftTagline="The modern growth team for local business."
            rightTagline="Stay informed about our latest features and product releases"
            cta1Href="/blog"
            cta2Label="Services and pricing"
            emailPlaceholder="Email Address"
            signUpLabel="Sign Up"
            podcastUrl="https://open.spotify.com/show/41MuXEI3TIvCAQW20Ko9cX?si=777efb21569d4d94"
            applePodcastsUrl="https://podcasts.apple.com/us/podcast/made-locally/id1895736090"
            youtubeUrl={companyInfo?.youtube_url}
            instagramUrl={companyInfo?.instagram_url}
            facebookUrl={companyInfo?.facebook_url}
            linkedinUrl={companyInfo?.linkedin_url}
            keystoneMarkColor="#F57E56"
            ctaArrowSrc="/footer/footer-cta-arrow.svg"
            keystoneWordmarkColor="#F57E56"
            videoA={{ webm: '/footer/footer-video-pet-mobile.webm',       mp4: '/footer/footer-video-pet-mobile.mp4',       poster: '/footer/posters/footer-pet' }}
            videoB={{ webm: '/footer/footer-video-truck-mobile.webm',     mp4: '/footer/footer-video-truck-mobile.mp4',     poster: '/footer/posters/footer-truck' }}
            videoC={{ webm: '/footer/footer-video-cafe-mobile.webm',      mp4: '/footer/footer-video-cafe-mobile.mp4',      poster: '/footer/posters/footer-cafe' }}
            videoD={{ webm: '/footer/footer-video-phonecall-mobile.webm', mp4: '/footer/footer-video-phonecall-mobile.mp4', poster: '/footer/posters/footer-phonecall' }}
            videoE={{ webm: '/footer/footer-video-barber-mobile.webm',    mp4: '/footer/footer-video-barber-mobile.mp4',    poster: '/footer/posters/footer-barber' }}
          />
        </SmoothScrollProvider>
      </PillHandoffProvider>
    </LeadCaptureProvider>
  );
}
