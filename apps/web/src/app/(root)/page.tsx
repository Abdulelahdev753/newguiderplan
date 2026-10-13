import { LocaleRedirect } from "@/components/locale-redirect";
import { locales } from "@/i18n/config";

/** `/` has no language of its own: it sends the visitor to /ar, or to the language they last chose. */
export default function RootPage() {
  return (
    <main>
      <LocaleRedirect />
      <noscript>
        <ul className="flex min-h-dvh items-center justify-center gap-6 font-semibold">
          {locales.map((locale) => (
            <li key={locale}>
              <a href={`/${locale}`} lang={locale} className="underline underline-offset-4">
                {locale === "ar" ? "العربية" : "English"}
              </a>
            </li>
          ))}
        </ul>
      </noscript>
    </main>
  );
}
