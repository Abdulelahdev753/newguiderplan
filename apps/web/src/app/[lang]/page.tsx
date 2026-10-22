import { notFound } from "next/navigation";
import { About } from "@/components/about";
import { Faqs } from "@/components/faqs";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { PartnerBanner } from "@/components/partner-banner";
import { Products } from "@/components/products";
import { Reviews } from "@/components/reviews";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <main>
      <Hero lang={lang} dict={dict} />
      <Reviews dict={dict} />
      <Products lang={lang} dict={dict} />
      <HowItWorks dict={dict} />
      <PartnerBanner dict={dict} />
      <Faqs dict={dict} />
      <About dict={dict} />
    </main>
  );
}
