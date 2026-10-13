"use client";

import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

// Latin digits in both languages, like the prices on the page.
const format = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

type Props = {
  to: number;
  from?: number;
  className?: string;
};

/** Counts from `from` up to `to` on a spring, the first time it scrolls into view. */
export function CountUp({ to, from = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();

  const value = useMotionValue(to);
  // Eases in, runs, then settles on the number without bouncing past it.
  const spring = useSpring(value, { stiffness: 55, damping: 22, mass: 1 });

  // The page is delivered showing the final number, so it reads right without scripts.
  // With motion allowed, rewind to the start and wait for the counter to be seen.
  useEffect(() => {
    if (reducedMotion) return;
    value.jump(from);
    spring.jump(from);
    if (ref.current) ref.current.textContent = format.format(from);
  }, [from, reducedMotion, spring, value]);

  useEffect(() => {
    if (inView && !reducedMotion) value.set(to);
  }, [inView, reducedMotion, to, value]);

  // Written straight to the element: sixty updates a second shouldn't re-render React.
  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = format.format(Math.round(latest));
    });
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      {format.format(to)}
    </span>
  );
}
