"use client";

import { useEffect, useRef, useState } from "react";

export type Review = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

type Props = {
  reviews: Review[];
  labels: { previous: string; next: string; enlarge: string; close: string };
};

const arrowButton =
  "absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-black/8 bg-white text-ink shadow-sm outline-none transition-colors hover:border-brand focus-visible:ring-4 focus-visible:ring-brand/50 md:flex";

export function ReviewsCarousel({ reviews, labels }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [active, setActive] = useState<Review | null>(null);

  // The arrows only make sense when the cards don't all fit on screen.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(() => {
      setOverflowing(track.scrollWidth > track.clientWidth + 1);
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const scroll = (step: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // Horizontal scroll offsets run negative in right-to-left layouts.
    const direction = getComputedStyle(track).direction === "rtl" ? -1 : 1;
    track.scrollBy({ left: step * direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  const open = (review: Review) => {
    setActive(review);
    dialogRef.current?.showModal();
  };

  return (
    <div className="relative">
      {overflowing ? (
        <>
          <button
            type="button"
            aria-label={labels.previous}
            onClick={() => scroll(-1)}
            className={`${arrowButton} start-3`}
          >
            <Chevron className="size-5 ltr:-scale-x-100" />
          </button>
          <button
            type="button"
            aria-label={labels.next}
            onClick={() => scroll(1)}
            className={`${arrowButton} end-3`}
          >
            <Chevron className="size-5 rtl:-scale-x-100" />
          </button>
        </>
      ) : null}

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory scroll-px-5 justify-center-safe gap-4 overflow-x-auto px-5 py-1 [scrollbar-width:none] lg:scroll-px-8 lg:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <button
            key={review.src}
            type="button"
            aria-label={`${labels.enlarge}: ${review.alt}`}
            onClick={() => open(review)}
            className="group w-[min(64vw,15rem)] shrink-0 cursor-pointer snap-start overflow-hidden rounded-2xl border border-black/8 bg-white outline-none focus-visible:ring-4 focus-visible:ring-brand/50"
          >
            <img
              src={review.src}
              width={review.width}
              height={review.height}
              alt=""
              loading="lazy"
              decoding="async"
              className="block aspect-[300/548] w-full object-cover object-bottom transition-transform duration-200 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        // A click on the dialog itself (not the picture) lands on the backdrop area.
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-4 backdrop:bg-black/75"
      >
        {active ? (
          <img
            src={active.src}
            width={active.width}
            height={active.height}
            alt={active.alt}
            className="max-h-[calc(100dvh-6rem)] w-auto max-w-[calc(100vw-2rem)] rounded-2xl"
          />
        ) : null}
        <form method="dialog" className="mt-3 flex justify-center">
          <button
            type="submit"
            className="h-11 cursor-pointer rounded-full bg-white px-5 font-semibold text-ink outline-none focus-visible:ring-4 focus-visible:ring-brand/50"
          >
            {labels.close}
          </button>
        </form>
      </dialog>
    </div>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
