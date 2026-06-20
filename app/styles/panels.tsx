'use client';

// Catalog panels. One component per sidebar tab. Each renders live
// design-system tokens, primitives, and components — values only, no prose.
// Every component preview is wrapped in a PreviewFrame (phone/tablet/narrow-web/wide-web).

import { useState, type ReactNode } from 'react';
import {
  Heading,
  Text,
  Button,
  Link,
  Pill,
  Badge,
  Card,
  KeystoneWordmark,
  KeystoneMark,
  SocialIcon,
  CtaDefault,
  TextInput,
  Textfield,
  MobileNumberInput,
  QuantityStepper,
} from '@/design-system/primitives';
import {
  HeroNav,
  OversizedFooter,
  MobileFooter,
  FOOTER_COPY,
  FOOTER_VIDEOS_DESKTOP,
  FOOTER_VIDEOS_MOBILE,
  SITE_NAV_ITEMS,
  SITE_NAV_LOGIN_LABEL,
  SITE_NAV_LOGIN_HREF,
  SITE_NAV_CTA_LABEL,
  SpotlightCard,
  CardGrid,
  CardGridItem,
  Marquee,
} from '@/design-system/components';
import {
  TabbedShowcase,
  MobileTabbedShowcase,
  type TabbedShowcaseTab,
  CenteredHero,
  SplitHero,
  MediaFeatureList,
  type MediaFeatureItem,
  TestimonialCarousel,
  type TestimonialCard,
  CtaBand,
  PriceSummary,
  PricingCalculator,
  FeatureGrid,
  ProcessSteps,
  QuoteWall,
  BackerGrid,
  JobList,
  StoryHero,
  Timeline,
} from '@/design-system/sections';
import { ProcessMock, type ProcessMockKind } from '@/design-system/patterns/how-it-works';
import { TeamCollage } from '@/design-system/patterns/careers';
import { LegalDocumentPage } from '@/design-system/patterns/legal';
import type { BlogPost, JobPosting } from 'keystone-design-bootstrap/types';
import {
  BlogFeatureHero,
  BlogHighlightCard,
  BlogRecentList,
  BlogTopicBand,
  BlogCategorySection,
  BlogAllTopics,
  BlogBreadcrumb,
  BlogArticleToc,
  BlogAuthorBio,
  BlogPostSidebar,
  type TagWithCount,
  type TocHeading,
} from '@/design-system/patterns/blog';
import {
  ArrowNarrowLeft,
  ArrowNarrowRight,
  ArrowUpRight,
  Award01,
  BarChartSquare02,
  Building02,
  Calendar,
  CalendarCheck01,
  ChevronDown,
  Clock,
  Gift01,
  Globe01,
  Heart,
  LineChartUp01,
  Mail01,
  Map01,
  MarkerPin01,
  Menu02,
  MessageChatCircle,
  MessageSmileCircle,
  MessageTextSquare01,
  Minus,
  PhoneCall01,
  Play,
  Plus,
  RefreshCcw05,
  Repeat01,
  Repeat04,
  SearchLg,
  Send01,
  Star01,
  Target04,
  TrendUp01,
  Users01,
  XClose,
  Zap,
} from '@untitledui/icons';
import {
  PRICING_PAGE,
  HOW_IT_WORKS_PAGE,
  CAREERS_PAGE,
  LEADERSHIP_PAGE,
  OUR_STORY_PAGE,
  LEGAL_DOCS,
  SHARED_PRICING_TAGLINE,
  SHARED_PRICING_PRICE_AMOUNT,
  SHARED_PRICING_PRICE_PERIOD,
  SHARED_PRICING_SUBCOPY_LINE_1,
  SHARED_PRICING_SUBCOPY_LINE_2,
  SHARED_PRICING_FEATURE_CHIPS,
} from '@/data';
import {
  COLOR_FAMILIES,
  TEXT_COLORS,
  SURFACE_COLORS,
  BORDER_COLORS,
  FORM_CONTROL_COLORS,
  STATUS_COLORS,
  SECTION_COLORS,
  FONT_TOKENS,
  WEIGHT_TOKENS,
  DISPLAY_SCALE,
  TEXT_SCALE,
  SPACING_TOKENS,
  RADIUS_TOKENS,
  GRADIENT_TOKENS,
  ELEVATION_TOKENS,
  MOTION_TOKENS,
  Z_INDEX_TOKENS,
} from '@/design-system/tokens/catalog';
import {
  PanelHeader,
  Group,
  Swatch,
  SwatchGrid,
  Ramp,
  StatusRow,
  SpecTable,
  TypeRow,
  PreviewFrame,
} from './catalog-kit';
import { PillToggleDemo, LeadCaptureTrigger, FormControlsDemo } from './CatalogInteractive';

/** A wrapping row of specimens inside a PreviewFrame. */
function Row({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-4">{children}</div>;
}

// ─── Foundations ────────────────────────────────────────────────────────────

export function ColorPanel() {
  return (
    <div>
      <PanelHeader title="Color" meta="role-named tokens" />

      <Group label="Palette" note="Every step is a real, in-use token, ordered light to dark.">
        <div className="flex flex-col gap-6">
          {COLOR_FAMILIES.map((family) => (
            <div key={family.title}>
              <Text variant="small" className="mb-2 font-medium">
                {family.title}
                {family.themeScoped ? (
                  <span className="text-[var(--color-text-quaternary)]"> · themed</span>
                ) : null}
              </Text>
              <Ramp family={family} />
            </div>
          ))}
        </div>
      </Group>

      <Group label="Text" note="Foreground colors by emphasis.">
        <SwatchGrid>
          {TEXT_COLORS.tokens.map((t) => (
            <Swatch key={t.variable} token={t} />
          ))}
        </SwatchGrid>
      </Group>

      <Group label="Surface & background">
        <SwatchGrid>
          {SURFACE_COLORS.tokens.map((t) => (
            <Swatch key={t.variable} token={t} />
          ))}
        </SwatchGrid>
      </Group>

      <Group label="Border">
        <SwatchGrid>
          {BORDER_COLORS.tokens.map((t) => (
            <Swatch key={t.variable} token={t} />
          ))}
        </SwatchGrid>
      </Group>

      <Group label="Form controls & warm neutrals" note="Global control + form-state palette used by the lead-capture modal and value-props controls.">
        <SwatchGrid>
          {FORM_CONTROL_COLORS.tokens.map((t) => (
            <Swatch key={t.variable} token={t} />
          ))}
        </SwatchGrid>
      </Group>

      <Group label="Gradients" note="Shared fills: the scrim darkens media behind text; the brand / mint / ink gradients back gradient-filled cards.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {GRADIENT_TOKENS.map((g) => (
            <div key={g.variable}>
              <div
                className="h-20 overflow-hidden rounded-xl border border-[var(--color-border-tertiary)]"
                style={{
                  background:
                    g.variable === 'gradient-scrim' ? 'var(--color-text-tertiary)' : undefined,
                }}
              >
                <div className="h-full w-full" style={{ background: `var(--${g.variable})` }} />
              </div>
              <Text variant="caption" className="mt-2 block font-mono">
                --{g.variable}
              </Text>
              <Text variant="caption" tone="quaternary">
                {g.note}
              </Text>
            </div>
          ))}
        </div>
      </Group>

      <Group label="Semantic status" note="success · warning · error · info — bg / border / text / solid.">
        <div className="grid gap-4 sm:grid-cols-2">
          {STATUS_COLORS.map((s) => (
            <StatusRow key={s.name} status={s} />
          ))}
        </div>
      </Group>

      <Group label="Section palettes" note={'Resolve only inside a [data-theme="custom"] subtree.'}>
        <div className="flex flex-col gap-8">
          {SECTION_COLORS.map((group) => (
            <div key={group.title}>
              <Text variant="small" className="mb-3 font-medium">
                {group.title}
              </Text>
              <SwatchGrid>
                {group.tokens.map((t) => (
                  <Swatch key={t.variable} token={t} themeScoped />
                ))}
              </SwatchGrid>
            </div>
          ))}
        </div>
      </Group>
    </div>
  );
}

