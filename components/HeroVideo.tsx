"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

type HeroVideoProps = {
  src: string;
};

/**
 * Background hero video — mobile Safari is strict about muted + playsinline
 * and often needs play() again after load / visibility / first interaction.
 */
export function HeroVideo({ src }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  const tryPlay = useCallback(() => {
    const v = ref.current;
    if (!v) return;

    v.defaultMuted = true;
    v.muted = true;
    v.volume = 0;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    const run = () => {
      const p = v.play();
      if (p !== undefined) {
        void p.catch(() => {
          requestAnimationFrame(() => {
            void v.play().catch(() => {});
          });
        });
      }
    };
    run();
  }, []);

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

    const onInteract = () => tryPlay();

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
      window.clearInterval(interval);
    };
  }, [src, tryPlay]);

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
