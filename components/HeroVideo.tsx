"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

type HeroVideoProps = {
  src: string;
};

/**
 * Background hero video — mobile Safari is strict about muted + playsinline.
 * iOS only treats `play()` as allowed if it runs in the same turn as a user
 * gesture; a retry inside `requestAnimationFrame` loses that token, so
 * gesture-driven retries must stay synchronous (unlike load/visibility retries).
 */
export function HeroVideo({ src }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  const applyPlaybackAttrs = useCallback((v: HTMLVideoElement) => {
    v.defaultMuted = true;
    v.muted = true;
    v.volume = 0;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
  }, []);

  const kickPlay = useCallback((v: HTMLVideoElement, gestureSafeRetry: boolean) => {
    const p = v.play();
    if (p === undefined) return;
    void p.catch(() => {
      if (gestureSafeRetry) {
        void v.play().catch(() => {});
      } else {
        requestAnimationFrame(() => {
          void v.play().catch(() => {});
        });
      }
    });
  }, []);

  const tryPlay = useCallback(() => {
    const v = ref.current;
    if (!v) return;
    applyPlaybackAttrs(v);
    kickPlay(v, false);
  }, [applyPlaybackAttrs, kickPlay]);

  /** Same as tryPlay but retry stays sync — must run directly from touch/pointer. */
  const tryPlayFromUserGesture = useCallback(() => {
    const v = ref.current;
    if (!v) return;
    applyPlaybackAttrs(v);
    kickPlay(v, true);
  }, [applyPlaybackAttrs, kickPlay]);

  useLayoutEffect(() => {
    tryPlay();
  }, [src, tryPlay]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const events = [
      "loadedmetadata",
      "loadeddata",
      "canplay",
      "canplaythrough",
      "stalled",
      "suspend",
      "waiting",
    ] as const;

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) tryPlay();
    };

    const onInteract = () => tryPlayFromUserGesture();

    /** iOS can pause inline video when returning from background — nudge play. */
    const onPause = () => {
      if (document.visibilityState === "visible" && !v.ended) {
        queueMicrotask(tryPlay);
      }
    };

    events.forEach((e) => v.addEventListener(e, tryPlay, { passive: true }));
    v.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("touchstart", onInteract, { passive: true, capture: true });
    window.addEventListener("touchend", onInteract, { passive: true, capture: true });
    window.addEventListener("pointerdown", onInteract, { passive: true, capture: true });
    window.addEventListener("click", onInteract, { passive: true, capture: true });

    let n = 0;
    const interval = window.setInterval(() => {
      tryPlay();
      if (++n >= 60) window.clearInterval(interval);
    }, 200);

    return () => {
      events.forEach((e) => v.removeEventListener(e, tryPlay));
      v.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("touchstart", onInteract, { capture: true });
      window.removeEventListener("touchend", onInteract, { capture: true });
      window.removeEventListener("pointerdown", onInteract, { capture: true });
      window.removeEventListener("click", onInteract, { capture: true });
      window.clearInterval(interval);
    };
  }, [src, tryPlay, tryPlayFromUserGesture]);

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="h-full w-full origin-center scale-[1.115] blur-[1px] -translate-y-[0.85%] translate-x-[2.75%] will-change-transform">
        <video
          ref={ref}
          src={src}
          className="h-full w-full object-cover"
          style={{ objectPosition: "58% 52%" }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
        />
      </div>
    </div>
  );
}
