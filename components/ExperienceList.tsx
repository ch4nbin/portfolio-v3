"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Job } from "@/lib/site-content";
import { experience } from "@/lib/site-content";
import { cancelAnimations, startLineEntrance } from "@/lib/line-entrance";

function JobCard({ job }: { job: Job }) {
  return (
    <article className="surface-hover min-w-0">
      <div data-line-enter className="min-w-0">
        <header className="flex flex-col gap-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-[0.9375rem] font-light md:text-sm">
              {job.org}
            </span>
            {job.note ? (
              <span className="text-xs font-light text-white/78 md:text-[0.7rem]">
                {job.note}
              </span>
            ) : null}
          </div>
          <span className="text-xs font-light tracking-wide text-white/78 md:text-[0.7rem]">
            {job.dateRange}
          </span>
          <span className="text-sm font-light text-white/[0.92] md:text-[0.8125rem]">
            {job.role}
          </span>
          <span className="text-xs font-light text-white/78 md:text-[0.7rem]">
            {job.location}
          </span>
        </header>
        <ul className="mt-1.5 list-none space-y-1.5 border-none p-0 text-sm font-light leading-snug tracking-[0.01em] text-white/[0.96] md:mt-1 md:space-y-1 md:text-[0.8125rem]">
          {job.bullets.map((b) => (
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
  );
}

/**
 * CSS Grid rows share one row height (max of both columns), so a short card
 * beside a tall one leaves a huge empty band — Stigma looks “far” under T‑Mobile.
 * From md: we use two independent flex columns (odd / even indices) so vertical
 * gaps are only within each column.
 */
export function ExperienceList() {
  const [wide, setWide] = useState(false);
  const listRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /** Two-column layout remounts job cards; LineEntranceRoot only runs once — replay entrance on this subtree. */
  const skipFirstNarrowReplay = useRef(true);
  useLayoutEffect(() => {
    const el = listRootRef.current;
    if (!el) return;
    if (!wide && skipFirstNarrowReplay.current) {
      skipFirstNarrowReplay.current = false;
      return;
    }
    skipFirstNarrowReplay.current = false;
    const anims = startLineEntrance(el);
    return () => cancelAnimations(anims);
  }, [wide]);

  if (!wide) {
    return (
      <div ref={listRootRef} className="flex min-h-0 flex-1 flex-col gap-y-7">
        {experience.map((job) => (
          <JobCard key={`${job.org}-${job.dateRange}`} job={job} />
        ))}
      </div>
    );
  }

  const left = experience.filter((_, i) => i % 2 === 0);
  const right = experience.filter((_, i) => i % 2 === 1);

  return (
    <div
      ref={listRootRef}
      className="flex min-h-0 flex-1 flex-row items-start gap-x-12 lg:gap-x-16"
    >
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-y-7">
        {left.map((job) => (
          <JobCard key={`${job.org}-${job.dateRange}`} job={job} />
        ))}
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-y-7">
        {right.map((job) => (
          <JobCard key={`${job.org}-${job.dateRange}`} job={job} />
        ))}
      </div>
    </div>
  );
}
