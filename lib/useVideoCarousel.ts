'use client';

import { useEffect, useRef } from 'react';

/** Duration of the opacity crossfade between clips, in milliseconds. */
const FADE_MS = 400;

/**
 * N-video carousel for autolooping background clips.
 *
 * All clips are rendered simultaneously as individual <video> elements with
 * `preload="auto"`, so every clip is buffered before it is needed — eliminating
 * the first-frame blank that plagued the two-video source-swap approach.
 *
 * Usage in JSX:
 *   const videoRefs = useVideoCarousel(videoSrcs);
 *   {videoSrcs.map((clip, i) => (
 *     <video key={i} ref={el => { videoRefs.current[i] = el; }} muted playsInline preload="auto">
 *       <source src={clip.webm} type="video/webm" />
 *       <source src={clip.mp4} type="video/mp4" />
 *     </video>
 *   ))}
 *
 * Requirements:
 *   - NO autoPlay, NO loop on the <video> elements — the hook owns all playback.
 *   - All <video> elements must be position:absolute inside a position:relative container.
 */
export function useVideoCarousel(videoSrcs: { webm: string; mp4: string }[]) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const count = videoSrcs.length;
    const videos = Array.from({ length: count }, (_, i) => videoRefs.current[i])
      .filter((v): v is HTMLVideoElement => v !== null);

    if (videos.length === 0) return;

    let activeIndex = 0;

    // Initial visual state: first clip visible and playing, rest hidden.
    videos.forEach((v, i) => {
      v.style.transition = '';
      v.style.opacity = i === 0 ? '1' : '0';
    });
    videos[0].play().catch(() => {});

    function advance() {
      const outgoing = videos[activeIndex];
      activeIndex = (activeIndex + 1) % videos.length;
      const incoming = videos[activeIndex];

      // Incoming is already buffered via preload="auto" — starts immediately.
      incoming.play().catch(() => {});

      // Simultaneous crossfade: outgoing fades out while incoming fades in.
      outgoing.style.transition = `opacity ${FADE_MS}ms ease-in-out`;
      outgoing.style.opacity = '0';
      incoming.style.transition = `opacity ${FADE_MS}ms ease-in-out`;
      incoming.style.opacity = '1';

      setTimeout(() => {
        outgoing.style.transition = '';
        incoming.style.transition = '';
        // Park outgoing at frame 0 — stays buffered and ready for its next rotation.
        outgoing.pause();
        outgoing.currentTime = 0;
      }, FADE_MS);
    }

    const handlers = videos.map((_, i) => {
      const handler = () => {
        if (i === activeIndex) advance();
      };
      videos[i].addEventListener('ended', handler);
      return handler;
    });

    return () => {
      videos.forEach((v, i) => {
        v.removeEventListener('ended', handlers[i]);
        v.pause();
      });
    };
  }, [videoSrcs]);

  return videoRefs;
}
