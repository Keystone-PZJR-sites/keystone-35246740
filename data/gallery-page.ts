// Gallery page content (spec 054). One entry per live customer website we
// showcase at /gallery. All business facts (founders, founding years,
// locations, site features) were sourced from each site's public backend
// data — the same records the sites themselves render — so the metadata
// stays accurate to what is live. Facts and attributes intentionally vary
// per entry; whatever a business doesn't have is simply omitted. Attribute
// pills mix distinctive site traits with Keystone platform capabilities
// (sales agent, content agent, ads infra, etc.).

import type { GalleryEntryContent } from '@/design-system/patterns/gallery';

export const GALLERY_PAGE = {
  eyebrow: 'Gallery',
  title: "Sales & marketing systems we've built",
  subtitle:
    'The website is the foundation — then agents, ads, and content that keep running. Browse each live system, or take it fullscreen.',
  closingTitle: 'Your business could be next',
} as const;

/** Entries shown per page on `/gallery`. */
export const GALLERY_PAGE_SIZE = 1;

export const GALLERY_ENTRIES: GalleryEntryContent[] = [
  {
    slug: 'zivel-palm-coast',
    name: 'Zivel Palm Coast',
    industry: 'Recovery & wellness',
    url: 'https://palm-coast-zivel-35621640.rahul-0b6.workers.dev',
    story:
      'A family-founded recovery studio in Palm Coast, Florida — cryotherapy, infrared sauna, red light, dry float, and more — bringing athlete-grade recovery tools to Flagler County with a science library behind every pathway on the floor.',
    facts: [
      { label: 'Founders', value: 'Nikki Lang · Kelly Lang' },
      { label: 'Location', value: 'Palm Coast, FL' },
    ],
    attributes: [
      'Member pricing portal',
      'Science education library',
      'Lead capture',
      'Membership packages',
      'Pathway video gallery',
    ],
  },
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
    attributes: [
      'Embedded sales agent',
      'AI content agent',
      'Ads infrastructure',
      'Lead capture',
    ],
  },
  {
    slug: 'drefadez',
    name: 'DreFadez',
    industry: 'Barber',
    url: 'https://keystone-site-prod-drefadez-hvzjaquz.rahul-0b6.workers.dev',
    story:
      'A one-chair precision barber studio inside Onyx Salon in Roy, Utah — crisp fades, clean lineups, and straight-razor finishes from Top 10 Utah barber DreFadez.',
    facts: [
      { label: 'Recognition', value: 'Top 10 Utah barber · 2024' },
      { label: 'Location', value: 'Roy, UT · Studio #12' },
    ],
    attributes: [
      'Embedded sales agent',
      'Lead capture',
      'Work gallery',
      'Online booking',
    ],
  },
  {
    slug: 'ciela-events',
    name: 'CieLA Events',
    industry: 'Boutique event planning',
    url: 'https://keystone-site-prod-ciela-events-x3xpfctd.rahul-0b6.workers.dev',
    story:
      'A Beverly Hills boutique event team — planners, day-of managers, bartenders, photo booths, and décor under one roof — working celebrations across greater Los Angeles. CieLA grew out of a decade-plus photo booth company, Photo-Fun-Moments, into a full-service crew that hosts can book together or à la carte.',
    facts: [
      { label: 'Team', value: 'Nazy Zakhor · Liam & Josh Luxon · Talia Zakhor' },
      { label: 'Location', value: 'Beverly Hills, CA' },
    ],
    attributes: [
      'Embedded sales agent',
      'Lead capture',
      'Event gallery',
      'Three service pillars',
    ],
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
    attributes: [
      'Embedded sales agent',
      'Lead capture',
      'Role-focused pages',
      'Founder profiles',
    ],
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
    attributes: [
      'Embedded sales agent',
      'AI content agent',
      'Ads infrastructure',
      'Multi-location',
      'Membership packages',
    ],
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
    attributes: [
      'Embedded sales agent',
      'AI content agent',
      'Lead capture',
      'Telehealth-oriented design',
    ],
  },
  {
    slug: 'davin-security',
    name: 'Davin Security',
    industry: 'Private security',
    url: 'https://keystone-site-prod-davin-security-wqpbsfjs.rahul-0b6.workers.dev',
    story:
      "A Seattle security company built by professionals who rejected the staffing-firm model. Founded by CEO N'Vida Yotcho and COO Daniel Okenve, Davin delivers tailored, proactive protection — observation, presence, and customer service — across construction, healthcare, residential, hotel, office, and event sites in Washington.",
    facts: [
      { label: 'CEO', value: "N'Vida Yotcho" },
      { label: 'COO', value: 'Daniel Okenve' },
      { label: 'Location', value: 'Seattle, WA' },
    ],
    attributes: [
      'Embedded sales agent',
      'Lead capture',
      'Six industry solutions',
      'Event security packages',
    ],
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
    attributes: [
      'Embedded sales agent',
      'Lead capture',
      'Product catalog',
      'Family team page',
    ],
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
    attributes: [
      'Embedded sales agent',
      'AI content agent',
      'Ads infrastructure',
      'Live grader search',
      'Case studies',
    ],
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
    attributes: [
      'Embedded sales agent',
      'Lead capture',
      'Wholesale catalog',
      'Multi-location footprint',
    ],
  },
  {
    slug: 'bare-lux-studio',
    name: 'Bare Lúx Studio',
    industry: 'Medical aesthetics',
    url: 'https://bare-lux-studio-93591379.rahul-0b6.workers.dev',
    story:
      'A nurse-founded medical aesthetics studio in Bordentown, New Jersey, focused on regenerative and anti-aging medicine — neurotoxins, fillers, biostimulators, and advanced skin therapies — with personalized plans and natural-looking results.',
    facts: [
      { label: 'Founders', value: 'Estefany Crook · Escarly Crook' },
      { label: 'Medical director', value: 'Dr. Hanna Eadeh' },
      { label: 'Location', value: 'Bordentown, NJ' },
    ],
    attributes: [
      'Embedded sales agent',
      'AI content agent',
      'Ads infrastructure',
      'Treatment packages',
      'Financing options',
    ],
  },
  {
    slug: 'enthea-care',
    name: 'EntheaCare',
    industry: 'Cannabis nursing & microdosing',
    url: 'https://keystone-site-prod-enthea-care-mwv8s7a3.rahul-0b6.workers.dev',
    story:
      'A nurse-led practice in Southern California pairing free product guidance and structured microdosing programs with a crafted hemp line — every batch lab-tested, every plan grounded in real nursing practice. Founded as Trusted Canna Nurse in 2022 and rebranded as EntheaCare in 2025.',
    facts: [
      { label: 'Founder', value: 'Megan Mbengue, RN' },
      { label: 'Founded', value: '2022' },
      { label: 'Based in', value: 'Rancho Cucamonga, CA' },
    ],
    attributes: [
      'Embedded sales agent',
      'Lead capture',
      'Outbound shop hub',
      'Nurse booking CTAs',
      'Education blog',
    ],
  },
];
