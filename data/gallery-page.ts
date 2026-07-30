// Gallery page content (spec 054). One entry per live customer website we
// showcase at /gallery. All business facts (founders, founding years,
// locations, site features) were sourced from each site's public backend
// data — the same records the sites themselves render — so the metadata
// stays accurate to what is live. Facts and attributes intentionally vary
// per entry; whatever a business doesn't have is simply omitted.

import type { GalleryEntryContent } from '@/design-system/patterns/gallery';

export const GALLERY_PAGE = {
  eyebrow: 'Gallery',
  title: "Websites we've built",
  subtitle:
    'Real businesses, live on the Keystone platform. Browse each site right here, or take it fullscreen.',
  closingTitle: 'Your business could be next',
} as const;

export const GALLERY_ENTRIES: GalleryEntryContent[] = [
  {
    slug: 'house-of-aesthetics',
    name: 'House of Aesthetics',
    industry: 'Medical aesthetics',
    url: 'https://keystone-site-prod-house-of-aesthetics-o9vcdsfn.rahul-0b6.workers.dev',
    story:
      'A boutique aesthetics studio in Colts Neck, New Jersey, led by board-certified nurse practitioner Ashley Yannotta. The practice is built around natural-looking results — from Botox to facials — with every treatment plan personalized to the client.',
    facts: [
      { label: 'Founder', value: 'Ashley Yannotta' },
      { label: 'Location', value: 'Colts Neck, NJ' },
    ],
    attributes: ['Ten-treatment service menu', 'FAQ library', 'Live webchat', 'Lead capture'],
  },
  {
    slug: 'x2talent',
    name: 'X2Talent',
    industry: 'Design recruiting',
    url: 'https://keystone-site-prod-x2talent-t7540oy7.rahul-0b6.workers.dev',
    story:
      'A specialized search firm for the design and product talent that defines companies — founding designers, senior ICs, and design leaders. Founded by Carl, an ex-product designer, alongside Jeremy, who previously led design recruiting at Meta.',
    facts: [
      { label: 'Founder', value: 'Carl' },
      { label: 'Team', value: 'Ex-Meta recruiting leadership' },
    ],
    attributes: ['Role-focused service pages', 'Founder profiles', 'Live webchat'],
  },
  {
    slug: 'face-brow-beauty-bar',
    name: 'Face, Brow & Beauty Bar',
    industry: 'Beauty & brows',
    url: 'https://keystone-site-prod-face-brow-beauty-bar-y6lzfxuo.rahul-0b6.workers.dev',
    story:
      'A Miami institution since 2014, known for world-class brows tailored to each client. What began as a boutique brow studio has grown into three locations across Midtown, Downtown, and Brickell — a haven of consistent, one-on-one self-care.',
    facts: [
      { label: 'Founded', value: '2014' },
      { label: 'Locations', value: 'Midtown · Downtown · Brickell' },
      { label: 'City', value: 'Miami, FL' },
    ],
    attributes: ['Three-location finder', 'Membership packages', 'Team of five artists', 'Blog', 'FAQ library'],
  },
  {
    slug: 'ora-medical-clinic',
    name: 'Ōra Medical Clinic',
    industry: 'Telehealth & weight management',
    url: 'https://keystone-site-prod-ora-medical-clinic-wniko3sf.rahul-0b6.workers.dev',
    story:
      'A virtual-first clinic pairing physician-supervised GLP-1 therapy with personalized nutrition and realistic exercise planning. Led by internal-medicine physician Dr. Pardis Poorzand, every patient keeps a dedicated provider through their whole journey.',
    facts: [
      { label: 'Led by', value: 'Dr. Pardis Poorzand' },
      { label: 'Based in', value: 'Berkeley, CA' },
      { label: 'Care model', value: 'Virtual-first' },
    ],
    attributes: ['Telehealth-oriented design', 'Blog', 'FAQ library', 'Live webchat'],
  },
  {
    slug: 'a-g-agricultural-supply',
    name: 'A&G Agricultural Supply',
    industry: 'Agricultural supply',
    url: 'https://keystone-site-prod-a-g-agricultural-supply-aza9vbnn.rahul-0b6.workers.dev',
    story:
      "Founded in 2007 by a father-and-son partnership — Andy and Greg are the “A” and “G” — and run from a property in Oakdale, in California's Central Valley. The family has grown with the business: six relatives now work across sales, production, and operations.",
    facts: [
      { label: 'Founded', value: '2007' },
      { label: 'Founders', value: 'Andy & Greg Liekhus' },
      { label: 'Location', value: 'Oakdale, CA' },
    ],
    attributes: ['Product & supply catalog', 'Family team page', 'Live webchat'],
  },
  {
    slug: 'keystone',
    name: 'Keystone',
    industry: 'Sales & marketing platform',
    url: 'https://keystone-35246740.rahul-0b6.workers.dev',
    story:
      'Our own corporate site — built and run on the same platform every site on this page uses. Founded by Rahul Jaswa in San Francisco, Keystone is the sales and marketing department for local businesses, and this site is the proof we hold ourselves to the same standard.',
    facts: [
      { label: 'Founder', value: 'Rahul Jaswa' },
      { label: 'Headquarters', value: 'San Francisco, CA' },
    ],
    attributes: ['Fully custom design system', 'Scroll-driven animation', 'Case studies', 'Blog', 'Live grader search'],
  },
  {
    slug: 'lean-lovely',
    name: 'Lean & Lovely',
    industry: 'Medspa & wellness',
    url: 'https://lean-lovely-46413763.rahul-0b6.workers.dev',
    story:
      'An Escondido, California medspa offering science-backed treatments — advanced injectables to customized weight-loss programs. Owned and led by Kristin Beseke, MSN, APRN, FNP-BC, with Dr. Michael Lee serving as medical director.',
    facts: [
      { label: 'Owner', value: 'Kristin Beseke, FNP-BC' },
      { label: 'Medical director', value: 'Dr. Michael Lee' },
      { label: 'Location', value: 'Escondido, CA' },
    ],
    attributes: ['Ten-service treatment menu', 'Client reviews wall', 'Blog', 'FAQ library', 'Live webchat'],
  },
  {
    slug: 'exsula-foods',
    name: 'Exsula Foods',
    industry: 'Wholesale nutrition',
    url: 'https://keystone-site-prod-exsula-foods-fx8mzt3u.rahul-0b6.workers.dev',
    story:
      'Born out of a decade building Life Enthusiast into a leading holistic health company, Exsula Foods is a wholesale distribution partner to nutritionists, medspas, integrative clinics, and health food stores — led by owner and CEO Martin Pytela.',
    facts: [
      { label: 'Owner & CEO', value: 'Martin Pytela' },
      { label: 'Locations', value: 'Carson City, NV · Tacoma & Blaine, WA' },
    ],
    attributes: ['Wholesale product catalog', 'Ten-person team page', 'Multi-location footprint'],
  },
];
