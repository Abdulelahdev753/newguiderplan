import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { directions, hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "../globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

// A static export can only serve the locales listed here.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  return {
    title: "GuiderPlan",
    description: getDictionary(lang).meta.description,
    alternates: {
      languages: Object.fromEntries(locales.map((locale) => [locale, `/${locale}`])),
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    // Chrome on iOS adds its own attribute to <html> before React loads; this only
    // silences attribute differences on this one element, not on anything inside it.
    <html lang={lang} dir={directions[lang]} className={cairo.variable} suppressHydrationWarning>
      <body className="min-h-dvh bg-canvas text-ink antialiased">
        <SiteHeader lang={lang} dict={getDictionary(lang)} />
        {children}
        <SiteFooter lang={lang} dict={getDictionary(lang)} />
      </body>
    </html>
  );
}