const ALPHABET = 'AaBbCcDdEeFfGgHhIiJjKkLlMm NnOoPpQqRrSsTtUuVvWwXxYyZz 0123456789';

export function TypographyPanel() {
  return (
    <div>
      <PanelHeader title="Typography" meta="2 active families · 5 weights · 2 type scales" />

      <Group label="Font families">
        <div className="grid gap-4 sm:grid-cols-2">
          {FONT_TOKENS.map((font) => (
            <Card key={font.variable}>
              <div
                className="leading-none text-[var(--color-text-primary)]"
                style={{ fontFamily: `var(--${font.variable})`, fontSize: '3.5rem' }}
              >
                Ag
              </div>
              <Text variant="small" className="mt-4 font-mono font-medium">
                --{font.variable}
              </Text>
              <Text variant="caption" tone="tertiary" className="mt-1">
                {font.name} · {font.usage}
              </Text>
              <Text variant="caption" tone="quaternary" className="mt-0.5">
                {font.weights}
              </Text>
              <p
                className="mt-3 break-words text-[var(--color-text-tertiary)]"
                style={{ fontFamily: `var(--${font.variable})`, fontSize: '0.9rem' }}
              >
                {ALPHABET}
              </p>
            </Card>
          ))}
        </div>
      </Group>

      <Group label="Weights" note="Numeric weight tokens. FK Grotesk Neue ships Regular and Bold; there's no Medium or Semibold cut, so 500/600 fall back to Regular (the browser doesn't fake a heavier weight for this webfont).">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WEIGHT_TOKENS.map((w) => (
            <Card key={w.variable}>
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className="text-[2rem] leading-none text-[var(--color-text-primary)]"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: Number(w.value) }}
                >
                  Ag
                </span>
                <Text variant="caption" tone="quaternary" className="font-mono">
                  {w.value}
                </Text>
              </div>
              <Text variant="small" className="mt-4 font-mono font-medium">
                --{w.variable}
              </Text>
              <Text variant="caption" tone="tertiary" className="mt-1">
                {w.name} · {w.usage}
              </Text>
              {!w.real && (
                <Text variant="caption" tone="quaternary" className="mt-0.5">
                  No cut — falls back to Regular
                </Text>
              )}
            </Card>
          ))}
        </div>
      </Group>

      <Group label="Display scale" note="FK Screamer · the Heading primitive. Ships as fluid clamps that peak at these sizes.">
        <div>
          {DISPLAY_SCALE.map((step) => (
            <TypeRow key={step.sizeToken} step={step} />
          ))}
        </div>
      </Group>

      <Group label="Text scale" note="FK Grotesk Neue · the Text and Eyebrow primitives.">
        <div>
          {TEXT_SCALE.map((step) => (
            <TypeRow key={step.sizeToken} step={step} />
          ))}
        </div>
      </Group>
    </div>
  );
}

export function SpacingPanel() {
  return (
    <div>
      <PanelHeader title="Spacing" meta="4px base grid" />
      <Group label="Scale">
        <div className="flex flex-col gap-3">
          {SPACING_TOKENS.map((t) => (
            <div key={t.variable} className="flex items-center gap-4">
              <Text variant="small" className="w-8 shrink-0 font-medium">
                {t.name}
              </Text>
              <div
                className="h-4 shrink-0 rounded-sm bg-[var(--color-bg-brand-solid)]"
                style={{ width: `var(--${t.variable})` }}
              />
              <Text variant="caption" tone="quaternary" className="font-mono">
                --{t.variable}
              </Text>
              <Text variant="caption" tone="tertiary" className="ml-auto font-mono">
                {t.value}
              </Text>
            </div>
          ))}
        </div>
      </Group>
    </div>
  );
}

export function RadiusPanel() {
  return (
    <div>
      <PanelHeader title="Radius" />
      <Group label="Corner radius">
        <div className="mb-8 flex flex-wrap items-end gap-6">
          {RADIUS_TOKENS.map((r) => (
            <div key={r.variable} className="text-center">
              <div
                className="h-20 w-20 border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]"
                style={{ borderRadius: `var(--${r.variable})` }}
              />
              <Text variant="caption" tone="quaternary" className="mt-2">
                {r.name}
              </Text>
            </div>
          ))}
        </div>
        <SpecTable tokens={RADIUS_TOKENS} />
      </Group>
    </div>
  );
}

export function ElevationPanel() {
  return (
    <div>
      <PanelHeader title="Elevation" />
      <Group label="Shadows">
        <div className="mb-8 flex flex-wrap gap-8">
          {ELEVATION_TOKENS.map((e) => (
            <div
              key={e.variable}
              className="flex h-24 w-40 items-center justify-center rounded-xl bg-[var(--color-surface-card)]"
              style={{ boxShadow: `var(--${e.variable})` }}
            >
              <Text variant="caption" tone="quaternary">
                {e.name}
              </Text>
            </div>
          ))}
        </div>
        <SpecTable tokens={ELEVATION_TOKENS} />
      </Group>
    </div>
  );
}

export function MotionPanel() {
  return (
    <div>
      <PanelHeader title="Motion" />
      <Group label="Easing & duration" note="One ease ramp plus three shared durations.">
        <SpecTable tokens={MOTION_TOKENS} />
      </Group>
    </div>
  );
}

export function LayeringPanel() {
  return (
    <div>
      <PanelHeader title="Layering" meta="z-index scale" />
      <Group label="Z-index">
        <SpecTable tokens={Z_INDEX_TOKENS} />
      </Group>
    </div>
  );
}

// ─── Primitives ──────────────────────────────────────────────────────────────

export function ButtonsPanel() {
  return (
    <div>
      <PanelHeader title="Buttons" meta="variant × tone × size" />
      <Group label="Default tone (on cream)">
        <PreviewFrame title="Buttons on cream" surface="cream">
          <Row>
            <Button variant="primary" withArrow>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg" withArrow>Large</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </Row>
        </PreviewFrame>
      </Group>
      <Group label="Inverse tone (on ink)">
        <PreviewFrame title="Buttons on ink" surface="ink">
          <Row>
            <Button variant="primary" tone="inverse" withArrow>Primary</Button>
            <Button variant="secondary" tone="inverse">Secondary</Button>
            <Button variant="ghost" tone="inverse">Ghost</Button>
          </Row>
        </PreviewFrame>
      </Group>
    </div>
  );
}

