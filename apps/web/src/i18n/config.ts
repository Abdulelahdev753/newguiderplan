export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

/** localStorage key remembering the language the visitor picked. */
export const LOCALE_STORAGE_KEY = "guiderplan.locale";

export const directions: Record<Locale, "ltr" | "rtl"> = { en: "ltr", ar: "rtl" };

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
