"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import { cancelAnimations, startLineEntrance } from "@/lib/line-entrance";

type LineEntranceRootProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Sequential “written line” reveal on each `[data-line-enter]` in document
 * order (WAAPI). Remount this component (e.g. `key={pathname}`) to replay.
 */
export function LineEntranceRoot({ children, className }: LineEntranceRootProps) {
  const ref = useRef<HTMLDivElement>(null);
  const runningRef = useRef<Animation[]>([]);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    cancelAnimations(runningRef.current);
    runningRef.current = startLineEntrance(root);

    return () => {
      cancelAnimations(runningRef.current);
      runningRef.current = [];
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className ? `line-entrance-root ${className}` : "line-entrance-root"}
    >
      {children}
    </div>
  );
}
