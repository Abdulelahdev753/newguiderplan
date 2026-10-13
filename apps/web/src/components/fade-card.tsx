import type { ReactNode } from "react";

type Props = {
  /** Path under /public. Until a picture is added the card shows a plain sky. */
  image?: string;
  imageAlt: string;
  /** A decorative drawing, set a little below the centre of the space above the copy. */
  art?: ReactNode;
  /** Sets the card's height or shape. */
  className: string;
  children: ReactNode;
};

/** A white card whose picture melts into the copy at the bottom. */
export function FadeCard({ image, imageAlt, art, className, children }: Props) {
  return (
    <article
      className={`relative isolate flex flex-col justify-end overflow-hidden rounded-[26px] bg-white p-6 shadow-card outline outline-black/16 focus-within:ring-4 focus-within:ring-brand/50 ${className}`}
    >
      {image ? (
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 size-full object-cover object-top select-none"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-b from-sky-400/90 to-sky-50"
        />
      )}

      {/* The white the picture melts into: a solid sheet, cut by the eased mask. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-white mask-fade-eased"
      />

      {art ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 grid h-[66%] translate-y-1 place-items-center lg:translate-y-7"
        >
          {art}
        </div>
      ) : null}

      <div>{children}</div>
    </article>
  );
}
