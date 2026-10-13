"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_STORAGE_KEY, type Locale } from "@/i18n/config";

type Props = {
  /** Locale this link switches to. */
  to: Locale;
  label: string;
  className?: string;
};

export function LanguageSwitch({ to, label, className }: Props) {
  const pathname = usePathname();
  // Routes are /{locale}/…, so swapping the first segment keeps the visitor on the same page.
  const href = `/${[to, ...pathname.split("/").slice(2)].join("/")}`;

  return (
    <Link
      href={href}
      lang={to}
      hrefLang={to}
      className={className}
      onClick={() => {
        try {
          localStorage.setItem(LOCALE_STORAGE_KEY, to);
        } catch {
          // Storage can be blocked; the link still works.
        }
      }}
    >
      {label}
    </Link>
  );
}
