"use client";

import { useEffect, useRef } from "react";

type HeroVideoProps = {
  src: string;
};

/**
 * Background hero video tuned for mobile Safari / Chrome autoplay policies.
 * Blur/transform live on a wrapper — iOS often fails when filters sit on `<video>` directly.
 */
export function HeroVideo({ src }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const tryPlay = () => {
      v.muted = true;
      v.defaultMuted = true;
      void v.play().catch(() => {});
    };

    tryPlay();

    const onLoaded = () => tryPlay();

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    v.addEventListener("loadeddata", onLoaded);

    document.addEventListener("visibilitychange", onVisibility);

    const bump = () => tryPlay();
    window.addEventListener("touchstart", bump, { passive: true, once: true });

    return () => {
      v.removeEventListener("loadeddata", onLoaded);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [src]);

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="h-full w-full origin-center scale-[1.115] blur-[3px] -translate-y-[0.85%] translate-x-[2.75%] will-change-transform">
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
