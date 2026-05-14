import Link from "next/link";
import { PrimaryNav } from "@/components/PrimaryNav";
import { SubpageHeading } from "@/components/SubpageHeading";
import { SubpageMain } from "@/components/SubpageMain";
import { projects } from "@/lib/site-content";

export default function ProjectsPage() {
  return (
    <SubpageMain>
      <header className="flex shrink-0 flex-col gap-1 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="flex flex-col gap-1">
          <SubpageHeading />
          <h1
            data-line-enter
            className="m-0 text-base font-extralight tracking-[0.06em]"
          >
            projects
          </h1>
        </div>
      </header>

      <div className="mt-8 grid min-h-0 flex-1 grid-cols-1 gap-12 md:mt-5 md:grid-cols-2 md:gap-x-16 md:gap-y-0 lg:gap-x-24 md:content-start">
        {projects.map((p) => (
          <article key={p.title} className="surface-hover min-w-0">
            <div data-line-enter className="min-w-0">
              <header className="flex flex-col gap-1.5">
                <h2 className="m-0 text-base font-light md:text-[1.025rem]">
                  {p.title}
                </h2>
                {p.devpostUrl || p.githubUrl ? (
                  <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm font-light md:text-[0.9375rem]">
                    {p.devpostUrl ? (
                      <Link
                        href={p.devpostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-sleek inline-block py-1 text-white/88 hover:text-white"
                      >
                        Devpost
                      </Link>
                    ) : null}
                    {p.devpostUrl && p.githubUrl ? (
                      <span className="text-white/35" aria-hidden>
                        /
                      </span>
                    ) : null}
                    {p.githubUrl ? (
                      <Link
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-sleek inline-block py-1 text-white/88 hover:text-white"
                      >
                        GitHub
                      </Link>
                    ) : null}
                  </p>
                ) : null}
                <p className="m-0 text-xs font-light leading-snug tracking-wide text-white/65 md:text-[0.7rem]">
                  {p.stackLine}
                </p>
              </header>
              <ul className="mt-3 list-none space-y-2.5 p-0 text-sm font-light leading-snug tracking-[0.01em] text-white/[0.95] md:mt-2 md:space-y-1.5 md:text-[0.8125rem]">
                {p.bullets.map((b) => (
                  <li
                    key={b}
                    className="border-l border-white/[0.22] pl-3 md:pl-2.5"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
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