export function LinksPanel() {
  return (
    <div>
      <PanelHeader title="Links" />
      <Group label="On cream">
        <PreviewFrame title="Links on cream" surface="cream">
          <Row>
            <Link href="#">Default link</Link>
            <Link href="#" tone="brand">Brand link</Link>
            <Link href="#" underline>Underlined</Link>
            <Link href="https://keystone.app" external>External</Link>
          </Row>
        </PreviewFrame>
      </Group>
      <Group label="On ink">
        <PreviewFrame title="Links on ink" surface="ink">
          <Row>
            <Link href="#" tone="inverse">Inverse link</Link>
            <Link href="#" tone="inverse" underline>Underlined</Link>
          </Row>
        </PreviewFrame>
      </Group>
    </div>
  );
}

export function PillsBadgesPanel() {
  return (
    <div>
      <PanelHeader title="Pills & badges" />
      <Group label="Pill tones">
        <PreviewFrame title="Pill tones" surface="cream">
          <Row>
            <Pill tone="ink">Ink</Pill>
            <Pill tone="cream">Cream</Pill>
            <Pill tone="brand">Brand</Pill>
            <Pill tone="accent">Accent</Pill>
            <Pill tone="outline">Outline</Pill>
          </Row>
        </PreviewFrame>
      </Group>
      <Group label="Pill toggle" note="Accessible single-select toggle group.">
        <PreviewFrame title="Pill toggle" surface="cream">
          <Row>
            <PillToggleDemo />
          </Row>
        </PreviewFrame>
      </Group>
      <Group label="Badge tones">
        <PreviewFrame title="Badge tones" surface="cream">
          <Row>
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="brand">Brand</Badge>
            <Badge tone="accent">Accent</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="error">Error</Badge>
            <Badge tone="info">Info</Badge>
          </Row>
        </PreviewFrame>
      </Group>
    </div>
  );
}

/**
 * The card components themselves: the Card primitive and the SpotlightCard
 * composite that builds on it. Laying cards out is CardGrid's job — see the
 * "Card grid" panel under Components.
 */
export function CardsPanel() {
  return (
    <div>
      <PanelHeader title="Cards" meta="Card · SpotlightCard · spec 036" />

      <Group label="Card" note="The Card primitive — a small raised content card (border, soft shadow, component radius). The building block for content grids and the nested cards below.">
        <PreviewFrame title="Card" surface="cream">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card interactive>
              <Heading level={4} size="sm" font="body">Card · cream</Heading>
              <Text variant="small" tone="tertiary" className="mt-2">Interactive — lifts on hover.</Text>
            </Card>
            <Card tone="ink">
              <Heading level={4} size="sm" font="body" tone="inverse">Card · ink</Heading>
              <Text variant="small" tone="inverse-muted" className="mt-2">For dark surfaces.</Text>
            </Card>
          </div>
        </PreviewFrame>
      </Group>

      <Group
        label="Spotlight card"
        note="SpotlightCard (spec 036) — the larger feature card. One component, every format by props: media + title (with a play button), media + stat, a gradient tile framing a nested Card, and a solid call-to-action tile. Affordances sit in the top-right corner."
      >
        <PreviewFrame title="Card formats" surface="cream">
          <CardGrid columns={4} ariaLabel="Card formats">
            <SpotlightCard
              background={{ kind: 'image', src: PHOTO_PLACEHOLDER, alt: '' }}
              aspect={0.82}
              eyebrow="Made Locally"
              title="How a neighborhood shop doubled its leads"
              affordance="play"
              affordanceLabel="Play episode"
            />
            <SpotlightCard
              background={{ kind: 'image', src: PHOTO_PLACEHOLDER, alt: '' }}
              aspect={0.82}
              stat="+62%"
              statLabel="More calls"
              caption="Cedar & Co. Barbershop"
            />
            <SpotlightCard
              background={{ kind: 'gradient', tone: 'mint' }}
              aspect={0.82}
              caption="We get your business to the top of local search."
            >
              <ResultCard name="Hometown Pet Spa" rating="4.9" />
            </SpotlightCard>
            <SpotlightCard
              background={{ kind: 'solid', tone: 'brand' }}
              aspect={0.82}
              title="Tips for local owners"
              caption="Real growth stories on the Made Locally podcast."
              href="#cards"
              affordance="arrow"
              affordanceLabel="Explore the Made Locally podcast"
            />
          </CardGrid>
        </PreviewFrame>
      </Group>
    </div>
  );
}

export function InputsPanel() {
  return (
    <div>
      <PanelHeader title="Inputs & forms" meta="lead-capture field set" />
      <Group label="Fields">
        <PreviewFrame title="Form fields" surface="cream">
          <div className="flex w-full flex-col gap-4 sm:max-w-md">
            <TextInput id="catalog-name" label="Full name" input="Jordan Rivera" property1="filled" />
            <Textfield state="filled" value="A few words about your business." />
            <MobileNumberInput state="filled" number="(818) 370-1100" />
          </div>
        </PreviewFrame>
      </Group>
      <Group label="Controls">
        <PreviewFrame title="Form controls" surface="cream">
          <Row>
            <CtaDefault label="Get in touch" />
            <FormControlsDemo />
          </Row>
        </PreviewFrame>
      </Group>
    </div>
  );
}

// ─── Brand ───────────────────────────────────────────────────────────────────

export function LogosPanel() {
  return (
    <div>
      <PanelHeader title="Logos & marks" />
      <Group label="On ink">
        <PreviewFrame title="Logos on ink" surface="ink">
          <Row>
            <KeystoneWordmark color="var(--color-hero-accent,#6ecc8b)" width={154} height={30} alt="Keystone" />
            <KeystoneMark color="var(--color-hero-accent,#6ecc8b)" />
          </Row>
        </PreviewFrame>
      </Group>
      <Group label="On cream">
        <PreviewFrame title="Logos on cream" surface="cream">
          <Row>
            <KeystoneWordmark color="var(--color-text-primary,#042019)" width={154} height={30} alt="Keystone" />
            <KeystoneMark color="var(--color-bg-brand-solid,#f57e56)" />
          </Row>
        </PreviewFrame>
      </Group>
      <Group label="Social icons" note="Single source for footer links; renders even without a URL.">
        <PreviewFrame title="Social icons" surface="ink">
          <Row>
            <SocialIcon platform="instagram" href={undefined} variant="desktop" />
            <SocialIcon platform="facebook" href={undefined} variant="desktop" />
            <SocialIcon platform="youtube" href={undefined} variant="desktop" />
            <SocialIcon platform="linkedin" href={undefined} variant="desktop" />
            <SocialIcon platform="spotify" href={undefined} variant="desktop" />
            <SocialIcon platform="applepodcasts" href={undefined} variant="desktop" />
          </Row>
        </PreviewFrame>
      </Group>
    </div>
  );
}

