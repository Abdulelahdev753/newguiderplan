import type { Dictionary } from "@/i18n/dictionaries";
import { CountUp } from "./count-up";
import { ReviewsCarousel } from "./reviews-carousel";
import { SwipeHint } from "./swipe-hint";

// WhatsApp screenshots, cropped below the chat header so no phone number or photo is shown.
// review-7 also has a system message naming the customer blurred out.
const images = [
  { src: "/images/reviews/review-1.webp", width: 591, height: 1128 },
  { src: "/images/reviews/review-2.webp", width: 591, height: 1128 },
  { src: "/images/reviews/review-3.webp", width: 740, height: 1368 },
  { src: "/images/reviews/review-4.webp", width: 739, height: 1408 },
  { src: "/images/reviews/review-5.webp", width: 739, height: 1408 },
  { src: "/images/reviews/review-6.webp", width: 739, height: 1328 },
  { src: "/images/reviews/review-7.webp", width: 739, height: 1408 },
  { src: "/images/reviews/review-8.webp", width: 739, height: 1408 },
  { src: "/images/reviews/review-9.webp", width: 739, height: 1408 },
  { src: "/images/reviews/review-10.webp", width: 739, height: 1408 },
  { src: "/images/reviews/review-11.webp", width: 739, height: 1408 },
  { src: "/images/reviews/review-12.webp", width: 739, height: 1424 },
  { src: "/images/reviews/review-13.webp", width: 739, height: 1424 },
];

export function Reviews({ dict }: { dict: Dictionary }) {
  const reviews = images.map((image, index) => ({
    ...image,
    alt: dict.reviews.items[index] ?? "",
  }));

  return (
    <section id="reviews" className="py-20 lg:py-28">
      <div className="mb-8 px-5 text-center lg:mb-10">
        <h2 className="text-3xl/[1.3] font-extrabold text-ink lg:text-4xl/[1.3] ltr:tracking-tight">
          {dict.reviews.title}
        </h2>
        <p className="mx-auto mt-3 max-w-[52ch] text-base/7 text-pretty text-ink-muted md:max-w-none">
          {dict.reviews.subtitle}
        </p>
        <p className="mt-7 flex flex-col items-center gap-1">
          {/* Screen readers get the sentence once, not a number that keeps changing. */}
          <span className="sr-only">{dict.reviews.trust.full}</span>
          <span
            dir="ltr"
            aria-hidden="true"
            // Snow white with a touch of blue at the foot of the digits, so they still read on a
            // white page, rising into the button blue.
            className="bg-linear-to-t from-[#9dc6fb] to-brand to-70% bg-clip-text text-5xl/[1.1] font-extrabold text-transparent tabular-nums lg:text-6xl/[1.1] ltr:tracking-tight"
          >
            {dict.reviews.trust.before}
            <CountUp to={dict.reviews.trust.count} />
            {dict.reviews.trust.after}
          </span>
          <span aria-hidden="true" className="text-base/7 font-semibold text-ink">
            {dict.reviews.trust.label}
          </span>
        </p>
        {/* From tablet width up the carousel has arrow buttons instead. */}
        <SwipeHint label={dict.howItWorks.swipe} className="md:hidden" />
      </div>
      <ReviewsCarousel reviews={reviews} labels={dict.reviews.labels} />
    </section>
  );
}
