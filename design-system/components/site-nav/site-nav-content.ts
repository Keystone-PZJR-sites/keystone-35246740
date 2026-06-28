// Shared site-navigation content: the top-level menu structure, dropdown
// columns, promo tiles, and the Login / primary-CTA labels (Spec 034). Lives
// in one place so the homepage, every inner page (via InnerPageShell), and the
// /styles catalog preview all render the same nav from identical data. Hrefs
// target existing site routes; service links point at their per-service detail
// pages (/services/<slug>, spec 037) where one exists, and otherwise fall back
// to the services index.

import { GRADER_URL } from '../../constants/grader';
import type { NavItem } from './types';

export const SITE_NAV_ITEMS: NavItem[] = [
  {
    type: 'dropdown',
    label: 'Solutions',
    variant: 'wide',
    categories: [
      {
        heading: 'A beautiful, elevated presence',
        links: [
          { label: 'Website', href: '/services/websites' },
          { label: 'Instagram, Facebook & TikTok', href: '/services/social-media' },
          { label: 'Maps & Reviews', href: '/services/reviews' },
        ],
      },
      {
        heading: 'New leads and potential clients',
        links: [
          { label: 'Instagram & Facebook Ads', href: '/services/meta-ads' },
          { label: 'Google Ads', href: '/services/google-ads' },
          { label: 'Content Marketing', href: '/services/content-marketing' },
        ],
      },
      {
        heading: 'Convert long-term customers',
        links: [
          { label: 'Sales & lead follow-up', href: '/services/sales-team' },
        ],
      },
      {
        heading: 'Turn happy customers into evangelists',
        links: [
          { label: 'Email Campaigns', href: '/services/email-campaigns' },
          { label: 'Rebookings', href: '/services/rebookings' },
          { label: 'Loyalty & Rewards', href: '/services/loyalty-rewards' },
        ],
      },
      {
        heading: 'By business type',
        links: [
          { label: 'Health & Wellness', href: '/industries/health-wellness' },
          { label: 'Home Services', href: '/industries/home-services' },
          { label: 'New Businesses', href: '/industries/new-businesses' },
          { label: 'Small Business', href: '/industries/small-business' },
        ],
      },
    ],
    promos: [
      { copy: 'See how local teams grow without hiring an agency', href: '/how-it-works', tone: 'green' },
      { copy: 'Explore the Keystone service system', href: '/pricing', tone: 'orange' },
      { copy: 'Start building your always-on growth team', href: '/pricing', tone: 'green' },
    ],
  },
  {
    type: 'link',
    label: 'Pricing',
    href: '/pricing',
  },
  {
    type: 'link',
    label: 'How it Works',
    href: '/how-it-works',
  },
  {
    type: 'dropdown',
    label: 'Company',
    variant: 'compact',
    categories: [
      {
        heading: 'Company',
        links: [
          { label: 'Our story', href: '/about' },
          { label: 'Leadership', href: '/about/team' },
          { label: 'Careers', href: '/about/careers' },
        ],
      },
    ],
    promos: [
      { copy: 'Built for local businesses ready to scale', href: '/about', tone: 'green' },
      { copy: 'Meet the people behind Keystone', href: '/about/team', tone: 'orange' },
    ],
  },
  {
    type: 'dropdown',
    label: 'Resources',
    variant: 'compact',
    categories: [
      {
        heading: 'Resources',
        links: [
          { label: 'Case Studies', href: '/case-studies' },
          { label: 'Blog', href: '/blog' },
          { label: 'Grader', href: GRADER_URL, external: true },
        ],
      },
    ],
    promos: [
      { copy: 'Read the latest on local growth', href: '/blog', tone: 'green' },
      { copy: 'Grade your online presence in seconds', href: GRADER_URL, tone: 'orange', external: true },
    ],
  },
];

export const SITE_NAV_LOGIN_LABEL = 'Login';
export const SITE_NAV_LOGIN_HREF = '/portal';
export const SITE_NAV_CTA_LABEL = 'Get a free demo';
