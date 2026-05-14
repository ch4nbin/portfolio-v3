"use client";

import { LineEntranceRoot } from "@/components/LineEntranceRoot";
import { PrimaryNav } from "@/components/PrimaryNav";

export function HeroBlock() {
  return (
    <main className="fixed top-[calc(50svh-1.75rem)] left-0 z-[20] w-full pl-[4%] pr-6 sm:top-[calc(50svh-2rem)] md:pl-[6%]">
      <LineEntranceRoot className="read-on-video flex max-w-xl flex-col">
        <h1
          data-line-enter
          className="m-0 text-3xl font-extralight leading-none tracking-[0.12em] sm:text-[2.5rem] sm:tracking-[0.18em]"
        >
          chanbin park
        </h1>

        <div className="mt-5 flex flex-col gap-4">
          <PrimaryNav lineEntrance />

          <p
            data-line-enter
            className="text-sm font-light leading-none sm:text-[0.9375rem] sm:leading-none"
          >
            cs @ princeton&nbsp;&nbsp;•&nbsp;&nbsp;t-mobile swe intern
          </p>
        </div>
      </LineEntranceRoot>
    </main>
  );
}
