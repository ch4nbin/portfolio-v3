import { PrimaryNav } from "@/components/PrimaryNav";
import { SiteShell } from "@/components/SiteShell";
import { SubpageHeading } from "@/components/SubpageHeading";
import { contactChannels } from "@/lib/site-content";

export default function ContactPage() {
  return (
    <SiteShell>
      <main className="relative z-[20] mx-auto max-w-[34rem] px-[4%] pb-36 pt-[8svh] md:mr-auto md:ml-0 md:max-w-xl md:pl-[6%] md:pr-8 md:pt-[10svh]">
        <SubpageHeading />
        <h1 className="m-0 text-base font-extralight tracking-[0.06em]">contact</h1>
        <ul className="mt-11 flex flex-col gap-6 p-0 font-light">
          {contactChannels.map(({ label, href, display }) => (
            <li key={label} className="list-none">
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
                className="text-[0.9375rem] text-white/[0.95] underline underline-offset-[3px] decoration-white/[0.35] transition-colors hover:text-white hover:decoration-white/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/90"
              >
                {display}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.12] pt-10">
          <PrimaryNav />
          <div className="h-px w-[2.65rem] shrink-0 bg-white opacity-75" aria-hidden />
        </div>
      </main>
    </SiteShell>
  );
}
