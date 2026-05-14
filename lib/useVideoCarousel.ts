'use client';

import { useEffect, useRef } from 'react';

/** Duration of the opacity crossfade between clips, in milliseconds. */
const FADE_MS = 400;

export interface UseVideoCarouselOptions {
  /**
   * When false, playback is deferred until the value flips to true.
   * Defaults to true. Pass `isNear` from `useNearViewport` for below-the-fold
   * carousels so they don't compete with hero bandwidth on page load.
   */
  enabled?: boolean;
}

/**
 * N-video carousel for autolooping background clips.
 *
 * ## Preload strategy (N+1)
 * The hook owns all preload scheduling — render every <video> with
 * `preload="none"` and let the hook unlock them in order:
 *
 *   • Clip 0 is unlocked immediately (preload="auto") and starts playing.
 *   • Clip 1 is unlocked right after clip 0 starts — it buffers during
 *     the entire duration of clip 0.
 *   • Each subsequent clip is unlocked the moment the clip before it begins
 *     playing, so exactly one clip is always buffering ahead of playback.
 *
 * At any point only two clips are downloading simultaneously (active + next),
 * versus the previous approach of buffering all clips at once.
 *
 * ## Usage in JSX
 *   const videoRefs = useVideoCarousel(videoSrcs);
 *   {videoSrcs.map((clip, i) => (
 *     <video key={i} ref={el => { videoRefs.current[i] = el; }} muted playsInline preload="none">
 *       <source src={clip.webm} type="video/webm" />
 *       <source src={clip.mp4} type="video/mp4" />
 *     </video>
 *   ))}
 *
 * Requirements:
 *   - NO autoPlay, NO loop, NO preload="auto" on the <video> elements.
 *   - All <video> elements must be position:absolute inside a position:relative container.
 */
export function useVideoCarousel(
  videoSrcs: { webm: string; mp4: string }[],
  options: UseVideoCarouselOptions = {},
) {
  const { enabled = true } = options;
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const count = videoSrcs.length;
    const videos = Array.from({ length: count }, (_, i) => videoRefs.current[i])
      .filter((v): v is HTMLVideoElement => v !== null);

    if (videos.length === 0) return;

    let activeIndex = 0;

    // Ensure all clips are deferred — the hook owns preload scheduling
    // regardless of what the HTML attribute says.
    videos.forEach(v => { v.preload = 'none'; });

    // Initial visual state: first clip visible, rest hidden.
    videos.forEach((v, i) => {
      v.style.transition = '';
      v.style.opacity = i === 0 ? '1' : '0';
    });

    const unlockNextClip = () => {
      if (count > 1) videos[(activeIndex + 1) % count].preload = 'auto';
    };

    const unlockNextOnPlaying = (video: HTMLVideoElement) => {
      if (count <= 1) return;
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        unlockNextClip();
        return;
      }
      const onPlaying = () => {
        unlockNextClip();
      };
      video.addEventListener('playing', onPlaying, { once: true });
    };

    // Unlock and play clip 0. Queue clip 1 only after clip 0 has
    // started playing so the initial wave is clip 0 only.
    videos[0].preload = 'auto';
    videos[0].play().catch(() => {});
    unlockNextOnPlaying(videos[0]);

    function advance() {
      const outgoing = videos[activeIndex];
      activeIndex = (activeIndex + 1) % count;
      const incoming = videos[activeIndex];

      incoming.play().catch(() => {});
      unlockNextOnPlaying(incoming);

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
  }, [videoSrcs, enabled]);

  return videoRefs;
}
