"use client";

import type { ProductId } from "@guiderplan/shared";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  productId: ProductId;
  label: string;
  name: string;
  country: string;
  description: string;
  image?: string;
  imageAlt: string;
  /** The price as shown on the card, e.g. "SAR 39.99". */
  price: string;
  copy: Dictionary["details"];
  /** The buy button, shown at the foot of the panel. */
  action: ReactNode;
};

/** The "Read more" button on a product card. It opens a panel describing the guide. */
export function DetailsButton(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2.5 flex h-11 w-full cursor-pointer items-center justify-center rounded-full bg-neutral-200/80 text-base/[22px] font-semibold text-ink shadow-cta-light outline outline-black/16 transition-colors ease-out hover:bg-neutral-200 focus-visible:ring-4 focus-visible:ring-brand/50 ltr:tracking-[0.2px]"
      >
        {props.label}
        <span className="sr-only">: {props.name}</span>
      </button>

      {open ? <DetailsDialog {...props} onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function DetailsDialog({
  productId,
  name,
  country,
  description,
  image,
  imageAlt,
  price,
  copy,
  action,
  onClose,
}: Props & { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  // Opened as a modal, the browser traps focus inside and closes it on Escape.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      // The browser would focus the close button and ring it as if it were picked. Start
      // on the panel instead; Tab still reaches the button.
      dialog.focus();
    }
  }, []);

  // Guides with their own outline show it; the rest show what every guide includes.
  const guide = copy.guides[productId as keyof typeof copy.guides] as
    (typeof copy.guides)[keyof typeof copy.guides] | undefined;

  return (
    <dialog
      ref={dialogRef}
      tabIndex={-1}
      aria-labelledby={titleId}
      onClose={onClose}
      // A click that lands on the dialog itself, not its contents, is a click on the backdrop.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto h-[min(88dvh,42rem)] w-[calc(100%-2.5rem)] max-w-3xl overflow-hidden rounded-[26px] bg-white p-0 text-start text-ink shadow-card outline outline-black/16 backdrop:bg-black/45"
    >
      <div className="flex h-full flex-col md:flex-row">
        {/* The picture takes a third: of the height on a phone, of the width from tablet up. */}
        <div className="relative h-1/3 shrink-0 md:h-full md:w-1/3">
          {image ? (
            <img
              src={image}
              alt={imageAlt}
              decoding="async"
              className="absolute inset-0 size-full object-cover select-none"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-b from-sky-400/90 to-sky-50"
            />
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <header className="flex items-start justify-between gap-4 border-b border-black/10 px-6 pt-5 pb-4">
            <div>
              <p className="text-[11px]/4 font-extrabold text-ink-muted ltr:tracking-[0.1em] ltr:uppercase rtl:text-xs/5">
                {country}
              </p>
              <h2
                id={titleId}
                className="text-3xl/[1.2] font-extrabold text-ink ltr:tracking-tight rtl:leading-[1.4]"
              >
                {name}
              </h2>
            </div>
            <button
              type="button"
              aria-label={copy.close}
              onClick={onClose}
              className="-me-2 -mt-1 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-4 focus-visible:ring-brand/50"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </header>

          {/* The reading area scrolls on its own, with its scrollbar always on show. */}
          <div
            tabIndex={0}
            className="scrollbar-visible min-h-0 flex-1 overflow-y-scroll overscroll-contain px-6 py-5 outline-none focus-visible:ring-4 focus-visible:ring-brand/50 focus-visible:ring-inset"
          >
            {/* Every guide uses one layout: a short intro, then a ticked list of what's inside. */}
            {guide ? (
              <p className="text-base/7 font-semibold text-pretty text-ink">{guide.headline}</p>
            ) : null}
            <p className={`text-base/7 text-pretty text-ink-muted ${guide ? "mt-1" : ""}`}>
              {guide ? guide.intro : description}
            </p>

            <h3 className="mt-6 text-lg/7 font-extrabold">{copy.insideTitle}</h3>
            <ul className={`mt-3 flex flex-col ${guide ? "gap-3" : "gap-4"}`}>
              {(guide
                ? guide.sections.map((title) => ({ title, text: undefined }))
                : copy.features
              ).map((feature) => (
                <li key={feature.title} className="flex gap-3">
                  <svg
                    viewBox="0 0 20 20"
                    className="mt-1 size-5 shrink-0 text-brand"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4.5 10.5 3.5 3.5 7.5-8" />
                  </svg>
                  <div>
                    <p className="text-base/6 font-semibold">{feature.title}</p>
                    {feature.text ? (
                      <p className="mt-0.5 text-sm/6 text-ink-muted">{feature.text}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <footer className="flex items-center justify-between gap-4 border-t border-black/10 px-6 py-4">
            <p className="text-xl/7 font-extrabold whitespace-nowrap">{price}</p>
            <div className="w-full max-w-56 [&>button]:mt-0">{action}</div>
          </footer>
        </div>
      </div>
    </dialog>
  );
}