// Every @untitledui/icons glyph used across the design system and authored
// content (nav chrome, section controls, and service/pricing feature tiles),
// kept alphabetical so the catalog stays a complete inventory of icons in use.
const ICONS = [
  { name: 'ArrowNarrowLeft', Icon: ArrowNarrowLeft },
  { name: 'ArrowNarrowRight', Icon: ArrowNarrowRight },
  { name: 'ArrowUpRight', Icon: ArrowUpRight },
  { name: 'Award01', Icon: Award01 },
  { name: 'BarChartSquare02', Icon: BarChartSquare02 },
  { name: 'Building02', Icon: Building02 },
  { name: 'Calendar', Icon: Calendar },
  { name: 'CalendarCheck01', Icon: CalendarCheck01 },
  { name: 'ChevronDown', Icon: ChevronDown },
  { name: 'Clock', Icon: Clock },
  { name: 'Gift01', Icon: Gift01 },
  { name: 'Globe01', Icon: Globe01 },
  { name: 'Heart', Icon: Heart },
  { name: 'LineChartUp01', Icon: LineChartUp01 },
  { name: 'Mail01', Icon: Mail01 },
  { name: 'Map01', Icon: Map01 },
  { name: 'MarkerPin01', Icon: MarkerPin01 },
  { name: 'Menu02', Icon: Menu02 },
  { name: 'MessageChatCircle', Icon: MessageChatCircle },
  { name: 'MessageSmileCircle', Icon: MessageSmileCircle },
  { name: 'MessageTextSquare01', Icon: MessageTextSquare01 },
  { name: 'Minus', Icon: Minus },
  { name: 'PhoneCall01', Icon: PhoneCall01 },
  { name: 'Play', Icon: Play },
  { name: 'Plus', Icon: Plus },
  { name: 'RefreshCcw05', Icon: RefreshCcw05 },
  { name: 'Repeat01', Icon: Repeat01 },
  { name: 'Repeat04', Icon: Repeat04 },
  { name: 'SearchLg', Icon: SearchLg },
  { name: 'Send01', Icon: Send01 },
  { name: 'Star01', Icon: Star01 },
  { name: 'Target04', Icon: Target04 },
  { name: 'TrendUp01', Icon: TrendUp01 },
  { name: 'Users01', Icon: Users01 },
  { name: 'XClose', Icon: XClose },
  { name: 'Zap', Icon: Zap },
];

export function IconsPanel() {
  return (
    <div>
      <PanelHeader title="Iconography" meta="@untitledui/icons" />
      <Group label="In use" note="UI icons are drawn from @untitledui/icons and inherit currentColor.">
        <PreviewFrame title="Icons" surface="cream">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {ICONS.map(({ name, Icon }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-3 rounded-xl border border-[var(--color-border-tertiary)] bg-[var(--color-surface-card)] p-5 text-[var(--color-text-primary)]"
              >
                <Icon width={24} height={24} />
                <Text variant="caption" tone="tertiary" className="font-mono">
                  {name}
                </Text>
              </div>
            ))}
          </div>
        </PreviewFrame>
      </Group>
    </div>
  );
}

// ─── Components ───────────────────────────────────────────────────────────────

function SiteNavPreview() {
  return (
    <HeroNav
      items={SITE_NAV_ITEMS}
      loginLabel={SITE_NAV_LOGIN_LABEL}
      loginHref={SITE_NAV_LOGIN_HREF}
      ctaLabel={SITE_NAV_CTA_LABEL}
      wordmarkColor="var(--color-hero-accent,#6ecc8b)"
      openMenuLabel="Open menu"
      closeMenuLabel="Close menu"
    />
  );
}

export function NavigationPanel() {
  return (
    <div>
      <PanelHeader title="Navigation" meta="live preview" />

      <Group label="SiteNav" note="The one site-wide navigation — overlaid on the homepage hero and on every inner page via InnerPageShell. Phone and Tablet show the accordion menu; Narrow and Wide web show the desktop mega-menu (hover a top-level item for its dropdown). The bar hands off to the mobile menu below 985px, and its chrome scales fluidly up to 1600px.">
        <PreviewFrame title="SiteNav" surface="ink" padded={false} minHeight={380}>
          <SiteNavPreview />
        </PreviewFrame>
      </Group>
    </div>
  );
}

// No company social URLs in the catalog — the footer's SocialIcon renders
// without an href, so the icons still appear in the preview.
const FOOTER_SOCIAL = {
  youtubeUrl: undefined,
  instagramUrl: undefined,
  facebookUrl: undefined,
  linkedinUrl: undefined,
};

export function FooterPanel() {
  return (
    <div>
      <PanelHeader title="Footer" meta="live preview" />
      <Group label="OversizedFooter / MobileFooter" note="Inner-page footer from one shared content source. Toggle Phone for the mobile collage, Tablet / Web for the desktop collage.">
        <PreviewFrame title="Footer" surface="ink" padded={false}>
          <OversizedFooter {...FOOTER_COPY} {...FOOTER_SOCIAL} {...FOOTER_VIDEOS_DESKTOP} />
          <MobileFooter {...FOOTER_COPY} {...FOOTER_SOCIAL} {...FOOTER_VIDEOS_MOBILE} />
        </PreviewFrame>
      </Group>
    </div>
  );
}

export function ModalPanel() {
  return (
    <div>
      <PanelHeader title="Lead capture" />
      <Group label="Modal" note="Opened site-wide through the LeadCaptureProvider context.">
        <PreviewFrame title="Lead capture" surface="cream">
          <Row>
            <LeadCaptureTrigger />
          </Row>
        </PreviewFrame>
      </Group>
    </div>
  );
}

/** A stand-in for the page-supplied visual block inside a showcase tab. */
function ShowcaseVisual({ metric, label }: { metric: string; label: string }) {
  return (
    <div className="flex h-full min-h-[200px] w-full items-center justify-center rounded-[var(--radius-component)] bg-[var(--color-hero-bg)] p-8">
      <div className="text-center">
        <div className="text-5xl font-bold text-[var(--color-hero-accent)]">{metric}</div>
        <Text tone="inverse-muted" variant="small" className="mt-2">
          {label}
        </Text>
      </div>
    </div>
  );
}

const SHOWCASE_TABS: TabbedShowcaseTab[] = [
  {
    id: 'found',
    name: 'Get found',
    eyebrow: 'Visibility',
    headline: 'Show up first when nearby customers search',
    visual: <ShowcaseVisual metric="+38%" label="Local search views" />,
  },
  {
    id: 'leads',
    name: 'Win the lead',
    eyebrow: 'Demand',
    headline: 'Turn local interest into new customers',
    visual: <ShowcaseVisual metric="2.4×" label="Qualified leads" />,
  },
  {
    id: 'reputation',
    name: 'Earn loyalty',
    eyebrow: 'Reputation',
    headline: 'Collect more 5-star reviews automatically',
    visual: <ShowcaseVisual metric="+120" label="New reviews" />,
  },
];

// A flat SVG stand-in for a photo so the catalog renders offline (the real
// site supplies remote photos). Demonstrates the media + scrim + overlay path.
const PHOTO_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23b9a98f'/%3E%3Cstop offset='1' stop-color='%235c5346'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3C/svg%3E";

