"use client";

import type { ReactNode } from "react";
import { LineEntranceRoot } from "@/components/LineEntranceRoot";

export function SubpageMain({ children }: { children: ReactNode }) {
  return (
    <main className="relative isolate z-[20] flex min-h-dvh w-full flex-col overflow-y-auto lowercase text-white md:min-h-dvh md:px-10 lg:px-16 xl:px-24 px-[4%] pb-16 pt-[5svh] md:pb-8 md:pt-6">
      <LineEntranceRoot className="read-on-video relative z-0 flex min-h-0 flex-1 flex-col">
        {children}
      </LineEntranceRoot>
    </main>
  );
}
