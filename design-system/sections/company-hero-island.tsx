"use client";

import { useVideoCarousel } from "../lib/use-video-carousel";
import type { CompanyHeroPosterTier } from "../media";
import type { CompanyHeroVideoClip } from "./company-hero-data";

export interface CompanyHeroVideoProps {
  clips: CompanyHeroVideoClip[];
  posters: CompanyHeroPosterTier[];
}

export function CompanyHeroVideo({ clips, posters }: CompanyHeroVideoProps) {
  const { rootRef, videoRefs } = useVideoCarousel(clips.length);
  const fallback = posters.find((poster) => poster.media === null);

  if (!fallback) return null;

  return (
    <div ref={rootRef} className="coh-video-stack" aria-hidden="true">
      <picture className="coh-video-poster">
        {posters
          .filter((poster) => poster.media !== null)
          .map((poster) => (
            <source
              key={poster.src}
              srcSet={poster.src}
              media={poster.media ?? undefined}
              type="image/webp"
              width={poster.width}
              height={poster.height}
            />
          ))}
        <img
          src={fallback.src}
          width={fallback.width}
          height={fallback.height}
          alt={fallback.alt}
          decoding="async"
          fetchPriority="high"
        />
      </picture>

      {clips.map((clip, clipIndex) => (
        <video
          key={clip.id}
          ref={(element) => {
            videoRefs.current[clipIndex] = element;
          }}
          className="coh-video"
          muted
          playsInline
          preload="none"
          data-clip={clipIndex + 1}
        >
          {clip.sources.flatMap((source) => [
            <source
              key={`${source.tier}-webm`}
              src={source.webm.src}
              type={source.webm.type}
              media={source.media ?? undefined}
            />,
            <source
              key={`${source.tier}-mp4`}
              src={source.mp4.src}
              type={source.mp4.type}
              media={source.media ?? undefined}
            />,
          ])}
        </video>
      ))}
    </div>
  );
}
