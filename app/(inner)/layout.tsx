// Inner-page shell layout
// ========================
// Applies to all non-home pages: /blog, /blog/[slug], and all future
// inner pages (about, FAQ, contact, etc.). Provides:
//   1. Sticky top navigation bar (InnerNav)
//   2. Shared footer (OversizedFooter — identical to home page)
//   3. Lead capture modal available site-wide via LeadCaptureProvider
//
// Server Component — fetches company social URLs for the footer.

import { LeadCaptureProvider, InnerNav, OversizedFooter } from '@/components/sections';
import { getCompanyInformation } from 'keystone-design-bootstrap/lib/server-api';

export default async function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <div data-theme="custom">
        <InnerNav wordmarkSrc="/images/keystone-wordmark.svg" ctaLabel="Get started" />
        {children}
        <OversizedFooter
          line1="FOR BUSINESSES"
          line2="THAT ARE"
          line3=" DONE FIGURING"
          line4="IT OUT THEMSELVES"
          leftTagline="The modern growth team for local business."
          rightTagline="Stay informed about our latest features and product releases"
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
          videoA={{ webm: '/footer/footer-video-pet.webm',       mp4: '/footer/footer-video-pet.mp4',       poster: '/footer/posters/footer-pet' }}
          videoB={{ webm: '/footer/footer-video-truck.webm',     mp4: '/footer/footer-video-truck.mp4',     poster: '/footer/posters/footer-truck' }}
          videoC={{ webm: '/footer/footer-video-cafe.webm',      mp4: '/footer/footer-video-cafe.mp4',      poster: '/footer/posters/footer-cafe' }}
          videoD={{ webm: '/footer/footer-video-phonecall.webm', mp4: '/footer/footer-video-phonecall.mp4', poster: '/footer/posters/footer-phonecall' }}
          videoE={{ webm: '/footer/footer-video-barber.webm',    mp4: '/footer/footer-video-barber.mp4',    poster: '/footer/posters/footer-barber' }}
        />
      </div>
    </LeadCaptureProvider>
  );
}
