import type { ReactNode } from "react";

type Props = {
  /** Path under /public. Until a picture is added the card shows a plain sky. */
  image?: string;
  imageAlt: string;
  /** Which part of the picture to keep in view when it is cropped, e.g. "50% 30%". */
  imagePosition?: string;
  /** A decorative drawing, centred a little low in the space above the copy. It takes up
      room in the card, so longer copy grows the card instead of running into it. */
  art?: ReactNode;
  /** Sets the card's height or shape. */
  className: string;
  children: ReactNode;
};

/** A white card whose picture melts into the copy at the bottom. The picture fills the card
    unless an ancestor sets --image-height, which keeps it to the top part. */
export function FadeCard({ image, imageAlt, imagePosition, art, className, children }: Props) {
  return (
    <article
      className={`relative isolate flex flex-col justify-end overflow-clip rounded-[26px] bg-white p-6 shadow-card outline outline-black/16 focus-within:ring-4 focus-within:ring-brand/50 ${className}`}
    >
      {image ? (
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
          className="absolute inset-x-0 top-0 -z-10 h-(--image-height,100%) w-full object-cover object-top select-none"
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
          className="pointer-events-none -mx-6 grid flex-auto place-items-center pt-6 pb-5 lg:pt-10 lg:pb-7"
        >
          {art}
        </div>
      ) : null}

      <div>{children}</div>
    </article>
  );
}
