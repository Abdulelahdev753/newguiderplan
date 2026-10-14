import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { CheckGlassIcon } from "./check-glass-icon";
import { FadeCard } from "./fade-card";
import { FormGlassIcon } from "./form-glass-icon";
import { StreamPayGlassIcon } from "./streampay-glass-icon";
import { SwipeHint } from "./swipe-hint";

type StepId = keyof Dictionary["howItWorks"]["steps"];

type Step = {
  id: StepId;
  /** Path under /public. Until a picture is added the card shows a plain sky. */
  image?: string;
  /** A drawing shown above the copy. */
  art?: ReactNode;
};

const steps: Step[] = [
  { id: "form", art: <FormGlassIcon /> },
  { id: "pay", art: <StreamPayGlassIcon /> },
  { id: "receive", art: <CheckGlassIcon /> },
];

export function HowItWorks({ dict }: { dict: Dictionary }) {
  const copy = dict.howItWorks;

  return (
    <section id="how-it-works" className="scroll-mt-25 px-5 pb-20 lg:scroll-mt-33 lg:px-8 lg:pb-28">
      <div className="mb-8 text-center lg:mb-12">
        <h2 className="text-3xl/[1.3] font-extrabold text-ink lg:text-4xl/[1.3] ltr:tracking-tight">
          {copy.title}
        </h2>
        <p className="mx-auto mt-3 max-w-[52ch] text-base/7 text-pretty text-ink-muted">
          {copy.subtitle}
        </p>

        {/* Only where the cards scroll sideways. */}
        <SwipeHint label={copy.swipe} className="lg:hidden" />
      </div>

      {/* Below desktop width the cards stay in one row and scroll sideways. The row bleeds
          to the screen edges, and its vertical padding leaves room for the card shadows. */}
      <ol className="-mx-5 -mb-10 flex justify-center-safe gap-4 overflow-x-auto px-5 pt-1 pb-10 [scrollbar-width:none] lg:mx-auto lg:mb-0 lg:grid lg:max-w-6xl lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:p-0 [&::-webkit-scrollbar]:hidden">
        {steps.map(({ id, image, art }, index) => {
          const step = copy.steps[id];

          return (
            <li key={id} className="@container w-[min(78vw,20rem)] shrink-0 lg:w-auto">
              {/* Square, but never shorter than its copy, and as tall as the tallest card. */}
              <FadeCard
                image={image}
                imageAlt={step.imageAlt}
                art={art}
                className="h-full min-h-[100cqw]"
              >
                {/* Arabic script is joined, so letter-spacing and uppercase are Latin-only. */}
                <p className="mb-2 text-[11px]/4 font-extrabold text-ink-muted ltr:tracking-[0.1em] ltr:uppercase rtl:text-xs/5">
                  {copy.step.replace("{number}", String(index + 1))}
                </p>
                <h3 className="text-3xl/[1.05] font-medium text-balance text-ink ltr:font-serif ltr:tracking-[-0.035em] rtl:text-2xl/[1.4] rtl:font-extrabold">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm/[1.55] text-pretty text-ink-muted">{step.description}</p>
              </FadeCard>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
