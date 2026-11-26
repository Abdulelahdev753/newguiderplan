"use client";

// Adapted from 8starlabs-ui's Flip Clock (https://ui.8starlabs.com), countdown mode only.

import { memo, useEffect, useState, useSyncExternalStore } from "react";

const tickEvery = (onTick: () => void) => {
  // A quick heartbeat catches each new second as soon as it starts.
  const timer = setInterval(onTick, 250);
  return () => clearInterval(timer);
};
const currentSecond = () => Math.floor(Date.now() / 1000);
// The page is built ahead of time, so the server can't know how long is left.
const noSecondYet = () => null;

/** Whole seconds until `endsAt`, never below zero; null until the page runs in a browser. */
export function useSecondsLeft(endsAt: Date): number | null {
  const now = useSyncExternalStore(tickEvery, currentSecond, noSecondYet);
  if (now === null) return null;
  return Math.max(0, Math.floor(endsAt.getTime() / 1000) - now);
}

const cardSize = "h-11 w-7 text-2xl sm:h-20 sm:w-14 sm:text-5xl";
const card = `relative overflow-hidden rounded-md bg-white font-bold text-ink tabular-nums perspective-[1000px] ${cardSize}`;
const half = "absolute inset-x-0 h-1/2 overflow-hidden bg-inherit";

/** One digit on a card that folds down from the middle when it changes. */
const FlipUnit = memo(function FlipUnit({ digit }: { digit: string }) {
  const [prevDigit, setPrevDigit] = useState(digit);
  const flipping = digit !== prevDigit;

  // The flaps take 0.6s; settle just before they finish so the next second starts clean.
  useEffect(() => {
    if (!flipping) return;
    const timer = setTimeout(() => setPrevDigit(digit), 550);
    return () => clearTimeout(timer);
  }, [digit, flipping]);

  return (
    <div className={card}>
      {/* Behind: the new digit's top half and the old digit's bottom half. */}
      <div className={`${half} top-0 rounded-t-md`}>
        <DigitSpan position="top">{digit}</DigitSpan>
      </div>
      <div className={`${half} translate-y-full rounded-b-md`}>
        <DigitSpan position="bottom">{prevDigit}</DigitSpan>
      </div>

      {/* In front: the old top folds down, then the new bottom folds into place. */}
      <div
        className={`${half} z-20 origin-bottom rounded-t-md backface-hidden motion-reduce:animate-none ${flipping ? "animate-flip-top" : ""}`}
      >
        <DigitSpan position="top">{prevDigit}</DigitSpan>
      </div>
      <div
        className={`${half} z-10 origin-top translate-y-full rounded-b-md backface-hidden motion-reduce:animate-none ${flipping ? "animate-flip-bottom" : ""}`}
        style={{ transform: "rotateX(90deg)" }}
      >
        <DigitSpan position="bottom">{digit}</DigitSpan>
      </div>

      {/* The hinge across the middle. */}
      <div className="absolute inset-x-0 top-1/2 z-30 h-px -translate-y-1/2 bg-black/15" />
    </div>
  );
});

/** A digit as tall as the whole card, so each half shows its own half of it. */
function DigitSpan({ children, position }: { children: string; position: "top" | "bottom" }) {
  return (
    <span
      className="absolute inset-x-0 flex h-[200%] items-center justify-center"
      style={{ top: position === "top" ? "0%" : "-100%" }}
    >
      {children}
    </span>
  );
}

export type FlipClockLabels = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

type Props = {
  /** Seconds left to show; null draws blank cards until the browser knows the time. */
  secondsLeft: number | null;
  labels: FlipClockLabels;
  className?: string;
};

/** A countdown of days, hours, minutes and seconds on flipping cards. */
export function FlipClock({ secondsLeft, labels, className = "" }: Props) {
  const s = secondsLeft ?? 0;
  const units = [
    { key: "days", value: Math.floor(s / 86_400), label: labels.days },
    { key: "hours", value: Math.floor(s / 3600) % 24, label: labels.hours },
    { key: "minutes", value: Math.floor(s / 60) % 60, label: labels.minutes },
    { key: "seconds", value: s % 60, label: labels.seconds },
  ];

  return (
    <div role="timer" className={`flex justify-center gap-4 sm:gap-8 ${className}`}>
      {/* Read once as a sentence; the cards themselves are only for the eye. */}
      {secondsLeft === null ? null : (
        <span className="sr-only">
          {units.map(({ value, label }) => `${value} ${label}`).join(", ")}
        </span>
      )}

      {units.map(({ key, value, label }) => {
        const [tens = "0", ones = "0"] = String(value).padStart(2, "0");

        return (
          <div key={key} aria-hidden className="flex flex-col items-center gap-2">
            {/* Digits read left to right in Arabic as well. */}
            <div dir="ltr" className="flex gap-1 sm:gap-1.5">
              {secondsLeft === null ? (
                <>
                  <div className={card} />
                  <div className={card} />
                </>
              ) : (
                <>
                  <FlipUnit digit={tens} />
                  <FlipUnit digit={ones} />
                </>
              )}
            </div>
            <span className="text-[11px]/4 font-semibold text-white/70 sm:text-xs/4 ltr:tracking-[0.1em] ltr:uppercase">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
