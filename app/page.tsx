import Image from "next/image";
import { HeroVideo } from "@/components/HeroVideo";

const videoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim();

export default function Home() {
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
              className="scale-[1.115] object-cover blur-[3px] -translate-y-[0.85%] translate-x-[2.75%]"
              style={{ objectPosition: "58% 52%" }}
              aria-hidden
            />
          )}
        </div>
      </div>

      <main className="fixed top-[calc(50svh-1.75rem)] left-0 z-10 w-full pl-[4%] pr-6 sm:top-[calc(50svh-2rem)] md:pl-[6%]">
        <div className="flex max-w-xl flex-col">
          <h1 className="m-0 text-3xl font-extralight leading-none tracking-[0.12em] sm:text-[2.5rem] sm:tracking-[0.18em]">
            chanbin park
          </h1>

          <div className="mt-5 flex flex-col gap-4">
            <nav
              className="text-sm font-light leading-none sm:text-[0.9375rem]"
              aria-label="Primary"
            >
              <a
                href="#experience"
                className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/90"
              >
                experience
              </a>
              <span> / </span>
              <a
                href="#projects"
                className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/90"
              >
                projects
              </a>
              <span> / </span>
              <a
                href="#contact"
                className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/90"
              >
                contact
              </a>
            </nav>

            <div
              className="h-px w-[2.65rem] shrink-0 bg-white"
              aria-hidden
            />

            <p className="text-sm font-light leading-none sm:text-[0.9375rem] sm:leading-none">
              cs @ princeton&nbsp;&nbsp;•&nbsp;&nbsp;t-mobile swe intern
            </p>
          </div>
        </div>
      </main>

      <div className="grain-overlay" aria-hidden />
    </div>
  );
}
