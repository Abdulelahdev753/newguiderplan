"use client";

import type { CheckoutRequest, CheckoutResponse, ProductId } from "@guiderplan/shared";
import { parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js/min";
import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ApiError, apiFetch } from "@/lib/api-client";
import { PhoneField } from "./phone-field";

// The same rule the API applies: letters of any script, spaces, and the punctuation names use.
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u;
const DEFAULT_COUNTRY: CountryCode = "SA";

const fieldClass =
  "h-12 w-full rounded-2xl bg-white px-4 text-base text-ink outline outline-black/16 focus-visible:outline-2 focus-visible:outline-brand aria-invalid:outline-red-600";

type Props = {
  lang: Locale;
  productId: ProductId;
  productName: string;
  copy: Dictionary["checkout"];
  onClose: () => void;
};

type Errors = { name?: string; phone?: string; form?: string };

export function CheckoutDialog({ lang, productId, productName, copy, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // When Escape last closed the country list; that same key press must not close the dialog.
  const pickerEscapeAtRef = useRef(0);
  const titleId = useId();
  const nameErrorId = useId();
  const phoneId = useId();
  const phoneErrorId = useId();

  const [name, setName] = useState("");
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState("");
  // Hidden from people; a bot that fills it gives itself away.
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  // Opened as a modal, the browser traps focus inside and closes it on Escape.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const cleanName = name.trim().replace(/ {2,}/g, " ");
    const parsedPhone = parsePhoneNumberFromString(phone, country);
    const nextErrors: Errors = {};
    if (cleanName.length < 2 || cleanName.length > 100 || !NAME_PATTERN.test(cleanName)) {
      nextErrors.name = copy.errors.name;
    }
    if (!parsedPhone?.isValid()) nextErrors.phone = copy.errors.phone;
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.phone || !parsedPhone) return;

    setSubmitting(true);
    try {
      const body: CheckoutRequest = {
        productId,
        name: cleanName,
        phone: parsedPhone.number,
        lang,
        website,
      };
      const { url } = await apiFetch<CheckoutResponse>("/checkout", {
        method: "POST",
        body: JSON.stringify(body),
      });
      // Stays in the submitting state while the browser leaves for StreamPay.
      window.location.assign(url);
    } catch (error) {
      const code = error instanceof ApiError ? error.code : undefined;
      if (code === "INVALID_NAME") setErrors({ name: copy.errors.name });
      else if (code === "INVALID_PHONE") setErrors({ phone: copy.errors.phone });
      else if (code === "RATE_LIMITED") setErrors({ form: copy.errors.rateLimited });
      else setErrors({ form: copy.errors.generic });
      setSubmitting(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={(event) => {
        if (submitting || Date.now() - pickerEscapeAtRef.current < 500) event.preventDefault();
      }}
      // A click that lands on the dialog itself, not its contents, is a click on the backdrop.
      onClick={(event) => {
        if (event.target === event.currentTarget && !submitting) onClose();
      }}
      className="m-auto w-[calc(100%-2.5rem)] max-w-md overflow-visible rounded-[26px] bg-white p-0 text-start text-ink shadow-card outline outline-black/16 backdrop:bg-black/45"
    >
      <form onSubmit={submit} noValidate className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-2xl/[1.3] font-extrabold ltr:tracking-tight">
              {copy.title.replace("{name}", productName)}
            </h2>
            <p className="mt-1 text-sm/6 text-ink-muted">{copy.intro}</p>
          </div>
          <button
            type="button"
            aria-label={copy.close}
            onClick={onClose}
            disabled={submitting}
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
        </div>

        <label className="flex flex-col gap-1.5 text-sm/5 font-semibold">
          {copy.name}
          <input
            type="text"
            name="name"
            autoComplete="name"
            maxLength={100}
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? nameErrorId : undefined}
            className={`${fieldClass} font-normal`}
          />
          {errors.name ? (
            <span id={nameErrorId} role="alert" className="font-normal text-red-700">
              {errors.name}
            </span>
          ) : null}
        </label>

        <div className="flex flex-col gap-1.5 text-sm/5 font-semibold">
          <label htmlFor={phoneId}>{copy.phone}</label>
          <PhoneField
            lang={lang}
            id={phoneId}
            country={country}
            onCountryChange={setCountry}
            value={phone}
            onChange={setPhone}
            invalid={Boolean(errors.phone)}
            describedBy={errors.phone ? phoneErrorId : undefined}
            copy={copy}
            onPickerEscape={() => {
              pickerEscapeAtRef.current = Date.now();
            }}
          />
          {errors.phone ? (
            <span id={phoneErrorId} role="alert" className="font-normal text-red-700">
              {errors.phone}
            </span>
          ) : null}
        </div>

        {/* Off-screen and out of the tab order: only a bot fills this in. */}
        <div aria-hidden="true" className="absolute -start-[9999px] size-px overflow-hidden">
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </label>
        </div>

        {errors.form ? (
          <p role="alert" className="text-sm/5 text-red-700">
            {errors.form}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="flex h-12 cursor-pointer items-center justify-center rounded-full bg-brand text-base/[22px] font-semibold text-white shadow-cta outline-none transition-colors ease-out hover:bg-brand-hover focus-visible:ring-4 focus-visible:ring-brand/50 disabled:cursor-wait disabled:opacity-70 ltr:tracking-[0.2px]"
        >
          {submitting ? copy.submitting : copy.submit}
        </button>
        <p className="text-center text-xs/5 text-ink-muted">{copy.privacy}</p>
      </form>
    </dialog>
  );
}
