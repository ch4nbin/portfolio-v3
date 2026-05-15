"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type HeroVideoProps = {
  src: string;
};

/**
 * Background hero video — mobile Safari is strict about muted + playsinline.
 * iOS only treats `play()` as allowed if it runs in the same turn as a user
 * gesture; a retry inside `requestAnimationFrame` loses that token, so
 * gesture-driven retries must stay synchronous (unlike load/visibility retries).
 *
 * Low Power Mode often blocks autoplay until a gesture — we surface a small
 * control (portaled above page chrome) when the clip stays paused after load.
 */
export function HeroVideo({ src }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [showLowPowerHint, setShowLowPowerHint] = useState(false);

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

  /** Stable effect deps across Fast Refresh — callbacks read from refs. */
  const tryPlayRef = useRef(tryPlay);
  const tryPlayFromUserGestureRef = useRef(tryPlayFromUserGesture);
  tryPlayRef.current = tryPlay;
  tryPlayFromUserGestureRef.current = tryPlayFromUserGesture;

  useLayoutEffect(() => {
    tryPlayRef.current();
  }, [src]);

  /** iOS Low Power Mode: autoplay can fail even when muted — offer an explicit gesture. */
  useEffect(() => {
    setShowLowPowerHint(false);
  }, [src]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const hideHint = () => setShowLowPowerHint(false);

    const maybeOfferGestureHint = () => {
      if (!v.paused || v.ended) {
        setShowLowPowerHint(false);
        return;
      }
      if (v.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
      setShowLowPowerHint(true);
    };

    v.addEventListener("playing", hideHint);

    const t1 = window.setTimeout(maybeOfferGestureHint, 2200);
    const t2 = window.setTimeout(maybeOfferGestureHint, 4500);
    v.addEventListener("canplaythrough", maybeOfferGestureHint, { passive: true });

    return () => {
      v.removeEventListener("playing", hideHint);
      v.removeEventListener("canplaythrough", maybeOfferGestureHint);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [src]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const runTry = () => tryPlayRef.current();
    const runGesture = () => tryPlayFromUserGestureRef.current();

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
      if (document.visibilityState === "visible") runTry();
    };

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) runTry();
    };

    const onInteract = () => runGesture();

    /** iOS can pause inline video when returning from background — nudge play. */
    const onPause = () => {
      if (document.visibilityState === "visible" && !v.ended) {
        queueMicrotask(runTry);
      }
    };

    events.forEach((e) => v.addEventListener(e, runTry, { passive: true }));
    v.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("touchstart", onInteract, { passive: true, capture: true });
    window.addEventListener("touchend", onInteract, { passive: true, capture: true });
    window.addEventListener("pointerdown", onInteract, { passive: true, capture: true });
    window.addEventListener("click", onInteract, { passive: true, capture: true });

    let n = 0;
    const interval = window.setInterval(() => {
      runTry();
      if (++n >= 60) window.clearInterval(interval);
    }, 200);

    return () => {
      events.forEach((e) => v.removeEventListener(e, runTry));
      v.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("touchstart", onInteract, { capture: true });
      window.removeEventListener("touchend", onInteract, { capture: true });
      window.removeEventListener("pointerdown", onInteract, { capture: true });
      window.removeEventListener("click", onInteract, { capture: true });
      window.clearInterval(interval);
    };
  }, [src]);

  const lowPowerHint =
    showLowPowerHint && typeof document !== "undefined"
      ? createPortal(
          <div
            className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[55] flex justify-center px-4"
            role="presentation"
          >
            <button
              type="button"
              className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-white/[0.22] bg-black/50 px-5 py-2.5 text-xs font-light leading-none tracking-[0.06em] text-white/[0.92] backdrop-blur-sm transition-opacity active:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80 focus-visible:outline-offset-2"
              onPointerDown={(e) => {
                e.preventDefault();
                tryPlayFromUserGestureRef.current();
              }}
            >
              tap anywhere to play background video
            </button>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="h-full w-full overflow-hidden">
        <div className="h-full w-full origin-center scale-[1.115] blur-[1.25px] -translate-y-[0.85%] translate-x-[2.75%] will-change-transform">
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
      {lowPowerHint}
    </>
  );
}
