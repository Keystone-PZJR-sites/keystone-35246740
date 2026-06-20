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
  SITE_NAV_ITEMS,
  SITE_NAV_LOGIN_LABEL,
  SITE_NAV_LOGIN_HREF,
  SITE_NAV_CTA_LABEL,
  FOOTER_COPY,
  FOOTER_VIDEOS_DESKTOP,
  FOOTER_VIDEOS_MOBILE,
  LEAD_CAPTURE_COPY,
} from '@/design-system';
import { SmoothScrollProvider } from '@/design-system/providers';
import { PillHandoffProvider } from '@/design-system/providers';
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
  HOME_PAGE,
  MEDIA,
} from '@/data';

const HERO_VIDEOS_DESKTOP = MEDIA.heroClips.desktop;
const HERO_VIDEOS_MOBILE = MEDIA.heroClips.mobile;
const EVERY_CHANNEL_VIDEOS_DESKTOP = MEDIA.channelClips.desktop;
const EVERY_CHANNEL_VIDEOS_MOBILE = MEDIA.channelClips.mobile;

export default async function HomePage() {
  const companyInfo = await getCompanyInformation();
  const social = {
    youtubeUrl: companyInfo?.youtube_url,
    instagramUrl: companyInfo?.instagram_url,
    facebookUrl: companyInfo?.facebook_url,
    linkedinUrl: companyInfo?.linkedin_url,
  };
  return (
    <LeadCaptureProvider {...LEAD_CAPTURE_COPY}>
      <PillHandoffProvider>
        <SmoothScrollProvider
          fixedChildren={
            <HeroNav
              wordmarkColor="var(--color-hero-accent,#6ecc8b)"
              items={SITE_NAV_ITEMS}
              loginLabel={SITE_NAV_LOGIN_LABEL}
              loginHref={SITE_NAV_LOGIN_HREF}
              ctaLabel={SITE_NAV_CTA_LABEL}
            />
          }
        >
          {/*
           * Animated sections — one contained group driven by the scroll state machine.
           * Every section inside <main> is viewport-height and participates in the
           * pin + snap animator. The footer is intentionally a sibling, not a child.
           */}
          <main>
            {/* Mobile hero — visible below 985 px, hidden at md+ (MobileHero is md:hidden) */}
            <MobileHero
              {...HOME_PAGE.hero}
              videoSrcs={HERO_VIDEOS_MOBILE}
              markColor="var(--color-hero-accent,#6ecc8b)"
            />
            {/* Desktop/tablet hero — hidden below 985 px (HeroAnimatic is hidden md:block) */}
            <HeroAnimatic
              {...HOME_PAGE.hero}
              videoSrcs={HERO_VIDEOS_DESKTOP}
              markColor="var(--color-hero-accent,#6ecc8b)"
            />
            <WorkShowcase {...SHARED_WORK_SHOWCASE_PROPS} />
            <MobileWorkShowcase {...SHARED_MOBILE_WORK_SHOWCASE_PROPS} />
            <EveryChannel
              {...HOME_PAGE.everyChannel}
              videoSrcs={EVERY_CHANNEL_VIDEOS_DESKTOP}
              pills={EVERY_CHANNEL_PILLS}
            />
            <MobileEveryChannel
              {...HOME_PAGE.everyChannel}
              videoSrcs={EVERY_CHANNEL_VIDEOS_MOBILE}
              pills={MOBILE_EVERY_CHANNEL_PILLS}
            />
            <ProductScreens tools={PRODUCT_SCREENS_TOOLS} />
            <MobileProductScreens tools={PRODUCT_SCREENS_TOOLS} />
            <ValueProps
              headlinePreamble={HOME_PAGE.valueProps.headlinePreamble}
              headlineItalic={HOME_PAGE.valueProps.headlineItalic}
              learnMoreLabel={HOME_PAGE.valueProps.learnMoreLabel}
              getStartedLabel={HOME_PAGE.valueProps.getStartedLabel}
              getStartedHref={HOME_PAGE.valueProps.getStartedHref}
              cards={VALUE_PROP_CARDS}
            />
            <MobileValueProps
              headlineLine1={HOME_PAGE.valueProps.mobileHeadlineLine1}
              headlineLine2={HOME_PAGE.valueProps.mobileHeadlineLine2}
              cards={VALUE_PROP_CARDS}
            />
            <SocialProofSection
              {...HOME_PAGE.socialProof}
              thumbnails={SOCIAL_THUMBNAILS}
              slides={SOCIAL_SLIDES}
              closeButtonSrc={MEDIA.socialProof.modalButton.src}
            />
            <MobileSocialProof
              {...HOME_PAGE.socialProof}
              thumbnails={MOBILE_SOCIAL_THUMBNAILS}
              slides={SOCIAL_SLIDES}
              closeButtonSrc={MEDIA.socialProof.modalButton.src}
            />
            <PricingSection {...SHARED_PRICING_SECTION_PROPS} />
            <MobilePricingSection {...SHARED_MOBILE_PRICING_SECTION_PROPS} />
          </main>

          {/*
           * Footer — outside the animated sections group.
           * Not viewport-height, not held by the animator, no states or transitions.
           * The visitor scrolls into it naturally after Pricing releases.
           */}
          <OversizedFooter {...FOOTER_COPY} {...social} {...FOOTER_VIDEOS_DESKTOP} />
          <MobileFooter {...FOOTER_COPY} {...social} {...FOOTER_VIDEOS_MOBILE} />
        </SmoothScrollProvider>
      </PillHandoffProvider>
    </LeadCaptureProvider>
  );
}
