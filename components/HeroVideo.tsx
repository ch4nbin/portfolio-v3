"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

type HeroVideoProps = {
  src: string;
};

/**
 * Background hero video with scale/framing tweaks on a wrapper layer.
 * Keeps programmatic play + muted/playsinline attributes for mobile.
 */
export function HeroVideo({ src }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  const tryPlay = useCallback(() => {
    const v = ref.current;
    if (!v) return;

    v.defaultMuted = true;
    v.muted = true;
    v.volume = 0;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    const p = v.play();
    if (p !== undefined) void p.catch(() => {});
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
    ] as const;
    events.forEach((e) => v.addEventListener(e, tryPlay, { passive: true }));

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let n = 0;
    const interval = window.setInterval(() => {
      tryPlay();
      if (++n >= 48) window.clearInterval(interval);
    }, 200);

    const onGesture = () => tryPlay();
    window.addEventListener("touchstart", onGesture, { passive: true, capture: true });
    window.addEventListener("touchend", onGesture, { passive: true, capture: true });

    return () => {
      events.forEach((e) => v.removeEventListener(e, tryPlay));
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("touchstart", onGesture, { capture: true });
      window.removeEventListener("touchend", onGesture, { capture: true });
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
          aria-hidden
        />
      </div>
    </div>
  );
}
