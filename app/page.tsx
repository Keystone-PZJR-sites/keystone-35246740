// ============================================================
// HOME PAGE — Custom Corporate Site
// ============================================================
// Server Component. Fetches data and passes it down to client
// leaf components. No 'use client' here.
// ============================================================

import { HeroAnimatic } from '@/components/sections';

export default async function HomePage() {
  return (
    <main>
      <HeroAnimatic
        headlineLine1="Always ON "
        headlineLine2="SALES & MARKETING"
        subheadline="A team of experts running your marketing while you run your business."
        cta1Label="Learn more"
        cta1Href="#"
        cta2Label="Get started"
        cta2Href="#"
        // Video file per spec default: public/videos/hero-animatic.mp4
        // Using existing file until the production asset is added.
        videoSrc="/videos/home-hero-bg.mp4"
        wordmarkSrc="/images/keystone-wordmark.svg"
        markSrc="/images/keystone-mark.svg"
      />
    </main>
  );
}
