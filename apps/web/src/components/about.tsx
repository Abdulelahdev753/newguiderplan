import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  lang: Locale;
  dict: Dictionary;
};

export function About({ lang, dict }: Props) {
  const copy = dict.about;
  const guides = Object.entries(dict.products.items);

  return (
    <section id="about" className="scroll-mt-25 px-5 pb-20 lg:scroll-mt-33 lg:px-8 lg:pb-28">
      <div className="mx-auto grid max-w-md gap-8 sm:max-w-6xl sm:grid-cols-2 lg:gap-16">
        {/* The same card as the products, with a lighter fade: the white stays see-through. */}
        <div className="relative isolate aspect-square overflow-hidden rounded-[26px] bg-white shadow-card outline outline-black/16 [--fade-from:52%] [--fade-to:100%]">
          <img
            src="/images/about.webp"
            srcSet="/images/about-480.webp 480w, /images/about.webp 900w"
            sizes="(min-width: 1216px) 544px, (min-width: 640px) 45vw, (min-width: 488px) 448px, 92vw"
            alt={copy.imageAlt}
            width={900}
            height={900}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -z-10 size-full object-cover select-none"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-white/85 mask-fade-eased"
          />
        </div>

        {/* As tall as the picture: the story starts at its top edge and the guides end at its
            bottom edge. */}
        <div className="flex flex-col text-center sm:text-start">
          <h2 className="text-3xl/[1.3] font-extrabold text-ink lg:text-4xl/[1.3] ltr:tracking-tight">
            {copy.title}
          </h2>
          {/* One sentence per line where the column is wide enough to hold each on its own. */}
          <p className="mt-3 text-base/7 text-pretty text-ink-muted lg:mt-4 lg:text-xl/9">
            {copy.lines.map((line) => (
              <span key={line} className="lg:block">
                {line}{" "}
              </span>
            ))}
          </p>
          {/* Name and role on one line, split by a hairline like the footer's registration. */}
          <p className="mt-5 flex items-center justify-center gap-3 text-base/6 text-ink-muted sm:justify-start">
            <span className="font-extrabold text-ink">{copy.name}</span>
            <span className="border-s border-black/16 ps-3">{copy.role}</span>
          </p>

          <div className="mt-10 border-t border-black/10 pt-5 sm:mt-auto">
            <h3 className="text-sm/6 font-semibold text-ink-muted">{copy.guides}</h3>
            <ul className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
              {guides.map(([id, item]) => (
                <li key={id}>
                  <Link
                    href={`/${lang}#products`}
                    className="flex h-9 items-center rounded-full px-4 text-sm/6 font-semibold text-ink outline outline-black/16 transition-colors duration-150 ease-out hover:bg-black/5 focus-visible:ring-4 focus-visible:ring-brand/50"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
