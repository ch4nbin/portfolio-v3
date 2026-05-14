"use client";

import Link from "next/link";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";

const items = [
  { href: "/education", label: "education" },
  { href: "/experience", label: "experience" },
  { href: "/projects", label: "projects" },
  { href: "/contact", label: "contact" },
] as const;

const HERO_LINK =
  "rounded-sm text-white opacity-100 inline-block pb-0.5 transition-[transform] duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] outline-offset-[6px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/85 motion-safe:hover:-translate-y-0.5";

export function PrimaryNav({ lineEntrance }: { lineEntrance?: boolean }) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ x: 0, w: 42 });
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const activeIndex = items.findIndex(({ href }) => pathname === href);
  const restingIndex = activeIndex >= 0 ? activeIndex : 0;
  const targetIndex = hoverIndex ?? restingIndex;

  const measureToIndex = useCallback((index: number) => {
    const nav = navRef.current;
    const wrap = itemRefs.current[index];
    if (!nav || !wrap) return;
    const link = wrap.querySelector("a");
    if (!link) return;
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setIndicator({
      x: linkRect.left - navRect.left,
      w: Math.max(linkRect.width, 10),
    });
  }, []);

  const hoverRef = useRef(hoverIndex);
  hoverRef.current = hoverIndex;
  const restingRef = useRef(restingIndex);
  restingRef.current = restingIndex;

  useLayoutEffect(() => {
    if (!lineEntrance) return;
    measureToIndex(targetIndex);
  }, [lineEntrance, measureToIndex, pathname, targetIndex]);

  useLayoutEffect(() => {
    if (!lineEntrance) return;
    const nav = navRef.current;
    if (!nav) return;
    const ro = new ResizeObserver(() => {
      const t = hoverRef.current ?? restingRef.current;
      measureToIndex(t);
    });
    ro.observe(nav);
    return () => ro.disconnect();
  }, [lineEntrance, measureToIndex]);

  if (!lineEntrance) {
    return (
      <nav className="text-sm font-light leading-none sm:text-[0.9375rem]" aria-label="Primary">
        {items.map(({ href, label }, i) => {
          const active = pathname === href;
          return (
            <span key={href}>
              {i > 0 ? (
                <span className="inline-block px-1.5 text-white/35" aria-hidden>
                  /
                </span>
              ) : null}
              <Link
                href={href}
                prefetch
                className={`link-sleek rounded-sm text-white ${active ? "link-sleek-active opacity-100" : "opacity-[0.82] hover:opacity-100"}`}
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

  return (
    <nav
      ref={navRef}
      className="relative pb-2 text-sm font-light leading-none text-white sm:text-[0.9375rem]"
      aria-label="Primary"
      onMouseLeave={() => setHoverIndex(null)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setHoverIndex(null);
        }
      }}
    >
      {items.map(({ href, label }, i) => {
        const active = pathname === href;
        return (
          <span
            key={href}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            data-line-enter
            className="inline-block"
            onMouseEnter={() => setHoverIndex(i)}
          >
            {i > 0 ? (
              <span className="inline-block px-1.5 text-white" aria-hidden>
                /
              </span>
            ) : null}
            <Link
              href={href}
              prefetch
              className={HERO_LINK}
              aria-current={active ? "page" : undefined}
              onFocus={() => setHoverIndex(i)}
            >
              {label}
            </Link>
          </span>
        );
      })}

      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-px origin-left bg-white transition-[transform,width] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] will-change-[transform,width]"
        style={{
          width: indicator.w,
          transform: `translateX(${indicator.x}px)`,
        }}
      />
    </nav>
  );
}
