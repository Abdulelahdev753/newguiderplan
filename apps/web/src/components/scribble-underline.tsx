import type { ReactNode } from "react";

/** Words underlined twice in red, as if with a marker: once the page loads, each stroke is
    drawn in from where the words begin (the right, in Arabic) to where they end. */
export function ScribbleUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      {/* Clear of the lowest letter parts (the tail of an Arabic م reaches below the line box)
          and hanging under the line, so the parent leaves room for it. Mirrored in Arabic, so
          the strokes start on the right. With reduced motion they are simply there. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 20"
        preserveAspectRatio="none"
        fill="none"
        stroke="#e5252a"
        strokeLinecap="round"
        className="pointer-events-none absolute inset-x-0 top-full h-[0.3em] w-full ltr:mt-[0.12em] rtl:mt-[0.16em] rtl:-scale-x-100"
      >
        <path
          pathLength={1}
          strokeWidth={3.6}
          d="M3 6C38 3 82 4.8 128 4.4s58 2 69-.8"
          className="[stroke-dasharray:1_2] motion-safe:animate-scribble"
        />
        <path
          pathLength={1}
          strokeWidth={3}
          d="M14 16c36-3 84-1.8 120-2.6s46 1.6 56-.4"
          className="[stroke-dasharray:1_2] motion-safe:animate-scribble-second"
        />
      </svg>
    </span>
  );
}
