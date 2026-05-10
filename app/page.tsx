import { PrimaryNav } from "@/components/PrimaryNav";
import { SiteShell } from "@/components/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      <main className="fixed top-[calc(50svh-1.75rem)] left-0 z-[20] w-full pl-[4%] pr-6 sm:top-[calc(50svh-2rem)] md:pl-[6%]">
        <div className="flex max-w-xl flex-col">
          <h1 className="m-0 text-3xl font-extralight leading-none tracking-[0.12em] sm:text-[2.5rem] sm:tracking-[0.18em]">
            chanbin park
          </h1>

          <div className="mt-5 flex flex-col gap-4">
            <PrimaryNav />

            <div className="h-px w-[2.65rem] shrink-0 bg-white" aria-hidden />

            <p className="text-sm font-light leading-none sm:text-[0.9375rem] sm:leading-none">
              cs @ princeton&nbsp;&nbsp;•&nbsp;&nbsp;t-mobile swe intern
            </p>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
