import { PrimaryNav } from "@/components/PrimaryNav";
import { SiteShell } from "@/components/SiteShell";
import { SubpageHeading } from "@/components/SubpageHeading";
import { projects } from "@/lib/site-content";

export default function ProjectsPage() {
  return (
    <SiteShell>
      <main className="relative z-[20] mx-auto max-w-[34rem] px-[4%] pb-36 pt-[8svh] md:mr-auto md:ml-0 md:max-w-xl md:pl-[6%] md:pr-8 md:pt-[10svh]">
        <SubpageHeading />
        <h1 className="m-0 text-base font-extralight tracking-[0.06em]">projects</h1>
        <div className="mt-11 flex flex-col gap-14">
          {projects.map((p) => (
            <article key={p.title}>
              <header className="flex flex-col gap-2">
                <h2 className="m-0 text-[0.9375rem] font-light">{p.title}</h2>
                <p className="m-0 text-xs font-light leading-snug tracking-wide text-white/50">
                  {p.stackLine}
                </p>
              </header>
              <ul className="mt-5 list-none space-y-3 p-0 text-sm font-light leading-relaxed tracking-[0.01em] text-white/[0.95] sm:text-[0.9375rem]">
                {p.bullets.map((b) => (
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
