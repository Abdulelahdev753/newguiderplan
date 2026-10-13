"use client";

import type { ProductId } from "@guiderplan/shared";
import { lazy, Suspense, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  lang: Locale;
  productId: ProductId;
  productName: string;
  label: string;
  copy: Dictionary["checkout"];
};

// The order form brings the phone rules for every country with it, so it is fetched
// when a visitor reaches for the button, not with the page.
const loadForm = () => import("./checkout-dialog");
const CheckoutDialog = lazy(() =>
  loadForm().then((module) => ({ default: module.CheckoutDialog })),
);

/** The "Buy the guide" button on a product card. It opens the order form. */
export function BuyButton({ lang, productId, productName, label, copy }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Starts the download early, so the form is usually ready by the time of the press.
  const preload = () => void loadForm().catch(() => {});

  // Opens only once the form's code has arrived. If the connection dropped, the button
  // simply comes back and can be pressed again.
  const openForm = () => {
    setLoading(true);
    loadForm()
      .then(() => setOpen(true))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  return (
    <>
      <button
        type="button"
        onClick={openForm}
        onPointerEnter={preload}
        onTouchStart={preload}
        onFocus={preload}
        disabled={loading}
        aria-busy={loading || undefined}
        className="mt-4 flex h-11 w-full cursor-pointer items-center justify-center rounded-full bg-brand text-base/[22px] font-semibold text-white shadow-cta outline-none transition-colors ease-out hover:bg-brand-hover focus-visible:ring-4 focus-visible:ring-brand/50 disabled:cursor-wait disabled:opacity-70 ltr:tracking-[0.2px]"
      >
        {label}
        <span className="sr-only">: {productName}</span>
      </button>

      {open ? (
        <Suspense fallback={null}>
          <CheckoutDialog
            lang={lang}
            productId={productId}
            productName={productName}
            copy={copy}
            onClose={() => setOpen(false)}
          />
        </Suspense>
      ) : null}
    </>
  );
}
