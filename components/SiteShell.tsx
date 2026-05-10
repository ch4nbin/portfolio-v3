import Image from "next/image";
import { HeroVideo } from "@/components/HeroVideo";

const videoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim();

/** Shared full-viewport backdrop + grain; content overlays at z-[10]. Grain above at z-[50]. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate min-h-dvh lowercase text-white">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="relative h-full w-full">
          {videoUrl ? (
            <HeroVideo src={videoUrl} />
          ) : (
            <Image
              src="/hero-fallback.png"
              alt=""
              fill
              priority
              className="scale-[1.115] object-cover blur-[1px] -translate-y-[0.85%] translate-x-[2.75%]"
              style={{ objectPosition: "58% 52%" }}
              aria-hidden
            />
          )}
        </div>
      </div>

      <div className="relative z-10">{children}</div>

      <div className="grain-overlay" aria-hidden />
    </div>
  );
}
