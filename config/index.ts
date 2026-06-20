/**
 * Site configuration
 * Simple, route-based navigation
 */

import type { Theme, SiteConfig } from 'keystone-design-bootstrap/types';

export const config: SiteConfig = {
  site: {
    title: "Keystone | Sales & Marketing for Local Businesses",
    description: "Keystone is a sales and marketing team for local businesses. We help you grow your business by running your sales and marketing while you run your business.",
    theme: "custom"
  },
  navigation: {
    header: [
      {
        label: "Home",
        href: "/",
        children: [
          { label: "Blog", href: "/blog" },
        ]
      },
      {
        label: "About Us",
        href: "/about",
        children: [
          { label: "Our Team", href: "/about/team" },
          { label: "Careers", href: "/about/careers" },
        ]
      },
    ],
    footer: [
      // Column 1 - Home
      [
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
      ],
      // Column 2 - About Us
      [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/about/team" },
        { label: "Careers", href: "/about/careers" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    ]
  }
};

// Re-export Theme for convenience
export type { Theme };
