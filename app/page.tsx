import Image from "next/image";

const videoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim();

export default function Home() {
  return (
    <div className="relative isolate min-h-dvh lowercase text-white">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="relative h-full w-full">
          {videoUrl ? (
            <video
              className="h-full w-full scale-[1.115] object-cover blur-[3px]"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <Image
              src="/hero-fallback.png"
              alt=""
              fill
              priority
              className="scale-[1.115] object-cover blur-[3px]"
              aria-hidden
            />
          )}
        </div>
      </div>

      <main className="relative z-10 flex min-h-dvh flex-col justify-center pl-[6%] pr-6 md:pl-[8%]">
        <div className="flex max-w-xl flex-col">
          <h1 className="text-4xl font-extralight tracking-[0.12em] sm:text-[3rem] sm:tracking-[0.18em]">
            chanbin park
          </h1>

          <div className="mt-5 flex flex-col gap-4">
            <nav
              className="text-base font-light leading-none"
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

            <p className="text-[0.9375rem] font-light leading-none sm:text-base sm:leading-none">
              cs @ princeton&nbsp;&nbsp;•&nbsp;&nbsp;t-mobile swe intern
            </p>
          </div>
        </div>
      </main>

      <div className="grain-overlay" aria-hidden />
    </div>
  );
}
