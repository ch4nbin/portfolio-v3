import { PrimaryNav } from "@/components/PrimaryNav";
import { SubpageHeading } from "@/components/SubpageHeading";
import { SubpageMain } from "@/components/SubpageMain";
import { contactChannels } from "@/lib/site-content";

const iconClass =
  "size-[1.05rem] shrink-0 text-white/70 transition-colors group-hover:text-white/90";

function ContactChannelIcon({ label }: { label: string }) {
  switch (label) {
    case "email":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z"
            stroke="currentColor"
            strokeWidth={1.35}
            strokeLinejoin="round"
          />
          <path
            d="M4 7l8 5 8-5"
            stroke="currentColor"
            strokeWidth={1.35}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "phone":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M8.5 3.5h2l1.5 4.5-2 1.5a11 11 0 005 5l1.5-2 4.5 1.5v2a2 2 0 01-2 1.8 15 15 0 01-15-15 1.8 1.8 0 011.5-1.8z"
            stroke="currentColor"
            strokeWidth={1.35}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M6.5 8.5h2.2V19H6.5V8.5zM7.6 4.2a1.3 1.3 0 110 2.6 1.3 1.3 0 010-2.6zM11.4 8.5h2.1v1.4h.1c.3-.6 1-1.5 2.4-1.5 2.6 0 3.1 1.7 3.1 4V19h-2.2v-5.6c0-1.3 0-3-1.8-3-1.9 0-2.2 1.4-2.2 2.9V19h-2.2V8.5z" />
        </svg>
      );
    case "github":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.6.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.4 9.4 0 015.6 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.7 5 .4.3.7 1 .7 2v3c0 .3.2.6.7.5A10.1 10.1 0 0022 12.2C22 6.6 17.5 2 12 2z"
          />
        </svg>
      );
    case "site":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.35} />
          <path
            d="M3 12h18M12 3a15 15 0 000 18M12 3a15 15 0 010 18"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

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

      <ul className="mt-8 flex min-h-0 flex-1 list-none flex-col gap-6 p-0 md:mt-5">
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
              className="link-sleek group !inline-flex items-center gap-1.5 text-base font-light leading-snug text-white/[0.95] hover:text-white md:text-[1.025rem]"
            >
              <ContactChannelIcon label={label} />
              <span>{display}</span>
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
