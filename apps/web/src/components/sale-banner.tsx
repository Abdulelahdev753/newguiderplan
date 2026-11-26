"use client";

import type { Dictionary } from "@/i18n/dictionaries";
import { saleEndsAt } from "@/lib/sale";
import { FlipClock, useSecondsLeft } from "./flip-clock";

type Props = {
  copy: Dictionary["sale"];
};

/** The White Friday notice above the guides, counting down to the end of the sale. */
export function SaleBanner({ copy }: Props) {
  const secondsLeft = useSecondsLeft(saleEndsAt);

  // Once the sale is over the notice goes; the prices go back with the next deploy.
  if (secondsLeft === 0) return null;

  return (
    <div className="mx-auto mb-10 max-w-5xl rounded-[26px] bg-ink px-4 py-8 text-center text-white shadow-[var(--shadow-card),var(--shadow-cta-strong)] sm:px-10 sm:py-10 lg:mb-14">
      <p className="text-xs/5 font-extrabold text-brand ltr:tracking-[0.14em] ltr:uppercase rtl:text-sm/5">
        {copy.eyebrow}
      </p>
      <h2 className="mt-2 text-3xl/[1.25] font-extrabold text-balance lg:text-4xl/[1.25] ltr:tracking-tight">
        {copy.title}
      </h2>
      <p className="mx-auto mt-2 max-w-[48ch] text-sm/6 text-pretty text-white/70 sm:text-base/7">
        {copy.body}
      </p>
      <p className="mt-6 text-sm/5 font-semibold text-white/90">{copy.endsIn}</p>
      <FlipClock secondsLeft={secondsLeft} labels={copy.units} className="mt-3" />
    </div>
  );
}
