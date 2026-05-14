/** Shared line-by-line entrance (Web Animations API) — whole blocks, not per-character. */

const EASING_FULL = "cubic-bezier(0.2, 1, 0.32, 1)";
const EASING_REDUCED = "ease-out";

/** One line = one element: fade + slight rise only (no horizontal clip / “typing”). */
const LINE_FROM: Keyframe = {
  opacity: 0,
  transform: "translate3d(0, 14px, 0)",
};

const LINE_TO: Keyframe = {
  opacity: 1,
  transform: "translate3d(0, 0, 0)",
};

const REDUCED_FROM: Keyframe = {
  opacity: 0,
  transform: "translate3d(0, 8px, 0)",
};

const REDUCED_TO: Keyframe = {
  opacity: 1,
  transform: "translate3d(0, 0, 0)",
};

export function startLineEntrance(root: HTMLElement): Animation[] {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const els = [...root.querySelectorAll<HTMLElement>("[data-line-enter]")];
  const staggerMs = reduced ? 48 : 100;
  const durationMs = reduced ? 200 : 520;
  const easing = reduced ? EASING_REDUCED : EASING_FULL;
  const keyframes: Keyframe[] = reduced
    ? [REDUCED_FROM, REDUCED_TO]
    : [LINE_FROM, LINE_TO];

  const out: Animation[] = [];
  for (let i = 0; i < els.length; i++) {
    const anim = els[i].animate(keyframes, {
      duration: durationMs,
      delay: i * staggerMs,
      easing,
      fill: "both",
    });
    out.push(anim);
  }
  return out;
}

export function cancelAnimations(anims: Animation[]) {
  for (const a of anims) {
    try {
      a.cancel();
    } catch {
      /* noop */
    }
  }
}
