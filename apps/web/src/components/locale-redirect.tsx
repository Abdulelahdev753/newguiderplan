"use client";

import { useEffect } from "react";
import { defaultLocale, hasLocale, LOCALE_STORAGE_KEY } from "@/i18n/config";

function preferredLocale() {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved && hasLocale(saved)) return saved;
  } catch {
    // Storage can be blocked; fall through to the default.
  }

  return defaultLocale;
}

/** A static export has no server to redirect from, so the choice happens in the browser. */
export function LocaleRedirect() {
  useEffect(() => {
    window.location.replace(`/${preferredLocale()}${window.location.hash}`);
  }, []);

  return null;
}