/**
 * A nested mini result card — the "card within a card" a SpotlightCard frames.
 * It's the shared `Card` primitive, so the nested card and every other content
 * card draw from one definition.
 */
function ResultCard({ name, rating }: { name: string; rating: string }) {
  return (
    <Card className="flex items-center gap-3 !p-3">
      <span
        className="h-10 w-10 flex-shrink-0 rounded-lg"
        style={{ background: 'var(--gradient-brand)' }}
        aria-hidden="true"
      />
      <span className="min-w-0">
        <Heading level={4} size="sm" font="body" className="!text-base font-bold">
          {name}
        </Heading>
        <Text variant="caption" tone="tertiary">
          {rating} ★★★★★
        </Text>
      </span>
    </Card>
  );
}

export function TabbedShowcasePanel() {
  return (
    <div>
      <PanelHeader title="Tabbed showcase" meta="spec 035 · auto-advancing tabs" />
      <Group
        label="TabbedShowcase / MobileTabbedShowcase"
        note="Auto-advancing feature tabs. Phone and Tablet show the swipeable carousel (dots + prev/next arrows); Narrow and Wide web show the desktop tablist with a crossfading panel. The bar under the active tab fills, then advances and loops; hover or focus to pause."
      >
        <PreviewFrame title="Tabbed showcase" surface="cream" padded={false}>
          <TabbedShowcase tabs={SHOWCASE_TABS} ariaLabel="What Keystone does" />
          <MobileTabbedShowcase tabs={SHOWCASE_TABS} ariaLabel="What Keystone does" />
        </PreviewFrame>
      </Group>
    </div>
  );
}

export function CardGridPanel() {
  return (
    <div>
      <PanelHeader title="Card grid" meta="spec 036 · CardGrid + CardGridItem" />
      <Group
        label="CardGrid / CardGridItem"
        note="Lays cards out on a responsive column grid. CardGridItem applies per-card column / row spans for bento compositions — a wide feature tile above a split row here. Collapses to a single column below 985px, where spans are ignored and cards stack in source order."
      >
        <PreviewFrame title="Bento grid" surface="cream">
          <CardGrid columns={2} ariaLabel="Bento example">
            <CardGridItem colSpan={2}>
              <SpotlightCard
                background={{ kind: 'image', src: PHOTO_PLACEHOLDER, alt: '' }}
                aspect={2.2}
                eyebrow="Done-for-you"
                title="Always-on marketing, handled by your Keystone team"
              />
            </CardGridItem>
            <SpotlightCard
              background={{ kind: 'gradient', tone: 'mint' }}
              caption="Get found on Google for what you do."
            >
              <ResultCard name="Cedar & Co. Barbershop" rating="4.8" />
            </SpotlightCard>
            <SpotlightCard
              background={{ kind: 'solid', tone: 'cream' }}
              caption="Ads, reviews, and follow-up working together."
            >
              <ResultCard name="Hometown Pet Spa" rating="4.9" />
            </SpotlightCard>
          </CardGrid>
        </PreviewFrame>
      </Group>
    </div>
  );
}

// ── Service page sections (spec 037) ─────────────────────────────────────────

export function CenteredHeroPanel() {
  return (
    <div>
      <PanelHeader title="Centered hero" meta="spec 039 · CenteredHero" />
      <Group
        label="CenteredHero"
        note="The clean, centered, light inner-page hero on the cream surface — the non-split page opener. Eyebrow / headline / supporting line, built from primitives. The floating site nav sits over its top edge (the preview shows the nav-clearance padding with no nav mounted)."
      >
        <PreviewFrame title="Centered hero" surface="cream" padded={false}>
          <CenteredHero
            eyebrow="Pricing"
            title="Simple pricing that grows with you"
            subtitle="One price covers everything you need to run. Want more done? Only pay for the work you use — no contracts, no surprises."
          />
        </PreviewFrame>
      </Group>
    </div>
  );
}

export function SplitHeroPanel() {
  return (
    <div>
      <PanelHeader title="Split hero" meta="spec 037 · SplitHero" />
      <Group
        label="SplitHero"
        note="A two-column page opener: eyebrow / headline / supporting line / actions beside a single media card (a SpotlightCard with a photo, a deliverables statement, and a brand tagline). Stacks to one column (copy first) below 985px."
      >
        <PreviewFrame title="Split hero" surface="cream" padded={false}>
          <SplitHero
            eyebrow="Websites"
            title="Websites built for sales first, style second."
            subtitle="Keystone builds your site to drive sales — proven design that grows your Google traffic and converts more visitors."
            primary={{ label: 'Get a free demo', href: '#' }}
            secondary={{ label: 'View pricing', href: '#' }}
            media={
              <SpotlightCard
                background={{ kind: 'image', src: PHOTO_PLACEHOLDER, alt: '' }}
                aspect={5 / 6}
                title="Built to sell, not just to look good. Growing your search traffic. Turning visitors into customers."
                titleSize="sm"
                caption="Websites, Optimized."
                className="ks-svc-hero-card"
              />
            }
          />
        </PreviewFrame>
      </Group>
    </div>
  );
}

const FEATURE_ITEMS: MediaFeatureItem[] = [
  {
    id: 'proven',
    icon: <Award01 />,
    title: 'Upgrade to our proven design',
    description:
      'We know exactly how to design sites that drive more bookings and orders for local businesses.',
  },
  {
    id: 'google',
    icon: <SearchLg />,
    title: 'Built so Google loves you',
    description: 'We build your site with world-class SEO that earns top rankings.',
  },
  {
    id: 'better',
    icon: <RefreshCcw05 />,
    title: 'A website that keeps getting better',
    description: 'When we learn something new about what converts, we add it to your site right away.',
  },
];

export function MediaFeatureListPanel() {
  return (
    <div>
      <PanelHeader title="Media + feature list" meta="spec 037 · MediaFeatureList" />
      <Group
        label="MediaFeatureList"
        note="A product visual in a soft tinted panel beside a vertical list of icon-badge + title + copy rows. Drop it inside a ContentSection for the centered heading. Which side the media sits on is a prop; stacks below 985px."
      >
        <PreviewFrame title="Media + feature list" surface="cream">
          <MediaFeatureList
            media={
              <div
                className="aspect-[4/3] w-full rounded-[var(--radius-component)]"
                style={{ background: 'var(--gradient-ink)' }}
                aria-hidden="true"
              />
            }
            panel="cream"
            mediaSide="start"
            features={FEATURE_ITEMS}
          />
        </PreviewFrame>
      </Group>
    </div>
  );
}

const TESTIMONIAL_CARDS: TestimonialCard[] = [
  {
    id: 'card-1',
    statement: 'Everything an independent business needs to win online, in one place.',
    image: PHOTO_PLACEHOLDER,
    alt: 'A local business owner',
    results: [
      { value: '+54%', label: 'Sales growth' },
      { value: '11,000', label: 'App installs' },
    ],
  },
  {
    id: 'card-2',
    statement: 'A platform owners recommend — and the results back it up.',
    image: PHOTO_PLACEHOLDER,
    alt: 'A local business owner behind the counter',
    results: [
      { value: '+$104,500', label: 'Online sales' },
      { value: '$31,000', label: 'Saved in fees' },
    ],
  },
];

