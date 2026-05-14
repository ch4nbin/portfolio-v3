import Link from "next/link";

export function SubpageHeading() {
  return (
    <Link
      href="/"
      aria-label="Back to home"
      className="link-sleek group mb-3 inline-flex items-center text-sm font-light tracking-[0.08em] text-white/90 hover:text-white sm:text-[0.9375rem]"
    >
      <span
        data-line-enter
        className="inline-flex items-center gap-2"
      >
        <span
          className="text-white/55 transition-colors group-hover:text-white/80"
          aria-hidden
        >
          ←
        </span>
        <span>back</span>
      </span>
    </Link>
  );
}
