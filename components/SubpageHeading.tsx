import Link from "next/link";

export function SubpageHeading() {
  return (
    <Link
      href="/"
      className="mb-14 inline-block text-sm font-light tracking-[0.12em] text-white underline-offset-[4px] transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/90 sm:text-[0.9375rem]"
    >
      chanbin park
    </Link>
  );
}