export function TestimonialCarouselPanel() {
  return (
    <div>
        <PanelHeader title="Testimonial rail" meta="specs 037, 046 · TestimonialCarousel" />
      <Group
        label="TestimonialCarousel"
        note="A horizontally scrollable rail of proof cards — each pairs a declarative claim and a results / KPI row (no attribution) with a supporting photo filling one side — with a left title and previous / next buttons. Drag / swipe or use the buttons; reduced motion snaps without animation."
      >
        <PreviewFrame title="Testimonial rail" surface="cream" padded={false}>
          <TestimonialCarousel
            title="Trusted by owners"
            cards={TESTIMONIAL_CARDS}
            ariaLabel="What our clients say"
          />
        </PreviewFrame>
      </Group>
    </div>
  );
}

export function CtaBandPanel() {
  return (
    <div>
      <PanelHeader title="CTA band" meta="spec 037 · CtaBand tones" />
      <Group
        label="CtaBand — ink inset (default)"
        note="The closing call-to-action that ends most inner pages: a dark inset panel on the cream page."
      >
        <PreviewFrame title="Ink inset" surface="cream" padded={false}>
          <CtaBand
            eyebrow="Ready when you are"
            title="See what a full growth team could do"
            description="Tell us about your business and we'll show you exactly where Keystone fits."
            primary={{ label: 'Get in touch', href: '#' }}
          />
        </PreviewFrame>
      </Group>
      <Group
        label="CtaBand — full-bleed green"
        note="The service-page closing band (spec 037): a full-bleed deep-green band carrying a single white headline and a light action, flush above the footer."
      >
        <PreviewFrame title="Full-bleed green" surface="cream" padded={false}>
          <CtaBand
            tone="accent"
            fullBleed
            title="The easiest way to grow your business online"
            primary={{ label: 'Get a free demo', href: '#' }}
          />
        </PreviewFrame>
      </Group>
    </div>
  );
}

// ── Pricing (spec 039) ───────────────────────────────────────────────────────

/** Standalone QuantityStepper demo — the catalog owns the controlled state. */
function StepperDemo() {
  const [count, setCount] = useState(2);
  return <QuantityStepper label="Blog posts" value={count} onChange={setCount} />;
}

export function PricingPanel() {
  return (
    <div>
      <PanelHeader title="Pricing" meta="spec 039 · PriceSummary · PricingCalculator · QuantityStepper · FeatureGrid" />

      <Group
        label="QuantityStepper"
        note="A −/value/+ control. Controlled by the parent; the minus disables at the minimum, the plus at the maximum. Keyboard-operable with a visible focus state."
      >
        <PreviewFrame title="QuantityStepper" surface="cream">
          <StepperDemo />
        </PreviewFrame>
      </Group>

      <Group
        label="PriceSummary — light"
        note="The cream price card used on the /pricing page: tagline, two-tone price, sub-copy, and the everything-included chips. No credits paragraph or add-ons."
      >
        <PreviewFrame title="PriceSummary light" surface="cream">
          <PriceSummary
            tone="light"
            tagline={SHARED_PRICING_TAGLINE}
            priceAmount={SHARED_PRICING_PRICE_AMOUNT}
            pricePeriod={SHARED_PRICING_PRICE_PERIOD}
            subCopyLine1={SHARED_PRICING_SUBCOPY_LINE_1}
            subCopyLine2={SHARED_PRICING_SUBCOPY_LINE_2}
            featureChips={SHARED_PRICING_FEATURE_CHIPS}
          />
        </PreviewFrame>
      </Group>

      <Group
        label="PriceSummary — ink"
        note="The same content recolored for the dark homepage block. Renders as a layout passthrough, so it is shown here inside a pricing-surface column to mirror the homepage context."
      >
        <PreviewFrame title="PriceSummary ink" surface="ink" padded={false}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              background: 'var(--color-pricing-bg)',
              padding: '40px 24px',
            }}
          >
            <PriceSummary
              tone="ink"
              tagline={SHARED_PRICING_TAGLINE}
              priceAmount={SHARED_PRICING_PRICE_AMOUNT}
              pricePeriod={SHARED_PRICING_PRICE_PERIOD}
              subCopyLine1={SHARED_PRICING_SUBCOPY_LINE_1}
              subCopyLine2={SHARED_PRICING_SUBCOPY_LINE_2}
              featureChips={SHARED_PRICING_FEATURE_CHIPS}
            />
          </div>
        </PreviewFrame>
      </Group>

      <Group
        label="PricingCalculator"
        note="The 'only pay for what you use' estimator. The included plan is the floor; each row adds quantity × unit price to a live monthly total. Prices shown are authored placeholders."
      >
        <PreviewFrame title="PricingCalculator" surface="cream">
          <PricingCalculator
            planName={PRICING_PAGE.calculator.planName}
            planNote={PRICING_PAGE.calculator.planNote}
            basePrice={PRICING_PAGE.calculator.basePrice}
            period={PRICING_PAGE.calculator.period}
            items={PRICING_PAGE.calculator.items}
            note={PRICING_PAGE.calculator.note}
            actionLabel={PRICING_PAGE.calculator.actionLabel}
            actionHref="#"
          />
        </PreviewFrame>
      </Group>

      <Group
        label="FeatureGrid — icon + link"
        note="The shared FeatureGrid section gains an optional icon tile above the heading and an optional href. A card with an href becomes a link to the relevant service page with a ghost ArrowUpRight cue (top-right) that warms to brand on hover. Cards without an href (e.g. the report tile) simply omit the arrow."
      >
        <PreviewFrame title="FeatureGrid icon + link" surface="cream">
          <FeatureGrid items={PRICING_PAGE.included.items} />
        </PreviewFrame>
      </Group>
    </div>
  );
}

const PROCESS_MOCK_KINDS: ProcessMockKind[] = [
  'discover',
  'presence',
  'leads',
  'convert',
  'loyalty',
  'engine',
];

export function ProcessStepsPanel() {
  const steps = HOW_IT_WORKS_PAGE.steps.items.map((step) => ({
    id: step.id,
    number: step.number,
    eyebrow: step.eyebrow,
    title: step.title,
    description: step.description,
    services: step.services,
    media: <ProcessMock kind={step.mock} />,
  }));

  return (
    <div>
      <PanelHeader title="Process steps" meta="spec 040 · ProcessSteps · ProcessMock" />

      <Group
        label="ProcessSteps"
        note="The numbered how-it-works narrative: a connecting rail of big numbered nodes, copy with optional service-page chips (ghost ArrowUpRight), and a framed media panel that holds a tokenized step mock. Stacks below 985px."
      >
        <PreviewFrame title="ProcessSteps" surface="cream">
          <ProcessSteps steps={steps} ariaLabel="The Keystone growth journey" />
        </PreviewFrame>
      </Group>

      <Group
        label="ProcessMock"
        note="The six decorative, token-built step visuals framed inside each step. No real data or imagery; hidden from assistive tech."
      >
        <PreviewFrame title="Step mocks" surface="cream">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS_MOCK_KINDS.map((kind) => (
              <div key={kind} className="flex flex-col gap-3">
                <ProcessMock kind={kind} />
                <Text variant="caption" tone="tertiary" className="font-mono">
                  {kind}
                </Text>
              </div>
            ))}
          </div>
        </PreviewFrame>
      </Group>
    </div>
  );
}

