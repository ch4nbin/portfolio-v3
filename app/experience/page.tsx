import { PrimaryNav } from "@/components/PrimaryNav";
import { SiteShell } from "@/components/SiteShell";
import { SubpageHeading } from "@/components/SubpageHeading";
import { experience } from "@/lib/site-content";

export default function ExperiencePage() {
  return (
    <SiteShell>
      <main className="relative z-[20] mx-auto max-w-[34rem] px-[4%] pb-36 pt-[8svh] md:mr-auto md:ml-0 md:max-w-xl md:pl-[6%] md:pr-8 md:pt-[10svh]">
        <SubpageHeading />
        <h1 className="m-0 text-base font-extralight tracking-[0.06em]">experience</h1>
        <div className="mt-11 flex flex-col gap-14">
          {experience.map((job) => (
            <article key={`${job.org}-${job.dateRange}`}>
              <header className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-[0.9375rem] font-light">{job.org}</span>
                  {job.note ? (
                    <span className="text-xs font-light text-white/55">{job.note}</span>
                  ) : null}
                </div>
                <span className="text-xs font-light tracking-wide text-white/50">
                  {job.dateRange}
                </span>
                <span className="text-sm font-light text-white/[0.92]">{job.role}</span>
                <span className="text-xs font-light text-white/50">{job.location}</span>
              </header>
              <ul className="mt-5 list-none space-y-3 border-none p-0 text-sm font-light leading-relaxed tracking-[0.01em] text-white/[0.95] sm:text-[0.9375rem]">
                {job.bullets.map((b) => (
                  <li key={b} className="border-l border-white/[0.2] pl-4">
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.12] pt-10">
          <PrimaryNav />
          <div className="h-px w-[2.65rem] shrink-0 bg-white opacity-75" aria-hidden />
        </div>
      </main>
    </SiteShell>
  );
}
