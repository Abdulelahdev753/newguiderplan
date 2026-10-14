import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { GuideLink } from "./guide-link";
import { ScribbleUnderline } from "./scribble-underline";

const desktopImages: Record<Locale, string> = {
  en: "/images/hero-desktop.webp",
  ar: "/images/hero-desktop-ar.webp",
};

// Inline-block, so the gradient spans the line's height just as it would on the whole line.
const accent =
  "inline-block bg-linear-to-t from-[#9dc6fb] to-brand to-70% bg-clip-text text-transparent";

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
        {/* Fluid 30–60px, sized so each line stays on one row from 360px phones up. The rem
            term keeps it growing with browser zoom and font-size settings, which a bare vw
            size ignores. Arabic gets no tracking, since it would pull the joined letters
            apart, and taller lines for its marks and descenders. */}
        <h1 className="text-[clamp(1.875rem,1.1rem+2.7vw,3.75rem)] leading-[1.1] font-extrabold text-ink ltr:tracking-tight rtl:leading-[1.3]">
          <span className="block text-balance">{dict.hero.title}</span>
          {/* The same blue gradient as the happy-customers counter in the reviews section, set
              on each part so the underline's drawing can sit outside the gradient text. */}
          <span className="block pb-[0.42em] text-balance">
            <span className={accent}>{dict.hero.titleAccent}</span>{" "}
            <ScribbleUnderline>
              <span className={accent}>{dict.hero.titleMark}</span>
            </ScribbleUnderline>
          </span>
        </h1>
        {/* Fluid 18–22px, never under the 16px body floor, with the same extra line height for
            Arabic as the headline. Phones and tablets split it evenly over two short rows; on
            desktop it runs on one row wherever the column is wide enough. */}
        <p className="max-w-[36ch] lg:max-w-none text-[clamp(1.125rem,1rem+0.45vw,1.375rem)] leading-[1.6] text-balance text-ink-muted rtl:leading-[1.75]">
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
