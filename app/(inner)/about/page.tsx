import type { Metadata } from 'next';
import {
  StoryHero,
  ContentSection,
  StatStrip,
  Timeline,
  CardGrid,
  CardGridItem,
  SpotlightCard,
  Marquee,
  CtaBand,
  Heading,
  Text,
  Button,
} from '@/design-system';
import type { StoryPhotoTile } from '@/data';
import { OUR_STORY_PAGE } from '@/data';

export const metadata: Metadata = {
  title: OUR_STORY_PAGE.meta.title,
  description: OUR_STORY_PAGE.meta.description,
};

/** A decorative photo tile carrying a registry image. */
function PhotoTile({ tile, aspect }: { tile: StoryPhotoTile; aspect?: number }) {
  return <SpotlightCard background={{ kind: 'image', src: tile.image }} aspect={aspect} />;
}

export default function OurStoryPage() {
  const content = OUR_STORY_PAGE;
  const { hero, mission, stats, origin, vision, careers, closing } = content;

  return (
    <div className="inner-page" data-theme="custom">
      <StoryHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lede={hero.lede}
        media={
          <SpotlightCard
            background={{ kind: 'image', src: hero.mediaImage }}
            aspect={16 / 9}
            title={hero.mediaCaption}
            titleSize="sm"
          />
        }
      />

      <main>
        {/* Mission band — two-column copy + scrolling photo strip. */}
        <ContentSection tone="ink" ariaLabel="Our mission">
          <div className="ks-story-mission-block">
            <div className="ks-story-mission">
              <Heading level={2} size="lg" tone="inverse" className="ks-story-mission__heading">
                {mission.heading}
              </Heading>
              <div className="ks-story-mission__copy">
                {mission.paragraphs.map((paragraph, i) => (
                  <Text key={i} variant="lead" tone="inverse-muted">
                    {paragraph}
                  </Text>
                ))}
              </div>
            </div>
            <div aria-hidden="true">
              <Marquee
                items={mission.photos.map((tile) => (
                  <div key={tile.id} className="ks-story-strip-tile">
                    <PhotoTile tile={tile} aspect={4 / 5} />
                  </div>
                ))}
              />
            </div>
          </div>
        </ContentSection>

        {/* Stats band. */}
        <ContentSection eyebrow={stats.eyebrow} title={stats.title} ariaLabel="By the numbers">
          <StatStrip tone="cream" stats={stats.items} />
        </ContentSection>

        {/* Origin split — copy + placeholder collage. */}
        <ContentSection ariaLabel="How it started">
          <div className="ks-story-split">
            <div className="ks-story-split__copy">
              <Heading level={2} size="lg">
                {origin.title}
              </Heading>
              {origin.paragraphs.map((paragraph, i) => (
                <Text key={i} variant="body" tone="secondary">
                  {paragraph}
                </Text>
              ))}
            </div>
            <div className="ks-story-split__media" aria-hidden="true">
              <CardGrid columns={2}>
                <CardGridItem colSpan={2}>
                  <PhotoTile tile={origin.photos[0]} aspect={16 / 9} />
                </CardGridItem>
                {origin.photos.slice(1).map((tile) => (
                  <PhotoTile key={tile.id} tile={tile} aspect={1} />
                ))}
              </CardGrid>
            </div>
          </div>
        </ContentSection>

        {/* Vision timeline. */}
        <ContentSection
          eyebrow={vision.eyebrow}
          title={vision.title}
          description={vision.description}
          ariaLabel="Our long-term vision"
        >
          <Timeline milestones={vision.milestones} ariaLabel="Our long-term vision" />
        </ContentSection>

        {/* Careers split — copy + actions + placeholder collage. */}
        <ContentSection ariaLabel="Build with us">
          <div className="ks-story-split ks-story-split--media-start">
            <div className="ks-story-split__media" aria-hidden="true">
              <CardGrid columns={2}>
                {careers.photos.map((tile) => (
                  <PhotoTile key={tile.id} tile={tile} aspect={1} />
                ))}
              </CardGrid>
            </div>
            <div className="ks-story-split__copy">
              <Heading level={2} size="lg">
                {careers.title}
              </Heading>
              <Text variant="lead" tone="secondary">
                {careers.description}
              </Text>
              <div className="ks-story-split__actions">
                <Button variant="primary" size="lg" href={careers.primary.href}>
                  {careers.primary.label}
                </Button>
                <Button variant="secondary" size="lg" href={careers.secondary.href}>
                  {careers.secondary.label}
                </Button>
              </div>
            </div>
          </div>
        </ContentSection>
      </main>

      <CtaBand
        tone="accent"
        fullBleed
        title={closing.title}
        primary={{ label: closing.actionLabel, href: closing.actionHref }}
      />
    </div>
  );
}
