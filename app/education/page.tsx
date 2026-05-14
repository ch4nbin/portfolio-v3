import { PrimaryNav } from "@/components/PrimaryNav";
import { SubpageHeading } from "@/components/SubpageHeading";
import { SubpageMain } from "@/components/SubpageMain";
import { education } from "@/lib/site-content";

export default function EducationPage() {
  return (
    <SubpageMain>
      <header className="flex shrink-0 flex-col gap-1 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="flex flex-col gap-1">
          <SubpageHeading />
          <h1
            data-line-enter
            className="m-0 text-base font-extralight tracking-[0.06em]"
          >
            education
          </h1>
        </div>
      </header>

      <article className="surface-hover mt-8 min-h-0 flex-1 md:mt-6">
        <div data-line-enter className="flex min-h-0 flex-1 flex-col">
          <header className="flex flex-col gap-0.5">
            <span className="text-[0.9375rem] font-light sm:text-sm">
              {education.school}
            </span>
            <span className="text-xs font-light tracking-wide text-white/65">
              {education.endDate}
            </span>
            <span className="text-sm font-light text-white/[0.92] sm:text-[0.9375rem]">
              {education.degree}
            </span>
            <span className="text-xs font-light text-white/65">
              {education.location}
            </span>
          </header>
          <ul className="mt-5 max-w-3xl list-none space-y-3 border-none p-0 text-sm font-light leading-relaxed tracking-[0.01em] text-white/[0.95] sm:text-[0.9375rem]">
            {education.bullets.map((b) => (
              <li key={b} className="border-l border-white/[0.22] pl-4">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </article>

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