// ── Careers (spec 041) ───────────────────────────────────────────────────────

const CAREERS_TS = '2026-06-01T00:00:00Z';

function makeSampleJob(
  id: number,
  title: string,
  location: string,
  employmentType: string,
  remoteOk: boolean,
): JobPosting {
  return {
    id,
    title,
    slug: `sample-role-${id}`,
    description_markdown: 'A short description of the role and what the person will own.',
    employment_type: employmentType,
    location,
    remote_ok: remoteOk,
    posted_at: CAREERS_TS,
    status: 'active',
    featured: false,
    created_at: CAREERS_TS,
    updated_at: CAREERS_TS,
  };
}

const CAREERS_SAMPLE_JOBS: JobPosting[] = [
  makeSampleJob(1, 'Senior Product Engineer', 'Remote — US / Canada', 'Full-time', true),
  makeSampleJob(2, 'Customer Success Manager', 'Remote — US', 'Full-time', true),
  makeSampleJob(3, 'Growth Marketer', 'New York, NY', 'Full-time', false),
];

export function CareersPanel() {
  return (
    <div>
      <PanelHeader title="Careers" meta="spec 041 · TeamCollage · QuoteWall · BackerGrid · JobList" />

      <Group
        label="TeamCollage"
        note="The decorative hero collage: a grid of soft gradient tiles, each a role label and a person glyph. Built from CardGrid + SpotlightCard; hidden from assistive tech. Sits in the hero's media side."
      >
        <PreviewFrame title="TeamCollage" surface="cream">
          <div className="mx-auto max-w-sm">
            <TeamCollage tiles={CAREERS_PAGE.collage} />
          </div>
        </PreviewFrame>
      </Group>

      <Group
        label="QuoteWall"
        note="A quote wall: a masonry of quote tiles (quote + attribution over a soft surface), a couple spanning wider for rhythm. Composed from CardGrid + SpotlightCard. Serves both careers culture quotes and leadership investor quotes. Sample content."
      >
        <PreviewFrame title="QuoteWall" surface="cream">
          <QuoteWall quotes={CAREERS_PAGE.stories.items} ariaLabel="What our team says" />
        </PreviewFrame>
      </Group>

      <Group
        label="BackerGrid"
        note="An 'in good company' proof block: a compact grid of monogram tiles (name + firm). Composed from CardGrid + SpotlightCard. Sample content."
      >
        <PreviewFrame title="BackerGrid" surface="cream">
          <BackerGrid backers={CAREERS_PAGE.backers.items} ariaLabel="Our backers" />
        </PreviewFrame>
      </Group>

      <Group
        label="JobList"
        note="The open-roles list: compact rows with the role title and a tag or two on the left, location and an 'Apply' cue on the right. Each row links to the role detail. Below 985px the meta wraps beneath the title."
      >
        <PreviewFrame title="JobList" surface="cream">
          <JobList jobs={CAREERS_SAMPLE_JOBS} />
        </PreviewFrame>
      </Group>
    </div>
  );
}

export function LeadershipPanel() {
  return (
    <div>
      <PanelHeader title="Leadership" meta="spec 042 · QuoteWall · BackerGrid" />

      <Group
        label="QuoteWall · investor quotes"
        note="The same QuoteWall on a dark band, with light tiles — the leadership page's investor quotes. Sample content."
      >
        <PreviewFrame title="QuoteWall (ink band)" surface="ink">
          <QuoteWall quotes={LEADERSHIP_PAGE.quotes.items} ariaLabel="What investors say" />
        </PreviewFrame>
      </Group>

      <Group
        label="BackerGrid · investor gallery"
        note="The shared investor gallery: a tight auto-fill grid of square portrait tiles, each captioned with the investor's name. Identical to the careers 'In good company' block — same component, same roster."
      >
        <PreviewFrame title="BackerGrid" surface="cream">
          <BackerGrid backers={LEADERSHIP_PAGE.backed.items} ariaLabel="Our investors" />
        </PreviewFrame>
      </Group>
    </div>
  );
}

export function OurStoryPanel() {
  return (
    <div>
      <PanelHeader title="Our story" meta="spec 043 · StoryHero · Timeline · Marquee" />

      <Group
        label="StoryHero"
        note="The narrative page opener: a large headline with a supporting lede beside it, over a single wide media card. Distinct from SplitHero (copy beside media) and CenteredHero (no media). Stacks below 985px."
      >
        <PreviewFrame title="StoryHero" surface="cream">
          <StoryHero
            eyebrow={OUR_STORY_PAGE.hero.eyebrow}
            title={OUR_STORY_PAGE.hero.title}
            lede={OUR_STORY_PAGE.hero.lede}
            media={
              <SpotlightCard
                background={{ kind: 'image', src: OUR_STORY_PAGE.hero.mediaImage }}
                aspect={16 / 9}
                title={OUR_STORY_PAGE.hero.mediaCaption}
                titleSize="sm"
              />
            }
          />
        </PreviewFrame>
      </Group>

      <Group
        label="Marquee"
        note="The shared seamless-scroll primitive: a clipped, edge-faded viewport whose track loops a duplicated set of caller-supplied items. Pauses on hover, stops under reduced motion. Powers LogoMarquee and the Our Story photo strip (placeholder tiles here)."
      >
        <PreviewFrame title="Marquee (photo strip)" surface="ink">
          <Marquee
            items={OUR_STORY_PAGE.mission.photos.map((tile) => (
              <div key={tile.id} className="ks-story-strip-tile">
                <SpotlightCard background={{ kind: 'image', src: tile.image }} aspect={4 / 5} />
              </div>
            ))}
          />
        </PreviewFrame>
      </Group>

      <Group
        label="Timeline"
        note="A forward-looking milestone narrative: a connecting rail of nodes, each a phase label, headline, copy, and optional footnote. The structural sibling of ProcessSteps; no media, no numbers."
      >
        <PreviewFrame title="Timeline" surface="cream">
          <Timeline milestones={OUR_STORY_PAGE.vision.milestones} ariaLabel="Our long-term vision" />
        </PreviewFrame>
      </Group>
    </div>
  );
}

// ── Blog (spec 038) ──────────────────────────────────────────────────────────

const BLOG_TS = '2026-06-01T00:00:00Z';

function makeBlogTag(
  id: number,
  slug: string,
  name: string,
  count: number,
  description?: string,
): TagWithCount {
  return { id, slug, name, description, count, created_at: BLOG_TS, updated_at: BLOG_TS };
}

const BLOG_TAGS: TagWithCount[] = [
  makeBlogTag(1, 'online-sales', 'Increase Online Sales', 12, 'Grow your online sales with these ideas.'),
  makeBlogTag(2, 'software', 'Restaurant Software', 9, 'Tech that upgrades your operations.'),
  makeBlogTag(3, 'strategy', 'Marketing Strategy', 7, 'Proven plays to grow your business.'),
  makeBlogTag(4, 'websites', 'Websites', 5, 'Build a site that drives direct orders.'),
  makeBlogTag(5, 'trends', 'Industry Trends & Data', 4, "What's happening in your industry."),
  makeBlogTag(6, 'reviews', 'Reviews', 3),
  makeBlogTag(7, 'loyalty', 'Loyalty & Rewards', 2),
];

