import { PrimaryNav } from "@/components/PrimaryNav";
import { SubpageHeading } from "@/components/SubpageHeading";
import { SubpageMain } from "@/components/SubpageMain";
import { contactChannels } from "@/lib/site-content";

export default function ContactPage() {
  return (
    <SubpageMain>
      <header className="flex shrink-0 flex-col gap-1 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="flex flex-col gap-1">
          <SubpageHeading />
          <h1
            data-line-enter
            className="m-0 text-base font-extralight tracking-[0.06em]"
          >
            contact
          </h1>
        </div>
      </header>

      <ul className="mt-8 flex min-h-0 flex-1 list-none flex-col gap-5 p-0 font-light md:mt-5 md:flex-row md:flex-wrap md:content-start md:gap-x-10 md:gap-y-4 lg:gap-x-14">
        {contactChannels.map(({ label, href, display }) => (
          <li key={label} data-line-enter className="min-w-0">
            <a
              href={href}
              target={
                href.startsWith("mailto:") || href.startsWith("tel:")
                  ? undefined
                  : "_blank"
              }
              rel={
                href.startsWith("mailto:") || href.startsWith("tel:")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="link-sleek text-[0.9375rem] text-white/[0.95] opacity-[0.88] hover:opacity-100 md:text-sm lg:text-[0.9375rem]"
            >
              {display}
            </a>
          </li>
        ))}
      </ul>

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
