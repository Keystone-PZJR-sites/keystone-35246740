"use client";

import { useEffect, useRef } from "react";

const PLAY_RETRIES = 3;
const PLAY_RETRY_MS = 250;
const VISIBILITY_THRESHOLD = 0.1;

interface UseVideoCarouselResult {
  rootRef: React.RefObject<HTMLDivElement | null>;
  videoRefs: React.MutableRefObject<(HTMLVideoElement | null)[]>;
}

export function useVideoCarousel(videoCount: number): UseVideoCarouselResult {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const videos = videoRefs.current.slice(0, videoCount);
    if (!root || videos.length !== videoCount || videos.some((video) => video === null)) return;

    const media = videos as HTMLVideoElement[];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const retryWaiters = new Map<number, () => void>();
    const failed = new Set<number>();
    const unlocked = new Set<number>();

    let activeIndex = 0;
    let operation = 0;
    let starting = false;
    let transitioning = false;
    let pendingAdvance = false;
    let visible = false;
    let hovered = false;
    let focused = false;
    let cancelled = false;
    let settleCrossfade: (() => void) | null = null;
    let sourceTier = getComputedStyle(root).getPropertyValue("--coh-video-tier").trim();

    const canRun = () =>
      !cancelled &&
      visible &&
      !hovered &&
      !focused &&
      !document.hidden &&
      !reducedMotion.matches;

    const waitToRetry = () =>
      new Promise<void>((resolve) => {
        const timer = window.setTimeout(() => {
          retryWaiters.delete(timer);
          resolve();
        }, PLAY_RETRY_MS);
        retryWaiters.set(timer, () => {
          window.clearTimeout(timer);
          resolve();
        });
      });

    const playWithRetry = async (video: HTMLVideoElement) => {
      for (let attempt = 0; attempt <= PLAY_RETRIES; attempt += 1) {
        if (!canRun()) return false;
        try {
          await video.play();
          return true;
        } catch {
          if (attempt === PLAY_RETRIES || video.error) return false;
          await waitToRetry();
        }
      }
      return false;
    };

    const unlock = (index: number) => {
      if (unlocked.has(index)) return;
      unlocked.add(index);
      media[index].load();
      media[index].preload = "auto";
    };

    const nextUsableIndex = (from: number) => {
      for (let offset = 1; offset <= videoCount; offset += 1) {
        const index = (from + offset) % videoCount;
        if (!failed.has(index)) return index;
      }
      return null;
    };

    const unlockNext = () => {
      const next = nextUsableIndex(activeIndex);
      if (next !== null && next !== activeIndex) unlock(next);
    };

    const showPoster = () => {
      media.forEach((video) => {
        delete video.dataset.visible;
      });
    };

    const resetVideo = (video: HTMLVideoElement) => {
      video.pause();
      if (video.readyState > HTMLMediaElement.HAVE_NOTHING) video.currentTime = 0;
    };

    const pauseAll = () => {
      operation += 1;
      starting = false;
      if (settleCrossfade) settleCrossfade();
      else transitioning = false;
      media.forEach((video) => video.pause());
    };

    const crossfade = (outgoing: HTMLVideoElement, incoming: HTMLVideoElement) => {
      transitioning = true;
      root.dataset.crossfading = "";

      const settle = () => {
        if (settleCrossfade !== settle) return;
        outgoing.removeEventListener("transitionend", onTransitionEnd);
        delete root.dataset.crossfading;
        settleCrossfade = null;
        transitioning = false;
        resetVideo(outgoing);
      };
      const onTransitionEnd = (event: TransitionEvent) => {
        if (event.propertyName === "opacity") settle();
      };

      settleCrossfade = settle;
      outgoing.addEventListener("transitionend", onTransitionEnd);
      void outgoing.offsetWidth;
      incoming.dataset.visible = "";
      delete outgoing.dataset.visible;
    };

    const startActive = async () => {
      if (!canRun() || starting || transitioning) return;
      if (pendingAdvance) {
        void advance();
        return;
      }

      starting = true;
      const run = ++operation;
      const active = media[activeIndex];
      unlock(activeIndex);
      const didPlay = await playWithRetry(active);

      if (cancelled || run !== operation) {
        active.pause();
        return;
      }
      starting = false;

      if (!didPlay) {
        failed.add(activeIndex);
        pendingAdvance = true;
        void advance();
        return;
      }

      active.dataset.visible = "";
      unlockNext();
    };

    async function advance() {
      if (!canRun() || transitioning) return;

      pendingAdvance = false;
      transitioning = true;
      const run = ++operation;
      const outgoingIndex = activeIndex;
      const outgoing = media[outgoingIndex];
      let incomingIndex = nextUsableIndex(outgoingIndex);

      while (incomingIndex !== null && incomingIndex !== outgoingIndex) {
        const incoming = media[incomingIndex];
        unlock(incomingIndex);
        const didPlay = await playWithRetry(incoming);

        if (cancelled || run !== operation) {
          incoming.pause();
          if (!cancelled) transitioning = false;
          return;
        }
        if (didPlay) {
          activeIndex = incomingIndex;
          unlockNext();
          crossfade(outgoing, incoming);
          return;
        }

        failed.add(incomingIndex);
        incomingIndex = nextUsableIndex(incomingIndex);
      }

      transitioning = false;
      showPoster();
      resetVideo(outgoing);
    }

    const resume = () => {
      if (canRun()) void startActive();
    };
    const onVisibilityChange = () => {
      if (document.hidden) pauseAll();
      else resume();
    };
    const onPointerEnter = () => {
      hovered = true;
      pauseAll();
    };
    const onPointerLeave = () => {
      hovered = false;
      resume();
    };
    const onFocusIn = () => {
      focused = true;
      pauseAll();
    };
    const onFocusOut = (event: FocusEvent) => {
      focused = event.relatedTarget instanceof Node && root.contains(event.relatedTarget);
      if (!focused) resume();
    };
    const onMotionChange = () => {
      pauseAll();
      activeIndex = 0;
      pendingAdvance = false;
      media.forEach(resetVideo);
      showPoster();
      if (!reducedMotion.matches) resume();
    };
    const onTierChange = () => {
      const nextTier = getComputedStyle(root).getPropertyValue("--coh-video-tier").trim();
      if (nextTier === sourceTier) return;

      sourceTier = nextTier;
      pauseAll();
      activeIndex = 0;
      pendingAdvance = false;
      failed.clear();
      unlocked.clear();
      showPoster();
      media.forEach((video) => {
        video.preload = "none";
      });
      resume();
    };

    const endedHandlers = media.map((_, index) => {
      const handler = () => {
        if (index !== activeIndex) return;
        pendingAdvance = true;
        if (canRun()) void advance();
      };
      media[index].addEventListener("ended", handler);
      return handler;
    });
    const errorHandlers = media.map((_, index) => {
      const handler = () => {
        failed.add(index);
        if (index === activeIndex && !starting && !transitioning) {
          pendingAdvance = true;
          if (canRun()) void advance();
        }
      };
      media[index].addEventListener("error", handler);
      return handler;
    });

    media.forEach((video) => {
      video.preload = "none";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) resume();
        else pauseAll();
      },
      { threshold: VISIBILITY_THRESHOLD },
    );
    const resizeObserver = new ResizeObserver(onTierChange);

    observer.observe(root);
    resizeObserver.observe(root);
    document.addEventListener("visibilitychange", onVisibilityChange);
    root.addEventListener("pointerenter", onPointerEnter);
    root.addEventListener("pointerleave", onPointerLeave);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      cancelled = true;
      operation += 1;
      settleCrossfade?.();
      observer.disconnect();
      resizeObserver.disconnect();
      retryWaiters.forEach((cancelWait) => cancelWait());
      retryWaiters.clear();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      root.removeEventListener("pointerenter", onPointerEnter);
      root.removeEventListener("pointerleave", onPointerLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      reducedMotion.removeEventListener("change", onMotionChange);
      media.forEach((video, index) => {
        video.removeEventListener("ended", endedHandlers[index]);
        video.removeEventListener("error", errorHandlers[index]);
        video.pause();
      });
    };
  }, [videoCount]);

  return { rootRef, videoRefs };
}
