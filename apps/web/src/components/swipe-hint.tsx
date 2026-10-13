type Props = {
  label: string;
  /** Hides the hint at the widths where the row no longer needs a swipe. */
  className: string;
};

/** A hand dragging sideways beside the word "Swipe". The finger drags the way the row moves:
    towards the left in English, towards the right in Arabic. */
export function SwipeHint({ label, className }: Props) {
  return (
    <p
      aria-hidden="true"
      className={`mt-5 flex items-center justify-center gap-6 text-sm/6 font-semibold text-ink-muted ltr:flex-row-reverse ${className}`}
    >
      <span className="flex flex-col-reverse items-center gap-1.5 ltr:[--swipe-x:-1rem] rtl:[--swipe-x:1rem]">
        {/* The macOS pointing-hand cursor: a white glove with a brand-blue outline. */}
        <svg
          viewBox="0 0 32 32"
          fill="white"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-11 text-brand drop-shadow-[0_2px_2px_rgb(0_0_0/0.25)] motion-safe:animate-swipe-hint"
        >
          <path d="M11 17V6.5a2.5 2.5 0 0 1 5 0V13a2.25 2.25 0 0 1 4.5 0v1.5a2.25 2.25 0 0 1 4.5 0V16a2 2 0 0 1 4 0v5c0 5-4 9-9 9h-3c-3 0-5-1.5-6.5-3.5l-5-6.5c-1-1.3-.7-3 .6-3.8 1.2-.7 2.6-.4 3.5.6L11 18.5Z" />
          <path d="M16 13v4M20.5 14.5v3M25 16v2.5" fill="none" />
        </svg>
        {/* Shown above the hand, on the hand's own animation, so the two appear, slide
            and fade as one. It points left; Arabic mirrors it. */}
        <svg
          viewBox="0 0 48 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-12 text-brand motion-safe:animate-swipe-hint"
        >
          <path
            d="M46 12Q24 0 3 9M6.2 3.9 3 9l5.9 1.2"
            className="origin-center [transform-box:fill-box] rtl:-scale-x-100"
          />
        </svg>
      </span>
      {label}
    </p>
  );
}
