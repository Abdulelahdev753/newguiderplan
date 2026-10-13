"use client";

import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js/min";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { directions } from "@/i18n/config";

type Props = {
  lang: Locale;
  /** The id the field's <label> points at. */
  id: string;
  country: CountryCode;
  onCountryChange: (country: CountryCode) => void;
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
  describedBy: string | undefined;
  copy: { countryCode: string; searchCountry: string; noCountry: string };
  /** Called when Escape closes the country list, so the dialog around it can stay open. */
  onPickerEscape: () => void;
};

type Country = {
  code: CountryCode;
  callingCode: string;
  name: string;
  /** Lower-cased words the search box matches against. */
  search: string;
};

/** Lower-cased and without accents, so "turk" finds Türkiye and "cote" finds Côte d'Ivoire. */
const fold = (text: string) => text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

/** Flags are the SVGs from country-flag-icons (MIT), copied to /public/flags. */
function Flag({ code }: { code: CountryCode }) {
  return (
    <img
      src={`/flags/${code}.svg`}
      alt=""
      width={24}
      height={16}
      loading="lazy"
      decoding="async"
      className="h-4 w-6 shrink-0 rounded-[3px] object-cover outline outline-black/10"
    />
  );
}

/** A phone input with a searchable country picker in front of it. */
export function PhoneField({
  lang,
  id,
  country,
  onCountryChange,
  value,
  onChange,
  invalid,
  describedBy,
  copy,
  onPickerEscape,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const countries = useMemo<Country[]>(() => {
    const names = new Intl.DisplayNames([lang], { type: "region" });
    // People also type the English name, whatever language the page is in.
    const englishNames = new Intl.DisplayNames(["en"], { type: "region" });
    return getCountries()
      .map((code) => {
        const name = names.of(code) ?? code;
        const callingCode = getCountryCallingCode(code);
        return {
          code,
          callingCode,
          name,
          search: fold(`${name} ${englishNames.of(code) ?? ""} ${code} +${callingCode}`),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name, lang));
  }, [lang]);

  const matches = useMemo(() => {
    const needle = fold(query.trim());
    return needle ? countries.filter((item) => item.search.includes(needle)) : countries;
  }, [countries, query]);

  const selected = countries.find((item) => item.code === country);

  function openPicker() {
    const index = Math.max(
      0,
      countries.findIndex((item) => item.code === country),
    );
    setQuery("");
    setActiveIndex(index);
    setOpen(true);
    // Once the list is on the page: start in the search box, with the current country in view.
    requestAnimationFrame(() => {
      searchRef.current?.focus();
      document.getElementById(`${listId}-${index}`)?.scrollIntoView({ block: "center" });
    });
  }

  function closePicker(focusTarget: "trigger" | "input" | "none") {
    setOpen(false);
    if (focusTarget === "trigger") triggerRef.current?.focus();
    if (focusTarget === "input") inputRef.current?.focus();
  }

  function choose(item: Country) {
    onCountryChange(item.code);
    closePicker("input");
  }

  // A press anywhere outside the field closes the picker.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function moveTo(index: number) {
    if (matches.length === 0) return;
    const next = (index + matches.length) % matches.length;
    setActiveIndex(next);
    document.getElementById(`${listId}-${next}`)?.scrollIntoView({ block: "nearest" });
  }

  function onSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveTo(activeIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveTo(activeIndex - 1);
    } else if (event.key === "Enter") {
      // Never submit the order form from the search box.
      event.preventDefault();
      const item = matches[activeIndex];
      if (item) choose(item);
    } else if (event.key === "Escape") {
      // Close the picker only, not the dialog around it.
      event.preventDefault();
      event.stopPropagation();
      onPickerEscape();
      closePicker("trigger");
    } else if (event.key === "Tab") {
      closePicker("none");
    }
  }

  return (
    // Phone numbers read left to right in both languages.
    <div ref={rootRef} dir="ltr" className="relative font-normal">
      <div
        data-invalid={invalid ? "" : undefined}
        className="flex h-12 items-center rounded-2xl bg-white text-base text-ink outline outline-black/16 focus-within:outline-2 focus-within:outline-brand data-invalid:outline-red-600"
      >
        <button
          ref={triggerRef}
          type="button"
          aria-label={selected ? `${copy.countryCode}: ${selected.name}` : copy.countryCode}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          onClick={() => (open ? closePicker("none") : openPicker())}
          className="flex h-full shrink-0 cursor-pointer items-center gap-1.5 rounded-s-2xl border-e border-black/12 ps-3.5 pe-2.5 outline-none focus-visible:bg-neutral-100"
        >
          <Flag code={country} />
          <svg
            viewBox="0 0 16 16"
            className="size-4 text-ink-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 6.5 8 3.5l3 3M5 9.5l3 3 3-3" />
          </svg>
        </button>
        <span aria-hidden="true" className="ps-3 text-ink select-none">
          +{selected?.callingCode}
        </span>
        <input
          ref={inputRef}
          id={id}
          type="tel"
          name="phone"
          inputMode="tel"
          autoComplete="tel-national"
          maxLength={20}
          required
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={invalid ? true : undefined}
          aria-describedby={describedBy}
          className="h-full min-w-0 flex-1 rounded-e-2xl bg-transparent ps-2 pe-4 outline-none"
        />
      </div>

      {open ? (
        <div
          dir={directions[lang]}
          className="absolute inset-x-0 top-full z-10 mt-2 overflow-hidden rounded-2xl bg-white shadow-card outline outline-black/16"
        >
          <div className="flex items-center gap-2.5 border-b border-black/10 px-3.5">
            <svg
              viewBox="0 0 20 20"
              className="size-4.5 shrink-0 text-ink-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="9" r="5.5" />
              <path d="m13.5 13.5 3.5 3.5" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              role="combobox"
              aria-label={copy.searchCountry}
              aria-expanded="true"
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={matches.length > 0 ? `${listId}-${activeIndex}` : undefined}
              placeholder={copy.searchCountry}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onSearchKeyDown}
              className="h-11 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink-muted"
            />
          </div>

          <ul
            id={listId}
            role="listbox"
            aria-label={copy.countryCode}
            className="max-h-56 overflow-y-auto overscroll-contain p-1.5"
          >
            {matches.map((item, index) => (
              <li
                key={item.code}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={item.code === country}
                onClick={() => choose(item)}
                onPointerMove={() => setActiveIndex(index)}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-[15px]/5 ${
                  index === activeIndex ? "bg-neutral-100" : ""
                } ${item.code === country ? "font-semibold" : ""}`}
              >
                <Flag code={item.code} />
                <span className="min-w-0 flex-1 truncate text-start">{item.name}</span>
                <span dir="ltr" className="shrink-0 text-ink-muted tabular-nums">
                  +{item.callingCode}
                </span>
              </li>
            ))}
            {matches.length === 0 ? (
              <li className="px-2.5 py-3 text-center text-sm text-ink-muted">{copy.noCountry}</li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
