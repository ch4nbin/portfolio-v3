import { ExperienceList } from "@/components/ExperienceList";
import { PrimaryNav } from "@/components/PrimaryNav";
import { SubpageHeading } from "@/components/SubpageHeading";
import { SubpageMain } from "@/components/SubpageMain";

export default function ExperiencePage() {
  return (
    <SubpageMain>
      <header className="flex shrink-0 flex-col gap-1 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="flex flex-col gap-1">
          <SubpageHeading />
          <h1
            data-line-enter
            className="m-0 text-base font-extralight tracking-[0.06em]"
          >
            experience
          </h1>
        </div>
      </header>

      <div className="mt-8 flex min-h-0 flex-1 flex-col md:mt-5">
        <ExperienceList />
      </div>

      <footer className="mt-10 flex shrink-0 flex-col gap-3 border-t border-white/[0.18] pt-5 md:mt-8 md:flex-row md:items-center md:justify-between md:pt-4">
        <div data-line-enter>
          <PrimaryNav />
        </div>
        <div
          data-line-enter
          className="h-px w-[2.65rem] shrink-0 bg-white opacity-75"
          aria-hidden
        />
      </footer>
    </SubpageMain>
  );
}
