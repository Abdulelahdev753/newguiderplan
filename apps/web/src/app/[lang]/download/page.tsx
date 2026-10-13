import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DownloadPanel } from "@/features/download/download-panel";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// A private page for one buyer; search engines have no business here.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DownloadPage({ params }: PageProps<"/[lang]/download">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const items = dict.products.items;

  return (
    <main className="px-5 py-16 lg:px-8 lg:py-24">
      <DownloadPanel
        lang={lang}
        copy={dict.download}
        guideNames={{
          london: items.london.name,
          bali: items.bali.name,
          barcelona: items.barcelona.name,
          amsterdam: items.amsterdam.name,
          northItaly: items.northItaly.name,
          prague: items.prague.name,
        }}
      />
    </main>
  );
}
