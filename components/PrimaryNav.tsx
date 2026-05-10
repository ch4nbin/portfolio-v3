"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/experience", label: "experience" },
  { href: "/projects", label: "projects" },
  { href: "/contact", label: "contact" },
] as const;

const linkFx =
  "rounded-sm underline-offset-[3px] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/90";

export function PrimaryNav() {
  const pathname = usePathname();

  return (
    <nav className="text-sm font-light leading-none sm:text-[0.9375rem]" aria-label="Primary">
      {items.map(({ href, label }, i) => {
        const active = pathname === href;
        return (
          <span key={href}>
            {i > 0 ? <span> / </span> : null}
            <Link
              href={href}
              prefetch
              className={`${linkFx} ${active ? "underline opacity-100" : "text-white/[0.88]"}`}
              aria-current={active ? "page" : undefined}
            >
              {label}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
