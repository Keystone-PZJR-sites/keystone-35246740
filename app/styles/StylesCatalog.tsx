'use client';

// Interactive catalog shell: a left sidebar (desktop) / horizontal tab bar
// (mobile) that switches between token and component panels. Active tab is
// mirrored to the URL hash so individual panels are linkable.

import { useEffect, useState, type ComponentType } from 'react';
import { Text } from '@/design-system/primitives';
import {
  ColorPanel,
  TypographyPanel,
  SpacingPanel,
  RadiusPanel,
  ElevationPanel,
  MotionPanel,
  LayeringPanel,
  ButtonsPanel,
  LinksPanel,
  PillsBadgesPanel,
  CardsPanel,
  InputsPanel,
  LogosPanel,
  IconsPanel,
  NavigationPanel,
  FooterPanel,
  ModalPanel,
  TabbedShowcasePanel,
  CardGridPanel,
  CenteredHeroPanel,
  SplitHeroPanel,
  MediaFeatureListPanel,
  TestimonialCarouselPanel,
  CtaBandPanel,
  PricingPanel,
  ProcessStepsPanel,
  CareersPanel,
  LeadershipPanel,
  OurStoryPanel,
  BlogPatternsPanel,
  LegalPanel,
} from './panels';

interface TabItem {
  id: string;
  label: string;
  Panel: ComponentType;
}

interface TabGroup {
  group: string;
  items: TabItem[];
}

const NAV: TabGroup[] = [
  {
    group: 'Foundations',
    items: [
      { id: 'color', label: 'Color', Panel: ColorPanel },
      { id: 'typography', label: 'Typography', Panel: TypographyPanel },
      { id: 'spacing', label: 'Spacing', Panel: SpacingPanel },
      { id: 'radius', label: 'Radius', Panel: RadiusPanel },
      { id: 'elevation', label: 'Elevation', Panel: ElevationPanel },
      { id: 'motion', label: 'Motion', Panel: MotionPanel },
      { id: 'layering', label: 'Layering', Panel: LayeringPanel },
    ],
  },
  {
    group: 'Primitives',
    items: [
      { id: 'buttons', label: 'Buttons', Panel: ButtonsPanel },
      { id: 'links', label: 'Links', Panel: LinksPanel },
      { id: 'pills', label: 'Pills & badges', Panel: PillsBadgesPanel },
      { id: 'cards', label: 'Cards', Panel: CardsPanel },
      { id: 'inputs', label: 'Inputs & forms', Panel: InputsPanel },
    ],
  },
  {
    group: 'Brand',
    items: [
      { id: 'logos', label: 'Logos & marks', Panel: LogosPanel },
      { id: 'icons', label: 'Iconography', Panel: IconsPanel },
    ],
  },
  {
    group: 'Components',
    items: [
      { id: 'navigation', label: 'Navigation', Panel: NavigationPanel },
      { id: 'footer', label: 'Footer', Panel: FooterPanel },
      { id: 'modal', label: 'Lead capture', Panel: ModalPanel },
      { id: 'tabbed-showcase', label: 'Tabbed showcase', Panel: TabbedShowcasePanel },
      { id: 'card-grid', label: 'Card grid', Panel: CardGridPanel },
      { id: 'centered-hero', label: 'Centered hero', Panel: CenteredHeroPanel },
      { id: 'split-hero', label: 'Split hero', Panel: SplitHeroPanel },
      { id: 'media-feature-list', label: 'Media + feature list', Panel: MediaFeatureListPanel },
      { id: 'testimonial-rail', label: 'Testimonial rail', Panel: TestimonialCarouselPanel },
      { id: 'cta-band', label: 'CTA band', Panel: CtaBandPanel },
      { id: 'pricing', label: 'Pricing', Panel: PricingPanel },
      { id: 'process-steps', label: 'Process steps', Panel: ProcessStepsPanel },
      { id: 'careers', label: 'Careers', Panel: CareersPanel },
      { id: 'leadership', label: 'Leadership', Panel: LeadershipPanel },
      { id: 'our-story', label: 'Our story', Panel: OurStoryPanel },
      { id: 'blog', label: 'Blog', Panel: BlogPatternsPanel },
      { id: 'legal', label: 'Legal', Panel: LegalPanel },
    ],
  },
];

const ALL_ITEMS = NAV.flatMap((g) => g.items);
const DEFAULT_ID = 'color';

export function StylesCatalog() {
  const [activeId, setActiveId] = useState(DEFAULT_ID);

  // Sync the active tab from the URL hash on mount. This must run on the
  // client (not in the initializer) so server and client first-render match
  // and there is no hydration mismatch.
  useEffect(() => {
    const fromHash = window.location.hash.replace('#', '');
    if (fromHash && ALL_ITEMS.some((i) => i.id === fromHash)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hash hydration
      setActiveId(fromHash);
    }
  }, []);

  const select = (id: string) => {
    setActiveId(id);
    history.replaceState(null, '', `#${id}`);
  };

  const ActivePanel = (ALL_ITEMS.find((i) => i.id === activeId) ?? ALL_ITEMS[0]).Panel;

  return (
    <div className="lg:grid lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-12">
      {/* Mobile / tablet: horizontal tab bar. Not sticky — the inner nav above
          it is itself sticky with a breakpoint-dependent height, so a fixed
          offset here would drift. It scrolls away with the content instead. */}
      <nav
        aria-label="Catalog sections"
        className="-mx-6 mb-8 flex gap-2 overflow-x-auto border-b border-[var(--color-border-tertiary)] px-6 py-3 lg:hidden"
      >
        {ALL_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => select(item.id)}
            aria-current={activeId === item.id ? 'true' : undefined}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors ${
              activeId === item.id
                ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]'
                : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Desktop: vertical sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 flex flex-col gap-6">
          {NAV.map((group) => (
            <div key={group.group}>
              <Text
                variant="caption"
                tone="quaternary"
                className="mb-2 block px-3 uppercase tracking-wide"
              >
                {group.group}
              </Text>
              <ul className="flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => select(item.id)}
                      aria-current={activeId === item.id ? 'true' : undefined}
                      className={`w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                        activeId === item.id
                          ? 'bg-[var(--color-bg-secondary)] font-medium text-[var(--color-text-primary)]'
                          : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      <div className="min-w-0">
        <ActivePanel />
      </div>
    </div>
  );
}
