/**
 * Site configuration
 * Simple, route-based navigation
 */

import type { Theme, SiteConfig } from 'keystone-design-bootstrap/types';

export const config: SiteConfig = {
  site: {
    title: "*TR* Your Business",
    description: "*TR* Providing exceptional services",
    theme: "aman"
  },
  navigation: {
    header: [
      { 
        label: "Home", 
        href: "/",
        children: [
          { label: "Testimonials", href: "/testimonials" },
          { label: "Blog", href: "/blog" },
          { label: "FAQ", href: "/faq" },
          { label: "Social Media", href: "/social-media" },
        ]
      },
      { 
        label: "Services", 
        href: "/services",
        children: [] // Populated dynamically from API
      },
      { 
        label: "Locations", 
        href: "/locations",
        children: [] // Populated dynamically from API
      },
      { 
        label: "About Us", 
        href: "/about",
        children: [
          { label: "Our Team", href: "/about/team" },
          { label: "Careers", href: "/about/careers" },
          { label: "Contact", href: "/contact" },
        ]
      },
    ],
    footer: [
      // Column 1 - Home
      [
        { label: "Home", href: "/" },
        { label: "Testimonials", href: "/testimonials" },
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "/faq" },
        { label: "Social Media", href: "/social-media" },
      ],
      // Column 2 - Services (populated dynamically)
      [
        { label: "Services", href: "/services" },
      ],
      // Column 3 - Locations (populated dynamically)
      [
        { label: "Locations", href: "/locations" },
      ],
      // Column 4 - About Us
      [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/about/team" },
        { label: "Careers", href: "/about/careers" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
      ],
    ]
  }
};

// Re-export Theme for convenience
export type { Theme };
