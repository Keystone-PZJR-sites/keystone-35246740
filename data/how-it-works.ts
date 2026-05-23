import type {
  ProductScreensTool,
  WorkCardData,
  WorkIndustry,
} from '@/components/sections';
import type { WorkCardType } from '@/components/sections/WorkShowcase';

export type HowItWorksModuleId =
  | 'web'
  | 'ads'
  | 'social'
  | 'content'
  | 'reviews'
  | 'leads'
  | 'sales';

export interface HowItWorksHeroPill {
  id: HowItWorksModuleId;
  label: string;
  bg: string;
  text: string;
}

export interface HowItWorksMediaItem {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface HowItWorksModule {
  id: HowItWorksModuleId;
  label: string;
  shortDescription: string;
  supportingText: string;
  pillBg: string;
  pillText: string;
  media: HowItWorksMediaItem[];
}

export interface HowItWorksHeroSlide {
  id: HowItWorksModuleId;
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

type WorkMappedModuleConfig = {
  id: Exclude<HowItWorksModuleId, 'leads'>;
  label: string;
  shortDescription: string;
  supportingText: string;
  pillBg: string;
  pillText: string;
  sourceCardTypes: WorkCardType[];
  includeCard?: (card: WorkCardData) => boolean;
};

const WORK_MAPPED_MODULES: WorkMappedModuleConfig[] = [
  {
    id: 'web',
    label: 'Websites',
    shortDescription: 'Beautiful, SEO-Optimized, Customer-Friendly Websites.',
    supportingText:
      'Keystone builds high-quality, custom websites and handles all ongoing maintenance and optimization.',
    pillBg: '#65cf78',
    pillText: '#0d2a28',
    sourceCardTypes: ['web'],
    includeCard: (card) => card.visual.width >= card.visual.height,
  },
  {
    id: 'ads',
    label: 'Ads',
    shortDescription: 'Sophisticated Performance Advertising.',
    supportingText:
      'Keystone develops on-brand creative and campaigns that drive long-term quality customers.',
    pillBg: '#f57e56',
    pillText: '#3c1618',
    sourceCardTypes: ['ads'],
  },
  {
    id: 'social',
    label: 'Social',
    shortDescription: 'Always-On, On-Brand Social Media Posting.',
    supportingText:
      'Keystone develops custom socials media posts and publishes on your behalf so your business always has a strong pulse.',
    pillBg: '#9c65ee',
    pillText: '#2f0d3f',
    sourceCardTypes: ['social'],
  },
  {
    id: 'content',
    label: 'Content',
    shortDescription: 'Engaging, SEO-Friendly Content Creation.',
    supportingText:
      'Keystone builds an SEO-optimized blog and produces quality educational content on an ongoing basis.',
    pillBg: '#f38bb0',
    pillText: '#3d1324',
    sourceCardTypes: ['content'],
  },
  {
    id: 'reviews',
    label: 'Reviews',
    shortDescription: 'Google & Local Reputation Monitoring.',
    supportingText:
      'Keystone continuously monitors your business listings for growth opportunities and new reviews, and helps to personally respond to each review.',
    pillBg: '#5bc3b3',
    pillText: '#0d2a28',
    sourceCardTypes: ['listings'],
  },
  {
    id: 'sales',
    label: 'Sales',
    shortDescription: '24x7 Sales Team Following Up with Every New and Old Lead.',
    supportingText:
      'Keystone delivers immediate and long-term quality communication with all your leads, to get you new customers and re-engage the ones you already had.',
    pillBg: '#56a6ff',
    pillText: '#0f223d',
    sourceCardTypes: ['sales'],
  },
];

const LEADS_MODULE: Omit<HowItWorksModule, 'media'> = {
  id: 'leads',
  label: 'Leads',
  shortDescription: 'Powerful Sales & Marketing System Built for Local Businesses.',
  supportingText:
    'Keystone Platform is a powerful sales & marketing system that manages all aspects of your business growth and provides real-time access to critical events, opportunities, and data.',
  pillBg: '#f1c131',
  pillText: '#3a2a0e',
};

export const HOW_IT_WORKS_HERO_HEADLINE =
  'Expert digital marketing & sales for local business.';

export const HOW_IT_WORKS_HERO_SUPPORTING_COPY =
  'Keystone builds, maintains, optimizes and converts your website, ads, social, reviews, content, email, and leads.';

export const HOW_IT_WORKS_PRIMARY_CTA_LABEL = 'View portal & pricing';
export const HOW_IT_WORKS_SECONDARY_CTA_LABEL = 'Get in touch';

export function buildHowItWorksModules(
  cards: WorkCardData[],
  industries: WorkIndustry[],
  tools: ProductScreensTool[],
): HowItWorksModule[] {
  const modulesFromWorkCards = WORK_MAPPED_MODULES.map<HowItWorksModule>((config) => {
    const media: HowItWorksMediaItem[] = [];

    industries.forEach((industry) => {
      cards.forEach((card) => {
        if (card.industryId !== industry.id) return;
        if (!config.sourceCardTypes.includes(card.type)) return;
        if (config.includeCard && !config.includeCard(card)) return;

        media.push({
          id: `${config.id}-${industry.id}-${media.length + 1}`,
          src: card.visual.focusedSrc,
          alt: `${config.label} example for ${industry.label}.`,
          width: card.visual.width,
          height: card.visual.height,
        });
      });
    });

    return {
      ...config,
      media,
    };
  });

  const leadsTool = tools.find((tool) => tool.id === 'leads');
  const leadsSource =
    leadsTool?.mobileScreenshotSrc ??
    leadsTool?.screenshotLayers[0] ??
    '/product-screens/screen-leads.jpg';

  const leadsModule: HowItWorksModule = {
    ...LEADS_MODULE,
    media: [
      {
        id: 'leads-screen',
        src: leadsSource,
        alt: 'Leads dashboard preview from Keystone product screens.',
        width: 1247,
        height: 810,
      },
    ],
  };

  const moduleOrder: HowItWorksModuleId[] = [
    'web',
    'ads',
    'social',
    'content',
    'reviews',
    'leads',
    'sales',
  ];

  const lookup = new Map<HowItWorksModuleId, HowItWorksModule>(
    [...modulesFromWorkCards, leadsModule].map((module) => [module.id, module]),
  );

  return moduleOrder
    .map((id) => lookup.get(id))
    .filter((module): module is HowItWorksModule => Boolean(module));
}

export function buildHowItWorksHeroPills(
  modules: HowItWorksModule[],
): HowItWorksHeroPill[] {
  return modules.map((module) => ({
    id: module.id,
    label: module.label,
    bg: module.pillBg,
    text: module.pillText,
  }));
}

export function buildHowItWorksHeroSlides(
  modules: HowItWorksModule[],
): HowItWorksHeroSlide[] {
  const fallbackMedia = modules.find((module) => module.media.length > 0)?.media[0];

  return modules
    .map((module) => {
      const media = module.media[0] ?? fallbackMedia;
      if (!media) return null;
      return {
        id: module.id,
        label: module.label,
        src: media.src,
        alt: media.alt,
        width: media.width,
        height: media.height,
      };
    })
    .filter((slide): slide is HowItWorksHeroSlide => Boolean(slide));
}

function rotateMediaItems(
  items: HowItWorksMediaItem[],
  offset: number,
): HowItWorksMediaItem[] {
  if (items.length <= 1) return items;
  const normalizedOffset = ((offset % items.length) + items.length) % items.length;
  if (normalizedOffset === 0) return items;
  return [...items.slice(normalizedOffset), ...items.slice(0, normalizedOffset)];
}

export function randomizeModuleMediaOrder(
  modules: HowItWorksModule[],
): HowItWorksModule[] {
  return modules.map((module) => {
    if (module.media.length <= 1) return module;

    // Keep hero and module-first visuals from feeling identical by ensuring
    // modules rotate away from index 0 when multiple assets exist.
    const rotation = 1 + Math.floor(Math.random() * (module.media.length - 1));

    return {
      ...module,
      media: rotateMediaItems(module.media, rotation),
    };
  });
}
