import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { GuideLink } from "./guide-link";

const desktopImages: Record<Locale, string> = {
  en: "/images/hero-desktop.webp",
  ar: "/images/hero-desktop-ar.webp",
};

type Props = {
  lang: Locale;
  dict: Dictionary;
};

export function Hero({ lang, dict }: Props) {
  return (
    <section className="relative overflow-hidden bg-white lg:h-[clamp(32.5rem,calc(100svh-5.75rem),50rem)]">
      {/* The desktop artwork contains text, so Arabic gets its own mirrored file
          (phone on the left) instead of a CSS flip. */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-5 pt-12 text-center lg:absolute lg:inset-y-0 lg:start-0 lg:w-[54%] lg:items-start lg:justify-center lg:gap-6 lg:px-8 lg:pt-0 lg:text-start">
        <h1 className="text-4xl/[1.1] font-extrabold text-balance text-ink sm:text-5xl/[1.1] lg:text-6xl/[1.08] ltr:tracking-tight rtl:leading-[1.3]">
          {dict.hero.title}
        </h1>
        <p className="max-w-[34ch] text-lg/7 text-pretty text-ink-muted lg:text-xl/8">
          {dict.hero.subtitle}
        </p>
        <GuideLink lang={lang} label={dict.nav.getTheGuide} size="hero" />
      </div>

      {/* Phones only download the small crop. Its top 45% is empty, so it tucks under the copy. */}
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet={desktopImages[lang]}
          width={1280}
          height={720}
        />
        <img
          src="/images/hero-mobile.webp"
          width={1080}
          height={1350}
          alt={dict.hero.imageAlt}
          fetchPriority="high"
          decoding="async"
          className="-mt-[48%] block h-auto w-full select-none lg:absolute lg:inset-y-0 lg:end-0 lg:mt-0 lg:h-full lg:w-auto lg:max-w-none"
        />
      </picture>
    </section>
  );
}
