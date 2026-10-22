import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  dict: Dictionary;
};

export function About({ dict }: Props) {
  const copy = dict.about;

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

        <div className="flex flex-col text-center sm:text-start">
          <h2 className="text-3xl/[1.3] font-extrabold text-ink lg:text-4xl/[1.3] ltr:tracking-tight">
            {copy.title}
          </h2>
          {/* One justified block, so every line runs the full width. The last line is centred
              like the rest of the column on phones, and starts at the edge from tablets up. From
              1280px the column stops growing, and the Arabic at 19px fills exactly four lines,
              so its last line is justified too. */}
          <p className="mt-3 text-justify text-base/7 text-ink-muted [text-align-last:center] sm:[text-align-last:start] lg:mt-4 lg:text-xl/9 xl:rtl:text-[19px]/[1.8] xl:rtl:[text-align-last:justify]">
            {copy.lines.join(" ")}
          </p>
          {/* Name and role on one line, split by a hairline like the footer's registration. */}
          <p className="mt-5 flex items-center justify-center gap-3 text-base/6 text-ink-muted sm:justify-start">
            <span className="font-extrabold text-ink">{copy.name}</span>
            <span className="border-s border-black/16 ps-3">{copy.role}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
