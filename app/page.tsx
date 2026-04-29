// ============================================================
// HOME PAGE — Custom Corporate Site
// ============================================================
// This is the entry point for the Keystone corporate homepage.
// The site is fully custom — no design-system section components
// are used here. Build the UI from scratch using custom components
// in components/sections/ and components/elements/.
//
// Data fetching pattern:
//   - Always fetch in parallel with Promise.all (no waterfalls)
//   - All fetch functions return null on error — handle gracefully
//   - Keep this file a Server Component (no 'use client' here)
//   - Push 'use client' down to leaf components that need GSAP or interactivity
//
// Example data you can fetch:
//   import {
//     getCompanyInformation,  // business info, hours, portal URL
//     getServices,            // services with pricing
//     getTestimonials,        // reviews
//     getWebsitePhotos,       // logo, hero image, etc.
//     getBlogPosts,
//     getFAQs,
//     getLocations,
//     getTeamMembers,
//   } from 'keystone-design-bootstrap/lib/server-api';
// ============================================================

export default async function HomePage() {
  return (
    <main>
      <p>Hello World</p>
    </main>
  );
}