const BLOG_AUTHOR = {
  id: 1,
  name: 'Jordan Avery',
  slug: 'jordan-avery',
  active: true,
  bio_markdown:
    'Jordan leads content at Keystone, writing about how local businesses win more customers online.',
  created_at: BLOG_TS,
  updated_at: BLOG_TS,
  photo_attachments: [{ id: 90, photo: { thumbnail_url: PHOTO_PLACEHOLDER } }],
};

function makeBlogPost(id: number, title: string, tags: TagWithCount[]): BlogPost {
  return {
    id,
    title,
    slug: `sample-post-${id}`,
    status: 'published',
    published_at: BLOG_TS,
    excerpt_markdown:
      'A short standfirst that previews the article and gives the reader a reason to click through.',
    content_markdown: '## First\nBody.\n## Second\nBody.\n## Third\nBody.',
    featured: false,
    created_at: BLOG_TS,
    updated_at: BLOG_TS,
    photo_attachments: [
      { id, featured: true, photo: { large_url: PHOTO_PLACEHOLDER, medium_url: PHOTO_PLACEHOLDER, thumbnail_url: PHOTO_PLACEHOLDER, alt_text: '' } },
    ],
    blog_post_authors: [BLOG_AUTHOR],
    blog_post_tags: tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      description: tag.description,
      created_at: tag.created_at,
      updated_at: tag.updated_at,
    })),
  };
}

const BLOG_POSTS: BlogPost[] = [
  makeBlogPost(1, '7 local SEO tips to effectively grow your business exposure', [BLOG_TAGS[0]]),
  makeBlogPost(2, 'Best website builders to drive sales in 2026', [BLOG_TAGS[3]]),
  makeBlogPost(3, '93% of guests will download your mobile app — if it has these benefits', [BLOG_TAGS[4]]),
  makeBlogPost(4, 'How to create a site that grows your online orders', [BLOG_TAGS[3]]),
  makeBlogPost(5, 'The ultimate guide to social media strategy', [BLOG_TAGS[2]]),
  makeBlogPost(6, 'How to calculate average cost percentage + tips to increase profit', [BLOG_TAGS[4]]),
];

const BLOG_TOC: TocHeading[] = [
  { level: 2, id: 'first', text: 'Why direct ordering matters' },
  { level: 2, id: 'second', text: 'The data behind guest behavior' },
  { level: 2, id: 'third', text: 'How to win guests back' },
];

export function BlogPatternsPanel() {
  return (
    <div>
      <PanelHeader title="Blog" meta="spec 038 · gallery + post detail" />

      <Group
        label="BlogFeatureHero"
        note="The lead story at the top of the gallery — the post image beside a brand-gradient panel with the topic, title, excerpt, and meta. The whole card links to the post; stacks below 985px."
      >
        <PreviewFrame title="Featured hero" surface="cream">
          <BlogFeatureHero post={BLOG_POSTS[0]} />
        </PreviewFrame>
      </Group>

      <Group
        label="BlogHighlightCard / BlogRecentList"
        note="Compact side-thumbnail cards (the highlight row under the hero) and the wide 'Most Recent' rows. Each is a single link."
      >
        <PreviewFrame title="Highlight + recent" surface="cream">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <BlogHighlightCard key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-8">
            <BlogRecentList posts={BLOG_POSTS.slice(3, 6)} />
          </div>
        </PreviewFrame>
      </Group>

      <Group
        label="BlogTopicBand"
        note="Full-bleed green band with pills for the top topics (by article count). Pills jump to each topic's section below."
      >
        <PreviewFrame title="Explore topics" surface="cream" padded={false}>
          <BlogTopicBand tags={BLOG_TAGS.slice(0, 5)} />
        </PreviewFrame>
      </Group>

      <Group
        label="BlogCategorySection"
        note="One rich topic block: a left rail (name, the tag's description, 'View all') beside a feature post and up to two smaller posts. Three columns at ≥985px, stacked below."
      >
        <PreviewFrame title="Topic section" surface="cream">
          <BlogCategorySection tag={BLOG_TAGS[0]} posts={BLOG_POSTS} />
        </PreviewFrame>
      </Group>

      <Group
        label="BlogAllTopics"
        note="The full flat tag list as chips with article counts, each linking to its filtered gallery — so every topic is reachable, not just the top few."
      >
        <PreviewFrame title="All topics" surface="cream">
          <BlogAllTopics tags={BLOG_TAGS} />
        </PreviewFrame>
      </Group>

      <Group
        label="Post detail — breadcrumb, TOC, author bio, sidebar"
        note="The post-detail pieces: the breadcrumb trail, the 'In this article' table of contents (derived from the post markdown), the author bio card, and the sticky sidebar (byline + TOC + universal promo card)."
      >
        <PreviewFrame title="Post pieces" surface="cream">
          <BlogBreadcrumb
            items={[
              { label: 'Blog', href: '#' },
              { label: 'Industry Trends & Data', href: '#' },
            ]}
          />
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[1fr_300px]">
            <BlogArticleToc headings={BLOG_TOC} />
            <BlogPostSidebar author={BLOG_AUTHOR} headings={BLOG_TOC} />
          </div>
          <div className="mt-8">
            <BlogAuthorBio author={BLOG_AUTHOR} social={{ linkedinUrl: '#', instagramUrl: '#' }} />
          </div>
        </PreviewFrame>
      </Group>
    </div>
  );
}

// ── Legal (spec 044) ─────────────────────────────────────────────────────────

const LEGAL_SAMPLE_MARKDOWN = `## Information We Collect

We collect only the personal data necessary to provide our services. This
includes information you give us directly and information collected
automatically as you use the site.

**Information you provide.** When you contact us or request a demo, we collect
your name, email address, and phone number.

**Information collected automatically.** We collect usage data such as the
pages you visit and the device and browser you use.

## How We Use Your Information

We use the data we collect to operate, maintain, and improve our services, to
respond to your requests, and to communicate with you about updates.

## Contact Us

If you have questions about this policy, contact us through the form on this
website.`;

export function LegalPanel() {
  return (
    <div>
      <PanelHeader title="Legal" meta="spec 044 · privacy + terms" />

      <Group
        label="LegalDocumentPage"
        note="The shared layout for /privacy and /terms: a sticky left sidebar listing every legal document (the current one marked with a brand dot) beside a single long-form column that renders the document markdown via the shared blog prose. Stacks below 768px."
      >
        <PreviewFrame title="Legal document" surface="cream" padded={false}>
          <LegalDocumentPage
            title="Privacy Policy"
            updated="2026"
            contentMarkdown={LEGAL_SAMPLE_MARKDOWN}
            docs={LEGAL_DOCS}
            activeHref="/privacy"
          />
        </PreviewFrame>
      </Group>
    </div>
  );
}
